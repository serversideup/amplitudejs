/**
 * These variables make Amplitude run. The config is the most important
 * containing active settings and parameters.
 *
 * The config JSON is the global settings for ALL of Amplitude functions.
 * This is global and contains all of the user preferences. The default
 * settings are set, and the user overwrites them when they initialize
 * Amplitude.
 *
 * @module config
 * @type {object}
 * @property {string}  	config.version          				- The current version of AmplitudeJS.
 * @property {object} 	config.active_song 		 					-	Handles all of the audio.
 * @property {object} 	config.active_metadata					- Contains the active metadata for the song.
 * @property {string} 	config.active_album							- Holds the active album name. Used to check and see if the album changed and run the album changed callback.
 * @property {number} 	config.active_index							- Contains the index of the actively playing song.
 * @property {string} 	config.active_playlist					- Contains the key to the active playlist index.
 * @property {boolean}	config.autoplay									- Set to true to autoplay the song
 * @property {number} 	config.playback_speed						- Sets the initial playback speed of the song. The values for this can be 1.0, 1.5, 2.0
 * @property {object} 	config.callbacks								- The user can pass a JSON object with a key => value store of callbacks to be run at certain events.
 * @property {array} 		config.songs										- Contains all of the songs the user has passed to Amplitude to use.
 * @property {object} 	config.playlists								- Contains all of the playlists the user created.
 * @property {object} 	config.start_song 							- The index of the song that AmplitudeJS should start with.
 * @property {object} 	config.shuffled_playlists				- Will contain shuffled playlists.
 * @property {string} 	config.starting_playlist 				- The starting playlist the player will intiialize to.
 * @property {string} 	config.starting_playlist_song 	- The index of the song in the playlist that should be started.
 * @property {object} 	config.shuffled_statuses 				- Contains whether the current playlist is in shuffle mode or not.
 * @property {object} 	config.repeat_statuses 					- Contains whether the playlist is in repeat mode or not.
 * @property {object} 	config.shuffled_active_indexes	- Contains the active index in a shuffled playlist.
 * @property {boolean} 	config.repeat 									- When repeat is on, when the song ends the song will replay itself.
 * @property {object} 	config.shuffle_list							- When shuffled, gets populated with the songs the user provided in a random order.
 * @property {boolean} 	config.shuffle_on								- When on, gets set to true so when traversing through songs, AmplitudeJS knows whether or not to use the songs object or the shuffle_list
 * @property {number} 	config.shuffle_active_index 		- When shuffled, this index is used to let AmplitudeJS know where it's at when traversing.
 * @property {string}		config.default_album_art 				- The user can set default album art to be displayed if the song they set doesn't contain album art.
 * @property {boolean} 	config.debug										- When set to true, AmplitudeJS will print to the console any errors providing helpful feedback to the user.
 * @property {number} 	config.volume 									- The user can set the initial volume to a number between 0 and 1 over-riding the default of .5
 * @property {number} 	config.pre_mute_volume 					- This is set on mute so that when a user un-mutes AmplitudeJS knows what to restore the volume to.
 * @property {number}		config.volume_increment 				- The default values are an integer between 1 and 100 for how much the volume should increase when the user presses the volume up button.
 * @property {number}		config.volume_decrement 				- The default values are an integer between 1 and 100 for how much the volume should decrease when the user presses the volume down button.
 * @property {string} 	config.soundcloud_client 				- When using SoundCloud, the user will have to provide their API Client ID
 * @property {boolean} 	config.soundcloud_use_art 			- The user can set this to true and AmplitudeJS will use the album art for the song returned from the Soundcloud API
 * @property {number} 	config.soundcloud_song_count 		- Used on config to count how many songs are from Soundcloud and compare it to how many are ready for when to move to the rest of the configuration
 * @property {number} 	config.soundcloud_songs_ready 	- Used on config to count how many songs are ready so when we get all of the data from the SoundCloud API that we need this should match the SoundCloud song count meaning we can move to the rest of the config.
 * @property {integer}	config.is_touch_moving 					- Flag for if the user is moving the screen.
 * @property {boolean}	config.buffered									- How much of the song is buffered.
 * @property {object} 	config.bindings									- Array of bindings to certain key events.
 * @property {boolean} 	config.continue_next 						- Determines when a song ends, we should continue to the next song.
 */
module.exports = {
	version: '3.3.0',

	active_song: new Audio(),

	active_metadata: {},

	active_album: '',

	active_index: 0,

	active_playlist: '',

	autoplay: false,

	playback_speed: 1.0,

	callbacks: {},

	songs: [],

	playlists: {},

	start_song: '',

	shuffled_playlists: {},

	starting_playlist: '',

	starting_playlist_song: '',

	shuffled_statuses: {},

	shuffled_active_indexes: {},

	repeat_statuses: {},

	repeat: false,

	repeat_song: false,

	shuffle_list: {},

	shuffle_on: false,

	shuffle_active_index: 0,

	default_album_art: '',

	debug: false,

	volume: .5,

	pre_mute_volume: .5,

	volume_increment: 5,

	volume_decrement: 5,

	soundcloud_client: '',

	soundcloud_use_art: false,

	soundcloud_song_count: 0,

	soundcloud_songs_ready: 0,

	is_touch_moving: false,

	buffered: 0,

	bindings: {},

	continue_next: true
};
