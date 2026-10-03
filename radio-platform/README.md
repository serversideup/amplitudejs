# AJN Radio Platform

An independent radio app built alongside the AmplitudeJS library. It uses one `Channel` catalog for live streams, clock-synchronized simulated broadcasts, and on-demand podcast channels.

## Run locally

1. Install Node.js 22.6 or newer and PostgreSQL 15 or newer.
2. Copy `.env.example` to `.env` and set `DATABASE_URL`. Set `RADIO_INGEST_TOKEN` if a live metadata source will call the ingest endpoint.
3. Create the database and install dependencies with `npm install`.
4. `npm install` generates Prisma Client through `postinstall`. For a new local database, apply the development migration with `npm run db:migrate -- --name radio_channels`.
5. Load the demonstration channels: `npm run db:seed`.
6. Start the app with `npm run dev`; the React app and API are served at `http://localhost:3000`.

Run `npm run typecheck`, `npm test`, and `npm run build` before shipping. The PostgreSQL-wire integration test uses an ephemeral PGlite instance to apply the SQL migration, exercise Prisma relations and seed idempotency, and call the HTTP and SSE APIs. Production uses PostgreSQL through `DATABASE_URL`.

For production deployment, install dependencies, build the client, set `DATABASE_URL` and any ingest token, then apply committed migrations with `npx prisma migrate deploy`. Start the production server with `npm start`; it sets `NODE_ENV=production` and serves the built `dist/` files. `tsx` remains a development dependency for watch mode and the demo seed command; production runs TypeScript using Node's type stripping (Node 22.6 or newer).

The client falls back to a small demonstration catalog while the API is unavailable. PostgreSQL is required for persisted channels, metadata ingestion, and server-sent events.

## Playback and metadata

- `prisma/schema.prisma` models live, simulated, and on-demand channels plus ordered radio segments and podcast episodes.
- `shared/timeline.ts` resolves `(now - cycleStart) % totalDuration` to the active segment and its in-file offset. The API is authoritative; the client uses the same resolver while the API is offline.
- `src/audioEngine.ts` keeps stream, segment, and episode loading outside the UI and warms the following segment in a second audio element.
- `src/playerStore.ts` keeps catalog, station selection, playback state, and now-playing metadata in a shared Zustand store.
- `GET /api/channels/:slug/events` sends now-playing updates to listeners. The server schedules one per-channel timer for the next simulated segment boundary in each server process.
- `POST /api/ingest/channels/:slug/now-playing` accepts live metadata with `Authorization: Bearer $RADIO_INGEST_TOKEN` and sends an immediate SSE update.
- The browser Media Session API provides lock-screen metadata and play, pause, previous, and next actions.

For multiple server instances, run an SSE-capable load balancer with connection affinity and keep PostgreSQL `LISTEN/NOTIFY` available to each app instance. Live metadata ingestion publishes a channel event through PostgreSQL so every instance updates its own connected listeners; simulated schedules are calculated and emitted per subscribed channel instance.

## Real content: AJN feeds

`npm run sources:sync` imports the public AJN RSS feeds (`https://rss.alexjones.media/`: Alex Jones, War Room, Sunday Night Live, and the hourly audio feed) into the `podcast_episodes` table. It is idempotent: re-running it changes nothing when the feeds have not changed (conditional requests with ETag), and an item that disappears from a feed is kept and marked `missingSince`.

- Titles, air dates, show and type come from the **filename** (`20261002_Fri_WarRoom-Hr3.mp3`), cross-checked against the feed title. If the weekday does not match the date, `airDate` is `null` and the item is flagged `needsReview`; nothing is guessed. The raw feed title is always kept in `rawTitle`.
- Show types: `full_show`, `hour`, `special` (the `-Special` files). The feeds give no durations, so `durationSeconds` stays `null`.
- Two channels are created: `ajn-radio` and `ajn-exclusive`. The feeds contain no "Exclusive" section; `-Special` files are routed to `ajn-exclusive`, and `AJN_EXCLUSIVE_VARIANTS` (comma list, default `Special`) controls it. Set it empty to put everything in `ajn-radio`.
- Safety: https only, feed host allowlist (`rss.alexjones.media`), enclosure host allowlist (`archive.alexjoneslive.com`), timeouts, a 5 MB size cap, redirects refused, one transaction per feed.
- Not imported: the affiliate segment directories (no usage permission confirmed) and third-party station playlists (no license declared by the source repository). See `docs/SOURCES-DISCOVERY.md`.
- API: `GET /api/channels/:slug/episodes?show=war-room&type=hour&cursor=...`, `GET /api/channels/:slug/episodes/facets`, `GET /api/sources` (sync status).

## Preview deployment

See `DEPLOY.md`. Runtime switches: `PREVIEW_ACCESS` (`public` default, or `authenticated` with `PREVIEW_PASSWORD`), `ROBOTS_INDEX=allow` to lift the default `noindex`, `RUN_MIGRATIONS_ON_START`, `SEED_DEMO`, `SYNC_SOURCES_ON_START`.
