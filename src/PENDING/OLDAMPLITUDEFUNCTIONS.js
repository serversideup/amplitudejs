/*--------------------------------------------------------------------------
		HANDLER FOR: class="amplitude-play-pause"
		
		AVAILABLE ATTRIBUTES: 
			amplitude-song-index
			amplitude-main-play-pause
			amplitude-playlist-main-play-pause
			amplitude-playlist

		Handles a click on a play/pause element.  This element toggles
		functionality based on the state of the song.

		TODO: Clean up this function and break out into helper functions
	--------------------------------------------------------------------------*/
	function privateEventPlayPauseInteraction(){
		/*
			Checks to see if the play pause button has the attribute amplitude-main-play-pause
			which means it reacts to the current status of AmplitudeJS.
		*/
		var isGlobalPlayPause 	= this.getAttribute('amplitude-main-play-pause');
		
		/*
			Initialize the variable to false for checking if the song being played is
			a new song.
		*/
		var isNewSong = false;
		
		/*
			Initialize the placeholders which will define what our new indexes and playlists
			are.
		*/
		var newSongIndex = '';
		var newPlayingPlaylist = '';

		/*
			If the interaction was with a play pause button that is not a global play pause,
			then we check for what kind of play pause button it is.
		*/
		if( !isGlobalPlayPause ){
			
			/*
				Checks to see if the interaction was with a play pause for a playlist.
			*/
			var playlistPlayPause 			= this.getAttribute('amplitude-playlist-main-play-pause');

			/*
				If the interaction was with a play pause button for a playlist that is 
				different than what is already playing, then it is definitely a new song, 
				and there is a new playlist. Otherwise we get the song index for the play
				pause button and the playlist defined. We then check to see if it is a new
				song because it could be the same song in the same playlist, just interacting
				on the song level instead of the playlist level.
			*/
			if( playlistPlayPause && ( playlistPlayPause != config.active_playlist ) ){
				isNewSong = true;

				newPlayingPlaylist 		= playlistPlayPause;
				newSongIndex 			= privateGetSongAtPlaylistPosition( 0, newPlayingPlaylist );
			}else{
				newPlayingPlaylist 		= this.getAttribute('amplitude-playlist');
				newSongIndex 			= this.getAttribute('amplitude-song-index');
				
				isNewSong = privateCheckNewSong( newSongIndex, newPlayingPlaylist );
			}
		}

		if( isNewSong ){
			var newSong = privateGetSongAtIndex( newSongIndex );
			
			config.active_index = newSongIndex;

	//		privateChangeSong( newSong );

			privateSetActivePlaylist( newPlayingPlaylist );
	
	//		privateAfterSongChanges();
		}else{
			if( config.active_song.paused ){
				
				privateChangePlayPauseState('playing');

				/*
					Starts the song visualization if there is one.
					TODO: MAKE HANDLED BY AMPLITUDE FX.
				*/
				//privateStartVisualization();

				privateCorePlay( this.getAttribute('amplitude-song-index') );
			}else{
				privateChangePlayPauseState('paused');

				privatePause();
			}
		}

	}

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-mute'

		Handles a click on a mute element.

		TODO: Add a class if muted to this element of amplitude-mute.  That way
		the designer can style the element if amplitude is muted like the typical
		volume with a line through it.

		TODO: Standardize the privateSetVolume parameter so it doesn't need
		to be converted by the privateSetVolume function.  Right now it converts
		up then down again which makes no sense.
	--------------------------------------------------------------------------*/
	function privateMuteClickHandle(){
		/*
			If the current volume in the config is 0, we set the volume to the 
			pre_mute level.  This means that the audio is already muted and
			needs to be restored to the pre_mute level.
			
			Otherwise, we set pre_mute volume to the current volume
			and set the config volume to 0, muting the audio.
		*/
		if( config.volume == 0 ){
			config.volume = config.pre_mute_volume;
		}else{
			config.pre_mute_volume = config.volume;
			config.volume = 0;
		}

		/*
			Calls the core function to set the volume to the computed value
			based on the user's intent.
		*/
		privateSetVolume( config.volume * 100 );

		/*
			Syncs the volume sliders so the visuals align up with the functionality.
			If the volume is at 0, then the sliders should represent that so the user
			has the right starting point.
		*/
		privateSyncVolumeSliders();
	}

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-volume-up'

		Handles a click on a volume up element.

		TODO: Standardize the privateSetVolume parameter so it doesn't need
		to be converted by the privateSetVolume function.  Right now it converts
		up then down again which makes no sense.
	--------------------------------------------------------------------------*/
	function privateVolumeUpClickHandle(){
		/*
			The volume range is from 0 to 1 for an audio element. We make this
			a base of 100 for ease of working with.

			If the new value is less than 100, we use the new calculated
			value which gets converted to the proper unit for the audio element.

			If the new value is greater than 100, we set the volume to 1 which
			is the max for the audio element.
		*/
		if( ( ( config.volume * 100 ) + config.volume_increment ) <= 100 ){
			config.volume = config.volume + ( config.volume_increment / 100 );
		}else{
			config.volume = 1;
		}

		/*
			Calls the core function to set the volume to the computed value
			based on the user's intent.
		*/
		privateSetVolume( config.volume * 100 );

		/*
			Syncs the volume sliders so the visuals align up with the functionality.
			If the volume is at 0, then the sliders should represent that so the user
			has the right starting point.
		*/
		privateSyncVolumeSliders();
	}

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-volume-down'

		Handles a click on a volume down element.

		TODO: Standardize the privateSetVolume parameter so it doesn't need
		to be converted by the privateSetVolume function.  Right now it converts
		up then down again which makes no sense.
	--------------------------------------------------------------------------*/
	function privateVolumeDownClickHandle(){
		/*
			The volume range is from 0 to 1 for an audio element. We make this
			a base of 100 for ease of working with.

			If the new value is less than 0, we use the new calculated
			value which gets converted to the proper unit for the audio element.

			If the new value is greater than 0, we set the volume to 0 which
			is the min for the audio element.
		*/
		if( ( ( config.volume * 100 ) - config.volume_decrement ) > 0 ){
			config.volume = config.volume - ( config.volume_decrement / 100 );
		}else{
			config.volume = 0;
		}
		/*
			Calls the core function to set the volume to the computed value
			based on the user's intent.
		*/
		privateSetVolume( config.volume * 100 );

		/*
			Syncs the volume sliders so the visuals align up with the functionality.
			If the volume is at 0, then the sliders should represent that so the user
			has the right starting point.
		*/
		privateSyncVolumeSliders();
	}

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-volume-slider'

		Handles an input change for a volume slider.

		TODO: Standardize the privateSetVolume parameter so it doesn't need
		to be converted by the privateSetVolume function.  Right now it converts
		up then down again which makes no sense.
	--------------------------------------------------------------------------*/
	function privateVolumeInputHandle(){
		/*
			The range slider has a range of 1 to 100 so we get the value and
			convert it to a range of 0 to 1 and set the volume.
		*/
		config.volume = ( this.value / 100 );

		/*
			Calls the core function to set the volume to the computed value
			based on the user's intent.
		*/
		privateSetVolume( this.value );

		/*
			Syncs the volume sliders so the visuals align up with the functionality.
			If the volume is at 0, then the sliders should represent that so the user
			has the right starting point.
		*/
		privateSyncVolumeSliders();
	}

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-song-slider'

		Handles an input change for a song slider.

		TODO: Make an attribute that allows for multiple main song sliders
		allowing the active playing song to be scrubbed from multiple locations
		on the page and is always in sync.
	--------------------------------------------------------------------------*/
	function privateSongStatusBarInputHandle(){
		/*
			We only adjust the time if the song is playing. It wouldn't make
			sense if we adjusted the time while it was paused.
		*/
		if( !config.active_song.paused ){
			/*
				We first check if the song slider is the only one on the page.
				If it is, we can safely assume that the slider is synced with
				the song's progression and adjust the song.
			*/
			if( this.getAttribute('amplitude-singular-song-slider') ){
				privateSetSongLocation( this.value );
			}

			/*
				If the song slider has a song index, we check to see if it matches
				the active song index. If it does, then adjust the song location.
				We do this so we can have multiple Amplitude players on the same page
				and have the slider relate to the song playing.
			*/
			if( this.getAttribute('amplitude-song-index') == config.active_index ){
				privateSetSongLocation( this.value );
			}
		}
	}

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-next'

		Handles a click for the next song.
	--------------------------------------------------------------------------*/
	function privateNextClickHandle(){
		/*
			Runs the before_next callback for the user to hook into.
		*/
		privateRunCallback('before_next');

		/*
			Stop active song since we are moving to the next song.
		*/
		privateStop();

		var nextButtonPlaylist = this.getAttribute('amplitude-playlist');

		/* If button is associated with playlist */
		if( nextButtonPlaylist ){
			/* If playlist is currently shuffled */
			if( config.shuffled_statuses[ config.active_playlist ] ){

			}else{
				/* Gets location of active song in playlist */
				var playlistIndex = config.playlists[ nextButtonPlaylist ].songs.indexOf( parseInt( config.active_index ) );

				/* If the active song is in the playlist of the next button that was clicked, continue */
				if( playlistIndex >= 0 ){
					/* Active song is in the playlist. Check to see if we increment the index of the active song, will we have a new song or start from index 0 in the playlist */
					if( parseInt( playlistIndex ) + 1 < config.playlists[ nextButtonPlaylist ].songs.length ){
						var newIndex = config.playlists[ nextButtonPlaylist ].songs[ parseInt( playlistIndex + 1 ) ];
					}else{
						var newIndex = config.playlists[ nextButtonPlaylist ].songs[0];
					}
				}else{
					/* Active song is NOT in the playlist. New index is the first song of the new playlist */
					var newIndex = config.playlists[ nextButtonPlaylist ].songs[0];
				}
			}

			privateSetActivePlaylist( nextButtonPlaylist );
		}else{
			if( config.shuffle_on ){

			}else{
				if( config.active_index + 1 < config.songs.length ){
					var newIndex = config.active_index + 1;
				}else{
					var newIndex = 0;
				}
			}

			/*
				We are not in a playlist anymore.
			*/
			config.active_playlist = '';
		}

		privateSyncNewIndex( newIndex );

		/*
			Runs the song change method to sync everything necessary.
		*/
		privateAfterSongChanges();

		/*
			Fires the after_next callback for users to hook into.
		*/
		privateRunCallback('after_next');
	}

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-prev'

		Handles a click for the previous song.
	--------------------------------------------------------------------------*/
	function privatePrevClickHandle(){
		/*
			Runs the before_prev callback for the user to hook into.
		*/
		privateRunCallback('before_prev');
		
		/*
			Stop active song since we are moving to the previous song.
		*/
		privateStop();

		/*
			Gets the playlist attribute from the previous button. This will determine
			if we scope the previous into the playlist or not.
		*/
		var prevButtonPlaylist = this.getAttribute('amplitude-playlist');

		if( prevButtonPlaylist ){
			if( config.shuffled_statuses[ config.active_playlist ] ){

			}else{
				var playlistIndex = config.playlists[ prevButtonPlaylist ].songs.indexOf( parseInt( config.active_index ) );
				
				if( playlistIndex >= 0 ){
					if( parseInt( playlistIndex ) - 1 >= 0 ){
						var newIndex = config.playlists[ prevButtonPlaylist ].songs[ parseInt( playlistIndex - 1 ) ];
					}else{
						var newIndex = config.playlists[ prevButtonPlaylist ].songs[ config.playlists[ prevButtonPlaylist ].songs.length - 1 ];
					}
				}else{
					var newIndex = config.playlists[ prevButtonPlaylist ].songs[0];
				}
			}

			privateSetActivePlaylist( prevButtonPlaylist );
		}else{
			if( config.shuffle_on ){

			}else{
				if( config.active_index - 1 >= 0 ){
					var newIndex = parseInt( config.active_index ) - 1;
				}else{
					var newIndex = parseInt( config.songs.length ) - 1;
				}
			}
		}

		privateSyncNewIndex( newIndex );

		/*
			Runs the song change method to sync everything necessary.
		*/
		privateAfterSongChanges();

		/*
			Fires the after_prev callback for users to hook into.
		*/
		privateRunCallback('after_prev');
	}

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'ended' on main audio element.

		When the song has ended, this method gets called.
		If it's a one song instance, then we don't do anything.
		If there are multiple songs, we check if shuffle is on
		or if we should use the original songs array. Then we set
		the next song and play it.
	--------------------------------------------------------------------------*/
	function privateHandleSongEnded(){
		/*
			Checks to see if repeat is on. If it's on, then we re-play the
			current song. Otherwise we begin the process of playing the
			next song in the list whether it's shuffle or regular list or
			single song.
		*/
		if( config.repeat ){
			/*
				Confirms stop of the active song
			*/
			privateStop();

			/*
				Without changing the index, just prepares the 
				next song to play.
			*/
			privateAfterSongChanges();
		}else{
			/*
				Checks to see if there is more than one song.
			*/
			if( config.songs.length > 1 ){
				/*
					Stops the active song
				*/
				privateStop();

				/*
					Checks to see if shuffle mode is turned on.
				*/
				if( config.shuffle_on ){
					/*
						Loop around shuffle array if at the end. We need to check if the next
						song is within array. Otherwise we reset it to 0.

						Set new song
					*/
					if( parseInt( config.shuffle_active_index) + 1 < config.shuffle_list.length ){
						var newIndex = parseInt( config.shuffle_active_index) + 1;

						/*
							Sets the active song information.
						*/
						privateSetActiveSongInformation( newIndex, config.shuffle_on );

						config.shuffle_active_index = parseInt(config.shuffle_active_index) + 1;
					}else{
						/*
							Sets the active song information to the beginning of the
							shuffle list
						*/
						privateSetActiveSongInformation( 0, config.shuffle_on );

						config.shuffle_active_index = 0;
					}
				}else{
					/*
						Loop around songs array if at the end. We need to check if the next
						song is within array. Otherwise we reset it to 0.

						Sets new song
					*/
					if( parseInt(config.active_index) + 1 < config.songs.length ){
						var newIndex = parseInt( config.active_index ) + 1;

						/*
							Sets the active song information
						*/
						privateSetActiveSongInformation( newIndex, config.shuffle_on );

						config.active_index = parseInt(config.active_index) + 1;
					}else{
						/*
							Sets the active song information to the beginning of the
							songs list
						*/
						privateSetActiveSongInformation( 0, config.shuffle_on );

						config.active_index = 0;
					}
				}

				/*
					Sets the active state to playing that syncs the play pause buttons
				*/
				privateChangePlayPauseState('playing');

				/*
					Runs the song change function.
				*/
				privateAfterSongChanges();
			}else{
				/*
					If there is nothing coming up, pause the play
					button and sync the current times. This will set the play pause
					buttons to paused (stopped) state and the current times to
					0:00
				*/
				privateVisualSyncSetPlayPauseButtonsToPause();
				privateSyncCurrentTimes();			
			}
		}

		/*
			Fire song ended event handler.
		*/
		privateRunCallback('after_song_ended');
	}



	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-shuffle'

		Handles a click for the shuffle element.
	--------------------------------------------------------------------------*/
	function privateShuffleClickHandle(){
		/*
			If the shuffle is already on, then turn it off
			and clear out the existing shuffle list. We also
			restore the active index back to 0.
		*/
		if( config.shuffle_on ){
			config.shuffle_on = false;
			config.shuffle_list = {};
			config.shuffle_active_index = 0;
		}else{
			/*
				If the shuffle is not on then we turn on shuffle
				and re-shuffle the songs.
			*/
			config.shuffle_on = true;
			privateShuffleSongs();
		}

		/*
			We then sync the visual shuffle button so it has the proper
			class representing the state of the shuffle functionality.
		*/
		privateSyncVisualShuffle();
	}

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-repeat'

		Handles a click for the repeat element.
	--------------------------------------------------------------------------*/
	function privateRepeatClickHandle(){
		/*
			If repeat is on, we turn it off. Othwerwise we turn repeat on.
		*/
		if( config.repeat ){
			config.repeat = false;
		}else{
			config.repeat = true;
		}

		privateSyncVisualRepeat();
	}

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-playback-speed'

		Handles a click for the adjust playback speed element.
	--------------------------------------------------------------------------*/
	function privateAdjustPlaybackSpeedClickHandle(){
		switch( config.playback_speed ){
			case 1:
				config.playback_speed = 1.5;
			break;
			case 1.5:
				config.playback_speed = 2;
			break;
			case 2:
				config.playback_speed = 1;
			break;
		}
		
		config.active_song.playbackRate = config.playback_speed;

		privateSyncVisualPlaybackSpeed();
	}



	/*--------------------------------------------------------------------------
		Shuffles songs.
		Based off of: http://www.codinghorror.com/blog/2007/12/the-danger-of-naivete.html
	--------------------------------------------------------------------------*/
	function privateShuffleSongs(){
		var shuffle_temp = new Array( config.songs.length );

		for( i = 0; i < config.songs.length; i++ ){
			shuffle_temp[i] = config.songs[i];
		}

		for( i = config.songs.length - 1; i > 0; i-- ){
			rand_num = Math.floor( ( Math.random() * config.songs.length ) + 1 );
			privateShuffleSwap( shuffle_temp, i, rand_num - 1 );
		}

		config.shuffle_list = shuffle_temp;
	}

	/*--------------------------------------------------------------------------
		Swaps and randomizes the song shuffle.

		@param JSON shuffle_list The list of songs that is going to
		be shuffled

		@param int original The original index of the song in the
		songs array.

		@param int random The randomized index that will be the
		new index of the song in the shuffle array.
	--------------------------------------------------------------------------*/
	function privateShuffleSwap( shuffle_list, original, random ){
		var temp = shuffle_list[ original ];
		shuffle_list[ original ] = shuffle_list[ random ];
		shuffle_list[ random ] = temp;
	}



	/*--------------------------------------------------------------------------
		Displays the song duration seconds for the song on the screen

		@param JSON currentTime Object containing the song duration information.
	--------------------------------------------------------------------------*/
	function privateDisplaySyncDurationSeconds( songDuration ){
		if( document.querySelectorAll('.amplitude-duration-seconds[amplitude-main-duration-seconds="true"]').length > 0 ){
			var mainDurationSecondSelectors = document.querySelectorAll('.amplitude-duration-seconds[amplitude-main-duration-seconds="true"]');
			for( var i = 0; i < mainDurationSecondSelectors.length; i++ ){
				mainDurationSecondSelectors[i].innerHTML = songDuration.seconds;
			}
		}

		if( document.querySelectorAll('.amplitude-duration-seconds[amplitude-playlist-main-duration-seconds="'+config.active_playlist+'"]').length > 0 ){
			var playlistMainDurationSecondSelectors = document.querySelectorAll('.amplitude-duration-seconds[amplitude-playlist-main-duration-seconds="'+config.active_playlist+'"]');
			for( var i = 0; i < playlistMainDurationSecondSelectors.length; i++ ){
				playlistMainDurationSecondSelectors[i].innerHTML = songDuration.seconds;
			}
		}

		if( document.querySelectorAll('.amplitude-duration-seconds[amplitude-song-index="'+config.active_index+'"]').length > 0 ){
			var durationSecondSelectors = document.querySelectorAll('.amplitude-duration-seconds[amplitude-song-index="'+config.active_index+'"]');
			for( var i = 0; i < durationSecondSelectors.length; i++ ){
				durationSecondSelectors[i].innerHTML = songDuration.seconds;
			}
		}
	}

	/*--------------------------------------------------------------------------
		Displays the song duration minutes for the song on the screen

		@param JSON currentTime Object containing the song duration information.
	--------------------------------------------------------------------------*/
	function privateDisplaySyncDurationMinutes( songDuration ){
		if( document.querySelectorAll('.amplitude-duration-minutes[amplitude-main-duration-minutes="true"]').length > 0 ){
			var mainDurationMinuteSelectors = document.querySelectorAll('[amplitude-main-duration-minutes="true"]');
			for( var i = 0; i < mainDurationMinuteSelectors.length; i++ ){
				mainDurationMinuteSelectors[i].innerHTML = songDuration.minutes;
			}
		}

		if( document.querySelectorAll('.amplitude-duration-minutes[amplitude-playlist-main-duration-minutes="'+config.active_playlist+'"]').length > 0 ){
			var playlistMainDurationMinuteSelectors = document.querySelectorAll('.amplitude-duration-minutes[amplitude-playlist-main-duration-minutes="'+config.active_playlist+'"]');
			for( var i = 0; i < playlistMainDurationMinuteSelectors.length; i++ ){
				playlistMainDurationMinuteSelectors[i].innerHTML = songDuration.minutes;
			}
		}

		if( document.querySelectorAll('.amplitude-duration-minutes[amplitude-song-index="'+config.active_index+'"]').length > 0 ){
			var durationMinuteSelectors = document.querySelectorAll('.amplitude-duration-minutes[amplitude-song-index="'+config.active_index+'"]');
			for( var i = 0; i < durationMinuteSelectors.length; i++ ){
				durationMinuteSelectors[i].innerHTML = songDuration.minutes;
			}
		}
	}

	/*--------------------------------------------------------------------------
		Displays the song duration hours for the song on the screen

		@param JSON currentTime Object containing the song duration information.
	--------------------------------------------------------------------------*/
	function privateDisplaySyncDurationHours( songDuration ){
		if( document.querySelectorAll('.amplitude-duration-hours[amplitude-main-duration-hours="true"]').length > 0 ){
			var mainDurationHourSelectors = document.querySelectorAll('[amplitude-main-duration-hours="true"]');
			for( var i = 0; i < mainDurationHourSelectors.length; i++ ){
				mainDurationHourSelectors[i].innerHTML = songDuration.hours;
			}
		}

		if( document.querySelectorAll('.amplitude-duration-hours[amplitude-playlist-main-duration-hours="'+config.active_playlist+'"]').length > 0 ){
			var playlistMainDurationHourSelectors = document.querySelectorAll('.amplitude-duration-hours[amplitude-playlist-main-duration-hours="'+config.active_playlist+'"]');
			for( var i = 0; i < playlistMainDurationHourSelectors.length; i++ ){
				playlistMainDurationHourSelectors[i].innerHTML = songDuration.hours;
			}
		}

		if( document.querySelectorAll('.amplitude-duration-hours[amplitude-song-index="'+config.active_index+'"]').length > 0 ){
			var durationHourSelectors = document.querySelectorAll('.amplitude-duration-hours[amplitude-song-index="'+config.active_index+'"]');
			for( var i = 0; i < durationHourSelectors.length; i++ ){
				durationHourSelectors[i].innerHTML = songDuration.hours;
			}
		}
	}
	/*
*
*
*
*
*
*
*
*
*
*
* BELOW ARE UNORGANIZED FUNCTIONS
*
*
*
*
*
*
*
*
*
*/



	function privateGetSongAtPlaylistPosition( playlistIndex, playlist ){
		if( config.shuffled_statuses[playlist] ){
			return config.shuffled_playlists[ playlist ][ playlistIndex ];
		}else{
			return config.playlists[ playlist ].songs[ playlistIndex ];
		}
	}

	function privateGetSongAtIndex( songIndex ){
		return config.songs[ songIndex ];
	}

	

	/*--------------------------------------------------------------------------
		Checks to see if a new song should be prepared for playing

		@param int new_song_index The integer index of the song
		that will be played. 

		TODO: Should we even have the new song checked if it's a main play pause button
		or a playlist play pause button? It's controlling the active song.
	--------------------------------------------------------------------------*/
	function privateCheckNewSong( newSongIndex, newPlayingPlaylist, newPlayingPlaylistSongIndex ){
		if( newSongIndex == null && newPlayingPlaylist == null && newPlayingPlaylistSongIndex == null ){
			return false;
		}

		if( newSongIndex == null ){
			if( newPlayingPlaylist != config.active_playlist ){
				return true;
			}else if( newPlayingPlaylist == config.active_playlist && newPlayingPlaylistSongIndex != config.active_index ){
				return true;
			}else{
				return false;
			}
		}else{
			if( newSongIndex != null && ( newSongIndex != config.active_index ) ){
				return true;
			}else{
				return false;
			}
		}
	}

	/*--------------------------------------------------------------------------
		Gets Amplitude ready for a song change. Syncs elements and runs
		necessary callbacks.
	--------------------------------------------------------------------------*/
	//function privateChangeSong( song ){
	//	/*
	//		Stops the currently playing song.
	//	*/
	//	privateStop();
