import { GlobalTrackerElement } from "./TrackerElements/GlobalTrackerElement";
import { AudioTrackerElement } from "./TrackerElements/AudioTrackerElement";

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

    }

    #configureAudioTrackerElement(){
        let audioTrackerElement = new AudioTrackerElement();
        audioTrackerElement.initialize();
    }

    #configureCollectionAudioTrackerElement(){

    }

    static syncCurrentTime( currentTime ){
        GlobalTrackerElement.syncUI( currentTime );
        AudioTrackerElement.syncUI( currentTime );
    }
}