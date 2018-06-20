/**
 * @name 		Amplitude.js
 * @version 3.3.0
 * @author 	Dan Pastori (521 Dimensions) <dan@521dimensions.com>
*/

/**
 * AmplitudeJS Initializer Module
 *
 * @module init/AmplitudeInitializer
 */
import AmplitudeInitializer from './init/init.js';

/**
 * AmplitudeJS Core Module
 *
 * @module core/AmplitudeCore
 */
import AmplitudeCore from './core/core.js';

/**
 * AmplitudeJS Core Helpers Module
 *
 * @module core/AmplitudeCoreHelpers
 */
import AmplitudeCoreHelpers from './core/helpers.js';

/**
 * AmplitudeJS Events Module
 *
 * @module events/AmplitudeEvents
 */
import AmplitudeEvents from './events/events.js';

/**
 * AmplitudeJS Events Helpers Module
 *
 * @module events/AmplitudeEventsHelpers
 */
import AmplitudeEventsHelpers from './events/helpers.js';

/**
 * AmplitudeJS Visual Sync Module
 *
 * @module visual/AmplitudeVisualSync
 */
import AmplitudeVisualSync from './visual/visual.js';

/**
 * Imports the config module
 * @module config
 */
import config from './config.js';

/**
 * Amplitude should just be an interface to the public functions.
 * Everything else should be handled by other objects
 *
 * @module Amplitude
 */

