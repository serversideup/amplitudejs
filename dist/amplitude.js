(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Amplitude", [], factory);
	else if(typeof exports === 'object')
		exports["Amplitude"] = factory();
	else
		root["Amplitude"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _init = __webpack_require__(2);

	var _init2 = _interopRequireDefault(_init);

	var _core = __webpack_require__(3);

	var _core2 = _interopRequireDefault(_core);

	var _config = __webpack_require__(4);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /*
	                                                                                                                                                                                                                  	Amplitude.js
	                                                                                                                                                                                                                  	Version: 	3.0
	                                                                                                                                                                                                                  	Author: 	Dan Pastori
	                                                                                                                                                                                                                  	Company: 	521 Dimensions
	                                                                                                                                                                                                                  */


	/*
		Amplitude should just be an interface to the public functions.
		Everything else should be handled by other objects
	*/

	var Amplitude = function () {
		var _ref;

		/*--------------------------------------------------------------------------
	 	The main init function.  The user will call this through 
	 	Amplitude.init({}) and pass in their settings.
	 	
	 	Public Accessor: Amplitude.init( user_config_json );
	 	 	@param user_config A JSON object of user defined values that help 
	  	configure and initialize AmplitudeJS.
	 --------------------------------------------------------------------------*/
		function init(userConfig) {
			_init2.default.initialize(userConfig);
		}

		/*--------------------------------------------------------------------------
	 	Allows the user to turn on debugging.
	 	
	 	Public Accessor: Amplitude.setDebug( bool );
	 	
	  	@param BOOL state Turns debugging on and off.
	 --------------------------------------------------------------------------*/
		function setDebug(state) {
			/*
	  	Sets the global config debug on or off.
	  */
			_config2.default.debug = state;
		}

		/*--------------------------------------------------------------------------
	 	Returns the active song meta data for the user to do what is 
	 	needed.
	 	
	 	Public Accessor: Amplitude.getActiveSongMetadata();
	 	
	  	@returns JSON Object with the active song information
	 --------------------------------------------------------------------------*/
		function getActiveSongMetadata() {
			return _config2.default.active_metadata;
		}

		/*--------------------------------------------------------------------------
	 	Returns a song in the songs array at that index
	 	
	 	Public Accessor: Amplitude.getSongByIndex( song_index )
	 		@param int index The integer for the index of the
	 	song in the songs array.
	 		@returns JSON representation for the song at a specific index.
	 --------------------------------------------------------------------------*/
		function getSongByIndex(index) {
			return _config2.default.songs[index];
		}

		/*--------------------------------------------------------------------------
	 	Adds a song to the end of the config array.  This will allow Amplitude
	 	to play the song in a playlist type setting.
	 	
	 	Public Accessor: Amplitude.addSong( song_json )
	 		@param song JSON representation of a song.
	 		@returns int New index of the song.
	 --------------------------------------------------------------------------*/
		function addSong(song) {
			_config2.default.songs.push(song);
			return _config2.default.songs.length - 1;
		}

		function playNow(song) {}

		/*--------------------------------------------------------------------------
	 	Allows the user to play whatever the active song is directly
	 	through Javascript. Normally ALL of Amplitude functions that access
	 	the core features are called through event handlers.
	 		Public Accessor: Amplitude.play();
	 --------------------------------------------------------------------------*/
		function play() {
			_core2.default.play();
		}

		/*--------------------------------------------------------------------------
	 	Allows the user to pause whatever the active song is directly
	 	through Javascript. Normally ALL of Amplitude functions that access
	 	the core features are called through event handlers. 
	 		Public Accessor: Amplitude.pause();
	 --------------------------------------------------------------------------*/
		function pause() {
			Amplitude.pause();
		}

		function getAudio() {}

		return _ref = {
			init: init,
			setDebug: setDebug,
			getActiveSongMetadata: getActiveSongMetadata,
			getSongByIndex: getSongByIndex,
			addSong: addSong,
			playNow: playNow,
			play: play,
			pause: pause
		}, _defineProperty(_ref, 'addSong', addSong), _defineProperty(_ref, 'audio', getAudio), _ref;
	}();

	exports.default = Amplitude;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _core = __webpack_require__(3);

	var _core2 = _interopRequireDefault(_core);

	var _helpers = __webpack_require__(5);

	var _helpers2 = _interopRequireDefault(_helpers);

	var _events = __webpack_require__(8);

	var _events2 = _interopRequireDefault(_events);

	var _soundcloud = __webpack_require__(11);

	var _soundcloud2 = _interopRequireDefault(_soundcloud);

	var _visual = __webpack_require__(6);

	var _visual2 = _interopRequireDefault(_visual);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var config = __webpack_require__(4);

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
	var AmplitudeInitializer = function () {

		/*--------------------------------------------------------------------------
	 	The main init function.  The user will call this through 
	 	Amplitude.init({}) and pass in their settings.
	 	
	 	Public Accessor: Amplitude.init( user_config_json );
	 	 	@param userConfig A JSON object of user defined values that help 
	  	configure and initialize AmplitudeJS.
	 	 	TODO: Find an optimal way to re-initialize
	  	TODO: Should we emit custom events for plugins to hook into like
	  	AmplitudeFX?
	 --------------------------------------------------------------------------*/
		function initialize(userConfig) {
			var ready = false;
			/*
	  	Reset the config on init so we have a clean slate. This is if the
	  	user has to re-init.
	  */
			_helpers2.default.resetConfig();

			/*
	  	Initialize event handlers on init. This will clear any old
	  	event handlers on the amplitude element and re-bind what is
	  	necessary.
	  */
			_events2.default.initializeEvents();

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
			config.debug = userConfig.debug != undefined ? userConfig.debug : false;

			/*
	  	TODO: Initialize default live setting for all songs. If the song does not
	  	have it's meta data as live, set live to false.
	  */

			/*
	  	Checks to see if the user has songs defined.
	  */
			if (userConfig.songs) {
				/*
	   	Checks to see if the user has some songs in the songs array.
	   */
				if (userConfig.songs.length != 0) {
					/*
	    	Copies over the user defined songs. and prepares
	    	Amplitude for the rest of the configuration.
	    */
					config.songs = userConfig.songs;
					/*
	    	Flag amplitude as ready.
	    */
					ready = true;
				} else {
					_helpers2.default.writeDebugMessage('Please add some songs, to your songs object!');
				}
			} else {
				_helpers2.default.writeDebugMessage('Please provide a songs object for AmplitudeJS to run!');
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
			if (userConfig.playlists && countPlaylists(userConfig.playlists) > 0) {
				/*
	   	Copy the playlists over to Amplitude
	   */
				config.playlists = userConfig.playlists;

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
			}

			/*
	  	When the preliminary config is ready, we are ready to proceed.
	  */
			if (ready) {
				/*
	   	Copies over the soundcloud information to the global config
	   	which will determine where we go from there.
	   */
				config.soundcloud_client = userConfig.soundcloud_client != undefined ? userConfig.soundcloud_client : '';

				/*
	   	Checks if we want to use the art loaded from soundcloud.
	   */
				config.soundcloud_use_art = userConfig.soundcloud_use_art != undefined ? userConfig.soundcloud_use_art : '';

				/*
	   	If the user provides a soundcloud client then we assume that
	   	there are URLs in their songs that will reference SoundcCloud.
	   	We then copy over the user config they provided to the 
	   	temp_user_config so we don't mess up the global or their configs
	   	and load the soundcloud information.
	   */
				if (config.soundcloud_client != '') {
					tempUserConfig = userConfig;

					/*
	    	Load up SoundCloud for use with AmplitudeJS.
	    */
					_soundcloud2.default.loadSoundCloud(tempUserConfig);
				} else {
					/*
	    	The user is not using Soundcloud with Amplitude at this point
	    	so we just finish the configuration with the users's preferences.
	    */
					setConfig(userConfig);
				}
			}

			/*
	  	Debug out what was initialized with AmplitudeJS.
	  */
			_helpers2.default.writeDebugMessage('Initialized With: ');
			_helpers2.default.writeDebugMessage(config);
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
		function setConfig(userConfig) {
			/*
	  	TODO: Make a way for the user to define a start song AND
	  	a start playlist.
	  		TODO: Make sure that if the user sends a start_song that it's an integer
	  	and nothing else. Debug if NOT an integer.
	  */
			if (userConfig.start_song != undefined) {
				_helpers2.default.changeSong(config.songs[userConfig.start_song]);
			} else {
				_helpers2.default.changeSong(config.songs[0]);
			}

			/*
	  	If the user defined a playback speed, we copy over their
	  	preference here, otherwise we default to normal playback
	  	speed of 1.0.
	  */
			config.playback_speed = userConfig.playback_speed != undefined ? userConfig.playback_speed : 1.0;

			/*
	  	Sets the audio playback speed.
	  */
			_core2.default.setPlaybackSpeed(config.playback_speed);

			/*
	  	If the user wants the song to be pre-loaded for instant
	  	playback, they set it to true. By default it's set to just
	  	load the metadata.
	  */
			config.active_song.preload = userConfig.preload != undefined ? userConfig.preload : "metadata";

			/*
	  	Initializes the user defined callbacks. This should be a JSON
	  	object that contains a key->value store of the callback name
	  	and the name of the function the user needs to call.
	  */
			config.callbacks = userConfig.callbacks != undefined ? userConfig.callbacks : {};

			/*
	  	The user can define a starting volume in a range of 0-100 with
	  	0 being muted and 100 being the loudest. After the config is set
	  	Amplitude sets the active song's volume to the volume defined
	  	by the user.
	  */
			config.volume = userConfig.volume != undefined ? userConfig.volume : 50;

			/*
	  	The user can set the volume increment and decrement values between 1 and 100
	  	for when the volume up or down button is pressed.  The default is an increase
	  	or decrease of 5.
	  */
			config.volume_increment = userConfig.volume_increment != undefined ? userConfig.volume_increment : 5;

			config.volume_decrement = userConfig.volume_decrement != undefined ? userConfig.volume_decrement : 5;

			/*
	  	Set the volume to what is defined in the config. The user can define this,
	  	so we should set it up that way.
	  */
			_core2.default.setVolume(config.volume);

			/*
	  	Since the user can define a start volume, we want our volume
	  	sliders to sync with the user defined start value.
	  */
			_visual2.default.syncVolumeSliders();

			/*
	  	If the user defines default album art, this image will display if the active
	  	song doesn't have album art defined.
	  		TODO: Validate that this is a URL and maybe if the URL exists
	  */
			config.default_album_art = userConfig.default_album_art != undefined ? userConfig.default_album_art : '';

			/*
	  	Syncs all of the visual time elements to 00.
	  */
			_visual2.default.resetTimes();

			/*
	  	Run after init callback
	  */
			_helpers2.default.runCallback('after_init');

			/*
	  	If the user has autoplay enabled, then begin playing the song. Everything should
	  	be configured for this to be ready to play.
	  */
			if (userConfig.autoplay) {
				_core2.default.play();
			}
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
		function initializeSongTimeVisualizations() {
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
			for (var i = 0; i < song_time_visualizations.length; i++) {
				/*
	   	Creates new element
	   */
				var status = document.createElement('div');

				/*
	   	Adds class and attributes
	   */
				status.classList.add('amplitude-song-time-visualization-status');
				status.setAttribute('style', 'width: 0px');

				/*
	   	Clears the inner HTML so we don't get two status divs.
	   */
				song_time_visualizations[i].innerHTML = '';

				/*
	   	Appends the element as a child element.
	   */
				song_time_visualizations[i].appendChild(status);
			}
		}

		/*--------------------------------------------------------------------------
	 	Counts the number of playlists the user has configured. This ensures
	 	that the user has at least 1 playlist so we can validate the songs
	 	defined in the playlist are correct and they didn't enter an invalid
	 	ID.
	 --------------------------------------------------------------------------*/
		function countPlaylists(playlists) {
			/*
	  	Initialize the placeholders to iterate through the playlists
	  	and find out how many we have to account for.
	  */
			var size = 0,
			    key;

			/*
	  	Iterate over playlists and if the user has the playlist defined,
	  	increment the size of playlists.
	  */
			for (key in playlists) {
				if (playlists.hasOwnProperty(key)) {
					size++;
				}
			}

			/*
	  	Debug how many playlists are in the config.
	  */
			_helpers2.default.writeDebugMessage('You have ' + size + ' playlist(s) in your config');

			/*
	  	Return the number of playlists in the config.
	  */
			return size;
		}

		/*--------------------------------------------------------------------------
	 	Ensures the indexes in the playlists are valid indexes. The song has
	 	to exist in the Amplitude config to be played correctly.
	 --------------------------------------------------------------------------*/
		function checkValidSongsInPlaylists() {
			/*
	  	Iterate over all of the config's playlists
	  */
			for (var key in config.playlists) {
				/*
	   	Checks if the playlist key is accurate.
	   */
				if (config.playlists.hasOwnProperty(key)) {
					/*
	    	Checks if the playlist has songs.
	    */
					if (config.playlists[key].songs) {
						/*
	     	Iterate over all of the songs in the playlist
	     */
						for (var i = 0; i < config.playlists[key].songs.length; i++) {
							/*
	      	Check to see if the index for the song in the playlist
	      	exists in the songs config.
	      */
							if (!config.songs[config.playlists[key].songs[i]]) {
								_helpers2.default.writeDebugMessage('The song index: ' + config.playlists[key].songs[i] + ' in playlist with key: ' + key + ' is not defined in your songs array!');
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
		function initializePlaylistShuffleStatuses() {
			/*
	  	Iterate over all of the playlists the user defined adding
	  	the playlist key to the shuffled playlist array and creating
	  	and empty object to house the statuses.
	  */
			for (var key in config.playlists) {
				config.shuffled_statuses[key] = false;
			}
		}

		/*--------------------------------------------------------------------------
	 	Initializes the shuffled playlist placeholders. These will be set for
	 	playlists that are shuffled and contain the shuffled songs.
	 --------------------------------------------------------------------------*/
		function initializePlaylistShuffleLists() {
			/*
	  	Iterate over all of the playlists the user defined adding
	  	the playlist key to the shuffled playlists array and creating
	  	and empty object to house the shuffled playlists
	  */
			for (var key in config.playlists) {
				config.shuffled_playlists[key] = [];
			}
		}

		return {
			initialize: initialize,
			setConfig: setConfig
		};
	}();

	exports.default = AmplitudeInitializer;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _config = __webpack_require__(4);

	var _config2 = _interopRequireDefault(_config);

	var _helpers = __webpack_require__(5);

	var _helpers2 = _interopRequireDefault(_helpers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
		TODO: Make that any interactions with volume that the volume is between 0 and 100. It's a little
		easier sounding.

		TODO: Ensure that anything not referencing the config or an HTML element is camelCase
	*/
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
	| METHODS
	|	play()
	|	pause()
	|	stop()
	|	setVolume( volumeLevel )
	|	setSongLocation( songPercentage )
	|	disconnectStream()
	|	reconnectStream()
	|	playNow()
	| 	setPlaybackSpeed()
	*/
	var AmplitudeCore = function () {
		/*--------------------------------------------------------------------------
	 	Plays the active song. If the current song is live, it reconnects
	 	the stream before playing.
	 --------------------------------------------------------------------------*/
		function play() {
			_helpers2.default.runCallback('before_play');

			if (_config2.default.active_metadata.live) {
				reconnectStream();
			}

			/*
	  	Mobile remote sources need to be reconnected on play. I think this is
	  	because mobile browsers are optimized not to load all resources
	  	for speed reasons. We only do this if mobile and the paused button
	  	is not clicked. If the pause button was clicked then we don't reconnect
	  	or the user will lose their place in the stream.
	  */
			if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && !_config2.default.paused) {
				reconnectStream();
			}

			_config2.default.active_song.play();
			_config2.default.active_song.playbackRate = _config2.default.playback_speed;

			_helpers2.default.runCallback('after_play');
		}

		/*--------------------------------------------------------------------------
	 	Pauses the active song. If it's live, it disconnects the stream.
	 --------------------------------------------------------------------------*/
		function pause() {
			_config2.default.active_song.pause();

			/*
	  	Flag that pause button was clicked.
	  */
			_config2.default.paused = true;

			if (_config2.default.active_metadata.live) {
				disconnectStream();
			}
		}

		/*--------------------------------------------------------------------------
	 	Stops the active song by setting the current song time to 0.
	 	When the user resumes, it will be from the beginning.
	 	If it's a live stream it disconnects.
	 --------------------------------------------------------------------------*/
		function stop() {
			_helpers2.default.runCallback('before_stop');

			_config2.default.active_song.currentTime = 0;
			_config2.default.active_song.pause();

			if (_config2.default.active_metadata.live) {
				disconnectStream();
			}

			_helpers2.default.runCallback('after_stop');
		}

		/*--------------------------------------------------------------------------
	 	Sets the song volume.
	 		@param int volumeLevel A number between 1 and 100 as a percentage of
	 	min to max for a volume level.
	 --------------------------------------------------------------------------*/
		function setVolume(volumeLevel) {
			_config2.default.active_song.volume = volumeLevel / 100;
		}

		/*--------------------------------------------------------------------------
	 	Sets the song percentage. If it's a live song, we ignore this because
	 	we can't skip ahead. This is an issue if you have a playlist with 
	 	a live source.
	 		@param int songPercentage A number between 1 and 100 as a percentage of
	 	song completion.
	 --------------------------------------------------------------------------*/
		function setSongLocation(songPercentage) {
			if (!_config2.default.active_metadata.live) {
				_config2.default.active_song.currentTime = _config2.default.active_song.duration * (song_percentage / 100);
			}
		}

		/*--------------------------------------------------------------------------
	 	Disconnects the live stream
	 --------------------------------------------------------------------------*/
		function disconnectStream() {
			_config2.default.active_song.src = '';
			_config2.default.active_song.load();
		}

		/*--------------------------------------------------------------------------
	 	Reconnects the live stream
	 --------------------------------------------------------------------------*/
		function reconnectStream() {
			_config2.default.active_song.src = _config2.default.active_metadata.url;
			_config2.default.active_song.load();
		}

		/*--------------------------------------------------------------------------
	 	When you pass a song object it plays that song right awawy.  It sets
	 	the active song in the config to the song you pass in and synchronizes
	 	the visuals.
	 	
	 	Public Accessor: Amplitude.playNow( song_json )
	 		@param song JSON representation of a song.
	 		TODO: Make sure that the globals get adjusted for the now playing.
	 --------------------------------------------------------------------------*/
		function playNow(song) {
			/*
	  	Makes sure the song object has a URL associated with it
	  	or there will be nothing to play.
	  */
			if (song.url) {
				_config2.default.active_song.src = song.url;
				_config2.default.active_metadata = song;
				_config2.default.active_album = song.album;
			} else {
				privateHelpWriteDebugMessage('The song needs to have a URL!');
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
	 	Sets the playback speed for the song.
	 		@param float playbackSpeed The speed we want the song to play back at.
	 --------------------------------------------------------------------------*/
		function setPlaybackSpeed(playbackSpeed) {
			/*
	  	Set the config playback speed.
	  */
			_config2.default.playback_speed = playbackSpeed;

			/*
	  	Set the active song playback rate.
	  */
			_config2.default.active_song.playbackRate = _config2.default.playback_speed;
		}

		/*
	 	Return publically facing functions
	 */
		return {
			play: play,
			pause: pause,
			stop: stop,
			setVolume: setVolume,
			setSongLocation: setSongLocation,
			disconnectStream: disconnectStream,
			reconnectStream: reconnectStream,
			playNow: playNow,
			setPlaybackSpeed: setPlaybackSpeed
		};
	}();

	exports.default = AmplitudeCore;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	/*
	|-------------------------------------------------------------------------------
	| Module Variables
	|-------------------------------------------------------------------------------
	| These variables make Amplitude run. The config is the most important
	| containing active settings and parameters. 
	*/
	/*--------------------------------------------------------------------------
		The config JSON is the global settings for ALL of Amplitude functions.
		This is global and contains all of the user preferences. The default
		settings are set, and the user overwrites them when they initialize
		Amplitude.
	--------------------------------------------------------------------------*/
	var config = {
		/*
	 	The audio element we will be using to handle all of the audio. This
	 	is the javascript version of the HTML5 audio element.
	 */
		active_song: new Audio(),

		/*
	 	JSON object that contains the active metadata for the song.
	 */
		active_metadata: {},

		/*
	 	String to hold the active album name. Used to check and see if the
	 	album changed and run the album changed callback.
	 */
		active_album: '',

		/*
	 	Contains the index of the actively playing song.
	 */
		active_index: 0,

		/*
	 	Contains the key to the active playlist index.
	 */
		active_playlist: '',

		/*
	 	Set to true to autoplay the song
	 */
		autoplay: false,

		/*
	 	Sets the initial playback speed of the song. The values
	 	for this can be 1.0, 1.5, 2.0
	 */
		playback_speed: 1.0,

		/*
	 	The user can pass a JSON object with a key => value store of callbacks
	 	to be run at certain events.
	 */
		callbacks: {},

		/*
	 	Object containing all of the songs the user has passed to Amplitude
	 	to use.
	 */
		songs: {},

		/*
	 	Object containing all of the playlists the user created.
	 */
		playlists: {},

		/*
	 	Object that will contain shuffled playlists.
	 */
		shuffled_playlists: {},

		/*
	 	Object that contains whether the current playlist is in 
	 	shuffle mode or not.
	 */
		shuffled_statuses: {},

		/*
	 	When repeat is on, when the song ends the song will replay itself.
	 */
		repeat: false,

		/*
	 	When shuffled, this gets populated with the songs the user provided
	 	in a random order.
	 */
		shuffle_list: {},

		/*
	 	When shuffled is turned on this gets set to true so when traversing
	 	through songs Amplitude knows whether or not to use the songs object
	 	or the shuffle_list.
	 */
		shuffle_on: false,

		/*
	 	When shuffled, this index is used to let Amplitude know where it's
	 	at when traversing.
	 */
		shuffle_active_index: 0,

		/*
	 	The user can set default album art to be displayed if the song they
	 	set doesn't contain album art.
	 */
		default_album_art: '',

		/*
	 	When set to true, Amplitude will print to the console any errors
	 	that it runs into providing helpful feedback to the user.
	 */
		debug: false,

		/*
	 	The user can set the initial volume to a number between 0 and 1
	 	overridding a default of .5.
	 */
		volume: .5,

		/*
	 	This is set on mute so that when a user un-mutes Amplitude knows
	 	what to restore the volume to.
	 */
		pre_mute_volume: .5,

		/*
	 	This is an integer between 1 and 100 for how much the volume should
	 	increase when the user presses a volume up button.
	 */
		volume_increment: 5,

		/*
	 	This is an integer between 1 and 100 for how much the volume should
	 	decrease when the user presses a volume down button.
	 */
		volume_decrement: 5,

		/*
	 	When using SoundCloud, the user will have to provide their API Client
	 	ID
	 */
		soundcloud_client: '',

		/*
	 	The user can set this to true and Amplitude will use the album art
	 	for the song returned from the Soundcloud API
	 */
		soundcloud_use_art: false,

		/*
	 	Used on config to count how many songs are from soundcloud and
	 	compare it to how many are ready for when to move to the rest
	 	of the configuration.
	 */
		soundcloud_song_count: 0,

		/*
	 	Used on config to count how many songs are ready so when we get
	 	all of the data from the SoundCloud API that we need this should
	 	match the SoundCloud song count meaning we can move to the rest
	 	of the config.
	 */
		soundcloud_songs_ready: 0
	};

	module.exports = config;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _core = __webpack_require__(3);

	var _core2 = _interopRequireDefault(_core);

	var _visual = __webpack_require__(6);

	var _visual2 = _interopRequireDefault(_visual);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var config = __webpack_require__(4);


	/*
	|----------------------------------------------------------------------------------------------------
	| HELPER FUNCTIONS
	|----------------------------------------------------------------------------------------------------
	| For the sake of code clarity, these functions perform helper tasks 
	| assisting the logical functions with what they need such as setting
	| the proper song index after an event has occured.
	|
	| METHODS
	|	resetConfig()
	|	writeDebugMessage( message )
	|	runCallback( callbackName )
	|	changeSong( songIndex )
	*/
	var AmplitudeHelpers = function () {
		/*--------------------------------------------------------------------------
	 	Resets the config to the default state. This is called on initialize
	 	to ensure the user's config is what matters.
	 --------------------------------------------------------------------------*/
		function resetConfig() {
			config.active_song = new Audio();
			config.active_metadata = {};
			config.active_album = '';
			config.active_index = 0;
			config.active_playlist = '';
			config.autoplay = false;
			config.playback_speed = 1.0;
			config.callbacks = {};
			config.songs = {};
			config.playlists = {};
			config.shuffled_playlists = {};
			config.shuffled_statuses = {};
			config.repeat = false;
			config.shuffle_list = {};
			config.shuffle_on = false;
			config.shuffle_active_index = 0;
			config.default_album_art = '';
			config.debug = false;
			config.handle_song_elements = true;
			config.volume = .5;
			config.pre_mute_volume = .5;
			config.volume_increment = 5;
			config.volume_decrement = 5;
			config.soundcloud_client = '';
			config.soundcloud_use_art = false;
			config.soundcloud_song_count = 0;
			config.soundcloud_songs_ready = 0;
		}

		/*--------------------------------------------------------------------------
	 	Writes out debug message to the console if enabled.
	 		@param string message The string that gets printed to
	 	alert the user of a debugging error.
	 --------------------------------------------------------------------------*/
		function writeDebugMessage(message) {
			if (config.debug) {
				console.log(message);
			}
		}

		/*--------------------------------------------------------------------------
	 	Runs a user defined callback method
	 		@param string callbackName The name of the callback we are going to run.
	 --------------------------------------------------------------------------*/
		function runCallback(callbackName) {
			/*
	  	Checks to see if a user defined a callback method for the
	  	callback we are running.
	  */
			if (config.callbacks[callbackName]) {
				/*
	   	Build the callback function
	   */
				var callbackFunction = window[config.callbacks[callbackName]];

				/*
	   	Write a debug message stating the callback we are running
	   */
				writeDebugMessage('Running Callback: ' + callbackName);

				/*
	   	Run the callback function.
	   */
				callbackFunction();
			}
		}

		/*--------------------------------------------------------------------------
	 	Changes the active song in the config. This happens in multiple
	 	scenarios: The user clicks a play button that has an index that is
	 	different than what is currently playing, the song ends and the next
	 	song begins, etc.
	 		@param JSON song The song object of the song we are changing to.
	 --------------------------------------------------------------------------*/
		function changeSong(song) {
			/*
	  	Stops the currently playing song so we can adjust
	  	what we need.
	  */
			_core2.default.stop();

			/*
	  	FX-TODO: Stop Visualization
	  */

			/*
	  	Set all play buttons to pause while we change
	  	the song.
	  */
			_visual2.default.syncPlayPause('pause');

			/*
	  	Since it is a new song, we reset the song sliders. These
	  	react to time updates and will eventually be updated but we
	  	force update them is if there is a song slider bound to a
	  	specific song, they won't update.
	  */
			_visual2.default.resetSongSliders();

			/*
	  	Reset the song time vizualizations as well since those
	  	can be bound to a specific song.
	  */
			_visual2.default.resetSongTimeVisualizations();

			/*
	  	Reset all the time place holders accordingly.
	  */
			_visual2.default.resetTimes();

			/*
	  	Run a callback if an album is going
	  	to change.
	  */
			if (checkNewAlbum(song)) {
				runCallback('album_change');
			}

			/*
	  	Set the new song information so we can use the
	  	active meta data later on.
	  */
			setNewSong(song);

			/*
	  	Display the new visual metadata now that the config has
	  	been changed. This will show the new song.
	  */
			_visual2.default.displaySongMetadata();

			/*
	  	Sets the active container. This is a class that
	  	designers can use on an element that contains the current
	  	song's controls to show it's highlighted.
	  */
			_visual2.default.setActiveContainer();
		}

		/*--------------------------------------------------------------------------
	 	Checks to see if the new song to be played is different than the song
	 	that is currently playing. To be true, the user would have selected
	 	play on a new song with a new index. To be false, the user would have
	 	clicked play/pause on the song that was playing.
	 		@param int songIndex The index of the new song to be played.
	 --------------------------------------------------------------------------*/
		function checkNewSong(songIndex) {
			if (songIndex != config.active_index) {
				return true;
			} else {
				return false;
			}
		}

		/*--------------------------------------------------------------------------
	 	Checks to see if there is a new album
	 		@param string newAlbum Checks to see if the new song will have a new
	 	album.
	 --------------------------------------------------------------------------*/
		function checkNewAlbum(newAlbum) {
			if (config.active_album != newAlbum) {
				return true;
			} else {
				return false;
			}
		}

		/*--------------------------------------------------------------------------
	 	Sets the new song in the config. Sets the src of the audio object, 
	 	updates the	metadata and sets the active album.
	 		@param JSON song The song object of the song we are changing to.
	 --------------------------------------------------------------------------*/
		function setNewSong(song) {
			config.active_song.src = song.url;
			config.active_metadata = song;
			config.active_album = song.album;
		}

		/*
	 	Returns the public functions
	 */
		return {
			resetConfig: resetConfig,
			writeDebugMessage: writeDebugMessage,
			runCallback: runCallback,
			changeSong: changeSong,
			checkNewSong: checkNewSong,
			checkNewAlbum: checkNewAlbum
		};
	}();

	exports.default = AmplitudeHelpers;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _config = __webpack_require__(4);

	var _config2 = _interopRequireDefault(_config);

	var _helpers = __webpack_require__(7);

	var _helpers2 = _interopRequireDefault(_helpers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	var AmplitudeVisualSync = function () {
		/*--------------------------------------------------------------------------
	 	Visually displays the current time on the screen. This is called on
	 	time update for the current song.
	 		@param JSON currentTime An object containing the current time for the
	 	song in seconds, minutes, and hours.
	 		@param float completionPercentage The percent of the way through the song
	 	the user is at.
	 --------------------------------------------------------------------------*/
		function syncCurrentTime(currentTime, completionPercentage) {
			/*
	  	Set current hour display.
	  */
			_helpers2.default.syncCurrentHours(currentTime.hours);

			/*
	  	Set current minute display.
	  */
			_helpers2.default.syncCurrentMinutes(currentTime.minutes);

			/*
	  	Set current second display.
	  */
			_helpers2.default.syncCurrentSeconds(currentTime.seconds);

			/*
	  	Set current time display.
	  */
			_helpers2.default.syncCurrentTime(currentTime);

			/*
	  	Set all song sliders to be to the current percentage
	  	of the song played.
	  */
			_helpers2.default.syncSongSliders(completionPercentage);

			/*
	  	Set all visual sync song time visualizations. This will
	  	expand the div inside of the visualization to be the song
	  	played percentage.
	  */
			_helpers2.default.syncSongTimeVisualizations(completionPercentage);
		}

		/*--------------------------------------------------------------------------
	 	Visually sync all of the times to the initial time of 0. This is so 
	 	we can keep all the players in sync
	 --------------------------------------------------------------------------*/
		function resetTimes() {
			_helpers2.default.syncCurrentHours('00');
			_helpers2.default.syncCurrentMinutes('00');
			_helpers2.default.syncCurrentMinutes('00');
		}

		/*--------------------------------------------------------------------------
	 	Visually syncs the song sliders back to 0. This usually happens when
	 	a song has changed, we ensure that all song sliders get reset.
	 --------------------------------------------------------------------------*/
		function resetSongSliders() {
			var songSliders = document.getElementsByClassName("amplitude-song-slider");

			/*
	  	Iterate over all of the song sliders and set them to
	  	0 essentially resetting them.
	  */
			for (var i = 0; i < songSliders.length; i++) {
				songSliders[i].value = 0;
			}
		}

		/*--------------------------------------------------------------------------
	 	Visually syncs the song time visualizations. Like the song sliders,
	 	when a song is changed, these must be synced back to 0. Except 0 in
	 	this circumstance is the visualization status has 0 width.
	 --------------------------------------------------------------------------*/
		function resetSongTimeVisualizations() {
			var songTimeVisualizations = document.getElementsByClassName("amplitude-song-time-visualization");

			/*
	  	Iterate over all of the song time visualization elements and find their inner
	  	status and set that element's width to 0.
	  */
			for (var i = 0; i < songTimeVisualizations.length; i++) {
				var songTimeVisualizationStatus = songTimeVisualizations[i].querySelector('.amplitude-song-time-visualization-status');
				songTimeVisualizationStatus.setAttribute('style', 'width: 0px');
			}
		}

		/*--------------------------------------------------------------------------
	 	Applies the class 'amplitude-active-song-container' to the element 
	 	containing visual information regarding the active song.
	 		TODO: Make sure that when shuffling, this changes accordingly.
	 --------------------------------------------------------------------------*/
		function setActiveContainer() {
			var songContainers = document.getElementsByClassName('amplitude-song-container');

			/*
	  	Removes all of the active song containrs.
	  */
			for (var i = 0; i < songContainers.length; i++) {
				songContainers[i].classList.remove('amplitude-active-song-container');
			}

			/*
	  	Finds the active index and adds the active song container to the element
	  	that represents the song at the index. 
	  */
			if (document.querySelectorAll('.amplitude-song-container[amplitude-song-index="' + _config2.default.active_index + '"]')) {
				var songContainers = document.querySelectorAll('.amplitude-song-container[amplitude-song-index="' + _config2.default.active_index + '"]');

				for (i = 0; i < songContainers.length; i++) {
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
		function displaySongMetadata() {
			/*
	  	Define the image meta data keys. These are managed separately
	  	since we aren't actually changing the inner HTML of these elements.
	  */
			var imageMetaDataKeys = ['cover_art_url', 'station_art_url', 'podcast_episode_cover_art_url'];

			/*
	  	These are the ignored keys that we won't be worrying about displaying.
	  	Every other key in the song object can be displayed.
	  */
			var ignoredKeys = ['url', 'live'];

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
			for (var i = 0; i < songInfoElements.length; i++) {
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
				if (_config2.default.active_metadata[info] != undefined) {
					if (imageMetaDataKeys.indexOf(info) >= 0) {
						songInfoElements[i].setAttribute('src', _config2.default.active_metadata[info]);
					} else {
						songInfoElements[i].innerHTML = _config2.default.active_metadata[info];
					}
				} else {
					/*
	    	We look for the default album art because
	    	the actual key didn't exist. If the default album
	    	art doesn't exist then we set the src attribute
	    	to null.
	    */
					if (imageMetaDataKeys.indexOf(info) >= 0) {
						if (_config2.default.default_album_art != '') {
							songInfoElements[i].setAttribute('src', _config2.default.default_album_art);
						} else {
							songInfoElements[i].setAttribute('src', '');
						}
					} else {
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
		function syncPlaybackSpeed() {
			/*
	  	Gets all of the playback speed classes.
	  */
			var playbackSpeedClasses = document.getElementsByClassName("amplitude-playback-speed");

			/*
	  	Iterates over all of the playback speed classes
	  	applying the right speed class for visual purposes.
	  */
			for (var i = 0; i < playbackSpeedClasses.length; i++) {
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
				switch (_config2.default.playback_speed) {
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
		function syncVolumeSliders() {
			var amplitudeVolumeSliders = document.getElementsByClassName("amplitude-volume-slider");

			/*
	  	Iterates over all of the volume sliders for the song, setting the value
	  	to the config value.
	  */
			for (var i = 0; i < amplitudeVolumeSliders.length; i++) {
				amplitudeVolumeSliders[i].value = _config2.default.active_song.volume * 100;
			}
		}

		/*--------------------------------------------------------------------------
	 	Syncs all of the play pause buttons to the active state of the
	 	player.
	 		@param string state The state of the player.
	 --------------------------------------------------------------------------*/
		function syncPlayPause(state) {
			/*
	  	Get all play pause buttons.
	  */
			var playPauseElements = document.getElementsByClassName("amplitude-play-pause");

			/*
	  	Iterate over all of the play pause elements syncing the
	  	display visually.
	  */
			for (var i = 0; i < playPauseElements.length; i++) {
				/*
	   	Determines what classes we should add and remove
	   	from the elements.
	   */
				switch (state) {
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
						if (playPauseElements[i].getAttribute('amplitude-song-index') == _config2.default.active_index || playPauseElements[i].getAttribute('amplitude-playlist-main-play-pause') == _config2.default.active_playlist || playPauseElements[i].getAttribute('amplitude-main-play-pause') == 'true') {
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
			syncPlayPause: syncPlayPause
		};
	}();

	exports.default = AmplitudeVisualSync;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _config = __webpack_require__(4);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	|-------------------------------------------------------------------------------
	| VISUAL SYNC HELPER METHODS
	|-------------------------------------------------------------------------------
	| These methods help sync visual displays. They essentially make the visual sync 
	| methods smaller and more maintainable.
	|
	| METHODS
	|	syncCurrentHours( hours )
	|	syncCurrentMinutes( minutes )
	|	syncCurrentSeconds( seconds )
	|	syncCurrentTime( currentTime )
	|	syncSongSliders( songPlayedPercentage )
	|	syncSongTimeVisualizations( songPlayedPercentage )
	*/
	var AmplitudeVisualSyncHelpers = function () {
		/*--------------------------------------------------------------------------
	 	Updates any elements that display the current hour for the song.
	 		@param int hours An integer conaining how many hours into
	 	the song.
	 --------------------------------------------------------------------------*/
		function syncCurrentHours(hours) {
			/*
	  	Gets all of the song hour selectors.
	  */
			var hourSelectors = ['.amplitude-current-hours[amplitude-main-current-hours="true"]', '.amplitude-current-hours[amplitude-playlist-main-current-hours="' + _config2.default.active_playlist + '"]', '.amplitude-current-hours[amplitude-song-index="' + _config2.default.active_index + '"]'];

			/*
	  	Ensures that there are some hour selectors.
	  */
			if (document.querySelectorAll(hourSelectors.join()).length > 0) {
				/*
	   	Get all of the hour selectors
	   */
				var currentHourSelectors = document.querySelectorAll(hourSelectors.join());

				/*
	   	Set the current hour selector's inner html to hours passed in.
	   */
				for (var i = 0; i < currentHourSelectors.length; i++) {
					currentHourSelectors[i].innerHTML = hours;
				}
			}
		}

		/*--------------------------------------------------------------------------
	 	Updates any elements that display the current minutes for the song.
	 		@param int minutes An integer conaining how many minutes into
	 	the song.
	 --------------------------------------------------------------------------*/
		function syncCurrentMinutes(minutes) {
			/*
	  	Gets all of the song minute selectors.
	  */
			var minuteSelectors = ['.amplitude-current-minutes[amplitude-main-current-minutes="true"]', '.amplitude-current-minutes[amplitude-playlist-main-current-minutes="' + _config2.default.active_playlist + '"]', '.amplitude-current-minutes[amplitude-song-index="' + _config2.default.active_index + '"]'];

			/*
	  	Ensures that there are some minute selectors.
	  */
			if (document.querySelectorAll(minuteSelectors.join()).length > 0) {
				/*
	   	Get all of the minute selectors
	   */
				var currentMinuteSelectors = document.querySelectorAll(minuteSelectors.join());

				/*
	   	Set the current minute selector's inner html to minutes passed in.
	   */
				for (var i = 0; i < currentMinuteSelectors.length; i++) {
					currentMinuteSelectors[i].innerHTML = minutes;
				}
			}
		}

		/*--------------------------------------------------------------------------
	 	Updates any elements that display the current seconds for the song.
	 		@param int minutes An integer conaining how many seconds into
	 	the song.
	 --------------------------------------------------------------------------*/
		function syncCurrentSeconds(seconds) {
			/*
	  	Gets all of the song second selectors.
	  */
			var secondSelectors = ['.amplitude-current-seconds[amplitude-main-current-seconds="true"]', '.amplitude-current-seconds[amplitude-playlist-main-current-seconds="' + _config2.default.active_playlist + '"]', '.amplitude-current-seconds[amplitude-song-index="' + _config2.default.active_index + '"]'];

			/*
	  	Ensures that there are some second selectors.
	  */
			if (document.querySelectorAll(secondSelectors.join()).length > 0) {
				/*
	   	Get all of the second selectors
	   */
				var currentSecondSelectors = document.querySelectorAll(secondSelectors.join());

				/*
	   	Set the current second selector's inner html to seconds passed in.
	   */
				for (var i = 0; i < currentSecondSelectors.length; i++) {
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
		function syncCurrentTime(currentTime) {
			/*
	  	Gets all of the song time selectors.
	  */
			var timeSelectors = ['.amplitude-current-time[amplitude-main-current-time="true"]', '.amplitude-current-time[amplitude-playlist-main-current-time="' + _config2.default.active_playlist + '"]', '.amplitude-current-time[amplitude-song-index="' + _config2.default.active_index + '"]'];

			/*
	  	Ensures that there are some time selectors.
	  */
			if (document.querySelectorAll(timeSelectors.join()).length > 0) {
				/*
	   	Get all of the time selectors.
	   */
				var currentTimeSelectors = document.querySelectorAll(timeSelectors.join());

				/*
	   	Set the time selector's inner html to the current time for the song. The current
	   	time is computed by joining minutes and seconds.
	   */
				for (var i = 0; i < currentTimeSelectors.length; i++) {
					currentTimeSelectors[i].innerHTML = currentTime.minutes + ':' + currentTime.seconds;
				}
			}
		}

		/*--------------------------------------------------------------------------
	 	Updates all of the song sliders which are the range inputs the
	 	user can interact with.
	 		@param float songPlayedPercentage The percentage of the song that
	 	has been played.
	 --------------------------------------------------------------------------*/
		function syncSongSliders(songPlayedPercentage) {
			/*
	  	Gets all of the song sliders
	  */
			var songSliders = ['[amplitude-singular-song-slider="true"]', 'input[amplitude-song-index="' + _config2.default.active_index + '"]'];

			/*
	  	Ensures that there are song sliders.
	  */
			if (document.querySelectorAll(songSliders.join()).length > 0) {
				/*
	   	Get all of the song sliders
	   */
				var songSliders = document.querySelectorAll(songSliders.join());

				/*
	   	Iterate over the song time sliders and set their value
	   	the song played percentage.
	   */
				for (var i = 0; i < currentTimeSelectors.length; i++) {
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
		function syncSongTimeVisualizations(songPlayedPercentage) {
			/*
	  	Gets all of the song time visualizations.
	  */
			var songTimeVisualizations = ['[amplitude-main-song-time-visualization="true"]', '.amplitude-song-time-visualization[amplitude-song-index="' + _config2.default.active_index + '"]'];

			/*
	  	Ensures that there are song time visualizations.
	  */
			if (document.querySelectorAll(songTimeVisualizations.join()).length > 0) {
				/*
	   	Get all of the song time visualizations.
	   */
				var songTimeVisualizations = document.querySelectorAll(songTimeVisualizations.join());

				/*
	   	Iterate over the song time visualizations, compute the width of the inner
	   	element that displays the percentage of the song played.
	   */
				for (var i = 0; i < songTimeVisualizations.length; i++) {
					var songTimeVisualizationStatus = songTimeVisualizations[i].querySelectorAll('.amplitude-song-time-visualization-status');
					var visualizationWidth = songTimeVisualizations[i].offsetWidth;
					var computedWidth = visualizationWidth * (songPlayedPercentage / 100);

					/*
	    	Set the inner element width to the computed width. This allows for the user
	    	to define the width of the outer element and this will fill proportionally.
	    */
					songTimeVisualizationStatus[0].setAttribute('style', 'width: ' + computedWidth + 'px');
				}
			}
		}

		/*
	 	Return the publically available functions.
	 */
		return {
			syncCurrentHours: syncCurrentHours,
			syncCurrentMinutes: syncCurrentMinutes,
			syncCurrentSeconds: syncCurrentSeconds,
			syncCurrentTime: syncCurrentTime,
			syncSongSliders: syncSongSliders,
			syncSongTimeVisualizations: syncSongTimeVisualizations
		};
	}();

	exports.default = AmplitudeVisualSyncHelpers;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _config = __webpack_require__(4);

	var _config2 = _interopRequireDefault(_config);

	var _helpers = __webpack_require__(5);

	var _helpers2 = _interopRequireDefault(_helpers);

	var _handlers = __webpack_require__(9);

	var _handlers2 = _interopRequireDefault(_handlers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	|----------------------------------------------------------------------------------------------------
	| EVENTS METHODS
	|----------------------------------------------------------------------------------------------------
	| These methods are called when we need to bind events to certain elements.
	|
	| METHODS:
	| 	initializeEvents()
	|	bindPlay()
	|	bindPause()
	|	bindPlayPause()
	|	bindStop()
	|	bindMute()
	|	bindVolumeUp()
	|	bindVolumeDown()
	|	bindSongSlider()
	|	bindVolumeSlider()
	|	bindNext()
	|	bindPrev()
	|	bindShuffle()
	|	bindRepeat()
	|	bindPlaybackSpeed()
	|	bindSkipTo()
	*/
	var AmplitudeEvents = function () {
		/*--------------------------------------------------------------------------
	 	Initializes the handlers for the events listened to by Amplitude
	 --------------------------------------------------------------------------*/
		function initializeEvents() {
			/*
	  	Write out debug message
	  */
			_helpers2.default.writeDebugMessage('Beginning initialization of event handlers..');

			/*
	  	On time update for the audio element, update visual displays that
	  	represent the time on either a visualized element or time display.
	  */
			bindTimeUpdate();

			/*
	  	When the audio element has ended playing, we handle the song
	  	ending. In a single song or multiple modular song instance,
	  	this just synchronizes the visuals for time and song time
	  	visualization, but for a playlist it determines whether
	  	it should play the next song or not.
	  */
			bindSongEnded();

			/*
	  	Binds 'amplitude-play' event handlers
	  */
			bindPlay();

			/*
	  	Binds 'amplitude-pause' event handlers.
	  */
			bindPause();

			/*
	  	Binds 'amplitude-play-pause' event handlers.
	  */
			bindPlayPause();

			/*
	  	Binds 'amplitude-stop' event handlers.
	  */
			bindStop();

			/*
	  	Binds 'amplitude-mute' event handlers.
	  */
			bindMute();

			/*
	  	Binds 'amplitude-volume-up' event handlers
	  */
			bindVolumeUp();

			/*
	  	Binds 'amplitude-volume-down' event handlers
	  */
			bindVolumeDown();

			/*
	  	Binds 'amplitude-volume-up' event handlers
	  */
			bindSongSlider();

			/*
	  	Binds 'amplitude-song-slider' event handlers.
	  */
			bindVolumeSlider();

			/*
	  	Binds 'amplitude-next' event handlers.
	  */
			bindNext();

			/*
	  	Binds 'amplitude-prev' event handlers.
	  */
			bindPrev();

			/*
	  	Binds 'amplitude-shuffle' event handlers.
	  */
			bindShuffle();

			/*
	  	Binds 'amplitude-repeat' event handlers.
	  */
			bindRepeat();

			/*
	  	Binds 'amplitude-playback-speed' event handlers.
	  */
			bindPlaybackSpeed();

			/*
	  	Binds 'amplitude-skip-to' event handlers.
	  */
			bindSkipTo();
		}

		/*--------------------------------------------------------------------------
	 	On time update for the audio element, update visual displays that
	 		represent the time on either a visualized element or time display.
	 --------------------------------------------------------------------------*/
		function bindTimeUpdate() {
			_config2.default.active_song.removeEventListener('timeupdate', _handlers2.default.updateTime);
			_config2.default.active_song.addEventListener('timeupdate', _handlers2.default.updateTime);
		}

		/*--------------------------------------------------------------------------
	 	When the audio element has ended playing, we handle the song
	 	ending. In a single song or multiple modular song instance,
	 	this just synchronizes the visuals for time and song time
	 	visualization, but for a playlist it determines whether
	 	it should play the next song or not.
	 --------------------------------------------------------------------------*/
		function bindSongEnded() {
			_config2.default.active_song.removeEventListener('ended', _handlers2.default.songEnded);
			_config2.default.active_song.addEventListener('ended', _handlers2.default.songEnded);
		}

		/*--------------------------------------------------------------------------
	 	BINDS: class="amplitude-play"
	 		Binds click and touchstart events for amplitude play buttons.
	 --------------------------------------------------------------------------*/
		function bindPlay() {
			/*
	  	Gets all of the elements with the class amplitude-play
	  */
			var play_classes = document.getElementsByClassName("amplitude-play");

			/*
	  	Iterates over all of the play classes and binds the event interaction
	  	method to the element. If the browser is mobile, then the event is touchstart
	  	otherwise it is click.
	  */
			for (var i = 0; i < play_classes.length; i++) {
				if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
					play_classes[i].removeEventListener('touchstart', _handlers2.default.play);
					play_classes[i].addEventListener('touchstart', _handlers2.default.play);
				} else {
					play_classes[i].removeEventListener('click', _handlers2.default.play);
					play_classes[i].addEventListener('click', _handlers2.default.play);
				}
			}
		}

		/*--------------------------------------------------------------------------
	 	BINDS: class="amplitude-pause"
	 		Binds click and touchstart events for amplitude pause buttons.
	 --------------------------------------------------------------------------*/
		function bindPause() {
			/*
	  	Gets all of the elements with the class amplitude-pause
	  */
			var pause_classes = document.getElementsByClassName("amplitude-pause");

			/*
	  	Iterates over all of the pause classes and binds the event interaction
	  	method to the element. If the browser is mobile, then the event is touchstart
	  	otherwise it is click.
	  */
			for (var i = 0; i < pause_classes.length; i++) {
				if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
					pause_classes[i].removeEventListener('touchstart', _handlers2.default.pause);
					pause_classes[i].addEventListener('touchstart', _handlers2.default.pause);
				} else {
					pause_classes[i].removeEventListener('click', _handlers2.default.pause);
					pause_classes[i].addEventListener('click', _handlers2.default.pause);
				}
			}
		}

		/*--------------------------------------------------------------------------
	 	BINDS: class="amplitude-play-pause"
	 	
	 	Binds click and touchstart events for amplitude play pause buttons.
	 --------------------------------------------------------------------------*/
		function bindPlayPause() {
			/*
	  	Gets all of the elements with the class amplitude-play-pause
	  */
			var play_pause_classes = document.getElementsByClassName("amplitude-play-pause");

			/*
	  	Iterates over all of the play/pause classes and binds the event interaction
	  	method to the element. If the browser is mobile, then the event is touchstart
	  	otherwise it is click.
	  */
			for (var i = 0; i < play_pause_classes.length; i++) {
				if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
					play_pause_classes[i].removeEventListener('touchstart', _handlers2.default.playPause);
					play_pause_classes[i].addEventListener('touchstart', _handlers2.default.playPause);
				} else {
					play_pause_classes[i].removeEventListener('click', _handlers2.default.playPause);
					play_pause_classes[i].addEventListener('click', _handlers2.default.playPause);
				}
			}
		}

		/*--------------------------------------------------------------------------
	 	BINDS: class="amplitude-stop"
	 		Binds click and touchstart events for amplitude stop buttons
	 --------------------------------------------------------------------------*/
		function bindStop() {
			/*
	  	Gets all of the elements with the class amplitude-stop
	  */
			var stop_classes = document.getElementsByClassName("amplitude-stop");

			/*
	  	Iterates over all of the stop classes and binds the event interaction
	  	method to the element.  If the browser is mobile, then the event is touchstart
	  	otherwise it is click.
	  */
			for (var i = 0; i < stop_classes.length; i++) {
				if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
					stop_classes[i].removeEventListener('touchstart', _handlers2.default.stop);
					stop_classes[i].addEventListener('touchstart', _handlers2.default.stop);
				} else {
					stop_classes[i].removeEventListener('click', _handlers2.default.stop);
					stop_classes[i].addEventListener('click', _handlers2.default.stop);
				}
			}
		}

		/*--------------------------------------------------------------------------
	 	BINDS: class="amplitude-mute"
	 		Binds click and touchstart events for amplitude mute buttons
	 --------------------------------------------------------------------------*/
		function bindMute() {
			/*
	  	Gets all of the elements with the class amplitue-mute			
	  */
			var mute_classes = document.getElementsByClassName("amplitude-mute");

			/*
	  	Iterates over all of the mute classes and binds the event interaction
	  	method to the element. If the browser is mobile, then the event is touchstart
	  	otherwise it is click.
	  */
			for (var i = 0; i < mute_classes.length; i++) {
				/*
	   	WARNING: If iOS, we don't do anything because iOS does not allow the
	   	volume to be adjusted through anything except the buttons on the side of
	   	the device.
	   */
				if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
					/*
	    	Checks for an iOS device and displays an error message if debugging
	    	is turned on.
	    */
					if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
						privateHelpWriteDebugMessage('iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4');
					} else {
						mute_classes[i].removeEventListener('touchstart', _handlers2.default.mute);
						mute_classes[i].addEventListener('touchstart', _handlers2.default.mute);
					}
				} else {
					mute_classes[i].removeEventListener('click', _handlers2.default.mute);
					mute_classes[i].addEventListener('click', _handlers2.default.mute);
				}
			}
		}

		/*--------------------------------------------------------------------------
	 	BINDS: class="amplitude-volume-up"
	 		Binds click and touchstart events for amplitude volume up buttons
	 --------------------------------------------------------------------------*/
		function bindVolumeUp() {
			/*
	  	Gets all of the elements with the class amplitude-volume-up			
	  */
			var volume_up_classes = document.getElementsByClassName("amplitude-volume-up");

			/*
	  	Iterates over all of the volume up classes and binds the event interaction
	  	methods to the element. If the browser is mobile, then the event is touchstart
	  	otherwise it is click.
	  */
			for (var i = 0; i < volume_up_classes.length; i++) {
				/*
	   	WARNING: If iOS, we don't do anything because iOS does not allow the
	   	volume to be adjusted through anything except the buttons on the side of
	   	the device.
	   */
				if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
					/*
	    	Checks for an iOS device and displays an error message if debugging
	    	is turned on.
	    */
					if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
						privateHelpWriteDebugMessage('iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4');
					} else {
						volume_up_classes[i].removeEventListener('touchstart', _handlers2.default.volumeUp);
						volume_up_classes[i].addEventListener('touchstart', _handlers2.default.volumeUp);
					}
				} else {
					volume_up_classes[i].removeEventListener('click', _handlers2.default.volumeUp);
					volume_up_classes[i].addEventListener('click', _handlers2.default.volumeUp);
				}
			}
		}

		/*--------------------------------------------------------------------------
	 	BINDS: class="amplitude-volume-down"
	 		Binds click and touchstart events for amplitude volume down buttons
	 --------------------------------------------------------------------------*/
		function bindVolumeDown() {
			/*
	  	Gets all of the elements with the class amplitude-volume-down			
	  */
			var volume_down_classes = document.getElementsByClassName("amplitude-volume-down");

			/*
	  	Iterates over all of the volume down classes and binds the event interaction
	  	methods to the element. If the browser is mobile, then the event is touchstart
	  	otherwise it is click.
	  */
			for (var i = 0; i < volume_down_classes.length; i++) {
				/*
	   	WARNING: If iOS, we don't do anything because iOS does not allow the
	   	volume to be adjusted through anything except the buttons on the side of
	   	the device.
	   */
				if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
					/*
	    	Checks for an iOS device and displays an error message if debugging
	    	is turned on.
	    */
					if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
						privateHelpWriteDebugMessage('iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4');
					} else {
						volume_down_classes[i].removeEventListener('touchstart', _handlers2.default.volumeDown);
						volume_down_classes[i].addEventListener('touchstart', _handlers2.default.volumeDown);
					}
				} else {
					volume_down_classes[i].removeEventListener('click', _handlers2.default.volumeDown);
					volume_down_classes[i].addEventListener('click', _handlers2.default.volumeDown);
				}
			}
		}

		/*--------------------------------------------------------------------------
	 	BINDS: class="amplitude-song-slider"
	 		Binds change and input events for amplitude song slider inputs
	 --------------------------------------------------------------------------*/
		function bindSongSlider() {
			/*
	  	Gets browser so if we need to apply overrides, like we usually
	  	have to do for anything cool in IE, we can do that.
	  */
			var ua = window.navigator.userAgent;
			var msie = ua.indexOf("MSIE ");

			/*
	  	Gets all of the elements with the class amplitude-song-slider
	  */
			var song_sliders = document.getElementsByClassName("amplitude-song-slider");

			/*
	  	Iterates over all of the song slider classes and binds the event interaction
	  	methods to the element. If the browser is IE we listen to the change event
	  	where if it is anything else, it's the input method.
	  */
			for (var i = 0; i < song_sliders.length; i++) {
				if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
					song_sliders[i].removeEventListener('change', _handlers2.default.songSlider);
					song_sliders[i].addEventListener('change', _handlers2.default.songSlider);
				} else {
					song_sliders[i].removeEventListener('input', _handlers2.default.songSlider);
					song_sliders[i].addEventListener('input', _handlers2.default.songSlider);
				}
			}
		}

		/*--------------------------------------------------------------------------
	 	BINDS: class="amplitude-volume-slider"
	 		Binds change and input events for amplitude volume slider inputs
	 --------------------------------------------------------------------------*/
		function bindVolumeSlider() {
			/*
	  	Gets browser so if we need to apply overrides, like we usually
	  	have to do for anything cool in IE, we can do that.
	  */
			var ua = window.navigator.userAgent;
			var msie = ua.indexOf("MSIE ");

			/*
	  Gets all of the elements with the class amplitude-volume-slider
	  */
			var volume_sliders = document.getElementsByClassName("amplitude-volume-slider");

			/*
	  	Iterates over all of the volume slider classes and binds the event interaction
	  	methods to the element. If the browser is IE we listen to the change event
	  	where if it is anything else, it's the input method.
	  */
			for (var i = 0; i < volume_sliders.length; i++) {
				/*
	   	WARNING: If iOS, we don't do anything because iOS does not allow the
	   	volume to be adjusted through anything except the buttons on the side of
	   	the device.
	   */
				if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
					privateHelpWriteDebugMessage('iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4');
				} else {
					if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
						volume_sliders[i].removeEventListener('change', _handlers2.default.volumeSlider);
						volume_sliders[i].addEventListener('change', _handlers2.default.volumeSlider);
					} else {
						volume_sliders[i].removeEventListener('input', _handlers2.default.volumeSlider);
						volume_sliders[i].addEventListener('input', _handlers2.default.volumeSlider);
					}
				}
			}
		}

		/*--------------------------------------------------------------------------
	 	BINDS: class="amplitude-next"
	 		Binds click and touchstart events for amplitude next buttons.
	 --------------------------------------------------------------------------*/
		function bindNext() {
			/*
	  	Gets all of the elements with the class amplitude-next
	        */
			var next_classes = document.getElementsByClassName("amplitude-next");

			/*
	  	Iterates over all of the next classes and binds the event interaction
	  	methods to the element. If the browser is mobile, then the event is touchstart
	  	otherwise it is click.
	  */
			for (var i = 0; i < next_classes.length; i++) {
				if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
					next_classes[i].removeEventListener('touchstart', _handlers2.default.next);
					next_classes[i].addEventListener('touchstart', _handlers2.default.next);
				} else {
					next_classes[i].removeEventListener('click', _handlers2.default.next);
					next_classes[i].addEventListener('click', _handlers2.default.next);
				}
			}
		}

		/*--------------------------------------------------------------------------
	 	BINDS: class="amplitude-prev"
	 		Binds click and touchstart events for amplitude prev buttons.
	 --------------------------------------------------------------------------*/
		function bindPrev() {
			/*
	  	Gets all of the elements with the class amplitude-prev
	  */
			var prev_classes = document.getElementsByClassName("amplitude-prev");

			/*
	  	Iterates over all of the prev classes and binds the event interaction
	  	methods to the element. If the browser is mobile, then the event is touchstart
	  	otherwise it is click.
	  */
			for (var i = 0; i < prev_classes.length; i++) {
				if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
					prev_classes[i].removeEventListener('touchstart', _handlers2.default.prev);
					prev_classes[i].addEventListener('touchstart', _handlers2.default.prev);
				} else {
					prev_classes[i].removeEventListener('click', _handlers2.default.prev);
					prev_classes[i].addEventListener('click', _handlers2.default.prev);
				}
			}
		}

		/*--------------------------------------------------------------------------
	 	BINDS: class="amplitude-shuffle"
	 		Binds click and touchstart events for amplitude shuffle buttons.
	 --------------------------------------------------------------------------*/
		function bindShuffle() {
			/*
	  	Gets all of the elements with the class amplitude-shuffle
	  */
			var shuffle_classes = document.getElementsByClassName("amplitude-shuffle");

			/*
	  	Iterates over all of the shuffle classes and binds the event interaction
	  	methods to the element. If the browser is mobile, then the event is touchstart
	  	otherwise it is click.
	  */
			for (var i = 0; i < shuffle_classes.length; i++) {
				/*
	   	Since we are re-binding everything we remove any classes that signify 
	   	a state of the shuffle control.
	   */
				shuffle_classes[i].classList.remove('amplitude-shuffle-on');
				shuffle_classes[i].classList.add('amplitude-shuffle-off');

				if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
					shuffle_classes[i].removeEventListener('touchstart', _handlers2.default.shuffle);
					shuffle_classes[i].addEventListener('touchstart', _handlers2.default.shuffle);
				} else {
					shuffle_classes[i].removeEventListener('click', _handlers2.default.shuffle);
					shuffle_classes[i].addEventListener('click', _handlers2.default.shuffle);
				}
			}
		}

		/*--------------------------------------------------------------------------
	 	BINDS: class="amplitude-repeat"
	 		Binds click and touchstart events for amplitude repeat buttons.
	 --------------------------------------------------------------------------*/
		function bindRepeat() {
			/*
	  	Gets all of the elements with the class amplitude-repeat
	  */
			var repeat_classes = document.getElementsByClassName("amplitude-repeat");

			/*
	  	Iterates over all of the repeat classes and binds the event interaction
	  	methods to the element. If the browser is mobile, then the event is touchstart
	  	otherwise it is click.
	  */
			for (var i = 0; i < repeat_classes.length; i++) {
				/*
	   	Since we are re-binding everything we remove any classes that signify 
	   	a state of the repeat control.
	   */
				repeat_classes[i].classList.remove('amplitude-repeat-on');
				repeat_classes[i].classList.add('amplitude-repeat-off');

				if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
					repeat_classes[i].removeEventListener('touchstart', _handlers2.default.repeat);
					repeat_classes[i].addEventListener('touchstart', _handlers2.default.repeat);
				} else {
					repeat_classes[i].removeEventListener('click', _handlers2.default.repeat);
					repeat_classes[i].addEventListener('click', _handlers2.default.repeat);
				}
			}
		}

		/*--------------------------------------------------------------------------
	 	BINDS: class="amplitude-playback-speed"
	 		Binds click and touchstart events for amplitude playback speed buttons.
	 		TODO: Remove classes that represent different speeds.
	 --------------------------------------------------------------------------*/
		function bindPlaybackSpeed() {
			/*
	  	Gets all of the elements with the class amplitude-playback-speed
	  */
			var playback_speed_classes = document.getElementsByClassName("amplitude-playback-speed");

			/*
	  	Iterates over all of the playback speed classes and binds the event interaction
	  	methods to the element. If the browser is mobile, then the event is touchstart
	  	otherwise it is click.
	  */
			for (var i = 0; i < playback_speed_classes.length; i++) {
				if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
					playback_speed_classes[i].removeEventListener('touchstart', _handlers2.default.playbackSpeed);
					playback_speed_classes[i].addEventListener('touchstart', _handlers2.default.playbackSpeed);
				} else {
					playback_speed_classes[i].removeEventListener('click', _handlers2.default.playbackSpeed);
					playback_speed_classes[i].addEventListener('click', _handlers2.default.playbackSpeed);
				}
			}
		}

		/*--------------------------------------------------------------------------
	 	BINDS: class="amplitude-skip-to"
	 		Binds click and touchstart events for amplitude skip to buttons.
	 		TODO: Add a way to skip to any song with this button. Should have a
	 	song index and a time location.
	 --------------------------------------------------------------------------*/
		function bindSkipTo() {}

		return {
			initializeEvents: initializeEvents
		};
	}(); /*
	     	Import the necessary classes and config to use
	     	with the events.
	     */
	exports.default = AmplitudeEvents;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _config = __webpack_require__(4);

	var _config2 = _interopRequireDefault(_config);

	var _helpers = __webpack_require__(10);

	var _helpers2 = _interopRequireDefault(_helpers);

	var _visual = __webpack_require__(6);

	var _visual2 = _interopRequireDefault(_visual);

	var _core = __webpack_require__(3);

	var _core2 = _interopRequireDefault(_core);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	exports.default = {
		/*--------------------------------------------------------------------------
	 	Handles an update on the current song's time.
	 --------------------------------------------------------------------------*/
		updateTime: function updateTime() {
			/*
	  	If the current song is not live, then
	  	we can update the time information. Otherwise the
	  	current time updates wouldn't mean much since the time
	  	is infinite.
	  */
			if (!_config2.default.active_metadata.live) {
				/*
	   	Compute the current time
	   */
				var currentTime = _helpers2.default.computeCurrentTimes();

				/*
	   	Compute the song completion percentage
	   */
				var songCompletionPercentage = _helpers2.default.computeSongCompletionPercentage();

				/*
	   	Sync the current time elements with the current
	   	location of the song.
	   */
				_visual2.default.syncCurrentTime(currentTime, songCompletionPercentage);
			}
		},

		songEnded: function songEnded() {},

		play: function play() {
			/*
	  	Gets the attribute for song index so we can check if
	  	there is a need to change the song.  In some scenarios
	  	there might be multiple play classes on the page. In that
	  	case it is possible the user could click a different play
	  	class and change the song.
	  */
			var playButtonSongIndex = this.getAttribute('amplitude-song-index');

			/*
	  	We set the new song if the user clicked a song with a different
	  	index. If it's the same as what's playing then we don't set anything. 
	  	If it's different we reset all song sliders.
	  */
			if (_helpers2.default.checkNewSong(playButtonSongIndex)) {
				//TODO: Implement change song method
				AmplitudeHelpers.changeSong(_config2.default.songs[playButtonSongIndex]);
			}

			// TODO: We should method this out so we can use it in the play/pause interaction

			/*
	  	Start the visualizations for the song. 
	  	AMPFX-TODO: MAKE HANDLED BY AMPLITUDE FX
	  */
			//privateStartVisualization();

			/*
	  	Play the song through the core play function.
	  */
			_core2.default.play();
		},

		/*--------------------------------------------------------------------------
	 	Handles an event on a pause element.
	 		TODO: Check to see that the pause element has an index and if that
	 	index matches the current song being played.  If it's different then
	 	we should disable it? If the user clicks on song-index=1 pause and 
	 	song-index=2 is being played, is it right to pause?
	 --------------------------------------------------------------------------*/
		pause: function pause() {
			_core2.default.pause();
		},

		playPause: function playPause() {
			/*--------------------------------------------------------------------------
	  	Plays or Pauses the current song. This is the logic for main play 
	  	pause buttons. This is the simplist implementation since it just plays
	  	or pauses the active song.
	  --------------------------------------------------------------------------*/
			if (this.getAttribute('amplitude-main-play-pause') != null) {
				/*
	   	Determines what action we should take based on the
	   	state of the song.
	   */
				if (_config2.default.active_song.paused) {
					/*
	    	The song was paused so we sync visually for the song
	    	that is playing and we play the song.
	    */
					_visual2.default.syncPlayPause('playing');
					_core2.default.play();
				} else {
					/*
	    	The song was playing so we sync visually for the song
	    	to be paused and we pause the song.
	    */
					_visual2.default.syncPlayPause('paused');
					_core2.default.pause();
				}
			} else if (this.getAttribute('amplitude-playlist-main-play-pause') != null) {
				//privateEventHelperPlayPauseMainPlaylist( this.getAttribute('amplitude-playlist-main-play-pause') );
				/*
	   	Scenario 2: Play pause button for a playlist
	   		Check if play pause is for a different playlist.
	   		If the playlist is different, we go to the first song in the playlist or first
	   		song in the playlist shuffle array.
	   */
				//console.log( 'PLAYLIST: playlist -> '+playlist );
			} else {
					/*
	    	Scenario 1: Play pause button for an individual song
	    		if playlist != null
	    		Check if playlist changes
	    		Check if the song IDs change
	    		If paused, play. If playing, pause
	    */
					//console.log( 'INDIVIDUAL: index -> '+songIndex+' playlist -> '+playlist );
					//privateEventHelperPlayPauseSong( this.getAttribute('amplitude-song-index'), this.getAttribute('amplitude-playlist') );
				}
		},

		/*--------------------------------------------------------------------------
	 	Handles an event on a stop element.
	 		TODO: Before stopping, make sure that AmplitudeFX visualization
	 	is stopped as well.
	 --------------------------------------------------------------------------*/
		stop: function stop() {
			_core2.default.stop();
		},

		mute: function mute() {},

		volumeUp: function volumeUp() {},

		volumeDown: function volumeDown() {},

		songSlider: function songSlider() {},

		volumeSlider: function volumeSlider() {},

		next: function next() {},

		prev: function prev() {},

		shuffle: function shuffle() {},

		repeat: function repeat() {},

		playbackSpeed: function playbackSpeed() {
			/*
	  	We increment the speed by .5 everytime we click
	  	the button to change the playback speed. Once we are
	  	actively playing back at 2, we start back at 1 which
	  	is normal speed.
	  */
			switch (_config2.default.playback_speed) {
				case 1:
					_helpers2.default.setPlaybackSpeed(1.5);
					break;
				case 1.5:
					_helpers2.default.setPlaybackSpeed(2);
					break;
				case 2:
					_helpers2.default.setPlaybackSpeed(1);
					break;
			}

			/*
	  	Visually sync the playback speed.
	  */
			_visual2.default.syncPlaybackSpeed();
		},

		skipTo: function skipTo() {}
	};
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _config = __webpack_require__(4);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	|-------------------------------------------------------------------------------
	| EVENT HANDLER HELPER METHODS
	|-------------------------------------------------------------------------------
	| These methods help handle interactions whether it's computation or shuffling 
	| songs.
	|
	| METHODS
	|	computeCurrentTimes()
	|	computeSongDuration()
	|	computeSongCompletionPercentage()
	*/
	var AmplitudeEventHelpers = function () {
		/*--------------------------------------------------------------------------
	 	Computes the current song time. Breaks down where the song is into
	 	hours, minutes, seconds and formats it to be displayed to the user.
	 --------------------------------------------------------------------------*/
		function computeCurrentTimes() {
			/*
	  	Initialize the current time object that will be returned.
	  */
			var currentTime = {};

			/*
	  	Computes the current seconds for the song.
	  */
			var currentSeconds = (Math.floor(_config2.default.active_song.currentTime % 60) < 10 ? '0' : '') + Math.floor(_config2.default.active_song.currentTime % 60);

			/*
	  	Computes the current minutes for the song.
	  */
			var currentMinutes = Math.floor(_config2.default.active_song.currentTime / 60);

			/*
	  	Initialize the current hours variable.
	  */
			var currentHours = '00';

			/*
	  	If the current minutes is less than 10, we add a leading 0.
	  */
			if (currentMinutes < 10) {
				currentMinutes = '0' + currentMinutes;
			}

			/*
	  	If the user is more than 60 minutes into the song, then
	  	we extract the hours.
	  */
			if (currentMinutes > 60) {
				currentHours = Math.floor(currentMinutes / 60);
				currentMinutes = currentMinutes % 60;

				/*
	   	If the user is less than 10 hours in, we append the
	   	additional 0 to the hours.
	   */
				if (currentHours < 10) {
					currentHours = '0' + currentHours;
				}

				/*
	   	If the user is less than 10 minutes in, we append the
	   	additional 0 to the minutes.
	   */
				if (currentMinutes < 10) {
					currentMinutes = '0' + currentMinutes;
				}
			}

			/*
	  	Build a clean current time object and send back the appropriate information.
	  */
			currentTime.seconds = currentSeconds;
			currentTime.minutes = currentMinutes;
			currentTime.hours = currentHours;

			return currentTime;
		}

		/*--------------------------------------------------------------------------
	 	Computes the current song duration. Breaks down where the song is into
	 	hours, minutes, seconds and formats it to be displayed to the user.
	 --------------------------------------------------------------------------*/
		function computeSongDuration() {
			/*
	  	Initialize the song duration object that will be returned.
	  */
			var songDuration = {};

			/*
	  	Computes the duration of the song's seconds.
	  */
			var songDurationSeconds = (Math.floor(_config2.default.active_song.duration % 60) < 10 ? '0' : '') + Math.floor(_config2.default.active_song.duration % 60);

			/*
	  	Computes the duration of the song's minutes.
	  */
			var songDurationMinutes = Math.floor(_config2.default.active_song.duration / 60);

			/*
	  	Initialize the hours duration variable.
	  */
			var songDurationHours = '00';

			/*
	  	If the song duration minutes is less than 10, we add a leading 0.
	  */
			if (songDurationMinutes < 10) {
				songDurationMinutes = '0' + songDurationMinutes;
			}

			/*
	  	If there is more than 60 minutes in the song, then we
	  	extract the hours.
	  */
			if (songDurationMinutes > 60) {
				songDurationHours = Math.floor(songDurationMinutes / 60);
				songDurationMinutes = songDurationMinutes % 60;

				/*
	   	If the song duration hours is less than 10 we append
	   	the additional 0.
	   */
				if (songDurationHours < 10) {
					songDurationHours = '0' + songDurationHours;
				}

				/*
	   	If the song duration minutes is less than 10 we append
	   	the additional 0.
	   */
				if (songDurationMinutes < 10) {
					songDurationMinutes = '0' + songDurationMinutes;
				}
			}

			/*
	  	Build a clean song duration object and send back the appropriate information.
	  */
			songDuration.seconds = songDurationSeconds;
			songDuration.minutes = songDurationMinutes;
			songDuration.hours = songDurationHours;

			return songDuration;
		}

		/*--------------------------------------------------------------------------
	 	Computes the song completion percentage.
	 --------------------------------------------------------------------------*/
		function computeSongCompletionPercentage() {
			return _config2.default.active_song.currentTime / _config2.default.active_song.duration * 100;
		}

		/*
	 	Return the publically scoped functions
	 */
		return {
			computeCurrentTimes: computeCurrentTimes,
			computeSongDuration: computeSongDuration,
			computeSongCompletionPercentage: computeSongCompletionPercentage
		};
	}();

	exports.default = AmplitudeEventHelpers;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _config = __webpack_require__(4);

	var _config2 = _interopRequireDefault(_config);

	var _helpers = __webpack_require__(5);

	var _helpers2 = _interopRequireDefault(_helpers);

	var _init = __webpack_require__(2);

	var _init2 = _interopRequireDefault(_init);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	|----------------------------------------------------------------------------------------------------
	| SOUNDCLOUD
	|----------------------------------------------------------------------------------------------------
	| These helpers wrap around the basic methods of the Soundcloud API
	| and get the information we need from SoundCloud to make the songs
	| streamable through Amplitude
	*/
	var AmplitudeSoundcloud = function () {
		var tempUserConfig = {};

		/*--------------------------------------------------------------------------
	 	Loads the soundcloud SDK for use with Amplitude so the user doesn't have
	 	to load it themselves.
	 	With help from: http://stackoverflow.com/questions/950087/include-a-javascript-file-in-another-javascript-file
	 --------------------------------------------------------------------------*/
		function loadSoundCloud(userConfig) {
			tempUserConfig = userConfig;

			var head = document.getElementsByTagName('head')[0];
			var script = document.createElement('script');

			script.type = 'text/javascript';
			/*
	  	URL to the remote soundcloud SDK
	  */
			script.src = 'https://connect.soundcloud.com/sdk.js';
			script.onreadystatechange = initSoundcloud;
			script.onload = initSoundcloud;

			head.appendChild(script);
		}

		/*--------------------------------------------------------------------------
	 	Initializes soundcloud with the key provided.
	 --------------------------------------------------------------------------*/
		function initSoundcloud() {
			/*
	  	Calls the SoundCloud initialize function
	  	from their API and sends it the client_id
	  	that the user passed in.
	  */
			SC.initialize({
				client_id: _config2.default.soundcloud_client
			});

			/*
	  	Gets the streamable URLs to run through Amplitue. This is
	  	VERY important since Amplitude can't stream the copy and pasted
	  	link from the SoundCloud page, but can resolve the streaming
	  	URLs from the link.
	  */
			getStreamableURLs();
		}

		/*--------------------------------------------------------------------------
	 	Gets the streamable URL from the URL provided for
	 	all of the soundcloud links.  This will loop through
	 	and set all of the information for the soundcloud
	 	urls.
	 --------------------------------------------------------------------------*/
		function getStreamableURLs() {
			var soundcloud_regex = /^https?:\/\/(soundcloud.com|snd.sc)\/(.*)$/;

			for (var i = 0; i < _config2.default.songs.length; i++) {
				/*
	   	If the URL matches soundcloud, we grab
	   	that url and get the streamable link
	   	if there is one.
	   */
				if (_config2.default.songs[i].url.match(soundcloud_regex)) {
					_config2.default.soundcloud_song_count++;
					resolveStreamable(_config2.default.songs[i].url, i);
				}
			}
		}

		/*--------------------------------------------------------------------------
	 	Due to Soundcloud SDK being asynchronous, we need to scope the
	 	index of the song in another function. The privateGetSoundcloudStreamableURLs
	 	function does the actual iteration and scoping.
	 --------------------------------------------------------------------------*/
		function resolveStreamable(url, index) {
			SC.get('/resolve/?url=' + url, function (sound) {
				/*
	   	If streamable we get the url and bind the client ID to the end
	   	so Amplitude can just stream the song normally. We then overwrite
	   	the url the user provided with the streamable URL.
	   */
				if (sound.streamable) {
					_config2.default.songs[index].url = sound.stream_url + '?client_id=' + _config2.default.soundcloud_client;

					/*
	    	If the user want's to use soundcloud art, we overwrite the
	    	cover_art_url with the soundcloud artwork url.
	    */
					if (_config2.default.soundcloud_use_art) {
						_config2.default.songs[index].cover_art_url = sound.artwork_url;
					}

					/*
	    	Grab the extra metadata from soundcloud and bind it to the
	    	song.  The user can get this through the public function:
	    	getActiveSongMetadata
	    */
					_config2.default.songs[index].soundcloud_data = sound;
				} else {
					/*
	    	If not streamable, then we print a message to the user stating
	    	that the song with name X and artist X is not streamable. This
	    	gets printed ONLY if they have debug turned on.
	    */
					_helpers2.default.writeDebugMessage(_config2.default.songs[index].name + ' by ' + _config2.default.songs[index].artist + ' is not streamable by the Soundcloud API');
				}
				/*
	   	Increments the song ready counter.
	   */
				_config2.default.soundcloud_songs_ready++;

				/*
	   	When all songs are accounted for, then amplitude is ready
	   	to rock and we set the rest of the config.
	   */
				if (_config2.default.soundcloud_songs_ready == _config2.default.soundcloud_song_count) {
					_init2.default.setConfig(tempUserConfig);
				}
			});
		}

		return {
			loadSoundCloud: loadSoundCloud
		};
	}();

	exports.default = AmplitudeSoundcloud;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;