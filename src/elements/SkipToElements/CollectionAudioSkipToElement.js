import { Audio } from '@/core/Audio.js';
import { Checks as CollectionChecks } from "@/services/Collections/Checks";
import { ConfigState } from "@/services/ConfigState";
import { Navigation as CollectionNavigation } from "@/services/Collections/Navigation";
import { PlayPauseElement } from '@/elements/PlayPauseElement';

export class CollectionAudioSkipToElement {
    static collectionAudioSkipToElementQuery = ".amplitude-skip-to[data-amplitude-audio-index][data-amplitude-collection-key]";

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
        this.#elements = document.querySelectorAll( CollectionAudioSkipToElement.collectionAudioSkipToElementQuery );
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
        });
    }

    #handleInteraction( element ){
        if( !ConfigState.isTouchMoving() ){
            let audioIndex = element.getAttribute('data-amplitude-audio-index');
            let collectionKey = element.getAttribute('data-amplitude-collection-key');
            let location = element.getAttribute('data-amplitude-location');

            if( this.#validElement( audioIndex, collectionKey, location ) ){
                this.#handleCollectionChange( collectionKey );
                this.#handleAudioChange( audioIndex, collectionKey );
                this.#playAudio();
                PlayPauseElement.syncAll();
                this.#skipToLocation( location );
            }
        }
    }

    #validElement( audioIndex, collectionKey, location ){
        if( audioIndex == null ){
            Debug.writeMessage( "You must add a `data-amplitude-audio-index` attribute to your `amplitude-skip-to` element.");
            return false;
        }

        if( collectionKey == null ){
            Debug.writeMessage( "You must add a valid `data-amplitude-collection-key` attribute to your `amplitude-skip-to` element.");
            return false;
        }

        if( location == null ){
            Debug.writeMessage( "You must add a `data-amplitude-location` attribute in seconds to your `amplitude-skip-to` element.");
            return false;
        }

        return true;
    }

    #handleCollectionChange( collection ){
        if( CollectionChecks.collectionChanged( collection ) ){   
            let collectionNavigation = new CollectionNavigation();
            collectionNavigation.setActiveCollection( collection );
        }
    }

    #handleAudioChange( audioIndex, collectionKey ){
        let collectionNavigation = new CollectionNavigation();

        collectionNavigation.changeCollectionAudio(
            collectionKey,
            config.collections[ collectionKey ].audio[ parseInt( audioIndex ) ],
            parseInt( audioIndex ),
            true
        );
    }

    #playAudio(){
        let audio = new Audio();
        audio.play();
    }

    #skipToLocation( location ){
        let audio = new Audio();
        audio.skipToLocation( parseInt( location ) );
    }
}