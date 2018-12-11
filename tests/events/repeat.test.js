const Amplitude = require("../../src/index.js");

const config = require("../../src/config.js");

const Setup = require("../setup.js");

beforeEach(() => {
  buildRepeatButtons();
  Setup.initializeTestingElement();
  Setup.initializeAmplitude();
});

afterEach(() => {
  Setup.resetConfig();
});

function buildRepeatButtons() {
  document.body.innerHTML =
    '<div class="amplitude-repeat" id="global-repeat-button"></div>' +
    '<div class="amplitude-repeat" data-amplitude-playlist="emancipator" id="playlist-repeat-button"></div>';
}

test("AmplitudeJS Global Repeat Sets Repeat Accordingly", () => {
  document.getElementById("global-repeat-button").click();

  expect(config.repeat).toBe(true);

  document.getElementById("global-repeat-button").click();

  expect(config.repeat).toBe(false);
});

test("AmplitudeJS Playlist Repeat Sets Repeat Accordingly", () => {
  document.getElementById("playlist-repeat-button").click();

  expect(config.playlists["emancipator"].repeat).toBe(true);

  document.getElementById("playlist-repeat-button").click();

  expect(config.playlists["emancipator"].repeat).toBe(false);
});
