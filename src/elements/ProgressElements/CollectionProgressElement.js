import { ConfigState } from '@/services/ConfigState';

export class CollectionProgressElement{
    static collectionProgressQuery = 'progress.amplitude-audio-played-progress[data-amplitude-collection-key]:not([data-amplitude-audio-index])';

    static syncUI( completionPercentage ){
        if( !isNaN( completionPercentage ) && isFinite( completionPercentage ) ){
            let elements = document.querySelectorAll( CollectionProgressElement.collectionProgressQuery );
            let activeCollectionKey = ConfigState.getActiveCollection();

            elements.forEach( ( element ) => {
                let elementCollectionKey = element.getAttribute('data-amplitude-collection-key');
                let max = element.max;

                if( activeCollectionKey == elementCollectionKey ){
                    element.value = ( completionPercentage / 100 ) * max;
                }else{
                    element.value = 0;
                }
            });
        }
    }
}