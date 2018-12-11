/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Imports AmplitudeJS Debug Utility
 * @module utilities/debug
 */
import Debug from "../utilities/debug.js";

/**
 * Imports the AmplitudeJS Audio Navigation Utility
 * @module utilities/AudioNavigation
 */
import AudioNavigation from "../utilities/audioNavigation.js";

/**
 * Imports the AmplitudeJS Checks Utility
 * @module utilities/Checks
 */
import Checks from "../utilities/checks.js";

/**
 * Imports the AmplitudeJS Core Methods
 * @module core/Core
 */
import Core from "../core/core.js";

/**
 * Imports the AmplitudeJS play pause elements.
 * @module visual/PlayPauseElements
 */
import PlayPauseElements from "../visual/playPauseElements.js";

/**
 * Handles the skip to event.
 *
 * @module events/SkipTo
 */
let SkipTo = (function() {
  /**
   * Handles an event on a skip to button.
   *
   * HANDLER FOR:       class="amplitude-skip-to"
   *
   * GLOBAL:            class="amplitude-skip-to" amplitude-song-index="song_index" amplitude-location="seconds"
   * PLAYLIST:          class="amplitude-skip-to" amplitude-playlist="playlist_key" amplitude-song-index="song_index" amplitude-location="seconds"
   *
   * @access public
   */
  function handle() {
    /*
      If the touch is moving, we do not want to accidentally touch the play
      pause element and fire an event.
    */
    if (!config.is_touch_moving) {
      /*
        Extracts the needed attributes from the element.
      */
      let playlist = this.getAttribute("data-amplitude-playlist");
      let songIndex = this.getAttribute("data-amplitude-song-index");
      let location = this.getAttribute("data-amplitude-location");

      /*
        If the location is null, write a message. We can't skip to a location
        that is null
      */
      if (location == null) {
        Debug.writeMessage(
          "You must add an 'data-amplitude-location' attribute in seconds to your 'amplitude-skip-to' element."
        );
      }

      /*
        If the song index is null, write a debug message. We can't skip to a location
        of a null song.
      */
      if (songIndex == null) {
        Debug.writeMessage(
          "You must add an 'data-amplitude-song-index' attribute to your 'amplitude-skip-to' element."
        );
      }

      /*
        If the location and song index are set, continue.
      */
      if (location != null && songIndex != null) {
        /*
  				Determines if the skip to button is in the scope of a playlist.
  			*/
        if (playlist == null) {
          handleSkipToSong(parseInt(songIndex), parseInt(location));
        } else {
          handleSkipToPlaylist(
            playlist,
            parseInt(songIndex),
            parseInt(location)
          );
        }
      }
    }
  }

  /**
   * Handles the skipping to a specific song
   *
   * @access private
   * @param {string} songIndex  - The index of the song being skipped to
   * @param {number} location   - The seconds location of the song in the playlist.
   */
  function handleSkipToSong(songIndex, location) {
    /*
      Changes the song to where it's being skipped and then
      play the song.
    */
    AudioNavigation.changeSong(config.songs[songIndex], songIndex);
    Core.play();

    /*
      Syncs all of the play pause buttons now that we've skipped.
    */
    PlayPauseElements.syncGlobal();
    PlayPauseElements.syncSong();

    /*
      Skip to the location in the song.
    */
    Core.skipToLocation(location);
  }

  /**
   * Handles the skipping to a song that's in a playlist.
   *
   * @access private
   * @param {string} playlist   - The playlist being skipped to
   * @param {string} songIndex  - The index of the song in the playlist
   * @param {number} location   - The seconds location of the song in the playlist.
   */
  function handleSkipToPlaylist(playlist, songIndex, location) {
    /*
      Checks if we are skipping to a new playlist
    */
    if (Checks.newPlaylist(playlist)) {
      AudioNavigation.setActivePlaylist(playlist);
    }

    /*
      Changes the song to where it's being skipped and then
      play the song.
    */
    AudioNavigation.changeSongPlaylist(
      playlist,
      config.playlists[playlist].songs[songIndex],
      songIndex
    );
    Core.play();

    /*
      Sync all of the play pause elements.
    */
    PlayPauseElements.syncGlobal();
    PlayPauseElements.syncPlaylist();
    PlayPauseElements.syncSong();

    /*
      Skip to the location in the song.
    */
    Core.skipToLocation(location);
  }

  /**
   * Return public facing methods
   */
  return {
    handle: handle
  };
})();

export default SkipTo;
