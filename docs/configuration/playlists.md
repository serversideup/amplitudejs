---
title: Playlists - AmplitudeJS Documentation
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
    content: https://521dimensions.com/open-source/amplitudejs/docs/configuration/playlists.html
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

# Playlists

The ability to make playlists has been introduced in Amplitude 3.0. You can now
scope functionality of Amplitude.js into playlists such as play/pause buttons,
meta data, next, prev, etc.  To make a playlist you must first define all of
your songs as song objects in the songs array. This is like your library. You
will then make a playlists object when you init Amplitude.js and you will give
a key for the unique identifier for your playlist. This key will then contain
an array of song indexes being used by your playlist. These are the index of
the song in the songs array. The original songs array index will be used in
*EVERY* reference even in a playlist. Consider it the unique ID of the song.

That sounds like a lot, so let's break it down. We will be making a playlist f
or Rock and Roll tracks using the following songs:

```javascript
	Amplitude.init({
		"songs": [
			{
				"name": "Song Name 1",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg",
				"genre": "country"
			},
			{
				"name": "Song Name 2",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg",
				"genre": "rock"
			},
			{
				"name": "Song Name 3",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg",
				"genre": "rock"
			},
			{
				"name": "Song Name 4",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg",
				"genre": "classical"
			},
			{
				"name": "Song Name 5",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg",
				"genre": "rock"
			},
			{
				"name": "Song Name 6",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg",
				"genre": "indie"
			},
			{
				"name": "Song Name 7",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg",
				"genre": "rock"
			}
		]
	});
```


At the end of your config, you will add a key that states you will have
playlists including a playlist keyed as "rock_and_roll". Remember these are
JSON keys so use underscores!

```json
	"playlists": {
		"rock_and_roll": []
	}
```

In the playlist we will be adding all the songs that have the genre rock. These
are the indexes of songs that will be added.  Your final Amplitude.init()
method will look like:

```javascript
	Amplitude.init({
		"songs": [
			{
				"name": "Song Name 1",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg",
				"genre": "country"
			},
			{
				"name": "Song Name 2",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg",
				"genre": "rock"
			},
			{
				"name": "Song Name 3",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg",
				"genre": "rock"
			},
			{
				"name": "Song Name 4",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg",
				"genre": "classical"
			},
			{
				"name": "Song Name 5",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg",
				"genre": "rock"
			},
			{
				"name": "Song Name 6",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg",
				"genre": "indie"
			},
			{
				"name": "Song Name 7",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg",
				"genre": "rock"
			}
		],
		"playlists": {
			"rock_and_roll": [
				1, 2, 4, 6
			]
		}
	});
```

You now have a playlist with a key "rock_and_roll" that contains 4 songs from
your library. As we add more features, you will see how this playlist key will
come into play to scope the functions of Amplitude.js by playlist.
