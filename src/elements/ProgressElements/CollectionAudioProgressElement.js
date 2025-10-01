import { ConfigState } from '@/services/ConfigState';

export class CollectionAudioProgressElement{
    static collectionAudioProgressQuery = 'progress.amplitude-audio-played-progress[data-amplitude-collection-key][data-amplitude-audio-index]';

    static syncUI( completionPercentage ){
        if( !isNaN( completionPercentage ) && isFinite( completionPercentage ) ){
            let elements = document.querySelectorAll( CollectionAudioProgressElement.collectionAudioProgressQuery );
            let activeCollectionKey = ConfigState.getActiveCollection();
            let activeAudioIndex = ConfigState.getActiveAudioIndex();

            elements.forEach( ( element ) => {
                let elementCollectionKey = element.getAttribute('data-amplitude-collection-key');
                let elementAudioIndex = element.getAttribute('data-amplitude-audio-index');
                let max = element.max;

                if( ( activeCollectionKey == elementCollectionKey ) && ( activeAudioIndex == elementAudioIndex ) ){
                    element.value = ( completionPercentage / 100 ) * max;
                }else{
                    element.value = 0;
                }
            });
        }
    }
}