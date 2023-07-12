import { ConfigState } from '@/services/ConfigState';
import { config } from '@/config.js';
import { BufferedProgressElement } from '@/elements/BufferedProgressElement';

export class ProgressEvent{
    bind(){
        config.audio_element.removeEventListener("progress", this.#handle);
        config.audio_element.addEventListener("progress", this.#handle);
    }

    #handle(){
        ConfigState.updateBufferedTime();
        BufferedProgressElement.syncAll();
    }
}