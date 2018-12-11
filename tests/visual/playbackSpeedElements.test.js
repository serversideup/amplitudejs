const Amplitude = require("../../src/index.js");

const config = require("../../src/config.js");

const Setup = require("../setup.js");

beforeEach(() => {
  buildPlaybackSpeedElements();
  Setup.initializeTestingElement();
  Setup.initializeAmplitude();
});

afterEach(() => {
  Setup.resetConfig();
});

function buildPlaybackSpeedElements() {
  document.body.innerHTML =
    '<div class="amplitude-playback-speed" id="playback-speed-button"></div>';
}

test("AmplitudeJS Playback Speed Elements Get Proper Classes", () => {
  document.getElementById("playback-speed-button").click();

  expect(
    document
      .getElementById("playback-speed-button")
      .classList.contains("amplitude-playback-speed-15")
  );

  document.getElementById("playback-speed-button").click();

  expect(
    document
      .getElementById("playback-speed-button")
      .classList.contains("amplitude-playback-speed-20")
  );

  document.getElementById("playback-speed-button").click();

  expect(
    document
      .getElementById("playback-speed-button")
      .classList.contains("amplitude-playback-speed-10")
  );
});
