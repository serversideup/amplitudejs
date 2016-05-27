<!DOCTYPE html>
<html>
	<head>
		<title>Single Song Player and Album Art with Amplitude.js</title>
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
						<div class="amplitude-play-pause amplitude-paused" amplitude-song-index="0"></div>
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
					<div class="amplitude-song-time-visualization" amplitude-song-index="0" id="song-time-visualization"></div>
				</div>
			</div>
			<!-- End Small Player Middle -->

			<!-- Begin Small Player Right -->
			<div id="small-player-right" class="hidden-on-expanded">
				<span class="current-time">
					<span class="amplitude-current-minutes" amplitude-song-index="0">0</span>:<span class="amplitude-current-seconds" amplitude-song-index="0">00</span>
				</span>
			</div>
			<!-- End Small Player Right -->

			<!-- Begin Small Player Full Bottom -->
			<div id="small-player-full-bottom" class="hidden-on-collapse">
				<div class="amplitude-play-pause amplitude-paused" amplitude-song-index="0"></div>
				<div id="small-player-full-bottom-info">
					<span class="current-time">
						<span class="amplitude-current-minutes" amplitude-song-index="0">0</span>:<span class="amplitude-current-seconds" amplitude-song-index="0">00</span>
					</span>
					
					<div class="amplitude-song-time-visualization" amplitude-song-index="0" id="song-time-visualization-large"></div>
					
					<span class="time-duration">
						<span class="amplitude-duration-minutes" amplitude-song-index="0">0</span>:<span class="amplitude-duration-seconds" amplitude-song-index="0">00</span>
					</span>
				</div>
			</div>
			<!-- End Small Player Full Bottom -->
		</div>
		<!-- End Small Player -->
	</body>
	<script type="text/javascript">
		Amplitude.init({
			"songs": [
				{
					"name": "Rooms",
					"artist": "Mia and Jonah",
					"album": "Rooms For Adelaide",
					"url": "http://a656.phobos.apple.com/us/r30/Music/2d/d1/52/mzm.oymgnziu.aac.p.m4a",
					"live": false,
					"cover_art_url": "images/roomsforadelaide.jpg"
				}
			],
			"default_album_art": "images/no-cover-large.png"
		});

		var expanded = false;
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

			$('#large-album-art').css('border-radius', '5px');
		}, function(){
			if( !$('#top-header').is(':hover') && !$('#small-player').is(':hover') ){
				$('#top-header').fadeOut(1000);
				$('#small-player').fadeOut(1000);

				$('#large-album-art').css('border-radius', '0px');
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
	</script>
</html>