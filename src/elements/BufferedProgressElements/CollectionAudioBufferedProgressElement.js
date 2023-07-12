import { ConfigState } from "@/services/ConfigState";
import { config } from '@/config.js';

export class CollectionAudioBufferedProgressElement{
    static collectionAudioBufferedProgressQuery = 'progress.amplitude-buffered-progress[data-amplitude-collection-key][data-amplitude-audio-index]';

    static syncUI(){
        let activeCollection = ConfigState.getActiveCollection();
        let activeCollectionAudioIndex = ConfigState.getActiveCollectionAudioIndex();

        let elements = document.querySelectorAll( CollectionAudioBufferedProgressElement.collectionAudioBufferedProgressQuery );

        elements.forEach( function( element ){
            let audioIndex = element.getAttribute('data-amplitude-audio-index');
            let collectionKey = element.getAttribute('data-amplitude-collection-key');

            if( ( audioIndex == activeCollectionAudioIndex ) && ( collectionKey == activeCollection ) && !isNaN( config.buffered ) ){
                element.value = parseFloat(
                    ConfigState.getBufferedPercentage()
                );
            }else{
                element.value = 0;
            }
        })
    }
}