---
title: SoundCloud Configuration - AmplitudeJS Documentation
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
    content: https://521dimensions.com/open-source/amplitudejs/docs/configuration/soundcloud-configuration.html
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

# Soundcloud Configuration
<carbon-ads/>
AmplitudeJS supports SoundCloud integration! To use SoundCloud there are a couple parameters that need to be set.

First, the `url` in your song object must be the SoundCloud URL of the song provided. Second, the artist must have their audio be able to be streamed. NOT ALL AUDIO ON SOUNDCLOUD IS STREAMABLE! This is up to the artist to allow the song to be streamed through their API. If they do not allow it, the audio will not be able to be streamed!

Finally, you will need to initialize AmplitudeJS with the `soundcloud_client` key. This is set up when you create a developer account.

Your initialization should look like this:

```javascript
  Amplitude.init({
    songs: [{
      url: 'https://soundcloud.com/some/url/to/some/song'
    }],
    soundcloud_client: 'YOUR_CLIENT_KEY'
  });
```

On initialization, AmplitudeJS will detect that there is a SoundCloud URL and grab the streaming URL to replace it with. This also works for adding SoundCloud URLs in playlists.

After AmplitudeJS loads the URL, the data is stored in a key on the song object called `soundcloud_data`. If you run `Amplitude.getSongAtIndex(INDEX_OF_SONG)` you will see additional data loaded from SoundCloud that you can use.

You can also, set the album art of the song to be what SoundCloud returns instead of what you provide. This is helpful if you don't have access to the album art, however the quality of the image is determined by SoundCloud.

To use SoundCloud album art initialize AmplitudeJS with:

```javascript
  Amplitude.init({
    songs: [{
      url: 'https://soundcloud.com/some/url/to/some/song'
    }],
    soundcloud_client: 'YOUR_CLIENT_KEY',
    soundcloud_use_art: true
  });
```

A quick heads up with using SoundCloud and wanting to run an FX visualization or skip to a part of the song. You must ensure the proper Byte-Range header is sent back from the server: [https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests). Now SoundCloud is pretty good at this, but some of their legacy CDNs didn't support it in the past so it's just a heads up. 
