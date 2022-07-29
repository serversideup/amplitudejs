import { ConfigState } from "@/services/ConfigState";
import { Time } from "@/services/Time";

export class AudioDurationElement {
    static audioDurationTimeRemainingElementQuery = '.amplitude-time-remaining[data-amplitude-audio-index]:not([data-amplitude-collection-key])';
    static audioDurationTimeElementQuery = '.amplitude-duration-time[data-amplitude-audio-index]:not([data-amplitude-collection-key])';
    static audioDurationHoursElementQuery = '.amplitude-duration-hours[data-amplitude-audio-index]:not([data-amplitude-collection-key])';
    static audioDurationMinutesElementQuery = '.amplitude-duration-minutes[data-amplitude-audio-index]:not([data-amplitude-collection-key])';
    static audioDurationSecondsElementQuery = '.amplitude-duration-seconds[data-amplitude-audio-index]:not([data-amplitude-collection-key])';

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
            let activeAudioIndex = ConfigState.getActiveAudioIndex();
            
            let elements = document.querySelectorAll( AudioDurationElement.audioDurationTimeRemainingElementQuery );
            let formattedTime = timeFormat.replace( 'HH', timeRemaining.hours )
                                        .replace( 'MM', timeRemaining.minutes )
                                        .replace( 'SS', timeRemaining.seconds );
            
            elements.forEach( ( element ) => {
                let elementAudioIndex = element.getAttribute('data-amplitude-audio-index');

                 if( activeAudioIndex == elementAudioIndex ){
                    element.innerHTML = formattedTime;
                }else{
                    element.innerHTML = '00:00';
                }
            });
        }
    }

    #syncTimeElement(){
        let timeFormat = ConfigState.getTimeFormat();
        let activeAudioIndex = ConfigState.getActiveAudioIndex();

        let elements = document.querySelectorAll( AudioDurationElement.audioDurationTimeElementQuery );
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

    #syncHoursElement(){
        let activeAudioIndex = ConfigState.getActiveAudioIndex();
        let elements = document.querySelectorAll( AudioDurationElement.audioDurationHoursElementQuery );

        elements.forEach( ( element ) => {
            if( activeAudioIndex == elementAudioIndex ){
                element.innerHTML = this.#duration.hours
            }else{
                element.innerHTML = '00';
            }
        } );
    }

    #syncMinutesElement(){
        let activeAudioIndex = ConfigState.getActiveAudioIndex();
        let elements = document.querySelectorAll( AudioDurationElement.audioDurationMinutesElementQuery );

        elements.forEach( ( element ) => {
            if( activeAudioIndex == elementAudioIndex ){
                element.innerHTML = this.#duration.minutes
            }else{
                element.innerHTML = '00';
            }
        } );
    }

    #syncSecondsElement(){
        let activeAudioIndex = ConfigState.getActiveAudioIndex();
        let elements = document.querySelectorAll( AudioDurationElement.audioDurationSecondsElementQuery );

        elements.forEach( ( element ) => {
            if( activeAudioIndex == elementAudioIndex ){
                element.innerHTML = this.#duration.seconds
            }else{
                element.innerHTML = '00';
            }
        } );
    }
}