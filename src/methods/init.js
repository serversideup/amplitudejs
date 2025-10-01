import { Initializer } from "@/init/Initializer";

/**
 * The main init function.  The user will call this through
 * Amplitude.init() and pass in their settings.
 *
 * Public Accessor: Amplitude.init( user_config_json )
 * @access public
 * @param {object|url} userConfig - A URL or JSON object of user defined values that help configure and initialize AmplitudeJS.
 * @param {string|element} element - A unique identifier or DOM Element to bind Amplitude methods to.
 */
export function init( userConfig = {}, element = null ){
    let initializer = new Initializer( userConfig, element );
    initializer.setup();
}