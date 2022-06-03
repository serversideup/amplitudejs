import { Audio } from "@/core/Audio";
import { ConfigState } from '@/services/ConfigState';
import { Time } from '@/services/Time';

export class GlobalTrackerElement{
    static globalTrackerQuery = 'input[type="range"].amplitude-audio-tracker:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])';

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
        this.#elements = document.querySelectorAll( GlobalTrackerElement.globalTrackerQuery );
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
        } );
    }

    #handleInteraction( element ){
        if( !ConfigState.isLive() ){
            let locationPercentage = element.value;
            let trackedLocation = Time.percentageInSeconds( locationPercentage );
            
            let audio = new Audio();
            audio.setCurrentTime( trackedLocation )
        }
    }

    static syncUI( completionPercentage ){
        let elements = document.querySelectorAll( GlobalTrackerElement.globalTrackerQuery );

        elements.forEach( ( element ) => {
            element.value = completionPercentage;
        });
    }
}