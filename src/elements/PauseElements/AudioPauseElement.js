import { Audio } from "@/core/Audio";
import { ConfigState } from "@/services/ConfigState";
import { PlayPauseElement } from "@/elements/PlayPauseElement";
import { config } from "../../config";

export class AudioPauseElement{
    static audioPauseQuery = ".amplitude-pause[data-amplitude-audio-index]:not([data-amplitude-collection-key])";

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
        this.#elements = document.querySelectorAll( AudioPauseElement.audioPauseQuery );
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
            let audioIndex = this.attribute('data-amplitude-audio-index');

            // If the scope is audio and the index of the element matches the active audio
            // index, then we pause the player.
            if( ConfigState.getScope() == 'audio' && ( config.active_index == audioIndex ) ){
                let audio = new Audio();
                audio.pause();

                PlayPauseElement.syncAll();
            }
        }
    }
}