## Overview
The concept of Amplitude.js is simple, allow designers to fully control the look and 
feel of their audio player through the web without having to understand advanced scripting. 
In HTML5, the audio tag allows users to add common audio formats to their web page. 
The problem is that the audio playback interface is controlled by the browser. Amplitude.js 
puts you in control of the design by simply applying a class or ID to page elements. 
You can then style these elements through CSS and control your audio. Amplitude.js goes above 
and beyond by adding playlist capabilities (next, previous, shuffle), song meta data and visualizations. 
Amplitude.js is now mobile friendly as well. If it detects a 
request coming from a mobile device it will apply a touchstart event listener instead of a click 
to the appropriate elements.

### Amplitude 3.0 Updates
Amplitude 3.0 is a complete code-base restructure focused on modern Javascript development techniques and
bundled together using webpack. Everything is structured in a way to be easily updated and maintained, paving
the way for faster pull requests and user contributions along with feature enhancements. The usage of Amplitude
from a developer's perspective remains the same. There is little to no migration necessary from 2.0 to 3.0.

Amplitude 3.0 also introduces the concept of playlists. The user can define all of the media on the page through
the songs array and organize the audio into playlists. With the playlists, the user can specify specific controls,
metadata, and design for the playlist. This allows adding multiple albums to the page and styling them independantly a
breeze!

The only feature removed is the Web Audio API visualization capability. This will be re-added as a plugin in future releases
with more flexibility and control of the visualizations. A lot of audio adjustment tools will also be added.

A load of other small features have been added as well such as skip to, repeat and playback speed, further giving more control to the
developer/designer over the functionality and feel of their audio player. The basic functionality has also been updated to be more stable
and easier to maintain. Everything in Amplitude 3.0 is modular so releases won't be so few and far between.

## Installation

### Install and update Amplitude via Bower

```
	bower install amplitude
```

### Downloading Manually

To get Amplitude.js manually, simply download the source from github: 
https://github.com/521dimensions/amplitudejs		

### Adding Amplitude.js to Your Document
On top of your page just add:

```javascript
<script type="text/javascript" src="/directory/to/amplitude.js"></script>
```

Amplitude.js is now available for use! All that's left is initializing.

## Configuring Amplitude.js

### Initializing Amplitude.js
To initialize Amplitude.js, you must call the Amplitude.init() method and pass in an object that
contains an array of songs and settings. Amplitude.js will then take care of configuring and setting up your
player by finding all of the Amplitude elements (defined later in the docs) and binding the appropriate
event handlers.

To configure Amplitude.js, you need to call the init function on the Amplitude object
and you can pass it a JSON object of configuration variables ( we will go through ALL of these in the
documentation ). At the bare minimum, you need to pass it all of the song objects that your page will
be using. More information about the song object next.

```javascript
	Amplitude.init({
		"songs": [
			{
				"name": "Song Name 1",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg"
			},
			{
				"name": "Song Name 2",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg"
			},
			{
				"name": "Song Name 3",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg"
			}
		]
	});
```

This configuration will set up Amplitude.js to work the way you want it. The config JSON is used heavily
to configure and optimize Amplitude.js for what your app needs.

### Song Objects

An array of JSON song objects is required by Amplitude.js.  This directs Amplitude to the metadata
and information necessary for playing the audio.

A basic song object has the following keys:

* name = The name of the song 
* artist = The song's artist
* album = The song's album ( Also used to determine album changes in an environment where multiple albums are used on the page)
* url = The URL to the song. This is most imporatant.  (Soundcloud URLs discussed later)
* cover_art_url = The URL to the song's cover art.
* live = Set to true for a URL that is a live audio source.

The only actualy required key is the url so Amplitude.js can play the song.

As of Amplitude 3.0, the song object can include any number of keys which can be displayed anywhere on the page. You can
make up a key name if you want like 

```json
	{
		"name": "Song Name 3",
		"artist": "Artist Name",
		"album": "Album Name",
		"url": "/song/url.mp3",
		"cover_art_url": "/cover/art/url.jpg",
		"made_up_key": "I'm made up completely"
	}
```

