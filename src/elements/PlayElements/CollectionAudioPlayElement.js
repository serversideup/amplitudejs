import { Audio } from '@/core/Audio.js';
import { Checks as AudioChecks } from '@/services/Audio/Checks.js';
import { Checks as CollectionChecks } from '@/services/Collections/Checks.js';
import { Navigation as CollectionNavigation } from '@/services/Collections/Navigation.js';
import { ConfigState } from "@/services/ConfigState";
import { config } from "@/config";
import { PlayPauseElement } from "@/elements/PlayPauseElement";

export class CollectionAudioPlayElement {
    static collectionAudioPlayQuery = '.amplitude-play[data-amplitude-audio-index][data-amplitude-collection-key]';

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
        this.#elements = document.querySelectorAll( CollectionAudioPlayElement.collectionAudioPlayQuery );
    }

    #bindInteractions(){
        this.#elements.forEach( (element) => {
            if( this.#mobile ){
                element.removeEventListener("touchend", this.#handleInteraction );
                element.addEventListener("touchend", this.#handleInteraction );
            }else{
                element.removeEventListener("click", this.#handleInteraction );
                element.addEventListener("click", this.#handleInteraction );
            }
        } );
    }

    #handleInteraction(){
        if( !ConfigState.isTouchMoving() ){
            let collectionKey = this.attribute('data-amplitude-collection-key');
            let audioIndex = this.attribute('data-amplitude-audio-index');
            
            this.#handleCollectionChanges( collectionKey, audioIndex );
            this.#handleAudioChanges( collectionKey, audioIndex );
            this.#playAudio();

            PlayPauseElement.syncAll();
        }
    }

    #handleCollectionChanges( collectionKey, audioIndex ){
        if( CollectionChecks.collectionChanged( collectionKey ) ){
            let collectionNavigation = new CollectionNavigation();

            collectionNavigation.setActiveCollection( collectionKey );
            collectionNavigation.changeAudioCollection(
                collectionKey,
                config.collections[ collectionKey ].audio[audioIndex],
                audioIndex,
                true
            );
        }
    }

    #handleAudioChanges( collectionKey, audioIndex ){
        if( AudioChecks.audioChanged( audioIndex, collectionKey ) ){
            let collectionNavigation = new CollectionNavigation();

            collectionNavigation.changeAudioCollection(
                collectionKey,
                config.collections[ collectionKey ].audio[audioIndex],
                audioIndex,
                true
            );
        }
    }

    #playAudio(){
        let audio = new Audio();
        audio.play();
    }
}