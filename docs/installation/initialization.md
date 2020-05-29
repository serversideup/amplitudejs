---
title: Initialization - AmplitudeJS Documentation
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
    content: https://521dimensions.com/open-source/amplitudejs/docs/installation/initialization
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
# Initializing Amplitude.js
<carbon-ads/>
To initialize Amplitude.js, you must call the `Amplitude.init()` method and pass in an object that contains an array of songs and settings. Amplitude.js will then take care of configuring and setting up your player by finding all of the Amplitude elements (defined later in the docs) and binding the appropriate event handlers.

To configure Amplitude.js, you need to call the init function on the Amplitude object and you can pass it a JSON object of configuration variables ( we will go through ALL of these in the documentation ). At the bare minimum, you need to pass it all of the song objects that your page will be using. More information about the song object next.

```javascript
	Amplitude.init({
		songs: [
			{
				"name": "Song Name 1",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg"
			},
			{
				"name": "Song Name 2",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg"
			},
			{
				"name": "Song Name 3",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg"
			}
		]
	});
```

This configuration will set up Amplitude.js to work the way you want it. The config JSON is used heavily to configure and optimize Amplitude.js for what your app needs.
