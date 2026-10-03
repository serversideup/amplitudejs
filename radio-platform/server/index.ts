import 'dotenv/config';
import cors from 'cors';
import express, { type Response } from 'express';
import { Client } from 'pg';
import { timingSafeEqual } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';
import { prisma } from './db.ts';
import { noindexMiddleware, previewAccessGate, robotsTxtHandler } from './preview.ts';
import { resolveTimelinePosition } from '../shared/timeline.ts';
import type { Channel as PrismaChannel, PodcastEpisode, RadioSegment } from '../src/generated/prisma/client.ts';

/** Production unless explicitly started in development (`npm run dev` passes --dev). */
export const isDevelopment = process.env.NODE_ENV === 'development' || process.argv.includes('--dev');

export const app = express();
const port = Number(process.env.PORT ?? 3000);
app.disable('x-powered-by');
app.use(noindexMiddleware());
app.use(previewAccessGate());
app.get('/robots.txt', robotsTxtHandler());
app.use(cors());
app.use(express.json({ limit: '32kb' }));

type ChannelWithOptionalContent = PrismaChannel & {
  segments?: RadioSegment[];
  episodes?: PodcastEpisode[];
};

function toChannelDto(channel: ChannelWithOptionalContent) {
  return {
    id: channel.id, slug: channel.slug, name: channel.name, description: channel.description,
    genre: channel.genre, city: channel.city, frequency: channel.frequency,
    type: String(channel.type).toLowerCase(), streamUrl: channel.streamUrl,
    cycleStart: channel.cycleStart, currentTitle: channel.currentTitle,
    currentArtist: channel.currentArtist, currentAlbum: channel.currentAlbum,
    segments: (channel.segments ?? []).map(segment => ({
      id: segment.id, position: segment.position, title: segment.title, artist: segment.artist,
      audioUrl: segment.audioUrl, durationSeconds: segment.durationSeconds,
    })),
    episodes: (channel.episodes ?? []).map(episode => ({
      id: episode.id, title: episode.title, description: episode.description,
      audioUrl: episode.audioUrl, durationSeconds: episode.durationSeconds, publishedAt: episode.publishedAt,
    })),
  };
}

function toEpisodeDto(episode: PodcastEpisode) {
  return {
    id: episode.id, title: episode.cleanTitle ?? episode.title, rawTitle: episode.rawTitle, description: episode.description, audioUrl: episode.audioUrl,
    durationSeconds: episode.durationSeconds, publishedAt: episode.publishedAt, airDate: episode.airDate ? episode.airDate.toISOString().slice(0, 10) : null,
    showSlug: episode.showSlug, showType: episode.showType, hourNumber: episode.hourNumber, variant: episode.variant, needsReview: episode.needsReview,
  };
}

export function ingestTokenMatches(expectedToken: string, authorization: string) {
  const expected = Buffer.from(`Bearer ${expectedToken}`, 'utf8');
  const received = Buffer.from(authorization, 'utf8');
  return expected.length === received.length && timingSafeEqual(expected, received);
}

function logApiFailure(context: string, error: unknown) {
  console.error(context, error);
}

app.get('/api/health', async (_req, res) => {
  try { await prisma.$queryRaw`SELECT 1`; res.json({ status: 'ok', database: 'connected', notifications: metadataListenerStatus }); }
  catch { res.status(503).json({ status: 'degraded', database: 'unavailable', notifications: metadataListenerStatus }); }
});

app.get('/api/channels', async (req, res) => {
  try {
    const parsedLimit = Number(req.query.limit ?? 100);
    const limit = Number.isInteger(parsedLimit) ? Math.min(100, Math.max(1, parsedLimit)) : 100;
    const cursor = typeof req.query.cursor === 'string' ? req.query.cursor : undefined;
    const channels = await prisma.channel.findMany({
      where: { active: true },
      take: limit + 1,
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
      orderBy: [{ name: 'asc' }, { id: 'asc' }],
    });
    const hasMore = channels.length > limit;
    const page = hasMore ? channels.slice(0, limit) : channels;
    res.setHeader('Cache-Control', 'public, max-age=10, stale-while-revalidate=30');
    res.json({ channels: page.map(toChannelDto), nextCursor: hasMore ? page[page.length - 1].id : null, serverTime: new Date().toISOString() });
  } catch (error) { logApiFailure('Radio catalog query failed', error); res.status(503).json({ error: 'Radio catalog is unavailable' }); }
});

