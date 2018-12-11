const Amplitude = require("../../src/index.js");

const config = require("../../src/config.js");

const Setup = require("../setup.js");

const Repeater = require("../../src/utilities/repeater.js");

beforeEach(() => {
  Setup.initializeTestingElement();
  Setup.initializeAmplitude();
});

afterEach(() => {
  Setup.resetConfig();
});

test("AmplitudeJS Repeater sets Repeat", () => {
  Repeater.setRepeat(true);

  expect(config.repeat).toBe(true);

  Repeater.setRepeat(false);

  expect(config.repeat).toBe(false);
});

test("AmplitudeJS Repeater Sets Repeat Playlist", () => {
  Repeater.setRepeatPlaylist(true, "trip_hop");

  expect(config.playlists["trip_hop"].repeat).toBe(true);

  Repeater.setRepeatPlaylist(false, "trip_hop");

  expect(config.playlists["trip_hop"].repeat).toBe(false);
});

test("AmplitudeJS Repeater Sets Repeat Song", () => {
  Repeater.setRepeatSong(true);

  expect(config.repeat_song).toBe(true);

  Repeater.setRepeatSong(false);

  expect(config.repeat_song).toBe(false);
});
