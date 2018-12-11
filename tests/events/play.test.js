const Amplitude = require("../../src/index.js");

const config = require("../../src/config.js");

const Setup = require("../setup.js");

beforeEach(() => {
  buildPlayButtons();
  Setup.initializeTestingElement();
  Setup.initializeAmplitude();
});

afterEach(() => {
  Setup.resetConfig();
});

function buildPlayButtons() {
  document.body.innerHTML =
    '<div class="amplitude-play" id="global-play"></div>' +
    '<div class="amplitude-play" data-amplitude-playlist="emancipator" id="playlist-play"></div>' +
    '<div class="amplitude-play" data-amplitude-song-index="1" id="song-play"></div>' +
    '<div class="amplitude-play" data-amplitude-playlist="emancipator" data-amplitude-song-index="1" id="song-in-playlist-play"></div>';
}

test("AmplitudeJS Global Play Plays the song", () => {
  config.audio.paused = true;

  document.getElementById("global-play").click();

  expect(config.active_metadata).toBe(config.songs[0]);
  expect(config.audio.paused).toBe(false);
});

test("AmplitudeJS Playlist Play Changes Playlist, Plays Song", () => {
  config.audio.paused = true;

  document.getElementById("playlist-play").click();

  expect(config.active_playlist).toBe("emancipator");
  expect(config.active_metadata).toBe(config.playlists["emancipator"].songs[0]);
  expect(config.audio.paused).toBe(false);
});

test("AmplitudeJS Song Play Nullifies Playlist, Plays Song Defined", () => {
  config.audio.paused = true;
  config.active_playlist = "emancipator";

  document.getElementById("song-play").click();

  expect(config.active_playlist).toBe(null);
  expect(config.active_metadata).toBe(config.songs[1]);
  expect(config.audio.paused).toBe(false);
});

test("AmplitudeJS Song In Playlist Play Plays Song Defined In Playlist", () => {
  config.audio.paused = true;

  document.getElementById("song-in-playlist-play").click();

  expect(config.active_playlist).toBe("emancipator");
  expect(config.active_metadata).toBe(config.playlists["emancipator"].songs[1]);
  expect(config.playlists["emancipator"].active_index).toBe(1);
  expect(config.audio.paused).toBe(false);
});
