import { Audio } from "@/core/Audio";
import { ConfigState } from "@/services/ConfigState";
import { PlayPauseElement } from "@/elements/PlayPauseElement";

export class GlobalPlayElement {
    static globalPlayQuery = '.amplitude-play:not([data-amplitude-audio-index]):not([data-amplitude-collection-index])';

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
        this.#elements = document.querySelectorAll( GlobalPlayElement.globalPlayQuery );
    }

    #bindInteractions(){
        this.#elements.forEach( ( element ) => {
            if( this.#mobile ){
                element.removeEventListener( "touchend", this.#handleInteraction );
                element.addEventListener( "touchend", this.#handleInteraction );
            }else{
                element.removeEventListener( "click", this.#handleInteraction );
                element.addEventListener( "click", this.#handleInteraction );
            }
        });
    }

    #handleInteraction(){
        let audio = new Audio();
        audio.play();

        PlayPauseElement.syncAll();
    }
}