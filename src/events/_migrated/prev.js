/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Imports the Amplitude Audio Navigation Utility
 * @module utilities/AudioNavigation
 */
import AudioNavigation from "../utilities/audioNavigation.js";

/**
 * AmplitudeJS Debug Module
 * @module utilities/Debug
 */
import Debug from "../utilities/debug.js";

/**
 * AmplitudeJS Prev Event Handler
 *
 * @module events/Prev
 */
let Prev = (function() {
  /**
   * Handles an event on the previous button
   *
   * HANDLER FOR:       class="amplitude-prev"
   *
   * GLOBAL:            class="amplitude-prev"
   * PLAYLIST:          class="amplitude-prev" amplitude-playlist="playlist_key"
   *
   * @access public
   */
  function handle() {
    /*
      We don't fire this if the user is touching the screen and it's moving.
      This could lead to a mis-fire
    */
    if (!config.is_touch_moving) {
      /*
        Gets the playlist attribute from the element.
      */
      let playlist = this.getAttribute("data-amplitude-playlist");

      /*
        If the playlist is null, we handle the global prev.
      */
      if (playlist == null) {
        handleGlobalPrev();
      }

      /*
        If the playlist is set, we handle the playlist prev.
      */
      if (playlist != null) {
        handlePlaylistPrev(playlist);
      }
    }
  }

  /**
   * Handles an event on a global previous button.
   *
   * @access private
   */
  function handleGlobalPrev() {
    /*
      Check to see if the current state of the player
      is in playlist mode or not playlist mode. If we are in playlist mode,
      we set prev on the playlist.
    */
    if (config.active_playlist == "" || config.active_playlist == null) {
      AudioNavigation.setPrevious();
    } else {
      AudioNavigation.setPreviousPlaylist(config.active_playlist);
    }
  }

  /**
   * Handles an event on a previous playlist button.
   *
   * @access private
   * @prop {string} playlist  - The playlist we are handling the previous for.
   */
  function handlePlaylistPrev(playlist) {
    /*
      Ensure the playlist is the same as the active playlist. To get to change
      the scope to a new playlist, you need to play that playlist.
    */
    if (playlist == config.active_playlist) {
      AudioNavigation.setPreviousPlaylist(config.active_playlist);
    } else {
      Debug.writeMessage(
        "You can not go to the previous song on a playlist that is not being played!"
      );
    }
  }

  /*
    Returns the public facing methods.
  */
  return {
    handle: handle
  };
})();

export default Prev;
