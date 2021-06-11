/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * AmplitudeJS Core Module
 * @module core/Core
 */
import Core from "../core/core.js";

/**
 * AmplitudeJS SoundCloud Module
 * @module soundcloud/SoundCloud
 */
import SoundCloud from "../soundcloud/soundcloud.js";

/**
 * Imports the utilities used by the main module.
 */
/**
 * AmplitudeJS Config State Module
 * @module utilities/ConfigState
 */
import ConfigState from "../utilities/configState.js";

/**
 * AmplitudeJS Debug Module
 * @module utilities/Debug
 */
import Debug from "../utilities/debug.js";

/**
 * AmplitudeJS Checks Module
 * @module utilities/Checks
 */
import Checks from "../utilities/checks.js";

/**
 * AmplitudeJS Shuffler Module
 * @module utilities/Shuffler
 */
import Shuffler from "../utilities/shuffler.js";

/**
 * AmplitudeJS Events Module
 * @module events/Events
 */
import Events from "../events/events.js";

/**
 * AmplitudeJS FX Module
 * @module fx/Fx
 */
import Fx from "../fx/fx.js";

/**
 * AmplitudeJS Visualizations Module
 * @module fx/Visualizations
 */
import Visualizations from "../fx/visualizations.js";

/**
 * AmplitudeJS WaveForm Module
 * @module fx/WaveForm
 */
import WaveForm from "../fx/waveform.js";

/**
 * AmplitudeJS Audio Navigation Module.
 * @module utilities/AudioNavigation
 */
import AudioNavigation from "../utilities/audioNavigation.js";

/**
 * AmplitudeJS Callbacks Module
 * @module utilities/Callbacks
 */
import Callbacks from "../utilities/callbacks.js";

/**
 * AmplitudeJS Playlists Initializer Module
 * @module init/Playlists
 */
import PlaylistsInitializer from "./playlists.js";

/**
 * Imports the AmplitudeJS Shuffle Elements
 * @module visual/ShuffleElements
 */
import ShuffleElements from "../visual/shuffleElements.js";

/**
 * Imports the AmplitudeJS Mute Elements
 * @module visual/MuteElements
 */
import MuteElements from "../visual/muteElements.js";

/**
 * Imports the AmplitudeJS Volume Slider
 * @module visual/VolumeSliderElements
 */
import VolumeSliderElements from "../visual/volumeSliderElements.js";

/**
 * Imports the AmplitudeJS Time Elements
 * @module visual/TimeElements
 */
import TimeElements from "../visual/timeElements.js";

/**
 * Imports the AmplitudeJS Play/Pause Elements Module.
 * @module visual/PlayPauseElements
 */
import PlayPauseElements from "../visual/playPauseElements.js";

/**
 * Imports the AmplitudeJS MetaData Elements Module.
 * @module visual/MetaDataElements
 */
import MetaDataElements from "../visual/metaDataElements.js";

/**
 * Imports the AmplitudeJS PlaybackSpeedElements Module.
 * @module visual/PlayBackSpeedElements
 */
import PlaybackSpeedElements from "../visual/playbackSpeedElements.js";

/**
 * Imports the AmplitudeJS Repeat Element
 * @module visual/RepeatElements
 */
import RepeatElements from "../visual/repeatElements.js";

/**
 * AmplitudeJS Initializer Module. Helps with the handling of all of the
 * initialization for AmplitudeJS.
 *
 * @module init/Initializer
 */
