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

### Amplitude 3.2 Updates
Amplitude 3.2 adds a whole bunch of more features. It could easily have been an entire version number increase. The main thing focused on in Amplitude 3.2 is open up access to the config through getters. This allows for more customization built on the current state of the player. Another big feature is the implementation of the `<progress>` elements for song time visualization and the addition of song buffering. You can now access the current buffering state of the song.  The most exciting feature I think is the addition of key binding events. You can now take a key code and bind certain events such as play_pause, pause, stop, etc to a key code when pressed on the page. This is new in 3.2 and definitely looking to be expanded further.

The only thing removed in version 3.2 is the song-time-visualization. This is because it was the only feature that actually added mark up to the page. All of this functionality can be done with a progress bar now and styled as a progress bar. The range element can still be a slider and can be styled as well. AmplitudeJS now does not insert any mark up into the page.

## Installation

### Option 1: Use CDN from [jsDelivr](https://cdn.jsdelivr.net/npm/amplitudejs/)
No installation is required to use Amplitude.js. All you need to do is include a single line in your `<head>` section of your HTML page.

Replace `{{version-number}}` with the exact version number that you would like to use (see [our releases](https://github.com/521dimensions/amplitudejs/releases) for what version number to use):
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/amplitudejs@{{version-number}}/dist/amplitude.js"></script>
```
**NOTE:** It's best to set your version number manually to make sure you have full control of what version you are running. If you need to upgrade in the future, just change `{{version-number}}` to the latest version.


### Option 2: Automatic install via `npm`
Download it via NPM to your existing project:
```sh
npm install --save amplitudejs
```

You will see the file under `node_modules/amplitudejs/dist/amplitude.js`.

### Option 3: Manual download
Download the `amplitude.js` file from [our releases page](https://github.com/521dimensions/amplitudejs/releases) and include the file manually with your project.

Amplitude.js is now available for use! All that's left is initializing.


## Initializing Amplitude.js
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

## Configuring Amplitude.js
Amplitude JS contains many variables that can be configured to determine the functionality of AmplitudeJS.
These are set and passed in during the Amplitude.init() method:

| Setting       		  | Default       | Type  	 				| Functionality 																			|
| ----------------------- |:-------------:|:-----------------------:|:------------------------------------------------------------------------------------------|
| autoplay      		  | false 		  | boolean 				| When true, autoplays the current song 													|
| callbacks 			  | {} 			  | JSON Object  			| Object containing methods that get called at certain actions 									|
| songs     			  | {}     		  | JSON Object 			| Object containing all of the songs used by AmplitudeJS 									|
| playlists 			  | {}  	      | JSON Object 			| Object containing all of the playlists used by AmplitudeJS 								|
| default_album_art 	  | '' 			  | URL 					| URL to the default album art image 														|
| debug 				  | false 		  | Boolean 				| Determines if we should print out debugging to the console 								|
| volume 				  | 50 			  | Integer (0 - 100) 		| The level of volume of the active audio with 0.0 being the quietest and 1.0 the loudest 	|
| volume_increment 		  | 5			  | Integer (1 - 100) 		| How much the volume increments every time the volume increment pressed.					|
| volume_decrement 		  | 5 			  | Integer (1 - 100) 		| How much the volume decrements every time the volume decrement pressed. 					|
| soundclound_client 	  | '' 			  | String 					| The API key for SoundCloud if being used 													|
| soundcloud_use_art 	  | false 		  | Boolean 				| Determines if we should use the SoundCloud album art by default 							|
| continue_next | true | boolean | Determines if when a song ends, do we continue to the next song |
| starting_playlist | '' | JSON Object | If there are multiple playlists, determine which one will be started by default |
| start_song | '' | Integer | The index of the song that AmplitudeJS should start with. |
| shuffle_on | false | Boolean | When on, gets set to true so when traversing through songs, AmplitudeJS knows whether or not to use the songs object or the shuffle_list |

A note about `autoplay`. In newer versions of Safari on iOS, user interaction has to take place before the song can be autoplayed. This is for bandwidth restrictions and not playing music in unwanted areas. For More information, visit: [https://www.reddit.com/r/webdev/comments/71nkym/safari_11_has_a_major_change_to_web_audio_api/](https://www.reddit.com/r/webdev/comments/71nkym/safari_11_has_a_major_change_to_web_audio_api/)

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
	<span class="made-up-key" amplitude-song-info="made_up_key" amplitude-main-song-info="true"></span>
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

### Binding Key Events (Version 3.2)
Key events were added in version 3.2. This allows you to configure certain events to trigger on key presses. The main piece of information needed is the key code (http://keycode.info/)[http://keycode.info/]. Once you have that, you can make an object that references a certain event key. There are 6 events that you can bind a key code to:

- prev (on key down, goes to previous song)
- next (on key down, goes to next song)
- play_pause (on key down, toggles play/pause)
- stop (on key down, stops the song)
- shuffle (on key down, toggles shuffle state global)
- repeat (on key down, toggles repeat state global)

To add a binding, for example, the right arrow key on a mac keyboard has code 39 you'd add the following to your config:

```javascript
	Amplitude.init({
		"bindings": {
			39: 'next'
		},
		"songs": [{}]
	})
```

Now every time the right arrow down is pressed, AmplitudeJS will go to the next song. You can add multiple bindings to the array with multiple key codes. It could be any key you want!

### Setting the Starting Volume

You can define the starting volume for when the user initially presses play.  To do this, you need to add a
"volume" key to your initialization JSON.  This value is any number between 0 and 100. Think of this as a percentage.
If you want the volume percentage at 35%, set this value equal to 35.

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
		"volume": 35
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

Debug mode outputs verbose updates when Amplitude actions take place to see the current config and statuses
of the AmplitudeJS player. To turn on AmplitudeJS debug mode you can set it in the config or call:

```javascript
Amplitude.setDebug( true );
```

### Soundcloud Configuration
AmplitudeJS supports SoundCloud integration. When adding a song from SoundCloud use the SoundCloud streamable
URL and provide a soundcloud_client in the config. AmplitudeJS will configure all of the data necessary from the
SoundCloud API to go with the song.  You can even use the album art by setting the soundcloud_use_art to true in
the config during the Amplitude.init() method.

### Callbacks
There are a variety of callbacks that AmplitudeJS calls at certain times and the developer can bind to.


| Callback        | Description 										   |
| --------------- |--------------------------------------------------------|
| before_play     | Occurs before the play method is called 			   |
| after_play 	  	| Occurs after the play method is called 			     |
| before_stop 	  | Occurs before the stop method is called 			   |
| after_stop  	  | Occurs after the stop method is called 				   |
| time_update 		| Occurs when the time has updated 								 |
| album_change 		| Occurs when an album changes 										 |
| song_change 		| Occurs when a song has been changed 						 |
| time_updated 		| Occurs when the current song time has been updated |
| playlist_changed | Occurs when the active playlist has changed |
| song_repeated  	| Occurs when the now playing song has been repeated |

To bind to a callback you add a function to your callbacks object with the key of one of the callbacks listed above. That key will be a function. When the callback is called, the function the user passes will be run. For example, After the user clicks play we want to increase the play count. I'd set up a callback that has a method to increase the play count:

```javascript
var playCount = 0;

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
		 "callbacks": {
			 'after_play': function(){
				 playCount++;
				 alert( playCount );
			 }
		 }
 });
