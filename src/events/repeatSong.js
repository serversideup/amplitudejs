/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Imports the repeat utility
 * @module utilities/Repeater
 */
import Repeater from "../utilities/repeater.js";

/**
 * Imports the AmplitudeJS Repeat Element
 * @module visual/RepeatElements
 */
import RepeatElements from "../visual/repeatElements.js";

/**
 * Handles an event on the Amplitude Repeat Song.
 *
 * @module events/RepeatSong
 */
let RepeatSong = (function() {
  /**
   * Handles an event on the repeat song button
   *
   * HANDLER FOR: 'amplitude-repeat-song'
   *
   * @access public
   */
  function handle() {
    /*
      If the touch is moving, we do not want to accidentally touch the play
      pause element and fire an event.
    */
    if (!config.is_touch_moving) {
      /*
				Sets repeat song to the opposite of what it was set to
			*/
      Repeater.setRepeatSong(!config.repeat_song);

      /*
				Visually sync repeat song
			*/
      RepeatElements.syncRepeatSong();
    }
  }

  /**
   * Returns the public facing methods
   */
  return {
    handle: handle
  };
})();

export default RepeatSong;
