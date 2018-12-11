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
 * Handles all events for a mute event.
 * @module events/Mute
 */
let Mute = (function() {
  /**
   * Handles an event for a mute element
   *
   * HANDLER FOR:       class="amplitude-mute"
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
				If the current volume in the config is 0, we set the volume to the
				pre_mute level.  This means that the audio is already muted and
				needs to be restored to the pre_mute level.

				Otherwise, we set pre_mute volume to the current volume
				and set the config volume to 0, muting the audio.
			*/
      if (config.volume == 0) {
        Core.setVolume(config.pre_mute_volume);
      } else {
        config.pre_mute_volume = config.volume;
        Core.setVolume(0);
      }

      /*
        Sync Mute Elements.
      */
      MuteElements.setMuted(config.volume == 0 ? true : false);

      /*
				Syncs the volume sliders so the visuals align up with the functionality.
				If the volume is at 0, then the sliders should represent that so the user
				has the right starting point.
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

export default Mute;
