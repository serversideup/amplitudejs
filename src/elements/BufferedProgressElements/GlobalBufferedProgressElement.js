import { ConfigState } from "@/services/ConfigState";
import { config } from '@/config.js';

export class GlobalBufferedProgressElement{
    static globalBufferedProgressQuery = 'progress.amplitude-buffered-progress:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])';

    static syncUI(){
        let elements = document.querySelectorAll( GlobalBufferedProgressElement.globalBufferedProgressQuery );

        elements.forEach( function( element ){
            if( !isNaN( config.buffered ) ){
                element.value = parseFloat(
                    ConfigState.getBufferedPercentage()
                );
            }
        } );
    }
}