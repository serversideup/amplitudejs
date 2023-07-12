import { ProgressEvent } from "@/events/ProgressEvent";
import { AudioEndedEvent } from "@/events/AudioEndedEvent";
import { KeyBindingEvents } from "@/events/KeyBindingEvents";
import { TimeUpdateEvent } from "@/events/TimeUpdateEvent";
import { Debug } from "@/services/Debug";
import { config } from "@/config.js";

export class Events{
    initializeAllEvents(){
        Debug.writeMessage("Starting initialization of event handlers...");

        this.#bindTouchEvents();
        this.#bindTimeUpdateEvents();
        this.#bindKeyBindingEvents();
        this.#bindAudioEndedEvent();
        this.#bindProgressEvent();
        this.#bindAudioElementEventCallbacks();
    }

    #bindTouchEvents(){
        document.addEventListener("touchmove", () => {
            config.is_touch_moving = true;
        });

        document.addEventListener("touchend", () => {
            if( !config.is_touch_moving ){
                config.is_touch_moving = false;
            }
        })
    }

    #bindTimeUpdateEvents(){
        let timeUpdateEvent = new TimeUpdateEvent();
        timeUpdateEvent.bind();
    }

    #bindKeyBindingEvents(){
        let keyBindingEvents = new KeyBindingEvents();
        keyBindingEvents.bind();
    }

    #bindAudioEndedEvent(){
        let audioEndedEvent = new AudioEndedEvent();
        audioEndedEvent.bind();
    }

    #bindProgressEvent(){
        let progressEvent = new ProgressEvent();
        progressEvent.bind();
    }

    #bindAudioElementEventCallbacks(){

    }
}