and reference it anywhere on your page using the 'amplitude-song-info' attribute on the element you want to display the
data like:

```html
	<span class="made-up-key" amplitude-song-info="made_up_key"></span>
```

It is important to note that in multiple song environments, the order that you list the songs makes a difference. When utitlizing
next and previous functionality, Amplitude.js will iterate over the songs object and go to the next song or the previous song
in the list. If you are using Amplitude.js in a playlist type environment, you will define the order of the songs in the playlist
by their individual indexes.

It is also important to note how songs are indexed. Like in almost all programming, indexes start at 0.  So when you are setting
up multiple play/pause functions or song status sliders that relate to an individual song or playlists, the indexes are used. For example,
the song above named "Song Name 1" would have an index of 0, "Song Name 2" would have an index of 1, and so on.

### Playlists (Amplitude 3.0)

The ability to make playlists has been introduced in Amplitude 3.0. You can now scope functionality of Amplitude.js into playlists
such as play/pause buttons, meta data, next, prev, etc.  To make a playlist you must first define all of your songs as song objects in
the songs array. This is like your library. You will then make a playlists object when you init Amplitude.js and you will give a key
for the unique identifier for your playlist. This key will then contain an array of song indexes being used by your playlist. These are
the index of the song in the songs array. The original songs array index will be used in *EVERY* reference even in a playlist. Consider it
the unique ID of the song.

That sounds like a lot, so let's break it down. We will be making a playlist for Rock and Roll tracks using the following songs:

```javascript
	Amplitude.init({
		"songs": [
			{
				"name": "Song Name 1",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg",
				"genre": "country"
			},
			{
				"name": "Song Name 2",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg",
				"genre": "rock"
			},
			{
				"name": "Song Name 3",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg",
				"genre": "rock"
			},
			{
				"name": "Song Name 4",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg",
				"genre": "classical"
			},
			{
				"name": "Song Name 5",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg",
				"genre": "rock"
			},
			{
				"name": "Song Name 6",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg",
				"genre": "indie"
			},
			{
				"name": "Song Name 7",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg",
				"genre": "rock"
			}
		]
	});
```


At the end of your config, you will add a key that states you will have playlists including a playlist
keyed as "rock_and_roll". Remember these are JSON keys so use underscores!:
```json
	"playlists": {
		"rock_and_roll": []
	}
```

In the playlist we will be adding all the songs that have the genre rock. These are the indexes of songs
that will be added.  Your final Amplitude.init() method will look like:

```javascript
	Amplitude.init({
		"songs": [
			{
				"name": "Song Name 1",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg",
				"genre": "country"
			},
			{
				"name": "Song Name 2",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg",
				"genre": "rock"
			},
			{
				"name": "Song Name 3",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg",
				"genre": "rock"
			},
			{
				"name": "Song Name 4",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg",
				"genre": "classical"
			},
			{
				"name": "Song Name 5",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg",
				"genre": "rock"
			},
			{
				"name": "Song Name 6",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg",
				"genre": "indie"
			},
			{
				"name": "Song Name 7",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg",
				"genre": "rock"
			}
		],
		"playlists": {
			"rock_and_roll": [
				1, 2, 4, 6
			]
		}
	});
```

You now have a playlist with a key "rock_and_roll" that contains 4 songs from your library. As we add more
features, you will see how this playlist key will come into play to scope the functions of Amplitude.js by
playlist.

### Setting the Starting Volume

You can define the starting volume for when the user initially presses play.  To do this, you need to add a 
"volume" key to your initialization JSON.  This value is any number between 0 and 1. Think of this as a percentage.
If you want the volume percentage at 35%, set this value equal to .35.

```javascript
	Amplitude.init({
		"songs": [
			{
				"name": "Song Name 1",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg"
			},
			{
				"name": "Song Name 2",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg"
			},
			{
				"name": "Song Name 3",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg"
			}
		],
		"volume": .35
	});
```

