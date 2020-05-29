---
title: Interactive Elements - AmplitudeJS Documentation
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
    content: https://521dimensions.com/open-source/amplitudejs/docs/elements/interactive-elements.html
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

# Interactive Elements
<carbon-ads/>
The interactive elements of AmplitudeJS have event handlers bound to them that
responds to a touch or click from a user. These elements build the functionality
of the player you are designing. The scoping of these elements is handled by
attributes that define the level of functionality each element has such as
global, playlist, individual song or individual song in playlist. These are outlined in detail for each element.

## Play Button

There are 4 different levels for a play button.
1. Global Play - Plays the current song whether it's an individual song or in a
playlist
2. Playlist Play - Plays the current song in the playlist.
3. Song Play - Plays an individual song by itself.
4. Plays an individual song in a playlist.

The play button responds to the 'click' event on a desktop or a 'touchstart'
event on mobile.

### Global Play Button
The global play button will play the active song whether or not the song is an
individual song or in a playlist. To add a global play button simply an HTML
element with the class `amplitude-play`.

```html
<span class="amplitude-play"></span>
```

### Playlist Play Button
The playlist play button will play the active song in the playlist or it will
play the first song in the playlist if the playlist is out of scope (meaning
another playlist was being played or it's the first playlist being played). To
add a playlist play button, add an HTML element with the class of
`amplitude-play` and the attribute `data-amplitude-playlist="playlist_index"`.

```html
<span class="amplitude-play" data-amplitude-playlist="{playlist_index}"></span>
```

### Individual Song Play Button
The individual song play button will play the song defined by the `data-amplitude-song-index="{song_index}"` attribute.

```html
<span class="amplitude-play" data-amplitude-song-index="{song_index}"></span>
```

### Individual Song In Playlist Button
The individual playlist button is a combination of the attributes `data-amplitude-song-index="{song_index}"` and `data-amplitude-playlist="{playlist}"`. This will play an individual song in a playlist as defined.

```html
<span class="amplitude-play" data-amplitude-song-index="1" data-amplitude-playlist="test_playlist"></span>
```

## Pause Button
The pause button has 4 different levels.
1. Global Pause - Pauses the active song no matter if it's individual or in a
playlist.
2. Playlist Pause - Pauses the active song in the playlist.
3. Song Pause - Pauses an individual song.
4. Song In Playlist Pause - Pauses an individual song in a playlist.

The pause button responds to the 'click' event on a desktop or a 'touchstart'
event on mobile.

### Global Pause
The global pause button will pause whatever song is currently playing. To add a
global pause button simply add an HTML element with the class of 'amplitude-pause'.

```html
<span class="amplitude-pause"></span>
```

### Playlist Pause
The playlist pause button will pause the active song in the playlist. It only
works if the playlist defined in the attribute is playing the song.

```html
<span class="amplitude-pause" data-amplitude-playlist="{playlist}"></span>
```

### Individual Song Pause
The individual song pause button will pause the song defined by the attribute `data-amplitude-song-index="song_index"`.

```html
<span class="amplitude-pause" data-amplitude-song-index="{song_index}"></span>
```
### Individual Song In Playlist Pause
If you want to pause an individual song in a playlist, you need to add both the `data-amplitude-song-index="{song_index}"` and the `data-amplitude-playlist="{playlist}"` attributes.

```html
<span class="amplitude-pause" data-amplitude-song-index="{song_index}" data-amplitude-playlist="{playlist}"></span>
```

## Play Pause Button
The play/pause button is probably the most common button to be implemented when
working with AmplitudeJS. Depending on the global state, playlist state and/or
song state, this element will get a class that is `amplitude-playing` or
`amplitude-paused` that can be styled accordingly. It's common to set a play or
pause button image as a background in CSS so when the interaction occurs, the
proper button appears.

There are 3 levels of Play/Pause buttons.
1. Global Play/Pause - Plays or pauses the active song no matter if it's
independent or part of a playlist.
2. Playlist Play/Pause - Plays or pauses the active song in the scope of the playlist.
3. Song Play/Pause - Plays or pauses an individual song.
4. Song In Playlist Play/Pause - Plays or pauses an individual song in the playlist.


### Global Play/Pause
The global play pause button plays or pauses the current song depending on the
state of the AmplitudeJS player. This button does not account for whether the
song is in a playlist or an individual song, it's whatever song is active the
functionality works on.

```html
<span class="amplitude-play-pause"></span>
```

### Playlist Play/Pause
The playlist play pause button plays or pauses the current song in a playlist.
If a song is being played outside of a playlist when clicked, the playlist will
play the first song in the playlist assigned to the button clicked and pause the
other song. To add a playlist play pause button add an element with the class of `amplitude-play-pause` an attribute of `data-amplitude-playlist="{playlist-index}`.

```html
<span class="amplitude-play-pause" data-amplitude-playlist="{playlist}"></span>
```

### Song Play/Pause
The song play pause button plays or pauses an individual song when clicked.

```html
<span class="amplitude-play-pause" data-amplitude-song-index="{song_index}"></span>
```

### Song In Playlist Play/Pause
The song in playlist play pause button plays or pauses an individual song in a playlist when clicked. This is defined by a combination of the `data-amplitude-song-index="{song_index}"` attributes and the `data-amplitude-playlist="{playlist}"` attributes.

```html
<span class="amplitude-play-pause" data-amplitude-song-index="{song_index}" data-amplitude-playlist="{playlist}"></span>
```


## Stop Button
There is only one level for the stop button:
1. Global - Stops whatever song is playing.

The stop button simply stops the active song. On a desktop, this will respond to
the 'click' event and a 'touchstart' on mobile. To add a stop button simply add
the following HTML element:

### Global Stop Button

```html
<span class="amplitude-stop"></span>
```

## Mute Button
There is only one level for the mute button:
1. Global - Mutes the current song.

The mute button is another global element that mutes the active song. On a
desktop, this element will respond to the 'click' event and a 'touchstart' on
mobile.
There are two classes that get added to the mute button so you can style it
according to the state of the player.

When the player is not muted the class `amplitude-not-muted` is added to the
element and `amplitude-muted` is added when the player is muted.

```html
<span class="amplitude-mute"></span>
```

## Volume Up
There is only one level for the volume up button:
1. Global - Increases the volume by the amount specified on init. Default 5%.

The volume up button increments the volume by the amount defined in the config.
By default the increment is 5. To change the increment you must adjust the
volume_increment setting in the `Amplitude.init()` method. This element will
respond to a `click` on desktop or a `touchstart` event on mobile. On iPhones,
the user can not adjust the volume through the web page. To add a volume up
element add:

```html
<span class="amplitude-volume-up"></span>
```

## Volume Down
There is only one level for the volume down button:
1. Global - Decreases the volume by the amount specified on init. Default 5%.

The volume down button decrements the volume by the amount defined in the
config. By default the decrement is 5. To change the increment you must adjust
the volume_decrement setting in the `Amplitude.init()` method. This element will
respond to a 'click' on desktop or a 'touchstart' event on mobile. On iPhones,
the user can not adjust the volume through the web page. To add a volume up
element add:

```html
<span class="amplitude-volume-down"></span>
```

## Volume Slider
There is only one level for the volume slider:
1. Global - Increases or Decreases the volume by sliding the range element.

The volume slider MUST be an HTML 5 range input element. This allows the user to
slide the volume to where they want. On desktop and mobile,
this element listens to a 'change' or 'input' event. It will not work on iPhones
since iOS doesn't allow the user to adjust the volume through anything but the
volume up and down hardware buttons. To add a volume slider, add the following
HTML:

```html
<input type="range" class="amplitude-volume-slider"/>
```

## Next Button
AmplitudeJS extends functionality for the audio tag by allowing designers and
developers to build playlists. When a next button has been added AmplitudeJS
will go to the next song in the state of the player.

There are two levels of the next button.

1. Global Next - Will go to the next song in the state no matter what state
the player is in. If the player is playing a specific playlist, the global next button will go to the next song in the list.
2. Playlist Next - Will go to the next song in the playlist.

The next button will either go sequentially down the indexes or the next index
in the shuffled songs array. If the player is playing a playlist, then the
global next button will operate on that playlist.

### Global Next Button
To add a global next button add the following HTML:
```html
<span class="amplitude-next"></span>
```

### Playlist Next Button
To add a playlist next button add the following HTML:
```html
<span class="amplitude-next" data-amplitude-playlist="{playlist_key}"></span>
```
The playlist next button has a `data-amplitude-playlist` attribute with the key for the playlist it's corresponding to.

A quick note on the playlist next buttons. If you have two playlists (A & B), and you are playing playlist A, but press a next button that is relating to playlist B, the next button won't do anything.

## Previous Button
Similar to the next button, the previous button goes to the previous song in the
state of the player. There are two levels of the previous button.

1. Global Previous - Will go to the previous song in the state no matter what state the player is in.
2. Playlist Previous - Will go to the previous song in the playlist no matter the state.

The previous button will go sequentially down the indexes or to the previous
index in the shuffled songs array. If the player is playing a playlist,
the global previous button will operate on that playlist.

### Global Previous Button
To add a global previous button add the following HTML:
```html
<span class="amplitude-prev"></span>
```

### Playlist Previous Button
To add a playlist previous button add the following HTML:
```html
<span class="amplitude-prev" data-amplitude-playlist="{playlist_key}"></span>
```

The playlist previous button has a `data-amplitude-playlist` attribute with the key for the playlist it's corresponding to. Similar to the next buttons, if you have two playlists and you click a previous button scoped to the inactive playlist, then it won't do anything.

## Shuffle Button
The shuffle button has two levels:

1. Global Shuffle Button - Shuffles the songs array. This is used outside the scope of the playlist.
2. Playlist Shuffle Button - Shuffles all of the songs in a playlist. This state is kept on a per-playlist basis.

The shuffle button is also an extension of functionality added by AmplitudeJS. It allows the developer/user to shuffle songs in a playlist or on a global level.

Playlists can have shuffle states independent of other playlists. When a song ends or the user goes to the next song, AmplitudeJS will know whether or not the playlist should go to the next sequential user defined song or the next song in the shuffle array.  When a playlist is shuffled or the global songs are shuffled a class of `amplitude-shuffle-on` is applied to the element where if shuffle is turned off `ampltiude-shuffle-off` is applied to the element.

### Global Shuffle Button
To add a shuffle button add the following HTML:
```html
<span class="amplitude-shuffle"></span>
```

### Playlist Shuffle Button
To add a playlist shuffle button add the following HTML:
```html
<span class="amplitude-shuffle" data-amplitude-playlist="{playlist_key}"></span>
```

This shuffle button contains the attribute that defines the playlist key. This
will shuffle only the playlist defined.

## Repeat Button
The repeat button, when active, will repeat the entire songs array when the last song has been played.

There are two levels to the Repeat Button:
1. Global Repeat - Repeats the songs in the songs array when the last song has finished.
2. Playlist Repeat - Repeats the playlist when the last song in the playlist has finished.

The buttons can be styled based off of the state of the classes applied to the button. When repeat is not on, the button will have a class of `amplitude-repeat-off` applied to the element and when repeat is on, the class `amplitude-repeat-on` applied to the element.

### Global Repeat Button
To add the repeat button, add the following HTML:
```html
<span class="amplitude-repeat"></span>
```

### Playlist Repeat Button
To add a playlist repeat button, add the following HTML:
```html
<span class="amplitude-repeat" data-amplitude-playlist="{playlist_key}"></span>
```

## Repeat Song
There is only one level of the repeat song button:
1. Global - Repeats the current song when eneded.

The repeat song button, when active, will repeat the individual song when the song has ended. The button can be styled based off of the sate of classes
applied to the button. When the repeat is not on, the button will have a class
of `amplitude-repeat-song-off` and when on, `amplitude-repeat-song-on`.

### Global Repeat Song Button
To add the repeat song button, add the following HTML:
```html
<span class="amplitude-repeat-song"></span>
```

## Playback Speed Button
There is only one level for the playback speed button:
1. Global - Determines how fast the audio should play back through AmplitudeJS.

The playback speed button controls how fast the audio is played back through
AmplitudeJS. There are 3 speeds.

1. '1.0' which is the base speed.
2. '1.5' which is 1.5x as fast
3. '2.0' which is 2x as fast

When clicked, the playback speed button will add a class representing the speed
the player is playing back at. The classes can be styled as well and are as
follows:

* '1.0' = 'amplitude-playback-speed-10'
* '1.5' = 'amplitude-playback-speed-15'
* '2.0' = 'amplitude-playback-speed-20'

### Global Playback Speed Button
To add a playback speed button simply add the following HTML:
```html
<span class="amplitude-playback-speed"></span>
```

## Skip To Link
There are 2 levels for the skip to link:
1. Individual Song - Skips to time defined for a song an individual song in the songs array.
2. Individual Song In Playlist - Skips to a time defined for an individual song in a playlist.

The skip to links allow the user to define spots in the audio like bookmarks
that can be skipped to. They can reference a song in a playlist or an individual
song depending on the attributes. If you want to link to a song in a playlist,
you have to add the attribute `data-amplitude-song-index="index"` and `data-amplitude-playlist="playlist"`. To make the skip work, you will also have to
add an attribute `data-amplitude-location="seconds"` to link to in the song.

### Individual Song Link
An example song link would be:
```html
<span class="amplitude-skip-to" data-amplitude-song-index="{song_index}" data-amplitude-location="30"></span>
```

This link will go to the song at the index defined and the location of the seconds defined by the `data-amplitude-location` attribute into the song.

### Individual Song In Playlist Link
An example of an individual song in playlist link would be:
```html
<span class="amplitude-skip-to" data-amplitude-song-index="{song_index}" data-amplitude-location="30" data-amplitude-playlist="{playlist}"></span>
```

This will skip to 30 seconds into a song in the playlist defined. Remember, the index of the song in the playlist is scoped to the playlist!

## Song Tracking Slider (HTML 5 Range)
There are 4 levels to the song tracking slider:

1. Global - This tracks whatever song is playing.
2. Playlist - This tracks the song currently playing in the playlist.
3. Individual Song - This tracks an individual song.
4. Individual Song In Playlist - This tracks an individual song within a playlist.

Song tracking sliders are implemented with the HTML 5 range element. This provides a semantic way to navigate through a song. The HTML 5 range element provides functionality and you can style it, even if it's a pain. However, if you are motivated, you can implement a custom song slider using some of the callbacks and public facing methods.

Note that features like the tracking slider and progress bar depend on the
browser being able to request the audio file in arbitrary chunks. Firefox can
work around lack of support from the server, but for these features to work
properly, your server must support
[Content-Range HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Range).

### Global Song Slider
To add a global song slider, add the following element:

```html
<input type="range" class="amplitude-song-slider" step=".1"/>
```

The class name is `amplitude-song-slider`.  the `step` attribute makes fine tuning the slider to react more to the current state of the song more fluid.

### Playlist Song Slider
If you want to do an individual playlist, you can add the attribute of `data-amplitude-playlist="{playlist_key}"`.

```html
<input type="range" class="amplitude-song-slider" data-amplitude-playlist="{playlist_key}"/>
```

### Individual Song Slider
You can also add a song slider for an individual song like this:

```html
<input type="range" class="amplitude-song-slider" data-amplitude-song-index="{song_index}"/>
```

### Individual Song In Playlist Slider
You can also add a song slider for an individual song in a playlist like this:

```html
<input type="range" class="amplitude-song-slider" data-amplitude-playlist="{playlist_key}" data-amplitude-song-index="{song_index}"/>
```

## Song Progress Bar
There are 4 levels where you can add a song progress bar:

1. Global - Displays the current progress for the audio being played.
2. Playlist - Displays the current progress if the current song is in the playlist.
3. Individual Song - Displays the current progress for an individual song.
4. Individual Song In Playlist - Displays the individual song current progress for a song in the playlist.

The song progress bar must be implemented with the HTML 5 progress element. This allows you full customization over the design. These operate the same as the range except you will have to implement your own slider event handling. I wrote a quick tutorial on that here: [https://serversideup.net/set-song-played-percentage-amplitudejs/](https://serversideup.net/set-song-played-percentage-amplitudejs/).

### Global Song Progress Bar
To add a song progress bar, add the following:
```html
<progress class="amplitude-song-played-progress"></progress>
```

### Playlist Song Progress Bar
To add a playlist song progress bar, add the following:
```html
<progress class="amplitude-song-played-progress" data-amplitude-playlist="{playlist_key}"></progress>
```

### Individual Song Progress Bar
To add an individual song progress bar, add the following:
```html
<progress class="amplitude-song-played-progress" data-amplitude-song-index="{song_index}"></progress>
```

### Individual Song In Playlist Progress Bar
```html
<progress class="amplitude-song-played-progress" data-amplitude-playlist="{playlist_key}" data-amplitude-song-index="{song_index}"></progress>
```

## Song Buffered Progress Bar
There are 4 levels for a song buffered progress bar:

1. Global - Displays the percentage of the song buffered for the current song.
2. Playlist - Displays the percentage of the song buffered for the current playlist song.
3. Individual Song - Displays the percentage of the song buffered for an individual song.
4. Individual Song In Playlist - Displays the percentage of the song buffered for an individual song in a playlist.

The Song Buffered Progress Bar has to be an HTML 5 progress element. This is the proper semantic element for this use case. This allows for a visual display of how much of the song has been buffered. You can do some CSS techniques to overlay this progress element over the song-played-progress element to make an all in one, or you could leave it by itself.  

### Global Song Buffered Progress Bar
To add a song buffered progress element, add the following:
```html
<progress class="amplitude-buffered-progress" value="0"></progress>
```

### Playlist Song Buffered Progress Bar
To add a playlist song buffered progress element, add the following:
```html
<progress class="amplitude-buffered-progress" data-amplitude-playlist="{playlist_key}" value="0"></progress>
```

### Individual Song Buffered Progress Bar
To add an individual song buffered progress element, add the following:
```html
<progress class="amplitude-buffered-progress" data-amplitude-song-index="{song_index}" value="0"></progress>
```

### Individual Song In Playlist Buffered Progress Bar
To add an individual song in playlist buffered progress element, add the following:
```html
<progress class="amplitude-buffered-progress" data-amplitude-song-index="{song_index}" data-amplitude-playlist="{playlist_key}" value="0"></progress>
```
