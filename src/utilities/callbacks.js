/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Imports the debug module
 * @module utilities/debug
 */
import Debug from "./debug.js";

/**
 * AmplitudeJS Callback Utility
 *
 * @module utilities/callbacks
 */
let Callbacks = (function() {
  /**
   * Initializes the callbacks for the player.
   */
  function initialize() {
    /*
      Event: abort
      https://www.w3schools.com/tags/av_event_abort.asp
    */
    config.audio.addEventListener("abort", function() {
      run("abort");
    });

    /*
      Event: error
      https://www.w3schools.com/tags/av_event_error.asp
    */
    config.audio.addEventListener("error", function() {
      run("error");
    });

    /*
      Event: loadeddata
      https://www.w3schools.com/tags/av_event_loadeddata.asp
    */
    config.audio.addEventListener("loadeddata", function() {
      run("loadeddata");
    });

    /*
      Event: loadedmetadata
      https://www.w3schools.com/tags/av_event_loadedmetadata.asp
    */
    config.audio.addEventListener("loadedmetadata", function() {
      run("loadedmetadata");
    });

    /*
      Event: loadstart
      https://www.w3schools.com/tags/av_event_loadstart.asp
    */
    config.audio.addEventListener("loadstart", function() {
      run("loadstart");
    });

    /*
      Event: pause
      https://www.w3schools.com/tags/av_event_pause.asp
    */
    config.audio.addEventListener("pause", function() {
      run("pause");
    });

    /*
      Event: playing
      https://www.w3schools.com/tags/av_event_playing.asp
    */
    config.audio.addEventListener("playing", function() {
      run("playing");
    });

    /*
      Event: play
      https://www.w3schools.com/tags/av_event_play.asp
    */
    config.audio.addEventListener("play", function() {
      run("play");
    });

    /*
      Event: progress
      https://www.w3schools.com/tags/av_event_progress.asp
    */
    config.audio.addEventListener("progress", function() {
      run("progress");
    });

    /*
      Event: ratechange
      https://www.w3schools.com/tags/av_event_ratechange.asp
    */
    config.audio.addEventListener("ratechange", function() {
      run("ratechange");
    });

    /*
      Event: seeked
      https://www.w3schools.com/tags/av_event_seeked.asp
    */
    config.audio.addEventListener("seeked", function() {
      run("seeked");
    });

    /*
      Event: seeking
      https://www.w3schools.com/tags/av_event_seeking.asp
    */
    config.audio.addEventListener("seeking", function() {
      run("seeking");
    });

    /*
      Event: stalled
      https://www.w3schools.com/tags/av_event_stalled.asp
    */
    config.audio.addEventListener("stalled", function() {
      run("stalled");
    });

    /*
      Event: suspend
      https://www.w3schools.com/tags/av_event_suspend.asp
    */
    config.audio.addEventListener("suspend", function() {
      run("suspend");
    });

    /*
      Event: timeupdate
      https://www.w3schools.com/tags/av_event_timeupdate.asp
    */
    config.audio.addEventListener("timeupdate", function() {
      run("timeupdate");
    });

    /*
      Event: volumechange
      https://www.w3schools.com/tags/av_event_volumechange.asp
    */
    config.audio.addEventListener("volumechange", function() {
      run("volumechange");
    });

    /*
      Event: waiting
      https://www.w3schools.com/tags/av_event_waiting.asp
    */
    config.audio.addEventListener("waiting", function() {
      run("waiting");
    });

    /*
      Event: canplay
      https://www.w3schools.com/tags/av_event_canplay.asp
    */
    config.audio.addEventListener("canplay", function() {
      run("canplay");
    });

    /*
      Event: canplaythrough
      https://www.w3schools.com/tags/av_event_canplaythrough.asp
    */
    config.audio.addEventListener("canplaythrough", function() {
      run("canplaythrough");
    });

    /*
      Event: durationchange
      https://www.w3schools.com/tags/av_event_durationchange.asp
    */
    config.audio.addEventListener("durationchange", function() {
      run("durationchange");
    });

    /*
      Event: ended
      https://www.w3schools.com/tags/av_event_ended.asp
    */
    config.audio.addEventListener("ended", function() {
      run("ended");
    });
  }

  /**
   * Runs a user defined callback method
   *
   * Public Accessor: Callbacks.run( callbackName )
   *
   * @access public
   * @param {string} callbackName - The name of the callback we are going to run.
   */
  function run(callbackName) {
    /*
      Checks to see if a user defined a callback method for the
      callback we are running.
    */
    if (config.callbacks[callbackName]) {
      /*
        Build the callback function
      */
      let callbackFunction = config.callbacks[callbackName];

      /*
        Write a debug message stating the callback we are running
      */
      Debug.writeMessage("Running Callback: " + callbackName);

      /*
        Run the callback function and catch any errors
      */
      try {
        callbackFunction();
      } catch (error) {
        if (error.message == "CANCEL EVENT") {
          throw error;
        } else {
          Debug.writeMessage("Callback error: " + error.message);
        }
      }
    }
  }

  return {
    initialize: initialize,
    run: run
  };
})();

export default Callbacks;