### Autoplay

Autoplay is simple, when set to true, Amplitude.js will play the song you set to to be the start song, or the first song in your
config.

```javascript
	Amplitude.init({
		"songs": [
			{
				"name": "Song Name 1",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg"
			},
			{
				"name": "Song Name 2",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg"
			},
			{
				"name": "Song Name 3",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg"
			}
		],
		"autoplay": true
	});
```

This will play the first song in the config on page load.

### Setting Default Album Art

If you have songs that don't have a specific piece of album art, you can define a default image url using
the "default_album_art" key.  Once again, this is handled on initialization.

```javascript
	Amplitude.init({
		"songs": [
			{
				"name": "Song Name 1",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg"
			},
			{
				"name": "Song Name 2",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg"
			},
			{
				"name": "Song Name 3",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg"
			}
		],
		"default_album_art": "/url/to/default.jpg"
	});
```

### Debug Mode

Debug mode outputs verbose updates 

### Soundcloud Configuration

### Preload Setting

### Callbacks

### Preset Volume

### Volume Increment Amount

### Volume Decrement Amount

## Amplitude Elements

Amplitude.js comes with a variety of elements. Each element is picked up by a class prefixed with 'amplitude-'
and depending on the environment, an attribute that relates to the index of a song in your list of songs or
a playlist you are using the element with. There are elements that some events are bound to such as play and next
and other elements that get filled with meta data information about the active audio.

All elements can be styled simply based off of class or if you want to define specific ids in CSS. Besides
album art, you could apply these classes to a variety of elements.  Album art has to be an <img> element,
but the other elements could be whatever.

### Interactive Elements

The interactive elements of Amplitude.js have event handlers bound to them that responde to a touch or
click from a user. These elements build the functionality of the player you are designing. The scoping
of these elements is handled by attributes that define the level of functionality each element has such as
global, playlist, individual song. These are outlined in detail for each element.

#### Play Button

There are 3 different levels for a play button.
1. Global Play - Plays the current song whether it's an individual song or in a playlist
2. Playlist Play - Plays the current song in the playlist.
3. Song Play - Plays an individual song whether it's in a playlist or by itself.

The play button responds to the 'click' event on a desktop or a 'touchstart' event on mobile.

##### 1. Global Play Button
The global play button will play the active song whether or not the song is an individual song or
in a playlist. To add a global play button simply an HTML element with the class 'amplitude-play'.

```html
<span class="amplitude-play"></span>
```

