import { config } from "@/config.js";
import { ConfigState } from "@/services/ConfigState.js";

/**
 * Returns the key of the active collection
 * 
 * Public Method: Amplitude.getActiveCollection()
 * 
 * @access public
 * @returns {string} 
 */
export function getActiveCollection(){
    return config.active_collection;
}

/**
 * Returns the active collection meta data for the for the user to use.
 *
 * Public Accessor: Amplitude.getActiveCollectionMetadata();
 *
 * @access public
 * @returns {object} JSON representation for the active collection
 */
export function getActiveCollectionMetadata() {
    let collectionIndex = ConfigState.getCollectionIntegerIndex( config.active_collection );
    return config.collections[collectionIndex];
}

/**
 * Returns the audio at a collection index
 *
 * Public Accessor: Amplitude.getAudioAtCollectionIndex( collection, index )
 *
 * @access public
 * 
 * @param {string} collection - The key of the collection we are getting the audio at the index for
 * @param {number} index - The integer for the index of the audio in the collection.
 * 
 * @returns {object} JSON representation for the audio at a specific index.
 */
export function getAudioAtCollectionIndex(collectionKey, audioIndex) {
    let collectionIndex = ConfigState.getCollectionIntegerIndex(collectionKey);
    return config.collections[collectionIndex].audio[audioIndex];
}