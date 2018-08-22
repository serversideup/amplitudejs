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
There are a variety of callbacks that AmplitudeJS calls at certain times and
the developer can bind to.


| Callback        | Description 										   |
| --------------- |--------------------------------------------------------|
| before_play     | Occurs before the play method is called 			   |
| after_play 	  	| Occurs after the play method is called 			     |
| before_stop 	  | Occurs before the stop method is called 			   |
| after_stop  	  | Occurs after the stop method is called 				   |
| time_update 		| Occurs when the time has updated 								 |
| album_change 		| Occurs when an album changes 										 |
| song_change 		| Occurs when a song has been changed 						 |
| time_updated 		| Occurs when the current song time has been updated |
| playlist_changed | Occurs when the active playlist has changed |
| song_repeated  	| Occurs when the now playing song has been repeated |

To bind to a callback you add a function to your callbacks object with the key
of one of the callbacks listed above. That key will be a function. When the
callback is called, the function the user passes will be run. For example,
after the user clicks play we want to increase the play count. I'd set up a
callback that has a method to increase the play count:

```javascript
var playCount = 0;

Amplitude.init({
		 "songs": [
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
		 "callbacks": {
			 'after_play': function(){
				 playCount++;
				 alert( playCount );
			 }
		 }
 });
```

Every time the play button is called, the song will begin to play and after
all the code has been run, the callback will increase the play count.

The 'time_update' callback is super helpful because this gets triggered when
the song time updates. This can be used to call other AmplitudeJS events such
as song played percentage and set 3rd party visualizations.
