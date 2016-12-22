/*
	AmplitudeFX.js
	Version: 1.0
*/
var AmplitudeFX = (function () {

	var config = {
		context: '',
		analyser: '',
		source: '',
		/*
			Handles all of the user registered visualizations if the user chooses
			to use visualizations in their design.
		*/
		visualizations: new Array(),

		/*
			Is set to the active visualization so Amplitude can detect changes
			per song if necessary.
		*/
		active_visualization: '',

		/*
			Holds the information the user defined about the current visualization,
			such as preferences.
		*/
		current_visualization: {},

		/*
			When the visualization is started, this is set to true.
		*/
		visualization_started: false
	}

	function publicInit(){
		var contextClass =  ( window.AudioContext 
							|| window.webkitAudioContext 
							|| window.mozAudioContext 
							|| window.oAudioContext 
							|| window.msAudioContext );

		if( contextClass ){
			/*
				Set the Web Audio API Context
			*/
			config.context = new contextClass();

			/*
				Create the Web Audio API Analyzer for the context
			*/
			config.analyser = config.context.createAnalyser();

			/*
				Bind the source to the Javascript Audio Element
			*/
			config.source 	= config.context.createMediaElementSource( Amplitude.audio() );

			/*
				Connect the analyser to the source
			*/
			config.source.connect( config.analyser );

			/*
				Connect the context destination to the analyser
			*/
			config.analyser.connect( config.context.destination );

			/*
				TODO: Set the cross origin to Anonymous HERE 
			*/
		}else{
			privateWriteDebugMessage( 'This browser does not support the Web Audio API' );
		}
	}

	/*--------------------------------------------------------------------------
		Registers a visualization and sets that visualization's 
		preferences. When creating a visualization, you can set certain
		preferences that the user can overwrite similar to Amplitude.

		Public Accessor: Amplitude.registerVisualization( visualization, preferences )

		@param visualzation A visualization object that gets registered
		with Amplitude

		@param preferences A JSON object of preferences relating to the
		visualization
	--------------------------------------------------------------------------*/
	function publicRegisterVisualization( visualization, preferences ){
		/*
			Adds the visualization to the global config so it knows
			it can be used when playing songs.

			getID is a public function for getting a visualization's id.
			It becomes the key to access the visualization.
		*/
		config.visualizations[ visualization.getID ] = visualization;
		
		/*
			If defined, set the visualization preferences.
			setPreferences is a public function for connecting
			to a user defined visualization.
		*/
		if( preferences != undefined ){
			visualization.setPreferences( preferences );
		}
	}

	/*--------------------------------------------------------------------------
		Changes the active visualization. Could be called from a 
		user defined dropdown or whatever way the user wants to change a
		visualization dynamically.
		
		Public Accessor: Amplitude.changeVisualization( visualization )

		@param string visualization The name of the visualization
		that should be used.
	--------------------------------------------------------------------------*/
	function publicChangeActiveVisualization( visualization ){
		/*
			First we stop the active visualization. If the visualization
			is set up correctly, it should halt all callbacks, and clear
			the amplitude-visualization element.
		*/
		privateStopVisualization();

		/*
			Next we set the active visualization in the config.
		*/
		config.active_visualization = visualization;

		/*
			We then start the visualization hooks again.  This should
			insert itself into the amplitude-visualization element
			and bind the proper hooks.
		*/
		privateStartVisualization();
	}

	/*--------------------------------------------------------------------------
		Checks to see if the current browser is capable of running
		visualizations. If the AudioContext is available, then the browser
		can play the visualization.
		
		Public Accessor: Amplitude.visualizationCapable()
		
		@returns BOOL true if the browser can play the visualization and false
		if the browser cannot.
	--------------------------------------------------------------------------*/
	function publicVisualizationCapable(){
		if ( !window.AudioContext ) {
			return false;
		}else{
			return true;
		}
	}

	/*--------------------------------------------------------------------------
		Calls the start method on the active visualization.
	--------------------------------------------------------------------------*/
	function privateStartVisualization(){
		/*
			If the visualization is not started, and there are visualizations
			ready to be activated, we check to see if the user defined a 
			starting visualization.  If there is a starting visualization,
			then we start that one, otherwise we grab the first visualization
			defined and start that one.
		*/

		if( !config.visualization_started && Object.keys(config.visualizations).length > 0){
			if( config.active_visualization != '' ){
				config.visualizations[config.active_visualization].startVisualization(config.active_song);
				config.current_visualization = config.visualizations[config.active_visualization];
			}else{
				for(first_visualization in config.visualizations);

				config.visualizations[first_visualization].startVisualization(config.active_song);
				config.current_visualization = config.visualizations[first_visualization];
			}
			config.visualization_started = true;
		}
	}

	/*--------------------------------------------------------------------------
		Calls the stop method of the active visualization.
		If the visualization is started, we stop it.
	--------------------------------------------------------------------------*/
	function privateStopVisualization(){
		if( config.visualization_started && Object.keys(config.visualizations).length > 0){
			config.current_visualization.stopVisualization();
			config.visualization_started = false;
		}
	}

	/*--------------------------------------------------------------------------
		If there is a visualization specifically for a song, we set that
		as the active visualization. Only if one is specified, otherwise
		nothing changes and we continue using the active visualization.

		@returns BOOL Returns true if there is a specific visualization for
		the song.
	--------------------------------------------------------------------------*/
	function privateCheckSongVisualization(){
		var changed = false;

		/*
			Checks to see if the song actually has a specific visualization
			defined.
		*/
		if( config.active_metadata.visualization ){
			
			/*
				If the visualization is different and there is an active
				visualization. We must stop the active visualization
				before setting the new one.
			*/
			if( config.active_metadata.visualization != config.active_visualization && config.active_visualization != '' ){
				
				privateStopVisualization();
				
				/*
					Set the visualization changed to true
					so we return the status change.
				*/
				changed = true;

				/*
					Sets the active visualization to the new
					visualization that the song uses.
				*/
				config.active_visualization = config.active_metadata.visualization;
			}
		}
		/*
			Returns the status of the new song visualization.
			If there is a change it returns true and we will
			have to start the the visualization.
		*/
		return changed;
	}

	/*--------------------------------------------------------------------------
		Initializes the audio context if the user wants to use visualizations
		with their AmplitudeJS player.

		REMOVE THIS THIS IS PART OF AMPLITUDE FX.
	--------------------------------------------------------------------------*/
//	function privateHelpInitializeAudioContext(){
//		/*
//			If the browser does not support the Web Audio API and the
//			user has debug turned on, write to the console.
//		*/
//		if( window.AudioContext ){
//			/*
//				Set the Web Audio API Context
//			*/
//			config.context 	= new AudioContext();
//
//			/*
//				Set the Web Audio API Analyzer to the context
//			*/
//			config.analyser = config.context.createAnalyser();
//
//			/*
//				Bind the source to the Javascript Audio Element
//			*/
//			config.source 	= config.context.createMediaElementSource( config.active_song );
//			
//			/*
//				Connect the analyser to the source
//			*/
//			config.source.connect( config.analyser );
//			
//			/*
//				Connect the context destination to the analyser
//			*/
//			config.analyser.connect( config.context.destination );
//
//			/*
//				Set cross origin to anonymouse so we have a better chance of being able
//				to use the power of the Web Audio API.
//			*/
//			config.active_song.crossOrigin = "anonymous";
//		}else{
//			/*
//				Checks to see if the Audio Context is available in the window meaning
//				the browser can use the Web Audio API.
//			*/
//			if( !window.AudioContext ){
//				
//			}
//		}
//	}

	return {
		registerVisualization: publicRegisterVisualization,
		visualizationCapable: publicVisualizationCapable,
		changeVisualization: publicChangeActiveVisualization,
	}

})();

/*
	So when using AmplitudeFX the user can still set the visualization
	with the song, we just grab the song and handle that in here.

*/