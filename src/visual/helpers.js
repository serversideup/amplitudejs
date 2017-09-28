import config from '../config.js';

/*
|-------------------------------------------------------------------------------
| VISUAL SYNC HELPER METHODS
|-------------------------------------------------------------------------------
| These methods help sync visual displays. They essentially make the visual sync
| methods smaller and more maintainable.
|
| METHODS
|	syncCurrentHours( hours )
|	resetCurrentHours()
|	syncCurrentMinutes( minutes )
|	resetCurrentMinutes()
|	syncCurrentSeconds( seconds )
|	resetCurrentSeconds()
|	syncCurrentTime( currentTime )
| syncCurrentHours( hours )
| syncCurrentMinutes( minutes )
| syncCurrentSeconds( seconds )
| syncCurrentTime( time )
|	resetCurrentTime()
|	setElementPlay( element )
|	setElementPause( element )
*/
var AmplitudeVisualSyncHelpers = (function() {
	/*--------------------------------------------------------------------------
		Updates any elements that display the current hour for the song.

		@param int hours An integer conaining how many hours into
		the song.
	--------------------------------------------------------------------------*/
	function syncCurrentHours( hours ){
		/*
			Gets all of the song hour selectors.
		*/
		if( config.active_playlist != null && config.active_playlist != '' ){
			var hourSelectors = [
				'.amplitude-current-hours[amplitude-main-current-hours="true"]',
				'.amplitude-current-hours[amplitude-playlist-current-hours="true"][amplitude-playlist="'+config.active_playlist+'"]',
				'.amplitude-current-hours[amplitude-song-index="'+config.active_index+'"]'
			];
		}else{
			var hourSelectors = [
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
			var currentHourSelectors = document.querySelectorAll( hourSelectors.join() );

			/*
				Set the current hour selector's inner html to hours passed in.
			*/
			for( var i = 0; i < currentHourSelectors.length; i++ ){
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
						currentHourSelectors[i].innerHTML = '00';
					}
				}
			}
		}
	}

	/*--------------------------------------------------------------------------
		Resets the current hours displays to 00
	--------------------------------------------------------------------------*/
	function resetCurrentHours(){
		/*
			Gets the hour display elements
		*/
		var hourSelectors = document.querySelectorAll('.amplitude-current-hours');

		/*
			Iterates over all of the hour selectors and sets the inner HTML
			to 00.
		*/
		for( var i = 0; i < hourSelectors.length; i++ ){
			hourSelectors[i].innerHTML = '00';
		}
	}

	/*--------------------------------------------------------------------------
		Updates any elements that display the current minutes for the song.

		@param int minutes An integer conaining how many minutes into
		the song.
	--------------------------------------------------------------------------*/
	function syncCurrentMinutes( minutes ){
		/*
			Gets all of the song minute selectors.
		*/
		if( config.active_playlist != null && config.active_playlist != '' ){
			var minuteSelectors = [
				'.amplitude-current-minutes[amplitude-main-current-minutes="true"]',
				'.amplitude-current-minutes[amplitude-playlist-current-minutes="true"][amplitude-playlist="'+config.active_playlist+'"]',
				'.amplitude-current-minutes[amplitude-song-index="'+config.active_index+'"]'
			];
		}else{
			var minuteSelectors = [
				'.amplitude-current-minutes[amplitude-main-current-minutes="true"]',
				'.amplitude-current-minutes[amplitude-song-index="'+config.active_index+'"]'
			];
		}

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

	/*--------------------------------------------------------------------------
		Resets the current minutes displays to 00
	--------------------------------------------------------------------------*/
	function resetCurrentMinutes(){
		/*
			Gets the minutes display elements
		*/
		var minuteSelectors = document.querySelectorAll('.amplitude-current-minutes');

		/*
			Iterates over all of the minute selectors and sets the inner HTML
			to 00.
		*/
		for( var i = 0; i < minuteSelectors.length; i++ ){
			minuteSelectors[i].innerHTML = '00';
		}
	}

	/*--------------------------------------------------------------------------
		Updates any elements that display the current seconds for the song.

		@param int minutes An integer conaining how many seconds into
		the song.
	--------------------------------------------------------------------------*/
	function syncCurrentSeconds( seconds ){
		/*
			Gets all of the song second selectors. If the active playlist
			is not null, then we get the playlist selectors.
		*/
		if( config.active_playlist != null && config.active_playlist != '' ){
			var secondSelectors = [
				'.amplitude-current-seconds[amplitude-main-current-seconds="true"]',
				'.amplitude-current-seconds[amplitude-playlist-current-seconds="true"][amplitude-playlist="'+config.active_playlist+'"]',
				'.amplitude-current-seconds[amplitude-song-index="'+config.active_index+'"]'
			];
		}else{
			var secondSelectors = [
				'.amplitude-current-seconds[amplitude-main-current-seconds="true"]',
				'.amplitude-current-seconds[amplitude-song-index="'+config.active_index+'"]'
			];
		}


	        /*
	        	Get all of the second selectors
	        */
	        var currentSecondSelectors = document.querySelectorAll( secondSelectors.join() );

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

	/*--------------------------------------------------------------------------
		Resets the current seconds displays to 00
	--------------------------------------------------------------------------*/
	function resetCurrentSeconds(){
		/*
			Gets the seconds display elements
		*/
		var secondSelectors = document.querySelectorAll('.amplitude-current-seconds');

		/*
			Iterates over all of the seconds selectors and sets the inner HTML
			to 00.
		*/
		for( var i = 0; i < secondSelectors.length; i++ ){
			secondSelectors[i].innerHTML = '00';
		}
	}

	/*--------------------------------------------------------------------------
		Updates any elements that display the current time for the song. This
		is a computed field that will be commonly used.

		@param JSON currentTime A json object conaining the parts for the
		current time for the song.
	--------------------------------------------------------------------------*/
	function syncCurrentTime( currentTime ){
		/*
			Gets all of the song time selectors.
		*/
		var timeSelectors = [
			'.amplitude-current-time[amplitude-main-current-time="true"]',
			'.amplitude-current-time[amplitude-playlist-main-current-time="'+config.active_playlist+'"]',
			'.amplitude-current-time[amplitude-song-index="'+config.active_index+'"]'
		];

		/*
			Get all of the time selectors.
		*/
		var currentTimeSelectors = document.querySelectorAll( timeSelectors.join() );

		/*
			Set the time selector's inner html to the current time for the song. The current
			time is computed by joining minutes and seconds.
		*/
		for( let i = 0, l=currentTimeSelectors.length; i < l; i++ ){
			currentTimeSelectors[i].innerHTML = currentTime.minutes+':'+currentTime.seconds;
		}

	}

	/*--------------------------------------------------------------------------
		Resets the current time displays to 00:00
	--------------------------------------------------------------------------*/
	function resetCurrentTime(){
		/*
			Gets the time selector display elements
		*/
		var timeSelectors = document.querySelectorAll('.amplitude-current-time');

		/*
			Iterates over all of the time selectors and sets the inner HTML
			to 00.
		*/
		for( var i = 0; i < timeSelectors.length; i++ ){
			timeSelectors[i].innerHTML = '00:00';
		}
	}

	/*--------------------------------------------------------------------------
		Syncs the song played progress bars. These are HTML5 progress elements.
	--------------------------------------------------------------------------*/
	function syncSongPlayedProgressBar( songPlayedPercentage ){
		syncMainSongPlayedProgressBars( songPlayedPercentage );
		syncPlaylistSongPlayedProgressBars( songPlayedPercentage );
		syncIndividualSongPlayedProgressBars( songPlayedPercentage );
	}

	/*--------------------------------------------------------------------------
		Sync how much has been played with a progress bar. This is the main progress
		bar.

		@param float songPlayedPercentage The percent of the song completed.
	--------------------------------------------------------------------------*/
	function syncMainSongPlayedProgressBars( songPlayedPercentage ){
		/*
			Ensure that the song completion percentage is a number
		*/
		if( !isNaN( songPlayedPercentage ) ){
			/*
				Get all of the song progress bars
			*/
			var songPlayedProgressBars = document.querySelectorAll('.amplitude-song-played-progress[amplitude-main-song-played-progress="true"]');

			for( var i = 0; i < songPlayedProgressBars.length; i++ ){
				var max = songPlayedProgressBars[i].max;

				songPlayedProgressBars[i].value = ( songPlayedPercentage / 100 ) * max;
			}
		}
	}

	/*--------------------------------------------------------------------------
		Sync how much has been played with a progress bar. This is the playlist progress
		bar.

		@param float songPlayedPercentage The percent of the song completed.
	--------------------------------------------------------------------------*/
	function syncPlaylistSongPlayedProgressBars( songPlayedPercentage ){
		/*
			Ensure that the song completion percentage is a number
		*/
		if( !isNaN( songPlayedPercentage ) ){
			/*
				Get all of the song progress bars
			*/
			var songPlayedProgressBars = document.querySelectorAll('.amplitude-song-played-progress[amplitude-playlist-song-played-progress="true"][amplitude-playlist="'+config.active_playlist+'"]');

			for( var i = 0; i < songPlayedProgressBars.length; i++ ){
				var max = songPlayedProgressBars[i].max;

				songPlayedProgressBars[i].value = ( songPlayedPercentage / 100 ) * max;
			}
		}
	}

	/*--------------------------------------------------------------------------
		Sync how much has been played with a progress bar. This is for an individual
		song.

		@param float songPlayedPercentage The percent of the song completed.
	--------------------------------------------------------------------------*/
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
				var songPlayedProgressBars = document.querySelectorAll('.amplitude-song-played-progress[amplitude-playlist="'+config.active_playlist+'"][amplitude-song-index="'+config.active_index+'"]');

				for( var i = 0; i < songPlayedProgressBars.length; i++ ){
					var max = songPlayedProgressBars[i].max;

					songPlayedProgressBars[i].value = ( songPlayedPercentage / 100 ) * max;
				}
			}else{
				/*
					Get all of the song progress bars
				*/
				var songPlayedProgressBars = document.querySelectorAll('.amplitude-song-played-progress[amplitude-song-index="'+config.active_index+'"]');

				for( var i = 0; i < songPlayedProgressBars.length; i++ ){
					var max = songPlayedProgressBars[i].max;

					songPlayedProgressBars[i].value = ( songPlayedPercentage / 100 ) * max;
				}
			}
		}
	}

	/*--------------------------------------------------------------------------
		Sets an element to be playing by removing the 'amplitude-paused' class
		and adding the 'amplitude-playing' class

		@param element element The element getting the playing class added.
	--------------------------------------------------------------------------*/
	function setElementPlay( element ){
		element.classList.add('amplitude-playing');
		element.classList.remove('amplitude-paused');
	}

	/*--------------------------------------------------------------------------
		Sets an element to be paused by adding the 'amplitude-paused' class
		and removing the 'amplitude-playing' class

		@param element element The element getting the paused class added.
	--------------------------------------------------------------------------*/
	function setElementPause( element ){
		element.classList.remove('amplitude-playing');
		element.classList.add('amplitude-paused');
	}

	/*--------------------------------------------------------------------------
		Updates any elements that display the duration hour for the song.

		@param int hours An integer conaining how many hours are in the song
	--------------------------------------------------------------------------*/
	function syncDurationHours( hours ){
		/*
			Gets all of the song hour selectors.
		*/
		if( config.active_playlist != null && config.active_playlist != '' ){
			var hourSelectors = [
				'.amplitude-duration-hours[amplitude-main-duration-hours="true"]',
				'.amplitude-duration-hours[amplitude-playlist-duration-hours="true"][amplitude-playlist="'+config.active_playlist+'"]',
				'.amplitude-duration-hours[amplitude-song-index="'+config.active_index+'"]'
			];
		}else{
			var hourSelectors = [
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
			var durationHourSelectors = document.querySelectorAll( hourSelectors.join() );

			/*
				Set the duration hour selector's inner html to hours passed in.
			*/
			for( var i = 0; i < durationHourSelectors.length; i++ ){
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
						durationHourSelectors[i].innerHTML = '00';
					}
				}
			}
		}
	}

		/*--------------------------------------------------------------------------
		Updates any elements that display the duration minutes for the song.

		@param int minutes An integer conaining how many minutes into
		the song.
	--------------------------------------------------------------------------*/
	function syncDurationMinutes( minutes ){
		/*
			Gets all of the song minute selectors.
		*/
		if( config.active_playlist != null && config.active_playlist != '' ){
			var minuteSelectors = [
				'.amplitude-duration-minutes[amplitude-main-duration-minutes="true"]',
				'.amplitude-duration-minutes[amplitude-playlist-duration-minutes="true"][amplitude-playlist="'+config.active_playlist+'"]',
				'.amplitude-duration-minutes[amplitude-song-index="'+config.active_index+'"]'
			];
		}else{
			var minuteSelectors = [
				'.amplitude-duration-minutes[amplitude-main-duration-minutes="true"]',
				'.amplitude-duration-minutes[amplitude-song-index="'+config.active_index+'"]'
			];
		}



		/*
			Get all of the minute selectors
		*/
		var durationMinuteSelectors = document.querySelectorAll( minuteSelectors.join() );

		/*
			Set the duration minute selector's inner html to minutes passed in.
		*/
		for( var i = 0; i < durationMinuteSelectors.length; i++ ){
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

		/*--------------------------------------------------------------------------
		Updates any elements that display the duration seconds for the song.

		@param int minutes An integer conaining how many seconds into
		the song.
	--------------------------------------------------------------------------*/
	function syncDurationSeconds( seconds ){
		/*
			Gets all of the song second selectors. If the active playlist
			is not null, then we get the playlist selectors.
		*/
		if( config.active_playlist != null && config.active_playlist != '' ){
			var secondSelectors = [
				'.amplitude-duration-seconds[amplitude-main-duration-seconds="true"]',
				'.amplitude-duration-seconds[amplitude-playlist-duration-seconds="true"][amplitude-playlist="'+config.active_playlist+'"]',
				'.amplitude-duration-seconds[amplitude-song-index="'+config.active_index+'"]'
			];
		}else{
			var secondSelectors = [
				'.amplitude-duration-seconds[amplitude-main-duration-seconds="true"]',
				'.amplitude-duration-seconds[amplitude-song-index="'+config.active_index+'"]'
			];
		}


		/*
			Get all of the second selectors
		*/
		var durationSecondSelectors = document.querySelectorAll( secondSelectors.join() );

		/*
			Iterate over all of the second selectors.
		*/
		for( var i = 0; i < durationSecondSelectors.length; i++ ){
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

	/*--------------------------------------------------------------------------
		Updates any elements that display the duration time for the song. This
		is a computed field that will be commonly used.

		@param JSON durationTime A json object conaining the parts for the
		duration time for the song.
	--------------------------------------------------------------------------*/
	function syncDurationTime( durationTime ){
		/*
			Gets all of the song time selectors.
		*/
		var timeSelectors = [
			'.amplitude-duration-time[amplitude-main-duration-time="true"]',
			'.amplitude-duration-time[amplitude-playlist-main-duration-time="'+config.active_playlist+'"]',
			'.amplitude-duration-time[amplitude-song-index="'+config.active_index+'"]'
		];

		/*
			Get all of the time selectors.
		*/
		var durationTimeSelectors = document.querySelectorAll( timeSelectors.join() );

		/*
			Set the time selector's inner html to the duration time for the song. The duration
			time is computed by joining minutes and seconds.
		*/
		for( var i = 0; i < durationTimeSelectors.length; i++ ){
			if( !isNaN( durationTime.minutes ) && !isNaN( durationTime.seconds ) ){
				durationTimeSelectors[i].innerHTML = durationTime.minutes+':'+durationTime.seconds;
			}else{
				durationTimeSelectors[i].innerHTML = '00:00';
			}
		}

	}

	/*--------------------------------------------------------------------------
		Updates the elements that show how much time is remaining in the song.

		@param JSON currentTime A json object containing the parts for the current
		time for the song.

		@param JSON durationTime A json object conaining the parts for the
		duration time for the song.
	--------------------------------------------------------------------------*/
	function syncCountDownTime( currentTime, songDuration ){
		/*
			Initialize time remaining.
		*/
		var timeRemaining = '00:00';

		/*
			Ensure that all values are defined.
		*/
		if( currentTime != undefined && songDuration != undefined ){
			/*
				Initialize the total current seconds and total duration seconds
			*/
			var totalCurrentSeconds = parseInt( currentTime.seconds ) + ( parseInt( currentTime.minutes ) * 60 ) + ( ( parseInt( currentTime.hours ) * 60 * 60 ) );
			var totalDurationSeconds = parseInt( songDuration.seconds ) + ( parseInt( songDuration.minutes ) * 60 ) + ( ( parseInt( songDuration.hours ) * 60 * 60 ) );

			/*
				If the two variables are numbers we continue the computing.
			*/
			if( !isNaN( totalCurrentSeconds ) && !isNaN( totalDurationSeconds ) ){
				/*
					Find the total remaining seconds.
				*/
				var timeRemainingTotalSeconds = totalDurationSeconds - totalCurrentSeconds;

				/*
					Find how many seconds are remaining.
				*/
				var timeRemainingSeconds = ( Math.floor( timeRemainingTotalSeconds % 60 ) < 10 ? '0' : '' ) +
											  		Math.floor( timeRemainingTotalSeconds % 60 );

				/*
					Find how many minutes are remaining.
				*/
				var timeRemainingMinutes = ( Math.floor( timeRemainingTotalSeconds / 60 ) < 10 ? '0' : '' ) +
															Math.floor( timeRemainingTotalSeconds / 60 );

				/*
					Build the time remaining.
				*/
				timeRemaining = timeRemainingMinutes+':'+timeRemainingSeconds;
			}
		}

		/*
			Gets all of the song time selectors.
		*/
		var timeSelectors = [
			'.amplitude-time-remaining[amplitude-main-time-remaining="true"]',
			'.amplitude-time-remaining[amplitude-playlist-main-time-remaining="'+config.active_playlist+'"]',
			'.amplitude-time-remaining[amplitude-song-index="'+config.active_index+'"]'
		];

		/*
			Get all of the time selectors.
		*/
		var timeRemainingSelectors = document.querySelectorAll( timeSelectors.join() );

		/*
			Set the time selector's inner html to the duration time for the song. The duration
			time is computed by joining minutes and seconds.
		*/
		for( var i = 0; i < timeRemainingSelectors.length; i++ ){
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
