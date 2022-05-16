import { ConfigState } from "@/services/ConfigState";
import { VolumeSliderElement } from "./VolumeSliderElement";
import { Debug } from "@/services/Debug";
/**
 * Handles the configuration and managing of Mute elements
 * 
 * A Mute element is defined as the following:
 * 
 * Element: class="amplitude-mute"
 * 
 * Whenever this element is interacted with, the audio is muted no matter where.
 */
export class MuteElement {
    static muteElementQuery = '.amplitude-mute';

    #elements;
    #mobile;

    constructor(){
        this.#mobile = ConfigState.isMobile();
    }

    setup(){
        this.#findElements();
        this.#bindInteractions();
    }

    #findElements(){
        this.#elements = document.querySelectorAll( MuteElement.muteElementQuery );
    }

    #bindInteractions(){
        if( ConfigState.isIos() ){
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

            if( ConfigState.getVolume() == 0 ){
                audio.setVolume( ConfigState.getPreMuteVolume() );
            }else{
                ConfigState.setPreMuteVolume();
                audio.setVolume( 0 );
            }

            MuteElement.syncElements();
            VolumeSliderElement.syncElements();
        }
    }

    static syncElements(){
        let elements = document.querySelectorAll( MuteElement.muteElementQuery );

        elements.forEach( function( element ){
            if( ConfigState.getVolume() == 0 ){
                element.classList.add("amplitude-not-muted");
                element.classList.remove("amplitude-muted");
            }else{
                element.classList.remove("amplitude-not-muted");
                element.classList.add("amplitude-muted");
            }
        });
    }
}