import { NextElement } from "@/elements/NextElement";
import { MetaDataElement } from "@/elements/MetaDataElement";
import { PauseElement } from "@/elements/PauseElement";
import { PlayElement } from "@/elements/PlayElement";
import { PlayPauseElement } from "@/elements/PlayPauseElement";

export class UIManager{
    setVisualElementsDefaults(){

    }

    initializeElements(){
        this.#initializeMetaData();
        this.#initializePlayElement();
        this.#initializePauseElement();
        this.#initializePlayPauseElement();
        this.#initializeNextElement();
    }

    #initializeMetaData(){
        let metaDataElement = new MetaDataElement();
        metaDataElement.syncMetaData();
    }

    #initializePlayElement(){
        let playElement = new PlayElement();
        playElement.setUp();
    }

    #initializePauseElement(){
        let pauseElement = new PauseElement();
        pauseElement.setUp();
    }

    #initializePlayPauseElement(){
        let playPauseElement = new PlayPauseElement();
        playPauseElement.setUp();
    }

    #initializeNextElement(){
        let nextElement = new NextElement();
        nextElement.setUp();
    }
}