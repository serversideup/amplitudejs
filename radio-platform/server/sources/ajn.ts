import { XMLParser } from 'fast-xml-parser';

export type ShowSlug = 'alex-jones' | 'war-room' | 'sunday-night-live';
export type ShowType = 'full_show' | 'hour' | 'segment' | 'special' | 'live';
export type AirDateSource = 'filename' | 'listing-mtime';

export const SHOWS: Record<string, { slug: ShowSlug; name: string }> = {
  Alex: { slug: 'alex-jones', name: 'Alex Jones' },
  WarRoom: { slug: 'war-room', name: 'War Room' },
  SundayLive: { slug: 'sunday-night-live', name: 'Sunday Night Live' },
};
const SHOW_BY_TITLE: Record<string, string> = { 'Alex Jones': 'Alex', 'War Room': 'WarRoom', 'Sunday Night Live': 'SundayLive' };

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

// Daily or hourly file: 20261002_Fri_Alex.mp3 | 20260926_Sat_Alex-Special.mp3 | 20261002_Fri_WarRoom-Hr3.mp3
const FILE_RE = /^(?<date>\d{8})_(?<dow>Mon|Tue|Wed|Thu|Fri|Sat|Sun)_(?<show>Alex|WarRoom|SundayLive)(?:-Hr(?<hour>\d+))?(?:-(?<variant>[A-Za-z]+))?\.mp3$/;
// Affiliate segment file (no date in the name): Fri_Alex-Hr1-Seg2.mp3
const SEGMENT_RE = /^(?<dow>Mon|Tue|Wed|Thu|Fri|Sat|Sun)_(?<show>Alex|WarRoom|SundayLive)-Hr(?<hour>\d+)-Seg(?<seg>\d+)\.mp3$/;
// Daily feed title: "Alex Jones 2026-Oct-02 Friday"
const TITLE_RE = /^(?<show>Alex Jones|War Room|Sunday Night Live)\s+(?<date>\d{4}-[A-Za-z]{3}-\d{2})\s+(?<dow>[A-Za-z]+day)$/;

export type FeedItem = { guid: string | null; title: string; pubDate: string | null; enclosureUrl: string | null };

export type ClassifiedItem = {
  guid: string;
  rawTitle: string;
  cleanTitle: string;
  showSlug: ShowSlug | null;
  showType: ShowType | null;
  airDate: string | null; // YYYY-MM-DD, never guessed
  airDateSource: AirDateSource | null;
  hourNumber: number | null;
  segmentNumber: number | null;
  variant: string | null;
  audioUrl: string;
  publishedAt: Date | null;
  needsReview: boolean;
  reviewReasons: string[];
};

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_', processEntities: true, parseTagValue: false, trimValues: true });
const asArray = <T>(value: T | T[] | undefined): T[] => (value === undefined ? [] : Array.isArray(value) ? value : [value]);
const text = (value: unknown): string | null => {
  if (typeof value === 'string') return value.trim() || null;
  if (value && typeof value === 'object' && '#text' in value) return text((value as Record<string, unknown>)['#text']);
  return null;
};

/** Parses RSS 2.0 XML into plain items. Throws if the document is not an RSS feed. */
export function parseFeedXml(xml: string): FeedItem[] {
  const doc = parser.parse(xml) as { rss?: { channel?: { item?: unknown } } };
  const channel = doc?.rss?.channel;
  if (!channel) throw new Error('Not an RSS feed (no <rss><channel>)');
  return asArray(channel.item as Array<Record<string, unknown>> | Record<string, unknown> | undefined).map(item => {
    const enclosure = item.enclosure as Record<string, unknown> | undefined;
    return {
      guid: text(item.guid),
      title: text(item.title) ?? '',
      pubDate: text(item.pubDate),
      enclosureUrl: enclosure && typeof enclosure['@_url'] === 'string' ? (enclosure['@_url'] as string) : null,
    };
  });
}

/** Real calendar date + weekday check. Returns null if yyyymmdd is not a valid date. */
function parseCompactDate(value: string): { iso: string; dow: (typeof DOW)[number] } | null {
  const year = Number(value.slice(0, 4)); const month = Number(value.slice(4, 6)); const day = Number(value.slice(6, 8));
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
  return { iso: `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`, dow: DOW[date.getUTCDay()] };
}

function parseTitleDate(value: string): string | null {
  const [year, mon, day] = value.split('-');
  const month = MONTHS.findIndex(name => name.toLowerCase() === mon.toLowerCase());
  if (month < 0) return null;
  return parseCompactDate(`${year}${String(month + 1).padStart(2, '0')}${day}`)?.iso ?? null;
}

