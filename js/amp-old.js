/*
	Version: 1.1
	Author: Dan Pastori
	Company: 521 Dimensions
*/

/*
|--------------------------------------------------------------------------
| Defaults for Amplitude
|--------------------------------------------------------------------------
|	amplitude_active_song
|		This is the current song playing. No matter if it's playlist or
|		single song, this is the reference.
|
|	amplitude_volume
|		The song volume ranges between 0 and 1 which correspond accordingly 
|		to 0% to 100%
|
|	amplitude_pre_mute_volume
|		Handles the last volume that was set on amplitude so when the
|		current song is un-muted it goes back to the volume it was
|		previously at.
|	
|	amplitude_volume_meter_slider_flag
|		Set to true when the user is sliding the volume meter
|
|	amplitude_song_time_slider_flag
|		Set to true when the user is sliding the song time slider
*/
/*
Possibly fire on change? So when the song
changes it changes the event listener to signal on ended
*/

var amplitude_active_config = {
	"amplitude_active_song": null,
	"amplitude_volume": .5,
	"amplitude_pre_mute_volume": .5,
	"amplitude_volume_meter_slider_flag": false,
	"amplitude_song_time_slider_flag": false,
	"amplitude_auto_play": false,
	"amplitude_song": {},
	"amplitude_songs": {},
	"amplitude_playlist": {},
	"amplitude_delay_between_songs": 0,
	"amplitude_shuffle": false,
	"amplitude_shuffle_list": {},
	"amplitude_start_song": null,
	"amplitude_before_play_callback": null,
	"amplitude_after_play_callback": null,
	"amplitude_before_stop_callback": null,
	"amplitude_after_stop_callback": null
};

/*
|--------------------------------------------------------------------------
| Active Song Information
|--------------------------------------------------------------------------
| Contains the information for the active song. This makes it accessible
| to the application utilizing AmplitudeJS
|	
|	cover_art_url
|
|	artist
|
|	album
|
|	song_title
|
|	song_url
|
|
*/
var amplitude_active_song_information = {
	"cover_art_url": null,
	"artist": null,
	"album": null,
	"song_title": null,
	"song_url": null
};
//http://www.binarytides.com/using-html5-audio-element-javascript/
//amplitude_active_config.amplitude_active_song = new Audio('songs/In%20Search%20Of%20EP/03%20Porch%20Stomp%20Blues.mp3');
//amplitude_active_config.amplitude_active_song.play();
/*
|--------------------------------------------------------------------------
| Initializers
|--------------------------------------------------------------------------
| Sets up amplitude on load. 
|	
|	hook_amplitude_functions
|		Calls the method that binds a group of events to the onload of the
|		window function.  This will pick up the amplitude elements and bind
|		them to certain events.
|		
|		Thanks to: http://www.htmlgoodies.com/beyond/javascript/article.php/3724571/Using-Multiple-JavaScript-Onload-Functions.htm
|
|	amplitude_configuration
|		Sets up amplitude to work with the user config provided. This sets
|		up songs and 
|
|	amplitude_web_desktop
|		Binds events to elements for clicks
|	
|	amplitude_web_mobile
|		Binds events to elements for touch
|
|	
*/

hook_amplitude_functions( amplitude_configure_variables );

hook_amplitude_functions( amplitude_web_desktop );

hook_amplitude_functions( amplitude_web_mobile );

hook_amplitude_functions( amplitude_start );

/*
Amplitude live callback functions hook up
*/
//hook_amplitude_functions(amplitude_live_callback_hooks);

/*
Add Action Handlers

*/

function hook_amplitude_functions( func ) {
	var oldonload = window.onload;
	
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
			/*
			if( typeof amplitude_config != 'undefined' ){
				if( typeof amplitude_config.amplitude_auto_play != 'undefined' && amplitude_config.amplitude_auto_play ){
					if( typeof amplitude_config.start_song_id != 'undefined' ){
						if(document.getElementById('amplitude-play-pause')){
							amplitude_play_pause();
						}else{
							amplitude_play(amplitude_config.start_song_id);
						}
					}else{
						if(document.getElementById('amplitude-play-pause')){
							amplitude_play_pause();
						}else{
							var playlist = document.getElementById('amplitude-playlist');
							if (playlist != null){
								if(amplitude_shuffle == true){
									amplitude_play(amplitude_shuffle_list[0]);
								}else{
									//Plays top of playlist if no start song id
									amplitude_play(document.getElementById('amplitude-playlist').getElementsByTagName('audio')[0].getAttribute('id'));
								}
							}else{
								amplitude_play(document.getElementsByTagName('audio')[0].getAttribute('id'));
							}
						}
					}
				}
			}*/
		}
	}
}

