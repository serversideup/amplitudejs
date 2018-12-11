/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Imports the AmplitudeJS Core module.
 * @module core/core
 */
import Core from "../core/core.js";

/**
 * Imports the Play Pause Elements Module.
 * @module visual/PlayPauseElements
 */
import PlayPauseElements from "../visual/playPauseElements.js";

/**
 * Imports the Callbacks Module
 * @module utilities/Callbacks
 */
import Callbacks from "../utilities/callbacks.js";

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
 * AmplitudeJS Next Event Handler
 *
 * @module events/Next
 */
let Next = (function() {
  /**
   * Handles an event on the next button
   *
   * HANDLER FOR:       class="amplitude-next"
   *
   * GLOBAL:            class="amplitude-next"
   * PLAYLIST:          class="amplitude-next" amplitude-playlist="playlist_key"
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
        If the playlist is null, we handle the global next.
      */
      if (playlist == null) {
        handleGlobalNext();
      }

      /*
        If the playlist is set, we handle the playlist next.
      */
      if (playlist != null) {
        handlePlaylistNext(playlist);
      }
    }
  }

  /**
   * Handles an event on a global enxt button.
   *
   * @access private
   */
  function handleGlobalNext() {
    /*
      Check to see if the current state of the player
      is in playlist mode or not playlist mode. If we are in playlist mode,
      we set next on the playlist.
    */
    if (config.active_playlist == "" || config.active_playlist == null) {
      AudioNavigation.setNext();
    } else {
      AudioNavigation.setNextPlaylist(config.active_playlist);
    }
  }

  /**
   * Handles an event on a next playlist button.
   *
   * @access private
   * @prop {string} playlist  - The playlist we are handling the next for.
   */
  function handlePlaylistNext(playlist) {
    /*
      Ensure the playlist is the same as the active playlist. To get to change
      the scope to a new playlist, you need to play that playlist.
    */
    if (playlist == config.active_playlist) {
      AudioNavigation.setNextPlaylist(playlist);
    } else {
      Debug.writeMessage(
        "You can not go to the next song on a playlist that is not being played!"
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

export default Next;
