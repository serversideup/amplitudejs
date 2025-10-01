import { config } from "../config";
import { Checks as AudioChecks } from "@/services/Audio/Checks";
import { Checks as CollectionChecks } from "@/services/Collections/Checks";
import { ConfigState } from "@/services/ConfigState";
import { Debug } from "@/services/Debug";
import { Navigation as AudioNavigation } from "@/services/Audio/Navigation";
import { Navigation as CollectionNavigation } from "@/services/Collections/Navigation";

export class Audio{
    #state;

    initializeAudio(){
        if( this.#userDefinedStartingAudio() ){
            this.#setStartingCollection();
            this.#setStartingAudio();
        }else{
            this.#determineInitialPlayerState();
            this.#determineStartingAudioFile();
        }
    }

    /**
     * Determines if the user defined starting audio meaning
     * they provided a starting audio index or starting collection key
     */
    #userDefinedStartingAudio(){
        if( config.starting.audio_index != '' || config.starting.collection_key != '' ){
            return true;
        }else{
            return false;
        }
    }

    /**
     * If the user defined a starting collection, we set that here,
     * otherwise we do nothing and try to set a starting audio.
     */
    #setStartingCollection(){
        let collectionKey = ConfigState.getStartingCollectionKey();

        if( CollectionChecks.collectionExists( collectionKey ) ){
            let collectionAudioIndex = ConfigState.getStartingCollectionAudioIndex();

            this.#setCollectionAudioFile( collectionKey, collectionAudioIndex );
        }else{
            Debug.writeMessage( 'Starting collection with index "'+collectionKey+'" does not exist!');
        }
    }

    /**
     * If the user did not define a starting collection, they must have defined
     * a starting audio file. We set that here.
     */
    #setStartingAudio(){
        if( config.starting_collection_index == '' ){
            let audioIndex = config.starting.audio_index;
            
            if( AudioChecks.audioExists( audioIndex ) ){
                this.#setAudioFile( audioIndex );
            }else{
                Debug.writeMessage( 'Starting audio with index "'+audioIndex+'" does not exist!');
            }
        }
    }

    #determineInitialPlayerState(){
        if( config.collections.length == 0 && config.audio.length > 0 ){
            this.#state = 'audio';
        }

        if( config.collections.length > 0 && config.audio.length == 0 ){
            this.#state = 'collections';
        }

        if( config.collections.length > 0 && config.audio.length > 0 ){
            this.#state = 'audio-and-collections';
        }

        if( config.collections.length == 0 && config.audio.length == 0 ){
            this.#state = 'empty';
        }
    }

    /**
     * @todo Ensure starting selections are recognized
     */
    #determineStartingAudioFile(){
        switch( this.#state ){
            case 'audio':
                let startingAudio = config.starting.audio_index != null ? config.starting.audio_index : 0;
                this.#setAudioFile( startingAudio );
            break;
            case 'collections':
                this.#setCollectionAudioFile( 0, 0 );
            break;
            case 'audio-and-collections':
                if( config.starting.audio_index == null && config.starting.collection_key == '' ){
                    Debug.writeMessage('AmplitudeJS has been initialized with both audio and collections. Please define a starting audio file or starting collection and audio file.');
                }else{
                    if( config.starting.audio_index != null ){
                        this.#setAudioFile( config.starting.audio_index );
                    }

                    if( config.starting.collection_key != '' ){
                        let collectionIndex = ConfigState.getCollectionIntegerIndex( config.starting.collection_key );
                    }
                }
            break;
            case 'empty':
                // Set defaults (like album art, etc)
            break;
        }
    }

    #setAudioFile( audioIndex ){
        let audioNavigator = new AudioNavigation();
        audioNavigator.changeAudio( config.audio[ audioIndex ], audioIndex );
    }

    #setCollectionAudioFile( collectionIndex, audioIndex ){
        let collectionNavigator = new CollectionNavigation();
        collectionNavigator.changeCollectionAudio( collectionIndex, config.collections[ collectionIndex ].audio[ audioIndex ], audioIndex );
    }
}

        