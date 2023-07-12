import { Audio } from '@/core/Audio.js';
import { Checks as AudioChecks } from '@/services/Audio/Checks.js';
import { Navigation as AudioNavigation } from '@/services/Audio/Navigation.js';
import { Checks as CollectionChecks } from '@/services/Collections/Checks.js';
import { Navigation as CollectionNavigation } from '@/services/Collections/Navigation.js';
import { Debug } from "@/services/Debug";
import { ConfigState } from "@/services/ConfigState";
import { config } from "@/config";
import { PlayPauseElement } from "@/elements/PlayPauseElement";

export class AudioPlayElement {
    static audioPlayQuery = '.amplitude-play[data-amplitude-audio-index]:not([data-amplitude-collection-key])';

    #elements;
    #mobile;

    constructor(){
        this.#mobile = ConfigState.isMobile();
    }

    initialize(){
        this.#findElements();
        this.#bindInteractions();
    }

    #findElements(){
        this.#elements = document.querySelectorAll( AudioPlayElement.audioPlayQuery );
    }

    #bindInteractions(){
        this.#elements.forEach( (element) => {
            if( this.#mobile ){
                element.removeEventListener("touchend", this.#handleInteraction );
                element.addEventListener("touchend", this.#handleInteraction.bind(this, element) );
            }else{
                element.removeEventListener("click", this.#handleInteraction );
                element.addEventListener("click", this.#handleInteraction.bind(this, element) );
            }
        } );
    }

    #handleInteraction( element ){
        if( !ConfigState.isTouchMoving() ){     
            let index = element.getAttribute('data-amplitude-audio-index');

            if( !AudioChecks.audioExists( index ) ){
                Debug.writeMessage('Audio with index "'+index+'" does not exist! Please add an audio object at this index in your configuration.');
                return false;
            }

            this.#handleCollectionChanges( index );
            this.#handleAudioChanges( index );
            this.#playAudio();
            
            PlayPauseElement.syncAll();
        }
    }

    #handleCollectionChanges( index ){
        if( CollectionChecks.collectionChanged( null ) ){
            let collectionNavigation = new CollectionNavigation();
            let audioNavigation = new AudioNavigation();

            collectionNavigation.setActiveCollection( null );
            audioNavigation.changeAudio(
                config.audio[index], index, true
            );
        }
    }

    #handleAudioChanges( index ){
        if( AudioChecks.audioChanged( index ) ){
            let audioNavigation = new AudioNavigation();

            audioNavigation.changeAudio(
                config.audio[index], index, true
            );
        }
    }

    #playAudio(){
        let audio = new Audio();
        audio.play();
    }
}