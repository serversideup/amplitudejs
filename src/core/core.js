import config from '../config.js';

import AmplitudeHelpers from './helpers.js';

/*
	TODO: Make that any interactions with volume that the volume is between 0 and 100. It's a little
	easier sounding.

	TODO: Ensure that anything not referencing the config or an HTML element is camelCase
*/
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
		AmplitudeHelpers.runCallback('before_play');

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

		config.active_song.play();
		config.active_song.playbackRate = config.playback_speed;
		
		AmplitudeHelpers.runCallback('after_play');
	}

	/*--------------------------------------------------------------------------
		Pauses the active song. If it's live, it disconnects the stream.
	--------------------------------------------------------------------------*/
	function pause(){
		config.active_song.pause();
		
		/*
			Flag that pause button was clicked.
		*/
		config.paused = true;

		if( config.active_metadata.live ){
			disconnectStream();
		}
	}

	/*--------------------------------------------------------------------------
		Stops the active song by setting the current song time to 0.
		When the user resumes, it will be from the beginning.
		If it's a live stream it disconnects.
	--------------------------------------------------------------------------*/
	function stop(){
		AmplitudeHelpers.runCallback('before_stop');

		config.active_song.currentTime = 0;
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

		TODO: Make sure that the globals get adjusted for the now playing.
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
			privateHelpWriteDebugMessage('The song needs to have a URL!');
		}
		
		/*
			Sets the main song control status visual
		*/
		privateChangePlayPauseState('playing');

		/*
			Calls the song change method that configures everything necessary for
			Amplitude when the song changes.
		*/
		privateAfterSongChanges();
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
		disconnectStream: disconnectStream,
		reconnectStream: reconnectStream,
		playNow: playNow,
		setPlaybackSpeed: setPlaybackSpeed
	}
})();

export default AmplitudeCore