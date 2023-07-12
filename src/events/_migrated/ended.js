/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Imports the Audio Navigation Utility
 * @module utilities/AudioNavigation
 */
import AudioNavigation from "../utilities/audioNavigation.js";

/**
 * Imports the AmplitudeJS Core Methods
 * @module core/Core
 */
import Core from "../core/core.js";

/**
 * Imports the AmplitudeJS Play Pause Elements
 * @module visual/PlayPauseElements
 */
import PlayPauseElements from "../visual/playPauseElements.js";

/**
 * AmplitudeJS Ended Module. Handles the ended event on the audio.
 *
 * @module events/Ended
 */
let Ended = (function() {
  /**
   * When the song has ended, handles what to do next
   *
   * HANDLER FOR: ended
   *
   * @access public
   */
  function handle() {
    /*
      Sets the time out for song ended. This determines if
      we should go to the next song or delay between songs.
    */
    setTimeout(function() {
      /*
        If we continue next, we should move to the next song in the playlist.
      */
      if (config.continue_next) {
        /*
					If the active playlist is not set, we set the
					next song that's in the songs array.
				*/
        if (config.active_playlist == "" || config.active_playlist == null) {
          AudioNavigation.setNext(true);
        } else {
          AudioNavigation.setNextPlaylist(config.active_playlist, true);
        }
      } else {
        if (!config.is_touch_moving) {
          /*
						Stops the active song.
					*/
          Core.stop();

          /*
            Sync the play pause elements.
          */
          PlayPauseElements.sync();
        }
      }
    }, config.delay);
  }

  /*
    Returns the public facing methods.
  */
  return {
    handle: handle
  };
})();

export default Ended;
