/*
	This is a template for how to build a visualization for 
	AmplitudeJS.  The visualization should be modular contain 
	the methods and variables outlined. You can add any additional
	methods inside of the object.
*/

/*
	Replace 'VisualizationObjectName' with the proper object
	name for your visualization.
*/
var VisualizationObjectName = (function(){
	/*
		This is the id and key that will
		be referenced by AmplitudeJS if you 
		want to change to this visualization.
		All spaces should be replaced with an
		underscore, '_', because this will be
		used in a JSON key structure.
	*/
	var amplitude_visualization_id = 'visualization_id';

	/*
		The name will be used for debugging purposes
	*/
	var amplitude_visualization_name = 'Visualization Name';

	/*
		This container will always be the element
		id 'amplitude-visualization'.  It will be 
		set in your startVisualzation method.  Your 
		visualization will be appending the canvas
		for your visualization to this container
		when started and emptying it when stopping.
		We just define the variable here so we can
		use it in a global setting in our methods.
	*/
	var amplitude_container = '';

	/*
		The preferences is a JSON object containing
		settings that the user can change. Colors,
		widths, heights, etc can be defined here. Feel
		free to be creative! On register with Amplitude,
		the preferences that the user provides will over-write
		the default. Make sure you define defaults.
	*/

	var amplitude_visualization_preferences = {

	}

	/*
		Placeholder for the analyser. This should be set when
		you start the visualization and use the Amplitude.anlyser() method
		which will return the analyser bound to the active song
	*/
	var analyser = '';

	/*
		REQUIRED
		Start visualization method. Initialize your visualization here.
		Between the if statement is where you initialize your visualization
		and add your canvas(s) to the element.  We need to make sure the element
		exists first of all.
	*/
	function startVisualization(  ){
		if( document.getElementById('amplitude-visualization') ){
			analyser = Amplitude.analyser();
			
			amplitude_container = document.getElementById('amplitude-visualization');

			/*
				Your code here.
			*/
		}
	}

	/*
		REQUIRED
		Stop visualization method. Unbind ANY recurring visualization methods so
		other visaulzations can fire on the audio tag. Also, set the amplitude_container
		to '' so other visualizations can fill it with what they need.
	*/
	function stopVisualization(){
		amplitude_container.innerHTML = '';
	}

	/*
		REQUIRED
		This method simply sets the amplitude_visualization_preferences with
		the user provided preferences.
	*/
	function setPreferences( preferences ){
		for(var key in amplitude_visualization_preferences){
			if( preferences[key] != undefined) {
				amplitude_visualization_preferences[key] = preferences[key];
			}
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