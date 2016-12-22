import config from '../config.js';
import AmplitudeVisualSyncHelpers from './helpers.js';

/*
|----------------------------------------------------------------------------------------------------
| VISUAL SYNC METHODS
|----------------------------------------------------------------------------------------------------
| These methods sync visual displays with what is happening in Amplitude
|
| Method Prefix: privateVisualSync
|
| METHODS
|	syncCurrentTime( currentTime, completionPercentage )
|	resetSongSliders()
|	resetSongTimeVisualizations()
|	setActiveContainer()
|	displaySongMetadata()
|	syncPlaybackSpeed()
| 	syncVolumeSliders()
|	syncPlayPause( state )
*/
var AmplitudeVisualSync = (function() {
	/*--------------------------------------------------------------------------
		Visually displays the current time on the screen. This is called on
		time update for the current song.

		@param JSON currentTime An object containing the current time for the
		song in seconds, minutes, and hours.

		@param float completionPercentage The percent of the way through the song
		the user is at.
	--------------------------------------------------------------------------*/
	function syncCurrentTime( currentTime, completionPercentage ){
		/*
			Set current hour display.
		*/
		AmplitudeVisualSyncHelpers.syncCurrentHours( currentTime.hours );
		
		/*
			Set current minute display.
		*/
		AmplitudeVisualSyncHelpers.syncCurrentMinutes( currentTime.minutes );
		
		/*
			Set current second display.
		*/
		AmplitudeVisualSyncHelpers.syncCurrentSeconds( currentTime.seconds );
		
		/*
			Set current time display.
		*/
		AmplitudeVisualSyncHelpers.syncCurrentTime( currentTime );
		
		/*
			Set all song sliders to be to the current percentage
			of the song played.
		*/
		AmplitudeVisualSyncHelpers.syncSongSliders( completionPercentage );
		
		/*
			Set all visual sync song time visualizations. This will
			expand the div inside of the visualization to be the song
			played percentage.
		*/
		AmplitudeVisualSyncHelpers.syncSongTimeVisualizations( completionPercentage );
	}

	/*--------------------------------------------------------------------------
		Visually sync all of the times to the initial time of 0. This is so 
		we can keep all the players in sync
	--------------------------------------------------------------------------*/
	function resetTimes(){
		AmplitudeVisualSyncHelpers.syncCurrentHours( '00' );
		AmplitudeVisualSyncHelpers.syncCurrentMinutes( '00' );
		AmplitudeVisualSyncHelpers.syncCurrentMinutes( '00' );
	}

	/*--------------------------------------------------------------------------
		Visually syncs the song sliders back to 0. This usually happens when
		a song has changed, we ensure that all song sliders get reset.
	--------------------------------------------------------------------------*/
	function resetSongSliders(){
		var songSliders = document.getElementsByClassName("amplitude-song-slider");

		/*
			Iterate over all of the song sliders and set them to
			0 essentially resetting them.
		*/
		for( var i = 0; i < songSliders.length; i++ ){
			songSliders[i].value = 0;
		}
	}

	/*--------------------------------------------------------------------------
		Visually syncs the song time visualizations. Like the song sliders,
		when a song is changed, these must be synced back to 0. Except 0 in
		this circumstance is the visualization status has 0 width.
	--------------------------------------------------------------------------*/
	function resetSongTimeVisualizations(){
		var songTimeVisualizations = document.getElementsByClassName("amplitude-song-time-visualization");

		/*
			Iterate over all of the song time visualization elements and find their inner
			status and set that element's width to 0.
		*/
		for( var i = 0; i < songTimeVisualizations.length; i++ ){
			var songTimeVisualizationStatus = songTimeVisualizations[i].querySelector('.amplitude-song-time-visualization-status');
			songTimeVisualizationStatus.setAttribute('style', 'width: 0px');
		}
	}

	/*--------------------------------------------------------------------------
		Applies the class 'amplitude-active-song-container' to the element 
		containing visual information regarding the active song.

		TODO: Make sure that when shuffling, this changes accordingly.
	--------------------------------------------------------------------------*/
	function setActiveContainer(){
		var songContainers = document.getElementsByClassName('amplitude-song-container');

		/*
			Removes all of the active song containrs.
		*/
		for( var i = 0; i < songContainers.length; i++ ){
			songContainers[i].classList.remove('amplitude-active-song-container');
		}

		/*
			Finds the active index and adds the active song container to the element
			that represents the song at the index. 
		*/
		if( document.querySelectorAll('.amplitude-song-container[amplitude-song-index="'+config.active_index+'"]') ){
			var songContainers = document.querySelectorAll('.amplitude-song-container[amplitude-song-index="'+config.active_index+'"]');

			for( i = 0; i < songContainers.length; i++ ){
				songContainers[i].classList.add('amplitude-active-song-container');
			}
		}
	}

	/*--------------------------------------------------------------------------
		Displays the active song's metadata. This is called after a song has
		been changed. This method takes the active song and displays the
		metadata. So once the new active song is set, we update all of the
		screen elements.
	--------------------------------------------------------------------------*/
	function displaySongMetadata(){
		/*
			Define the image meta data keys. These are managed separately
			since we aren't actually changing the inner HTML of these elements.
		*/
		var imageMetaDataKeys 	= ['cover_art_url', 'station_art_url', 'podcast_episode_cover_art_url'];
		
		/*
			These are the ignored keys that we won't be worrying about displaying.
			Every other key in the song object can be displayed.
		*/
		var ignoredKeys 		= ['url', 'live'];

		/*
			TODO: Worry about setting Playlist level and Main Level attributes.
			TODO: Should we have song info for indexes? If so we need to account
			for this.
		*/

		/*
			Get all of the song info elements
		*/
		var songInfoElements = document.querySelectorAll('[amplitude-song-info]');

		/*
			Iterate over all of the song info elements. We will either
			set these to the new values, or clear them if the active song
			doesn't have the info set.
		*/
		for( var i = 0; i < songInfoElements.length; i++ ){
			/*
				Get the info so we can check if the active meta data has the
				key.
			*/
			var info = songInfoElements[i].getAttribute('amplitude-song-info');

			/*
				If the active metadata has the key, then we set it,
				otherwise we clear it. If it's an image element then
				we default it to the default info if needed.
			*/
			if( config.active_metadata[info] != undefined ){
				if( imageMetaDataKeys.indexOf( info ) >= 0 ){
					songInfoElements[i].setAttribute('src', config.active_metadata[info]);
				}else{
					songInfoElements[i].innerHTML = config.active_metadata[info];
				}
			}else{
				/*
					We look for the default album art because
					the actual key didn't exist. If the default album
					art doesn't exist then we set the src attribute
					to null.
				*/
				if( imageMetaDataKeys.indexOf( info ) >= 0 ){
					if( config.default_album_art != '' ){
						songInfoElements[i].setAttribute('src', config.default_album_art);
					}else{
						songInfoElements[i].setAttribute('src', '');
					}
				}else{
					songInfoElements[i].innerHTML = '';
				}
			}
		}
	}

	/*--------------------------------------------------------------------------
		Sets all of the visual playback speed buttons to have the right class
		to display the background image that represents the current playback
		speed.
	--------------------------------------------------------------------------*/
	function syncPlaybackSpeed(){
		/*
			Gets all of the playback speed classes.
		*/
		var playbackSpeedClasses = document.getElementsByClassName("amplitude-playback-speed");

		/*
			Iterates over all of the playback speed classes
			applying the right speed class for visual purposes.
		*/
		for( var i = 0; i < playbackSpeedClasses.length; i++ ){
			/*
				Removes all of the old playback speed classes.
			*/
			playbackSpeedClasses[i].classList.remove('amplitude-playback-speed-10');
			playbackSpeedClasses[i].classList.remove('amplitude-playback-speed-15');
			playbackSpeedClasses[i].classList.remove('amplitude-playback-speed-20');

			/*
				Switch the current playback speed and apply the appropriate 
				speed class.
			*/
			switch( config.playback_speed ){
				case 1:
					playbackSpeedClasses[i].classList.add('amplitude-playback-speed-10');
				break;
				case 1.5:
					playbackSpeedClasses[i].classList.add('amplitude-playback-speed-15');
				break;
				case 2:
					playbackSpeedClasses[i].classList.add('amplitude-playback-speed-20');
				break;
			}
		}
	}

	/*--------------------------------------------------------------------------
		Visually syncs the volume sliders so they are all the same if there
		are more than one.
	--------------------------------------------------------------------------*/
	function syncVolumeSliders(){
		var amplitudeVolumeSliders = document.getElementsByClassName("amplitude-volume-slider");

		/*
			Iterates over all of the volume sliders for the song, setting the value
			to the config value.
		*/
		for( var i = 0; i < amplitudeVolumeSliders.length; i++ ){
			amplitudeVolumeSliders[i].value = config.active_song.volume * 100;
		}
	}

	/*--------------------------------------------------------------------------
		Syncs all of the play pause buttons to the active state of the
		player.

		@param string state The state of the player.
	--------------------------------------------------------------------------*/
	function syncPlayPause( state ){
		/*
			Get all play pause buttons.
		*/
		var playPauseElements = document.getElementsByClassName("amplitude-play-pause");

		/*
			Iterate over all of the play pause elements syncing the
			display visually.
		*/
		for( var i = 0; i < playPauseElements.length; i++ ){
			/*
				Determines what classes we should add and remove
				from the elements.
			*/
			switch( state ){
				case 'playing':
					/*
						If the state is playing and the active index matches the index of the
						now playing song or the element is the playlist main play pause button
						of the active playlist or the element is the main play pause then 
						we apply the playing class.

						TODO: Should we change the playlist play pause button if the song is in a playlist?
							NO: Then should we only flag individual songs' play pause buttons IF they don't have
							a playlist attribute?
							DO NOT FLAG PLAYLIST SONGS IF NOT ACTIVELY PLAYING!!
					*/
					if( playPauseElements[i].getAttribute('amplitude-song-index') == config.active_index
						|| playPauseElements[i].getAttribute('amplitude-playlist-main-play-pause') == config.active_playlist
					 	|| playPauseElements[i].getAttribute('amplitude-main-play-pause') == 'true' ){
							playPauseElements[i].classList.add('amplitude-playing');
							playPauseElements[i].classList.remove('amplitude-paused');
					}
				break;
				case 'paused':
					/*
						Everything will be set to pause so this is easy, just set all of the elements
						to paused.
					*/
					playPauseElements[i].classList.add('amplitude-paused');
					playPauseElements[i].classList.remove('amplitude-playing');
				break;
			}
		}
	}

	/*--------------------------------------------------------------------------
		Sets repeat on for all of the repeat buttons. Users
		can apply styles to the amplitude-repeat-on and 
		amplitude-repeat-off classes. They represent the state
		of the player.
	--------------------------------------------------------------------------*/
	function syncRepeat(){
		var repeatClasses = document.getElementsByClassName("amplitude-repeat");

		for( var i = 0; i < repeatClasses.length; i++ ){
			if( config.repeat ){
				repeatClasses[i].classList.add('amplitude-repeat-on');
				repeatClasses[i].classList.remove('amplitude-repeat-off');
			}else{
				repeatClasses[i].classList.remove('amplitude-repeat-on');
				repeatClasses[i].classList.add('amplitude-repeat-off');
			}
		}
	}

	/*
		Returns the publically available functions
	*/
	return {
		syncCurrentTime: syncCurrentTime,
		resetTimes: resetTimes,
		resetSongSliders: resetSongSliders,
		resetSongTimeVisualizations: resetSongTimeVisualizations,
		setActiveContainer: setActiveContainer,
		displaySongMetadata: displaySongMetadata,
		syncPlaybackSpeed: syncPlaybackSpeed,
		syncVolumeSliders: syncVolumeSliders,
		syncPlayPause: syncPlayPause,
		syncRepeat: syncRepeat
	}
})();

export default AmplitudeVisualSync