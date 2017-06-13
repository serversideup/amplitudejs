/*
	Amplitude.js
	Version: 	3.0
	Author: 	Dan Pastori
	Company: 	521 Dimensions
*/
import AmplitudeInitializer from './init/init.js';
import AmplitudeCore from './core/core.js';
import AmplitudeHelpers from './core/helpers.js';
import AmplitudeEvents from './events/events.js';
import AmplitudeVisualSync from './visual/visual.js';
import config from './config.js';

/*
	Amplitude should just be an interface to the public functions.
	Everything else should be handled by other objects
*/

var Amplitude = (function () {
	/*--------------------------------------------------------------------------
		The main init function.  The user will call this through 
		Amplitude.init({}) and pass in their settings.
		
		Public Accessor: Amplitude.init( user_config_json );

	 	@param user_config A JSON object of user defined values that help 
	 	configure and initialize AmplitudeJS.
	--------------------------------------------------------------------------*/
	function init( userConfig ){
		AmplitudeInitializer.initialize( userConfig );
	}

	/*--------------------------------------------------------------------------
		Binds new elements that were added to the page.
	--------------------------------------------------------------------------*/
	function bindNewElements(){
		AmplitudeInitializer.rebindDisplay();
	}

	/*--------------------------------------------------------------------------
		Returns the active playlist
	--------------------------------------------------------------------------*/
	function getActivePlaylist(){
		return config.active_playlist;
	}

	/*--------------------------------------------------------------------------
		Returns the current playback speed
	--------------------------------------------------------------------------*/
	function getPlaybackSpeed(){
		return config.playback_speed;
	}

	/*--------------------------------------------------------------------------
		Gets the repeat state of the player.
	--------------------------------------------------------------------------*/
	function getRepeat(){
		return config.repeat;
	}	

	/*--------------------------------------------------------------------------
		Returns the shuffle state of the player.
	--------------------------------------------------------------------------*/
	function getShuffle(){
		return config.shuffle_on
	}

	/*--------------------------------------------------------------------------
		Returns the shuffle state of the playlist.

		@param playlist The key representing the playlist ID to see if it's shuffled
		or not.
	--------------------------------------------------------------------------*/
	function getShufflePlaylist( playlist ){
		return config.shuffled_statuses[ playlist ];
	}

	/*--------------------------------------------------------------------------
		Gets the default album art for the player
	--------------------------------------------------------------------------*/
	function getDefaultAlbumArt(){
		return config.default_album_art;
	}

	/*--------------------------------------------------------------------------
		Sets the default album art for the player

		@param url A string representing the URL of the new default album art.
	--------------------------------------------------------------------------*/
	function setDefaultAlbumArt( url ){
		config.default_album_art = url;
	}

	/*--------------------------------------------------------------------------
		Allows the user to get the percentage of the song played.
		
		Public Accessor: Amplitude.getSongPlayedPercentage();
	--------------------------------------------------------------------------*/
	function getSongPlayedPercentage(){
		/*
			Returns the percentage of the song played.
		*/
		return ( config.active_song.currentTime / config.active_song.duration ) * 100;
	}

	/*--------------------------------------------------------------------------
		Allows the user to set how far into the song they want to be. This is
		helpful for implementing custom range sliders
		
		Public Accessor: Amplitude.setSongPlayedPercentage( float );
		
	 	@param Float percentage The percentage of the song played
	--------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
		Allows the user to turn on debugging.
		
		Public Accessor: Amplitude.setDebug( bool );
		
	 	@param BOOL state Turns debugging on and off.
	--------------------------------------------------------------------------*/
	function setDebug( state ){
		/*
			Sets the global config debug on or off.
		*/
		config.debug = state;
	}

	/*--------------------------------------------------------------------------
		Returns the active song meta data for the user to do what is 
		needed.
		
		Public Accessor: Amplitude.getActiveSongMetadata();
		
	 	@returns JSON Object with the active song information
	--------------------------------------------------------------------------*/
	function getActiveSongMetadata(){
		return config.active_metadata;
	}

	/*--------------------------------------------------------------------------
		Returns a song in the songs array at that index
		
		Public Accessor: Amplitude.getSongByIndex( song_index )

		@param int index The integer for the index of the
		song in the songs array.

		@returns JSON representation for the song at a specific index.
	--------------------------------------------------------------------------*/
	function getSongByIndex( index ){
		return config.songs[index];
	}

	/*--------------------------------------------------------------------------
		Returns a song at a playlist index
		
		Public Accessor: Amplitude.getSongAtPlaylistIndex( playlist, index 

		@param 	int 	index The integer for the index of the
		song in the playlist.

		@param 	string	playlist The key of the playlist we are getting the song
		at the index for

		@returns JSON representation for the song at a specific index.
	--------------------------------------------------------------------------*/
	function getSongAtPlaylistIndex( playlist, index ){
		var songIndex = config.playlists[playlist][index];

		return config.songs[songIndex];
	}

	/*--------------------------------------------------------------------------
		Adds a song to the end of the config array.  This will allow Amplitude
		to play the song in a playlist type setting.
		
		Public Accessor: Amplitude.addSong( song_json )

		@param song JSON representation of a song.

		@returns int New index of the song.
	--------------------------------------------------------------------------*/
	function addSong( song ){
		config.songs.push( song );
		return config.songs.length - 1;
	}

	/*--------------------------------------------------------------------------
		When you pass a song object it plays that song right awawy.  It sets
		the active song in the config to the song you pass in and synchronizes
		the visuals.
		
		Public Accessor: Amplitude.playNow( song )

		@param song JSON representation of a song.
	--------------------------------------------------------------------------*/
	function playNow( song ){
		AmplitudeCore.playNow( song );
	}

	/*
		TODO: Implement Add Song To Playlist Functionality
	*/
	function addSongToPlaylist( song, playlist ){
		
	}

	/*--------------------------------------------------------------------------
		Allows the user to play whatever the active song is directly
		through Javascript. Normally ALL of Amplitude functions that access
		the core features are called through event handlers.

		Public Accessor: Amplitude.play();
	--------------------------------------------------------------------------*/
	function play(){
		AmplitudeCore.play();
	}

	/*--------------------------------------------------------------------------
		Allows the user to pause whatever the active song is directly
		through Javascript. Normally ALL of Amplitude functions that access
		the core features are called through event handlers. 

		Public Accessor: Amplitude.pause();
	--------------------------------------------------------------------------*/
	function pause(){
		AmplitudeCore.pause();
	}

	/*--------------------------------------------------------------------------
		Returns the audio object used to play the audio

		Public Accessor: Amplitude.getAudio();
	--------------------------------------------------------------------------*/
	function getAudio(){
		return config.active_song;
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
		getDefaultAlbumArt: getDefaultAlbumArt,
		setDefaultAlbumArt: setDefaultAlbumArt,
		getSongPlayedPercentage: getSongPlayedPercentage,
		setSongPlayedPercentage: setSongPlayedPercentage,
		setDebug: setDebug,
		getActiveSongMetadata: getActiveSongMetadata,
		getSongByIndex: getSongByIndex,
		getSongAtPlaylistIndex: getSongAtPlaylistIndex,
		addSong: addSong,
		playNow: playNow,
		play: play,
		pause: pause,
		addSong: addSong,
		audio: getAudio
	}
})();

export default Amplitude;