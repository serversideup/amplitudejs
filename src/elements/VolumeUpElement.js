import { Audio } from "@/core/Audio";
import { ConfigState } from "@/services/ConfigState";
import { MuteElement } from "./MuteElement";
import { VolumeSliderElement } from "./VolumeSliderElement";
import { Debug } from "@/services/Debug";

/**
 * Handles the configuration and managing of Volume Up elements
 * 
 * A Volume Up element is defined as the following:
 * 
 * Element: class="amplitude-volume-up"
 * 
 * Whenever this element is interacted with, the audio is muted no matter where.
 */
export class VolumeUpElement {
    static volumeUpElementQuery = '.amplitude-volume-up';

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
        this.#elements = document.querySelectorAll( VolumeUpElement.volumeUpElementQuery );
    }

    #bindInteractions(){
        if( this.#elements.length > 0 && ConfigState.isIos() ){
            Debug.writeMessage(
                "iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4"
            );
        }else{
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
    }

    #handleInteraction(){
        if( !ConfigState.isTouchMoving() ){
            let audio = new Audio();
            let currentVolume = ConfigState.getVolume();
            let volumeIncrement = ConfigState.getVolumeIncrement();

            if( currentVolume + volumeIncrement <= 100 ){
                audio.setVolume( currentVolume + volumeIncrement );
            }else{
                audio.setVolume( 100 );
            }

            MuteElement.syncElements();
            VolumeSliderElement.syncElements();
        }
    }
}