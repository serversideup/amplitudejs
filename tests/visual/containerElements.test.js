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
    '<div class="amplitude-song-container" id="song-container" data-amplitude-song-index="1"></div>' +
    '<div class="amplitude-song-container" id="song-in-playlist-container" data-amplitude-song-index="2" data-amplitude-playlist="trip_hop"></div>';
}

test("AmplitudeJS Song Containers Get Proper Classes", () => {
  Amplitude.playSongAtIndex(1);

  expect(
    document
      .getElementById("song-container")
      .classList.contains("amplitude-active-song-container")
  ).toBe(true);

  Amplitude.playSongAtIndex(2);

  expect(
    document
      .getElementById("song-container")
      .classList.contains("amplitude-active-song-container")
  ).toBe(false);
});

test("AmplitudeJS Song In Playlist Containers Get Proper Classes", () => {
  Amplitude.playPlaylistSongAtIndex(2, "trip_hop");

  expect(
    document
      .getElementById("song-in-playlist-container")
      .classList.contains("amplitude-active-song-container")
  ).toBe(true);

  Amplitude.playSongAtIndex(2);

  expect(
    document
      .getElementById("song-in-playlist-container")
      .classList.contains("amplitude-active-song-container")
  ).toBe(false);
});
