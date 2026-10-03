import { create } from 'zustand';

export type ChannelType = 'live' | 'simulated' | 'on_demand';
export type Segment = { id?: string; position: number; title: string; artist: string | null; audioUrl: string; durationSeconds: number };
export type Episode = {
  id: string; title: string; description?: string | null; audioUrl: string; durationSeconds: number | null; publishedAt?: string | null;
  airDate?: string | null; showSlug?: string | null; showType?: string | null; hourNumber?: number | null; variant?: string | null; needsReview?: boolean;
};
export type Channel = {
  id: string; slug: string; name: string; description?: string | null; genre?: string | null;
  city?: string | null; frequency?: string | null; type: ChannelType; streamUrl?: string | null;
  cycleStart?: string | null; currentTitle?: string | null; currentArtist?: string | null; currentAlbum?: string | null;
  segments: Segment[]; episodes: Episode[];
};
export type NowPlaying = { type?: ChannelType; title?: string | null; artist?: string | null; album?: string | null; segment?: Segment; segmentIndex?: number; offsetSeconds?: number; cycleOffsetSeconds?: number; totalDurationSeconds?: number; serverTime?: string; metadataUpdatedAt?: string | null; /** performance.now() timestamp when this payload arrived */ receivedAt?: number };

type PlayerState = {
  channels: Channel[];
  currentChannel: Channel | null;
  playing: boolean;
  volume: number;
  nowPlaying: NowPlaying | null;
  activeEpisode: Episode | null;
  position: number;
  duration: number;
  setChannels: (channels: Channel[]) => void;
  mergeChannel: (slug: string, updates: Partial<Channel>) => void;
  tune: (channel: Channel) => void;
  setPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
  setNowPlaying: (metadata: NowPlaying | null) => void;
  setEpisode: (episode: Episode) => void;
  setProgress: (position: number, duration: number) => void;
};

export const usePlayerStore = create<PlayerState>()(set => ({
  channels: [], currentChannel: null, playing: false, volume: 0.72, nowPlaying: null,
  activeEpisode: null, position: 0, duration: 0,
  setChannels: channels => set(state => ({ channels, currentChannel: state.currentChannel ? channels.find(item => item.id === state.currentChannel?.id) ?? channels[0] ?? null : channels[0] ?? null })),
  mergeChannel: (slug, updates) => set(state => {
    const channels = state.channels.map(channel => channel.slug === slug ? { ...channel, ...updates } : channel);
    return { channels, currentChannel: state.currentChannel?.slug === slug ? { ...state.currentChannel, ...updates } : state.currentChannel };
  }),
  tune: channel => set(state => ({ currentChannel: channel, nowPlaying: null, activeEpisode: null, position: 0, duration: 0, playing: state.playing })),
  setPlaying: playing => set({ playing }),
  setVolume: volume => set({ volume: Math.max(0, Math.min(1, volume)) }),
  setNowPlaying: nowPlaying => set({ nowPlaying }),
  setEpisode: episode => set(state => ({ activeEpisode: episode, nowPlaying: { title: episode.title, artist: 'AJN Podcasts', album: state.currentChannel?.name }, position: 0, duration: episode.durationSeconds ?? 0, playing: true })),
  setProgress: (position, duration) => set({ position, duration }),
}));
