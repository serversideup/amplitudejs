---
title: Callbacks - AmplitudeJS Documentation
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
    content: https://521dimensions.com/open-source/amplitudejs/docs/configuration/callbacks.html
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

# Callbacks
<carbon-ads/>
There are a variety of callbacks specific to AmplitudeJS that get called at certain times that the developer can bind to.


| Callback            | Called When 										   
| ------------------- |--------------------------------------------------------|
| stop                | The active audio is stopped
| initialized         | AmplitudeJS has finished initializing
| song_repeated       | When the active audio has been repeated
| next                | When the next audio has been played
| prev                | When the prev audio has been played
| album_change        | When the album has changed
| song_change         | When the song has changed
| playlist_changed    | When the playlist has changed.

To bind to a callback you add a function to your callbacks object with the key
of one of the callbacks listed above. That key will be a function. When the
callback is called, the function the user passes will be run. For example,
after the user clicks play we want to increase the play count. I'd set up a
callback that has a method to increase the play count:

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
		 ],
		 callbacks: {
			 stop: function(){
				 console.log("Audio has been stopped.")
			 }
		 }
 });
```

Every time the audio has been stopped, a message is printed to the console.

There are also the native HTML 5 Audio events that the developer can bind too. For more descriptions on when these events are propagated check out: https://www.w3schools.com/tags/ref_av_dom.asp

The list of native HTML 5 Audio Events that AmplitudeJS listens to are:

* `abort`
* `error`
* `loadeddata`
* `loadedmetadata`
* `loadstart`
* `pause`
* `playing`
* `play`
* `progress`
* `ratechange`
* `seeked`
* `seeking`
* `stalled`
* `suspend`
* `timeupdate`
* `volumechange`
* `waiting`
* `canplay`
* `canplaythrough`
* `durationchange`
* `ended`

Specifically the 'timeupdate' callback is super helpful because this gets triggered when the song time updates. This can be used to call other AmplitudeJS events such as song played percentage and set 3rd party visualizations.
