const Amplitude = require("../../src/index.js");

const config = require("../../src/config.js");

const Setup = require("../setup.js");

beforeEach(() => {
  buildShuffleButtons();
  Setup.initializeTestingElement();
  Setup.initializeAmplitude();
});

afterEach(() => {
  Setup.resetConfig();
});

function buildShuffleButtons() {
  document.body.innerHTML =
    '<div class="amplitude-shuffle" id="global-shuffle-button"></div>' +
    '<div class="amplitude-shuffle" data-amplitude-playlist="emancipator" id="playlist-shuffle-button"></div>';
}

test("AmplitudeJS Shuffles Songs Correctly", () => {
  document.getElementById("global-shuffle-button").click();

  expect(config.shuffle_on).toBe(true);
  expect(config.shuffle_list.length).toBe(11);

  document.getElementById("global-shuffle-button").click();

  expect(config.shuffle_on).toBe(false);
  expect(config.shuffle_list.length).toBe(0);
});

test("AmplitudeJS Shuffles Playlist Correctly", () => {
  document.getElementById("playlist-shuffle-button").click();

  expect(config.playlists["emancipator"].shuffle).toBe(true);
  expect(config.playlists["emancipator"].shuffle_list.length).toBe(
    config.playlists["emancipator"].songs.length
  );
  expect(config.playlists["trip_hop"].shuffle).toBe(false);

  document.getElementById("playlist-shuffle-button").click();

  expect(config.playlists["emancipator"].shuffle).toBe(false);
  expect(config.playlists["emancipator"].shuffle_list.length).toBe(0);
});
