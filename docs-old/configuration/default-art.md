---
title: Setting Default Art - AmplitudeJS Documentation
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
    content: https://521dimensions.com/open-source/amplitudejs/docs/configuration/default-art.html
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

# Default Art
<carbon-ads/>
If you have audio that doesn't have a specific piece of album art, you can define
a default image url using the "default_album_art" key. The value can be set on initialization or through a public method. You can also set the default playlist art for metadata. If you don't define a piece of album art for your playlist you can also set that on initialization through the "default_playlist_art" key or through a public method.

## Initialization Default Album Art

```javascript
	Amplitude.init({
		"songs": [...],
		"default_album_art": "/url/to/default.jpg"
	});
```

## Public Set Method Default Album Art

```javascript
  Amplitude.setDefaultAlbumArt( "/url/to/default.jpg" );
```

## Initialization Default Playlist Album Art

```javascript
  Amplitude.init({
    "songs": [...],
    "playlists": {
      ...
    },
    "default_playlist_art": "/url/to/default.jpg"
  });
```

## Public Set Method Default Playlist Art

```javascript
  Amplitude.setDefaultPlaylistArt( "/url/to/default.jpg" );
```
