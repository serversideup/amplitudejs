/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * AmplitudeJS Shuffle Module. Handles all of the shuffling functionality for
 * AmplitudeJS
 *
 * @module utilities/Shuffler
 */
let Shuffler = (function() {
  /**
   * Sets the shuffle state globally
   *
   * @access public
   * @param {boolean} shuffle   - True when we are shuffling, false when we turn it off.
   */
  function setShuffle(shuffle) {
    config.shuffle_on = shuffle;

    if (shuffle) {
      shuffleSongs();
    } else {
      config.shuffle_list = [];
    }
  }

  /**
   * Toggles the shuffle status globally.
   *
   * @access public
   */
  function toggleShuffle() {
    /*
      If shuffle is on, we toggle it off. If shuffle is off, we
      toggle on.
    */
    if (config.shuffle_on) {
      config.shuffle_on = false;
      config.shuffle_list = [];
    } else {
      config.shuffle_on = true;
      shuffleSongs();
    }
  }

  /**
   * Sets the shuffle state for a playlist
   *
   * @access public
   * @param {string} playlist   The key of the playlist we are shuffling.
   * @param {boolean} shuffle   True when we are shuffling the playlist, false when we turn off shuffle.
   */
  function setShufflePlaylist(playlist, shuffle) {
    config.playlists[playlist].shuffle = shuffle;

    if (config.playlists[playlist].shuffle) {
      shufflePlaylistSongs(playlist);
    } else {
      config.playlists[playlist].shuffle_list = [];
    }
  }

  /**
   * Sets the shuffle state for a playlist
   *
   * @access public
   * @param {string} playlist   The key of the playlist we are shuffling.
   */
  function toggleShufflePlaylist(playlist) {
    /*
      If the playlist shuffled is on, we toggle it off. If the
      playlist shuffled is off, we toggle it on.
    */
    if (config.playlists[playlist].shuffle) {
      config.playlists[playlist].shuffle = false;
      config.playlists[playlist].shuffle_list = [];
    } else {
      config.playlists[playlist].shuffle = true;
      shufflePlaylistSongs(playlist);
    }
  }

  /**
   * Shuffles individual songs in the config
   * Based off of: http://www.codinghorror.com/blog/2007/12/the-danger-of-naivete.html
   *
   * Public Accessor: Shuffle.shuffleSongs()
   *
   * @access public
   */
  function shuffleSongs() {
    /*
			Builds a temporary array with the length of the config.
		*/
    let shuffleTemp = new Array(config.songs.length);

    /*
			Set the temporary array equal to the songs array.
		*/
    for (let i = 0; i < config.songs.length; i++) {
      shuffleTemp[i] = config.songs[i];
    }

    /*
			Iterate ove rthe songs and generate random numbers to
			swap the indexes of the shuffle array.
		*/
    for (let i = config.songs.length - 1; i > 0; i--) {
      let randNum = Math.floor(Math.random() * config.songs.length + 1);
      shuffleSwap(shuffleTemp, i, randNum - 1);
    }

    /*
			Set the shuffle list to the shuffle temp.
		*/
    config.shuffle_list = shuffleTemp;
  }

  /**
   * Shuffle songs in a playlist
   *
   * Public Accessor: Shuffle.shufflePlaylistSongs( playlist )
   *
   * @access public
   * @param {string} playlist - The playlist we are shuffling.
   */
  function shufflePlaylistSongs(playlist) {
    /*
      Builds a temporary array with the length of the playlist songs.
    */
    let shuffleTemp = new Array(config.playlists[playlist].songs.length);

    /*
      Set the temporary array equal to the playlist array.
    */
    for (let i = 0; i < config.playlists[playlist].songs.length; i++) {
      shuffleTemp[i] = config.playlists[playlist].songs[i];
    }

    /*
      Iterate ove rthe songs and generate random numbers to
      swap the indexes of the shuffle array.
    */
    for (let i = config.playlists[playlist].songs.length - 1; i > 0; i--) {
      let randNum = Math.floor(
        Math.random() * config.playlists[playlist].songs.length + 1
      );
      shuffleSwap(shuffleTemp, i, randNum - 1);
    }

    /*
      Set the shuffle list to the shuffle temp.
    */
    config.playlists[playlist].shuffle_list = shuffleTemp;
  }

  /**
   * Swaps and randomizes the song shuffle.
   *
   * @access private
   * @param {object} shuffleList 	- The list of songs that is going to be shuffled
   * @param {number} original 		- The original index of he song in the songs array
   * @param {number} random 			- The randomized index that will be the new index of the song in the shuffle array.
   */
  function shuffleSwap(shuffleList, original, random) {
    let temp = shuffleList[original];
    shuffleList[original] = shuffleList[random];
    shuffleList[random] = temp;
  }

  /**
   * Returns public facing methods
   */
  return {
    setShuffle: setShuffle,
    toggleShuffle: toggleShuffle,
    setShufflePlaylist: setShufflePlaylist,
    toggleShufflePlaylist: toggleShufflePlaylist,
    shuffleSongs: shuffleSongs,
    shufflePlaylistSongs: shufflePlaylistSongs
  };
})();

export default Shuffler;
