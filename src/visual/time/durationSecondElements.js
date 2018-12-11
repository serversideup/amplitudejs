/**
 * Imports the config module
 * @module config
 */
import config from "../../config.js";

/**
 * Handles all of the duration seconds elements.
 *
 * @module visual/time/DurationSecondElements.
 */
let DurationSecondElements = (function() {
  /**
   * Sync the duration seconds elements.
   *
   * @param {Integer} seconds - The duration seconds for the audio.
   */
  function sync(seconds) {
    syncGlobal(seconds);
    syncPlaylist(seconds);
    syncSong(seconds);
    syncSongInPlaylist(seconds);
  }

  /**
   * Syncs the global duration seconds elements.
   *
   * @param {Integer} seconds - the duration seconds for the audio.
   */
  function syncGlobal(seconds) {
    let durationSecondSelectors = document.querySelectorAll(
      ".amplitude-duration-seconds"
    );

    for (let i = 0; i < durationSecondSelectors.length; i++) {
      let playlist = durationSecondSelectors[i].getAttribute(
        "data-amplitude-playlist"
      );
      let songIndex = durationSecondSelectors[i].getAttribute(
        "data-amplitude-song-index"
      );

      if (playlist == null && songIndex == null) {
        durationSecondSelectors[i].innerHTML = seconds;
      }
    }
  }

  /**
   * Syncs the playlist duration seconds for the audio.
   *
   * @param {Integer} seconds - The duration seconds for the audio.
   */
  function syncPlaylist(seconds) {
    let durationSecondSelectors = document.querySelectorAll(
      '.amplitude-duration-seconds[data-amplitude-playlist="' +
        config.active_playlist +
        '"]'
    );

    for (let i = 0; i < durationSecondSelectors.length; i++) {
      let songIndex = durationSecondSelectors[i].getAttribute(
        "data-amplitude-song-index"
      );

      if (songIndex == null) {
        durationSecondSelectors[i].innerHTML = seconds;
      }
    }
  }

  /**
   * Syncs the song duration seconds.
   *
   * @param {Integer} seconds - The duration seconds for the audio.
   */
  function syncSong(seconds) {
    if (config.active_playlist == null) {
      let durationSecondSelectors = document.querySelectorAll(
        '.amplitude-duration-seconds[data-amplitude-song-index="' +
          config.active_index +
          '"]'
      );

      for (let i = 0; i < durationSecondSelectors.length; i++) {
        let playlist = durationSecondSelectors[i].getAttribute(
          "data--amplitude-playlist"
        );

        if (playlist == null) {
          durationSecondSelectors[i].innerHTML = seconds;
        }
      }
    }
  }

  /**
   * Syncs the song in playlist duration seconds.
   *
   * @param {Integer} seconds - The duration seconds of the audio.
   */
  function syncSongInPlaylist(seconds) {
    let activePlaylistIndex =
      config.active_playlist != "" && config.active_playlist != null
        ? config.playlists[config.active_playlist].active_index
        : null;

    let durationSecondSelectors = document.querySelectorAll(
      '.amplitude-duration-seconds[data-amplitude-playlist="' +
        config.active_playlist +
        '"][data-amplitude-song-index="' +
        activePlaylistIndex +
        '"]'
    );

    for (let i = 0; i < durationSecondSelectors.length; i++) {
      durationSecondSelectors[i].innerHTML = seconds;
    }
  }

  /**
   * Resets the duration seconds elements to '00'
   */
  function resetTimes() {
    let durationSecondSelectors = document.querySelectorAll(
      ".amplitude-duration-seconds"
    );

    for (let i = 0; i < durationSecondSelectors.length; i++) {
      durationSecondSelectors[i].innerHTML = "00";
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

export default DurationSecondElements;
