import { GlobalTrackerElement } from "./TrackerElements/GlobalTrackerElement";
import { CollectionTrackerElement } from "./TrackerElements/CollectionTrackerElement";
import { AudioTrackerElement } from "./TrackerElements/AudioTrackerElement";
import { CollectionAudioTrackerElement } from "./TrackerElements/CollectionAudioTrackerElement";

export class TrackerElement{
    constructor(){

    }

    setUp(){
        this.#configureGlobalTrackerElement();
        this.#configureCollectionTrackerElement();
        this.#configureAudioTrackerElement();
        this.#configureCollectionAudioTrackerElement();
    }

    #configureGlobalTrackerElement(){
        let globalTrackerElement = new GlobalTrackerElement();
        globalTrackerElement.initialize();
    }

    #configureCollectionTrackerElement(){
        let collectionTrackerElement = new CollectionTrackerElement();
        collectionTrackerElement.initialize();
    }

    #configureAudioTrackerElement(){
        let audioTrackerElement = new AudioTrackerElement();
        audioTrackerElement.initialize();
    }

    #configureCollectionAudioTrackerElement(){
        let collectionAudioTrackerElement = new CollectionAudioTrackerElement();
        collectionAudioTrackerElement.initialize();
    }

    static syncCurrentTime( currentTime ){
        GlobalTrackerElement.syncUI( currentTime );
        CollectionTrackerElement.syncUI( currentTime );
        AudioTrackerElement.syncUI( currentTime );
        CollectionAudioTrackerElement.syncUI( currentTime );
    }
}