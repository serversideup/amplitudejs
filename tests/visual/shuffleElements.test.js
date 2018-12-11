const Amplitude = require("../../src/index.js");

const config = require("../../src/config.js");

const Setup = require("../setup.js");

beforeEach(() => {
  buildShuffleElements();
  Setup.initializeTestingElement();
  Setup.initializeAmplitude();
});

afterEach(() => {
  Setup.resetConfig();
});

function buildShuffleElements() {
  document.body.innerHTML =
    '<div class="amplitude-shuffle" id="global-shuffle"></div>' +
    '<div class="amplitude-shuffle" data-amplitude-playlist="trip_hop" id="playlist-shuffle"></div>';
}

test("AmplitudeJS Shuffles Songs Accordingly", () => {
  document.getElementById("global-shuffle").click();

  expect(
    document
      .getElementById("global-shuffle")
      .classList.contains("amplitude-shuffle-on")
  );
  expect(config.shuffle_list.length).toBe(config.songs.length);

  document.getElementById("global-shuffle").click();

  expect(
    document
      .getElementById("global-shuffle")
      .classList.contains("amplitude-shuffle-off")
  );
  expect(config.shuffle_list.length).toBe(0);
});

test("AmplitudeJS Shuffles Playlist Songs Accordingly", () => {
  document.getElementById("playlist-shuffle").click();

  expect(
    document
      .getElementById("playlist-shuffle")
      .classList.contains("amplitude-shuffle-on")
  );
  expect(config.playlists["trip_hop"].shuffle_list.length).toBe(
    config.playlists["trip_hop"].songs.length
  );

  document.getElementById("playlist-shuffle").click();

  expect(
    document
      .getElementById("playlist-shuffle")
      .classList.contains("amplitude-shuffle-off")
  );
  expect(config.playlists["trip_hop"].shuffle_list.length).toBe(0);
});
