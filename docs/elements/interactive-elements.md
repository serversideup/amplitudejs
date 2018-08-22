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

The interactive elements of Amplitude.js have event handlers bound to them that
responds to a touch or click from a user. These elements build the functionality
of the player you are designing. The scoping of these elements is handled by
attributes that define the level of functionality each element has such as
global, playlist, individual song. These are outlined in detail for each element.

## Play Button

There are 3 different levels for a play button.
1. Global Play - Plays the current song whether it's an individual song or in a
playlist
2. Playlist Play - Plays the current song in the playlist.
3. Song Play - Plays an individual song whether it's in a playlist or by itself.

The play button responds to the 'click' event on a desktop or a 'touchstart'
event on mobile.

### Global Play Button
The global play button will play the active song whether or not the song is an
individual song or in a playlist. To add a global play button simply an HTML
element with the class 'amplitude-play'.

```html
<span class="amplitude-play"></span>
```

### Playlist Play Button
The playlist play button will play the active song in the playlist or it will
play the first song in the playlist if the playlist is out of scope (meaning
another playlist was being played or it's the first playlist being played). To
add a playlist play button, add an HTML element with the class of
'amplitude-play' and the attribute 'amplitude-playlist="playlist_index"'.

```html
<span class="amplitude-play" amplitude-playlist="playlist_index"></span>
```

### Individual Song Play Button
The individual song play button will play the song defined by the 'amplitude-song-index="song_index"' attribute.
You can also add an 'amplitude-playlist="playlist_index"' attribute to the
element which will play an individual song in the playlist.

```html
<span class="amplitude-play" amplitude-song-index="1"></span>
```

To play song index 1 in playlist "test_playlist":

```html
<span class="amplitude-play" amplitude-song-index="1" amplitude-playlist="test_playlist"></span>
```

## Pause Button
Like the play button, the pause button has 3 different levels.
1. Global Pause - Pauses the active song no matter if it's individual or in a
playlist.
2. Playlist Pause - Pauses the active song in the playlist.
3. Song Pause - Pauses an individual song in a playlist or by itself.

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
<span class="amplitude-pause" amplitude-playlist="test_playlist"></span>
```

### Individual Song Pause
The individual song pause button will pause the song defined by the attribute 'amplitude-song-index="song_index"'. If you want an individual song in a
playlist to add the 'amplitude-playlist="test_playlist"' attribute to the element
and Amplitude.js will pause that individual song in the playlist when clicked.

```html
<span class="amplitude-pause" amplitude-song-index="3"></span>
```

If you want to pause song index 3 in the playlist "test_playlist"

```html
<span class="amplitude-pause" amplitude-song-index="3" amplitude-playlist="test_playlist"></span>
```

## Play Pause Button
The play/pause button is probably the most common button to be implemented when
working with Amplitude.js. Depending on the global state, playlist state and/or
song state, this element will get a class that is 'amplitude-playing' or
'amplitude-paused' that can be styled accordingly. It's common to set a play or
pause button image as a background in CSS so when the interaction occurs, the
proper button appears.

There are 3 levels of Play/Pause buttons.
1. Global Play/Pause - Plays or pauses the active song no matter if it's
independent or part of a playlist.
2. Playlist Play/Pause - Plays or pauses the active song in the scope of the playlist.
3. Song Play/Pause - Plays or pauses an individual song.


### Global Play/Pause
The global play pause button plays or pauses the current song depending on the
state of the AmplitudeJS player. This button does not account for whether the
song is in a playlist or an individual song, it's whatever song is active the
functionality works on.  To add a global play/pause button you add an element
and give the property of 'amplitude-main-play-pause="true"':

```html
<span class="button amplitude-play-pause" amplitude-main-play-pause="true"></span>
```

### Playlist Play/Pause
The playlist play pause button plays or pauses the current song in a playlist.
If a song is being played outside of a playlist when clicked, the playlist will
play the first song in the playlist assigned to the button clicked and pause the
other song. To add a playlist play pause button add an element with the class of 'amplitude-play-pause' an attribute of 'amplitude-playlist-main-play-pause="true"'
and an attribute of 'amplitude-playlist="{playlist-index}'.

```html
<span class="button amplitude-play-pause amplitude-paused" amplitude-playlist-main-play-pause="true" amplitude-playlist="{index}"></span>
```

### Song Play/Pause
The song play pause button plays or pauses the song clicked. This can either be
in a playlist or an individual song. If the song is in a playlist you will have
to add an attribute stating the playlist with the playlist key. The element will
also have to have an attribute of the song index on the element.

Playlist Song:
```html
<span class="button amplitude-play-pause" amplitude-song-index="{song_index}" amplitude-playlist="{song_playlist}"></span>
```

Individual Song:
```html
<span class="button amplitude-play-pause amplitude-paused" amplitude-song-index="{song_index}"></span>
```

## Stop Button
The stop button simply stops the active song. On a desktop, this will respond to
the 'click' event and a 'touchstart' on mobile. To add a stop button simply add
the following HTML element:

```html
<span class="amplitude-stop"></span>
```

## Mute Button
The mute button is another global element that mutes the active song. On a
desktop, this element will respond to the 'click' event and a 'touchstart' on
mobile.
There are two classes that get added to the mute button so you can style it
according to the state of the player.

When the player is not muted the class 'amplitude-not-muted' is added to the
element and 'amplitude-muted' is added when the player is muted.

```html
<span class="amplitude-mute"></span>
```

## Volume Up
The volume up button increments the volume by the amount defined in the config.
By default the increment is 5. To change the increment you must adjust the
volume_increment setting in the Amplitude.init() method. This element will
respond to a 'click' on desktop or a 'touchstart' event on mobile. On iPhones,
the user can not adjust the volume through the web page. To add a volume up
element add:

```html
<span class="amplitude-volume-up"></span>
```

## Volume Down
The volume down button decrements the volume by the amount defined in the
config. By default the decrement is 5. To change the increment you must adjust
the volume_decrement setting in the Amplitude.init() method. This element will
respond to a 'click' on desktop or a 'touchstart' event on mobile. On iPhones,
the user can not adjust the volume through the web page. To add a volume up
element add:

```html
<span class="amplitude-volume-down"></span>
```

## Volume Slider
The volume slider is an HTML 5 range input element. This allows the user to
slide the volume to where they want. On desktop and mobile,
this element listens to a 'change' or 'input' event. It will not work on iPhones
since iOS doesn't allow the user to adjust the volume through anything but the
volume up and down hardware buttons. To add a volume slider, add the following
HTML:

```html
<input type="range" class="amplitude-volume-slider"/>
```

## Next Button
Amplitude.js extends functionality for the audio tag by allowing designers and
developers to build playlists. When a next button has been added Amplitude.js
will go to the next song in the state of the player. There are two versions of
the next button.

1. Global Next -> Will go to the next song in the state no matter what state
the player is in.
2. Playlist Next -> Will go to the next song in the playlist no matter the
state.

The next button will either go sequentially down the indexes or the next index
in the shuffled songs array. If the player is playing a playlist, then the
global next button will operate on that playlist.

To add a global next button add the following HTML:
```html
<span class="amplitude-next"></span>
```

To add a playlist next button add the following HTML:
```html
<span class="amplitude-next" amplitude-playlist="playlist_key"></span>
```
The playlist next button has an amplitude-playlist attribute with the key for
the playlist it's corresponding to.

## Previous Button
Similar to the next button, the previous button goes to the previous song in the
state of the player. There are two versions of the previous button.

1. Global Prev -> Will go to the previous song in the state no matter what state
the player is in.
2. Playlist Prev -> Will go to the previous song in the playlist no matter the
state.

The previous button will go sequentilly down the indexes or to the previous
index in the shuffled songs array. If the player is playing a playlist,
the global previous button will operate on that playlist.

To add a global previous button add the following HTML:
```html
<span class="amplitude-prev"></span>
```

To add a playlist previous button add the following HTML:
```html
<span class="amplitude-prev" amplitude-playlist="playlist_key"></span>
```
The playlist previous button has an amplitude-playlist attribute with the key
for the playlist it's corresponding to.

## Shuffle Button
The shuffle button is also an extension of functionality added by Amplitude.js.
It allows the developer/user to shuffle songs in a playlist or on a global level.
Playlists can have shuffle states indpendant of other playlists. When a song
ends or the user goes to the next song, Amplitude.js will know whether or not
the playlist should go to the next sequential user defined song or the next song
in the shuffle array.  When a playlist is shuffled or the global songs are
shuffled a class of 'amplitude-shuffle-on' is applied to the element where if
shuffle is turned off 'ampltiude-shuffle-off' is applied to the element.

To add a shuffle button add the following HTML:
```html
<span class="amplitude-shuffle"></span>
```

To add a playlist shuffle button add the following HTML:
```html
<span class="amplitude-shuffle" amplitude-playliste="playlist_key"></span>
```

This shuffle button contains the attribute that defines the playlist key. This
will shuffle only the playlist defined.

## Repeat Button
The repeat button, when active, will repeat the entire songs array when the
there are no songs. This is a global level element. The button can be styled
based off of the state of the classes applied to the button. When repeat is not
on, the button will have a class of 'amplitude-repeat-off' applied to the
element and when repeat is on, the class 'amplitude-repeat-on' applied to the
class.

To add the repeat button, add the following HTML:
```html
<span class="amplitude-repeat"></span>
```

### Repeat Song
The repeat song button, when active, will repeat the individual song when the
song has ended. The button can be styled based off of the sate of classes
applied to the button. When the repeat is not on, the button will have a class
of 'amplitude-repeat-song-off' and when on, 'amplitude-repeat-song-on'.

To add the repeat song button, add the following HTML:
```html
<span class="amplitude-repeat-song"></span>
```

## Playback Speed Button
The playback speed button controls how fast the audio is played back through
Amplitude.js. There are 3 speeds.

1. '1.0' which is the base speed.
2. '1.5' which is 1.5x as fast
3. '2.0' which is 2x as fast

When clicked, the playback speed button will add a class representing the speed
the player is playing back at. The classes can be styled as well and are as
follows:

'1.0' = 'amplitude-playback-speed-10'
'1.5' = 'amplitude-playback-speed-15'
'2.0' = 'amplitude-playback-speed-20'

To add a playback speed button simply add the following HTML:
```html
<span class="amplitude-playback-speed"></span>
```

## Skip To Link
The skip to links allow the user to define spots in the audio like bookmarks
that can be skipped to. They can reference a song in a playlist or an individual
song depending on the attributes. If you want to link to a song in a playlist,
you have to add the attribute 'amplitude-song-index="index"' and 'amplitude-playlist="playlist"'. To make the skip work, you will also have to
add an attribute 'amplitude-location="seconds"' to link to in the song.

An example song link would be:
```html
<span class="amplitude-skip-to" amplitude-song-index="7" amplitude-location="30" amplitude-playlist="rock"></span>
```

This link will go to the song at index 7 on the playlist rock and the location
of 30 seconds into the song.

## Song Tracking Slider (HTML 5 Range)

The easiest way to implement song tracking is through an HTML 5 Range slider.
The sliding functionality is already taken care of for you and it provides a
smooth UX. There are some downfalls with this element since you can't style the
before and after pieces. We also have an HTML 5 progress element that allows for
easy styling of before and after but requires some custom JS to update the
interaction. No worries, though the tutorial will be linked!

Note that features like the tracking slider and progress bar depend on the
browser being able to request the audio file in arbitrary chunks. Firefox can
work around lack of support from the server, but for these features to work
properly, your server must support
[Content-Range HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Range).

To add a song slider, add the following element:
```html
<input type="range" class="amplitude-song-slider" amplitude-main-song-slider="true" step=".1"/>
```

The class name is `amplitude-song-slider`. You can also add
`amplitude-main-song-slider="true"` if you want it to reference the current song
no matter what. If you want to do an individual playlist, you can add the
attributes of `amplitude-playlist-song-slider="true"`
and `amplitude-playlist="{playlistKey}"`.

```html
<input type="range" class="amplitude-song-slider" amplitude-playlist-song-slider="true" amplitude-playlist="{playlistKey}"/>
```

You can also add a song slider for an individual song like this:
```html
<input type="range" class="amplitude-song-slider" amplitude-playlist="{playlistKey}" amplitude-song-index="{songIndex}"/>
```

or

```html
<input type="range" class="amplitude-song-slider" amplitude-song-index="{songIndex}"/>
```

The first of the individual song examples is for a playlist, the second is for
an individual song.

## Song Progress Bar
In AmplitudeJS 3.2, we added the song progress bar. This allows the user further
customization over the design. It essentially replaces the song time
visualization that was removed in this release. These operate the same as the
range except you will have to implement your own slider event handling. I wrote
a quick tutorial on that here: [https://serversideup.net/set-song-played-percentage-amplitudejs/](https://serversideup.net/set-song-played-percentage-amplitudejs/).

To add a song progress bar, add the following:
```html
<progress id="song-played-progress" class="amplitude-song-played-progress" amplitude-main-song-played-progress="true"></progress>
```

## Song Buffered Progress Bar
In AmplitudeJS 3.2, we added the song buffered progress bar. This allows for a
visual display of how much of the song has been buffered. You can do some CSS
techniques to overlay this progress element over the song-played-progress
element to make an all in one, or you could leave it by itself.  

To add a song buffered progress element, add the following:
```html
<progress id="song-buffered-progress" class="amplitude-buffered-progress" value="0"></progress>
```
