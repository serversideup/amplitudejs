<!DOCTYPE html>
<html>
	<head>
		<title>Single Song Live</title>
		<script type="text/javascript" src="js/amplitude.js"></script>
		<link href='http://fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,700italic,400,700,600' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" type="text/css" href="css/styles.css"/>
	</head>
	<body>
		<div id="player">
			<div id="top-song-information"><span id="amplitude-now-playing-artist">Jake Jendusa</span> - <span id="amplitude-now-playing-title">Porch Stomp Blues</span></div>
			<div id="bottom-song-information"><span id="amplitude-now-playing-album">In Search Of</span></div>

			<div id="top-controls">
				<div id="amplitude-current-time"></div>
				<div id="control-container">
					<div id="amplitude-shuffle"></div>
				</div>
			</div>

			<div style="clear: both;"></div>

			<div id="amplitude-song-time-visualization"></div>

			<div id="bottom-controls">
				<div id="amplitude-previous">

				</div>
				<div id="amplitude-play-pause" class="amplitude-paused">

				</div>
				<div id="amplitude-next">

				</div>
			</div>
		</div>
		<script type="text/javascript">
			var amplitude_config = {
				"amplitude_songs": [
					{
						"name": "Porch Stomp Blues",
						"artist": "Jake Jendusa",
						"album": "In Search Of EP",
						"url": "songs/In%20Search%20Of%20EP/03%20Porch%20Stomp%20Blues.mp3",
						"live": false,
						"visual_id": "song-3",
						"cover_art_url": "images/jendusa.jpg"
					},
					{
						"name": "Man With the Keys",
						"artist": "Jake Jendusa",
						"album": "In Search Of EP",
						"url": "songs/In%20Search%20Of/02%20Man%20with%20the%20Keys.mp3",
						"live": false,
						"visual_id": "song-4",
						"cover_art_url": "images/jendusa.jpg"
					},
					{
						"name": "Song From the Styx",
						"artist": "Jake Jendusa",
						"album": "In Search Of",
						"url": "songs/In%20Search%20Of/01%20Song%20from%20the%20Styx.mp3",
						"live": false,
						"cover_art_url": "images/jendusaep.jpg"
					}
				],
				"amplitude_volume": 35
			}
		</script>
	</body>
</html>