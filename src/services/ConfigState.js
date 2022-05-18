import { config } from '@/config.js';
import { MuteElement } from '@/elements/MuteElement';
import { PlaybackSpeedElement } from '@/elements/PlaybackSpeedElement';

export class ConfigState{
	setIsMobile(){
		if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent ) ) {
			config.mobile = true;
		}else{
			config.mobile = false;
		}
	}

	static isIos(){
		return /iPhone|iPad|iPod/i.test( navigator.userAgent );
	}

	static isIE(){
		let ua = window.navigator.userAgent;
		let msie = ua.indexOf("MSIE ");

		return ( msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) );
	}

	static isMobile(){
		return config.mobile;
	}

	static isTouchMoving(){
		return config.is_touch_moving;
	}

	static getAudioState(){
		return config.audio_element.paused ? "paused" : "playing";
	}

	static getScope(){
		if( config.active_collection == '' || config.active_collection == null ){
			return 'audio';
		}else{
			return 'collection';
		}
	}

	static getVolume(){
		return config.volume.current;
	}

	static getVolumeIncrement(){
		return config.volume.increment;
	}

	static getVolumeDecrement(){
		return config.volume.decrement;
	}

	static getPreMuteVolume(){
		return config.volume.pre_mute_level;
	}

	static setPreMuteVolume( level = null ){
		if( !level ){
			level = config.volume.current;
		}

		config.volume.pre_mute_level = level;
	}

	static getPlaybackSpeed(){
		return config.playback_speed;
	}

	static isCollectionShuffled( collection ){
		if( config.collections[ collection ] && config.collections[ collection ].shuffled ){
			return true;
		}else{ 
			return false;
		}
	}

	static setCollectionShuffled( collection, shuffled, audio ){
		config.collections[ collection ].shuffled = shuffled;
		config.collections[ collection ].audio = audio;
	}

	static getCollectionAudio( collection ){
		return config.collections[ collection ].audio;
	}

	static getActiveCollection(){
		return config.active_collection;
	}

	resetConfig(){
		config.audio_element = new Audio();
		config.active_metadata = {};
		config.active_album = "";
		config.active_index = 0;
		config.active_playlist = null;
		config.playback_speed = 1.0;
		config.callbacks = {};
		config.audio = [];
		config.playlists = {};
		config.start_audio = "";
		config.starting_playlist = "";
		config.starting_playlist_song = "";
		config.repeat = false;
		config.shuffle_list = {};
		config.shuffle_on = false;
		config.default_artwork = "";
		config.default_playlist_art = "";
		config.debug = true;

		config.volume =  {
			current: 50,
			increment: 5,
			decrement: 5,
			pre_mute_level: 50
		},

		config.soundcloud = {
			client: '',
			use_art: false,
			audio_count: 0,
			ready_count: 0
		},

		/**
		 * @todo BREAKING CHANGE
		 */
		// config.soundcloud_client = "";
		// config.soundcloud_use_art = false;
		// config.soundcloud_song_count = 0;
		// config.soundcloud_songs_ready = 0;
		config.continue_next = true;
	}

	setUserSettings( userConfig ){
		this.setAudio( userConfig.audio );
		this.setVolume( userConfig.volume );
		this.setDebug( userConfig.debug );
		this.setDefaultArtwork( userConfig.default_artwork );
		this.setCollections( userConfig.collections );
		this.setPlaybackSpeed( userConfig.playback_speed );
		this.setCallbacks( userConfig.callbacks );
	}

	setAudio( value ){
		config.audio = value != undefined ? value : [];

		this.#setDefaultLiveSettings();
		this.#setDefaultAudioIndices();
	}

	setVolume( volume ){
		config.volume.current = volume && volume.initial ? volume.initial : 50;
		config.volume.increment = volume && volume.increment ? volume.increment : 5;
		config.volume.decrement = volume && volume.decrement ? volume.decrement : 5;

		MuteElement.syncElements();
	}

	setDebug( value ){
		config.debug = value != undefined ? value : false;
	}

	setDefaultArtwork( value ){
		config.default_artwork = value != undefined ? value : false;
	}

	setCollections( collections ){
		// @todo set collections
	}

	setPlaybackSpeed( speed ){
		config.playback_speed = speed != undefined ? speed : 1.0;

		PlaybackSpeedElement.syncElements();
	}

	setCallbacks( callbacks ){
		config.callbacks = callbacks != undefined ? callbacks : {};
	}

	#setDefaultLiveSettings(){
		config.audio.forEach( ( audio, index ) => {
			if( audio.live == undefined ){
				audio.live = false;
			}
		});
	}

	#setDefaultAudioIndices(){
		config.audio.forEach( ( audio, index ) => {
			audio.index = index;
		});
	}


	static setPlayerState(){
		// If paused and the current time is 0 the player is stopped.
		if (config.audio_element.paused && config.audio_element.currentTime == 0) {
			config.player_state = "stopped";
		}
  
		// If paused and the current time is greater than 0 the player is paused.
		if (config.audio_element.paused && config.audio_element.currentTime > 0) {
			config.player_state = "paused";
		}
  
		// If playing, the current state is playing.
		if (!config.audio_element.paused) {
			config.player_state = "playing";
		}
	}
}