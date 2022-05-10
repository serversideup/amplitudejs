import { PlayElement } from "@/elements/PlayElement";
import { PlayPauseElement } from "@/elements/PlayPauseElement";
import { MetaDataElement } from "@/elements/MetaDataElement";

export class UIManager{
    setVisualElementsDefaults(){

    }

    initializeElements(){
        this.#initializeMetaData();
        this.#initializePlayElement();
        this.#initializePlayPauseElement();
    }

    #initializeMetaData(){
        let metaDataElement = new MetaDataElement();
        metaDataElement.syncMetaData();
    }

    #initializePlayElement(){
        let playElement = new PlayElement();
        playElement.setUp();
    }

    #initializePlayPauseElement(){
        let playPauseElement = new PlayPauseElement();
        playPauseElement.setUp();
    }
}