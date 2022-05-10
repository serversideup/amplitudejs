import { GlobalPlayElement } from "./PlayElements/GlobalPlayElement";
import { CollectionPlayElement } from "./PlayElements/CollectionPlayElement";
import { AudioPlayElement } from "./PlayElements/AudioPlayElement";
import { CollectionAudioPlayElement } from "./PlayElements/CollectionAudioPlayElement";
/**
 * Handles the configuration and managing of the play elements.
 * 
 * A Play element is defined as the following:
 * 
 * Element: class="amplitude-play"
 * 
 * GLOBAL: class="amplitude-play"
 * Controls the entire state of the audio player. Will play whatever is active.
 * 
 * COLLECTION: class="amplitude-play" data-amplitude-collection-key="{collection_key}"
 * Scoped to an individual collection. Will only play within the collection.
 * 
 * AUDIO: class="amplitude-play" data-amplitude-audio-index="{audio_index}"
 * Scoped to an individual audio element. Will only play a specific piece of audio.
 * 
 * AUDIO IN COLLECTION: class="amplitude-play" data-amplitude-collection-key="{collection_key}" data-amplitude-audio-index="{audio_index}"
 * Scoped to an individual audio element within a collection. Will only play a specific piece of audio in a collection.
 */
export class PlayElement{
    setUp(){
        this.#configureGlobalPlayElement();
        this.#configureCollectionPlayElement();
        this.#configureAudioPlayElement();
        this.#configureCollectionAudioPlayElement();
    }

    #configureGlobalPlayElement(){
        let globalPlayElement = new GlobalPlayElement();
        globalPlayElement.initialize();
    }

    #configureCollectionPlayElement(){
        let collectionPlayElement = new CollectionPlayElement();
        collectionPlayElement.initialize();
    }

    #configureAudioPlayElement(){
        let audioPlayElement = new AudioPlayElement();
        audioPlayElement.initialize();
    }

    #configureCollectionAudioPlayElement(){
        let collectionAudioPlayElement = new CollectionAudioPlayElement();
        collectionAudioPlayElement.initialize();
    }
}