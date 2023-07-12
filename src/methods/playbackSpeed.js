import { Audio } from "@/core/Audio.js";
import { PlaybackSpeedElement } from '@/elements/PlaybackSpeedElement.js';
import { config } from "@/config.js";

/**
 * Returns the current playback speed.
 *
 * Public Accessor: Amplitude.getPlaybackSpeed()
 *
 * @access public
 */
export function getPlaybackSpeed(){
    return config.playback_speed;
}

/**
 * Sets the playback speed
 *
 * Increments are set in .5 We only accept values
 * 1, 1.5, 2
 *
 *  1 -> Regular Speed
 *  1.5 -> 50% faster
 *  2 -> Twice as fast
 * 
 * Public Accessor: Amplitude.setPlaybackSpeed( speed )
 *
 * @access public
 */
export function setPlaybackSpeed( speed ) {
    let audio = new Audio();
    audio.setPlaybackSpeed( speed );

    PlaybackSpeedElement.syncElements();
}