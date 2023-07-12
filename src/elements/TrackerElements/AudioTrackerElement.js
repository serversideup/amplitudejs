import { Audio } from "@/core/Audio";
import { ConfigState } from '@/services/ConfigState';
import { Time } from '@/services/Time';

export class AudioTrackerElement{
    static audioTrackerQuery = 'input[type="range"].amplitude-audio-tracker[data-amplitude-audio-index]:not([data-amplitude-collection-key])';

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
        this.#elements = document.querySelectorAll( AudioTrackerElement.audioTrackerQuery );
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
            let activeAudioIndex = ConfigState.getActiveAudioIndex();
            let elementAudioIndex = element.getAttribute( 'data-amplitude-audio-index' );

            if( activeAudioIndex == elementAudioIndex ){
                let locationPercentage = element.value;
                let trackedLocation = Time.percentageInSeconds( locationPercentage );
                
                let audio = new Audio();
                audio.setCurrentTime( trackedLocation )
            }
        }
    }

    static syncUI( completionPercentage ){
        if( !isNaN( completionPercentage ) ){
            let elements = document.querySelectorAll( AudioTrackerElement.audioTrackerQuery );
            let activeAudioIndex = ConfigState.getActiveAudioIndex();

            elements.forEach( ( element ) => {
                let elementAudioIndex = element.getAttribute('data-amplitude-audio-index');
                
                if( activeAudioIndex == elementAudioIndex ){
                    element.value = completionPercentage;
                }else{
                    element.value = 0;
                }
            });
        }
    }
}