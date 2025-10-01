import { GlobalPlayPauseElement } from "./PlayPauseElements/GlobalPlayPauseElement";
import { CollectionPlayPauseElement } from "./PlayPauseElements/CollectionPlayPauseElement";
import { AudioPlayPauseElement } from "./PlayPauseElements/AudioPlayPauseElement";
import { CollectionAudioPlayPauseElement } from "./PlayPauseElements/CollectionAudioPlayPauseElement";

/**
 * Handles the configuration and managing of Play/Pause elements.
 * 
 * A Play Pause element is defined as the following:
 * 
 * Element: class="amplitude-play-pause"
 * 
 * GLOBAL: class="amplitude-play-pause" 
 * Controls the entire state of the audio player. Will play or pause whatever is active.
 * 
 * COLLECTION: class="amplitude-play-pause" data-amplitude-collection-key="{collection_key}"
 * Scoped to an individual collection. Will only play or pause within the scope of a collection.
 * 
 * AUDIO: class="amplitude-play-pause" data-amplitude-audio-index="{audio_index}"
 * Scoped to an individual audio element. Will only play or pause a specific piece of audio.
 * 
 * AUDIO IN COLLECTION: class="amplitude-play-pause" data-amplitude-collection-key="{collection_key}" data-amplitude-audio-index="{audio_index}"
 * Scoped to an individual audio element within a collection. Will only play or pause a specific piece of audio in a collection.
 */
export class PlayPauseElement{
    constructor(){

    }

    setUp(){
        this.#configureGlobalPlayPauseElement();
        this.#configureCollectionPlayPauseElement();
        this.#configureAudioPlayPauseElement();
        this.#configureCollectionAudioPlayPauseElement();
    }

    #configureGlobalPlayPauseElement(){
        let globalPlayPauseElement = new GlobalPlayPauseElement();
        globalPlayPauseElement.initialize();
    }

    #configureCollectionPlayPauseElement(){
        let collectionPlayPauseElement = new CollectionPlayPauseElement();
        collectionPlayPauseElement.initialize();
    }

    #configureAudioPlayPauseElement(){
        let audioPlayPauseElement = new AudioPlayPauseElement();
        audioPlayPauseElement.initialize();
    }

    #configureCollectionAudioPlayPauseElement(){
        let collectionAudioPlayPauseElement = new CollectionAudioPlayPauseElement();
        collectionAudioPlayPauseElement.initialize();
    }

    static syncAll(){
        GlobalPlayPauseElement.syncUI();
        CollectionPlayPauseElement.syncUI();
        AudioPlayPauseElement.syncUI();
        CollectionAudioPlayPauseElement.syncUI();
    }

    static syncAllToPause(){
        GlobalPlayPauseElement.syncToPause();
        CollectionPlayPauseElement.syncToPause();
        AudioPlayPauseElement.syncToPause();
        CollectionAudioPlayPauseElement.syncToPause();
    }

    /**
     * Sets an element to be playing by removing the 'amplitude-paused' class
     * and adding the 'amplitude-playing' class
     *
     * @access public
     * @static
     * @param {element} element - The element getting the playing class added.
     */
    static setElementPlay( element ){
        element.classList.add("amplitude-playing");
        element.classList.remove("amplitude-paused");
    }

    /**
     * Sets an element to be paused by adding the 'amplitude-paused' class
     * and removing the 'amplitude-playing' class
     *
     * @access public
     * @static
     * @param {element} element - The element getting the paused class added.
     */
    static setElementPause( element ){
        element.classList.remove("amplitude-playing");
        element.classList.add("amplitude-paused");
    }
}