/*
|--------------------------------------------------------------------------
| Initialize
|--------------------------------------------------------------------------
| Configures the environment based off of the users preferences.
|	
*/
function amplitude_configure_variables(){
	amplitude_active_config.amplitude_active_song = new Audio( );

	if( amplitude_config.amplitude_song != 'undefined' ){
		amplitude_active_config.amplitude_song = amplitude_config.amplitude_song;
	}

	if( amplitude_config.amplitude_songs != 'undefined' ){
		amplitude_active_config.amplitude_songs = amplitude_config.amplitude_songs;
	}

	if( amplitude_config.amplitude_playlist != 'undefined' ){
		amplitude_active_config.amplitude_playlist = amplitude_config.amplitude_playlist;
	}

	if( amplitude_config.amplitude_volume != 'undefined' ){
		amplitude_active_config.amplitude_volume = amplitude_config.amplitude_volume;
		amplitude_active_config.amplitude_pre_mute_volume = amplitude_config.amplitude_volume;
	}

	if( amplitude_config.amplitude_pre_mute_volume != 'undefined' ){
		amplitude_active_config.amplitude_pre_mute_volume = amplitude_config.amplitude_pre_mute_volume;
	}

	if( amplitude_config.amplitude_auto_play != 'undefined' ){
		amplitude_active_config.amplitude_auto_play = amplitude_config.amplitude_auto_play;
	}

	if( amplitude_config.amplitude_start_song != 'undefined' ){
		amplitude_active_config.amplitude_start_song = amplitude_config.amplitude_start_song;
	}

	if( amplitude_config.amplitude_before_play_callback != 'undefined' ){
		amplitude_active_config.amplitude_before_play_callback = amplitude_config.amplitude_before_play_callback;
	}

	if( amplitude_config.amplitude_after_play_callback != 'undefined' ){
		amplitude_active_config.amplitude_after_play_callback = amplitude_config.amplitude_after_play_callback;
	}

	if( amplitude_config.amplitude_before_stop_callback != 'undefined' ){
		amplitude_active_config.amplitude_before_stop_callback = amplitude_config.amplitude_before_stop_callback;
	}

	if( amplitude_config.amplitude_after_stop_callback != 'undefined' ){
		amplitude_active_config.amplitude_after_stop_callback = amplitude_config.amplitude_after_stop_callback;
	} 
	/*
		If there is a start song definition, we follow the definition otherwise, we go in order of:
		1. Individual Song
		2. Songs array position 1
		3. Play list array position 1
	*/
	if( amplitude_active_config.amplitude_start_song != null ){
		switch( amplitude_active_config.amplitude_start_song.type ){
			case 'song':
				amplitude_active_config.amplitude_active_song.src = amplitude_active_config.amplitude_song.url;
			break;
			case 'songs':
				amplitude_active_config.amplitude_active_song.src = amplitude_active_config.amplitude_songs[amplitude_active_config.amplitude_start_song.position].url;
			break;
			case 'playlist':
				amplitude_active_config.amplitude_active_song.src = amplitude_active_config.amplitude_playlist[amplitude_active_config.amplitude_start_song.position].url;
			break;
		}
	}else{
		if( amplitude_active_config.amplitude_song.length != 0 ){
			amplitude_active_config.amplitude_active_song.src = amplitude_active_config.amplitude_song.url;
		}else if( amplitude_active_config.amplitude_songs.length != 0 ){
			amplitude_active_config.amplitude_active_song.src = amplitude_active_config.amplitude_songs[0].url;
		}else if( amplitude_active_config.amplitude_playlist.length != 0 ){
			amplitude_active_config.amplitude_active_song.src = amplitude_active_config.amplitude_playlist[0].url;
		}else{
			console.log("Please define a song, plalist, or array of song");
		}
	}

	if( amplitude_active_config.amplitude_start_song.live == 'undefined' ){
		amplitude_active_config.amplitude_start_song.live = false;
	}
}
/*
|--------------------------------------------------------------------------
| Web Desktop Event Handlers
|--------------------------------------------------------------------------
| Binds Amplitude events for web desktop ( click events )
|	
|	amplitude-play
|
|	amplitude-pause
|
|	amplitude-play-pause
|
|	amplitude-stop
|
|	amplitude-volume-up
|
|	amplitude-volume-down
|
|	amplitude-volume-meter
|	
|	amplitude-song-slider
|
|	amplitude-mute
|
|	amplitude-next
|
|	amplitude-previous
|
|	amplitude-shuffle
|
*/
function amplitude_web_desktop() {
	//Sets the Play button functionality
	if(document.getElementById('amplitude-play')){
		document.getElementById('amplitude-play').addEventListener('click', function() {
			//Need to add information regarding what we should play. AKA amplitude-playlist-song or amplitude-song
			amplitude_play_song();
		});
	}

	//Sets the Stop button functionality
	if(document.getElementById('amplitude-stop')){
		document.getElementById('amplitude-stop').addEventListener('click', function(){
			amplitude_stop_song();
		});
	}

	//Sets the Pause button functionality
	if(document.getElementById('amplitude-pause')){
		document.getElementById('amplitude-pause').addEventListener('click', function() {
			amplitude_pause_song();
		});
	}
/*
	

	//Sets the Play/Pause toggle functionality
	if(document.getElementById('amplitude-play-pause')){
		document.getElementById('amplitude-play-pause').addEventListener('click', function(){
			//amplitude_play_pause();
		});
	}

	//Sets the Stop button functionality
	

	//Sets the volume up button functionality
	if(document.getElementById('amplitude-volume-up')){
		document.getElementById('amplitude-volume-up').addEventListener('click', function(){
			var amplitude_volume_amount = document.getElementById('amplitude-volume-up').getAttribute('volume-amount');
			amplitude_change_volume(amplitude_volume_amount, 'up'); 
		});
	}

	//Sets the volume down button functionality
	if(document.getElementById('amplitude-volume-down')){
		document.getElementById('amplitude-volume-down').addEventListener('click', function(){
			var amplitude_volume_amount = document.getElementById('amplitude-volume-down').getAttribute('volume-amount');
			amplitude_change_volume(amplitude_volume_amount, 'down'); 
		});
	}

	//Sets the volume meter functionality
	if(document.getElementById('amplitude-volume-meter')){
		document.getElementById('amplitude-volume-meter').addEventListener('click', function(obj){
			//amplitude_set_new_volume(obj);
		});
	}
	/*
	Volume Meter Sliding functionality

	if(document.getElementById('amplitude-volume-meter')){
		document.getElementById('amplitude-volume-meter').addEventListener('mousedown', function(obj){
			amplitude_volume_meter_slider_flag = true;
		});
	}

	if(document.getElementById('amplitude-volume-meter')){
		document.getElementById('amplitude-volume-meter').addEventListener('mouseup', function(obj){
			amplitude_volume_meter_slider_flag = false;
		});
	}

	if(document.getElementById('amplitude-volume-meter')){
		document.getElementById('amplitude-volume-meter').addEventListener('mousemove', function(obj){
			if(amplitude_volume_meter_slider_flag){
				amplitude_set_new_volume(obj);
			}
		});
	}

	//Sets the song position functionality
	if(document.getElementById('amplitude-song-slider')){
		document.getElementById('amplitude-song-slider').addEventListener('click', function(obj){
			amplitude_set_song_position(obj);
		});
	}

	/*
		Song Slider Functionality

	if(document.getElementById('amplitude-song-slider')){
		document.getElementById('amplitude-song-slider').addEventListener('mousedown', function(obj){
			amplitude_song_time_slider_flag = true;
		});
	}

	if(document.getElementById('amplitude-song-slider')){
		document.getElementById('amplitude-song-slider').addEventListener('mouseup', function(obj){
			amplitude_song_time_slider_flag = false;
		});
	}

	if(document.getElementById('amplitude-song-slider')){
		document.getElementById('amplitude-song-slider').addEventListener('mousemove', function(obj){
			if(amplitude_song_time_slider_flag){
				amplitude_set_song_position(obj);
			}
		});
	}

	//Mute button functionality
	if(document.getElementById('amplitude-mute')){
		document.getElementById('amplitude-mute').addEventListener('click',function(obj){
			amplitude_mute();
		});
	}

	//Initializes next button
	if(document.getElementById('amplitude-next')){
		document.getElementById('amplitude-next').addEventListener('click', function(){
			amplitude_next_song();
		});
	}

	//Initializes previous button
	if(document.getElementById('amplitude-previous')){
		document.getElementById('amplitude-previous').addEventListener('click', function(){
			amplitude_previous_song();
		});
	}

	//Initializes shuffle button
	if(document.getElementById('amplitude-shuffle')){
		document.getElementById('amplitude-shuffle').addEventListener('click', function(){
			amplitude_shuffle_playlist();
		});
	}

	var amplitude_playlist_controls = document.getElementsByTagName('div');

	for(var i = 0; i < amplitude_playlist_controls.length; i++){
		var amplitude_playlist_control = amplitude_playlist_controls[i];
		var amplitude_playlist_play_control_class = /\bamplitude-play-playlist\b/;
		var amplitude_playlist_pause_control_class = /\bamplitude-pause-playlist\b/;

		if(amplitude_playlist_control.className.match(amplitude_playlist_play_control_class)){
			var amplitude_playlist_song_play_id = amplitude_playlist_control.getAttribute('amplitude-song-id');
			amplitude_playlist_control.addEventListener('click', function(obj){
				amplitude_playlist_play(obj);
			});
		}

		if(amplitude_playlist_control.className.match(amplitude_playlist_pause_control_class)){
			var amplitude_playlist_song_pause_id = amplitude_playlist_control.getAttribute('amplitude-song-id');
				amplitude_playlist_control.addEventListener('click', function(obj){
				amplitude_playlist_pause(obj);
			});
		}
	}
	amplitude_bind_time_update();
	*/
}


