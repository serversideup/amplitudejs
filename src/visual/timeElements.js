/**
 * Imports the AmplitudeJS Current Time
 * @module visual/time/CurrentTimeElements
 */
import CurrentTimeElements from "./time/currentTimeElements.js";

/**
 * Imports the AmplitudeJS Current Hour Elements
 * @module visual/time/CurrentHourElements
 */
import CurrentHourElements from "./time/currentHourElements.js";

/**
 * Imports the AmplitudeJS Current Minute Elements
 * @module visual/time/CurrentMinuteElements
 */
import CurrentMinuteElements from "./time/currentMinuteElements.js";

/**
 * Imports the AmplitudeJS Current Second Elements
 * @module visual/time/CurrentTimeElements
 */
import CurrentSecondElements from "./time/currentSecondElements.js";

/**
 * Imports the AmplitudeJS Duration Count Down Time Elements
 * @module visual/time/DurationCountDownTimeElements
 */
import DurationCountDownTimeElements from "./time/durationCountDownTimeElements.js";

/**
 * Imports the AmplitudeJS Duration Hour Elements
 * @module visual/time/DurationHourElements
 */
import DurationHourElements from "./time/durationHourElements.js";

/**
 * Imports the AmplitudeJS Duration Minute Elements
 * @module visual/time/DurationMinuteElements
 */
import DurationMinuteElements from "./time/durationMinuteElements.js";

/**
 * Imports the AmplitudeJS Duration Second Elements
 * @module visual/time/DurationSecondElements
 */
import DurationSecondElements from "./time/durationSecondElements.js";

/**
 * Imports the AmplitudeJS Duration Time Elements
 * @module visual/time/DurationTimeElements
 */
import DurationTimeElements from "./time/durationTimeElements.js";

/**
 * Time Elements Interface. This allows us to update all of the sub time elements
 * through one central point.
 * @module visual/TimeElements
 */
let TimeElements = (function() {
  /**
   * Resets the current times.
   */
  function resetCurrentTimes() {
    CurrentTimeElements.resetTimes();
    CurrentHourElements.resetTimes();
    CurrentMinuteElements.resetTimes();
    CurrentSecondElements.resetTimes();
  }

  /**
   * Syncs the current time elements to the time provided.
   *
   * @param {Object} currentTime - An object representing the current time of the audio.
   */
  function syncCurrentTimes(currentTime) {
    CurrentTimeElements.sync(currentTime);
    CurrentHourElements.sync(currentTime.hours);
    CurrentMinuteElements.sync(currentTime.minutes);
    CurrentSecondElements.sync(currentTime.seconds);
  }

  /**
   * Resets the duration times.
   */
  function resetDurationTimes() {
    DurationCountDownTimeElements.resetTimes();
    DurationHourElements.resetTimes();
    DurationMinuteElements.resetTimes();
    DurationSecondElements.resetTimes();
    DurationTimeElements.resetTimes();
  }

  /**
   * Syncs the duration times to the times provided.
   *
   * @param {Object} currentTime - An object representing the current time of the audio.
   * @param {Object} songDuration - An object representing the duration of the audio
   */
  function syncDurationTimes(currentTime, songDuration) {
    DurationCountDownTimeElements.sync(currentTime, songDuration);
    DurationTimeElements.sync(songDuration);
    DurationHourElements.sync(songDuration.hours);
    DurationMinuteElements.sync(songDuration.minutes);
    DurationSecondElements.sync(songDuration.seconds);
  }

  /**
   * Returns the publically accessible methods.
   */
  return {
    resetCurrentTimes: resetCurrentTimes,
    syncCurrentTimes: syncCurrentTimes,
    resetDurationTimes: resetDurationTimes,
    syncDurationTimes: syncDurationTimes
  };
})();

export default TimeElements;
