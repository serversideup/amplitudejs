/**
 * @name 		AmplitudeJS
 * @author 	Dan Pastori (Server Side Up) <hello@serversideup.net>
 */
/**
 * AmplitudeJS Initializer Module
 *
 * @module init/AmplitudeInitializer
 */
import Initializer from "./init/init.js";

/****************************************************
 * Config
 ****************************************************/
/**
 * Imports the config module
 * @module config
 */
import config from "./config.js";

/****************************************************
 * Core
 ****************************************************/
/**
 * AmplitudeJS Core Module
 *
 * @module core/Core
 */
import Core from "./core/core.js";

/****************************************************
 * Utilities
 ****************************************************/
/**
 * Shuffler Module
 * @module utilities/Shuffler
 */
import Shuffler from "./utilities/shuffler.js";

/**
 * Imports the config state module.
 * @module ConfigState
 */
import ConfigState from "./utilities/configState.js";

/**
 * Imports the audio navigation
 * @module utilities/AudioNavigation
 */
import AudioNavigation from "./utilities/audioNavigation.js";

/**
 * Repeater Module
 *
 * @module utilities/Repeater
 */
import Repeater from "./utilities/repeater.js";

/**
 * Imports the checks
 * @module utilities/Checks
 */
import Checks from "./utilities/checks.js";

/****************************************************
 * FX Modules
 ****************************************************/
/**
 * Imports the visualizations module
 * @module fx/Visualizations
 */
import Visualizations from "./fx/visualizations.js";

/****************************************************
 * Elements
 ****************************************************/
/**
 * Visual Shuffle Elements
 * @module visual/ShuffleElements
 */
import ShuffleElements from "./visual/shuffleElements.js";

/**
 * Visual Repeat Elements
 * @module visual/RepeatElements
 */
import RepeatElements from "./visual/repeatElements.js";

/**
 * Song Slider Elements
 * @module visual/SongSliderElements
 */
import SongSliderElements from "./visual/songSliderElements.js";

/**
 * Song Played Progress Elements
 * @module visual/SongPlayedProgressElements
 */
import SongPlayedProgressElements from "./visual/songPlayedProgressElements.js";

/**
 * Time Elements
 * @module visual/TimeElements
 */
import TimeElements from "./visual/timeElements.js";

/**
 * Play Pause Elements
 * @module visual/PlayPauseElements
 */
import PlayPauseElements from "./visual/playPauseElements.js";

/**
 * Meta Data Elements
 * @module visual/MetaDataElements
 */
import MetaDataElements from "./visual/metaDataElements.js";

/**
 * Playback Speed Elements
 * @module visual/PlaybackSpeedElements
 */
import PlaybackSpeedElements from "./visual/playbackSpeedElements.js";

import Debug from "./utilities/debug.js";

import SoundCloud from "./soundcloud/soundcloud.js";

/**
 * Amplitude should just be an interface to the public functions.
 * Everything else should be handled by other objects
 *
 * @module Amplitude
 */
