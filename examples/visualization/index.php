<!DOCTYPE html>
<html>
	<head>
		<title>AmplitudeJS Visualization</title>
		<link href="css/visualization_player.css" type="text/css" rel="stylesheet"/>

		<script type="text/javascript" src="../../js/amplitude.js"></script>
		<script type="text/javascript" src="../../visualizations/michaelbromley.js"></script>
		<script type="text/javascript" src="../../visualizations/bar.js"></script>
	</head>
	<body>
		<style>
			.amplitude-song-container{
				background-color: black;
			}
			.amplitude-song-container.amplitude-active-song-container{
				background-color: blue;
			}
		</style>
		<div class="amplitude-song-container" amplitude-song-index="0" style="width: 50px; height: 50px;">

		</div>
		<div class="amplitude-song-container" amplitude-song-index="1" style="width: 50px; height: 50px;">

		</div>
		<div id="player">
			<div id="amplitude-visualization">

			</div>
			<div id="control-container">
				<img amplitude-song-info="cover" id="side-cover"/>
				<div id="controls">
					<div class="amplitude-play-pause"><img src="images/play.png" id="play-button"/><img src="images/pause.png" id="pause-button"/></div>
					<input type="range" id="song-slider" class="amplitude-song-slider" amplitude-singular-song-slider="true"/>
				</div>
			</div>
		</div><br>
		<span onclick="change_visualization()" style="display: block; margin: auto; width: 100px; text-align: center; color: white; font-weight: bold; font-family: 'Arial', sans-serif;">Change</span>
	</body>
	<script type="text/javascript">
		Amplitude.init({
			"songs": [
				{
					"name": "Emulator",
					"artist": "The Crystal Method",
					"album": "Emulator",
					"url": "songs/01%20Emulator.mp3",
					"cover_art_url": "images/emulator.jpg",
					"visualization": "michaelbromley_visualization"
				},
				{
					"name": "A Sky Full of Stars",
					"artist": "Coldplay",
					"album": "Ghost Stories",
					"url": "songs/08%20A%20Sky%20Full%20Of%20Stars.mp3"
				}
			],
			"song_ended_callback": "test_function"
		});
		Amplitude.registerVisualization( MichaelBromleyVisualization, {
			'fullscreen': true;
		} );
		Amplitude.registerVisualization( BarVisualization, {
			'bar_color': '#000000',
			'width': '500',
			'height': '500'
		} );

		function change_visualization(){
			Amplitude.changeVisualization( 'bar_visualization' );
		}
		function test_function(){
			console.log('SONG HAS ENEDED');
		}
	</script>
</html>