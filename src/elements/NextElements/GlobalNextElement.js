import { ConfigState } from "@/services/ConfigState";
import { Debug } from "@/services/Debug";
import { Navigation as CollectionNavigation } from '@/services/Collections/Navigation.js';

export class GlobalNextElement {
    static globalNextQuery = '.amplitude-next:not([data-amplitude-collection-key])';

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
        this.#elements = document.querySelectorAll( GlobalNextElement.globalNextQuery );
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
            collectionNavigation.next();
        }else{
            Debug.writeMessage("You can only navigate next when you are playing a collection.");
        }
    }
}