let Amplitude = (function() {
  /**
   * The main init function.  The user will call this through
   * Amplitude.init({}) and pass in their settings.
   *
   * Public Accessor: Amplitude.init( user_config_json );
   *
   * @access public
   * @param {object} userConfig 	- A JSON object of user defined values that helps configure and initialize AmplitudeJS.
   */
  function init(userConfig) {
    Initializer.initialize(userConfig);
  }

  /**
   * Returns the current config for AmplitudeJS
   */
  function getConfig() {
    return config;
  }

  /**
   * Binds new elements that were added to the page.
   *
   * Public Accessor: Amplitude.bindNewElements()
   *
   * @access public
   */
  function bindNewElements() {
    Initializer.rebindDisplay();
  }

  /**
   * Returns the active playlist.
   *
   * Public Accessor: Amplitude.getActivePlaylist()
   *
   * @access public
   */
  function getActivePlaylist() {
    return config.active_playlist;
  }

  /**
   * Returns the current playback speed.
   *
   * Public Accessor: Amplitude.getPlaybackSpeed()
   *
   * @access public
   */
  function getPlaybackSpeed() {
    return config.playback_speed;
  }

  /**
   * Sets the playback speed
   *
   * Public Accessor: Amplitude.setPlaybackSpeed( speed )
   *
   * @access public
   */
  function setPlaybackSpeed(speed) {
    /*
      Increments are set in .5 We only accept values
      1, 1.5, 2

      1 -> Regular Speed
      1.5 -> 50% faster
      2 -> Twice as fast
    */
    Core.setPlaybackSpeed(speed);

    /*
      Visually sync the playback speed.
    */
    PlaybackSpeedElements.sync();
  }

  /**
   * Gets the repeat state of the player.
   *
   * Public Accessor: Amplitude.getRepeat()
   *
   * @access public
   */
  function getRepeat() {
    return config.repeat;
  }

  /**
   * Gets the repeat state for a playlist
   *
   * Public Accessor: Amplitude.getRepeatPlaylist()
   *
   * @access public
   */
  function getRepeatPlaylist(playlistKey) {
    return config.playlists[playlistKey].repeat;
  }

  /**
   * Returns the shuffle state of the player.
   *
   * Public Accessor: Amplitude.getShuffle()
   *
   * @access public
   */
  function getShuffle() {
    return config.shuffle_on;
  }

  /**
   * Returns the shuffle state of the playlist.
   *
   * Public Accessor: Amplitude.getShufflePlaylist( playlist )
   *
   * @access public
   * @param {string} playlist 	- The key representing the playlist ID to see if it's shuffled or not.
   */
  function getShufflePlaylist(playlist) {
    return config.playlists[playlist].shuffle;
  }

  /**
   * Sets the shuffle state for the player.
   *
   * Public Accessor: Amplitude.setShuffle()
   *
   * @param {boolean} shuffle  	- True when we are shuffling the songs, false when we turn off shuffle.
   *
   * @access public
   */
  function setShuffle(shuffle) {
    Shuffler.setShuffle(shuffle);

    ShuffleElements.syncMain();
  }

  /**
   * Sets the shuffle state for the playlist
   *
   * Public Accessor: Amplitude.setShufflePlaylist( playlist )
   *
   * @access public
   * @param {string} playlist 	- The key representing the playlist ID to to shuffle the playlist.
   * @param {boolean} shuffle 	- True when we are shuffling the playlist, false when we turn off shuffle.
   */
  function setShufflePlaylist(playlist, shuffle) {
    Shuffler.setShufflePlaylist(playlist, shuffle);

    ShuffleElements.syncMain();
    ShuffleElements.syncPlaylist(playlist);
  }

  /**
   * Sets the repeat state for the player.
   *
   * Public Accessor: Amplitude.setRepeat()
   *
   * @access public
   * @param {boolean} repeatState 	- The state you want the repeat song to be in.
   */
  function setRepeat(repeatState) {
    Repeater.setRepeat(repeatState);
    RepeatElements.syncRepeat();
  }

  /**
   * Sets the repeat state for a playlist.
   *
   * Public Accessor: Amplitude.setRepeatPlaylist( playlistKey )
   *
   * @access public
   * @param {string} playlist 	- The key representing the playlist ID to to shuffle the playlist.
   * @param {boolean} repeatState - The state you want the repeat playlist to be in.
   */
  function setRepeatPlaylist(playlist, repeatState) {
    Repeater.setRepeatPlaylist(repeatState, playlist);
    RepeatElements.syncRepeatPlaylist(playlist);
  }

  /**
   * Sets the repeat state for the song.
   *
   * Public Accessor: Amplitude.setRepeatSong()
   *
   * @access public
   * @param {boolean} repeatState 	- The state you want the repeat song status to be in.
   */
  function setRepeatSong(repeatState) {
    if (!config.is_touch_moving) {
      /*
			 Sets repeat to the opposite of what it was set to
			*/
      Repeater.setRepeatSong(!config.repeat_song);

      /*
				Visually sync repeat song
			*/
      RepeatElements.syncRepeatSong();
    }
  }

  /**
   * Gets the default album art for the player
   *
   * Public Accessor: Amplitude.getDefaultAlbumArt()
   *
   * @access public
   */
  function getDefaultAlbumArt() {
    return config.default_album_art;
  }

  /**
   * Gets the default playlist art for the playlists
   *
   * Public Accessor: Amplitude.getDefaultPlaylistArt()
   *
   * @access public
   */
  function getDefaultPlaylistArt() {
    return config.default_playlist_art;
  }

  /**
   * Sets the default album art for the player
   *
   * Public Accessor: Amplitude.setDefaultAlbumArt( url )
   *
   * @access public
   * @param {string} url 	- A string representing the URL of the new default album art.
   */
  function setDefaultAlbumArt(url) {
    config.default_album_art = url;
  }

  /**
   * Sets the default playlist art for the player
   *
   * Public Accessor: Amplitude.setDefaultPlaylistArt( url )
   *
   * @access public
   * @param {string} url - A string representing the URL of the new default playlist art.
   */
  function setDefaultPlaylistArt(url) {
    config.default_plalist_art = url;
  }

  /**
   * Allows the user to get the percentage of the song played.
   *
   * Public Accessor: Amplitude.getSongPlayedPercentage();
   *
   * @access public
   */
  function getSongPlayedPercentage() {
    /*
			Returns the percentage of the song played.
		*/
    return (config.audio.currentTime / config.audio.duration) * 100;
  }

  /**
   * Allows the user to get the amount of seconds the song has played.
   *
   * Public Accessor: Amplitude.getSongPlayed();
   *
   * @access public
   */
  function getSongPlayedSeconds() {
    /*
			Returns the amount of seconds the song has played.
		*/
    return config.audio.currentTime;
  }

  /**
   * Allows the user to get the duration of the current song
   *
   * Public Accessor: Amplitude.getSongPlayed();
   *
   * @access public
   */
  function getSongDuration() {
    /*
			Returns the duration of the current song
		*/
    return config.audio.duration;
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
  function setSongPlayedPercentage(percentage) {
    /*
			Ensures the percentage is a number and is between 0 and 100.
		*/
    if (typeof percentage == "number" && (percentage > 0 && percentage < 100)) {
      /*
					Sets the current time of the song to the percentage.
				*/
      config.audio.currentTime = config.audio.duration * (percentage / 100);
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
  function setDebug(state) {
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
  function getActiveSongMetadata() {
    return config.active_metadata;
  }

  /**
   * Returns the active playlist meta data for the for the user to use.
   *
   * Public Accessor: Amplitude.getActivePlaylistMetadata();
   *
   * @access public
   * @returns {object} JSON representation for the active playlist
   */
  function getActivePlaylistMetadata() {
    return config.playlists[config.active_playlist];
  }

  /**
   * Returns a song in the songs array at that index
   *
   * Public Accessor: Amplitude.getSongAtIndex( song_index )
   *
   * @access public
   * @param {number} index 	- The integer for the index of the song in the songs array.
   * @returns {object} JSON representation for the song at a specific index.
   */
  function getSongAtIndex(index) {
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
  function getSongAtPlaylistIndex(playlist, index) {
    let song = config.playlists[playlist].songs[index];

    return song;
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
  function addSong(song) {
    /*
			Ensures we have a songs array to push to.
		*/
    if (config.songs == undefined) {
      config.songs = [];
    }

    config.songs.push(song);

    if (config.shuffle_on) {
      config.shuffle_list.push(song);
    }

    if (SoundCloud.isSoundCloudURL(song.url)) {
      SoundCloud.resolveIndividualStreamableURL(
        song.url,
        null,
        config.songs.length - 1,
        config.shuffle_on
      );
    }

    return config.songs.length - 1;
  }

  /**
   * Adds a song to the beginning of the config array.
   * This will allow Amplitude to play the song in a
   * playlist type setting.
   *
   * Public Accessor: Amplitude.addSong( song_json )
   *
   * @access public
   * @param {object} song 	- JSON representation of a song.
   * @returns {number} New index of the song (0)
   */
  function prependSong(song) {
    /*
			Ensures we have a songs array to push to.
		*/
    if (config.songs == undefined) {
      config.songs = [];
    }

    config.songs.unshift(song);

    if (config.shuffle_on) {
      config.shuffle_list.unshift(song);
    }

    if (SoundCloud.isSoundCloudURL(song.url)) {
      SoundCloud.resolveIndividualStreamableURL(
        song.url,
        null,
        config.songs.length - 1,
        config.shuffle_on
      );
    }

    return 0;
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
  function addSongToPlaylist(song, playlist) {
    if (config.playlists[playlist] != undefined) {
      config.playlists[playlist].songs.push(song);

      if (config.playlists[playlist].shuffle) {
        config.playlists[playlist].shuffle_list.push(song);
      }

      if (SoundCloud.isSoundCloudURL(song.url)) {
        SoundCloud.resolveIndividualStreamableURL(
          song.url,
          playlist,
          config.playlists[playlist].songs.length - 1,
          config.playlists[playlist].shuffle
        );
      }

      return config.playlists[playlist].songs.length - 1;
    } else {
      Debug.writeMessage("Playlist doesn't exist!");
      return null;
    }
  }

  /**
   * Adds a playlist to Amplitude.
   *
   * @param {string} key  - The key of the playlist we are adding.
   * @param {object} data - The data relating to the playlist
   * @param {array} songs - The songs to add to the playlist
   */
  function addPlaylist(key, data, songs) {
    /*
      Ensures the playlist is not already defined.
    */
    if (config.playlists[key] == undefined) {
      /*
        Initialize the new playlist object.
      */
      config.playlists[key] = {};

      /*
        Define the ignored keys that we don't want to copy over.
      */
      let ignoredKeys = ["repeat", "shuffle", "shuffle_list", "songs", "src"];

      /*
        Iterate over all of the keys defined by the user and
        set them on the playlist.
      */
      for (let dataKey in data) {
        if (ignoredKeys.indexOf(dataKey) < 0) {
          config.playlists[key][dataKey] = data[dataKey];
        }
      }

      /*
        Initialize the default parameters for the playlist and set the songs.
      */
      config.playlists[key].songs = songs;
      config.playlists[key].active_index = null;
      config.playlists[key].repeat = false;
      config.playlists[key].shuffle = false;
      config.playlists[key].shuffle_list = [];

      return config.playlists[key];
    } else {
      Debug.writeMessage("A playlist already exists with that key!");
      return null;
    }
  }

  /**
   * Removes a song from the song array
   *
   * Public Accessor: Amplitude.removeSong( index )
   *
   * @access public
   * @param {integer} index - Index of the song being removed
   * @returns {boolean} True if removed false if not.
   */
  function removeSong(index) {
    config.songs.splice(index, 1);
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
  function removeSongFromPlaylist(index, playlist) {
    if (config.playlists[playlist] != undefined) {
      config.playlists[playlist].songs.splice(index, 1);
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
  function playNow(song) {
    /*
			Makes sure the song object has a URL associated with it
			or there will be nothing to play.
		*/
    if (song.url) {
      config.audio.src = song.url;
      config.active_metadata = song;
      config.active_album = song.album;
    } else {
      /*
				Write error message since the song passed in doesn't
				have a URL.
			*/
      Debug.writeMessage("The song needs to have a URL!");
    }

    /*
			Plays the song.
		*/
    Core.play();

    /*
			Sets the main song control status visual
		*/
    PlayPauseElements.sync();

    /*
			Update the song meta data
		*/
    MetaDataElements.displayMetaData();

    /*
			Reset the song sliders, song progress bar info, and
			reset times. This ensures everything stays in sync.
		*/
    SongSliderElements.resetElements();

    /*
			Reset the song played progress elements.
		*/
    SongPlayedProgressElements.resetElements();

    /*
			Reset all of the current time elements.
		*/
    TimeElements.resetCurrentTimes();

    /*
			Reset all of the duration time elements.
		*/
    TimeElements.resetDurationTimes();

  }

  /**
   * Plays a song at the index passed in from the songs array.
   *
   * Public Accessor: Amplitude.playSongAtIndex( index )
   *
   * @access public
   * @param {number} index 	- The number representing the song in the songs array.
   */
  function playSongAtIndex(index) {
    /*
			 Stop the current song.
		*/
    Core.stop();

    /*
			 Determine if there is a new playlist, if so set the active playlist and change the song.
		*/
    if (Checks.newPlaylist(null)) {
      AudioNavigation.setActivePlaylist(null);

      AudioNavigation.changeSong(config.songs[index], index);
    }

    /*
			 Check if the song is new. If so, change the song.
		*/
    if (Checks.newSong(null, index)) {
      AudioNavigation.changeSong(config.songs[index], index);
    }

    /*
			Play the song
		*/
    Core.play();

    /*
			Sync all of the play pause buttons.
		*/
    PlayPauseElements.sync();
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
  function playPlaylistSongAtIndex(index, playlist) {
    Core.stop();

    /*
			Determine if there is a new playlist, if so set the active playlist and change the song.
		*/
    if (Checks.newPlaylist(playlist)) {
      AudioNavigation.setActivePlaylist(playlist);

      AudioNavigation.changeSongPlaylist(
        playlist,
        config.playlists[playlist].songs[index],
        index
      );
    }

    /*
			Check if the song is new. If so, change the song.
		*/
    if (Checks.newSong(playlist, index)) {
      AudioNavigation.changeSongPlaylist(
        playlist,
        config.playlists[playlist].songs[index],
        index
      );
    }

    /*
			Sync all of the play pause buttons.
		*/
    PlayPauseElements.sync();

    /*
			Play the song
		*/
    Core.play();
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
  function play() {
    Core.play();
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
  function pause() {
    Core.pause();
  }

  /**
   * Allows the user to stop whatever the active song is directly
   * through Javascript.
   *
   * Public Accessor: Amplitude.stop();
   *
   * @access public
   */
  function stop() {
    Core.stop();
  }

  /**
   * Returns the audio object used to play the audio
   *
   * Public Accessor: Amplitude.getAudio();
   *
   * @access public
   */
  function getAudio() {
    return config.audio;
  }

  /**
   * Returns the Web Audio API ANalyser used for visualizations.
   *
   * Public Accessor: Amplitude.getAnalyser()
   *
   * @access public
   */
  function getAnalyser() {
    return config.analyser;
  }

  /**
   * Plays the next song either in the playlist or globally.
   *
   * Public Accessor: Amplitude.next( playlist );
   *
   * @access public
   * @param {string} [playlist = null 	- The playlist key
   */
  function next(playlist = null) {
    let nextData = {};
    /*
			If the playlist is empty or null, then we check the active
			playlist
		*/
    if (playlist == "" || playlist == null) {
      /*
				If the active playlist is null, then we set the next global
				song or we set the next in the playlist.
			*/
      if (config.active_playlist == null || config.active_playlist == "") {
        AudioNavigation.setNext();
      } else {
        AudioNavigation.setNextPlaylist(config.active_playlist);
      }
    } else {
      AudioNavigation.setNextPlaylist(playlist);
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
  function prev(playlist = null) {
    let prevData = {};

    /*
			If the playlist is empty or null, then we check the active
			playlist
		*/
    if (playlist == "" || playlist == null) {
      /*
				If the active playlist is null, then we set the prev global
				song or we set the prev in the playlist.
			*/
      if (config.active_playlist == null || config.active_playlist == "") {
        AudioNavigation.setPrevious();
      } else {
        AudioNavigation.setPreviousPlaylist(config.active_playlist);
      }
    } else {
      AudioNavigation.setPreviousPlaylist(playlist);
    }
  }

  /**
   * Gets all of the songs in the songs array
   *
   * Public Accessor: Amplitude.getSongs( );
   *
   * @access public
   */
  function getSongs() {
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
  function getSongsInPlaylist(playlist) {
    return config.playlists[playlist].songs;
  }

  /**
   * Get current state of songs. If shuffled, this will return the shuffled
   * songs.
   *
   * Public Accessor: Amplitude.getSongsState();
   *
   * @access public
   */
  function getSongsState() {
    if (config.shuffle_on) {
      return config.shuffle_list;
    } else {
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
   */
  function getSongsStatePlaylist(playlist) {
    if (config.playlists[playlist].shuffle) {
      return config.playlists[playlist].shuffle_list;
    } else {
      return config.playlists[playlist].songs;
    }
  }

  /**
   * Gets the active index of the player
   *
   * Public Accessor: Amplitude.getActiveIndex()
   *
   * @access public
   */
  function getActiveIndex() {
    return parseInt(config.active_index);
  }

  /**
   * Get the version of AmplitudeJS
   *
   * Public Accessor: Amplitude.getVersion()
   *
   * @access public
   */
  function getVersion() {
    return config.version;
  }

  /**
   * Get the buffered amount for the current song
   *
   * Public Accessor: Amplitude.getBuffered()
   *
   * @access public
   */
  function getBuffered() {
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
  function skipTo(seconds, songIndex, playlist = null) {
    seconds = parseInt(seconds);

    if (playlist != null) {
      /*
        Checks if we are skipping to a new playlist
      */
      if (Checks.newPlaylist(playlist)) {
        AudioNavigation.setActivePlaylist(playlist);
      }

      /*
        Changes the song to where it's being skipped and then
        play the song.
      */
      AudioNavigation.changeSongPlaylist(
        playlist,
        config.playlists[playlist].songs[songIndex],
        songIndex
      );
      Core.play();

      /*
        Sync all of the play pause elements.
      */
      PlayPauseElements.syncGlobal();
      PlayPauseElements.syncPlaylist();
      PlayPauseElements.syncSong();

      /*
        Skip to the location in the song.
      */
      Core.skipToLocation(seconds);
    } else {
      /*
        Changes the song to where it's being skipped and then
        play the song.
      */
      AudioNavigation.changeSong(config.songs[songIndex], songIndex);
      Core.play();

      /*
        Syncs all of the play pause buttons now that we've skipped.
      */
      PlayPauseElements.syncGlobal();
      PlayPauseElements.syncSong();

      /*
        Skip to the location in the song.
      */
      Core.skipToLocation(seconds);
    }
  }

  /**
   * Sets the meta data for a song in the songs array. This will set any
   * meta data for a song besides the URL. The URL could cause issues if the
   * song was playing.
   *
   * Public Accessor: Amplitude.setSongMetaData()
   *
   * @access public
   * @param {number} index					- The index of the song in the songs array.
   * @param {object} metaData 			- The object containing the meta data we are updating.
   * @param {string} playlist       - The playlist we are updating the song meta data for.
   */
  function setSongMetaData(index, metaData, playlist = null) {
    /*
      Update the meta data for a song in a playlist.
    */
    if (
      playlist != "" &&
      playlist != null &&
      config.playlists[playlist] != undefined
    ) {
      /*
        Set all of the defined meta data properties
      */
      for (var key in metaData) {
        if (metaData.hasOwnProperty(key)) {
          if (key != "url" && key != "URL" && key != "live" && key != "LIVE") {
            config.playlists[playlist].songs[index][key] = metaData[key];
          }
        }
      }
    } else {
      /*
        Update the meta data for a song.
      */
      for (var key in metaData) {
        if (metaData.hasOwnProperty(key)) {
          if (key != "url" && key != "URL" && key != "live" && key != "LIVE") {
            config.songs[index][key] = metaData[key];
          }
        }
      }
    }

    /*
      Display the updates on the screen.
    */
    MetaDataElements.displayMetaData();
    MetaDataElements.syncMetaData();
  }

  function setPlaylistMetaData(playlist, metaData) {
    if (config.playlists[playlist] != undefined) {
      /*
  			These are the ignored keys that we won't be worrying about displaying.
  			Every other key in the playlist object can be displayed.
  		*/
      let ignoredKeys = ["repeat", "shuffle", "shuffle_list", "songs", "src"];

      for (var key in metaData) {
        if (metaData.hasOwnProperty(key)) {
          if (ignoredKeys.indexOf(key) < 0) {
            config.playlists[playlist][key] = metaData[key];
          }
        }
      }

      MetaDataElements.displayPlaylistMetaData();
    } else {
      Debug.writeMessage("You must provide a valid playlist key!");
    }
  }

  /**
   * Sets the delay between the songs when they are finished.
   *
   * Public Accessor: Amplitude.setDelay()
   *
   * @access public
   * @param {number} delay 	- The millisecond delay time between songs
   */
  function setDelay(time) {
    config.delay = time;
  }

  /**
   * Returns the current delay between songs.
   *
   * Public Accessor: Amplitude.getDelay()
   *
   * @access public
   */
  function getDelay() {
    return config.delay;
  }

  /**
   * Returns the state of the player.
   *
   * Public Accessor: Amplitude.getPlayerState();
   */
  function getPlayerState() {
    return config.player_state;
  }

  /**
   * Registers a visualization and sets that visualization's
   * preferences. When creating a visualization, you can set certain
   * preferences that the user can overwrite similar to Amplitude.
   * Public Accessor: Amplitude.registerVisualization( visualization, preferences )
   *
   * @param {object} visualzation A visualization object that gets registered
   * with Amplitude
   *
   * @param {object} preferences A JSON object of preferences relating to the
   * visualization
   */
  function registerVisualization(visualization, preferences) {
    Visualizations.register(visualization, preferences);
  }

  /**
   * Set the visualization for the playlist
   *
   * @param {string} playlist - The playlist we are setting the visualization for.
   * @param {string} visualizationKey - The key of the visualization we are adding to the playlist.
   */
  function setPlaylistVisualization(playlist, visualizationKey) {
    if (config.playlists[playlist] != undefined) {
      if (config.visualizations.available[visualizationKey] != undefined) {
        config.playlists[playlist].visualization = visualizationKey;
      } else {
        Debug.writeMessage(
          "A visualization does not exist for the key provided."
        );
      }
    } else {
      Debug.writeMessage("The playlist for the key provided does not exist");
    }
  }

  /**
   * Set a visualization for the song.
   *
   * @param {number} songIndex - The index of the song in the songs array we are setting the visualization for.
   * @param {string} visualizationKey - The key of the visualization we are adding to the playlist.
   */
  function setSongVisualization(songIndex, visualizationKey) {
    if (config.songs[songIndex]) {
      if (config.visualizations.available[visualizationKey] != undefined) {
        config.songs[songIndex].visualization = visualizationKey;
      } else {
        Debug.writeMessage(
          "A visualization does not exist for the key provided."
        );
      }
    } else {
      Debug.writeMessage("A song at that index is undefined");
    }
  }

  /**
   * Set song in playlist visualization.
   *
   * @param {string} playlist - The playlist we are setting the song visualization for.
   * @param {number} songIndex - The index we are setting the visualization for.
   * @param {strong} visualizationKey - The key of the visualization we are adding to the song in the playlist.
   */
  function setSongInPlaylistVisualization(
    playlist,
    songIndex,
    visualizationKey
  ) {
    if (config.playlists[playlist].songs[songIndex] != undefined) {
      if (config.visualizations.available[visualizationKey] != undefined) {
        config.playlists[playlist].songs[
          songIndex
        ].visualization = visualizationKey;
      } else {
        Debug.writeMessage(
          "A visualization does not exist for the key provided."
        );
      }
    } else {
      Debug.writeMessage("The song in the playlist at that key is not defined");
    }
  }

  /**
   * Sets the global visualization default.
   */
  function setGlobalVisualization(visualizationKey) {
    if (config.visualizations.available[visualizationKey] != undefined) {
      config.visualization = visualizationKey;
    } else {
      Debug.writeMessage(
        "A visualization does not exist for the key provided."
      );
    }
  }

  /**
   * Sets the active volume.
   * @param {number} volumeLevel - A number between 1 and 100 as a percentage of
   * min to max for a volume level.
   */
  function setVolume(volumeLevel) {
    Core.setVolume(volumeLevel);
  }

  /**
   * Gets the active volume.
   */
  function getVolume() {
    return config.volume;
  }

  /*
		Returns all of the publically accesible methods.
	*/
  return {
    init: init,
    getConfig: getConfig,
    bindNewElements: bindNewElements,
    getActivePlaylist: getActivePlaylist,
    getPlaybackSpeed: getPlaybackSpeed,
    setPlaybackSpeed: setPlaybackSpeed,
    getRepeat: getRepeat,
    getRepeatPlaylist: getRepeatPlaylist,
    getShuffle: getShuffle,
    getShufflePlaylist: getShufflePlaylist,
    setShuffle: setShuffle,
    setShufflePlaylist: setShufflePlaylist,
    setRepeat: setRepeat,
    setRepeatSong: setRepeatSong,
    setRepeatPlaylist: setRepeatPlaylist,
    getDefaultAlbumArt: getDefaultAlbumArt,
    setDefaultAlbumArt: setDefaultAlbumArt,
    getDefaultPlaylistArt: getDefaultPlaylistArt,
    setDefaultPlaylistArt: setDefaultPlaylistArt,
    getSongPlayedPercentage: getSongPlayedPercentage,
    setSongPlayedPercentage: setSongPlayedPercentage,
    getSongPlayedSeconds: getSongPlayedSeconds,
    getSongDuration: getSongDuration,
    setDebug: setDebug,
    getActiveSongMetadata: getActiveSongMetadata,
    getActivePlaylistMetadata: getActivePlaylistMetadata,
    getSongAtIndex: getSongAtIndex,
    getSongAtPlaylistIndex: getSongAtPlaylistIndex,
    addSong: addSong,
    prependSong: prependSong,
    addSongToPlaylist: addSongToPlaylist,
    removeSong: removeSong,
    removeSongFromPlaylist: removeSongFromPlaylist,
    playNow: playNow,
    playSongAtIndex: playSongAtIndex,
    playPlaylistSongAtIndex: playPlaylistSongAtIndex,
    play: play,
    pause: pause,
    stop: stop,
    getAudio: getAudio,
    getAnalyser: getAnalyser,
    next: next,
    prev: prev,
    getSongs: getSongs,
    getSongsInPlaylist: getSongsInPlaylist,
    getSongsState: getSongsState,
    getSongsStatePlaylist: getSongsStatePlaylist,
    getActiveIndex: getActiveIndex,
    getVersion: getVersion,
    getBuffered: getBuffered,
    skipTo: skipTo,
    setSongMetaData: setSongMetaData,
    setPlaylistMetaData: setPlaylistMetaData,
    setDelay: setDelay,
    getDelay: getDelay,
    getPlayerState: getPlayerState,
    addPlaylist: addPlaylist,
    registerVisualization: registerVisualization,
    setPlaylistVisualization: setPlaylistVisualization,
    setSongVisualization: setSongVisualization,
    setSongInPlaylistVisualization: setSongInPlaylistVisualization,
    setGlobalVisualization: setGlobalVisualization,
    getVolume: getVolume,
    setVolume: setVolume
  };
})();

export default Amplitude;
