import { ConfigState } from "@/services/ConfigState";
import { Time } from "@/services/Time";

export class CollectionDurationElement {
    static collectionDurationTimeRemainingElementQuery = '.amplitude-time-remaining[data-amplitude-collection-key]:not([data-amplitude-audio-index])';
    static collectionDurationTimeElementQuery = '.amplitude-duration-time[data-amplitude-collection-key]:not([data-amplitude-audio-index])';
    static collectionDurationHoursElementQuery = '.amplitude-duration-hours[data-amplitude-collection-key]:not([data-amplitude-audio-index])';
    static collectionDurationMinutesElementQuery = '.amplitude-duration-minutes[data-amplitude-collection-key]:not([data-amplitude-audio-index])';
    static collectionDurationSecondsElementQuery = '.amplitude-duration-seconds[data-amplitude-collection-key]:not([data-amplitude-audio-index])';

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
            let activeCollectionKey = ConfigState.getActiveCollection();
            
            let elements = document.querySelectorAll( CollectionDurationElement.collectionDurationTimeRemainingElementQuery );
            let formattedTime = timeFormat.replace( 'HH', timeRemaining.hours )
                                        .replace( 'MM', timeRemaining.minutes )
                                        .replace( 'SS', timeRemaining.seconds );
            
            elements.forEach( ( element ) => {
                let elementCollectionKey = element.getAttribute('data-amplitude-collection-key');

                 if( activeCollectionKey == elementCollectionKey ){
                    element.innerHTML = formattedTime;
                }else{
                    element.innerHTML = '00:00';
                }
            });
        }
    }

    #syncTimeElement(){
        let timeFormat = ConfigState.getTimeFormat();
        let activeCollectionKey = ConfigState.getActiveCollection();

        let elements = document.querySelectorAll( CollectionDurationElement.collectionDurationTimeElementQuery );
        let formattedTime = timeFormat.replace( 'HH', this.#currentTime.hours )
                                      .replace( 'MM', this.#currentTime.minutes )
                                      .replace( 'SS', this.#currentTime.seconds );

        elements.forEach( ( element ) => {
            let elementCollectionKey = element.getAttribute('data-amplitude-collection-key');

            if( activeCollectionKey == elementCollectionKey ){
                element.innerHTML = formattedTime;
            }else{
                element.innerHTML = '00:00';
            }
        });
    }

    #syncHoursElement(){
        let activeCollectionKey = ConfigState.getActiveCollection();
        let elements = document.querySelectorAll( CollectionDurationElement.collectionDurationHoursElementQuery );

        elements.forEach( ( element ) => {
            if( activeCollectionKey == elementCollectionKey ){
                element.innerHTML = this.#duration.hours
            }else{
                element.innerHTML = '00';
            }
        } );
    }

    #syncMinutesElement(){
        let activeCollectionKey = ConfigState.getActiveCollection();
        let elements = document.querySelectorAll( CollectionDurationElement.collectionDurationMinutesElementQuery );

        elements.forEach( ( element ) => {
            if( activeCollectionKey == elementCollectionKey ){
                element.innerHTML = this.#duration.minutes
            }else{
                element.innerHTML = '00';
            }
        } );
    }
    
    #syncSecondsElement(){
        let activeCollectionKey = ConfigState.getActiveCollection();
        let elements = document.querySelectorAll( CollectionDurationElement.collectionDurationSecondsElementQuery );

        elements.forEach( ( element ) => {
            if( activeCollectionKey == elementCollectionKey ){
                element.innerHTML = this.#duration.seconds
            }else{
                element.innerHTML = '00';
            }
        } );
    }
}