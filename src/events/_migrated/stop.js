/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Imports the config state module.
 * @module utilities/configState
 */
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
