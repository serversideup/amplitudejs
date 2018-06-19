/**
 * Imports the config module
 * @module config
 */
import config from '../config.js';

/**
 * These methods help sync visual displays. They essentially make the visual sync
 * methods smaller and more maintainable.
 *
 * @module visual/AmplitudeVisualSyncHelpers
 */
let AmplitudeVisualSyncHelpers = (function() {
	/**
	 * Updates any elements that display the current hour for the song.
	 *
	 * @access public
	 * @param {number} hours 	- An integer conaining how many hours into the song.
	 */
	function syncCurrentHours( hours ){
		/*
			Gets all of the song hour selectors.
		*/
		let hourSelectors = [];

		if( config.active_playlist != null && config.active_playlist != '' ){
			hourSelectors = [
				'.amplitude-current-hours[amplitude-main-current-hours="true"]',
				'.amplitude-current-hours[amplitude-playlist-current-hours="true"][amplitude-playlist="'+config.active_playlist+'"]',
				'.amplitude-current-hours[amplitude-song-index="'+config.active_index+'"]'
			];
		}else{
			hourSelectors = [
				'.amplitude-current-hours[amplitude-main-current-hours="true"]',
				'.amplitude-current-hours[amplitude-song-index="'+config.active_index+'"]'
			];
		}

		/*
			Ensures that there are some hour selectors.
		*/
		if( document.querySelectorAll( hourSelectors.join() ).length > 0 ){
			/*
				Get all of the hour selectors
			*/
			const currentHourSelectors = document.querySelectorAll( hourSelectors.join() );

			/*
				Set the current hour selector's inner html to hours passed in.
			*/
			for( let i = 0; i < currentHourSelectors.length; i++ ){
				/*
					If the selector is a main selector, we set the hours.
				*/
				if( currentHourSelectors[i].getAttribute('amplitude-main-current-hours') == 'true' ){
					currentHourSelectors[i].innerHTML = hours;
				}else{
					/*
						If the active playlist is not null or empty
						and the attribute of the playlist is equal to the
						active playlist, then we set the inner html.
					*/
					if( config.active_playlist != ''
						&& config.active_playlist != null
						&& currentHourSelectors[i].getAttribute('amplitude-playlist') == config.active_playlist ){
							currentHourSelectors[i].innerHTML = hours;
					/*
						If the active playlist is not set and the selector
						does not have a playlist then we set the hours. This
						means that the current selector is an individual song
						selector.
					*/
					}else if( config.active_playlist == ''
						|| config.active_playlist == null
						&& !currentHourSelectors[i].hasAttribute('amplitude-playlist') ){
							currentHourSelectors[i].innerHTML = hours;
					/*
						If nothing else matches, set the selector's inner HTML to '00'
					*/
					}else{
						currentHourSelectors[i].innerHTML = '0';
					}
				}
			}
		}
	}

	/*--------------------------------------------------------------------------
		Resets the current hours displays to 0
	--------------------------------------------------------------------------*/
	function resetCurrentHours(){
		/*
			Gets the hour display elements
		*/
		let hourSelectors = document.querySelectorAll('.amplitude-current-hours');

		/*
			Iterates over all of the hour selectors and sets the inner HTML
			to 00.
		*/
		for( var i = 0; i < hourSelectors.length; i++ ){
			hourSelectors[i].innerHTML = '0';
		}
	}

	/**
	 * Updates any elements that display the current minutes for the song.
	 *
	 * @access public
	 * @param {number} minutes 	- An integer conaining how many minutes into the song.
	 */
	function syncCurrentMinutes( minutes ){
		/*
			Gets all of the song minute selectors.
		*/
		let minuteSelectors = [];

		if( config.active_playlist != null && config.active_playlist != '' ){
			minuteSelectors = [
				'.amplitude-current-minutes[amplitude-main-current-minutes="true"]',
				'.amplitude-current-minutes[amplitude-playlist-current-minutes="true"][amplitude-playlist="'+config.active_playlist+'"]',
				'.amplitude-current-minutes[amplitude-song-index="'+config.active_index+'"]'
			];
		}else{
			minuteSelectors = [
				'.amplitude-current-minutes[amplitude-main-current-minutes="true"]',
				'.amplitude-current-minutes[amplitude-song-index="'+config.active_index+'"]'
			];
		}

		/*
			Grabs the current minute selectors
		*/
    const currentMinuteSelectors = document.querySelectorAll( minuteSelectors.join() );

		/*
			Set the current minute selector's inner html to minutes passed in.
		*/
		for( let i = 0, l = currentMinuteSelectors.length; i < l; i++ ){
			/*
				If the selector is a main selector, we set the seconds.
			*/
			if( currentMinuteSelectors[i].getAttribute('amplitude-main-current-minutes') == 'true' ){
				currentMinuteSelectors[i].innerHTML = minutes;
			}else{
				/*
					If the active playlist is not null or empty
					and the attribute of the playlist is equal to the
					active playlist, then we set the inner html.
				*/
				if( config.active_playlist != ''
					&& config.active_playlist != null
					&& currentMinuteSelectors[i].getAttribute('amplitude-playlist') == config.active_playlist ){
						currentMinuteSelectors[i].innerHTML = minutes;
				/*
					If the active playlist is not set and the selector
					does not have a playlist then we set the minutes. This
					means that the current selector is an individual song
					selector.
				*/
				}else if( config.active_playlist == ''
					|| config.active_playlist == null
					&& !currentMinuteSelectors[i].hasAttribute('amplitude-playlist') ){
						currentMinuteSelectors[i].innerHTML = minutes;
				/*
					If nothing else matches, set the selector's inner HTML to '00'
				*/
				}else{
					currentMinuteSelectors[i].innerHTML = '00';
				}
			}
		}
	}

	/**
	 * Resets the current minutes displays to 00
	 *
	 * @access public
	 */
	function resetCurrentMinutes(){
		/*
			Gets the minutes display elements
		*/
		let minuteSelectors = document.querySelectorAll('.amplitude-current-minutes');

		/*
			Iterates over all of the minute selectors and sets the inner HTML
			to 00.
		*/
		for( let i = 0; i < minuteSelectors.length; i++ ){
			minuteSelectors[i].innerHTML = '00';
		}
	}

	/**
	 * Updates any elements that display the current seconds for the song.
	 *
	 * @access public
	 * @param {number} seconds	- An integer conaining how many seconds into the song.
	 */
	function syncCurrentSeconds( seconds ){
		/*
			Gets all of the song second selectors. If the active playlist
			is not null, then we get the playlist selectors.
		*/
		let secondSelectors = [];

		if( config.active_playlist != null && config.active_playlist != '' ){
			secondSelectors = [
				'.amplitude-current-seconds[amplitude-main-current-seconds="true"]',
				'.amplitude-current-seconds[amplitude-playlist-current-seconds="true"][amplitude-playlist="'+config.active_playlist+'"]',
				'.amplitude-current-seconds[amplitude-song-index="'+config.active_index+'"]'
			];
		}else{
			secondSelectors = [
				'.amplitude-current-seconds[amplitude-main-current-seconds="true"]',
				'.amplitude-current-seconds[amplitude-song-index="'+config.active_index+'"]'
			];
		}

    /*
    	Get all of the second selectors
    */
    const currentSecondSelectors = document.querySelectorAll( secondSelectors.join() );

    /*
    	Iterate over all of the second selectors.
    */
    for( let i = 0, l = currentSecondSelectors.length; i < l; i++ ){
    	/*
    		If the selector is a main selector, we set the seconds.
    	*/
    	if( currentSecondSelectors[i].getAttribute('amplitude-main-current-seconds') == 'true' ){
    		currentSecondSelectors[i].innerHTML = seconds;
    	}else{
    		/*
    			If the active playlist is not null or empty
    			and the attribute of the playlist is equal to the
    			active playlist, then we set the inner html.
    		*/
    		if( config.active_playlist != ''
    			&& config.active_playlist != null
    			&& currentSecondSelectors[i].getAttribute('amplitude-playlist') == config.active_playlist ){
    				currentSecondSelectors[i].innerHTML = seconds;
    		/*
    			If the active playlist is not set and the selector
    			does not have a playlist then we set the seconds. This
    			means that the current selector is an individual song
    			selector.
    		*/
    		}else if( config.active_playlist == ''
    			|| config.active_playlist == null
    			&& !currentSecondSelectors[i].hasAttribute('amplitude-playlist') ){
    				currentSecondSelectors[i].innerHTML = seconds;
    		/*
    			If nothing else matches, set the selector's inner HTML to '00'
    		*/
    		}else{
    			currentSecondSelectors[i].innerHTML = '00';
    		}
    	}
    }
	}

	/**
	 * Resets the current seconds displays to 00
	 *
	 * @access public
	 */
	function resetCurrentSeconds(){
		/*
			Gets the seconds display elements
		*/
		let secondSelectors = document.querySelectorAll('.amplitude-current-seconds');

		/*
			Iterates over all of the seconds selectors and sets the inner HTML
			to 00.
		*/
		for( let i = 0; i < secondSelectors.length; i++ ){
			secondSelectors[i].innerHTML = '00';
		}
	}

	/**
	 * Updates any elements that display the current time for the song. This
	 * is a computed field that will be commonly used.
	 *
	 * @access public
	 * @param {object} currentTime 	- A json object conaining the parts for the current time for the song.
	 */
	function syncCurrentTime( currentTime ){
		/*
			Gets all of the song time selectors.
		*/
		let timeSelectors = [
			'.amplitude-current-time[amplitude-main-current-time="true"]',
			'.amplitude-current-time[amplitude-playlist-main-current-time="'+config.active_playlist+'"]',
			'.amplitude-current-time[amplitude-song-index="'+config.active_index+'"]'
		];

		/*
			Get all of the time selectors.
		*/
		let currentTimeSelectors = document.querySelectorAll( timeSelectors.join() );

		/*
			Set the time selector's inner html to the current time for the song. The current
			time is computed by joining minutes and seconds.
		*/
		var timeText = currentTime.minutes+':'+currentTime.seconds;
		if ( currentTime.hours > 0 ) {
			timeText = currentTime.hours + ':' + timeText;
		}
		for( let i = 0, l=currentTimeSelectors.length; i < l; i++ ){
			currentTimeSelectors[i].innerHTML = timeText;
		}

	}

	/**
	 * Resets the current time displays to 00:00
	 *
	 * @access public
	 */
	function resetCurrentTime(){
		/*
			Gets the time selector display elements
		*/
		let timeSelectors = document.querySelectorAll('.amplitude-current-time');

		/*
			Iterates over all of the time selectors and sets the inner HTML
			to 00.
		*/
		for( let i = 0; i < timeSelectors.length; i++ ){
			timeSelectors[i].innerHTML = '00:00';
		}
	}

	/**
	 * Syncs the song played progress bars. These are HTML5 progress elements.
	 *
	 * @access private
	 * @param {number} songPlayedPercentage  	- The percentage of the song that has been played.
	 */
	function syncSongPlayedProgressBar( songPlayedPercentage ){
		syncMainSongPlayedProgressBars( songPlayedPercentage );
		syncPlaylistSongPlayedProgressBars( songPlayedPercentage );
		syncIndividualSongPlayedProgressBars( songPlayedPercentage );
	}

	/**
	 * Sync how much has been played with a progress bar. This is the main progress bar.
	 *
	 * @access private
	 * @param {number} songPlayedPercentage 	- The percent of the song completed.
	 */
	function syncMainSongPlayedProgressBars( songPlayedPercentage ){
		/*
			Ensure that the song completion percentage is a number
		*/
		if( !isNaN( songPlayedPercentage ) ){
			/*
				Get all of the song progress bars
			*/
			let songPlayedProgressBars = document.querySelectorAll('.amplitude-song-played-progress[amplitude-main-song-played-progress="true"]');

			for( let i = 0; i < songPlayedProgressBars.length; i++ ){
				let max = songPlayedProgressBars[i].max;

				songPlayedProgressBars[i].value = ( songPlayedPercentage / 100 ) * max;
			}
		}
	}

	/**
	 * Sync how much has been played with a progress bar. This is the playlist progress bar.
	 *
	 * @access public
	 * @param {number} songPlayedPercentage 	- The percent of the song completed.
	 */
	function syncPlaylistSongPlayedProgressBars( songPlayedPercentage ){
		/*
			Ensure that the song completion percentage is a number
		*/
		if( !isNaN( songPlayedPercentage ) ){
			/*
				Get all of the song progress bars
			*/
			let songPlayedProgressBars = document.querySelectorAll('.amplitude-song-played-progress[amplitude-playlist-song-played-progress="true"][amplitude-playlist="'+config.active_playlist+'"]');

			for( let i = 0; i < songPlayedProgressBars.length; i++ ){
				let max = songPlayedProgressBars[i].max;

				songPlayedProgressBars[i].value = ( songPlayedPercentage / 100 ) * max;
			}
		}
	}

	/**
	 * Sync how much has been played with a progress bar. This is for an individual song.
	 *
	 * @access private
	 * @param {number} songPlayedPercentage 	- The percent of the song completed.
	 */
	function syncIndividualSongPlayedProgressBars( songPlayedPercentage ){
		/*
			Ensure that the song completion percentage is a number
		*/
		if( !isNaN( songPlayedPercentage ) ){
			/*
				If the active playlist is not null, we get the individual song
				played progress for the playlist.
			*/
			if( config.active_playlist != '' && config.active_playlist != null ){
				/*
					Get all of the song progress bars
				*/
			 let songPlayedProgressBars = document.querySelectorAll('.amplitude-song-played-progress[amplitude-playlist="'+config.active_playlist+'"][amplitude-song-index="'+config.active_index+'"]');

				for( let i = 0; i < songPlayedProgressBars.length; i++ ){
				 let max = songPlayedProgressBars[i].max;

					songPlayedProgressBars[i].value = ( songPlayedPercentage / 100 ) * max;
				}
			}else{
				/*
					Get all of the song progress bars
				*/
				let songPlayedProgressBars = document.querySelectorAll('.amplitude-song-played-progress[amplitude-song-index="'+config.active_index+'"]');

				for( let i = 0; i < songPlayedProgressBars.length; i++ ){
					let max = songPlayedProgressBars[i].max;

					songPlayedProgressBars[i].value = ( songPlayedPercentage / 100 ) * max;
				}
			}
		}
	}

	/**
	 * Sets an element to be playing by removing the 'amplitude-paused' class
	 * and adding the 'amplitude-playing' class
	 *
	 * @access public
	 * @param {element} element 	- The element getting the playing class added.
	 */
	function setElementPlay( element ){
		element.classList.add('amplitude-playing');
		element.classList.remove('amplitude-paused');
	}

	/**
	 * Sets an element to be paused by adding the 'amplitude-paused' class
	 * and removing the 'amplitude-playing' class
	 *
	 * @access public
	 * @param {element} element 	- The element getting the paused class added.
	 */
	function setElementPause( element ){
		element.classList.remove('amplitude-playing');
		element.classList.add('amplitude-paused');
	}

	/**
	 * Updates any elements that display the duration hour for the song.
	 *
	 * @access public
	 * @param {number} hours 		- An integer conaining how many hours are in the song
	 */
	function syncDurationHours( hours ){
		/*
			Gets all of the song hour selectors.
		*/
		let hourSelectors = [];

		if( config.active_playlist != null && config.active_playlist != '' ){
			hourSelectors = [
				'.amplitude-duration-hours[amplitude-main-duration-hours="true"]',
				'.amplitude-duration-hours[amplitude-playlist-duration-hours="true"][amplitude-playlist="'+config.active_playlist+'"]',
				'.amplitude-duration-hours[amplitude-song-index="'+config.active_index+'"]'
			];
		}else{
			hourSelectors = [
				'.amplitude-duration-hours[amplitude-main-duration-hours="true"]',
				'.amplitude-duration-hours[amplitude-song-index="'+config.active_index+'"]'
			];
		}

		/*
			Ensures that there are some hour selectors.
		*/
		if( document.querySelectorAll( hourSelectors.join() ).length > 0 ){
			/*
				Get all of the hour selectors
			*/
			let durationHourSelectors = document.querySelectorAll( hourSelectors.join() );

			/*
				Set the duration hour selector's inner html to hours passed in.
			*/
			for( let i = 0; i < durationHourSelectors.length; i++ ){
				/*
					If the selector is a main selector, we set the hours.
				*/
				if( durationHourSelectors[i].getAttribute('amplitude-main-duration-hours') == 'true' ){
					durationHourSelectors[i].innerHTML = hours;
				}else{
					/*
						If the active playlist is not null or empty
						and the attribute of the playlist is equal to the
						active playlist, then we set the inner html.
					*/
					if( config.active_playlist != ''
						&& config.active_playlist != null
						&& durationHourSelectors[i].getAttribute('amplitude-playlist') == config.active_playlist ){
							durationHourSelectors[i].innerHTML = hours;
					/*
						If the active playlist is not set and the selector
						does not have a playlist then we set the hours. This
						means that the duration selector is an individual song
						selector.
					*/
					}else if( config.active_playlist == ''
						|| config.active_playlist == null
						&& !durationHourSelectors[i].hasAttribute('amplitude-playlist') ){
							durationHourSelectors[i].innerHTML = hours;
					/*
						If nothing else matches, set the selector's inner HTML to '00'
					*/
					}else{
						durationHourSelectors[i].innerHTML = '0';
					}
				}
			}
		}
	}

	/**
	 * Updates any elements that display the duration minutes for the song.
	 *
	 * @access public
	 * @param {number} minutes 	- An integer conaining how many minutes into the song.
	 */
	function syncDurationMinutes( minutes ){
		/*
			Gets all of the song minute selectors.
		*/
		let minuteSelectors = [];

		if( config.active_playlist != null && config.active_playlist != '' ){
			minuteSelectors = [
				'.amplitude-duration-minutes[amplitude-main-duration-minutes="true"]',
				'.amplitude-duration-minutes[amplitude-playlist-duration-minutes="true"][amplitude-playlist="'+config.active_playlist+'"]',
				'.amplitude-duration-minutes[amplitude-song-index="'+config.active_index+'"]'
			];
		}else{
			minuteSelectors = [
				'.amplitude-duration-minutes[amplitude-main-duration-minutes="true"]',
				'.amplitude-duration-minutes[amplitude-song-index="'+config.active_index+'"]'
			];
		}

		/*
			Get all of the minute selectors
		*/
		let durationMinuteSelectors = document.querySelectorAll( minuteSelectors.join() );

		/*
			Set the duration minute selector's inner html to minutes passed in.
		*/
		for( let i = 0; i < durationMinuteSelectors.length; i++ ){
			/*
				If the selector is a main selector, we set the seconds.
			*/
			if( durationMinuteSelectors[i].getAttribute('amplitude-main-duration-minutes') == 'true' ){
				durationMinuteSelectors[i].innerHTML = minutes;
			}else{
				/*
					If the active playlist is not null or empty
					and the attribute of the playlist is equal to the
					active playlist, then we set the inner html.
				*/
				if( config.active_playlist != ''
					&& config.active_playlist != null
					&& durationMinuteSelectors[i].getAttribute('amplitude-playlist') == config.active_playlist ){
						durationMinuteSelectors[i].innerHTML = minutes;
				/*
					If the active playlist is not set and the selector
					does not have a playlist then we set the minutes. This
					means that the duration selector is an individual song
					selector.
				*/
				}else if( config.active_playlist == ''
					|| config.active_playlist == null
					&& !durationMinuteSelectors[i].hasAttribute('amplitude-playlist') ){
						durationMinuteSelectors[i].innerHTML = minutes;
				/*
					If nothing else matches, set the selector's inner HTML to '00'
				*/
				}else{
					durationMinuteSelectors[i].innerHTML = '00';
				}
			}
		}

	}

	/**
	 * Updates any elements that display the duration seconds for the song.
	 *
	 * @access private
	 * @param {number} seconds 	- An integer conaining how many seconds into the song.
	 */
	function syncDurationSeconds( seconds ){
		/*
			Gets all of the song second selectors. If the active playlist
			is not null, then we get the playlist selectors.
		*/
		let secondSelectors = [];

		if( config.active_playlist != null && config.active_playlist != '' ){
			secondSelectors = [
				'.amplitude-duration-seconds[amplitude-main-duration-seconds="true"]',
				'.amplitude-duration-seconds[amplitude-playlist-duration-seconds="true"][amplitude-playlist="'+config.active_playlist+'"]',
				'.amplitude-duration-seconds[amplitude-song-index="'+config.active_index+'"]'
			];
		}else{
			secondSelectors = [
				'.amplitude-duration-seconds[amplitude-main-duration-seconds="true"]',
				'.amplitude-duration-seconds[amplitude-song-index="'+config.active_index+'"]'
			];
		}

		/*
			Get all of the second selectors
		*/
		let durationSecondSelectors = document.querySelectorAll( secondSelectors.join() );

		/*
			Iterate over all of the second selectors.
		*/
		for( let i = 0; i < durationSecondSelectors.length; i++ ){
			/*
				If the selector is a main selector, we set the seconds.
			*/
			if( durationSecondSelectors[i].getAttribute('amplitude-main-duration-seconds') == 'true' ){
				durationSecondSelectors[i].innerHTML = seconds;
			}else{
				/*
					If the active playlist is not null or empty
					and the attribute of the playlist is equal to the
					active playlist, then we set the inner html.
				*/
				if( config.active_playlist != ''
					&& config.active_playlist != null
					&& durationSecondSelectors[i].getAttribute('amplitude-playlist') == config.active_playlist ){
						durationSecondSelectors[i].innerHTML = seconds;
				/*
					If the active playlist is not set and the selector
					does not have a playlist then we set the seconds. This
					means that the duration selector is an individual song
					selector.
				*/
				}else if( config.active_playlist == ''
					|| config.active_playlist == null
					&& !durationSecondSelectors[i].hasAttribute('amplitude-playlist') ){
						durationSecondSelectors[i].innerHTML = seconds;
				/*
					If nothing else matches, set the selector's inner HTML to '00'
				*/
				}else{
					durationSecondSelectors[i].innerHTML = '00';
				}
			}
		}
	}

	/**
	 * Updates any elements that display the duration time for the song. This
	 * is a computed field that will be commonly used.
	 *
	 * @access public
	 * @param {object} durationTime 	- A json object conaining the parts for the duration time for the song.
	 */
	function syncDurationTime( durationTime ){
		/*
			Gets all of the song time selectors.
		*/
		let timeSelectors = [
			'.amplitude-duration-time[amplitude-main-duration-time="true"]',
			'.amplitude-duration-time[amplitude-playlist-main-duration-time="'+config.active_playlist+'"]',
			'.amplitude-duration-time[amplitude-song-index="'+config.active_index+'"]'
		];

		/*
			Get all of the time selectors.
		*/
		let durationTimeSelectors = document.querySelectorAll( timeSelectors.join() );

		/*
			Set the time selector's inner html to the duration time for the song. The duration
			time is computed by joining minutes and seconds.
		*/
		var durationText = '00:00';
		if( !isNaN( durationTime.minutes ) && !isNaN( durationTime.seconds ) ){
			durationText = durationTime.minutes+':'+durationTime.seconds;
			if( !isNaN( durationTime.hours ) && durationTime.hours > 0 ){
				durationText = durationTime.hours+':'+durationText;
			}
		}
		for( var i = 0; i < durationTimeSelectors.length; i++ ){
			durationTimeSelectors[i].innerHTML = durationText;
		}

	}

	/**
	 * Updates the elements that show how much time is remaining in the song.
	 *
	 * @access public
	 * @param {object} currentTime 	- A json object containing the parts for the current time for the song.
	 * @param {object} durationTime - A json object conaining the parts for the duration time for the song.
	 */
	function syncCountDownTime( currentTime, songDuration ){
		/*
			Initialize time remaining.
		*/
		let timeRemaining = '00:00';

		/*
			Ensure that all values are defined.
		*/
		if( currentTime != undefined && songDuration != undefined ){
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
		}

		/*
			Gets all of the song time selectors.
		*/
	 let timeSelectors = [
			'.amplitude-time-remaining[amplitude-main-time-remaining="true"]',
			'.amplitude-time-remaining[amplitude-playlist-main-time-remaining="'+config.active_playlist+'"]',
			'.amplitude-time-remaining[amplitude-song-index="'+config.active_index+'"]'
		];

		/*
			Get all of the time selectors.
		*/
	 let timeRemainingSelectors = document.querySelectorAll( timeSelectors.join() );

		/*
			Set the time selector's inner html to the duration time for the song. The duration
			time is computed by joining minutes and seconds.
		*/
		for( let i = 0; i < timeRemainingSelectors.length; i++ ){
			timeRemainingSelectors[i].innerHTML = timeRemaining;
		}
	}

	/*
		Return the publically available functions.
	*/
	return {
		syncCurrentHours: syncCurrentHours,
		syncCurrentMinutes: syncCurrentMinutes,
		syncCurrentSeconds: syncCurrentSeconds,
		syncCurrentTime: syncCurrentTime,
		resetCurrentHours: resetCurrentHours,
		resetCurrentMinutes: resetCurrentMinutes,
		resetCurrentSeconds: resetCurrentSeconds,
		resetCurrentTime: resetCurrentTime,
		syncSongPlayedProgressBar: syncSongPlayedProgressBar,
		setElementPlay: setElementPlay,
		setElementPause: setElementPause,
		syncDurationHours: syncDurationHours,
		syncDurationMinutes: syncDurationMinutes,
		syncDurationSeconds: syncDurationSeconds,
		syncDurationTime: syncDurationTime,
		syncCountDownTime: syncCountDownTime
	}
})();

export default AmplitudeVisualSyncHelpers
