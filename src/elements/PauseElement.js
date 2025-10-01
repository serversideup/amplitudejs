import { GlobalPauseElement } from "./PauseElements/GlobalPauseElement";
import { CollectionPauseElement } from "./PauseElements/CollectionPauseElement";
import { AudioPauseElement } from "./PauseElements/AudioPauseElement";
import { CollectionAudioPauseElement } from "./PauseElements/CollectionAudioPauseElement";

/**
 * Handles the configuration and managing of Pause elements.
 * 
 * A Pause element is defined as the following:
 * 
 * Element: class="amplitude-pause"
 * 
 * GLOBAL: class="amplitude-pause"
 * Controls the entire state of the audio player.
 * 
 * COLLECTION: class="amplitude-pause" data-amplitude-collection="{collection_key}"
 * Scoped to an individual collection. Will only pause what's within the scope of the collection.
 * 
 * AUDIO: class="amplitude-pause" data-amplitude-audio-index="{audio_index}"
 * Scoped to an individual audio element.
 * 
 * AUDIO IN COLLECTION: class="amplitude-pause" data-amplitude-collection-key="{collection_key}" data-amplitude-audio-index="{audio_index}"
 * Scoped to an individual audio element within a collection.
 */
export class PauseElement {
    setUp(){
        this.#configureGlobalPauseElement();
        this.#configureCollectionPauseElement();
        this.#configureAudioPauseElement();
        this.#configureCollectionAudioPauseElement();
    }

    #configureGlobalPauseElement(){
        let globalPauseElement = new GlobalPauseElement();
        globalPauseElement.initialize();
    }

    #configureCollectionPauseElement(){
        let collectionPauseElement = new CollectionPauseElement();
        collectionPauseElement.initialize();
    }

    #configureAudioPauseElement(){
        let audioPauseElement = new AudioPauseElement();
        audioPauseElement.initialize();
    }

    #configureCollectionAudioPauseElement(){
        let collectionAudioPauseElement = new CollectionAudioPauseElement();
        collectionAudioPauseElement.initialize();
    }
}