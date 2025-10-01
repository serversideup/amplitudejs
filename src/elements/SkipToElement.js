import { AudioSkipToElement } from "./SkipToElements/AudioSkipToElement";
import { CollectionAudioSkipToElement } from "./SkipToElements/CollectionAudioSkipToElement";

export class SkipToElement {
    setUp(){
        this.#configureAudioSkipToElement();
        this.#configureCollectionAudioSkipToElement();
    }

    #configureAudioSkipToElement(){
        let audioSkipToElement = new AudioSkipToElement();
        audioSkipToElement.initialize();
    }

    #configureCollectionAudioSkipToElement(){
        let collectionAudioSkipToElement = new CollectionAudioSkipToElement();
        collectionAudioSkipToElement.initialize();
    }
}