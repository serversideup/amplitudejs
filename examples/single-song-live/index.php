<!DOCTYPE html>
<html>
	<head>
		<title>Single Song Live</title>
		<script type="text/javascript" src="js/amplitude.js"></script>
		<link href='http://fonts.googleapis.com/css?family=PT+Sans:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" type="text/css" href="css/styles.css"/>
	</head>
	<body>
		<div id="container">
			<div id="player-container">
				<div id="amplitude-album-art">
					<img src="images/wtmj620.png"/>
				</div>
				<div id="player">
					<div id="song-information">
						<span id="amplitude-now-playing-name">WTMJ 620 AM</span><br>
						<span id="amplitude-now-playing-album">Milwaukee, WI</span>
					</div>
					<div id="controls">
						<div id="amplitude-play-pause" class="amplitude-paused"></div><br>
						<span id="amplitude-current-time">0:00</span>
					</div>
					<input class="bar" type="range" id="amplitude-volume-slider" value="0"/>
				</div>
			</div>
			<script type="text/javascript">
				amplitude_config = {
					"amplitude_songs": [
						{
							"name": "WTMJ 620 AM",
							"album": "Milwaukee, WI",
							"url": "http://1942.live.streamtheworld.com/WTMJAM_SC",
							"live": true,
							"cover_art_url": "images/wtmj620.png"
						}
					],
					"amplitude_volume": 35
				}
			</script>
		</div>
	</body>
</html>