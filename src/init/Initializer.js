import { Debug } from "@/utilities/debug";
import { ConfigState } from "@/services/ConfigState";
import { EventManager } from "@/services/EventManager";
import { UIManager } from "@/services/UIManager";
import { config } from "../config";
import { Navigation as AudioNavigation } from "@/services/Audio/Navigation";

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
        let uiManager = new UIManager();
        uiManager.initializeElements();
    }

    #initializeCallbacks(){

    }

    #initializeAudio(){
        let audioNavigator = new AudioNavigation();

        if( config.start_audio ){
    
        }else{
            audioNavigator.changeAudio( config.audio[0], 0 );
        }
    }
}