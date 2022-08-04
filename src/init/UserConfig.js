import { config } from '@/config.js';
import { Audio } from '@/core/Audio';
import { Debug } from '@/services/Debug';
import { PlaybackSpeedElement } from '@/elements/PlaybackSpeedElement';
import { VolumeSliderElement } from '@/elements/VolumeSliderElement';

export class UserConfig {
    copyUserSettings( userConfig ){
        this.setAudio( userConfig.audio );
		this.setCollections( userConfig.collections );
		this.setVolume( userConfig.volume );
		this.setDebug( userConfig.debug );
		this.setDefaultArtwork( userConfig.art );
		this.setPlaybackSpeed( userConfig.playback_speed );
		this.setCallbacks( userConfig.callbacks );
        this.setDelay( userConfig.delay );
        this.setStarting( userConfig.starting );
        this.setContinueNext( userConfig.continue_next );
        this.setPreload( userConfig.preload );
        this.setKeyBindings( userConfig.key_bindings );
    }

    setAudio( value ){
		config.audio = value != undefined ? value : [];

		this.#setDefaultLiveSettings();
		this.#setDefaultAudioIndices();
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

    setCollections( userCollections ){
		config.collections = userCollections;
	}

    setVolume( volume ){
		config.volume.current = volume && volume.default ? volume.default : 50;
		config.volume.increment = volume && volume.increment ? volume.increment : 5;
		config.volume.decrement = volume && volume.decrement ? volume.decrement : 5;
	}

    setDebug( value ){
		config.debug = value != undefined ? value : false;
	}

	setDefaultArtwork( value ){
        config.art.default_audio_art = value && value.default_audio_art ? value.default_audio_art : '';
		config.art.default_collection_art = value && value.default_collection_art ? value.default_collection_art : '';
	}

    setPlaybackSpeed( speed ){
		config.playback_speed = speed != undefined ? speed : 1.0;
	}

	setCallbacks( callbacks ){
		config.callbacks = callbacks != undefined ? callbacks : [];
	}

    setDelay( delay ){
        config.delay = delay != undefined ? delay : 0;
    }

    setStarting( starting ){
        config.starting.audio_index = starting && starting.audio_index != undefined ? parseInt( starting.audio_index ) : '';
        config.starting.collection_key = starting && starting.collection_key ? starting.collection_key : '';
        config.starting.collection_audio_index = starting && starting.collection_audio_index ? starting.collection_audio_index : '';
        config.starting.collection_shuffled = starting && starting.collection_shuffled ? starting.collection_shuffled : false;
    }

    setContinueNext( continueNext ){
        config.continue_next = continueNext != undefined ? continueNext : true;
    }

    setPreload( preload ){
        config.audio.preload = preload != undefined ? preload : "auto";
    }

    setKeyBindings( keyBindings ){
        config.key_bindings = keyBindings != undefined ? keyBindings : {};
    }

    applyConfig(){
        this.#applyPlaybackSpeed();
        this.#applyVolume();

        Debug.writeMessage("Initialized With: ");
        Debug.writeMessage(config);
    }

    #applyPlaybackSpeed(){
        let audio = new Audio();
        audio.setPlaybackSpeed( config.playback_speed );
    }

    #applyVolume(){
        let audio = new Audio();
        audio.setVolume( config.volume.current );
    }
}