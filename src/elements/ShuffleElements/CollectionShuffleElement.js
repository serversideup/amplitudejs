import { ConfigState } from "@/services/ConfigState";
import { Shuffle } from "@/services/Collections/Shuffle";

export class CollectionShuffleElement {
    static collectionShuffleQuery = '.amplitude-shuffle[data-amplitude-collection-key]';

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
        this.#elements = document.querySelectorAll( CollectionShuffleElement.collectionShuffleQuery );
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
        let collectionKey = this.attribute('data-amplitude-collection-key');

        let shuffle = new Shuffle( collectionKey );
        shuffle.toggleShuffle();

        CollectionShuffleElement.syncUI( collectionKey )
    }

    static syncUI( collection ){
        let elements = document.querySelectorAll( '.amplitude-shuffle[data-amplitude-collection="'+collection+'"]');
        
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