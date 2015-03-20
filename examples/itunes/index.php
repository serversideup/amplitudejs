<?php
	$app['name'] = 'The HTML5 Audio Library For The Modern Era: AmplitudeJS';

	$app['css'] = array();

	$app['css'][0] = "../css/normalize.css";
	$app['css'][1] = "../css/foundation.min.css";
	$app['css'][2] = "../css/menu.css";
	$app['css'][3] = "../css/amplitude.css";
	$app['css'][4] = "css/itunes-mini.css";
	$app['css'][5] = "https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,400,300,600,700";

	$app['js'] = array();
	$app['js'][0] = "../js/jquery.js";
	$app['js'][1] = "../js/foundation.min.js";
	$app['js'][2] = "../js/amplitude.js";

	$app['twitter'] = '<a href="https://twitter.com/521dimensions"><img id="open-menu-twitter" src="../img/twitter.png"/></a>';
	$app['facebook'] = '<a href="https://www.facebook.com/521dimensions"><img id="open-menu-facebook" src="../img/facebook.png"/></a>';
	$app['logo'] = '<img id="open-menu-logo" src="../img/amplitude-logo.png"/>';

	$app['links']['download'] = 'https://github.com/521dimensions/amplitudejs/archive/master.zip';
	$app['links']['docs'] = '/amplitudejs/docs/';
	$app['links']['view-source'] = 'https://github.com/521dimensions/amplitudejs';

	$app['download']['name'] = 'AmplitudeJS';
	$app['download']['link'] = 'https://open.521dimensions.com/amplitudejs?utm_source=reminder-email&utm_medium=email&utm_campaign=reminder-email';
	
	include( '../includes/header.php' );
	include( '../includes/top-menu.php' );
