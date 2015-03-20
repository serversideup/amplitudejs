<!DOCTYPE html>
<html>
	<head>
		<title>Single Song Live</title>
		<script type="text/javascript" src="../../js/amplitude.js"></script>
		<link href='http://fonts.googleapis.com/css?family=PT+Sans:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" type="text/css" href="css/styles.css"/>
	</head>
	<body>
		<div id="container">
			<div id="player-container">
				<div id="amplitude-album-art">
					<img src="images/wyms.png"/>
				</div>
				<div id="player">
					<div id="song-information">
						<span id="station-name" amplitude-song-info="name">88.9 Radio Milwaukee</span><br>
						<span id="station-id" amplitude-song-info="album">Milwaukee, WI</span>
					</div>
					<div id="controls">
						<div class="amplitude-play-pause amplitude-paused"></div><br>
						<span class="current-time"><span amplitude-single-current-minutes="true">0</span>:<span amplitude-single-current-seconds="true">00</span></span>
					</div>
					<input type="range" class="amplitude-volume-slider" value="0"/>
				</div>
			</div>
			<script type="text/javascript">
				Amplitude.init({
					"songs": [
						{
							"name": "88.9 Radio Milwaukee",
							"album": "Milwaukee, WI",
							"url": "http://64.202.109.5:80/live",
							"live": true,
							"cover_art_url": "images/wyms.png"
						}
					],
					"volume": .8
				});
			</script>
		</div>
	</body>
</html>