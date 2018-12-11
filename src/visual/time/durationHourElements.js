/**
 * Imports the config module
 * @module config
 */
import config from "../../config.js";

/**
 * Handles all of the duration hours elements.
 *
 * @module visual/time/DurationHourElements.
 */
let DurationHourElements = (function() {
  /**
   * Sync the duration hours elements.
   *
   * @param {Integer} hours - The duration hours for the audio.
   */
  function sync(hours) {
    syncGlobal(hours);
    syncPlaylist(hours);
    syncSong(hours);
    syncSongInPlaylist(hours);
  }

  /**
   * Syncs the global duration hours elements.
   *
   * @param {Integer} hours - the duration hours for the audio.
   */
  function syncGlobal(hours) {
    let durationHourSelectors = document.querySelectorAll(
      ".amplitude-duration-hours"
    );

    for (let i = 0; i < durationHourSelectors.length; i++) {
      let playlist = durationHourSelectors[i].getAttribute(
        "data-amplitude-playlist"
      );
      let songIndex = durationHourSelectors[i].getAttribute(
        "data-amplitude-song-index"
      );

      if (playlist == null && songIndex == null) {
        durationHourSelectors[i].innerHTML = hours;
      }
    }
  }

  /**
   * Syncs the playlist duration hours for the audio.
   *
   * @param {Integer} hours - The duration hours for the audio.
   */
  function syncPlaylist(hours) {
    let durationHourSelectors = document.querySelectorAll(
      '.amplitude-duration-hours[data-amplitude-playlist="' +
        config.active_playlist +
        '"]'
    );

    for (let i = 0; i < durationHourSelectors.length; i++) {
      let songIndex = durationHourSelectors[i].getAttribute(
        "data-amplitude-song-index"
      );

      if (songIndex == null) {
        durationHourSelectors[i].innerHTML = hours;
      }
    }
  }

  /**
   * Syncs the song duration hours.
   *
   * @param {Integer} hours - The duration hours for the audio.
   */
  function syncSong(hours) {
    if (config.active_playlist == null) {
      let durationHourSelectors = document.querySelectorAll(
        '.amplitude-duration-hours[data-amplitude-song-index="' +
          config.active_index +
          '"]'
      );

      for (let i = 0; i < durationHourSelectors.length; i++) {
        let playlist = durationHourSelectors[i].getAttribute(
          "data-amplitude-playlist"
        );

        if (playlist == null) {
          durationHourSelectors[i].innerHTML = hours;
        }
      }
    }
  }

  /**
   * Syncs the song in playlist duration hours.
   *
   * @param {Integer} hours - The duration hours of the audio.
   */
  function syncSongInPlaylist(hours) {
    let activePlaylistIndex =
      config.active_playlist != "" && config.active_playlist != null
        ? config.playlists[config.active_playlist].active_index
        : null;

    let durationHourSelectors = document.querySelectorAll(
      '.amplitude-duration-hours[data-amplitude-playlist="' +
        config.active_playlist +
        '"][data-amplitude-song-index="' +
        activePlaylistIndex +
        '"]'
    );

    for (let i = 0; i < durationHourSelectors.length; i++) {
      durationHourSelectors[i].innerHTML = hours;
    }
  }

  /**
   * Resets the duration shours elements to '00'
   */
  function resetTimes() {
    let durationHourSelectors = document.querySelectorAll(
      ".amplitude-duration-hours"
    );

    for (let i = 0; i < durationHourSelectors.length; i++) {
      durationHourSelectors[i].innerHTML = "00";
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

export default DurationHourElements;