function amplitude_web_mobile( ){

}

/*
|--------------------------------------------------------------------------
| Start
|--------------------------------------------------------------------------
| Begins Amplitude functionality
|	
*/

function amplitude_start(){
	if( amplitude_active_config.amplitude_auto_play ){
		amplitude_play_song();
	}
}

/*
|--------------------------------------------------------------------------
| Amplitude Play Function
|--------------------------------------------------------------------------
| 
*/

function amplitude_play_song(){
	//Before play is called
	if( amplitude_active_config.amplitude_before_play_callback ){
		var amplitude_before_play_callback_function = window[amplitude_active_config.amplitude_before_play_callback];
		amplitude_before_play_callback_function();
	}

	amplitude_active_config.amplitude_active_song.play();

	if( amplitude_active_config.amplitude_active_song.live != 'undefined' && amplitude_active_config.amplitude_active_song.live ){
		amplitude_reconnect_stream();
	}

	//After play is called
	if( amplitude_active_config.amplitude_after_play_callback ){
		var amplitude_after_play_callback_function = window[amplitude_active_config.amplitude_after_play_callback];
		amplitude_after_play_callback_function();
	}
}

/*function amplitude_play(id){
	if(typeof amplitude_config != 'undefined'){
		if(typeof amplitude_config.amplitude_before_play_callback != 'undefined'){
			var amplitude_before_play_callback_function = window[amplitude_config.amplitude_before_play_callback];
				amplitude_before_play_callback_function();
		}
	}

	if ( amplitude_active_song != null && !amplitude_active_song.paused ) {
		amplitude_stop_song();
	}

	//Sets the active song to the song being played.  All other functions depend on this.
	amplitude_active_song = document.getElementById(id);

	if(typeof amplitude_config != 'undefined'){
		if(typeof amplitude_config.amplitude_live != 'undefined'){
			if(amplitude_config.amplitude_live == true){
				amplitude_reconnect_stream();
			}
		}
	}

	//Plays the song defined in the audio tag.
	amplitude_active_song.play();

	if( document.getElementById('amplitude-volume-meter') ){
		//Calculates the starting percentage of volume of the song.
		var amplitude_percentage_of_volume = amplitude_volume;
		var amplitude_percentage_of_volume_meter = document.getElementById('amplitude-volume-meter').offsetWidth * amplitude_percentage_of_volume;


		amplitude_active_song.volume = amplitude_volume;

		//Fills out the volume status bar.
		document.getElementById('amplitude-volume-status').style.width = Math.round(amplitude_percentage_of_volume_meter) + "px";

		if(document.getElementById('amplitude-volume-status-tracker')){
			document.getElementById('amplitude-volume-status-tracker').style.marginLeft = Math.round(amplitude_percentage_of_volume_meter) + "px";
		}
	}

	if (amplitude_active_song.getAttribute("amplitude-audio-type") == 'song') {
		amplitude_set_song_info();
	}

	if(amplitude_active_song.getAttribute('amplitude-visual-element-id') != ''){
		if(document.getElementById(amplitude_active_song.getAttribute('amplitude-visual-element-id'))){
			document.getElementById(amplitude_active_song.getAttribute('amplitude-visual-element-id')).className = document.getElementById(amplitude_active_song.getAttribute('amplitude-visual-element-id')).className + ' amplitude-now-playing';
		}
	}

	if (document.getElementById('amplitude-playlist')) {
		amplitude_active_song.addEventListener("ended", function() {
			amplitude_next_song();
		});
	}

	//Sets active song information so it can be pulled
	amplitude_active_song_information['cover_art'] = amplitude_active_song.getAttribute('amplitude-album-art-url');
	amplitude_active_song_information['artist'] = amplitude_active_song.getAttribute('amplitude-artist');
	amplitude_active_song_information['album'] = amplitude_active_song.getAttribute('amplitude-album');
	amplitude_active_song_information['song_title'] = amplitude_active_song.getAttribute('amplitude-title');

	//Fires play callback for play button
	if(typeof amplitude_config != 'undefined'){
		if(typeof amplitude_config.amplitude_play_callback != 'undefined'){
			var amplitude_play_callback_function = window[amplitude_config.amplitude_play_callback];
			amplitude_play_callback_function();
		}
	}
}*/