let Initializer = (function() {
  /**
   * The main init function.  The user will call this through
   * Amplitude.init({}) and pass in their settings.
   *
   * Public Accessor: Amplitude.init( user_config_json )
   * @access public
   * @param {object} userConfig - A JSON object of user defined values that help configure and initialize AmplitudeJS.
   */
  function initialize(userConfig) {
    let ready = false;

    /*
			Reset the config on init so we have a clean slate. This is if the
			user has to re-init.
		*/
    ConfigState.resetConfig();

    /*
			Initialize event handlers on init. This will clear any old
			event handlers on the amplitude element and re-bind what is
			necessary.
		*/
    Events.initialize();

    /*
      Initialize the callbacks we listen to for the audio object.
    */
    Callbacks.initialize();

    /*
			Initializes debugging right away so we can use it for the rest
			of the configuration.
		*/
    config.debug = userConfig.debug != undefined ? userConfig.debug : false;

    /*
      Set default artwork, if specified.
    */
    setArt(userConfig);

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
        Debug.writeMessage("Please add some songs, to your songs object!");
      }
    } else {
      Debug.writeMessage(
        "Please provide a songs object for AmplitudeJS to run!"
      );
    }

    /*
			Initializes the audio context. In this method it checks to see if the
			user wants to use visualizations or not before proceeding.
		*/
    if (Fx.webAudioAPIAvailable()) {
      if (Fx.determineUsingAnyFX()) {
        /*
          Configure the Web Audio API If It's available.
        */
        Fx.configureWebAudioAPI();

        /*
            Activates the audio context after an event for the user.
        */
        document.documentElement.addEventListener("mousedown", function() {
          if (config.context.state !== "running") {
            config.context.resume();
          }
        });

        document.documentElement.addEventListener("keydown", function() {
          if (config.context.state !== "running") {
            config.context.resume();
          }
        });

        document.documentElement.addEventListener("keyup", function() {
          if (config.context.state !== "running") {
            config.context.resume();
          }
        });

        /*
            Set the user waveform settings if provided.
          */
        if (
          userConfig.waveforms != undefined &&
          userConfig.waveforms.sample_rate != undefined
        ) {
          config.waveforms.sample_rate = userConfig.waveforms.sample_rate;
        }

        /*
            Initialize the waveform.
          */
        WaveForm.init();

        /*
            If the user is registering visualizations on init,
            we set them right away.
          */
        if (
          userConfig.visualizations != undefined &&
          userConfig.visualizations.length > 0
        ) {
          /*
                  Iterate over all of the visualizations and
                  register them in our player.
                */
          for (let i = 0; i < userConfig.visualizations.length; i++) {
            Visualizations.register(
              userConfig.visualizations[i].object,
              userConfig.visualizations[i].params
            );
          }
        }
      }
    } else {
      Debug.writeMessage(
        "The Web Audio API is not available on this platform. We are using your defined backups!"
      );
    }

    /*
      Initialize default live settings
    */
    initializeDefaultLiveSettings();

    /*
      Initialize default song indexes
    */
    initializeDefaultSongIndexes();

    /*
			When the preliminary config is ready, we are ready to proceed.
		*/
    if (ready) {
      /*
				Copies over the soundcloud information to the global config
				which will determine where we go from there.
			*/
      config.soundcloud_client =
        userConfig.soundcloud_client != undefined
          ? userConfig.soundcloud_client
          : "";

      /*
				Checks if we want to use the art loaded from soundcloud.
			*/
      config.soundcloud_use_art =
        userConfig.soundcloud_use_art != undefined
          ? userConfig.soundcloud_use_art
          : "";

      /*
				If the user provides a soundcloud client then we assume that
				there are URLs in their songs that will reference SoundCloud.
				We then copy over the user config they provided to the
				temp_user_config so we don't mess up the global or their configs
				and load the soundcloud information.
			*/
      let tempUserConfig = {};

      /*
        If there's a soundcloud_client key set, we load the SoundCloud data
        for all of the songs in the array.
      */
      if (config.soundcloud_client != "") {
        tempUserConfig = userConfig;

        /*
					Load up SoundCloud for use with AmplitudeJS.
				*/
        SoundCloud.loadSoundCloud(tempUserConfig);
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
    Debug.writeMessage("Initialized With: ");
    Debug.writeMessage(config);
  }

  /**
   * Rebinds all of the elements in the display.
   *
   * Public Accessor: Amplitude.rebindDisplay()
   * @access public
   */
  function rebindDisplay() {
    Events.initialize();
    MetaDataElements.displayMetaData();
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
  function setConfig(userConfig) {
    /*
      Checks if the user has any playlists defined. If they do
      we have to initialize the functionality for the playlists.
    */
    if (userConfig.playlists && countPlaylists(userConfig.playlists) > 0) {
      PlaylistsInitializer.initialize(userConfig.playlists);
    }

    /*
			Check to see if the user entered a start song
		*/
    if (userConfig.start_song != undefined && !userConfig.starting_playlist) {
      /*
				Ensure what has been entered is an integer.
			*/
      if (Checks.isInt(userConfig.start_song)) {
        AudioNavigation.changeSong(
          config.songs[userConfig.start_song],
          userConfig.start_song
        );
      } else {
        Debug.writeMessage(
          "You must enter an integer index for the start song."
        );
      }
    } else {
      AudioNavigation.changeSong(config.songs[0], 0);
    }

    /*
      If the shuffle is on by default, shuffle the songs and
      switch to the shuffled song.
    */
    if (userConfig.shuffle_on != undefined && userConfig.shuffle_on) {
      config.shuffle_on = true;
      Shuffler.shuffleSongs();

      AudioNavigation.changeSong(config.shuffle_list[0], 0);
    }

    /*
			Allows the user to set whether they want to continue to the next song
			when the current song finishes or not. In any scenario that's not a playlist,
			contining to the next song may not be desired.
		*/
    config.continue_next =
      userConfig.continue_next != undefined ? userConfig.continue_next : true;

    /*
			If the user defined a playback speed, we copy over their
			preference here, otherwise we default to normal playback
			speed of 1.0.
		*/
    config.playback_speed =
      userConfig.playback_speed != undefined ? userConfig.playback_speed : 1.0;

    /*
			Sets the audio playback speed.
		*/
    Core.setPlaybackSpeed(config.playback_speed);

    /*
			If the user wants the song to be pre-loaded for instant
			playback, they set it to true. By default it's set to just
			load the metadata.
		*/
    config.audio.preload =
      userConfig.preload != undefined ? userConfig.preload : "auto";

    /*
			Initializes the user defined callbacks. This should be a JSON
			object that contains a key->value store of the callback name
			and the name of the function the user needs to call.
		*/
    config.callbacks =
      userConfig.callbacks != undefined ? userConfig.callbacks : {};

    /*
			Initializes the user defined key bindings. This should be a JSON
			object that contains a key->value store of the key event number
			pressed and the method to be run.
		*/
    config.bindings =
      userConfig.bindings != undefined ? userConfig.bindings : {};

    /*
			The user can define a starting volume in a range of 0-100 with
			0 being muted and 100 being the loudest. After the config is set
			Amplitude sets the active song's volume to the volume defined
			by the user.
		*/
    config.volume = userConfig.volume != undefined ? userConfig.volume : 50;

    /*
			Sets the delay between songs if the user has it set. This should be in MS.
		*/
    config.delay = userConfig.delay != undefined ? userConfig.delay : 0;

    /*
			The user can set the volume increment and decrement values between 1 and 100
			for when the volume up or down button is pressed.  The default is an increase
			or decrease of 5.
		*/
    config.volume_increment =
      userConfig.volume_increment != undefined
        ? userConfig.volume_increment
        : 5;

    config.volume_decrement =
      userConfig.volume_decrement != undefined
        ? userConfig.volume_decrement
        : 5;

    /*
			Set the volume to what is defined in the config. The user can define this,
			so we should set it up that way.
		*/
    Core.setVolume(config.volume);

    /*
     Set default artwork, if specified
     */
    setArt(userConfig);

    /*
      Initialize the visual elements
    */
    initializeElements();

    /*
			If the user has selected a starting playlist, we need to set the starting playlist
			and sync the visuals
		*/
    if (
      userConfig.starting_playlist != undefined &&
      userConfig.starting_playlist != ""
    ) {
      /*
				Set the active playlist to the starting playlist by the user
			*/
      config.active_playlist = userConfig.starting_playlist;

      /*
				Check if the user defined a song to start with in the playlist.
			*/
      if (
        userConfig.starting_playlist_song != undefined &&
        userConfig.starting_playlist_song != ""
      ) {
        /*
					Ensure the song is a valid index.
				*/
        if (
          typeof userConfig.playlists[userConfig.starting_playlist].songs[
            parseInt(userConfig.starting_playlist_song)
          ] != undefined
        ) {
          /*
						Set the player to the song defined by the user.
					*/
          AudioNavigation.changeSongPlaylist(
            config.active_playlist,
            userConfig.playlists[userConfig.starting_playlist].songs[
              parseInt(userConfig.starting_playlist_song)
            ],
            parseInt(userConfig.starting_playlist_song)
          );
        } else {
          /*
						Set the player to the first song in the playlist
					*/
          AudioNavigation.changeSongPlaylist(
            config.active_playlist,
            userConfig.playlists[userConfig.starting_playlist].songs[0],
            0
          );
          /*
						Debug that the song index doesn't exist
					*/
          Debug.writeMessage(
            "The index of " +
              userConfig.starting_playlist_song +
              " does not exist in the playlist " +
              userConfig.starting_playlist
          );
        }
      } else {
        /*
					Set the player to the first song in the playlist
				*/
        AudioNavigation.changeSong(
          config.active_playlist,
          userConfig.playlists[userConfig.starting_playlist].songs[0],
          0
        );
      }

      /*
				Sync the main and song play pause buttons.
			*/
      PlayPauseElements.sync();
    }

    /*
			Run after init callback
		*/
    Callbacks.run("initialized");
  }

  /**
   * Sets the default_album_art and default_playlist_art from the
   * user supplied configuration.
   *
   * @access public
   * @param {object} userConfig - A JSON object of user defined values that help configure and initialize AmplitudeJS.
   */
  function setArt(userConfig) {
    /*
      If the user defines default album art, this image will display if the active
      song doesn't have album art defined.
    */
    if (userConfig.default_album_art != undefined) {
      config.default_album_art = userConfig.default_album_art;
    } else {
      config.default_album_art = "";
    }

    /*
			If the user defines default playlist art, this image will display if the user
			tries to set up a playlist meta data image tag but doesn't have one defined.
		*/
    if (userConfig.default_playlist_art != undefined) {
      config.default_playlist_art = userConfig.default_playlist_art;
    } else {
      config.default_playlist_art = "";
    }
  }

  /**
   * Initializes all of the elements on the page to the default starting point
   * to build from there.
   *
   * @access private
   */
  function initializeElements() {
    /*
			Visually sync the shuffle statuses
		*/
    ShuffleElements.syncMain();

    /*
			Sync Mute Elements.
		*/
    MuteElements.setMuted(config.volume == 0 ? true : false);

    /*
			Sync Volume Slider Elements
		*/
    VolumeSliderElements.sync();

    /*
			Syncs all of the playback speed elements.
		*/
    PlaybackSpeedElements.sync();

    /*
			Syncs all of the visual time elements to 00.
		*/
    TimeElements.resetCurrentTimes();

    /*
			Sets all of the play pause buttons to pause.
		*/
    PlayPauseElements.syncToPause();

    /*
			Sets the meta data for the songs automatically.
		*/
    MetaDataElements.syncMetaData();

    /*
			Sets the repeat buttons automatically.
		*/
    RepeatElements.syncRepeatSong();
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
  function countPlaylists(playlists) {
    /*
			Initialize the placeholders to iterate through the playlists
			and find out how many we have to account for.
		*/
    let size = 0,
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
    Debug.writeMessage("You have " + size + " playlist(s) in your config");

    /*
			Return the number of playlists in the config.
		*/
    return size;
  }

  /**
   * Intializes the default live settings for all of the songs.
   *
   * @access private
   */
  function initializeDefaultLiveSettings() {
    for (let i = 0; i < config.songs.length; i++) {
      if (config.songs[i].live == undefined) {
        config.songs[i].live = false;
      }
    }
  }

  /**
   * Initializes the index of the song in the songs array so
   * we can reference it if needed
   *
   * @access private
   */
  function initializeDefaultSongIndexes() {
    for (let i = 0; i < config.songs.length; i++) {
      config.songs[i].index = i;
    }
  }

  /*
		Returns the publicly accessible methods
	*/
  return {
    initialize: initialize,
    setConfig: setConfig,
    rebindDisplay: rebindDisplay
  };
})();

export default Initializer;
