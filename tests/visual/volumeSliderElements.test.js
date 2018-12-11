const Amplitude = require("../../src/index.js");

const config = require("../../src/config.js");

const Setup = require("../setup.js");

beforeEach(() => {
  buildVolumeSliderElements();
  Setup.initializeTestingElement();
  Setup.initializeAmplitude();
});

afterEach(() => {
  Setup.resetConfig();
});

function buildVolumeSliderElements() {
  document.body.innerHTML =
    '<div class="amplitude-volume-up" id="volume-up"/>' +
    '<input type="range" class="amplitude-volume-slider" id="volume-slider"/>';
}

test("AmplitudeJS Adjusts the Volume Slider Accordingly", () => {
  document.getElementById("volume-up").click();

  expect(
    parseFloat(document.getElementById("volume-slider").value)
  ).toBeCloseTo(55, 2);
});
