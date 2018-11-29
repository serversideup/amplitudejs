import config from "../config.js";

/**
 * AmplitudeJS Debug Module
 * @module utilities/Debug
 */
import Debug from "../utilities/debug.js";

import Checks from "../utilities/checks.js";

import MetaDataElements from "../visual/metaDataElements.js";

let PlaylistsInitializer = (function() {
  function initialize(playlists) {
    /*
      Copy the playlists over to Amplitude
    */
    config.playlists = playlists;

    /*
      Copy songs over from songs array.
    */
    copySongsToPlaylists();

    /*
      Initialize a scoped active index for each playlist.
    */
    initializePlaylistActiveIndexes();

    /*
      Initialize the shuffle status of the playlists.
    */
    initializePlaylistShuffleStatuses();

    /*
      Initialize the repeat status for the playlits.
    */
    initializePlaylistsRepeatStatuses();

    /*
      Initialize temporary place holders for shuffle lists.
    */
    initializePlaylistShuffleLists();

    /*
      Initializes the first song in the playlist
    */
    initializeFirstSongInPlaylistMetaData();
  }

  /**
   * Initializes a scoped active index for each playlist.
   *
   * @access private
   */
  function initializePlaylistActiveIndexes() {
    /*
  		Iterate over all of the playlists defined by the user
      and add an active index.
		*/
    for (let key in config.playlists) {
      config.playlists[key].active_index = null;
    }
  }

  /**
   * Ensures the indexes in the playlists are valid indexes. The song has
   * to exist in the Amplitude config to be played correctly. If the index
   * is an integer, we ensure it exists and coy it to the array.
   *
   * @access private
   */
  function copySongsToPlaylists() {
    /*
      Iterate over all of the config's playlists
    */
    for (let key in config.playlists) {
      /*
        Checks if the playlist key is accurate.
      */
      if (config.playlists.hasOwnProperty(key)) {
        /*
          Checks if the playlist has songs.
        */
        if (config.playlists[key].songs) {
          /*
            Iterate over all of the songs in the playlist
          */
          for (let i = 0; i < config.playlists[key].songs.length; i++) {
            if (Checks.isInt(config.playlists[key].songs[i])) {
              config.playlists[key].songs[i] =
                config.songs[config.playlists[key].songs[i]];
            }
            /*
              Check to see if the index for the song in the playlist
              exists in the songs config.
            */
            if (
              Checks.isInt(config.playlists[key].songs[i]) &&
              !config.songs[config.playlists[key].songs[i]]
            ) {
              Debug.writeMessage(
                "The song index: " +
                  config.playlists[key].songs[i] +
                  " in playlist with key: " +
                  key +
                  " is not defined in your songs array!"
              );
            }
          }
        }
      }
    }
  }

  /**
   * Initializes the shuffle statuses for each of the playlists. These will
   * be referenced when we shuffle individual playlists.
   *
   * @access private
   */
  function initializePlaylistShuffleStatuses() {
    /*
			Iterate over all of the playlists the user defined adding
			the playlist key to the shuffled playlist array and creating
			and empty object to house the statuses.
		*/
    for (let key in config.playlists) {
      config.playlists[key].shuffle = false;
    }
  }

  /**
   * Initializes the repeat statuses for each of the playlists.  These will
   * be referenced when we repeat individual playlits.
   *
   * @access private
   */
  function initializePlaylistsRepeatStatuses() {
    /*
      Iterate over all of the playlists the user defined adding
      the playlist key to the repeated playlist array and creating
      and empty object to house the statuses.
    */
    for (let key in config.playlists) {
      config.playlists[key].repeat = false;
    }
  }

  /**
   * Initializes the shuffled playlist placeholders. These will be set for
   * playlists that are shuffled and contain the shuffled songs.
   *
   * @access private
   */
  function initializePlaylistShuffleLists() {
    /*
 			Iterate over all of the playlists the user defined adding
 			the playlist key to the shuffled playlists array and creating
 			and empty object to house the shuffled playlists
 		*/
    for (let key in config.playlists) {
      config.playlists[key].shuffle_list = [];
    }
  }

  /**
   * Intializes the display for the first song in the playlist meta data.
   *
   * @access private
   */
  function initializeFirstSongInPlaylistMetaData() {
    /*
			Iterates over all of the playlists setting the meta data for the
			first song.
		*/
    for (let key in config.playlists) {
      MetaDataElements.setFirstSongInPlaylist(
        config.playlists[key].songs[0],
        key
      );
    }
  }

  /*
    Returns the public facing methods
  */
  return {
    initialize: initialize
  };
})();

export default PlaylistsInitializer;
