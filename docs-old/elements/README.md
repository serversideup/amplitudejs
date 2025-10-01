---
title: Elements Introduction - AmplitudeJS Documentation
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
    content: https://521dimensions.com/open-source/amplitudejs/docs/elements/
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

# Elements Introduction
<carbon-ads/>
AmplitudeJS comes with a variety of elements. Each element is picked up by a
class prefixed with 'amplitude-' and depending on the environment, an attribute
that relates to the index of a song in your list of songs or a playlist you are
using the element with. There are elements that some events are bound to such
as play and next and other elements that get filled with meta data information
about the active audio.

All elements can be styled simply based off of class or if you want to define
specific ids in CSS. Besides album art, you could apply these classes to a
variety of elements.  Album art has to be an `<img>` element, but the other
elements could be whatever.

## Structure For elements

AmplitudeJS has a standardized way to reference an element whether it's a metadata element or an interactive element. There are 4 levels of elements:

* Global - Global elements control whatever is playing no matter the scope, or display whatever is playing no matter the scope.
* Playlist - Playlist elements control within the scope of the playlist and display what's in the scope of the playlist.
* Song - Song elements control what's in the scope of the song and what's displayed for the song.
* Song In Playlist - Song in playlist elements control what's in the the scope of the song in the playlist.

Not all elements have all 4 levels of functionality. For example, any element that deals with volume does not have anything but a global scope meaning you can't adjust volume for a single song or playlist it's handled globally.

To scope an element or metadata display the following combination of classes and attributes should be provided:

* Global: `class="amplitude-{element}"`
* Playlist: `class="amplitude-{element}" data-amplitude-playlist="{playlist}"`
* Song: `class="amplitude-{element}" data-amplitude-song-index="{song}"`
* Song In Playlist: `class="amplitude-{element}" data-amplitude-song-index="{song}" data-amplitude-playlist="{playlist}"`

One thing to note about the attribute `data-amplitude-song-index` on a Song in Playlist element is the index references the index of the song WITHIN the playlist! This is different than the song element that references the index of the song within the songs array!
