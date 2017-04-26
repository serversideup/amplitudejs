var config = require('../config.js');

import AmplitudeCore from '../core/core.js';
import AmplitudeHelpers from '../core/helpers.js';
import AmplitudeEvents from '../events/events.js';
import AmplitudeSoundcloud from '../soundcloud/soundcloud.js';
import AmplitudeVisualSync from '../visual/visual.js';

/*
|----------------------------------------------------------------------------------------------------
| INITIALIZER FOR AMPLITUDE JS
|----------------------------------------------------------------------------------------------------
| These methods initialize AmplitudeJS and make sure everything is ready to run
|
| METHODS
|	initialize( userConfig )
|	countPlaylists( playlists )
|	checkValidSongsInPlaylists()
|	playlistShuffleStatuses()
|	playlistShuffleLists()
|	eventHandlers()
*/
var AmplitudeInitializer = (function () {
	
	/*--------------------------------------------------------------------------
		The main init function.  The user will call this through 
		Amplitude.init({}) and pass in their settings.
		
		Public Accessor: Amplitude.init( user_config_json );

	 	@param userConfig A JSON object of user defined values that help 
	 	configure and initialize AmplitudeJS.
	--------------------------------------------------------------------------*/
	function initialize( userConfig ){
		var ready = false;
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
			In Amplitude there are 2 different types of song time visualizations.
			1st is the HTML5 range element. The 2nd is a div that gets filled in
			proportionately to the amount of time elapsed in the song. The user 
			can style this and represent the amount played visually. This
			initializes all of the 2nd type by inserting an element into each
			of the defined divs that will expand the width according to song
			played percentage.
		*/
		initializeSongTimeVisualizations();
		
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

		/*
			Initializes the audio context. In this method it checks to see if the
			user wants to use visualizations or not before proceeding.
			AMPFX-TODO: MAKE HANDLED BY AMPLITUDE FX.
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

	/*--------------------------------------------------------------------------
		Rebinds all of the elements in the display
	--------------------------------------------------------------------------*/
	function rebindDisplay(){
		AmplitudeEvents.initializeEvents();
		initializeSongTimeVisualizations();
	}

	/*--------------------------------------------------------------------------
		Finishes the initalization of the config. Takes all of the user defined
		parameters and makes sure they override the defaults. The important
		config information is assigned in the publicInit() function.

		This function can be called from 2 different locations:
			1. Right away on init after the important settings are defined.

			2. After all of the Soundcloud URLs are resolved properly and
			soundcloud is configured.  We will need the proper URLs from Soundcloud
			to stream through Amplitude so we get those right away before we
			set the information and the active song

		@param JSON userConfig The config provided by the user.
	--------------------------------------------------------------------------*/
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
			If the user has autoplay enabled, then begin playing the song. Everything should
			be configured for this to be ready to play.
		*/
		if( userConfig.autoplay ){
			config.active_playlist = null;
			/*
				Sync the main and song play pause buttons.
			*/
			AmplitudeVisualSync.syncMainPlayPause( 'playing' );
			AmplitudeVisualSync.syncSongPlayPause( null, 0, 'playing' );

			/*
				Start playing the song
			*/
			AmplitudeCore.play();
		}

		/*
			Run after init callback
		*/
		AmplitudeHelpers.runCallback('after_init');	
	}

	/*--------------------------------------------------------------------------
		Sets up all of the song time visualizations.  This is the only time
		that AmplitudeJS will add an element to the page. AmplitudeJS will
		add an element inside of the song time visualization element that will
		expand proportionally to the amount of time elapsed on the active 
		audio, thus visualizing the song time.  This element is NOT user
		interactive.  To have the user scrub the time, they will have to 
		style and implement a song time slider with an HTML 5 Range Element.
	--------------------------------------------------------------------------*/
	function initializeSongTimeVisualizations(){
		/*
			Sets up song time visualizations
		*/
		var song_time_visualizations = document.getElementsByClassName("amplitude-song-time-visualization");

		/*
			Iterates through all of the amplitude-song-time-visualization
			elements adding a new div with a class of
			'amplitude-song-time-visualization-status' that will expand
			inside of the 'amplitude-song-time-visualization' element.
		*/
		for( var i = 0; i < song_time_visualizations.length; i++ ){
			/*
				Creates new element
			*/
			var status = document.createElement('div');

			/*
				Adds class and attributes
			*/
			status.classList.add('amplitude-song-time-visualization-status');
			status.setAttribute( 'style', 'width: 0px' );

			/*
				Clears the inner HTML so we don't get two status divs.
			*/
			song_time_visualizations[i].innerHTML = '';

			/*
				Appends the element as a child element.
			*/
			song_time_visualizations[i].appendChild( status );
		}
	}

	/*--------------------------------------------------------------------------
		Counts the number of playlists the user has configured. This ensures
		that the user has at least 1 playlist so we can validate the songs
		defined in the playlist are correct and they didn't enter an invalid
		ID.
	--------------------------------------------------------------------------*/
	function countPlaylists( playlists ){
		/*
			Initialize the placeholders to iterate through the playlists
			and find out how many we have to account for.
		*/
		var size = 0, key;
		
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

	/*--------------------------------------------------------------------------
		Ensures the indexes in the playlists are valid indexes. The song has
		to exist in the Amplitude config to be played correctly.
	--------------------------------------------------------------------------*/
	function checkValidSongsInPlaylists(){
		/*
			Iterate over all of the config's playlists
		*/
		for( var key in config.playlists ){
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
					for( var i = 0; i < config.playlists[key].songs.length; i++ ){
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

	/*--------------------------------------------------------------------------
		Initializes the shuffle statuses for each of the playlists. These will
		be referenced when we shuffle individual playlists.
	--------------------------------------------------------------------------*/
	function initializePlaylistShuffleStatuses(){
		/*
			Iterate over all of the playlists the user defined adding
			the playlist key to the shuffled playlist array and creating
			and empty object to house the statuses.
		*/
		for ( var key in config.playlists ) {
			config.shuffled_statuses[ key ] = false;
		}
	}

	/*--------------------------------------------------------------------------
		Initializes the shuffled playlist placeholders. These will be set for
		playlists that are shuffled and contain the shuffled songs.
	--------------------------------------------------------------------------*/
	function initializePlaylistShuffleLists(){
		/*
			Iterate over all of the playlists the user defined adding
			the playlist key to the shuffled playlists array and creating
			and empty object to house the shuffled playlists
		*/
		for ( var key in config.playlists ) {
			config.shuffled_playlists[ key ] = [];
		}
	}

	/*--------------------------------------------------------------------------
		Initializes the shuffled playlist indexes array. These will be set for
		playlists that are shuffled and contain the active shuffled index.
	--------------------------------------------------------------------------*/
	function initializePlaylistShuffleIndexes(){
		/*
			Iterates over all of the playlists adding a key
			to the shuffled_active_indexes array that contains
			the active shuffled index.
		*/
		for( var key in config.playlists ) {
			config.shuffled_active_indexes[ key ] = 0;
		}
	}

	/*--------------------------------------------------------------------------
		Intializes the display for the first song in the playlist meta data.
	--------------------------------------------------------------------------*/
	function initializeFirstSongInPlaylistMetaData(){
		/*
			Iterates over all of the playlists setting the meta data for the
			first song.
		*/
		for( var key in config.playlists ){
			AmplitudeVisualSync.setFirstSongInPlaylist( config.songs[ config.playlists[ key ][0] ] , key );
		}
	}

	/*--------------------------------------------------------------------------
		Intializes the default live settings for all of the songs.
	--------------------------------------------------------------------------*/
	function initializeDefaultLiveSettings(){
		for( var i = 0; i < config.songs.length; i++ ){
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