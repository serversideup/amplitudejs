import { Audio } from "@/core/Audio";
import { ConfigState } from "@/services/ConfigState";
import { PlayPauseElement } from "@/elements/PlayPauseElement";
import { config } from "@/config";

export class CollectionAudioPauseElement{
    static collectionAudioPauseQuery = '.amplitude-pause[data-amplitude-collection-key][data-amplitude-audio-index]';

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
        this.#elements = document.querySelectorAll( CollectionAudioPauseElement.collectionAudioPauseQuery );
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

    #handleInteraction(){
        if( !ConfigState.isTouchMoving() ){
            let collectionKey = element.getAttribute('data-amplitude-collection-key');
            let audioIndex = element.getAttribute('data-amplitude-audio-index');

            if( config.active_collection == collectionKey &&
                config.collections[ collectionKey ].active_index == audioIndex ){
                    let audio = new Audio();
                    audio.pause();

                    PlayPauseElement.syncAll();
            }
        }
    }
}