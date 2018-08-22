---
title: Setting Default Album Art - AmplitudeJS Documentation
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
    content: https://521dimensions.com/open-source/amplitudejs/docs/configuration/default-album-art.html
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

# Setting Default Album Art

If you have songs that don't have a specific piece of album art, you can define
a default image url using the "default_album_art" key.  Once again, this is
handled on initialization.

```javascript
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
		"default_album_art": "/url/to/default.jpg"
	});
```
