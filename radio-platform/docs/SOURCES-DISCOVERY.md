# Source Discovery Report

**Checked:** 2026-10-02 (UTC)  
**Scope:** read-only source discovery for AJN RSS/affiliate media and `junguler/m3u-radio-music-playlists`. No Part C importer, channel, migration, or UI was implemented.

## AJN feeds (`rss.alexjones.media`)

Raw HTTPS GETs returned HTTP 200 for the index and all queried feeds. The index response was 5,560 bytes; the feed response sizes were Alex 31,319 bytes, WarRoom 23,718, SundayLive 6,315, AJNHourlyAudio 39,735, and AJNHourlyVideo 106,623. The index links to the Alex, WarRoom, SundayLive, AJN hourly audio, and AJN hourly video HTML/XML pairs.

| Feed | Current RSS item count | First item observed |
| --- | ---: | --- |
| `Alex.xml` | 90 | `Alex Jones 2026-Oct-01 Thursday` |
| `WarRoom.xml` | 66 | `War Room 2026-Oct-01 Thursday` |
| `SundayLive.xml` | 14 | `Sunday Night Live 2026-Sep-27 Sunday` |
| `AJNHourlyAudio.xml` | 110 | `AUDIO - 20261001_Thu_WarRoom-Hr3` |

Literal samples from the retrieved RSS:

```xml
<title>Alex Jones 2026-Oct-01 Thursday</title>
<pubDate>Thu, 01 Oct 2026 22:00:00 -0000</pubDate>
<enclosure url="https://archive.alexjoneslive.com/rss/20261001_Thu_Alex.mp3" length="57584642" type="audio/mpeg"/>
```

```xml
<title>AUDIO - 20261001_Thu_WarRoom-Hr3</title>
<pubDate>Thu, 01 Oct 2026 18:03:46 -0500</pubDate>
<enclosure url="https://archive.alexjoneslive.com/hourly-mp3/20261001_Thu_WarRoom-Hr3.mp3" length="28792512" type="audio/mpeg"/>
```

The supplied daily title pattern and hourly `AUDIO -` prefix match these raw items. I checked all dated GUIDs in these four feeds against calendar weekdays: **280/280 matched**. All daily-feed pubDates use the ambiguous `-0000` suffix (Alex 90/90, WarRoom 66/66, SundayLive 14/14); all hourly audio items use an explicit numeric timezone in the current response (110/110; first sampled as `-0500`). The importer should continue deriving `airDate` from the filename, never pubDate.

There is no “Exclusive” heading or source link in the index. `Alex.xml` currently has **12/90** GUIDs with a `-Special` suffix; the other three feeds have zero. The feed data does not establish that every Special is exclusive, or that every exclusive item is marked Special. Recommended mapping: store Special as a parsed variant/type, and let an explicit source config or curator designation determine membership in `ajn-exclusive`. Do not silently equate the two.

The six supplied live URLs responded to HEAD with HTTP 200 and `Content-Type: audio/aacp`: `/alexjonesshow`, `/alexjonesshow.mp3`, `/warroom/`, `/stream/7/`, `/stream/1/`, and `/stream/4/`. This verifies response status/type at check time, not sustained playback or stream stability. No true MP3 duration was measured; enclosure byte length is not a duration.

### Affiliate directories

The affiliate index listed `mp3-hourly/`, `mp3-segs/`, `mp3-segs-legacy/`, and `mp4-segs/`. Current visible listing counts were 39, 117, 195, and 117 media entries respectively. The `mp3-segs/` sample includes:

```text
[    2400384 Oct 2 11:09] Fri_Alex-Hr1-Seg1.mp3
[   11048448 Oct 2 11:34] Fri_Alex-Hr1-Seg2.mp3
```

The filenames lack year/date; the listing provides modification dates. A segment importer would need to derive the candidate date from listing metadata and set `airDateSource: 'listing-mtime'`, with review flags for ambiguous or weekday-mismatched entries. The directories are publicly fetchable, but the index has `noindex, nofollow`; `robots.txt` does not disallow the affiliate paths. No usage terms or public-listener authorization were found in the checked pages. Keep every affiliate source disabled by default until you confirm permission.

## Station playlist repository

