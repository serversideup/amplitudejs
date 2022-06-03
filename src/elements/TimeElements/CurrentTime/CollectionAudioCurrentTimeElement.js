import { ConfigState } from "@/services/ConfigState";

export class CollectionAudioCurrentTimeElement {
    static collectionAudioFormattedTimeElementQuery = '.amplitude-current-time[data-amplitude-collection-key][data-amplitude-audio-index]';
    static collectionAudioHoursTimeElementQuery = '.amplitude-current-hours[data-amplitude-collection-key][data-amplitude-audio-index]';
    static collectionAudioMinutesTimeElementQuery = '.amplitude-current-minutes[data-amplitude-collection-key][data-amplitude-audio-index]';
    static collectionAudioSecondsTimeElementQuery = '.amplitude-current-seconds[data-amplitude-collection-key][data-amplitude-audio-index]';

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
        let activeCollectionKey = ConfigState.getActiveCollection();
        let activeAudioIndex = ConfigState.getActiveAudioIndex();

        let elements = document.querySelectorAll( CollectionAudioCurrentTimeElement.collectionAudioFormattedTimeElementQuery );
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
        })
    }

    #syncHourTimeElement(){
        let elements = document.querySelectorAll( CollectionAudioCurrentTimeElement.collectionAudioHoursTimeElementQuery );
        let activeCollectionKey = ConfigState.getActiveCollection();
        let activeAudioIndex = ConfigState.getActiveAudioIndex();

        elements.forEach( ( element ) => {
            let elementCollectionKey = element.getAttribute('data-amplitude-collection-key');
            let elementAudioIndex = element.getAttribute('data-amplitude-audio-index');

            if( ( activeCollectionKey == elementCollectionKey ) && ( activeAudioIndex == elementAudioIndex ) ){
                element.innerHTML = this.#currentTime.hours;
            }else{
                element.innerHTML = '00';
            }
        });
    }

    #syncMinuteTimeElement(){
        let elements = document.querySelectorAll( CollectionAudioCurrentTimeElement.collectionAudioMinutesTimeElementQuery );
        let activeCollectionKey = ConfigState.getActiveCollection();
        let activeAudioIndex = ConfigState.getActiveAudioIndex();

        elements.forEach( ( element ) => {
            let elementCollectionKey = element.getAttribute('data-amplitude-collection-key');
            let elementAudioIndex = element.getAttribute('data-amplitude-audio-index');

            if( ( activeCollectionKey == elementCollectionKey ) && ( activeAudioIndex == elementAudioIndex ) ){
                element.innerHTML = this.#currentTime.minutes;
            }else{
                element.innerHTML = '00';
            }
        });
    }

    #syncSecondTimeElement(){
        let elements = document.querySelectorAll( CollectionAudioCurrentTimeElement.collectionAudioSecondsTimeElementQuery );
        let activeCollectionKey = ConfigState.getActiveCollection();
        let activeAudioIndex = ConfigState.getActiveAudioIndex();

        elements.forEach( ( element ) => {
            let elementCollectionKey = element.getAttribute('data-amplitude-collection-key');
            let elementAudioIndex = element.getAttribute('data-amplitude-audio-index');

            if( ( activeCollectionKey == elementCollectionKey ) && ( activeAudioIndex == elementAudioIndex ) ){
                element.innerHTML = this.#currentTime.seconds;
            }else{
                element.innerHTML = '00';
            }
        });
    }
}