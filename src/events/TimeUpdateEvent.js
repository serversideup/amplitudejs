import { BufferedProgressElement } from '@/elements/BufferedProgressElement';
import { ConfigState } from '@/services/ConfigState';
import { config } from '@/config.js';
import { Time } from '@/services/Time';
import { TimeElement } from '@/elements/TimeElement';
import { TrackerElement } from '@/elements/TrackerElement';

export class TimeUpdateEvent{
    bind(){
        this.#bindTimeUpdate();
        this.#bindDurationChange();
    }

    #bindTimeUpdate(){
        config.audio_element.removeEventListener( "timeupdate", this.#handle.bind(this) );
        config.audio_element.addEventListener( "timeupdate", this.#handle.bind(this) );
    }

    #bindDurationChange(){
        config.audio_element.removeEventListener( "durationchange", this.#handle.bind(this) );
        config.audio_element.addEventListener( "durationchange", this.#handle.bind(this) );
    }

    #handle(){
        ConfigState.updateBufferedTime();
        BufferedProgressElement.syncAll();
        this.#updateTimeInformation();
        this.#runTimeCallbacks();
    }

    #updateTimeInformation(){
        if( !ConfigState.isLive() ){
            let time = new Time();

            let currentTime = time.computeCurrentTimes();
            let completionPercentage = time.computeAudioCompletionPercentage();
            let duration = time.computeAudioDuration();

            let timeElement = new TimeElement();
            timeElement.syncCurrentTime( currentTime );
            timeElement.syncDurationTime( currentTime, duration );

            TrackerElement.syncCurrentTime( completionPercentage );
        }
    }

    #runTimeCallbacks(){

    }
}