?>
	<div id="fb-root"></div>
	<script>(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/en_GB/all.js#xfbml=1&appId=714147731941689";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));</script>

	<script type="text/javascript">
		jQuery(document).ready(function(){
			jQuery('#amplitude-examples-link').click(function(){
				jQuery('html, body').animate({
	                scrollTop: jQuery("#amplitude-player-container").offset().top - 100
	            }, 1000);
			});
		});
	</script>
	<div id="amplitude-header">
		<div class="row">
			<div class="large-12 medium-12 columns">
				<img id="amplitude-large-logo" src="../img/amplitude-logo-large.png"/>
			</div>
		</div>

		<div class="row">
			<div id="amplitude-slogan" class="large-12 medium-12 small-12 columns">
				THE AUDIO HTML PLAYER FOR THE MODERN ERA
			</div>
		</div>
		
		<div class="row">
			<div id="amplitude-description" class="large-12 columns">
				Free yourself from the browsers' control and design an audio player using
				HTML5 and CSS3. No dependencies required and open source
				on GitHub through the MIT License.
			</div>
		</div>
		<div class="row" id="amplitude-links-container">
			<div class="large-10 medium-10 large-centered medium-centered columns">
				<div class="large-6 medium-6 columns">
					<a id="amplitude-download-link" href="https://github.com/521dimensions/amplitudejs/archive/master.zip">
						Download
					</a>
					<a id="amplitude-download-reminder" class="send-download-reminder">
						Send Reminder
					</a>
				</div>
				<div class="large-6 medium-6 columns">
					<a id="amplitude-read-docs-link" href="docs">
						Read the Docs
					</a>
				</div>
			</div>
		</div>
	</div>
	<div id="amplitude-features-container">
		<div class="row">
			<div id="player">
				<div id="player-top">
					<div id="amplitude-now-playing-title">Epitaph</div>
					<div class="album-information"><span id="amplitude-now-playing-artist">Jake Jendusa</span> - <span id="amplitude-now-playing-album">In Search Of</span></div>
				</div>
				<div id="amplitude-album-art">
					<img src="images/jendusa.jpg"/>
				</div>
				<div id="player-bottom">
					<div id="control-container">
						<div id="amplitude-previous"></div>
						<div id="amplitude-play-pause" class="amplitude-paused"></div>
						<div id="amplitude-next"></div>
					</div>
					<div id="toggle-playlist" onclick="toggle_playlist()">
						<img src="images/black-playlist.png"/>
					</div>
					<div id="current-song-information">
						<span id="amplitude-current-time">0:00</span>
						<div id="amplitude-song-time-visualization"></div>
						<span id="amplitude-audio-duration">0:00</span>
					</div>
				</div>
				<div id="player-playlist">
					<div class="playlist-item" id="up-next-header">
						Up Next: 
					</div>
					<div class="amplitude-play-pause playlist-item" amplitude-song-index="0">
						<div class="playlist-image-container">
							<img src="images/jendusa.jpg"/>
						</div>
						<div class="playlist-song-information-container">
							<div class="playlist-song-title">Epitaph</div>
							<div class="playlist-album-information">Jake Jendusa - In Search Of</div>
						</div>
						<div style="clear: both;"></div>
					</div>
					<div class="amplitude-play-pause playlist-item" amplitude-song-index="1">
						<div class="playlist-image-container">
							<img src="images/jendusa.jpg"/>
						</div>
						<div class="playlist-song-information-container">
							<div class="playlist-song-title">Song from the Styx</div>
							<div class="playlist-album-information">Jake Jendusa - In Search Of</div>
						</div>
						<div style="clear: both;"></div>
					</div>
					<div class="amplitude-play-pause playlist-item" amplitude-song-index="2">
						<div class="playlist-image-container">
							<img src="images/jendusaep.jpg"/>
						</div>
						<div class="playlist-song-information-container">
							<div class="playlist-song-title">Porch Stomp Blues</div>
							<div class="playlist-album-information">Jake Jendusa - In Search Of EP</div>
						</div>
						<div style="clear: both;"></div>
					</div>
					<div class="amplitude-play-pause playlist-item" amplitude-song-index="3">
						<div class="playlist-image-container">
							<img src="images/jendusa.jpg"/>
						</div>
						<div class="playlist-song-information-container">
							<div class="playlist-song-title">Dangerous</div>
							<div class="playlist-album-information">Jake Jendusa - In Search Of</div>
						</div>
						<div style="clear: both;"></div>
					</div>
					<div class="amplitude-play-pause playlist-item" amplitude-song-index="4">
						<div class="playlist-image-container">
							<img src="images/jendusa.jpg"/>
						</div>
						<div class="playlist-song-information-container">
							<div class="playlist-song-title">Crows</div>
							<div class="playlist-album-information">Jake Jendusa - In Search Of</div>
						</div>
						<div style="clear: both;"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<h2 class="amplitude-second-description">Amplitude.js is the HTML5 player for the Modern Web.</h2>
			</div>
		</div>
		<div class="row">
			<div class="large-9 medium-9 large-centered medium-centered columns">
				<div class="large-1 medium-2 small-2 columns">
					<img src="images/design-control.png" class="feature-icon"/>
				</div>
				<div class="large-11 medium-10 small-10 columns">
					<h3 class="feature-header">100% Design Control</h3>
					<p class="feature-info">Stop being held hostage by the browser's intepretation of what your player should look like.
					You can now easily contol the design of all of the elements of the player using HTML5 and CSS3. </p>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="large-9 medium-9 large-centered medium-centered columns">
				<div class="large-1 medium-2 small-2 columns">
					<img src="images/touch-friendly.png" class="feature-icon"/>
				</div>
				<div class="large-11 medium-10 small-10 columns">
					<h3 class="feature-header">Mobile and Touch Friendly</h3>
					<p class="feature-info">Supporting mobile devices has never been easier. Amplitude.js is smart enough to support the mouse
					and our fingertips.</p>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="large-9 medium-9 large-centered medium-centered columns">
				<div class="large-1 medium-2 small-2 columns">
					<img src="images/call-back.png" class="feature-icon"/>
				</div>
				<div class="large-11 medium-10 small-10 columns">
					<h3 class="feature-header">Call Back Functions For All Events</h3>
					<p class="feature-info">Don't skip a beat by missing out on any event. Amplitude.js can adapt and behave they way it should
					by allowing you to respond to every event that Amplitude.js offers. </p>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="large-9 medium-9 large-centered medium-centered columns">
				<div class="large-1 medium-2 small-2 columns">
					<img src="images/playlists.png" class="feature-icon"/>
				</div>
				<div class="large-11 medium-10 small-10 columns">
					<h3 class="feature-header">Playlists with Dynamic Song Additions</h3>
					<p class="feature-info">The modern web is not meant to be static, and niether should your playlists. Amplitude.js allows you
					to add songs on the fly. </p>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="large-9 medium-9 large-centered medium-centered columns">
				<div class="large-1 medium-2 small-2 columns">
					<img src="images/advanced.png" class="feature-icon"/>
				</div>
				<div class="large-11 medium-10 small-10 columns">
					<h3 class="feature-header">Advanced Music Controls</h3>
					<p class="feature-info">Control and display every aspect of the song. That inlcudes the song title, album title, artist name,
					album art, and song meta data.</p>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="large-9 medium-9 large-centered medium-centered columns">
				<div class="large-1 medium-2 small-2 columns">
					<img src="images/live-feature.png" class="feature-icon"/>
				</div>
				<div class="large-11 medium-10 small-10 columns">
					<h3 class="feature-header">Connect to Live Streams <span class="new-label">New</span></h3>
					<p class="feature-info">Sometimes, we need our tunes to be heard as they are being created. Take your performance to the
					next level and plug in Amplitude.js to have your music heard by millions.</p>
				</div>
			</div>
		</div>
		<div id="amplitude-gallery-container">
			<div class="row">
				<div class="large-9 medium-9 large-centered medium-centered columns">
					<h2 id="amplitude-gallery-header">User Gallery</h2>
					<div class="large-3 small-12 medium-6 columns">
						<a href="examples/playlist-red/">
							<div class="amplitude-gallery-item">
								<img src="../img/amplitude_red.png"/>
								Playlist
								<a href="https://dribbble.com/shots/1128010-Freebies-Music-Player-PSD" target="_blank" class="dribble-link">
									<img src="images/dribble.png"/>
								</a>
							</div>
						</a>
					</div>
					<div class="large-3 small-12 medium-6 columns">
						<a href="examples/single-song-live/">
							<div class="amplitude-gallery-item">
								<img src="../img/amplitude_live.png"/>
								Live
								<a href="https://dribbble.com/shots/627542-Diet-music-player-PSD" target="_blank" class="dribble-link">
									<img src="images/dribble.png"/>
								</a>
							</div>
						</a>
					</div>
					<div class="large-3 small-12 medium-6 columns">
						<a href="examples/single-song/">
							<div class="amplitude-gallery-item">
								<img src="../img/amplitude_blue.png"/>
								Single Song
								<a href="https://dribbble.com/shots/1509327-UI-Kit-PSD-included?list=users&offset=14" target="_blank" class="dribble-link">
									<img src="images/dribble.png"/>
								</a>
							</div>
						</a>
					</div>
					<div class="large-3 small-12 medium-6 columns">
						<a href="examples/multiple-songs/">
							<div class="amplitude-gallery-item">
								<img src="../img/amplitude_multiple.png"/>
								Multiple Songs
							</div>
						</a>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="large-9 medium-9 large-centered medium-centered columns">
					<div class="large-3 small-12 medium-6 columns">
						<a href="examples/playlist-yellow-display/">
							<div class="amplitude-gallery-item">
								<img src="../img/amplitude_advanced_playlist.png"/>
								Advanced Playlist
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<h2 class="amplitude-second-description">All of these great features, for the best price ever.</h2>
			</div>
		</div>
		<div class="row">
			<div class="large-8 medium-8 large-centered medium-centered columns" id="amplitude-footer">
				<img id="amplitude-color-logo" src="images/amplitude-color-logo.png"/>
				<p>THE AUDIO HTML PLAYER FOR THE MODERN ERA</p>
			</div>
		</div>
		<div class="row">
			<div class="large-10 medium-10 large-centered medium-centered columns">
				<div class="large-6 medium-6 columns">
					<a id="amplitude-download-link-footer">
						Download
					</a>
					<a id="amplitude-download-reminder-footer" class="send-download-reminder">
						Send Reminder
					</a>
				</div>
				<div class="large-6 medium-6 columns">
					<a id="amplitude-read-docs-link-footer" href="docs">
						Read the Docs
					</a>
				</div>
			</div>
		</div>
		<div class="row" id="social-row">
			<div class="large-9 medium-9 large-centered medium-centered columns">
				<div class="large-4 medium-4 small-4 columns amplitude-social">
					<a href="https://twitter.com/share" class="twitter-share-button" data-via="521dimensions" data-hashtags="html5audio">Tweet</a>
					<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
				</div>
				<div class="large-4 medium-4 small-4 columns amplitude-social">
					<iframe src="http://ghbtns.com/github-btn.html?user=521dimensions&repo=amplitudejs&type=watch&count=true" allowtransparency="true" frameborder="0" scrolling="0" width="110" height="20"></iframe>
				</div>
				<div class="large-4 medium-4 small-4 columns amplitude-social">
					<div class="fb-share-button" data-href="https://open.521dimensions.com/amplitudejs/" data-type="button_count"></div>
				</div>
			</div>
		</div>
		<div class="row" id="flower-row">
			<div class="large-12 medium-12 small-12 columns">
				<img src="../img/flower.png" id="amplitude-flower">
			</div>
		</div>
	</div>
	<script type="text/javascript">
		amplitude_config = {
			"amplitude_volume": 35,
			"amplitude_songs": [
				{
					"name": "Epitaph",
					"url": "songs/In%20Search%20Of/03%20Epitaph.mp3",
					"artist": "Jake Jendusa",
					"album": "In Search Of",
					"live": false,
					"visual_id": "song-1",
					"cover_art_url": "images/jendusa.jpg"
				},
				{
					"name": "Song from the Styx",
					"url": "songs/In%20Search%20Of/01%20Song%20from%20the%20Styx.mp3",
					"artist": "Jake Jendusa",
					"album": "In Search Of",
					"live": false,
					"visual_id": "song-4",
					"cover_art_url": "images/jendusa.jpg"
				},
				{
					"name": "Porch Stomp Blues",
					"url": "songs/In%20Search%20Of%20EP/03%20Porch%20Stomp%20Blues.mp3",
					"artist": "Jake Jendusa",
					"album": "In Search Of EP",
					"live": false,
					"visual_id": "song-5",
					"cover_art_url": "images/jendusaep.jpg"
				},
				{
					"name": "Dangerous",
					"url": "songs/In%20Search%20Of/04%20Dangerous.mp3",
					"artist": "Jake Jendusa",
					"album": "In Search Of",
					"live": false,
					"visual_id": "song-5",
					"cover_art_url": "images/jendusa.jpg"
				},
				{
					"name": "Crows",
					"url": "songs/In%20Search%20Of/05%20Crows.mp3",
					"artist": "Jake Jendusa",
					"album": "In Search Of",
					"live": false,
					"visual_id": "song-6",
					"cover_art_url": "images/jendusa.jpg"
				}
			],
			"amplitude_continue_next": true
		}
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