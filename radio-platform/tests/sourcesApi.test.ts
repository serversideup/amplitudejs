import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { once } from 'node:events';
import { createServer, type AddressInfo } from 'node:net';
import { test } from 'node:test';
import { Client } from 'pg';
import { PGlite } from '@electric-sql/pglite';
import { PGLiteSocketServer } from '@electric-sql/pglite-socket';

const fixture = (name: string) => readFileSync(new URL(`./fixtures/feeds/${name}.sample.xml`, import.meta.url), 'utf8');
const migrationsDir = new URL('../prisma/migrations/', import.meta.url);

test('imported content is served by /api/channels/:slug/episodes (order, filters, pagination), facets and /api/sources', async () => {
  const db = await PGlite.create();
  const probe = createServer(); probe.listen(0, '127.0.0.1'); await once(probe, 'listening');
  const port = (probe.address() as AddressInfo).port;
  await new Promise<void>(resolve => probe.close(() => resolve()));
  const socketServer = new PGLiteSocketServer({ db, host: '127.0.0.1', port, maxConnections: 8 });
  const connectionString = `postgresql://postgres:postgres@127.0.0.1:${port}/postgres?sslmode=disable`;
  const wire = new Client({ connectionString }); wire.on('error', () => undefined);
  const server = { http: undefined as import('node:http').Server | undefined };
  try {
    await socketServer.start(); await wire.connect();
    for (const dir of readdirSync(migrationsDir).filter(name => /^\d+_/.test(name)).sort()) await wire.query(readFileSync(new URL(`${dir}/migration.sql`, migrationsDir), 'utf8'));
    process.env.DATABASE_URL = connectionString;
    const { app } = await import('../server/index.ts');
    const { prisma } = await import('../server/db.ts');
    const { syncAllSources, FEED_SOURCES } = await import('../server/sources/sync.ts');
    const bodies: Record<string, string> = {
      'https://rss.alexjones.media/Alex.xml': fixture('Alex'), 'https://rss.alexjones.media/WarRoom.xml': fixture('WarRoom'),
      'https://rss.alexjones.media/SundayLive.xml': fixture('SundayLive'), 'https://rss.alexjones.media/AJNHourlyAudio.xml': fixture('AJNHourlyAudio'),
    };
    const reports = await syncAllSources({ prisma, sources: FEED_SOURCES, fetchImpl: (async (url: string) => new Response(bodies[String(url)] ?? '', { status: bodies[String(url)] ? 200 : 404 })) as typeof fetch });
    assert.deepEqual(reports.map(report => report.status), ['ok', 'ok', 'ok', 'ok']);

    server.http = app.listen(0, '127.0.0.1'); await once(server.http, 'listening');
    const base = `http://127.0.0.1:${(server.http.address() as AddressInfo).port}`;
    const get = async (path: string) => { const response = await fetch(base + path); return { status: response.status, body: await response.json() as any }; };

    const all = await get('/api/channels/ajn-radio/episodes?limit=100');
    assert.equal(all.status, 200);
    const dates = all.body.episodes.map((episode: any) => episode.airDate).filter(Boolean);
    assert.deepEqual(dates, [...dates].sort().reverse(), 'newest air date first');
    assert.ok(all.body.episodes.every((episode: any) => episode.showSlug && episode.showType && episode.audioUrl.startsWith('https://archive.alexjoneslive.com/')));
    assert.ok(!all.body.episodes.some((episode: any) => episode.variant === 'Special'), 'specials live in the exclusive channel');

    const warRoom = await get('/api/channels/ajn-radio/episodes?show=war-room&limit=100');
    assert.ok(warRoom.body.episodes.length > 0 && warRoom.body.episodes.every((episode: any) => episode.showSlug === 'war-room'));
    const hours = await get('/api/channels/ajn-radio/episodes?type=hour&limit=100');
    assert.ok(hours.body.episodes.length > 0 && hours.body.episodes.every((episode: any) => episode.showType === 'hour' && episode.hourNumber !== null));

    const exclusive = await get('/api/channels/ajn-exclusive/episodes');
    assert.equal(exclusive.body.episodes.length, 1);
    assert.equal(exclusive.body.episodes[0].showType, 'special');

    assert.equal((await get('/api/channels/ajn-radio/episodes?type=bogus')).status, 400);
    assert.equal((await get('/api/channels/ajn-radio/episodes?show=Bad%20Value!')).status, 400);
    assert.equal((await get('/api/channels/nope/episodes')).status, 404);

    const seen = new Set<string>(); let cursor: string | null = null; let pages = 0;
    do {
      const page: { body: { episodes: Array<{ id: string }>; nextCursor: string | null } } = await get(`/api/channels/ajn-radio/episodes?limit=5${cursor ? `&cursor=${cursor}` : ''}`);
      for (const episode of page.body.episodes) { assert.ok(!seen.has(episode.id), 'no duplicates across pages'); seen.add(episode.id); }
      cursor = page.body.nextCursor; pages += 1;
    } while (cursor && pages < 20);
    assert.equal(seen.size, all.body.episodes.length);
    assert.ok(pages > 1);

    const facets = await get('/api/channels/ajn-radio/episodes/facets');
    assert.equal(facets.body.facets.reduce((sum: number, facet: any) => sum + facet.count, 0), all.body.episodes.length);
    assert.ok(facets.body.facets.some((facet: any) => facet.show === 'war-room' && facet.type === 'hour'));

    const sources = await get('/api/sources');
    assert.equal(sources.body.sources.length, 4);
    assert.ok(sources.body.sources.every((source: any) => source.lastStatus === 'ok' && source.episodes > 0 && source.lastSyncAt));
    assert.ok(!JSON.stringify(sources.body).includes('etag'));
  } finally {
    server.http?.closeAllConnections(); await new Promise<void>(resolve => server.http ? server.http.close(() => resolve()) : resolve());
    const { prisma } = await import('../server/db.ts'); await prisma.$disconnect().catch(() => undefined);
    const { stopMetadataNotifications } = await import('../server/index.ts'); await stopMetadataNotifications().catch(() => undefined);
    await wire.end().catch(() => undefined); await socketServer.stop().catch(() => undefined); await db.close().catch(() => undefined);
  }
});
