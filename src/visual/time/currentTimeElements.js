/**
 * Imports the config module
 * @module config
 */
import config from "../../config.js";

/**
 * These methods help sync visual time elements.
 *
 * @module visual/CurrentTimeElements
 */
let CurrentTimeElements = (function() {
  /**
   * Visually displays the current time on the screen. This is called on
   * time update for the current song.
   *
   * @access public
   * @param {object} currentTime 					- An object containing the current time for the song in seconds, minutes, and hours.
   */
  function sync(currentTime) {
    /*
			Set current time display.
		*/
    syncGlobal(currentTime);
    syncPlaylist(currentTime);
    syncSong(currentTime);
    syncSongInPlaylist(currentTime);
  }

  /**
   * Updates any elements that display the current time for the song. This
   * is a computed field that will be commonly used.
   *
   * @access public
   * @param {object} time 	- A json object conaining the parts for the current time for the song.
   */
  function syncGlobal(time) {
    /*
			Get all of the time selectors.
		*/
    let currentTimeSelectors = document.querySelectorAll(
      ".amplitude-current-time"
    );

    /*
			Set the time selector's inner html to the current time for the song. The current
			time is computed by joining minutes and seconds.
		*/
    var timeText = time.minutes + ":" + time.seconds;

    if (time.hours > 0) {
      timeText = time.hours + ":" + timeText;
    }

    for (let i = 0; i < currentTimeSelectors.length; i++) {
      let playlist = currentTimeSelectors[i].getAttribute(
        "data-amplitude-playlist"
      );
      let songIndex = currentTimeSelectors[i].getAttribute(
        "data-amplitude-song-index"
      );

      if (playlist == null && songIndex == null) {
        currentTimeSelectors[i].innerHTML = timeText;
      }
    }
  }

  /**
   * Updates any elements that display the current time for the song. This
   * is a computed field that will be commonly used.
   *
   * @access public
   * @param {object} time 	- A json object conaining the parts for the current time for the song.
   */
  function syncPlaylist(time) {
    /*
			Get all of the time selectors.
		*/
    let currentTimeSelectors = document.querySelectorAll(
      '.amplitude-current-time[data-amplitude-playlist="' +
        config.active_playlist +
        '"]'
    );

    /*
			Set the time selector's inner html to the current time for the song. The current
			time is computed by joining minutes and seconds.
		*/
    var timeText = time.minutes + ":" + time.seconds;

    if (time.hours > 0) {
      timeText = time.hours + ":" + timeText;
    }

    for (let i = 0; i < currentTimeSelectors.length; i++) {
      let songIndex = currentTimeSelectors[i].getAttribute(
        "data-amplitude-song-index"
      );

      if (songIndex == null) {
        currentTimeSelectors[i].innerHTML = timeText;
      }
    }
  }

  /**
   * Updates any elements that display the current time for the song. This
   * is a computed field that will be commonly used.
   *
   * @access public
   * @param {object} time 	- A json object conaining the parts for the current time for the song.
   */
  function syncSong(time) {
    if (config.active_playlist == null) {
      /*
  			Get all of the time selectors.
  		*/
      let currentTimeSelectors = document.querySelectorAll(
        '.amplitude-current-time[data-amplitude-song-index="' +
          config.active_index +
          '"]'
      );

      /*
  			Set the time selector's inner html to the current time for the song. The current
  			time is computed by joining minutes and seconds.
  		*/
      var timeText = time.minutes + ":" + time.seconds;

      if (time.hours > 0) {
        timeText = time.hours + ":" + timeText;
      }

      for (let i = 0; i < currentTimeSelectors.length; i++) {
        let playlist = currentTimeSelectors[i].getAttribute(
          "data-amplitude-playlist"
        );

        if (playlist == null) {
          currentTimeSelectors[i].innerHTML = timeText;
        }
      }
    }
  }

  /**
   * Updates any elements that display the current time for the song. This
   * is a computed field that will be commonly used.
   *
   * @access public
   * @param {object} time 	- A json object conaining the parts for the current time for the song.
   */
  function syncSongInPlaylist(time) {
    let activePlaylistIndex =
      config.active_playlist != "" && config.active_playlist != null
        ? config.playlists[config.active_playlist].active_index
        : null;
    /*
			Get all of the time selectors.
		*/
    let currentTimeSelectors = document.querySelectorAll(
      '.amplitude-current-time[data-amplitude-playlist="' +
        config.active_playlist +
        '"][data-amplitude-song-index="' +
        activePlaylistIndex +
        '"]'
    );

    /*
			Set the time selector's inner html to the current time for the song. The current
			time is computed by joining minutes and seconds.
		*/
    var timeText = time.minutes + ":" + time.seconds;

    if (time.hours > 0) {
      timeText = time.hours + ":" + timeText;
    }

    for (let i = 0; i < currentTimeSelectors.length; i++) {
      currentTimeSelectors[i].innerHTML = timeText;
    }
  }

  /**
   * Resets the current time displays to 00:00
   *
   * @access public
   */
  function resetTimes() {
    /*
			Gets the time selector display elements
		*/
    let timeSelectors = document.querySelectorAll(".amplitude-current-time");

    /*
			Iterates over all of the time selectors and sets the inner HTML
			to 00.
		*/
    for (let i = 0; i < timeSelectors.length; i++) {
      timeSelectors[i].innerHTML = "00:00";
    }
  }

  /**
   * Returns the publically facing methods
   */
  return {
    sync: sync,
    resetTimes: resetTimes
  };
})();

export default CurrentTimeElements;
