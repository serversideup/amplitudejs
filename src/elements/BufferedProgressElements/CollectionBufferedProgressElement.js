import { ConfigState } from "@/services/ConfigState";
import { config } from '@/config.js';

export class CollectionBufferedProgressElement{
    static collectionBufferedProgressQuery = 'progress.amplitude-buffered-progress[data-amplitude-collection-key]:not([data-amplitude-audio-index])';
    
    static syncUI(){
        let activeCollection = ConfigState.getActiveCollection();
        let elements = document.querySelectorAll( CollectionBufferedProgressElement.collectionBufferedProgressQuery );

        elements.forEach( function( element ){
            let collectionKey = element.getAttribute('data-amplitude-collection-key');

            if( activeCollection == collectionKey && !isNaN( config.buffered ) ){
                element.value = parseFloat(
                    ConfigState.getBufferedPercentage()
                );
            }else{
                element.value = 0;
            }
        });
    }
}