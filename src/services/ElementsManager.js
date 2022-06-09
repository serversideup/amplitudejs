import { NextElement } from "@/elements/NextElement";
import { MetaDataElement } from "@/elements/MetaDataElement";
import { MuteElement } from "@/elements/MuteElement";
import { PauseElement } from "@/elements/PauseElement";
import { PlayElement } from "@/elements/PlayElement";
import { PlaybackSpeedElement } from "@/elements/PlaybackSpeedElement";
import { PlayPauseElement } from "@/elements/PlayPauseElement";
import { PreviousElement } from "@/elements/PreviousElement";
import { ShuffleElement } from "@/elements/ShuffleElement";
import { SkipToElement } from "@/elements/SkipToElement";
import { StopElement } from "@/elements/StopElement";
import { TrackerElement } from "@/elements/TrackerElement";
import { VolumeDownElement } from "@/elements/VolumeDownElement";
import { VolumeSliderElement } from "@/elements/VolumeSliderElement";
import { VolumeUpElement } from "@/elements/VolumeUpElement";

export class ElementsManager{
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
        this.#initializeStopElement();
        this.#initializeVolumeDownElement();
        this.#initializeVolumeUpElement();
        this.#initializeShuffleElement();
        this.#initializeSkipToElement();
        this.#initializeTrackerElement();
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

    #initializeStopElement(){
        let stopElement = new StopElement();
        stopElement.setUp();
    }

    #initializeVolumeDownElement(){
        let volumeDownElement = new VolumeDownElement();
        volumeDownElement.setUp();
    }

    #initializeVolumeUpElement(){
        let volumeUpElement = new VolumeUpElement();
        volumeUpElement.setUp();
    }

    #initializeShuffleElement(){
        let shuffleElement = new ShuffleElement();
        shuffleElement.setUp();
    }

    #initializeSkipToElement(){
        let skipToElement = new SkipToElement();
        skipToElement.setUp();
    }

    #initializeTrackerElement(){
        let trackerElement = new TrackerElement();
        trackerElement.setUp();
    }
}