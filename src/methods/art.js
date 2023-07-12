import { config } from "@/config.js";

/**
 * Gets the default art for the player
 *
 * Public Accessor: Amplitude.getDefaultArt()
 *
 * @access public
 * @returns {url}
 */
export function getDefaultArt() {
    return config.default_art;
}

/**
 * Sets the default art for the player
 *
 * Public Accessor: Amplitude.setDefaultArt( url )
 *
 * @access public
 * @param {string} url - A string representing the URL of the new default art.
 */
export function setDefaultArt(url) {
    config.default_art = url;
}

/**
 * Gets the default collection art
 *
 * Public Accessor: Amplitude.getDefaultCollectionArt()
 *
 * @access public
 * @returns {url}
 */
export function getDefaultCollectionArt() {
    return config.default_collection_art;
}

/**
 * Sets the default collection art for the player
 *
 * Public Accessor: Amplitude.setDefaultCollectionArt( url )
 *
 * @access public
 * @param {string} url - A string representing the URL of the new default collection art.
 */
export function setDefaultCollectionArt(url) {
    config.default_collection_art = url;
}
