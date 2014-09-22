<!DOCTYPE html>
<html>
	<head>
		<title>Single Song Picture Tutorial</title>
		<script type="text/javascript" src="js/amplitude.js"></script>
		<link rel="stylesheet" type="text/css" href="css/playlist-styles.css"/>
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
	        <input class="bar" type="range" id="amplitude-song-slider" value="0"/>
		</div>
		<div id="player-playlist">
	        <div class="playlist-song" id="song-2">
	            <div class="playlist-song-album-art">
	                <img src="images/jendusaep.jpg">
	            </div>
	            <div class="playlist-song-information">
	                Song: Stream the World
	            </div>
	            <div class="playlist-audio-controls">
	                <div class="amplitude-play-pause amplitude-list-paused" amplitude-song-index="0"></div>
	            </div>
	        </div>
	        <div class="playlist-song" id="song-3">
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
	        <div class="playlist-song" id="song-4">
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
	<div id="amplitude-mute" style="width:30px; height: 30px; background-color:red;"></div>
	<div id="amplitude-volume-up" style="width:30px; height:30px; color:white; background-color:purple;">+</div>
	<div id="amplitude-volume-down" style="width:30px; height:30px; color:white; background-color:green;">-</div>
	<div onclick="addSong()" style="width:30px; height:30px; color:white; background-color:orange"><div>
	<input class="bar" type="range" id="amplitude-volume-slider" value="0" style="-webkit-appearance: slider-vertical"/>

	<script type="text/javascript">
		amplitude_config = {
			"amplitude_volume": 35,
			"amplitude_songs": [
				{
					"name": "Stream the World",
					"url": "http://1942.live.streamtheworld.com/CBC_R1_WPG_L_SC",
					"live": true,
					"visual_id": "song-2",
					"cover_art_url": "images/jendusaep.jpg"
				},
				{
					"name": "Porch Stomp Blues",
					"artist": "Jake Jendusa",
					"album": "In Search Of EP",
					"url": "songs/In%20Search%20Of%20EP/03%20Porch%20Stomp%20Blues.mp3",
					"live": false,
					"visual_id": "song-3",
					"cover_art_url": "images/jendusa.jpg"
				},
				{
					"name": "Man With the Keys",
					"artist": "Jake Jendusa",
					"album": "In Search Of EP",
					"url": "songs/In%20Search%20Of/02%20Man%20with%20the%20Keys.mp3",
					"live": false,
					"visual_id": "song-4",
					"cover_art_url": "images/jendusa.jpg"
				}
			],
			"amplitude_volume_up_amount": 15,
			"amplitude_volume_down_amount": 10
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

	    function addSong(){
	    	
	    	var new_song = {
	    		"name": "Shooting Star",
	    		"artist": "Air Traffic",
	    		"album": "Fractured Life",
	    		"url": "songs/03%20Shooting%20Star.m4a",
	    		"visual_id": "song-8",
	    		"cover_art_url": "images/fracturedlife.jpg",
	    		"live": false
	    	}


	    	var song_index = amplitude_add_song( new_song );
	    	var new_song_visual_display = '<div class="playlist-song" id="song-8"><div class="playlist-song-album-art"><img src="images/jendusa.jpg"></div><div class="playlist-song-information">Song: Shooting Star<br>Artist: Air Traffic<br>Album: Fractured Life</div><div class="playlist-audio-controls"><div class="amplitude-play-pause amplitude-list-paused" amplitude-song-index="'+song_index+'"></div></div></div>';

	    	document.getElementById('player-playlist').innerHTML += new_song_visual_display;
	    }
	</script>
</html>