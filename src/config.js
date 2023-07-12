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
	active_index: 0,
	active_collection: null,
	is_touch_moving: false,

	playback_speed: 1.0,
	repeat: false,
	/**
	 * @todo BREAKING should be repeat_audio
	 */
	// repeat_song: false,
	repeat_audio: false,

	// User Definable Variables
	callbacks: [],
	
	audio: [],

	collections: [],

	debug: true,
	
	/**
	 * BREAKING
	 * @todo default_album_art -> art.default_audio_art
	 * @todo default_playlist_art -> art.default_collection_art
	 */
	art: {
		default_audio_art: "",
		default_collection_art: "",
	},
	

	/**
	 * @todo Starting Configuration
	 * BREAKING
	 */
	starting: {
		audio_index: null,
		collection_key: '',
		collection_audio_index: null,
		collection_shuffled: false
	},

	/**
	 * @todo BREAKING CHANGE
	 */
	volume: {
		current: 50,
		increment: 5,
		decrement: 5,
		pre_mute_level: 50
	},

	/**
	 * @todo BREAKING CHANGE
	 */
	soundcloud: {
		client: '',
		use_art: false,
		audio_count: 0,
		ready_count: 0
	},

	buffered: 0,

	/**
	 * @todo BREAKING not `bindings` -> `key_bindings`
	 */
	key_bindings: {},

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
