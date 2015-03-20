<!DOCTYPE html>
<html>
	<head>
		<title>Multiple Songs</title>
		<script type="text/javascript" src="../../js/amplitude.js"></script>
		<link rel="stylesheet" type="text/css" href="css/styles.css"/>
	</head>
	<div class="player">
		<div class="player-top">
			<div class="amplitude-play-pause amplitude-paused" amplitude-song-index="2"></div>
			<div class="track-info-container">
				<span class="song-title">Man With the Keys</span> <span class="slash">-</span><br><span class="artist">Jake Jendusa</span>
			</div>
			<div class="time-info-container">
	            <span class="amplitude-current-minutes" amplitude-song-index="2">0</span>:<span class="amplitude-current-seconds" amplitude-song-index="2">00</span> / <span class="amplitude-duration-minutes" amplitude-song-index="2">0</span>:<span class="amplitude-duration-seconds" amplitude-song-index="2">00</span></span>
	        </div>
	     	<input type="range" class="amplitude-song-slider" amplitude-song-index="2" value="0"/>
		</div>
	</div>
	<br><br>
	<div class="player" id="player-2">
		<div class="player-top">
			<div class="amplitude-play-pause amplitude-paused" amplitude-song-index="1"></div>
			<div class="track-info-container">
				<span class="song-title">Porch Stomp Blues</span> <span class="slash">-</span><br><span class="artist">Jake Jendusa</span>
			</div>
			<div class="time-info-container">
	            <span class="amplitude-current-minutes" amplitude-song-index="1">0</span>:<span class="amplitude-current-seconds" amplitude-song-index="1">00</span> / <span class="amplitude-duration-minutes" amplitude-song-index="1">0</span>:<span class="amplitude-duration-seconds" amplitude-song-index="1">00</span></span>
	        </div>
	     	<input type="range" class="amplitude-song-slider" amplitude-song-index="1" value="0"/>
		</div>
	</div>
	<br><br>
	<div class="player" id="player-4">
		<div class="player-top">
			<div class="amplitude-play-pause amplitude-paused" amplitude-song-index="0"></div>
			<div class="track-info-container">
				<span class="song-title">Song From the Styx</span> <span class="slash">-</span><br><span class="artist">Jake Jendusa</span>
			</div>
			<div class="time-info-container">
	            <span class="amplitude-current-minutes" amplitude-song-index="0">0</span>:<span class="amplitude-current-seconds" amplitude-song-index="0">00</span> / <span class="amplitude-duration-minutes" amplitude-song-index="0">0</span>:<span class="amplitude-duration-seconds" amplitude-song-index="0">00</span></span>
	        </div>
	     	<input type="range" class="amplitude-song-slider" amplitude-song-index="0" value="0"/>
		</div>
	</div>

	<script type="text/javascript">
		Amplitude.init({
			"songs": [
				{
					"name": "Song From the Styx",
					"artist": "Jake Jendusa",
					"album": "In Search Of EP",
					"url": "../../songs/In%20Search%20Of/01%20Song%20from%20the%20Styx.mp3",
					"live": false,
					"cover_art_url": "images/jendusaep.jpg"
				},
				{
					"name": "Porch Stomp Blues",
					"artist": "Jake Jendusa",
					"album": "In Search Of EP",
					"url": "../../songs/In%20Search%20Of%20EP/03%20Porch%20Stomp%20Blues.mp3",
					"live": false,
					"cover_art_url": "images/jendusa.jpg"
				},
				{
					"name": "Man With the Keys",
					"artist": "Jake Jendusa",
					"album": "In Search Of EP",
					"url": "../../songs/In%20Search%20Of/02%20Man%20with%20the%20Keys.mp3",
					"live": false,
					"cover_art_url": "images/jendusa.jpg"
				}
			]
		});
	</script>
</html>