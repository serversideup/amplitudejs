import { PlayElement } from "@/elements/PlayElement";
import { PlayPauseElement } from "@/elements/PlayPauseElement";

export class UIManager{
    setVisualElementsDefaults(){

    }

    initializeElements(){
        this.#initializePlayElement();
        this.#initializePlayPauseElement();
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