app.get('/api/channels/:slug/content', async (req, res) => {
  try {
    const channel = await prisma.channel.findFirst({ where: { slug: req.params.slug, active: true }, include: { segments: { orderBy: { position: 'asc' } } } });
    if (!channel) return res.status(404).json({ error: 'Channel not found' });
    res.setHeader('Cache-Control', 'public, max-age=30, stale-while-revalidate=60');
    res.json({ segments: channel.segments.map(segment => ({ id: segment.id, position: segment.position, title: segment.title, artist: segment.artist, audioUrl: segment.audioUrl, durationSeconds: segment.durationSeconds })) });
  } catch (error) { logApiFailure('Channel content query failed', error); res.status(503).json({ error: 'Channel content is unavailable' }); }
});

const episodeOrder = [{ airDate: { sort: 'desc', nulls: 'last' } }, { publishedAt: 'desc' }, { hourNumber: 'desc' }, { id: 'asc' }] as const;
const episodeFilterSchema = z.object({ show: z.string().max(64).regex(/^[a-z0-9-]+$/).optional(), type: z.enum(['full_show', 'hour', 'segment', 'special', 'live']).optional() });

app.get('/api/channels/:slug/episodes', async (req, res) => {
  try {
    const limitParam = Number(req.query.limit ?? 24);
    const limit = Number.isInteger(limitParam) ? Math.min(100, Math.max(1, limitParam)) : 24;
    const cursor = typeof req.query.cursor === 'string' ? req.query.cursor : undefined;
    const filters = episodeFilterSchema.safeParse({ show: req.query.show, type: req.query.type });
    if (!filters.success) return res.status(400).json({ error: 'Invalid show or type filter' });
    const channel = await prisma.channel.findFirst({ where: { slug: req.params.slug, active: true, type: 'ON_DEMAND' }, select: { id: true } });
    if (!channel) return res.status(404).json({ error: 'Podcast channel not found' });
    const episodes = await prisma.podcastEpisode.findMany({
      where: { channelId: channel.id, ...(filters.data.show ? { showSlug: filters.data.show } : {}), ...(filters.data.type ? { showType: filters.data.type } : {}) },
      take: limit + 1,
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
      orderBy: [...episodeOrder],
    });
    const hasMore = episodes.length > limit;
    const page = (hasMore ? episodes.slice(0, limit) : episodes).map(toEpisodeDto);
    res.setHeader('Cache-Control', 'public, max-age=30, stale-while-revalidate=60');
    res.json({ episodes: page, nextCursor: hasMore ? page[page.length - 1].id : null });
  } catch (error) { logApiFailure('Podcast episode query failed', error); res.status(503).json({ error: 'Podcast episodes are unavailable' }); }
});

app.get('/api/channels/:slug/episodes/facets', async (req, res) => {
  try {
    const channel = await prisma.channel.findFirst({ where: { slug: req.params.slug, active: true, type: 'ON_DEMAND' }, select: { id: true } });
    if (!channel) return res.status(404).json({ error: 'Podcast channel not found' });
    const groups = await prisma.podcastEpisode.groupBy({ by: ['showSlug', 'showType'], where: { channelId: channel.id }, _count: { _all: true } });
    res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=120');
    res.json({ facets: groups.map(group => ({ show: group.showSlug, type: group.showType, count: group._count._all })) });
  } catch (error) { logApiFailure('Episode facets query failed', error); res.status(503).json({ error: 'Episode facets are unavailable' }); }
});

