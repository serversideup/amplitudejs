const Amplitude = require("../../src/index.js");

const config = require("../../src/config.js");

const Setup = require("../setup.js");

const ConfigState = require("../../src/utilities/configState.js");

beforeEach(() => {
  Setup.initializeTestingElement();
  Setup.initializeAmplitude();
});

afterEach(() => {
  Setup.resetConfig();
});

test("AmplitudeJS Resets Config", () => {
  ConfigState.resetConfig();

  expect(config.active_metadata).toEqual({});
  expect(config.active_album).toBe("");
  expect(config.active_index).toBe(0);
  expect(config.active_playlist).toBe(null);
  expect(config.playback_speed).toBe(1.0);
  expect(config.callbacks).toEqual({});
  expect(config.songs).toEqual([]);
  expect(config.playlists).toEqual({});
  expect(config.start_song).toBe("");
  expect(config.starting_playlist).toBe("");
  expect(config.starting_playlist_song).toBe("");
  expect(config.repeat).toBe(false);
  expect(config.shuffle_list).toEqual({});
  expect(config.shuffle_on).toBe(false);
  expect(config.default_album_art).toBe("");
  expect(config.default_playlist_art).toBe("");
  expect(config.debug).toBe(false);
  expect(config.volume).toBe(0.5);
  expect(config.pre_mute_volume).toBe(0.5);
  expect(config.volume_increment).toBe(5);
  expect(config.volume_decrement).toBe(5);
  expect(config.soundcloud_client).toBe("");
  expect(config.soundcloud_use_art).toBe(false);
  expect(config.soundcloud_song_count).toBe(0);
  expect(config.soundcloud_songs_ready).toBe(0);
  expect(config.continue_next).toBe(true);
});

test("AmplitudeJS Sets Player State", () => {
  ConfigState.setPlayerState();
  expect(config.player_state).toBe("paused");

  config.audio.currentTime = 0;
  config.audio.paused = true;

  ConfigState.setPlayerState();
  expect(config.player_state).toBe("stopped");

  Amplitude.playSongAtIndex(0);

  ConfigState.setPlayerState();
  expect(config.player_state).toBe("playing");
});