Repository: [junguler/m3u-radio-music-playlists](https://github.com/junguler/m3u-radio-music-playlists)  
Current head at check: `1248c19a9744df079c5fa45283d7b6a86f499c37` (2026-10-02 21:38 UTC), message `git stats - Oct/03`. Its three changed files are stats images; the preceding tree inspected at `f46a9ede4d62a0afc0af8f14d2d97de27fa9a998` remains the current playlist tree. GitHub reports repository size **1,798,910 KB** (about 1.72 GiB) and `license: null`. There is no root `LICENSE` or other license file in that tree. The README provides acknowledgements/source notes but no reuse license; permission and attribution requirements are unresolved.

The inspected tree contains **120,474 `.m3u` paths** and **120,666 tracked paths**. Its root mixes flat genre-named playlists (`rock.m3u`, `blues.m3u`, etc.) and directories including `+checked+`, `+merged+`, `_zoo_`, `all-online_radio`, `allradio.net`, `icecast`, and `zin_music`. Samples show both genre paths (`all-online_radio/rock.m3u`) and a country-named playlist (`+checked+/a/afghanistan.m3u`). Recent commits show irregular but active updates: Sep 23, Sep 30 (several commits minutes apart), and Oct 2. The README author claims over one million unique stream links and 500k+ checked streams; these are author claims, not independently counted station records.

I fetched two raw playlists at the current head and counted their `#EXTINF` entries:

| Sample file | Entries | HTTP | HTTPS | Other/malformed | Duplicate URL groups | Entries with `tvg-country` / `tvg-language` / `group-title` |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| `all-online_radio/rock.m3u` | 2,421 | 2,046 | 374 | 1 | 0 | 0 / 0 / 0 |
| `+checked+/a/afghanistan.m3u` | 150 | 70 | 79 | 1 | 0 | 0 / 0 / 0 |
| **Combined sample** | **2,571** | **2,116 (82.30%)** | **453 (17.62%)** | **2 (0.08%)** | **0 within each file** | **0 / 0 / 0** |

The metadata lines are mostly plain `#EXTINF:-1,Station Name`. The Afghanistan sample has 20 `tvg-logo` attributes (13.3% of that file; 0.78% of this combined sample), but no country, language, or genre fields. One sample line includes `tv-logo` rather than `tvg-logo`, another is missing its URL line, and one rock-list URL is malformed (`http:69.162.125.2:8240stream`). These two files are examples, not a representative random sample; the percentages above must not be presented as repository-wide coverage.

Some entries need content-type/stream review rather than unconditional import. The Afghanistan file includes entries titled `Pocoyo 102.9 AM` and `Nick Jr. 102.9 FM Wayback Machine` whose URLs point to video/HLS paths. HEAD requests for the PBS video playlist and archived Adult Swim playlist returned HTTP 200 with HLS playlist content types; a sample radio stream returned HTTP 200 with `audio/mpeg`. These checks do not establish the health of all entries, and dead-stream prevalence was not measured. The sample’s raw fields do not use `tvg-country`, `tvg-language`, or `group-title`; country/genre should only be derived from explicit directory/file naming under a documented, reviewable mapping.

The source repository is very large, and a complete blob checkout and scan was not completed. Therefore these are still **unknown** repository-wide values: total station entries after parsing/deduplication, coverage percentages for each EXTINF field, duplicate stream URLs, HTTP/HTTPS shares, and dead/non-audio shares. Do not infer those values from the two examples or the README’s estimates.

## Implementation direction for review (not built)

- AJN: store source URL/config/status and episode-source metadata additively; use unique source GUIDs, nullable durations, soft missing markers, and parsed date/weekday review flags. A CLI sync plus an external cron is preferable to one in-process timer per replica; the cron can invoke an idempotent importer and report real sync status.
- Source fetching: HTTPS only, explicit host allowlists for feed/enclosure hosts, bounded time/size, conditional requests, a real XML parser, and transactional upserts so one failed feed cannot erase prior rows. Affiliate sources remain individually configurable and default off.
- Exclusive mapping: treat `-Special` as a variant candidate only; make final membership config-driven.
- Stations: use a separate indexed `Station` table and filtered/paginated endpoints/facets. Record source repo/commit/path. Import only from a local checkout, dedupe by normalized URL, preserve inferred flags, and hide unchecked/dead or HTTPS-incompatible streams by default. Do not proxy arbitrary URLs.
- License/permission is an implementation gate: the playlist repo has no declared license, and the affiliate directories have no confirmed public-listener grant.

## A/B Fix Summary and Tests

| Item | Root cause and change | Evidence/test |
| --- | --- | --- |
| A1 LISTEN crash | The `pg` listener lacked robust error/end recovery. It now has explicit handlers, keepalive and periodic ping detection, capped exponential backoff with jitter, `LISTEN` re-issue, connected-channel resync, health state, and cancellation on stop. | Integration test `PostgreSQL migration and Prisma relations support catalog, timeline, and episodes` drops/restarts the PGlite socket, tests a silent listener, and checks that an open SSE client receives state after reconnect without uncaught exceptions. |
| A2 stale artist/album | Prisma ignores omitted `undefined` fields. Ingest now writes omitted artist/album as `null`, replacing the record. | Same integration test posts full metadata followed by title-only metadata and asserts artist/album are null. |
| A3 late SSE joiner | Fan-out fingerprints suppressed an unchanged frame, and age-based initial-frame reuse could be stale. Every connection now resolves current state once and writes a fresh frame to that response. | Same integration test opens a second SSE connection with unchanged metadata and checks for an immediate initial frame. |
| A4 unknown/inactive `/events` | The route opened an SSE response before checking catalog state. It now resolves active channel state before headers/subscriber registration and returns JSON 404 otherwise. | Same integration test checks missing and inactive slugs return 404 and do not change the subscriber count. |
| A5 podcast tune | The playback effect could return for an on-demand channel without an episode, leaving the previous source active. `decidePlayback` is pure and returns pause in that state. | `A5: podcast channel with no episode pauses instead of leaving the old audio playing`, `A5: on_demand with episode plays that episode`, and decision tests for paused/live/simulated cases in `tests/playback.test.ts`. |
| B1 duplicate segment end | Both DOM `onEnded` and engine handlers advanced playback. The DOM end handler was removed; the engine is the single transition path. | `warms next segment and promotes it at authoritative offset` in `tests/audioEngine.test.ts`, plus the scheduled segment transition assertion in the integration test. |
| B2 live recovery | Live streams had no recovery and could resume stale buffered media. The engine handles error/end/stall/waiting, retries with a bound and jittered backoff, and reloads the URL after pause. | `B2: live streams recover from stalls, reload after pause, and stop at the retry limit` and `B2: reconnect backoff grows, is capped and jittered`. |
| B3 clock skew | Offsets subtracted the client wall clock from the server timestamp. The client now advances the received offset using `performance.now()` elapsed time rather than comparing wall clocks. | `B3: offset ignores client clock skew`. |
| B4 misleading demo UI/data | Fake audience counters, status/avatar UI, newsletter success-without-storage, and artist/episode names on SoundHelix placeholder audio were misleading. UI was removed or relabeled; seed updates clear old seeded placeholder metadata. | Integration seed assertions require Demo Track/Demo Episode labels, null placeholder artist/published/duration metadata; test names remain in `tests/postgresIntegration.test.ts`. |
| B5 deployment hygiene | Startup now sets production mode, Node runs the server TS in production, Vite is imported only in development, Prisma generate runs on install, the CLI is in production dependencies, typecheck exists, and README describes `prisma migrate deploy` and per-channel timers. | `npm run typecheck`, `npm test`, and `npm run build`. The path-filtered Actions workflow is still missing because the task simultaneously prohibits editing root `.github/` and requires that workflow there. |
| B6 API hygiene | Ingest token check now uses `timingSafeEqual`; DTO mapping uses generated Prisma types; internal errors are logged, not returned; now-playing database errors return 503 while invalid channel configuration returns 409. | Integration test checks token matches/mismatches and forces a database table failure to assert a generic 503 without `detail`. |

## Work completed after discovery

Parts A1–A5 and B1–B6 are implemented on `radio-fixes-and-sources`, except for the B5 workflow noted above. The path-filtered Actions workflow was not added because the supplied ground rule says to work only inside `radio-platform/` and explicitly forbids editing the repository-root `.github/`; GitHub Actions only recognizes workflows under that root directory. Resolve that scope conflict before adding the workflow. No Part C implementation has been started; the source-permission, full playlist metrics, and user approval gates remain open.
