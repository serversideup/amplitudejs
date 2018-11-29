/**
 * Imports the config module
 * @module config
 */
import config from "../../config.js";

let CurrentSecondElements = (function() {
  function sync(seconds) {
    syncGlobal(seconds);
    syncPlaylist(seconds);
    syncSong(seconds);
    syncSongInPlaylist(seconds);
  }

  function syncGlobal(seconds) {
    /*
			Get all of the second selectors
		*/
    const currentSecondSelectors = document.querySelectorAll(
      ".amplitude-current-seconds"
    );

    /*
			Set the current second selector's inner html to seconds passed in.
		*/
    for (let i = 0; i < currentSecondSelectors.length; i++) {
      let playlist = currentSecondSelectors[i].getAttribute(
        "data-amplitude-playlist"
      );
      let songIndex = currentSecondSelectors[i].getAttribute(
        "data-amplitude-song-index"
      );

      /*
        Updates the current second selector for a global display.
      */
      if (playlist == null && songIndex == null) {
        currentSecondSelectors[i].innerHTML = seconds;
      }
    }
  }

  function syncPlaylist(seconds) {
    /*
			Get all of the second selectors
		*/
    const currentSecondPlaylistSelectors = document.querySelectorAll(
      '.amplitude-current-seconds[data-amplitude-playlist="' +
        config.active_playlist +
        '"]'
    );

    /*
			Set the current second selector's inner html to seconds passed in.
		*/
    for (let i = 0; i < currentSecondPlaylistSelectors.length; i++) {
      let songIndex = currentSecondPlaylistSelectors[i].getAttribute(
        "data-amplitude-song-index"
      );

      /*
        Updates the current second selector for a global display.
      */
      if (songIndex == null) {
        currentSecondPlaylistSelectors[i].innerHTML = seconds;
      }
    }
  }

  function syncSong(seconds) {
    if (config.active_playlist == null) {
      /*
  			Get all of the second selectors
  		*/
      const currentSecondSongSelectors = document.querySelectorAll(
        '.amplitude-current-seconds[data-amplitude-song-index="' +
          config.active_index +
          '"]'
      );

      /*
  			Set the current second selector's inner html to seconds passed in.
  		*/
      for (let i = 0; i < currentSecondSongSelectors.length; i++) {
        let playlist = currentSecondSongSelectors[i].getAttribute(
          "data-amplitude-playlist"
        );

        /*
          Updates the current second selector for a global display.
        */
        if (playlist == null) {
          currentSecondSongSelectors[i].innerHTML = seconds;
        }
      }
    }
  }

  function syncSongInPlaylist(seconds) {
    let activePlaylistIndex =
      config.active_playlist != "" && config.active_playlist != null
        ? config.playlists[config.active_playlist].active_index
        : null;
    /*
			Get all of the second selectors
		*/
    const currentSecondPlaylistSongSelectors = document.querySelectorAll(
      '.amplitude-current-seconds[data-amplitude-playlist="' +
        config.active_playlist +
        '"][data-amplitude-song-index="' +
        activePlaylistIndex +
        '"]'
    );

    /*
			Set the current second selector's inner html to seconds passed in.
		*/
    for (let i = 0; i < currentSecondPlaylistSongSelectors.length; i++) {
      currentSecondPlaylistSongSelectors[i].innerHTML = seconds;
    }
  }

  function resetTimes() {
    /*
      Gets the second display elements
    */
    let secondSelectors = document.querySelectorAll(
      ".amplitude-current-seconds"
    );

    /*
      Iterates over all of the second selectors and sets the inner HTML
      to 00.
    */
    for (var i = 0; i < secondSelectors.length; i++) {
      secondSelectors[i].innerHTML = "00";
    }
  }

  return {
    sync: sync,
    resetTimes: resetTimes
  };
})();

export default CurrentSecondElements;
