import config from '../config.js';

let ConfigState = (function(){

  /**
	 * Resets the config to the default state. This is called on initialize
	 * to ensure the user's config is what matters.
	 *
	 * Public Accessor: AmplitudeHelpers.resetConfig()
	 *
	 * @access public
	 */
	function resetConfig(){
		config.audio 										= new Audio();
		config.active_metadata 					= {};
		config.active_album 						= '';
		config.active_index 						= 0;
		config.active_playlist 					= '';
		config.autoplay 								= false;
		config.playback_speed 					= 1.0;
		config.callbacks 								= {};
		config.songs 										= [];
		config.playlists 								= {};
		config.start_song 							= '';
		config.starting_playlist 				= '';
		config.starting_playlist_song 	= '';
		config.repeat 									= false;
		config.shuffle_list 						= {};
		config.shuffle_on 							= false;
		config.default_album_art 				= '';
		config.default_playlist_art 		= '';
		config.debug 										= false;
		config.handle_song_elements 		= true;
		config.volume 									= .5;
		config.pre_mute_volume 					= .5;
		config.volume_increment 				= 5;
		config.volume_decrement 				= 5;
		config.soundcloud_client 				= '';
		config.soundcloud_use_art 			= false;
		config.soundcloud_song_count 		= 0;
		config.soundcloud_songs_ready 	= 0;
		config.continue_next 						= true;
	}

	function setPlayerState(){
		if( config.audio.paused && config.audio.currentTime == 0 ){
			config.player_state = 'stopped';
		}

		if( config.audio.paused && config.audio.currentTime > 0 ){
			config.player_state = 'paused';
		}

		if( !config.audio.paused ){
			config.player_state = 'playing';
		}
	}

	/*
		Returns the public facing methods
	*/
  return {
    resetConfig: resetConfig,
		setPlayerState: setPlayerState
  }
})();

export default ConfigState
