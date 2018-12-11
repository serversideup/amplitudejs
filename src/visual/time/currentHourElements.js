/**
 * Imports the config module
 * @module config
 */
import config from "../../config.js";

/**
 * Handles all of the current time hour elements.
 *
 * @module visual/time/CurrentHourElements
 */
let CurrentHourElements = (function() {
  function sync(hours) {
    syncGlobal(hours);
    syncPlaylist(hours);
    syncSong(hours);
    syncSongInPlaylist(hours);
  }

  /**
   * Updates any elements that display the current hour for the song.
   *
   * @access public
   * @param {number} hours 	- An integer conaining how many hours into the song.
   */
  function syncGlobal(hours) {
    /*
			Get all of the hour selectors
		*/
    const currentHourSelectors = document.querySelectorAll(
      ".amplitude-current-hours"
    );

    /*
			Set the current hour selector's inner html to hours passed in.
		*/
    for (let i = 0; i < currentHourSelectors.length; i++) {
      let playlist = currentHourSelectors[i].getAttribute(
        "data-amplitude-playlist"
      );
      let songIndex = currentHourSelectors[i].getAttribute(
        "data-amplitude-song-index"
      );

      /*
        Updates the current hour selector for a global display.
      */
      if (playlist == null && songIndex == null) {
        currentHourSelectors[i].innerHTML = hours;
      }
    }
  }

  /**
   * Syncs the playlist current hour elements.
   *
   * @param {Integer} hour - The current audio hour.
   */
  function syncPlaylist(hours) {
    /*
			Get all of the hour selectors
		*/
    const currentHourPlaylistSelectors = document.querySelectorAll(
      '.amplitude-current-hours[data-amplitude-playlist="' +
        config.active_playlist +
        '"]'
    );

    /*
			Set the current hour selector's inner html to hours passed in.
		*/
    for (let i = 0; i < currentHourPlaylistSelectors.length; i++) {
      let songIndex = currentHourPlaylistSelectors[i].getAttribute(
        "data-amplitude-song-index"
      );

      /*
        Updates the current hour selector for a global display.
      */
      if (songIndex == null) {
        currentHourPlaylistSelectors[i].innerHTML = hours;
      }
    }
  }

  /**
   * Syncs the song hour elements.
   *
   * @param {Integer} hour - The current audio hour.
   */
  function syncSong(hours) {
    if (config.active_playlist == null) {
      /*
  			Get all of the hour selectors
  		*/
      const currentHourSongSelectors = document.querySelectorAll(
        '.amplitude-current-hours[data-amplitude-song-index="' +
          config.active_index +
          '"]'
      );

      /*
  			Set the current hour selector's inner html to hours passed in.
  		*/
      for (let i = 0; i < currentHourSongSelectors.length; i++) {
        let playlist = currentHourSongSelectors[i].getAttribute(
          "data-amplitude-playlist"
        );

        /*
          Updates the current hour selector for a global display.
        */
        if (playlist == null) {
          currentHourSongSelectors[i].innerHTML = hours;
        }
      }
    }
  }

  /**
   * Syncs the song in playlist song hour elements.
   *
   * @param {Integer} hour - The current audio hour.
   */
  function syncSongInPlaylist(hours) {
    let activePlaylistIndex =
      config.active_playlist != "" && config.active_playlist != null
        ? config.playlists[config.active_playlist].active_index
        : null;
    /*
			Get all of the hour selectors
		*/
    const currentHourPlaylistSongSelectors = document.querySelectorAll(
      '.amplitude-current-hours[data-amplitude-playlist="' +
        config.active_playlist +
        '"][data-amplitude-song-index="' +
        activePlaylistIndex +
        '"]'
    );

    /*
			Set the current hour selector's inner html to hours passed in.
		*/
    for (let i = 0; i < currentHourPlaylistSongSelectors.length; i++) {
      currentHourPlaylistSongSelectors[i].innerHTML = hours;
    }
  }

  /**
   * Reset the current hour elements.
   */
  function resetTimes() {
    /*
      Gets the hour display elements
    */
    let hourSelectors = document.querySelectorAll(".amplitude-current-hours");

    /*
      Iterates over all of the hour selectors and sets the inner HTML
      to 00.
    */
    for (var i = 0; i < hourSelectors.length; i++) {
      hourSelectors[i].innerHTML = "00";
    }
  }

  /**
   * Returns the publically facing methods.
   */
  return {
    sync: sync,
    resetTimes: resetTimes
  };
})();

export default CurrentHourElements;
