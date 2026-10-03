import type { PrismaClient } from '../../src/generated/prisma/client.ts';
import { channelSlugFor, classifyItem, parseFeedXml, type ClassifiedItem } from './ajn.ts';

export type FeedSource = { slug: string; name: string; feedUrl: string };

/** The AJN feeds. Affiliate directories are intentionally NOT here: no usage permission has been confirmed. */
export const FEED_SOURCES: FeedSource[] = [
  { slug: 'ajn-alex', name: 'Alex Jones Show', feedUrl: 'https://rss.alexjones.media/Alex.xml' },
  { slug: 'ajn-warroom', name: 'War Room', feedUrl: 'https://rss.alexjones.media/WarRoom.xml' },
  { slug: 'ajn-sundaylive', name: 'Sunday Night Live', feedUrl: 'https://rss.alexjones.media/SundayLive.xml' },
  { slug: 'ajn-hourly-audio', name: 'AJN Hourly Audio', feedUrl: 'https://rss.alexjones.media/AJNHourlyAudio.xml' },
];
export const ALLOWED_FEED_HOSTS = ['rss.alexjones.media'];
export const ALLOWED_ENCLOSURE_HOSTS = ['archive.alexjoneslive.com'];
export const AJN_CHANNELS = {
  'ajn-radio': { name: 'AJN Radio', genre: 'Talk', description: 'Completed shows and hours from the AJN feeds.' },
  'ajn-exclusive': { name: 'AJN Exclusive', genre: 'Talk', description: 'Special editions from the AJN feeds (membership is configured, see AJN_EXCLUSIVE_VARIANTS).' },
} as const;

export type SyncOptions = {
  prisma: PrismaClient;
  fetchImpl?: typeof fetch;
  now?: () => Date;
  exclusiveVariants?: string[];
  timeoutMs?: number;
  maxBytes?: number;
  sources?: FeedSource[];
  allowedFeedHosts?: string[];
  allowedEnclosureHosts?: string[];
};

export type SyncReport = {
  slug: string; status: 'ok' | 'not_modified' | 'error' | 'disabled';
  itemCount: number; newCount: number; skippedBadHost: number; skippedNoEnclosure: number; reviewCount: number; markedMissing: number;
  error?: string;
};

export function exclusiveVariantsFromEnv(env: NodeJS.ProcessEnv = process.env): string[] {
  const raw = env.AJN_EXCLUSIVE_VARIANTS;
  return raw === undefined ? ['Special'] : raw.split(',').map(value => value.trim()).filter(Boolean);
}

async function readCapped(response: Response, maxBytes: number): Promise<string> {
  const declared = Number(response.headers.get('content-length') ?? 0);
  if (declared > maxBytes) throw new Error(`feed too large (${declared} bytes)`);
  if (!response.body) return '';
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) { await reader.cancel(); throw new Error(`feed exceeded ${maxBytes} bytes`); }
    chunks.push(value);
  }
  return new TextDecoder('utf-8').decode(Buffer.concat(chunks));
}

const emptyReport = (slug: string, status: SyncReport['status']): SyncReport => ({ slug, status, itemCount: 0, newCount: 0, skippedBadHost: 0, skippedNoEnclosure: 0, reviewCount: 0, markedMissing: 0 });
const errorMessage = (error: unknown) => {
  const cause = error instanceof Error ? (error.cause as { code?: string } | undefined)?.code : undefined;
  return `${error instanceof Error ? error.message : String(error)}${cause ? ` (${cause})` : ''}`.slice(0, 300);
};

export async function ensureAjnChannels(prisma: PrismaClient) {
  const ids = new Map<string, string>();
  for (const [slug, info] of Object.entries(AJN_CHANNELS)) {
    const channel = await prisma.channel.upsert({ where: { slug }, update: {}, create: { slug, name: info.name, genre: info.genre, description: info.description, type: 'ON_DEMAND' } });
    ids.set(slug, channel.id);
  }
  return ids;
}

