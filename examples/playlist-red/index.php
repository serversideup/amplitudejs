<!DOCTYPE html>
<html>
	<head>
		<title>Single Song Live</title>
		<script type="text/javascript" src="../../js/amplitude.js"></script>
		<link href='http://fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,700italic,400,700,600' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" type="text/css" href="css/styles.css"/>
	</head>
	<body>
		<div id="player">
			<div id="top-song-information"><span amplitude-song-info="artist">Jake Jendusa</span> - <span amplitude-song-info="name">Porch Stomp Blues</span></div>
			<div id="bottom-song-information"><span amplitude-song-info="album">In Search Of</span></div>

			<div id="top-controls">
				<div id="current-time"><span amplitude-single-current-minutes="true">0</span>:<span amplitude-single-current-seconds="true">00</span></div>
				<div id="control-container">
					<div class="amplitude-shuffle"></div>
				</div>
			</div>

			<div style="clear: both;"></div>

			<input type="range" class="amplitude-song-slider" amplitude-singular-song-slider="true"/>

			<div id="bottom-controls">
				<div class="amplitude-previous">

				</div>
				<div class="amplitude-play-pause amplitude-paused">

				</div>
				<div class="amplitude-next">

				</div>
			</div>
		</div>
		<script type="text/javascript">
			Amplitude.init({
				"songs": [
					{
						"name": "Porch Stomp Blues",
						"artist": "Jake Jendusa",
						"album": "In Search Of EP",
						"url": "../../songs/In%20Search%20Of%20EP/03%20Porch%20Stomp%20Blues.mp3",
						"live": false,
						"visual_id": "song-3",
						"cover_art_url": "images/jendusa.jpg"
					},
					{
						"name": "Man With the Keys",
						"artist": "Jake Jendusa",
						"album": "In Search Of EP",
						"url": "../../songs/In%20Search%20Of/02%20Man%20with%20the%20Keys.mp3",
						"live": false,
						"visual_id": "song-4",
						"cover_art_url": "images/jendusa.jpg"
					},
					{
						"name": "Song From the Styx",
						"artist": "Jake Jendusa",
						"album": "In Search Of",
						"url": "../../songs/In%20Search%20Of/01%20Song%20from%20the%20Styx.mp3",
						"live": false,
						"cover_art_url": "images/jendusaep.jpg"
					}
				],
				"amplitude_volume": .8
			});
		</script>
	</body>
</html>