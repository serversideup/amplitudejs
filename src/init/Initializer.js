import { Audio } from "@/init/Audio";
import { Collections } from "@/init/Collections";
import { Debug } from "@/services/Debug";
import { ConfigState } from "@/services/ConfigState";
import { Elements } from "@/init/Elements.js";
import { Events } from "@/init/Events.js";
import { UserConfig } from "@/init/UserConfig";
import { config } from "../config";
import { Callbacks } from "@/services/Callbacks";

export class Initializer{
    #element;
    #userConfig;
    #configState;
    #ready = false;

    constructor( userConfig, element ){
        this.#userConfig = userConfig;
        this.#element = element;
    }

    setup(){
        this.#setMobile();

        if( this.#isValidUrl( this.#userConfig ) ){
            this.#loadUserConfig();
        }else{
            this.#prepareAmplitude();
        }
    }

    #setMobile(){
        this.#configState = new ConfigState();
        this.#configState.setIsMobile();
    }

    #isValidUrl(url){
        try {
            new URL(url);
        } catch (e) {
            return false;
        }

        return true;
    }

    #loadUserConfig(){
        fetch( this.#userConfig )
            .then( ( response ) => {
                if( response.status != 200 ){
                    throw response.status;
                }else{
                    return response.json();
                }
            })
            .then( ( data ) => {
                this.#userConfig = data;
                this.#prepareAmplitude();
            })
            .catch( ( error ) => {
                Debug.writeMessage( error );
            })
    }

    #prepareAmplitude(){
        this.#resetConfig();
        this.#copyUserConfig();
        this.#initializeFx();
        this.#initializeCollections();
        this.#initializeAudio();
        this.#initializeEvents();
        this.#initializeElements();
        this.#initializeCallbacks();
    }

    // Ensure we have a blank slate on initialization.
    #resetConfig(){
        this.#configState.resetConfig();
    }

    #copyUserConfig(){
        let userConfigInit = new UserConfig();
        userConfigInit.copyUserSettings( this.#userConfig );
        userConfigInit.applyConfig();
    }

    #initializeFx(){
        /**
         * @todo Below is the old initialization for Fx
         * We need to improve this and make it more effective and up-to-date
         */
        // if (Fx.webAudioAPIAvailable()) {
        //     if (Fx.determineUsingAnyFX()) {
        //       /*
        //         Configure the Web Audio API If It's available.
        //       */
        //       Fx.configureWebAudioAPI();
      
        //       /*
        //           Activates the audio context after an event for the user.
        //       */
        //       document.documentElement.addEventListener("mousedown", function() {
        //         if (config.context.state !== "running") {
        //           config.context.resume();
        //         }
        //       });
      
        //       document.documentElement.addEventListener("keydown", function() {
        //         if (config.context.state !== "running") {
        //           config.context.resume();
        //         }
        //       });
      
        //       document.documentElement.addEventListener("keyup", function() {
        //         if (config.context.state !== "running") {
        //           config.context.resume();
        //         }
        //       });
      
        //       /*
        //           Set the user waveform settings if provided.
        //         */
        //       if (
        //         userConfig.waveforms != undefined &&
        //         userConfig.waveforms.sample_rate != undefined
        //       ) {
        //         config.waveforms.sample_rate = userConfig.waveforms.sample_rate;
        //       }
      
        //       /*
        //           Initialize the waveform.
        //         */
        //       WaveForm.init();
      
        //       /*
        //           If the user is registering visualizations on init,
        //           we set them right away.
        //         */
        //       if (
        //         userConfig.visualizations != undefined &&
        //         userConfig.visualizations.length > 0
        //       ) {
        //         /*
        //                 Iterate over all of the visualizations and
        //                 register them in our player.
        //               */
        //         for (let i = 0; i < userConfig.visualizations.length; i++) {
        //           Visualizations.register(
        //             userConfig.visualizations[i].object,
        //             userConfig.visualizations[i].params
        //           );
        //         }
        //       }
        //     }
        //   } else {
        //     Debug.writeMessage(
        //       "The Web Audio API is not available on this platform. We are using your defined backups!"
        //     );
        //   }
    }

    #initializeCollections(){
        let collections = new Collections();
        collections.initializeCollections();
    }

    #initializeAudio(){
        let audio = new Audio();
        audio.initializeAudio();
    }
    
    #initializeEvents(){
        let events = new Events();
        events.initializeAllEvents();
    }

    #initializeElements(){
        let elements = new Elements();
        elements.initializeElements();
    }

    #initializeCallbacks(){
        let callbacks = new Callbacks();
        callbacks.handleNativeAudioElementEvents();
    }
}