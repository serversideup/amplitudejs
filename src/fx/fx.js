/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * AmplitudeJS FX Module. Helps with configuring and setting up visualizations
 * and any other features of the Web Audio API that Amplitude takes advantage
 * of.
 *
 * @module fx/FX
 */
let Fx = (function() {
  /**
   * Configures the Web Audio API to work with AmplitudeJS
   */
  function configureWebAudioAPI() {
    /*
			Gets the context for the browser. If this is null, the Web Audio
			API is unavailable.
		*/
    let browserContext =
      window.AudioContext ||
      window.webkitAudioContext ||
      window.mozAudioContext ||
      window.oAudioContext ||
      window.msAudioContext;

    /*
			If we have a context, the Web Audio API is available and we can continue,
			otherwise, we alert the user if they have debug turned on.
		*/
    if (browserContext) {
      /*
				Web Audio API is available, set the context in our config.
			*/
      config.context = new browserContext();
      
      /*
				Create an analyzer that we will use in the context.
			*/
      config.analyser = config.context.createAnalyser();

      /*
				Set cross origin to anonymous so we have a better chance of being able
				to use the power of the Web Audio API.
			*/
      config.audio.crossOrigin = "anonymous";
      
      /*
				Bind the source to the Javascript Audio Element.
			*/
      config.source = config.context.createMediaElementSource(config.audio);

      /*
				Connect the analyser to the source
			*/
      config.source.connect(config.analyser);

      /*
				Connect the context destination to the analyser.
			*/
      config.analyser.connect(config.context.destination);
    } else {
      AmplitudeHelpers.writeDebugMessage(
        "Web Audio API is unavailable! We will set any of your visualizations with your back up definition!"
      );
    }
  }

  /**
   * Determines if the web audio API is available or not.
   */
  function webAudioAPIAvailable() {
    /*
			Gets the context for the browser. If this is null, the Web Audio
			API is unavailable.
		*/
    let browserContext =
      window.AudioContext ||
      window.webkitAudioContext ||
      window.mozAudioContext ||
      window.oAudioContext ||
      window.msAudioContext;
    config.web_audio_api_available = false;

    /*
			Determines if the Web Audio API is available or not.
		*/
    if (browserContext) {
      /*
				Set the flag in the config that the Web Audio API is available
			*/
      config.web_audio_api_available = true;
      return true;
    } else {
      /*
				Set the flag in the config that the Web Audio API is not available
			*/
      config.web_audio_api_available = false;
      return false;
    }
  }

  /**
   * Determines if the user is using any of the web audio API features.
   */
  function determineUsingAnyFX(){
    let waveforms = document.querySelectorAll(".amplitude-wave-form");
    let visualizationElements = document.querySelectorAll(
      ".amplitude-visualization"
    );

    if( waveforms.length > 0 || visualizationElements.length > 0 ){
      return true;
    }else{
      return false;
    }
  }

  /*
		Returns the publicly accessible methods
	*/
  return {
    configureWebAudioAPI: configureWebAudioAPI,
    webAudioAPIAvailable: webAudioAPIAvailable,
    determineUsingAnyFX: determineUsingAnyFX
  };
})();

export default Fx;
