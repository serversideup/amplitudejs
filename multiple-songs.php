<!DOCTYPE html>
<html>
	<head>
		<title>Single Song Picture Tutorial</title>
		<script type="text/javascript" src="js/amplitude.js"></script>
		<link rel="stylesheet" type="text/css" href="css/multiple-songs-styles.css"/>
	</head>
	<div class="player">
		<div class="player-top">
			<div class="amplitude-play-pause amplitude-list-paused" amplitude-song-index="3"></div>
			<div class="track-info-container">
				<span class="amplitude-now-playing-title">Man With the Keys</span> <span class="slash">-</span><br><span class="amplitude-now-playing-artist">Jake Jendusa</span>
			</div>
			<div class="time-info-container">
	            <span class="amplitude-current-time" amplitude-current-time-index="3">0:00</span> / <span class="amplitude-audio-duration" amplitude-audio-duration-index="3">0:00</span>
	        </div>
	     	<input type="range" class="amplitude-song-slider" amplitude-song-slider-index="3" value="0"/>
		</div>
	</div>
	<br><br>
	<div class="player" id="player-2">
		<div class="player-top">
			<div class="amplitude-play-pause amplitude-list-paused" amplitude-song-index="2"></div>
			<div class="track-info-container">
				<span class="amplitude-now-playing-title">Porch Stomp Blues</span> <span class="slash">-</span><br><span class="amplitude-now-playing-artist">Jake Jendusa</span>
			</div>
			<div class="time-info-container">
	            <span class="amplitude-current-time" amplitude-current-time-index="2">0:00</span> / <span class="amplitude-audio-duration" amplitude-audio-duration-index="2">0:00</span>
	        </div>
	        <input type="range" class="amplitude-song-slider" amplitude-song-slider-index="2" value="0"/>
		</div>
	</div>
	<br><br>
	<div class="player" id="player-3">
		<div class="player-top">
			<div class="amplitude-play-pause amplitude-list-paused" amplitude-song-index="1"></div>
			<div class="track-info-container">
				<span class="amplitude-now-playing-title">Stream the World</span> 
			</div>
			<div class="time-info-container">
	            <span class="amplitude-current-time" amplitude-current-time-index="1">0:00</span> / <span class="amplitude-audio-duration" amplitude-audio-duration-index="1">0:00</span>
	        </div>
	        <input type="range" class="amplitude-song-slider" amplitude-song-slider-index="1" value="0"/>
		</div>
	</div>
	<br><br>
	<div class="player" id="player-4">
		<div class="player-top">
			<div class="amplitude-play-pause amplitude-list-paused" amplitude-song-index="0"></div>
			<div class="track-info-container">
				<span class="amplitude-now-playing-title">Song From the Styx</span> <span class="slash">-</span><br><span class="amplitude-now-playing-artist">Jake Jendusa</span>
			</div>
			<div class="time-info-container">
	            <span class="amplitude-current-time" amplitude-current-time-index="0">0:00</span> / <span class="amplitude-audio-duration" amplitude-audio-duration-index="0">0:00</span>
	        </div>
	       <input type="range" class="amplitude-song-slider" amplitude-song-slider-index="0" value="0"/>
		</div>
	</div>
	<br><br>
	<div id="test">

	</div>
	
	<div id="amplitude-mute" style="width:30px; height: 30px; background-color:red;"></div>
	<div id="amplitude-volume-up" style="width:30px; height:30px; color:white; background-color:purple;">+</div>
	<div id="amplitude-volume-down" style="width:30px; height:30px; color:white; background-color:green;">-</div>
	<div ontouchstart="addSong()" style="width:30px; height:30px; color:white; background-color:orange"><div>
	<!--<input class="bar" type="range" id="amplitude-volume-slider" value="0" style="-webkit-appearance: slider-vertical"/>-->

	<script type="text/javascript">
		amplitude_config = {
			"amplitude_songs": [
				{
					"name": "Song From the Styx",
					"artist": "Jake Jendusa",
					"album": "In Search Of EP",
					"url": "songs/In%20Search%20Of/01%20Song%20from%20the%20Styx.mp3",
					"live": false,
					"cover_art_url": "images/jendusaep.jpg"
				},
				{
					"name": "Stream the World",
					"url": "http://1942.live.streamtheworld.com/CBC_R1_WPG_L_SC",
					"live": true,
					"cover_art_url": "images/jendusaep.jpg"
				},
				{
					"name": "Porch Stomp Blues",
					"artist": "Jake Jendusa",
					"album": "In Search Of EP",
					"url": "songs/In%20Search%20Of%20EP/03%20Porch%20Stomp%20Blues.mp3",
					"live": false,
					"cover_art_url": "images/jendusa.jpg"
				},
				{
					"name": "Man With the Keys",
					"artist": "Jake Jendusa",
					"album": "In Search Of EP",
					"url": "songs/In%20Search%20Of/02%20Man%20with%20the%20Keys.mp3",
					"live": false,
					"cover_art_url": "images/jendusa.jpg"
				}
			],
		//	"amplitude_volume": 35,
		//	"amplitude_volume_up_amount": 15,
		//	"amplitude_volume_down_amount": 10
		}

		function addSong(){
			var new_song = {
	    		"name": "Shooting Star",
	    		"artist": "Air Traffic",
	    		"album": "Fractured Life",
	    		"url": "songs/03%20Shooting%20Star.m4a",
	    		"visual_id": "player-8",
	    		"cover_art_url": "images/fracturedlife.jpg",
	    		"live": false
	    	}

	    	var song_index = amplitude_add_song( new_song );
	    	var new_player = '<div class="player" id="player-8"><div class="player-top"><div class="amplitude-play-pause amplitude-list-paused" amplitude-song-index="'+song_index+'"></div><div class="track-info-container"><span class="amplitude-now-playing-title">Shooting Star</span> <span class="slash">-</span><br><span class="amplitude-now-playing-artist">Air Traffic</span></div><div class="time-info-container"><span class="amplitude-current-time" amplitude-current-time-index="'+song_index+'">0:00</span> / <span class="amplitude-audio-duration" amplitude-audio-duration-index="'+song_index+'">0:00</span></div><input type="range" class="amplitude-song-slider" amplitude-song-slider-index="'+song_index+'" value="0"/></div></div>';

	    	document.getElementById('test').innerHTML += new_player;
		}

	</script>
</html>