/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Handles the syncing of the song played progress elements.
 *
 * @module visual/SongPlayedProgressElements
 */
let SongPlayedProgressElements = (function() {
  /**
   * Syncs the song played progress bars. These are HTML5 progress elements.
   *
   * @access private
   * @param {number} songPlayedPercentage  	- The percentage of the song that has been played.
   */
  function sync(songPlayedPercentage) {
    syncGlobal(songPlayedPercentage);
    syncPlaylist(songPlayedPercentage);
    syncSong(songPlayedPercentage);
    syncSongInPlaylist(songPlayedPercentage);
  }

  /**
   * Sync how much has been played with a progress bar. This is the global progress bar.
   *
   * @access private
   * @param {number} songPlayedPercentage 	- The percent of the song completed.
   */
  function syncGlobal(percentage) {
    /*
			Ensure that the song completion percentage is a number
		*/
    if (!isNaN(percentage)) {
      /*
				Get all of the song progress bars
			*/
      let songPlayedProgressBars = document.querySelectorAll(
        ".amplitude-song-played-progress"
      );

      for (let i = 0; i < songPlayedProgressBars.length; i++) {
        let playlist = songPlayedProgressBars[i].getAttribute(
          "data-amplitude-playlist"
        );
        let songIndex = songPlayedProgressBars[i].getAttribute(
          "data-amplitude-song-index"
        );

        if (playlist == null && songIndex == null) {
          let max = songPlayedProgressBars[i].max;

          songPlayedProgressBars[i].value = (percentage / 100) * max;
        }
      }
    }
  }

  /**
   * Sync how much has been played with a progress bar. This is the playlist progress bar.
   *
   * @access public
   * @param {number} songPlayedPercentage 	- The percent of the song completed.
   */
  function syncPlaylist(percentage) {
    /*
			Ensure that the song completion percentage is a number
		*/
    if (!isNaN(percentage)) {
      /*
				Get all of the song progress bars
			*/
      let songPlayedProgressBars = document.querySelectorAll(
        '.amplitude-song-played-progress[data-amplitude-playlist="' +
          config.active_playlist +
          '"]'
      );

      for (let i = 0; i < songPlayedProgressBars.length; i++) {
        let song = songPlayedProgressBars[i].getAttribute(
          "data-amplitude-song-index"
        );

        if (song == null) {
          let max = songPlayedProgressBars[i].max;

          songPlayedProgressBars[i].value = (percentage / 100) * max;
        }
      }
    }
  }

  /**
   * Sync how much has been played with a progress bar. This is for an individual song.
   *
   * @access private
   * @param {number} songPlayedPercentage 	- The percent of the song completed.
   */
  function syncSong(percentage) {
    if (config.active_playlist == null) {
      /*
				Ensure that the song completion percentage is a number
			*/
      if (!isNaN(percentage)) {
        /*
					Get all of the song progress bars
				*/
        let songPlayedProgressBars = document.querySelectorAll(
          '.amplitude-song-played-progress[data-amplitude-song-index="' +
            config.active_index +
            '"]'
        );

        for (let i = 0; i < songPlayedProgressBars.length; i++) {
          let playlist = songPlayedProgressBars[i].getAttribute(
            "data-amplitude-playlist"
          );

          if (playlist == null) {
            let max = songPlayedProgressBars[i].max;

            songPlayedProgressBars[i].value = (percentage / 100) * max;
          }
        }
      }
    }
  }

  /**
   * Sync how much has been played with a progress bar. This is for an individual song in playlist.
   *
   * @access private
   * @param {number} songPlayedPercentage 	- The percent of the song completed.
   */
  function syncSongInPlaylist(percentage) {
    /*
			Ensure that the song completion percentage is a number
		*/
    if (!isNaN(percentage)) {
      let activePlaylistIndex =
        config.active_playlist != "" && config.active_playlist != null
          ? config.playlists[config.active_playlist].active_index
          : null;

      /*
				Get all of the song progress bars
			*/
      let songPlayedProgressBars = document.querySelectorAll(
        '.amplitude-song-played-progress[data-amplitude-playlist="' +
          config.active_playlist +
          '"][data-amplitude-song-index="' +
          activePlaylistIndex +
          '"]'
      );

      /*
        Iterates over all of the song played progress elements
        and sets them accordingly.
      */
      for (let i = 0; i < songPlayedProgressBars.length; i++) {
        let playlist = songPlayedProgressBars[i].getAttribute(
          "data-amplitude-playlist"
        );
        let songIndex = songPlayedProgressBars[i].getAttribute(
          "data-amplitude-song-index"
        );

        if (playlist != null && songIndex != null) {
          let max = songPlayedProgressBars[i].max;

          songPlayedProgressBars[i].value = (percentage / 100) * max;
        }
      }
    }
  }

  /**
   * Sets all of the song played progress bars to 0
   *
   * @access public
   */
  function resetElements() {
    let songPlayedProgressBars = document.getElementsByClassName(
      "amplitude-song-played-progress"
    );

    for (let i = 0; i < songPlayedProgressBars.length; i++) {
      songPlayedProgressBars[i].value = 0;
    }
  }

  return {
    sync: sync,
    resetElements: resetElements
  };
})();

export default SongPlayedProgressElements;
