import { config } from "@/config.js";

/**
 * Returns the key of the active playlist
 * 
 * Public Method: Amplitude.getActivePlaylist()
 * 
 * @access public
 * @returns {string} 
 */
 export function getActivePlaylist(){
    return config.active_playlist;
}