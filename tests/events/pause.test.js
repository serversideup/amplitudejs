const Amplitude = require("../../src/index.js");

const config = require("../../src/config.js");

const Setup = require("../setup.js");

beforeEach(() => {
  buildPauseButtons();
  Setup.initializeTestingElement();
  Setup.initializeAmplitude();
});

afterEach(() => {
  Setup.resetConfig();
});

function buildPauseButtons() {
  document.body.innerHTML =
    '<div class="amplitude-pause" id="global-pause"></div>' +
    '<div class="amplitude-pause" data-amplitude-playlist="emancipator" id="playlist-pause"></div>' +
    '<div class="amplitude-pause" data-amplitude-song-index="1" id="song-pause"></div>' +
    '<div class="amplitude-pause" data-amplitude-playlist="emancipator" data-amplitude-song-index="1" id="song-in-playlist-pause"></div>';
}

test("AmplitudeJS Global Pause Pauses The Audio", () => {
  config.audio.paused = false;

  document.getElementById("global-pause").click();

  expect(config.audio.paused).toBe(true);
});

test("AmplitudeJS Playlist Pause Does Not Pause The Audio", () => {
  config.audio.paused = false;

  document.getElementById("playlist-pause").click();

  expect(config.audio.paused).toBe(false);
});

test("AmplitudeJS Playlist Pause Pauses The Audio", () => {
  config.audio.paused = false;
  config.active_playlist = "emancipator";

  document.getElementById("playlist-pause").click();

  expect(config.audio.paused).toBe(true);
});

test("AmplitudeJS Song Pause Pauses The Audio", () => {
  config.audio.paused = false;
  config.active_index = 1;

  document.getElementById("song-pause").click();

  expect(config.audio.paused).toBe(true);
});

test("AmplitudeJS Song Pause Does Not Pause The Audio", () => {
  config.audio.paused = false;
  config.active_index = 4;

  document.getElementById("song-pause").click();

  expect(config.audio.paused).toBe(false);
});

test("AmplitudeJS Song In Playlist Pause Pauses The Audio", () => {
  config.audio.paused = false;
  config.active_playlist = "emancipator";
  config.playlists["emancipator"].active_index = 1;

  document.getElementById("song-in-playlist-pause").click();

  expect(config.audio.paused).toBe(true);
});

test("AmplitudeJS Song In Playlist Pause Does Not Pause The Audio", () => {
  config.audio.paused = false;
  config.active_playlist = "trip_hop";
  config.playlists["trip_hop"].active_index = 1;

  document.getElementById("song-in-playlist-pause").click();

  expect(config.audio.paused).toBe(false);
});

test("AmplitudeJS Song In Playlist Pause Does Not Pause The Audio Wrong Index", () => {
  config.audio.paused = false;
  config.active_playlist = "emancipator";
  config.playlists["trip_hop"].active_index = 0;

  document.getElementById("song-in-playlist-pause").click();

  expect(config.audio.paused).toBe(false);
});
