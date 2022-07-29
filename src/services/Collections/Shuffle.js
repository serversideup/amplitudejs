import { ConfigState } from '@/services/ConfigState';
import { config } from '@/config.js';

export class Shuffle {
    #collectionKey
    #collectionIndex

    constructor( collectionKey ){
        this.#collectionKey = collectionKey;
        this.#collectionIndex = ConfigState.getCollectionIntegerIndex( collectionKey );
    }

    toggleShuffle(){
        let isShuffled = ConfigState.isCollectionShuffled( this.#collectionIndex );

        if( isShuffled ){
            ConfigState.setCollectionShuffled( this.#collectionIndex, false, [] );
        }else{
            let shuffledAudio = this.#shuffleAudio( this.#collectionIndex );
            ConfigState.setCollectionShuffled( this.#collectionIndex, true, shuffledAudio );
        }
    }

    #shuffleAudio( collectionIndex ){
        let audio = ConfigState.getCollectionAudio( collectionIndex );
        let shuffleTemp = new Array( audio.length );

        audio.forEach( ( audioFile, index ) => {
            shuffleTemp[ index ] = audio[ index ]
        });

        for( let i = audio.length - 1; i > 0; i-- ){
            let randomNumber = Math.floor(
                Math.random() * audio.length + 1
            );

            this.#shuffleSwap( shuffleTemp, i, randomNumber - 1);
        }

        return shuffleTemp;
    }

    #shuffleSwap( list, original, random ){
        let temp = list[ original ];
        list[ original ] = list[ random ];
        list[ random ] = temp;
    }
}