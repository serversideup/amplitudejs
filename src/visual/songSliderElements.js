/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Defines the visual representation of AmplitudeJS song slider elements.
 * @module visual/SongSliderElements
 */
let SongSliderElements = (function() {
  /**
   * Syncs all of the song slider elements.
   *
   * @access public
   * @param {number} location 	- The location of the song as a percentage.
   * @param {string} playlist 	- The playlist we are setting the song slider for.
   * @param {number} songIndex 	- The index of the song we are adjusting the song slider for.
   */
  function sync(location, playlist, songIndex) {
    syncMain(location);
    syncPlaylist(location, playlist);
    syncSong(location, songIndex);
    syncSongInPlaylist(location, playlist);
  }

  /**
   * Syncs the main slider location
   *
   * @access public
   * @param {number} location 	- The location of the song as a percentage.
   */
  function syncMain(location) {
    /*
			Ensure we have a location that's a number
		*/
    location = !isNaN(location) ? location : 0;

    /*
			Gets the main song sliders
		*/
    const mainSongSliders = document.querySelectorAll(".amplitude-song-slider");

    /*
			Iterates over all of the main sliders and sets the value to the
			percentage of the song played.
		*/
    for (let i = 0; i < mainSongSliders.length; i++) {
      /*
        Grab the playlist and song attributes from the element.
      */
      let playlist = mainSongSliders[i].getAttribute("data-amplitude-playlist");
      let song = mainSongSliders[i].getAttribute("data-amplitude-song-index");

      /*
        This method is responsible for only the global elements,
        so we make sure there are no playlist or songs defined on
        the element.
      */
      if (playlist == null && song == null) {
        mainSongSliders[i].value = location;
      }
    }
  }

  /**
   * Syncs playlist song slider locations
   *
   * @access public
   * @param {number} location 	- The location of the song as a percentage.
   * @param {string} playlist 	- The playlist we are setting the song slider for.
   */
  function syncPlaylist(location, playlist) {
    /*
			Ensure we have a location that's a number
		*/
    location = !isNaN(location) ? location : 0;

    /*
			Gets the playlist song sliders
		*/
    const playlistSongSliders = document.querySelectorAll(
      '.amplitude-song-slider[data-amplitude-playlist="' + playlist + '"]'
    );

    /*
			Iterates over all of the playlist sliders and sets the value to the
			percentage of the song played.
		*/
    for (let i = 0; i < playlistSongSliders.length; i++) {
      /*
        Grab the playlist and song attributes from the element.
      */
      let playlistAttribute = playlistSongSliders[i].getAttribute(
        "data-amplitude-playlist"
      );
      let songAttribute = playlistSongSliders[i].getAttribute(
        "data-amplitude-song-index"
      );

      /*
				This method is responsible for only the playlist elements,
				so we make sure the playlist attribute matches what is passed
				in.
			*/
      if (playlistAttribute == playlist && songAttribute == null) {
        playlistSongSliders[i].value = location;
      }
    }
  }

  /**
   * Syncs individual song slider locations
   *
   * @access public
   * @param {number} location 	- The location of the song as a percentage.
   * @param {number} songIndex 	- The index of the song we are adjusting the song slider for.
   */
  function syncSong(location, songIndex) {
    /*
			We only want to sync song sliders if the playlist is null.
		*/
    if (config.active_playlist == null) {
      /*
				Ensure we have a location that's a number
			*/
      location = !isNaN(location) ? location : 0;

      /*
				Gets the individual song sliders
			*/
      const songSliders = document.querySelectorAll(
        '.amplitude-song-slider[data-amplitude-song-index="' + songIndex + '"]'
      );

      /*
				Iterates over all of the individual song sliders and sets the value
				to the percentage of the song played.
			*/
      for (let i = 0; i < songSliders.length; i++) {
        /*
	        Grab the playlist and song attributes from the element.
	      */
        let playlistAttribute = songSliders[i].getAttribute(
          "data-amplitude-playlist"
        );
        let songAttribute = songSliders[i].getAttribute(
          "data-amplitude-song-index"
        );

        /*
					This method is responsible for only the playlist elements,
					so we make sure the playlist attribute matches what is passed
					in.
				*/
        if (playlistAttribute == null && songAttribute == songIndex) {
          songSliders[i].value = location;
        }
      }
    }
  }

  /**
   * Syncs individual song slider locations
   *
   * @access public
   * @param {number} location 	- The location of the song as a percentage.
   * @param {string} playlist 	- The playlist we are setting the song slider for.
   */
  function syncSongInPlaylist(location, playlist) {
    /*
			Ensure we have a location that's a number
		*/
    location = !isNaN(location) ? location : 0;

    let activePlaylistIndex =
      config.active_playlist != "" && config.active_playlist != null
        ? config.playlists[config.active_playlist].active_index
        : null;

    /*
			Gets the song in playlist sliders
		*/
    const songInPlaylistSliders = document.querySelectorAll(
      '.amplitude-song-slider[data-amplitude-playlist="' +
        playlist +
        '"][data-amplitude-song-index="' +
        activePlaylistIndex +
        '"]'
    );

    /*
			Iterates over all of the song in playlist sliders and sets the value
			to the percentage of the song played.
		*/
    for (let i = 0; i < songInPlaylistSliders.length; i++) {
      songInPlaylistSliders[i].value = location;
    }
  }

  /**
   * Visually syncs the song sliders back to 0. This usually happens when
   * a song has changed, we ensure that all song sliders get reset.
   *
   * @access public
   */
  function resetElements() {
    let songSliders = document.getElementsByClassName("amplitude-song-slider");

    /*
			Iterate over all of the song sliders and set them to
			0 essentially resetting them.
		*/
    for (let i = 0; i < songSliders.length; i++) {
      songSliders[i].value = 0;
    }
  }

  /**
   * Returns the public facing methods
   */
  return {
    sync: sync,
    syncMain: syncMain,
    syncPlaylist: syncPlaylist,
    syncSong: syncSong,
    syncSongInPlaylist: syncSongInPlaylist,
    resetElements: resetElements
  };
})();

export default SongSliderElements;
