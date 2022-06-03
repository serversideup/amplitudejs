/**
 * These variables make Amplitude run. The config is the most important
 * containing active settings and parameters.
 *
 * The config JSON is the global settings for ALL of Amplitude functions.
 * This is global and contains all of the user preferences. The default
 * settings are set, and the user overwrites them when they initialize
 * Amplitude.
 */
import version from "../package.json";

export const config = {
	// Amplitude State Variables
	audio_element: new Audio(),
	mobile: false,
	version: version,

	// Amplitude Dynamic Variables
	active_metadata: {},
	active_album: "",
	active_index: 0,

	active_podcast: null,
	active_playlist: null,
	active_collection: null,

	playback_speed: 1.0,
	repeat: false,
	shuffle_list: {},
	/**
	 * @todo BREAKING should be repeat_audio
	 */
	// repeat_song: false,
	repeat_audio: false,
	shuffle_on: false,

	// User Definable Variables
	callbacks: {},
	
	songs: [],
	episodes: [],
	audio: [],

	playlists: [],
	seasons: [],
	podcasts: [],
	debug: true,
	default_artwork: "",
	default_playlist_art: "",

	start_audio: "",

	starting_playlist: "",
	starting_playlist_song: "",

	starting_podcast: "",
	starting_podcast_episode: "",

	

	

	

	

	
	

	

	/**
	 * @todo BREAKING CHANGE
	 */
	volume: {
		current: 50,
		increment: 5,
		decrement: 5,
		pre_mute_level: 50
	},
	//   volume: 0.5,

	//   pre_mute_volume: 0.5,

	//   volume_increment: 5,

	//   volume_decrement: 5,

	/**
	 * @todo BREAKING CHANGE
	 */
	soundcloud: {
		client: '',
		use_art: false,
		audio_count: 0,
		ready_count: 0
	},
	// soundcloud_client: "",

	// soundcloud_use_art: false,

	// soundcloud_song_count: 0,

	// soundcloud_songs_ready: 0,

	is_touch_moving: false,

	buffered: 0,

	bindings: {},

	continue_next: true,

	delay: 0,

	player_state: "stopped",

	time_format: 'MM:SS',

	/**
	 * @todo BREAKING
	 */
	web_audio_api:{
		availabile: false,
		context: null,
		source: null,
		analyser: null
	},
	//   web_audio_api_available: false,

	//   context: null,

	//   source: null,

	//   analyser: null,

	visualizations: {
		available: [],

		active: [],

		backup: ""
	},
	
	waveforms: {
	sample_rate: 100,

	built: [],

	}
};
