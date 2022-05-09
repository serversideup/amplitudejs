import { config } from '@/config.js';

export class TimeUpdateEvent{
    bind(){
        this.#bindTimeUpdate();
        this.#bindDurationChange();
    }

    #bindTimeUpdate(){
        config.audio_element.removeEventListener("timeupdate", this.#handle);
        config.audio_element.addEventListener("timeupdate", this.#handle);
    }

    #bindDurationChange(){
        config.audio_element.removeEventListener("durationchange", this.#handle);
        config.audio_element.addEventListener("durationchange", this.#handle);
    }

    #handle(){
        console.log('asdf');
    }
}