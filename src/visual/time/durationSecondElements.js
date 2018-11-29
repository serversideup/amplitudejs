/**
 * Imports the config module
 * @module config
 */
import config from "../../config.js";

let DurationSecondElements = (function() {
  function sync(seconds) {
    syncGlobal(seconds);
    syncPlaylist(seconds);
    syncSong(seconds);
    syncSongInPlaylist(seconds);
  }

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

  function resetTimes() {
    let durationSecondSelectors = document.querySelectorAll(
      ".amplitude-duration-seconds"
    );

    for (let i = 0; i < durationSecondSelectors.length; i++) {
      durationSecondSelectors[i].innerHTML = "00";
    }
  }

  return {
    sync: sync,
    resetTimes: resetTimes
  };
})();

export default DurationSecondElements;
