import { ConfigState } from "@/services/ConfigState";
import { Navigation as CollectionNavigation } from "@/services/Collections/Navigation.js";
import { config } from "@/config";
import { Debug } from "@/services/Debug";

export class CollectionNextElement {
    static collectionNextQuery = '.amplitude-next[data-amplitude-collection-key]';

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
        this.#elements = document.querySelectorAll( CollectionNextElement.collectionNextQuery );
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
        let collectionKey = this.getAttribute('data-amplitude-collection-key');

        if( collectionKey == config.active_collection ){
            let collectionNavigation = new CollectionNavigation();
            collectionNavigation.next( collectionKey );
        }else{
            Debug.writeMessage("You can not go to the next audio on a playlist that is not being played!");
        }
    }
}