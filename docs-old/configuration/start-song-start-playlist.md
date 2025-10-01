---
title: Setting Starting Song and Playlist - AmplitudeJS Documentation
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
    content: https://521dimensions.com/open-source/amplitudejs/docs/configuration/start-song-start-playlist.html
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

# Setting the Starting Audio and Starting Playlist
<carbon-ads/>
When you initialize AmplitudeJS you can instruct AmplitudeJS to start at a certain song, certain playlist, and a certain song in a playlist.

## Set Starting Song

To set a starting song, you simply need to add the `start_song` key and pass it the index of the song you want to start. By default this is 0, the first song in the array. To set it to the fourth song in the array, index 3, do this:

```javascript
  Amplitude.init({
    songs: ["..."],
    start_song: 3
  });
```

## Set Starting Playlist

You can also define which playlist to start with if you have multiple playlists. Similar to the `start_song` you need to pass the `starting_playlist` key to the `init` method:

```javascript
  Amplitude.init({
    songs: ["..."],
    playlists: {
      "key_of_starting_playlist": ["..."]
    }
    starting_playlist: "key_of_starting_playlist"
  });
```

## Set Starting Song In Playlist

Finally, you can set which song you want to start the player with inside which playlist. To do this, you need to define the `starting_playlist` key and the `starting_playlist_song` index like this:

```javascript
  Amplitude.init({
    songs: ["..."],
    playlists: {
      "key_of_starting_playlist": ["..."]
    }
    starting_playlist: "key_of_starting_playlist",
    starting_playlist_song: 3
  });
```
