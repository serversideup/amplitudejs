/**
 * Imports the config module
 * @module config
 */
import config from '../config.js';

/**
 * Imports the helpers for the event handlers.
 * @module events/AmplitudeEventsHelpers
 */
import AmplitudeEventsHelpers from './helpers.js';

/**
 * Imports the visual sync module to keep the display in sync with AmplitudeJS
 * @module visual/AmplitudeVisualSync
 */
import AmplitudeVisualSync from '../visual/visual.js';

/**
 * Imports the core module of Amplitude which handles the basic functions
 * @module core/AmplitudeCore
 */
import AmplitudeCore from '../core/core.js';

/**
 * Imports the core helpers for Amplitude which help run some of AmplitudeJS functions
 * @module core/AmplitudeHelpers
 */
import AmplitudeCoreHelpers from '../core/helpers.js';

/**
 * These functions handle the events that we bound to each element and
 * prepare for a function to be called. These kind of act like filters/middleware.
 *
 * @module events/AmplitudeHandlers
 */
export default {
	/**
	 * When the time updates on the active song, we sync the current time displays
	 *
	 * HANDLER FOR: timeupdate
	 *
	 * @access public
	 */
	updateTime: function(){
		/*
			Help from: http://jsbin.com/badimipi/1/edit?html,js,output
		*/
		if( config.active_song.buffered.length - 1 >= 0 ){
			let bufferedEnd = config.active_song.buffered.end( config.active_song.buffered.length - 1 );
			let duration =  config.active_song.duration;

			config.buffered = ( ( bufferedEnd / duration ) * 100 );
		}

		/*
			Sync the buffered progress bars.
		*/
		AmplitudeVisualSync.syncBufferedProgressBars();

		/*
			If the current song is not live, then
			we can update the time information. Otherwise the
			current time updates wouldn't mean much since the time
			is infinite.
		*/
		if( !config.active_metadata.live ){
			/*
				Compute the current time
			*/
			let currentTime = AmplitudeEventsHelpers.computeCurrentTimes();

			/*
				Compute the song completion percentage
			*/
			let songCompletionPercentage = AmplitudeEventsHelpers.computeSongCompletionPercentage();

			/*
				Computes the song duration
			*/
			let songDuration = AmplitudeEventsHelpers.computeSongDuration();

			/*
				Sync the current time elements with the current
				location of the song and the song duration elements with
				the duration of the song.
			*/
			AmplitudeVisualSync.syncCurrentTime( currentTime, songCompletionPercentage );
			AmplitudeVisualSync.syncSongDuration( currentTime, songDuration );

			/*
				Runs the callback defined for the time update.
			*/
			AmplitudeCoreHelpers.runCallback( 'time_update' );
		}
	},

	/**
	 * When the keydown event is fired, we determine which function should be run
	 * based on what was passed in.
	 *
	 * HANDLER FOR: keydown
	 *
	 * @access public
	 */
	keydown: function( event ){
		AmplitudeEventsHelpers.runKeyEvent( event.which );
	},

	/**
	 * When the song has ended, handles what to do next
	 *
	 * HANDLER FOR: ended
	 *
	 * @access public
	 */
	songEnded: function(){
		if( config.continue_next ){
			/*
				If the active playlist is not set, we set the
				next song that's in the songs array.
			*/
			if( config.active_playlist == ''
				|| config.active_playlist == null ){
					AmplitudeEventsHelpers.setNext( true );
			}else{
				/*
					Set the next song in the playlist
				*/
				AmplitudeEventsHelpers.setNextPlaylist( config.active_playlist, true );
			}
		}else{
			if( !config.is_touch_moving ){
				/*
					Sets all of the play/pause buttons to pause
				*/
				AmplitudeVisualSync.setPlayPauseButtonsToPause();

				/*
					Stops the active song.
				*/
				AmplitudeCore.stop();
			}
		}
	},

	/**
	 * As the song is buffered, we can display the buffered percentage in
	 * a progress bar.
	 *
	 * HANDLER FOR: ended
	 *
	 * @access public
	 */
	progress: function(){
		/*
			Help from: http://jsbin.com/badimipi/1/edit?html,js,output
		*/
		if( config.active_song.buffered.length - 1 >= 0 ){
			let bufferedEnd = config.active_song.buffered.end( config.active_song.buffered.length - 1 );
			let duration =  config.active_song.duration;

			config.buffered = ( ( bufferedEnd / duration ) * 100 );
		}

		/*
			Sync the buffered progress bars.
		*/
		AmplitudeVisualSync.syncBufferedProgressBars();
	},

	/**
	 * Handles an event on a play button in Amplitude.
	 *
	 * HANDLER FOR: 'amplitude-play'
	 *
	 * @access public
	 * @TODO Finish commenting and re-structure
	 */
	play: function(){
		if( !config.is_touch_moving ){
			/*
				Gets the attribute for song index so we can check if
				there is a need to change the song.  In some scenarios
				there might be multiple play classes on the page. In that
				case it is possible the user could click a different play
				class and change the song.
			*/
			let playButtonSongIndex = this.getAttribute('amplitude-song-index');
			let playButtonPlaylistIndex = this.getAttribute('amplitude-playlist');

			if( playButtonPlaylistIndex == null && playButtonSongIndex == null ){
				AmplitudeEventsHelpers.setSongPlayPause( config.active_playlist, config.active_index );
			}

			/*

			*/
			if( playButtonPlaylistIndex != null && playButtonPlaylistIndex != '' ){
				if( AmplitudeCoreHelpers.checkNewPlaylist( playButtonPlaylistIndex ) ){
					AmplitudeCoreHelpers.setActivePlaylist( playButtonPlaylistIndex );

					if( playButtonSongIndex != null ){
						AmplitudeCoreHelpers.changeSong( playButtonSongIndex );
						AmplitudeEventsHelpers.setPlaylistPlayPause( playButtonPlaylistIndex );
					}else{
						AmplitudeCoreHelpers.changeSong( config.playlists[ playButtonPlaylistIndex ][0] );
						AmplitudeEventsHelpers.setPlaylistPlayPause( playButtonPlaylistIndex );
					}
				}else{
					if( playButtonSongIndex != null ){
						AmplitudeCoreHelpers.changeSong( playButtonSongIndex );
						AmplitudeEventsHelpers.setPlaylistPlayPause( playButtonPlaylistIndex );
					}else{
						AmplitudeCoreHelpers.changeSong( config.active_index );
						AmplitudeEventsHelpers.setPlaylistPlayPause( playButtonPlaylistIndex );
					}
				}
			}

			/*

			*/
			if( ( playButtonPlaylistIndex == null || playButtonPlaylistIndex == '' )
				&& ( playButtonSongIndex != null && playButtonSongIndex != '' ) ){

					if( AmplitudeCoreHelpers.checkNewSong( playButtonSongIndex )
						|| config.active_playlist != playButtonPlaylistIndex ){
						AmplitudeCoreHelpers.changeSong( playButtonSongIndex );
					}

					AmplitudeEventsHelpers.setSongPlayPause( playButtonPlaylistIndex, playButtonSongIndex );
			}

			/*
				Start the visualizations for the song.
				AMPFX-TODO: MAKE HANDLED BY AMPLITUDE FX
			*/
			//privateStartVisualization();
		}
	},

	/**
	 * Handles an event on a pause button
	 *
	 * HANDLER FOR: 'amplitude-pause'
	 *
	 * @access public
	 * @TODO Finish commenting and optimize
	 */
	pause: function(){
		if( !config.is_touch_moving ){
			let pauseButtonSongIndex = this.getAttribute('amplitude-song-index');
			let pauseButtonPlaylistIndex = this.getAttribute('amplitude-playlist');

			if( pauseButtonSongIndex == null && pauseButtonPlaylistIndex == null ){
				AmplitudeEventsHelpers.setSongPlayPause( config.active_playlist, config.active_index );
				AmplitudeCore.pause();
			}


			if( pauseButtonPlaylistIndex != null || pauseButtonPlaylistIndex != ''
				&& config.active_playlist == pauseButtonPlaylistIndex ){
				/*
					The song was playing so we sync visually for the song
					to be paused and we pause the song.
				*/
				AmplitudeVisualSync.syncMainPlayPause( 'paused' );

				/*
					If there is an active playlist, then
					we need to sync that playlist's play pause
					button to the state of paused.
				*/
				AmplitudeVisualSync.syncPlaylistPlayPause( config.active_playlist, 'paused' );

				/*
					Sync the song play pause buttons
				*/
				AmplitudeVisualSync.syncSongPlayPause( config.active_playlist, config.active_index, 'paused' );

				AmplitudeCore.pause();
			}

			if( ( pauseButtonPlaylistIndex == null || pauseButtonPlaylistIndex == '' )
				&& ( pauseButtonSongIndex == config.active_index ) ){
					/*
						The song was playing so we sync visually for the song
						to be paused and we pause the song.
					*/
					AmplitudeVisualSync.syncMainPlayPause( 'paused' );

					/*
						If there is an active playlist, then
						we need to sync that playlist's play pause
						button to the state of paused.
					*/
					AmplitudeVisualSync.syncPlaylistPlayPause( config.active_playlist, 'paused' );

					/*
						Sync the song play pause buttons
					*/
					AmplitudeVisualSync.syncSongPlayPause( config.active_playlist, config.active_index, 'paused' );

					AmplitudeCore.pause();
			}
		}
	},

	/**
	 * Handles an event on a play/pause button
	 *
	 * HANDLER FOR: 'amplitude-play-pause'
	 *
	 * @access public
	 */
	playPause: function(){
		if( !config.is_touch_moving ){
			/*
				Checks to see if the element has an attribute for amplitude-main-play-pause
				and syncs accordingly
			*/
			if( this.getAttribute( 'amplitude-main-play-pause' ) != null ){
				AmplitudeEventsHelpers.setMainPlayPause();

			/*
				Syncs playlist main play pause buttons
			*/
			}else if( this.getAttribute('amplitude-playlist-main-play-pause') != null ){
				let playlist 	= this.getAttribute('amplitude-playlist');

				AmplitudeEventsHelpers.setPlaylistPlayPause( playlist );

			/*
				Syncs amplitude individual song buttons
			*/
			}else{
				let playlist 	= this.getAttribute('amplitude-playlist');
				let songIndex 	= this.getAttribute('amplitude-song-index');

				AmplitudeEventsHelpers.setSongPlayPause( playlist, songIndex );
			}
		}
	},

	/**
	 * Handles an event on a stop element.
	 *
	 * HANDLER FOR: 'amplitude-stop'
	 *
	 * @access public
	 * @TODO: AMP-FX Before stopping, make sure that AmplitudeFX visualization is stopped as well.
	 */
	stop: function(){
		if( !config.is_touch_moving ){
			/*
				Sets all of the play/pause buttons to pause
			*/
			AmplitudeVisualSync.setPlayPauseButtonsToPause();

			/*
				Stops the active song.
			*/
			AmplitudeCore.stop();
		}
	},

	/**
	 * Handles an event for a mute element
	 *
	 * HANDLER FOR: 'amplitude-mute'
	 *
	 * @access public
	 */
	mute: function(){
		if( !config.is_touch_moving ){
			/*
				If the current volume in the config is 0, we set the volume to the
				pre_mute level.  This means that the audio is already muted and
				needs to be restored to the pre_mute level.

				Otherwise, we set pre_mute volume to the current volume
				and set the config volume to 0, muting the audio.
			*/
			if( config.volume == 0 ){
				config.active_song.muted = false;
				config.volume = config.pre_mute_volume;
				AmplitudeVisualSync.syncMute( false );
			}else{
				config.active_song.muted = true;
				config.pre_mute_volume = config.volume;
				config.volume = 0;
				AmplitudeVisualSync.syncMute( true );
			}

			/*
				Calls the core function to set the volume to the computed value
				based on the user's intent.
			*/
			AmplitudeCore.setVolume( config.volume );

			/*
				Syncs the volume sliders so the visuals align up with the functionality.
				If the volume is at 0, then the sliders should represent that so the user
				has the right starting point.
			*/
			AmplitudeVisualSync.syncVolumeSliders( config.volume );
		}
	},

	/**
	 * Handles a click on a volume up element.
	 *
	 * HANDLER FOR: 'amplitude-volume-up'
	 *
	 * @access public
	 */
	volumeUp: function(){
		if( !config.is_touch_moving ){
			/*
				The volume range is from 0 to 1 for an audio element. We make this
				a base of 100 for ease of working with.

				If the new value is less than 100, we use the new calculated
				value which gets converted to the proper unit for the audio element.

				If the new value is greater than 100, we set the volume to 1 which
				is the max for the audio element.
			*/
			if( ( config.volume + config.volume_increment ) <= 100 ){
				config.volume = config.volume + config.volume_increment;
			}else{
				config.volume = 100;
			}

			/*
				Calls the core function to set the volume to the computed value
				based on the user's intent.
			*/
			AmplitudeCore.setVolume( config.volume );

			/*
				Syncs the volume sliders so the visuals align up with the functionality.
				If the volume is at 0, then the sliders should represent that so the user
				has the right starting point.
			*/
			AmplitudeVisualSync.syncVolumeSliders( config.volume );
		}
	},

	/**
	 * Handles a click on a volume down element.
	 *
	 * HANDLER FOR: 'amplitude-volume-down'
	 *
	 * @access public
	 */
	volumeDown: function(){
		if( !config.is_touch_moving ){
			/*
				The volume range is from 0 to 1 for an audio element. We make this
				a base of 100 for ease of working with.

				If the new value is less than 100, we use the new calculated
				value which gets converted to the proper unit for the audio element.

				If the new value is greater than 100, we set the volume to 1 which
				is the max for the audio element.
			*/
			if( ( config.volume - config.volume_increment ) > 0 ){
				config.volume = config.volume - config.volume_increment;
			}else{
				config.volume = 0;
			}

			/*
				Calls the core function to set the volume to the computed value
				based on the user's intent.
			*/
			AmplitudeCore.setVolume( config.volume );

			/*
				Syncs the volume sliders so the visuals align up with the functionality.
				If the volume is at 0, then the sliders should represent that so the user
				has the right starting point.
			*/
			AmplitudeVisualSync.syncVolumeSliders( config.volume );
		}
	},

	/**
	 * Handles a change on the song slider
	 *
	 * HANDLER FOR: 'amplitude-song-slider'
	 *
	 * @access public
	 */
	songSlider: function(){
		/*
			Gets the percentage of the song we will be setting the location for.
		*/
		let locationPercentage = this.value;

		/*
			Checks to see if the element has an attribute for amplitude-main-play-pause
			and syncs accordingly
		*/
		if( this.getAttribute( 'amplitude-main-song-slider' ) != null ){
			/*
				If the active song is not live, set the current time
			*/
			if( !config.active_metadata.live ){
				let currentTime = ( config.active_song.duration ) * ( locationPercentage / 100 );

				if( isFinite( currentTime ) ){
					config.active_song.currentTime = currentTime;
				}
			}

			AmplitudeVisualSync.syncMainSliderLocation( locationPercentage );

			if( config.active_playlist != '' && config.active_playlist != null ){
				AmplitudeVisualSync.syncPlaylistSliderLocation( config.active_playlist, locationPercentage );
			}
		}

		/*
			Syncs playlist main play pause buttons
		*/
		if( this.getAttribute('amplitude-playlist-song-slider') != null ){
			let playlist 	= this.getAttribute('amplitude-playlist');

			/*
				We don't want to song slide a playlist that's not the
				active placylist.
			*/
			if( config.active_playlist == playlist ){
				/*
					If the active song is not live, set the current time
				*/
				if( !config.active_metadata.live ){
					config.active_song.currentTime = ( config.active_song.duration ) * ( locationPercentage / 100 );
				}
				AmplitudeVisualSync.syncMainSliderLocation( locationPercentage );
				AmplitudeVisualSync.syncPlaylistSliderLocation( playlist, locationPercentage );
			}
		}

		/*
			Syncs amplitude individual song buttons
		*/
		if( this.getAttribute('amplitude-playlist-song-slider') == null
			&& this.getAttribute('amplitude-main-song-slider') == null ){

			let playlist 	= this.getAttribute('amplitude-playlist');
			let songIndex 	= this.getAttribute('amplitude-song-index');

			if( config.active_index == songIndex ){
				/*
					If the active song is not live, set the current time
				*/
				if( !config.active_metadata.live ){
					config.active_song.currentTime = ( config.active_song.duration ) * ( locationPercentage / 100 );
				}

				AmplitudeVisualSync.syncMainSliderLocation();

				if( config.active_playlist != ''
					&& config.active_playlist != null
					&& config.active_playlist == playlist ){
						AmplitudeVisualSync.syncPlaylistSliderLocation( playlist, location );
				}

				AmplitudeVisualSync.syncSongSliderLocation( playlist, songIndex, location );
			}
		}

	},

	/**
	 * Handles a change on the volume slider
	 *
	 * HANDLER FOR: 'amplitude-volume-slider'
	 *
	 * @access public
	 */
	volumeSlider: function(){
		/*
			Calls the core function to set the volume to the computed value
			based on the user's intent.
		*/
		AmplitudeCore.setVolume( this.value );

		/*
			Sync the volume slider locations
		*/
		AmplitudeVisualSync.syncVolumeSliderLocation( this.value );
	},

	/**
	 * Handles an event on the next button
	 *
	 * HANDLER FOR: 'amplitude-next'
	 *
	 * @access public
	 */
	next: function(){
		if( !config.is_touch_moving ){
			/*
				Checks to see if the button is a playlist next button or
				if it's a global playlist button.
			*/
			if( this.getAttribute('amplitude-playlist') == ''
				|| this.getAttribute('amplitude-playlist') == null ){

				/*
					Check to see if the current state of the player
					is in playlist mode or not playlist mode.
				*/
				if( config.active_playlist == ''
					|| config.active_playlist == null ){
						AmplitudeEventsHelpers.setNext();
				}else{
					AmplitudeEventsHelpers.setNextPlaylist( config.active_playlist );
				}
			}else{
				/*
					Gets the playlist of the next button.
				*/
				let playlist = this.getAttribute('amplitude-playlist');

				/*
					Sets the next playlist
				*/
				AmplitudeEventsHelpers.setNextPlaylist( playlist );
			}
		}
	},

	/**
	 * Handles an event on the previous button
	 *
	 * HANDLER FOR: 'amplitude-prev'
	 *
	 * @access public
	 */
	prev: function(){
		if( !config.is_touch_moving ){
			/*
				Checks to see if the previous button is a playlist previous
				button or if it's a global playlist button.
			*/
			if( this.getAttribute('amplitude-playlist') == ''
				|| this.getAttribute('amplitude-playlist') == null ){

				/*
					Check to see if the current playlist has been set
					or null and set the previous song.
				*/
				if( config.active_playlist == ''
					|| config.active_playlist == null ){
						AmplitudeEventsHelpers.setPrev();
				}else{
					AmplitudeEventsHelpers.setPrevPlaylist( config.active_playlist );
				}
			}else{
				/*
					Gets the playlist of the previous button.
				*/
				let playlist = this.getAttribute('amplitude-playlist');

				/*
					Sets the previous playlist
				*/
				AmplitudeEventsHelpers.setPrevPlaylist( playlist );
			}
		}
	},

	/**
	 * Handles an event on the shuffle button
	 *
	 * HANDLER FOR: 'amplitude-shuffle'
	 *
	 * @access public
	 */
	shuffle: function(){
		if( !config.is_touch_moving ){
			/*
				Check to see if the shuffle button belongs to a playlist
			*/
			if( this.getAttribute('amplitude-playlist') == ''
				|| this.getAttribute('amplitude-playlist') == null ){
				/*
					Sets the shuffle button to null
				*/
				AmplitudeEventsHelpers.setShuffle( null );
			}else{
				/*
					Gets the playlist attribute of the shuffle button and
					set shuffle to on for the playlist.
				*/
				let playlist = this.getAttribute('amplitude-playlist');
				AmplitudeEventsHelpers.setShuffle( playlist );
			}
		}
	},

	/**
	 * Handles an event on the repeat button
	 *
	 * HANDLER FOR: 'amplitude-repeat'
	 *
	 * @access private
	 */
	repeat: function(){
		if( !config.is_touch_moving ){
			/*
				Check to see if the repeat button belongs to a playlist
			*/
			if( this.getAttribute('amplitude-playlist') == ''
				|| this.getAttribute('amplitude-playlist') == null ){
					/*
						Sets repeat to the opposite of what it was set to
					*/
					AmplitudeEventsHelpers.setRepeat( !config.repeat, null );
				}else{
					/*
						Gets the playlist attribute of the repeat button and
						set repeat to on for the playlist.
					*/
					let playlist = this.getAttribute('amplitude-playlist');
					AmplitudeEventsHelpers.setRepeat( !config.repeat_statuses[playlist], playlist );
				}
		}
	},

	/**
	 * Handles an event on the repeat song button
	 *
	 * HANDLER FOR: 'amplitude-repeat-song'
	 *
	 * @access private
	 */
	repeatSong: function(){
		if( !config.is_touch_moving ){
			/*
				Sets repeat song to the opposite of what it was set to
			*/
			AmplitudeEventsHelpers.setRepeatSong( !config.repeat_song );

			/*
				Visually sync repeat song
			*/
			AmplitudeVisualSync.syncRepeatSong();
		}
	},

	/**
	 * Handles an event on the playback speed button
	 *
	 * HANDLER FOR: 'amplitude-playback-speed'
	 *
	 * @access private
	 */
	playbackSpeed: function(){
		if( !config.is_touch_moving ){
			/*
				We increment the speed by .5 everytime we click
				the button to change the playback speed. Once we are
				actively playing back at 2, we start back at 1 which
				is normal speed.
			*/
			switch( config.playback_speed ){
				case 1:
					AmplitudeEventsHelpers.setPlaybackSpeed( 1.5 );
				break;
				case 1.5:
					AmplitudeEventsHelpers.setPlaybackSpeed( 2 );
				break;
				case 2:
					AmplitudeEventsHelpers.setPlaybackSpeed( 1 );
				break;
			}

			/*
				Visually sync the playback speed.
			*/
			AmplitudeVisualSync.syncPlaybackSpeed();
		}
	},

	/**
	 * Handles an event on a skip to button.
	 *
	 * HANDLER FOR: 'amplitude-skip-to'
	 *
	 * @access private
	 */
	skipTo: function(){
		if( !config.is_touch_moving ){
			/*
				Determines if the skip to button is in the scope of a playlist.
			*/
			if( this.hasAttribute('amplitude-playlist') ){
				let playlist = this.getAttribute('amplitude-playlist');

				if( AmplitudeCoreHelpers.checkNewPlaylist( playlist ) ){
					AmplitudeCoreHelpers.setActivePlaylist( playlist );
				}
				/*
					Gets the location, playlist and song index that is being skipped
					to.
				*/
				let seconds = parseInt( this.getAttribute('amplitude-location') );
				let songIndex = parseInt( this.getAttribute( 'amplitude-song-index') );

				/*
					Changes the song to where it's being skipped and then
					play the song.
				*/
				AmplitudeCoreHelpers.changeSong( songIndex );
				AmplitudeCore.play();

				AmplitudeVisualSync.syncMainPlayPause( 'playing' );
				AmplitudeVisualSync.syncPlaylistPlayPause( playlist, 'playing' );
				AmplitudeVisualSync.syncSongPlayPause( playlist, songIndex, 'playing' );

				/*
					Skip to the location in the song.
				*/
				AmplitudeCore.skipToLocation( seconds );
			}else{
				/*
					Gets the location and song index that is being skipped
					to.
				*/
			 	let seconds = parseInt( this.getAttribute('amplitude-location') );
			 	let songIndex = parseInt( this.getAttribute( 'amplitude-song-index') );

				/*
					Changes the song to where it's being skipped and then
					play the song.
				*/
				AmplitudeCoreHelpers.changeSong( songIndex );
				AmplitudeCore.play();

				AmplitudeVisualSync.syncMainPlayPause( 'playing' );
				AmplitudeVisualSync.syncSongPlayPause( null, songIndex, 'playing' );

				/*
					Skip to the location in the song.
				*/
				AmplitudeCore.skipToLocation( seconds );
			}
		}
	}
}
