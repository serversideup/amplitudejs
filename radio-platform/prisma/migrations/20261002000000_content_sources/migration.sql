-- AlterTable
ALTER TABLE "podcast_episodes" ADD COLUMN     "air_date" DATE,
ADD COLUMN     "air_date_source" VARCHAR(24),
ADD COLUMN     "clean_title" VARCHAR(255),
ADD COLUMN     "guid" VARCHAR(255),
ADD COLUMN     "hour_number" INTEGER,
ADD COLUMN     "missing_since" TIMESTAMPTZ(6),
ADD COLUMN     "needs_review" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "raw_title" VARCHAR(512),
ADD COLUMN     "review_reasons" TEXT,
ADD COLUMN     "segment_number" INTEGER,
ADD COLUMN     "show_slug" VARCHAR(64),
ADD COLUMN     "show_type" VARCHAR(24),
ADD COLUMN     "source" VARCHAR(64),
ADD COLUMN     "variant" VARCHAR(32);

-- CreateTable
CREATE TABLE "content_sources" (
    "id" TEXT NOT NULL,
    "slug" VARCHAR(64) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "feed_url" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "etag" VARCHAR(255),
    "last_modified" VARCHAR(64),
    "last_sync_at" TIMESTAMPTZ(6),
    "last_status" VARCHAR(24),
    "last_error" TEXT,
    "last_item_count" INTEGER,
    "last_new_count" INTEGER,

    CONSTRAINT "content_sources_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "content_sources_slug_key" ON "content_sources"("slug");

-- CreateIndex
CREATE INDEX "podcast_episodes_channel_id_show_slug_show_type_air_date_idx" ON "podcast_episodes"("channel_id", "show_slug", "show_type", "air_date" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "podcast_episodes_source_guid_key" ON "podcast_episodes"("source", "guid");

