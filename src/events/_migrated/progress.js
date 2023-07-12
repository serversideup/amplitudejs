/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Imports the BufferedProgressElements visual handler
 * @module visual/bufferedProgressElements.js
 */
import BufferedProgressElements from "../visual/bufferedProgressElements.js";

/**
 * AmplitudeJS Event Handler for progress
 *
 * @module events/Progress
 */
let Progress = (function() {
  /**
   * As the song is buffered, we can display the buffered percentage in
   * a progress bar.
   *
   * HANDLER FOR: progress
   *
   * @access public
   */
  function handle() {
    /*
      Help from: http://jsbin.com/badimipi/1/edit?html,js,output
    */
    if (config.audio.buffered.length - 1 >= 0) {
      let bufferedEnd = config.audio.buffered.end(
        config.audio.buffered.length - 1
      );
      let duration = config.audio.duration;

      /*
        Set the computed song buffered value to the config.
      */
      config.buffered = (bufferedEnd / duration) * 100;
    }

    /*
      Sync the buffered progress bars.
    */
    BufferedProgressElements.sync();
  }

  /**
   * Returns the public facing methods
   */
  return {
    handle: handle
  };
})();

export default Progress;
