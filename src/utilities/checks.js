/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * AmplitudeJS Checks Module. Checks for new songs, albums, and playlists
 *
 * @module utilities/Checks
 */
let Checks = (function() {
  /**
   * Checks to see if the new song to be played is different than the song
   * that is currently playing. To be true, the user would have selected
   * play on a new song with a new index. To be false, the user would have
   * clicked play/pause on the song that was playing.
   *
   * Public Accessor: Checks.newSong( playlist, songIndex )
   * @access public
   * @param {string} playlist - The playlist we are checking the new song for. Could be null
   * @param {number} songIndex - The index of the new song to be played.
   * @returns {boolean} True if we are setting a new song, false if we are not setting a new song.
   */
  function newSong(playlist, songIndex) {
    /*
      If the playlists don't match, then it's definitely a new song.
    */
    if (config.active_playlist != playlist) {
      return true;
    } else {
      /*
        If we aren't in a playlist, we check the active index.
      */
      if (config.active_playlist == null && playlist == null) {
        /*
          If the active indexes don't match, then it's a new song.
        */
        if (config.active_index != songIndex) {
          return true;
        } else {
          return false;
        }
      } else {
        /*
          If we are in a playlist, then we check to see if the
          new song index matches the active index.
        */
        if (
          config.active_playlist == playlist &&
          config.playlists[playlist].active_index != songIndex
        ) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  /**
   * Checks to see if there is a new album
   *
   * Public Accessor: Checks.newAlbum( album )
   *
   * @access public
   * @param {string} album - Checks to see if the new song will have a new album.
   * @returns {boolean} True if there is a new album, false if there is not a new ablum.
   */
  function newAlbum(album) {
    if (config.active_album != album) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Checks to see if there is a new playlist
   *
   * Public Accessor: Checks.newPlaylist( playlist )
   *
   * @access public
   * @param {string} playlist - The playlist passed in to check against the active playlist.
   * @returns {boolean} True if there is a new playlist, false if there is not a new playlist.
   */
  function newPlaylist(playlist) {
    if (config.active_playlist != playlist) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Determines if the string passed in is a URL or not
   *
   * Public Accessor: AmplitudeHelpers.isURL( url )
   *
   * @access public
   * @param {string} url - The string we are testing to see if it's a URL.
   * @returns {boolean} True if the string is a url, false if it is not.
   */
  function isURL(url) {
    /*
			Test the string against the URL pattern and return if it matches
		*/
    let pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    return pattern.test(url);
  }

  /**
   * Determines if what is passed in is an integer or not.
   *
   * Public Accessor: AmplitudeHelpers.isInt( int )
   *
   * @access public
   * @param {string|number} int - The variable we are testing to see is an integer or not.
   * @returns {boolean} If the variable is an integer or not.
   */
  function isInt(int) {
    return (
      !isNaN(int) && parseInt(Number(int)) == int && !isNaN(parseInt(int, 10))
    );
  }

  /**
   * Returns public facing methods
   */
  return {
    newSong: newSong,
    newAlbum: newAlbum,
    newPlaylist: newPlaylist,
    isURL: isURL,
    isInt: isInt
  };
})();

export default Checks;
