import { ConfigState } from '@/services/ConfigState';

export class Shuffle {
    #collection

    constructor( collection ){
        this.#collection = collection;
    }

    toggleShuffle( collection ){
        let isShuffled = ConfigState.isCollectionShuffled( collection );

        if( isShuffled ){
            ConfigState.setCollectionShuffled( collection, false, [] );
        }else{
            let shuffledAudio = this.#shuffleAudio( collection );
            ConfigState.setCollectionShuffled( collection, true, shuffledAudio );
        }
    }

    #shuffleAudio( collection ){
        let audio = ConfigState.getCollectionAudio( collection );
        let shuffleTemp = new Array( audio.length );

        audio.forEach( ( audio, index ) => {
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