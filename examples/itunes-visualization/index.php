<html>
	<head>
		<title>iTunes Visualization Style</title>
		<link type="text/css" href="css/styles.css" rel="stylesheet"/>
		<script src="../../js/amplitude.js"></script>
		<script src="../../visualizations/michaelbromley.js"></script>
	</head>
	<body>
		<div id="player">
			<div id="player-top">
				<div id="now-playing-title" amplitude-song-info="name">Epitaph</div>
				<div class="album-information"><span amplitude-song-info="artist">Jake Jendusa</span> - <span amplitude-song-info="album">In Search Of</span></div>
			</div>
			<div id="amplitude-visualization">
				
			</div>
			<div id="player-bottom">
				<div id="control-container">
					<div class="amplitude-previous"></div>
					<div class="amplitude-play-pause amplitude-paused"></div>
					<div class="amplitude-next"></div>
				</div>
				<div id="toggle-playlist" onclick="toggle_playlist()">
					<img src="images/black-playlist.png"/>
				</div>
				<div id="current-song-information">
					<span id="current-time">
						<span class="amplitude-current-minutes" amplitude-single-current-minutes="true">0</span>:<span class="amplitude-current-seconds" amplitude-single-current-seconds="true">00</span>
					</span>
					<div id="amplitude-song-time-visualization"></div>
					<span id="audio-duration">
						<span class="amplitude-duration-minutes" amplitude-single-duration-minutes="true">0</span>:<span class="amplitude-duration-minutes" amplitude-single-duration-seconds="true">00</span>
					</span>
				</div>
			</div>
			<div id="player-playlist">
				<div class="playlist-item" id="up-next-header">
					Up Next: 
				</div>

				<div class="amplitude-play-pause playlist-item amplitude-song-container" amplitude-song-index="0">
					<div class="playlist-image-container">
						<img src="images/jendusa.jpg"/>
					</div>
					<div class="playlist-song-information-container">
						<div class="playlist-song-title">Song from the Styx</div>
						<div class="playlist-album-information">Jake Jendusa - In Search Of</div>
					</div>
					<div style="clear: both;"></div>
				</div>
				<div class="amplitude-play-pause playlist-item amplitude-song-container" amplitude-song-index="1">
					<div class="playlist-image-container">
						<img src="images/jendusaep.jpg"/>
					</div>
					<div class="playlist-song-information-container">
						<div class="playlist-song-title">Porch Stomp Blues</div>
						<div class="playlist-album-information">Jake Jendusa - In Search Of EP</div>
					</div>
					<div style="clear: both;"></div>
				</div>
				<div class="amplitude-play-pause playlist-item amplitude-song-container" amplitude-song-index="2">
					<div class="playlist-image-container">
						<img src="images/jendusa.jpg"/>
					</div>
					<div class="playlist-song-information-container">
						<div class="playlist-song-title">Man with the Keys</div>
						<div class="playlist-album-information">Jake Jendusa - In Search Of EP</div>
					</div>
					<div style="clear: both;"></div>
				</div>
			</div>
		</div>
	</body>
	<script type="text/javascript">
		Amplitude.init({
			"volume": .35,
			"songs": [
				{
					"name": "Song from the Styx",
					"url": "../../songs/In%20Search%20Of/01%20Song%20from%20the%20Styx.mp3",
					"artist": "Jake Jendusa",
					"album": "In Search Of",
					"live": false,
					"cover_art_url": "images/jendusa.jpg"
				},
				{
					"name": "Porch Stomp Blues",
					"url": "../../songs/In%20Search%20Of%20EP/03%20Porch%20Stomp%20Blues.mp3",
					"artist": "Jake Jendusa",
					"album": "In Search Of EP",
					"live": false,
					"cover_art_url": "images/jendusaep.jpg"
				},
				{
					"name": "Man with the Keys",
					"url": "songs/In%20Search%20Of/02%20Man%20with%20the%20keys.mp3",
					"artist": "Jake Jendusa",
					"album": "In Search Of EP",
					"live": false,
					"cover_art_url": "images/jendusaep.jpg"
				}
			]
		});

		Amplitude.registerVisualization( MichaelBromleyVisualization, {
			width: '314',
			height: '314'
		} );

		var open_playlist = false;
		function toggle_playlist(){
			if(open_playlist){
				document.getElementById('player-playlist').style.display = 'none';
				open_playlist = false;
			}else{
				document.getElementById('player-playlist').style.display = 'block';
				open_playlist = true;
			}
		}
	</script>
<?php
	include( '../includes/footer.php' );
?>