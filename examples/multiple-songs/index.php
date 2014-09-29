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
	</script>
</html>