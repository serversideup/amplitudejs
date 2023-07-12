import { Audio } from "@/core/Audio";
import { config } from "@/config";
import { Callbacks } from "@/services/Callbacks";
import { PlayPauseElement } from "@/elements/PlayPauseElement";
import { MetaDataElement } from "@/elements/MetaDataElement";
import { ContainerElement } from "@/elements/ContainerElement";

export class Navigation {
    /**
     * Change audio in the audio array
     *
     * @prop {object} audio - The audio we are changing to.
     * @prop {number} index - The index we are changing to.
     * @prop {boolean} direct - Determines if it was a direct click on the song.
     * We then don't care if shuffle is on or not.
     */
    changeAudio( audio, index, direct = false ){
        this.#prepareAudioChange( audio );

        this.#switchAudio( audio, index );

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

    #switchAudio( audio, index ){
        config.active_collection = null;
        config.audio_element.src = audio.url;
        config.active_metadata = audio;
        /** 
         * @todo We don't have active_album. make note.
         */
         config.active_index = parseInt( index );
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