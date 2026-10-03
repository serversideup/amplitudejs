CREATE TYPE "ChannelType" AS ENUM ('LIVE', 'SIMULATED', 'ON_DEMAND');

CREATE TABLE "channels" (
  "id" TEXT NOT NULL,
  "slug" VARCHAR(100) NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "description" TEXT,
  "genre" VARCHAR(255),
  "city" VARCHAR(120),
  "frequency" VARCHAR(24),
  "type" "ChannelType" NOT NULL,
  "stream_url" TEXT,
  "cycle_start" TIMESTAMPTZ(6),
  "current_title" VARCHAR(255),
  "current_artist" VARCHAR(255),
  "current_album" VARCHAR(255),
  "metadata_updated_at" TIMESTAMPTZ(6),
  "active" BOOLEAN NOT NULL DEFAULT true,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "channels_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "channels_playback_config_check" CHECK (
    ("type" <> 'LIVE' OR "stream_url" IS NOT NULL) AND
    ("type" <> 'SIMULATED' OR "cycle_start" IS NOT NULL)
  )
);

CREATE TABLE "radio_segments" (
  "id" TEXT NOT NULL,
  "channel_id" TEXT NOT NULL,
  "position" INTEGER NOT NULL,
  "title" VARCHAR(255) NOT NULL,
  "artist" VARCHAR(255),
  "audio_url" TEXT NOT NULL,
  "duration_seconds" INTEGER NOT NULL,
  CONSTRAINT "radio_segments_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "radio_segments_duration_check" CHECK ("duration_seconds" > 0),
  CONSTRAINT "radio_segments_channel_fkey" FOREIGN KEY ("channel_id") REFERENCES "channels"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "podcast_episodes" (
  "id" TEXT NOT NULL,
  "channel_id" TEXT NOT NULL,
  "title" VARCHAR(255) NOT NULL,
  "description" TEXT,
  "audio_url" TEXT NOT NULL,
  "published_at" TIMESTAMPTZ(6),
  "duration_seconds" INTEGER,
  CONSTRAINT "podcast_episodes_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "podcast_episodes_duration_check" CHECK ("duration_seconds" IS NULL OR "duration_seconds" > 0),
  CONSTRAINT "podcast_episodes_channel_fkey" FOREIGN KEY ("channel_id") REFERENCES "channels"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "channels_slug_key" ON "channels"("slug");
CREATE INDEX "channels_active_type_idx" ON "channels"("active", "type");
CREATE UNIQUE INDEX "radio_segments_channel_id_position_key" ON "radio_segments"("channel_id", "position");
CREATE INDEX "radio_segments_channel_id_position_idx" ON "radio_segments"("channel_id", "position");
CREATE INDEX "podcast_episodes_channel_id_published_at_idx" ON "podcast_episodes"("channel_id", "published_at" DESC);
