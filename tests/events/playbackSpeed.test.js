const Amplitude = require("../../src/index.js");

const config = require("../../src/config.js");

const Setup = require("../setup.js");

beforeEach(() => {
  buildPlayBackSpeedButtons();
  Setup.initializeTestingElement();
  Setup.initializeAmplitude();
});

afterEach(() => {
  Setup.resetConfig();
});

function buildPlayBackSpeedButtons() {
  document.body.innerHTML =
    '<div class="amplitude-playback-speed" id="global-playback-speed"></div>';
}

test("AmplitudeJS sets playback speed accordingly to 1.5", () => {
  document.getElementById("global-playback-speed").click();

  expect(config.audio.playbackRate).toBe(1.5);
});

test("AmplitudeJS sets playback speed accordingly to 2.0", () => {
  document.getElementById("global-playback-speed").click();
  document.getElementById("global-playback-speed").click();

  expect(config.audio.playbackRate).toBe(2.0);
});

test("AmplitudeJS sets playback speed accordingly to 1.0", () => {
  document.getElementById("global-playback-speed").click();
  document.getElementById("global-playback-speed").click();
  document.getElementById("global-playback-speed").click();

  expect(config.audio.playbackRate).toBe(1.0);
});
