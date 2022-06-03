import { Audio } from "@/core/Audio";
import { ConfigState } from '@/services/ConfigState';
import { Time } from '@/services/Time';

export class CollectionTrackerElement{
    static collectionTrackerQuery = 'input[type="range"].amplitude-audio-tracker[data-amplitude-collection-key]:not([data-amplitude-audio-index])';

    #elements;
    #isIE;

    constructor(){
        this.#isIE = ConfigState.isIE();
    }

    initialize(){
        this.#findElements();
        this.#bindInteractions();
    }

    #findElements(){
        this.#elements = document.querySelectorAll( CollectionTrackerElement.collectionTrackerQuery );
    }

    #bindInteractions(){
        this.#elements.forEach( (element) => {
            if( this.#isIE ){
                element.removeEventListener("change", this.#handleInteraction );
                element.addEventListener("change", this.#handleInteraction.bind( this, element ) );
            }else{
                element.removeEventListener("input", this.#handleInteraction);
                element.addEventListener("input", this.#handleInteraction.bind( this, element ) );
            }
        });
    }

    #handleInteraction( element ){
        if( !ConfigState.isLive() ){
            let activeCollectionKey = ConfigState.getActiveCollection();
            let elementCollectionKey = element.getAttribute( 'data-amplitude-collection-key' );

            if( activeCollectionKey == elementCollectionKey ){
                let locationPercentage = element.value;
                let trackedLocation = Time.percentageInSeconds( locationPercentage );
                
                let audio = new Audio();
                audio.setCurrentTime( trackedLocation )
            }
        }
    }

    static syncUI( completionPercentage ){
        let elements = document.querySelectorAll( CollectionTrackerElement.collectionTrackerQuery );
        let activeCollectionKey = ConfigState.getActiveCollection();

        elements.forEach( ( element ) => {
            let elementCollectionKey = element.getAttribute('data-amplitude-collection-key');
            
            if( activeCollectionKey == elementCollectionKey ){
                element.value = completionPercentage;
            }else{
                element.value = 0;
            }
        });
    }
}