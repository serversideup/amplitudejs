import { ConfigState } from "@/services/ConfigState";

export class AudioCurrentTimeElement {
    static audioFormattedTimeElementQuery = '.amplitude-current-time[data-amplitude-audio-index]:not([data-amplitude-collection-key])';
    static audioHoursTimeElementQuery = '.amplitude-current-hours[data-amplitude-audio-index]:not([data-amplitude-collection-key])';
    static audioMinutesTimeElementQuery = '.amplitude-current-minutes[data-amplitude-audio-index]:not([data-amplitude-collection-key])';
    static audioSecondsTimeElementQuery = '.amplitude-current-seconds[data-amplitude-audio-index]:not([data-amplitude-collection-key])';

    #currentTime;

    constructor( currentTime ){
        this.#currentTime = currentTime;
    }

    sync(){
        this.#syncFormattedTimeElement();
        this.#syncHourTimeElement();
        this.#syncMinuteTimeElement();
        this.#syncSecondTimeElement();
    }

    #syncFormattedTimeElement(){
        let timeFormat = ConfigState.getTimeFormat();
        let activeAudioIndex = ConfigState.getActiveAudioIndex();

        let elements = document.querySelectorAll( AudioCurrentTimeElement.audioFormattedTimeElementQuery );
        let formattedTime = timeFormat.replace( 'HH', this.#currentTime.hours )
                                      .replace( 'MM', this.#currentTime.minutes )
                                      .replace( 'SS', this.#currentTime.seconds );
        
        elements.forEach( ( element ) => {
            let elementAudioIndex = element.getAttribute('data-amplitude-audio-index');

            if( activeAudioIndex == elementAudioIndex ){
                element.innerHTML = formattedTime;
            }else{
                element.innerHTML = '00:00';
            }
        })
    }

    #syncHourTimeElement(){
        let elements = document.querySelectorAll( AudioCurrentTimeElement.audioHoursTimeElementQuery );
        let activeAudioIndex = ConfigState.getActiveAudioIndex();

        elements.forEach( ( element ) => {
            let elementAudioIndex = element.getAttribute('data-amplitude-audio-index');

            if( activeAudioIndex == elementAudioIndex ){
                element.innerHTML = this.#currentTime.hours;
            }else{
                element.innerHTML = '00';
            }
        });
    }

    #syncMinuteTimeElement(){
        let elements = document.querySelectorAll( AudioCurrentTimeElement.audioMinutesTimeElementQuery );
        let activeAudioIndex = ConfigState.getActiveAudioIndex();

        elements.forEach( ( element ) => {
            let elementAudioIndex = element.getAttribute('data-amplitude-audio-index');

            if( activeAudioIndex == elementAudioIndex ){
                element.innerHTML = this.#currentTime.minutes;
            }else{
                element.innerHTML = '00';
            }
        });
    }

    #syncSecondTimeElement(){
        let elements = document.querySelectorAll( AudioCurrentTimeElement.audioSecondsTimeElementQuery );
        let activeAudioIndex = ConfigState.getActiveAudioIndex();

        elements.forEach( ( element ) => {
            let elementAudioIndex = element.getAttribute('data-amplitude-audio-index');

            if( activeAudioIndex == elementAudioIndex ){
                element.innerHTML = this.#currentTime.seconds;
            }else{
                element.innerHTML = '00';
            }
        });
    }
}