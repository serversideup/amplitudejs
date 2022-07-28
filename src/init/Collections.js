import { config } from '@/config.js';

export class Collections{
    constructor(){

    }

    initializeCollections(){
        if( config.collections.length > 0 ){
            this.#syncSoundCloudData();
            this.#setActiveIndexes();
            this.#initializeShuffle();
            this.#initializeRepeat();
            this.#setDefaultArt();
        }
    }

    /**
     * @todo Implement Sound Cloud
     */
    #syncSoundCloudData(){
    //     /*
    //   Iterate over all of the config's playlists
    // */
    // for (let key in config.playlists) {
    //     /*
    //       Checks if the playlist key is accurate.
    //     */
    //     if (config.playlists.hasOwnProperty(key)) {
    //       /*
    //         Checks if the playlist has songs.
    //       */
    //       if (config.playlists[key].songs) {
    //         /*
    //           Iterate over all of the songs in the playlist
    //         */
    //         for (let i = 0; i < config.playlists[key].songs.length; i++) {
    //           if (Checks.isInt(config.playlists[key].songs[i])) {
    //             config.playlists[key].songs[i] =
    //               config.songs[config.playlists[key].songs[i]];
  
    //             config.playlists[key].songs[i].index = i;
    //           }
    //           /*
    //             Check to see if the index for the song in the playlist
    //             exists in the songs config.
    //           */
    //           if (
    //             Checks.isInt(config.playlists[key].songs[i]) &&
    //             !config.songs[config.playlists[key].songs[i]]
    //           ) {
    //             Debug.writeMessage(
    //               "The song index: " +
    //                 config.playlists[key].songs[i] +
    //                 " in playlist with key: " +
    //                 key +
    //                 " is not defined in your songs array!"
    //             );
    //           }
  
    //           /*
    //             If not an int, then is a dedicated song, just set the index.
    //           */
    //           if (!Checks.isInt(config.playlists[key].songs[i]) ){
    //             config.playlists[key].songs[i].index = i;
    //           }
    //         }
    //       }
    //     }
    //   }
    }

    #setActiveIndexes(){
        config.collections.forEach( ( collection ) => {
            collection.active_index = null;
        } );
    }

    #initializeShuffle(){
        config.collections.forEach( ( collection ) => {
            collection.shuffle = false;
            collection.shuffle_list = [];
        } );
    }

    #initializeRepeat(){
        config.collections.forEach( ( collection ) => {
            collection.repeat = false;
        } );
    }

    #setDefaultArt(){
        config.collections.forEach( ( collection ) => {
            collection.default_art = collection.default_art ? collection.default_art : config.default_collection_art;
        } );
    }
}