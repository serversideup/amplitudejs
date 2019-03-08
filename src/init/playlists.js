/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * AmplitudeJS Debug Module
 * @module utilities/Debug
 */
import Debug from "../utilities/debug.js";

/**
 * AmplitudeJS Checks Utility.
 * @module utilities/Checks
 */
import Checks from "../utilities/checks.js";

/**
 * AmplitudeJS Visual Meta Data Elements Module
 * @module visual/MetaDataElements
 */
import MetaDataElements from "../visual/metaDataElements.js";

/**
 * AmplitudeJS SoundCloud Meta module
 * @module soundcloud/Soundcloud
 */
import SoundCloud from "../soundcloud/soundcloud.js";

/**
 * Handles the initialization of the playlists.
 *
 * @module init/PlaylistsInitializer
 */
let PlaylistsInitializer = (function() {
  /**
   * Initializes the playlists for AmplitudeJS
   *
   * @param {Object} playlists - The playlists defined by the user.
   */
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
      Grab any SoundCloud Data for the playlist songs if needed.
    */
    grabSoundCloudData();

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

              config.playlists[key].songs[i].index = i;
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

            /*
              If not an int, then is a dedicated song, just set the index.
            */
            if (!Checks.isInt(config.playlists[key].songs[i]) ){
              config.playlists[key].songs[i].index = i;
            }
          }
        }
      }
    }
  }

  /**
   * Grabs the SoundCloud data for any song in the playlist that
   * the user needs to grab data for.
   *
   * @access private
   */
  function grabSoundCloudData() {
    /*
      Iterate over all of the config's playlists
    */
    for (let key in config.playlists) {
      /*
        Checks if the playlist key is accurate.
      */
      if (config.playlists.hasOwnProperty(key)) {
        /*
          Iterate over all of the songs in the playlist and see if
          they need to grab the SoundCloud data for the song.
        */
        for (let i = 0; i < config.playlists[key].songs.length; i++) {
          /*
            Only Grab the data if the URL is a SoundCloud URL.
          */
          if (SoundCloud.isSoundCloudURL(config.playlists[key].songs[i].url)) {
            /*
              Only grab the data if the SoundCloud data has not already been
              grabbed for the audio. This could happen if the user defined the
              song in the songs array and was grabbed before.
            */
            if (config.playlists[key].songs[i].soundcloud_data == undefined) {
              SoundCloud.resolveIndividualStreamableURL(
                config.playlists[key].songs[i].url,
                key,
                i
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
