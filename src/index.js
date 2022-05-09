/**
 * @name AmplitudeJS
 * @author Dan Pastori (Server Side Up) <hello@serversideup.net>
 */
import * as initMethods from "@/methods/init";
import * as configMethods from "@/methods/config";
import * as playlistMethods from "@/methods/playlists";

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
        ...playlistMethods
    }
})();


export default Amplitude;