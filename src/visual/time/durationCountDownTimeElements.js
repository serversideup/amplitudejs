/**
 * Imports the config module
 * @module config
 */
import config from '../../config.js';

let DurationCountDownTimeElements = (function(){
  function sync( countDownTime, songDuration ){
    let timeRemaining = computeTimeRemaining( countDownTime, songDuration );

    syncGlobal( timeRemaining );
    syncPlaylist( timeRemaining );
    syncSong( timeRemaining );
    syncSongInPlaylist( timeRemaining );
  }

  function syncGlobal( timeRemaining ){
    let durationTimeRemainingSelectors = document.querySelectorAll( '.amplitude-time-remaining' );

    for( let i = 0; i < durationTimeRemainingSelectors.length; i++ ){
      let playlist = durationTimeRemainingSelectors[i].getAttribute('data-amplitude-playlist');
			let songIndex = durationTimeRemainingSelectors[i].getAttribute('data-amplitude-song-index');

			if( playlist == null && songIndex == null ){
				durationTimeRemainingSelectors[i].innerHTML = timeRemaining;
			}
    }
  }

  function syncPlaylist( timeRemaining ){
    let durationTimeRemainingSelectors = document.querySelectorAll( '.amplitude-time-remaining[data-amplitude-playlist="'+config.active_playlist+'"]' );

    for( let i = 0; i < durationTimeRemainingSelectors.length; i++ ){
			let songIndex = durationTimeRemainingSelectors[i].getAttribute('data-amplitude-song-index');

			if( songIndex == null ){
				durationTimeRemainingSelectors[i].innerHTML = timeRemaining;
			}
    }
  }

  function syncSong( timeRemaining ){
    if( config.active_playlist == null ){
      let durationTimeRemainingSelectors = document.querySelectorAll( '.amplitude-time-remaining[data-amplitude-song-index="'+config.active_index+'"]' );

      for( let i = 0; i < durationTimeRemainingSelectors.length; i++ ){
  			let playlist = durationTimeRemainingSelectors[i].getAttribute('data-amplitude-playlist');

  			if( playlist == null ){
  				durationTimeRemainingSelectors[i].innerHTML = timeRemaining;
  			}
      }
    }
  }

  function syncSongInPlaylist( timeRemaining ){
    let activePlaylistIndex = config.active_playlist != '' && config.active_playlist != null ? config.playlists[ config.active_playlist ].active_index : null;

    let durationTimeRemainingSelectors = document.querySelectorAll( '.amplitude-time-remaining[data-amplitude-playlist="'+config.active_playlist+'"][data-amplitude-song-index="'+activePlaylistIndex+'"]' );

    for( let i = 0; i < durationTimeRemainingSelectors.length; i++ ){
			durationTimeRemainingSelectors[i].innerHTML = timeRemaining;
    }
  }

  function resetTimes(){
    let durationTimeRemainingSelectors = document.querySelectorAll( '.amplitude-time-remaining' );

    for( let i = 0; i < durationTimeRemainingSelectors.length; i++ ){
			durationTimeRemainingSelectors[i].innerHTML = '00';
    }
  }

  function computeTimeRemaining( currentTime, songDuration ){
    let timeRemaining = '00:00';

    /*
      Initialize the total current seconds and total duration seconds
    */
    let totalCurrentSeconds = parseInt( currentTime.seconds ) + ( parseInt( currentTime.minutes ) * 60 ) + ( ( parseInt( currentTime.hours ) * 60 * 60 ) );
    let totalDurationSeconds = parseInt( songDuration.seconds ) + ( parseInt( songDuration.minutes ) * 60 ) + ( ( parseInt( songDuration.hours ) * 60 * 60 ) );

    /*
      If the two variables are numbers we continue the computing.
    */
    if( !isNaN( totalCurrentSeconds ) && !isNaN( totalDurationSeconds ) ){
      /*
        Find the total remaining seconds.
      */
      let timeRemainingTotalSeconds = totalDurationSeconds - totalCurrentSeconds;

      var remainingHours = Math.floor(timeRemainingTotalSeconds / 3600);
      var remainingMinutes = Math.floor((timeRemainingTotalSeconds - (remainingHours * 3600)) / 60);
      var remainingSeconds = timeRemainingTotalSeconds - (remainingHours * 3600) - (remainingMinutes * 60);

      timeRemaining = (remainingMinutes < 10 ? '0' + remainingMinutes : remainingMinutes) + ':' +
        (remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds);

      if(remainingHours > 0) {
        timeRemaining = remainingHours + ':' + timeRemaining;
      }
    }

    return timeRemaining;
  }

  return {
    sync: sync,
    resetTimes: resetTimes
  }
})();

export default DurationCountDownTimeElements
