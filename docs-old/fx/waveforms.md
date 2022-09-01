---
title: Web Audio API Waveforms - AmplitudeJS Documentation
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
    content: https://521dimensions.com/open-source/amplitudejs/docs/fx/waveforms.html
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

# Overview of Waveforms
<carbon-ads/>
Waveforms are another FX element added to AmplitudeJS. A waveform is a visual representation of the sound compressions for a piece of audio. Using the Web Audio API, you can display these in your player.

There is one parameter that you can set to determine how your waveforms are displayed and that is the `sample_rate` set on initialization. The `sample_rate` setting determines how "fine" the visual for the waveform should be. The lower the sample rate, the more "rough" a depiction is generated. The higher the sample rate the more "accurate" a depiction is generated. Now keep in mind, the higher the sample rate, the more memory and longer it will take to generate!

The waveform can be styled through CSS since it's an SVG. You can change colors, widths, heights, etc.

When a waveform is created, it's created for a specific piece of audio. We cache the waveform so we can re-use it if the user comes back to it. Essentially this ensures the waveform is only generated once, speeding up the process dramatically!

## Setting the Sample Rate

By default, the sample rate is set to `100` which generates a pretty rough waveform, but does so efficiently. To set the sample rate, set it through the waveforms object on initialization.

```javascript
  Amplitude.init({
    songs: ['...'],
    waveforms: {
      sample_rate: 3000
    }
  });
```

In this example, we set the sample rate to `3000` which will result in a fairly accurate depiction of the waveform!

## Displaying WaveForm Elements

Like other meta data and interactive elements, waveforms follow the same structure. There are 4 levels of the waveform element:

1. Global - This displays the active song's global waveform.
2. Playlist - This displays the active playlist's song's waveform.
3. Individual Song - Displays a waveform for an individual song.
4. Individual Song In Playlist - Displays a waveform for an individual song in a playlist.

### Global Waveform Element

To add a global waveform, display the following:

```html
<div class="amplitude-wave-form"></div>
```

This will display the active song's waveform.

### Playlist Waveform Element

To add a playlist waveform element, display the following:

```html
<div class="amplitude-wave-form" data-amplitude-playlist="{playlist_key}"></div>
```

### Individual Song Waveform Element

To add a waveform for an individual song, display the following:

```html
<div class="amplitude-wave-form" data-amplitude-song-index="{song_index}"></div>
```

### Individual Song In Playlist Waveform Element

To add a waveform for an individual song in a playlist, display the following:

```html
<div class="amplitude-wave-form" data-amplitude-song-index="{song_index}" data-amplitude-playlist="{playlist}"></div>
```
