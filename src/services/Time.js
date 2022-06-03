import { config } from "@/config";

export class Time {
    static percentageInSeconds( percentage ){
        return config.audio_element.duration * (percentage / 100);
    }

    computeCurrentTimes(){
        let currentTime = {};

        currentTime.seconds = this.#findCurrentSeconds();
        currentTime.minutes = this.#findCurrentMinutes();
        currentTime.hours = this.#findCurrentHours();

        return currentTime;
    }

    #findCurrentSeconds(){
        let seconds = ( Math.floor( config.audio_element.currentTime % 60 ) < 10 ? "0" : "" ) +
                            Math.floor( config.audio_element.currentTime % 60 );

        return seconds;
    }

    #findCurrentMinutes(){
        let minutes = Math.floor( config.audio_element.currentTime / 60 );

        if( minutes < 10 ){
            minutes = "0"+minutes;
        }

        return minutes;
    }

    #findCurrentHours(){
        let hours = Math.floor( config.audio_element.currentTime / 3600 );

        if( hours < 10 ){
            hours = "0"+hours;
        }

        return hours;
    }

    computeAudioCompletionPercentage(){
        return ( config.audio_element.currentTime / config.audio_element.duration ) * 100;
    }

    computeAudioDuration(){
        let audioDuration = {};

        audioDuration.seconds = this.#findAudioDurationSeconds();
        audioDuration.minutes = this.#findAudioDurationMinutes();
        audioDuration.hours = this.#findAudioDurationHours();

        return audioDuration;
    }

    #findAudioDurationSeconds(){
        let seconds = ( Math.floor( config.audio_element.duration % 60 ) < 10 ? "0" : "" ) +
                        Math.floor( config.audio_element.duration % 60 );

        return seconds;
    }

    #findAudioDurationMinutes(){
        let minutes = Math.floor( config.audio_element.duration / 60 );

        if( minutes < 10 ){
            minutes = "0"+minutes;
        }

        return minutes;
    }

    #findAudioDurationHours(){
        let hours = Math.floor( config.audio_element.duration / 3600 );

        if( hours < 10 ){
            hours = "0"+hours;
        }

        return hours;
    }
}