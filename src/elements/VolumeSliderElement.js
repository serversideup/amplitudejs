import { ConfigState } from "@/services/ConfigState";
import { MuteElement } from "./MuteElement";

/**
 * Handles the configuration and managing of Volume Slider elements
 * 
 * A Volume Slider element is defined as the following:
 * 
 * Element: class="amplitude-volume-slider"
 * Type: input[type="range"]
 * 
 * Whenever this element is interacted with, the audio volume is adjusted no matter where.
 */
export class VolumeSliderElement {
    static volumeSliderElementQuery = 'input[type="range"].amplitude-volume-slider';

    #elements;
    #mobile;
    #ie;

    constructor(){
        this.#mobile = ConfigState.isMobile();
        this.#ie = ConfigState.isIE();
    }

    setup(){
        this.#findElements();
        this.#bindInteractions();
    }

    #findElements(){
        this.#elements = document.querySelectorAll( VolumeSliderElement.volumeSliderElementQuery );
    }

    #bindInteractions(){
        if( ConfigState.isIos() ){
            Debug.writeMessage(
                "iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4"
            );
        }else{
            this.#elements.forEach( function( element ){
                if( this.#ie ){
                    element.removeEventListener( "change", this.#handleInteraction );
                    element.addEventListener( "change", this.#handleInteraction );
                }else{
                    element.removeEventListener( "input", this.#handleInteraction );
                    element.addEventListener( "input", this.#handleInteraction );
                }
            });
        }
    }

    #handleInteraction(){
        let audio = new Audio();
        audio.setVolume( this.value );

        MuteElement.syncElements();
        VolumeSliderElement.syncElements();
    }

    static syncElements(){
        let elements = document.querySelectorAll( VolumeSliderElement.volumeSliderElementQuery );

        elements.forEach( function( element ){
            element.value = config.audio.volume * 100;
        });
    }
}