/*
|--------------------------------------------------------------------------
| Amplitude Stop Song
|--------------------------------------------------------------------------
| Stops song by setting the current time to 0 and pausing the song.
| 
*/
function amplitude_stop_song(){
	//Before stop is called
	if( amplitude_active_config.amplitude_before_stop_callback ){
		var amplitude_before_stop_callback_function = window[amplitude_active_config.amplitude_before_stop_callback];
		amplitude_before_stop_callback_function();
	}

	amplitude_active_config.amplitude_active_song.currentTime = 0;
	amplitude_active_config.amplitude_active_song.pause();

	//After stop is called
	if( amplitude_active_config.amplitude_after_stop_callback ){
		var amplitude_after_stop_callback_function = window[amplitude_active_config.amplitude_after_stop_callback];
		amplitude_after_stop_callback_function();
	}
}

/*
|--------------------------------------------------------------------------
| Amplitude Pause Function
|--------------------------------------------------------------------------
| 
*/
function amplitude_pause_song(){
	if (amplitude_active_song != null) {
		amplitude_active_song.pause();
	}

	//Fires pause callback
	if(typeof amplitude_config != 'undefined'){
		if(typeof amplitude_config.amplitude_pause_callback != 'undefined'){
			var amplitude_pause_callback_function = window[amplitude_config.amplitude_pause_callback];
			amplitude_pause_callback_function();
		}
		if(typeof amplitude_config.amplitude_live != 'undefined'){
			if(amplitude_config.amplitude_live == true){
				amplitude_disconnect_stream();
			}
		}
	}
}

/*
|--------------------------------------------------------------------------
| Amplitude Play/Pause Function
|--------------------------------------------------------------------------
| 
*/
function amplitude_play_pause(){
	var amplitude_temporary_element_holder = '';
	if (amplitude_active_song != null) {
		//Checks to see if the song is paused, if it is, play it from where it left off otherwise pause it.
		if (amplitude_active_song.paused){
			if(typeof amplitude_config != 'undefined'){
				if(typeof amplitude_config.amplitude_before_play_callback != 'undefined'){
					var amplitude_before_play_callback_function = window[amplitude_config.amplitude_before_play_callback];
					amplitude_before_play_callback_function();
				}
				if(typeof amplitude_config.amplitude_live != 'undefined'){
					if(amplitude_config.amplitude_live == true){
						amplitude_reconnect_stream();
					}
				}
			}

			var amplitude_play_pause_button_new_class = ' amplitude-playing';

			amplitude_temporary_element_holder = document.getElementById('amplitude-play-pause');
			amplitude_temporary_element_holder.className = amplitude_temporary_element_holder.className.replace('amplitude-paused', '');

			amplitude_temporary_element_holder.className = amplitude_temporary_element_holder.className.replace(amplitude_play_pause_button_new_class, '');
			amplitude_temporary_element_holder.className = amplitude_temporary_element_holder.className + amplitude_play_pause_button_new_class;

			amplitude_active_song.play();

			//Fires play callback for play button
			if(typeof amplitude_config != 'undefined'){
				if(typeof amplitude_config.amplitude_play_callback != 'undefined'){
					var amplitude_play_callback_function = window[amplitude_config.amplitude_play_callback];
					amplitude_play_callback_function();
				}
			}
		}else{
			var amplitude_play_pause_button_new_class = ' amplitude-paused';

			amplitude_temporary_element_holder = document.getElementById('amplitude-play-pause');
			amplitude_temporary_element_holder.className = amplitude_temporary_element_holder.className.replace('amplitude-playing', '');

			amplitude_temporary_element_holder.className = amplitude_temporary_element_holder.className.replace(amplitude_play_pause_button_new_class, '');
			amplitude_temporary_element_holder.className = amplitude_temporary_element_holder.className + amplitude_play_pause_button_new_class;

			amplitude_active_song.pause();
			if(typeof amplitude_config != 'undefined'){
				if(typeof amplitude_config.amplitude_pause_callback != 'undefined'){
					var amplitude_pause_callback_function = window[amplitude_config.amplitude_pause_callback];
					amplitude_pause_callback_function();
				}
				if(typeof amplitude_config.amplitude_live != 'undefined'){
					if(amplitude_config.amplitude_live == true){
						amplitude_disconnect_stream();
					}
				}
			}
		}   
	}else{
		var amplitude_play_pause_button_new_class = ' amplitude-playing';

		amplitude_temporary_element_holder = document.getElementById('amplitude-play-pause');
		amplitude_temporary_element_holder.className = amplitude_temporary_element_holder.className.replace('amplitude-paused', '');

		amplitude_temporary_element_holder.className = amplitude_temporary_element_holder.className.replace(amplitude_play_pause_button_new_class, '');
		amplitude_temporary_element_holder.className = amplitude_temporary_element_holder.className + amplitude_play_pause_button_new_class;

		if (typeof amplitudeConfig != 'undefined'){
			amplitude_play(amplitude_config.start_song_id);
		}else{
			var amplitude_playlist = document.getElementById('amplitude-playlist');
			if (amplitude_playlist != null){
				//Plays top of playlist if no start song id
				amplitude_play(document.getElementById('amplitude-playlist').getElementsByTagName('audio')[0].getAttribute('id'));
			}else{
				amplitude_play(document.getElementsByTagName('audio')[0].getAttribute('id'));
			}
		}
	}
}

