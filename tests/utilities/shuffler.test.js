const Amplitude = require("../../src/index.js");

const config = require("../../src/config.js");

const Setup = require("../setup.js");

const Shuffler = require("../../src/utilities/shuffler.js");

beforeEach(() => {
  Setup.initializeTestingElement();
  Setup.initializeAmplitude();
});

afterEach(() => {
  Setup.resetConfig();
});

test("AmplitudeJS Shuffler Sets The Shuffle State", () => {
  Shuffler.setShuffle(true);

  expect(config.shuffle_on).toBe(true);
  expect(config.shuffle_list.length).toBe(config.songs.length);

  Shuffler.setShuffle(false);

  expect(config.shuffle_on).toBe(false);
  expect(config.shuffle_list.length).toBe(0);
});

test("AmplitudeJS Toggle Shuffle Toggles the Shuffle State", () => {
  Shuffler.toggleShuffle();

  expect(config.shuffle_on).toBe(true);
  expect(config.shuffle_list.length).toBe(config.songs.length);

  Shuffler.toggleShuffle();

  expect(config.shuffle_on).toBe(false);
  expect(config.shuffle_list.length).toBe(0);
});

test("AmplitudeJS Shuffler Sets The Playlist Shuffle State", () => {
  Shuffler.setShufflePlaylist("trip_hop", true);

  expect(config.playlists["trip_hop"].shuffle).toBe(true);
  expect(config.playlists["trip_hop"].shuffle_list.length).toBe(
    config.playlists["trip_hop"].songs.length
  );

  Shuffler.setShufflePlaylist("trip_hop", false);

  expect(config.playlists["trip_hop"].shuffle).toBe(false);
  expect(config.playlists["trip_hop"].shuffle_list.length).toBe(0);
});

test("AmplitudeJS Toggle Shuffle Playlist Toggles the Shuffle State", () => {
  Shuffler.toggleShufflePlaylist("trip_hop");

  expect(config.playlists["trip_hop"].shuffle).toBe(true);
  expect(config.playlists["trip_hop"].shuffle_list.length).toBe(
    config.playlists["trip_hop"].songs.length
  );

  Shuffler.toggleShufflePlaylist("trip_hop");

  expect(config.playlists["trip_hop"].shuffle).toBe(false);
  expect(config.playlists["trip_hop"].shuffle_list.length).toBe(0);
});

test("AmplitudeJS Shuffles Songs", () => {
  Shuffler.shuffleSongs();

  expect(config.shuffle_list.length).toBe(config.songs.length);
});

test("AmplitudeJS Shuffles Playlist Songs", () => {
  Shuffler.shufflePlaylistSongs("trip_hop");

  expect(config.playlists["trip_hop"].shuffle_list.length).toBe(
    config.playlists["trip_hop"].songs.length
  );
});
