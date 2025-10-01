---
title: Web Audio API Visualizations - AmplitudeJS Documentation
meta:
  - name: description
    content: Amplitude.js is the HTML5 audio player for the modern era. Using no dependencies, take control of the browser and design a web audio player the way you want it to look.
  - name: og:locale
    content: en_US
  - name: og:type
    content: website
  - name: og:title
    content: Amplitude.js The Open Source HTML5 Audio Player for the Modern Era
  - name: og:description
    content: Amplitude.js is the open source HTML5 audio player for the modern era. Using no dependencies, take control of the browser and design an audio player the way you want it to look.
  - name: og:url
    content: https://521dimensions.com/open-source/amplitudejs/docs/fx/visualizations.html
  - name: og:site_name
    content: Amplitude.js
  - name: og:image
    content: https://521dimensions.com/img/open-source/amplitudejs/og-image-amplitudejs.png
  - name: og:image:width
    content: 1200
  - name: og:image:height
    content: 630
  - name: twitter:card
    content: summary_large_image
  - name: twitter:description
    content: Amplitude.js is the open source HTML5 audio player for the modern era. Using no dependencies, take control of the browser and design an audio player the way you want it to look. Available for free on Github.
  - name: twitter:title
    content: Amplitude.js The HTML Audio Player for the Modern Era
  - name: twitter:site
    content: "@521dimensions"
  - name: twitter:image
    content: https://521dimensions.com/img/open-source/amplitudejs/og-image-amplitudejs.png
  - name: creator
    content: "@521dimensions"
---

# Overview of Visualizations
<carbon-ads/>
So what are audio Visualizations? They are the beautiful art that vibe to the beat and react to the different highs and lows of the songs. iTunes is famous for having a beautiful visualization for it's audio.

In AmplitudeJS you can add your own visualization element to the page that operates the same as an iTunes visualization! It reads in the highs and lows and different frequencies of the song to generate a beautiful visual to go along with the music! If you are really motivated, you can build your own using the template provided.

Deployed with AmplitudeJS are two visualizations:

