---
title: Installation - AmplitudeJS Documentation
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
    content: https://521dimensions.com/open-source/amplitudejs/docs/installation
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

# Installation
<carbon-ads/>
## Option 1: Use CDN from jsDelivr
No installation is required to use Amplitude.js. All you need to do is include a single line in your `<head>` section of your HTML page.

Replace `{{version-number}}` with the exact version number that you would like to use (see [our releases](https://github.com/521dimensions/amplitudejs/releases) for what version number to use):
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/amplitudejs@{{version-number}}/dist/amplitude.js"></script>
```
**NOTE:** It's best to set your version number manually to make sure you have full control of what version you are running. If you need to upgrade in the future, just change `{{version-number}}` to the latest version.


## Option 2: Automatic install via `npm`
Download it via NPM to your existing project:
```sh
npm install --save amplitudejs
```

You will see the file under `node_modules/amplitudejs/dist/amplitude.js`.

## Option 3: Manual download
Download the `amplitude.js` file from [our releases page](https://github.com/521dimensions/amplitudejs/releases) and include the file manually with your project.

Amplitude.js is now available for use! All that's left is initializing.
