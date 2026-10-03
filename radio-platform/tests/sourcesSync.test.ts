import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { once } from 'node:events';
import { createServer } from 'node:net';
import { test } from 'node:test';
import { Client } from 'pg';
import { PGlite } from '@electric-sql/pglite';
import { PGLiteSocketServer } from '@electric-sql/pglite-socket';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.ts';
import { syncAllSources, syncSource, type FeedSource } from '../server/sources/sync.ts';

const fixture = (name: string) => readFileSync(new URL(`./fixtures/feeds/${name}.sample.xml`, import.meta.url), 'utf8');
const migrationsDir = new URL('../prisma/migrations/', import.meta.url);

type Served = { status?: number; body?: string; etag?: string };
function fakeFetch(routes: Map<string, Served>, calls: Array<{ url: string; headers: Record<string, string> }> = []): typeof fetch {
  return (async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input);
    const headers = (init?.headers ?? {}) as Record<string, string>;
    calls.push({ url, headers });
    const served = routes.get(url);
    if (!served) return new Response('missing', { status: 404 });
    if (served.etag && headers['if-none-match'] === served.etag) return new Response(null, { status: 304 });
    return new Response(served.body ?? '', { status: served.status ?? 200, headers: served.etag ? { etag: served.etag } : {} });
  }) as typeof fetch;
}

