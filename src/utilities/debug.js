/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Handles the debugging of AmplitudeJS
 * @module utilities/Debug
 */
let Debug = (function() {
  /**
   * Writes out debug message to the console if enabled.
   *
   * Public Accessor: Debug.writeMessage( message )
   *
   * @access public
   * @param {string} message - The string that gets printed to alert the user of a debugging error.
   */
  function writeMessage(message) {
    /*
      If the user has flagged AmplitudeJS to debug, we print out a message
      to the console.
    */
    if (config.debug) {
      console.log(message);
    }
  }

  /*
    Returns the public facing methods
  */
  return {
    writeMessage: writeMessage
  };
})();

export default Debug;
