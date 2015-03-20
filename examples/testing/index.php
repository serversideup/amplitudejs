<!DOCTYPE html>
<html>
	<head>
		<title>Test Everything</title>

		<script type="text/javascript" src="../../js/amplitude.js"></script>
		<script type="text/javascript" src="../../visualizations/michaelbromley.js"></script>
		<script type="text/javascript" src="../../visualizations/bar.js"></script>
	</head>
	<body id="test">
		<div class="amplitude-play-pause" style="width: 50px; height: 50px; background-color: orange;"></div>
		<script src="http://connect.soundcloud.com/sdk.js"></script>
		<script>
		SC.initialize({
		  client_id: '7f4a6ed1488c1ebdf31600767b9b6350'
		});

		SC.get("/tracks/176626042", function(sound){
		 console.log( sound.url );
		 console.log( sound );
		});
		SC.stream('https://api.soundcloud.com/tracks/176626042/stream', function(sound){

		});
		SC.get('/resolve/?url=https://soundcloud.com/skrillex/avicii-levels-skrillex-remix', function( sound ){
			console.log( sound );
		});
		</script>
	</body>
	<script type="text/javascript">
		Amplitude.init({
			"songs": [
				{
					"name": "Song From the Styx",
					"artist": "Jake Jendusa",
					"album": "In Search Of EP",
					"url": "https://api.soundcloud.com/tracks/176626042/stream?client_id=7f4a6ed1488c1ebdf31600767b9b6350",
					"live": false,
					"cover_art_url": "images/jendusaep.jpg"
				}
			],
			"volume_increment": 10,
			"volume_decrement": 10
		});
		Amplitude.registerVisualization( MichaelBromleyVisualization, {
			'fullscreen': true
		} );
		Amplitude.registerVisualization( BarVisualization );

	</script>
	
</html>