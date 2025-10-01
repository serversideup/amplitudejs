---
title: Delay Between Audio - AmplitudeJS Documentation
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
    content: https://521dimensions.com/open-source/amplitudejs/docs/configuration/delay.html
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

# Delay Between Audio
<carbon-ads/>
AmplitudeJS allows the developer to add a time delay between the audio objects defined. By default, this value is `0`. When you initialize AmplitudeJS you can provide an integer in MS for how long you want AmplitudeJS to wait before it starts playing the next audio track.

## Initialization
You can set this value on initialization:

```javascript
Amplitude.init({
  songs: ["..."],
  delay: 3000
});
```

AmplitudeJS will now wait 3 seconds before playing the next track.

## Public Function
You can also set this value through a public function like this:

```javascript
Amplitude.setDelay( 3000 );
```

If you need to see what the delay is set to, run:

```javascript
Amplitude.getDelay();
```
