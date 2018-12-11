/**
 * Handles the visual state for all of the mute elements.
 *
 * @module visual/MuteElements
 */
let MuteElements = (function() {
  /**
   * Syncs mute for all of the mute buttons. This represents the
   * state of the player if it's muted or not.
   *
   * @access public
   * @param {string} state 	- The muted state of the player.
   */
  function setMuted(state) {
    /*
			Get all of the mute buttons.
		*/
    let muteClasses = document.getElementsByClassName("amplitude-mute");

    /*
			Iterate over all of the mute classes. If the state of the player
			is not-muted then we add the amplitude-not-muted classe and remove
			the amplitude muted class otherwise we do the opposite.
		*/
    for (let i = 0; i < muteClasses.length; i++) {
      if (!state) {
        muteClasses[i].classList.add("amplitude-not-muted");
        muteClasses[i].classList.remove("amplitude-muted");
      } else {
        muteClasses[i].classList.remove("amplitude-not-muted");
        muteClasses[i].classList.add("amplitude-muted");
      }
    }
  }

  return {
    setMuted: setMuted
  };
})();

export default MuteElements;
