const Amplitude = require("../../src/index.js");

const config = require("../../src/config.js");

const Setup = require("../setup.js");

const AudioNavigation = require("../../src/utilities/audioNavigation.js");

beforeEach(() => {
  Setup.initializeTestingElement();
  Setup.initializeAmplitude();
});

afterEach(() => {
  Setup.resetConfig();
});

test("AmplitudeJS Goes To the Next Song", () => {
  AudioNavigation.setNext();

  expect(config.active_index).toBe(1);
  expect(config.active_metadata).toBe(config.songs[1]);
});

test("AmplitudeJS Repeats the Song When Next Is Called", () => {
  config.repeat_song = true;

  AudioNavigation.setNext();

  expect(config.active_index).toBe(0);
  expect(config.active_metadata).toBe(config.songs[0]);
});

test("AmplitudeJS Goes To the Next Song In The Shuffle List", () => {
  Amplitude.setShuffle(true);

  AudioNavigation.setNext();

  expect(config.active_index).toBe(1);
  expect(config.active_metadata).toBe(config.shuffle_list[1]);
});

test("AmplitudeJS Goes To the Next Song In Playlist", () => {
  Amplitude.playPlaylistSongAtIndex(0, "trip_hop");

  AudioNavigation.setNextPlaylist("trip_hop");

  expect(config.playlists["trip_hop"].active_index).toBe(1);
  expect(config.active_metadata).toBe(config.playlists["trip_hop"].songs[1]);
});

test("AmplitudeJS Repeats the Song When Next Is Called In Playlist", () => {
  Amplitude.playPlaylistSongAtIndex(0, "trip_hop");
  config.repeat_song = true;

  AudioNavigation.setNextPlaylist("trip_hop");

  expect(config.playlists["trip_hop"].active_index).toBe(0);
  expect(config.active_metadata).toBe(config.playlists["trip_hop"].songs[0]);
});

test("AmplitudeJS Goes To the Next Song In The Shuffle List In Playlist", () => {
  Amplitude.setShufflePlaylist("trip_hop", true);
  Amplitude.playPlaylistSongAtIndex(0, "trip_hop");

  AudioNavigation.setNextPlaylist("trip_hop");

  expect(config.playlists["trip_hop"].active_index).toBe(1);
  expect(config.active_metadata).toBe(
    config.playlists["trip_hop"].shuffle_list[1]
  );
});

test("AmplitudeJS Goes To the Previous Song", () => {
  AudioNavigation.setPrevious();

  expect(config.active_index).toBe(config.songs.length - 1);
  expect(config.active_metadata).toBe(config.songs[config.songs.length - 1]);
});

test("AmplitudeJS Goes To Repeats the Song When Previous Is Called", () => {
  config.repeat_song = true;

  AudioNavigation.setPrevious();

  expect(config.active_index).toBe(0);
  expect(config.active_metadata).toBe(config.songs[0]);
});

test("AmplitudeJS Goes To the Previous Song In The Shuffle List", () => {
  Amplitude.setShuffle(true);

  AudioNavigation.setPrevious();

  expect(config.active_index).toBe(config.songs.length - 1);
  expect(config.active_metadata).toBe(
    config.shuffle_list[config.shuffle_list.length - 1]
  );
});

test("AmplitudeJS Goes To the Previous Song In Playlist", () => {
  Amplitude.playPlaylistSongAtIndex(0, "trip_hop");

  AudioNavigation.setPreviousPlaylist("trip_hop");

  expect(config.playlists["trip_hop"].active_index).toBe(
    config.playlists["trip_hop"].songs.length - 1
  );
  expect(config.active_metadata).toBe(
    config.playlists["trip_hop"].songs[
      config.playlists["trip_hop"].songs.length - 1
    ]
  );
});

test("AmplitudeJS Repeats the Song When Previous Is Called In Playlist", () => {
  Amplitude.playPlaylistSongAtIndex(0, "trip_hop");
  config.repeat_song = true;

  AudioNavigation.setPreviousPlaylist("trip_hop");

  expect(config.playlists["trip_hop"].active_index).toBe(0);
  expect(config.active_metadata).toBe(config.playlists["trip_hop"].songs[0]);
});

test("AmplitudeJS Goes To the Previous Song In The Shuffle List In Playlist", () => {
  Amplitude.setShufflePlaylist("trip_hop", true);
  Amplitude.playPlaylistSongAtIndex(0, "trip_hop");

  AudioNavigation.setPreviousPlaylist("trip_hop");

  expect(config.playlists["trip_hop"].active_index).toBe(
    config.playlists["trip_hop"].shuffle_list.length - 1
  );
  expect(config.active_metadata).toBe(
    config.playlists["trip_hop"].shuffle_list[
      config.playlists["trip_hop"].shuffle_list.length - 1
    ]
  );
});
