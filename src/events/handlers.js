import config from '../config.js';
import AmplitudeEventHelpers from './helpers.js';
import AmplitudeVisualSync from '../visual/visual.js';
import AmplitudeCore from '../core/core.js';

/*
|-------------------------------------------------------------------------------
| EVENT HANDLER FUNCTIONS
|-------------------------------------------------------------------------------
| These functions handle the events that we bound to each element and
| prepare for a function to be called. These kind of act like filters/middleware.
|
| METHODS
|	updateTime()
|	songEnded()
|	play()
|	pause()
|	playPause()
|	stop()
|	mute()
|	volumeUp()
|	volumeDown()
|	songSlider()
|	volumeSlider()
|	next()
|	prev()
|	shuffle()
|	repeat()
|	playbackSpeed()
|	skipTo()
*/
export default {
	/*--------------------------------------------------------------------------
		Handles an update on the current song's time.
	--------------------------------------------------------------------------*/
	updateTime: function(){
		/*
			If the current song is not live, then
			we can update the time information. Otherwise the
			current time updates wouldn't mean much since the time
			is infinite.
		*/
		if( !config.active_metadata.live ){
			/*
				Compute the current time
			*/
			var currentTime = AmplitudeEventHelpers.computeCurrentTimes();

			/*
				Compute the song completion percentage
			*/
			var songCompletionPercentage = AmplitudeEventHelpers.computeSongCompletionPercentage();

			/*
				Sync the current time elements with the current
				location of the song.
			*/
			AmplitudeVisualSync.syncCurrentTime( currentTime, songCompletionPercentage );
		}
	},

	songEnded: function(){

	},

	play: function(){
		/*
			Gets the attribute for song index so we can check if
			there is a need to change the song.  In some scenarios
			there might be multiple play classes on the page. In that
			case it is possible the user could click a different play
			class and change the song.
		*/
		var playButtonSongIndex = this.getAttribute('amplitude-song-index');
		
		/*
			We set the new song if the user clicked a song with a different
			index. If it's the same as what's playing then we don't set anything. 
			If it's different we reset all song sliders.
		*/
		if( AmplitudeEventHelpers.checkNewSong( playButtonSongIndex ) ){
			//TODO: Implement change song method
			AmplitudeHelpers.changeSong( config.songs[ playButtonSongIndex ] );
		}

		// TODO: We should method this out so we can use it in the play/pause interaction

		/*
			Start the visualizations for the song. 
			AMPFX-TODO: MAKE HANDLED BY AMPLITUDE FX
		*/
		//privateStartVisualization();
		
		/*
			Play the song through the core play function.
		*/
		AmplitudeCore.play();
	},

	/*--------------------------------------------------------------------------
		Handles an event on a pause element.

		TODO: Check to see that the pause element has an index and if that
		index matches the current song being played.  If it's different then
		we should disable it? If the user clicks on song-index=1 pause and 
		song-index=2 is being played, is it right to pause?
	--------------------------------------------------------------------------*/
	pause: function(){
		AmplitudeCore.pause();
	},


	playPause: function(){
		/*--------------------------------------------------------------------------
			Plays or Pauses the current song. This is the logic for main play 
			pause buttons. This is the simplist implementation since it just plays
			or pauses the active song.
		--------------------------------------------------------------------------*/
		if( this.getAttribute( 'amplitude-main-play-pause' ) != null ){
			/*
				Determines what action we should take based on the
				state of the song.
			*/
			if( config.active_song.paused ){
				/*
					The song was paused so we sync visually for the song
					that is playing and we play the song.
				*/
				AmplitudeVisualSync.syncPlayPause( 'playing' );
				AmplitudeCore.play();
			}else{
				/*
					The song was playing so we sync visually for the song
					to be paused and we pause the song.
				*/
				AmplitudeVisualSync.syncPlayPause( 'paused' );
				AmplitudeCore.pause();
			}
		}else if( this.getAttribute('amplitude-playlist-main-play-pause') != null ){
			//privateEventHelperPlayPauseMainPlaylist( this.getAttribute('amplitude-playlist-main-play-pause') );
			/*
				Scenario 2: Play pause button for a playlist
					Check if play pause is for a different playlist.
					If the playlist is different, we go to the first song in the playlist or first
					song in the playlist shuffle array.
			*/
			//console.log( 'PLAYLIST: playlist -> '+playlist );
		}else{
			/*
				Scenario 1: Play pause button for an individual song
					if playlist != null
					Check if playlist changes
					Check if the song IDs change
					If paused, play. If playing, pause
			*/
			//console.log( 'INDIVIDUAL: index -> '+songIndex+' playlist -> '+playlist );
			//privateEventHelperPlayPauseSong( this.getAttribute('amplitude-song-index'), this.getAttribute('amplitude-playlist') );
		}
	},

	/*--------------------------------------------------------------------------
		Handles an event on a stop element.

		TODO: Before stopping, make sure that AmplitudeFX visualization
		is stopped as well.
	--------------------------------------------------------------------------*/
	stop: function(){
		AmplitudeCore.stop();
	},

	mute: function(){

	},

	volumeUp: function(){

	},

	volumeDown: function(){

	},

	songSlider: function(){

	},

	volumeSlider: function(){

	},

	next: function(){

	},

	prev: function(){

	},

	shuffle: function(){

	},

	repeat: function(){
		AmplitudeEventHelpers.setRepeat( !config.repeat );

		AmplitudeVisualSync.syncVisualRepeat();
	},

	playbackSpeed: function(){
		/*
			We increment the speed by .5 everytime we click
			the button to change the playback speed. Once we are
			actively playing back at 2, we start back at 1 which
			is normal speed.
		*/
		switch( config.playback_speed ){
			case 1: 
				AmplitudeEventHelpers.setPlaybackSpeed( 1.5 );
			break;
			case 1.5:
				AmplitudeEventHelpers.setPlaybackSpeed( 2 );
			break;
			case 2:
				AmplitudeEventHelpers.setPlaybackSpeed( 1 );
			break;
		}

		/*
			Visually sync the playback speed.
		*/
		AmplitudeVisualSync.syncPlaybackSpeed();
	},

	skipTo: function(){

	}
}