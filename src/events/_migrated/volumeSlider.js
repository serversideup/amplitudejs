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
 * Handles all events for a volume up event.
 * @module events/VolumeSlider
 */
let VolumeSlider = (function() {
  /**
   * Handles a change on the volume slider
   *
   * HANDLER FOR:       class="amplitude-volume-slider"
   *
   * @access public
   */
  function handle() {
    /*
			Calls the core function to set the volume to the computed value
			based on the user's intent.
		*/
    Core.setVolume(this.value);

    /*
      Sync Mute Elements.
    */
    MuteElements.setMuted(config.volume == 0 ? true : false);

    /*
			Sync the volume slider locations
		*/
    VolumeSliderElements.sync();
  }

  /**
   * Returns the public facing methods
   */
  return {
    handle: handle
  };
})();

export default VolumeSlider;
