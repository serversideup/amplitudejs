const Amplitude = require("../../src/index.js");

const config = require("../../src/config.js");

const Setup = require("../setup.js");

beforeEach(() => {
  buildNextButtons();
  Setup.initializeTestingElement();
  Setup.initializeAmplitude();
});

afterEach(() => {
  Setup.resetConfig();
});

function buildNextButtons() {
  document.body.innerHTML =
    '<div class="amplitude-next" id="global-next"></div>' +
    '<div class="amplitude-next" data-attr-playlist="emancipator" id="playlist-next"></div>';
}

test("AmplitudeJS Next Goes To Next Song", () => {
  document.getElementById("global-next").click();

  expect(config.active_index).toBe(1);
  expect(config.active_metadata.name).toBe(config.songs[1].name);
});

test("AmplitudeJS Next Goes To Next Shuffle Song", () => {
  Amplitude.setShuffle(true);
  document.getElementById("global-next").click();

  expect(config.active_index).toBe(1);
  expect(config.active_metadata.name).toBe(config.shuffle_list[1].name);
});

test("AmplitudeJS Next Goes To Next Playlist Song", () => {
  config.active_playlist = "emancipator";
  config.playlists["emancipator"].active_index = 0;

  document.getElementById("global-next").click();

  expect(config.playlists["emancipator"].active_index).toBe(1);
  expect(config.active_metadata.name).toBe(
    config.playlists["emancipator"].songs[1].name
  );
});

test("AmplitudeJS Playlist Next Goes To Next Playlist Song", () => {
  config.active_playlist = "trip_hop";
  config.playlists["trip_hop"].active_index = 0;

  document.getElementById("playlist-next").click();

  expect(config.playlists["trip_hop"].active_index).toBe(1);
  expect(config.active_metadata.name).toBe(
    config.playlists["trip_hop"].songs[1].name
  );
});

test("AmplitudeJS Playlist Next Goes To Next Playlist Shuffle Song", () => {
  config.active_playlist = "trip_hop";
  config.playlists["trip_hop"].active_index = 0;
  Amplitude.setShufflePlaylist("trip_hop", true);

  document.getElementById("playlist-next").click();

  expect(config.playlists["trip_hop"].active_index).toBe(1);
  expect(config.active_metadata.name).toBe(
    config.playlists["trip_hop"].shuffle_list[1].name
  );
});
