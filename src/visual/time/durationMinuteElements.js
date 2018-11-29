/**
 * Imports the config module
 * @module config
 */
import config from "../../config.js";

let DurationMinuteElements = (function() {
  function sync(minutes) {
    syncGlobal(minutes);
    syncPlaylist(minutes);
    syncSong(minutes);
    syncSongInPlaylist(minutes);
  }

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

  function resetTimes() {
    let durationMinuteSelectors = document.querySelectorAll(
      ".amplitude-duration-minutes"
    );

    for (let i = 0; i < durationMinuteSelectors.length; i++) {
      durationMinuteSelectors[i].innerHTML = "00";
    }
  }

  return {
    sync: sync,
    resetTimes: resetTimes
  };
})();

export default DurationMinuteElements;
