import { ConfigState } from "@/services/ConfigState";
import { Time } from "@/services/Time";

export class CollectionAudioDurationElement {
    static collectionAudioDurationTimeRemainingElementQuery = '.amplitude-time-remaining[data-amplitude-audio-index][data-amplitude-collection-key]';
    static collectionAudioDurationTimeElementQuery = '.amplitude-duration-time[data-amplitude-audio-index][data-amplitude-collection-key]';
    static collectionAudioDurationHoursElementQuery = '.amplitude-duration-hours[data-amplitude-audio-index][data-amplitude-collection-key]';
    static collectionAudioDurationMinutesElementQuery = '.amplitude-duration-minutes[data-amplitude-audio-index][data-amplitude-collection-key]';
    static collectionAudioDurationSecondsElementQuery = '.amplitude-duration-seconds[data-amplitude-audio-index][data-amplitude-collection-key]';

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
            let activeAudioIndex = ConfigState.getActiveAudioIndex();

            let elements = document.querySelectorAll( CollectionAudioDurationElement.collectionAudioDurationTimeRemainingElementQuery );
            let formattedTime = timeFormat.replace( 'HH', timeRemaining.hours )
                                        .replace( 'MM', timeRemaining.minutes )
                                        .replace( 'SS', timeRemaining.seconds );
            
            elements.forEach( ( element ) => {
                let elementCollectionKey = element.getAttribute('data-amplitude-collection-key');
                let elementAudioIndex = element.getAttribute('data-amplitude-audio-index');

                if( ( activeCollectionKey == elementCollectionKey ) && ( activeAudioIndex == elementAudioIndex ) ){
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
        let activeAudioIndex = ConfigState.getActiveAudioIndex();

        let elements = document.querySelectorAll( CollectionAudioDurationElement.collectionAudioDurationTimeElementQuery );
        let formattedTime = timeFormat.replace( 'HH', this.#currentTime.hours )
                                      .replace( 'MM', this.#currentTime.minutes )
                                      .replace( 'SS', this.#currentTime.seconds );

        elements.forEach( ( element ) => {
            let elementCollectionKey = element.getAttribute('data-amplitude-collection-key');
            let elementAudioIndex = element.getAttribute('data-amplitude-audio-index');

            if( ( activeCollectionKey == elementCollectionKey ) && ( activeAudioIndex == elementAudioIndex ) ){
                element.innerHTML = formattedTime;
            }else{
                element.innerHTML = '00:00';
            }
        });
    }

    #syncHoursElement(){
        let activeCollectionKey = ConfigState.getActiveCollection();
        let activeAudioIndex = ConfigState.getActiveAudioIndex();
        let elements = document.querySelectorAll( CollectionAudioDurationElement.collectionAudioDurationHoursElementQuery );

        elements.forEach( ( element ) => {
            if( ( activeCollectionKey == elementCollectionKey ) && ( activeAudioIndex == elementAudioIndex ) ){
                element.innerHTML = this.#duration.hours
            }else{
                element.innerHTML = '00';
            }
        } );
    }

    #syncMinutesElement(){
        let activeCollectionKey = ConfigState.getActiveCollection();
        let activeAudioIndex = ConfigState.getActiveAudioIndex();
        let elements = document.querySelectorAll( CollectionAudioDurationElement.collectionAudioDurationMinutesElementQuery );

        elements.forEach( ( element ) => {
            if( ( activeCollectionKey == elementCollectionKey ) && ( activeAudioIndex == elementAudioIndex ) ){
                element.innerHTML = this.#duration.minutes
            }else{
                element.innerHTML = '00';
            }
        } );
    }

    #syncSecondsElement(){
        let activeCollectionKey = ConfigState.getActiveCollection();
        let activeAudioIndex = ConfigState.getActiveAudioIndex();
        let elements = document.querySelectorAll( CollectionAudioDurationElement.collectionAudioDurationSecondsElementQuery );

        elements.forEach( ( element ) => {
            if( ( activeCollectionKey == elementCollectionKey ) && ( activeAudioIndex == elementAudioIndex ) ){
                element.innerHTML = this.#duration.seconds
            }else{
                element.innerHTML = '00';
            }
        } );
    }
}