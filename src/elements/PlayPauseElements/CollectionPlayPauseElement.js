import { Audio } from "@/core/Audio";
import { Checks as CollectionChecks } from "@/services/Collections/Checks";
import { Navigation as CollectionNavigation } from "@/services/Collections/Navigation";
import { Debug } from "@/services/Debug";
import { ConfigState } from "@/services/ConfigState";
import { config } from "@/config";
import { PlayPauseElement } from "@/elements/PlayPauseElement";

/**
 * A Collection Play Pause element is defined by the following:
 * 
 * Element: class="amplitude-play-pause" data-amplitude-collection-key="{collection_key}"
 */
export class CollectionPlayPauseElement {
    static collectionPlayPauseQuery = '.amplitude-play-pause[data-amplitude-collection-key]:not([data-amplitude-audio-index])';

    #elements;
    #mobile;

    constructor(){
        this.#mobile = ConfigState.isMobile();
    }

    initialize(){
        this.#findElements()
        this.#bindInteractions()
    }

    #findElements(){
        this.#elements = document.querySelectorAll( CollectionPlayPauseElement.collectionPlayPauseQuery );
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

    #handleInteraction( element ){
        if( !ConfigState.isTouchMoving() ){
            let collectionKey = element.getAttribute('data-amplitude-collection-key');
            let collectionIndex = ConfigState.getCollectionIntegerIndex( collectionKey );

            if( !CollectionChecks.collectionExists( collectionIndex ) ){
                Debug.writeMessage('Collection with key "'+collectionKey+'" does not exist! Please define this collection in your configuration.');
                return false;
            }

            this.#handleCollectionChanges( collectionKey );
            this.#toggleAudio();

            PlayPauseElement.syncAll();
        }
    }

    #handleCollectionChanges( collectionKey ){
        if( CollectionChecks.collectionChanged( collectionKey ) ){
            let collectionIndex = ConfigState.getCollectionIntegerIndex( collectionKey );

            let collectionNavigation = new CollectionNavigation();
            collectionNavigation.setActiveCollection( collectionKey, collectionIndex );

            // If the collection is shuffled and the collection is changed,
            // we change the audio to be the first audio in the array. Since,
            // we are changing the collection, we are starting at the top.
            if( CollectionChecks.isCollectionShuffled( collectionIndex ) ){
                collectionNavigation.changeCollectionAudio(
                    collectionIndex,
                    config.collections[ collectionIndex ].shuffle_list[0],
                    0,
                    true
                );
            }else{
                collectionNavigation.changeCollectionAudio(
                    collectionIndex,
                    config.collections[ collectionIndex ].audio[0],
                    0
                );
            }
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
        let elements = document.querySelectorAll( CollectionPlayPauseElement.collectionPlayPauseQuery );
        let activeCollectionKey = ConfigState.getActiveCollection();

        elements.forEach( ( element ) => {
            let elementCollectionKey = element.getAttribute('data-amplitude-collection-key');

            if( state == 'playing' && ( activeCollectionKey == elementCollectionKey ) ){
                PlayPauseElement.setElementPlay( element );
            }else{
                PlayPauseElement.setElementPause( element );
            }
        })
    }

    static syncToPause(){
        let elements = document.querySelectorAll( CollectionPlayPauseElement.collectionPlayPauseQuery );

        elements.forEach( (element) => {
            PlayPauseElement.setElementPause( element );
        });
    }
}