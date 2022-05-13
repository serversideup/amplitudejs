import { NextElement } from "@/elements/NextElement";
import { MetaDataElement } from "@/elements/MetaDataElement";
import { MuteElement } from "@/elements/MuteElement";
import { PauseElement } from "@/elements/PauseElement";
import { PlayElement } from "@/elements/PlayElement";
import { PlaybackSpeedElement } from "@/elements/PlaybackSpeedElement";
import { PlayPauseElement } from "@/elements/PlayPauseElement";
import { PreviousElement } from "@/elements/PreviousElement";
import { VolumeSliderElement } from "@/elements/VolumeSliderElement";

export class UIManager{
    setVisualElementsDefaults(){

    }

    initializeElements(){
        this.#initializeMetaData();
        this.#initializePlayElement();
        this.#initializePauseElement();
        this.#initializePlayPauseElement();
        this.#initializeNextElement();
        this.#initializePreviousElement();
        this.#initializeMuteElement();
        this.#initializeVolumeSliderElement();
        this.#initializePlaybackSpeedElement();
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

    #initializePreviousElement(){
        let previousElement = new PreviousElement();
        previousElement.setUp();
    }

    #initializeMuteElement(){
        let muteElement = new MuteElement();
        muteElement.setUp();
    }

    #initializeVolumeSliderElement(){
        let volumeSliderElement = new VolumeSliderElement();
        volumeSliderElement.setUp();
    }

    #initializePlaybackSpeedElement(){
        let playbackSpeedElement = new PlaybackSpeedElement();
        playbackSpeedElement.setUp();
    }
}