const config = require("../../src/config.js");

const Core = require("../../src/core/core.js");

const Setup = require("../setup.js");

beforeEach(() => {
  Setup.initializeTestingElement();
  Setup.initializeAmplitude();
});

afterEach(() => {
  Setup.resetConfig();
});

/**
 * Ensures that we can stop the audio.
 */
test("AmplitudeJS Core can stop audio", () => {
  Core.stop();
  expect(config.audio.currentTime).toBe(0);
});

/**
 * Ensures that volume can be muted.
 */
test("AmplitudeJS Core can mute the audio", () => {
  Core.setVolume(0);
  expect(config.audio.muted).toBe(true);
  expect(config.volume).toBe(0);
  expect(config.audio.volume).toBe(0);
});

/**
 * Ensures that volume can be set.
 */
test("AmplitudeJS Core can set volume", () => {
  Core.setVolume(34);
  expect(config.audio.muted).toBe(false);
  expect(config.volume).toBe(34);
  expect(config.audio.volume).toBe(0.34);
});

/**
 * Ensures we can set the song location.
 */
test("AmplitudeJS Core can set song location", () => {
  Core.setSongLocation(47);
  expect(config.audio.currentTime).toBe(47);
});

/**
 * Ensures we can set the playback speed.
 */
test("AmplitudeJS Core can set playback speed", () => {
  Core.setPlaybackSpeed(15);
  expect(config.playback_speed).toBe(15);
  expect(config.audio.playbackRate).toBe(15);
});
