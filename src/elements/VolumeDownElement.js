import { Audio } from "@/core/Audio";
import { ConfigState } from "@/services/ConfigState";
import { MuteElement } from "./MuteElement";
import { VolumeSliderElement } from "./VolumeSliderElement";
import { Debug } from "@/services/Debug";

/**
 * Handles the configuration and managing of Volume Down elements
 * 
 * A Volume Down element is defined as the following:
 * 
 * Element: class="amplitude-volume-down"
 * 
 * Whenever this element is interacted with, the audio is muted no matter where.
 */
export class VolumeDownElement {
    static volumeDownElementQuery = '.amplitude-volume-down';

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
        this.#elements = document.querySelectorAll( VolumeDownElement.volumeDownElementQuery );
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
            let volumeDecrement = ConfigState.getVolumeDecrement();

            if( currentVolume - volumeDecrement > 0 ){
                audio.setVolume( currentVolume - volumeDecrement );
            }else{
                audio.setVolume( 0 );
            }

            MuteElement.syncElements();
            VolumeSliderElement.syncElements();
        }
    }
}