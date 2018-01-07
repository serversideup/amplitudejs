/**
 * Imports the config module
 * @module config
 */
import config from '../config.js';

/**
 * AmplitudeJS Core Helpers
 * @module core/helpers
 */
import AmplitudeHelpers from './helpers.js';

/**
 * AmplitudeJS Visual Sync
 * @module visual/visual
*/
import AmplitudeVisualSync from '../visual/visual.js';

/**
 * Interacts directly with native functions of the Audio element. Logic
 * leading up to these methods are handled by click handlers which call
 * helpers and visual synchronizers. These are the core functions of AmplitudeJS.
 * Every other function that leads to these prepare the information to be
 * acted upon by these functions.
 *
 * @module core/AmplitudeCore
 */
let AmplitudeCore = (function() {
	/**
	 * Plays the active song. If the current song is live, it reconnects
	 * the stream before playing.
	 *
	 * Public Accessor: Amplitude.play()
	 *
	 * @access public
	 */
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

	/**
	 * Pauses the active song. If it's live, it disconnects the stream.
	 *
	 * Public Accessor: Amplitude.pause()
	 *
	 * @access public
	 */
	function pause(){
		/*
			Run the before pause callback.
		*/
		AmplitudeHelpers.runCallback('before_pause');

		/*
			Pause the active song.
		*/
		config.active_song.pause();

		/*
			Flag that pause button was clicked.
		*/
		config.paused = true;

		/*
			If the song is live, we disconnect the stream so we aren't
			saving it to memory.
		*/
		if( config.active_metadata.live ){
			disconnectStream();
		}

		/*
			Run the after pause callback.
		*/
		AmplitudeHelpers.runCallback('after_pause');
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
	function stop(){
		/*
			Runs the before stop callback.
		*/
		AmplitudeHelpers.runCallback('before_stop');

		/*
			Set the current time of the song to 0 which will reset the song.
		*/
		if( config.active_song.currentTime != 0 ){
			config.active_song.currentTime = 0;
		}

		/*
			Run pause so the song will stop
		*/
		config.active_song.pause();

		/*
			If the song is live, disconnect the stream.
		*/
		if( config.active_metadata.live ){
			disconnectStream();
		}

		/*
			Run the after stop callback
		*/
		AmplitudeHelpers.runCallback('after_stop');
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
	function setVolume( volumeLevel ){
		/*
			If the volume is set to mute somewhere else, we sync the display.
		*/
		if( volumeLevel == 0 ){
			AmplitudeVisualSync.syncMute( true );
		}else{
			AmplitudeVisualSync.syncMute( false );
		}

		/*
			Set the volume of the active song.
		*/
		config.active_song.volume = volumeLevel / 100;
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
	function setSongLocation( songPercentage ){
		/*
			As long as the song is not live, we can set the current time of the
			song to the percentage the user passed in.
		*/
		if( !config.active_metadata.live ){
			config.active_song.currentTime = ( config.active_song.duration ) * ( song_percentage / 100 );
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

	/**
	 * Disconnects the live stream
	 *
	 * Public Accessor: Amplitude.disconnectStream()
	 *
	 * @access public
	 */
	function disconnectStream(){
		config.active_song.src = '';
		config.active_song.load();
	}

	/**
	 * Reconnects the live stream
	 *
	 * Public Accessor: Amplitude.reconnectStream()
	 *
	 * @access public\
	 */
	function reconnectStream(){
		config.active_song.src = config.active_metadata.url;
		config.active_song.load();
	}

	/**
	 * When you pass a song object it plays that song right awawy.  It sets
	 * the active song in the config to the song you pass in and synchronizes
	 * the visuals.
	 *
	 * Public Accessor: Amplitude.playNow( song )
	 *
	 * @access public
	 * @param {object} song - JSON representation of a song.
	 */
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
			Reset the song sliders, song progress bar info, and
			reset times. This ensures everything stays in sync.
		*/
		AmplitudeVisualSync.resetSongSliders();

		AmplitudeVisualSync.resetSongPlayedProgressBars();

		AmplitudeVisualSync.resetTimes();

		/*
			Plays the song.
		*/
		play();
	}

	/**
	 * Plays the song at a specific index in the songs array
	 *
	 * Public Accessor: Amplitude.playSongAtIndex( song )
	 *
	 * @access public
	 * @param {number} index - The number representing the song in the songs array
	 */
	 function playSongAtIndex( index ){
		 /*
				Stop the current song.
		 */
		 stop();

		 /*
				Determine if there is a new playlist, if so set the active playlist and change the song.
		 */
		 if( AmplitudeHelpers.checkNewPlaylist( null ) ){
			 AmplitudeHelpers.setActivePlaylist( null );

			 AmplitudeHelpers.changeSong( index );
		 }

		 /*
				Check if the song is new. If so, change the song.
		 */
		 if( AmplitudeHelpers.checkNewSong( index ) ){
			 AmplitudeHelpers.changeSong( index );
		 }

		 /*
			 Sync all of the play pause buttons.
		 */
		 AmplitudeVisualSync.syncMainPlayPause('playing');
		 AmplitudeVisualSync.syncPlaylistPlayPause( config.active_playlist, 'playing' );
		 AmplitudeVisualSync.syncSongPlayPause( config.active_playlist, config.active_index, 'playing' );

		 /*
			 Play the song
		 */
		 play();
	 }

	 /**
		* Plays a song at the index passed in for the playlist provided. The index passed
		* in should be the index of the song in the playlist and not the songs array.
		*
		* @access public
		* @param {number} index 		- The number representing the song in the playlist array.
		* @param {string} playlist 	- The key string representing the playlist we are playing the song from.
		*
		*/
	 function playPlaylistSongAtIndex( index, playlist ){
			 /*
			 		Stop the current song.
			 */
			 stop();

			 /*
			 		Get the index of the song in the songs array. This is the integer at the index
					in the playlist.
			 */
			 let songIndex = config.playlists[ playlist ][ index ];

			 /*
			 		Determine if there is a new playlist, if so set the active playlist and change the song.
			 */
			 if( AmplitudeHelpers.checkNewPlaylist( playlist ) ){
				 AmplitudeHelpers.setActivePlaylist( playlist );

				 AmplitudeHelpers.changeSong( songIndex );
			 }

			 /*
			 		Check if the song is new. If so, change the song.
			 */
			if( AmplitudeHelpers.checkNewSong( songIndex ) ){
			 AmplitudeHelpers.changeSong( songIndex );
			}

			/*
				Sync all of the play pause buttons.
			*/
			AmplitudeVisualSync.syncMainPlayPause('playing');
			AmplitudeVisualSync.syncPlaylistPlayPause( config.active_playlist, 'playing' );
			AmplitudeVisualSync.syncSongPlayPause( config.active_playlist, config.active_index, 'playing' );

			/*
				Play the song
			*/
			play();
	 }

	/**
	 * Sets the playback speed for the song.
	 *
	 * @param {number} playbackSpeed The speed we want the song to play back at.
	 */
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
		playSongAtIndex: playSongAtIndex,
		playPlaylistSongAtIndex: playPlaylistSongAtIndex,
		setPlaybackSpeed: setPlaybackSpeed
	}
})();

export default AmplitudeCore