app.get('/api/sources', async (_req, res) => {
  try {
    const [sources, counts] = await Promise.all([
      prisma.contentSource.findMany({ orderBy: { slug: 'asc' } }),
      prisma.podcastEpisode.groupBy({ by: ['source'], where: { source: { not: null } }, _count: { _all: true } }),
    ]);
    const review = await prisma.podcastEpisode.groupBy({ by: ['source'], where: { source: { not: null }, needsReview: true }, _count: { _all: true } });
    const countOf = (rows: typeof counts, slug: string) => rows.find(row => row.source === slug)?._count._all ?? 0;
    res.setHeader('Cache-Control', 'no-store');
    res.json({ sources: sources.map(source => ({
      slug: source.slug, name: source.name, feedUrl: source.feedUrl, enabled: source.enabled, lastSyncAt: source.lastSyncAt, lastStatus: source.lastStatus,
      lastError: source.lastError, episodes: countOf(counts, source.slug), needsReview: countOf(review, source.slug),
    })) });
  } catch (error) { logApiFailure('Sources query failed', error); res.status(503).json({ error: 'Source status is unavailable' }); }
});

class ChannelNotFoundError extends Error {}
/** A channel row exists but cannot produce a playable position (e.g. a simulated channel without timed segments). */
class ChannelConfigError extends Error {}

async function resolveNowPlaying(slug: string) {
  const channel = await prisma.channel.findUnique({ where: { slug }, include: { segments: { orderBy: { position: 'asc' } } } });
  if (!channel || !channel.active) return null;
  if (channel.type === 'SIMULATED') {
    if (!channel.cycleStart || !channel.segments.length) throw new ChannelConfigError('Simulated channel has no cycle start or timed segments');
    const timeline = resolveTimelinePosition(channel.segments.map(segment => ({
      id: segment.id, position: segment.position, title: segment.title, artist: segment.artist,
      audioUrl: segment.audioUrl, durationSeconds: segment.durationSeconds,
    })), channel.cycleStart);
    if (!timeline) throw new ChannelConfigError('Simulated channel has no valid timed segments');
    return { type: 'simulated', ...timeline, serverTime: new Date().toISOString() };
  }
  return {
    type: String(channel.type).toLowerCase(), title: channel.currentTitle,
    artist: channel.currentArtist, album: channel.currentAlbum,
    metadataUpdatedAt: channel.metadataUpdatedAt, serverTime: new Date().toISOString(),
  };
}

app.get('/api/channels/:slug/now-playing', async (req, res) => {
  try {
    const nowPlaying = await resolveNowPlaying(req.params.slug);
    if (!nowPlaying) return res.status(404).json({ error: 'Channel not found' });
    res.setHeader('Cache-Control', 'no-store');
    res.json(nowPlaying);
  } catch (error) {
    if (error instanceof ChannelConfigError) return res.status(409).json({ error: 'Channel is not configured for playback' });
    logApiFailure('Now-playing query failed', error);
    return res.status(503).json({ error: 'Now-playing information is unavailable' });
  }
});

const subscribers = new Map<string, Set<Response>>();
const timers = new Map<string, ReturnType<typeof setTimeout> | null>();
const fingerprints = new Map<string, string>();
let metadataListener: Client | null = null;
let metadataListenerEnabled = false;
let metadataListenerRetry: ReturnType<typeof setTimeout> | null = null;
let metadataListenerStatus: 'listening' | 'reconnecting' | 'off' = 'off';
let metadataListenerRetryAttempt = 0;
let metadataListenerOutageLogged = false;
let metadataListenerPing: ReturnType<typeof setInterval> | null = null;
const listenerPingMs = () => Number(process.env.RADIO_LISTEN_PING_MS ?? 30_000);
const listenerPingTimeoutMs = () => Number(process.env.RADIO_LISTEN_PING_TIMEOUT_MS ?? 5_000);
const listenerConnectTimeoutMs = () => Number(process.env.RADIO_LISTEN_CONNECT_TIMEOUT_MS ?? 10_000);

function stopMetadataListenerPing() {
  if (metadataListenerPing) clearInterval(metadataListenerPing);
  metadataListenerPing = null;
}

/** Detects half-open connections (e.g. a silent NAT or proxy drop) that never emit 'error' or 'end'. */
function startMetadataListenerPing(client: Client, onFailure: (error?: Error) => void) {
  stopMetadataListenerPing();
  const interval = listenerPingMs();
  if (!(interval > 0)) return;
  let inFlight = false;
  metadataListenerPing = setInterval(() => {
    if (inFlight || metadataListener !== client) return;
    inFlight = true;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error('LISTEN connection ping timed out')), listenerPingTimeoutMs());
    });
    Promise.race([client.query('SELECT 1'), timeout])
      .catch(error => onFailure(error as Error))
      .finally(() => { if (timer) clearTimeout(timer); inFlight = false; });
  }, interval);
  metadataListenerPing.unref?.();
}

