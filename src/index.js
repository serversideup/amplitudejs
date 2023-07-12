/**
 * @name AmplitudeJS
 * @author Dan Pastori (Server Side Up) <hello@serversideup.net>
 */

import * as artMethods from "@/methods/art.js";
import * as audioMethods from "@/methods/audio.js";
import * as collectionMethods from "@/methods/collections.js";
import * as configMethods from "@/methods/config.js";
import * as eventListenerMethods from "@/methods/eventListeners.js";
import * as initMethods from "@/methods/init.js";
import * as playbackSpeedMethods from "@/methods/playbackSpeed.js";

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
        ...artMethods,
        ...audioMethods,
        ...collectionMethods,
        ...configMethods,
        ...eventListenerMethods,
        ...initMethods,
        ...playbackSpeedMethods
    }
})();

export default Amplitude;