1. Michael Bromley Visualization - Kudos to Michael Bromley and his visualization he released on github here: [https://www.michaelbromley.co.uk/experiments/soundcloud-vis/#muse/undisclosed-desires](https://www.michaelbromley.co.uk/experiments/soundcloud-vis/#muse/undisclosed-desires). I adapted what he made and placed it in the AmplitudeJS visualization template for use with AmpltidueJS.

2. Bar Visualization - A simple visualization that show bars on what looks like an equalizer.

## Registering a Visualization
To register a visualization with AmplitudeJS, you have to first include the Javascript object in your source:

```html
<script type="text/javascript" src="../../dist/visualizations/michaelbromley.js"></script>
```

When built with the template provided, this file will export a visualization object with an interface used by AmplitudeJS.

Now there are 2 ways to register. First is on initialization, second is through a public method. You can register as many visualizations as you want, just add another object!

### Register a Visualization on Initialization

Once you've included the Visualization, you can add it to your visualizations array on initialization like so:

```javascript
  Amplitude.init({
    songs: ["..."],
    visualizations: [
      {
        object: MichaelBromleyVisualization,
        params: {

        }
      }
    ]
  });
```

So the object that is included with the file is what we assign to the `object` key within the visualization. The `params` object contains any customizations opened up from the visualization developer to be set.

Your visualization can now be used within AmplitudeJS!

### Register a Visualization Through the Public Method

The other way to register a visualization is through the public `Amplitude.registerVisualization( visualization, preferences )` method. The first parameter being the object included with the visualization file and the second parameter being a JSON object containing any of the parameters needed to overwrite defaults provided by the visualization.

```javascript
  Amplitude.registerVisualization( visualization, preferences );
```

You can now use the visualization within AmplitudeJS.

### Define a Global Visualization

Now that we have our visualizations included, we can define them in a variety of manners. The first way we can set our visualization is to a global element. This can be set on initialization like this:

```javascript
  Amplitude.init({
    songs: ["..."],
    visualizations: [
      {
        object: MichaelBromleyVisualization,
        params: {

        }
      }
    ],
    visualization: 'michaelbromley_visualization'
  });
```

You can set the `visualization` key to one of the keys for a visualization you registered.

You can also set the global visualization through the public method like this:

```javascript
Amplitude.setGlobalVisualization( visualizationKey );
```

Now you just need a visualization element like this:
```html
<div class="amplitude-visualization"></div>
```

Now when the audio plays, the visualization will be used that's defined on the global level!

### Define a Playlist Visualization

You can also define a visualization specific for your playlist. This means that whatever song is being played in a playlist, the visualization runs for. So if you have 3 playlists, you can have 3 different visualizations!

You just need to set up AmplitudeJS with your visualizations and apply the key to the playlist key `visualization`:
```javascript
  Amplitude.init({
    songs: ["..."],
    visualizations: [
      {
        object: MichaelBromleyVisualization,
        params: {

        }
      }
    ],
    playlists: {
      "hip_hop": {
        visualization: 'michaelbromley_visualization',
        songs: ["..."]
      }
    }
  });
```

Now your visualization is scoped to a playlist! You can also set the visualization through the public facing method like this:

```javascript
Amplitude.setPlaylistVisualization( playlist_key, visualization_key );
```

And to use the visualization scoped for the playlist, you have to add an element with the proper attribute:
```html
<div class="amplitude-visualization" data-amplitude-playlist="{playlist_key}"></div>
```

### Define an Individual Song Visualization

To be even more flexible, you can define a visualization for an individual song! Now just a warning, if you apply a visualization for an individual song it will overwrite your default visualization when the song has been played!

To add a visualization for an individual song, you just need to add the key to the song object for the `visualization` like so:

```javascript
  Amplitude.init({
    songs: [{
      name: "Test",
      visualization: "michaelbromley_visualization"
    }],
    visualizations: [
      {
        object: MichaelBromleyVisualization,
        params: {

        }
      }
    ]
  });
```

Now whenever the song named 'Test' plays, the visualization defined will show up in the visualization element specified for the song BUT ALSO the global visualization element.

You can also set the visualization for an individual song using the `Amplitude.setSongVisualization(songIndex, visualizationKey)` method like so:

```javascript
Amplitude.setSongVisualization( songIndex, visualizationKey );
```

To display this visualization, simply add an element like this:
```html
<div class="amplitude-visualization" data-amplitude-song-index="{song_index}"></div>
```

### Define an Individual Song In Playlist Visualization

You can even specify a visualization for an individual song within a playlist. This will overwrite the playlist visualization! To do that, add the visualization to a song either in the songs array that is included in your playlist OR in a song object in the playlist's scoped songs array like so:

```javascript
  Amplitude.init({
    songs: ["..."],
    playlists: {
      "hip_hop": {
        songs: [{
          name: "Test",
          visualization: "michaelbromley_visualization"
        }]
      }
    },
    visualizations: [
      {
        object: MichaelBromleyVisualization,
        params: {

        }
      }
    ]
  });
```

If you want to do it through a public method, you can register it on a song in a playlist using:

```javascript
Amplitude.setSongInPlaylistVisualization( playlistKey, songIndex, visualizationKey );
```

To display it as an element, simply add the following to your player:
```html
<div class="amplitude-visualization" data-amplitude-song-index="{song_index}" data-amplitude-playlist="{playlist}"></div>

```

## Build Your Own Visualization

If you are really motivated and want to build your own visualization, you can!! AmplitudeJS comes with a template for building your own visualization object. You can make any variety of visualization for the audio that you want. Here is the template:

```javascript
/*
	This is a template for how to build a visualization for
	AmplitudeJS. The visualization should be modular contain
	the methods and variables outlined. You can add any additional
	methods or variables inside of the object.
*/

/*
	Replace 'VisualizationObjectName' with the proper object
	name for your visualization.
*/
function VisualizationObjectName(){
	/*
		Define the ID of your visualization. This is used to apply
		visualizations to songs, playlists, and default. It is a JSON
		key so make sure you use `_`
	*/
	this.id = 'visualization_id';

	/*
		Define a clean name for your visualization.
	*/
	this.name = 'Visualization Name';

	/*
		Initialize the container. This will get set to the element passed in
		when you start the visualization.
	*/
	this.container = '';

	/*
		Define any settings that your visualization will need. This is JSON so
		make sure it's clearly defined and standards are followed. These should be
		able to be overwritten by the user when they pass in their preferences.
	*/
	this.preferences = {

	}

	/*
		Initialize the analyser for the visualization. This will be set when the
		visualization is started.
	*/
	this.analyser = '';

	/*
		Returns the ID of the visualization. Do not overwrite this, this is necessary
		for registering the visualization.
	*/
	this.getID = function(){
		return this.id;
	}

	/*
		Returns the name of the visualization.
	*/
	this.getName = function(){
		return this.name;
	}

	/*
		Merge the user defined preferences with the preferences for the visualization.
	*/
	this.setPreferences = function( userPreferences ){
		for( var key in this.preferences ){
			if( userPreferences[ key ] != undefined) {
				this.preferences[key] = userPreferences[key];
			}
		}
	}

	/*
		Start the visualization. Do not over write this. This is how the visualization
		gets kicked into gear. The element passed in is the container element where you
		will insert canvas' or whatever works.
	*/
	this.startVisualization = function( element ){
		this.analyser = Amplitude.getAnalyser();

		this.container = element;

		/*
			Your code here
		*/
	}

	/*
		Stop the visualization. Do not over write this. This gets called when the
		visualization is stopped so there's no infinite loops in memory. You should
		clear all animation frames and all timed callbacks here.

		This will clear the container as well so when the visualization starts again
		it can be different than before if needed.
	*/
	this.stopVisualization = function(){
		this.container.innerHTML = '';
	}
}
```

It explains the methods that need to be defined when building a visualization object. If you build something awesome and want to share, submit a PR here: [https://github.com/521dimensions/amplitudejs](https://github.com/521dimensions/amplitudejs) and we'd gladly merge it into the repo!
