/**
 * Imports the config module
 * @module config
 */
import config from '../config.js';

/**
 * Imports the Amplitude Visual Sync module
 * @module visual/AmplitudeVisualSync
 */
import AmplitudeVisualSync from '../visual/visual.js';

/**
 * Imports the Amplitude Core module
 * @module core/AmplitudeCore
 */
import AmplitudeCore from '../core/core.js';

/**
 * Imports the Amplitude Core Helpers module
 * @module core/AmplitudeCoreHelpers
 */
import AmplitudeCoreHelpers from '../core/helpers.js';

/**
 * These methods help handle interactions whether it's computation or shuffling
 * songs.
 *
 * @module events/AmplitudeEventsHelpers
 */
let AmplitudeEventsHelpers = (function() {
	/**
	 * Computes the current song time. Breaks down where the song is into
	 * hours, minutes, seconds and formats it to be displayed to the user.
	 *
	 * @access public
	 */
	function computeCurrentTimes(){
		/*
			Initialize the current time object that will be returned.
		*/
		let currentTime = {};

		/*
			Computes the current seconds for the song.
		*/
		let currentSeconds = ( Math.floor( config.active_song.currentTime % 60 ) < 10 ? '0' : '' ) +
							    Math.floor( config.active_song.currentTime % 60 );

		/*
			Computes the current minutes for the song.
		*/
		let currentMinutes = Math.floor( config.active_song.currentTime / 60 );

		/*
			Initialize the current hours variable.
		*/
		let currentHours = '00';

		/*
			If the current minutes is less than 10, we add a leading 0.
		*/
		if( currentMinutes < 10 ){
			currentMinutes = '0'+currentMinutes;
		}

		/*
			If the user is more than 60 minutes into the song, then
			we extract the hours.
		*/
		if( currentMinutes >= 60 ){
			currentHours 		= Math.floor( currentMinutes / 60 );
			currentMinutes 		= currentMinutes % 60;

			/*
				If the user is less than 10 minutes in, we append the
				additional 0 to the minutes.
			*/
			if( currentMinutes < 10 ){
				currentMinutes = '0'+currentMinutes;
			}
		}

		/*
			Build a clean current time object and send back the appropriate information.
		*/
		currentTime.seconds = currentSeconds;
		currentTime.minutes = currentMinutes;
		currentTime.hours 	= currentHours;

		return currentTime;
	}

	/**
	 * Computes the current song duration. Breaks down where the song is into
	 * hours, minutes, seconds and formats it to be displayed to the user.
	 *
	 * @access public
	 */
	function computeSongDuration(){
		/*
			Initialize the song duration object that will be returned.
		*/
		let songDuration = {};

		/*
			Computes the duration of the song's seconds.
		*/
		let songDurationSeconds = ( Math.floor( config.active_song.duration % 60 ) < 10 ? '0' : '' ) +
									  		Math.floor( config.active_song.duration % 60 );

		/*
			Computes the duration of the song's minutes.
		*/
		let songDurationMinutes = Math.floor( config.active_song.duration / 60 );

		/*
			Initialize the hours duration variable.
		*/
		var songDurationHours = '0';

		/*
			If the song duration minutes is less than 10, we add a leading 0.
		*/
		if( songDurationMinutes < 10 ){
			songDurationMinutes = '0'+songDurationMinutes;
		}

		/*
			If there is more than 60 minutes in the song, then we
			extract the hours.
		*/
		if( songDurationMinutes >= 60 ){
			songDurationHours 		= Math.floor( songDurationMinutes / 60 );
			songDurationMinutes 	= songDurationMinutes % 60;

			/*
				If the song duration minutes is less than 10 we append
				the additional 0.
			*/
			if( songDurationMinutes < 10 ){
				songDurationMinutes = '0'+songDurationMinutes;
			}
		}

		/*
			Build a clean song duration object and send back the appropriate information.
		*/
		songDuration.seconds 	= songDurationSeconds;
		songDuration.minutes 	= songDurationMinutes;
		songDuration.hours 		= songDurationHours;

		return songDuration;
	}

	/**
	 * Computes the song completion percentage.
	 *
	 * @access public
	 */
	function computeSongCompletionPercentage(){
		return ( config.active_song.currentTime / config.active_song.duration ) * 100;
	}

	/**
	 * Sets the current song's playback speed
	 *
	 * @access public
	 * @param {number} speed 	- The float with a base of 1 representing the speed
	 *
	 */
	function setPlaybackSpeed( speed ){
		AmplitudeCore.setPlaybackSpeed( speed );
	}

	/**
	 * Sets the state of the repeat for the current song.
	 *
	 * @access public
	 * @param {boolean} repeat - A boolean representing whether the repeat should be on or off
	 * @param {string} playlist - The key of the playlist for repeating
	 */
	function setRepeat( repeat, playlist ){
		/*
		  If the playlist is null, then we are dealing with the global
		  repeat status.
		*/
		if( playlist == null ){
			/*
				Set the global repeat to be toggled
			*/
			config.repeat = repeat;

			/*
				Visually sync repeat
			*/
			AmplitudeVisualSync.syncRepeat();
		}else{
			/*
				Set the playlist repeat to be toggled.
			*/
			config.repeat_statuses[playlist] = repeat;

			/*
				Visually sync playlist repeat
			*/
			AmplitudeVisualSync.syncRepeatPlaylist( playlist );
		}


/** When song ends and in playlis mode and done with playlist check repeat  **/


	}


	/**
	 * Sets the state of the repeat song
	 *
	 * @access public
	 * @param {boolean} repeat - A boolean representing whether the repeat shoudl be on or off for the song.
	 */
	 function setRepeatSong( repeat ){
		 config.repeat_song = repeat;
	 }

	/**
	 * Sets the main play pause buttons to the current state of the song.
	 *
	 * @access public
	 */
	function setMainPlayPause(){
		/*
			Determines what action we should take based on the
			state of the song.
		*/
		if( config.active_song.paused ){
			/*
				The song was paused so we sync visually for the song
				that is playing and we play the song.
			*/
			AmplitudeVisualSync.syncMainPlayPause( 'playing' );

			/*
				If there is an active playlist, then
				we need to sync that playlist's play pause
				button to the state of playing.
			*/
			AmplitudeVisualSync.syncPlaylistPlayPause( config.active_playlist, 'playing' );

			/*
				Sync the song play pause buttons
			*/
			AmplitudeVisualSync.syncSongPlayPause( config.active_playlist, config.active_index, 'playing' );

			/*
				Play the song
			*/
			AmplitudeCore.play();
		}else{
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

			/*
				Pause the song
			*/
			AmplitudeCore.pause();
		}
	}

	/**
	 * Sets the playlist main play pause buttons to the current state of the song.
	 *
	 * @access public
	 * @param {string} playlist The playlist the main play pause button controls
	 */
	function setPlaylistPlayPause( playlist ){
		/*
			The only thing that can change when you click a playlist
			play pause is the playlist. Main play pauses have no change
			in song, song play pauses can change playlist and song.
		*/
		if( AmplitudeCoreHelpers.checkNewPlaylist( playlist ) ){
			AmplitudeCoreHelpers.setActivePlaylist( playlist );

			/*
				Play first song in the playlist since we just
				switched playlists, we start from the first song.

				If the user has shuffle on for the playlist, then
				we go from the first song in the shuffle playlist array.
			*/
			if( config.shuffled_statuses[playlist] ){
				AmplitudeCoreHelpers.changeSong( config.shuffled_playlists[playlist][0].original_index );
			}else{
				AmplitudeCoreHelpers.changeSong( config.playlists[playlist][0] );
			}
		}

		/*
			Determines what action we should take based on the
			state of the song.
		*/
		if( config.active_song.paused ){
			/*
				The song was paused so we sync visually for the song
				that is playing and we play the song.
			*/
			AmplitudeVisualSync.syncMainPlayPause( 'playing' );

			/*
				If there is an active playlist, then
				we need to sync that playlist's play pause
				button to the state of playing.
			*/
			AmplitudeVisualSync.syncPlaylistPlayPause( config.active_playlist, 'playing' );

			/*
				Sync the song play pause buttons
			*/
			AmplitudeVisualSync.syncSongPlayPause( config.active_playlist, config.active_index, 'playing' );

			/*
				Play the song
			*/
			AmplitudeCore.play();
		}else{
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

			/*
				Pause the song
			*/
			AmplitudeCore.pause();
		}
	}

	/**
	 * Sets the song play pause buttons to the current state of the song.
	 *
	 * @access public
	 * @param {string} playlist The playlist the song is a part of
	 * @param {number} songIndex The index of the song being played/paused
	 *
	 */
	function setSongPlayPause( playlist, songIndex ){
		/*
			There can be multiple playlists on the page and there can be
			multiple songs on the page AND there can be songs in multiple
			playlists, so we have some checking to do.
		*/

		/*
			Check to see if the playlist has changed. If it has,
			set the active playlist.
		*/
		if( AmplitudeCoreHelpers.checkNewPlaylist( playlist ) ){
			AmplitudeCoreHelpers.setActivePlaylist( playlist );

			/*
				If there's a new playlist then we reset the
				song since the song could be in 2 playlists,
				but the user selects another playlist.
			*/
			AmplitudeCoreHelpers.changeSong( songIndex );
		}

		/*
			Check to see if the song has changed. If it has,
			set the active song. If it was in a playlist, the
			song wouldn't change here, since we already set the
			song when we checked for a playlist.
		*/
		if( AmplitudeCoreHelpers.checkNewSong( songIndex ) ){
			/*
				The song selected is different, so we change the
				song.
			*/
			AmplitudeCoreHelpers.changeSong( songIndex );
		}

		/*
			Determines what action we should take based on the
			state of the song.
		*/
		if( config.active_song.paused ){
			/*
				The song was paused so we sync visually for the song
				that is playing and we play the song.
			*/
			AmplitudeVisualSync.syncMainPlayPause( 'playing' );

			/*
				If there is an active playlist, then
				we need to sync that playlist's play pause
				button to the state of playing.
			*/
			AmplitudeVisualSync.syncPlaylistPlayPause( config.active_playlist, 'playing' );

			/*
				Sync the song play pause buttons
			*/
			AmplitudeVisualSync.syncSongPlayPause( config.active_playlist, config.active_index, 'playing' );

			/*
				Play the song
			*/
			AmplitudeCore.play();
		}else{
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

			/*
				Pause the song
			*/
			AmplitudeCore.pause();
		}
	}

	/**
	 * Sets the shuffle state for a playlist
	 *
	 * @access public
	 * @param {string} playlist - The playlist being shuffled
	 */
	function setShuffle( playlist ){
		/*
			If the playlist is null, then we are dealing with the global
			shuffle status.
		*/
		if( playlist == null ){
			/*
				If shuffle is on, we toggle it off. If shuffle is off, we
				toggle on.
			*/
			if( config.shuffle_on ){
				config.shuffle_on 	= false;
				config.shuffle_list = {};
			}else{
				config.shuffle_on = true;
				AmplitudeCoreHelpers.shuffleSongs();
			}

			/*
				Visually sync the shuffle statuses
			*/
			AmplitudeVisualSync.syncShuffle( config.shuffle_on );
		}else{
			/*
				If the playlist shuffled is on, we toggle it off. If the
				playlist shuffled is off, we toggle it on.
			*/
			if( config.shuffled_statuses[playlist] ){
				config.shuffled_statuses[playlist] = false;
				config.shuffled_playlists[playlist] = [];
			}else{
				config.shuffled_statuses[playlist] = true;
				AmplitudeCoreHelpers.shufflePlaylistSongs( playlist );
			}

			/*
				Visually sync the playlist shuffle statuses.
			*/
			AmplitudeVisualSync.syncPlaylistShuffle( config.shuffled_statuses[playlist], playlist );
		}
	}

	/**
	 * Sets the next song when next is clicked
	 *
	 * @access public
	 * @param {boolean} [songEnded=false] If the song ended, this is set to true
	 * so we take into effect the repeat setting.
	*/
	function setNext( songEnded = false ){
		/*
			Initializes the next index variable. This will be the
			index of the song that is next.
		*/
		let nextIndex = 0;
        /*
          Ensure we don't loop in the playlist if config.repeat is not true
        */
		let endOfList = false;

		if( config.repeat_song ){
			/*
				If the playlist is shuffled, get the now playing index.
			*/
			if( config.shuffle_on ){
				nextIndex = config.shuffle_active_index;
			}else{
				nextIndex = config.active_index;
			}
		}else{

			/*
				If the shuffle is on, we use the shuffled list of
				songs to determine our next song.
			*/
			if( config.shuffle_on ){
				/*
					If the active shuffle index + 1 is less than the length, then
					we use the next shuffle otherwise we go to the beginning
					of the shuffle list.
				*/
				if( ( parseInt( config.shuffle_active_index ) + 1 ) < config.shuffle_list.length ){
					config.shuffle_active_index = parseInt( config.shuffle_active_index ) + 1;

					/*
						Set the next index to be the index of the song in the shuffle list.
					*/
					nextIndex = config.shuffle_list[ parseInt( config.shuffle_active_index ) ].original_index;
				}else{
					config.shuffle_active_index = 0;
					nextIndex = 0;
					endOfList = true;
				}
			}else{
				/*
					If the active index + 1 is less than the length of the songs, then
					we use the next song otherwise we go to the beginning of the
					song list.
				*/
				if( ( parseInt( config.active_index ) + 1 ) < config.songs.length ){
					config.active_index = parseInt( config.active_index ) + 1;
				}else{
					config.active_index = 0;
					endOfList = true;
				}

				/*
					Sets the next index.
				*/
				nextIndex = config.active_index;
			}
		}

		/*
			Stops the active song.
		*/
		AmplitudeCore.stop();

		/*
			Change the song to the index we need.
		*/
		AmplitudeCoreHelpers.changeSong( nextIndex );


		/*
			If it's the end of the list and repeat is not on, do nothing.
		*/
		if( endOfList && !config.repeat ){

		}else{
			/*
				If the song has ended and repeat is on, play the song.
			*/
	    if( !( songEnded && !config.repeat && endOfList ) ){
	    	AmplitudeCore.play();
	    }
		}

    /*
    	Syncs the main play pause button, playlist play pause button and
    	song play pause.
    */
		AmplitudeVisualSync.syncMainPlayPause( );
		AmplitudeVisualSync.syncSongPlayPause( null, nextIndex);

    /*
    	Call after next callback
    */
    AmplitudeCoreHelpers.runCallback('after_next');

		/*
			If we are repeating the song, call the song repeated callback
		*/
		if( config.repeat_song ){
			AmplitudeCoreHelpers.runCallback('song_repeated');
		}
	}

	/**
	 * Sets the next song in a playlist
	 *
	 * @param {string} playlist - The playlist being shuffled
	 * @param {boolean} [songEnded=false] - If the song ended, this is set to true
	 * so we take into effect the repeat setting.
	 */
	function setNextPlaylist( playlist, songEnded = false ){
		/*
			Initializes the next index
		*/
		let nextIndex = 0;

    /*
      Used to determine whether the playlist looped over
      If it did, only play if repeat is allowed, end otherwise
      @TODO: Different settings for song loop, in-playlist loop and global loop
    */
		let endOfList = false;

		/*
			If we are repeating the song, then we just start the song over.
		*/

		if( config.repeat_song ){
			/*
				If the playlist is shuffled, get the now playing index.
			*/
			if( config.shuffled_statuses[ playlist ] ){
				nextIndex = config.shuffled_playlists[ playlist ][ config.shuffled_active_indexes[ playlist ] ].original_index;
			}else{
				nextIndex = config.active_index;
			}
		}else{
			/*
				If the playlist is shuffled we get the next index of the playlist.
			*/
			if( config.shuffled_statuses[ playlist ] ){
				/*
					Gets the shuffled playlist's active song index.
				*/
				let shuffledPlaylistActiveSongIndex = parseInt( config.shuffled_active_indexes[ playlist ] );

				/*
					If the index + 1 is less than the length of the playlist, we increment
					the next index otherwise we take the first index of 0.
				*/
				if( shuffledPlaylistActiveSongIndex + 1 < config.shuffled_playlists[ playlist ].length ){
					/*
						Set the shuffled playlist active song index.
					*/
					config.shuffled_active_indexes[ playlist ] = shuffledPlaylistActiveSongIndex + 1;
					/*
						Get the index of the song that we will be switching to.
					*/
					nextIndex = config.shuffled_playlists[ playlist ][ config.shuffled_active_indexes[ playlist ] ].original_index;
				}else{
					/*
						Sets the active shuffled playlist active index to 0 and gets the original index of
						the song at the shuffled index of 0.
					*/
					config.shuffled_active_indexes[ playlist ] = 0;
					nextIndex = config.shuffled_playlists[ playlist ][0].original_index;
					endOfList = true;
				}
			}else{
				/*
					Gets the index of the active song within the scope
					of the playlist.
				*/
				let playlistActiveSongIndex = config.playlists[ playlist ].indexOf( parseInt( config.active_index ) );

				/*
					Checks to see if the next index is still less than the length of the playlist.
					If it is, use the next index othwerwise get the first song in the playlist.
				*/
				if( playlistActiveSongIndex + 1 < config.playlists[ playlist ].length ){
					config.active_index = parseInt( config.playlists[ playlist ][ playlistActiveSongIndex + 1 ] );
				}else{
					config.active_index = parseInt( config.playlists[ playlist ][0] );
					endOfList = true;
				}

				/*
					Sets the next inex to the active index in the config.
				*/
				nextIndex = config.active_index;
			}
		}

		/*
			Stops the active song playing.
		*/

		AmplitudeCore.stop();

		/*
			Changes the song to the next song in the playlist.
		*/
		AmplitudeCoreHelpers.changeSong( nextIndex );

		/*
			If it's the end of the song in the playlist, and repeat for
			the playlist is not on, do nothing.
		*/
		if( endOfList && !config.repeat_statuses[playlist] ){

		}else{
			/*
				If the song has ended and repeat is on, play the song.
			*/
	    if( !( songEnded && !config.repeat_statuses[playlist] && endOfList ) ){
				AmplitudeCore.play();
			}
		}

		AmplitudeCoreHelpers.setActivePlaylist( playlist );



    /*
    	Syncs the main play pause button, playlist play pause button and
    	song play pause.
    */
		AmplitudeVisualSync.syncMainPlayPause( );
		AmplitudeVisualSync.syncPlaylistPlayPause(playlist);
		AmplitudeVisualSync.syncSongPlayPause( playlist, nextIndex);

    /*
    	Call after next callback
    */
    AmplitudeCoreHelpers.runCallback('after_next');

		/*
			If we are repeating the song, call the song repeated callback
		*/
		if( config.repeat_song ){
			AmplitudeCoreHelpers.runCallback('song_repeated');
		}
	}

	/**
	 * Sets the previous song
	 * @access public
	 *
	/*--------------------------------------------------------------------------
		Sets the previous song
	--------------------------------------------------------------------------*/
	function setPrev(){
		/*
			Initializes the prev index variable. This will be the
			index of the song that is next.
		*/
		let prevIndex = 0;

		/*
			If the shuffle is on for the individual songs, we get the previous
			song.
		*/
		if( config.shuffle_on ){
			/*
				If the previous index is greater than or equal to 0, we use the active
				index - 1.
			*/
			if( parseInt( config.shuffle_active_index ) - 1 >= 0 ){
				/*
					Sets the new active to be 1 less than the current active index.
				*/
				config.shuffle_active_index = parseInt( config.shuffle_active_index ) - 1;

				/*
					Gets the index of the song in the song array for the new index.
				*/
				prevIndex = config.shuffle_list[ parseInt( config.shuffle_active_index ) ].original_index;
			}else{
				/*
					Set the active index and previous index.
				*/
				config.shuffle_active_index = config.shuffle_list.length - 1;
				prevIndex = config.shuffle_list[ parseInt( config.shuffle_list.length ) - 1 ].original_index;
			}
		}else{
			/*
				If the active index - 1 is greater than or equal to 0, we subtract 1 from the
				active index otherwise we set the active index to the end of the songs array index.
			*/
			if( parseInt( config.active_index ) - 1 >= 0 ){
				config.active_index = parseInt( config.active_index ) - 1;
			}else{
				config.active_index = config.songs.length - 1;
			}

			/*
				Set the previous index.
			*/
			prevIndex = config.active_index;
		}

		/*
			Stops the active song.
		*/
		AmplitudeCore.stop();

		/*
			Change the song to the index we need.
		*/
		AmplitudeCoreHelpers.changeSong( prevIndex );

		/*
			Play the next song.
		*/
		AmplitudeCore.play();

		/*
			Sync the play/pause buttons to the current state of the player.
		*/
		AmplitudeVisualSync.syncMainPlayPause( 'playing' );
		AmplitudeVisualSync.syncSongPlayPause( null, prevIndex, 'playing' );

		/*
			Call after prev callback
		*/
		AmplitudeCoreHelpers.runCallback('after_prev');
	}

	/**
	 * Sets the previous song in a playlist
	 *
	 * @access public
	 * @param {string} playlist 	- The playlist we are setting the previous for.
	 */
	function setPrevPlaylist( playlist ){
		/*
			Initializes the prev index variable. This will be the
			index of the song that is next.
		*/
		let prevIndex = 0;

		/*
			If the shuffle is on for the playlist, we get the previous
			song.
		*/
		if( config.shuffled_statuses[ playlist ] ){
			/*
				Gets the active song index for the shuffled playlist
			*/
			let shuffledPlaylistActiveSongIndex = parseInt( config.shuffled_active_indexes[ playlist ] );

			/*
				If the shuffled song active index is greater than or equal to 0,
				we use the active index - 1.
			*/
			if( shuffledPlaylistActiveSongIndex - 1 >= 0 ){
				/*
					Sets the active index to the active song index - 1
				*/
				config.shuffled_active_indexes[ playlist ] = shuffledPlaylistActiveSongIndex - 1;

				/*
					Gets the index of the song in the song array for the new index.
				*/
				prevIndex = config.shuffled_playlists[ playlist ][ config.shuffled_active_indexes[ playlist ] ].original_index;
			}else{
				/*
					Set the active index and previous index.
				*/
				config.shuffled_active_indexes[ playlist ] = config.shuffled_playlists[ playlist ].length - 1;
				prevIndex = config.shuffled_playlists[ playlist ][ config.shuffled_playlists[ playlist ].length - 1 ].original_index;
			}
		}else{
			/*
				Gets the active song index for the playlist
			*/
			let playlistActiveSongIndex = config.playlists[ playlist ].indexOf( parseInt( config.active_index ) );

			/*
				If the active song index in the playlist - 1 is greater than
				or equal to 0, then we use the active song index - 1.
			*/
			if( playlistActiveSongIndex - 1 >= 0 ){
				config.active_index = parseInt( config.playlists[ playlist ][ playlistActiveSongIndex - 1 ] );
			}else{
				config.active_index = parseInt( config.playlists[ playlist ][ config.playlists[ playlist ].length - 1 ] );
			}

			/*
				Set the previous index to the active index for use later.
			*/
			prevIndex = config.active_index;
		}

		/*
			Stops the active song.
		*/
		AmplitudeCore.stop();

		/*
			Changes the song to the prev song in the playlist.
		*/
		AmplitudeCoreHelpers.changeSong( prevIndex );
		AmplitudeCoreHelpers.setActivePlaylist( playlist );

		/*
			Plays the song
		*/
		AmplitudeCore.play();

		/*
			Syncs the main play pause button, playlist play pause button and
			song play pause.
		*/
		AmplitudeVisualSync.syncMainPlayPause( 'playing' );
		AmplitudeVisualSync.syncPlaylistPlayPause( playlist, 'playing' );
		AmplitudeVisualSync.syncSongPlayPause( playlist, prevIndex, 'playing' );

		/*
			Call after prev callback
		*/
		AmplitudeCoreHelpers.runCallback('after_prev');
	}

	/**
	 * Runs an event on key down
	 *
	 * @access public
	 * @param {number} key 	- The key code the event is bound to.
	 */
	function runKeyEvent( key ){
		/*
			Checks to see if the user bound an event to the code pressed.
		*/
		if( config.bindings[key] != undefined ){
			/*
				Determine which event should be run if bound.
			*/
			switch( config.bindings[key] ){
				/*
					Fires a play pause event.
				*/
				case 'play_pause':
					setSongPlayPause( config.active_playlist, config.active_index );
				break;

				/*
					Fires a next event.
				*/
				case 'next':
					/*
						Check to see if the current state of the player
						is in playlist mode or not playlist mode.
					*/
					if( config.active_playlist == ''
						|| config.active_playlist == null ){
							setNext();
					}else{
						setNextPlaylist( config.active_playlist );
					}
				break;

				/*
					Fires a previous event.
				*/
				case 'prev':
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
				break;

				/*
					Fires a stop event.
				*/
				case 'stop':
					/*
						Sets all of the play/pause buttons to pause
					*/
					AmplitudeVisualSync.setPlayPauseButtonsToPause();

					/*
						Stops the active song.
					*/
					AmplitudeCore.stop();
				break;

				/*
					Fires a shuffle event.
				*/
				case 'shuffle':
					/*
						Check to see if the current playlist has been set
						or null and set the previous song.
					*/
					if( config.active_playlist == ''
						|| config.active_playlist == null ){
							AmplitudesEventHelpers.setShuffle( null );
					}else{
						AmplitudeEvenstHelpers.setShuffle( config.active_playlist );
					}
				break;

				/*
					Fires a repeat event.
				*/
				case 'repeat':
					/*
						Sets repeat to the opposite of what it was set to
					*/
					AmplitudeEventsHelpers.setRepeat( !config.repeat );

					/*
						Visually sync repeat
					*/
					AmplitudeVisualSync.syncRepeat();
				break;
			}
		}
	}

	/*
		Return the publically scoped functions
	*/
	return {
		computeCurrentTimes: computeCurrentTimes,
		computeSongDuration: computeSongDuration,
		computeSongCompletionPercentage: computeSongCompletionPercentage,
		setPlaybackSpeed: setPlaybackSpeed,
		setRepeat: setRepeat,
		setRepeatSong: setRepeatSong,
		setMainPlayPause: setMainPlayPause,
		setPlaylistPlayPause: setPlaylistPlayPause,
		setSongPlayPause: setSongPlayPause,
		setShuffle: setShuffle,
		setNext: setNext,
		setNextPlaylist: setNextPlaylist,
		setPrev: setPrev,
		setPrevPlaylist: setPrevPlaylist,
		runKeyEvent: runKeyEvent
	}
})();

export default AmplitudeEventsHelpers
