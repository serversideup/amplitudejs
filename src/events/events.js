/*
	Import the necessary classes and config to use
	with the events.
*/
import config from "../config.js";

/**
 * Imports all of the handler objects used by the events.
 */
import KeyDown from "./keydown.js";
import TimeUpdate from "./timeUpdate.js";
import Ended from "./ended.js";
import Progress from "./progress.js";
import Play from "./play.js";
import Pause from "./pause.js";
import PlayPause from "./playPause.js";
import Stop from "./stop.js";
import Mute from "./mute.js";
import VolumeUp from "./volumeUp.js";
import VolumeDown from "./volumeDown.js";
import SongSlider from "./songSlider.js";
import VolumeSlider from "./volumeSlider.js";
import Next from "./next.js";
import Prev from "./prev.js";
import Repeat from "./repeat.js";
import RepeatSong from "./repeatSong.js";
import PlaybackSpeed from "./playbackSpeed.js";
import Shuffle from "./shuffle.js";
import SkipTo from "./skipTo.js";
import WaveForm from "../fx/waveform.js";

/**
 * Imports the utility classes used by the evnets.
 */
import Debug from "../utilities/debug.js";

/**
 * AmplitudeJS Events Module. Handles all of the events we listen to in
 * AmplitudeJS.
 *
 * @module events/Events
 */
