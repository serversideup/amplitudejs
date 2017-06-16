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
|	resetTimes()
|	resetSongSliders()
|	resetSongTimeVisualizations()
|	setActiveContainer()
|	displaySongMetadata()
|	syncPlaybackSpeed()
| 	syncVolumeSliders()
| 	setPlayPauseButtonsToPause()
| 	syncMainPlayPause( state )
|	syncPlaylistPlayPause( playlist, state )
| 	syncSongPlayPause( playlist, song, state )
| 	syncRepeat()
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
		syncMainSliderLocation( completionPercentage );
		syncPlaylistSliderLocation( config.active_playlist, completionPercentage );
		syncSongSliderLocation( config.active_playlist, config.active_index, completionPercentage );
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
		AmplitudeVisualSyncHelpers.resetCurrentHours();
		AmplitudeVisualSyncHelpers.resetCurrentMinutes();
		AmplitudeVisualSyncHelpers.resetCurrentSeconds();
		AmplitudeVisualSyncHelpers.resetCurrentTime();
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
		if( config.active_playlist == '' || config.active_playlist == null ){
			if( document.querySelectorAll('.amplitude-song-container[amplitude-song-index="'+config.active_index+'"]') ){
				var songContainers = document.querySelectorAll('.amplitude-song-container[amplitude-song-index="'+config.active_index+'"]');

				for( i = 0; i < songContainers.length; i++ ){
					if( !songContainers[i].hasAttribute('amplitude-playlist') ){
						songContainers[i].classList.add('amplitude-active-song-container');
					}
				}
			}
		}else{
			if( document.querySelectorAll('.amplitude-song-container[amplitude-song-index="'+config.active_index+'"][amplitude-playlist="'+config.active_playlist+'"]') ){
				var songContainers = document.querySelectorAll('.amplitude-song-container[amplitude-song-index="'+config.active_index+'"][amplitude-playlist="'+config.active_playlist+'"]');

				for( i = 0; i < songContainers.length; i++ ){
					songContainers[i].classList.add('amplitude-active-song-container');
				}
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
				Get the song info element playlist.
			*/
			var playlist = songInfoElements[i].getAttribute('amplitude-playlist');
			
			/*
				Get the main song info flag.
			*/
			var main = songInfoElements[i].getAttribute('amplitude-main-song-info');

			/*
				If the playlists match or the element is a main element, then
				we set the song info.
			*/
			if( config.active_playlist == playlist || main == 'true' ){
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
	}

	function setFirstSongInPlaylist( song, playlist ){
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
			Get all of the song info elements
		*/
		var songInfoElements = document.querySelectorAll('[amplitude-song-info][amplitude-playlist="'+playlist+'"]');

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
				Get the song info element playlist.
			*/
			var elementPlaylist = songInfoElements[i].getAttribute('amplitude-playlist');
			
			/*
				If the playlists match or the element is a main element, then
				we set the song info.
			*/
			if( elementPlaylist == playlist ){
				/*
					If the active metadata has the key, then we set it,
					otherwise we clear it. If it's an image element then
					we default it to the default info if needed.
				*/
				if( song[info] != undefined ){
					if( imageMetaDataKeys.indexOf( info ) >= 0 ){
						songInfoElements[i].setAttribute('src', song[info]);
					}else{
						songInfoElements[i].innerHTML = song[info];
					}
				}else{
					/*
						We look for the default album art because
						the actual key didn't exist. If the default album
						art doesn't exist then we set the src attribute
						to null.
					*/
					if( imageMetaDataKeys.indexOf( info ) >= 0 ){
						if( song.default_album_art != '' ){
							songInfoElements[i].setAttribute('src', song.default_album_art);
						}else{
							songInfoElements[i].setAttribute('src', '');
						}
					}else{
						songInfoElements[i].innerHTML = '';
					}
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
		Sets all of the play pause buttons to paused.
	--------------------------------------------------------------------------*/
	function setPlayPauseButtonsToPause(){
		var playPauseElements = document.querySelectorAll('.amplitude-play-pause');

		for( var i = 0; i < playPauseElements.length; i++ ){
			AmplitudeVisualSyncHelpers.setElementPause( playPauseElements[i] );
		}
	}

	/*--------------------------------------------------------------------------
		Syncs the main play pause buttons to the state of the active song.

		@param string state The state of the player.
	--------------------------------------------------------------------------*/
	function syncMainPlayPause( state ){
        if(typeof state!="string")
            state = config.active_song.paused ? "paused" : "playing";
		/*
			Get all play pause buttons.
		*/
		const playPauseElements = document.querySelectorAll('.amplitude-play-pause[amplitude-main-play-pause="true"]');

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
					AmplitudeVisualSyncHelpers.setElementPlay( playPauseElements[i] );
				break;
				case 'paused':
					AmplitudeVisualSyncHelpers.setElementPause( playPauseElements[i] );
				break;
			}
		}
	}

	/*--------------------------------------------------------------------------
		Syncs the main playlist play pause buttons to the state of the active song.
		
		@param string playlist The playlist we are setting the play pause state
		for.

		@param string state Either playing or paused for the state of the
		active song.
	--------------------------------------------------------------------------*/
	function syncPlaylistPlayPause( playlist, state ){
    
        if(typeof state != "string")
            state = config.active_song.paused ? "paused" : "playing";
		/*
			Get all of the main playlist play pause elements
		*/
		var playlistPlayPauseElements = document.querySelectorAll('.amplitude-play-pause[amplitude-playlist-main-play-pause="true"]');

		/*
			Iterate over the play pause elements, syncing the state accordingly.
		*/
		for( var i = 0; i < playlistPlayPauseElements.length; i++ ){
			/*
				If the element has the same playlist attribute as the playlist
				passed in and the state is playing, we set the element to
				be playing otherwise we set it to pause. Setting to pause
				means the element doesn't match the active playlist or the
				state is paused.
			*/
			if( playlistPlayPauseElements[i].getAttribute('amplitude-playlist') == playlist 
				&& state == 'playing' ){
				
				AmplitudeVisualSyncHelpers.setElementPlay( playlistPlayPauseElements[i] );
			}else{
				AmplitudeVisualSyncHelpers.setElementPause( playlistPlayPauseElements[i] );
			}
		}
	}

	/*--------------------------------------------------------------------------
		Syncs the song play pause buttons to the state of the active song.
		
		@param string playlist The playlist we are setting the play pause state
		for.

		@param int song The index of the song we are syncing the state for
		
		@param string state Either playing or paused for the state of the
		active song.
	--------------------------------------------------------------------------*/
	function syncSongPlayPause( playlist, song, state ){
    
        if(typeof state!="string")
            state = config.active_song.paused ? "paused" : "playing";
            
		/*
			If the playlist is null or empty, we make sure that any song
			that is a part of a playlist is set to paused.
		*/
		if( playlist == null || playlist == '' ){
			/*
				Get all of the individual song play pause buttons. These have an
				amplitude-song-index attribute. Some have amplitude-playlist which
				means they are individual songs within a playlist.
			*/
			var songPlayPauseElements = document.querySelectorAll('.amplitude-play-pause[amplitude-song-index]');

			/*
				Iterate over all of the song play pause elements
			*/
			for( var i = 0; i < songPlayPauseElements.length; i++ ){
				/*
					If the song element has an attribute for amplitude-playlist then
					we set it to paused no matter what because the state of the player
					is not in a playlist mode.
				*/
				if( songPlayPauseElements[i].hasAttribute('amplitude-playlist') ){
					AmplitudeVisualSyncHelpers.setElementPause( songPlayPauseElements[i] );
				}else{
					/*
						If the state of the song is playing and the song index matches the
						index of the song we have, we set the element to playing otherwise
						we set the element to paused.
					*/
					if( state == 'playing' && songPlayPauseElements[i].getAttribute('amplitude-song-index') == song ){
						AmplitudeVisualSyncHelpers.setElementPlay( songPlayPauseElements[i] );
					}else{
						AmplitudeVisualSyncHelpers.setElementPause( songPlayPauseElements[i] );
					}
				}
			}
		}else{
			/*
				Get all of the individual song play pause buttons. These have an
				amplitude-song-index attribute. Some have amplitude-playlist which
				means they are individual songs within a playlist.
			*/
			var songPlayPauseElements = document.querySelectorAll('.amplitude-play-pause[amplitude-song-index]');

			/*
				Iterate over all of the individual play pause elements.
			*/
			for( var i = 0; i < songPlayPauseElements.length; i++ ){
				/*
					Since we have an active playlist this time, we want any stand alone
					songs to be set to paused since the scope is within a playlist.

					We check to see if the element has an amplitude-playlist attribute.
				*/
				if( songPlayPauseElements[i].hasAttribute('amplitude-playlist') ){

					/*
						Check to see if the song index matches the index passed in and the
						playlist matches the scoped playlist we are looking for and the
						state of the player is playing, then we set the element to play. If those
						three parameters are not met, set the element to pause.
					*/
					if( songPlayPauseElements[i].getAttribute('amplitude-song-index') == song 
						&& songPlayPauseElements[i].getAttribute('amplitude-playlist') == playlist
						&& state == 'playing' ){
							AmplitudeVisualSyncHelpers.setElementPlay( songPlayPauseElements[i] );
					}else{
						AmplitudeVisualSyncHelpers.setElementPause( songPlayPauseElements[i] );
					}
				}else{
					/*
						Set any individual songs (songs outside of a playlist scope) to pause
						since we are in the scope of a playlist.
					*/
					AmplitudeVisualSyncHelpers.setElementPause( songPlayPauseElements[i] );
				}
			}
		}
	}

	/*--------------------------------------------------------------------------
		Syncs repeat for all of the repeat buttons. Users
		can apply styles to the 'amplitude-repeat-on' and 
		'amplitude-repeat-off' classes. They represent the state
		of the player.
	--------------------------------------------------------------------------*/
	function syncRepeat(){
		/*
			Gets all of the repeat classes
		*/
		var repeatClasses = document.getElementsByClassName("amplitude-repeat");

		/*
			Iterate over all of the repeat classes. If repeat is on,
			then add the 'amplitude-repeat-on' class and remove the
			'amplitude-repeat-off' class. If it's off, then do the
			opposite.
		*/
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

	/*--------------------------------------------------------------------------
		Syncs mute for all of the mute buttons. This represents the
		state of the player if it's muted or not.

		@param 	string	state The muted state of the player.
	--------------------------------------------------------------------------*/
	function syncMute( state ){
		/*
			Get all of the mute buttons.
		*/
		var muteClasses = document.getElementsByClassName("amplitude-mute");

		/*
			Iterate over all of the mute classes. If the state of the player
			is not-muted then we add the amplitude-not-muted classe and remove
			the amplitude muted class otherwise we do the opposite.
		*/
		for( var i = 0; i < muteClasses.length; i++ ){
			if( !state ){
				muteClasses[i].classList.add( 'amplitude-not-muted' );
				muteClasses[i].classList.remove( 'amplitude-muted' );
			}else{
				muteClasses[i].classList.remove( 'amplitude-not-muted' );
				muteClasses[i].classList.add( 'amplitude-muted' );
			}
		}
	}

	/*--------------------------------------------------------------------------
		@param 	string	state
	--------------------------------------------------------------------------*/
	function syncVolumeSliders( volume ){

	}

	/*--------------------------------------------------------------------------
		Syncs the global shuffle button visual state.

		@param 	bool state The shuffled state of the player.
	--------------------------------------------------------------------------*/
	function syncShuffle( state ){
		/*
			Gets the shuffle buttons.
		*/
		var shuffleButtons = document.getElementsByClassName("amplitude-shuffle");

		/*
			Iterate over all of the shuffle buttons.
		*/
		for( var i = 0; i < shuffleButtons.length; i++ ){
			/*
				Ensure the shuffle button doesn't belong to a playlist. We have
				a separate method for that.
			*/
			if( shuffleButtons[i].getAttribute('amplitude-playlist') == null ){
				/*
					If the state of the player is shuffled on, true, then
					we add the 'amplitude-shuffle-on' class and remove the
					'amplitude-shuffle-off' class. If the player is not shuffled
					then we do the opposite.
				*/
				if( state ){
					shuffleButtons[i].classList.add( 'amplitude-shuffle-on');
					shuffleButtons[i].classList.remove( 'amplitude-shuffle-off');
				}else{
					shuffleButtons[i].classList.add( 'amplitude-shuffle-off');
					shuffleButtons[i].classList.remove( 'amplitude-shuffle-on');
				}
			}
		}
	}

	/*--------------------------------------------------------------------------
		Syncs the playlist shuffle button visual state.

		@param 	bool state The shuffled state of the player.
		@param 	string	playlist The playlist string the shuffle button belongs to.
	--------------------------------------------------------------------------*/
	function syncPlaylistShuffle( state, playlist ){
		/*
			Gets all of the shuffle buttons.
		*/
		var shuffleButtons = document.getElementsByClassName("amplitude-shuffle");

		/*
			Iterate over all of the shuffle buttons
		*/
		for( var i = 0; i < shuffleButtons.length; i++ ){
			/*
				Ensure that the playlist the shuffle button belongs to matches the
				playlist we are syncing the state for.
			*/
			if( shuffleButtons[i].getAttribute('amplitude-playlist') == playlist ){
				/*
					If the state of the playlist is shuffled on, true, then
					we add the 'amplitude-shuffle-on' class and remove the
					'amplitude-shuffle-off' class. If the player is not shuffled
					then we do the opposite.
				*/
				if( state ){
					shuffleButtons[i].classList.add( 'amplitude-shuffle-on');
					shuffleButtons[i].classList.remove( 'amplitude-shuffle-off');
				}else{
					shuffleButtons[i].classList.add( 'amplitude-shuffle-off');
					shuffleButtons[i].classList.remove( 'amplitude-shuffle-on');
				}
			}
		}
	}

	/*--------------------------------------------------------------------------
		Syncs the main slider location

		@param 	int 	location The location of the song as a percentage.
	--------------------------------------------------------------------------*/
	function syncMainSliderLocation( location ){
		/*
			Ensure we have a location that's a number
		*/
		location = !isNaN( location ) ? location : 0;

		/*
			Gets the main song sliders
		*/
		var mainSongSliders = document.querySelectorAll('.amplitude-song-slider[amplitude-main-song-slider="true"]');
		
		/*
			Iterates over all of the main sliders and sets the value to the
			percentage of the song played.
		*/
		for( var i = 0; i < mainSongSliders.length; i++ ){
			mainSongSliders[i].value = location;
		}
	}

	/*--------------------------------------------------------------------------
		Syncs playlist song slider locations
		
		@param 	string	playlist The playlist we are setting the song slider for.
		@param 	int 	location The location of the song as a percentage.
	--------------------------------------------------------------------------*/
	function syncPlaylistSliderLocation( playlist, location ){
		/*
			Ensure we have a location that's a number
		*/
		location = !isNaN( location ) ? location : 0;

		/*
			Gets the playlist song sliders
		*/
		var playlistSongSliders = document.querySelectorAll('.amplitude-song-slider[amplitude-playlist-song-slider="true"][amplitude-playlist="'+playlist+'"]');

		/*
			Iterates over all of the playlist sliders and sets the value to the
			percentage of the song played.
		*/
		for( var i = 0; i < playlistSongSliders.length; i++ ){
			playlistSongSliders[i].value = location;
		}
	}

	/*--------------------------------------------------------------------------
		Syncs individual song slider locations
		
		@param 	string	playlist The playlist we are setting the song slider for.
		@param 	int 	songIndex The index of the song we are adjusting the song slider for.
		@param 	int 	location The location of the song as a percentage.
	--------------------------------------------------------------------------*/
	function syncSongSliderLocation( playlist, songIndex, location ){
		/*
			Ensure we have a location that's a number
		*/
		location = !isNaN( location ) ? location : 0;
		/*
			If the playlist is set, we get all of the individual song sliders
			that relate to the song and the playlist.
		*/
		if( playlist != '' && playlist != null ){
			/*
				Gets the song sliders for the individual songs and the
				playlist
			*/
			var songSliders = document.querySelectorAll('.amplitude-song-slider[amplitude-playlist="'+playlist+'"][amplitude-song-index="'+songIndex+'"]');

			/*
				Iterates over all of the playlist sliders and set the value to the
				percentage of the song played.
			*/
			for( var i = 0; i < songSliders.length; i++ ){
				songSliders[i].value = location;
			}
		}else{
			/*
				Get the individual song slider by index
			*/
			var songSliders = document.querySelectorAll('.amplitude-song-slider[amplitude-song-index="'+songIndex+'"]');

			/*
				Iterats over all of the song sliders that have the index of
				the song we are sliding. If the song doesn't have a playlist
				attribute, we set the location.
			*/
			for( var i = 0; i < songSliders.length; i++ ){
				if( !songSliders[i].hasAttribute('amplitude-playlist') ){
					if( location != 0 ){
						songSliders[i].value = location;
					}
				}
			}
		}
	}

	/*--------------------------------------------------------------------------
		Sets the volume slider location
		
		@param 	int volume The volume from 0 - 1 for song volume.
	--------------------------------------------------------------------------*/
	function syncVolumeSliderLocation( volume ){
		/*
			Gets all of the volume sliders
		*/
		var volumeSliders = document.querySelectorAll('.amplitude-volume-slider');

		/*
			Iterates over all of the sliders and sets their volume
			to the volume of the song.
		*/
		for( var i = 0; i < volumeSliders.length; i++ ){
			volumeSliders[i].value = volume;
		}
	}

	/*--------------------------------------------------------------------------
		Syncs the song's duration

		@param 	songDuration 	Object containing information about the duration
			of the song
	--------------------------------------------------------------------------*/
	function syncSongDuration( songDuration ){
		/*
			Set duration hour display.
		*/
		AmplitudeVisualSyncHelpers.syncDurationHours( songDuration != undefined && !isNaN( songDuration.hours ) ? songDuration.hours : '00' );
		
		/*
			Set duration minute display.
		*/
		AmplitudeVisualSyncHelpers.syncDurationMinutes( songDuration != undefined && !isNaN( songDuration.minutes ) ? songDuration.minutes : '00' );
		
		/*
			Set duration second display.
		*/
		AmplitudeVisualSyncHelpers.syncDurationSeconds( songDuration != undefined && !isNaN( songDuration.seconds ) ? songDuration.seconds : '00' );
		
		/*
			Set duration time display.
		*/
		AmplitudeVisualSyncHelpers.syncDurationTime( songDuration != undefined ? songDuration : {} );
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
		setPlayPauseButtonsToPause: setPlayPauseButtonsToPause,
		setFirstSongInPlaylist: setFirstSongInPlaylist,
		syncMainPlayPause: syncMainPlayPause,
		syncPlaylistPlayPause: syncPlaylistPlayPause,
		syncSongPlayPause: syncSongPlayPause,
		syncRepeat: syncRepeat,
		syncMute: syncMute,
		syncVolumeSliders: syncVolumeSliders,
		syncShuffle: syncShuffle,
		syncPlaylistShuffle: syncPlaylistShuffle,
		syncMainSliderLocation: syncMainSliderLocation,
		syncPlaylistSliderLocation: syncPlaylistSliderLocation,
		syncSongSliderLocation: syncSongSliderLocation,
		syncVolumeSliderLocation: syncVolumeSliderLocation,
		syncSongDuration: syncSongDuration
	}
})();

export default AmplitudeVisualSync