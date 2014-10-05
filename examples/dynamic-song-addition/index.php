<!DOCTYPE html>
<html>
	<head>
		<title>Single Song Picture Tutorial</title>
		<script type="text/javascript" src="js/amplitude.js"></script>
		<link rel="stylesheet" type="text/css" href="css/styles.css"/>
	</head>
	<div class="player">
		<div class="player-top">
			<div class="amplitude-play-pause amplitude-list-paused" amplitude-song-index="2"></div>
			<div class="track-info-container">
				<span class="amplitude-now-playing-title">Man With the Keys</span> <span class="slash">-</span><br><span class="amplitude-now-playing-artist">Jake Jendusa</span>
			</div>
			<div class="time-info-container">
	            <span class="amplitude-current-time" amplitude-current-time-index="2">0:00</span> / <span class="amplitude-audio-duration" amplitude-audio-duration-index="2">0:00</span>
	        </div>
	     	<input type="range" class="amplitude-song-slider" amplitude-song-slider-index="2" value="0"/>
		</div>
	</div>
	<br><br>
	<div class="player" id="player-2">
		<div class="player-top">
			<div class="amplitude-play-pause amplitude-list-paused" amplitude-song-index="1"></div>
			<div class="track-info-container">
				<span class="amplitude-now-playing-title">Porch Stomp Blues</span> <span class="slash">-</span><br><span class="amplitude-now-playing-artist">Jake Jendusa</span>
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
	<div id="new-song-container">

	</div>
	<button onclick="add_song()">Add Song</button>
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
			]
		}

		function add_song(){
			//New Song Object
			var new_song = {
				"name": "Epitaph",
				"artist": "Jake Jendusa",
				"album": "In Search Of",
				"url": "songs/In%20Search%20Of/03%20Epitaph.mp3",
				"live": false
			}

			var new_song_index = amplitude_add_song( new_song );

			var new_song_visual_display = '<div class="player" id="new-player">'
				+ '<div class="player-top">'
					+ '<div class="amplitude-play-pause amplitude-list-paused" amplitude-song-index="'+new_song_index+'"></div>'
						+ '<div class="track-info-container">'
							+'<span class="amplitude-now-playing-title">Epitaph</span> <span class="slash">-</span><br><span class="amplitude-now-playing-artist">Jake Jendusa</span>'
						+ '</div>'
					+ '<div class="time-info-container">'
						+ '<span class="amplitude-current-time" amplitude-current-time-index="'+new_song_index+'">0:00</span> / <span class="amplitude-audio-duration" amplitude-audio-duration-index="'+new_song_index+'">0:00</span>'
	        		+ '</div>'
	      			+ '<input type="range" class="amplitude-song-slider" amplitude-song-slider-index="'+new_song_index+'" value="0"/>'
				+ '</div>'
			+ '</div>';

			document.getElementById('new-song-container').innerHTML = new_song_visual_display;
		}
	</script>
</html>