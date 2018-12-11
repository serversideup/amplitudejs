const Amplitude = require("../../src/index.js");

const config = require("../../src/config.js");

const Setup = require("../setup.js");

beforeEach(() => {
  buildRepeatSongButtons();
  Setup.initializeTestingElement();
  Setup.initializeAmplitude();
});

afterEach(() => {
  Setup.resetConfig();
});

function buildRepeatSongButtons() {
  document.body.innerHTML =
    '<div class="amplitude-repeat-song" id="global-repeat-button"></div>';
}

test("AmplitudeJS Repeat Song Toggles Flag to Repeat Song", () => {
  document.getElementById("global-repeat-button").click();

  expect(config.repeat_song).toBe(true);

  document.getElementById("global-repeat-button").click();

  expect(config.repeat_song).toBe(false);
});
