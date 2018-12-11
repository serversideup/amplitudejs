const Amplitude = require("../../src/index.js");

const config = require("../../src/config.js");

const Setup = require("../setup.js");

const Checks = require("../../src/utilities/checks.js");

beforeEach(() => {
  Setup.initializeTestingElement();
  Setup.initializeAmplitude();
});

afterEach(() => {
  Setup.resetConfig();
});

test("AmplitudeJS New Song Passes", () => {
  var newSong = Checks.newSong(config.active_playlist, 1);

  expect(newSong).toBe(true);
});

test("AmplitudeJS New Song Fails", () => {
  var newSong = Checks.newSong(config.active_playlist, 0);

  expect(newSong).toBe(false);
});

test("AmplitudeJS New Song Passes In Playlist", () => {
  config.active_playlist = "trip_hop";
  config.playlists["trip_hop"].active_index = 1;

  var newSong = Checks.newSong("trip_hop", 1);
  expect(newSong).toBe(false);
});

test("AmplitudeJS New Song Fails In Playlist", () => {
  config.active_playlist = "trip_hop";
  config.playlists["trip_hop"].active_index = 0;

  var newSong = Checks.newSong("trip_hop", 1);
  expect(newSong).toBe(true);
});

test("AmplitudeJS New Album Returns False", () => {
  var newAlbum = Checks.newAlbum(config.active_album);
  expect(newAlbum).toBe(false);
});

test("AmplitudeJS New Album Returns True", () => {
  var newAlbum = Checks.newAlbum("test");
  expect(newAlbum).toBe(true);
});

test("AmplitudeJS New Playlist Returns false", () => {
  var newPlaylist = Checks.newPlaylist(config.active_playlist);
  expect(newPlaylist).toBe(false);
});

test("AmplitudeJS New Playlist Returns true", () => {
  var newPlaylist = Checks.newPlaylist("test");
  expect(newPlaylist).toBe(true);
});

test("AmplitudeJS Is URL Returns false", () => {
  var isURL = Checks.isURL("http://");
  expect(isURL).toBe(false);
});

test("AmplitudeJS Is URL Returns true", () => {
  var isURL = Checks.isURL("http://www.google.com");
  expect(isURL).toBe(true);
});

test("AmplitudeJS Is Int Returns false", () => {
  var isInt = Checks.isInt("hey");
  expect(isInt).toBe(false);
});

test("AmplitudeJS Is Int Returns true", () => {
  var isInt = Checks.isInt(1);
  expect(isInt).toBe(true);
});
