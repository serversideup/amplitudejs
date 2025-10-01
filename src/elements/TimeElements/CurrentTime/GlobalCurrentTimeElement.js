import { ConfigState } from "@/services/ConfigState";

export class GlobalCurrentTimeElement {
    static globalFormattedTimeElementQuery = '.amplitude-current-time:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])';
    static globalHoursTimeElementQuery = '.amplitude-current-hours:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])';
    static globalMinutesTimeElementQuery = '.amplitude-current-minutes:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])';
    static globalSecondsTimeElementQuery = '.amplitude-current-seconds:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])';
    
    #currentTime;

    constructor( currentTime ){
        this.#currentTime = currentTime
    }
    
    sync(){
        this.#syncFormattedTimeElement();
        this.#syncHourTimeElement();
        this.#syncMinuteTimeElement();
        this.#syncSecondTimeElement();
    }

    #syncFormattedTimeElement(){
        let timeFormat = ConfigState.getTimeFormat();

        let elements = document.querySelectorAll( GlobalCurrentTimeElement.globalFormattedTimeElementQuery );
        let formattedTime = timeFormat.replace( 'HH', this.#currentTime.hours )
                                      .replace( 'MM', this.#currentTime.minutes )
                                      .replace( 'SS', this.#currentTime.seconds );

        elements.forEach( ( element ) => {
            element.innerHTML = formattedTime;
        });
    }

    #syncHourTimeElement(){
        let elements = document.querySelectorAll( GlobalCurrentTimeElement.globalHoursTimeElementQuery );

        elements.forEach( ( element ) => {
            element.innerHTML = this.#currentTime.hours;
        });
    }

    #syncMinuteTimeElement(){
        let elements = document.querySelectorAll( GlobalCurrentTimeElement.globalMinutesTimeElementQuery );

        elements.forEach( ( element ) => {
            element.innerHTML = this.#currentTime.minutes;
        });
    }

    #syncSecondTimeElement(){
        let elements = document.querySelectorAll( GlobalCurrentTimeElement.globalSecondsTimeElementQuery );

        elements.forEach( ( element ) => {
            element.innerHTML = this.#currentTime.seconds;
        });
    }
}