let Amplitude = (function () {
	/**
	 * The main init function.  The user will call this through
	 * Amplitude.init({}) and pass in their settings.
	 *
	 * Public Accessor: Amplitude.init( user_config_json );
	 *
	 * @access public
	 * @param {object} userConfig 	- A JSON object of user defined values that helps configure and initialize AmplitudeJS.
	 */
	function init( userConfig ){
		AmplitudeInitializer.initialize( userConfig );
	}

	/**
	 * Binds new elements that were added to the page.
	 *
	 * Public Accessor: Amplitude.bindNewElements()
	 *
	 * @access public
	 */
	function bindNewElements(){
		AmplitudeInitializer.rebindDisplay();
	}

	/**
	 * Returns the active playlist.
	 *
	 * Public Accessor: Amplitude.getActivePlaylist()
	 *
	 * @access public
	 */
	function getActivePlaylist(){
		return config.active_playlist;
	}

	/**
	 * Returns the current playback speed.
	 *
	 * Public Accessor: Amplitude.getPlaybackSpeed()
	 *
	 * @access public
	 */
	function getPlaybackSpeed(){
		return config.playback_speed;
	}

	/**
	 * Gets the repeat state of the player.
	 *
	 * Public Accessor: Amplitude.getRepeat()
	 *
	 * @access public
	 */
	function getRepeat(){
		return config.repeat;
	}

	/**
	 * Returns the shuffle state of the player.
	 *
	 * Public Accessor: Amplitude.getShuffle()
	 *
	 * @access public
	 */
	function getShuffle(){
		return config.shuffle_on
	}

	/**
	 * Returns the shuffle state of the playlist.
	 *
	 * Public Accessor: Amplitude.getShufflePlaylist( playlist )
	 *
	 * @access public
	 * @param {string} playlist 	- The key representing the playlist ID to see if it's shuffled or not.
	 */
	function getShufflePlaylist( playlist ){
		return config.shuffled_statuses[ playlist ];
	}

	/**
	 * Sets the shuffle state for the player.
	 *
	 * Public Accessor: Amplitude.setShuffle()
	 *
	 * @access public
	 */
	 function setShuffle(){
		 AmplitudeEventsHelpers.setShuffle( null );
	 }

	 /**
 	 * Sets the shuffle state for the playlist
 	 *
 	 * Public Accessor: Amplitude.setShufflePlaylist( playlistKey )
 	 *
 	 * @access public
	 * @param {string} playlistKey 	- The key representing the playlist ID to to shuffle the playlist.
 	 */
 	 function setShufflePlaylist( playlistKey ){
 		 AmplitudeEventsHelpers.setShuffle( playlistKey );
 	 }

	 /**
	  * Sets the repeat state for the player.
		*
		* Public Accessor: Amplitude.setRepeat()
		*
		* @access public
	  */
		function setRepeat(){
			if( !config.is_touch_moving ){
				/*
					Sets repeat to the opposite of what it was set to
				*/
				AmplitudeEventsHelpers.setRepeat( !config.repeat );

				/*
					Visually sync repeat
				*/
				AmplitudeVisualSync.syncRepeat();
			}
		}

	/**
	 * Sets the repeat state for the song.
	 *
	 * Public Accessor: Amplitude.setRepeatSong()
	 *
	 * @access public
	 */
	 function setRepeatSong(){
		 if( !config.is_touch_moving ){
			 /*
				 Sets repeat to the opposite of what it was set to
			 */
			 AmplitudeEventsHelpers.setRepeatSong( !config.repeat_song );

			 /*
				 Visually sync repeat song
			 */
			 AmplitudeVisualSync.syncRepeatSong();
		 }
	 }


	/**
	 * Gets the default album art for the player
	 *
	 * Public Accessor: Amplitude.getDefaultAlbumArt()
	 *
	 * @access public
	 */
	function getDefaultAlbumArt(){
		return config.default_album_art;
	}

	/**
	 * Sets the default album art for the player
	 *
	 * Public Accessor: Amplitude.setDefaultAlbumArt( url )
	 *
	 * @access public
	 * @param {string} url 	- A string representing the URL of the new default album art.
	 */
	function setDefaultAlbumArt( url ){
		config.default_album_art = url;
	}

	/**
	 * Allows the user to get the percentage of the song played.
	 *
	 * Public Accessor: Amplitude.getSongPlayedPercentage();
	 *
	 * @access public
	 */
	function getSongPlayedPercentage(){
		/*
			Returns the percentage of the song played.
		*/
		return ( config.active_song.currentTime / config.active_song.duration ) * 100;
	}

	/**
	 * Allows the user to set how far into the song they want to be. This is
	 * helpful for implementing custom range sliders. Only works on the current song.
	 *
	 * Public Accessor: Amplitude.setSongPlayedPercentage( float );
	 *
	 * @access public
	 * @param {number} percentage 	- The percentage of the song played
	 */
	function setSongPlayedPercentage( percentage ){
		/*
			Ensures the percentage is a number and is between 0 and 100.
		*/
		if( typeof percentage == 'number'
			&& ( percentage > 0 && percentage < 100 ) ){
				/*
					Sets the current time of the song to the percentage.
				*/
				config.active_song.currentTime = ( config.active_song.duration ) * ( percentage / 100 );
		}
	}

	/**
	 * Allows the user to turn on debugging.
	 *
	 * Public Accessor: Amplitude.setDebug( bool );
	 *
	 * @access public
	 * @param {boolean} state 		- Turns debugging on and off.
	 */
	function setDebug( state ){
		/*
			Sets the global config debug on or off.
		*/
		config.debug = state;
	}

	/**
	 * Returns the active song meta data for the user to do what is
	 * needed.
	 *
	 * Public Accessor: Amplitude.getActiveSongMetadata();
	 *
	 * @access public
	 * @returns {object} JSON Object with the active song information
	 */
	function getActiveSongMetadata(){
		return config.active_metadata;
	}

	/**
	 * Returns a song in the songs array at that index
	 *
	 * Public Accessor: Amplitude.getSongByIndex( song_index )
	 *
	 * @access public
	 * @param {number} index 	- The integer for the index of the song in the songs array.
	 * @returns {object} JSON representation for the song at a specific index.
	 */
	function getSongByIndex( index ){
		return config.songs[index];
	}

	/**
	 * Returns a song at a playlist index
	 *
	 * Public Accessor: Amplitude.getSongAtPlaylistIndex( playlist, index
	 *
	 * @access public
	 * @param {number} index 			- The integer for the index of the song in the playlist.
	 * @param {string} playlist		- The key of the playlist we are getting the song at the index for
	 * @returns {object} JSON representation for the song at a specific index.
	 */
	function getSongAtPlaylistIndex( playlist, index ){
		let songIndex = config.playlists[playlist][index];

		return config.songs[songIndex];
	}

	/**
	 * Adds a song to the end of the config array.  This will allow Amplitude
	 * to play the song in a playlist type setting.
	 *
	 * Public Accessor: Amplitude.addSong( song_json )
	 *
	 * @access public
	 * @param {object} song 	- JSON representation of a song.
	 * @returns {number} New index of the song.
	 */
	function addSong( song ){
		/*
			Ensures we have a songs array to push to.
		*/
		if( config.songs == undefined ){
			config.songs = [];
		}

		config.songs.push( song );
		return config.songs.length - 1;
	}

	/**
	 * Adds a song to a playlist. This will allow Amplitude to play the song in the
	 * playlist
	 *
	 * Public Accessor: Amplitude.addSongToPlaylist( song_json, playlist_key )
	 *
	 * @access public
	 * @param {object} song 			- JSON representation of a song.
	 * @param {string} playlist		- Playlist we are adding the song to.
	 * @returns {mixed} New index of song in playlist or null if no playlist exists
	 */
	 function addSongToPlaylist( song, playlist ){
		 	/*
	 			Ensures we have a songs array to push to. This is step 1.
	 		*/
	 		if( config.songs == undefined ){
	 			config.songs = [];
	 		}

	 		config.songs.push( song );

			var songIndex = config.songs.length - 1;

			/*
				Ensures the playlist is valid to push the song on to.
			*/
			if( config.playlists[playlist] != undefined ){
				config.playlists[playlist].push( songIndex );

				return config.playlists[playlist].length - 1;
			}else{
				return null;
			}
	 }

	 /**
 	 * Removes a song from the song array
 	 *
 	 * Public Accessor: Amplitude.removeSong( index )
 	 *
 	 * @access public
 	 * @param {integer} index 			- Index of the song being removed
 	 * @returns {boolean} True if removed false if not.
 	 */
	 function removeSong( index ){
		 if( config.songs[index] != undefined ){
			 config.songs.splice( index, 1 );
			 return true;
		 }else{
		 	return false;
		 }
	 }

	 /**
 	 * Removes a song from the playlist
 	 *
 	 * Public Accessor: Amplitude.removeSongFromPlaylist( index, playlist )
 	 *
 	 * @access public
 	 * @param {integer} index 			- Index of the song being removed from the playlist.
 	 * @param {string} playlist			- Playlist we are removing the song from.
 	 * @returns {boolean} True if removed false if not.
 	 */
	 function removeSongFromPlaylist( index, playlist ){
		 if( config.playlists[playlist] != undefined ){
			 config.playlists[playlist].splice( index, 1 );
		 }else{
			 return false;
		 }
	 }

	/**
	 * When you pass a song object it plays that song right awawy.  It sets
	 * the active song in the config to the song you pass in and synchronizes
	 * the visuals.
	 *
	 * Public Accessor: Amplitude.playNow( song )
	 *
	 * @access public
	 * @param {object} song 	- JSON representation of a song.
	 */
	function playNow( song ){
		AmplitudeCore.playNow( song );
	}

	/**
	 * Plays a song at the index passed in from the songs array.
	 *
	 * Public Accessor: Amplitude.playSongAtIndex( index )
	 *
	 * @access public
	 * @param {number} index 	- The number representing the song in the songs array.
	 */
	function playSongAtIndex( index ){
		AmplitudeCore.playSongAtIndex( index );
	}

	/**
	 * Plays a song at the index passed in for the playlist provided. The index passed
	 * in should be the index of the song in the playlist and not the songs array.
	 *
	 * @access public
	 * @param {number} index 		- The number representing the song in the playlist array.
	 * @param {string} playlist - The key string representing the playlist we are playing the song from.
	 *
	 */
	function playPlaylistSongAtIndex( index, playlist ){
		AmplitudeCore.playPlaylistSongAtIndex( index, playlist );
	}

	/**
	 * @TODO: Implement Add Song To Playlist Functionality
	 */
	function addSongToPlaylist( song, playlist ){

	}

	/**
	 * Allows the user to play whatever the active song is directly
	 * through Javascript. Normally ALL of Amplitude functions that access
	 * the core features are called through event handlers.
	 *
	 * Public Accessor: Amplitude.play();
	 *
	 * @access public
	 */
	function play(){
		AmplitudeCore.play();
	}

	/**
	 * Allows the user to pause whatever the active song is directly
	 * through Javascript. Normally ALL of Amplitude functions that access
	 * the core features are called through event handlers.
	 *
	 * Public Accessor: Amplitude.pause();
	 *
	 * @access public
	 */
	function pause(){
		AmplitudeCore.pause();
	}

	/**
	 * Returns the audio object used to play the audio
	 *
	 * Public Accessor: Amplitude.getAudio();
	 *
	 * @access public
	 */
	function getAudio(){
		return config.active_song;
	}

	/**
	 * Plays the next song either in the playlist or globally.
	 *
	 * Public Accessor: Amplitude.next( playlist );
	 *
	 * @access public
	 * @param {string} [playlist = null] 	- The playlist key
	 */
	function next( playlist = null ){
		/*
			If the playlist is empty or null, then we check the active
			playlist
		*/
		if( playlist == '' || playlist == null ){
			/*
				If the active playlist is null, then we set the next global
				song or we set the next in the playlist.
			*/
			if( config.active_playlist == null || config.active_playlist == '' ){
				AmplitudeEventsHelpers.setNext()
			}else{
				AmplitudeEventsHelpers.setNextPlaylist( config.active_playlist );
			}
		}else{
			/*
				Set the next in the playlist for the key provided.
			*/
			AmplitudeEventsHelpers.setNextPlaylist( playlist );
		}
	}

	/**
	 * Plays the prev song either in the playlist or globally.
	 *
	 * Public Accessor: Amplitude.prev( playlist );
	 *
	 * @access public
	 * @param {string} [playlist = null] 	- The playlist key
	 */
	function prev( playlist = null ){
		/*
			If the playlist is empty or null, then we check the active
			playlist
		*/
		if( playlist == '' || playlist == null ){
			/*
				If the active playlist is null, then we set the prev global
				song or we set the prev in the playlist.
			*/
			if( config.active_playlist == null || config.active_playlist == '' ){
				AmplitudeEventsHelpers.setPrev()
			}else{
				AmplitudeEventsHelpers.setPrevPlaylist( config.active_playlist );
			}
		}else{
			/*
				Set the prev in the playlist for the key provided.
			*/
			AmplitudeEventsHelpers.setPrevPlaylist( playlist );
		}
	}

	/**
	 * Gets all of the songs in the songs array
	 *
	 * Public Accessor: Amplitude.getSongs( );
	 *
	 * @access public
	 */
	function getSongs(){
		return config.songs;
	}

	/**
	 * Gets all of the songs in a playlist
	 *
	 * Public Accessor: Amplitude.getSongsInPlaylist( playlist );
	 *
	 * @access public
	 * @param {string} playlist 	- The playlist key
	 */
	function getSongsInPlaylist( playlist ){
		let songsArray = [];

		for( let i = 0; i < config.playlists[playlist].length; i++ ){
			songsArray.push( config.songs[i] );
		}

		return songsArray;
	}

	/**
	 * Get current state of songs. If shuffled, this will return the shuffled
	 * songs.
	 *
	 * Public Accessor: Amplitude.getSongsState();
	 *
	 * @access public
	 */
	function getSongsState(){
		if( config.shuffle_on ){
			return config.shuffle_list;
		}else{
			return config.songs;
		}
	}

	/**
	 * Get current state of songs in playlist. If shuffled, this will return the
	 * shuffled songs.
	 *
	 * Public Accessor: Amplitude.getSongsStatePlaylist( playlist );
	 *
	 * @access public
	 * @param {string} playlist 	- The playlist key
	 * @todo Finish commenting
	 */
	function getSongsStatePlaylist( playlist ){
		let songsArray = [];

		if( config.shuffled_status[playlist] ){

			for( let i = 0; i < config.shuffled_playlists[playlist].length; i++ ){
				songsArray.push( config.songs[i] );
			}

		}else{

			for( let i = 0; i < config.playlists[playlist].length; i++ ){
				songsArray.push( config.songs[i] );
			}
		}

		return songsArray;
	}

	/**
	 * Gets the active index of the player
	 *
	 * Public Accessor: Amplitude.getActiveIndex()
	 *
	 * @access public
	 */
	function getActiveIndex(){
		return parseInt( config.active_index );
	}

	/**
	 * Gets the active index with respect to the state of the player whether it is
	 * shuffled or not.
	 *
	 * Public Accessor: Amplitude.getActiveIndexState()
	 *
	 * @access public
	 */
	function getActiveIndexState(){
		if( config.shuffle_on ){
			return parseInt( config.shuffle_active_index );
		}else{
			return parseInt( config.active_index );
		}
	}

	/**
	 * Get the version of AmplitudeJS
	 *
	 * Public Accessor: Amplitude.getVersion()
	 *
	 * @access public
	 */
	function getVersion(){
		return config.version;
	}

	/**
	 * Get the buffered amount for the current song
	 *
	 * Public Accessor: Amplitude.getBuffered()
	 *
	 * @access public
	 */
	function getBuffered(){
		return config.buffered;
	}

	/**
	 * Skip to a certain location in a selected song.
	 *
	 * Public Accessor: Amplitude.getBuffered()
	 *
	 * @access public
	 * @param {number} seconds 						- The amount of seconds we should skip to in the song.
	 * @param {number} songIndex 					- The index of the song in the songs array.
	 * @param {string} [playlist = null]	- The playlist the song we are skipping to belogns to.
	 */
	function skipTo( seconds, songIndex, playlist = null ){
		if( playlist != null ){
			if( AmplitudeCoreHelpers.checkNewPlaylist( playlist ) ){
				AmplitudeCoreHelpers.setActivePlaylist( playlist );
			}
		}

		seconds = parseInt( seconds );

		/*
			Changes the song to where it's being skipped and then
			play the song.
		*/
		AmplitudeCoreHelpers.changeSong( songIndex );
		AmplitudeCore.play();

		AmplitudeVisualSync.syncMainPlayPause( 'playing' );

		if( playlist != null ){
			AmplitudeVisualSync.syncPlaylistPlayPause( playlist, 'playing' );
		}

		AmplitudeVisualSync.syncSongPlayPause( playlist, songIndex, 'playing' );

		/*
			Skip to the location in the song.
		*/
		AmplitudeCore.skipToLocation( seconds );
	}

	/*
		Returns all of the publically accesible methods.
	*/
	return {
		init: init,
		bindNewElements: bindNewElements,
		getActivePlaylist: getActivePlaylist,
		getPlaybackSpeed: getPlaybackSpeed,
		getRepeat: getRepeat,
		getShuffle: getShuffle,
		getShufflePlaylist: getShufflePlaylist,
		setShuffle: setShuffle,
		setShufflePlaylist: setShufflePlaylist,
		setRepeat: setRepeat,
		setRepeatSong: setRepeatSong,
		getDefaultAlbumArt: getDefaultAlbumArt,
		setDefaultAlbumArt: setDefaultAlbumArt,
		getSongPlayedPercentage: getSongPlayedPercentage,
		setSongPlayedPercentage: setSongPlayedPercentage,
		setDebug: setDebug,
		getActiveSongMetadata: getActiveSongMetadata,
		getSongByIndex: getSongByIndex,
		getSongAtPlaylistIndex: getSongAtPlaylistIndex,
		addSong: addSong,
		addSongToPlaylist: addSongToPlaylist,
		removeSong: removeSong,
		removeSongFromPlaylist: removeSongFromPlaylist,
		playNow: playNow,
		playSongAtIndex: playSongAtIndex,
		playPlaylistSongAtIndex: playPlaylistSongAtIndex,
		play: play,
		pause: pause,
		audio: getAudio,
		next: next,
		prev: prev,
		getSongs: getSongs,
		getSongsInPlaylist: getSongsInPlaylist,
		getSongsState: getSongsState,
		getSongsStatePlaylist: getSongsStatePlaylist,
		getActiveIndex: getActiveIndex,
		getActiveIndexState: getActiveIndexState,
		getVersion: getVersion,
		getBuffered: getBuffered,
		skipTo: skipTo
	}
})();

export default Amplitude;
