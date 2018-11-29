/**
 * Imports the config module
 * @module config
 */
import config from '../../config.js';

let DurationHourElements = (function(){
  function sync( hours ){
    syncGlobal( hours );
    syncPlaylist( hours );
    syncSong( hours );
    syncSongInPlaylist( hours );
  }

  function syncGlobal( hours ){
    let durationHourSelectors = document.querySelectorAll( '.amplitude-duration-hours' );

    for( let i = 0; i < durationHourSelectors.length; i++ ){
      let playlist = durationHourSelectors[i].getAttribute('data-amplitude-playlist');
			let songIndex = durationHourSelectors[i].getAttribute('data-amplitude-song-index');

			if( playlist == null && songIndex == null ){
				durationHourSelectors[i].innerHTML = hours;
			}
    }
  }

  function syncPlaylist( hours ){
    let durationHourSelectors = document.querySelectorAll( '.amplitude-duration-hours[data-amplitude-playlist="'+config.active_playlist+'"]' );

    for( let i = 0; i < durationHourSelectors.length; i++ ){
			let songIndex = durationHourSelectors[i].getAttribute('data-amplitude-song-index');

			if( songIndex == null ){
				durationHourSelectors[i].innerHTML = hours;
			}
    }
  }

  function syncSong( hours ){
    if( config.active_playlist == null ){
      let durationHourSelectors = document.querySelectorAll( '.amplitude-duration-hours[data-amplitude-song-index="'+config.active_index+'"]' );

      for( let i = 0; i < durationHourSelectors.length; i++ ){
  			let playlist = durationHourSelectors[i].getAttribute('data-amplitude-playlist');

  			if( playlist == null ){
  				durationHourSelectors[i].innerHTML = hours;
  			}
      }
    }
  }

  function syncSongInPlaylist( hours ){
    let activePlaylistIndex = config.active_playlist != '' && config.active_playlist != null ? config.playlists[ config.active_playlist ].active_index : null;

    let durationHourSelectors = document.querySelectorAll( '.amplitude-duration-hours[data-amplitude-playlist="'+config.active_playlist+'"][data-amplitude-song-index="'+activePlaylistIndex+'"]' );

    for( let i = 0; i < durationHourSelectors.length; i++ ){
			durationHourSelectors[i].innerHTML = hours;
    }
  }

  function resetTimes(){
    let durationHourSelectors = document.querySelectorAll( '.amplitude-duration-hours' );

    for( let i = 0; i < durationHourSelectors.length; i++ ){
			durationHourSelectors[i].innerHTML = '00';
    }
  }

  return {
    sync: sync,
    resetTimes: resetTimes
  }
})();

export default DurationHourElements
