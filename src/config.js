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
		Object that contains the active index in a shuffled playlist.
	*/
	shuffled_active_indexes: {},

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
	soundcloud_songs_ready: 0,

	is_touch_moving: false
};

module.exports = config;