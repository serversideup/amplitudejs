import { ConfigState } from "@/services/ConfigState";

export class PlaybackSpeedElement {
    static playbackSpeedElementQuery = '.amplitude-playback-speed';

    #elements;
    #mobile;

    constructor(){
        this.#mobile = ConfigState.isMobile();
    }

    setUp(){
        this.#findElements();
        this.#bindInteractions();
    }

    #findElements(){
        this.#elements = document.querySelectorAll( PlaybackSpeedElement.playbackSpeedElementQuery );
    }

    #bindInteractions(){
        this.#elements.forEach( ( element ) => {
            if( this.#mobile ){
                element.removeEventListener( "touchend", this.#handleInteraction );
                element.addEventListener( "touchend", this.#handleInteraction );
            }else{
                element.removeEventListener( "click", this.#handleInteraction );
                element.addEventListener( "click", this.#handleInteraction );
            }
        });
    }

    #handleInteraction(){
        if( !ConfigState.isTouchMoving() ){
            let audio = new Audio();

            switch( ConfigState.getPlaybackSpeed() ){
                case 1:
                    audio.setPlaybackSpeed( 1.5 );
                break;
                case 1.5:
                    audio.setPlaybackSpeed( 2 );
                break;
                case 2:
                    audio.setPlaybackSpeed( 1 );
                break;
            }

            PlaybackSpeedElement.#syncElements();
        }
    }

    static #syncElements(){
        let elements = document.querySelectorAll( PlaybackSpeedElement.playbackSpeedElementQuery );

        elements.forEach( function( element ){
            element.classList.remove("amplitude-playback-speed-10");
            element.classList.remove("amplitude-playback-speed-15");
            element.classList.remove("amplitude-playback-speed-20");

            switch( ConfigState.getPlaybackSpeed() ){
                case 1:
                    element.classList.add("amplitude-playback-speed-10");
                break;
                case 1.5:
                    element.classList.add("amplitude-playback-speed-15");
                break;
                case 2:
                    element.classList.add("amplitude-playback-speed-20");
                break;
            }
        });
    }
}