/**
 * Imports the config module
 * @module config
 */
import config from "../../config.js";

/**
 * Handles all of the duration time elements.
 *
 * @module visual/time/DurationTimeElements.
 */
let DurationTimeElements = (function() {
  /**
   * Syncs the duration time for all elements.
   *
   * @param {Object} durationTime - The object containing all of the song duration times.
   */
  function sync(durationTime) {
    let durationText = computeDurationText(durationTime);

    syncGlobal(durationText);
    syncPlaylist(durationText);
    syncSong(durationText);
    syncSongInPlaylist(durationText);
  }

  /**
   * Sync the global song duration elements.
   *
   * @param {Object} durationText - The text for the song duration.
   */
  function syncGlobal(durationText) {
    let durationTimeSelectors = document.querySelectorAll(
      ".amplitude-duration-time"
    );

    for (let i = 0; i < durationTimeSelectors.length; i++) {
      let playlist = durationTimeSelectors[i].getAttribute(
        "data-amplitude-playlist"
      );
      let songIndex = durationTimeSelectors[i].getAttribute(
        "data-amplitude-song-index"
      );

      if (playlist == null && songIndex == null) {
        durationTimeSelectors[i].innerHTML = durationText;
      }
    }
  }

  /**
   * Sync the playlist duration times.
   *
   * @param {Object} durationText - The text for the song duration.
   */
  function syncPlaylist(durationText) {
    let durationTimeSelectors = document.querySelectorAll(
      '.amplitude-duration-time[data-amplitude-playlist="' +
        config.active_playlist +
        '"]'
    );

    for (let i = 0; i < durationTimeSelectors.length; i++) {
      let songIndex = durationTimeSelectors[i].getAttribute(
        "data-amplitude-song-index"
      );

      if (songIndex == null) {
        durationTimeSelectors[i].innerHTML = durationText;
      }
    }
  }

  /**
   * Sync the song duration times.
   *
   * @param {Object} durationText - The text for the song duration.
   */
  function syncSong(durationText) {
    if (config.active_playlist == null) {
      let durationTimeSelectors = document.querySelectorAll(
        '.amplitude-duration-time[data-amplitude-song-index="' +
          config.active_index +
          '"]'
      );

      for (let i = 0; i < durationTimeSelectors.length; i++) {
        let playlist = durationTimeSelectors[i].getAttribute(
          "data-amplitude-playlist"
        );

        if (playlist == null) {
          durationTimeSelectors[i].innerHTML = durationText;
        }
      }
    }
  }

  /**
   * Sync the song in playlist duration times.
   *
   * @param {Object} durationText - An object containing the duration text.
   */
  function syncSongInPlaylist(durationText) {
    let activePlaylistIndex =
      config.active_playlist != "" && config.active_playlist != null
        ? config.playlists[config.active_playlist].active_index
        : null;

    let durationTimeSelectors = document.querySelectorAll(
      '.amplitude-duration-time[data-amplitude-playlist="' +
        config.active_playlist +
        '"][data-amplitude-song-index="' +
        activePlaylistIndex +
        '"]'
    );

    for (let i = 0; i < durationTimeSelectors.length; i++) {
      durationTimeSelectors[i].innerHTML = durationText;
    }
  }

  /**
   * Resets all of the duration times to empty.
   */
  function resetTimes() {
    let durationTimeSelectors = document.querySelectorAll(
      ".amplitude-duration-time"
    );

    for (let i = 0; i < durationTimeSelectors.length; i++) {
      durationTimeSelectors[i].innerHTML = "00:00";
    }
  }

  /**
   * Computes the duration text
   *
   * @param {Object} durationTime - An object containint the duration times.
   */
  function computeDurationText(durationTime) {
    var durationText = "00:00";

    if (!isNaN(durationTime.minutes) && !isNaN(durationTime.seconds)) {
      durationText = durationTime.minutes + ":" + durationTime.seconds;
      if (!isNaN(durationTime.hours) && durationTime.hours > 0) {
        durationText = durationTime.hours + ":" + durationText;
      }
    }

    return durationText;
  }

  /**
   * Return publically accessible methods.
   */
  return {
    sync: sync,
    resetTimes: resetTimes
  };
})();

export default DurationTimeElements;
