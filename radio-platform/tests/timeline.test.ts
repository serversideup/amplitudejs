import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveTimelinePosition } from '../shared/timeline.ts';

const segments = [
  { position: 0, title: 'A', artist: null, audioUrl: '/a.mp3', durationSeconds: 10 },
  { position: 1, title: 'B', artist: null, audioUrl: '/b.mp3', durationSeconds: 20 },
];
const start = Date.parse('2026-01-01T00:00:00.000Z');

test('resolves start of cycle to first segment at zero offset', () => {
  const result = resolveTimelinePosition(segments, start, start);
  assert.equal(result?.segment.title, 'A');
  assert.equal(result?.segmentIndex, 0);
  assert.equal(result?.offsetSeconds, 0);
});

test('resolves exact segment boundary to next segment at zero offset', () => {
  const result = resolveTimelinePosition(segments, start, start + 10_000);
  assert.equal(result?.segment.title, 'B');
  assert.equal(result?.segmentIndex, 1);
  assert.equal(result?.offsetSeconds, 0);
});

test('resolves within segment and wraps the cycle', () => {
  const within = resolveTimelinePosition(segments, start, start + 17_500);
  assert.equal(within?.segment.title, 'B');
  assert.equal(within?.offsetSeconds, 7.5);
  const wrapped = resolveTimelinePosition(segments, start, start + 30_000);
  assert.equal(wrapped?.segment.title, 'A');
  assert.equal(wrapped?.offsetSeconds, 0);
});

test('normalizes timestamps before cycle start and skips invalid durations', () => {
  const result = resolveTimelinePosition([
    { ...segments[0], durationSeconds: 0 }, segments[1],
  ], start, start - 5_000);
  assert.equal(result?.segment.title, 'B');
  assert.equal(result?.offsetSeconds, 15);
  assert.equal(resolveTimelinePosition(segments, 'invalid-date', start), null);
});
