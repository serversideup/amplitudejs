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
<carbon-ads/>
Using playlists is an essential piece of functionality for AmplitudeJS. As a developer you have the ability to group audio by playlists. There are multiple advantages to this such as the ability to display unique groupings on the screen at once. A playlist could be an album, a group of songs, a podcast series, etc. It's all up to you on how you want to do it!

There are multiple ways to initialize playlists. Let's start with doing it right away in the `Amplitude.init()` method.

```javascript
Amplitude.init({
  songs: [
    {
      "name": "Risin' High (feat Raashan Ahmad)",
      "artist": "Ancient Astronauts",
      "album": "We Are to Answer",
      "url": "../songs/Ancient Astronauts - Risin' High (feat Raashan Ahmad).mp3",
      "cover_art_url": "../album-art/we-are-to-answer.jpg"
    },
    {
      "name": "The Gun",
      "artist": "Lorn",
      "album": "Ask The Dust",
      "url": "../songs/08 The Gun.mp3",
      "cover_art_url": "../album-art/ask-the-dust.jpg",
    },
    {
      "name": "Anvil",
      "artist": "Lorn",
      "album": "Anvil",
      "url": "../songs/LORN - ANVIL.mp3",
      "cover_art_url": "../album-art/anvil.jpg",
    },
    {
      "name": "I Came Running",
      "artist": "Ancient Astronauts",
      "album": "We Are to Answer",
      "url": "../songs/ICameRunning-AncientAstronauts.mp3",
      "cover_art_url": "../album-art/we-are-to-answer.jpg",
    },
    {
      "name": "First Snow",
      "artist": "Emancipator",
      "album": "Soon It Will Be Cold Enough",
      "url": "../songs/FirstSnow-Emancipator.mp3",
      "cover_art_url": "../album-art/soon-it-will-be-cold-enough.jpg"
    },
    {
      "name": "Terrain",
      "artist": "pg.lost",
      "album": "Key",
      "url": "../songs/Terrain-pglost.mp3",
      "cover_art_url": "../album-art/key.jpg"
    },
    {
      "name": "Vorel",
      "artist": "Russian Circles",
      "album": "Guidance",
      "url": "../songs/Vorel-RussianCircles.mp3",
      "cover_art_url": "../album-art/guidance.jpg"
    },
    {
      "name": "Intro / Sweet Glory",
      "artist": "Jimkata",
      "album": "Die Digital",
      "url": "../songs/IntroSweetGlory-Jimkata.mp3",
      "cover_art_url": "../album-art/die-digital.jpg"
    },
    {
      "name": "Offcut #6",
      "artist": "Little People",
      "album": "We Are But Hunks of Wood Remixes",
      "url": "../songs/Offcut6-LittlePeople.mp3",
      "cover_art_url": "../album-art/we-are-but-hunks-of-wood.jpg"
    },
    {
      "name": "Dusk To Dawn",
      "artist": "Emancipator",
      "album": "Dusk To Dawn",
      "url": "../songs/DuskToDawn-Emancipator.mp3",
      "cover_art_url": "../album-art/from-dusk-to-dawn.jpg"
    }
  ],


  playlists: {
    "ancient_astronauts": {
      songs: [0, 3],
      title: 'Best of Ancient Astronauts'
    },
    "trip_hop": {
      songs: [1, 2, 5, 6, 7, 8]
      title: 'Trip Hop Mix 2018',
      author: 'Dan Pastori'
    },
    "emancipator": {
      songs: [4, 9, {
        "name": "Anthem",
        "artist": "Emancipator",
        "album": "Soon It Will Be Cold Enough",
        "url": "../songs/Anthem-Emancipator.mp3",
        "cover_art_url": "../album-art/soon-it-will-be-cold-enough.jpg"
      }],
      title: 'Emancipator\'s Greatest Hits'
    }
  }
});
```

At the most basic level, what's happening here is we initialize AmplitudeJS with a bunch of songs. We then group them into playlists using the `playlists` object. Each playlist is defined by a unique key, such as `trip_hop`. Within the playlist itself, you have to add another `songs` array. The songs array can contain either an index for the song that exists in the global songs array OR it can contain a song object itself (like in the `emancipator` playlist). This is useful if you want to scope a song in a playlist only. Now remember, this song is ONLY available within the scope of the playlist.

Also within the playlist, there are some extra meta data fields such as `title` or `author`. You can any number of these and have them autofill in your display on initialization if you have an element with the attribute: `data-amplitude-playlist-info="{key}"`.

Playlists maintain their own state too. On the internals of AmplitudeJS the shuffle state and repeat state are held within the scope of the playlist.

Another way you can add playlists is through the `Amplitude.addPlaylist( key, data, songs)` method. This method accepts 3 parameters.

The `key` parameter is the key of the playlist such as `ancient_astronauts` up above. Remember this will be in a JSON format so use JSON specific key naming scheme.

The `data` is any of the meta data that works for the playlist. Anything you want to pass as meta data for the playlist can be passed in a JSON object.

the `songs` is an array of song objects for your playlist. These songs will only get added to the new playlist. Each one of these can be either an index of the song in the songs array, or an entirely new song object that only gets added to the playlist.
