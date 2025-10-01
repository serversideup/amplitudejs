import { ConfigState } from '@/services/ConfigState';

export class AudioProgressElement{
    static audioProgressQuery = 'progress.amplitude-audio-played-progress[data-amplitude-audio-index]:not([data-amplitude-collection-key])';

    static syncUI( completionPercentage ){
        if( !isNaN( completionPercentage ) && isFinite( completionPercentage ) ){
            let elements = document.querySelectorAll( AudioProgressElement.audioProgressQuery );
            let activeAudioIndex = ConfigState.getActiveAudioIndex();

            elements.forEach( ( element ) => {
                let elementAudioIndex = element.getAttribute('data-amplitude-audio-index');
                let max = element.max;

                if( activeAudioIndex == elementAudioIndex ){
                    element.value = ( completionPercentage / 100 ) * max;
                }else{
                    element.value = 0;
                }
            });
        }
    }
}