/*
|--------------------------------------------------------------------------
| Amplitude Update Time
|--------------------------------------------------------------------------
| Updates the current time function so it reflects where the user is in the song.
| This function is called whenever the time is updated.  This keeps the visual in sync with the actual time.
*/

function amplitude_update_time(){
	if (amplitude_active_song != null) {
		var amplitude_current_seconds = (Math.floor(amplitude_active_song.currentTime % 60) < 10 ? '0' : '') + Math.floor(amplitude_active_song.currentTime % 60);
		var amplitude_current_minutes = Math.floor(amplitude_active_song.currentTime / 60);

		//Sets the current song location compared to the song duration.
		if(document.getElementById('amplitude-current-time')){
			document.getElementById('amplitude-current-time').innerHTML = amplitude_current_minutes + ":" + amplitude_current_seconds;
		}
		
		if(document.getElementById('amplitude-audio-duration')){
			document.getElementById('amplitude-audio-duration').innerHTML =  Math.floor(amplitude_active_song.duration / 60) + ":" + (Math.floor(amplitude_active_song.duration % 60) < 10 ? '0' : '') + Math.floor(amplitude_active_song.duration % 60);
		}

		//Fills out the slider with the appropriate position.
		var amplitude_percentage_of_song = (amplitude_active_song.currentTime/amplitude_active_song.duration);
		if(document.getElementById('amplitude-song-slider')){
			var amplitude_percentage_of_slider = document.getElementById('amplitude-song-slider').offsetWidth * amplitude_percentage_of_song;
		}

		//Moves a track status div if available
		if(document.getElementById('amplitude-track-status')){
			document.getElementById('amplitude-track-status').style.marginLeft = Math.round(amplitude_percentage_of_slider) + "px";
		}

		//Updates the track progress div.
		if(document.getElementById('amplitude-track-progress')){
			document.getElementById('amplitude-track-progress').style.width = Math.round(amplitude_percentage_of_slider) + "px";
		}
		
		if(typeof amplitude_config != 'undefined'){
			if(typeof amplitude_config.amplitude_time_update_callback != 'undefined'){
				var amplitude_time_update_callback_function = window[amplitude_config.amplitude_time_update_callback];
				amplitude_time_update_callback_function();
			}
		}
	}
}

/*
|--------------------------------------------------------------------------
| Amplitude Volume Update
|--------------------------------------------------------------------------
| Updates the volume to a number passed in
*/

function amplitude_volume_update(number){
	//Updates the volume of the track to a certain number.
	if (amplitude_active_song != null) {
		amplitude_active_song.volume = number / 100;
		//Finds the percentage of the volume and sets the volume meter accordingly.
		var amplitude_percentage_of_volume = amplitude_active_song.volume / 1;

		if(document.getElementById('amplitude-volume-meter')){
			var amplitude_percentage_of_volume_slider = document.getElementById('amplitude-volume-meter').offsetWidth * amplitude_percentage_of_volume;
		}

		if(document.getElementById('amplitude-volume-status')){
			document.getElementById('amplitude-volume-status').style.width = Math.round(amplitude_percentage_of_volume_slider) + "px";
		}
	}

	amplitude_volume = number / 100;
}

/*
|--------------------------------------------------------------------------
| Amplitude Volume Update
|--------------------------------------------------------------------------
| Changes the volume up or down a specific number
*/

function amplitude_change_volume(number, direction){
	//Can't adjust the volume of a song that is not playing.
	if(amplitude_active_song != null){
		//Checks to see if the volume is at zero, if so it doesn't go any further.
		if(amplitude_active_song.volume >= 0 && direction == "down"){
			if ((amplitude_active_song.volume - (number / 100)) < 0) {
				amplitude_active_song.volume = 0;
				amplitude_volume = 0;
			}else{
				amplitude_active_song.volume = amplitude_active_song.volume - (number / 100);
				amplitude_volume = amplitude_volume - (number / 100);
			}
		}

		//Checks to see if the volume is at one, if so it doesn't go any higher.
		if(amplitude_active_song.volume <= 1 && direction == "up"){
			if ((amplitude_active_song.volume + (number / 100)) > 1) {
				amplitude_active_song.volume = 1;
				amplitude_volume = 0;
			}else{
				amplitude_active_song.volume = amplitude_active_song.volume + (number / 100);
				amplitude_volume = amplitude_volume - (number/100);
			}
		}

		//Finds the percentage of the volume and sets the volume meter accordingly.
		var amplitude_percentage_of_volume = amplitude_active_song.volume / 1;

		if(document.getElementById('amplitude-volume-meter')){
			var amplitude_percentage_of_volume_slider = document.getElementById('amplitude-volume-meter').offsetWidth * amplitude_percentage_of_volume;
		}

		if(document.getElementById('amplitude-volumen-status')){
			document.getElementById('amplitude-volume-status').style.width = Math.round(amplitude_percentage_of_volume_slider) + "px";
		}
	}
}

