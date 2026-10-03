/** Pure playback decisions, kept free of React and the DOM so they can be unit tested. */
export type PlaybackChannel = {
  type: 'live' | 'simulated' | 'on_demand' | string;
  streamUrl?: string | null;
  segments: Array<{ audioUrl: string }>;
};
export type PlaybackSegment = { audioUrl: string };
export type PlaybackInput<S extends PlaybackSegment = PlaybackSegment> = {
  channel: PlaybackChannel | null;
  playing: boolean;
  episode: { audioUrl: string } | null;
  segment: S | null | undefined;
  offsetSeconds: number;
};
export type PlaybackAction<S extends PlaybackSegment = PlaybackSegment> =
  | { kind: 'pause'; key: string }
  | { kind: 'live'; url: string; key: string }
  | { kind: 'episode'; url: string; key: string }
  | { kind: 'simulated'; segment: S; offsetSeconds: number; key: string };

/** Anything that cannot be played must PAUSE, never silently keep the previous audio going. */
export function decidePlayback<S extends PlaybackSegment>(input: PlaybackInput<S>): PlaybackAction<S> {
  const { channel, playing, episode, segment, offsetSeconds } = input;
  if (!channel || !playing) return { kind: 'pause', key: 'pause' };
  if (channel.type === 'live') {
    return channel.streamUrl ? { kind: 'live', url: channel.streamUrl, key: `live:${channel.streamUrl}` } : { kind: 'pause', key: 'pause' };
  }
  if (channel.type === 'on_demand') {
    return episode ? { kind: 'episode', url: episode.audioUrl, key: `episode:${episode.audioUrl}` } : { kind: 'pause', key: 'pause' };
  }
  if (!channel.segments.length || !segment) return { kind: 'pause', key: 'pause' };
  return { kind: 'simulated', segment, offsetSeconds, key: `sim:${segment.audioUrl}` };
}

/**
 * Server offset advanced by monotonic time elapsed since the payload arrived.
 * This avoids comparing the server wall clock with the device wall clock.
 */
export function currentOffsetSeconds(offsetSeconds: number | undefined, receivedAtMs: number | undefined, nowMs: number) {
  const elapsed = receivedAtMs === undefined ? 0 : Math.max(0, (nowMs - receivedAtMs) / 1000);
  return (offsetSeconds ?? 0) + elapsed;
}
