# Deploying AJN Radio to Google Cloud (Cloud Build -> Cloud Run)

**Status legend.** `VERIFIED` = I ran it and saw the output (local Docker, in this repo's CI-equivalent run).
`UNVERIFIED` = written from Google's documentation, never run against a real Google Cloud project.
Nothing in the Google Cloud sections below has been run on Google Cloud yet. Treat the first deploy as the test.

## What was verified locally (VERIFIED)

On the exact `Dockerfile` in this folder, Docker 29.8 + `postgres:16-alpine`:

- `docker build` succeeds (image ~940 MB, runs as non-root `node` user).
- Container with `RUN_MIGRATIONS_ON_START=true SEED_DEMO=true` applies the migration, seeds, and listens.
- `scripts/smoke.sh http://localhost:8080` printed: `PASS health`, `PASS catalog: 5 channels`, `PASS sse: initial now-playing frame`, `PASS ingest without token -> 401`, `PASS noindex`, `ALL CHECKS PASSED`.
- `docker stop` shut the container down in 0.2 s with exit code 0 (graceful SIGTERM).
- `PREVIEW_ACCESS=authenticated`: 401 without the password, all checks pass with `SMOKE_PASSWORD`.

(The build in my sandbox needed a proxy CA; that is a sandbox detail and is not in the committed Dockerfile.)

## 1. Prerequisites (all UNVERIFIED)

| Item | What | Notes |
|---|---|---|
| APIs to enable | `run.googleapis.com`, `cloudbuild.googleapis.com`, `artifactregistry.googleapis.com`, `sqladmin.googleapis.com`, `secretmanager.googleapis.com` | `gcloud services enable ...` |
| Artifact Registry | A Docker repository, e.g. `ajn-radio` in your region | `_AR_REPO` substitution |
| Cloud SQL | PostgreSQL 15+ instance, database `ajn_radio`, a user | Connect through the Cloud SQL unix socket |
| Secrets (Secret Manager) | `ajn-radio-database-url`, `ajn-radio-ingest-token` | names are substitutions |
| Cloud Build service account roles | `roles/run.admin`, `roles/iam.serviceAccountUser`, `roles/artifactregistry.writer` | to deploy and push |
| Cloud Run runtime service account roles | `roles/cloudsql.client`, `roles/secretmanager.secretAccessor` | to reach the DB and read secrets |
| Cost drivers | Cloud SQL tier (always on), Cloud Run `--min-instances=1` with `--no-cpu-throttling` (always-on instance), Artifact Registry storage, egress | I have **not** put prices here: any number would be unverified. See https://cloud.google.com/run/pricing and https://cloud.google.com/sql/pricing |

## 2. One-time setup (UNVERIFIED)

```bash
PROJECT=your-project-id
REGION=us-central1
gcloud config set project $PROJECT
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com sqladmin.googleapis.com secretmanager.googleapis.com
gcloud artifacts repositories create ajn-radio --repository-format=docker --location=$REGION

# Database
gcloud sql instances create ajn-radio-db --database-version=POSTGRES_16 --region=$REGION --tier=db-f1-micro
gcloud sql databases create ajn_radio --instance=ajn-radio-db
gcloud sql users create radio --instance=ajn-radio-db --password='CHOOSE-A-LONG-PASSWORD'

# Secrets. The unix-socket form of DATABASE_URL (note host=/cloudsql/...):
printf 'postgresql://radio:CHOOSE-A-LONG-PASSWORD@localhost/ajn_radio?host=/cloudsql/%s:%s:ajn-radio-db&schema=public' "$PROJECT" "$REGION" \
  | gcloud secrets create ajn-radio-database-url --data-file=-
openssl rand -hex 32 | gcloud secrets create ajn-radio-ingest-token --data-file=-
```

UNVERIFIED specifically: that the `?host=/cloudsql/...` URL works for both the `pg` driver and Prisma's migrate CLI. If migrations fail on first deploy, that URL is the first suspect.

Grant the roles in the table above to the two service accounts (`gcloud projects add-iam-policy-binding ...`).

## 3. Path A: build from the zip (UNVERIFIED)

1. Get the zip: download the `ajn-radio-preview-zip` artifact from the `Radio Platform CI` run (or run `npm run package:zip` in `radio-platform/`).
2. Open **Cloud Shell**, use the three-dot menu -> **Upload**, choose the zip, then:

```bash
unzip ajn-radio-preview-*.zip -d ajn-radio && cd ajn-radio
gcloud builds submit . --config=cloudbuild.yaml \
  --substitutions=_REGION=us-central1,_CLOUDSQL_INSTANCE=$PROJECT:us-central1:ajn-radio-db
```

3. Expected on success: the build log ends with the three steps `build`, `push`, `deploy` all green, then
   `Service [ajn-radio-preview] revision [ajn-radio-preview-0000N-xxx] has been deployed and is serving 100 percent of traffic.` and a `Service URL: https://...run.app`.
4. Alternative (also UNVERIFIED): upload the zip to a Cloud Storage bucket and run `gcloud builds submit gs://BUCKET/ajn-radio-preview-X.zip --config=cloudbuild.yaml ...`. Cloud Build's API accepts `.zip` or `.tar.gz` storage sources, but `--config` is still read from a local file.

## 4. Path B: Cloud Build trigger on GitHub (UNVERIFIED)

One-time: connect the GitHub repo to Cloud Build in the console (Cloud Build -> Triggers -> Connect repository; this needs the Cloud Build GitHub app installed on `banamine/AJN-AUDIO-`). Then:

```bash
gcloud builds triggers create github --name=ajn-radio-preview \
  --repo-owner=banamine --repo-name=AJN-AUDIO- --branch-pattern='^master$' \
  --build-config=radio-platform/cloudbuild.yaml \
  --included-files='radio-platform/**' \
  --substitutions=_APP_DIR=radio-platform,_REGION=us-central1,_CLOUDSQL_INSTANCE=$PROJECT:us-central1:ajn-radio-db
```

Expected: pushes to `master` that touch `radio-platform/**` start a build; other pushes (including the Jekyll Pages workflow's) do not. Check **Cloud Build -> History**.

## 5. After the first deploy: smoke test the real URL

```bash
bash scripts/smoke.sh https://YOUR-SERVICE-URL.run.app
```

Expect the same six PASS lines as the local run. If you set `PREVIEW_ACCESS=authenticated`, run with `SMOKE_PASSWORD=...`.
Seed demo content once, only if you want it: redeploy with `SEED_DEMO=true` for one build, then set it back to `false`.

## 6. Configuration reference

| Variable | Default | Meaning |
|---|---|---|
| `DATABASE_URL` | none (secret) | Postgres connection string |
| `RADIO_INGEST_TOKEN` | none (secret) | bearer token for `/api/ingest/*`; ingest is disabled (503) if unset |
| `PREVIEW_ACCESS` | `public` | `public` or `authenticated` (HTTP Basic, any username, password = `PREVIEW_PASSWORD`; fails closed if the password is missing) |
| `PREVIEW_PASSWORD` | none | used when `PREVIEW_ACCESS=authenticated` |
| `ROBOTS_INDEX` | unset | set to `allow` to remove `noindex` and allow crawling |
| `RUN_MIGRATIONS_ON_START` | `false` (set `true` in cloudbuild.yaml) | run `prisma migrate deploy` before starting; Prisma takes its own advisory lock, so parallel instances serialize (from Prisma docs, UNVERIFIED here) |
| `SEED_DEMO` | `false` | seed the clearly labeled demo channels |
| `SYNC_SOURCES_ON_START` | `false` (set `true` in cloudbuild.yaml) | import the AJN feeds once at boot; failure is logged and non-fatal |
| `AJN_EXCLUSIVE_VARIANTS` | `Special` | which filename variants route to the `ajn-exclusive` channel |
| `PORT` | `8080` in the image | Cloud Run sets it |

Public preview means anyone with the URL can use it, but it is served with `X-Robots-Tag: noindex, nofollow` and a disallow-all `robots.txt`. To change it to a login, set `_PREVIEW_ACCESS=authenticated` and add `PREVIEW_PASSWORD` as a secret.

## 7. Keeping content fresh (UNVERIFIED)

The service imports once at boot. For continuous updates run the importer as a Cloud Run **job** on a schedule (Cloud Run CPU is throttled outside requests, so do not rely on an in-process timer):

```bash
IMAGE=$REGION-docker.pkg.dev/$PROJECT/ajn-radio/ajn-radio:BUILD_ID_FROM_YOUR_LAST_BUILD
gcloud run jobs create ajn-radio-sync --region=$REGION --image=$IMAGE \
  --set-cloudsql-instances=$PROJECT:$REGION:ajn-radio-db \
  --set-secrets=DATABASE_URL=ajn-radio-database-url:latest \
  --command=node --args=--experimental-strip-types,scripts/sources-sync.ts
gcloud scheduler jobs create http ajn-radio-sync --location=$REGION --schedule="*/30 * * * *" \
  --uri="https://run.googleapis.com/v2/projects/$PROJECT/locations/$REGION/jobs/ajn-radio-sync:run" \
  --http-method=POST --oauth-service-account-email=SCHEDULER_SA@$PROJECT.iam.gserviceaccount.com
```

The feeds are served with `Cache-Control: max-age=300` and ETags, so 30 minutes is polite. Check `GET /api/sources` for the last sync status.

## 8. Things to know

- **SSE and the 3600 s limit.** Cloud Run closes any request at its timeout (maximum 3600 s). The player reconnects, and every reconnect receives a fresh initial frame.
- **Always-on CPU.** `--no-cpu-throttling` keeps the Postgres `LISTEN` connection healthy between requests; this is a cost driver.
- **Mixed content.** An `https://` preview blocks `http://` audio streams in the browser. The demo and AJN sources are https.
- **Do not publish a GitHub Release** to deploy. Releases trigger the repo's old `npm publish` workflows.

## 9. Rollback (UNVERIFIED)

```bash
gcloud run revisions list --service=ajn-radio-preview --region=us-central1
gcloud run services update-traffic ajn-radio-preview --region=us-central1 --to-revisions=PREVIOUS_REVISION=100
```

Migrations are additive only, so rolling the service back does not require rolling the database back.