/*
|--------------------------------------------------------------------------
| Amplitude Set Location
|--------------------------------------------------------------------------
| Sets the location of the song based off of the percentage of the slider clicked.
*/
function amplitude_set_location(percentage){
	amplitude_active_song.currentTime = amplitude_active_song.duration * percentage;
}

/*
|--------------------------------------------------------------------------
| Amplitude Set Song Position
|--------------------------------------------------------------------------
| Gets the percentage of the click on the slider to set the song position accordingly.
| Source for Object event and offset: http://website-engineering.blogspot.com/2011/04/get-x-y-coordinates-relative-to-div-on.html
*/
function amplitude_set_song_position(e){
	//Gets the offset from the left so it gets the exact location.
	if(document.getElementById('amplitude-song-slider')){
		var amplitude_song_slider_width = document.getElementById('amplitude-song-slider').offsetWidth;
		var amplitude_song_slider_rect = document.getElementById('amplitude-song-slider').getBoundingClientRect();
		var amplitude_evt_obj = window.event ? event : e;
		var amplitude_percentage = ((amplitude_evt_obj.layerX - amplitude_song_slider_rect.left) / amplitude_song_slider_width);

		//Sets the song location with the percentage.
		amplitude_set_location(amplitude_percentage);
	}
}

/*
|--------------------------------------------------------------------------
| Amplitude Set Volume
|--------------------------------------------------------------------------
| Set's volume as a percentage of total volume based off of user click.
| 
*/
function amplitude_set_volume(percentage){
	amplitude_active_song.volume =  percentage;
	amplitude_volume = percentage;
	
	var amplitude_percentage_of_volume = amplitude_active_song.volume / 1;
	if(document.getElementById('amplitude-volume-meter')){
		var amplitude_percentage_of_volume_slider = document.getElementById('amplitude-volume-meter').offsetWidth * amplitude_percentage_of_volume;
	}

	if(document.getElementById('amplitude-volume-status')){
		document.getElementById('amplitude-volume-status').style.width = Math.round(amplitude_percentage_of_volume_slider) + "px";
	}

	if(document.getElementById('amplitude-volume-status-tracker')){
		document.getElementById('amplitude-volume-status-tracker').style.marginLeft = Math.round(amplitude_percentage_of_volume_slider) + "px";
	}
}

/*
|--------------------------------------------------------------------------
| Amplitude Set New Volume
|--------------------------------------------------------------------------
| Set's new volume id based off of the click on the volume bar.
| 
*/
function amplitude_set_new_volume(e){
	if(document.getElementById('amplitude-volume-meter')){
		var amplitude_volume_slider_width = document.getElementById('amplitude-volume-meter').offsetWidth;
		var amplitude_volume_slider_rect = document.getElementById('amplitude-volume-meter').getBoundingClientRect();
		var amplitude_evt_obj = window.event ? event: e;
		var amplitude_percentage = ((amplitude_evt_obj.layerX - amplitude_volume_slider_rect.left) /amplitude_volume_slider_width);

		if(amplitude_percentage > 1){
			amplitude_percentage = 1;
		}
		amplitude_set_volume(amplitude_percentage);
	}
}

/*
|--------------------------------------------------------------------------
| Amplitude Stop Song
|--------------------------------------------------------------------------
| Mutes the audio
| 
*/
function amplitude_mute(){
	if(amplitude_volume == 0){
		amplitude_volume = amplitude_pre_mute_volume;
	}else{
		amplitude_pre_mute_volume = amplitude_volume;
		amplitude_volume = 0;
	}
	amplitude_volume_update(amplitude_volume * 100);
}

/*
|--------------------------------------------------------------------------
| Amplitude Set Song Info
|--------------------------------------------------------------------------
| Sets the song info array so it can be displayed when changed
| 
*/
function amplitude_set_song_info() {
	//Grabs the information regarding the audio playing.
	var amplitude_artist = amplitude_active_song.getAttribute("amplitude-artist");
	var amplitude_title = amplitude_active_song.getAttribute("amplitude-title");
	var amplitude_album = amplitude_active_song.getAttribute("amplitude-album");
	var amplitude_album_art = amplitude_active_song.getAttribute("amplitude-album-art-url");

	//Sets the information regarding the song playing.
	if(document.getElementById('amplitude-now-playing-artist')){
		document.getElementById('amplitude-now-playing-artist').innerHTML = amplitude_artist;
	}

	if(document.getElementById('amplitude-now-playing-title')){
		document.getElementById('amplitude-now-playing-title').innerHTML = amplitude_title;
	}

	if(document.getElementById('amplitude-now-playing-album')){
		document.getElementById('amplitude-now-playing-album').innerHTML = amplitude_album;
	}
	
	//Add Default image
	if(document.getElementById('amplitude-album-art')){
		if(amplitude_album_art != null){
			document.getElementById('amplitude-album-art').innerHTML ='<img src="'+amplitude_album_art+'" class="amplitude-album-art-image"/>';
		}
	}
}


