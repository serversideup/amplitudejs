/**
 * Imports the config module
 * @module config
 */
import config from "../../config.js";

let CurrentMinuteElements = (function() {
  function sync(minutes) {
    syncGlobal(minutes);
    syncPlaylist(minutes);
    syncSong(minutes);
    syncSongInPlaylist(minutes);
  }

  function syncGlobal(minutes) {
    /*
			Get all of the minute selectors
		*/
    const currentMinuteSelectors = document.querySelectorAll(
      ".amplitude-current-minutes"
    );

    /*
			Set the current minute selector's inner html to minutes passed in.
		*/
    for (let i = 0; i < currentMinuteSelectors.length; i++) {
      let playlist = currentMinuteSelectors[i].getAttribute(
        "data-amplitude-playlist"
      );
      let songIndex = currentMinuteSelectors[i].getAttribute(
        "data-amplitude-song-index"
      );

      /*
        Updates the current minute selector for a global display.
      */
      if (playlist == null && songIndex == null) {
        currentMinuteSelectors[i].innerHTML = minutes;
      }
    }
  }

  function syncPlaylist(minutes) {
    /*
			Get all of the minute selectors
		*/
    const currentMinutePlaylistSelectors = document.querySelectorAll(
      '.amplitude-current-minutes[data-amplitude-playlist="' +
        config.active_playlist +
        '"]'
    );

    /*
			Set the current minute selector's inner html to minutes passed in.
		*/
    for (let i = 0; i < currentMinutePlaylistSelectors.length; i++) {
      let songIndex = currentMinutePlaylistSelectors[i].getAttribute(
        "data-amplitude-song-index"
      );

      /*
        Updates the current minute selector for a global display.
      */
      if (songIndex == null) {
        currentMinutePlaylistSelectors[i].innerHTML = minutes;
      }
    }
  }

  function syncSong(minutes) {
    if (config.active_playlist == null) {
      /*
  			Get all of the minute selectors
  		*/
      const currentMinuteSongSelectors = document.querySelectorAll(
        '.amplitude-current-minutes[data-amplitude-song-index="' +
          config.active_index +
          '"]'
      );

      /*
  			Set the current minute selector's inner html to minutes passed in.
  		*/
      for (let i = 0; i < currentMinuteSongSelectors.length; i++) {
        let playlist = currentMinuteSongSelectors[i].getAttribute(
          "data-amplitude-playlist"
        );

        /*
          Updates the current minute selector for a global display.
        */
        if (playlist == null) {
          currentMinuteSongSelectors[i].innerHTML = minutes;
        }
      }
    }
  }

  function syncSongInPlaylist(minutes) {
    let activePlaylistIndex =
      config.active_playlist != "" && config.active_playlist != null
        ? config.playlists[config.active_playlist].active_index
        : null;

    /*
			Get all of the minute selectors
		*/
    const currentMinutePlaylistSongSelectors = document.querySelectorAll(
      '.amplitude-current-minutes[data-amplitude-playlist="' +
        config.active_playlist +
        '"][data-amplitude-song-index="' +
        activePlaylistIndex +
        '"]'
    );

    /*
			Set the current minute selector's inner html to minutes passed in.
		*/
    for (let i = 0; i < currentMinutePlaylistSongSelectors.length; i++) {
      currentMinutePlaylistSongSelectors[i].innerHTML = minutes;
    }
  }

  function resetTimes() {
    /*
      Gets the minute display elements
    */
    let minuteSelectors = document.querySelectorAll(
      ".amplitude-current-minutes"
    );

    /*
      Iterates over all of the minute selectors and sets the inner HTML
      to 00.
    */
    for (var i = 0; i < minuteSelectors.length; i++) {
      minuteSelectors[i].innerHTML = "00";
    }
  }

  return {
    sync: sync,
    resetTimes: resetTimes
  };
})();

export default CurrentMinuteElements;
