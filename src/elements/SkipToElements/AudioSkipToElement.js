import { Audio } from '@/core/Audio.js';
import { config } from '@/config';
import { ConfigState } from "@/services/ConfigState";
import { Debug } from "@/services/Debug";
import { Navigation as AudioNavigation } from '@/services/Audio/Navigation.js';
import { PlayPauseElement } from '@/elements/PlayPauseElement';

export class AudioSkipToElement {
    static audioSkipToElementQuery = ".amplitude-skip-to[data-amplitude-audio-index]:not([data-amplitude-collection-key])";

    #elements;
    #mobile;

    constructor(){
        this.#mobile = ConfigState.isMobile();
    }

    initialize(){
        this.#findElements();
        this.#bindInteractions();
    }

    #findElements(){
        this.#elements = document.querySelectorAll( AudioSkipToElement.audioSkipToElementQuery );
    }

    #bindInteractions(){
        this.#elements.forEach( (element) => {
            if( this.#mobile ){
                element.removeEventListener("touchend", this.#handleInteraction );
                element.addEventListener("touchend", this.#handleInteraction.bind(this, element) );
            }else{
                element.removeEventListener("click", this.#handleInteraction );
                element.addEventListener("click", this.#handleInteraction.bind(this, element) );
            }
        });
    }

    #handleInteraction( element ){
        if( !ConfigState.isTouchMoving() ){
            let audioIndex = element.getAttribute('data-amplitude-audio-index');
            let location = element.getAttribute('data-amplitude-location');

            if( this.#validElement( audioIndex, location ) ){
                this.#handleAudioChange( audioIndex );
                this.#playAudio();
                PlayPauseElement.syncAll();
                this.#skipToLocation( location );
            }
        }
    }

    #validElement( audioIndex, location ){
        if( audioIndex == null ){
            Debug.writeMessage( "You must add a `data-amplitude-audio-index` attribute to your `amplitude-skip-to` element.");
            return false;
        }

        if( location == null ){
            Debug.writeMessage( "You must add a `data-amplitude-location` attribute in seconds to your `amplitude-skip-to` element.");
            return false;
        }

        return true;
    }

    #handleAudioChange( audioIndex ){
        let audioNavigation = new AudioNavigation();
        audioNavigation.changeAudio(
            config.audio[ parseInt( audioIndex ) ], parseInt( audioIndex ), true
        );
    }

    #playAudio(){
        let audio = new Audio();
        audio.play();
    }

    #skipToLocation( location ){
        let audio = new Audio();
        audio.skipToLocation( parseInt( location ) );
    }
}