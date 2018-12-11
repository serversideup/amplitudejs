const Amplitude = require("../../src/index.js");

const config = require("../../src/config.js");

const Setup = require("../setup.js");

beforeEach(() => {
  buildRepeatElements();
  Setup.initializeTestingElement();
  Setup.initializeAmplitude();
});

afterEach(() => {
  Setup.resetConfig();
});

function buildRepeatElements() {
  document.body.innerHTML =
    '<div class="amplitude-repeat" id="global-repeat"></div>' +
    '<div class="amplitude-repeat" data-amplitude-playlist="trip_hop" id="playlist-repeat"></div>' +
    '<div class="amplitude-repeat-song" id="global-repeat-song"></div>';
}

test("AmplitudeJS Repeat Elements Get Proper Classes With Global Click", () => {
  document.getElementById("global-repeat").click();

  expect(config.repeat).toBe(true);
  expect(
    document
      .getElementById("global-repeat")
      .classList.contains("amplitude-repeat-on")
  ).toBe(true);
  expect(
    document
      .getElementById("playlist-repeat")
      .classList.contains("amplitude-repeat-on")
  ).toBe(true);

  document.getElementById("global-repeat").click();

  expect(config.repeat).toBe(false);
  expect(
    document
      .getElementById("global-repeat")
      .classList.contains("amplitude-repeat-on")
  ).toBe(false);
  expect(
    document
      .getElementById("playlist-repeat")
      .classList.contains("amplitude-repeat-on")
  ).toBe(false);
});

test("AmplitudeJS Repeat Elements Get Proper Classes With Playlist Click", () => {
  document.getElementById("playlist-repeat").click();

  expect(config.playlists["trip_hop"].repeat).toBe(true);
  expect(
    document
      .getElementById("global-repeat")
      .classList.contains("amplitude-repeat-off")
  ).toBe(true);
  expect(
    document
      .getElementById("playlist-repeat")
      .classList.contains("amplitude-repeat-on")
  ).toBe(true);

  document.getElementById("playlist-repeat").click();

  expect(config.playlists["trip_hop"].repeat).toBe(false);
  expect(
    document
      .getElementById("global-repeat")
      .classList.contains("amplitude-repeat-off")
  ).toBe(true);
  expect(
    document
      .getElementById("playlist-repeat")
      .classList.contains("amplitude-repeat-off")
  ).toBe(true);
});

test("AmplitudeJS Repeat Song Elements Get Proper Classes With Click", () => {
  document.getElementById("global-repeat-song").click();

  expect(config.repeat_song).toBe(true);
  expect(
    document
      .getElementById("global-repeat-song")
      .classList.contains("amplitude-repeat-song-on")
  ).toBe(true);

  document.getElementById("global-repeat-song").click();

  expect(config.repeat_song).toBe(false);
  expect(
    document
      .getElementById("global-repeat-song")
      .classList.contains("amplitude-repeat-song-off")
  ).toBe(true);
});
