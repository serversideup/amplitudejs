const Amplitude = require("../../src/index.js");

const config = require("../../src/config.js");

const Setup = require("../setup.js");

const additionalConfig = {
  starting_playlist: 'ancient_astronauts',
  starting_playlist_song: 0,
}

beforeEach(() => {
  Setup.initializeTestingElement();
});

afterEach(() => {
  Setup.resetConfig();
});

test("AmplitudeJS Initializes active Playlists Correctly when a valid playlist is supplied", () => {
  Setup.initializeAmplitude({
    starting_playlist: 'ancient_astronauts',
    starting_playlist_song: 0,
  });

  expect(Amplitude.getActivePlaylist()).toBe('ancient_astronauts');
});

test("AmplitudeJS Initializes no active Playlists when an invalid playlist is supplied", () => {
  Setup.initializeAmplitude({
    starting_playlist: 'not_a_valid_playlist',
    starting_playlist_song: 0,
  });

  expect(Amplitude.getActivePlaylist()).toBe(null);
});

test("AmplitudeJS Initializes no active Playlists when no playlist is supplied", () => {
  Setup.initializeAmplitude();

  expect(Amplitude.getActivePlaylist()).toBe(null);
});

test("AmplitudeJS Initializes Playlists `active_index` Correctly with an integer value of `0` as `starting_playlist_song`", () => {
  Setup.initializeAmplitude({
    starting_playlist: 'ancient_astronauts',
    starting_playlist_song: 0,
  });

  expect(Amplitude.getActivePlaylistMetadata().active_index).toBe(0);
});

test("AmplitudeJS Initializes Playlists `active_index` Correctly with an integer as `starting_playlist_song`", () => {
  Setup.initializeAmplitude({
    starting_playlist: 'ancient_astronauts',
    starting_playlist_song: 1,
  });

  expect(Amplitude.getActivePlaylistMetadata().active_index).toBe(1);
});

test("AmplitudeJS Initializes Playlists `active_index` Correctly with a string as `starting_playlist_song`", () => {
  Setup.initializeAmplitude({
    starting_playlist: 'ancient_astronauts',
    starting_playlist_song: '1',
  });

  expect(Amplitude.getActivePlaylistMetadata().active_index).toBe(1);
});

test("AmplitudeJS Initializes Playlists with an index of 0 when no `starting_playlist_song` is supplied", () => {
  Setup.initializeAmplitude({
    starting_playlist: 'ancient_astronauts'
  });

  expect(Amplitude.getActivePlaylist()).toBe('ancient_astronauts');
  expect(Amplitude.getActivePlaylistMetadata().active_index).toBe(0);
});

test("AmplitudeJS Initializes Playlists `active_index` with `0` when an invalid `starting_playlist_song` is supplied", () => {
  Setup.initializeAmplitude({
    starting_playlist: 'ancient_astronauts',
    starting_playlist_song: 2, // Outside of the playlist song array, which contains only two songs
  });

  expect(Amplitude.getActivePlaylistMetadata().active_index).toBe(0);

  Setup.resetConfig();

  Setup.initializeAmplitude({
    starting_playlist: 'ancient_astronauts',
    starting_playlist_song: -1, // Generally no valid array index
  });

  expect(Amplitude.getActivePlaylistMetadata().active_index).toBe(0);

  Setup.resetConfig();

  Setup.initializeAmplitude({
    starting_playlist: 'ancient_astronauts',
    starting_playlist_song: '', // Not a Number
  });

  expect(Amplitude.getActivePlaylistMetadata().active_index).toBe(0);
});
