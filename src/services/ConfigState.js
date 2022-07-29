import { config } from '@/config.js';

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

	static isCollectionShuffled( collectionIndex ){
		if( config.collections[ collectionIndex ] && config.collections[ collectionIndex ].shuffled ){
			return true;
		}else{ 
			return false;
		}
	}

	static setCollectionShuffled( collectionIndex, shuffled, audio ){
		config.collections[ collectionIndex ].shuffled = shuffled;
		config.collections[ collectionIndex ].shuffle_list = audio;
	}

	static getCollectionAudio( collectionIndex ){
		return config.collections[ collectionIndex ].audio;
	}

	static getActiveCollection(){
		return config.active_collection;
	}

	static getActiveAudioIndex(){
		return config.active_index;
	}

	static getContinueNext(){
		return config.continue_next;
	}

	static getCollectionIntegerIndex( key ){
		let index = null;

		if( isNaN( key ) ){
			config.collections.forEach( function( collection, collectionIndex ){
				if( collection.key == key ){
					index = collectionIndex;
				}
			});
		}else{
			index = key;
		}

		return index;
	}

	static getCollectionKey( index ){
		return config.collections[ index ].key;
	}

	static getStartingCollectionKey(){
		return config.starting.collection_key != '' 
				? ConfigState.getCollectionIntegerIndex( config.starting.collection_key )
				: '';
	}

	static getStartingCollectionAudioIndex(){
		return config.starting.collection_audio_index != ''
					? config.starting.collection_audio_index
					: 0;
	}

	static updateBufferedTime(){
		// Help from: http://jsbin.com/badimipi/1/edit?html,js,output
        if( config.audio_element.buffered.length - 1 >= 0 ){
            let bufferedEnd = config.audio_element.buffered.end(
                config.audio_element.buffered.length - 1
            );

            let duration = config.audio_element.duration;

            config.buffered = ( bufferedEnd / duration ) * 100;
        }
	}

	static getBufferedPercentage(){
		return parseFloat( config.buffered ) / 100;
	}

	static isLive(){
		return config.active_metadata.live;
	}

	static getTimeFormat(){
		return config.time_format;
	}

	static getCallback( name ){
		let callbackObject = false;

		config.callbacks.forEach( function( callback ){
			if( callback.event == name ){
				callbackObject = callback
			}
		});

		return callbackObject;
	}

	resetConfig(){
		config.audio_element = new Audio();
		config.active_metadata = {};
		config.active_album = "";
		config.active_index = 0;
		config.active_playlist = null;
		config.playback_speed = 1.0;
		config.audio = [];
		config.start_audio = "";
		config.starting_playlist = "";
		config.starting_playlist_song = "";
		config.repeat = false;
		config.shuffle_list = {};
		config.shuffle_on = false;
		config.default_artwork = "";
		config.default_playlist_art = "";
		config.debug = true;
		config.callbacks = [];

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

		/**
		 * @todo rebind event handlers
		 */
		
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