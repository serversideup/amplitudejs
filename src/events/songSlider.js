/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Imports the time utility
 * @module utilities/Time
 */
import Time from "../utilities/time.js";

/**
 * Imports the song slider elements.
 * @module visual/SongSliderElements
 */
import SongSliderElements from "../visual/songSliderElements.js";

/**
 * Handles the song slider to event.
 *
 * @module events/SongSlider
 */
let SongSlider = (function() {
  /**
   * Handles a song slider element.
   *
   * HANDLER FOR:       class="amplitude-song-slider"
   *
   * GLOBAL:            class="amplitude-song-slider"
   * PLAYLIST:          class="amplitude-song-slider" amplitude-playlist="playlist_key"
   * SONG:              class="amplitude-song-slider" amplitude-song-index="song_index"
   * SONG IN PLAYLIST:  class="amplitude-song-slider" amplitude-playlist="playlist_key" amplitude-song-index="song_index"
   *
   * @access public
   */
  function handle() {
    /*
			Gets the percentage of the song we will be setting the location for.
		*/
    let locationPercentage = this.value;

    /*
      Computes the time in seconds for the current song.
    */
    let computedTime = config.audio.duration * (locationPercentage / 100);

    /*
      Gets the attributes for playlist and index for the element.
    */
    let playlist = this.getAttribute("data-amplitude-playlist");
    let song = this.getAttribute("data-amplitude-song-index");

    /*
      If no playlist or song is defined, then it's a global song slider.
    */
    if (playlist == null && song == null) {
      handleGlobalSongSlider(computedTime, locationPercentage);
    }

    /*
      If a playlist but no song is defined, then it's playlist slider.
    */
    if (playlist != null && song == null) {
      handlePlaylistSongSlider(computedTime, locationPercentage, playlist);
    }

    /*
      If no playlist but a song is defined, then it's a song slider.
    */
    if (playlist == null && song != null) {
      handleSongSongSlider(computedTime, locationPercentage, song);
    }

    /*
      If playlist and song are defined then it's a song in a playlist
      slider.
    */
    if (playlist != null && song != null) {
      handleSongInPlaylistSongSlider(
        computedTime,
        locationPercentage,
        playlist,
        song
      );
    }
  }

  /**
   * Handles a change on a global audio slider
   *
   * @access private
   * @param {integer} computedTime  - The time we will set the audio to.
   * @param {float}   locationPercentage - The percent through the song.
   */
  function handleGlobalSongSlider(computedTime, locationPercentage) {
    /*
			If the active song is not live, set the current time and adjust the slider.
		*/
    if (!config.active_metadata.live) {
      Time.setCurrentTime(computedTime);

      /*
        Sync song slider elements.
      */
      SongSliderElements.sync(
        locationPercentage,
        config.active_playlist,
        config.active_index
      );
    }
  }

  /**
   * Handles a change on a playlist audio slider
   *
   * @access private
   * @param {integer} computedTime  - The time we will set the audio to.
   * @param {float}   locationPercentage - The percent through the song.
   * @param {string}  playlist = The playlist the song slider belongs to.
   */
  function handlePlaylistSongSlider(
    computedTime,
    locationPercentage,
    playlist
  ) {
    /*
			We don't want to song slide a playlist that's not the
			active placylist.
		*/
    if (config.active_playlist == playlist) {
      /*
  			If the active song is not live, set the current time
  		*/
      if (!config.active_metadata.live) {
        Time.setCurrentTime(computedTime);

        /*
          Sync song slider elements.
        */
        SongSliderElements.sync(
          locationPercentage,
          playlist,
          config.active_index
        );
      }
    }
  }

  /**
   * Handles a change on a song audio slider
   *
   * @access private
   * @param {integer} computedTime  - The time we will set the audio to.
   * @param {float}   locationPercentage - The percent through the song.
   * @param {integer} songIndex = The song being navigated.
   */
  function handleSongSongSlider(computedTime, locationPercentage, songIndex) {
    /*
      We only want to move the slider if the active song is the
      same as the song being selected.
    */
    if (config.active_index == songIndex && config.active_playlist == null) {
      /*
    		If the active song is not live, set the current time
    	*/
      if (!config.active_metadata.live) {
        Time.setCurrentTime(computedTime);

        /*
          Sync song slider elements.
        */
        SongSliderElements.sync(
          locationPercentage,
          config.active_playlist,
          songIndex
        );
      }
    }
  }

  /**
   * Handles a change on a song audio slider
   *
   * @access private
   * @param {integer} computedTime  - The time we will set the audio to.
   * @param {float}   locationPercentage - The percent through the song.
   * @param {integer} playlist = The playlist the song belongs to.
   * @param {integer} songIndex = The song being navigated.
   */
  function handleSongInPlaylistSongSlider(
    computedTime,
    locationPercentage,
    playlist,
    songIndex
  ) {
    /*
      We only want to move the slider if the active song is the
      same as the song being selected and the active playlist is the same
      as the playlist selected.
    */
    if (
      config.playlists[playlist].active_index == songIndex &&
      config.active_playlist == playlist
    ) {
      /*
    		If the active song is not live, set the current time
    	*/
      if (!config.active_metadata.live) {
        Time.setCurrentTime(computedTime);

        /*
          Sync song slider elements.
        */
        SongSliderElements.sync(locationPercentage, playlist, songIndex);
      }
    }
  }

  /*
    Return public facing methods
  */
  return {
    handle: handle
  };
})();

export default SongSlider;
