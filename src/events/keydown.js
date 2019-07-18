/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Imports the core of AmplitudeJS
 * @module core/Core
 */
import Core from "../core/core.js";

/**
 * Imports the Shuffle Utility
 * @module utilities/Shuffle
 */
import Shuffle from "../utilities/shuffler.js";

/**
 * Imports the Repeater Utility
 * @module utilities/Repeater
 */
import Repeater from "../utilities/repeater.js";

/**
 * Imports the Audio Navigation Utility
 * @module utilities/AudioNavigation
 */
import AudioNavigation from "../utilities/audioNavigation.js";

/**
 * Imports the Repeat Elements Visual Handler
 * @module visual/RepeatElements
 */
import RepeatElements from "../visual/repeatElements.js";

/**
 * Imports the Play Pause Elements Visual Handler
 * @module visual/PlayPauseElements
 */
import PlayPauseElements from "../visual/playPauseElements.js";

/**
 * AmplitudeJS Key Down event handler
 *
 * @module events/KeyDown
 */
let KeyDown = (function() {
  /**
   * When the keydown event is fired, we determine which function should be run
   * based on what was passed in.
   *
   * HANDLER FOR: keydown
   *
   * @access public
   * @prop {object} event The event object being passed in.
   */
  function handle(event) {
    runKeyEvent(event.which);
  }

  /**
   * Runs an event on key down
   *
   * @access public
   * @param {number} key 	- The key code the event is bound to.
   */
  function runKeyEvent(key) {
    /*
			Checks to see if the user bound an event to the code pressed.
		*/
    if (config.bindings[key] != undefined) {
      /*
				Determine which event should be run if bound.
			*/
      switch (config.bindings[key]) {
        /*
					Fires a play pause event.
				*/
        case "play_pause":
          runPlayPauseKeyDownEvent();
          break;

        /*
					Fires a next event.
				*/
        case "next":
          runNextKeyDownEvent();
          break;

        /*
					Fires a previous event.
				*/
        case "prev":
          runPrevKeyDownEvent();
          break;

        /*
					Fires a stop event.
				*/
        case "stop":
          runStopKeyDownEvent();
          break;

        /*
					Fires a shuffle event.
				*/
        case "shuffle":
          runShuffleKeyDownEvent();
          break;

        /*
					Fires a repeat event.
				*/
        case "repeat":
          runRepeatKeyDownEvent();
          break;
      }
    }
  }

  /**
   * Runs the play pause method for key down.
   */
  function runPlayPauseKeyDownEvent() {
    /*
      If the song is paused, we play the song. If the song is playing,
      we pause the song.
    */
    if (config.audio.paused) {
      Core.play();
    } else {
      Core.pause();
    }

    /*
      Now we sync all the elements to match the state of the audio.
      We don't need to do any checks on new songs or changed playlists
      in the global since it's whatever song is playing.
    */
    PlayPauseElements.sync();
  }

  /**
   * Runs the next method for key down.
   */
  function runNextKeyDownEvent() {
    /*
      Check to see if the current state of the player
      is in playlist mode or not playlist mode.
    */
    if (config.active_playlist == "" || config.active_playlist == null) {
      AudioNavigation.setNext();
    } else {
      AudioNavigation.setNextPlaylist(config.active_playlist);
    }
  }

  /**
   * Runs the previous method for key down.
   */
  function runPrevKeyDownEvent() {
    /*
      Check to see if the current playlist has been set
      or null and set the previous song.
    */
    if (config.active_playlist == "" || config.active_playlist == null) {
      AudioNavigation.setPrevious();
    } else {
      AudioNavigation.setPreviousPlaylist(config.active_playlist);
    }
  }

  /**
   * Runs the stop method for key down.
   */
  function runStopKeyDownEvent() {
    /*
      Syncs all of the play pause elements to pause.
    */
    PlayPauseElements.syncToPause();

    /*
      Stops the active song.
    */
    Core.stop();
  }

  /**
   * Runs the shuffle method for key down.
   */
  function runShuffleKeyDownEvent() {
    /*
      Check to see if the current playlist has been set
      or null and set the previous song.
    */
    if (config.active_playlist == "" || config.active_playlist == null) {
      Shuffle.toggleShuffle();
    } else {
      Shuffle.toggleShufflePlaylist(config.active_playlist);
    }
  }

  /**
   * Run the repeat method for key down.
   */
  function runRepeatKeyDownEvent() {
    /*
      Toggles the repeat
    */
    Repeater.setRepeat(!config.repeat);

    /*
      Visually sync repeat
    */
    RepeatElements.syncRepeat();
  }

  /**
   * Returns the public methods for the handler.
   */
  return {
    handle: handle
  };
})();

export default KeyDown;
