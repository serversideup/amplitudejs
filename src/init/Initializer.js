import { Debug } from "@/services/Debug";
import { ConfigState } from "@/services/ConfigState";
import { EventManager } from "@/services/EventManager";
import { ElementsManager } from "@/services/ElementsManager";
import { config } from "../config";
import { Navigation as AudioNavigation } from "@/services/Audio/Navigation";
import { Callbacks } from "@/services/Callbacks";

export class Initializer{
    #element;
    #userConfig;
    #configState;
    #ready = false;

    constructor( userConfig, element ){
        this.#configState = new ConfigState();
        this.#configState.setIsMobile();
        this.#userConfig = userConfig;
        this.#element = element;
    }

    setup(){
        if( this.#isValidUrl( this.#userConfig ) ){
            this.#loadUserConfig();
        }else{
            this.#prepareAmplitude();
        }
    }

    #isValidUrl(url){
        try {
            new URL(url);
        } catch (e) {
            Debug.writeMessage('AmplitudeJS must be initialized with a JSON object or a valid URL.')
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
        this.#initializeAudio();
        this.#initializeEvents();
        this.#initializeElements();
        this.#initializeCallbacks();
        this.#initializeKeybindingEvents();
    }

    // Ensure we have a blank slate on initialization.
    #resetConfig(){
        this.#configState.resetConfig();
    }

    #copyUserConfig(){
        this.#configState.setUserSettings( this.#userConfig );
    }

    #initializeEvents(){
        let eventManager = new EventManager();
        eventManager.initializeAllEvents();
    }

    #initializeElements(){
        let elementsManager = new ElementsManager();
        elementsManager.initializeElements();
    }

    #initializeAudio(){
        let audioNavigator = new AudioNavigation();

        if( config.start_audio ){
    
        }else{
            audioNavigator.changeAudio( config.audio[0], 0 );
        }
    }

    #initializeCallbacks(){
        let callbacks = new Callbacks();
        callbacks.handleNativeAudioElementEvents();
    }

    #initializeKeybindingEvents(){

    }
}