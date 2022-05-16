import { CollectionShuffleElement } from "./ShuffleElements/CollectionShuffleElement";
import { GlobalShuffleElement } from "./ShuffleElements/GlobalShuffleElement";

/**
 * Handles the configuration and managing of Shuffle elements
 * 
 * A Shuffle element is defined as the following:
 * 
 * Element: class="amplitude-shuffle"
 * 
 * GLOBAL: class="amplitude-shuffles"
 * Shuffles the active collection
 * 
 * COLLECTION: class="amplitude-shuffle" data-amplitude-collection="{collection_key}"
 * Shuffles the collection identified
 */
export class ShuffleElement {
    setUp(){
        this.#configureGlobalShuffleElement();
        this.#configureCollectionShuffleElement();
    }

    #configureGlobalShuffleElement(){
        let globalShuffleElement = new GlobalShuffleElement();
        globalShuffleElement.initialize();
    }

    #configureCollectionShuffleElement(){
        let collectionShuffleElement = new CollectionShuffleElement();
        collectionShuffleElement.initialize();
    }
}