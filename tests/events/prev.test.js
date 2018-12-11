const Amplitude = require("../../src/index.js");

const config = require("../../src/config.js");

const Setup = require("../setup.js");

beforeEach(() => {
  buildPreviousButtons();
  Setup.initializeTestingElement();
  Setup.initializeAmplitude();
});

afterEach(() => {
  Setup.resetConfig();
});

function buildPreviousButtons() {
  document.body.innerHTML =
    '<div class="amplitude-prev" id="global-prev-button"></div>' +
    '<div class="amplitude-prev" data-amplitude-playlist="emancipator" id="playlist-prev-button"></div>';
}

test("AmplitudeJS goes to the previous song", () => {
  document.getElementById("global-prev-button").click();

  expect(config.active_index).toBe(config.songs.length - 1);
  expect(config.audio.paused).toBe(false);
});

test("AmplitudeJS Global Previous Goes to Previous Playlist Song If In Playlist", () => {
  config.active_playlist = "emancipator";

  document.getElementById("global-prev-button").click();

  expect(config.playlists["emancipator"].active_index).toBe(
    config.playlists["emancipator"].songs.length - 1
  );
});

test("AmplitudeJS Playlist Previous goes to the Previous Song", () => {
  config.active_playlist = "emancipator";

  document.getElementById("playlist-prev-button").click();

  expect(config.playlists["emancipator"].active_index).toBe(
    config.playlists["emancipator"].songs.length - 1
  );
});

test("AmplitudeJS Playlist Previous Does Not Do Anything If Not In Playlist", () => {
  document.getElementById("playlist-prev-button").click();

  expect(config.active_index).toBe(0);
});