export async function syncSource(source: FeedSource, options: SyncOptions): Promise<SyncReport> {
  const { prisma } = options;
  const fetchImpl = options.fetchImpl ?? fetch;
  const now = (options.now ?? (() => new Date()))();
  const exclusiveVariants = options.exclusiveVariants ?? exclusiveVariantsFromEnv();
  const row = await prisma.contentSource.upsert({ where: { slug: source.slug }, update: { name: source.name, feedUrl: source.feedUrl }, create: { slug: source.slug, name: source.name, feedUrl: source.feedUrl } });
  if (!row.enabled) return emptyReport(source.slug, 'disabled');

  const fail = async (message: string): Promise<SyncReport> => {
    await prisma.contentSource.update({ where: { slug: source.slug }, data: { lastSyncAt: now, lastStatus: 'error', lastError: message } });
    return { ...emptyReport(source.slug, 'error'), error: message };
  };

  try {
    const url = new URL(source.feedUrl);
    if (url.protocol !== 'https:' || !(options.allowedFeedHosts ?? ALLOWED_FEED_HOSTS).includes(url.hostname)) return await fail('feed URL is not an allowed https host');
    const headers: Record<string, string> = { accept: 'application/rss+xml, application/xml, text/xml', 'user-agent': 'ajn-radio-sync/1.0' };
    if (row.etag) headers['if-none-match'] = row.etag;
    else if (row.lastModified) headers['if-modified-since'] = row.lastModified;
    const response = await fetchImpl(source.feedUrl, { headers, redirect: 'error', signal: AbortSignal.timeout(options.timeoutMs ?? 15_000) });
    if (response.status === 304) {
      await prisma.contentSource.update({ where: { slug: source.slug }, data: { lastSyncAt: now, lastStatus: 'not_modified', lastError: null } });
      return emptyReport(source.slug, 'not_modified');
    }
    if (!response.ok) return await fail(`feed returned HTTP ${response.status}`);
    const xml = await readCapped(response, options.maxBytes ?? 5_000_000);
    const parsed = parseFeedXml(xml);

    const report = emptyReport(source.slug, 'ok');
    const items: ClassifiedItem[] = [];
    const enclosureHosts = options.allowedEnclosureHosts ?? ALLOWED_ENCLOSURE_HOSTS;
    for (const raw of parsed) {
      const item = classifyItem(raw, { exclusiveVariants });
      if (!item) { report.skippedNoEnclosure += 1; continue; }
      let enclosure: URL;
      try { enclosure = new URL(item.audioUrl); } catch { report.skippedBadHost += 1; continue; }
      if (enclosure.protocol !== 'https:' || !enclosureHosts.includes(enclosure.hostname)) { report.skippedBadHost += 1; continue; }
      items.push(item);
    }
    if (parsed.length > 0 && items.length === 0) return await fail('feed had items but none were importable'); // never wipe good data on a bad feed
    report.itemCount = items.length;
    report.reviewCount = items.filter(item => item.needsReview).length;

    const channelIds = await ensureAjnChannels(prisma);
    const existing = new Set((await prisma.podcastEpisode.findMany({ where: { source: source.slug }, select: { guid: true } })).map(entry => entry.guid));
    report.newCount = items.filter(item => !existing.has(item.guid)).length;

    const guids = items.map(item => item.guid);
    const data = (item: ClassifiedItem) => ({
      channelId: channelIds.get(channelSlugFor(item, exclusiveVariants))!,
      title: item.cleanTitle, audioUrl: item.audioUrl, publishedAt: item.publishedAt,
      showSlug: item.showSlug, showType: item.showType, airDate: item.airDate ? new Date(`${item.airDate}T00:00:00Z`) : null,
      airDateSource: item.airDateSource, rawTitle: item.rawTitle.slice(0, 512), cleanTitle: item.cleanTitle,
      hourNumber: item.hourNumber, segmentNumber: item.segmentNumber, variant: item.variant,
      needsReview: item.needsReview, reviewReasons: item.reviewReasons.length ? item.reviewReasons.join(',') : null, missingSince: null,
    });
    const operations = [
      ...items.map(item => prisma.podcastEpisode.upsert({
        where: { source_guid: { source: source.slug, guid: item.guid } },
        update: data(item),
        create: { ...data(item), source: source.slug, guid: item.guid },
      })),
      prisma.podcastEpisode.updateMany({ where: { source: source.slug, guid: { notIn: guids }, missingSince: null }, data: { missingSince: now } }),
      prisma.contentSource.update({
        where: { slug: source.slug },
        data: { lastSyncAt: now, lastStatus: 'ok', lastError: null, lastItemCount: items.length, lastNewCount: report.newCount, etag: response.headers.get('etag'), lastModified: response.headers.get('last-modified') },
      }),
    ];
    // One transaction per feed: a failure leaves the previous rows untouched.
    const results = await prisma.$transaction(operations as never[]) as unknown[];
    report.markedMissing = (results[items.length] as { count: number }).count;
    return report;
  } catch (error) {
    return fail(error instanceof Error && error.name === 'TimeoutError' ? 'feed request timed out' : errorMessage(error));
  }
}

export async function syncAllSources(options: SyncOptions): Promise<SyncReport[]> {
  const reports: SyncReport[] = [];
  for (const source of options.sources ?? FEED_SOURCES) reports.push(await syncSource(source, options)); // sequential: be polite to the host
  return reports;
}
