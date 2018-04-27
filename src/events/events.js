/*
	Import the necessary classes and config to use
	with the events.
*/
import config from '../config.js';
import AmplitudeHelpers from '../core/helpers.js';
import AmplitudeHandlers from './handlers.js';

/*
|----------------------------------------------------------------------------------------------------
| EVENTS METHODS
|----------------------------------------------------------------------------------------------------
| These methods are called when we need to bind events to certain elements.
|
| METHODS:
| 	initializeEvents()
|	bindPlay()
|	bindPause()
|	bindPlayPause()
|	bindStop()
|	bindMute()
|	bindVolumeUp()
|	bindVolumeDown()
|	bindSongSlider()
|	bindVolumeSlider()
|	bindNext()
|	bindPrev()
|	bindShuffle()
|	bindRepeat()
|	bindPlaybackSpeed()
|	bindSkipTo()
|      bindProgress()
*/
var AmplitudeEvents = (function () {
	/*--------------------------------------------------------------------------
		Initializes the handlers for the events listened to by Amplitude
	--------------------------------------------------------------------------*/
	function initializeEvents(){
		/*
			Write out debug message
		*/
		AmplitudeHelpers.writeDebugMessage( 'Beginning initialization of event handlers..' );

		/*
			Sets flag that the screen is moving and not a tap
		*/
		document.addEventListener('touchmove', function(){
			config.is_touch_moving = true;
		});

		/*
			On touch end if it was a touch move event, set moving to
			false
		*/
		document.addEventListener('touchend', function(){
			if( config.is_touch_moving ){
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
			Binds 'amplitude-playback-speed' event handlers.
		*/
		bindPlaybackSpeed();

		/*
			Binds 'amplitude-skip-to' event handlers.
		*/
		bindSkipTo();
	}

	/*--------------------------------------------------------------------------
		On time update for the audio element, update visual displays that
			represent the time on either a visualized element or time display.
	--------------------------------------------------------------------------*/
	function bindTimeUpdate(){
		config.active_song.removeEventListener( 'timeupdate', AmplitudeHandlers.updateTime );
		config.active_song.addEventListener( 'timeupdate', AmplitudeHandlers.updateTime );

    // also bind change of duratuion
		config.active_song.removeEventListener( 'durationchange', AmplitudeHandlers.updateTime );
		config.active_song.addEventListener( 'durationchange', AmplitudeHandlers.updateTime );
	}

	/*--------------------------------------------------------------------------
		On keydown, we listen to what key got pressed so we can map the key to
		a function. This allows the user to map pause and play, next, etc. to key
		presses.
	--------------------------------------------------------------------------*/
	function bindKeyDownEventHandlers(){
		document.removeEventListener("keydown", AmplitudeHelpers.keydown );
		document.addEventListener("keydown", AmplitudeHandlers.keydown );
	}

	/*--------------------------------------------------------------------------
		When the audio element has ended playing, we handle the song
		ending. In a single song or multiple modular song instance,
		this just synchronizes the visuals for time and song time
		visualization, but for a playlist it determines whether
		it should play the next song or not.
	--------------------------------------------------------------------------*/
	function bindSongEnded(){
		config.active_song.removeEventListener( 'ended', AmplitudeHandlers.songEnded );
		config.active_song.addEventListener( 'ended', AmplitudeHandlers.songEnded );
	}

	/*--------------------------------------------------------------------------
		As the audio is loaded, the progress event gets fired. We bind into this
		to grab the buffered percentage of the song. We can then add more elements
		to show the buffered amount.
	--------------------------------------------------------------------------*/
	function bindProgress(){
		config.active_song.removeEventListener( 'progress', AmplitudeHandlers.progess );
		config.active_song.addEventListener( 'progress', AmplitudeHandlers.progress );
	}

	/*--------------------------------------------------------------------------
		BINDS: class="amplitude-play"

		Binds click and touchend events for amplitude play buttons.
	--------------------------------------------------------------------------*/
	function bindPlay(){
		/*
			Gets all of the elements with the class amplitude-play
		*/
		var play_classes = document.getElementsByClassName("amplitude-play");

		/*
			Iterates over all of the play classes and binds the event interaction
			method to the element. If the browser is mobile, then the event is touchend
			otherwise it is click.
		*/
		for( var i = 0; i < play_classes.length; i++ ){
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent ) ) {
				play_classes[i].removeEventListener('touchend', AmplitudeHandlers.play );
				play_classes[i].addEventListener('touchend', AmplitudeHandlers.play );
			}else{
				play_classes[i].removeEventListener('click', AmplitudeHandlers.play );
				play_classes[i].addEventListener('click', AmplitudeHandlers.play );
			}
		}
	}

	/*--------------------------------------------------------------------------
		BINDS: class="amplitude-pause"

		Binds click and touchend events for amplitude pause buttons.
	--------------------------------------------------------------------------*/
	function bindPause(){
		/*
			Gets all of the elements with the class amplitude-pause
		*/
		var pause_classes = document.getElementsByClassName("amplitude-pause");

		/*
			Iterates over all of the pause classes and binds the event interaction
			method to the element. If the browser is mobile, then the event is touchend
			otherwise it is click.
		*/
		for( var i = 0; i < pause_classes.length; i++ ){
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				pause_classes[i].removeEventListener('touchend', AmplitudeHandlers.pause );
				pause_classes[i].addEventListener('touchend', AmplitudeHandlers.pause );
			}else{
				pause_classes[i].removeEventListener('click', AmplitudeHandlers.pause );
				pause_classes[i].addEventListener('click', AmplitudeHandlers.pause );
			}
		}
	}

	/*--------------------------------------------------------------------------
		BINDS: class="amplitude-play-pause"

		Binds click and touchend events for amplitude play pause buttons.
	--------------------------------------------------------------------------*/
	function bindPlayPause(){
		/*
			Gets all of the elements with the class amplitude-play-pause
		*/
		var play_pause_classes = document.getElementsByClassName("amplitude-play-pause");

		/*
			Iterates over all of the play/pause classes and binds the event interaction
			method to the element. If the browser is mobile, then the event is touchend
			otherwise it is click.
		*/
		for( var i = 0; i < play_pause_classes.length; i++ ){
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				play_pause_classes[i].removeEventListener('touchend', AmplitudeHandlers.playPause );
				play_pause_classes[i].addEventListener('touchend', AmplitudeHandlers.playPause );
			}else{
				play_pause_classes[i].removeEventListener('click', AmplitudeHandlers.playPause );
				play_pause_classes[i].addEventListener('click', AmplitudeHandlers.playPause );
			}
		}
	}

	/*--------------------------------------------------------------------------
		BINDS: class="amplitude-stop"

		Binds click and touchend events for amplitude stop buttons
	--------------------------------------------------------------------------*/
	function bindStop(){
		/*
			Gets all of the elements with the class amplitude-stop
		*/
		var stop_classes = document.getElementsByClassName("amplitude-stop");

		/*
			Iterates over all of the stop classes and binds the event interaction
			method to the element.  If the browser is mobile, then the event is touchend
			otherwise it is click.
		*/
		for( var i = 0; i < stop_classes.length; i++ ){
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				stop_classes[i].removeEventListener('touchend', AmplitudeHandlers.stop );
				stop_classes[i].addEventListener('touchend', AmplitudeHandlers.stop );
			}else{
				stop_classes[i].removeEventListener('click', AmplitudeHandlers.stop );
				stop_classes[i].addEventListener('click', AmplitudeHandlers.stop );
			}
		}
	}

	/*--------------------------------------------------------------------------
		BINDS: class="amplitude-mute"

		Binds click and touchend events for amplitude mute buttons
	--------------------------------------------------------------------------*/
	function bindMute(){
		/*
			Gets all of the elements with the class amplitue-mute
		*/
		var mute_classes = document.getElementsByClassName("amplitude-mute");

		/*
			Iterates over all of the mute classes and binds the event interaction
			method to the element. If the browser is mobile, then the event is touchend
			otherwise it is click.
		*/
		for( var i = 0; i < mute_classes.length; i++ ){
			/*
				WARNING: If iOS, we don't do anything because iOS does not allow the
				volume to be adjusted through anything except the buttons on the side of
				the device.
			*/
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				/*
					Checks for an iOS device and displays an error message if debugging
					is turned on.
				*/
				if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
					AmplitudeHelpers.writeDebugMessage( 'iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4' );
				}else{
					mute_classes[i].removeEventListener('touchend', AmplitudeHandlers.mute );
					mute_classes[i].addEventListener('touchend', AmplitudeHandlers.mute );
				}
			}else{
				mute_classes[i].removeEventListener('click', AmplitudeHandlers.mute );
				mute_classes[i].addEventListener('click', AmplitudeHandlers.mute );
			}
		}
	}

	/*--------------------------------------------------------------------------
		BINDS: class="amplitude-volume-up"

		Binds click and touchend events for amplitude volume up buttons
	--------------------------------------------------------------------------*/
	function bindVolumeUp(){
		/*
			Gets all of the elements with the class amplitude-volume-up
		*/
		var volume_up_classes = document.getElementsByClassName("amplitude-volume-up");

		/*
			Iterates over all of the volume up classes and binds the event interaction
			methods to the element. If the browser is mobile, then the event is touchend
			otherwise it is click.
		*/
		for( var i = 0; i < volume_up_classes.length; i++ ){
			/*
				WARNING: If iOS, we don't do anything because iOS does not allow the
				volume to be adjusted through anything except the buttons on the side of
				the device.
			*/
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				/*
					Checks for an iOS device and displays an error message if debugging
					is turned on.
				*/
				if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
					AmplitudeHelpers.writeDebugMessage( 'iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4' );
				}else{
					volume_up_classes[i].removeEventListener('touchend', AmplitudeHandlers.volumeUp );
					volume_up_classes[i].addEventListener('touchend', AmplitudeHandlers.volumeUp );
				}
			}else{
				volume_up_classes[i].removeEventListener('click', AmplitudeHandlers.volumeUp );
				volume_up_classes[i].addEventListener('click', AmplitudeHandlers.volumeUp );
			}
		}
	}

	/*--------------------------------------------------------------------------
		BINDS: class="amplitude-volume-down"

		Binds click and touchend events for amplitude volume down buttons
	--------------------------------------------------------------------------*/
	function bindVolumeDown(){
		/*
			Gets all of the elements with the class amplitude-volume-down
		*/
		var volume_down_classes = document.getElementsByClassName("amplitude-volume-down");

		/*
			Iterates over all of the volume down classes and binds the event interaction
			methods to the element. If the browser is mobile, then the event is touchend
			otherwise it is click.
		*/
		for( var i = 0; i < volume_down_classes.length; i++ ){
			/*
				WARNING: If iOS, we don't do anything because iOS does not allow the
				volume to be adjusted through anything except the buttons on the side of
				the device.
			*/
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				/*
					Checks for an iOS device and displays an error message if debugging
					is turned on.
				*/
				if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
					AmplitudeHelpers.writeDebugMessage( 'iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4' );
				}else{
					volume_down_classes[i].removeEventListener('touchend', AmplitudeHandlers.volumeDown );
					volume_down_classes[i].addEventListener('touchend', AmplitudeHandlers.volumeDown );
				}
			}else{
				volume_down_classes[i].removeEventListener('click', AmplitudeHandlers.volumeDown );
				volume_down_classes[i].addEventListener('click', AmplitudeHandlers.volumeDown );
			}
		}
	}

	/*--------------------------------------------------------------------------
		BINDS: class="amplitude-song-slider"

		Binds change and input events for amplitude song slider inputs
	--------------------------------------------------------------------------*/
	function bindSongSlider(){
		/*
			Gets browser so if we need to apply overrides, like we usually
			have to do for anything cool in IE, we can do that.
		*/
		var ua 		= window.navigator.userAgent;
        var msie 	= ua.indexOf("MSIE ");

		/*
			Gets all of the elements with the class amplitude-song-slider
		*/
		var song_sliders = document.getElementsByClassName("amplitude-song-slider");

		/*
			Iterates over all of the song slider classes and binds the event interaction
			methods to the element. If the browser is IE we listen to the change event
			where if it is anything else, it's the input method.
		*/
		for( var i = 0; i < song_sliders.length; i++ ){
			if ( msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) ){
				song_sliders[i].removeEventListener('change', AmplitudeHandlers.songSlider );
				song_sliders[i].addEventListener('change', AmplitudeHandlers.songSlider );
			}else{
				song_sliders[i].removeEventListener('input', AmplitudeHandlers.songSlider );
				song_sliders[i].addEventListener('input', AmplitudeHandlers.songSlider );
			}
		}
	}

	/*--------------------------------------------------------------------------
		BINDS: class="amplitude-volume-slider"

		Binds change and input events for amplitude volume slider inputs
	--------------------------------------------------------------------------*/
	function bindVolumeSlider(){
		/*
			Gets browser so if we need to apply overrides, like we usually
			have to do for anything cool in IE, we can do that.
		*/
		var ua 		= window.navigator.userAgent;
        var msie 	= ua.indexOf("MSIE ");

        /*
			Gets all of the elements with the class amplitude-volume-slider
        */
		var volume_sliders = document.getElementsByClassName("amplitude-volume-slider");

		/*
			Iterates over all of the volume slider classes and binds the event interaction
			methods to the element. If the browser is IE we listen to the change event
			where if it is anything else, it's the input method.
		*/
		for( var i = 0; i < volume_sliders.length; i++ ){
			/*
				WARNING: If iOS, we don't do anything because iOS does not allow the
				volume to be adjusted through anything except the buttons on the side of
				the device.
			*/
			if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
				AmplitudeHelpers.writeDebugMessage( 'iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4' );
			}else{
				if ( msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) ){
					volume_sliders[i].removeEventListener('change', AmplitudeHandlers.volumeSlider );
					volume_sliders[i].addEventListener('change', AmplitudeHandlers.volumeSlider );
				}else{
					volume_sliders[i].removeEventListener('input', AmplitudeHandlers.volumeSlider );
					volume_sliders[i].addEventListener('input', AmplitudeHandlers.volumeSlider );
				}
			}
		}
	}

	/*--------------------------------------------------------------------------
		BINDS: class="amplitude-next"

		Binds click and touchend events for amplitude next buttons.
	--------------------------------------------------------------------------*/
	function bindNext(){
		/*
			Gets all of the elements with the class amplitude-next
        */
		var next_classes = document.getElementsByClassName("amplitude-next");

		/*
			Iterates over all of the next classes and binds the event interaction
			methods to the element. If the browser is mobile, then the event is touchend
			otherwise it is click.
		*/
		for( var i = 0; i < next_classes.length; i++ ){
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				next_classes[i].removeEventListener('touchend', AmplitudeHandlers.next );
				next_classes[i].addEventListener('touchend', AmplitudeHandlers.next );
			}else{
				next_classes[i].removeEventListener('click', AmplitudeHandlers.next );
				next_classes[i].addEventListener('click', AmplitudeHandlers.next );
			}
		}
	}

	/*--------------------------------------------------------------------------
		BINDS: class="amplitude-prev"

		Binds click and touchend events for amplitude prev buttons.
	--------------------------------------------------------------------------*/
	function bindPrev(){
		/*
			Gets all of the elements with the class amplitude-prev
		*/
		var prev_classes = document.getElementsByClassName("amplitude-prev");

		/*
			Iterates over all of the prev classes and binds the event interaction
			methods to the element. If the browser is mobile, then the event is touchend
			otherwise it is click.
		*/
		for( var i = 0; i < prev_classes.length; i++ ){
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				prev_classes[i].removeEventListener('touchend', AmplitudeHandlers.prev );
				prev_classes[i].addEventListener('touchend', AmplitudeHandlers.prev );
			}else{
				prev_classes[i].removeEventListener('click', AmplitudeHandlers.prev );
				prev_classes[i].addEventListener('click', AmplitudeHandlers.prev );
			}
		}
	}

	/*--------------------------------------------------------------------------
		BINDS: class="amplitude-shuffle"

		Binds click and touchend events for amplitude shuffle buttons.
	--------------------------------------------------------------------------*/
	function bindShuffle(){
		/*
			Gets all of the elements with the class amplitude-shuffle
		*/
		var shuffle_classes = document.getElementsByClassName("amplitude-shuffle");

		/*
			Iterates over all of the shuffle classes and binds the event interaction
			methods to the element. If the browser is mobile, then the event is touchend
			otherwise it is click.
		*/
		for( var i = 0; i < shuffle_classes.length; i++ ){
			/*
				Since we are re-binding everything we remove any classes that signify
				a state of the shuffle control.
			*/
			shuffle_classes[i].classList.remove('amplitude-shuffle-on');
			shuffle_classes[i].classList.add('amplitude-shuffle-off');

			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				shuffle_classes[i].removeEventListener('touchend', AmplitudeHandlers.shuffle );
				shuffle_classes[i].addEventListener('touchend', AmplitudeHandlers.shuffle );
			}else{
				shuffle_classes[i].removeEventListener('click', AmplitudeHandlers.shuffle );
				shuffle_classes[i].addEventListener('click', AmplitudeHandlers.shuffle );
			}
		}
	}

	/*--------------------------------------------------------------------------
		BINDS: class="amplitude-repeat"

		Binds click and touchend events for amplitude repeat buttons.
	--------------------------------------------------------------------------*/
	function bindRepeat(){
		/*
			Gets all of the elements with the class amplitude-repeat
		*/
		var repeat_classes = document.getElementsByClassName("amplitude-repeat");

		/*
			Iterates over all of the repeat classes and binds the event interaction
			methods to the element. If the browser is mobile, then the event is touchend
			otherwise it is click.
		*/
		for( var i = 0; i < repeat_classes.length; i++ ){
			/*
				Since we are re-binding everything we remove any classes that signify
				a state of the repeat control.
			*/
			repeat_classes[i].classList.remove('amplitude-repeat-on');
			repeat_classes[i].classList.add('amplitude-repeat-off');

			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				repeat_classes[i].removeEventListener('touchend', AmplitudeHandlers.repeat );
				repeat_classes[i].addEventListener('touchend', AmplitudeHandlers.repeat );
			}else{
				repeat_classes[i].removeEventListener('click', AmplitudeHandlers.repeat );
				repeat_classes[i].addEventListener('click', AmplitudeHandlers.repeat );
			}
		}
	}

	/*--------------------------------------------------------------------------
		BINDS: class="amplitude-playback-speed"

		Binds click and touchend events for amplitude playback speed buttons.
	--------------------------------------------------------------------------*/
	function bindPlaybackSpeed(){
		/*
			Gets all of the elements with the class amplitude-playback-speed
		*/
		var playback_speed_classes = document.getElementsByClassName("amplitude-playback-speed");

		/*
			Iterates over all of the playback speed classes and binds the event interaction
			methods to the element. If the browser is mobile, then the event is touchend
			otherwise it is click.
		*/
		for( var i = 0; i < playback_speed_classes.length; i++ ){
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				playback_speed_classes[i].removeEventListener('touchend', AmplitudeHandlers.playbackSpeed );
				playback_speed_classes[i].addEventListener('touchend', AmplitudeHandlers.playbackSpeed );
			}else{
				playback_speed_classes[i].removeEventListener('click', AmplitudeHandlers.playbackSpeed );
				playback_speed_classes[i].addEventListener('click', AmplitudeHandlers.playbackSpeed );
			}
		}
	}

	/*--------------------------------------------------------------------------
		BINDS: class="amplitude-skip-to"

		Binds click and touchend events for amplitude skip to buttons.
	--------------------------------------------------------------------------*/
	function bindSkipTo(){
		/*
			Gets all of the skip to elements with the class 'amplitude-skip-to'
		*/
		var skipToClasses = document.getElementsByClassName("amplitude-skip-to");

		/*
			Iterates over all of the skip to classes and binds the event interaction
			methods to the element. If the browser is mobile, then the event is touchend
			otherwise it's a click.
		*/
		for( var i = 0; i < skipToClasses.length; i++ ){
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				skipToClasses[i].removeEventListener('touchend', AmplitudeHandlers.skipTo );
				skipToClasses[i].addEventListener('touchend', AmplitudeHandlers.skipTo );
			}else{
				skipToClasses[i].removeEventListener('click', AmplitudeHandlers.skipTo );
				skipToClasses[i].addEventListener('click', AmplitudeHandlers.skipTo );
			}
		}
	}

	return {
		initializeEvents: initializeEvents
	}
})();

export default AmplitudeEvents
