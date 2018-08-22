---
title: Metadata Elements - AmplitudeJS Documentation
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
    content: https://521dimensions.com/open-source/amplitudejs/docs/elements/metadata-elements.html
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

# Meta Data Elements

Meta data elements get their information filled in with meta data from the
active song object. These can be any type of HTML element except when filling
in cover_art_url, station_art_url, podcast_episode_cover_art_url.

These specific keys have to be on an img tag since they update the src attribute
of the tag. Every other attribute fills in the inner html of the tag.

## Image Metadata
When defining a song object there are 3 different keys you can define image meta
data with:

1. cover_art_url
2. station_art_url
3. podcast_episode_cover_art_url

These URLs point to an image that will be substituted out for the active song
image.

## Text Metadata
With text metadata describing a song, you can use whatever information you like
and place it in whatever element you like. This is new to Amplitude 3.0.
Previous versions of AmplitudeJS limited the user to certain meta data fields
such as artist, album, title, etc. The newest version of AmplitudeJS allows the
user to do whatever keys on a song object and insert that text into any element
defined appropriately. This give much more flexibility when using AmplitudeJS
in a variety of audio scenarios such as for radio stations and podcasts. To add
an element that contains a piece of meta data regarding the now playing song
simply add:

```html
<span amplitude-song-info="{song_meta_index}" amplitude-main-song-info="true"></span>
```

If it's a main element for a playlist add the key for the playlist:
```html
<span amplitude-song-info="{song_meta_index}" amplitude-playlist="{playlist_index}"></span>
```

## Autofill Meta Data
Sometimes when building a player, you don't know what every song is on load and
need to load songs dynamically. As of AmplitudeJS version 3.3 this is not a
problem. AmplitudeJS will autofill the meta data for lists of songs if you do a
combination of the following on the element.

1. 'amplitude-song-info' - Defines the information you want injected into the
element. This is the key of the song object.
2. 'amplitude-song-index' - Defines the index of the song in the songs array
that you want to inject into the element.

This is super convenient when loading songs dynamically either server side or
loading after the page has loaded.

## Time Metadata
There are certain elements that contain time data about the active song. You
can add these elements to your document and they will auto fill with the current
status of the song. Like other elements, these can be either for the overall
player, scoped in a playlist or for a specific song. There are three sets of
time meta data: current time, song duration, time remaining.
The song duration can only be set for the active song since the metadata isn't
preloaded for all of the songs. The time remaining is a count down for how much
time is left for a song.

Main Current Time - Displays in MM:SS
```html
<span class="amplitude-current-time" amplitude-main-current-time="true"></span>
```

Main Current Hours
```html
<span class="amplitude-current-hours" amplitude-main-current-hours="true"></span>
```

Main Current Minutes
```html
<span class="amplitude-current-minutes" amplitude-main-current-minutes="true"></span>
```

Main Current Seconds
```html
<span class="amplitude-current-seconds" amplitude-main-current-seconds="true"></span>
```

Current Hours For Playlist
```html
<span class="amplitude-current-hours" amplitude-playlist-current-hours="true" amplitude-playlist="{playlist_key}"></span>
```

Current Minutes For Playlist
```html
<span class="amplitude-current-minutes" amplitude-playlist-current-minutes="true" amplitude-playlist="{playlist_key}"></span>
```

Current Seconds For Playlist
```html
<span class="amplitude-current-seconds" amplitude-playlist-current-seconds="true" amplitude-playlist="{playlist_key}"></span>
```

Current Hours For Song
```html
<span class="amplitude-current-hours" amplitude-song-index="{song_index}"></span>
```

Current Minutes For Song
```html
<span class="amplitude-current-minutes" amplitude-song-index="{song_index}"></span>
```

Current Seconds For Song
```html
<span class="amplitude-current-seconds" amplitude-song-index="{song_index}"></span>
```

Main Duration Time MM:SS
```html
<span class="amplitud-duration-time" amplitude-main-duration-time="true"></span>
```

Main Duration Time - Displays in MM:SS
```html
<span class="amplitude-duration-time" amplitude-main-duration-time="true"></span>
```

Main Duration Hours
```html
<span class="amplitude-duration-hours" amplitude-main-duration-hours="true"></span>
```

Main Duration Minutes
```html
<span class="amplitude-duration-minutes" amplitude-main-duration-minutes="true"></span>
```

Main Duration Seconds
```html
<span class="amplitude-duration-seconds" amplitude-main-duration-seconds="true"></span>
```

Duration Hours For Playlist
```html
<span class="amplitude-duration-hours" amplitude-playlist-duration-hours="true" amplitude-playlist="{playlist_key}"></span>
```

Duration Minutes For Playlist
```html
<span class="amplitude-duration-minutes" amplitude-playlist-duration-minutes="true" amplitude-playlist="{playlist_key}"></span>
```

Duration Seconds For Playlist
```html
<span class="amplitude-duration-seconds" amplitude-playlist-duration-seconds="true" amplitude-playlist="{playlist_key}"></span>
```

Duration Hours For Song
```html
<span class="amplitude-duration-hours" amplitude-song-index="{song_index}"></span>
```

Duration Minutes For Song
```html
<span class="amplitude-duration-minutes" amplitude-song-index="{song_index}"></span>
```

Duration Seconds For Song
```html
<span class="amplitude-duration-seconds" amplitude-song-index="{song_index}"></span>
```

Main Time Remaining For Song
```html
<span class="amplitude-time-remaining" amplitude-main-time-remaining="true"></span>
```

Playlist Main Time Remaining For Song
```html
<span class="amplitude-time-remaining" amplitude-playlist-main-time-remaining="{playlist_key}"></span>
```

Song Time Remaining
```html
<span class="amplitude-time-remaining" amplitude-song-index="{song_index}"></span>
```

## Song Container
This is a unique element. What this does is allow you to assign a container to
the visual representation of a song or a song in a playlist. When that song is
currently playing, the class `amplitude-active-song-container` will be applied
to the song container element. This way you can style the element to show the
active song.

For a single song container it would be:
```html
<div class="amplitude-song-container" amplitude-song-index="{X}"></div>
```

For a playlist song container it would be:
```html
<div class="amplitude-song-container" amplitude-playlist="{playlist_key}" amplitude-song-index="{X}"></div>
```