test('AJN feed sync: import, idempotency, 304, missing/restored, and failure safety (real Postgres engine via PGlite)', async () => {
  const db = await PGlite.create();
  const probe = createServer(); probe.listen(0, '127.0.0.1'); await once(probe, 'listening');
  const port = (probe.address() as { port: number }).port;
  await new Promise<void>(resolve => probe.close(() => resolve()));
  const socketServer = new PGLiteSocketServer({ db, host: '127.0.0.1', port, maxConnections: 8 });
  const connectionString = `postgresql://postgres:postgres@127.0.0.1:${port}/postgres?sslmode=disable`;
  const wire = new Client({ connectionString }); wire.on('error', () => undefined);
  let prisma: PrismaClient | undefined;
  try {
    await socketServer.start(); await wire.connect();
    for (const dir of readdirSync(migrationsDir).filter(name => /^\d+_/.test(name)).sort()) {
      await wire.query(readFileSync(new URL(`${dir}/migration.sql`, migrationsDir), 'utf8'));
    }
    prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

    const alex: FeedSource = { slug: 'ajn-alex', name: 'Alex Jones Show', feedUrl: 'https://rss.alexjones.media/Alex.xml' };
    const routes = new Map<string, Served>([[alex.feedUrl, { body: fixture('Alex'), etag: '"v1"' }]]);
    const calls: Array<{ url: string; headers: Record<string, string> }> = [];
    const options = { prisma, fetchImpl: fakeFetch(routes, calls), now: () => new Date('2026-10-02T12:00:00Z'), sources: [alex] };

    // 1. first import
    const first = await syncSource(alex, options);
    assert.equal(first.status, 'ok');
    assert.equal(first.itemCount, 7);
    assert.equal(first.newCount, 7);
    assert.equal(first.reviewCount, 0);
    assert.equal(await prisma.podcastEpisode.count({ where: { source: 'ajn-alex' } }), 7);
    const radio = await prisma.channel.findUnique({ where: { slug: 'ajn-radio' } });
    const exclusive = await prisma.channel.findUnique({ where: { slug: 'ajn-exclusive' } });
    assert.equal(radio?.type, 'ON_DEMAND');
    assert.equal(await prisma.podcastEpisode.count({ where: { channelId: exclusive!.id } }), 1);
    assert.equal(await prisma.podcastEpisode.count({ where: { channelId: radio!.id } }), 6);
    const newest = await prisma.podcastEpisode.findFirstOrThrow({ where: { source: 'ajn-alex' }, orderBy: { airDate: 'desc' } });
    assert.equal(newest.cleanTitle, 'Alex Jones — Fri Oct 2, 2026');
    assert.equal(newest.rawTitle, 'Alex Jones 2026-Oct-02 Friday');
    assert.equal(newest.airDate?.toISOString().slice(0, 10), '2026-10-02');
    assert.equal(newest.showSlug, 'alex-jones');
    assert.equal(newest.showType, 'full_show');
    assert.equal(newest.durationSeconds, null); // the feed gives no duration; never invent one
    const status = await prisma.contentSource.findUniqueOrThrow({ where: { slug: 'ajn-alex' } });
    assert.equal(status.lastStatus, 'ok');
    assert.equal(status.etag, '"v1"');

    // 2. conditional request: 304 changes nothing
    const second = await syncSource(alex, options);
    assert.equal(second.status, 'not_modified');
    assert.equal(calls.at(-1)?.headers['if-none-match'], '"v1"');
    assert.equal(await prisma.podcastEpisode.count({ where: { source: 'ajn-alex' } }), 7);

    // 3. changed etag, same content: idempotent, no new rows
    routes.set(alex.feedUrl, { body: fixture('Alex'), etag: '"v2"' });
    const third = await syncSource(alex, options);
    assert.equal(third.status, 'ok');
    assert.equal(third.newCount, 0);
    assert.equal(await prisma.podcastEpisode.count({ where: { source: 'ajn-alex' } }), 7);

    // 4. item disappears from the feed -> kept but marked missing; then restored
    const without = fixture('Alex').replace(/<item>(?:(?!<\/item>).)*20261002_Fri_Alex\.mp3(?:(?!<\/item>).)*<\/item>/s, '');
    assert.notEqual(without, fixture('Alex'));
    routes.set(alex.feedUrl, { body: without, etag: '"v3"' });
    const fourth = await syncSource(alex, options);
    assert.equal(fourth.markedMissing, 1);
    assert.equal(await prisma.podcastEpisode.count({ where: { source: 'ajn-alex' } }), 7);
    assert.ok((await prisma.podcastEpisode.findFirstOrThrow({ where: { guid: '20261002_Fri_Alex.mp3' } })).missingSince);
    routes.set(alex.feedUrl, { body: fixture('Alex'), etag: '"v4"' });
    await syncSource(alex, options);
    assert.equal((await prisma.podcastEpisode.findFirstOrThrow({ where: { guid: '20261002_Fri_Alex.mp3' } })).missingSince, null);

    // 5. failures never damage existing data and are recorded honestly
    for (const [label, served, expected] of [
      ['http 500', { status: 500, body: 'boom' }, /HTTP 500/],
      ['not rss', { body: '<html>nope</html>' }, /Not an RSS feed/],
      ['oversize', { body: fixture('Alex') }, /exceeded|too large/],
    ] as const) {
      routes.set(alex.feedUrl, served);
      const report = await syncSource(alex, { ...options, maxBytes: label === 'oversize' ? 100 : undefined });
      assert.equal(report.status, 'error', label);
      assert.match(report.error ?? '', expected, label);
      assert.equal(await prisma.podcastEpisode.count({ where: { source: 'ajn-alex' } }), 7, `${label} must not delete rows`);
    }
    assert.equal((await prisma.contentSource.findUniqueOrThrow({ where: { slug: 'ajn-alex' } })).lastStatus, 'error');

    // 6. enclosure host allowlist: an item pointing elsewhere is skipped; a feed of only bad hosts is an error, not a wipe
    const mixed = fixture('Alex').replace('https://archive.alexjoneslive.com/rss/20261002_Fri_Alex.mp3', 'https://evil.example/20261002_Fri_Alex.mp3');
    routes.set(alex.feedUrl, { body: mixed, etag: '"v5"' });
    const sixth = await syncSource(alex, options);
    assert.equal(sixth.skippedBadHost, 1);
    assert.equal(sixth.itemCount, 6);
    assert.equal(await prisma.podcastEpisode.count({ where: { audioUrl: { contains: 'evil.example' } } }), 0);
    routes.set(alex.feedUrl, { body: fixture('Alex').replaceAll('archive.alexjoneslive.com', 'evil.example') });
    assert.equal((await syncSource(alex, options)).status, 'error');
    assert.ok(await prisma.podcastEpisode.count({ where: { source: 'ajn-alex' } }) >= 6);

    // 7. non-https / non-allowlisted feed URL is refused without a request
    const before = calls.length;
    const rogue: FeedSource = { slug: 'rogue', name: 'Rogue', feedUrl: 'http://rss.alexjones.media/Alex.xml' };
    assert.equal((await syncSource(rogue, options)).status, 'error');
    assert.equal(calls.length, before);

    // 8. hourly feed + disabled source; all four feeds in one run
    await prisma.contentSource.update({ where: { slug: 'ajn-alex' }, data: { enabled: false } });
    const sources: FeedSource[] = [alex, { slug: 'ajn-hourly-audio', name: 'AJN Hourly Audio', feedUrl: 'https://rss.alexjones.media/AJNHourlyAudio.xml' }];
    routes.set(sources[1].feedUrl, { body: fixture('AJNHourlyAudio') });
    const reports = await syncAllSources({ ...options, sources });
    assert.deepEqual(reports.map(report => report.status), ['disabled', 'ok']);
    const hour = await prisma.podcastEpisode.findFirstOrThrow({ where: { guid: '20261002_Fri_WarRoom-Hr3.mp3' } });
    assert.equal(hour.showType, 'hour'); assert.equal(hour.hourNumber, 3); assert.equal(hour.showSlug, 'war-room');
  } finally {
    await prisma?.$disconnect().catch(() => undefined);
    await wire.end().catch(() => undefined);
    await socketServer.stop().catch(() => undefined);
    await db.close().catch(() => undefined);
  }
});
