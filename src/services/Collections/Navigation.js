import { Audio } from "@/core/Audio";
import { config } from "@/config";
import { Callbacks } from "@/services/Callbacks";
import { PlayPauseElement } from "@/elements/PlayPauseElement";
import { MetaDataElement } from "@/elements/MetaDataElement";

export class Navigation {
    /**
     * Sets the next song in a collection.
     * 
     * @param {string} collectionKey - The collection to navigate. Defaults to the active collection.
     * @param {boolean} audioEnded - If the audio ended, this is true to take in effect the repeat setting.
     */
    next( collectionKey = null, audioEnded = false ){
        if( !collectionKey ){
            collectionKey = config.active_collection;
        }

        let nextAudio = this.#findNextAudio( collectionKey );
        
        this.setActiveCollection( collectionKey );
        this.changeCollectionAudio( collectionKey, nextAudio.audio, nextAudio.index );
        this.#playNextAudio( nextAudio.end, audioEnded )
        
        PlayPauseElement.syncAll();
        Callbacks.run("next");

        if( config.repeat_audio ){
            Callbacks.run("audio_repeated");
        }
    }

    #findNextAudio( collectionKey ){
        if( config.repeat_audio ){
            return this.#repeatedAudio( collectionKey );
        }else{
            if( config.collections[ collectionKey ].shuffle ){
                return this.#nextShuffledAudio( collectionKey );
            }else{
                return this.#nextCollectionAudio( collectionKey );
            }
        }
    }

    #repeatedAudio( collectionKey ){
        let index =  config.collections[ collectionKey ].active_index;

        return {
            'index': nextIndex,
            'audio': config.collections[ collectionKey ].shuffle ?
                     config.collections[ collectionKey ].shuffle_list[ index ] :
                     config.collections[ collectionKey ].audio[ index ],
            'end': false
        }
    }

    #nextShuffledAudio( collectionKey ){
        let nextIndex = null;
        let endOfList = false;

        let activeIndex = config.collections[ collectionKey ].active_index;
        let shuffleCollectionLength = config.collections[ collectionKey ].shuffle_list.length;
       
        if( parseInt( activeIndex + 1 ) < shuffleCollectionLength ){
            nextIndex = parseInt( activeIndex + 1 );    
        }else{
            nextIndex = 0;
            endOfList = true;
        }

        return {
            'index': nextIndex,
            'audio': config.collections[ collectionKey ].shuffleList[ nextIndex ],
            'end': endOfList
        }
    }

    #nextCollectionAudio( collectionKey ){
        let nextIndex = null;
        let endOfList = false;
        
        let activeIndex = config.collections[ collectionKey ].active_index;
        let collectionLength = config.collections[ collectionKey ].audio.length;

        if( parseInt( activeIndex + 1 ) < collectionLength ){
            nextIndex = parseInt( activeIndex + 1 );
        }else{
            nextIndex = 0;
            endOfList = true;
        }

        return {
            'index': nextIndex,
            'audio': config.collections[ collectionKey ].audio[ nextIndex ],
            'end': endOfList
        }
    }

    #playNextAudio( endOfList, audioEnded ){
        // If it's the end of the collection and we aren't repeating, do nothing.
        if( endOfList && !config.repeat_audio ){
        }else{
            if( !( audioEnded && !config.repeat_audio && endOfList ) ){
                let audio = new Audio();
                audio.play();
            }
        }
    }

    previous( collectionKey = null ){
        if( !collectionKey ){
            collectionKey = config.active_collection;
        }

        let previousAudio = this.#findPreviousAudio( collectionKey );
        
        this.setActiveCollection( collectionKey );
        this.changeCollectionAudio( collectionKey, previousAudio.audio, previousAudio.index );
        
        let audio = new Audio();
        audio.play();
        
        PlayPauseElement.syncAll();
        Callbacks.run("previous");

        if( config.repeat_audio ){
            Callbacks.run("audio_repeated");
        }
    }

    #findPreviousAudio(){
        if( config.repeat_audio ){
            return this.#repeatedAudio( collectionKey );
        }else{
            if( config.collections[ collectionKey ].shuffle ){
                return this.#previousShuffledAudio( collectionKey );
            }else{
                return this.#previousCollectionAudio( collectionKey );
            }
        }
    }

    #previousShuffledAudio( collectionKey ){
        let previousIndex = null;

        let activeIndex = config.collections[ collectionKey ].active_index;
        let shuffleCollectionLength = config.collections[ collectionKey ].shuffle_list.length;
        
        if( parseInt( activeIndex - 1 ) >= 0 ){
            previousIndex =  parseInt( activeIndex - 1 );
        }else{
            previousIndex = parseInt( shuffleCollectionLength - 1 );
        }

        return {
            'index': previousIndex,
            'audio': config.collections[ collectionKey ].shuffleList[ previousIndex ]
        }
    }

    #previousCollectionAudio( collectionKey ){
        let previousIndex = null;

        let activeIndex = config.collections[ collectionKey ].active_index;
        let collectionLength = config.collections[ collectionKey ].audio.length;
        
        if( parseInt( activeIndex - 1 ) >= 0 ){
            previousIndex =  parseInt( activeIndex - 1 );
        }else{
            previousIndex = parseInt( collectionLength - 1 );
        }

        return {
            'index': previousIndex,
            'audio': config.collections[ collectionKey ].audio[ previousIndex ]
        }
    }

    setActiveCollection( collection ){
        if( config.active_collection != collection ){
            Callbacks.run("collection_changed");

            config.active_collection = collection;

            if( collection != null ){
                config.collections[ collection ].active_index = 0;
            }
        }
    }

    /**
     * Handles audio change in a collection
     *
     * @prop {string} collection - The collection we are changing the song on.
     * @prop {object} audio - The audio object we are changing to in the collection.
     * @prop {number} index - The index of the song we are changing to in the collection.
     * @prop {boolean} direct - Determines if it was a direct click on the song. We
     * then don't care if shuffle is on or not
     */
    changeAudioCollection( collection, audio, index, direct ){
        this.#prepareAudioChange( audio );

        this.#switchAudio( collection, audio, index );

        this.#afterAudioChange( direct );
    }

    #prepareAudioChange( audio ){
        Audio.stop();

        // Sync elements
        PlayPauseElement.syncAllToPause();
        /**
         * @todo Song Slider Elements -> reset
         * @todo Song Played Progress Elements -> reset
         * @todo Time Elements -> reset 
         * ( See src/utilities/audioNavigation.js Line #528)
         */
        /**
         * @todo we don't have album change callback, make note.
         */
    }

    #switchAudio( collection, audio, index ){
        config.audio_element = audio.url;
        config.active_metadata = audio;
        /** 
         * @todo We don't have active_album. make note.
         */
        config.active_index = null;
        config.collections[collection].active_index = parseInt(index);
    }

    #afterAudioChange( direct ){
        this.#updateMetaData();
        /**
         * @todo container elements -> set active
         * @todo time elements -> reset duration times
         * ( see src/utilities/audioNavigation.js Line #558 )
         */
        Callbacks.run('audio_change');
    }

    #updateMetaData(){
        let metaData = new MetaDataElement();
        metaData.displayMetaData();
    }
}