import { ConfigState } from "@/services/ConfigState";
import { Time } from "@/services/Time";

export class GlobalDurationElement {
    static globalDurationTimeRemainingElementQuery = '.amplitude-time-remaining:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])';
    static globalDurationTimeElementQuery = '.amplitude-duration-time:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])';
    static globalDurationHoursElementQuery = '.amplitude-duration-hours:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])';
    static globalDurationMinutesElementQuery = '.amplitude-duration-minutes:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])';
    static globalDurationSecondsElementQuery = '.amplitude-duration-seconds:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])';
    
    #currentTime;
    #duration;

    constructor( currentTime, duration ){
        this.#currentTime = currentTime;
        this.#duration = duration;
    }

    sync(){
        this.#syncTimeRemainingElement();
        this.#syncTimeElement();
        this.#syncHoursElement();
        this.#syncMinutesElement();
        this.#syncSecondsElement();
    }

    #syncTimeRemainingElement(){
        let timeRemaining = Time.computeTimeRemaining( this.#currentTime, this.#duration );

        if( timeRemaining != null ){
            let timeFormat = ConfigState.getTimeFormat();

            let elements = document.querySelectorAll( GlobalDurationElement.globalDurationTimeRemainingElementQuery );
            let formattedTime = timeFormat.replace( 'HH', timeRemaining.hours )
                                        .replace( 'MM', timeRemaining.minutes )
                                        .replace( 'SS', timeRemaining.seconds );
            
            elements.forEach( ( element ) => {
                element.innerHTML = formattedTime;
            });
        }
    }

    #syncTimeElement(){
        let timeFormat = ConfigState.getTimeFormat();

        let elements = document.querySelectorAll( GlobalDurationElement.globalDurationTimeElementQuery );
        let formattedTime = timeFormat.replace( 'HH', this.#duration.hours )
                                      .replace( 'MM', this.#duration.minutes )
                                      .replace( 'SS', this.#duration.seconds );

        elements.forEach( ( element ) => {
            if( !formattedTime.includes('NaN') ){
                element.innerHTML = formattedTime;
            }
        })
    }

    #syncHoursElement(){
        let elements = document.querySelectorAll( GlobalDurationElement.globalDurationHoursElementQuery );

        elements.forEach( ( element ) => {
            element.innerHTML = this.#duration.hours;
        } );
    }

    #syncMinutesElement(){
        let elements = document.querySelectorAll( GlobalDurationElement.globalDurationMinutesElementQuery );

        elements.forEach( ( element ) => {
            element.innerHTML = this.#duration.minutes;
        } );
    }

    #syncSecondsElement(){
        let elements = document.querySelectorAll( GlobalDurationElement.globalDurationSecondsElementQuery );

        elements.forEach( ( element ) => {
            element.innerHTML = this.#duration.seconds;
        } );
    }
}