import { config } from "@/config.js";
import { Debug } from "@/services/Debug";

const validEventListeners = [
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

/**
 * Binds an event listener to a native HTML 5 event
 * emitted from the audio element.
 * 
 * Public Accessor: Amplitude.addAudioEventListener( event, method )
 * @access public
 * @param string event - The event name you want to bind a listener to.
 * @param string method - The method you are binding to the event.
 */
export function addAudioEventListener( event, method ){
    if( validEventListeners.indexOf( event ) > -1 ){
        config.audio_element.addEventListener( event, method );
    }else{
        Debug.writeMessage( "Invalid event listener. Please see all valid events here: https://www.w3schools.com/tags/ref_av_dom.asp")
    }
}