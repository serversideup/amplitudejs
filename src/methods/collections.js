import { config } from "@/config.js";
import { ConfigState } from "@/services/ConfigState.js";
import { Debug } from "@/services/Debug";
import { Shuffle } from "@/services/Collections/Shuffle";
import { ShuffleElement } from "@/elements/ShuffleElement";

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

/**
 * Returns whether the active collection is shuffled or not
 * 
 * Public Accessor: Amplitude.getActiveCollectionShuffled()
 * 
 * @access public
 * 
 * @returns {bool} True or false whether the active colleciton is shuffled
 */
export function getActiveCollectionShuffled(){
    let collectionKey = ConfigState.getActiveCollection();
    let collectionIndex = ConfigState.getCollectionIntegerIndex( collectionKey );

    return config.collections[collectionIndex].shuffled;
}

/**
 * Toggles the shuffle state on the active collection.
 * 
 * Public Accessor: Amplitude.toggleActiveCollectionShuffle()
 * 
 * @access public
 */
export function toggleActiveCollectionShuffle(){
    if( ConfigState.getScope() == 'collection' ){
        let collectionKey = ConfigState.getActiveCollection();

        let shuffle = new Shuffle( collectionKey );
        shuffle.toggleShuffle();

        ShuffleElement.syncAll();
    }else{
        Debug.writeMessage("You can only shuffle a collection if you are playing a collection.");
    }
}

/**
 * Returns whether the specified collection is shuffled or not
 * 
 * Public Accessor: Amplitude.getCollectionShuffled( collectionKey )
 * 
 * @param {string} collection - The key of the collection we are checking is shuffled
 * 
 * @returns {bool} True or false whether the specified collection is shuffled.
 */
export function getCollectionShuffled( collectionKey ){
    let collectionIndex = ConfigState.getCollectionIntegerIndex(collectionKey);
    return config.collections[collectionIndex].shuffled;
}

/**
 * Sets whether the specified collection is shuffled
 * 
 * Public Accessor: Amplitude.setCollectionShuffled( collectionKey, shuffled )
 * 
 * @param {string} collection - The key of the collection we are shuffling.
 * @param {bool} shuffled - Whether we are shuffling the collection or not.
 */
export function setCollectionShuffled( collectionKey, shuffled = true ){
    let shuffle = new Shuffle( collectionKey );
    shuffle.setShuffled( shuffled );

    ShuffleElement.syncAll();
}
