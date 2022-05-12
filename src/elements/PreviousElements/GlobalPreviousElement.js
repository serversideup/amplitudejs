import { ConfigState } from "@/services/ConfigState";
import { Debug } from "@utilities/debug";
import { Navigation as CollectionNavigation } from "@/services/Collections/Navigation.js"

export class GlobalPreviousElement {
    static globalPreviousQuery = '.amplitude-previous:not([data-amplitude-collection-key])';

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
        this.#elements = document.querySelectorAll( GlobalPreviousElement.globalPreviousQuery );
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
        if( ConfigState.getScope() == 'collection' ){
            let collectionNavigation = new CollectionNavigation();
            collectionNavigation.previous();
        }else{
            Debug.writeMessage("You can only navigate previous when you are playing a collection.");
        }
    }
}