```

Every time the play button is called, the song will begin to play and after all the code has been run, the callback will increase the play count.

The 'time_update' callback is super helpful because this gets triggered when the song time updates. This can be used to call other AmplitudeJS events such as song played percentage and set 3rd party visualizations.

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
The global play pause button plays or pauses the current song depending on the state of the AmplitudeJS player. This button
does not account for whether the song is in a playlist or an individual song, it's whatever song is active the functionality works
on.  To add a global play/pause button you add an element and give the property of 'amplitude-main-play-pause="true"':

```html
<span class="button amplitude-play-pause" amplitude-main-play-pause="true"></span>
```

##### Playlist Play/Pause
The playlist play pause button plays or pauses the current song in a playlist. If a song is being played outside of a playlist when
clicked, the playlist will play the first song in the playlist assigned to the button clicked and pause the other song. To add a playlist
play pause button add an element with the class of 'amplitude-play-pause' an attribute of 'amplitude-playlist-main-play-pause="true"' and an
attribute of 'amplitude-playlist="{playlist-index}'.

```html
<span class="button amplitude-play-pause amplitude-paused" amplitude-playlist-main-play-pause="true" amplitude-playlist="{index}"></span>
```

##### Song Play/Pause
The song play pause button plays or pauses the song clicked. This can either be in a playlist or an individual song.
If the song is in a playlist you will have to add an attribute stating the playlist with the playlist key. The element will
also have to have an attribute of the song index on the element.

Playlist Song:
```html
<span class="button amplitude-play-pause" amplitude-song-index="{song_index}" amplitude-playlist="{song_playlist}"></span>
```

Individual Song:
```html
<span class="button amplitude-play-pause amplitude-paused" amplitude-song-index="{song_index}"></span>
```

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
The repeat button, when active, will repeat the entire songs array when the there are no songs. This is a global level element.
The button can be styled based off of the state of the classes applied to the button. When repeat is not on, the button
will have a class of 'amplitude-repeat-off' applied to the element and when repeat is on, the class 'amplitude-repeat-on'
applied to the class.

To add the repeat button, add the following HTML:
```html
<span class="amplitude-repeat"></span>
```

##### Repeat Song
The repeat song button, when active, will repeat the individual song when the song has ended. The button can be styled based off of the sate of classes applied to the button. When the repeat is not on, the button will have a class of 'amplitude-repeat-song-off' and when on, 'amplitude-repeat-song-on'.

To add the repeat song button, add the following HTML:
```html
<span class="amplitude-repeat-song"></span>
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

