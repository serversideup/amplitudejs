import { config } from "@/config";
import { ConfigState } from "@/services/ConfigState";

export class AudioContainerElement {
    static audioContainerElementQuery = '.amplitude-audio-container[data-amplitude-audio-index]:not([data-amplitude-collection-key])';
    
    #elements;
    #activeIndex;

    setActive(){
        if( ConfigState.getScope() == 'audio' ){
            this.#findElements();
            this.#resetElements();
            this.#getActiveIndex();
            this.#setActiveContainerElements();
        }
    }

    #findElements(){
        this.#elements = document.querySelectorAll( AudioContainerElement.audioContainerElementQuery );
    }

    #resetElements(){
        this.#elements.forEach( function( element ){
            element.classList.remove('amplitude-active-audio-container');
        });
    }

    #getActiveIndex(){
        this.#activeIndex = config.active_index;
    }

    #setActiveContainerElements(){
        let activeContainerElements = document.querySelectorAll('.amplitude-audio-container[data-amplitude-audio-index="'+this.#activeIndex+'"]:not([data-amplitude-collection-key])');
        
        activeContainerElements.forEach( function( element ){
            element.classList.add("amplitude-active-audio-container");
        });
    }
}