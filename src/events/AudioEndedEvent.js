import { Audio } from '@/core/Audio.js';
import { config } from '@/config.js';
import { ConfigState } from '@/services/ConfigState';
import { Navigation } from '@/services/Collections/Navigation';
import { PlayPauseElement } from '@/elements/PlayPauseElement';

export class AudioEndedEvent{
    bind(){
        config.audio_element.removeEventListener( "ended", this.#handle );
        config.audio_element.addEventListener( "ended", this.#handle.bind(this) );
    }

    #handle(){
        setTimeout( function(){
            if( ConfigState.getScope() == 'collection' && ConfigState.getContinueNext() ){
                let navigation = new Navigation();
                navigation.next( ConfigState.getActiveCollection(), true );
            }else{
                let audio = new Audio();
                audio.stop();

                PlayPauseElement.syncAll();
            }
        }, config.delay );
    }
}