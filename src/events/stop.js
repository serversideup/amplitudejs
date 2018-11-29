/**
 * NOTE: THIS FILE IS 4.0 READY REMOVE WHEN COMPLETE
 */

/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

import ConfigState from "../utilities/configState.js";

/**
 * Imports the AmplitudeJS Play Pause Elements
 * @module visual/PlayPauseElements
 */
import PlayPauseElements from "../visual/playPauseElements.js";

/**
 * Imports the AmplitudeJS Core Methods
 * @module core/Core
 */
import Core from "../core/core.js";

/**
 * Handles all of the stop events
 * @module events/Stop
 * TODO: Should we make playlist version and song version as well?
 */
let Stop = (function() {
  /**
   * Handles an event on a stop element.
   *
   * HANDLER FOR:       class="amplitude-stop"
   *
   * @access public
   */
  function handle() {
    /*
      If touch is not moving, we run. We don't want to accidentally press
      stop if touch is moving.
    */
    if (!config.is_touch_moving) {
      /*
				Sets all of the play/pause buttons to pause
			*/
      PlayPauseElements.syncToPause();

      /*
				Stops the active song.
			*/
      Core.stop();

      ConfigState.setPlayerState();
    }
  }

  /**
   * Returns public facing methods
   */
  return {
    handle: handle
  };
})();

export default Stop;
