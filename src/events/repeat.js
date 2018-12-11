/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Imports the repeater utility module.
 * @module utilities/Repeater
 */
import Repeater from "../utilities/repeater.js";

/**
 * Imports the visual repeat elements module
 * @module visual/RepeatElements
 */
import RepeatElements from "../visual/repeatElements.js";

/**
 * AmplitudeJS Repeat Event Handler
 *
 * @module events/Repeat
 */
let Repeat = (function() {
  /**
   * Handles an event on the repeat button
   *
   * HANDLER FOR:       class="amplitude-repeat"
   *
   * GLOBAL:            class="amplitude-repeat"
   * PLAYLIST:          class="amplitude-repeat" amplitude-playlist="playlist_key"
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
        If the playlist is null, we handle the global repeat.
      */
      if (playlist == null) {
        handleGlobalRepeat();
      }

      /*
        If the playlist is set, we handle the playlist repeat.
      */
      if (playlist != null) {
        handlePlaylistRepeat(playlist);
      }
    }
  }

  /**
   * Handles an event on a global repeat button.
   *
   * @access private
   */
  function handleGlobalRepeat() {
    /*
      Sets repeat to the opposite of what it was set to
    */
    Repeater.setRepeat(!config.repeat);

    /*
      Visually sync repeat
    */
    RepeatElements.syncRepeat();
  }

  /**
   * Handles an event on a playlist repeat button.
   *
   * @access private
   * @prop {string} playlist - The playlist we are handling the repeat store.
   */
  function handlePlaylistRepeat(playlist) {
    /*
      Sets repeat to the opposite of what it was set to for the playlist.
    */
    Repeater.setRepeatPlaylist(!config.playlists[playlist].repeat, playlist);

    /*
      Visually sync playlist repeat
    */
    RepeatElements.syncRepeatPlaylist(playlist);
  }

  /*
    Returns the public facing methods.
  */
  return {
    handle: handle
  };
})();

export default Repeat;
