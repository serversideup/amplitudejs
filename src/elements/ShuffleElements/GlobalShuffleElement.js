import { ConfigState } from "@/services/ConfigState";
import { Shuffle } from "@/services/Collections/Shuffle";
import { Debug } from "@/services/Debug";
import { CollectionShuffleElement } from "./CollectionShuffleElement";

export class GlobalShuffleElement {
    static globalShuffleQuery = '.amplitude-shuffle:not([data-amplitude-collection-key])';

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
        this.#elements = document.querySelectorAll( GlobalShuffleElement.globalShuffleQuery );
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
            let collection = ConfigState.getActiveCollection();

            let shuffle = new Shuffle( collectionKey );
            shuffle.toggleShuffle();

            GlobalShuffleElement.syncUI();
            CollectionShuffleElement.syncUI( collection );
        }else{
            Debug.writeMessage("You can only shuffle a collection if you are playing a collection.");
        }
    }

    static syncUI(){
        let elements = document.querySelectorAll( GlobalShuffleElement.globalShuffleQuery );
        let collection = ConfigState.getActiveCollection();

        elements.forEach( ( element ) => {
            if( ConfigState.isCollectionShuffled( collection ) ){
                element.classList.add( "amplitude-shuffle-on" );
                element.classList.remove( "amplitude-shuffle-off" );
            }else{
                element.classList.add( "amplitude-shuffle-off" );
                element.classList.remove( "amplitude-shuffle-on" );
            }
        });
    }
}