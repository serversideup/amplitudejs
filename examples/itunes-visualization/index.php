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
					<div class="amplitude-prev"></div>
					<div class="amplitude-play-pause amplitude-paused" amplitude-main-play-pause="true"></div>
					<div class="amplitude-next"></div>
				</div>
				<div id="toggle-playlist" onclick="toggle_playlist()">
					<img src="images/black-playlist.png"/>
				</div>
				<div id="current-song-information">
					<span id="current-time">
						<span class="amplitude-current-minutes" amplitude-single-current-minutes="true">0</span>:<span class="amplitude-current-seconds" amplitude-single-current-seconds="true">00</span>
					</span>
					<div class="amplitude-song-time-visualization" id="song-time-visualization" amplitude-single-song-time-visualization="true">

					</div>
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
						<div class="playlist-song-title">Burial</div>
						<div class="playlist-album-information">YOGI feat Pusha T - Burial Skrillex + Trollphace Remix</div>
					</div>
					<div style="clear: both;"></div>
				</div>
				<div class="amplitude-play-pause playlist-item amplitude-song-container" amplitude-song-index="1">
					<div class="playlist-image-container">
						<img src="images/jendusaep.jpg"/>
					</div>
					<div class="playlist-song-information-container">
						<div class="playlist-song-title">Hell Of A Night</div>
						<div class="playlist-album-information">Schoolboy Q (YOGI Remix) - YOGI remixes</div>
					</div>
					<div style="clear: both;"></div>
				</div>
				<div class="amplitude-play-pause playlist-item amplitude-song-container" amplitude-song-index="2">
					<div class="playlist-image-container">
						<img src="images/jendusa.jpg"/>
					</div>
					<div class="playlist-song-information-container">
						<div class="playlist-song-title">Christian Bale</div>
						<div class="playlist-album-information">YOGI Feat. Casey Veggies, Knytro, Sway, KSI, Raptor</div>
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
					"name": "Burial",
					"artist": "YOGI feat Pusha T - Burial",
					"album": "YOGI remixes",
					"url": "https://soundcloud.com/yogitrf/yogi-feat-pusha-t-burial-skrillex-trollphace-remix",
					"cover_art_url": "http://upload.wikimedia.org/wikipedia/commons/3/3a/RHCP_Logo.svg",
					"album_key": "album-1"
				},
				{
					"name": "Hell Of A Night",
					"artist": "Schoolboy Q (YOGI Remix)",
					"album": "YOGI remixes",
					"url": "https://soundcloud.com/yogitrf/schoolboy-q-hell-of-a-night"
				},
				{
					"name": "Christian Bale",
					"artist": "YOGI Feat. Casey Veggies, Knytro, Sway, KSI, Raptor",
					"album": "Christian Bale feat. Casey Veggies, Knytro, Sway, KSI, Raptor",
					"url": "https://soundcloud.com/yogitrf/yogi-christian-bale-feat-casey-veggies-knytro-sway-ksi-raptor?in=yogitrf/sets/burial-ep"
				}
			],
			"soundcloud_client": '7f4a6ed1488c1ebdf31600767b9b6350',
			"callbacks": {
				"before_album_change": "test",
				"after_album_change": "after_test"
			},
			"visualization_backup": "album-art"
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

		function test(){
			console.log( Amplitude.getActiveSongMetadata() );
		}

		function after_test(){
			console.log( Amplitude.getActiveSongMetadata() );
		}
	</script>
<?php
	include( '../includes/footer.php' );
?>