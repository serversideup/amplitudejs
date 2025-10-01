import { CollectionPreviousElement } from "./PreviousElements/CollectionPreviousElement";
import { GlobalPreviousElement } from "./PreviousElements/GlobalPreviousElement";

/**
 * Handles the configuration and managing of Previous elements
 * 
 * A Previous element is defined as the following:
 * 
 * Element: class="amplitude-previous"
 * 
 * GLOBAL: class="amplitude-previous"
 * Handles previous for whatever scope the player is in.
 * 
 * COLLECTION: class="amplitude-previous" data-amplitude-collection="{collection_key}"
 * Handles the previous audio within a specific collection.
 */
export class PreviousElement {
    setUp(){
        this.#configureGlobalPreviousElement();
        this.#configureCollectionPreviousElement();
    }

    #configureGlobalPreviousElement(){
        let globalPreviousElement = new GlobalPreviousElement();
        globalPreviousElement.initialize();
    }

    #configureCollectionPreviousElement(){
        let collectionPreviousElement = new CollectionPreviousElement();
        collectionPreviousElement.initialize();   
    }
}