##### 2. Playlist Play Button
The playlist play button will play the active song in the playlist or it will play the first
song in the playlist if the playlist is out of scope (meaning another playlist was being played or
it's the first playlist being played). To add a playlist play button, add an HTML element with the
class of 'amplitude-play' and the attribute 'amplitude-playlist="playlist_index"'.

```html
<span class="amplitude-play" amplitude-playlist="playlist_index"></span>
```

##### 3. Individual Song Play Button
The individual song play button will play the song defined by the 'amplitude-song-index="song_index"' attribute.
You can also add an 'amplitude-playlist="playlist_index"' attribute to the element which will play an individual
song in the playlist.

```html
<span class="amplitude-play" amplitude-song-index="1"></span>
```

To play song index 1 in playlist "test_playlist":

```html
<span class="amplitude-play" amplitude-song-index="1" amplitude-playlist="test_playlist"></span>
```

#### Pause Button
Like the play button, the pause button has 3 different levels.
1. Global Pause - Pauses the active song no matter if it's individual or in a playlist.
2. Playlist Pause - Pauses the active song in the playlist.
3. Song Pause - Pauses an individual song in a playlist or by itself.

The pause button responds to the 'click' event on a desktop or a 'touchstart' event on mobile.

##### 1. Global Pause
The global pause button will pause whatever song is currently playing. To add a global pause button simply
add an HTML element with the class of 'amplitude-pause'.

```html
<span class="amplitude-pause"></span>
```

##### 2. Playlist Pause
The playlist pause button will pause the active song in the playlist. It only works if the playlist defined in
the attribute is playing the song.

```html
<span class="amplitude-pause" amplitude-playlist="test_playlist"></span>
```

##### 3. Individual Song Pause
The individual song pause button will pause the song defined by the attribute 'amplitude-song-index="song_index"'. If
you want an individual song in a playlist to add the 'amplitude-playlist="test_playlist"' attribute to the element
and Amplitude.js will pause that individual song in the playlist when clicked.

```html
<span class="amplitude-pause" amplitude-song-index="3"></span>
```

If you want to pause song index 3 in the playlist "test_playlist"

```html
<span class="amplitude-pause" amplitude-song-index="3" amplitude-playlist="test_playlist"></span>
```

#### Play Pause Button
The play/pause button is probably the most common button to be implemented when working with Amplitude.js.
Depending on the global state, playlist state and/or song state, this element will get a class that is 'amplitude-playing'
or 'amplitude-paused' that can be styled accordingly. It's common to set a play or pause button image as a background in CSS
so when the interaction occurs, the proper button appears. 

There are 3 levels of Play/Pause buttons.
1. Global Play/Pause - Plays or pauses the active song no matter if it's independent or part of a playlist.
2. Playlist Play/Pause - Plays or pauses the active song in the scope of the playlist.
3. Song Play/Pause - Plays or pauses an individual song.

##### Global Play/Pause

##### Playlist Play/Pause

##### Song Play/Pause

#### Stop Button
The stop button simply stops the active song. On a desktop, this will respond to the 'click' event and a 'touchstart' on mobile. 
To add a stop button simply add the following HTML element:

```html
<span class="amplitude-stop"></span>
```

#### Mute Button
The mute button is another global element that mutes the active song. On a desktop, this element will respond to the 'click' event and a 'touchstart' on mobile.
There are two classes that get added to the mute button so you can style it according to the state of the player.

When the player is not muted the class 'amplitude-not-muted' is added to the element and 'amplitude-muted' is added
when the player is muted.

```html
<span class="amplitude-mute"></span>
```

#### Volume Up
The volume up button increments the volume by the amount defined in the config. By default the increment is 5. To change
the increment you must adjust the volume_increment setting in the Amplitude.init() method. This element will respond to
a 'click' on desktop or a 'touchstart' event on mobile. On iPhones, the user can not adjust the volume through the web
page. To add a volume up element add:

```html
<span class="amplitude-volume-up"></span>
```

#### Volume Down
The volume down button decrements the volume by the amount defined in the config. By default the decrement is 5. To change
the increment you must adjust the volume_decrement setting in the Amplitude.init() method. This element will respond to
a 'click' on desktop or a 'touchstart' event on mobile. On iPhones, the user can not adjust the volume through the web
page. To add a volume up element add:

```html
<span class="amplitude-volume-down"></span>
```

#### Volume Slider
The volume slider is an HTML 5 range input element. This allows the user to slide the volume to where they want. On desktop and mobile,
this element listens to a 'change' or 'input' event. It will not work on iPhones since iOS doesn't allow the user to adjust the volume through
anything but the volume up and down hardware buttons. To add a volume slider, add the following HTML:

```html
<input type="range" class="amplitude-volume-slider"/>
```

#### Next Button
Amplitude.js extends functionality for the audio tag by allowing designers and developers to build playlists. When a next button has been added
Amplitude.js will go to the next song in the state of the player. There are two versions of the next button.
1. Global Next -> Will go to the next song in the state no matter what state the player is in.
2. Playlist Next -> Will go to the next song in the playlist no matter the state.

The next button will either go sequentially down the indexes or the next index in the shuffled songs array. If the player is playing a playlist,
then the global next button will operate on that playlist.

To add a global next button add the following HTML:
```html
<span class="amplitude-next"></span>
```

To add a playlist next button add the following HTML:
```html
<span class="amplitude-next" amplitude-playlist="playlist_key"></span>
```
The playlist next button has an amplitude-playlist attribute with the key for the playlist it's corresponding to.

#### Previous Button
Similar to the next button, the previous button goes to the previous song in the state of the player. There are two versions
of the previous button.
1. Global Prev -> Will go to the previous song in the state no matter what state the player is in.
2. Playlist Prev -> Will go to the previous song in the playlist no matter the state.

The previous button will go sequentilly down the indexes or to the previous index in the shuffled songs array. If the player is playing a playlist,
the global previous button will operate on that playlist.

To add a global previous button add the following HTML:
```html
<span class="amplitude-prev"></span>
```

To add a playlist previous button add the following HTML:
```html
<span class="amplitude-prev" amplitude-playlist="playlist_key"></span>
```
The playlist previous button has an amplitude-playlist attribute with the key for the playlist it's corresponding to.

#### Shuffle Button
The shuffle button is also an extension of functionality added by Amplitude.js. It allows the developer/user to shuffle songs
in a playlist or on a global level. Playlists can have shuffle states indpendent of other playlists. When a song ends or the user
goes to the next song, Amplitude.js will know whether or not the playlist should go to the next sequential user defined song or the
next song in the shuffle array.  When a playlist is shuffled or the global songs are shuffled a class of 'amplitude-shuffle-on' is 
applied to the element where if shuffle is turned off 'ampltiude-shuffle-off' is applied to the element.

To add a shuffle button add the following HTML:
```html
<span class="amplitude-shuffle"></span>
```

To add a playlist shuffle button add the following HTML:
```html
<span class="amplitude-shuffle" amplitude-playliste="playlist_key"></span>
```

This shuffle button contains the attribute that defines the playlist key. This will shuffle only the playlist defined.

#### Repeat Button
The repeat button, when active, will repeat the current song when the song has ended. This is a global level element.
The button can be styled based off of the state of the classes applied to the button. When repeat is not on, the button 
will have a class of 'amplitude-repeat-off' applied to the element and when repeat is on, the class 'amplitude-repeat-on'
applied to the class.

To add the repeat button, add the following HTML:
```html
<span class="amplitude-repeat"></span>
```

#### Playback Speed Button
The playback speed button controls how fast the audio is played back through Amplitude.js. There are 3 speeds.
1. '1.0' which is the base speed.
2. '1.5' which is 1.5x as fast
3. '2.0' which is 2x as fast

When clicked, the playback speed button will add a class representing the speed the player is playing back at. The classes
can be styled as well and are as follows:
'1.0' = 'amplitude-playback-speed-10'
'1.5' = 'amplitude-playback-speed-15'
'2.0' = 'amplitude-playback-speed-20'

To add a playback speed button simply add the following HTML:
```html
<span class="amplitude-playback-speed"></span>
```

#### Skip To Link
The skip to links allow the user to define spots in the audio like bookmarks that can be skipped to. They can reference
a song in a playlist or an individual song depending on the attributes. If you want to link to a song in a playlist, you have
to add the attribute 'amplitude-song-index="index"' and 'amplitude-playlist="playlist"'. To make the skip work, you will also have
to add an attribute 'amplitude-location="seconds"' to link to in the song.

An example song link would be:
```html
<span class="amplitude-skip-to" amplitude-song-index="7" amplitude-location="30" amplitude-playlist="rock"></span>
```

This link will go to the song at index 7 on the playlist rock and the location of 30 seconds into the song.

### Meta Data Elements

Meta data elements get their information filled in with meta data from the active song object. These can be
any type of HTML element except when filling in cover_art_url, station_art_url, podcast_episode_cover_art_url.
These specific keys have to be on an img tag since they update the src attribute of the tag. Every other
attribute fills in the inner html of the tag.

#### Image Metadata

#### Text Metadata

#### Time Metadata

## Config Variables
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

## Public Functions

### Bind New Elements

### Set Debug

### Get Active Song Metadata

### Get Song By Index

### Get Song At Playlist Index

### Add Song

### Play Now

### Play

### Pause

### Get Audio