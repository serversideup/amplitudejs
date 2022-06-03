import { Audio } from "@/core/Audio";
import { ConfigState } from '@/services/ConfigState';
import { Time } from '@/services/Time';

export class CollectionAudioTrackerElement{
    static collectionAudioTrackerQuery = 'input[type="range"].amplitude-audio-tracker[data-amplitude-collection-key][data-amplitude-audio-index]';

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
        this.#elements = document.querySelectorAll( CollectionAudioTrackerElement.collectionAudioTrackerQuery );
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

            let activeAudioIndex = ConfigState.getActiveAudioIndex();
            let elementAudioIndex = element.getAttribute( 'data-amplitude-audio-index' );

            if( ( activeCollectionKey == elementCollectionKey ) && ( activeAudioIndex == elementAudioIndex ) ){
                let locationPercentage = element.value;
                let trackedLocation = Time.percentageInSeconds( locationPercentage );
                
                let audio = new Audio();
                audio.setCurrentTime( trackedLocation )
            }
        }
    }

    static syncUI( completionPercentage ){
        let elements = document.querySelectorAll( CollectionAudioTrackerElement.collectionAudioTrackerQuery );
        let activeCollectionKey = ConfigState.getActiveCollection();
        let activeAudioIndex = ConfigState.getActiveAudioIndex();

        elements.forEach( ( element ) => {
            let elementCollectionKey = element.getAttribute('data-amplitude-collection-key');
            let elementAudioIndex = element.getAttribute('data-amplitude-audio-index');
            
            if( ( activeCollectionKey == elementCollectionKey ) && ( activeAudioIndex == elementAudioIndex ) ){
                element.value = completionPercentage;
            }else{
                element.value = 0;
            }
        });
    }
}