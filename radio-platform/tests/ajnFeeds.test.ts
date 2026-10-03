import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { channelSlugFor, classifyItem, formatAirDate, parseFeedXml, parseSegmentFilename, type FeedItem } from '../server/sources/ajn.ts';

const fixture = (name: string) => readFileSync(new URL(`./fixtures/feeds/${name}.sample.xml`, import.meta.url), 'utf8');
const item = (file: string, title = 'x', host = 'https://archive.alexjoneslive.com/rss/'): FeedItem => ({ guid: file, title, pubDate: null, enclosureUrl: host + file });

test('parses the real Alex feed sample and classifies every item', () => {
  const items = parseFeedXml(fixture('Alex'));
  assert.equal(items.length, 7);
  const classified = items.map(entry => classifyItem(entry)!);
  assert.ok(classified.every(entry => entry.showSlug === 'alex-jones' && entry.airDate && !entry.needsReview), JSON.stringify(classified.filter(e => e.needsReview)));
  const first = classified[0];
  assert.equal(first.rawTitle, 'Alex Jones 2026-Oct-02 Friday');
  assert.equal(first.cleanTitle, 'Alex Jones — Fri Oct 2, 2026');
  assert.equal(first.airDate, '2026-10-02');
  assert.equal(first.airDateSource, 'filename');
  assert.equal(first.showType, 'full_show');
  assert.equal(first.audioUrl, 'https://archive.alexjoneslive.com/rss/20261002_Fri_Alex.mp3');
  assert.equal(first.guid, '20261002_Fri_Alex.mp3');
});

test('-Special files become type special with the variant kept, and route to the exclusive channel', () => {
  const special = parseFeedXml(fixture('Alex')).map(entry => classifyItem(entry)!).find(entry => entry.variant === 'Special')!;
  assert.ok(special);
  assert.equal(special.showType, 'special');
  assert.equal(special.cleanTitle, 'Alex Jones Special — Sat Sep 26, 2026');
  assert.equal(channelSlugFor(special), 'ajn-exclusive');
  assert.equal(channelSlugFor(special, []), 'ajn-radio'); // membership is configuration
  assert.equal(channelSlugFor(classifyItem(item('20261002_Fri_Alex.mp3'))!), 'ajn-radio');
});

test('hourly audio items parse hour number, show and date from the filename', () => {
  const items = parseFeedXml(fixture('AJNHourlyAudio')).map(entry => classifyItem(entry)!);
  assert.equal(items.length, 8);
  const hour3 = items.find(entry => entry.guid === '20261002_Fri_WarRoom-Hr3.mp3')!;
  assert.equal(hour3.showType, 'hour');
  assert.equal(hour3.hourNumber, 3);
  assert.equal(hour3.showSlug, 'war-room');
  assert.equal(hour3.cleanTitle, 'War Room — Hour 3 — Fri Oct 2, 2026');
  assert.equal(hour3.rawTitle, 'AUDIO - 20261002_Fri_WarRoom-Hr3');
  assert.ok(items.every(entry => !entry.needsReview));
});

test('War Room and Sunday Night Live samples classify cleanly', () => {
  for (const [name, slug] of [['WarRoom', 'war-room'], ['SundayLive', 'sunday-night-live']] as const) {
    const items = parseFeedXml(fixture(name)).map(entry => classifyItem(entry)!);
    assert.ok(items.length >= 3);
    assert.ok(items.every(entry => entry.showSlug === slug && entry.airDate && !entry.needsReview), name);
  }
});

test('weekday mismatch: airDate is null and the item is flagged, not guessed', () => {
  const result = classifyItem(item('20261002_Mon_Alex.mp3', 'Alex Jones 2026-Oct-02 Friday'))!; // 2026-10-02 is a Friday
  assert.equal(result.airDate, null);
  assert.equal(result.airDateSource, null);
  assert.equal(result.needsReview, true);
  assert.ok(result.reviewReasons.includes('weekday_mismatch'));
  assert.equal(result.cleanTitle, 'Alex Jones 2026-Oct-02 Friday'); // falls back to the raw title
});

test('invalid calendar date, unknown variant, unrecognized filename, title/filename disagreement', () => {
  assert.ok(classifyItem(item('20261340_Fri_Alex.mp3'))!.reviewReasons.includes('invalid_filename_date'));
  assert.ok(classifyItem(item('20261002_Fri_Alex-Weird.mp3'))!.reviewReasons.includes('unknown_variant'));
  const odd = classifyItem(item('something-else.mp3', 'AUDIO - hello'))!;
  assert.equal(odd.needsReview, true);
  assert.deepEqual(odd.reviewReasons, ['unrecognized_filename']);
  assert.equal(odd.showType, null);
  assert.equal(odd.airDate, null);
  const mismatch = classifyItem(item('20261002_Fri_Alex.mp3', 'Alex Jones 2026-Oct-01 Thursday'))!;
  assert.ok(mismatch.reviewReasons.includes('title_filename_date_mismatch'));
  assert.equal(mismatch.airDate, '2026-10-02'); // filename wins, but flagged
});

test('items without an enclosure are dropped; guid falls back to the filename', () => {
  assert.equal(classifyItem({ guid: 'g', title: 't', pubDate: null, enclosureUrl: null }), null);
  assert.equal(classifyItem({ guid: null, title: 't', pubDate: null, enclosureUrl: 'https://archive.alexjoneslive.com/rss/20261002_Fri_Alex.mp3' })!.guid, '20261002_Fri_Alex.mp3');
});

test('segment filenames parse (affiliate listings; not imported by default)', () => {
  assert.deepEqual(parseSegmentFilename('Fri_Alex-Hr1-Seg2.mp3'), { show: 'alex-jones', dow: 'Fri', hourNumber: 1, segmentNumber: 2 });
  assert.equal(parseSegmentFilename('20261002_Fri_Alex.mp3'), null);
});

test('formatAirDate and parser rejection of non-RSS', () => {
  assert.equal(formatAirDate('2026-09-26'), 'Sat Sep 26, 2026');
  assert.throws(() => parseFeedXml('<html><body>nope</body></html>'), /Not an RSS feed/);
  assert.equal(parseFeedXml('<rss><channel><title>x</title></channel></rss>').length, 0);
  assert.equal(parseFeedXml('<rss><channel><item><title>one</title><enclosure url="https://a/b.mp3"/></item></channel></rss>').length, 1);
});
