/*
	Amplitude.js
	Version: 2.4
*/
var Amplitude = (function () {
	
/*
|----------------------------------------------------------------------------------------------------
| PUBLIC METHODS
|----------------------------------------------------------------------------------------------------
| These methods are available to the developer.  They allow the developer
| to change certain attributes if needed and configure the library.
|
| Method Prefix: public
|
| METHODS
|	publicInit( user_config )
|	publicSetDebug( state )
|	publicGetActiveSongMetadata()
|	publicRegisterVisualization( visualization, preferences )
|	publicChangeActiveVisualization( visualization )
|	publicVisualizationCapable()
|	publicGetSongByIndex( index )
|	publicAddSong( song )
|	publicPlayNow( song )
|	publicPlay()
|	publicPause()
|	publicGetAnalyser()	
|	
*/
	/*--------------------------------------------------------------------------
		The main init function.  The user will call this through 
		Amplitude.init({}) and pass in their settings.
		
		Public Accessor: Amplitude.init( user_config_json );

	 	@param user_config A JSON object of user defined values that help 
	 	configure and initialize AmplitudeJS.
	--------------------------------------------------------------------------*/
	function publicInit( user_config ){
		var ready = false;

		/*
			Reset the config on init so we have a clean slate. This is if the
			user has to re-init.
		*/
		privateHelpResetConfig();

		/*
			Initialize event handlers on init. This will clear any old
			event handlers on the amplitude element and re-bind what is
			necessary.
		*/
		privateHelpInitializeEventHandlers();

		/*
			In Amplitude there are 2 different types of song time visualizations.
			1st is the HTML5 range element. The 2nd is a div that gets filled in
			proportionately to the amount of time elapsed in the song. The user 
			can style this and represent the amount played visually. This
			initializes all of the 2nd type by inserting an element into each
			of the defined divs that will expand the width according to song
			played percentage.
		*/
		privateHelpInitializeSongTimeVisualizations();
		
		/*
			Initializes debugging right away so we can use it for the rest
			of the configuration.
		*/
		config.debug = ( user_config.debug != undefined ? user_config.debug : false );
		
		/*
			Checks to see if the user has songs defined.
		*/
		if( user_config.songs ){
			/*
				Checks to see if the user has some songs in the songs array.
			*/
			if( user_config.songs.length != 0 ){
				/*
					Copies over the user defined songs. and prepares
					Amplitude for the rest of the configuration.
				*/
				config.songs = user_config.songs;
				/*
					Flag amplitude as ready.
				*/
				ready = true;
			}else{
				privateWriteDebugMessage( 'Please add some songs, to your songs object!' );
			}
		}else{
			privateWriteDebugMessage( 'Please provide a songs object for AmplitudeJS to run!' );
		}

		/*
			To use visualizations with Amplitude, the user will have to explicitly state
			that their player uses visualizations.  Reason being is that the AudioContext
			and other filters can really mess up functionality if the user is not prepared
			to have them operate on their audio element.  If set to true, then the
			AudioContext and the other necessary elements will be bound for the Web Audio API
			to handle the visualization processing.
		*/
		config.use_visualizations = ( user_config.use_visualizations != undefined ? user_config.use_visualizations : false );
		
		/*
			Initializes the audio context. In this method it checks to see if the
			user wants to use visualizations or not before proceeding.
		*/
		privateHelpInitializeAudioContext();
		
		/*
			Checks if the user has any playlists defined. If they do
			we have to initialize the functionality for the playlists.
		*/
		if( user_config.playlists && privateHelpInitializeCountPlaylists( user_config.playlists ) > 0 ){
			/*
				Copy the playlists over to Amplitude
			*/
			config.playlists = user_config.playlists;
			
			/*
				Check to see if the user has valid song indexes in their playlist.
			*/
			privateHelpInitializeCheckValidSongsInPlaylists();

			/*
				Initialize the shuffle status of the playlists.
			*/
			privateHelpInitializePlaylistShuffleStatuses();
			
			/*
				Initialize temporary place holders for shuffle lists.
			*/
			privateHelpInitializePlaylistShuffleLists();
		}
		
		/*
			When the preliminary config is ready, we are ready to proceed.
		*/
		if( ready ){
			/*
				Copies over the soundcloud information to the global config
				which will determine where we go from there.
			*/
			config.soundcloud_client = ( user_config.soundcloud_client != undefined ? user_config.soundcloud_client : '' );
			
			/*
				Checks if we want to use the art loaded from soundcloud.
			*/
			config.soundcloud_use_art = ( user_config.soundcloud_use_art != undefined ? user_config.soundcloud_use_art : '' );
			
			/*
				If the user provides a soundcloud client then we assume that
				there are URLs in their songs that will reference SoundcCloud.
				We then copy over the user config they provided to the 
				temp_user_config so we don't mess up the global or their configs
				and load the soundcloud information.
			*/
			if( config.soundcloud_client != '' ){
				temp_user_config = user_config;

				/*
					Load up SoundCloud for use with AmplitudeJS.
				*/
				privateSoundCloudLoad();
			}else{
				/*
					The user is not using Soundcloud with Amplitude at this point
					so we just finish the configuration with the users's preferences.
				*/
				privateSetConfig( user_config );
			}
		}

		/*
			Debug out what was initialized with AmplitudeJS.
		*/
		privateWriteDebugMessage( 'Initialized With: ');
		privateWriteDebugMessage( config );
	}

	/*--------------------------------------------------------------------------
		Registers a visualization and sets that visualization's 
		preferences. When creating a visualization, you can set certain
		preferences that the user can overwrite similar to Amplitude.

		Public Accessor: Amplitude.registerVisualization( visualization, preferences )

		@param visualzation A visualization object that gets registered
		with Amplitude

		@param preferences A JSON object of preferences relating to the
		visualization
	--------------------------------------------------------------------------*/
	function publicRegisterVisualization( visualization, preferences ){
		/*
			Adds the visualization to the global config so it knows
			it can be used when playing songs.

			getID is a public function for getting a visualization's id.
			It becomes the key to access the visualization.
		*/
		config.visualizations[ visualization.getID ] = visualization;
		
		/*
			If defined, set the visualization preferences.
			setPreferences is a public function for connecting
			to a user defined visualization.
		*/
		if( preferences != undefined ){
			visualization.setPreferences( preferences );
		}
	}

	/*--------------------------------------------------------------------------
		Changes the active visualization. Could be called from a 
		user defined dropdown or whatever way the user wants to change a
		visualization dynamically.
		
		Public Accessor: Amplitude.changeVisualization( visualization )

		@param string visualization The name of the visualization
		that should be used.
	--------------------------------------------------------------------------*/
	function publicChangeActiveVisualization( visualization ){
		/*
			First we stop the active visualization. If the visualization
			is set up correctly, it should halt all callbacks, and clear
			the amplitude-visualization element.
		*/
		privateStopVisualization();

		/*
			Next we set the active visualization in the config.
		*/
		config.active_visualization = visualization;

		/*
			We then start the visualization hooks again.  This should
			insert itself into the amplitude-visualization element
			and bind the proper hooks.
		*/
		privateStartVisualization();
	}

	/*--------------------------------------------------------------------------
		Checks to see if the current browser is capable of running
		visualizations. If the AudioContext is available, then the browser
		can play the visualization.
		
		Public Accessor: Amplitude.visualizationCapable()
		
		@returns BOOL true if the browser can play the visualization and false
		if the browser cannot.
	--------------------------------------------------------------------------*/
	function publicVisualizationCapable(){
		if ( !window.AudioContext ) {
			return false;
		}else{
			return true;
		}
	}

	/*--------------------------------------------------------------------------
		When you pass a song object it plays that song right awawy.  It sets
		the active song in the config to the song you pass in and synchronizes
		the visuals.
		
		Public Accessor: Amplitude.playNow( song_json )

		@param song JSON representation of a song.
	--------------------------------------------------------------------------*/
	function publicPlayNow( song ){
		/*
			Makes sure the song object has a URL associated with it
			or there will be nothing to play.
		*/
		if( song.url ){
			config.active_song.src 	= song.url;
			config.active_metadata 	= song;
			config.active_album 	= song.album;
		}else{
			privateWriteDebugMessage('The song needs to have a URL!');
		}
		
		/*
			Sets the main song control status visual
		*/
		privateChangePlayPauseState('playing');

		/*
			Calls the song change method that configures everything necessary for
			Amplitude when the song changes.
		*/
		privateAfterSongChanges();
	}

	/*--------------------------------------------------------------------------
		Returns the analyser for visualization plugins to use.

		Public Accessor: Amplitude.analyser;
	--------------------------------------------------------------------------*/
	function publicGetAnalyser(){
		return config.analyser;
	}

/*
|----------------------------------------------------------------------------------------------------
| INITIALIZATION HELPER METHODS
|----------------------------------------------------------------------------------------------------
| These methods are called on initialization and configure the base
| functionality for Amplitude. They init event handlers and set up the
| song time visualizations, etc. These are helpers for the main initialization
|
| Method Prefix: privateHelpInitialize
|
| METHODS
|	privateHelpInitializeAudioContext( useVisualizations )
|	privateHelpInitializeCountPlaylists( playlists )
|	privateHelpInitializeCheckValidSongsInPlaylists()
|	privateHelpInitializePlaylistShuffleStatuses()
|	privateHelpInitializePlaylistShuffleLists()
|	privateHelpInitializeEventHandlers()
*/
	/*--------------------------------------------------------------------------
		Initializes the audio context if the user wants to use visualizations
		with their AmplitudeJS player.
	--------------------------------------------------------------------------*/
	function privateHelpInitializeAudioContext(){
		/*
			If the browser supports it and the user wants to use
			visualizations, then they can run visualizations. If
			the browser does not support the Web Audio API and the
			user has debug turned on, write to the console.
		*/
		if( window.AudioContext && config.use_visualizations ){
			/*
				Set the Web Audio API Context
			*/
			config.context 	= new AudioContext();

			/*
				Set the Web Audio API Analyzer to the context
			*/
			config.analyser = config.context.createAnalyser();

			/*
				Bind the source to the Javascript Audio Element
			*/
			config.source 	= config.context.createMediaElementSource( config.active_song );
			
			/*
				Connect the analyser to the source
			*/
			config.source.connect( config.analyser );
			
			/*
				Connect the context destination to the analyser
			*/
			config.analyser.connect( config.context.destination );

			/*
				Set cross origin to anonymouse so we have a better chance of being able
				to use the power of the Web Audio API.
			*/
			config.active_song.crossOrigin = "anonymous";
		}else{
			/*
				Checks to see if the Audio Context is available in the window meaning
				the browser can use the Web Audio API.
			*/
			if( !window.AudioContext ){
				privateWriteDebugMessage( 'This browser does not support the Web Audio API' );
			}
		}
	}


/*
|----------------------------------------------------------------------------------------------------
| EVENT HANDLER FUNCTIONS
|----------------------------------------------------------------------------------------------------
| These functions handle the events that we bound to each element and
| prepare for a function to be called. These kind of act like filters/middleware.
|
| Method Prefix: privateEvent
|
| METHODS
|	privateEventUpdateTime()
|	privateEventPlayInteraction()
|	privateEventPauseInteraction()
|	privateEventPlayPauseInteraction()
|	privateEventStopInteraction()
|	privateEventMuteInteraction()
|	privateEventVolumeUpInteraction()
|	privateEventVolumeDownInteraction()
|	privateEventSongSliderInteraction()
|	privateEventVolumeSliderInteraction()
|	privateEventNextInteraction()
|	privateEventPrevInteraction()
|	privateEventShuffleInteraction()
|	privateEventRepeatInteraction()
|	privateEventPlaybackSpeedInteraction()
|	privateEventSkipToInteraction()
*/


/*
|----------------------------------------------------------------------------------------------------
| EVENT HANDLER HELPER METHODS
|----------------------------------------------------------------------------------------------------
| These methods help handle interactions whether it's computation or shuffling songs.
|
| Method Prefix: privateEventHelper
|
| METHODS
|	privateEventHelperComputeCurrentTimes()
|	privateEventHelperComputeSongDuration()
|	privateEventHelperComputeSongCompletionPercentage()
*/
	/*--------------------------------------------------------------------------
		Computes the current song time. Breaks down where the song is into
		hours, minutes, seconds and formats it to be displayed to the user.
	--------------------------------------------------------------------------*/
	function privateEventHelperComputeCurrentTimes(){
		/*
			Initialize the current time object that will be returned.
		*/
		var currentTime = {};

		/*
			Computes the current seconds for the song.
		*/
		var currentSeconds = ( Math.floor( config.active_song.currentTime % 60 ) < 10 ? '0' : '' ) + 
							    Math.floor( config.active_song.currentTime % 60 );

		/*
			Computes the current minutes for the song.
		*/
		var currentMinutes = Math.floor( config.active_song.currentTime / 60 );

		/*
			Initialize the current hours variable.
		*/
		var currentHours = '00';

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
		if( currentMinutes > 60 ){
			currentHours 		= Math.floor( currentMinutes / 60 );
			currentMinutes 		= currentMinutes % 60;

			/*
				If the user is less than 10 hours in, we append the
				additional 0 to the hours.
			*/
			if( currentHours < 10 ){
				currentHours = '0'+currentHours;
			}

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

	/*--------------------------------------------------------------------------
		Computes the current song duration. Breaks down where the song is into
		hours, minutes, seconds and formats it to be displayed to the user.
	--------------------------------------------------------------------------*/
	function privateEventHelperComputeSongDuration(){
		/*
			Initialize the song duration object that will be returned.
		*/
		var songDuration = {};

		/*
			Computes the duration of the song's seconds.
		*/
		var songDurationSeconds = ( Math.floor( config.active_song.duration % 60 ) < 10 ? '0' : '' ) + 
									  		Math.floor( config.active_song.duration % 60 );

		/*
			Computes the duration of the song's minutes.
		*/
		var songDurationMinutes = Math.floor( config.active_song.duration / 60 );

		/*
			Initialize the hours duration variable.
		*/
		var songDurationHours = '00';

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
		if( songDurationMinutes > 60 ){
			songDurationHours 		= Math.floor( songDurationMinutes / 60 ); 
			songDurationMinutes 	= songDurationMinutes % 60;

			/*
				If the song duration hours is less than 10 we append
				the additional 0.
			*/
			if( songDurationHours < 10 ){
				songDurationHours = '0'+songDurationHours;
			}

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

	/*--------------------------------------------------------------------------
		Computes the song completion percentage.
	--------------------------------------------------------------------------*/
	function privateEventHelperComputeSongCompletionPercentage(){
		return ( config.active_song.currentTime / config.active_song.duration ) * 100;
	}

	/*--------------------------------------------------------------------------
		Checks to see if the new song to be played is different than the song
		that is currently playing. To be true, the user would have selected
		play on a new song with a new index. To be false, the user would have
		clicked play/pause on the song that was playing.

		@param int songIndex The index of the new song to be played.
	--------------------------------------------------------------------------*/
	function privateEventHelperCheckNewSong( songIndex ){
		if( songIndex != config.active_index ){
			return true;
		}else{
			return false;
		}
	}

	function privateEventHelperChangeSong( song ){
		/*
			Stops the currently playing song so we can adjust
			what we need.
		*/
		privateStop();


		/* ADJUST CONFIG */
		/* DO META AND OTHER VISUAL SYNCS */

		/*
			
		*/

		/*
			Since it is a new song, we reset the song sliders. These
			react to time updates and will eventually be updated but we
			force update them is if there is a song slider bound to a
			specific song, they won't update.
		*/
		privateVisualSyncResetSongSliders();

		/*
			Reset the song time vizualizations as well since those
			can be bound to a specific song.
		*/
		privateVisualSyncResetSongTimeVisualizations();
	}

/*
|----------------------------------------------------------------------------------------------------
| VISUAL SYNC METHODS
|----------------------------------------------------------------------------------------------------
| These methods sync visual displays with what is happening in Amplitude
|
| Method Prefix: privateVisualSync
|
| METHODS
|	privateVisualSyncCurrentTime( currentTime, completionPercentage )
*/
	/*--------------------------------------------------------------------------
		Visually displays the current time on the screen. This is called on
		time update for the current song.

		@param JSON currentTime An object containing the current time for the
		song in seconds, minutes, and hours.

		@param float completionPercentage The percent of the way through the song
		the user is at.
	--------------------------------------------------------------------------*/
	function privateVisualSyncCurrentTime( currentTime, completionPercentage ){
		/*
			Set current hour display.
		*/
		privateVisualSyncHelperCurrentHours( currentTime.hours );

		/*
			Set current minute display.
		*/
		privateVisualSyncHelperCurrentMinutes( currentTime.minutes );

		/*
			Set current second display.
		*/
		privateVisualSyncHelperCurrentSeconds( currentTime.seconds );

		/*
			Set current time display.
		*/
		privateVisualSyncHelperCurrentTime( currentTime );

		/*
			Set all song sliders to be to the current percentage
			of the song played.
		*/
		privateVisualSyncHelperSongSliders( completionPercentage );

		/*
			Set all visual sync song time visualizations. This will
			expand the div inside of the visualization to be the song
			played percentage.
		*/
		privateVisualSyncSongTimeVisualizations( songPlayedPercentage );
	}

	function privateVisualSyncResetSongSliders(){
		var songSliders = document.getElementsByClassName("amplitude-song-slider");

		/*
			Iterate over all of the song sliders and set them to
			0 essentially resetting them.
		*/
		for( var i = 0; i < songSliders.length; i++ ){
			songSliders[i].value = 0;
		}
	}

	function privateVisualSyncResetSongTimeVisualizations(){
		var songTimeVisualizations = document.getElementsByClassName("amplitude-song-time-visualization");

		for( var i = 0; i < songTimeVisualizations.length; i++ ){
			var songTimeVisualizationStatus = songTimeVisualizations[i].querySelectorAll('.amplitude-song-time-visualization-status');
			songTimeVisualizationStatus[i].setAttribute('style', 'width: 0px');
		}
	}

/*
|----------------------------------------------------------------------------------------------------
| VISUAL SYNC HELPER METHODS
|----------------------------------------------------------------------------------------------------
| These methods help sync visual displays. They essentially make the visual sync methods
| smaller and more maintainable.
|
| Method Prefix: privateVisualSyncHelper
|
| METHODS
|	privateVisualSyncHelperCurrentHours( hours )
|	privateVisualSyncHelperCurrentMinutes( minutes )
|	privateVisualSyncHelperCurrentSeconds( seconds )
|	privateVisualSyncHelperCurrentTime( currentTime )
|	privateVisualSyncSongSliders( songPlayedPercentage )
|	privateVisualSyncSongTimeVisualizations( songPlayedPercentage )
*/
	/*--------------------------------------------------------------------------
		Updates any elements that display the current hour for the song.

		@param int hours An integer conaining how many hours into
		the song.
	--------------------------------------------------------------------------*/
	function privateVisualSyncHelperCurrentHours( hours ){
		/*
			Gets all of the song hour selectors.
		*/
		var hourSelectors = [
			'.amplitude-current-hours[amplitude-main-current-hours="true"]',
			'.amplitude-current-hours[amplitude-playlist-main-current-hours="'+config.active_playlist+'"]',
			'.amplitude-current-hours[amplitude-song-index="'+config.active_index+'"]'
		];

		/*
			Ensures that there are some hour selectors.
		*/
		if( document.querySelectorAll( hourSelectors.join() ).length > 0 ){
			/*
				Get all of the hour selectors
			*/
			var currentHourSelectors = document.querySelectorAll( hourSelectors.join() );
			
			/*
				Set the current hour selector's inner html to hours passed in.
			*/
			for( var i = 0; i < currentHourSelectors.length; i++ ){
				currentHourSelectors[i].innerHTML = hours;
			}
		}
	}

	/*--------------------------------------------------------------------------
		Updates any elements that display the current minutes for the song.

		@param int minutes An integer conaining how many minutes into
		the song.
	--------------------------------------------------------------------------*/
	function privateVisualSyncHelperCurrentMinutes( minutes ){
		/*
			Gets all of the song minute selectors.
		*/
		var minuteSelectors = [
			'.amplitude-current-minutes[amplitude-main-current-minutes="true"]',
			'.amplitude-current-minutes[amplitude-playlist-main-current-minutes="'+config.active_playlist+'"]',
			'.amplitude-current-minutes[amplitude-song-index="'+config.active_index+'"]'
		];

		/*
			Ensures that there are some minute selectors.
		*/
		if( document.querySelectorAll( minuteSelectors.join() ).length > 0 ){
			/*
				Get all of the minute selectors
			*/
			var currentMinuteSelectors = document.querySelectorAll( minuteSelectors.join() );

			/*
				Set the current minute selector's inner html to minutes passed in.
			*/
			for( var i = 0; i < currentMinuteSelectors.length; i++ ){
				currentMinuteSelectors[i].innerHTML = minutes;
			}
		}
	}

	/*--------------------------------------------------------------------------
		Updates any elements that display the current seconds for the song.

		@param int minutes An integer conaining how many seconds into
		the song.
	--------------------------------------------------------------------------*/
	function privateVisualSyncHelperCurrentSeconds( seconds ){
		/*
			Gets all of the song second selectors.
		*/
		var secondSelectors = [
			'.amplitude-current-seconds[amplitude-main-current-seconds="true"]',
			'.amplitude-current-seconds[amplitude-playlist-main-current-seconds="'+config.active_playlist+'"]',
			'.amplitude-current-seconds[amplitude-song-index="'+config.active_index+'"]'
		];

		/*
			Ensures that there are some second selectors.
		*/
		if( document.querySelectorAll( secondSelectors.join() ).length > 0 ){
			/*
				Get all of the second selectors
			*/
			var currentSecondSelectors = document.querySelectorAll( secondSelectors.join() );

			/*
				Set the current second selector's inner html to seconds passed in.
			*/
			for( var i = 0; i < currentSecondSelectors.length; i++ ){
				currentSecondSelectors[i].innerHTML = seconds;
			}
		}
	}

	/*--------------------------------------------------------------------------
		Updates any elements that display the current time for the song. This
		is a computed field that will be commonly used.

		@param JSON currentTime A json object conaining the parts for the
		current time for the song.
	--------------------------------------------------------------------------*/
	function privateVisualSyncHelperCurrentTime( currentTime ){
		/*
			Gets all of the song time selectors.
		*/
		var timeSelectors = [
			'.amplitude-current-time[amplitude-main-current-time="true"]',
			'.amplitude-current-time[amplitude-playlist-main-current-time="'+config.active_playlist+'"]',
			'.amplitude-current-time[amplitude-song-index="'+config.active_index+'"]'
		];

		/*
			Ensures that there are some time selectors.
		*/
		if( document.querySelectorAll( timeSelectors.join() ).length > 0 ){
			/*
				Get all of the time selectors.
			*/
			var currentTimeSelectors = document.querySelectorAll( timeSelectors.join() );

			/*
				Set the time selector's inner html to the current time for the song. The current
				time is computed by joining minutes and seconds.
			*/
			for( var i = 0; i < currentTimeSelectors.length; i++ ){
				currentTimeSelectors[i].innerHTML = currentTime.minutes+':'+currentTime.seconds;
			}
		}
	}

	/*--------------------------------------------------------------------------
		Updates all of the song sliders which are the range inputs the
		user can interact with.

		@param float songPlayedPercentage The percentage of the song that
		has been played.
	--------------------------------------------------------------------------*/
	function privateVisualSyncSongSliders( songPlayedPercentage ){
		/*
			Gets all of the song sliders
		*/
		var songSliders = [
			'[amplitude-singular-song-slider="true"]',
			'input[amplitude-song-index="'+config.active_index+'"]'
		];

		/*
			Ensures that there are song sliders.
		*/
		if( document.querySelectorAll( songSliders.join() ).length > 0 ){
			/*
				Get all of the song sliders
			*/
			var songSliders = document.querySelectorAll( songSliders.join() );
			
			/*
				Iterate over the song time sliders and set their value
				the song played percentage.
			*/
			for( var i = 0; i < currentTimeSelectors.length; i++ ){
				songSliders[i].value = songPlayedPercentage;
			}
		}
	}

	/*--------------------------------------------------------------------------
		Updates all of the song time visualizaitons which are an expanding
		element that displays the percentage of the song that has been played.

		@param float songPlayedPercentage The percentage of the song that
		has been played.
	--------------------------------------------------------------------------*/
	function privateVisualSyncSongTimeVisualizations( songPlayedPercentage ){
		/*
			Gets all of the song time visualizations.
		*/
		var songTimeVisualizations = [
			'[amplitude-main-song-time-visualization="true"]',
			'.amplitude-song-time-visualization[amplitude-song-index="'+config.active_index+'"]'
		];

		/*
			Ensures that there are song time visualizations.
		*/
		if( document.querySelectorAll( songTimeVisualizations.join() ).length > 0 ){
			/*
				Get all of the song time visualizations.
			*/
			var songTimeVisualizations = document.querySelectorAll( songTimeVisualizations.join() );

			/*
				Iterate over the song time visualizations, compute the width of the inner
				element that displays the percentage of the song played.
			*/
			for( var i = 0; i < songTimeVisualizations.length; i++ ){
				var songTimeVisualizationStatus = songTimeVisualizations[i].querySelectorAll('.amplitude-song-time-visualization-status');
				var visualizationWidth 			= songTimeVisualizations[i].offsetWidth;
				var computedWidth 				= ( visualizationWidth * ( songPlayedPercentage / 100 ) );

				/*
					Set the inner element width to the computed width. This allows for the user
					to define the width of the outer element and this will fill proportionally.
				*/
				songTimeVisualizationStatus[0].setAttribute('style', 'width: ' + computedWidth + 'px');
			}
		}
	}

/*
|----------------------------------------------------------------------------------------------------
| CORE FUNCTIONAL METHODS
|----------------------------------------------------------------------------------------------------
| Interacts directly with native functions of the Audio element. Logic
| leading up to these methods are handled by click handlers which call
| helpers and visual synchronizers. These are the core functions of AmplitudeJS.
| Every other function that leads to these prepare the information to be 
| acted upon by these functions.
|
| Method Prefix: privateCore
|
| METHODS
|	privateCorePlay()
|	privateCorePause()
|	privateCoreStop()
|	privateCoreSetVolume( volumeLevel )
|	privateCoreSetSongLocation( songPercentage )
|	privateCoreDisconnectStream()
|	privateCoreReconnectStream()
*/

	/*--------------------------------------------------------------------------
		Plays the active song. If the current song is live, it reconnects
		the stream before playing.
	--------------------------------------------------------------------------*/
	function privateCorePlay(){
		privateRunCallback('before_play');

		if( config.active_metadata.live ){
			privateCoreReconnectStream();
		}

		/*
			Mobile remote sources need to be reconnected on play. I think this is
			because mobile browsers are optimized not to load all resources
			for speed reasons. We only do this if mobile and the paused button
			is not clicked. If the pause button was clicked then we don't reconnect
			or the user will lose their place in the stream.
		*/
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && !config.paused ) {
			privateReconnectStream();
		}

		config.active_song.play();
		config.active_song.playbackRate = config.playback_speed;
		
		privateRunCallback('after_play');
	}

	/*--------------------------------------------------------------------------
		Pauses the active song. If it's live, it disconnects the stream.
	--------------------------------------------------------------------------*/
	function privateCorePause(){
		config.active_song.pause();
		
		/*
			Flag that pause button was clicked.
		*/
		config.paused = true;

		if( config.active_metadata.live ){
			privateCoreDisconnectStream();
		}
	}

	/*--------------------------------------------------------------------------
		Stops the active song by setting the current song time to 0.
		When the user resumes, it will be from the beginning.
		If it's a live stream it disconnects.
	--------------------------------------------------------------------------*/
	function privateCoreStop(){
		privateRunCallback('before_stop');

		config.active_song.currentTime = 0;
		config.active_song.pause();

		if( config.active_metadata.live ){
			privateCoreDisconnectStream();
		}

		privateRunCallback('after_stop');
	}

	/*--------------------------------------------------------------------------
		Sets the song volume.

		@param int volumeLevel A number between 1 and 100 as a percentage of
		min to max for a volume level.
	--------------------------------------------------------------------------*/
	function privateCoreSetVolume( volumeLevel ){
		config.active_song.volume = volumeLevel / 100;
	}

	/*--------------------------------------------------------------------------
		Sets the song percentage. If it's a live song, we ignore this because
		we can't skip ahead. This is an issue if you have a playlist with 
		a live source.

		@param int songPercentage A number between 1 and 100 as a percentage of
		song completion.
	--------------------------------------------------------------------------*/
	function privateCoreSetSongLocation( songPercentage ){
		if( !config.active_metadata.live ){
			config.active_song.currentTime = ( config.active_song.duration ) * ( song_percentage / 100 );
		}
	}

	/*--------------------------------------------------------------------------
		Disconnects the live stream
	--------------------------------------------------------------------------*/
	function privateCoreDisconnectStream(){
		config.active_song.src = '';
		config.active_song.load();
	}

	/*--------------------------------------------------------------------------
		Reconnects the live stream
	--------------------------------------------------------------------------*/
	function privateCoreReconnectStream(){
		config.active_song.src = config.active_metadata.url;
		config.active_song.load();
	}

	/**************


	TODO: Move all methods below for interactions into the new
	methods above so the prefix is standardized


	***************/


	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-pause'

		Handles a click on a pause element.

		TODO: Check to see that the pause element has an index and if that
		index matches the current song being played.  If it's different then
		we should disable it? If the user clicks on song-index=1 pause and 
		song-index=2 is being played, is it right to pause?
	--------------------------------------------------------------------------*/
	function privatePauseClickHandle(){
		/*
			Calls the core function for pause
		*/
		privatePause();
	}

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
				*/
				privateStartVisualization();

				privateCorePlay( this.getAttribute('amplitude-song-index') );
			}else{
				privateChangePlayPauseState('paused');

				privatePause();
			}
		}

	}

	

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-stop'

		Handles a click on a stop element.
	--------------------------------------------------------------------------*/
	function privateStopClickHandle(){
		/*
			Calls the helper function to stop
			the visualization.
		*/
		privateStopVisualization();

		/*
			Calls the core function for stop
		*/
		privateStop();
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
		Finishes the initalization of the config. Takes all of the user defined
		parameters and makes sure they override the defaults. The important
		config information is assigned in the publicInit() function.

		This function can be called from 2 different locations:
		1. Right away on init after the important settings are defined.
		2. After all of the Soundcloud URLs are resolved properly and
		soundcloud is configured.  We will need the proper URLs from Soundcloud
		to stream through Amplitude so we get those right away before we
		set the information and the active song

		@param user_config JSON representation of the user's settings when
		they init Amplitude.

		TODO: In all functions that call privateSetActiveSongInformation, have
		the active_index set there as well.

		TODO: Make sure that if the user sends a start_song that it's an integer
		and nothing else. Debug if NOT an integer.

		TODO: Make the user enter a volume between 0 and 100. It's a little
		easier sounding.

		TODO: Make sure the user enters a volume increment or decrement between
		1 and 100 to ensure something happens when they click the increment
		or decrement button.
	--------------------------------------------------------------------------*/
	function privateSetConfig( user_config ){
		/*
			If Amplitude is not in dynamic mode, we determine what the 
			start song should be. Dynamic mode doesn't have any songs on 
			config because the user will be sending them to Amplitude 
			dynamically.
		*/
		if( !config.dynamic_mode ){
			/*
				If the user provides a starting song index then we set
				the active song information to the song at that index.

				TODO: Find a way to have the user set a specific start song
				on a playlist.
			*/
			if( user_config.start_song != undefined ){
				privateSetActiveSongInformation( config.songs[user_config.start_song] );
				/*
					TODO: REMOVE Sets the user defined index.
				*/
				config.active_index = user_config.start_song;
			}else{
				privateSetActiveSongInformation( config.songs[0] );				

				/*
					TODO: REMOVE Sets the active index to the first song.
				*/
				config.active_index = 0;
			}
		}

		/*
			If the user defined a playback speed, we copy over their
			preference here, otherwise we default to normal playback
			speed of 1.0.
		*/
		config.playback_speed = ( user_config.playback_speed != undefined ? user_config.playback_speed : 1.0 );

		/*
			Sets the playback rate for the current song based on what
			the user defined or the default if nothing was defined.
		*/
		config.active_song.playbackRate = config.playback_speed;

		/*
			If live is not defined, assume it is false. The reason for
			this definition is if we play/pause we disconnect
			and re-connect to the stream so we don't fill up our cache
			with unused audio and we aren't playing outdated audio upon
			resume.
		*/
		if( config.active_metadata.live == undefined ){
			config.active_metadata.live = false;
		}

		/*
			If the user wants the song to be pre-loaded for instant
			playback, they set it to true. By default it's set to just
			load the metadata.
		*/
		config.active_song.preload = ( user_config.preload != undefined ? user_config.preload : "metadata" );
		
		/*
			Initializes the user defined callbacks. This should be a JSON
			object that contains a key->value store of the callback name
			and the name of the function the user needs to call.
		*/
		config.callbacks = ( user_config.callbacks != undefined ? user_config.callbacks : {} );

		/*
			The user can define a starting volume in a range of 0-1 with
			0 being muted and 1 being the loudest. After the config is set
			Amplitude sets the active song's volume to the volume defined
			by the user.
		*/
		config.volume = ( user_config.volume != undefined ? user_config.volume : .5 );
		config.active_song.volume = config.volume;

		/*
			The user can set the volume increment and decrement values between 1 and 100
			for when the volume up or down button is pressed.  The default is an increase
			or decrease of 5.
		*/
		config.volume_increment = ( user_config.volume_increment != undefined ? user_config.volume_increment : 5 );
		config.volume_decrement = ( user_config.volume_decrement != undefined ? user_config.volume_decrement : 5 );

		/*
			The user can turn off Amplitude handling the song elements (putting the meta data into
			certain fields when the song is playing or changed).  This would be if the user wanted
			to hard code this information which would probably be most popular in single song 
			instances.
		*/
		config.handle_song_elements = ( user_config.handle_song_elements != undefined ? user_config.handle_song_elements : true );

		/*
			If the user defines default album art, this image will display if the active
			song doesn't have album art defined.
		*/
		config.default_album_art = ( user_config.default_album_art != undefined ? user_config.default_album_art : '' );		
		
		/*
			The user can define a visualization backup to use if they are using
			visualizations (song visualizations not song time visualizations) and the
			browser doesn't support it.  This can be "nothing" meaning that the
			visualization element is removed otherwise it can be the album art
			of the song being played.
		*/
		config.visualization_backup = ( user_config.visualization_backup != undefined ? user_config.visualization_backup : 'nothing' );

		/*
			Sets initialized to true, so the user can't re-initialize
			and mess everything up.
		*/
		config.initialized = true;

		/*
			Since the user can define a start volume, we want our volume
			sliders to sync with the user defined start value.
		*/
		privateSyncVolumeSliders();

		/*
			Sets up the player if the browser doesn't have the audio context
		*/
		privateSyncNoAudioContext();

		/*
			Set all of the current time elements to 0:00 upon initialization
		*/
		privateSyncCurrentTimes();

		/*
			Syncs all of the song status sliders so the user can't set the
			HTML 5 range element to be something invalid on load like half
			way through the song by default.
		*/
		privateResetSongStatusSliders();

		privateCheckSongVisualization();

		/*
			Syncs the visual playback speed items so the appropriate class
			is added to the item for visual purposes.
		*/
		privateSyncVisualPlaybackSpeed();

		/*
			Initialize the visual elements for the song if the user
			wants Amplitude to handle the changes. This is new 
			compared to previous versions where Amplitude automatically
			handled the song elements.
		*/
		if( config.handle_song_elements ){
			privateDisplaySongMetadata();
		}

		/*
			Removes any classes set by the user so any inconsistencies
			with start song and actual song are displayed correctly.
		*/
		privateSyncVisualPlayingContainers();

		/*
			Sets the active song container for the song that will be
			played. This adds a class to an element containing the
			visual representation of the active song .
		*/
		privateSetActiveContainer();

		/*
			Sets the temporary user conifg back to empty. We are done
			using it.
		*/
		temp_user_config = {};

		/*
			Run after init callback
		*/
		privateRunCallback("after_init");

		/*
			If the user turns on autoplay the song will play automatically.
		*/
		if( user_config.autoplay ){
			/*
				Gets the attribute for song index so we can check if
				there is a need to change the song.  In some scenarios
				there might be multiple play classes on the page. In that
				case it is possible the user could click a different play
				class and change the song.
			*/
			var playing_song_index = config.start_song;

			/*
				We set the new song if the user clicked a song with a different
				index. If it's the same as what's playing then we don't set anything. 
				If it's different we reset all song sliders.
			*/
			if( privateCheckNewSong( playing_song_index ) ){
				privateChangeSong( playing_song_index );

				privateResetSongStatusSliders();
			}

			/*
				Start the visualizations for the song.
			*/
			privateStartVisualization();
			
			/*
				If there are any play pause buttons we need
				to sync them to playing for auto play.
			*/
			privateChangePlayPauseState('playing');

			/*
				Play the song through the core play function.
			*/
			privateCorePlay();
		}
	}

	/*--------------------------------------------------------------------------
		Handles the back up functionality for visualizations. This happens
		if there is no AudioContext available or the song is live.

		The two settings are:
		1. "nothing" DEFAULT. It will remove the visualization element from the
		page.

		2. "album-art" Instead of the visualization, the element that would have
		container for the visualization will instead display the album
		art for the now playing song.

		TODO: Make sure this is only run if the user is using visualizations
		in their design.

		TODO: Change querySelector to querySelectorAll once again justifying
		the use of a global query all function for visual syncing.
	--------------------------------------------------------------------------*/
	function privateHandleVisualizationBackup(){
		switch( config.visualization_backup ){
			/*
				Removes the visualization element from the page.
			*/
			case "nothing":
				
				if( document.getElementById('amplitude-visualization') ){
					document.getElementById('amplitude-visualization').remove();
				}
			break;
			/*
				Sets up the old visualization element to contain the
				album art.
			*/
			case "album-art":
				/*
					Gets the old visualizationelement.
				*/
				var old_visualization = document.getElementById('amplitude-visualization');

				/*
					If there is a visualization element then we proceed.
				*/	
				if( old_visualization ){
					/*
						Gets the parent node to append the inner node to containing
						the album art.
					*/
					var parent_old_visualization = old_visualization.parentNode;

					var new_album_art = document.createElement('img');
					/*
						Sets the attribute to be the song infor for the cover
						art on the new element. Also apply the class 'amplitude-album-art'
					*/
					new_album_art.setAttribute('amplitude-song-info', 'cover');
					new_album_art.setAttribute('class', 'amplitude-album-art');

					/*
						TODO: is this the right place to do this? Shouldn't this happen
						AFTER we replace the visualization?
					*/
					if( document.querySelector('[amplitude-song-info="cover"]') ){

						if( config.active_metadata.cover_art_url != undefined){
							new_album_art.setAttribute( 'src', config.active_metadata.cover_art_url );
							document.querySelector('[amplitude-song-info="cover"]').setAttribute('src', config.active_metadata.cover_art_url);
						}else if( config.default_album_art != '' ){
							new_album_art.setAttribute( 'src', config.default_album_art );
						}else{
							new_album_art.setAttribute( 'src', '' );
						}
					}

					parent_old_visualization.replaceChild( new_album_art, old_visualization );
				}
			break;
		}
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
		If there is a visualization specifically for a song, we set that
		as the active visualization. Only if one is specified, otherwise
		nothing changes and we continue using the active visualization.

		@returns BOOL Returns true if there is a specific visualization for
		the song.
	--------------------------------------------------------------------------*/
	function privateCheckSongVisualization(){
		var changed = false;

		/*
			Checks to see if the song actually has a specific visualization
			defined.
		*/
		if( config.active_metadata.visualization ){
			
			/*
				If the visualization is different and there is an active
				visualization. We must stop the active visualization
				before setting the new one.
			*/
			if( config.active_metadata.visualization != config.active_visualization && config.active_visualization != '' ){
				privateStopVisualization();
				
				/*
					Set the visualization changed to true
					so we return the status change.
				*/
				changed = true;

				/*
					Sets the active visualization to the new
					visualization that the song uses.
				*/
				config.active_visualization = config.active_metadata.visualization;
			}
		}
		/*
			Returns the status of the new song visualization.
			If there is a change it returns true and we will
			have to start the the visualization.
		*/
		return changed;
	}

	

	/*--------------------------------------------------------------------------
		Calls the start method on the active visualization.
	--------------------------------------------------------------------------*/
	function privateStartVisualization(){
		/*
			If the visualization is not started, and there are visualizations
			ready to be activated, we check to see if the user defined a 
			starting visualization.  If there is a starting visualization,
			then we start that one, otherwise we grab the first visualization
			defined and start that one.
		*/

		if( !config.visualization_started && Object.keys(config.visualizations).length > 0){
			if( config.active_visualization != '' ){
				config.visualizations[config.active_visualization].startVisualization(config.active_song);
				config.current_visualization = config.visualizations[config.active_visualization];
			}else{
				for(first_visualization in config.visualizations);

				config.visualizations[first_visualization].startVisualization(config.active_song);
				config.current_visualization = config.visualizations[first_visualization];
			}
			config.visualization_started = true;
		}
	}

	/*--------------------------------------------------------------------------
		Calls the stop method of the active visualization.
		If the visualization is started, we stop it.
	--------------------------------------------------------------------------*/
	function privateStopVisualization(){
		if( config.visualization_started && Object.keys(config.visualizations).length > 0){
			config.current_visualization.stopVisualization();
			config.visualization_started = false;
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
		Handles the situation if there is no audio context
		available
	--------------------------------------------------------------------------*/
	function privateSyncNoAudioContext(){
		if( !window.AudioContext ){
			privateHandleVisualizationBackup();
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

	

	

	/*
		Defines which methods and variables are public.
	*/
	return {
		init: publicInit,
		setDebug: publicSetDebug,
		getActiveSongMetadata: publicGetActiveSongMetadata,
		getSongByIndex: publicGetSongByIndex,
		playNow: publicPlayNow,
		play: publicPlay,
		pause: publicPause,
		registerVisualization: publicRegisterVisualization,
		visualizationCapable: publicVisualizationCapable,
		changeVisualization: publicChangeActiveVisualization,
		addSong: publicAddSong,
		analyser: publicGetAnalyser,
		active: config.active_song
	};
})();