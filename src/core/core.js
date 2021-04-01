/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Imports the Checks module.
 * @module utilities/checks
 */
import Checks from "../utilities/checks.js";

/**
 * Imports the Audio Navigation module.
 * @module utilities/audioNavigation
 */
import AudioNavigation from "../utilities/audioNavigation.js";

/**
 * Imports the Play/Pause Visual Elements module.
 * @module visual/playPauseElements
 */
import PlayPauseElements from "../visual/playPauseElements.js";

/**
 * Imports the Meta Data Visual Elements module.
 * @module visual/metaDataElements
 */
import MetaDataElements from "../visual/metaDataElements.js";

/**
 * Imports AmplitudeJS Callback Utility
 * @module utilities/callbacks
 */
import Callbacks from "../utilities/callbacks.js";

/**
 * Imports AmplitudeJS Debug Utility
 * @module utilities/debug
 */
import Debug from "../utilities/debug.js";

/**
 * Import the Visualizations from the FX module.
 * @module fx/visualizations
 */
import Visualizations from "../fx/visualizations.js";

/**
 * Import the Config State module.
 * @module utilities/configState
 */
 import ConfigState from "../utilities/configState.js";

/**
 * Interacts directly with native functions of the Audio element. Logic
 * leading up to these methods are handled by click handlers which call
 * helpers and visual synchronizers. These are the core functions of AmplitudeJS.
 * Every other function that leads to these prepare the information to be
 * acted upon by these functions.
 *
 * @module core/Core
 */
let Core = (function() {
  /**
   * Plays the active song. If the current song is live, it reconnects
   * the stream before playing.
   *
   * Public Accessor: Amplitude.play()
   *
   * @access public
   */
  function play() {
    Visualizations.stop();
    Visualizations.run();

    /*
			If the audio is live we re-conenct the stream.
		*/
    if (config.active_metadata.live) {
      reconnectStream();
    }

    /*
			Mobile remote sources need to be reconnected on play. I think this is
			because mobile browsers are optimized not to load all resources
			for speed reasons. We only do this if mobile and the paused button
			is not clicked. If the pause button was clicked then we don't reconnect
			or the user will lose their place in the stream.
		*/
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) &&
      !config.paused
    ) {
      reconnectStream();
    }

    /*
			Play the song and set the playback rate to the playback
			speed.
    */
    let playPromise = config.audio.play();

    if (playPromise !== undefined) {
      playPromise.then(_ => {}).catch(error => {});
    }
    config.audio.play();
    config.audio.playbackRate = config.playback_speed;
    
    /*
      Sets the state of the player.
    */
    ConfigState.setPlayerState();
  }

  /**
   * Pauses the active song. If it's live, it disconnects the stream.
   *
   * Public Accessor: Amplitude.pause()
   *
   * @access public
   */
  function pause() {
    Visualizations.stop();

    /*
			Pause the active song.
		*/
    config.audio.pause();

    /*
			Flag that pause button was clicked.
		*/
    config.paused = true;
    
    
    /*
			If the song is live, we disconnect the stream so we aren't
			saving it to memory.
		*/
    if (config.active_metadata.live) {
      disconnectStream();
    }
    
    /*
      Sets the state of the player.
    */
    ConfigState.setPlayerState();
  }

  /**
   * Stops the active song by setting the current song time to 0.
   * When the user resumes, it will be from the beginning.
   * If it's a live stream it disconnects.
   *
   * Public Accessor: Amplitude.stop()
   *
   * @access public
   */
  function stop() {
    Visualizations.stop();

    /*
			Set the current time of the song to 0 which will reset the song.
		*/
    if (config.audio.currentTime != 0) {
      config.audio.currentTime = 0;
    }

    /*
			Run pause so the song will stop
		*/
    config.audio.pause();

    /*
			If the song is live, disconnect the stream.
		*/
    if (config.active_metadata.live) {
      disconnectStream();
    }

    /*
      Sets the state of the player.
    */
    ConfigState.setPlayerState();
  
    /*
			Run the stop callback
		*/
    Callbacks.run("stop");
  }

  /**
   * Sets the song volume.
   *
   * Public Accessor: Amplitude.setVolume( volumeLevel )
   *
   * @access public
   * @param {number} volumeLevel - A number between 1 and 100 as a percentage of
   * min to max for a volume level.
   */
  function setVolume(volumeLevel) {
    /*
			If the volume is set to mute somewhere else, we sync the display.
		*/
    if (volumeLevel == 0) {
      config.audio.muted = true;
    } else {
      config.audio.muted = false;
    }

    /*
			Sets the volume in the config so we can reference it later on.
		*/
    config.volume = volumeLevel;

    /*
			Set the volume of the active song.
		*/
    config.audio.volume = volumeLevel / 100;
  }

  /**
   * Sets the song percentage. If it's a live song, we ignore this because
   * we can't skip ahead. This is an issue if you have a playlist with
   * a live source.
   *
   * Public Accessor: Amplitude.setSongLocation( songPercentage )
   *
   * @access public
   * @param {number} songPercentage - A number between 1 and 100 as a percentage of song completion.
   */
  function setSongLocation(songPercentage) {
    /*
			As long as the song is not live, we can set the current time of the
			song to the percentage the user passed in.
		*/
    if (!config.active_metadata.live) {
      config.audio.currentTime = config.audio.duration * (songPercentage / 100);
    }
  }

  /**
   * Skips to a location in a song
   *
   * Public Accessor: Amplitude.skipToLocation( seconds )
   *
   * @access public
   * @param {number} seconds - An integer containing the seconds to skip to
   */
  function skipToLocation(seconds) {
    /*
			When the active song can be played through, we can check to
			see if the seconds will work. We only bind the event handler
			once and remove it once it's fired.
		*/
    config.audio.addEventListener(
      "canplaythrough",
      function() {
        /*
				If the active song duration is greater than or equal to the
				amount of seconds the user wants to skip to and the seconds
				is greater than 0, we skip to the seconds defined.
			*/
        if (config.audio.duration >= seconds && seconds > 0) {
          config.audio.currentTime = seconds;
        } else {
          Debug.writeMessage(
            "Amplitude can't skip to a location greater than the duration of the audio or less than 0"
          );
        }
      },
      { once: true }
    );
  }

  /**
   * Disconnects the live stream
   *
   * Public Accessor: Amplitude.disconnectStream()
   *
   * @access public
   */
  function disconnectStream() {
    config.audio.src = "";
    config.audio.load();
  }

  /**
   * Reconnects the live stream
   *
   * Public Accessor: Amplitude.reconnectStream()
   *
   * @access public\
   */
  function reconnectStream() {
    config.audio.src = config.active_metadata.url;
    config.audio.load();
  }

  /**
   * Sets the playback speed for the song.
   *
   * @param {number} playbackSpeed The speed we want the song to play back at.
   */
  function setPlaybackSpeed(playbackSpeed) {
    /*
			Set the config playback speed.
		*/
    config.playback_speed = playbackSpeed;

    /*
			Set the active song playback rate.
		*/
    config.audio.playbackRate = config.playback_speed;
  }

  /*
		Return publically facing functions
	*/
  return {
    play: play,
    pause: pause,
    stop: stop,
    setVolume: setVolume,
    setSongLocation: setSongLocation,
    skipToLocation: skipToLocation,
    disconnectStream: disconnectStream,
    reconnectStream: reconnectStream,
    setPlaybackSpeed: setPlaybackSpeed
  };
})();

export default Core;
