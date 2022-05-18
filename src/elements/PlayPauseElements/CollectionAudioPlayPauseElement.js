import { Audio } from '@/core/Audio.js';
import { Checks as AudioChecks } from '@/services/Audio/Checks.js';
import { Checks as CollectionChecks } from '@/services/Collections/Checks.js';
import { Navigation as CollectionNavigation } from '@/services/Collections/Navigation.js';
import { ConfigState } from "@/services/ConfigState";
import { config } from "@/config";
import { PlayPauseElement } from "@/elements/PlayPauseElement";

export class CollectionAudioPlayPauseElement {
    static collectionAudioPlayPauseQuery = '.amplitude-play-pause[data-amplitude-audio-index][data-amplitude-collection-key]';

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
        this.#elements = document.querySelectorAll( CollectionAudioPlayPauseElement.collectionAudioPlayPauseQuery );
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
            let audioIndex = element.getAttribute('data-amplitude-audio-index');
            
            this.#handleCollectionChanges( collectionKey, audioIndex );
            this.#handleAudioChanges( collectionKey, audioIndex );
            this.#toggleAudio();

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

    #toggleAudio(){
        let audio = new Audio();

        if( config.audio_element.paused ){
            audio.play();
        }else{
            audio.pause();
        }
    }

    static syncUI(){
        let state = ConfigState.getAudioState();
        let elements = document.querySelectorAll( CollectionAudioPlayPauseElement.collectionAudioPlayPauseQuery );

        elements.forEach( ( element ) => {
            if( state == 'playing' ){
                PlayPauseElement.setElementPlay( element );
            }else{
                PlayPauseElement.setElementPause( element );
            }
        })
    }

    static syncToPause(){
        let elements = document.querySelectorAll( CollectionAudioPlayPauseElement.collectionAudioPlayPauseQuery );

        elements.forEach( ( element ) => {
            PlayPauseElement.setElementPause( element );
        });
    }
}