---
title: Configuration - AmplitudeJS Documentation
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
    content: https://521dimensions.com/open-source/amplitudejs/docs/configuration/
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

# Configuring Amplitude.js
Amplitude JS contains many variables that can be configured to determine the
functionality of AmplitudeJS.

These are set and passed in during the Amplitude.init() method:

| Setting | Default | Type | Functionality |
|-----------------------|:-------------:|:-----------------------:|:-----------------------------------------------------------------------------------------|
| autoplay      		  | false 		  | boolean 				| When true, autoplays the current song 													|
| callbacks 			  | {} 			  | JSON Object  			| Object containing methods that get called at certain actions 									|
| songs     			  | {}     		  | JSON Object 			| Object containing all of the songs used by AmplitudeJS 									|
| playlists 			  | {}  	      | JSON Object 			| Object containing all of the playlists used by AmplitudeJS 								|
| default_album_art 	  | '' 			  | URL 					| URL to the default album art image 														|
| debug 				  | false 		  | Boolean 				| Determines if we should print out debugging to the console 								|
| volume 				  | 50 			  | Integer (0 - 100) 		| The level of volume of the active audio with 0.0 being the quietest and 1.0 the loudest 	|
| volume_increment 		  | 5			  | Integer (1 - 100) 		| How much the volume increments every time the volume increment pressed.					|
| volume_decrement 		  | 5 			  | Integer (1 - 100) 		| How much the volume decrements every time the volume decrement pressed. 					|
| soundclound_client 	  | '' 			  | String 					| The API key for SoundCloud if being used 													|
| soundcloud_use_art 	  | false 		  | Boolean 				| Determines if we should use the SoundCloud album art by default 							|
| continue_next | true | boolean | Determines if when a song ends, do we continue to the next song |
| starting_playlist | '' | JSON Object | If there are multiple playlists, determine which one will be started by default |
| starting_playlist_song | '' | Integer | Key of the song in the playlist that you'd like to start with|
| start_song | '' | Integer | The index of the song that AmplitudeJS should start with. |
| shuffle_on | false | Boolean | When on, gets set to true so when traversing through songs, AmplitudeJS knows whether or not to use the songs object or the shuffle_list |
| delay | null | Integer | The millisecond delay set between songs. |

A note about `autoplay`. In newer versions of Safari on iOS, user interaction
has to take place before the song can be autoplayed. This is for bandwidth
restrictions and not playing music in unwanted areas. For More information,
visit: [https://www.reddit.com/r/webdev/comments/71nkym/safari_11_has_a_major_change_to_web_audio_api/](https://www.reddit.com/r/webdev/comments/71nkym/safari_11_has_a_major_change_to_web_audio_api/)
