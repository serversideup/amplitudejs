import { CollectionNextElement } from "./NextElements/CollectionNextElement";
import { GlobalNextElement } from "./NextElements/GlobalNextElement";

/**
 * Handles the configuration and managing of Next elements
 * 
 * A Next element is defined as the following:
 * 
 * Element: class="amplitude-next"
 * 
 * GLOBAL: class="amplitude-next"
 * Handles next for whatever scope the player is in.
 * 
 * COLLECTION: class="amplitude-next" data-amplitude-collection="{collection_key}"
 * Handles the next audio within a specific collection.
 */
export class NextElement {
    setUp(){
        this.#configureGlobalNextElement();
        this.#configureCollectionNextElement();
    }

    #configureGlobalNextElement(){
        let globalNextElement = new GlobalNextElement();
        globalNextElement.initialize();
    }

    #configureCollectionNextElement(){
        let collectionNextElement = new CollectionNextElement();
        collectionNextElement.initialize();
    }
}