---
title: Web Audio API Waveforms
description: A waveform is a visual representation of the sound compressions for a piece of audio.
---

# Overview of Waveforms

Waveforms are another FX element added to AmplitudeJS. A waveform is a visual representation of the sound compressions for a piece of audio. Using the Web Audio API, you can display these in your player.

There is one parameter that you can set to determine how your waveforms are displayed and that is the `sample_rate` set on initialization. The `sample_rate` setting determines how "fine" the visual for the waveform should be. The lower the sample rate, the more "rough" a depiction is generated. The higher the sample rate the more "accurate" a depiction is generated. Now keep in mind, the higher the sample rate, the more memory and longer it will take to generate!

The waveform can be styled through CSS since it's an SVG. You can change colors, widths, heights, etc.

When a waveform is created, it's created for a specific piece of audio. We cache the waveform so we can re-use it if the user comes back to it. Essentially this ensures the waveform is only generated once, speeding up the process dramatically!

## Setting the Sample Rate

By default, the sample rate is set to `100` which generates a pretty rough waveform, but does so efficiently. To set the sample rate, set it through the waveforms object on initialization.

::code-panel
---
label: Define waveform sample rate
---
```javascript
Amplitude.init({
    songs: ['...'],
    waveforms: {
        sample_rate: 3000
    }
});
```
::

In this example, we set the sample rate to `3000` which will result in a fairly accurate depiction of the waveform!

## Displaying WaveForm Elements

Like other meta data and interactive elements, waveforms follow the same structure. There are 4 levels of the waveform element:

1. Global - This displays the active song's global waveform.
2. Playlist - This displays the active playlist's song's waveform.
3. Individual Song - Displays a waveform for an individual song.
4. Individual Song In Playlist - Displays a waveform for an individual song in a playlist.

### Global Waveform Element

To add a global waveform, display the following:

::code-panel
---
label: Global waveform
---
```html
<div class="amplitude-wave-form"></div>
```
::

This will display the active song's waveform.

### Playlist Waveform Element

To add a playlist waveform element, display the following:

::code-panel
---
label: Playlist waveform
---
```html
<div class="amplitude-wave-form" data-amplitude-playlist="{playlist_key}"></div>
```
::

### Individual Song Waveform Element

To add a waveform for an individual song, display the following:

::code-panel
---
label: Individual song element waveform
---
```html
<div class="amplitude-wave-form" data-amplitude-song-index="{song_index}"></div>
```
::

### Individual Song In Playlist Waveform Element

To add a waveform for an individual song in a playlist, display the following:

::code-panel
---
label: Individual song in playlist waveform
---
```html
<div class="amplitude-wave-form" data-amplitude-song-index="{song_index}" data-amplitude-playlist="{playlist}"></div>
```
::
