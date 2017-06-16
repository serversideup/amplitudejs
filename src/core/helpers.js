var config = require('../config.js');
import AmplitudeCore from '../core/core.js';
import AmplitudeVisualSync from '../visual/visual.js';

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
var AmplitudeHelpers = (function () {
	/*--------------------------------------------------------------------------
		Resets the config to the default state. This is called on initialize
		to ensure the user's config is what matters.
	--------------------------------------------------------------------------*/
	function resetConfig(){
		config.active_song 				= new Audio();
		config.active_metadata 			= {};
		config.active_album 			= '';
		config.active_index 			= 0;
		config.active_playlist 			= '';
		config.autoplay 				= false;
		config.playback_speed 			= 1.0;
		config.callbacks 				= {};
		config.songs 					= {};
		config.playlists 				= {};
		config.shuffled_playlists 		= {};
		config.shuffled_statuses 		= {};
		config.repeat 					= false;
		config.shuffle_list 			= {};
		config.shuffle_on 				= false;
		config.shuffle_active_index 	= 0;
		config.default_album_art 		= '';
		config.debug 					= false;
		config.handle_song_elements 	= true;
		config.volume 					= .5;
		config.pre_mute_volume 			= .5;
		config.volume_increment 		= 5;
		config.volume_decrement 		= 5;
		config.soundcloud_client 		= '';
		config.soundcloud_use_art 		= false;
		config.soundcloud_song_count 	= 0;
		config.soundcloud_songs_ready 	= 0;
	}

	/*--------------------------------------------------------------------------
		Writes out debug message to the console if enabled.

		@param string message The string that gets printed to
		alert the user of a debugging error.
	--------------------------------------------------------------------------*/
	function writeDebugMessage( message ){
		if( config.debug ){
			console.log( message );
		}
	}

	/*--------------------------------------------------------------------------
		Runs a user defined callback method

		@param string callbackName The name of the callback we are going to run.
	--------------------------------------------------------------------------*/
	function runCallback( callbackName ){
		/*
			Checks to see if a user defined a callback method for the
			callback we are running.
		*/
		if( config.callbacks[callbackName] ){
			/*
				Build the callback function
			*/
			var callbackFunction = window[ config.callbacks[ callbackName ] ];
			
			/*
				Write a debug message stating the callback we are running
			*/
			writeDebugMessage( 'Running Callback: '+callbackName );

			/*
				Run the callback function.
			*/
            try {
                callbackFunction();
            }
            catch(error) {
                // undocumented way to cancel events
                if(error.message == "CANCEL EVENT")
                    throw error;
                else
                    writeDebugMessage( 'Callback error: '+error.message );
            }
			
		}
	}

	/*--------------------------------------------------------------------------
		Changes the active song in the config. This happens in multiple
		scenarios: The user clicks a play button that has an index that is
		different than what is currently playing, the song ends and the next
		song begins, etc.

		@param int songIndex The song index we are changing to
	--------------------------------------------------------------------------*/
	function changeSong( songIndex ){
		var song = config.songs[ songIndex ];

		/*
			Stops the currently playing song so we can adjust
			what we need.
		*/
		AmplitudeCore.stop();

		/*
			FX-TODO: Stop Visualization
		*/

		/*
			Set all play buttons to pause while we change
			the song.
		*/
		AmplitudeVisualSync.setPlayPauseButtonsToPause();

		/*
			Since it is a new song, we reset the song sliders. These
			react to time updates and will eventually be updated but we
			force update them is if there is a song slider bound to a
			specific song, they won't update.
		*/
		AmplitudeVisualSync.resetSongSliders();

		/*
			Reset the song time vizualizations as well since those
			can be bound to a specific song.
		*/
		AmplitudeVisualSync.resetSongTimeVisualizations();

		/*
			Reset all the time place holders accordingly.
		*/
		AmplitudeVisualSync.resetTimes();

		/*
			Run a callback if an album is going
			to change.
		*/
		if( checkNewAlbum( song ) ){
			runCallback('album_change');
		}

		/*
			Set the new song information so we can use the
			active meta data later on.
		*/
		setNewSong( song, songIndex );

		/*
			Display the new visual metadata now that the config has
			been changed. This will show the new song.
		*/
		AmplitudeVisualSync.displaySongMetadata();

		/*
			Sets the active container. This is a class that
			designers can use on an element that contains the current
			song's controls to show it's highlighted.
		*/
		AmplitudeVisualSync.setActiveContainer();

		/*
			Sets the active song's duration
		*/
		AmplitudeVisualSync.syncSongDuration();
	}

	/*--------------------------------------------------------------------------
		Checks to see if the new song to be played is different than the song
		that is currently playing. To be true, the user would have selected
		play on a new song with a new index. To be false, the user would have
		clicked play/pause on the song that was playing.

		@param int songIndex The index of the new song to be played.
	--------------------------------------------------------------------------*/
	function checkNewSong( songIndex ){
		if( songIndex != config.active_index ){
			return true;
		}else{
			return false;
		}
	}

	/*--------------------------------------------------------------------------
		Checks to see if there is a new album

		@param string newAlbum Checks to see if the new song will have a new
		album.
	--------------------------------------------------------------------------*/
	function checkNewAlbum( newAlbum ){
		if( config.active_album != newAlbum ){
			return true;
		}else{
			return false;
		}
	}

	/*--------------------------------------------------------------------------
		Checks to see if there is a new playlist

		@param string playlist The playlist passed in to check against the active
		playlist.
	--------------------------------------------------------------------------*/
	function checkNewPlaylist( playlist ){
		if( config.active_playlist != playlist ){
			return true;
		}else{
			return false;
		}
	}

	/*--------------------------------------------------------------------------
		Sets the new song in the config. Sets the src of the audio object, 
		updates the	metadata and sets the active album.

		@param JSON song The song object of the song we are changing to.
		@param int index The index of the song in the songs object we are changing.
	--------------------------------------------------------------------------*/
	function setNewSong( song, index ){
		config.active_song.src 	= song.url;
		config.active_metadata 	= song;
		config.active_album    	= song.album;
		config.active_index 	= index;
	}

	/*--------------------------------------------------------------------------
		Shuffles individual songs in the config

		Based off of: http://www.codinghorror.com/blog/2007/12/the-danger-of-naivete.html
	--------------------------------------------------------------------------*/
	function shuffleSongs(){
		/*
			Builds a temporary array with the length of the config.
		*/
		var shuffleTemp = new Array( config.songs.length );

		/*
			Set the temporary array equal to the songs array.
		*/
		for( var i = 0; i < config.songs.length; i++ ){
			shuffleTemp[i] = config.songs[i];
			shuffleTemp[i].original_index = i;
		}

		/*
			Iterate ove rthe songs and generate random numbers to 
			swap the indexes of the shuffle array.
		*/
		for( var i = config.songs.length - 1; i > 0; i-- ){
			var randNum = Math.floor( ( Math.random() * config.songs.length ) + 1 );
			shuffleSwap( shuffleTemp, i, randNum - 1 );
		}

		/*
			Set the shuffle list to the shuffle temp.
		*/
		config.shuffle_list = shuffleTemp;
	}

	/*--------------------------------------------------------------------------
		Shuffle songs in a playlist

		@param string playlist The playlist we are shuffling.
	--------------------------------------------------------------------------*/
	function shufflePlaylistSongs( playlist ){
		/*
			Builds a temporary array with the length of the playlist songs.
		*/
		var shuffleTemp = new Array( config.playlists[playlist].length );

		/*
			Set the temporary array equal to the playlist array.
		*/
		for( var i = 0; i < config.playlists[playlist].length; i++ ){
			shuffleTemp[i] = config.songs[ config.playlists[playlist][i] ];
			shuffleTemp[i].original_index = i;
		}

		/*
			Iterate ove rthe songs and generate random numbers to 
			swap the indexes of the shuffle array.
		*/
		for( var i = config.playlists[playlist].length - 1; i > 0; i-- ){
			var randNum = Math.floor( ( Math.random() * config.playlists[playlist].length ) + 1 );
			shuffleSwap( shuffleTemp, i, randNum - 1 );
		}

		/*
			Set the shuffle list to the shuffle temp.
		*/
		config.shuffled_playlists[playlist] = shuffleTemp;
	}

	/*--------------------------------------------------------------------------
		Swaps and randomizes the song shuffle.

		@param JSON shuffleList The list of songs that is going to
		be shuffled

		@param int original The original index of the song in the
		songs array.

		@param int random The randomized index that will be the
		new index of the song in the shuffle array.
	--------------------------------------------------------------------------*/
	function shuffleSwap( shuffleList, original, random ){
		var temp = shuffleList[ original ];
		shuffleList[ original ] = shuffleList[ random ];
		shuffleList[ random ] = temp;
	}

	/*--------------------------------------------------------------------------
		Sets the active playlist

		@param string playlist The string of the playlist being 
		set to active.
	--------------------------------------------------------------------------*/
	function setActivePlaylist( playlist ){
		if( config.active_playlist != playlist ){
			runCallback('playlist_changed');
		}

		config.active_playlist = playlist;
	}

	/*--------------------------------------------------------------------------
		Determines if the string passed in is a URL or not
	
		@param string url The string we are testing to see if it's a URL.
	--------------------------------------------------------------------------*/
	function isURL( url ){
		var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

		return pattern.test( url );
	}

	/*--------------------------------------------------------------------------
		Determines if what is passed in is an integer or not.
	
		@param string int The variable we are testing to see is an integer or not.
	--------------------------------------------------------------------------*/
	function isInt( int ){
		return !isNaN( int ) && 
         		parseInt( Number( int ) ) == int && 
         		!isNaN( parseInt( int, 10 ) );
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
		checkNewAlbum: checkNewAlbum,
		checkNewPlaylist: checkNewPlaylist,
		shuffleSongs: shuffleSongs,
		shufflePlaylistSongs: shufflePlaylistSongs,
		setActivePlaylist: setActivePlaylist,
		isURL: isURL,
		isInt: isInt
	}
})();

export default AmplitudeHelpers