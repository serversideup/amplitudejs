/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * AmplitudeJS Visual Handler for Buffered Progress Elements
 *
 * @module visual/BufferedProgressElements
 */
let BufferedProgressElements = (function() {
  /**
   * Syncs the buffered progress bars to the current percentage in the config
   *
   * @access public
   */
  function sync() {
    syncGlobal();
    syncPlaylist();
    syncSong();
    syncSongInPlaylist();
  }

  /**
   * Sync the global song buffered progress elements.
   */
  function syncGlobal() {
    /*
			Gets all of the song buffered progress bars.
		*/
    const songBufferedProgressBars = document.getElementsByClassName(
      "amplitude-buffered-progress"
    );

    /*
			Iterate over all of the song buffered progress bar and
			set them to 0 which is like re-setting them.
		*/
    for (let i = 0; i < songBufferedProgressBars.length; i++) {
      let playlist = songBufferedProgressBars[i].getAttribute(
        "data-amplitude-playlist"
      );
      let song = songBufferedProgressBars[i].getAttribute(
        "data-amplitude-song-index"
      );

      if (playlist == null && song == null && !isNaN(config.buffered)) {
        songBufferedProgressBars[i].value = parseFloat(
          parseFloat(config.buffered) / 100
        );
      }
    }
  }

  /**
   * Sync the playlist song buffered progress elements.
   */
  function syncPlaylist() {
    /*
			Gets all of the song buffered progress bars.
		*/
    const songBufferedProgressBarsPlaylist = document.querySelectorAll(
      '.amplitude-buffered-progress[data-amplitude-playlist="' +
        config.active_playlist +
        '"]'
    );

    /*
			Iterate over all of the song buffered progress bar and
			set them to 0 which is like re-setting them.
		*/
    for (let i = 0; i < songBufferedProgressBarsPlaylist.length; i++) {
      let song = songBufferedProgressBarsPlaylist[i].getAttribute(
        "data-amplitude-song-index"
      );

      if (song == null && !isNaN(config.buffered)) {
        songBufferedProgressBarsPlaylist[i].value = parseFloat(
          parseFloat(config.buffered) / 100
        );
      }
    }
  }

  /**
   * Sync the song song buffered progress elements.
   */
  function syncSong() {
    /*
			Gets all of the song buffered progress bars.
		*/
    const songBufferedProgressBarsSongs = document.querySelectorAll(
      '.amplitude-buffered-progress[data-amplitude-song-index="' +
        config.active_index +
        '"]'
    );

    /*
			Iterate over all of the song buffered progress bar and
			set them to 0 which is like re-setting them.
		*/
    for (let i = 0; i < songBufferedProgressBarsSongs.length; i++) {
      let playlist = songBufferedProgressBarsSongs[i].getAttribute(
        "data-amplitude-playlist"
      );

      if (playlist == null && !isNaN(config.buffered)) {
        songBufferedProgressBarsSongs[i].value = parseFloat(
          parseFloat(config.buffered) / 100
        );
      }
    }
  }

  /**
   * Sync the song in playlist song buffered progress elements.
   */
  function syncSongInPlaylist() {
    let activePlaylistIndex =
      config.active_playlist != null && config.active_playlist != ""
        ? config.playlists[config.active_playlist].active_index
        : null;

    /*
			Gets all of the song buffered progress bars.
		*/
    const songBufferedProgressBarsSongsInPlaylist = document.querySelectorAll(
      '.amplitude-buffered-progress[data-amplitude-song-index="' +
        activePlaylistIndex +
        '"][data-amplitude-playlist="' +
        config.active_playlist +
        '"]'
    );

    /*
			Iterate over all of the song buffered progress bar and
			set them to 0 which is like re-setting them.
		*/
    for (let i = 0; i < songBufferedProgressBarsSongsInPlaylist.length; i++) {
      if (!isNaN(config.buffered)) {
        songBufferedProgressBarsSongsInPlaylist[i].value = parseFloat(
          parseFloat(config.buffered) / 100
        );
      }
    }
  }

  /**
   * Sets all of the song buffered progress bars to 0
   *
   * @access public
   */
  function reset() {
    /*
			Gets all of the song buffered progress bars.
		*/
    let songBufferedProgressBars = document.getElementsByClassName(
      "amplitude-buffered-progress"
    );

    /*
			Iterate over all of the song buffered progress bar and
			set them to 0 which is like re-setting them.
		*/
    for (let i = 0; i < songBufferedProgressBars.length; i++) {
      songBufferedProgressBars[i].value = 0;
    }
  }

  /**
   * Returns the public facing methods
   */
  return {
    sync: sync,
    reset: reset
  };
})();

export default BufferedProgressElements;