/** Ends a LISTEN client and destroys its socket so a hung connection cannot leak. */
function discardListenerClient(client: Client) {
  void client.end().catch(() => undefined);
  const stream = (client as unknown as { connection?: { stream?: { destroy: () => void } } }).connection?.stream;
  try { stream?.destroy(); } catch { /* socket already closed */ }
}

/** NOTIFY messages are not queued for a disconnected listener, so re-send current state after any reconnect. */
function resyncSubscribedChannels() {
  for (const slug of subscribers.keys()) void broadcast(slug);
}

/** Test-only: simulate a dropped or hung LISTEN connection without stopping the database. */
export const metadataListenerTestHooks = {
  drop() {
    const stream = (metadataListener as unknown as { connection?: { stream?: { destroy: (error?: Error) => void } } } | null)?.connection?.stream;
    stream?.destroy(new Error('simulated connection drop'));
  },
  hang() {
    if (metadataListener) (metadataListener as unknown as { query: () => Promise<never> }).query = () => new Promise<never>(() => undefined);
  },
};

function scheduleMetadataListenerReconnect() {
  if (!metadataListenerEnabled || metadataListenerRetry) return;
  metadataListenerStatus = 'reconnecting';
  const baseDelayMs = Math.min(30_000, 500 * 2 ** metadataListenerRetryAttempt++);
  const delayMs = Math.round(baseDelayMs * (0.75 + Math.random() * 0.5));
  metadataListenerRetry = setTimeout(() => {
    metadataListenerRetry = null;
    void connectMetadataListener();
  }, delayMs);
  metadataListenerRetry.unref?.();
}

async function connectMetadataListener() {
  if (!metadataListenerEnabled || metadataListener) return;
  metadataListenerStatus = 'reconnecting';
  const client = new Client({
    connectionString: process.env.DATABASE_URL ?? 'postgresql://radio:radio@localhost:5432/ajn_radio?schema=public',
    keepAlive: true,
    keepAliveInitialDelayMillis: 10_000,
    connectionTimeoutMillis: listenerConnectTimeoutMs(),
  });
  metadataListener = client;
  const onFailure = (error?: Error) => {
    if (metadataListener !== client) return;
    metadataListener = null;
    stopMetadataListenerPing();
    if (error && !metadataListenerOutageLogged) {
      console.warn('Cross-instance live metadata notifications are unavailable; reconnecting.', error.message);
      metadataListenerOutageLogged = true;
    }
    discardListenerClient(client);
    scheduleMetadataListenerReconnect();
  };
  client.on('error', onFailure);
  client.on('end', () => onFailure());
  try {
    await client.connect();
    if (!metadataListenerEnabled || metadataListener !== client) {
      await client.end().catch(() => undefined);
      return;
    }
    await client.query('LISTEN radio_metadata');
    if (!metadataListenerEnabled || metadataListener !== client) {
      await client.end().catch(() => undefined);
      return;
    }
    client.on('notification', notification => {
      if (notification.channel === 'radio_metadata' && notification.payload) void broadcast(notification.payload);
    });
    metadataListenerStatus = 'listening';
    metadataListenerRetryAttempt = 0;
    if (metadataListenerOutageLogged) console.info('Cross-instance live metadata notifications reconnected.');
    metadataListenerOutageLogged = false;
    startMetadataListenerPing(client, onFailure);
    resyncSubscribedChannels();
  } catch (error) {
    onFailure(error as Error);
  }
}

type NowPlayingResult = NonNullable<Awaited<ReturnType<typeof resolveNowPlaying>>>;

