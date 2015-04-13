<!DOCTYPE html>
<html>
	<head>
		<title>Test Everything</title>

		<script type="text/javascript" src="../../js/amplitude.js"></script>
		<script type="text/javascript" src="../../visualizations/michaelbromley.js"></script>
		<script type="text/javascript" src="../../visualizations/bar.js"></script>
	</head>
	<style>
		.amplitude-song-time-visualization{
			width: 500px;
			height: 5px;
			background-color: black;
		}
		.amplitude-song-time-visualization-status{
			height: 5px;
			background-color: red;
		}
	</style>
	<body id="test">
		<div class="amplitude-play-pause" style="width: 50px; height: 50px; background-color: orange;"></div>
		<br>
		<div class="amplitude-song-time-visualization" id="song-time-visualization" amplitude-single-song-time-visualization="true">

		</div>
		<!--<div class="amplitude-song-time-visualization" amplitude-song-index="1"></div>-->
	</body>
	<script type="text/javascript">
		Amplitude.init({
			"songs": [
				{
					"name": "Burial",
					"artist": "YOGI feat Pusha T - Burial",
					"album": "Burial Skrillex + Trollphace Remix",
					"url": "https://soundcloud.com/yogitrf/yogi-feat-pusha-t-burial-skrillex-trollphace-remix",
					"visualization": "michaelbromley_visualization"
				},
				{
					"name": "Hell Of A Night",
					"artist": "Schoolboy Q (YOGI Remix)",
					"album": "YOGI remixes",
					"url": "https://soundcloud.com/yogitrf/schoolboy-q-hell-of-a-night",
					"visualization": "michaelbromley_visualization"
				},
				{
					"name": "Christian Bale",
					"artist": "YOGI Feat. Casey Veggies, Knytro, Sway, KSI, Raptor",
					"album": "Christian Bale feat. Casey Veggies, Knytro, Sway, KSI, Raptor",
					"url": "https://soundcloud.com/yogitrf/yogi-christian-bale-feat-casey-veggies-knytro-sway-ksi-raptor?in=yogitrf/sets/burial-ep"
				}
			],
			"volume_increment": 10,
			"volume_decrement": 10,
			"start_song": 1,
			"soundcloud_client": '7f4a6ed1488c1ebdf31600767b9b6350'
		});
		Amplitude.registerVisualization( MichaelBromleyVisualization, {
			'fullscreen': true
		} );
		Amplitude.registerVisualization( BarVisualization );
	</script>
	
</html>