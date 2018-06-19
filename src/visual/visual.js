/**
 * Imports the config module
 * @module config
 */
import config from '../config.js';

/**
 * Imports the Amplitude Visual Sync Helpers to keep the display in sync
 * @module visual/AmplitudeVisualSyncHelpers
 */
import AmplitudeVisualSyncHelpers from './helpers.js';


/**
 * Helps with the syncing of the display data
 *
 * @module visual/AmplitudeVisualSync
 */
let AmplitudeVisualSync = (function() {
	/**
	 * Visually displays the current time on the screen. This is called on
	 * time update for the current song.
	 *
	 * @access public
	 * @param {object} currentTime 					- An object containing the current time for the song in seconds, minutes, and hours.
	 * @param {float} completionPercentage	- The percent of the way through the song the user is at.
	 */
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

		AmplitudeVisualSyncHelpers.syncSongPlayedProgressBar( completionPercentage );
	}

	/**
	 * Visually sync all of the times to the initial time of 0. This is so
	 * we can keep all the players in sync
	 *
	 * @access public
	 */
	function resetTimes(){
		AmplitudeVisualSyncHelpers.resetCurrentHours();
		AmplitudeVisualSyncHelpers.resetCurrentMinutes();
		AmplitudeVisualSyncHelpers.resetCurrentSeconds();
		AmplitudeVisualSyncHelpers.resetCurrentTime();
	}

	/**
	 * Visually syncs the song sliders back to 0. This usually happens when
	 * a song has changed, we ensure that all song sliders get reset.
	 *
	 * @access public
	 */
	function resetSongSliders(){
		let songSliders = document.getElementsByClassName("amplitude-song-slider");

		/*
			Iterate over all of the song sliders and set them to
			0 essentially resetting them.
		*/
		for( let i = 0; i < songSliders.length; i++ ){
			songSliders[i].value = 0;
		}
	}

	/**
	 * Sets all of the song buffered progress bars to 0
	 *
	 * @access public
	 */
	function resetSongBufferedProgressBars(){
		/*
			Gets all of the song buffered progress bars.
		*/
		let songBufferedProgressBars = document.getElementsByClassName("amplitude-buffered-progress");

		/*
			Iterate over all of the song buffered progress bar and
			set them to 0 which is like re-setting them.
		*/
		for( let i = 0; i < songBufferedProgressBars.length; i++ ){
			songBufferedProgressBars[i].value = 0;
		}
	}

	/**
	 * Sets all of the song played progress bars to 0
	 *
	 * @access public
	 */
	function resetSongPlayedProgressBars(){
		let songPlayedProgressBars = document.getElementsByClassName("amplitude-song-played-progress");

		for( let i = 0; i < songPlayedProgressBars.length; i++ ){
			songPlayedProgressBars[i].value = 0;
		}
	}

	/**
	 * Applies the class 'amplitude-active-song-container' to the element
	 * containing visual information regarding the active song.
	 *
	 * @access public
	 */
	function setActiveContainer(){
		let songContainers = document.getElementsByClassName('amplitude-song-container');

		/*
			Removes all of the active song containrs.
		*/
		for( let i = 0; i < songContainers.length; i++ ){
			songContainers[i].classList.remove('amplitude-active-song-container');
		}

		/*
			Finds the active index and adds the active song container to the element
			that represents the song at the index.
		*/
		if( config.active_playlist == '' || config.active_playlist == null ){
			if( document.querySelectorAll('.amplitude-song-container[amplitude-song-index="'+config.active_index+'"]') ){
				let songContainers = document.querySelectorAll('.amplitude-song-container[amplitude-song-index="'+config.active_index+'"]');

				for( let i = 0; i < songContainers.length; i++ ){
					if( !songContainers[i].hasAttribute('amplitude-playlist') ){
						songContainers[i].classList.add('amplitude-active-song-container');
					}
				}
			}
		}else{
			if( document.querySelectorAll('.amplitude-song-container[amplitude-song-index="'+config.active_index+'"][amplitude-playlist="'+config.active_playlist+'"]') ){
				let songContainers = document.querySelectorAll('.amplitude-song-container[amplitude-song-index="'+config.active_index+'"][amplitude-playlist="'+config.active_playlist+'"]');

				for( let i = 0; i < songContainers.length; i++ ){
					songContainers[i].classList.add('amplitude-active-song-container');
				}
			}
		}
	}

	/**
	 * Displays the active song's metadata. This is called after a song has
	 * been changed. This method takes the active song and displays the
	 * metadata. So once the new active song is set, we update all of the
	 * screen elements.
	 *
	 * @access public
	 */
	function displaySongMetadata(){
		/*
			Define the image meta data keys. These are managed separately
			since we aren't actually changing the inner HTML of these elements.
		*/
		let imageMetaDataKeys 	= ['cover_art_url', 'station_art_url', 'podcast_episode_cover_art_url'];

		/*
			These are the ignored keys that we won't be worrying about displaying.
			Every other key in the song object can be displayed.
		*/
		let ignoredKeys 		= ['url', 'live'];

		/*
			Get all of the song info elements
		*/
		let songInfoElements = document.querySelectorAll('[amplitude-song-info]');

		/*
			Iterate over all of the song info elements. We will either
			set these to the new values, or clear them if the active song
			doesn't have the info set.
		*/
		for( let i = 0; i < songInfoElements.length; i++ ){
			/*
				Get the info so we can check if the active meta data has the
				key.
			*/
			let info = songInfoElements[i].getAttribute('amplitude-song-info');

			/*
				Get the song info element playlist.
			*/
			let playlist = songInfoElements[i].getAttribute('amplitude-playlist');

			/*
				Get the main song info flag.
			*/
			let main = songInfoElements[i].getAttribute('amplitude-main-song-info');

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

	/**
   * Sets the first song in the playlist. This is used to fill in the meta
	 * data in the playlist
	 *
	 * @param {object} song 			- The song we are setting to be the first song in the playlist
	 * @param {string} playlist 	- Key of the playlist we are setting the first song in
	 */
	function setFirstSongInPlaylist( song, playlist ){
		/*
			Define the image meta data keys. These are managed separately
			since we aren't actually changing the inner HTML of these elements.
		*/
		let imageMetaDataKeys 	= ['cover_art_url', 'station_art_url', 'podcast_episode_cover_art_url'];

		/*
			These are the ignored keys that we won't be worrying about displaying.
			Every other key in the song object can be displayed.
		*/
		let ignoredKeys 		= ['url', 'live'];

		/*
			Get all of the song info elements
		*/
		let songInfoElements = document.querySelectorAll('[amplitude-song-info][amplitude-playlist="'+playlist+'"]');

		/*
			Iterate over all of the song info elements. We will either
			set these to the new values, or clear them if the active song
			doesn't have the info set.
		*/
		for( let i = 0; i < songInfoElements.length; i++ ){
			/*
				Get the info so we can check if the active meta data has the
				key.
			*/
			let info = songInfoElements[i].getAttribute('amplitude-song-info');

			/*
				Get the song info element playlist.
			*/
		 	let elementPlaylist = songInfoElements[i].getAttribute('amplitude-playlist');

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

	/**
	 * Sets all of the visual playback speed buttons to have the right class
	 * to display the background image that represents the current playback
	 * speed.
	 *
	 * @access public
	 */
	function syncPlaybackSpeed(){
		/*
			Gets all of the playback speed classes.
		*/
		let playbackSpeedClasses = document.getElementsByClassName("amplitude-playback-speed");

		/*
			Iterates over all of the playback speed classes
			applying the right speed class for visual purposes.
		*/
		for( let i = 0; i < playbackSpeedClasses.length; i++ ){
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

	/**
	 * Syncs the buffered progress bars to the current percentage in the config
	 *
	 * @access public
	 */
	function syncBufferedProgressBars(){
		/*
			Gets all of the song buffered progress bars.
		*/
		let songBufferedProgressBars = document.getElementsByClassName("amplitude-buffered-progress");

		/*
			Iterate over all of the song buffered progress bar and
			set them to 0 which is like re-setting them.
		*/
		for( let i = 0; i < songBufferedProgressBars.length; i++ ){
			songBufferedProgressBars[i].value = parseFloat( parseFloat( config.buffered ) / 100 );
		}
	}

	/**
	 * Visually syncs the volume sliders so they are all the same if there
	 * are more than one.
	 *
	 * @access public
	 */
	function syncVolumeSliders(){
		let amplitudeVolumeSliders = document.getElementsByClassName("amplitude-volume-slider");

		/*
			Iterates over all of the volume sliders for the song, setting the value
			to the config value.
		*/
		for( let i = 0; i < amplitudeVolumeSliders.length; i++ ){
			amplitudeVolumeSliders[i].value = config.active_song.volume * 100;
		}
	}

	/**
	 * Sets all of the play pause buttons to paused.
	 *
	 * @access public
	 */
	function setPlayPauseButtonsToPause(){
		/*
			Gets all of the play pause elements
		*/
		let playPauseElements = document.querySelectorAll('.amplitude-play-pause');

		/*
			Sets all of the elements to pause
		*/
		for( let i = 0; i < playPauseElements.length; i++ ){
			AmplitudeVisualSyncHelpers.setElementPause( playPauseElements[i] );
		}
	}

	/**
	 * Syncs the main play pause buttons to the state of the active song.
	 *
	 * @param {string} state The state of the player
	 * @access public
	 */
	function syncMainPlayPause( state ){
		/*
			Ensures we have a string for the state otherwise we grab the
			state from the config.
		*/
    if( typeof state != "string" ){
      state = config.active_song.paused ? "paused" : "playing";
		}

		/*
			Get all play pause buttons.
		*/
		const playPauseElements = document.querySelectorAll('.amplitude-play-pause[amplitude-main-play-pause="true"]');

		/*
			Iterate over all of the play pause elements syncing the
			display visually.
		*/
		for( let i = 0; i < playPauseElements.length; i++ ){
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

	/**
	 * Syncs the main playlist play pause buttons to the state of the active song.
	 *
	 * @access public
	 * @param {string} playlist 	- The playlist we are setting the play pause state for.
	 * @param {string} state 			- Either playing or paused for the state of the active song.
	 */
	function syncPlaylistPlayPause( playlist, state ){
		/*
			Ensures we have a string for the state otherwise we grab the
			state from the config.
		*/
    if( typeof state != "string" ){
      state = config.active_song.paused ? "paused" : "playing";
		}

		/*
			Get all of the main playlist play pause elements
		*/
		let playlistPlayPauseElements = document.querySelectorAll('.amplitude-play-pause[amplitude-playlist-main-play-pause="true"]');

		/*
			Iterate over the play pause elements, syncing the state accordingly.
		*/
		for( let i = 0; i < playlistPlayPauseElements.length; i++ ){
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

	/**
	 * Syncs the song play pause buttons to the state of the active song.
	 *
	 * @access public
	 * @param {string} playlist 	- The playlist we are setting the play pause state for.
	 * @param {int} song 					- The index of the song we are syncing the state for
	 * @param {string} state 			- Either playing or paused for the state of the active song.
	 */
	function syncSongPlayPause( playlist, song, state ){
		/*
			Ensures we have a string for the state otherwise we grab the
			state from the config.
		*/
    if( typeof state != "string" ){
      state = config.active_song.paused ? "paused" : "playing";
		}

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
			let songPlayPauseElements = document.querySelectorAll('.amplitude-play-pause[amplitude-song-index]');

			/*
				Iterate over all of the song play pause elements
			*/
			for( let i = 0; i < songPlayPauseElements.length; i++ ){
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
			let songPlayPauseElements = document.querySelectorAll('.amplitude-play-pause[amplitude-song-index]');

			/*
				Iterate over all of the individual play pause elements.
			*/
			for( let i = 0; i < songPlayPauseElements.length; i++ ){
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

	/**
	 * Syncs repeat for all of the repeat buttons. Users
	 * can apply styles to the 'amplitude-repeat-on' and
	 * 'amplitude-repeat-off' classes. They represent the state
	 * of the player.
	 */
	function syncRepeat(){
		/*
			Gets all of the repeat classes
		*/
		let repeatClasses = document.getElementsByClassName("amplitude-repeat");

		/*
			Iterate over all of the repeat classes. If repeat is on,
			then add the 'amplitude-repeat-on' class and remove the
			'amplitude-repeat-off' class. If it's off, then do the
			opposite.
		*/
		for( let i = 0; i < repeatClasses.length; i++ ){
			if( config.repeat ){
				repeatClasses[i].classList.add('amplitude-repeat-on');
				repeatClasses[i].classList.remove('amplitude-repeat-off');
			}else{
				repeatClasses[i].classList.remove('amplitude-repeat-on');
				repeatClasses[i].classList.add('amplitude-repeat-off');
			}
		}
	}

	/**
	 * Syncs repeat for all of the playlist repeat buttons. Users
	 * can apply styles to the `amplitude-repeat-on` and `amplitude-repeat-off`
	 * classes. They repreent the state of the playlist in the player.
	 */
	 function syncRepeatPlaylist( playlist ){
		 /*
			 Gets all of the repeat buttons.
		 */
		 let repeatButtons = document.getElementsByClassName("amplitude-repeat");

		 /*
			 Iterate over all of the repeat buttons
		 */
		 for( let i = 0; i < repeatButtons.length; i++ ){
			 /*
				 Ensure that the repeat button belongs to matches the
				 playlist we are syncing the state for.
			 */
			 if( repeatButtons[i].getAttribute('amplitude-playlist') == playlist ){
				 /*
					 If the state of the playlist is shuffled on, true, then
					 we add the 'amplitude-repeat-on' class and remove the
					 'amplitude-repeat-off' class. If the player is not shuffled
					 then we do the opposite.
				 */
				 if( config.repeat_statuses[playlist] ){
					 repeatButtons[i].classList.add( 'amplitude-repeat-on');
					 repeatButtons[i].classList.remove( 'amplitude-repeat-off');
				 }else{
					 repeatButtons[i].classList.add( 'amplitude-repeat-off');
					 repeatButtons[i].classList.remove( 'amplitude-repeat-on');
				 }
			 }
		 }
	 }

	/**
	 * Syncs repeat for all of the repeat song buttons. Users
	 * can apply styles to the 'amplitude-repeat-song-on' and
	 * 'amplitude-repeat-song-off' classes. They represent the state
	 * of the player.
	 */
	function syncRepeatSong(){
		/*
			Gets all of the repeat song classes
		*/
		let repeatSongClasses = document.getElementsByClassName("amplitude-repeat-song");

		/*
			Iterate over all of the repeat song classes. If repeat is on,
			then add the 'amplitude-repeat-song-on' class and remove the
			'amplitude-repeat-song-off' class. If it's off, then do the
			opposite.
		*/
		for( let i = 0; i < repeatSongClasses.length; i++ ){
			if( config.repeat_song ){
				repeatSongClasses[i].classList.add('amplitude-repeat-song-on');
				repeatSongClasses[i].classList.remove('amplitude-repeat-song-off');
			}else{
				repeatSongClasses[i].classList.remove('amplitude-repeat-song-on');
				repeatSongClasses[i].classList.add('amplitude-repeat-song-off');
			}
		}
	}

	/**
	 * Syncs mute for all of the mute buttons. This represents the
	 * state of the player if it's muted or not.
	 *
	 * @access public
	 * @param {string} state 	- The muted state of the player.
	 */
	function syncMute( state ){
		/*
			Get all of the mute buttons.
		*/
		let muteClasses = document.getElementsByClassName("amplitude-mute");

		/*
			Iterate over all of the mute classes. If the state of the player
			is not-muted then we add the amplitude-not-muted classe and remove
			the amplitude muted class otherwise we do the opposite.
		*/
		for( let i = 0; i < muteClasses.length; i++ ){
			if( !state ){
				muteClasses[i].classList.add( 'amplitude-not-muted' );
				muteClasses[i].classList.remove( 'amplitude-muted' );
			}else{
				muteClasses[i].classList.remove( 'amplitude-not-muted' );
				muteClasses[i].classList.add( 'amplitude-muted' );
			}
		}
	}

	/**
	 * Syncs the global shuffle button visual state.
	 *
	 * @access public
	 * @param {boolean} state  	- The shuffled state of the player.
	 */
	function syncShuffle( state ){
		/*
			Gets the shuffle buttons.
		*/
		let shuffleButtons = document.getElementsByClassName("amplitude-shuffle");

		/*
			Iterate over all of the shuffle buttons.
		*/
		for( let i = 0; i < shuffleButtons.length; i++ ){
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

	/**
	 * Syncs the playlist shuffle button visual state.
	 *
	 * @access public
	 * @param {boolean} state 	- The shuffled state of the player.
	 * @param {string} playlist - The playlist string the shuffle button belongs to.
	 */
	function syncPlaylistShuffle( state, playlist ){
		/*
			Gets all of the shuffle buttons.
		*/
		let shuffleButtons = document.getElementsByClassName("amplitude-shuffle");

		/*
			Iterate over all of the shuffle buttons
		*/
		for( let i = 0; i < shuffleButtons.length; i++ ){
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

	/**
	 * Syncs the main slider location
	 *
	 * @access public
	 * @param {number} location 	- The location of the song as a percentage.
	 */
	function syncMainSliderLocation( location ){
		/*
			Ensure we have a location that's a number
		*/
		location = !isNaN( location ) ? location : 0;

		/*
			Gets the main song sliders
		*/
		let mainSongSliders = document.querySelectorAll('.amplitude-song-slider[amplitude-main-song-slider="true"]');

		/*
			Iterates over all of the main sliders and sets the value to the
			percentage of the song played.
		*/
		for( let i = 0; i < mainSongSliders.length; i++ ){
			mainSongSliders[i].value = location;
		}
	}

	/**
	 * Syncs playlist song slider locations
	 *
	 * @access public
	 * @param {string} playlist 	- The playlist we are setting the song slider for.
	 * @param {number} location 	- The location of the song as a percentage.
	 */
	function syncPlaylistSliderLocation( playlist, location ){
		/*
			Ensure we have a location that's a number
		*/
		location = !isNaN( location ) ? location : 0;

		/*
			Gets the playlist song sliders
		*/
		let playlistSongSliders = document.querySelectorAll('.amplitude-song-slider[amplitude-playlist-song-slider="true"][amplitude-playlist="'+playlist+'"]');

		/*
			Iterates over all of the playlist sliders and sets the value to the
			percentage of the song played.
		*/
		for( let i = 0; i < playlistSongSliders.length; i++ ){
			playlistSongSliders[i].value = location;
		}
	}

	/**
	 * Syncs individual song slider locations
	 *
	 * @access public
	 * @param {string} playlist 	- The playlist we are setting the song slider for.
	 * @param {number} songIndex 	- The index of the song we are adjusting the song slider for.
	 * @param {number} location 	- The location of the song as a percentage.
	 */
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
			let songSliders = document.querySelectorAll('.amplitude-song-slider[amplitude-playlist="'+playlist+'"][amplitude-song-index="'+songIndex+'"]');

			/*
				Iterates over all of the playlist sliders and set the value to the
				percentage of the song played.
			*/
			for( let i = 0; i < songSliders.length; i++ ){
				songSliders[i].value = location;
			}
		}else{
			/*
				Get the individual song slider by index
			*/
			let songSliders = document.querySelectorAll('.amplitude-song-slider[amplitude-song-index="'+songIndex+'"]');

			/*
				Iterats over all of the song sliders that have the index of
				the song we are sliding. If the song doesn't have a playlist
				attribute, we set the location.
			*/
			for( let i = 0; i < songSliders.length; i++ ){
				if( !songSliders[i].hasAttribute('amplitude-playlist') ){
					if( location != 0 ){
						songSliders[i].value = location;
					}
				}
			}
		}
	}

	/**
	 * Sets the volume slider location
	 *
	 * @access public
	 * @param {number} volume 	- The volume from 0 - 1 for song volume.
	 */
	function syncVolumeSliderLocation( volume ){
		/*
			Gets all of the volume sliders
		*/
		let volumeSliders = document.querySelectorAll('.amplitude-volume-slider');

		/*
			Iterates over all of the sliders and sets their volume
			to the volume of the song.
		*/
		for( let i = 0; i < volumeSliders.length; i++ ){
			volumeSliders[i].value = volume;
		}
	}

	/**
	 * Syncs the song's duration
	 *
	 * @access public
	 * @param {object} currentTime 		- Object containing information about the current time of the song.
	 * @param {object} songDuration 	- Object containing information about the duration of the song.
	 */
	function syncSongDuration( currentTime, songDuration ){
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

		/*
			Set count down time display.
		*/
		AmplitudeVisualSyncHelpers.syncCountDownTime( currentTime, songDuration );
	}

	/**
	 * Sets the meta data for songs loaded in the songs array
	 */
	 function syncSongsMetaData(){
		 /*
 			Define the image meta data keys. These are managed separately
 			since we aren't actually changing the inner HTML of these elements.
 		*/
 		let imageMetaDataKeys 	= ['cover_art_url', 'station_art_url', 'podcast_episode_cover_art_url'];

 		/*
 			These are the ignored keys that we won't be worrying about displaying.
 			Every other key in the song object can be displayed.
 		*/
 		let ignoredKeys 		= ['url', 'live'];

 		/*
 			Get all of the song info elements
 		*/
 		let songInfoElements = document.querySelectorAll('[amplitude-song-info]');

 		/*
 			Iterate over all of the song info elements. We will either
 			set these to the new values, or clear them if the active song
 			doesn't have the info set.
 		*/
 		for( let i = 0; i < songInfoElements.length; i++ ){

			/*
				For this method we do not want the element to have any playlist or
				main song info. This way we aren't adjusting the main song information for the
				global player or the playlist player.
			*/
			if( songInfoElements[i].getAttribute('amplitude-playlist') == null
					&& songInfoElements[i].getAttribute('amplitude-main-song-info') == null
				  && songInfoElements[i].getAttribute('amplitude-song-index') != null ){

					/*
		 				Get the info so we can check if the active meta data has the
		 				key.
		 			*/
		 			let info = songInfoElements[i].getAttribute('amplitude-song-info');
					let index = songInfoElements[i].getAttribute('amplitude-song-index');

					/*
						Make sure that the song index they are referencing is defined.
					*/
					if( config.songs[index][info] != undefined ){

						/*
							If it's an image meta data key, then we set the src attribute of
							the element. Otherwise we set the inner HTML of the element.
						*/
						if( imageMetaDataKeys.indexOf( info ) >= 0 ){
							songInfoElements[i].setAttribute('src', config.songs[index][info]);
						}else{
							songInfoElements[i].innerHTML = config.songs[index][info];
						}
					}
	 			}
		}
	}

	/**
		Returns the publically available functions
		@TODO Re-order to order of methods in module
	*/
	return {
		syncCurrentTime: syncCurrentTime,
		resetTimes: resetTimes,
		resetSongSliders: resetSongSliders,
		resetSongPlayedProgressBars: resetSongPlayedProgressBars,
		resetSongBufferedProgressBars: resetSongBufferedProgressBars,
		setActiveContainer: setActiveContainer,
		displaySongMetadata: displaySongMetadata,
		syncPlaybackSpeed: syncPlaybackSpeed,
		syncBufferedProgressBars: syncBufferedProgressBars,
		syncVolumeSliders: syncVolumeSliders,
		setPlayPauseButtonsToPause: setPlayPauseButtonsToPause,
		setFirstSongInPlaylist: setFirstSongInPlaylist,
		syncMainPlayPause: syncMainPlayPause,
		syncPlaylistPlayPause: syncPlaylistPlayPause,
		syncSongPlayPause: syncSongPlayPause,
		syncRepeat: syncRepeat,
		syncRepeatSong: syncRepeatSong,
		syncRepeatPlaylist: syncRepeatPlaylist,
		syncMute: syncMute,
		syncShuffle: syncShuffle,
		syncPlaylistShuffle: syncPlaylistShuffle,
		syncMainSliderLocation: syncMainSliderLocation,
		syncPlaylistSliderLocation: syncPlaylistSliderLocation,
		syncSongSliderLocation: syncSongSliderLocation,
		syncVolumeSliderLocation: syncVolumeSliderLocation,
		syncSongDuration: syncSongDuration,
		syncSongsMetaData: syncSongsMetaData
	}
})();

export default AmplitudeVisualSync
