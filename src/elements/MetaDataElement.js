import { config } from "@/config";
import { ConfigState } from "@/services/ConfigState";

export class MetaDataElement {
    static activeAudioMetaDataElementsQuery = '[data-amplitude-audio-info]:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])';
    static activeCollectionMetaDataElementsQuery = '[data-amplitude-collection-info]:not([data-amplitude-collection-key])';
    static activeCollectionAudioMetaDataElementsQuery = '[data-amplitude-audio-info][data-amplitude-collection-key]:not([data-amplitude-audio-index])';

    static audioMetaDataElementsQuery = '[data-amplitude-audio-info][data-amplitude-audio-index]:not([data-amplitude-collection-key])';
    static collectionAudioMetaDataElementsQuery = '[data-amplitude-audio-info][data-amplitude-audio-index][data-amplitude-collection-key]';
    static collectionInfoElementsQuery = '[data-amplitude-collection-info][data-amplitude-collection-key]';

    #imageMetaDataKeys = [
        "cover_art_url",
        "station_art_url",
        "podcast_episode_cover_art_url",
        "album_art_url",
        "collection_art_url"
    ]

    /**
     * Gets called after audio has been changed. Updates all of the global
     * elements and collection elements, not the individual audio elements.
     * Individual audio elements should only be dynamically set once and not again
     * since they never change.
     * 
     * Examples:
     * Update - Global cover art for a song.
     * Update - Playlist now playing cover art.
     * Update - Podcast now playing cover art.
     * Do Not Update - Individual audio element. These will be set with syncMetaData()
     * and won't need to be updated again.
     */
    updateActiveMetaData(){
        this.#syncActiveAudioMetaElements();
        this.#syncActiveCollectionMetaElements();
        this.#syncActiveCollectionAudioMetaElements();
    }

    #syncActiveAudioMetaElements(){
        let activeAudioInfoElements = document.querySelectorAll( MetaDataElement.activeAudioMetaDataElementsQuery );

        activeAudioInfoElements.forEach( ( element ) => {
            let key = element.getAttribute('data-amplitude-audio-info');
            let value = ( config.active_metadata[ key ] != undefined ) ? config.active_metadata[ key ] : null;

            this.#setMetaValue( key, value, element );
        });
    }

    #syncActiveCollectionMetaElements(){
        let activeCollectionInfoElements = document.querySelectorAll( MetaDataElement.activeCollectionMetaDataElementsQuery );

        activeCollectionInfoElements.forEach( ( element ) => {
            if( ConfigState.getScope() == 'collection' ){
                let collectionKey = ConfigState.getActiveCollection();
                let collectionIndex = ConfigState.getCollectionIntegerIndex( collectionKey );

                let collectionInfoKey = element.getAttribute('data-amplitude-collection-info');
                
                let value = ( config.collections[ collectionIndex ] != undefined ) ? config.collections[ collectionIndex ][ collectionInfoKey ] : null;

                this.#setMetaValue( collectionInfoKey, value, element, true );
            }
        });
    }

    #syncActiveCollectionAudioMetaElements(){
        let activeCollectionAudioElements = document.querySelectorAll( MetaDataElement.activeCollectionAudioMetaDataElementsQuery );

        activeCollectionAudioElements.forEach( ( element ) => {
            let collectionKey = element.getAttribute('data-amplitude-collection-key');
            let collectionIndex = ConfigState.getCollectionIntegerIndex( collectionKey );

            if( config.active_collection == collectionKey ){
                let key = element.getAttribute('data-amplitude-audio-info');
                let value = ( config.active_metadata[ key ] != undefined ) ? config.active_metadata[ key ] : null;

                this.#setMetaValue( key, value, element );
            }
        });
    }
    
    #displayAudioMetaElements(){
        let audioInfoElements = document.querySelectorAll( MetaDataElement.audioMetaDataElementsQuery );

        audioInfoElements.forEach( ( element ) => {
            let key = element.getAttribute('data-amplitude-audio-info');
            let audioIndex = element.getAttribute('data-amplitude-audio-index');
            let value = config.audio[ audioIndex ][ key ] != undefined ? config.audio[ audioIndex ][ key ] : null;

            this.#setMetaValue( key, value, element );
        });
    }

    #displayCollectionAudioMetaElements(){
        let collectionAudioInfoElements = document.querySelectorAll( MetaDataElement.collectionAudioMetaDataElementsQuery );

        collectionAudioInfoElements.forEach( ( element ) => {
            let key = element.getAttribute('data-amplitude-audio-info');
            let audioIndex = element.getAttribute('data-amplitude-audio-index');
            let collectionKey = element.getAttribute('data-amplitude-collection-key');
            let collectionIndex = ConfigState.getCollectionIntegerIndex( collectionKey );

            let value = config.collections[ collectionIndex ].audio[ audioIndex ][ key ] != undefined
                            ? config.collections[ collectionIndex ].audio[ audioIndex ][ key ]
                            : null;

            this.#setMetaValue( key, value, element );
        });
    }

    #displayCollectionMetaElements(){
        let collectionInfoElements = document.querySelectorAll( MetaDataElement.collectionInfoElementsQuery );

        collectionInfoElements.forEach( ( element ) => {
            let key = element.getAttribute('data-amplitude-collection-info');
            let collectionKey = element.getAttribute('data-amplitude-collection-key');
            let collectionIndex = ConfigState.getCollectionIntegerIndex( collectionKey );

            let value = config.collections[ collectionIndex ][ key ] != undefined
                            ? config.collections[ collectionIndex ][ key ]
                            : null;

            this.#setMetaValue( key, value, element, true );
        });
    }

    #setMetaValue( key, value, element, collection = false ){
        if( this.#imageMetaDataKeys.indexOf( key ) >= 0 ){
            value = value || ( collection ? config.art.default_collection_art : config.art.default_audio_art );
            element.setAttribute('src', value);
        }else{
            value = value || "";
            element.innerHTML = value;
        }
    }

    syncMetaData(){
        this.#displayAudioMetaElements();
        this.#displayCollectionAudioMetaElements();
        this.#displayCollectionMetaElements();
    }

    syncInitialCollectionAudioData(){
        config.collections.forEach( ( collection, collectionIndex ) => {
            this.#setInitialAudioElementsForCollection( collection.key, collectionIndex );
        } );
    }

    #setInitialAudioElementsForCollection( collectionKey, collectionIndex ){
        let activeAudioCollectionElements = document.querySelectorAll(
            '[data-amplitude-audio-info][data-amplitude-collection-key="'+collectionKey+'"]'
        );

        activeAudioCollectionElements.forEach( ( element ) => {
            let key = element.getAttribute('data-amplitude-audio-info');
            let value = config.collections[ collectionIndex ].audio[0][ key ] != undefined
                            ? config.collections[ collectionIndex ].audio[0][ key ]
                            : null;

            this.#setMetaValue( key, value, element );
        } );
    }
}