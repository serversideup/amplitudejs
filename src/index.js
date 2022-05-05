/**
 * @name 		AmplitudeJS
 * @author 	Dan Pastori (Server Side Up) <hello@serversideup.net>
 */
/**
 * Amplitude should just be an interface to the public functions.
 * Everything else should be handled by other objects
 *
 * @module Amplitude
 */
const Amplitude = (function(){
    function test(){
        console.log('test');
    }

    return {
        test: test
    }
})();


export default Amplitude;