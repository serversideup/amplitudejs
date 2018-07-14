/**
 * Imports the config module
 * @module config
 */
import config from '../config.js';

/**
 * AmplitudeJS Core Module
 * @module core/AmplitudeCore
 */
import AmplitudeCore from '../core/core.js';

/**
 * AmplitudeJS Core Helpers
 * @module core/AmplitudeHelpers
 */
import AmplitudeHelpers from '../core/helpers.js';

/**
 * AmplitudeJS Events
 * @module events/AmplitudeEvents
 */
import AmplitudeEvents from '../events/events.js';

/**
 * AmplitudeJS Soundcloud
 * @module soundcloud/AmplitudeSoundcloud
 */
import AmplitudeSoundcloud from '../soundcloud/soundcloud.js';

/**
 * AmplitudeJS Visual Sync
 * @module visual/AmplitudeVisualSync
*/
import AmplitudeVisualSync from '../visual/visual.js';

/**
 * AmplitudeJS Initializer Module. Helps with the handling of all of the
 * initialization for AmplitudeJS.
 *
 * @module init/AmplitudeInitializer
 */
let AmplitudeInitializer = (function () {

	/**
   * The main init function.  The user will call this through
	 * Amplitude.init({}) and pass in their settings.
	 *
	 * Public Accessor: Amplitude.init( user_config_json )
	 * @access public
   * @param {object} userConfig - A JSON object of user defined values that help configure and initialize AmplitudeJS.
   */
	function initialize( userConfig ){
		let ready = false;

		/*
			Reset the config on init so we have a clean slate. This is if the
			user has to re-init.
		*/
		AmplitudeHelpers.resetConfig();

		/*
			Initialize event handlers on init. This will clear any old
			event handlers on the amplitude element and re-bind what is
			necessary.
		*/
		AmplitudeEvents.initializeEvents();

		/*
			Initializes debugging right away so we can use it for the rest
			of the configuration.
		*/
		config.debug = ( userConfig.debug != undefined ? userConfig.debug : false );

		/*
			Checks to see if the user has songs defined.
		*/
		if( userConfig.songs ){
			/*
				Checks to see if the user has some songs in the songs array.
			*/
			if( userConfig.songs.length != 0 ){
				/*
					Copies over the user defined songs. and prepares
					Amplitude for the rest of the configuration.
				*/
				config.songs = userConfig.songs;
				/*
					Flag amplitude as ready.
				*/
				ready = true;
			}else{
				AmplitudeHelpers.writeDebugMessage( 'Please add some songs, to your songs object!' );
			}
		}else{
			AmplitudeHelpers.writeDebugMessage( 'Please provide a songs object for AmplitudeJS to run!' );
		}

		/**
		 * Initializes the audio context. In this method it checks to see if the
		 * user wants to use visualizations or not before proceeding.
		 * @todo MAKE HANDLED BY AMPLITUDE FX.
		 */
		//privateHelpInitializeAudioContext();

		/*
			Checks if the user has any playlists defined. If they do
			we have to initialize the functionality for the playlists.
		*/
		if( userConfig.playlists && countPlaylists( userConfig.playlists ) > 0 ){
			/*
				Copy the playlists over to Amplitude
			*/
			config.playlists = userConfig.playlists;

			/*
				Initialize default live settings
			*/
			initializeDefaultLiveSettings();

			/*
				Check to see if the user has valid song indexes in their playlist.
			*/
			checkValidSongsInPlaylists();

			/*
				Initialize the shuffle status of the playlists.
			*/
			initializePlaylistShuffleStatuses();

			/*
				Initialize the repeat status for the playlits.
			*/
			initializePlaylistsRepeatStatuses();

			/*
				Initialize temporary place holders for shuffle lists.
			*/
			initializePlaylistShuffleLists();

			/*
				Initializes the active shuffled indexes for shuffled playlists.
			*/
			initializePlaylistShuffleIndexes();

			/*
				Initializes the first song in the playlist
			*/
			initializeFirstSongInPlaylistMetaData();
		}

		/*
			When the preliminary config is ready, we are ready to proceed.
		*/
		if( ready ){
			/*
				Copies over the soundcloud information to the global config
				which will determine where we go from there.
			*/
			config.soundcloud_client = ( userConfig.soundcloud_client != undefined ? userConfig.soundcloud_client : '' );

			/*
				Checks if we want to use the art loaded from soundcloud.
			*/
			config.soundcloud_use_art = ( userConfig.soundcloud_use_art != undefined ? userConfig.soundcloud_use_art : '' );

			/*
				If the user provides a soundcloud client then we assume that
				there are URLs in their songs that will reference SoundcCloud.
				We then copy over the user config they provided to the
				temp_user_config so we don't mess up the global or their configs
				and load the soundcloud information.
			*/
			let tempUserConfig = {};

			if( config.soundcloud_client != '' ){
				tempUserConfig = userConfig;

				/*
					Load up SoundCloud for use with AmplitudeJS.
				*/
				AmplitudeSoundcloud.loadSoundCloud( tempUserConfig );
			}else{
				/*
					The user is not using Soundcloud with Amplitude at this point
					so we just finish the configuration with the users's preferences.
				*/
				setConfig( userConfig );
			}
		}

		/*
			Debug out what was initialized with AmplitudeJS.
		*/
		AmplitudeHelpers.writeDebugMessage( 'Initialized With: ');
		AmplitudeHelpers.writeDebugMessage( config );
	}

	/**
	 * Rebinds all of the elements in the display.
	 *
	 * Public Accessor: Amplitude.rebindDisplay()
	 * @access public
	 */
	function rebindDisplay(){
		AmplitudeEvents.initializeEvents();
		AmplitudeVisualSync.displaySongMetadata();
	}

	/**
	 * Finishes the initalization of the config. Takes all of the user defined
	 * parameters and makes sure they override the defaults. The important
	 * config information is assigned in the publicInit() function.
	 *
	 * This function can be called from 2 different locations:
	 * 	1. Right away on init after the important settings are defined.
	 *
	 * 	2. After all of the Soundcloud URLs are resolved properly and
	 *	 	soundcloud is configured.  We will need the proper URLs from Soundcloud
	 * 		to stream through Amplitude so we get those right away before we
	 * 		set the information and the active song
	 *
	 * @access public
	 * @param {object} userConfig - A JSON object of user defined values that help configure and initialize AmplitudeJS.
	 */
	function setConfig( userConfig ){
		/*
			Check to see if the user entered a start song
		*/
		if( userConfig.start_song != undefined ){
			/*
				Ensure what has been entered is an integer.
			*/
			if( AmplitudeHelpers.isInt( userConfig.start_song ) ){
				AmplitudeHelpers.changeSong( userConfig.start_song );
			}else{
				AmplitudeHelpers.writeDebugMessage("You must enter an integer index for the start song.");
			}
		}else{
			AmplitudeHelpers.changeSong( 0 );
		}

		/*
			Initialize a sh
		*/
		if( userConfig.shuffle_on != undefined && userConfig.shuffle_on ){
			config.shuffle_on = true;
			AmplitudeHelpers.shuffleSongs();

			/*
				Visually sync the shuffle statuses
			*/
			AmplitudeVisualSync.syncShuffle( config.shuffle_on );

			AmplitudeHelpers.changeSong( config.shuffle_list[0].original_index );
		}

		/*
			Allows the user to set whether they want to continue to the next song
			when the current song finishes or not. In any scenario that's not a playlist,
			contining to the next song may not be desired.
		*/
		config.continue_next = ( userConfig.continue_next != undefined ?
														 userConfig.continue_next :
														 true );

		/*
			If the user defined a playback speed, we copy over their
			preference here, otherwise we default to normal playback
			speed of 1.0.
		*/
		config.playback_speed = ( userConfig.playback_speed != undefined ?
								  						userConfig.playback_speed :
								  						1.0 );

		/*
			Sets the audio playback speed.
		*/
		AmplitudeCore.setPlaybackSpeed( config.playback_speed );

		/*
			If the user wants the song to be pre-loaded for instant
			playback, they set it to true. By default it's set to just
			load the metadata.
		*/
		config.active_song.preload = ( userConfig.preload != undefined ?
									   							 userConfig.preload :
									   					 		 "auto" );

		/*
			Initializes the user defined callbacks. This should be a JSON
			object that contains a key->value store of the callback name
			and the name of the function the user needs to call.
		*/
		config.callbacks = ( userConfig.callbacks != undefined ?
							 					 userConfig.callbacks :
							 				 	 {} );

		/*
			Initializes the user defined key bindings. This should be a JSON
			object that contains a key->value store of the key event number
			pressed and the method to be run.
		*/
		config.bindings = ( userConfig.bindings != undefined ?
												userConfig.bindings :
												{} );

		/*
			The user can define a starting volume in a range of 0-100 with
			0 being muted and 100 being the loudest. After the config is set
			Amplitude sets the active song's volume to the volume defined
			by the user.
		*/
		config.volume = ( userConfig.volume != undefined ?
			 			  				userConfig.volume :
			 			  				50 );

		/*
			The user can set the volume increment and decrement values between 1 and 100
			for when the volume up or down button is pressed.  The default is an increase
			or decrease of 5.
		*/
		config.volume_increment = ( userConfig.volume_increment != undefined ?
																userConfig.volume_increment :
																5 );

		config.volume_decrement = ( userConfig.volume_decrement != undefined ?
																userConfig.volume_decrement :
																5 );

		/*
			Set the volume to what is defined in the config. The user can define this,
			so we should set it up that way.
		*/
		AmplitudeCore.setVolume( config.volume );

		/*
			Since the user can define a start volume, we want our volume
			sliders to sync with the user defined start value.
		*/
		AmplitudeVisualSync.syncVolumeSliders();

		/*
			If the user defines default album art, this image will display if the active
			song doesn't have album art defined.
		*/
		if( userConfig.default_album_art != undefined ){
			config.default_album_art = userConfig.default_album_art;
		}else{
			config.default_album_art = '';
		}

		/*
			Syncs all of the visual time elements to 00.
		*/
		AmplitudeVisualSync.resetTimes();

		/*
			Sets all of the play pause buttons to pause.
		*/
		AmplitudeVisualSync.setPlayPauseButtonsToPause();

		/*
			Sets the meta data for the songs automatically.
		*/
		AmplitudeVisualSync.syncSongsMetaData();

		/*
			If the user has autoplay enabled, then begin playing the song. Everything should
			be configured for this to be ready to play.
		*/
		if( userConfig.autoplay ){
			/*
				If the user hasn't set a starting playlist, set it to null otherwise initialize to the
				starting playlist selected by the user.
			*/
			if( userConfig.starting_playlist == '' ){
				config.active_playlist = null;
			}else{
				config.active_playlist = userConfig.starting_playlist;
			}

			/*
				Sync the main and song play pause buttons.
			*/
			AmplitudeVisualSync.syncMainPlayPause( 'playing' );
			AmplitudeVisualSync.syncSongPlayPause( config.active_playlist, 0, 'playing' );

			/*
				Start playing the song
			*/
			AmplitudeCore.play();
		}

		/*
			If the user has selected a starting playlist, we need to set the starting playlist
			and sync the visuals
		*/
		if( userConfig.starting_playlist != undefined && userConfig.starting_playlist != '' ){
			/*
				Set the active playlist to the starting playlist by the user
			*/
			config.active_playlist = userConfig.starting_playlist;

			/*
				Check if the user defined a song to start with in the playlist.
			*/
			if( userConfig.starting_playlist_song != undefined && userConfig.starting_playlist_song != '' ){
				/*
					Ensure the song is a valid index.
				*/
				if( typeof userConfig.playlists[ userConfig.starting_playlist ][ parseInt( userConfig.starting_playlist_song ) ] != undefined ){
					/*
						Set the player to the song defined by the user.
					*/
					AmplitudeHelpers.changeSong( userConfig.playlists[ userConfig.starting_playlist ][ parseInt( userConfig.starting_playlist_song ) ] );
				}else{
					/*
						Set the player to the first song in the playlist
					*/
					AmplitudeHelpers.changeSong( userConfig.playlists[ userConfig.starting_playlist ][0] );
					/*
						Debug that the song index doesn't exist
					*/
					AmplitudeHelpers.writeDebugMessage( 'The index of '+userConfig.starting_playlist_song+' does not exist in the playlist '+userConfig.starting_playlist );
				}
			}else{
				/*
					Set the player to the first song in the playlist
				*/
				AmplitudeHelpers.changeSong( userConfig.playlists[ userConfig.starting_playlist ][0] );
			}

			/*
				Sync the main and song play pause buttons.
			*/
			AmplitudeVisualSync.syncMainPlayPause( 'paused' );
			AmplitudeVisualSync.syncSongPlayPause( config.active_playlist, 0, 'paused' );
		}

		/*
			Run after init callback
		*/
		AmplitudeHelpers.runCallback('after_init');
	}

	/**
	 * Counts the number of playlists the user has configured. This ensures
	 * that the user has at least 1 playlist so we can validate the songs
	 * defined in the playlist are correct and they didn't enter an invalid
	 * ID.
	 *
	 * @access private
	 * @param {object} playlists 	-
	 */
	function countPlaylists( playlists ){
		/*
			Initialize the placeholders to iterate through the playlists
			and find out how many we have to account for.
		*/
		let size = 0, key;

		/*
			Iterate over playlists and if the user has the playlist defined,
			increment the size of playlists.
		*/
		for ( key in playlists ) {
			if( playlists.hasOwnProperty( key) ){
				size++;
			}
		}

		/*
			Debug how many playlists are in the config.
		*/
		AmplitudeHelpers.writeDebugMessage( 'You have '+size+' playlist(s) in your config' );

		/*
			Return the number of playlists in the config.
		*/
		return size;
	}

	/**
	* Ensures the indexes in the playlists are valid indexes. The song has
	* to exist in the Amplitude config to be played correctly.
	*
	* @access private
	*/
	function checkValidSongsInPlaylists(){
		/*
			Iterate over all of the config's playlists
		*/
		for( let key in config.playlists ){
			/*
				Checks if the playlist key is accurate.
			*/
			if( config.playlists.hasOwnProperty( key) ){
				/*
					Checks if the playlist has songs.
				*/
				if( config.playlists[key].songs ){
					/*
						Iterate over all of the songs in the playlist
					*/
					for( let i = 0; i < config.playlists[key].songs.length; i++ ){
						/*
							Check to see if the index for the song in the playlist
							exists in the songs config.
						*/
						if( !config.songs[ config.playlists[key].songs[i] ] ){
							AmplitudeHelpers.writeDebugMessage('The song index: '+config.playlists[key].songs[i]+' in playlist with key: '+key+' is not defined in your songs array!');
						}
					}
				}
			}
		}
	}

	/**
	 * Initializes the shuffle statuses for each of the playlists. These will
	 * be referenced when we shuffle individual playlists.
	 *
	 * @access private
	 */
	function initializePlaylistShuffleStatuses(){
		/*
			Iterate over all of the playlists the user defined adding
			the playlist key to the shuffled playlist array and creating
			and empty object to house the statuses.
		*/
		for ( let key in config.playlists ) {
			config.shuffled_statuses[ key ] = false;
		}
	}

	/**
	 * Initializes the repeat statuses for each of the playlists.  These will
	 * be referenced when we repeat individual playlits.
	 *
	 * @access private
	 */
	 function initializePlaylistsRepeatStatuses(){
		 /*
 			Iterate over all of the playlists the user defined adding
 			the playlist key to the repeated playlist array and creating
 			and empty object to house the statuses.
 		*/
 		for ( let key in config.playlists ) {
 			config.repeat_statuses[ key ] = false;
 		}
	 }

	/**
	 * Initializes the shuffled playlist placeholders. These will be set for
	 * playlists that are shuffled and contain the shuffled songs.
	 *
	 * @access private
 	 */
	function initializePlaylistShuffleLists(){
		/*
			Iterate over all of the playlists the user defined adding
			the playlist key to the shuffled playlists array and creating
			and empty object to house the shuffled playlists
		*/
		for ( let key in config.playlists ) {
			config.shuffled_playlists[ key ] = [];
		}
	}

	/**
	 * Initializes the shuffled playlist indexes array. These will be set for
	 * playlists that are shuffled and contain the active shuffled index.
	 *
	 * @access private
	 */
	function initializePlaylistShuffleIndexes(){
		/*
			Iterates over all of the playlists adding a key
			to the shuffled_active_indexes array that contains
			the active shuffled index.
		*/
		for( let key in config.playlists ) {
			config.shuffled_active_indexes[ key ] = 0;
		}
	}

	/**
	 * Intializes the display for the first song in the playlist meta data.
	 *
	 * @access private
	 */
	function initializeFirstSongInPlaylistMetaData(){
		/*
			Iterates over all of the playlists setting the meta data for the
			first song.
		*/
		for( let key in config.playlists ){
			AmplitudeVisualSync.setFirstSongInPlaylist( config.songs[ config.playlists[ key ][0] ] , key );
		}
	}

	/**
	 * Intializes the default live settings for all of the songs.
	 *
	 * @access priavet
	 */
	function initializeDefaultLiveSettings(){
		for( let i = 0; i < config.songs.length; i++ ){
			if( config.songs[i].live == undefined ){
				config.songs[i].live = false;
			}
		}
	}

	/*
		Returns the publicly accessible methods
	*/
	return {
		initialize: initialize,
		setConfig: setConfig,
		rebindDisplay: rebindDisplay
	}
})();

export default AmplitudeInitializer
