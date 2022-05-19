import { Audio } from '@/core/Audio.js';
import { Checks as AudioChecks } from '@/services/Audio/Checks.js';
import { Navigation as AudioNavigation } from '@/services/Audio/Navigation.js';
import { Checks as CollectionChecks } from '@/services/Collections/Checks.js';
import { Navigation as CollectionNavigation } from '@/services/Collections/Navigation.js';
import { Debug } from "@/services/Debug";
import { ConfigState } from "@/services/ConfigState";
import { config } from "@/config";
import { PlayPauseElement } from "@/elements/PlayPauseElement";

export class AudioPlayPauseElement {
    static audioPlayPauseQuery = '.amplitude-play-pause[data-amplitude-audio-index]:not([data-amplitude-collection-key])';

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
        this.#elements = document.querySelectorAll( AudioPlayPauseElement.audioPlayPauseQuery );
    }

    #bindInteractions(){
        this.#elements.forEach( (element) => {;
            if( this.#mobile ){
                element.removeEventListener("touchend", this.#handleInteraction );
                element.addEventListener("touchend", this.#handleInteraction.bind(this, element) );
            }else{
                element.removeEventListener("click", this.#handleInteraction );
                element.addEventListener("click", this.#handleInteraction.bind(this, element) );
            }
        } );
    }

    /**
     * There can be multiple collections on the page. There can also be multiple
     * individual audio players and audio players in collections.
     * 
     * We first check to see if the audio index exists. This can be a game changer
     * if the user messes up a key.
     * 
     * Next, we check to see if the collection has changed. Even though, this class
     * responds to audio that is not a part of a collection, technically the collection
     * changes if the state of the player is in collection mode and we switch out of collection
     * mode.
     * 
     * Finally, we check to see if the audio has changed. This means there is more than
     * one audio player on the page and the user has switched to a different player. If the
     * player was in collection mode, this check won't do anything since we change the audio
     * out of collection mode. This only fires if the player is not in collection mode and
     * switches to another audio player not in collection mode.
     * 
     * @returns {boolean|null}
     */
    #handleInteraction( element ){
        if( !ConfigState.isTouchMoving() ){
            let index = element.getAttribute('data-amplitude-audio-index');
            
            if( !AudioChecks.audioExists( index ) ){
                Debug.writeMessage('Audio with index "'+index+'" does not exist! Please add an audio object at this index in your configuration.');
                return false;
            }

            this.#handleCollectionChanges( index );
            this.#handleAudioChanges( index );
            this.#toggleAudio();
            
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
        let elements = document.querySelectorAll( AudioPlayPauseElement.audioPlayPauseQuery );
        let activeAudioIndex = ConfigState.getActiveAudioIndex();

        elements.forEach( ( element ) => {
            let elementAudioIndex = element.getAttribute('data-amplitude-audio-index');

            if( state == 'playing' && ( activeAudioIndex == elementAudioIndex ) ){
                PlayPauseElement.setElementPlay( element );
            }else{
                PlayPauseElement.setElementPause( element );
            }
        })
    }

    static syncToPause(){
        let elements = document.querySelectorAll( AudioPlayPauseElement.audioPlayPauseQuery );

        elements.forEach( ( element ) => {
            PlayPauseElement.setElementPause( element );
        });
    }
}