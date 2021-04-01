/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Import the config state utility.
 * @module utilities/configState
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
 * Handles all of the play pause events
 * @module events/PlayPause
 */
let PlayPause = (function() {
  /**
   * Handles an event on a play/pause button
   *
   * HANDLER FOR:       class="amplitude-play-pause"
   *
   * GLOBAL:            class="amplitude-play-pause"
   * PLAYLIST:          class="amplitude-play-pause" amplitude-playlist="playlist_key"
   * SONG:              class="amplitude-play-pause" amplitude-song-index="song_index"
   * SONG IN PLAYLIST:  class="amplitude-play-pause" amplitude-playlist="playlist-key" amplitude-song-index="playlist_index"
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
        Get the playlist and song from the element. It's alright if these
        are null.
      */
      let playlist = this.getAttribute("data-amplitude-playlist");
      let song = this.getAttribute("data-amplitude-song-index");

      /*
        Handle a global play pause button
      */
      if (playlist == null && song == null) {
        handleGlobalPlayPause();
      }

      /*
        Handle a playlist play pause button
      */
      if (playlist != null && song == null) {
        handlePlaylistPlayPause(playlist);
      }

      /*
        Handle a song play pause button
      */
      if (playlist == null && song != null) {
        handleSongPlayPause(song);
      }

      /*
        Handle a song in playlist play pause button
      */
      if (playlist != null && song != null) {
        handleSongInPlaylistPlayPause(playlist, song);
      }
    }
  }

  /**
   * Sets the main play pause buttons to the current state of the song.
   * @access private
   */
  function handleGlobalPlayPause() {
    /*
      If the song is paused, we play the song. If the song is playing,
      we pause the song.
    */
    if (config.audio.paused) {
      Core.play();
    } else {
      Core.pause();
    }

    /*
      Now we sync all the elements to match the state of the audio.
      We don't need to do any checks on new songs or changed playlists
      in the global since it's whatever song is playing.
    */
    PlayPauseElements.sync();
  }

  /**
   * Sets the playlist main play pause buttons to the current state of the song.
   * @access private
   * @param {string} playlist The playlist the main play pause button controls
   */
  function handlePlaylistPlayPause(playlist) {
    /*
      The only thing that can change when you click a playlist
      play pause is the playlist. Main play pauses have no change
      in song, song play pauses can change playlist and song.
    */
    if (Checks.newPlaylist(playlist)) {
      /*
        If there's a new playlist, then we set the new playlist.
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
          0,
          true
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
      If the song is paused, we play the song. If the song is playing,
      we pause the song.
    */
    if (config.audio.paused) {
      Core.play();
    } else {
      Core.pause();
    }

    /*
      Now we sync all the elements to match the state of the audio.
      We don't need to do any checks on new songs or changed playlists
      in the global since it's whatever song is playing.
    */
    PlayPauseElements.sync();
  }

  /**
   * Sets the playlist main play pause buttons to the current state of the song.
   * @access private
   * @param {string} song The index of the song being played/paused
   */
  function handleSongPlayPause(song) {
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
      AudioNavigation.changeSong(config.songs[song], song, true);
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
      AudioNavigation.changeSong(config.songs[song], song, true);
    }

    /*
      If the song is paused, we play the song. If the song is playing,
      we pause the song.
    */
    if (config.audio.paused) {
      Core.play();
    } else {
      Core.pause();
    }

    /*
      Now we sync all the elements to match the state of the audio.
      We don't need to do any checks on new songs or changed playlists
      in the global since it's whatever song is playing.
    */
    PlayPauseElements.sync();
  }

  /**
   * Sets the song in playlist play pause buttons to the current
   * state of the song.
   * @access private
   * @param {string} playlist The playlist the song is a part of
   * @param {number} song The index of the song being played/paused
   */
  function handleSongInPlaylistPlayPause(playlist, song) {
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
        song,
        true
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
        song,
        true
      );
    }

    /*
      If the song is paused, we play the song. If the song is playing,
      we pause the song.
    */
    if (config.audio.paused) {
      Core.play();
    } else {
      Core.pause();
    }

    /*
      Now we sync all the elements to match the state of the audio.
      We don't need to do any checks on new songs or changed playlists
      in the global since it's whatever song is playing.
    */
    PlayPauseElements.sync();
  }

  /**
   * Returns the public facing methods
   */
  return {
    handle: handle
  };
})();

export default PlayPause;
