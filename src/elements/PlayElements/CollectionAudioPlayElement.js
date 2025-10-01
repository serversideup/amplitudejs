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
                element.addEventListener("touchend", this.#handleInteraction.bind(this, element) );
            }else{
                element.removeEventListener("click", this.#handleInteraction );
                element.addEventListener("click", this.#handleInteraction.bind(this, element) );
            }
        } );
    }

    #handleInteraction( element ){
        if( !ConfigState.isTouchMoving() ){
            let collectionKey = element.getAttribute('data-amplitude-collection-key');
            let collectionIndex = ConfigState.getCollectionIntegerIndex( collectionKey );
            let audioIndex = element.getAttribute('data-amplitude-audio-index');
            
            this.#handleCollectionChanges( collectionKey, collectionIndex, audioIndex );
            this.#handleAudioChanges( collectionKey, collectionIndex, audioIndex );
            this.#playAudio();

            PlayPauseElement.syncAll();
        }
    }

    #handleCollectionChanges( collectionKey, collectionIndex, audioIndex ){
        if( CollectionChecks.collectionChanged( collectionKey ) ){
            let collectionNavigation = new CollectionNavigation();

            collectionNavigation.setActiveCollection( collectionKey, collectionIndex );
            collectionNavigation.changeCollectionAudio(
                collectionIndex,
                config.collections[ collectionIndex ].audio[audioIndex],
                audioIndex,
                true
            );
        }
    }

    #handleAudioChanges( collectionKey, collectionIndex, audioIndex ){
        if( AudioChecks.audioChanged( audioIndex, collectionKey ) ){
            let collectionNavigation = new CollectionNavigation();

            collectionNavigation.changeCollectionAudio(
                collectionIndex,
                config.collections[ collectionIndex ].audio[audioIndex],
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