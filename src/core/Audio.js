import { config } from "@/config.js";
import { ConfigState } from "../services/ConfigState";

export class Audio{
    play(){
        this.#startVisualizations();
        this.#reconnectStream();
        this.#playAudio();
        ConfigState.setPlayerState();
    }

    pause(){
        this.#stopVisualizations();
        this.#pauseAudio();
        this.#disconnectStream();
        ConfigState.setPlayerState();
    }

    stop(){
        this.#stopVisualizations();
        this.#setCurrentTime(0);
        this.#pauseAudio();
        this.#disconnectStream();
        ConfigState.setPlayerState();
        /**
         * @todo run stop callback
         */
    }

    /**
     * 
     * @param {number} volumeLevel - A number between 1 - 100 as percentage of volume.
     */
    setVolume( volumeLevel ){
        this.#setMuted( volumeLevel );
        this.#setAudioVolume( volumeLevel );
    }

    setAudioLocation( percentage ){
        if( !config.active_metadata.live ){
            config.audio_element.currentTime = config.audio_element.duration * ( percentage / 100 );
        }
    }

    setPlaybackSpeed( playbackSpeed ){
        config.playback_speed = playbackSpeed;
        config.audio_element.playbackRate = config.playback_speed;
    }

    #startVisualizations(){
        // Visualizations.stop();
        // Visualizations.run();
    }

    #stopVisualizations(){
        // Visualizations.stop();
    }

    #reconnectStream(){
        /*
            Mobile remote sources need to be reconnected on play. I think this is
            because mobile browsers are optimized not to load all resources
            for speed reasons. We only do this if mobile and the paused button
            is not clicked. If the pause button was clicked then we don't reconnect
            or the user will lose their place in the stream.
        */ 
        if( config.active_metadata.live 
            || ( ConfigState.isMobile() && !config.paused ) ){
                config.audio_element.src = config.active_metadata.url;
                config.audio_element.load();
        }
    }

    #disconnectStream(){
        if( config.active_metadata.live ){
            config.audio_element.src = "";
            config.audio_element.load();
        }
    }

    #playAudio(){
        let playPromise = config.audio_element.play();

        if( playPromise !== undefined ){
            playPromise.then(_ => {}).catch(error => {});
        }

        config.audio_element.playbackRate = config.playback_speed;
    }

    #pauseAudio(){
        config.audio_element.pause();
        config.paused = true;
    }

    #setCurrentTime( seconds ){
        config.audio_element.currentTime = seconds;
    }

    #setMuted( volumeLevel ){
        if( volumeLevel == 0 ){
            config.audio_element.muted = true;
        }else{
            config.audio_element.muted = false;
        }
    }

    #setAudioVolume( volumeLevel ){
        config.volume.current = volumeLevel;
        config.audio_element.volume = ( volumeLevel / 100 );
    }
}