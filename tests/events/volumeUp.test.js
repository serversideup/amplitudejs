const Amplitude = require("../../src/index.js");

const config = require("../../src/config.js");

const Setup = require("../setup.js");

beforeEach(() => {
  buildVolumeUpButtons();
  Setup.initializeTestingElement();
  Setup.initializeAmplitude();
});

afterEach(() => {
  Setup.resetConfig();
});

function buildVolumeUpButtons() {
  document.body.innerHTML =
    '<div class="amplitude-volume-up" id="volume-up"></div>';
}

test("AmplitudeJS Volume Up Increases The Volume For the Song", () => {
  document.getElementById("volume-up").click();

  expect(config.audio.volume).toBe(0.55);
  expect(config.volume).toBe(55);
});

test("AmplitudeJS Volume Up Does Not Go Past 100", () => {
  document.getElementById("volume-up").click();
  document.getElementById("volume-up").click();
  document.getElementById("volume-up").click();
  document.getElementById("volume-up").click();
  document.getElementById("volume-up").click();
  document.getElementById("volume-up").click();
  document.getElementById("volume-up").click();
  document.getElementById("volume-up").click();
  document.getElementById("volume-up").click();
  document.getElementById("volume-up").click();
  document.getElementById("volume-up").click();
  document.getElementById("volume-up").click();

  expect(config.audio.volume).toBe(1.0);
  expect(config.volume).toBe(100);
});