### Song Tracking Slider HTML 5 Range

The easiest way to implement song tracking is through an HTML 5 Range slider. The sliding functionality is already taken care of for you and it provides a smooth UX. There are some downfalls with this element since you can't style the before and after pieces. We also have an HTML 5 progress element that allows for easy styling of before and after but requires some custom JS to update the interaction. No worries, though the tutorial will be linked!

Note that features like the tracking slider and progress bar depend on the browser being able to request the audio file in arbitrary
chunks. Firefox can work around lack of support from the server, but for these features to work properly, your server must support
[Content-Range HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Range).

To add a song slider, add the following element:
```html
<input type="range" class="amplitude-song-slider" amplitude-main-song-slider="true" step=".1"/>
```

The class name is `amplitude-song-slider`. You can also add `amplitude-main-song-slider="true"` if you want it to reference the current song no matter what. If you want to do an individual playlist, you can add the attributes of `amplitude-playlist-song-slider="true"` and `amplitude-playlist="{playlistKey}"`.

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

The first of the individual song examples is for a playlist, the second is for an individual song.

### Song Progress Bar (Version 3.2)
In AmplitudeJS 3.2, we added the song progress bar. This allows the user further customization over the design. It essentially replaces the song time visualization that was removed in this release. These operate the same as the range except you will have to implement your own slider event handling. I wrote a quick tutorial on that here: [https://serversideup.net/set-song-played-percentage-amplitudejs/](https://serversideup.net/set-song-played-percentage-amplitudejs/).

To add a song progress bar, add the following:
```html
<progress id="song-played-progress" class="amplitude-song-played-progress" amplitude-main-song-played-progress="true"></progress>
```

### Song Buffered Progress Bar (Version 3.2)
In AmplitudeJS 3.2, we added the song buffered progress bar. This allows for a visual display of how much of the song has been buffered. You can do some CSS techniques to overlay this progress element over the song-played-progress element to make an all in one, or you could leave it by itself.  

To add a song buffered progress element, add the following:
```html
<progress id="song-buffered-progress" class="amplitude-buffered-progress" value="0"></progress>
```

### Meta Data Elements

Meta data elements get their information filled in with meta data from the active song object. These can be
any type of HTML element except when filling in cover_art_url, station_art_url, podcast_episode_cover_art_url.
These specific keys have to be on an img tag since they update the src attribute of the tag. Every other
attribute fills in the inner html of the tag.

#### Image Metadata
When defining a song object there are 3 different keys you can define image meta data with:

1. cover_art_url
2. station_art_url
3. podcast_episode_cover_art_url

These URLs point to an image that will be substituted out for the active song image.

#### Text Metadata
With text metadata describing a song, you can use whatever information you like and place it
in whatever element you like. This is new to Amplitude 3.0. Previous versions of AmplitudeJS
limited the user to certain meta data fields such as artist, album, title, etc. The newest
version of AmplitudeJS allows the user to do whatever keys on a song object and insert that
text into any element defined appropriately. This give much more flexibility when using AmplitudeJS
in a variety of audio scenarios such as for radio stations and podcasts. To add an element that contains
a piece of meta data regarding the now playing song simply add:

```html
<span amplitude-song-info="{song_meta_index}" amplitude-main-song-info="true"></span>
```

If it's a main element for a playlist add the key for the playlist:
```html
<span amplitude-song-info="{song_meta_index}" amplitude-playlist="{playlist_index}"></span>
```

#### Autofill Meta Data
Sometimes when building a player, you don't know what every song is on load and need to load songs dynamically. As of AmplitudeJS version 3.3 this is not a problem. AmplitudeJS will autofill the meta data for lists of songs if you do a combination of the following on the element.

1. 'amplitude-song-info' - Defines the information you want injected into the element. This is the key of the song object.
2. 'amplitude-song-index' - Defines the index of the song in the songs array that you want to inject into the element.

This is super convenient when loading songs dynamically either server side or loading after the page has loaded.

#### Time Metadata
There are certain elements that contain time data about the active song. You can add these elements to your document
and they will auto fill with the current status of the song. Like other elements, these can be either for the overall
player, scoped in a playlist or for a specific song. There are three sets of time meta data: current time, song duration, time remaining.
The song duration can only be set for the active song since the metadata isn't preloaded for all of the songs. The time remaining is a count down for how much time is left for a song.

Main Current Time - Displays in MM:SS
```html
<span class="amplitude-current-time" amplitude-main-current-time="true"></span>
```

Main Current Hours
```html
<span class="amplitude-current-hours" amplitude-main-current-hours="true"></span>
```

Main Current Minutes
```html
<span class="amplitude-current-minutes" amplitude-main-current-minutes="true"></span>
```

Main Current Seconds
```html
<span class="amplitude-current-seconds" amplitude-main-current-seconds="true"></span>
```

Current Hours For Playlist
```html
<span class="amplitude-current-hours" amplitude-playlist-current-hours="true" amplitude-playlist="{playlist_key}"></span>
```

Current Minutes For Playlist
```html
<span class="amplitude-current-minutes" amplitude-playlist-current-minutes="true" amplitude-playlist="{playlist_key}"></span>
```

Current Seconds For Playlist
```html
<span class="amplitude-current-seconds" amplitude-playlist-current-seconds="true" amplitude-playlist="{playlist_key}"></span>
```

Current Hours For Song
```html
<span class="amplitude-current-hours" amplitude-song-index="{song_index}"></span>
```

Current Minutes For Song
```html
<span class="amplitude-current-minutes" amplitude-song-index="{song_index}"></span>
```

Current Seconds For Song
```html
<span class="amplitude-current-seconds" amplitude-song-index="{song_index}"></span>
```

Main Duration Time MM:SS
```html
<span class="amplitud-duration-time" amplitude-main-duration-time="true"></span>
```

Main Duration Time - Displays in MM:SS
```html
<span class="amplitude-duration-time" amplitude-main-duration-time="true"></span>
```

Main Duration Hours
```html
<span class="amplitude-duration-hours" amplitude-main-duration-hours="true"></span>
```

Main Duration Minutes
```html
<span class="amplitude-duration-minutes" amplitude-main-duration-minutes="true"></span>
```

Main Duration Seconds
```html
<span class="amplitude-duration-seconds" amplitude-main-duration-seconds="true"></span>
```

Duration Hours For Playlist
```html
<span class="amplitude-duration-hours" amplitude-playlist-duration-hours="true" amplitude-playlist="{playlist_key}"></span>
```

Duration Minutes For Playlist
```html
<span class="amplitude-duration-minutes" amplitude-playlist-duration-minutes="true" amplitude-playlist="{playlist_key}"></span>
```

Duration Seconds For Playlist
```html
<span class="amplitude-duration-seconds" amplitude-playlist-duration-seconds="true" amplitude-playlist="{playlist_key}"></span>
```

Duration Hours For Song
```html
<span class="amplitude-duration-hours" amplitude-song-index="{song_index}"></span>
```

Duration Minutes For Song
```html
<span class="amplitude-duration-minutes" amplitude-song-index="{song_index}"></span>
```

Duration Seconds For Song
```html
<span class="amplitude-duration-seconds" amplitude-song-index="{song_index}"></span>
```

Main Time Remaining For Song
```html
<span class="amplitude-time-remaining" amplitude-main-time-remaining="true"></span>
```

Playlist Main Time Remaining For Song
```html
<span class="amplitude-time-remaining" amplitude-playlist-main-time-remaining="{playlist_key}"></span>
```

Song Time Remaining
```html
<span class="amplitude-time-remaining" amplitude-song-index="{song_index}"></span>
```

### Song Container
This is a unique element. What this does is allow you to assign a container to the visual representation of a song or a song in a playlist. When that song is currently playing, the class `amplitude-active-song-container` will be applied to the song container element. This way you can style the element to show the active song.

For a single song container it would be:
```html
	<div class="amplitude-song-container" amplitude-song-index="{X}"></div>
```

For a playlist song container it would be:
```html
	<div class="amplitude-song-container" amplitude-playlist="{playlist_key}" amplitude-song-index="{X}"></div>
```


## Public Functions
There are a variety of public functions that AmplitudeJS exposes to the user. These methods allow the
user to change config variables, add new songs, play now, etc.

### Bind New Elements
The bind new elements function should be called whenever a new song element is added to the page. This will
bind all of the event handlers for that element.

```javascript
Amplitude.bindNewElements()
```

### Get Active Playlist
This method will return the key of the active playlist.

```javascript
Amplitude.getActivePlaylist()
```

### Get Playback Speed
Returns the current playback speed for the player.

```javascript
Amplitude.getPlaybackSpeed()
```

### Get Repeat
Returns the state of the global repeat status for the player.

```javascript
Amplitude.getRepeat()
```

### Get Shuffle
Returns the current state of the global shuffle status for the player.

```javascript
Amplitude.getShuffle()
```

### Get Shuffle Playlist
Returns the state of the shuffle flag for a playlist.

```javascript
Amplitude.getShufflePlaylist( playlistKey )
```

### Set Shuffle
Sets the global shuffle state for AmplitudeJS.

```javascript
Amplitude.setShuffle()
```

### Set Shuffle Playlist
Sets the shuffle state for a playlist.

```javascript
Amplitude.setShufflePlaylist( playlistKey )
```

### Set Repeat
Sets the global repeat status for AmplitudeJS

```javascript
Amplitude.setRepeat()
```

### Set Repeat Song
Sets the global state to determine if we should repeat the individual song upon completion.

```javascript
Amplitude.setRepeatSong()
```

### Get Default Album Art
Returns the default album art URL set in the player.

```javascript
Amplitude.getDefaultAlbumArt()
```

### Set Default Album Art
Sets the default album art for the player to the URL provided.

```javascript
Amplitude.setDefaultAlbumArt( url )
```

### Set Debug
To change the debug mode setting, you can call the setDebug method any time and start to receive data
about the state of the player or turn off debugging.

```javascript
Amplitude.setDebug( {bool} );
```

### Get Active Song Metadata
Returns the active song's metadata as a JSON object.

```javascript
Amplitude.getActiveSongMetadata();
```

### Get Song By Index
Returns a song's metadata at a specific index.
```javascript
Amplitude.getSongByIndex( {index} );
```

### Get Song At Playlist Index
Returns a song at a playlist's index.
```javascript
Amplitude.getSongAtPlaylistIndex( {playlistIndex}, {index} );
```

### Add Song
Adds a song to the AmplitudeJS player. You will need to write a method yourself to add the visual side
of things to fit your custom design, and then call the bindNewElements() method to make sure it works.
This method returns the index of the song added to the player.

```javascript
Amplitude.addSong( {song_object} );
```

### Add Song To Playlist
Adds a song to a specific playlist within AmplitudeJS. Once the song is added you will need to update the visual side of the player yourself.  After you update the visual side, run the `Amplitude.bindNewElements()` method to make sure the functionality is there for the new element.

```javascript
Amplitude.addSongToPlaylist( songObject, playlistKey )
```

### Remove Song
Removes a song from the global song array. You will have to remove the containing element by yourself.

```javascript
Amplitude.removeSong( indexOfSong )
```

### Remove Song From Playlist
Removes a song from a playlist. You will have to update the visual side by yourself.

```javascript
Amplitude.removeSongFromPlaylist( indexOfSongInPlaylist, playlistKey )
```

### Play Song At Index
Plays whatever song is set in the config at the specified index.

```javascript
Amplitude.playSongAtIndex( songIndex )
```

### Play Playlist Song At Index
Plays the song in a playlist at the specified index.

```javascript
Amplitude.playPlaylistSongAtIndex( playlistIndex, playlistKey )
```

### Play Now
In AmplitudeJS 2.0 this was referred to as 'Dynamic Mode'. Now you can just pass a song to AmplitudeJS and it
will automatically play. If there are visual elements, then they will sync as well.

```javascript
Amplitude.playNow( {song_object} );
```

### Play
This simply plays whatever song is active.

```javascript
Amplitude.play()
```

### Pause
This simply pauses whatever song is active.
```javascript
Amplitude.pause()
```

### Next
Plays the next song either in the playlist or globally.

```javascript
Amplitude.next( playlistKey = null )
```

### Prev
Plays the previous song either in the playlist or globally.

```javascript
Amplitude.prev( playlistKey = null )
```

### Get Audio
This returns the actual audio element. This is mainly used for writing extensions but exposes the core of
AmplitudeJS. This returns the audio element used by AmplitudeJS.
```javascript
Amplitude.audio()
```

### Get songs (Version 3.2)
This method returns all of the songs defined in AmplitudeJS. It can be used for a variety of different functions. It's extremely helpful if you are AJAX loading songs and want to see the contents of the song array.
```javascript
Amplitude.getSongs()
```

### Get Songs In Playlist (Version 3.2)
This method returns all of the songs in a playlist. Since the user defines a playlist with a key and the indexes of the songs, this will map the keys to the songs and return all of the songs in the playlist.
```javascript
Amplitude.getSongsInPlaylist( playlistKey )
```

### Get Songs State (Version 3.2)
This method returns the current order of the songs. It can be used for determining what song is next. If shuffle is on, it will return the shuffled list of songs.
```javascript
Amplitude.getSongsState()
```

### Get Songs State Playlist (Version 3.2)
This method returns the current order of the songs in a playlist. If needed this can be used to determine the next song in a playlist. This accounts for whether the playlist has been shuffled or not.
```javascript
Amplitude.getSongsStatePlaylist( playlist )
```

### Get Active Index (Version 3.2)
This method returns the index of the active song in the songs array.
```javascript
Amplitude.getActiveIndex()
```

### Get Active Index State (Version 3.2)
This method returns the index of the active song in the songs array but accounts for if shuffle has been enabled or not.
```javascript
Amplitude.getActiveIndexState()
```

### Get Version (Version 3.2)
This method returns the version of AmplitudeJS being used.
```javascript
Amplitude.getVersion()
```

### Get Buffered (Version 3.2)
This method returns the buffered percentage of the now playing song. This can be used to show how much of the song has been buffered and ready to be played.
```javascript
Amplitude.getBuffered()
```

### Get Song Played Percentage (Version 3.2)
This method returns the percentage of the song played. When implementing a 3rd party tracking element, you can set the percentage of the element to the percentage played of the song.
```javascript
Amplitude.getSongPlayedPercentage()
```
You can combine this method with the time_update callback and whenever the time updates your method can call Amplitude.getSongPlayedPercentage() and you can set your tracking element correctly.

### Set Song Played Percentage (Version 3.2)
This method allows you to set the percentage of the active song. The method accepts a float between 0 and 100 for the percentage of the song to be set to.
```javascript
Amplitude.setSongPlayedPercentage( percentage )
```

### Skip To
Allows the user to skip to a specific location in the song whether that song is in a playlist or not.

```javascript
Amplitude.skipTo( seconds, songIndex, playlist = null )
```

## Tutorials
We use ServerSideUp for all of our tutorials. Here's a list of tutorials that can be helpful when developing with AmplitudeJS:
- [Set Song Played Percentage with AmplitudeJS](https://serversideup.net/set-song-played-percentage-amplitudejs/)
