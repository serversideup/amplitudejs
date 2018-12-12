/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * The utility to handle the computation of time in AmplitudeJS.
 * @module utilities/Time
 */
let Time = (function() {
  /**
   * Computes the current song time. Breaks down where the song is into
   * hours, minutes, seconds and formats it to be displayed to the user.
   *
   * @access public
   */
  function computeCurrentTimes() {
    /*
			Initialize the current time object that will be returned.
		*/
    let currentTime = {};

    /*
			Computes the current seconds for the song.
		*/
    let currentSeconds =
      (Math.floor(config.audio.currentTime % 60) < 10 ? "0" : "") +
      Math.floor(config.audio.currentTime % 60);

    /*
			Computes the current minutes for the song.
		*/
    let currentMinutes = Math.floor(config.audio.currentTime / 60);

    /*
			Initialize the current hours variable.
		*/
    let currentHours = "00";

    /*
			If the current minutes is less than 10, we add a leading 0.
		*/
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }

    /*
			If the user is more than 60 minutes into the song, then
			we extract the hours.
		*/
    if (currentMinutes >= 60) {
      currentHours = Math.floor(currentMinutes / 60);
      currentMinutes = currentMinutes % 60;

      /*
				If the user is less than 10 minutes in, we append the
				additional 0 to the minutes.
			*/
      if (currentMinutes < 10) {
        currentMinutes = "0" + currentMinutes;
      }
    }

    /*
			Build a clean current time object and send back the appropriate information.
		*/
    currentTime.seconds = currentSeconds;
    currentTime.minutes = currentMinutes;
    currentTime.hours = currentHours;

    return currentTime;
  }

  /**
   * Computes the current song duration. Breaks down where the song is into
   * hours, minutes, seconds and formats it to be displayed to the user.
   *
   * @access public
   */
  function computeSongDuration() {
    /*
			Initialize the song duration object that will be returned.
		*/
    let songDuration = {};

    /*
			Computes the duration of the song's seconds.
		*/
    let songDurationSeconds =
      (Math.floor(config.audio.duration % 60) < 10 ? "0" : "") +
      Math.floor(config.audio.duration % 60);

    /*
			Computes the duration of the song's minutes.
		*/
    let songDurationMinutes = Math.floor(config.audio.duration / 60);

    /*
			Initialize the hours duration variable.
		*/
    var songDurationHours = "00";

    /*
			If the song duration minutes is less than 10, we add a leading 0.
		*/
    if (songDurationMinutes < 10) {
      songDurationMinutes = "0" + songDurationMinutes;
    }

    /*
			If there is more than 60 minutes in the song, then we
			extract the hours.
		*/
    if (songDurationMinutes >= 60) {
      songDurationHours = Math.floor(songDurationMinutes / 60);
      songDurationMinutes = songDurationMinutes % 60;

      /*
				If the song duration minutes is less than 10 we append
				the additional 0.
			*/
      if (songDurationMinutes < 10) {
        songDurationMinutes = "0" + songDurationMinutes;
      }
    }

    /*
			Build a clean song duration object and send back the appropriate information.
		*/
    songDuration.seconds = isNaN(songDurationSeconds)
      ? "00"
      : songDurationSeconds;
    songDuration.minutes = isNaN(songDurationMinutes)
      ? "00"
      : songDurationMinutes;
    songDuration.hours = isNaN(songDurationHours)
      ? "00"
      : songDurationHours.toString();

    return songDuration;
  }

  /**
   * Computes the song completion percentage.
   *
   * @access public
   */
  function computeSongCompletionPercentage() {
    return (config.audio.currentTime / config.audio.duration) * 100;
  }

  /**
   * Sets the current time for the audio.
   *
   * @access public
   */
  function setCurrentTime(time) {
    /*
      If the song is not live, we can set the current time.
    */
    if (!config.active_metadata.live) {
      /*
        Makes sure the number is finite to set the time.
      */
      if (isFinite(time)) {
        config.audio.currentTime = time;
      }
    }
  }

  /**
   * Defines what is returned by the module
   */
  return {
    computeCurrentTimes: computeCurrentTimes,
    computeSongDuration: computeSongDuration,
    computeSongCompletionPercentage: computeSongCompletionPercentage,
    setCurrentTime: setCurrentTime
  };
})();

export default Time;
