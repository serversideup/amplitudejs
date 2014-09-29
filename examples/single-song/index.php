<!DOCTYPE html>
<html>
	<head>
		<title>Single Song Tutorial</title>
		<script type="text/javascript" src="js/amplitude.js"></script>
		<link href='http://fonts.googleapis.com/css?family=Roboto:400,500,400italic,300italic,300,100italic,100' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" type="text/css" href="css/styles.css"/>
	</head>
	<div id="single-song-player">
		<div id="top">
			<div id="song-information-container">
				<span id="amplitude-now-playing-artist">Jake Jendusa</span><br>
				<span id="amplitude-now-playing-album">In Search Of</span>
			</div>
			<div id="song-action-container">
				<div id="amplitude-play-pause" class="amplitude-paused"></div>
			</div>
			<div class="clear"></div>
		</div>
		<div id="amplitude-song-time-visualization">
			
		</div>
		<div id="bottom-container">
			<span id="amplitude-now-playing-title">Song From the Styx</span>
			<span id="song-timing">
				<span id="amplitude-current-time">0:00</span> / <span id="amplitude-audio-duration">0:00</span>
			</span>
		</div>
	</div>

	<p>
		Design help from: <br>
		<a href="https://dribbble.com/shots/1509327-UI-Kit-PSD-included?list=users&offset=14" target="_blank">https://dribbble.com/shots/1509327-UI-Kit-PSD-included?list=users&offset=14</a>
	</p>

	<p>
		Music From: <br>
		<a href="https://www.facebook.com/pages/Jake-Jendusa-The-Dead-Men/106398795937" target="_blank">https://www.facebook.com/pages/Jake-Jendusa-The-Dead-Men/106398795937</a>
	</p>
	<script type="text/javascript">
		amplitude_config = {
			"amplitude_songs": [
				{
					"name": "Song From the Styx",
					"artist": "Jake Jendusa",
					"album": "In Search Of",
					"url": "songs/In%20Search%20Of/01%20Song%20from%20the%20Styx.mp3",
					"live": false,
					"cover_art_url": "images/jendusaep.jpg"
				}
			]
		}
	</script>
</html>