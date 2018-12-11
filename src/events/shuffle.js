/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Imports the shuffler utility
 * @module utilities/Shuffler
 */
import Shuffler from "../utilities/shuffler.js";

/**
 * Imports the visual shuffle elements
 * @module visual/ShuffleElements
 */
import ShuffleElements from "../visual/shuffleElements.js";

/**
 * Handles all of the shuffle events
 * @module events/Shuffle
 */
let Shuffle = (function() {
  /**
   * Handles an event on the shuffle button
   *
   * HANDLER FOR:       class="amplitude-shuffle"
   *
   * GLOBAL:            class="amplitude-shuffle"
   * PLAYLIST:          class="amplitude-shuffle" amplitude-playlist="playlist_key"
   *
   * @access public
   */
  function handle() {
    /*
      If the touch is moving, we do not want to accidentally touch the play
      pause element and fire an event.
    */
    if (!config.is_touch_moving) {
      /*
        Get the playlist attribute
      */
      let playlist = this.getAttribute("data-amplitude-playlist");

      /*
				Check to see if the shuffle button belongs to a playlist
			*/
      if (playlist == null) {
        handleGlobalShuffle();
      } else {
        handlePlaylistShuffle(playlist);
      }
    }
  }

  /**
   * Handles the event on the global shuffle button.
   */
  function handleGlobalShuffle() {
    /*
      Either shuffles or removes shuffle on the global state.
    */
    Shuffler.toggleShuffle();

    /*
      Visualize the shuffle state change.
    */
    ShuffleElements.syncMain(config.shuffle_on);
  }

  /**
   * Handles the event on the playlist shuffle button.
   *
   * @param {string} playlist - The playlist string the shuffle button belongs to.
   */
  function handlePlaylistShuffle(playlist) {
    /*
      Either shuffles or removes shuffle on the playlist state.
    */
    Shuffler.toggleShufflePlaylist(playlist);

    /*
      Visually sync the playlist shuffle statuses.
    */
    ShuffleElements.syncPlaylist(playlist);
  }

  /**
   * Returns public facing methods
   */
  return {
    handle: handle
  };
})();

export default Shuffle;