//
	//	privateCheckNewAlbum( song.album );
//
	//	/*
	//		Sets the active song information for the new song that will
	//		be played.
	//	*/
	//	privateSetActiveSongInformation( song );
//
	//	if( config.album_change ){
	//		privateRunCallback('after_album_change');
	//		config.album_change = false;
	//	}
//
	//	/*
	//		If it's a new song and the user wants amplitude to handle
	//		the song elements, we need to set the information for
	//		the song.
	//	*/
	//	if( config.handle_song_elements ){
	//		privateDisplaySongMetadata();
	//	}
//
	//	/*
	//		We set the current times to 0:00 when song changes
	//		so all of the pages players will be synchronized.
	//	*/
	//	privateSyncCurrentTimes();
//
	//	privateCheckSongVisualization();
//
	//	privateSetActiveContainer();
//
	//}


	function privateSetActivePlaylist( playlist ){
		if( config.active_playlist != playlist ){
			privateRunCallback('playlist_changed');
		}
		config.active_playlist = playlist;
	}

	/*--------------------------------------------------------------------------
		Checks to see if a new album is playing. This allows for
		multiple albums to be initialized on the same page.
		Through CSS you can show and hide albums and simulate
		multiple playlists. This method is called after there is a for
		sure change to see if the next song's album is different than
		the song that will soon to be previous' album.

		@param string new_album The string of the new album
		to see if it has changed.

		TODO: Research if we should return true/false instead of setting the
		config.

		TODO: Makes sure the song actually has an album before running.
	--------------------------------------------------------------------------*/
	function privateCheckNewAlbum( new_album ){
		/*
			If the new album isn't the same as the
			active album, we set the change to true
			and run the before_album_change callback.
		*/
		if( config.active_album != new_album ){
			config.album_change = true;
			
			privateWriteDebugMessage('There has been an album change');
			
			privateRunCallback('before_album_change');
		}
	}

	/*--------------------------------------------------------------------------
		Runs callback for specific function

		@param string The name of the call back. Also used as the index that
		the user can use in the callback array to define their callback method.
	--------------------------------------------------------------------------*/
	function privateRunCallback( callback_name ){
		if( config.callbacks[callback_name] ){
			var callback_function = window[ config.callbacks[ callback_name ] ];
			
			privateWriteDebugMessage( 'Running Callback: '+callback_name );

			callback_function();
		}
	}



	/*--------------------------------------------------------------------------
		Sets the visual elements containg the active song
		metadata
	--------------------------------------------------------------------------*/
	function privateDisplaySongMetadata(){
		var imageMetaDataKeys 	= ['cover_art_url', 'station_art_url', 'podcast_episode_cover_art_url'];
		var ignoredKeys 		= ['url', 'live'];

		for ( key in config.active_metadata ) {
			if( config.active_metadata.hasOwnProperty( key ) ){

				if( ignoredKeys.indexOf( key ) == -1 ){

					if( imageMetaDataKeys.indexOf( key ) >= 0 ){
						/*
							Handle image meta stuff. We also have to update placeholders if there
							isn't an image defined to the default image url.
						*/
					}else{
						if( document.querySelectorAll('[amplitude-song-info="'+key+'"]') ){
							var metaInfo = document.querySelectorAll('[amplitude-song-info="'+key+'"]');

							for( var i = 0; i < metaInfo.length; i++ ){
								if( metaInfo[i].hasAttribute('amplitude-playlist-song-info') && metaInfo[i].getAttribute('amplitude-playlist-song-info') == config.active_playlist ){
									metaInfo[i].innerHTML = config.active_metadata[key];
								}else if( !metaInfo[i].hasAttribute('amplitude-playlist-song-info') ){
									metaInfo[i].innerHTML = config.active_metadata[key];
								}
							}
						}
					}
				}
			}
		}


		/*
			Sets all elements that will contain the active song's cover art metadata
		*/
		if( document.querySelectorAll('[amplitude-song-info="cover"]') ){
			var coverImages = document.querySelectorAll('[amplitude-song-info="cover"]');
			for( i = 0; i < coverImages.length; i++ ){
				/*
					Checks to see if first, the song has a defined cover art and uses
					that. If it does NOT have defined cover art, checks to see if there
					is a default.  Otherwise it just sets the src to '';
				*/
				if( config.active_metadata.cover_art_url != undefined){
					coverImages[i].setAttribute('src', config.active_metadata.cover_art_url);
				}else if( config.default_album_art != '' ){
					coverImages[i].setAttribute('src', config.default_album_art);
				}else{
					coverImages[i].setAttribute('src', '');
				}
			}
			
		}


		/*
			Sets all of the elements that will contain the live stream's station art metadata
			TODO: Rename coverImages to stationArtImages
		*/
		if( document.querySelectorAll('[amplitude-song-info="station-art"]') ){
			var coverImages = document.querySelectorAll('[amplitude-song-info="station-art"]');
			/*
					Checks to see if first, the song has a defined station art and uses
					that. If it does NOT have defined station art, checks to see if there
					is a default.  Otherwise it just sets the src to '';
				*/
			for( i = 0; i < coverImages.length; i++ ){
				if( config.active_metadata.cover_art_url != undefined){
					coverImages[i].setAttribute('src', config.active_metadata.station_art_url);
				}else if( config.default_album_art != '' ){
					coverImages[i].setAttribute('src', config.default_album_art);
				}else{
					coverImages[i].setAttribute('src', '');
				}
			}	
		}

		/*
			Sets all of the elements that will contain the podcast episode's cover art.
		*/
		if( document.querySelectorAll('[amplitude-song-info="podcast-episode-cover-art"]') ){
			var coverImages = document.querySelectorAll('[amplitude-song-info="podcast-episode-cover-art"]');
			
			/*
					Checks to see if first, the podcast episode has a defined cover art and uses
					that. If it does NOT have defined cover art, checks to see if there
					is a default.  Otherwise it just sets the src to '';
				*/
			for( i = 0; i < coverImages.length; i++ ){
				if( config.active_metadata.podcast_episode_cover_art != undefined){
					coverImages[i].setAttribute('src', config.active_metadata.podcast_episode_cover_art);
				}else if( config.default_album_art != '' ){
					coverImages[i].setAttribute('src', config.default_album_art);
				}else{
					coverImages[i].setAttribute('src', '');
				}
			}	
		}
	}


	/*
|----------------------------------------------------------------------------------------------------
| VISUAL SYNCHRONIZATION METHODS
|----------------------------------------------------------------------------------------------------
| These methods keep the screen in sync.  For example if there are multiple
| play/pause buttons and a song changes, we need to set all of the other
| play/pause buttons to paused state.
|
| Method Prefix: privateVisualSync
*/
	/*--------------------------------------------------------------------------
		Sets all of the play/pause buttons to the not playing state.  The 
		click handler will set the actual playing button to the playing state.
	--------------------------------------------------------------------------*/
	function privateVisualSyncSetPlayPauseButtonsToPause(){
		var play_pause_classes = document.getElementsByClassName("amplitude-play-pause");
		/*
			Iterates over all of the play pause classes removing
			the playing class and adding the paused class.
		*/
		for( var i = 0; i < play_pause_classes.length; i++ ){
			play_pause_classes[i].classList.add('amplitude-paused');
			play_pause_classes[i].classList.remove('amplitude-playing');
		}
	}

	/*--------------------------------------------------------------------------
		Changes the play pause state for all classes that need it. This
		iterates through all of the amplitude-play-pause classes for the 
		active index and all of the amplitude-main-play-puase attributes
		making sure everything stays in sync.
	--------------------------------------------------------------------------*/
	function privateChangePlayPauseState( state ){
		privateVisualSyncSetPlayPauseButtonsToPause();
		
		/*
			If the state is playing we set all of the classes accordingly.
		*/
		if( state == 'playing' ){
			/*
				Individual Songs
			*/
			if( document.querySelectorAll('.amplitude-play-pause[amplitude-song-index="'+config.active_index+'"]').length > 0 ){
				var currentPlayPauseControls = document.querySelectorAll('.amplitude-play-pause[amplitude-song-index="'+config.active_index+'"]');
				
				/*
					Iterates over all of the play pause controls adding the
					'amplitude-playing' classes and removing the 'amplitude-paused'
					classes.
				*/
				for( var i = 0; i < currentPlayPauseControls.length; i++ ){
					currentPlayPauseControls[i].classList.add('amplitude-playing');
					currentPlayPauseControls[i].classList.remove('amplitude-paused');
				}
			}

			/*
				Playlist
			*/
			if( document.querySelectorAll('.amplitude-play-pause[amplitude-playlist-main-play-pause="'+config.active_playlist+'"]').length > 0 ){
				var playlistPlayPauseControls = document.querySelectorAll('.amplitude-play-pause[amplitude-playlist-main-play-pause="'+config.active_playlist+'"]');

				for( var i = 0; i < playlistPlayPauseControls.length; i++ ){
					playlistPlayPauseControls[i].classList.add('amplitude-playing');
					playlistPlayPauseControls[i].classList.remove('amplitude-paused');
				}
			}


			/*
				Sets the main song control statuses to playing by removing the
				'amplitude-paused' class and adding the 'amplitude-playing' class.
			*/
			if( document.querySelectorAll('[amplitude-main-play-pause="true"]').length > 0 ){
				var mainControls = document.querySelectorAll('[amplitude-main-play-pause="true"]');

				for( var i = 0; i < mainControls.length; i++ ){
					mainControls[i].classList.add('amplitude-playing');
					mainControls[i].classList.remove('amplitude-paused');
				}
			}

		}

		/*
			If the state is paused, we set all of the classes accordingly.
		*/
		if( state == 'paused' ){
			privateVisualSyncSetPlayPauseButtonsToPause();
		}
	}

	/*--------------------------------------------------------------------------
		Sets all of the volume sliders to the active song's volume. 
	--------------------------------------------------------------------------*/
	function privateSyncVolumeSliders(){
		var amplitude_volume_sliders = document.getElementsByClassName("amplitude-volume-slider");

		/*
			Iterates over all of the volume sliders for the song, setting the value
			to the config value.
		*/
		for( var i = 0; i < amplitude_volume_sliders.length; i++ ){
			amplitude_volume_sliders[i].value = config.active_song.volume * 100;
		}
	}

	/*--------------------------------------------------------------------------
		Syncs the current time displays so you can have multiple song time
		displays. When a song changes, we need the current minutes and seconds
		to go to 0:00
	--------------------------------------------------------------------------*/
	function privateSyncCurrentTimes(){
		var current_minute_times = document.getElementsByClassName("amplitude-current-minutes");

		for( var i = 0; i < current_minute_times.length; i++ ){
			current_minute_times[i].innerHTML = '00';
		}

		var current_second_times = document.getElementsByClassName("amplitude-current-seconds");

		for( var i = 0; i < current_second_times.length; i++ ){
			current_second_times[i].innerHTML = '00';
		}
	}

	/*--------------------------------------------------------------------------
		For visual playing containers, we find all containers that
		have a class of 'amplitude-song-container' and remove all of 
		the additional 'amplitude-active-song-container' classes.
		When a new song is activated, it will find the parameter
		'amplitude-song-index' and the class of 'amplitude-song-container'
		and give it the additional class 'amplitude-active-song-container'.
	--------------------------------------------------------------------------*/
	function privateSyncVisualPlayingContainers(){
		var visual_playing_containers = document.getElementsByClassName("amplitude-song-container");

		for( var i = 0; i < visual_playing_containers.length; i++ ){
			visual_playing_containers[i].classList.remove('amplitude-active-song-container');
		}
	}

	/*--------------------------------------------------------------------------
		Sets shuffle on for all of the shuffle buttons. Users
		can apply styles to the amplitude-shuffle-on and 
		amplitude-shuffle-off classes. They represent the state
		of the playlist.
	--------------------------------------------------------------------------*/
	function privateSyncVisualShuffle(){
		var shuffle_classes = document.getElementsByClassName("amplitude-shuffle");

		for( var i = 0; i < shuffle_classes.length; i++ ){
			if( config.shuffle_on ){
				shuffle_classes[i].classList.add('amplitude-shuffle-on');
				shuffle_classes[i].classList.remove('amplitude-shuffle-off');
			}else{
				shuffle_classes[i].classList.remove('amplitude-shuffle-on');
				shuffle_classes[i].classList.add('amplitude-shuffle-off');
			}
		}
	}

	/*--------------------------------------------------------------------------
		Sets repeat on for all of the repeat buttons. Users
		can apply styles to the amplitude-repeat-on and 
		amplitude-repeat-off classes. They represent the state
		of the player.
	--------------------------------------------------------------------------*/
	function privateSyncVisualRepeat(){
		var repeat_classes = document.getElementsByClassName("amplitude-repeat");

		for( var i = 0; i < repeat_classes.length; i++ ){
			if( config.repeat ){
				repeat_classes[i].classList.add('amplitude-repeat-on');
				repeat_classes[i].classList.remove('amplitude-repeat-off');
			}else{
				repeat_classes[i].classList.remove('amplitude-repeat-on');
				repeat_classes[i].classList.add('amplitude-repeat-off');
			}
		}
	}
