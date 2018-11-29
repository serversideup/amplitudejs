/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Handles all of the shuffle elements
 * @module visual/ShuffleElements
 */
let ShuffleElements = (function() {
  /**
   * Syncs the global shuffle button visual state.
   *
   * @access public
   */
  function syncMain() {
    /*
			Gets the shuffle buttons.
		*/
    let shuffleButtons = document.getElementsByClassName("amplitude-shuffle");

    /*
			Iterate over all of the shuffle buttons.
		*/
    for (let i = 0; i < shuffleButtons.length; i++) {
      /*
				Ensure the shuffle button doesn't belong to a playlist. We have
				a separate method for that.
			*/
      if (shuffleButtons[i].getAttribute("data-amplitude-playlist") == null) {
        /*
					If the state of the player is shuffled on, true, then
					we add the 'amplitude-shuffle-on' class and remove the
					'amplitude-shuffle-off' class. If the player is not shuffled
					then we do the opposite.
				*/
        if (config.shuffle_on) {
          shuffleButtons[i].classList.add("amplitude-shuffle-on");
          shuffleButtons[i].classList.remove("amplitude-shuffle-off");
        } else {
          shuffleButtons[i].classList.add("amplitude-shuffle-off");
          shuffleButtons[i].classList.remove("amplitude-shuffle-on");
        }
      }
    }
  }

  /**
   * Syncs the playlist shuffle button visual state.
   *
   * @access public
   * @param {string} playlist - The playlist string the shuffle button belongs to.
   */
  function syncPlaylist(playlist) {
    /*
			Gets all of the shuffle buttons.
		*/
    let shuffleButtons = document.querySelectorAll(
      '.amplitude-shuffle[data-amplitude-playlist="' + playlist + '"]'
    );

    /*
			Iterate over all of the shuffle buttons
		*/
    for (let i = 0; i < shuffleButtons.length; i++) {
      /*
				If the state of the playlist is shuffled on, true, then
				we add the 'amplitude-shuffle-on' class and remove the
				'amplitude-shuffle-off' class. If the player is not shuffled
				then we do the opposite.
			*/
      if (config.playlists[playlist].shuffle) {
        shuffleButtons[i].classList.add("amplitude-shuffle-on");
        shuffleButtons[i].classList.remove("amplitude-shuffle-off");
      } else {
        shuffleButtons[i].classList.add("amplitude-shuffle-off");
        shuffleButtons[i].classList.remove("amplitude-shuffle-on");
      }
    }
  }

  /**
   * Returns public facing methods
   */
  return {
    syncMain: syncMain,
    syncPlaylist: syncPlaylist
  };
})();

export default ShuffleElements;
