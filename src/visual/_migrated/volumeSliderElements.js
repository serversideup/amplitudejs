/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Keeps the volume slider elements in sync.
 * @module visual/VolumeSliderElements
 */
let VolumeSliderElements = (function() {
  /**
   * Visually syncs the volume sliders so they are all the same if there
   * are more than one.
   *
   * @access public
   */
  function sync() {
    let volumeSliders = document.getElementsByClassName(
      "amplitude-volume-slider"
    );

    /*
			Iterates over all of the volume sliders for the song, setting the value
			to the config value.
		*/
    for (let i = 0; i < volumeSliders.length; i++) {
      volumeSliders[i].value = config.audio.volume * 100;
    }
  }

  /**
   * Returns the public facing methods
   */
  return {
    sync: sync
  };
})();

export default VolumeSliderElements;
