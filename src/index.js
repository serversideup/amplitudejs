/**
 * @name AmplitudeJS
 * @author Dan Pastori (Server Side Up) <hello@serversideup.net>
 */
import * as initMethods from "@/methods/init.js";
import * as configMethods from "@/methods/config.js";
import * as playlistMethods from "@/methods/playlists.js";
import * as eventListeners from "@/methods/eventListeners.js";

/**
 * Amplitude is an interface to the public methods.
 * All public methods are in the /methods directory.
 * These methods use clases to perform functionality.
 * The state is stored in /config.js
 *
 * @module Amplitude
 */
const Amplitude = (function(){
    return {
        ...initMethods,
        ...configMethods,
        ...playlistMethods,
        ...eventListeners
    }
})();

export default Amplitude;