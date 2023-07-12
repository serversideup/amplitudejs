import { config } from "@/config.js";

/**
 * Returns the current config for AmplitudeJS
 * 
 * Public Method: Amplitude.getConfig()
 * 
 * @access public
 * @returns {object} 
 */
export function getConfig(){
    return config;
}

/**
 * Allows the user to turn on debugging.
 *
 * Public Accessor: Amplitude.setDebug( bool );
 *
 * @access public
 * @param {boolean} state - Turns debugging on and off.
 */
export function setDebug(state) {
    config.debug = state;
}