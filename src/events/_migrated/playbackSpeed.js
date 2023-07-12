/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Imports the Amplitude Core module
 * @module core/Core
 */
import Core from "../core/core.js";

/**
 * Imports the Playback Speed Visual Elements
 * @module visual/PlaybackSpeedElements
 */
import PlaybackSpeedElements from "../visual/playbackSpeedElements.js";

/**
 * AmplitudeJS Playback Speed Event Handler
 *
 * @module events/PlaybackSpeed
 */
let PlaybackSpeed = (function() {
  /**
   * Handles an event on the playback speed button
   *
   * HANDLER FOR:       class="amplitude-playback-speed"
   *
   * @access public
   */
  function handle() {
    if (!config.is_touch_moving) {
      /*
				We increment the speed by .5 everytime we click
				the button to change the playback speed. Once we are
				actively playing back at 2, we start back at 1 which
				is normal speed.
			*/
      switch (config.playback_speed) {
        case 1:
          Core.setPlaybackSpeed(1.5);
          break;
        case 1.5:
          Core.setPlaybackSpeed(2);
          break;
        case 2:
          Core.setPlaybackSpeed(1);
          break;
      }

      /*
				Visually sync the playback speed.
			*/
      PlaybackSpeedElements.sync();
    }
  }

  /*
    Returns public facing methods
  */
  return {
    handle: handle
  };
})();

export default PlaybackSpeed;
