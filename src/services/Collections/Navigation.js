import { Audio } from "@/core/Audio";
import { config } from "@/config";
import { Callbacks } from "@/services/Callbacks";
import { PlayPauseElement } from "@/elements/PlayPauseElement";
import { MetaDataElement } from "@/elements/MetaDataElement";
import { ContainerElement } from "@/elements/ContainerElement";
import { ConfigState } from "@/services/ConfigState";

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

        let collectionIndex = ConfigState.getCollectionIntegerIndex( collectionKey );
        let nextAudio = this.#findNextAudio( collectionIndex );
        
        this.setActiveCollection( collectionKey, collectionIndex );
        this.changeCollectionAudio( collectionIndex, nextAudio.audio, nextAudio.index );
        this.#playNextAudio( nextAudio.end, audioEnded )
        
        PlayPauseElement.syncAll();
        Callbacks.run("next");

        if( config.repeat_audio ){
            Callbacks.run("audio_repeated");
        }
    }

    #findNextAudio( collectionIndex ){
        if( config.repeat_audio ){
            return this.#repeatedAudio( collectionIndex );
        }else{
            if( config.collections[ collectionIndex ].shuffled ){
                return this.#nextShuffledAudio( collectionIndex );
            }else{
                return this.#nextCollectionAudio( collectionIndex );
            }
        }
    }

    #repeatedAudio( collectionIndex ){
        let index =  config.collections[ collectionIndex ].active_index;

        return {
            'index': nextIndex,
            'audio': config.collections[ collectionIndex ].shuffle ?
                     config.collections[ collectionIndex ].shuffle_list[ index ] :
                     config.collections[ collectionIndex ].audio[ index ],
            'end': false
        }
    }

    #nextShuffledAudio( collectionIndex ){
        let nextIndex = null;
        let endOfList = false;

        let activeIndex = config.collections[ collectionIndex ].active_index;
        let shuffleCollectionLength = config.collections[ collectionIndex ].shuffle_list.length;
       
        if( parseInt( activeIndex + 1 ) < shuffleCollectionLength ){
            nextIndex = parseInt( activeIndex + 1 );    
        }else{
            nextIndex = 0;
            endOfList = true;
        }

        return {
            'index': nextIndex,
            'audio': config.collections[ collectionIndex ].shuffle_list[ nextIndex ],
            'end': endOfList
        }
    }

    #nextCollectionAudio( collectionIndex ){
        let nextIndex = null;
        let endOfList = false;
        
        let activeIndex = config.collections[ collectionIndex ].active_index;
        let collectionLength = config.collections[ collectionIndex ].audio.length;

        if( parseInt( activeIndex + 1 ) < collectionLength ){
            nextIndex = parseInt( activeIndex + 1 );
        }else{
            nextIndex = 0;
            endOfList = true;
        }

        return {
            'index': nextIndex,
            'audio': config.collections[ collectionIndex ].audio[ nextIndex ],
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

        let collectionIndex = ConfigState.getCollectionIntegerIndex( collectionKey );
        let previousAudio = this.#findPreviousAudio( collectionIndex );
        
        this.setActiveCollection( collectionKey, collectionIndex );
        this.changeCollectionAudio( collectionIndex, previousAudio.audio, previousAudio.index );
        
        let audio = new Audio();
        audio.play();
        
        PlayPauseElement.syncAll();
        Callbacks.run("previous");

        if( config.repeat_audio ){
            Callbacks.run("audio_repeated");
        }
    }

    #findPreviousAudio( collectionIndex ){
        if( config.repeat_audio ){
            return this.#repeatedAudio( collectionIndex );
        }else{
            if( config.collections[ collectionIndex ].shuffle ){
                return this.#previousShuffledAudio( collectionIndex );
            }else{
                return this.#previousCollectionAudio( collectionIndex );
            }
        }
    }

    #previousShuffledAudio( collectionIndex ){
        let previousIndex = null;

        let activeIndex = config.collections[ collectionIndex ].active_index;
        let shuffleCollectionLength = config.collections[ collectionIndex ].shuffle_list.length;
        
        if( parseInt( activeIndex - 1 ) >= 0 ){
            previousIndex =  parseInt( activeIndex - 1 );
        }else{
            previousIndex = parseInt( shuffleCollectionLength - 1 );
        }

        return {
            'index': previousIndex,
            'audio': config.collections[ collectionIndex ].shuffle_list[ previousIndex ]
        }
    }

    #previousCollectionAudio( collectionIndex ){
        let previousIndex = null;

        let activeIndex = config.collections[ collectionIndex ].active_index;
        let collectionLength = config.collections[ collectionIndex ].audio.length;
        
        if( parseInt( activeIndex - 1 ) >= 0 ){
            previousIndex =  parseInt( activeIndex - 1 );
        }else{
            previousIndex = parseInt( collectionLength - 1 );
        }

        return {
            'index': previousIndex,
            'audio': config.collections[ collectionIndex ].audio[ previousIndex ]
        }
    }

    setActiveCollection( collectionKey, collectionIndex ){
        if( config.active_collection != collectionKey ){

            config.active_collection = collectionKey;

            Callbacks.run("collection_change");
            
            if( collectionIndex != null ){
                config.collections[ collectionIndex ].active_index = 0;
            }
        }
    }

    /**
     * Handles audio change in a collection
     *
     * @prop {string} collectionIndex - The collection index we are changing the audio on.
     * @prop {object} audio - The audio object we are changing to in the collection.
     * @prop {number} audioIndex - The index of the audio we are changing to in the collection.
     * @prop {boolean} direct - Determines if it was a direct click on the song. We
     * then don't care if shuffle is on or not
     */
    changeCollectionAudio( collectionIndex, audio, audioIndex, direct ){
        this.#prepareAudioChange( audio );

        this.#switchAudio( collectionIndex, audio, audioIndex );

        this.#afterAudioChange( direct );
    }

    #prepareAudioChange( audio ){
        let coreAudio = new Audio();
        coreAudio.stop();

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

    #switchAudio( collectionIndex, audio, audioIndex ){
        config.audio_element.src = audio.url;
        config.active_metadata = audio;
        /** 
         * @todo We don't have active_album. make note.
         */
        config.active_index = null;
        config.active_collection = ConfigState.getCollectionKey( collectionIndex );
        config.collections[collectionIndex].active_index = parseInt( audioIndex );
    }

    #afterAudioChange( direct ){
        this.#updateMetaData();

        let containerElements = new ContainerElement();
        containerElements.setActiveContainers( direct );
        
        /**

         * @todo time elements -> reset duration times
         * ( see src/utilities/audioNavigation.js Line #558 )
         */
        Callbacks.run('audio_change');
    }

    #updateMetaData(){
        let metaData = new MetaDataElement();
        metaData.updateActiveMetaData();
    }
}