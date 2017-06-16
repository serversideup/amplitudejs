import config from '../config.js';
import AmplitudeEventHelpers from './helpers.js';
import AmplitudeVisualSync from '../visual/visual.js';
import AmplitudeCore from '../core/core.js';
import AmplitudeCoreHelpers from '../core/helpers.js';

/*
|-------------------------------------------------------------------------------
| EVENT HANDLER FUNCTIONS
|-------------------------------------------------------------------------------
| These functions handle the events that we bound to each element and
| prepare for a function to be called. These kind of act like filters/middleware.
|
| METHODS
|	updateTime()
|	songEnded()
|	play()
|	pause()
|	playPause()
|	stop()
|	mute()
|	volumeUp()
|	volumeDown()
|	songSlider()
|	volumeSlider()
|	next()
|	prev()
|	shuffle()
|	repeat()
|	playbackSpeed()
|	skipTo()
*/
export default {
	/*--------------------------------------------------------------------------
		HANDLER FOR: timeupdate

		When the time updates on the active song, we sync the current time displays
	--------------------------------------------------------------------------*/
	updateTime: function(){
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
			var currentTime = AmplitudeEventHelpers.computeCurrentTimes();

			/*
				Compute the song completion percentage
			*/
			var songCompletionPercentage = AmplitudeEventHelpers.computeSongCompletionPercentage();

			/*
				Computes the song duration
			*/
			var songDuration = AmplitudeEventHelpers.computeSongDuration();

			/*
				Sync the current time elements with the current
				location of the song and the song duration elements with
				the duration of the song.
			*/
			AmplitudeVisualSync.syncCurrentTime( currentTime, songCompletionPercentage );
			AmplitudeVisualSync.syncSongDuration( songDuration );
		}
	},

	/*--------------------------------------------------------------------------
		HANDLER FOR: ended

		When the song has ended, handles what to do next
	--------------------------------------------------------------------------*/
	songEnded: function(){
		/*
			If the active playlist is not set, we set the
			next song that's in the songs array.
		*/
		if( config.active_playlist == '' 
			|| config.active_playlist == null ){
				AmplitudeEventHelpers.setNext( true );
		}else{
			/*
				Set the next song in the playlist
			*/
			AmplitudeEventHelpers.setNextPlaylist( config.active_playlist, true );
		}
	},

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-play'

		Handles an event on a play button in Amplitude.
	--------------------------------------------------------------------------*/
	play: function(){
		if( !config.is_touch_moving ){
			/*
				Gets the attribute for song index so we can check if
				there is a need to change the song.  In some scenarios
				there might be multiple play classes on the page. In that
				case it is possible the user could click a different play
				class and change the song.
			*/
			var playButtonSongIndex = this.getAttribute('amplitude-song-index');
			var playButtonPlaylistIndex = this.getAttribute('amplitude-playlist');

			if( playButtonPlaylistIndex == null && playButtonSongIndex == null ){
				AmplitudeEventHelpers.setSongPlayPause( config.active_playlist, config.active_index );
			}

			/*
				
			*/
			if( playButtonPlaylistIndex != null && playButtonPlaylistIndex != '' ){
				if( AmplitudeCoreHelpers.checkNewPlaylist( playButtonPlaylistIndex ) ){
					AmplitudeCoreHelpers.setActivePlaylist( playButtonPlaylistIndex );

					if( playButtonSongIndex != null ){
						AmplitudeCoreHelpers.changeSong( playButtonSongIndex );
						AmplitudeEventHelpers.setPlaylistPlayPause( playButtonPlaylistIndex );
					}else{
						AmplitudeCoreHelpers.changeSong( config.playlists[ playButtonPlaylistIndex ][0] );
						AmplitudeEventHelpers.setPlaylistPlayPause( playButtonPlaylistIndex );
					}
				}else{
					if( playButtonSongIndex != null ){
						AmplitudeCoreHelpers.changeSong( playButtonSongIndex );
						AmplitudeEventHelpers.setPlaylistPlayPause( playButtonPlaylistIndex );
					}else{
						AmplitudeCoreHelpers.changeSong( config.active_index );
						AmplitudeEventHelpers.setPlaylistPlayPause( playButtonPlaylistIndex );
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

					AmplitudeEventHelpers.setSongPlayPause( playButtonPlaylistIndex, playButtonSongIndex );
			}

			/*
				Start the visualizations for the song. 
				AMPFX-TODO: MAKE HANDLED BY AMPLITUDE FX
			*/
			//privateStartVisualization();
		}
	},

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-pause'
	--------------------------------------------------------------------------*/
	pause: function(){
		if( !config.is_touch_moving ){
			var pauseButtonSongIndex = this.getAttribute('amplitude-song-index');
			var pauseButtonPlaylistIndex = this.getAttribute('amplitude-playlist');

			if( pauseButtonSongIndex == null && pauseButtonPlaylistIndex == null ){
				AmplitudeEventHelpers.setSongPlayPause( config.active_playlist, config.active_index );
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

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-play-pause'

		Handles an event on a play pause button.
	--------------------------------------------------------------------------*/
	playPause: function(){
		if( !config.is_touch_moving ){
			/*
				Checks to see if the element has an attribute for amplitude-main-play-pause
				and syncs accordingly
			*/
			if( this.getAttribute( 'amplitude-main-play-pause' ) != null ){
				AmplitudeEventHelpers.setMainPlayPause();

			/*
				Syncs playlist main play pause buttons
			*/
			}else if( this.getAttribute('amplitude-playlist-main-play-pause') != null ){
				var playlist 	= this.getAttribute('amplitude-playlist');

				AmplitudeEventHelpers.setPlaylistPlayPause( playlist );

			/*
				Syncs amplitude individual song buttons
			*/
			}else{
				var playlist 	= this.getAttribute('amplitude-playlist');
				var songIndex 	= this.getAttribute('amplitude-song-index');

				AmplitudeEventHelpers.setSongPlayPause( playlist, songIndex );
			}
		}
	},

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-stop'

		Handles an event on a stop element.

		AMP-FX TODO: Before stopping, make sure that AmplitudeFX visualization
		is stopped as well.
	--------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-mute'

		Handles an event on a mute element.
	--------------------------------------------------------------------------*/
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
				config.volume = config.pre_mute_volume;
				AmplitudeVisualSync.syncMute( false );
			}else{
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

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-volume-up'

		Handles a click on a volume up element.
	--------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-volume-down'

		Handles a click on a volume down element.
	--------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-song-slider'

		Handles a change on the song slider
	--------------------------------------------------------------------------*/
	songSlider: function(){
		/*
			Gets the percentage of the song we will be setting the location for.
		*/
		var locationPercentage = this.value;

		/*
			Checks to see if the element has an attribute for amplitude-main-play-pause
			and syncs accordingly
		*/
		if( this.getAttribute( 'amplitude-main-song-slider' ) != null ){
			/*
				If the active song is not live, set the current time
			*/
			if( !config.active_metadata.live ){
				var currentTime = ( config.active_song.duration ) * ( locationPercentage / 100 );

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
			var playlist 	= this.getAttribute('amplitude-playlist');

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

			var playlist 	= this.getAttribute('amplitude-playlist');
			var songIndex 	= this.getAttribute('amplitude-song-index');

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

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-volume-slider'

		Handles a change on the volume slider
	--------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-next'

		Handles an event on the next button
	--------------------------------------------------------------------------*/
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
						AmplitudeEventHelpers.setNext();
				}else{
					AmplitudeEventHelpers.setNextPlaylist( config.active_playlist );
				}
			}else{
				/*
					Gets the playlist of the next button.
				*/
				var playlist = this.getAttribute('amplitude-playlist');

				/*
					Sets the next playlist
				*/
				AmplitudeEventHelpers.setNextPlaylist( playlist );
			}
		}
	},

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-prev'

		Handles an event on the previous button
	--------------------------------------------------------------------------*/
	prev: function(){
		if( !config.is_touch_moving ){
			/*
				We went to the previous song so we turn repeat off.
			*/
			config.repeat = AmplitudeEventHelpers.setRepeat( false );
			AmplitudeVisualSync.syncRepeat();

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
						AmplitudeEventHelpers.setPrev();
				}else{
					AmplitudeEventHelpers.setPrevPlaylist( config.active_playlist );
				}
			}else{
				/*
					Gets the playlist of the previous button.
				*/
				var playlist = this.getAttribute('amplitude-playlist');

				/*
					Sets the previous playlist
				*/
				AmplitudeEventHelpers.setPrevPlaylist( playlist );
			}
		}
	},

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-shuffle'

		Handles an event on the shuffle button
	--------------------------------------------------------------------------*/
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
				AmplitudeEventHelpers.setShuffle( null );
			}else{
				/*
					Gets the playlist attribute of the shuffle button and
					set shuffle to on for the playlist.
				*/
				var playlist = this.getAttribute('amplitude-playlist');
				AmplitudeEventHelpers.setShuffle( playlist );
			}
		}
	},

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-repeat'

		Handles an event on the repeat button
	--------------------------------------------------------------------------*/
	repeat: function(){
		if( !config.is_touch_moving ){
			/*
				Sets repeat to the opposite of what it was set to
			*/
			AmplitudeEventHelpers.setRepeat( !config.repeat );

			/*
				Visually sync repeat
			*/
			AmplitudeVisualSync.syncRepeat();
		}
	},

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-playback-speed'

		Handles an event on the playback speed button
	--------------------------------------------------------------------------*/
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
					AmplitudeEventHelpers.setPlaybackSpeed( 1.5 );
				break;
				case 1.5:
					AmplitudeEventHelpers.setPlaybackSpeed( 2 );
				break;
				case 2:
					AmplitudeEventHelpers.setPlaybackSpeed( 1 );
				break;
			}

			/*
				Visually sync the playback speed.
			*/
			AmplitudeVisualSync.syncPlaybackSpeed();
		}
	},

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-skip-to'

		Handles an event on a skip to button.
	--------------------------------------------------------------------------*/
	skipTo: function(){
		if( !config.is_touch_moving ){
			/*
				Determines if the skip to button is in the scope of a playlist.
			*/
			if( this.hasAttribute('amplitude-playlist') ){
				var playlist = this.getAttribute('amplitude-playlist');
				
				if( AmplitudeCoreHelpers.checkNewPlaylist( playlist ) ){
					AmplitudeCoreHelpers.setActivePlaylist( playlist );
				}
				/*
					Gets the location, playlist and song index that is being skipped
					to.
				*/
				var location = parseInt( this.getAttribute('amplitude-location') );
				var playlist = this.getAttribute('amplitude-playlist');
				var songIndex = parseInt( this.getAttribute( 'amplitude-song-index') );
				
				/*
					Changes the song to where it's being skipped and then
					play the song.
				*/
				AmplitudeCoreHelpers.changeSong( songIndex );
				AmplitudeCore.play();

				/*
					Skip to the location in the song.
				*/
				AmplitudeCore.skipToLocation( location );
			}else{
				/*
					Gets the location and song index that is being skipped
					to.
				*/
				var location = parseInt( this.getAttribute('amplitude-location') );
				var songIndex = parseInt( this.getAttribute( 'amplitude-song-index') );

				/*
					Changes the song to where it's being skipped and then
					play the song.
				*/
				AmplitudeCoreHelpers.changeSong( songIndex );
				AmplitudeCore.play();

				/*
					Skip to the location in the song.
				*/
				AmplitudeCore.skipToLocation( location );
			}
		}
	}
}