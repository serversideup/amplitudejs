export type SegmentMetadata = {
  id?: string;
  position: number;
  title: string;
  artist: string | null;
  audioUrl: string;
  durationSeconds: number;
};

export type TimelinePosition = {
  segment: SegmentMetadata;
  segmentIndex: number;
  offsetSeconds: number;
  cycleOffsetSeconds: number;
  totalDurationSeconds: number;
};

/** Resolves an absolute wall-clock time onto an ordered, repeating broadcast cycle. */
export function resolveTimelinePosition(
  segments: SegmentMetadata[],
  cycleStart: Date | string | number,
  now = Date.now(),
): TimelinePosition | null {
  const startMs = cycleStart instanceof Date ? cycleStart.getTime() : new Date(cycleStart).getTime();
  if (!Number.isFinite(startMs) || !segments.length) return null;
  const valid = segments.filter(segment => Number.isFinite(segment.durationSeconds) && segment.durationSeconds > 0);
  const totalDurationSeconds = valid.reduce((total, segment) => total + segment.durationSeconds, 0);
  if (!totalDurationSeconds) return null;

  const cycleOffsetSeconds = (((now - startMs) / 1000) % totalDurationSeconds + totalDurationSeconds) % totalDurationSeconds;
  let offsetSeconds = cycleOffsetSeconds;
  for (let segmentIndex = 0; segmentIndex < valid.length; segmentIndex++) {
    const segment = valid[segmentIndex];
    if (offsetSeconds < segment.durationSeconds || segmentIndex === valid.length - 1) {
      return { segment, segmentIndex, offsetSeconds, cycleOffsetSeconds, totalDurationSeconds };
    }
    offsetSeconds -= segment.durationSeconds;
  }
  return null;
}
