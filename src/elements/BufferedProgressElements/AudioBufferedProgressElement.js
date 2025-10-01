import { ConfigState } from "@/services/ConfigState";
import { config } from '@/config.js';

export class AudioBufferedProgressElement{
    static audioBufferedProgressQuery = 'progress.amplitude-buffered-progress[data-amplitude-audio-index]:not([data-amplitude-collection-key])';

    static syncUI(){
        let activeIndex = ConfigState.getActiveAudioIndex();
        let elements = document.querySelectorAll( AudioBufferedProgressElement.audioBufferedProgressQuery );

        elements.forEach( function( element ){
            let audioIndex = element.getAttribute('data-amplitude-audio-index');

            if( activeIndex == audioIndex && !isNaN( config.buffered ) ){
                element.value = parseFloat(
                    ConfigState.getBufferedPercentage()
                );
            }else{
                element.value = 0;
            }
        });
    }
}