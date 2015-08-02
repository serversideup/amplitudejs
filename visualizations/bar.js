var BarVisualization = (function() {
	/*
		Amplitude Visualzation Template
	*/
	var amplitude_visualization_id = 'bar_visualization';
	var amplitude_visualization_name = 'Bar Visualization';
	var amplitude_container = '';

	var amplitude_visualization_preferences = {
		'bar_color': '#ff0000',
		'width': '500',
		'height': '200'
	};
	
	var analyser = '';
	/*
		REQUIRED
		Start visualization method. Initialize your visualization here.
	*/
	function startVisualization(  ){
		if( document.getElementById('amplitude-visualization') ){
			analyser = Amplitude.analyser();

			amplitude_container = document.getElementById('amplitude-visualization');

			canvas = document.createElement('canvas');
			canvas.setAttribute('width', amplitude_visualization_preferences.width);
			canvas.setAttribute('height', amplitude_visualization_preferences.height);
			ctx = canvas.getContext('2d');
			amplitude_container.appendChild(canvas);

			CANVAS_HEIGHT = canvas.height;
			CANVAS_WIDTH = canvas.width;

			rafCallback();
		}
	}

	/*
		REQUIRED
		Stop visualization method. Unbind ANY recurring visualization methods so
		other visaulzations can fire on the audio tag.
	*/
	function stopVisualization(){
		window.cancelAnimationFrame(request_animation);
		amplitude_container.innerHTML = '';
	}

	/*
		REQUIRED
		If you don't have any preferences, you don't have to implement any
		of this, just leave the stub and nothing will happen.
	*/
	function setPreferences( preferences ){
		for(var key in amplitude_visualization_preferences){
			if( preferences[key] != undefined) {
				amplitude_visualization_preferences[key] = preferences[key];
			}
		}
	}

	var CANVAS_HEIGHT;
	var CANVAS_WIDTH;
	var ctx;
	var canvas = '';
	var request_animation;

	function rafCallback(time) {
		request_animation = window.requestAnimationFrame(rafCallback, canvas);

		var freqByteData = new Uint8Array(analyser.frequencyBinCount);
		analyser.getByteFrequencyData(freqByteData);

		var SPACER_WIDTH = 10;
		var BAR_WIDTH = 5;
		var OFFSET = 100;
		var CUTOFF = 23;
		var numBars = Math.round(CANVAS_WIDTH / SPACER_WIDTH);

		ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		ctx.fillStyle = amplitude_visualization_preferences.bar_color;
		ctx.lineCap = 'round';

		for (var i = 0; i < numBars; ++i) {
			var magnitude = freqByteData[i + OFFSET];
			ctx.fillRect(i * SPACER_WIDTH, CANVAS_HEIGHT, BAR_WIDTH, -magnitude);
		}
	}

	/*
		REQUIRED
		Accessors for communicating with the visualization.
	*/
	return {
		startVisualization: startVisualization,
		stopVisualization: stopVisualization,
		setPreferences: setPreferences,
		getName: amplitude_visualization_name,
		getID: amplitude_visualization_id
	}
})();