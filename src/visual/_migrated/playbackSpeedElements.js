/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Defines the Playback Speed Visual Elements Handler
 * @module visual/PlaybackSpeedElements
 */
let PlaybackSpeedElements = (function() {
  /**
   * Sets all of the visual playback speed buttons to have the right class
   * to display the background image that represents the current playback
   * speed.
   *
   * @access public
   */
  function sync() {
    /*
			Gets all of the playback speed classes.
		*/
    let playbackSpeedClasses = document.getElementsByClassName(
      "amplitude-playback-speed"
    );

    /*
			Iterates over all of the playback speed classes
			applying the right speed class for visual purposes.
		*/
    for (let i = 0; i < playbackSpeedClasses.length; i++) {
      /*
				Removes all of the old playback speed classes.
			*/
      playbackSpeedClasses[i].classList.remove("amplitude-playback-speed-10");
      playbackSpeedClasses[i].classList.remove("amplitude-playback-speed-15");
      playbackSpeedClasses[i].classList.remove("amplitude-playback-speed-20");

      /*
				Switch the current playback speed and apply the appropriate
				speed class.
			*/
      switch (config.playback_speed) {
        case 1:
          playbackSpeedClasses[i].classList.add("amplitude-playback-speed-10");
          break;
        case 1.5:
          playbackSpeedClasses[i].classList.add("amplitude-playback-speed-15");
          break;
        case 2:
          playbackSpeedClasses[i].classList.add("amplitude-playback-speed-20");
          break;
      }
    }
  }

  /**
   * Returns the public facing methods
   */
  return {
    sync: sync
  };
})();

export default PlaybackSpeedElements;
