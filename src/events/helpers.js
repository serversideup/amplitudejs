import config from '../config.js';

/*
|-------------------------------------------------------------------------------
| EVENT HANDLER HELPER METHODS
|-------------------------------------------------------------------------------
| These methods help handle interactions whether it's computation or shuffling 
| songs.
|
| METHODS
|	computeCurrentTimes()
|	computeSongDuration()
|	computeSongCompletionPercentage()
*/
var AmplitudeEventHelpers = (function() {
	/*--------------------------------------------------------------------------
		Computes the current song time. Breaks down where the song is into
		hours, minutes, seconds and formats it to be displayed to the user.
	--------------------------------------------------------------------------*/
	function computeCurrentTimes(){
		/*
			Initialize the current time object that will be returned.
		*/
		var currentTime = {};

		/*
			Computes the current seconds for the song.
		*/
		var currentSeconds = ( Math.floor( config.active_song.currentTime % 60 ) < 10 ? '0' : '' ) + 
							    Math.floor( config.active_song.currentTime % 60 );

		/*
			Computes the current minutes for the song.
		*/
		var currentMinutes = Math.floor( config.active_song.currentTime / 60 );

		/*
			Initialize the current hours variable.
		*/
		var currentHours = '00';

		/*
			If the current minutes is less than 10, we add a leading 0.
		*/
		if( currentMinutes < 10 ){
			currentMinutes = '0'+currentMinutes;
		}

		/*
			If the user is more than 60 minutes into the song, then
			we extract the hours.
		*/
		if( currentMinutes > 60 ){
			currentHours 		= Math.floor( currentMinutes / 60 );
			currentMinutes 		= currentMinutes % 60;

			/*
				If the user is less than 10 hours in, we append the
				additional 0 to the hours.
			*/
			if( currentHours < 10 ){
				currentHours = '0'+currentHours;
			}

			/*
				If the user is less than 10 minutes in, we append the
				additional 0 to the minutes.
			*/
			if( currentMinutes < 10 ){
				currentMinutes = '0'+currentMinutes;
			}
		}

		/*
			Build a clean current time object and send back the appropriate information.
		*/
		currentTime.seconds = currentSeconds;
		currentTime.minutes = currentMinutes;
		currentTime.hours 	= currentHours;

		return currentTime;
	}

	/*--------------------------------------------------------------------------
		Computes the current song duration. Breaks down where the song is into
		hours, minutes, seconds and formats it to be displayed to the user.
	--------------------------------------------------------------------------*/
	function computeSongDuration(){
		/*
			Initialize the song duration object that will be returned.
		*/
		var songDuration = {};

		/*
			Computes the duration of the song's seconds.
		*/
		var songDurationSeconds = ( Math.floor( config.active_song.duration % 60 ) < 10 ? '0' : '' ) + 
									  		Math.floor( config.active_song.duration % 60 );

		/*
			Computes the duration of the song's minutes.
		*/
		var songDurationMinutes = Math.floor( config.active_song.duration / 60 );

		/*
			Initialize the hours duration variable.
		*/
		var songDurationHours = '00';

		/*
			If the song duration minutes is less than 10, we add a leading 0.
		*/
		if( songDurationMinutes < 10 ){
			songDurationMinutes = '0'+songDurationMinutes;
		}
		
		/*
			If there is more than 60 minutes in the song, then we
			extract the hours.
		*/
		if( songDurationMinutes > 60 ){
			songDurationHours 		= Math.floor( songDurationMinutes / 60 ); 
			songDurationMinutes 	= songDurationMinutes % 60;

			/*
				If the song duration hours is less than 10 we append
				the additional 0.
			*/
			if( songDurationHours < 10 ){
				songDurationHours = '0'+songDurationHours;
			}

			/*
				If the song duration minutes is less than 10 we append
				the additional 0.
			*/
			if( songDurationMinutes < 10 ){
				songDurationMinutes = '0'+songDurationMinutes;
			}
		}

		/*
			Build a clean song duration object and send back the appropriate information.
		*/
		songDuration.seconds 	= songDurationSeconds;
		songDuration.minutes 	= songDurationMinutes;
		songDuration.hours 		= songDurationHours;

		return songDuration;
	}

	/*--------------------------------------------------------------------------
		Computes the song completion percentage.
	--------------------------------------------------------------------------*/
	function computeSongCompletionPercentage(){
		return ( config.active_song.currentTime / config.active_song.duration ) * 100;
	}

	/*--------------------------------------------------------------------------
		Sets the current song's playback speed

		@param int speed The float with a base of 1 representing the speed
	--------------------------------------------------------------------------*/
	function setPlaybackSpeed( speed ){
		config.playback_speed = speed;
	}

	/*--------------------------------------------------------------------------
		Sets the state of the repeat for the current song.

		@param bool repeat A boolean representing whether the repeat should
		be on or off
	--------------------------------------------------------------------------*/
	function setRepeat( repeat ){
		config.repeat = repeat;
	}

	/*
		Return the publically scoped functions
	*/
	return {
		computeCurrentTimes: computeCurrentTimes,
		computeSongDuration: computeSongDuration,
		computeSongCompletionPercentage: computeSongCompletionPercentage,
		setPlaybackSpeed: setPlaybackSpeed,
		setRepeat: setRepeat
	}
})();

export default AmplitudeEventHelpers