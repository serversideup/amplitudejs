/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Imports the config state utility.
 * @module utilities/ConfigState
 */
import ConfigState from "../utilities/configState.js";

/**
 * Imports the AmplitudeJS Core Methods
 * @module core/Core
 */
import Core from "../core/core.js";

/**
 * Imports the AmplitudeJS Checks Utility
 * @module utilities/Checks
 */
import Checks from "../utilities/checks.js";

/**
 * Imports the AmplitudeJS Audio Navigation Utility
 * @module utilities/AudioNavigation
 */
import AudioNavigation from "../utilities/audioNavigation.js";

/**
 * Imports the AmplitudeJS Play Pause Elements
 * @module visual/PlayPauseElements
 */
import PlayPauseElements from "../visual/playPauseElements.js";

/**
 * Handles all of the play events
 * @module events/Play
 */
let Play = (function() {
  /**
   * Handles an event on a play button in Amplitude.
   *
   * HANDLER FOR:       class="amplitude-play"
   *
   * GLOBAL:            class="amplitude-play"
   * PLAYLIST:          class="amplitude-play" amplitude-playlist="playlist_key"
   * SONG:              class="amplitude-play" amplitude-song-index="song_index"
   * SONG IN PLAYLIST:  class="amplitude-play" amplitude-playlist="playlist-key" amplitude-song-index="playlist_index"
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
        there might be multiple play classes on the page. In that
        case it is possible the user could click a different play
        class and change the song.
      */
      let songIndexAttribute = this.getAttribute("data-amplitude-song-index");
      let playlistAttribute = this.getAttribute("data-amplitude-playlist");

      /*
        Handle a global play button.
      */
      if (playlistAttribute == null && songIndexAttribute == null) {
        handleGlobalPlay();
      }

      /*
        Handle a playlist play button.
      */
      if (playlistAttribute != null && songIndexAttribute == null) {
        handlePlaylistPlay(playlistAttribute);
      }

      /*
        Handle a song play button.
      */
      if (playlistAttribute == null && songIndexAttribute != null) {
        handleSongPlay(songIndexAttribute);
      }

      /*
        Handle a song in playlist play button.
      */
      if (playlistAttribute != null && songIndexAttribute != null) {
        handleSongInPlaylistPlay(playlistAttribute, songIndexAttribute);
      }
    }
  }

  /**
   * Handles global play button which plays whatever song is
   * active.
   *
   * @access private
   */
  function handleGlobalPlay() {
    /*
      Plays the song
    */
    Core.play();

    /*
      Sync the play pause elements.
    */
    PlayPauseElements.sync();
  }

  /**
   * Handle the playlist play.
   *
   * @access private
   * @param {string} playlist The playlist the play button belongs to.
   */
  function handlePlaylistPlay(playlist) {
    /*
      Checks if we have a new playlist.
    */
    if (Checks.newPlaylist(playlist)) {
      /*
        Sets the active playlist to what belongs to the playlist.
      */
      AudioNavigation.setActivePlaylist(playlist);

      /*
        Play first song in the playlist since we just
        switched playlists, we start from the first song.

        If the user has shuffle on for the playlist, then
        we go from the first song in the shuffle playlist array.
      */
      if (config.playlists[playlist].shuffle) {
        AudioNavigation.changeSongPlaylist(
          playlist,
          config.playlists[playlist].shuffle_list[0],
          0
        );
      } else {
        AudioNavigation.changeSongPlaylist(
          playlist,
          config.playlists[playlist].songs[0],
          0
        );
      }
    }

    /*
      Plays the song.
    */
    Core.play();

    /*
      Syncs the play pause elements since they are dependent upon this state
      of the player.
    */
    PlayPauseElements.sync();
  }

  /**
   * Handles the song play button.
   *
   * @access private
   * @param {integer} song The index of the song we are playing.
   */
  function handleSongPlay(song) {
    /*
      There can be multiple playlists on the page and there can be
      multiple songs on the page AND there can be songs in multiple
      playlists, so we have some checking to do.
    */

    /*
      Check to see if the playlist has changed. Essentially, if we are moving
      out of a playlist context.
    */
    if (Checks.newPlaylist(null)) {
      /*
        We've moved out of the playlist context, so we set the active playlist
        to null
      */
      AudioNavigation.setActivePlaylist(null);

      /*
        We then change the song to the index selected.
      */
      AudioNavigation.changeSong(config.songs[song], song);
    }

    /*
      Check to see if the song has changed. If it has,
      set the active song. If it was in a playlist, the
      song wouldn't change here, since we already set the
      song when we checked for a playlist.
    */
    if (Checks.newSong(null, song)) {
      /*
        The song selected is different, so we change the
        song.
      */
      AudioNavigation.changeSong(config.songs[song], song);
    }

    /*
      Plays the song
    */
    Core.play();

    /*
      Syncs the play pause elements since they are dependent upon this state
      of the player.
    */
    PlayPauseElements.sync();
  }

  /**
   * Handles the song in playlist play.
   *
   * @access private
   * @param {string} playlist The playlist the play button belongs to.
   * @param {integer} song The song the play button belongs to.
   */
  function handleSongInPlaylistPlay(playlist, song) {
    /*
			There can be multiple playlists on the page and there can be
			multiple songs on the page AND there can be songs in multiple
			playlists, so we have some checking to do.
		*/

    /*
			Check to see if the playlist has changed. Essentially, if we are moving
      out of a playlist context.
		*/
    if (Checks.newPlaylist(playlist)) {
      /*
        We've moved out of the playlist context, so we set the active playlist
        to null
      */
      AudioNavigation.setActivePlaylist(playlist);

      /*
				We then change the song to the index selected.
			*/
      AudioNavigation.changeSongPlaylist(
        playlist,
        config.playlists[playlist].songs[song],
        song
      );
    }

    /*
			Check to see if the song has changed. If it has,
			set the active song. If it was in a playlist, the
			song wouldn't change here, since we already set the
			song when we checked for a playlist.
		*/
    if (Checks.newSong(playlist, song)) {
      /*
				The song selected is different, so we change the
				song.
			*/
      AudioNavigation.changeSongPlaylist(
        playlist,
        config.playlists[playlist].songs[song],
        song
      );
    }

    /*
      Plays the song
    */
    Core.play();

    /*
      Now we sync all the elements to match the state of the audio.
      We don't need to do any checks on new songs or changed playlists
      in the global since it's whatever song is playing.
    */
    PlayPauseElements.sync();
  }

  /*
    Returns the public facing elements
  */
  return {
    handle: handle
  };
})();

export default Play;
