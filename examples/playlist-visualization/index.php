<!DOCTYPE html>
<html>
	<head>
		<title>Visualizer Playlist with Amplitude.js</title>
		<script type="text/javascript" src="../../js/amplitude.js"></script>
		<script type="text/javascript" src="../../visualizations/michaelbromley.js"></script>

		<!-- jQuery only used to help with animations and NON Amplitude elements -->
		<script type="text/javascript" src="js/jquery.min.js"></script>
		

		<link rel="stylesheet" type="text/css" href="css/styles.css"/>
	</head>
	<body>
		<!-- Start Top Header -->
		<div id="top-header" class="hidden-on-collapse">
			<div id="top-header-toggle" class="small-player-toggle-contract"></div>

			<div class="now-playing-title" amplitude-song-info="name"></div>
			<div class="album-information"><span amplitude-song-info="artist"></span> - <span amplitude-song-info="album"></span></div>
		</div>
		<!-- End Top Header -->

		<!-- Start Large Album Art -->
		<div id="visualization" class="hidden-on-collapse">
			<div id="amplitude-visualization"></div>
		</div>
		<!-- End Large Album Art -->

		<!-- Begin Small Player -->
		<div id="small-player">
			<!-- Begin Small Player Left -->
			<div id="small-player-left" class="hidden-on-expanded">
				<div id="small-player-toggle" class="small-player-toggle-expand"></div>
			</div>
			<!-- End Small Player Left -->

			<!-- Begin Small Player Album Art -->
			<img id="small-player-album-art" class="hidden-on-expanded" amplitude-song-info="cover"/>
			<!-- End Small Player Album Art -->

			<!-- Begin Small Player Middle -->
			<div id="small-player-middle" class="hidden-on-expanded">	
				<div id="small-player-middle-top">
					<!-- Begin Controls Container -->
					<div id="small-player-middle-controls">
						<div class="amplitude-prev" id="middle-top-previous"></div>
						<div class="amplitude-play-pause amplitude-paused" amplitude-main-play-pause="true" id="middle-top-play-pause"></div>
						<div class="amplitude-next" id="middle-top-next"></div>
					</div>
					<!-- End Controls Container -->

					<!-- Begin Meta Container -->
					<div id="small-player-middle-meta">
						<div class="now-playing-title" amplitude-song-info="name"></div>
						<div class="album-information"><span amplitude-song-info="artist"></span> - <span amplitude-song-info="album"></span></div>
					</div>
					<!-- End Meta Container -->
				</div>
				
				<div id="small-player-middle-bottom">
					<div class="amplitude-song-time-visualization" amplitude-single-song-time-visualization="true" id="song-time-visualization"></div>
				</div>
			</div>
			<!-- End Small Player Middle -->

			<!-- Begin Small Player Right -->
			<div id="small-player-right" class="hidden-on-expanded">
				<div id="toggle-playlist" class="playlist-toggle"></div>
				<span class="current-time">
					<span class="amplitude-current-minutes" amplitude-single-current-minutes="true">0</span>:<span class="amplitude-current-seconds" amplitude-single-current-seconds="true">00</span>
				</span>
			</div>
			<!-- End Small Player Right -->

			<!-- Begin Small Player Full Bottom -->
			<div id="small-player-full-bottom" class="hidden-on-collapse">
				<div id="toggle-playlist-full" class="playlist-toggle"></div>
				<div id="small-player-full-bottom-controls">
					<div class="amplitude-prev" id="middle-bottom-previous"></div>
					<div class="amplitude-play-pause amplitude-paused" amplitude-main-play-pause="true" id="small-player-bottom-play-pause"></div>
					<div class="amplitude-next" id="middle-top-next"></div>
				</div>
				<div id="small-player-full-bottom-info">
					<span class="current-time">
						<span class="amplitude-current-minutes" amplitude-single-current-minutes="true">0</span>:<span class="amplitude-current-seconds" amplitude-single-current-seconds="true">00</span>
					</span>
					
					<div class="amplitude-song-time-visualization" amplitude-single-song-time-visualization="true" id="song-time-visualization-large"></div>
					
					<span class="time-duration">
						<span class="amplitude-duration-minutes" amplitude-single-duration-minutes="true">0</span>:<span class="amplitude-duration-seconds" amplitude-single-duration-seconds="true">00</span>
					</span>
				</div>
			</div>
			<!-- End Small Player Full Bottom -->
		</div>
		<!-- End Small Player -->

		<!-- Begin Playlist -->
		<div id="small-player-playlist">
			<div class="information">
				Playlist
				<hr>
			</div>
			<div class="amplitude-song-container amplitude-play-pause playlist-item" amplitude-song-index="0">
				<img src="images/song_NickyRomero-SymphonicaThibaultRemix.jpg" class="album-art"/>
				<div class="playlist-meta">
					<div class="now-playing-title">Symphonica (Thibault Remix)</div>
					<div class="album-information">Thibault - Nicky Romero Remixes</span></div>
				</div>
				<div style="clear: both;"></div>
			</div>
			<div class="amplitude-song-container amplitude-play-pause playlist-item" amplitude-song-index="1">
				<img src="images/song_TheCrystalMethod-Emulator.jpg" class="album-art"/>
				<div class="playlist-meta">
					<div class="now-playing-title">Emulator</div>
					<div class="album-information">The Crystal Method - Emulator (Single)</span></div>
				</div>
				<div style="clear: both;"></div>
			</div>
			<div class="amplitude-song-container amplitude-play-pause playlist-item" amplitude-song-index="2">
				<img src="images/song_YogiBurial.jpg" class="album-art"/>
				<div class="playlist-meta">
					<div class="now-playing-title">Burial feat. Pusha T</div>
					<div class="album-information">Yogi - YOGI</span></div>
				</div>
				<div style="clear: both;"></div>
			</div>
		</div>	
		<!-- End Playlist -->

		<!-- Start Soundcloud Props -->
		<a href="https://soundcloud.com" target="_blank">
			<img id="soundcloud-image" src="images/poweredBySoundcloud-white.png"/>
		</a>
		<!-- End Soundcloud Props -->
	</body>
	<script type="text/javascript">
		Amplitude.init({
			"songs": [
				{
					"name": "Symphonica (Thibault Remix)",
					"artist": "Thibault",
					"album": "Nicky Romero Remixes",
					"url": "https://soundcloud.com/thibaultmusic/nicky-romero-symphonica",
					"cover_art_url": "images/song_NickyRomero-SymphonicaThibaultRemix.jpg"
				},
				{
					"name": "Emulator",
					"artist": "The Crystal Method",
					"album": "Emulator (Single)",
					"url": "https://soundcloud.com/the-crystal-method/emulator",
					"cover_art_url": "images/song_TheCrystalMethod-Emulator.jpg"
				},
				{
					"name": "Burial feat. Pusha T",
					"artist": "Yogi",
					"album": "YOGI",
					"url": "https://soundcloud.com/yogitrf/yogi-burial-feat-pusha-t",
					"cover_art_url": "images/song_YogiBurial.jpg"
				}
			],
			"soundcloud_client": '7f4a6ed1488c1ebdf31600767b9b6350',
			"default_album_art": "images/no-cover-large.png",
			"use_visualizations": true,
			"visualization_backup": "album-art",
			"preload": "auto"
		});

		Amplitude.registerVisualization( MichaelBromleyVisualization, {
			width: '370',
			height: '370'
		} );

		var expanded = true;
		var playlistEpxanded = true;
		/*
			Set fully expanded defaults
		*/
		$('.hidden-on-collapse').show();
		$('.hidden-on-expanded').hide();

		$('#small-player').css('border-top-left-radius', '0px');
		$('#small-player').css('border-top-right-radius', '0px');

		$('#small-player-playlist').show();

		$('#small-player').css('border-bottom-left-radius', '0px');
		$('#small-player').css('border-bottom-right-radius', '0px');

		$('#visualization').css('border-bottom-left-radius', '0px');
		$('#visualization').css('border-bottom-right-radius', '0px');
		/*
			jQuery Visual Helpers
		*/
		$('#small-player').hover(function(){
			$('#small-player-middle-controls').show();
			$('#small-player-middle-meta').hide();
		}, function(){
			$('#small-player-middle-controls').hide();
			$('#small-player-middle-meta').show();

		});

		$('#visualization').hover(function(){
			$('#top-header').show();
			$('#small-player').show();
		}, function(){
			if( !$('#top-header').is(':hover') && !$('#small-player').is(':hover') ){
				$('#top-header').fadeOut(1000);
				$('#small-player').fadeOut(1000);
			}
		});

		$('#top-header').hover(function(){
			$('#top-header').show();
			$('#small-player').show();
		}, function(){

		});

		/*
			Toggles Album Art
		*/
		$('#small-player-toggle').click(function(){
			$('.hidden-on-collapse').show();
			$('.hidden-on-expanded').hide();
			/*
				Is expanded
			*/
			expanded = true;

			$('#small-player').css('border-top-left-radius', '0px');
			$('#small-player').css('border-top-right-radius', '0px');
		});

		$('#top-header-toggle').click(function(){
			$('.hidden-on-collapse').hide();
			$('.hidden-on-expanded').show();
			/*
				Is collapsed
			*/
			expanded = false;

			$('#small-player').css('border-top-left-radius', '5px');
			$('#small-player').css('border-top-right-radius', '5px');
		});

		$('.playlist-toggle').click(function(){
			if( playlistEpxanded ){
				$('#small-player-playlist').hide();

				$('#small-player').css('border-bottom-left-radius', '5px');
				$('#small-player').css('border-bottom-right-radius', '5px');

				$('#visualization').css('border-bottom-left-radius', '5px');
				$('#visualization').css('border-bottom-right-radius', '5px');

				playlistEpxanded = false;
			}else{
				$('#small-player-playlist').show();

				$('#small-player').css('border-bottom-left-radius', '0px');
				$('#small-player').css('border-bottom-right-radius', '0px');

				$('#visualization').css('border-bottom-left-radius', '0px');
				$('#visualization').css('border-bottom-right-radius', '0px');

				playlistEpxanded = true;
			}
		})
	</script>
</html>