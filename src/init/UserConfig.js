import { Collections } from "@/init/Collections";
import { config } from '@/config.js';
import { MuteElement } from '@/elements/MuteElement';
import { PlaybackSpeedElement } from '@/elements/PlaybackSpeedElement';

export class UserConfig {
    copyUserSettings( userConfig ){
        this.setAudio( userConfig.audio );
		this.setCollections( userConfig.collections );
		this.setVolume( userConfig.volume );
		this.setDebug( userConfig.debug );
		this.setDefaultArtwork( userConfig.default_artwork );
		this.setPlaybackSpeed( userConfig.playback_speed );
		this.setCallbacks( userConfig.callbacks );
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

        let collections = new Collections();
        collections.initializeCollections();
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

    setPlaybackSpeed( speed ){
		config.playback_speed = speed != undefined ? speed : 1.0;

		PlaybackSpeedElement.syncElements();
	}

	setCallbacks( callbacks ){
		config.callbacks = callbacks != undefined ? callbacks : [];
	}
}