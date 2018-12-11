/**
 * Imports the config to use the values
 */
import config from "../config.js";

/**
 * Imports the AmplitudeJS Core Methods
 * @module core/core
 */
import Core from "../core/core.js";

/**
 * Imports the AmplitudeJS Visual Mute Elements
 * @module visual/MuteElements
 */
import MuteElements from "../visual/muteElements.js";

/**
 * Imports the AmplitudeJS Visual Volume Slider Elements
 * @module visual/VolumeSliderElements
 */
import VolumeSliderElements from "../visual/volumeSliderElements.js";

/**
 * Handles all events for a volume down event.
 * @module events/VolumeDown
 */
let VolumeDown = (function() {
  /**
   * Handles a click on a volume down element.
   *
   * HANDLER FOR:       class="amplitude-volume-down"
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
				The volume range is from 0 to 1 for an audio element. We make this
				a base of 100 for ease of working with.

				If the new value is less than 100, we use the new calculated
				value which gets converted to the proper unit for the audio element.

				If the new value is greater than 100, we set the volume to 1 which
				is the max for the audio element.
			*/
      let volume = null;

      if (config.volume - config.volume_increment > 0) {
        volume = config.volume - config.volume_increment;
      } else {
        volume = 0;
      }

      /*
				Calls the core function to set the volume to the computed value
				based on the user's intent.
			*/
      Core.setVolume(volume);

      /*
        Sync Mute Elements.
      */
      MuteElements.setMuted(config.volume == 0 ? true : false);

      /*
        Sync Volume Slider Elements
      */
      VolumeSliderElements.sync();
    }
  }

  /**
   * Returns the public facing methods
   */
  return {
    handle: handle
  };
})();

export default VolumeDown;
