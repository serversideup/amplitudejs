/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Imports the ConfigState module.
 * @module utilities/ConfigState
 */
import ConfigState from "../utilities/configState.js";

/**
 * Imports the AmplitudeJS Core Methods
 * @module core/Core
 */
import Core from "../core/core.js";

/**
 * Imports the AmplitudeJS Play Pause Elements
 * @module visual/PlayPauseElements
 */
import PlayPauseElements from "../visual/playPauseElements.js";

/**
 * Handles all of the pause events
 * @module events/Pause
 */
let Pause = (function() {
  /**
   * Handles an event on a pause button
   *
   * HANDLER FOR:       class="amplitude-pause"
   *
   * GLOBAL:            class="amplitude-pause"
   * PLAYLIST:          class="amplitude-pause" amplitude-playlist="playlist_key"
   * SONG:              class="amplitude-pause" amplitude-song-index="song_index"
   * SONG IN PLAYLIST:  class="amplitude-pause" amplitude-playlist="playlist-key" amplitude-song-index="playlist_index"
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
        Gets the attribute for song index so we can check if
        there is a need to change the song.  In some scenarios
        there might be multiple pause classes on the page. In that
        case it is possible the user could click a different pause
        class.
      */
      let songIndexAttribute = this.getAttribute("data-amplitude-song-index");
      let playlistAttribute = this.getAttribute("data-amplitude-playlist");

      /*
        Handle a global pause button.
      */
      if (playlistAttribute == null && songIndexAttribute == null) {
        handleGlobalPause();
      }

      /*
        Handle a playlist pause button.
      */
      if (playlistAttribute != null && songIndexAttribute == null) {
        handlePlaylistPause(playlistAttribute);
      }

      /*
        Handle a song pause button.
      */
      if (playlistAttribute == null && songIndexAttribute != null) {
        handleSongPause(songIndexAttribute);
      }

      /*
        Handle a song in playlist pause button.
      */
      if (playlistAttribute != null && songIndexAttribute != null) {
        handleSongInPlaylistPause(playlistAttribute, songIndexAttribute);
      }
    }
  }

  /**
   * Handles global pause button which pauses whatever song is
   * active.
   *
   * @access private
   */
  function handleGlobalPause() {
    /*
      Pauses the song.
    */
    Core.pause();

    /*
      Sync the play pause elements.
    */
    PlayPauseElements.sync();
  }

  /**
   * Handles the playlist pause.
   *
   * @access private
   * @param {string} playlist The playlist the pause button belongs to.
   */
  function handlePlaylistPause(playlist) {
    /*
      Checks to see if the active playlist is the same
    */
    if (config.active_playlist == playlist) {
      /*
        Pauses the song.
      */
      Core.pause();

      /*
        Sync the play pause elements.
      */
      PlayPauseElements.sync();
    }
  }

  /**
   * Handles the song pause.
   *
   * @access private
   * @param {integer} song The song the pause button belongs to.
   */
  function handleSongPause(song) {
    /*
      Checks to see if the active playlist is null and the song matches
      the active index.
    */
    if (
      (config.active_playlist == "" || config.active_playlist == null) &&
      config.active_index == song
    ) {
      /*
        Pauses the song.
      */
      Core.pause();

      /*
        Sync the play pause elements.
      */
      PlayPauseElements.sync();
    }
  }

  /**
   * Handles the song in playlist pause.
   *
   * @access private
   * @param {string} playlist The playlist the pause button belongs to.
   * @param {integer} song The song the pause button belongs to.
   */
  function handleSongInPlaylistPause(playlist, song) {
    /*
      Checks to see if the active song matches the song and the
      active playlist matches the playlist. This means the pause button is
      for the song in the playlist.
    */
    if (
      config.active_playlist == playlist &&
      config.playlists[playlist].active_index == song
    ) {
      /*
        Pauses the song.
      */
      Core.pause();

      /*
        Sync the play pause elements.
      */
      PlayPauseElements.sync();
    }
  }

  /*
    Returns the public facing elements
  */
  return {
    handle: handle
  };
})();

export default Pause;
