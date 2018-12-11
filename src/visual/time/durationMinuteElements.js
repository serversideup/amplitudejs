/**
 * Imports the config module
 * @module config
 */
import config from "../../config.js";

/**
 * Handles all of the duration minutes elements.
 *
 * @module visual/time/DurationMinuteElements.
 */
let DurationMinuteElements = (function() {
  /**
   * Sync the duration minutes elements.
   *
   * @param {Integer} minutes - The duration minutes for the audio.
   */
  function sync(minutes) {
    syncGlobal(minutes);
    syncPlaylist(minutes);
    syncSong(minutes);
    syncSongInPlaylist(minutes);
  }

  /**
   * Syncs the global duration minutes elements.
   *
   * @param {Integer} minutes - the duration minutes for the audio.
   */
  function syncGlobal(minutes) {
    let durationMinuteSelectors = document.querySelectorAll(
      ".amplitude-duration-minutes"
    );

    for (let i = 0; i < durationMinuteSelectors.length; i++) {
      let playlist = durationMinuteSelectors[i].getAttribute(
        "data-amplitude-playlist"
      );
      let songIndex = durationMinuteSelectors[i].getAttribute(
        "data-amplitude-song-index"
      );

      if (playlist == null && songIndex == null) {
        durationMinuteSelectors[i].innerHTML = minutes;
      }
    }
  }

  /**
   * Syncs the playlist duration minutes for the audio.
   *
   * @param {Integer} minutes - The duration minutes for the audio.
   */
  function syncPlaylist(minutes) {
    let durationMinuteSelectors = document.querySelectorAll(
      '.amplitude-duration-minutes[data-amplitude-playlist="' +
        config.active_playlist +
        '"]'
    );

    for (let i = 0; i < durationMinuteSelectors.length; i++) {
      let songIndex = durationMinuteSelectors[i].getAttribute(
        "data-amplitude-song-index"
      );

      if (songIndex == null) {
        durationMinuteSelectors[i].innerHTML = minutes;
      }
    }
  }

  /**
   * Syncs the song duration minutes.
   *
   * @param {Integer} minutes - The duration minutes for the audio.
   */
  function syncSong(minutes) {
    if (config.active_playlist == null) {
      let durationMinuteSelectors = document.querySelectorAll(
        '.amplitude-duration-minutes[data-amplitude-song-index="' +
          config.active_index +
          '"]'
      );

      for (let i = 0; i < durationMinuteSelectors.length; i++) {
        let playlist = durationMinuteSelectors[i].getAttribute(
          "data-amplitude-playlist"
        );

        if (playlist == null) {
          durationMinuteSelectors[i].innerHTML = minutes;
        }
      }
    }
  }

  /**
   * Syncs the song in playlist duration minutes.
   *
   * @param {Integer} minutes - The duration minutes of the audio.
   */
  function syncSongInPlaylist(minutes) {
    let activePlaylistIndex =
      config.active_playlist != "" && config.active_playlist != null
        ? config.playlists[config.active_playlist].active_index
        : null;

    let durationMinuteSelectors = document.querySelectorAll(
      '.amplitude-duration-minutes[data-amplitude-playlist="' +
        config.active_playlist +
        '"][data-amplitude-song-index="' +
        activePlaylistIndex +
        '"]'
    );

    for (let i = 0; i < durationMinuteSelectors.length; i++) {
      durationMinuteSelectors[i].innerHTML = minutes;
    }
  }

  /**
   * Resets the duration minutes elements to '00'
   */
  function resetTimes() {
    let durationMinuteSelectors = document.querySelectorAll(
      ".amplitude-duration-minutes"
    );

    for (let i = 0; i < durationMinuteSelectors.length; i++) {
      durationMinuteSelectors[i].innerHTML = "00";
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

export default DurationMinuteElements;
