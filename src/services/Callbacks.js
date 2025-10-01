import { config } from "../config";
import { ConfigState } from "./ConfigState";
import { Debug } from "./Debug";

export class Callbacks{
    #events = [
        'abort',
        'error',
        'loadeddata',
        'loadedmetadata',
        'loadstart',
        'pause',
        'playing',
        'play',
        'progress',
        'ratechange',
        'seeked',
        'seeking',
        'stalled',
        'suspend',
        'timeupdate',
        'volumechange',
        'waiting',
        'canplay',
        'canplaythrough',
        'durationchange',
        'ended'
    ];

    handleNativeAudioElementEvents(){
        this.#events.forEach( function( event ){
            config.audio_element.addEventListener( event, function( ){
                Callbacks.run( event );
            } );
        });
    }

    static run( event ){
        let callback = ConfigState.getCallback( event );

        if( callback ){
            Debug.writeMessage( "Running Callback for event '" + callback.event + "' with method '" + callback.handler + "'");

            try {
                window[callback.handler]();
            } catch ( error ){
                if (error.message == "CANCEL EVENT") {
                    throw error;
                }else{
                    Debug.writeMessage( error.message );
                }
            }
        }
    }
}