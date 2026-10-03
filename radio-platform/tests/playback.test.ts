import assert from 'node:assert/strict';
import { test } from 'node:test';
import { currentOffsetSeconds, decidePlayback } from '../src/playback.ts';
import { MAX_LIVE_RECONNECT_ATTEMPTS, reconnectDelayMs } from '../src/audioEngine.ts';

const seg = { audioUrl: '/a.mp3' };
const base = { playing: true, episode: null, segment: null, offsetSeconds: 0 };

test('A5: podcast channel with no episode pauses instead of leaving the old audio playing', () => {
  assert.equal(decidePlayback({ ...base, channel: { type: 'on_demand', segments: [] } }).kind, 'pause');
});
test('A5: on_demand with episode plays that episode', () => {
  const action = decidePlayback({ ...base, channel: { type: 'on_demand', segments: [] }, episode: { audioUrl: '/e.mp3' } });
  assert.deepEqual(action, { kind: 'episode', url: '/e.mp3', key: 'episode:/e.mp3' });
});
test('paused or no channel always pauses', () => {
  assert.equal(decidePlayback({ ...base, playing: false, channel: { type: 'live', streamUrl: 'x', segments: [] } }).kind, 'pause');
  assert.equal(decidePlayback({ ...base, channel: null }).kind, 'pause');
});
test('live without stream url pauses; with url plays', () => {
  assert.equal(decidePlayback({ ...base, channel: { type: 'live', segments: [] } }).kind, 'pause');
  assert.equal(decidePlayback({ ...base, channel: { type: 'live', streamUrl: 'https://s/x', segments: [] } }).kind, 'live');
});
test('live key is stable across metadata updates so the stream is not reloaded', () => {
  const channel = { type: 'live', streamUrl: 'https://s/x', segments: [] };
  assert.equal(decidePlayback({ ...base, channel }).key, decidePlayback({ ...base, channel, offsetSeconds: 99 }).key);
});
test('simulated needs segments and a segment', () => {
  assert.equal(decidePlayback({ ...base, channel: { type: 'simulated', segments: [] } }).kind, 'pause');
  assert.equal(decidePlayback({ ...base, channel: { type: 'simulated', segments: [seg] }, segment: seg, offsetSeconds: 5 }).kind, 'simulated');
});
test('B3: offset ignores client clock skew', () => {
  assert.equal(currentOffsetSeconds(10, 1_000_000, 1_004_000), 14);
  assert.equal(currentOffsetSeconds(10, undefined, 5), 10);
  assert.equal(currentOffsetSeconds(10, 2_000, 1_000), 10);
});
test('B2: reconnect backoff grows, is capped and jittered', () => {
  assert.equal(reconnectDelayMs(0, () => 0.5), 1000);
  assert.equal(reconnectDelayMs(2, () => 0.5), 4000);
  assert.equal(reconnectDelayMs(20, () => 0.5), 30000);
  assert.ok(reconnectDelayMs(3, () => 0) < reconnectDelayMs(3, () => 1));
  assert.ok(MAX_LIVE_RECONNECT_ATTEMPTS > 0);
});
