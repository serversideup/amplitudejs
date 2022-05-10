import { Audio } from "@/core/Audio";
import { config } from "@/config";
import { Callbacks } from "@/services/Callbacks";
import { PlayPauseElement } from "@/elements/PlayPauseElement";
import { MetaDataElement } from "@/elements/MetaDataElement";

export class Navigation {
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