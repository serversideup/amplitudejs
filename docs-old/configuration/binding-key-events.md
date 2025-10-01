---
title: Binding Key Events - AmplitudeJS Documentation
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
    content: https://521dimensions.com/open-source/amplitudejs/docs/configuration/binding-key-events.html
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

# Binding Key Events
<carbon-ads/>
This allows you to configure certain
events to trigger on key presses. The main piece of information needed is the
key code [https://keycode.info/](https://keycode.info/). Once you have that, you
can make an object that references a certain event key. There are 6 events that
you can bind a key code to:

- prev (on key down, goes to previous song)
- next (on key down, goes to next song)
- play_pause (on key down, toggles play/pause)
- stop (on key down, stops the song)
- shuffle (on key down, toggles shuffle state global)
- repeat (on key down, toggles repeat state global)

To add a binding, for example, the right arrow key on a mac keyboard has code
39 you'd add the following to your config:

```javascript
	Amplitude.init({
		"bindings": {
			39: 'next'
		},
		"songs": [{}]
	})
```

Now every time the right arrow down is pressed, AmplitudeJS will go to the next
song. You can add multiple bindings to the array with multiple key codes. It
could be any key you want!
