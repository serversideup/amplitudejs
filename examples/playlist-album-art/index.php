<!DOCTYPE html>
<html>
	<head>
		<title>Playlist with Amplitude.js</title>
		<script type="text/javascript" src="../../js/amplitude.js"></script>
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
		<div id="top-large-album" class="hidden-on-collapse">
			<img id="large-album-art" amplitude-song-info="cover"/>
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
				<img src="images/theweatherman.jpg" class="album-art"/>
				<div class="playlist-meta">
					<div class="now-playing-title">Living Proof</div>
					<div class="album-information">Gregory Alan Isakov - The Weatherman</span></div>
				</div>
				<div style="clear: both;"></div>
			</div>
			<div class="amplitude-song-container amplitude-play-pause playlist-item" amplitude-song-index="1">
				<img src="images/roomsforadelaide.jpg" class="album-art"/>
				<div class="playlist-meta">
					<div class="now-playing-title">Rooms</div>
					<div class="album-information">Mia and Jonah - Rooms For Adelaide</span></div>
				</div>
				<div style="clear: both;"></div>
			</div>
			<div class="amplitude-song-container amplitude-play-pause playlist-item" amplitude-song-index="2">
				<img src="images/thesuburbs.jpeg" class="album-art"/>
				<div class="playlist-meta">
					<div class="now-playing-title">Suburban War</div>
					<div class="album-information">The Arcade Fire - The Suburbs</span></div>
				</div>
				<div style="clear: both;"></div>
			</div>
		</div>	
		<!-- End Playlist -->
	</body>
	<script type="text/javascript">
		Amplitude.init({
			"songs": [
				{
					"name": "Living Proof",
					"artist": "Gregory Alan Isakov",
					"album": "The Weatherman",
					"url": "http://a1537.phobos.apple.com/us/r30/Music4/v4/60/af/eb/60afeba7-f8d9-a920-ff5b-b8666fdc2de4/mzaf_3379426683594665460.plus.aac.p.m4a",
					"live": false,
					"cover_art_url": "images/theweatherman.jpg"
				},
				{
					"name": "Rooms",
					"artist": "Mia and Jonah",
					"album": "Rooms For Adelaide",
					"url": "http://a656.phobos.apple.com/us/r30/Music/2d/d1/52/mzm.oymgnziu.aac.p.m4a",
					"live": false,
					"cover_art_url": "images/roomsforadelaide.jpg"
				},
				{
					"name": "Suburban War",
					"artist": "The Arcade Fire",
					"album": "The Suburbs",
					"url": "https://p.scdn.co/mp3-preview/f5b1bef707e8be7052a1efa5a39555c48e913d36",
					"live": false,
					"cover_art_url": "images/thesuburbs.jpeg"
				}
			],
			"default_album_art": "images/no-cover-large.png"
		});

		var expanded = false;
		var playlistEpxanded = false;
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

		$('#top-large-album').hover(function(){
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

				$('#large-album-art').css('border-bottom-left-radius', '5px');
				$('#large-album-art').css('border-bottom-right-radius', '5px');

				playlistEpxanded = false;
			}else{
				$('#small-player-playlist').show();

				$('#small-player').css('border-bottom-left-radius', '0px');
				$('#small-player').css('border-bottom-right-radius', '0px');

				$('#large-album-art').css('border-bottom-left-radius', '0px');
				$('#large-album-art').css('border-bottom-right-radius', '0px');

				playlistEpxanded = true;
			}
		})
	</script>
</html>