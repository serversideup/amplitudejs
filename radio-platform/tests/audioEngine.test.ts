import assert from 'node:assert/strict';
import test from 'node:test';
import { LIVE_STALL_TIMEOUT_MS, MAX_LIVE_RECONNECT_ATTEMPTS, RadioAudioEngine } from '../src/audioEngine.ts';

class MockAudio {
  src = '';
  preload = '';
  volume = 1;
  currentTime = 0;
  duration = 30;
  readyState = 3;
  onloadedmetadata: (() => void) | null = null;
  onended: (() => void) | null = null;
  listeners = new Map<string, () => void>();
  played = 0;
  loads = 0;
  paused = false;
  load() { this.loads++; queueMicrotask(() => this.listeners.get('loadedmetadata')?.()); }
  addEventListener(type: string, listener: () => void) { this.listeners.set(type, listener); }
  removeEventListener(type: string) { this.listeners.delete(type); }
  pause() { this.paused = true; }
  removeAttribute(name: string) { if (name === 'src') this.src = ''; }
  play() { this.played++; this.paused = false; return Promise.resolve(); }
  dispatch(type: string) { this.listeners.get(type)?.(); }
}

class FakeTimers {
  jobs: Array<{ id: number; callback: () => void; delay: number }> = [];
  nextId = 1;
  setTimeout = (callback: () => void, delay: number) => { const id = this.nextId++; this.jobs.push({ id, callback, delay }); return id; };
  clearTimeout = (id: unknown) => { this.jobs = this.jobs.filter(job => job.id !== id); };
  runNext() { const job = this.jobs.shift(); assert.ok(job); job.callback(); return job.delay; }
}

(globalThis as any).HTMLMediaElement = { HAVE_METADATA: 1, HAVE_FUTURE_DATA: 3 };
(globalThis as any).document = { baseURI: 'https://radio.test/' };

test('warms next segment and promotes it at authoritative offset', async () => {
  const active = new MockAudio();
  const warm = new MockAudio();
  const engine = new RadioAudioEngine(active as unknown as HTMLAudioElement, warm as unknown as HTMLAudioElement);
  const next = { position: 1, title: 'Next', artist: null, audioUrl: '/next.mp3', durationSeconds: 30 };
  engine.warmNext(next);
  assert.equal(warm.src, 'https://radio.test/next.mp3');
  let ended = 0;
  await engine.promoteWarm(next, 6.5, () => ended++, error => { throw error; });
  assert.equal(warm.currentTime, 6.5);
  assert.equal(warm.played, 1);
  assert.equal(active.src, '');
  warm.onended?.();
  assert.equal(ended, 1);
});

test('falls back to loading the requested file when the warm source differs', async () => {
  const active = new MockAudio();
  const warm = new MockAudio();
  const engine = new RadioAudioEngine(active as unknown as HTMLAudioElement, warm as unknown as HTMLAudioElement);
  const prefetched = { position: 1, title: 'Prefetched', artist: null, audioUrl: '/prefetched.mp3', durationSeconds: 30 };
  const current = { position: 2, title: 'Current', artist: null, audioUrl: '/current.mp3', durationSeconds: 30 };
  engine.warmNext(prefetched);
  await engine.promoteWarm(current, 4, () => {}, error => { throw error; });
  assert.equal(active.src, 'https://radio.test/current.mp3');
  assert.equal(active.currentTime, 4);
  assert.equal(active.played, 1);
  assert.equal(warm.src, 'https://radio.test/prefetched.mp3');
});

test('B2: live streams recover from stalls, reload after pause, and stop at the retry limit', async () => {
  const active = new MockAudio();
  const warm = new MockAudio();
  const timers = new FakeTimers();
  const engine = new RadioAudioEngine(active as unknown as HTMLAudioElement, warm as unknown as HTMLAudioElement, {
    setTimeout: timers.setTimeout, clearTimeout: timers.clearTimeout, random: () => 0.5,
  });
  let gaveUp = 0;
  const url = 'https://radio.test/live';
  await engine.playStream(url, { onGiveUp: () => gaveUp++ });
  assert.equal(active.src, url);

  active.dispatch('stalled');
  assert.equal(timers.runNext(), LIVE_STALL_TIMEOUT_MS);
  assert.equal(timers.jobs[0]?.delay, 1000);
  timers.runNext();
  await Promise.resolve();
  assert.equal(active.src, url);

  engine.pause();
  const loadsBeforeResume = active.loads;
  await engine.playStream(url, { onGiveUp: () => gaveUp++ });
  assert.equal(active.loads, loadsBeforeResume + 2, 'resume clears and reloads the stream source');

  for (let attempt = 0; attempt < MAX_LIVE_RECONNECT_ATTEMPTS; attempt++) {
    active.dispatch('error');
    timers.runNext();
    await Promise.resolve();
  }
  active.dispatch('error');
  assert.equal(gaveUp, 1);
  assert.equal(timers.jobs.length, 0);
  engine.dispose();
});