export function formatAirDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  const dow = DOW[new Date(Date.UTC(year, month - 1, day)).getUTCDay()];
  return `${dow} ${MONTHS[month - 1]} ${day}, ${year}`;
}

export function basename(url: string): string {
  const pathname = new URL(url).pathname;
  return decodeURIComponent(pathname.slice(pathname.lastIndexOf('/') + 1));
}

export type SegmentFile = { show: ShowSlug; dow: string; hourNumber: number; segmentNumber: number };
/** Affiliate segment names have no date; callers must supply one from listing metadata and flag it. */
export function parseSegmentFilename(name: string): SegmentFile | null {
  const match = SEGMENT_RE.exec(name);
  if (!match?.groups) return null;
  return { show: SHOWS[match.groups.show].slug, dow: match.groups.dow, hourNumber: Number(match.groups.hour), segmentNumber: Number(match.groups.seg) };
}

export type ClassifyOptions = { exclusiveVariants?: string[] };

export function classifyItem(item: FeedItem, options: ClassifyOptions = {}): ClassifiedItem | null {
  if (!item.enclosureUrl) return null;
  let file: string;
  try { file = basename(item.enclosureUrl); } catch { return null; }
  const reasons: string[] = [];
  const rawTitle = item.title;
  const guid = item.guid ?? file;
  const publishedAt = item.pubDate && !Number.isNaN(Date.parse(item.pubDate)) ? new Date(item.pubDate) : null;

  const match = FILE_RE.exec(file);
  const titleMatch = TITLE_RE.exec(rawTitle);
  if (!match?.groups) {
    reasons.push('unrecognized_filename');
    const fallbackShow = titleMatch?.groups ? SHOWS[SHOW_BY_TITLE[titleMatch.groups.show]] : null;
    return {
      guid, rawTitle, cleanTitle: rawTitle.replace(/^AUDIO\s*-\s*/i, '').slice(0, 255) || file, showSlug: fallbackShow?.slug ?? null, showType: null,
      airDate: null, airDateSource: null, hourNumber: null, segmentNumber: null, variant: null, audioUrl: item.enclosureUrl, publishedAt,
      needsReview: true, reviewReasons: reasons,
    };
  }
  const { date, dow, show, hour, variant } = match.groups;
  const showInfo = SHOWS[show];
  const parsedDate = parseCompactDate(date);
  let airDate: string | null = null;
  let airDateSource: AirDateSource | null = null;
  if (!parsedDate) reasons.push('invalid_filename_date');
  else if (parsedDate.dow !== dow) reasons.push('weekday_mismatch'); // never guess which part is right
  else { airDate = parsedDate.iso; airDateSource = 'filename'; }

  if (titleMatch?.groups) {
    const titleDate = parseTitleDate(titleMatch.groups.date);
    if (titleDate && parsedDate && titleDate !== parsedDate.iso) reasons.push('title_filename_date_mismatch');
    if (SHOWS[SHOW_BY_TITLE[titleMatch.groups.show]]?.slug !== showInfo.slug) reasons.push('title_filename_show_mismatch');
  }

  const exclusive = (options.exclusiveVariants ?? ['Special']).map(value => value.toLowerCase());
  const isSpecial = variant !== undefined && variant.toLowerCase() === 'special';
  if (variant !== undefined && !isSpecial && !exclusive.includes(variant.toLowerCase())) reasons.push('unknown_variant');
  const hourNumber = hour === undefined ? null : Number(hour);
  const showType: ShowType = hourNumber !== null ? 'hour' : isSpecial ? 'special' : 'full_show';

  const datePart = airDate ? formatAirDate(airDate) : null;
  const parts = [showInfo.name + (showType === 'special' ? ' Special' : ''), hourNumber !== null ? `Hour ${hourNumber}` : null, datePart].filter(Boolean);
  const cleanTitle = datePart ? parts.join(' — ') : rawTitle.replace(/^AUDIO\s*-\s*/i, '').slice(0, 255);

  return {
    guid, rawTitle, cleanTitle, showSlug: showInfo.slug, showType, airDate, airDateSource, hourNumber, segmentNumber: null,
    variant: variant ?? null, audioUrl: item.enclosureUrl, publishedAt, needsReview: reasons.length > 0, reviewReasons: reasons,
  };
}

/** Which channel an imported item belongs to. Membership of "Exclusive" is configuration, not inference. */
export function channelSlugFor(item: ClassifiedItem, exclusiveVariants: string[] = ['Special']): 'ajn-radio' | 'ajn-exclusive' {
  const variant = item.variant?.toLowerCase();
  return variant && exclusiveVariants.some(value => value.toLowerCase() === variant) ? 'ajn-exclusive' : 'ajn-radio';
}
