/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Imports the Buffered Progress Elements visual class
 * @module visual/bufferedProgressElements
 */
import BufferedProgressElements from "../visual/bufferedProgressElements.js";

/**
 * Imports the Time Elements visual class.
 * @module visual/timeElements
 */
import TimeElements from "../visual/timeElements.js";

/**
 * Imports the Song Slider Elements visual class.
 * @module visual/songSliderElements
 */
import SongSliderElements from "../visual/songSliderElements.js";

/**
 * Imports the Song Played Progress Elements visual class.
 * @module visual/songPlayedProgressElements
 */
import SongPlayedProgressElements from "../visual/songPlayedProgressElements.js";

/**
 * Imports the Time utility class
 * @module utilities/Time
 */
import Time from "../utilities/time.js";

/**
 * Imports the Callback utility class
 * @module utilities/Callbacks
 */
import Callbacks from "../utilities/callbacks.js";

/**
 * AmplitudeJS Event Handler for Time Update
 *
 * @module events/TimeUpdate
 */
let TimeUpdate = (function() {
  /**
   * When the time updates on the active song, we sync the current time displays
   *
   * HANDLER FOR: timeupdate
   *
   * @access public
   */
  function handle() {
    /*
      Computes the buffered time.
    */
    computeBufferedTime();

    /*
      Sync the buffered progress elements.
    */
    BufferedProgressElements.sync();

    /*
      Updates the current time information.
    */
    updateTimeInformation();

    /*
      Run time callbacks
    */
    runTimeCallbacks();
  }

  /**
   * Computes the buffered time
   */
  function computeBufferedTime() {
    /*
      Help from: http://jsbin.com/badimipi/1/edit?html,js,output
    */
    if (config.audio.buffered.length - 1 >= 0) {
      let bufferedEnd = config.audio.buffered.end(
        config.audio.buffered.length - 1
      );
      let duration = config.audio.duration;

      config.buffered = (bufferedEnd / duration) * 100;
    }
  }

  /**
   * Updates the current time information.
   * @access private
   */
  function updateTimeInformation() {
    /*
      If the current song is not live, then
      we can update the time information. Otherwise the
      current time updates wouldn't mean much since the time
      is infinite.
    */
    if (!config.active_metadata.live) {
      /*
        Compute the current time
      */
      let currentTime = Time.computeCurrentTimes();

      /*
        Compute the song completion percentage
      */
      let songCompletionPercentage = Time.computeSongCompletionPercentage();

      /*
        Computes the song duration
      */
      let songDuration = Time.computeSongDuration();

      /*
        Sync the current time elements with the current
        location of the song and the song duration elements with
        the duration of the song.
      */
      TimeElements.syncCurrentTimes(currentTime);

      /*
        Sync the song slider elements.
      */
      SongSliderElements.sync(
        songCompletionPercentage,
        config.active_playlist,
        config.active_index
      );

      /*
        Sync the song played progress elements.
      */
      SongPlayedProgressElements.sync(songCompletionPercentage);

      /*
        Sync the duration time elements.
      */
      TimeElements.syncDurationTimes(currentTime, songDuration);
    }
  }

  /**
   * Runs a callback at a certain time in the song.
   */
  function runTimeCallbacks() {
    /*
      Gets the current seconds into the song.
    */
    let currentSeconds = Math.floor(config.audio.currentTime);

    /*
      Checks to see if there is a callback at the certain seconds into the song.
    */
    if (
      config.active_metadata.time_callbacks != undefined &&
      config.active_metadata.time_callbacks[currentSeconds] != undefined
    ) {
      /*
        Checks to see if the callback has been run. Since the time updates more than
        one second, we don't want the callback to run X times.
      */
      if (!config.active_metadata.time_callbacks[currentSeconds].run) {
        config.active_metadata.time_callbacks[currentSeconds].run = true;
        config.active_metadata.time_callbacks[currentSeconds]();
      }
    } else {
      /*
        Iterate over all of the callbacks for a song. If the song has one, we flag
        the run as false. This occurs because we have passed the active second for
        the callback, so we flag it as not run. It will either run again if the user
        seeks back or not run in the future.
      */
      for (var seconds in config.active_metadata.time_callbacks) {
        if (config.active_metadata.time_callbacks.hasOwnProperty(seconds)) {
          config.active_metadata.time_callbacks[seconds].run = false;
        }
      }
    }
  }
  /**
   * Returns public functions
   */
  return {
    handle: handle
  };
})();

export default TimeUpdate;
