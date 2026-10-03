import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { once } from 'node:events';
import { createServer } from 'node:net';
import { Client } from 'pg';
import { PGlite } from '@electric-sql/pglite';
import { PGLiteSocketServer } from '@electric-sql/pglite-socket';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.ts';
import { resolveTimelinePosition } from '../shared/timeline.ts';
import { seedDemoData } from '../prisma/seed.ts';
import test from 'node:test';

const migrationsDir = new URL('../prisma/migrations/', import.meta.url);

test('PostgreSQL migration and Prisma relations support catalog, timeline, and episodes', async () => {
  const db = await PGlite.create();
  const portProbe = createServer();
  portProbe.listen(0, '127.0.0.1');
  await once(portProbe, 'listening');
  const portAddress = portProbe.address();
  assert.ok(portAddress && typeof portAddress !== 'string');
  const port = portAddress.port;
  await new Promise<void>((resolve, reject) => portProbe.close(error => error ? reject(error) : resolve()));
  const socketServer = new PGLiteSocketServer({ db, host: '127.0.0.1', port, maxConnections: 8 });
  const connectionString = `postgresql://postgres:postgres@127.0.0.1:${port}/postgres?sslmode=disable`;
  const wireClient = new Client({ connectionString });
  wireClient.on('error', () => undefined);
  let prisma: PrismaClient | undefined;
  try {
    await socketServer.start();
    await wireClient.connect();
    // Apply every committed migration in order, exactly as `prisma migrate deploy` would.
    for (const dir of (await readdir(migrationsDir)).filter(name => /^\d+_/.test(name)).sort()) {
      await wireClient.query(await readFile(new URL(`${dir}/migration.sql`, migrationsDir), 'utf8'));
    }
    process.env.DATABASE_URL = connectionString;
    process.env.RADIO_INGEST_TOKEN = 'integration-token';
    prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

    const simulated = await prisma.channel.create({
      data: {
        slug: 'integration-clock', name: 'Integration Clock', type: 'SIMULATED',
        cycleStart: new Date('2026-01-01T00:00:00Z'),
        segments: { create: [
          { position: 0, title: 'First', audioUrl: 'https://audio.test/first.mp3', durationSeconds: 10 },
          { position: 1, title: 'Second', audioUrl: 'https://audio.test/second.mp3', durationSeconds: 20 },
        ] },
      },
      include: { segments: { orderBy: { position: 'asc' } } },
    });
    assert.deepEqual(simulated.segments.map(segment => segment.position), [0, 1]);
    const point = resolveTimelinePosition(simulated.segments, simulated.cycleStart!, Date.parse('2026-01-01T00:00:17.500Z'));
    assert.equal(point?.segment.title, 'Second');
    assert.equal(point?.offsetSeconds, 7.5);

    const podcast = await prisma.channel.create({
      data: {
        slug: 'integration-podcast', name: 'Integration Podcast', type: 'ON_DEMAND',
        episodes: { create: [{ title: 'Episode 1', audioUrl: 'https://audio.test/ep1.mp3', publishedAt: new Date('2026-01-01T00:00:00Z') }] },
      },
      include: { episodes: true },
    });
    assert.equal(podcast.episodes.length, 1);
    assert.equal(podcast.episodes[0].channelId, podcast.id);

    await seedDemoData(prisma);
    await seedDemoData(prisma);
    const demoAfterHours = await prisma.channel.findUnique({ where: { slug: 'after-hours' }, include: { segments: true } });
    const demoPodcasts = await prisma.channel.findUnique({ where: { slug: 'ajn-podcasts' }, include: { episodes: true } });
    assert.equal(demoAfterHours?.segments.length, 4);
    assert.ok(demoAfterHours?.segments.every(segment => /^Demo Track \d+$/.test(segment.title) && segment.artist === null));
    assert.equal(demoPodcasts?.episodes.length, 2);
    assert.ok(demoPodcasts?.episodes.every(episode => /^Demo Episode \d+$/.test(episode.title) && episode.durationSeconds === null && episode.publishedAt === null));
    assert.equal(await prisma.channel.count({ where: { type: 'LIVE', streamUrl: { not: null } } }), 3);

    const { app, startMetadataNotifications, stopMetadataNotifications, getMetadataNotificationStatus, metadataListenerTestHooks, getSseConnectionCount, ingestTokenMatches } = await import('../server/index.ts');
    assert.equal(ingestTokenMatches('secret', 'Bearer secret'), true);
    assert.equal(ingestTokenMatches('secret', 'Bearer secretx'), false);
    assert.equal(ingestTokenMatches('secret', 'Bearer short'), false);
    await startMetadataNotifications();
    assert.equal(getMetadataNotificationStatus(), 'listening');
    const httpServer = app.listen(0, '127.0.0.1');
    await once(httpServer, 'listening');
    const address = httpServer.address();
    assert.ok(address && typeof address !== 'string');
    const api = `http://127.0.0.1:${address.port}`;
    try {
      const health = await fetch(`${api}/api/health`);
      assert.equal(health.status, 200);
      assert.deepEqual(await health.json(), { status: 'ok', database: 'connected', notifications: 'listening' });

      const catalogResponse = await fetch(`${api}/api/channels?limit=2`);
      assert.equal(catalogResponse.status, 200);
      const catalog = await catalogResponse.json() as { channels: Array<{ slug: string }>; nextCursor: string | null };
      assert.equal(catalog.channels.length, 2);
      assert.ok(catalog.nextCursor);
      const nextCatalog = await fetch(`${api}/api/channels?limit=2&cursor=${encodeURIComponent(catalog.nextCursor)}`);
      assert.equal(nextCatalog.status, 200);
      assert.equal((await nextCatalog.json() as { channels: unknown[] }).channels.length, 2);

      const contentResponse = await fetch(`${api}/api/channels/after-hours/content`);
      assert.equal(contentResponse.status, 200);
      assert.equal((await contentResponse.json() as { segments: unknown[] }).segments.length, 4);

      const timelineResponse = await fetch(`${api}/api/channels/after-hours/now-playing`);
      assert.equal(timelineResponse.status, 200);
      const timeline = await timelineResponse.json() as { segment: { title: string }; offsetSeconds: number };
      assert.ok(timeline.segment.title);
      assert.ok(timeline.offsetSeconds >= 0);

      const episodesResponse = await fetch(`${api}/api/channels/ajn-podcasts/episodes?limit=1`);
      assert.equal(episodesResponse.status, 200);
      const episodes = await episodesResponse.json() as { episodes: Array<{ title: string }>; nextCursor: string | null };
      assert.equal(episodes.episodes.length, 1);
      assert.ok(episodes.nextCursor);

      const eventsAbort = new AbortController();
      const eventsResponse = await fetch(`${api}/api/channels/forma/events`, { signal: eventsAbort.signal });
      assert.equal(eventsResponse.status, 200);
      assert.match(eventsResponse.headers.get('content-type') ?? '', /text\/event-stream/);
      const reader = eventsResponse.body?.getReader();
      assert.ok(reader);
      const firstFrame = await reader.read();
      assert.match(new TextDecoder().decode(firstFrame.value), /event: now-playing/);

      const denied = await fetch(`${api}/api/ingest/channels/forma/now-playing`, {
        method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ title: 'Unauthorized' }),
      });
      assert.equal(denied.status, 401);
      const update = await fetch(`${api}/api/ingest/channels/forma/now-playing`, {
        method: 'POST', headers: { 'content-type': 'application/json', authorization: 'Bearer integration-token' },
        body: JSON.stringify({ title: 'Live API Test', artist: 'Integration Artist', album: 'Test Album' }),
      });
      assert.equal(update.status, 200);
      const liveMetadata = await (await fetch(`${api}/api/channels/forma/now-playing`)).json() as { title: string; artist: string };
      assert.equal(liveMetadata.title, 'Live API Test');
      assert.equal(liveMetadata.artist, 'Integration Artist');
      const pushedFrame = await Promise.race([
        reader.read(),
        new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Timed out waiting for live SSE metadata')), 3000)),
      ]);
      assert.match(new TextDecoder().decode(pushedFrame.value), /Live API Test/);

      // A2: an ingest call replaces the whole record; omitted artist/album must not keep the previous track's values.
      const ingest = (slug: string, body: unknown) => fetch(`${api}/api/ingest/channels/${slug}/now-playing`, {
        method: 'POST', headers: { 'content-type': 'application/json', authorization: 'Bearer integration-token' }, body: JSON.stringify(body),
      });
      assert.equal((await ingest('sundown-club', { title: 'Track One', artist: 'Artist One', album: 'Album One' })).status, 200);
      assert.equal((await ingest('sundown-club', { title: 'Track Two' })).status, 200);
      const replaced = await (await fetch(`${api}/api/channels/sundown-club/now-playing`)).json() as { title: string; artist: string | null; album: string | null };
      assert.equal(replaced.title, 'Track Two');
      assert.equal(replaced.artist, null);
      assert.equal(replaced.album, null);

      const settle = async (expected: number) => {
        const deadline = Date.now() + 3000;
        while (getSseConnectionCount() !== expected && Date.now() < deadline) await new Promise(resolve => setTimeout(resolve, 20));
        assert.equal(getSseConnectionCount(), expected);
      };
      const sseBaseline = getSseConnectionCount();

      // A3: even with an unchanged fingerprint, each new client gets an immediate frame.
      const lateAbort = new AbortController();
      try {
        const early = await fetch(`${api}/api/channels/daylight-fm/events`, { signal: lateAbort.signal });
        const earlyReader = early.body!.getReader();
        assert.match(new TextDecoder().decode((await earlyReader.read()).value), /event: now-playing/);
        const late = await fetch(`${api}/api/channels/daylight-fm/events`, { signal: lateAbort.signal });
        const lateReader = late.body!.getReader();
        const lateFrame = await Promise.race([
          lateReader.read(),
          new Promise<never>((_, reject) => { const timeout = setTimeout(() => reject(new Error('Late SSE joiner received no initial frame')), 2000); timeout.unref(); }),
        ]);
        assert.match(new TextDecoder().decode(lateFrame.value), /"type":"live"/);
      } finally {
        lateAbort.abort();
      }
      await settle(sseBaseline);

      // A4: unknown channels get a plain 404 and never register a subscriber.
      const connectionsBefore = getSseConnectionCount();
      const ghost = await fetch(`${api}/api/channels/does-not-exist/events`);
      assert.equal(ghost.status, 404);
      assert.match(ghost.headers.get('content-type') ?? '', /application\/json/);
      await ghost.text();
      assert.equal(getSseConnectionCount(), connectionsBefore);

      const inactive = await prisma.channel.create({
        data: { slug: 'inactive-events', name: 'Inactive Events', type: 'LIVE', streamUrl: 'https://audio.test/inactive', active: false },
      });
      const inactiveResponse = await fetch(`${api}/api/channels/${inactive.slug}/events`);
      assert.equal(inactiveResponse.status, 404);
      assert.equal(getSseConnectionCount(), connectionsBefore);

      // Connection cap: a full process refuses new streams with 503 + Retry-After.
      process.env.RADIO_MAX_SSE_CONNECTIONS = String(getSseConnectionCount());
      try {
        const capped = await fetch(`${api}/api/channels/forma/events`);
        assert.equal(capped.status, 503);
        assert.equal(capped.headers.get('retry-after'), '5');
        await capped.text();
      } finally {
        delete process.env.RADIO_MAX_SSE_CONNECTIONS;
      }

      const uncaughtErrors: unknown[] = [];
      const captureUncaught = (error: unknown) => uncaughtErrors.push(error);
      process.on('uncaughtExceptionMonitor', captureUncaught);
      await socketServer.stop();
      const waitForStatus = async (status: string) => {
        const deadline = Date.now() + 5000;
        while (getMetadataNotificationStatus() !== status && Date.now() < deadline) {
          await new Promise(resolve => setTimeout(resolve, 25));
        }
        assert.equal(getMetadataNotificationStatus(), status);
      };
      try {
        await waitForStatus('reconnecting');
        await socketServer.start();
        await waitForStatus('listening');
        const reconnectUpdate = await fetch(`${api}/api/ingest/channels/forma/now-playing`, {
          method: 'POST', headers: { 'content-type': 'application/json', authorization: 'Bearer integration-token' },
          body: JSON.stringify({ title: 'After reconnect', artist: 'Recovered Artist' }),
        });
        assert.equal(reconnectUpdate.status, 200);
        const reconnectFrame = await Promise.race([
          reader.read(),
          new Promise<never>((_, reject) => { const timeout = setTimeout(() => reject(new Error('Timed out waiting for SSE after LISTEN reconnect')), 3000); timeout.unref(); }),
        ]);
        assert.match(new TextDecoder().decode(reconnectFrame.value), /After reconnect/);
        assert.deepEqual(uncaughtErrors, []);

        // NOTIFY is not queued for a disconnected listener, so an update made while LISTEN is down
        // must still reach connected SSE clients once the listener reconnects.
        process.env.RADIO_LISTEN_PING_MS = '100';
        process.env.RADIO_LISTEN_PING_TIMEOUT_MS = '200';
        metadataListenerTestHooks.drop();
        await waitForStatus('reconnecting');
        await prisma.channel.update({
          where: { slug: 'forma' },
          data: { currentTitle: 'Missed during outage', currentArtist: null, currentAlbum: null, metadataUpdatedAt: new Date() },
        });
        await waitForStatus('listening');
        const resyncFrame = await Promise.race([
          reader.read(),
          new Promise<never>((_, reject) => { const timeout = setTimeout(() => reject(new Error('Timed out waiting for resync after LISTEN reconnect')), 4000); timeout.unref(); }),
        ]);
        assert.match(new TextDecoder().decode(resyncFrame.value), /Missed during outage/);

        // A connection that goes silent without emitting 'error' or 'end' must be caught by the ping.
        metadataListenerTestHooks.hang();
        await waitForStatus('reconnecting');
        await waitForStatus('listening');
        assert.deepEqual(uncaughtErrors, []);
      } finally {
        delete process.env.RADIO_LISTEN_PING_MS;
        delete process.env.RADIO_LISTEN_PING_TIMEOUT_MS;
        process.off('uncaughtExceptionMonitor', captureUncaught);
      }
      await reader.cancel();
      eventsAbort.abort();

      // Created right before use: the cycle is only 4 s long, so an earlier cycleStart would drift out of phase.
      await prisma.channel.create({
        data: {
          slug: 'integration-schedule', name: 'Integration Schedule', type: 'SIMULATED', cycleStart: new Date(Date.now() - 100),
          segments: { create: [
            { position: 0, title: 'Timer First', audioUrl: 'https://audio.test/timer-first.mp3', durationSeconds: 2 },
            { position: 1, title: 'Timer Second', audioUrl: 'https://audio.test/timer-second.mp3', durationSeconds: 2 },
          ] },
        },
      });
      const scheduleAbort = new AbortController();
      const scheduleResponse = await fetch(`${api}/api/channels/integration-schedule/events`, { signal: scheduleAbort.signal });
      const scheduleReader = scheduleResponse.body?.getReader();
      assert.ok(scheduleReader);
      const scheduleFirst = await scheduleReader.read();
      const firstTitle = /Timer (First|Second)/.exec(new TextDecoder().decode(scheduleFirst.value))?.[0];
      assert.ok(firstTitle, 'first schedule frame names a timed segment');
      const scheduleNext = await Promise.race([
        scheduleReader.read(),
        new Promise<never>((_, reject) => { const timeout = setTimeout(() => reject(new Error('Timed out waiting for scheduled track transition')), 4000); timeout.unref(); }),
      ]);
      const secondTitle = firstTitle === 'Timer First' ? 'Timer Second' : 'Timer First';
      assert.match(new TextDecoder().decode(scheduleNext.value), new RegExp(secondTitle));
      await scheduleReader.cancel();
      scheduleAbort.abort();

      // B6: database details stay in server logs, while API clients receive a generic 503.
      await prisma.$executeRawUnsafe('ALTER TABLE channels RENAME TO channels_temporarily_unavailable');
      try {
        const unavailable = await fetch(`${api}/api/channels/forma/now-playing`);
        assert.equal(unavailable.status, 503);
        const unavailableBody = await unavailable.json() as Record<string, unknown>;
        assert.equal(unavailableBody.detail, undefined);
        assert.deepEqual(unavailableBody, { error: 'Now-playing information is unavailable' });
      } finally {
        await prisma.$executeRawUnsafe('ALTER TABLE channels_temporarily_unavailable RENAME TO channels');
      }
    } finally {
      httpServer.closeAllConnections();
      await new Promise<void>((resolve, reject) => httpServer.close(error => error ? reject(error) : resolve()));
      await stopMetadataNotifications();
    }

    await assert.rejects(
      prisma.channel.create({ data: { slug: 'invalid-live', name: 'Invalid Live', type: 'LIVE' } }),
    );
  } finally {
    await prisma?.$disconnect();
    await wireClient.end().catch(() => undefined);
    await socketServer.stop().catch(() => undefined);
    await db.close();
    delete process.env.DATABASE_URL;
    delete process.env.RADIO_INGEST_TOKEN;
  }
});
