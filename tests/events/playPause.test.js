const Amplitude = require("../../src/index.js");

const config = require("../../src/config.js");

const Setup = require("../setup.js");

beforeEach(() => {
  buildPlayPauseButtons();
  Setup.initializeTestingElement();
  Setup.initializeAmplitude();
});

afterEach(() => {
  Setup.resetConfig();
});

function buildPlayPauseButtons() {
  document.body.innerHTML =
    '<div class="amplitude-play-pause" id="global-play-pause-button"></div>' +
    '<div class="amplitude-play-pause" data-amplitude-playlist="emancipator" id="playlist-play-pause-button"></div>' +
    '<div class="amplitude-play-pause" data-amplitude-song-index="3" id="song-play-pause-button"></div>' +
    '<div class="amplitude-play-pause" data-amplitude-playlist="trip_hop" data-amplitude-song-index="1" id="song-in-playlist-play-pause-button"></div>';
}

test("AmplitudeJS Play/Pause Toggles Song Playing State", () => {
  document.getElementById("global-play-pause-button").click();

  expect(config.audio.paused).toBe(false);

  document.getElementById("global-play-pause-button").click();

  expect(config.audio.paused).toBe(true);
});

test("AmplitudeJS Playlist Play/Pause Toggles Playlist Song Playing State", () => {
  document.getElementById("playlist-play-pause-button").click();

  expect(config.audio.paused).toBe(false);
  expect(config.active_playlist).toBe("emancipator");
  expect(config.playlists["emancipator"].active_index).toBe(0);
  expect(config.active_index).toBeNull();

  document.getElementById("playlist-play-pause-button").click();

  expect(config.audio.paused).toBe(true);
});

test("AmplitudeJS Song Play/Pause Toggles Song Playing State", () => {
  document.getElementById("song-play-pause-button").click();

  expect(config.audio.paused).toBe(false);
  expect(config.active_index).toBe(3);

  document.getElementById("song-play-pause-button").click();

  expect(config.audio.paused).toBe(true);
});

test("AmplitudeJS Song In Playlist Play/Pause Toggles Song In Playlist Playing State", () => {
  document.getElementById("song-in-playlist-play-pause-button").click();

  expect(config.active_playlist).toBe("trip_hop");
  expect(config.playlists["trip_hop"].active_index).toBe(1);
  expect(config.audio.paused).toBe(false);

  document.getElementById("song-in-playlist-play-pause-button").click();

  expect(config.audio.paused).toBe(true);
});

test("AmplitudeJS Starts the Appropriate Song When Clicking Play On Another Song", () => {
  document.getElementById("song-play-pause-button").click();

  expect(config.audio.paused).toBe(false);
  expect(config.active_index).toBe(3);

  document.getElementById("song-in-playlist-play-pause-button").click();

  expect(config.active_playlist).toBe("trip_hop");
  expect(config.playlists["trip_hop"].active_index).toBe(1);
  expect(config.audio.paused).toBe(false);
});
