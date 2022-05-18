import { config } from "@/config";
import { ConfigState } from "@/services/ConfigState";

export class CollectionAudioContainerElement {
    static collectionAudioContainerElementQuery = '.amplitude-audio-container[data-amplitude-audio-index][data-amplitude-collection-key]';

    #direct;
    #elements;
    #activeIndex;
    #activeCollection;

    constructor( direct ){
        this.#direct = direct;
    }

    setActive(){
        if( ConfigState.getScope() == 'collection' ){
            this.#findElements();
            this.#resetElements();
            this.#getActiveIndex();
            this.#setActiveContainerElements();
        }
    }

    #findElements(){
        this.#elements = document.querySelectorAll( CollectionAudioContainerElement.collectionAudioContainerElementQuery );
    }

    #resetElements(){
        this.#elements.forEach( function( element ){
            element.classList.remove('amplitude-active-audio-container');
        });
    }

    #getActiveIndex(){
        this.#activeCollection = ConfigState.getActiveCollection();

        if( this.#direct ){
            this.#activeIndex = config.collections[ this.#activeCollection ].active_index;
        }else{
            if( ConfigState.isCollectionShuffled( this.#activeCollection ) ){
                this.#activeIndex = config.collections[ this.#activeCollection ].shuffle_list[
                    config.collections[ this.#activeCollection ].active_index
                ].index;
            }else{
                this.#activeIndex = config.collections[ this.#activeCollection ].active_index;
            }
        }
    }

    #setActiveContainerElements(){
        let activeContainerElements = document.querySelectorAll('.amplitude-audio-container[data-amplitude-audio-index="'+this.#activeIndex+'"][data-amplitude-collection-key="'+this.#activeCollection+'"]');
        activeContainerElements.forEach( function( element ){
            element.classList.add("amplitude-active-audio-container");
        });
    }
}