import { Audio } from "@/core/Audio";
import { ConfigState } from "@/services/ConfigState";
import { config } from "@/config";
import { PlayPauseElement } from "@/elements/PlayPauseElement";

export class GlobalPlayPauseElement{
    static globalPlayPauseQuery = '.amplitude-play-pause:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])';
    
    #elements;
    #mobile;

    constructor(){
        this.#mobile = ConfigState.isMobile();
    }

    initialize(){
        this.#findElements()
        this.#bindInteractions()
    }

    #findElements(){
        this.#elements = document.querySelectorAll( GlobalPlayPauseElement.globalPlayPauseQuery );
    }

    #bindInteractions(){
        this.#elements.forEach( (element) => {
            if( this.#mobile ){
                element.removeEventListener("touchend", this.#handleInteraction );
                element.addEventListener("touchend", this.#handleInteraction );
            }else{
                element.removeEventListener("click", this.#handleInteraction );
                element.addEventListener("click", this.#handleInteraction );
            }
        } );
    }

    #handleInteraction(){
        if( !ConfigState.isTouchMoving() ){
            let audio = new Audio();

            if( config.audio_element.paused ){
                audio.play();
            }else{
                audio.pause();
            }

            PlayPauseElement.syncAll();
        }
    }

    static syncUI(){
        let state = ConfigState.getAudioState();
        let elements = document.querySelectorAll( GlobalPlayPauseElement.globalPlayPauseQuery );

        elements.forEach( ( element ) => {
            if( state == 'playing' ){
                PlayPauseElement.setElementPlay( element );
            }else{
                PlayPauseElement.setElementPause( element );
            }
        })
    }

    static syncToPause(){
        let elements = document.querySelectorAll( GlobalPlayPauseElement.globalPlayPauseQuery );

        elements.forEach( (element) => {
            PlayPauseElement.setElementPause( element );
        });
    }
}