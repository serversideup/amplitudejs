import { ConfigState } from "@/services/ConfigState";
import { config } from '@/config.js';

export class AudioBufferedProgressElement{
    static audioBufferedProgressQuery = 'progress.amplitude-buffered-progress[data-amplitude-audio-index]:not([data-amplitude-collection-key])';

    static syncUI(){
        let activeIndex = ConfigState.getActiveAudioIndex();
        let elements = document.querySelectorAll('progress.amplitude-buffered-progress[data-amplitude-audio-index="'+activeIndex+'"]:not([data-amplitude-collection-key])');

        elements.forEach( function( element ){
            if( !isNaN( config.buffered ) ){
                element.value = parseFloat(
                    ConfigState.getBufferedPercentage()
                );
            }
        });
    }
}