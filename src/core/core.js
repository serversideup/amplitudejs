import config from '../config.js';
import AmplitudeHelpers from './helpers.js';
import AmplitudeVisualSync from '../visual/visual.js';

/*
|----------------------------------------------------------------------------------------------------
| CORE FUNCTIONAL METHODS
|----------------------------------------------------------------------------------------------------
| Interacts directly with native functions of the Audio element. Logic
| leading up to these methods are handled by click handlers which call
| helpers and visual synchronizers. These are the core functions of AmplitudeJS.
| Every other function that leads to these prepare the information to be 
| acted upon by these functions.
|
| METHODS
|	play()
|	pause()
|	stop()
|	setVolume( volumeLevel )
|	setSongLocation( songPercentage )
|	disconnectStream()
|	reconnectStream()
|	playNow()
| 	setPlaybackSpeed()
*/
var AmplitudeCore = (function() {
	/*--------------------------------------------------------------------------
		Plays the active song. If the current song is live, it reconnects
		the stream before playing.
	--------------------------------------------------------------------------*/
	function play(){
		/*
			Run the before play callback
		*/
		AmplitudeHelpers.runCallback('before_play');

		/*
			If the audio is live we re-conenct the stream.
		*/
		if( config.active_metadata.live ){
			reconnectStream();
		}

		/*
			Mobile remote sources need to be reconnected on play. I think this is
			because mobile browsers are optimized not to load all resources
			for speed reasons. We only do this if mobile and the paused button
			is not clicked. If the pause button was clicked then we don't reconnect
			or the user will lose their place in the stream.
		*/
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && !config.paused ) {
			reconnectStream();
		}

		/*
			Play the song and set the playback rate to the playback
			speed.
		*/
		config.active_song.play();
		config.active_song.playbackRate = config.playback_speed;
			
		/*
			Run the after play callback
		*/
		AmplitudeHelpers.runCallback('after_play');
	}

	/*--------------------------------------------------------------------------
		Pauses the active song. If it's live, it disconnects the stream.
	--------------------------------------------------------------------------*/
	function pause(){
		AmplitudeHelpers.runCallback('before_pause');
		/*
			Pause the active song.
		*/
		config.active_song.pause();
		
		/*
			Flag that pause button was clicked.
		*/
		config.paused = true;

		if( config.active_metadata.live ){
			disconnectStream();
		}
		AmplitudeHelpers.runCallback('after_pause');
	}

	/*--------------------------------------------------------------------------
		Stops the active song by setting the current song time to 0.
		When the user resumes, it will be from the beginning.
		If it's a live stream it disconnects.
	--------------------------------------------------------------------------*/
	function stop(){
		AmplitudeHelpers.runCallback('before_stop');

		if( config.active_song.currentTime != 0 ){
			config.active_song.currentTime = 0;
		}

		config.active_song.pause();

		if( config.active_metadata.live ){
			disconnectStream();
		}

		AmplitudeHelpers.runCallback('after_stop');
	}

	/*--------------------------------------------------------------------------
		Sets the song volume.

		@param int volumeLevel A number between 1 and 100 as a percentage of
		min to max for a volume level.
	--------------------------------------------------------------------------*/
	function setVolume( volumeLevel ){
		config.active_song.volume = volumeLevel / 100;
	}

	/*--------------------------------------------------------------------------
		Sets the song percentage. If it's a live song, we ignore this because
		we can't skip ahead. This is an issue if you have a playlist with 
		a live source.

		@param int songPercentage A number between 1 and 100 as a percentage of
		song completion.
	--------------------------------------------------------------------------*/
	function setSongLocation( songPercentage ){
		if( !config.active_metadata.live ){
			config.active_song.currentTime = ( config.active_song.duration ) * ( song_percentage / 100 );
		}
	}

	/*--------------------------------------------------------------------------
		Skips to a location in a song

		@param int seconds An integer containing the seconds to skip to
	--------------------------------------------------------------------------*/
	function skipToLocation( seconds ){
		/*
			When the active song can be played through, we can check to
			see if the seconds will work. We only bind the event handler
			once and remove it once it's fired.
		*/
		config.active_song.addEventListener('canplaythrough', function(){
			/*
				If the active song duration is greater than or equal to the
				amount of seconds the user wants to skip to and the seconds
				is greater than 0, we skip to the seconds defined.
			*/
			if( config.active_song.duration >= seconds && seconds > 0 ){
				config.active_song.currentTime = seconds;
			}else{
				AmplitudeHelpers.writeDebugMessage('Amplitude can\'t skip to a location greater than the duration of the audio or less than 0');
			}
		}, { once: true });
	}

	/*--------------------------------------------------------------------------
		Disconnects the live stream
	--------------------------------------------------------------------------*/
	function disconnectStream(){
		config.active_song.src = '';
		config.active_song.load();
	}

	/*--------------------------------------------------------------------------
		Reconnects the live stream
	--------------------------------------------------------------------------*/
	function reconnectStream(){
		config.active_song.src = config.active_metadata.url;
		config.active_song.load();
	}

	/*--------------------------------------------------------------------------
		When you pass a song object it plays that song right awawy.  It sets
		the active song in the config to the song you pass in and synchronizes
		the visuals.
		
		Public Accessor: Amplitude.playNow( song_json )

		@param song JSON representation of a song.
	--------------------------------------------------------------------------*/
	function playNow( song ){
		/*
			Makes sure the song object has a URL associated with it
			or there will be nothing to play.
		*/
		if( song.url ){
			config.active_song.src 	= song.url;
			config.active_metadata 	= song;
			config.active_album 	= song.album;
		}else{
			/*
				Write error message since the song passed in doesn't
				have a URL.
			*/
			AmplitudeHelpers.writeDebugMessage('The song needs to have a URL!');
		}
		
		/*
			Sets the main song control status visual
		*/
		AmplitudeVisualSync.syncMainPlayPause('playing');

		/*
			Update the song meta data
		*/
		AmplitudeVisualSync.displaySongMetadata();


		/*
			Reset the song sliders, song time visualizations, and
			reset times. This ensures everything stays in sync.
		*/
		AmplitudeVisualSync.resetSongSliders();
		AmplitudeVisualSync.resetSongTimeVisualizations();
		AmplitudeVisualSync.resetTimes();

		/*
			Plays the song.
		*/
		play();
	}

	/*--------------------------------------------------------------------------
		Sets the playback speed for the song.

		@param float playbackSpeed The speed we want the song to play back at.
	--------------------------------------------------------------------------*/
	function setPlaybackSpeed( playbackSpeed ){
		/*
			Set the config playback speed.
		*/
		config.playback_speed = playbackSpeed;

		/*
			Set the active song playback rate.
		*/
		config.active_song.playbackRate = config.playback_speed;
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
		playNow: playNow,
		setPlaybackSpeed: setPlaybackSpeed
	}
})();

export default AmplitudeCore