var Events = (function() {
  /**
   * Initializes the handlers for the events listened to by Amplitude
   *
   * @access public
   */
  function initialize() {
    /*
			Write out debug message
		*/
    Debug.writeMessage("Beginning initialization of event handlers..");

    /*
			Sets flag that the screen is moving and not a tap
		*/
    document.addEventListener("touchmove", function() {
      config.is_touch_moving = true;
    });

    /*
			On touch end if it was a touch move event, set moving to
			false
		*/
    document.addEventListener("touchend", function() {
      if (config.is_touch_moving) {
        config.is_touch_moving = false;
      }
    });

    /*
			On time update for the audio element, update visual displays that
			represent the time on either a visualized element or time display.
		*/
    bindTimeUpdate();

    /*
			Binds key down event handlers for matching key codes to functions.
		*/
    bindKeyDownEventHandlers();

    /*
			When the audio element has ended playing, we handle the song
			ending. In a single song or multiple modular song instance,
			this just synchronizes the visuals for time and song time
			visualization, but for a playlist it determines whether
			it should play the next song or not.
		*/
    bindSongEnded();

    /*
			Binds progress event so we can see how much of the song is loaded.
		*/
    bindProgress();

    /*
			Binds 'amplitude-play' event handlers
		*/
    bindPlay();

    /*
			Binds 'amplitude-pause' event handlers.
		*/
    bindPause();

    /*
			Binds 'amplitude-play-pause' event handlers.
		*/
    bindPlayPause();

    /*
			Binds 'amplitude-stop' event handlers.
		*/
    bindStop();

    /*
			Binds 'amplitude-mute' event handlers.
		*/
    bindMute();

    /*
			Binds 'amplitude-volume-up' event handlers
		*/
    bindVolumeUp();

    /*
			Binds 'amplitude-volume-down' event handlers
		*/
    bindVolumeDown();

    /*
			Binds 'amplitude-song-slider' event handlers
		*/
    bindSongSlider();

    /*
			Binds 'amplitude-volume-slider' event handlers.
		*/
    bindVolumeSlider();

    /*
			Binds 'amplitude-next' event handlers.
		*/
    bindNext();

    /*
			Binds 'amplitude-prev' event handlers.
		*/
    bindPrev();

    /*
			Binds 'amplitude-shuffle' event handlers.
		*/
    bindShuffle();

    /*
			Binds 'amplitude-repeat' event handlers.
		*/
    bindRepeat();

    /*
			Binds 'amplitude-repeat-song' event handlers.
		*/
    bindRepeatSong();

    /*
			Binds 'amplitude-playback-speed' event handlers.
		*/
    bindPlaybackSpeed();

    /*
			Binds 'amplitude-skip-to' event handlers.
		*/
    bindSkipTo();

    /*
			Binds `canplaythrough` event to build the waveform.
		*/
    bindCanPlayThrough();
  }

  /**
   * On time update for the audio element, update visual displays that
   * represent the time on either a visualized element or time display.
   *
   * @access private
   */
  function bindTimeUpdate() {
    /*
			Bind for time update
		*/
    config.audio.removeEventListener("timeupdate", TimeUpdate.handle);
    config.audio.addEventListener("timeupdate", TimeUpdate.handle);

    /*
			Bind for duration change
		*/
    config.audio.removeEventListener("durationchange", TimeUpdate.handle);
    config.audio.addEventListener("durationchange", TimeUpdate.handle);
  }

  /**
   * On keydown, we listen to what key got pressed so we can map the key to
   * a function. This allows the user to map pause and play, next, etc. to key
   * presses.
   *
   * @access private
   */
  function bindKeyDownEventHandlers() {
    document.removeEventListener("keydown", KeyDown.handle);
    document.addEventListener("keydown", KeyDown.handle);
  }

  /**
   * When the audio element has ended playing, we handle the song
   * ending. In a single song or multiple modular song instance,
   * this just synchronizes the visuals for time and song time
   * visualization, but for a playlist it determines whether
   * it should play the next song or not.
   *
   * @access private
   */
  function bindSongEnded() {
    config.audio.removeEventListener("ended", Ended.handle);
    config.audio.addEventListener("ended", Ended.handle);
  }

  /**
   * As the audio is loaded, the progress event gets fired. We bind into this
   * to grab the buffered percentage of the song. We can then add more elements
   * to show the buffered amount.
   *
   * @access private
   */
  function bindProgress() {
    config.audio.removeEventListener("progress", Progress.handle);
    config.audio.addEventListener("progress", Progress.handle);
  }

  /**
   * Binds click and touchend events for AmplitudeJS play buttons
   *
   * @access private
   */
  function bindPlay() {
    /*
			Gets all of the elements with the class amplitude-play
		*/
    var play_classes = document.getElementsByClassName("amplitude-play");

    /*
			Iterates over all of the play classes and binds the event interaction
			method to the element. If the browser is mobile, then the event is touchend
			otherwise it is click.
		*/
    for (var i = 0; i < play_classes.length; i++) {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        play_classes[i].removeEventListener("touchend", Play.handle);
        play_classes[i].addEventListener("touchend", Play.handle);
      } else {
        play_classes[i].removeEventListener("click", Play.handle);
        play_classes[i].addEventListener("click", Play.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS pause buttons.
   *
   * @access private
   */
  function bindPause() {
    /*
			Gets all of the elements with the class amplitude-pause
		*/
    var pause_classes = document.getElementsByClassName("amplitude-pause");

    /*
			Iterates over all of the pause classes and binds the event interaction
			method to the element. If the browser is mobile, then the event is touchend
			otherwise it is click.
		*/
    for (var i = 0; i < pause_classes.length; i++) {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        pause_classes[i].removeEventListener("touchend", Pause.handle);
        pause_classes[i].addEventListener("touchend", Pause.handle);
      } else {
        pause_classes[i].removeEventListener("click", Pause.handle);
        pause_classes[i].addEventListener("click", Pause.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS play pause buttons
   *
   * @access private
   */
  function bindPlayPause() {
    /*
			Gets all of the elements with the class amplitude-play-pause
		*/
    var play_pause_classes = document.getElementsByClassName(
      "amplitude-play-pause"
    );

    /*
			Iterates over all of the play/pause classes and binds the event interaction
			method to the element. If the browser is mobile, then the event is touchend
			otherwise it is click.
		*/
    for (var i = 0; i < play_pause_classes.length; i++) {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        play_pause_classes[i].removeEventListener("touchend", PlayPause.handle);
        play_pause_classes[i].addEventListener("touchend", PlayPause.handle);
      } else {
        play_pause_classes[i].removeEventListener("click", PlayPause.handle);
        play_pause_classes[i].addEventListener("click", PlayPause.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS stop buttons
   *
   * @access private
   */
  function bindStop() {
    /*
			Gets all of the elements with the class amplitude-stop
		*/
    var stop_classes = document.getElementsByClassName("amplitude-stop");

    /*
			Iterates over all of the stop classes and binds the event interaction
			method to the element.  If the browser is mobile, then the event is touchend
			otherwise it is click.
		*/
    for (var i = 0; i < stop_classes.length; i++) {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        stop_classes[i].removeEventListener("touchend", Stop.handle);
        stop_classes[i].addEventListener("touchend", Stop.handle);
      } else {
        stop_classes[i].removeEventListener("click", Stop.handle);
        stop_classes[i].addEventListener("click", Stop.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS mute buttons
   *
   * @access private
   */
  function bindMute() {
    /*
			Gets all of the elements with the class amplitue-mute
		*/
    var mute_classes = document.getElementsByClassName("amplitude-mute");

    /*
			Iterates over all of the mute classes and binds the event interaction
			method to the element. If the browser is mobile, then the event is touchend
			otherwise it is click.
		*/
    for (var i = 0; i < mute_classes.length; i++) {
      /*
				WARNING: If iOS, we don't do anything because iOS does not allow the
				volume to be adjusted through anything except the buttons on the side of
				the device.
			*/
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        /*
					Checks for an iOS device and displays an error message if debugging
					is turned on.
				*/
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          Debug.writeMessage(
            "iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4"
          );
        } else {
          mute_classes[i].removeEventListener("touchend", Mute.handle);
          mute_classes[i].addEventListener("touchend", Mute.handle);
        }
      } else {
        mute_classes[i].removeEventListener("click", Mute.handle);
        mute_classes[i].addEventListener("click", Mute.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS Volume Up Buttons
   *
   * @access private
   */
  function bindVolumeUp() {
    /*
			Gets all of the elements with the class amplitude-volume-up
		*/
    var volume_up_classes = document.getElementsByClassName(
      "amplitude-volume-up"
    );

    /*
			Iterates over all of the volume up classes and binds the event interaction
			methods to the element. If the browser is mobile, then the event is touchend
			otherwise it is click.
		*/
    for (var i = 0; i < volume_up_classes.length; i++) {
      /*
				WARNING: If iOS, we don't do anything because iOS does not allow the
				volume to be adjusted through anything except the buttons on the side of
				the device.
			*/
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        /*
					Checks for an iOS device and displays an error message if debugging
					is turned on.
				*/
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          Debug.writeMessage(
            "iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4"
          );
        } else {
          volume_up_classes[i].removeEventListener("touchend", VolumeUp.handle);
          volume_up_classes[i].addEventListener("touchend", VolumeUp.handle);
        }
      } else {
        volume_up_classes[i].removeEventListener("click", VolumeUp.handle);
        volume_up_classes[i].addEventListener("click", VolumeUp.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS Volume Down Buttons
   *
   * @access private
   */
  function bindVolumeDown() {
    /*
			Gets all of the elements with the class amplitude-volume-down
		*/
    var volume_down_classes = document.getElementsByClassName(
      "amplitude-volume-down"
    );

    /*
			Iterates over all of the volume down classes and binds the event interaction
			methods to the element. If the browser is mobile, then the event is touchend
			otherwise it is click.
		*/
    for (var i = 0; i < volume_down_classes.length; i++) {
      /*
				WARNING: If iOS, we don't do anything because iOS does not allow the
				volume to be adjusted through anything except the buttons on the side of
				the device.
			*/
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        /*
					Checks for an iOS device and displays an error message if debugging
					is turned on.
				*/
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          Debug.writeMessage(
            "iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4"
          );
        } else {
          volume_down_classes[i].removeEventListener(
            "touchend",
            VolumeDown.handle
          );
          volume_down_classes[i].addEventListener(
            "touchend",
            VolumeDown.handle
          );
        }
      } else {
        volume_down_classes[i].removeEventListener("click", VolumeDown.handle);
        volume_down_classes[i].addEventListener("click", VolumeDown.handle);
      }
    }
  }

  /**
   * Binds change and input events for AmplitudeJS Song Slider Inputs
   *
   * @access private
   */
  function bindSongSlider() {
    /*
			Gets browser so if we need to apply overrides, like we usually
			have to do for anything cool in IE, we can do that.
		*/
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    /*
			Gets all of the elements with the class amplitude-song-slider
		*/
    var song_sliders = document.getElementsByClassName("amplitude-song-slider");

    /*
			Iterates over all of the song slider classes and binds the event interaction
			methods to the element. If the browser is IE we listen to the change event
			where if it is anything else, it's the input method.
		*/
    for (var i = 0; i < song_sliders.length; i++) {
      if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        song_sliders[i].removeEventListener("change", SongSlider.handle);
        song_sliders[i].addEventListener("change", SongSlider.handle);
      } else {
        song_sliders[i].removeEventListener("input", SongSlider.handle);
        song_sliders[i].addEventListener("input", SongSlider.handle);
      }
    }
  }

  /**
   * Binds change and input events fro AmplitudeJS Volume Slider inputs
   *
   * @access private
   */
  function bindVolumeSlider() {
    /*
			Gets browser so if we need to apply overrides, like we usually
			have to do for anything cool in IE, we can do that.
		*/
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    /*
			Gets all of the elements with the class amplitude-volume-slider
        */
    var volume_sliders = document.getElementsByClassName(
      "amplitude-volume-slider"
    );

    /*
			Iterates over all of the volume slider classes and binds the event interaction
			methods to the element. If the browser is IE we listen to the change event
			where if it is anything else, it's the input method.
		*/
    for (var i = 0; i < volume_sliders.length; i++) {
      /*
				WARNING: If iOS, we don't do anything because iOS does not allow the
				volume to be adjusted through anything except the buttons on the side of
				the device.
			*/
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        Debug.writeMessage(
          "iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4"
        );
      } else {
        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
          volume_sliders[i].removeEventListener("change", VolumeSlider.handle);
          volume_sliders[i].addEventListener("change", VolumeSlider.handle);
        } else {
          volume_sliders[i].removeEventListener("input", VolumeSlider.handle);
          volume_sliders[i].addEventListener("input", VolumeSlider.handle);
        }
      }
    }
  }

  /**
   * Binds click and touchend events fro AmplitudeJS Next buttons
   *
   * @access private
   */
  function bindNext() {
    /*
			Gets all of the elements with the class amplitude-next
        */
    var next_classes = document.getElementsByClassName("amplitude-next");

    /*
			Iterates over all of the next classes and binds the event interaction
			methods to the element. If the browser is mobile, then the event is touchend
			otherwise it is click.
		*/
    for (var i = 0; i < next_classes.length; i++) {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        next_classes[i].removeEventListener("touchend", Next.handle);
        next_classes[i].addEventListener("touchend", Next.handle);
      } else {
        next_classes[i].removeEventListener("click", Next.handle);
        next_classes[i].addEventListener("click", Next.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS prev buttons.
   *
   * @access private
   */
  function bindPrev() {
    /*
			Gets all of the elements with the class amplitude-prev
		*/
    var prev_classes = document.getElementsByClassName("amplitude-prev");

    /*
			Iterates over all of the prev classes and binds the event interaction
			methods to the element. If the browser is mobile, then the event is touchend
			otherwise it is click.
		*/
    for (var i = 0; i < prev_classes.length; i++) {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        prev_classes[i].removeEventListener("touchend", Prev.handle);
        prev_classes[i].addEventListener("touchend", Prev.handle);
      } else {
        prev_classes[i].removeEventListener("click", Prev.handle);
        prev_classes[i].addEventListener("click", Prev.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS shuffle buttons.
   *
   * @access private
   */
  function bindShuffle() {
    /*
			Gets all of the elements with the class amplitude-shuffle
		*/
    var shuffle_classes = document.getElementsByClassName("amplitude-shuffle");

    /*
			Iterates over all of the shuffle classes and binds the event interaction
			methods to the element. If the browser is mobile, then the event is touchend
			otherwise it is click.
		*/
    for (var i = 0; i < shuffle_classes.length; i++) {
      /*
				Since we are re-binding everything we remove any classes that signify
				a state of the shuffle control.
			*/
      shuffle_classes[i].classList.remove("amplitude-shuffle-on");
      shuffle_classes[i].classList.add("amplitude-shuffle-off");

      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        shuffle_classes[i].removeEventListener("touchend", Shuffle.handle);
        shuffle_classes[i].addEventListener("touchend", Shuffle.handle);
      } else {
        shuffle_classes[i].removeEventListener("click", Shuffle.handle);
        shuffle_classes[i].addEventListener("click", Shuffle.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS repeat buttons.
   *
   * @access private
   */
  function bindRepeat() {
    /*
			Gets all of the elements with the class amplitude-repeat
		*/
    var repeat_classes = document.getElementsByClassName("amplitude-repeat");

    /*
			Iterates over all of the repeat classes and binds the event interaction
			methods to the element. If the browser is mobile, then the event is touchend
			otherwise it is click.
		*/
    for (var i = 0; i < repeat_classes.length; i++) {
      /*
				Since we are re-binding everything we remove any classes that signify
				a state of the repeat control.
			*/
      repeat_classes[i].classList.remove("amplitude-repeat-on");
      repeat_classes[i].classList.add("amplitude-repeat-off");

      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        repeat_classes[i].removeEventListener("touchend", Repeat.handle);
        repeat_classes[i].addEventListener("touchend", Repeat.handle);
      } else {
        repeat_classes[i].removeEventListener("click", Repeat.handle);
        repeat_classes[i].addEventListener("click", Repeat.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS repeat song buttons.
   *
   * @access private
   */
  function bindRepeatSong() {
    /*
			Gets all of the elements with the class amplitude-repeat-song
		*/
    var repeat_song_classes = document.getElementsByClassName(
      "amplitude-repeat-song"
    );

    /*
			Iterates over all of the repeat song classes and binds the event interaction
			methods to the element. If the browser is mobile, then the event is touchend
			otherwise it is click.
		*/
    for (var i = 0; i < repeat_song_classes.length; i++) {
      /*
				Since we are re-binding everything we remove any classes that signify
				a state of the repeat control.
			*/
      repeat_song_classes[i].classList.remove("amplitude-repeat-on");
      repeat_song_classes[i].classList.add("amplitude-repeat-off");

      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        repeat_song_classes[i].removeEventListener(
          "touchend",
          RepeatSong.handle
        );
        repeat_song_classes[i].addEventListener("touchend", RepeatSong.handle);
      } else {
        repeat_song_classes[i].removeEventListener("click", RepeatSong.handle);
        repeat_song_classes[i].addEventListener("click", RepeatSong.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS playback speed buttons
   *
   * @access private
   */
  function bindPlaybackSpeed() {
    /*
			Gets all of the elements with the class amplitude-playback-speed
		*/
    var playback_speed_classes = document.getElementsByClassName(
      "amplitude-playback-speed"
    );

    /*
			Iterates over all of the playback speed classes and binds the event interaction
			methods to the element. If the browser is mobile, then the event is touchend
			otherwise it is click.
		*/
    for (var i = 0; i < playback_speed_classes.length; i++) {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        playback_speed_classes[i].removeEventListener(
          "touchend",
          PlaybackSpeed.handle
        );
        playback_speed_classes[i].addEventListener(
          "touchend",
          PlaybackSpeed.handle
        );
      } else {
        playback_speed_classes[i].removeEventListener(
          "click",
          PlaybackSpeed.handle
        );
        playback_speed_classes[i].addEventListener(
          "click",
          PlaybackSpeed.handle
        );
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS skip to buttons.
   *
   * @access private
   */
  function bindSkipTo() {
    /*
			Gets all of the skip to elements with the class 'amplitude-skip-to'
		*/
    var skipToClasses = document.getElementsByClassName("amplitude-skip-to");

    /*
			Iterates over all of the skip to classes and binds the event interaction
			methods to the element. If the browser is mobile, then the event is touchend
			otherwise it's a click.
		*/
    for (var i = 0; i < skipToClasses.length; i++) {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        skipToClasses[i].removeEventListener("touchend", SkipTo.handle);
        skipToClasses[i].addEventListener("touchend", SkipTo.handle);
      } else {
        skipToClasses[i].removeEventListener("click", SkipTo.handle);
        skipToClasses[i].addEventListener("click", SkipTo.handle);
      }
    }
  }

  /**
   * Binds can play through to a song.
   *
   * @access private
   */
  function bindCanPlayThrough() {
    if (WaveForm.determineIfUsingWaveforms()) {
      config.audio.removeEventListener("canplaythrough", WaveForm.build);
      config.audio.addEventListener("canplaythrough", WaveForm.build);
    }
  }

  /*
		Returns the public facing functions.
	*/
  return {
    initialize: initialize
  };
})();

export default Events;
