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
|	syncCurrentMinutes( minutes )
|	syncCurrentSeconds( seconds )
|	syncCurrentTime( currentTime )
|	syncSongSliders( songPlayedPercentage )
|	syncSongTimeVisualizations( songPlayedPercentage )
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
		var hourSelectors = [
			'.amplitude-current-hours[amplitude-main-current-hours="true"]',
			'.amplitude-current-hours[amplitude-playlist-main-current-hours="'+config.active_playlist+'"]',
			'.amplitude-current-hours[amplitude-song-index="'+config.active_index+'"]'
		];

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
				currentHourSelectors[i].innerHTML = hours;
			}
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
		var minuteSelectors = [
			'.amplitude-current-minutes[amplitude-main-current-minutes="true"]',
			'.amplitude-current-minutes[amplitude-playlist-main-current-minutes="'+config.active_playlist+'"]',
			'.amplitude-current-minutes[amplitude-song-index="'+config.active_index+'"]'
		];

		/*
			Ensures that there are some minute selectors.
		*/
		if( document.querySelectorAll( minuteSelectors.join() ).length > 0 ){
			/*
				Get all of the minute selectors
			*/
			var currentMinuteSelectors = document.querySelectorAll( minuteSelectors.join() );

			/*
				Set the current minute selector's inner html to minutes passed in.
			*/
			for( var i = 0; i < currentMinuteSelectors.length; i++ ){
				currentMinuteSelectors[i].innerHTML = minutes;
			}
		}
	}

	/*--------------------------------------------------------------------------
		Updates any elements that display the current seconds for the song.

		@param int minutes An integer conaining how many seconds into
		the song.
	--------------------------------------------------------------------------*/
	function syncCurrentSeconds( seconds ){
		/*
			Gets all of the song second selectors.
		*/
		var secondSelectors = [
			'.amplitude-current-seconds[amplitude-main-current-seconds="true"]',
			'.amplitude-current-seconds[amplitude-playlist-main-current-seconds="'+config.active_playlist+'"]',
			'.amplitude-current-seconds[amplitude-song-index="'+config.active_index+'"]'
		];

		/*
			Ensures that there are some second selectors.
		*/
		if( document.querySelectorAll( secondSelectors.join() ).length > 0 ){
			/*
				Get all of the second selectors
			*/
			var currentSecondSelectors = document.querySelectorAll( secondSelectors.join() );

			/*
				Set the current second selector's inner html to seconds passed in.
			*/
			for( var i = 0; i < currentSecondSelectors.length; i++ ){
				currentSecondSelectors[i].innerHTML = seconds;
			}
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
			Ensures that there are some time selectors.
		*/
		if( document.querySelectorAll( timeSelectors.join() ).length > 0 ){
			/*
				Get all of the time selectors.
			*/
			var currentTimeSelectors = document.querySelectorAll( timeSelectors.join() );

			/*
				Set the time selector's inner html to the current time for the song. The current
				time is computed by joining minutes and seconds.
			*/
			for( var i = 0; i < currentTimeSelectors.length; i++ ){
				currentTimeSelectors[i].innerHTML = currentTime.minutes+':'+currentTime.seconds;
			}
		}
	}

	/*--------------------------------------------------------------------------
		Updates all of the song sliders which are the range inputs the
		user can interact with.

		@param float songPlayedPercentage The percentage of the song that
		has been played.
	--------------------------------------------------------------------------*/
	function syncSongSliders( songPlayedPercentage ){
		/*
			Gets all of the song sliders
		*/
		var songSliders = [
			'[amplitude-singular-song-slider="true"]',
			'input[amplitude-song-index="'+config.active_index+'"]'
		];

		/*
			Ensures that there are song sliders.
		*/
		if( document.querySelectorAll( songSliders.join() ).length > 0 ){
			/*
				Get all of the song sliders
			*/
			var songSliders = document.querySelectorAll( songSliders.join() );
			
			/*
				Iterate over the song time sliders and set their value
				the song played percentage.
			*/
			for( var i = 0; i < currentTimeSelectors.length; i++ ){
				songSliders[i].value = songPlayedPercentage;
			}
		}
	}

	/*--------------------------------------------------------------------------
		Updates all of the song time visualizaitons which are an expanding
		element that displays the percentage of the song that has been played.

		@param float songPlayedPercentage The percentage of the song that
		has been played.
	--------------------------------------------------------------------------*/
	function syncSongTimeVisualizations( songPlayedPercentage ){
		/*
			Gets all of the song time visualizations.
		*/
		var songTimeVisualizations = [
			'[amplitude-main-song-time-visualization="true"]',
			'.amplitude-song-time-visualization[amplitude-song-index="'+config.active_index+'"]'
		];

		/*
			Ensures that there are song time visualizations.
		*/
		if( document.querySelectorAll( songTimeVisualizations.join() ).length > 0 ){
			/*
				Get all of the song time visualizations.
			*/
			var songTimeVisualizations = document.querySelectorAll( songTimeVisualizations.join() );

			/*
				Iterate over the song time visualizations, compute the width of the inner
				element that displays the percentage of the song played.
			*/
			for( var i = 0; i < songTimeVisualizations.length; i++ ){
				var songTimeVisualizationStatus = songTimeVisualizations[i].querySelectorAll('.amplitude-song-time-visualization-status');
				var visualizationWidth 			= songTimeVisualizations[i].offsetWidth;
				var computedWidth 				= ( visualizationWidth * ( songPlayedPercentage / 100 ) );

				/*
					Set the inner element width to the computed width. This allows for the user
					to define the width of the outer element and this will fill proportionally.
				*/
				songTimeVisualizationStatus[0].setAttribute('style', 'width: ' + computedWidth + 'px');
			}
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
		syncSongSliders: syncSongSliders,
		syncSongTimeVisualizations: syncSongTimeVisualizations
	}
})();

export default AmplitudeVisualSyncHelpers