/*
|--------------------------------------------------------------------------
| Amplitude Next Song
|--------------------------------------------------------------------------
| Handles next song click.
| 
*/
function amplitude_next_song() {
	if(amplitude_active_song.getAttribute('amplitude-visual-element-id') != ''){
		if(document.getElementById(amplitude_active_song.getAttribute('amplitude-visual-element-id'))){
			document.getElementById(amplitude_active_song.getAttribute('amplitude-visual-element-id')).className = document.getElementById(amplitude_active_song.getAttribute('amplitude-visual-element-id')).className.replace('amplitude-now-playing', '');
		}
	}

	var amplitude_nodes = document.getElementById('amplitude-playlist').getElementsByTagName('audio');
	//If ths shuffle is activated, then go to next song in the shuffle array. Otherwise go down the playlist.
	if(amplitude_shuffle){
		for(i=0; i<amplitude_shuffle_list.length; i++){
			if(amplitude_shuffle_list[i] == amplitude_active_song.getAttribute('id')){
				if(typeof amplitude_shuffle_list[i+1] != 'undefined'){
					amplitude_play(amplitude_shuffle_list[i+1]);
				}else{
					amplitude_play(amplitude_shuffle_list[0]);
				}
				break;
			}
		}
	}else{
		for (i=0; i<amplitude_nodes.length; i++) {
			if (amplitude_nodes[i].getAttribute("id") == amplitude_active_song.getAttribute('id')) {
				if (typeof amplitude_nodes[i+1] != 'undefined') {
					amplitude_play(amplitude_nodes[i+1].getAttribute("id"));
				}else{
					amplitude_play(amplitude_nodes[0].getAttribute("id"));
				}
				break;
			}
		}
	}

	amplitude_active_song_information['cover_art'] = amplitude_active_song.getAttribute('amplitude-album-art-url');
	amplitude_active_song_information['artist'] = amplitude_active_song.getAttribute('amplitude-artist');
	amplitude_active_song_information['album'] = amplitude_active_song.getAttribute('amplitude-album');
	amplitude_active_song_information['song_title'] = amplitude_active_song.getAttribute('amplitude-title');

	if((typeof amplitude_config != 'undefined') && (typeof amplitude_config.amplitude_next_song_callback != 'undefined')){
		var amplitude_next_song_callback_function = window[amplitude_config.amplitude_next_song_callback];
		amplitude_next_song_callback_function();
	}
}

/*
|--------------------------------------------------------------------------
| Amplitude Next Song
|--------------------------------------------------------------------------
| Handles previous song click.
| 
*/
function amplitude_previous_song() {
	if(amplitude_active_song.getAttribute('amplitude-visual-element-id') != ''){
		if(document.getElementById(amplitude_active_song.getAttribute('amplitude-visual-element-id'))){
			document.getElementById(amplitude_active_song.getAttribute('amplitude-visual-element-id')).className = document.getElementById(amplitude_active_song.getAttribute('amplitude-visual-element-id')).className.replace('amplitude-now-playing', '');
		}
	}

	var amplitude_nodes = document.getElementById('amplitude-playlist').getElementsByTagName('audio');
	//If the shuffle is activated, then go to the previous song in the shuffle array.  Otherwise go back in the playlist.
	if(amplitude_shuffle){
		for(i=0; i<amplitude_shuffle_list.length; i++){
			if(amplitude_shuffle_list[i] == amplitude_active_song.getAttribute('id')){
				if(typeof amplitude_shuffle_list[i-1] != 'undefined'){
					amplitude_play(amplitude_shuffle_list[i-1]);
				}else{
					amplitude_play(amplitude_shuffle_list[amplitude_shuffle_list.length-1]);
				}
				break;
			}
		}
	}else{
		for (i=0; i<amplitude_nodes.length; i++) {
			if (amplitude_nodes[i].getAttribute("id") == amplitude_active_song.getAttribute('id')) {
				if (typeof amplitude_nodes[i-1] != 'undefined') {
					amplitude_play(amplitude_nodes[i-1].getAttribute("id"));
				}else{
					amplitude_play(amplitude_nodes[amplitude_nodes.length-1].getAttribute("id"));
				}
				break;
			}
		}
	}

	amplitude_active_song_information['cover_art'] = amplitude_active_song.getAttribute('amplitude-album-art-url');
	amplitude_active_song_information['artist'] = amplitude_active_song.getAttribute('amplitude-artist');
	amplitude_active_song_information['album'] = amplitude_active_song.getAttribute('amplitude-album');
	amplitude_active_song_information['title'] = amplitude_active_song.getAttribute('amplitude-title');

	if(typeof amplitude_config != 'undefined'){
		if(typeof amplitude_config.amplitude_previous_song_callback != 'undefined'){
			var amplitude_previous_song_callback_function = window[amplitude_config.amplitude_previous_song_callback];
			amplitude_previous_song_callback_function();
		}
	}
}

/*
|--------------------------------------------------------------------------
| Amplitude Shuffle Playlist
|--------------------------------------------------------------------------
| Handles the shuffling function.
| 
*/
function amplitude_shuffle_playlist(){
	//If the shuffle button is activated when clicked, turn it off.
	if(amplitude_shuffle){
		amplitude_shuffle = false;
		document.getElementById("amplitude-shuffle").classList.add('amplitude-shuffle-on');
		document.getElementById("amplitude-shuffle").classList.remove('amplitude-shuffle-on');
	}else{
		amplitude_shuffle = true;
		amplitude_shuffle_songs();
		document.getElementById("amplitude-shuffle").classList.add('amplitude-shuffle-on');
		document.getElementById("amplitude-shuffle").classList.remove('amplitude-shuffle-off');
	}

	if(typeof amplitude_config != 'undefined'){
		if(typeof amplitude_config.amplitude_shuffle_callback != 'undefined'){
			var amplitude_shuffle_callback_function = window[amplitude_config.amplitude_shuffle_callback];
			amplitude_shuffle_callback_function();
		}
	}
}

