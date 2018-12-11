/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Handles the state of the config object.
 *
 * @module utilities/ConfigState
 */
let ConfigState = (function() {
  /**
   * Resets the config to the default state. This is called on initialize
   * to ensure the user's config is what matters.
   *
   * Public Accessor: AmplitudeHelpers.resetConfig()
   *
   * @access public
   */
  function resetConfig() {
    config.audio = new Audio();
    config.active_metadata = {};
    config.active_album = "";
    config.active_index = 0;
    config.active_playlist = null;
    config.playback_speed = 1.0;
    config.callbacks = {};
    config.songs = [];
    config.playlists = {};
    config.start_song = "";
    config.starting_playlist = "";
    config.starting_playlist_song = "";
    config.repeat = false;
    config.shuffle_list = {};
    config.shuffle_on = false;
    config.default_album_art = "";
    config.default_playlist_art = "";
    config.debug = false;
    config.volume = 0.5;
    config.pre_mute_volume = 0.5;
    config.volume_increment = 5;
    config.volume_decrement = 5;
    config.soundcloud_client = "";
    config.soundcloud_use_art = false;
    config.soundcloud_song_count = 0;
    config.soundcloud_songs_ready = 0;
    config.continue_next = true;
  }

  /**
   * Sets the state of the player.
   */
  function setPlayerState() {
    /*
      If paused and the current time is 0 the player is stopped.
    */
    if (config.audio.paused && config.audio.currentTime == 0) {
      config.player_state = "stopped";
    }

    /*
      If paused and the current time is greater than 0 the player is
      paused.
    */
    if (config.audio.paused && config.audio.currentTime > 0) {
      config.player_state = "paused";
    }

    /*
      If playing, the current state is playing.
    */
    if (!config.audio.paused) {
      config.player_state = "playing";
    }
  }

  /*
		Returns the public facing methods
	*/
  return {
    resetConfig: resetConfig,
    setPlayerState: setPlayerState
  };
})();

export default ConfigState;
