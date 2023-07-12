import { ConfigState } from "@/services/ConfigState";
import { Debug } from "@/services/Debug";
import { config } from "@/config";
import { Navigation as CollectionNavigation } from "@/services/Collections/Navigation.js"

export class CollectionPreviousElement {
    static collectionPreviousQuery = '.amplitude-previous[data-amplitude-collection-key]';

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
        this.#elements = document.querySelectorAll( CollectionPreviousElement.collectionPreviousQuery );
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
            let collectionKey = this.getAttribute('data-amplitude-collection-key');

            if( collectionKey == config.active_collection ){
                let collectionNavigation = new CollectionNavigation();
                collectionNavigation.previous();
            }else{
                Debug.writeMessage("You can not go to the previous audio on a playlist that is not being played!");
            }
        }
    }
}