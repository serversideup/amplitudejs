import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.ts';

export async function seedDemoData(prisma: PrismaClient) {
  const afterHours = await prisma.channel.upsert({
    where: { slug: 'after-hours' },
    update: { name: 'Demo Radio', genre: 'Demo audio', city: null, frequency: null, description: 'Sample MP3 tracks for player testing.' },
    create: {
      slug: 'after-hours', name: 'Demo Radio', genre: 'Demo audio', city: null, frequency: null,
      description: 'Sample MP3 tracks for player testing.', type: 'SIMULATED', cycleStart: new Date('2026-09-28T00:00:00.000Z'),
    },
  });
  const tracks = [
    ['Demo Track 01', null, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', 372],
    ['Demo Track 02', null, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', 415],
    ['Demo Track 03', null, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', 390],
    ['Demo Track 04', null, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', 426],
  ] as const;
  for (const [position, [title, artist, audioUrl, durationSeconds]] of tracks.entries()) {
    await prisma.radioSegment.upsert({
      where: { channelId_position: { channelId: afterHours.id, position } },
      update: { title, artist, audioUrl, durationSeconds },
      create: { channelId: afterHours.id, position, title, artist, audioUrl, durationSeconds },
    });
  }

  const liveStations = [
    { slug: 'daylight-fm', name: 'SomaFM Indie Pop (demo)', genre: 'Demo stream', city: null, frequency: null, currentTitle: null, currentArtist: null, currentAlbum: null, streamUrl: 'https://ice1.somafm.com/indiepop-128-mp3' },
    { slug: 'forma', name: 'SomaFM Drone Zone (demo)', genre: 'Demo stream', city: null, frequency: null, currentTitle: null, currentArtist: null, currentAlbum: null, streamUrl: 'https://ice1.somafm.com/dronezone-128-mp3' },
    { slug: 'sundown-club', name: 'SomaFM Groove Salad (demo)', genre: 'Demo stream', city: null, frequency: null, currentTitle: null, currentArtist: null, currentAlbum: null, streamUrl: 'https://ice1.somafm.com/groovesalad-128-mp3' },
  ];
  for (const station of liveStations) {
    await prisma.channel.upsert({ where: { slug: station.slug }, update: station, create: { ...station, type: 'LIVE' } });
  }

  const podcasts = await prisma.channel.upsert({
    where: { slug: 'ajn-podcasts' },
    update: { name: 'Demo Episodes', genre: 'Sample audio', city: null, frequency: null, description: 'Sample MP3 episodes for player testing.' },
    create: { slug: 'ajn-podcasts', name: 'Demo Episodes', genre: 'Sample audio', city: null, frequency: null, description: 'Sample MP3 episodes for player testing.', type: 'ON_DEMAND' },
  });
  const episodes = [
    ['the-art-of-listening', 'Demo Episode 01', 'Sample MP3 for player testing; episode metadata was not supplied.', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'],
    ['after-the-last-train', 'Demo Episode 02', 'Sample MP3 for player testing; episode metadata was not supplied.', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3'],
  ] as const;
  for (const [idSlug, title, description, audioUrl] of episodes) {
    const id = `${podcasts.id}-${idSlug}`;
    await prisma.podcastEpisode.upsert({
      where: { id },
      update: { title, description, audioUrl, publishedAt: null, durationSeconds: null },
      create: { id, channelId: podcasts.id, title, description, audioUrl, publishedAt: null, durationSeconds: null },
    });
  }
}

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL is required to seed the radio catalog');
  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });
  try { await seedDemoData(prisma); }
  finally { await prisma.$disconnect(); }
}

if (process.argv[1]?.replaceAll('\\', '/').endsWith('/prisma/seed.ts')) {
  void main().catch(error => { console.error('Failed to seed radio catalog', error); process.exitCode = 1; });
}