/*
|--------------------------------------------------------------------------
| Shuffle Songs
|--------------------------------------------------------------------------
| Shuffles songs.
| Based off of: http://www.codinghorror.com/blog/2007/12/the-danger-of-naivete.html
| 
*/
function amplitude_shuffle_songs(){
	var amplitude_nodes = document.getElementById('amplitude-playlist').getElementsByTagName('audio');
	amplitude_shuffle_playlist_temp = new Array(amplitude_nodes.length);

	for (i=0; i<amplitude_nodes.length; i++) {
		amplitude_shuffle_playlist_temp[i] = amplitude_nodes[i].getAttribute("id");
	}

	for (i = amplitude_nodes.length - 1; i > 0; i--){
		var amplitude_rand_num = Math.floor((Math.random()*i)+1);
		amplitude_shuffle_swap(amplitude_shuffle_playlist_temp, i, amplitude_rand_num);
	}

	amplitude_shuffle_list = amplitude_shuffle_playlist_temp;
}

/*
|--------------------------------------------------------------------------
| Shuffle Swap
|--------------------------------------------------------------------------
| Swaps out certain array indexes.
| Helper for the shuffle_songs function
| 
*/
/*

*/
function amplitude_shuffle_swap(shuffle_list, original, random) {
	var temp = shuffle_list[original];
	shuffle_list[original] = shuffle_list[random];
	shuffle_list[random] = temp;
}

/*
|--------------------------------------------------------------------------
| Binds Time
|--------------------------------------------------------------------------
| When the audio track time changes, the time elements get updated.
| 
*/
function amplitude_bind_time_update(){
	if(document.getElementById('amplitude-playlist')){
		var amplitude_nodes = document.getElementById('amplitude-playlist').getElementsByTagName('audio');
		for(i=0; i<amplitude_nodes.length; i++){
			amplitude_nodes[i].addEventListener('timeupdate', function(){
				amplitude_update_time();
			});
		}
	}else{
		var amplitude_song_id = document.getElementsByTagName('audio')[0].getAttribute('id');
		document.getElementById(amplitude_song_id).addEventListener('timeupdate', function(){
			amplitude_update_time();
		});
	}
}

/*
Plays a song out of the playlist
*/
function amplitude_playlist_play(e){
var amplitude_playlist_song_id = e.target.getAttribute('amplitude-song-id');

if(document.getElementById('amplitude-play-pause')){
var amplitude_play_pause_button_new_class = ' amplitude-playing';

amplitude_temporary_element_holder = document.getElementById('amplitude-play-pause');
amplitude_temporary_element_holder.className = amplitude_temporary_element_holder.className.replace('amplitude-paused', '');

amplitude_temporary_element_holder.className = amplitude_temporary_element_holder.className.replace(amplitude_play_pause_button_new_class, '');
amplitude_temporary_element_holder.className = amplitude_temporary_element_holder.className + amplitude_play_pause_button_new_class;
}

if (amplitude_active_song != null){
if(amplitude_active_song.getAttribute('amplitude-visual-element-id') != ''){
document.getElementById(amplitude_active_song.getAttribute('amplitude-visual-element-id')).className = document.getElementById(amplitude_active_song.getAttribute('amplitude-visual-element-id')).className.replace('amplitude-now-playing', '');
}
}
amplitude_play(amplitude_playlist_song_id);
}

/*
Pauses a song out of the playlist
*/
function amplitude_playlist_pause(e){
var amplitude_playlist_song_id = e.target.getAttribute('amplitude-song-id');
if(document.getElementById('amplitude-play-pause')){
var amplitude_play_pause_button_new_class = ' amplitude-paused';

amplitude_temporary_element_holder = document.getElementById('amplitude-play-pause');
amplitude_temporary_element_holder.className = amplitude_temporary_element_holder.className.replace('amplitude-playing', '');

amplitude_temporary_element_holder.className = amplitude_temporary_element_holder.className.replace(amplitude_play_pause_button_new_class, '');
amplitude_temporary_element_holder.className = amplitude_temporary_element_holder.className + amplitude_play_pause_button_new_class;
}
amplitude_pause();
}

/*
Disconnects from a live stream
Thanks to help from: http://blog.pearce.org.nz/2010/11/how-to-stop-video-or-audio-element.html
*/
function amplitude_disconnect_stream(){
amplitude_active_song.pause();
amplitude_active_song.src = ""; 
amplitude_active_song.load(); 
}

function amplitude_reconnect_stream(){
var audio_src = '';
if(typeof amplitude_config != 'undefined'){
if(typeof amplitude_config.amplitude_live_source != 'undefined'){
audio_src = amplitude_config.amplitude_live_source;
}
}
amplitude_active_song.src = audio_src; 
amplitude_active_song.load(); 
}


function amplitude_live_callback_hooks(){
if(typeof amplitude_config != 'undefined'){
if(typeof amplitude_config.amplitude_live_checkup != 'undefined'){
if((typeof amplitude_config.amplitude_live_checkup.checkup_interval != 'undefined') && (typeof amplitude_config.amplitude_live_checkup.checkup_function != 'undefined') ) {
setInterval(function(){
var amplitude_checkup_function = window[amplitude_config.amplitude_live_checkup.checkup_function];
amplitude_checkup_function(); 
}, amplitude_config.amplitude_live_checkup.checkup_interval);
}
}
}
}
