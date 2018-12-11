/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * AmplitudeJS Repeater utility. Handles setting the repeat for all scenarios.
 *
 * @module utilities/Repeater
 */
let Repeater = (function() {
  /**
   * Sets the state of the repeat for a song.
   *
   * @access public
   * @param {boolean} repeat - A boolean representing whether the repeat should be on or off
   */
  function setRepeat(repeat) {
    /*
      Set the global repeat to be toggled
    */
    config.repeat = repeat;
  }

  /**
   * Sets the state of the repeat for a playlist.
   *
   * @access public
   * @param {boolean} repeat - A boolean representing whether the repeat should be on or off
   * @param {string} playlist - The key of the playlist for repeating
   */
  function setRepeatPlaylist(repeat, playlist) {
    /*
      Set the playlist repeat to be toggled.
    */
    config.playlists[playlist].repeat = repeat;
  }

  /**
   * Sets the state of the repeat song
   *
   * @access public
   * @param {boolean} repeat - A boolean representing whether the repeat shoudl be on or off for the song.
   */
  function setRepeatSong(repeat) {
    config.repeat_song = repeat;
  }

  /*
    Returns the public facing methods
  */
  return {
    setRepeat: setRepeat,
    setRepeatPlaylist: setRepeatPlaylist,
    setRepeatSong: setRepeatSong
  };
})();

export default Repeater;
