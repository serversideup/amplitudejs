export class GlobalProgressElement{
    static globalProgressQuery = 'progress.amplitude-audio-played-progress:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])';

    static syncUI( completionPercentage ){
        if( !isNaN( completionPercentage ) && isFinite( completionPercentage ) ){
            let elements = document.querySelectorAll( GlobalProgressElement.globalProgressQuery );

            elements.forEach( ( element ) => {
                let max = element.max;

                element.value = ( completionPercentage / 100 ) * max;
            });
        }
    }
}