const Amplitude = require("../../src/index.js");

const config = require("../../src/config.js");

const Setup = require("../setup.js");

beforeEach(() => {
  buildSkipToButtons();
  Setup.initializeTestingElement();
  Setup.initializeAmplitude();
});

afterEach(() => {
  Setup.resetConfig();
});

function buildSkipToButtons() {
  document.body.innerHTML =
    '<div class="amplitude-skip-to" data-amplitude-location="25" data-amplitude-song-index="2" id="global-skip-to-song"></div>' +
    '<div class="amplitude-skip-to" data-amplitude-location="15" data-amplitude-song-index="1" data-amplitude-playlist="emancipator" id="playlist-skip-to-song"></div>';
}

test("AmplitudeJS skips to a location in a song", () => {
  document.getElementById("global-skip-to-song").click();

  expect(config.active_index).toBe(2);
});

test("AmplitudeJS skips to a location in a playlist", () => {
  document.getElementById("playlist-skip-to-song").click();

  expect(config.active_playlist).toBe("emancipator");
  expect(config.playlists["emancipator"].active_index).toBe(1);
});
