import { config } from "@/config";
import { Audio } from "@/core/Audio";

export class AudioNavigation{
    changeAudio( audio, index, direct = false ){
        this.#prepareAudioChange( audio );

        config.audio_element.src = audio.url;
        config.active_metadata = audio;
        config.active_index = parseInt( index );
        /**
         * @todo We used to have active album, but that might not make sense any more..
         */
        this.#afterAudioChange( direct );
    }

    #prepareAudioChange( audio ){
        let coreAudio = new Audio();
        coreAudio.stop();
        
        /**
         * @todo sync all visuals
         */

    }

    #afterAudioChange( direct ){
        /**
         * @todo run audio change
         * resync visual meta data
         */
    }
}