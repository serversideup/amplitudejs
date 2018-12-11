/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Handles all of the visual syncing to the state of the config for the repeat
 * elements.
 *
 * @module visual/RepeatElements
 */
let RepeatElements = (function() {
  /**
   * Syncs repeat for all of the repeat buttons. Users
   * can apply styles to the 'amplitude-repeat-on' and
   * 'amplitude-repeat-off' classes. They represent the state
   * of the player.
   */
  function syncRepeat() {
    /*
			Gets all of the repeat classes
		*/
    let repeatClasses = document.getElementsByClassName("amplitude-repeat");

    /*
			Iterate over all of the repeat classes. If repeat is on,
			then add the 'amplitude-repeat-on' class and remove the
			'amplitude-repeat-off' class. If it's off, then do the
			opposite.
		*/
    for (let i = 0; i < repeatClasses.length; i++) {
      if (config.repeat) {
        repeatClasses[i].classList.add("amplitude-repeat-on");
        repeatClasses[i].classList.remove("amplitude-repeat-off");
      } else {
        repeatClasses[i].classList.remove("amplitude-repeat-on");
        repeatClasses[i].classList.add("amplitude-repeat-off");
      }
    }
  }

  /**
   * Syncs repeat for all of the playlist repeat buttons. Users
   * can apply styles to the `amplitude-repeat-on` and `amplitude-repeat-off`
   * classes. They repreent the state of the playlist in the player.
   */
  function syncRepeatPlaylist(playlist) {
    /*
			 Gets all of the repeat buttons.
		 */
    let repeatButtons = document.getElementsByClassName("amplitude-repeat");

    /*
			 Iterate over all of the repeat buttons
		 */
    for (let i = 0; i < repeatButtons.length; i++) {
      /*
				 Ensure that the repeat button belongs to matches the
				 playlist we are syncing the state for.
			 */
      if (
        repeatButtons[i].getAttribute("data-amplitude-playlist") == playlist
      ) {
        /*
					 If the state of the playlist is shuffled on, true, then
					 we add the 'amplitude-repeat-on' class and remove the
					 'amplitude-repeat-off' class. If the player is not shuffled
					 then we do the opposite.
				 */
        if (config.playlists[playlist].repeat) {
          repeatButtons[i].classList.add("amplitude-repeat-on");
          repeatButtons[i].classList.remove("amplitude-repeat-off");
        } else {
          repeatButtons[i].classList.add("amplitude-repeat-off");
          repeatButtons[i].classList.remove("amplitude-repeat-on");
        }
      }
    }
  }

  /**
   * Syncs repeat for all of the repeat song buttons. Users
   * can apply styles to the 'amplitude-repeat-song-on' and
   * 'amplitude-repeat-song-off' classes. They represent the state
   * of the player.
   */
  function syncRepeatSong() {
    /*
			Gets all of the repeat song classes
		*/
    let repeatSongClasses = document.getElementsByClassName(
      "amplitude-repeat-song"
    );

    /*
			Iterate over all of the repeat song classes. If repeat is on,
			then add the 'amplitude-repeat-song-on' class and remove the
			'amplitude-repeat-song-off' class. If it's off, then do the
			opposite.
		*/
    for (let i = 0; i < repeatSongClasses.length; i++) {
      if (config.repeat_song) {
        repeatSongClasses[i].classList.add("amplitude-repeat-song-on");
        repeatSongClasses[i].classList.remove("amplitude-repeat-song-off");
      } else {
        repeatSongClasses[i].classList.remove("amplitude-repeat-song-on");
        repeatSongClasses[i].classList.add("amplitude-repeat-song-off");
      }
    }
  }

  /*
    Returns the publically available methods.
  */
  return {
    syncRepeat: syncRepeat,
    syncRepeatPlaylist: syncRepeatPlaylist,
    syncRepeatSong: syncRepeatSong
  };
})();

export default RepeatElements;