function fingerprintOf(nowPlaying: NowPlayingResult) {
  return 'segmentIndex' in nowPlaying
    ? JSON.stringify([nowPlaying.segmentIndex, nowPlaying.segment?.id, nowPlaying.segment?.title, nowPlaying.segment?.artist])
    : JSON.stringify([nowPlaying.title, nowPlaying.artist, nowPlaying.album, nowPlaying.metadataUpdatedAt]);
}
const nowPlayingFrame = (nowPlaying: NowPlayingResult) => `event: now-playing\ndata: ${JSON.stringify(nowPlaying)}\n\n`;
const errorFrame = (message: string) => `event: error\ndata: ${JSON.stringify({ error: message })}\n\n`;
/**
 * The frame a newly connected client receives. It is always produced for that client,
 * independent of the fan-out fingerprint, so a late joiner never waits for the next change.
 * Resolve on every connection so deactivated channels cannot be served from stale cache.
 */
async function initialFrameFor(slug: string): Promise<string> {
  const nowPlaying = await resolveNowPlaying(slug);
  if (!nowPlaying) throw new ChannelNotFoundError('Channel not found');
  const frame = nowPlayingFrame(nowPlaying);
  if (!fingerprints.has(slug)) fingerprints.set(slug, fingerprintOf(nowPlaying));
  return frame;
}

async function broadcast(slug: string) {
  const channelClients = subscribers.get(slug);
  if (!channelClients?.size) return;
  try {
    const nowPlaying = await resolveNowPlaying(slug);
    if (!nowPlaying) throw new ChannelNotFoundError('Channel not found');
    const fingerprint = fingerprintOf(nowPlaying);
    if (fingerprints.get(slug) === fingerprint) return;
    fingerprints.set(slug, fingerprint);
    const frame = nowPlayingFrame(nowPlaying);
    channelClients.forEach(client => { if (!client.writableEnded) client.write(frame); });
  } catch (error) {
    const frame = errorFrame((error as Error).message);
    channelClients.forEach(client => { if (!client.writableEnded) client.write(frame); });
  }
}

export async function startMetadataNotifications() {
  if (metadataListenerEnabled) return;
  metadataListenerEnabled = true;
  await connectMetadataListener();
}

export async function stopMetadataNotifications() {
  metadataListenerEnabled = false;
  metadataListenerStatus = 'off';
  metadataListenerRetryAttempt = 0;
  metadataListenerOutageLogged = false;
  stopMetadataListenerPing();
  if (metadataListenerRetry) clearTimeout(metadataListenerRetry);
  metadataListenerRetry = null;
  const client = metadataListener;
  metadataListener = null;
  if (client) await client.end().catch(() => undefined);
}

export function getMetadataNotificationStatus() { return metadataListenerStatus; }

async function scheduleNextUpdate(slug: string) {
  if (timers.has(slug) || !subscribers.get(slug)?.size) return;
  timers.set(slug, null);
  try {
    const nowPlaying = await resolveNowPlaying(slug);
    if (!subscribers.get(slug)?.size) { timers.delete(slug); return; }
    if (!nowPlaying || !('segment' in nowPlaying)) { timers.delete(slug); return; }
    const remainingSeconds = nowPlaying.segment.durationSeconds - nowPlaying.offsetSeconds;
    const delayMs = Math.max(250, remainingSeconds * 1000);
    const timer = setTimeout(() => {
      timers.delete(slug);
      void broadcast(slug).then(() => scheduleNextUpdate(slug));
    }, delayMs);
    timers.set(slug, timer);
  } catch {
    timers.delete(slug);
  }
}

let sseConnectionCount = 0;
export function getSseConnectionCount() { return sseConnectionCount; }

app.get('/api/channels/:slug/events', async (req, res) => {
  const slug = req.params.slug;
  if (sseConnectionCount >= Number(process.env.RADIO_MAX_SSE_CONNECTIONS ?? 5000)) {
    res.setHeader('Retry-After', '5');
    return res.status(503).json({ error: 'Too many live connections' });
  }
  // Resolve before opening the stream: unknown channels get a plain 404 instead of a stream that never ends.
  let initialFrame: string;
  try { initialFrame = await initialFrameFor(slug); }
  catch (error) {
    if (error instanceof ChannelNotFoundError) return res.status(404).json({ error: 'Channel not found' });
    if (!(error instanceof ChannelConfigError)) {
      console.error('Live updates unavailable', error);
      return res.status(503).json({ error: 'Live updates are unavailable' });
    }
    initialFrame = errorFrame(error.message);
  }
  if (res.destroyed) return;
  res.status(200).set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  });
  res.flushHeaders();
  let channelClients = subscribers.get(slug);
  if (!channelClients) { channelClients = new Set<Response>(); subscribers.set(slug, channelClients); }
  channelClients.add(res);
  sseConnectionCount++;
  const heartbeat = setInterval(() => { if (!res.writableEnded) res.write(': keepalive\n\n'); }, 25000);
  res.on('close', () => {
    clearInterval(heartbeat);
    sseConnectionCount--;
    const clients = subscribers.get(slug);
    clients?.delete(res);
    if (!clients?.size) {
      subscribers.delete(slug); fingerprints.delete(slug);
      const timer = timers.get(slug);
      if (timer) clearTimeout(timer);
      timers.delete(slug);
    }
  });
  res.write(initialFrame);
  void scheduleNextUpdate(slug);
});

