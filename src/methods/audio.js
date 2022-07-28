import { config } from "@/config.js";

/**
 * Allows the user to get the percentage of the audio played.
 *
 * Public Accessor: Amplitude.getAudioPlayedPercentage();
 *
 * @access public
 */
export function getAudioPlayedPercentage(){
    return ( config.audio_element.currentTime / config.audio_element.duration ) * 100;
}

/**
 * Allows the user to set how far into the audio they want to be. This is
 * helpful for implementing custom range sliders. Only works on the current audio.
 *
 * Public Accessor: Amplitude.setAudioPlayedPercentage( float );
 *
 * @access public
 * @param {number} percentage - The percentage of the audio to skip
 */
export function setAudioPlayedPercentage(percentage) {
    if (typeof percentage == "number" && (percentage > 0 && percentage < 100)) {
        config.audio_element.currentTime = config.audio_element.duration * (percentage / 100);
    }
}

/**
 * Allows the user to get the number of seconds the audio has played.
 *
 * Public Accessor: Amplitude.getAudioPlayedSeconds();
 *
 * @access public
 */
export function getAudioPlayedSeconds() {
    return config.audio_element.currentTime;
}

/**
 * Allows the user to get the duration of the current audio
 *
 * Public Accessor: Amplitude.getAudioDuration();
 *
 * @access public
 */
export function getAudioDuration() {
    return config.audio_element.duration;
}

/**
 * Returns the active audio meta data for the user to do what is
 * needed.
 *
 * Public Accessor: Amplitude.getActiveAudioMetadata();
 *
 * @access public
 * @returns {object} JSON Object with the active audio information
 */
export function getActiveAudioMetadata() {
    return config.active_metadata;
}

/**
 * Returns the audio at a specific index
 *
 * Public Accessor: Amplitude.getAudioAtIndex( index )
 *
 * @access public
 * @param {number} index - The integer for the index of the audio.
 * @returns {object} JSON representation for the audio at a specific index.
 */
export function getAudioAtIndex(index) {
    return config.audio[index];
}

/**
 * Adds audio to the audio array.
 *
 * Public Accessor: Amplitude.addAudio( audio )
 *
 * @access public
 * @param {object} audio - JSON representation of a audio.
 * @returns {number} New index of the audio.
 */
export function addaudio(audio) {
    config.audio.push(audio);

    // if (SoundCloud.isSoundCloudURL(song.url)) {
    //     SoundCloud.resolveIndividualStreamableURL(
    //     song.url,
    //     null,
    //     config.songs.length - 1,
    //     config.shuffle_on
    //     );
    // }

    return config.audio.length - 1;
}