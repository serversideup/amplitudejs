const Amplitude = require("../../src/index.js");

const config = require("../../src/config.js");

const Setup = require("../setup.js");

beforeEach(() => {
  buildVolumeDownButtons();
  Setup.initializeTestingElement();
  Setup.initializeAmplitude();
});

afterEach(() => {
  Setup.resetConfig();
});

function buildVolumeDownButtons() {
  document.body.innerHTML =
    '<div class="amplitude-volume-down" id="volume-down"></div>';
}

test("AmplitudeJS Volume Down Decreases The Volume For the Song", () => {
  document.getElementById("volume-down").click();

  expect(config.audio.volume).toBe(0.45);
  expect(config.volume).toBe(45);
});

test("AmplitudeJS Volume Up Does Not Go Past 0", () => {
  document.getElementById("volume-down").click();
  document.getElementById("volume-down").click();
  document.getElementById("volume-down").click();
  document.getElementById("volume-down").click();
  document.getElementById("volume-down").click();
  document.getElementById("volume-down").click();
  document.getElementById("volume-down").click();
  document.getElementById("volume-down").click();
  document.getElementById("volume-down").click();
  document.getElementById("volume-down").click();
  document.getElementById("volume-down").click();
  document.getElementById("volume-down").click();

  expect(config.audio.volume).toBe(0);
  expect(config.volume).toBe(0);
});
