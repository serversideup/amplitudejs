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