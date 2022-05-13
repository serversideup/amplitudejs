import { Audio } from "@/core/Audio";
import { PlayPauseElement } from "@/services/PlayPauseElement";
import { ConfigState } from "@/services/ConfigState";


export class StopElement {
    static stopElementQuery = '.amplitude-stop';

    #elements;
    #mobile;

    constructor(){
        this.#mobile = ConfigState.isMobile();
    }

    setup(){
        this.#findElements();
        this.#bindInteractions();
    }

    #findElements(){
        this.#elements = document.querySelectorAll( StopElement.stopElementQuery );
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
        if( !ConfigState.isTouchMoving() ){
            let audio = new Audio();
            audio.stop();

            PlayPauseElement.syncAll();
        }
    }
}