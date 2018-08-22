---
title: Song Objects - AmplitudeJS Documentation
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
    content: https://521dimensions.com/open-source/amplitudejs/docs/configuration/song-objects.html
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

# Song Objects

An array of JSON song objects is required by Amplitude.js.  This directs
AmplitudeJS to the metadata and information necessary for playing the audio.

A basic song object has the following keys:

* name = The name of the song
* artist = The song's artist
* album = The song's album ( Also used to determine album changes in an
	environment where multiple albums are used on the page)
* url = The URL to the song. This is most imporatant.  (Soundcloud URLs
	discussed later)
* cover_art_url = The URL to the song's cover art.
* live = Set to true for a URL that is a live audio source.

The only actualy required key is the url so Amplitude.js can play the song.

As of Amplitude 3.0, the song object can include any number of keys which can
be displayed anywhere on the page. You can make up a key name if you want like

```json
	{
		"name": "Song Name 3",
		"artist": "Artist Name",
		"album": "Album Name",
		"url": "/song/url.mp3",
		"cover_art_url": "/cover/art/url.jpg",
		"made_up_key": "I'm made up completely"
	}
```

and reference it anywhere on your page using the 'amplitude-song-info' attribute
on the element you want to display the data like:

```html
	<span class="made-up-key" amplitude-song-info="made_up_key" amplitude-main-song-info="true"></span>
```

It is important to note that in multiple song environments, the order that you
list the songs makes a difference. When utilizing next and previous
functionality, Amplitude.js will iterate over the songs object and go to the
next song or the previous song in the list. If you are using AmplitudeJS in a
playlist type environment, you will define the order of the songs in the playlist
by their individual indexes.

It is also important to note how songs are indexed. Like in almost all
programming, indexes start at 0.  So when you are setting up multiple play/pause
functions or song status sliders that relate to an individual song or playlists,
the indexes are used. For example, the song above named "Song Name 1" would have
an index of 0, "Song Name 2" would have an index of 1, and so on.
