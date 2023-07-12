---
title: Volume - AmplitudeJS Documentation
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
    content: https://521dimensions.com/open-source/amplitudejs/docs/configuration/volume.html
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
# Configuring Default Volume Parameters
<carbon-ads/>
There are lots of different volume parameters that can be set by default in AmplitudeJS. You can initialize the volume to be

## Setting the Starting Volume

You can define the starting volume for when the user initially presses play.  
To do this, you need to add a "volume" key to your initialization JSON.  This
value is any number between 0 and 100. Think of this as a percentage.
If you want the volume percentage at 35%, set this value equal to 35.

```javascript
	Amplitude.init({
		"songs": [...],
		"volume": 35
	});
```

## Setting the Volume Increment and Decrement Values

AmplitudeJS allows you to have volume increment and decrement buttons. Each time one of the buttons is pressed, the volume increments or decrements a certain amount. You can configure AmplitudeJS to have values set for how much the volume should increment or decrement when you initialize.

```javascript
  Amplitude.init({
    "songs": [...],
    "volume_increment": 10,
    "volume_decrement": 10
  });
```

Think of these values as a percentage of the volume that AmplitudeJS adjusts. So every time we increment AmplitudeJS the volume now goes up by 10% or down by 10%. The default for this is 5%.