const liveMetadataSchema = z.object({
  title: z.string().trim().min(1).max(255),
  artist: z.string().trim().max(255).optional(),
  album: z.string().trim().max(255).optional(),
});

app.post('/api/ingest/channels/:slug/now-playing', async (req, res) => {
  const expectedToken = process.env.RADIO_INGEST_TOKEN;
  if (!expectedToken) return res.status(503).json({ error: 'Metadata ingest is not configured' });
  if (!ingestTokenMatches(expectedToken, req.get('authorization') ?? '')) return res.status(401).json({ error: 'Unauthorized' });
  const parsed = liveMetadataSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  try {
    const existing = await prisma.channel.findUnique({ where: { slug: req.params.slug }, select: { type: true } });
    if (!existing) return res.status(404).json({ error: 'Channel not found' });
    if (existing.type !== 'LIVE') return res.status(409).json({ error: 'Metadata ingest is for live channels only' });
    const channel = await prisma.channel.update({
      where: { slug: req.params.slug },
      // An ingest call replaces the whole now-playing record: Prisma ignores undefined, so omitted fields must be written as null.
      data: { currentTitle: parsed.data.title, currentArtist: parsed.data.artist ?? null, currentAlbum: parsed.data.album ?? null, metadataUpdatedAt: new Date() },
    });
    await prisma.$queryRaw`SELECT pg_notify('radio_metadata', ${channel.slug}) IS NULL AS notified`;
    void broadcast(channel.slug);
    res.json({ updated: true });
  } catch (error) { logApiFailure('Live metadata ingest failed', error); res.status(503).json({ error: 'Live metadata could not be published' }); }
});

async function start() {
  if (!isDevelopment) {
    app.use(express.static(path.resolve('dist')));
    app.get('*', (_req, res) => res.sendFile(path.resolve('dist/index.html')));
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  }
  await startMetadataNotifications();
  const server = app.listen(port, '0.0.0.0', () => console.info(`AJN Radio ready on http://localhost:${port}`));
  installGracefulShutdown(server);
}

/** Closes SSE streams and database connections on SIGTERM/SIGINT (Cloud Run gives ~10s). */
export async function shutdownGracefully(server: { close: (callback: (error?: Error) => void) => void; closeAllConnections?: () => void }) {
  const closed = new Promise<void>(resolve => server.close(() => resolve()));
  for (const clients of subscribers.values()) clients.forEach(client => { if (!client.writableEnded) client.end(); });
  for (const timer of timers.values()) if (timer) clearTimeout(timer);
  await stopMetadataNotifications().catch(() => undefined);
  server.closeAllConnections?.();
  await closed;
  await prisma.$disconnect().catch(() => undefined);
}

function installGracefulShutdown(server: Parameters<typeof shutdownGracefully>[0]) {
  let stopping = false;
  const handler = (signal: string) => {
    if (stopping) return;
    stopping = true;
    console.info(`${signal} received; shutting down`);
    const force = setTimeout(() => process.exit(1), 8000);
    force.unref();
    void shutdownGracefully(server).then(() => process.exit(0), () => process.exit(1));
  };
  process.once('SIGTERM', () => handler('SIGTERM'));
  process.once('SIGINT', () => handler('SIGINT'));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  start().catch(error => { console.error('Unable to start AJN Radio', error); process.exitCode = 1; });
}
