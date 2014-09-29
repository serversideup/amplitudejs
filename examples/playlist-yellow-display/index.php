<!DOCTYPE html>
<html>
	<head>
		<title>Single Song Picture Tutorial</title>
		<script type="text/javascript" src="js/amplitude.js"></script>
		<link rel="stylesheet" type="text/css" href="css/styles.css"/>
	</head>

	<div id="player">
		<div id="player-art">
	        <div id="amplitude-album-art"></div>
	    </div>
		<div id="player-top">
			<div id="amplitude-play-pause" class="amplitude-paused"></div>
			<div id="track-info-container">
				<span id="amplitude-now-playing-title">Song Name</span> <span id="slash">-</span><br><span id="amplitude-now-playing-artist">Artist</span>
			</div>
			<div id="time-info-container">
	            <span id="amplitude-current-time">0:00</span> / <span id="amplitude-audio-duration">0:00</span>
	        </div>
	        <input type="range" id="amplitude-song-slider" value="0"/>
		</div>
		<div id="player-playlist">
			<div class="playlist-song" id="song-1">
	            <div class="playlist-song-album-art">
	                <img src="images/jendusa.jpg">
	            </div>
	            <div class="playlist-song-information">
	                Song: Epitaph<br>
	                Artist: Jake Jendusa<br>
	                Album: In Search Of
	            </div>
	            <div class="playlist-audio-controls">
	                <div class="amplitude-play-pause amplitude-list-paused" amplitude-song-index="0"></div>
	            </div>
	        </div>
	        <div class="playlist-song" id="song-2">
	            <div class="playlist-song-album-art">
	                <img src="images/jendusaep.jpg">
	            </div>
	            <div class="playlist-song-information">
	                Song: Porch Stomp Blues<br>
	                Artist: Jake Jendusa<br>
	                Album: In Search Of EP
	            </div>
	            <div class="playlist-audio-controls">
	                <div class="amplitude-play-pause amplitude-list-paused" amplitude-song-index="1"></div>
	            </div>
	        </div>
	        <div class="playlist-song" id="song-3">
	            <div class="playlist-song-album-art">
	                <img src="images/jendusa.jpg">
	            </div>
	            <div class="playlist-song-information">
	                Song: Man with the Keys<br>
	                Artist: Jake Jendusa<br>
	                Album: In Search Of
	            </div>
	            <div class="playlist-audio-controls">
	                <div class="amplitude-play-pause amplitude-list-paused" amplitude-song-index="2"></div>
	            </div>
	        </div>
	        <div class="playlist-song" id="song-4">
	            <div class="playlist-song-album-art">
	                <img src="images/jendusa.jpg">
	            </div>
	            <div class="playlist-song-information">
	                Song: Song from the Styx<br>
	                Artist: Jake Jendusa<br>
	                Album: In Search Of
	            </div>
	            <div class="playlist-audio-controls">
	                <div class="amplitude-play-pause amplitude-list-paused" amplitude-song-index="3"></div>
	            </div>
	        </div>
	        <div class="playlist-song" id="song-5">
	            <div class="playlist-song-album-art">
	                <img src="images/jendusa.jpg">
	            </div>
	            <div class="playlist-song-information">
	                Song: Dangerous<br>
	                Artist: Jake Jendusa<br>
	                Album: In Search Of
	            </div>
	            <div class="playlist-audio-controls">
	                <div class="amplitude-play-pause amplitude-list-paused" amplitude-song-index="4"></div>
	            </div>
	        </div>
	        <div class="playlist-song" id="song-6">
	            <div class="playlist-song-album-art">
	                <img src="images/jendusa.jpg">
	            </div>
	            <div class="playlist-song-information">
	                Song: Crows<br>
	                Artist: Jake Jendusa<br>
	                Album: In Search Of
	            </div>
	            <div class="playlist-audio-controls">
	                <div class="amplitude-play-pause amplitude-list-paused" amplitude-song-index="5"></div>
	            </div>
	        </div>
	    </div>
		<div id="player-bottom">
	        <div class="control" onclick="toggle_playlist()">
	            <img src="images/yellow-playlist.png"/> List 
	        </div>
	        <div class="control" id="amplitude-previous">
	            <img src="images/yellow-previous.png"/> Prev
	        </div>
	        <div class="control" id="amplitude-next">
	            Next <img src="images/yellow-next.png"/>
	        </div>
	        <div class="control" id="amplitude-shuffle">
	            Mix <img id="shuffle-on-image" src="images/yellow-shuffle-on.png"/><img id="shuffle-off-image" src="images/yellow-shuffle.png"/>
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
					"cover_art_url": "images/jendusaep.jpg"
				},
				{
					"name": "Porch Stomp Blues",
					"artist": "Jake Jendusa",
					"album": "In Search Of EP",
					"url": "songs/In%20Search%20Of%20EP/03%20Porch%20Stomp%20Blues.mp3",
					"live": false,
					"visual_id": "song-2",
					"cover_art_url": "images/jendusaep.jpg"
				},
				{
					"name": "Man With the Keys",
					"artist": "Jake Jendusa",
					"album": "In Search Of EP",
					"url": "songs/In%20Search%20Of/02%20Man%20with%20the%20Keys.mp3",
					"live": false,
					"visual_id": "song-3",
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
</html>