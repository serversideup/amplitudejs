import { Audio } from "@/core/Audio";
import { config } from '@/config.js';
import { ConfigState } from "@/services/ConfigState";
import { PlayPauseElement } from "@/elements/PlayPauseElement";

export class CollectionPauseElement{
    static collectionPauseQuery = '.amplitude-pause[data-amplitude-collection-key]:not([data-amplitude-audio-index])';

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
        this.#elements = document.querySelectorAll( CollectionPauseElement.collectionPauseQuery );
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
        });
    }

    #handleInteraction(){
        if( !ConfigState.isTouchMoving() ){
            let collectionKey = this.getAttribute('data-amplitude-collection-key');

            // Ensure we pause the audio if the active collection is
            // what is controlled by this pause element.
            if( config.active_collection == collectionKey ){
                let audio = new Audio();
                audio.pause();

                PlayPauseElement.syncAll();
            }
        }
    }
}