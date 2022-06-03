import { ConfigState } from "@/services/ConfigState";
import { config } from '@/config.js';

export class CollectionBufferedProgressElement{
    static syncUI(){
        let activeCollection = ConfigState.getActiveCollection();
        let elements = document.querySelectorAll('progress.amplitude-buffered-progress[data-amplitude-collection-key="'+activeCollection+'"]:not([data-amplitude-audio-index])');

        elements.forEach( function( element ){
            if( !isNaN( config.buffered ) ){
                element.value = parseFloat(
                    ConfigState.getBufferedPercentage()
                );
            }
        });
    }
}