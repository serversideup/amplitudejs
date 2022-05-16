import { TimeUpdateEvent } from "@/events/TimeUpdateEvent";
import { Debug } from "@/services/Debug";
import { config } from "@/config.js";

export class EventManager{
    initializeAllEvents(){
        Debug.writeMessage("Starting initialization of event handlers...");

        this.#bindTouchEvents();
        this.#bindTimeUpdateEvents();
        this.#bindKeyBindingEvents();
        this.#bindAudioEndedEvent();
        this.#bindProgressEvent();
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
        // let timeUpdateEvent = new TimeUpdateEvent();
        // timeUpdateEvent.bind();
    }

    #bindKeyBindingEvents(){

    }

    #bindAudioEndedEvent(){

    }

    #bindProgressEvent(){

    }
}