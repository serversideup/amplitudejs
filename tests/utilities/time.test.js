const Amplitude = require("../../src/index.js");

const config = require("../../src/config.js");

const Setup = require("../setup.js");

const Time = require("../../src/utilities/time.js");

beforeEach(() => {
  Setup.initializeTestingElement();
  Setup.initializeAmplitude();
});

afterEach(() => {
  Setup.resetConfig();
});

test("AmplitudeJS Time Utility Produces Correct Current Time", () => {
  var currentTime = Time.computeCurrentTimes();

  expect(currentTime).toEqual({ seconds: "30", minutes: "00", hours: "00" });

  config.audio.currentTime = 120;

  currentTime = Time.computeCurrentTimes();

  expect(currentTime).toEqual({ seconds: "00", minutes: "02", hours: "00" });

  config.audio.currentTime = 3605;

  currentTime = Time.computeCurrentTimes();

  expect(currentTime).toEqual({ seconds: "05", minutes: "00", hours: 1 });
});

test("AmplitudeJS Time Utility Produces Correct Duration Time", () => {
  var duration = Time.computeSongDuration();

  expect(duration).toEqual({ seconds: "40", minutes: "01", hours: "00" });

  config.audio.duration = 245;

  duration = Time.computeSongDuration();
  expect(duration).toEqual({ seconds: "05", minutes: "04", hours: "00" });

  config.audio.duration = 3605;

  duration = Time.computeSongDuration();
  expect(duration).toEqual({ seconds: "05", minutes: "00", hours: "1" });
});

test("AmplitudeJS Time Utility Produces Correct Song Completion Percentage", () => {
  var songCompletionPercentage = Time.computeSongCompletionPercentage();

  expect(songCompletionPercentage).toBe(30);
});

test("AmplitudeJS Time Utility Sets The Correct Current Time", () => {
  Time.setCurrentTime(68);

  expect(config.audio.currentTime).toBe(68);
});
