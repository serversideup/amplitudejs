const Amplitude = require("../../src/index.js");

const config = require("../../src/config.js");

const Setup = require("../setup.js");

beforeEach(() => {
  buildContainerElements();
  Setup.initializeTestingElement();
  Setup.initializeAmplitude();
});

afterEach(() => {
  Setup.resetConfig();
});

function buildContainerElements() {
  document.body.innerHTML =
    '<div class="amplitude-play-pause" id="global-play-pause"></div>' +
    '<div class="amplitude-play-pause" data-amplitude-playlist="trip_hop" id="playlist-play-pause"></div>' +
    '<div class="amplitude-play-pause" data-amplitude-song-index="2" id="song-play-pause"></div>' +
    '<div class="amplitude-play-pause" data-amplitude-song-index="0" id="song-zero-play-pause"></div>' +
    '<div class="amplitude-play-pause" data-amplitude-song-index="1" data-amplitude-playlist="trip_hop" id="song-in-playlist-play-pause"></div>';
}

test("AmplitudeJS Play Pause Buttons Get Proper Classes After Global Clicked", () => {
  document.getElementById("global-play-pause").click();

  expect(
    document
      .getElementById("global-play-pause")
      .classList.contains("amplitude-playing")
  ).toBe(true);
  expect(
    document
      .getElementById("playlist-play-pause")
      .classList.contains("amplitude-paused")
  ).toBe(true);
  expect(
    document
      .getElementById("song-play-pause")
      .classList.contains("amplitude-paused")
  ).toBe(true);
  expect(
    document
      .getElementById("song-zero-play-pause")
      .classList.contains("amplitude-playing")
  ).toBe(true);
  expect(
    document
      .getElementById("song-in-playlist-play-pause")
      .classList.contains("amplitude-paused")
  ).toBe(true);

  document.getElementById("global-play-pause").click();

  expect(
    document
      .getElementById("global-play-pause")
      .classList.contains("amplitude-paused")
  ).toBe(true);
  expect(
    document
      .getElementById("playlist-play-pause")
      .classList.contains("amplitude-paused")
  ).toBe(true);
  expect(
    document
      .getElementById("song-play-pause")
      .classList.contains("amplitude-paused")
  ).toBe(true);
  expect(
    document
      .getElementById("song-zero-play-pause")
      .classList.contains("amplitude-paused")
  ).toBe(true);
  expect(
    document
      .getElementById("song-in-playlist-play-pause")
      .classList.contains("amplitude-paused")
  ).toBe(true);
});

test("AmplitudeJS Play Pause Buttons Get Proper Classes After Playlist Clicked", () => {
  document.getElementById("playlist-play-pause").click();

  expect(
    document
      .getElementById("global-play-pause")
      .classList.contains("amplitude-playing")
  ).toBe(true);
  expect(
    document
      .getElementById("playlist-play-pause")
      .classList.contains("amplitude-playing")
  ).toBe(true);
  expect(
    document
      .getElementById("song-play-pause")
      .classList.contains("amplitude-paused")
  ).toBe(true);
  expect(
    document
      .getElementById("song-zero-play-pause")
      .classList.contains("amplitude-paused")
  ).toBe(true);
  expect(
    document
      .getElementById("song-in-playlist-play-pause")
      .classList.contains("amplitude-paused")
  ).toBe(true);

  expect(config.active_playlist).toBe("trip_hop");
  expect(config.playlists["trip_hop"].active_index).toBe(0);

  document.getElementById("playlist-play-pause").click();

  expect(
    document
      .getElementById("global-play-pause")
      .classList.contains("amplitude-paused")
  ).toBe(true);
  expect(
    document
      .getElementById("playlist-play-pause")
      .classList.contains("amplitude-paused")
  ).toBe(true);
  expect(
    document
      .getElementById("song-play-pause")
      .classList.contains("amplitude-paused")
  ).toBe(true);
  expect(
    document
      .getElementById("song-zero-play-pause")
      .classList.contains("amplitude-paused")
  ).toBe(true);
  expect(
    document
      .getElementById("song-in-playlist-play-pause")
      .classList.contains("amplitude-paused")
  ).toBe(true);
});

test("AmplitudeJS Play Pause Buttons Get Proper Classes After Song Clicked", () => {
  document.getElementById("song-play-pause").click();

  expect(
    document
      .getElementById("global-play-pause")
      .classList.contains("amplitude-playing")
  ).toBe(true);
  expect(
    document
      .getElementById("playlist-play-pause")
      .classList.contains("amplitude-paused")
  ).toBe(true);
  expect(
    document
      .getElementById("song-play-pause")
      .classList.contains("amplitude-playing")
  ).toBe(true);
  expect(
    document
      .getElementById("song-zero-play-pause")
      .classList.contains("amplitude-paused")
  ).toBe(true);
  expect(
    document
      .getElementById("song-in-playlist-play-pause")
      .classList.contains("amplitude-paused")
  ).toBe(true);

  expect(config.active_playlist).toBe(null);
  expect(config.active_index).toBe(2);

  document.getElementById("song-play-pause").click();

  expect(
    document
      .getElementById("global-play-pause")
      .classList.contains("amplitude-paused")
  ).toBe(true);
  expect(
    document
      .getElementById("playlist-play-pause")
      .classList.contains("amplitude-paused")
  ).toBe(true);
  expect(
    document
      .getElementById("song-play-pause")
      .classList.contains("amplitude-paused")
  ).toBe(true);
  expect(
    document
      .getElementById("song-zero-play-pause")
      .classList.contains("amplitude-paused")
  ).toBe(true);
  expect(
    document
      .getElementById("song-in-playlist-play-pause")
      .classList.contains("amplitude-paused")
  ).toBe(true);
});

test("AmplitudeJS Play Pause Buttons Get Proper Classes After Song In Playlist Clicked", () => {
  document.getElementById("song-in-playlist-play-pause").click();

  expect(
    document
      .getElementById("global-play-pause")
      .classList.contains("amplitude-playing")
  ).toBe(true);
  expect(
    document
      .getElementById("playlist-play-pause")
      .classList.contains("amplitude-playing")
  ).toBe(true);
  expect(
    document
      .getElementById("song-play-pause")
      .classList.contains("amplitude-paused")
  ).toBe(true);
  expect(
    document
      .getElementById("song-zero-play-pause")
      .classList.contains("amplitude-paused")
  ).toBe(true);
  expect(
    document
      .getElementById("song-in-playlist-play-pause")
      .classList.contains("amplitude-playing")
  ).toBe(true);

  expect(config.active_playlist).toBe("trip_hop");
  expect(config.playlists["trip_hop"].active_index).toBe(1);

  document.getElementById("song-in-playlist-play-pause").click();

  expect(
    document
      .getElementById("global-play-pause")
      .classList.contains("amplitude-paused")
  ).toBe(true);
  expect(
    document
      .getElementById("playlist-play-pause")
      .classList.contains("amplitude-paused")
  ).toBe(true);
  expect(
    document
      .getElementById("song-play-pause")
      .classList.contains("amplitude-paused")
  ).toBe(true);
  expect(
    document
      .getElementById("song-zero-play-pause")
      .classList.contains("amplitude-paused")
  ).toBe(true);
  expect(
    document
      .getElementById("song-in-playlist-play-pause")
      .classList.contains("amplitude-paused")
  ).toBe(true);
});
