## Overview
The concept of Amplitude.js is simple, allow designers to fully control the look and 
feel of their audio player through the web without having to understand advanced scripting. 
In HTML5, the audio tag allows users to add common audio formats to their web page. 
The problem is that the audio playback interface is controlled by the browser. Amplitude.js 
puts you in control of the design by simply applying an ID or a class to page elements. 
You can then style these elements through CSS and control your audio. Amplitude.js goes above 
and beyond by adding playlist capabilities (next, previous, shuffle), song meta data and visualizations. Amplitude.js is now mobile friendly as well. If it detects a 
request coming from a mobile device it will apply a touchstart event listener instead of a click 
to the appropriate elements.

### Amplitude 2.0 Updates
With the Amplitude 2.0 update, the project not only works with the HTML 5 audio tag, but begins
the journey to mapping controls to the Web Audio API - "a powerful and versatile system for 
controlling audio on the Web, allowing developers to choose audio sources, add effects to audio, 
create audio visualizations, apply spatial effects (such as panning)  and much more." - 
https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API.  Visualizations are the start,
there is a simple plugin interface to add visualizations if you are a designer, and an easy way
to develop visualizations that work with Amplitude.js if you are a developer.  This opens many
new doors to further functionality that will be implemented with Amplitude.js, such as simple
controls added as easily as a play button to control and cut frequencies.

Along with the Web Audio API updates, another important update is the addition of Soundcloud
support without having to understand their API. You simply need a key and a URL and Amplitude.js
will find out if the song is streamable and bind it to your player!

With all of these new features, also comes a more stable platform for the basic functions.  The
concept has always been to simplify the designs for audio players on the web.  The new version 
continues with that vision. The only difference is we removed most of the elements with id attributes
and replaced them as a combo of classes and amplitude attributes (all explained in the docs).  This allows
for multiple albums, songs, and individual songs to be handled with ease visually and functionally.

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

## Usage

### Initializing Amplitude.js
When the page is ready, Amplitude.js will bind all the event handlers the elements.  This is what
makes Amplitude.js so easy to use. It finds the classes and determines the browser and will bind
click and touchstart handlers to the elements that perform a specific function.

Now that Amplitude.js is included on your page and set up, you need to initialize it with the 
information that you want.  To do this, you need to call the init function on the Amplitude object
and you can pass it a JSON object of configuration variables ( we will go through ALL of these in the
documentation ). At the bare minimum, you need to pass it all of the song objects that your page will
be using. More information about the song object next.

```javascript
<script type="text/javscript">
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
</script>
```

This configuration will set up Amplitude.js to work the way you want it. The config JSON is used heavily
to configure and optimize Amplitude.js for what your app needs.

### Song Objects

A nested JSON object for songs is required by Amplitude.js.  This directs Amplitude to the metadata
and information necessary for playing the audio.

Each song object can contain the following keys:

* name = The name of the song 
* artist = The song's artist
* album = The song's album ( Also used to determine album changes in an environment where multiple albums are used on the page)
* url = The URL to the song. This is most imporatant.  (Soundcloud URLs discussed later)
* cover_art_url = The URL to the song's cover art.
* live = Set to true for a URL that is a live audio source.

It is important to note that in multiple song environments, the order that you list the songs makes a difference. When utitlizing
next and previous functionality, Amplitude.js will iterate over the songs object and go to the next song or the previous song
in the list.

It is also important to note how songs are indexed. Like in almost all programming, indexes start at 0.  So when you are setting
up multiple play/pause functions or song status sliders that relate to an individual song, the indexes are used. For example,
the song above named "Song Name 1" would have an index of 0, "Song Name 2" would have an index of 1, and so on.

### Setting the Starting Volume

You can define the starting volume for when the user initially presses play.  To do this, you need to add a 
"volume" key to your initialization JSON.  This value is any number between 0 and 1. Think of this as a percentage.
If you want the volume percentage at 35%, set this value equal to .35.

```javascript
<script type="text/javscript">
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
</script>
```
### Dynamic Mode

Dynamic mode is a new feature in AmplitudeJS. It allows you to utilize the features of AmplitudeJS without initializing any songs.
To activate dynamic mode, set dynamic_mode to true in your initialization:

```javascript
<script type="text/javascript">
	Amplitude.init({
		"dynamic_mode": true
	});
</script>
```

Now you can pass a song object using the publicPlayNow() function and Amplitude will play that song right away.  Dynamic mode is
used in places where you want to have an array of songs or a group of songs added after Amplitude is initialized.  When dynamic mode
is turned on you also have access to the Amplitude.play() and Amplitude.pause() methods allowing you to control the active song
in Amplitude.

### Autoplay

Autoplay is simple, when set to true, AmplitudeJS will play the song you set to to be the start song, or the first song in your
config.

```javascript
<script type="text/javascript">
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
</script>
```

This will play the first song in the config on page load.

### Setting Default Album Art

If you have songs that don't have a specific piece of album art, you can define a default image url using
the "default_album_art" key.  Once again, this is handled on initialization.

```javascript
<script type="text/javscript">
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
</script>
```

### Elements

Amplitude.js comes with a variety of elements. Each element is picked up by a class prefixed with 'amplitude-'
and depending on the environment, an attribute that relates to the index of a song in your list of songs.
All elements can be styled simply based off of class or if you want to define specific ids in CSS. Besides
album art, you could apply these classes to a variety of elements.  Album art has to be an <img> element,
but the other elements could be whatever. However, using these elements, be advised that block level elements
might work better than inline elements.  This can all be handled in CSS.

### Adding a Play Button

To add a play button, simply add an element with a class of 'amplitude-play'. 

```html
<div class="amplitude-play"></div>
```

If you have multiple songs, add an attribute of 'amplitude-song-index' and set it equal to the index of the song in the config.

```html
<div class="amplitude-play" amplitude-song-index="2"></div>
```

### Adding a Pause Button

Similar to the play button, simply add an element with a class of 'amplitude-pause'.

```html
<div class="amplitude-pause"></div>
```
This will pause the active song.

### Adding a Play/Pause Button

This button combines the play and pause button similar to what most media players use.

To add a play/pause button, add an element with a class of "amplitude-play-pause" and another
class of "amplitude-paused"

```html
<div class="amplitude-play-pause amplitude-paused"></div>
```

The second class is for the state of the active song. If the song is paused (not playing) the
class of "amplitude-paused" is added to the element. In your css you can have the background
image be of a play button.  When the active song is playing, the class of "amplitude-playing"
will be added to the element allowing you to style the playing state.

If you are in a multiple song environment where you have multiple play/pause buttons, add
an attributed of "amplitude-song-index" and when you click that play/pause button it will
synchronize to the state of that song.

```html
<div class="amplitude-play-pause amplitude-paused" amplitude-song-index="2"></div>
```

That play/pause button will control the song at index 2.

Another scenario could be you are in a multiple song environment and you have a single set of
controls, kind of like the top bar on iTunes. You can click on a song in iTunes and play that song
but you can also click the play/pause button on top to control the active song. You can set it up
like this:

```html
<div class="amplitude-play-pause amplitude-paused" amplitude-main-play-pause="true"></div>

<div class="amplitude-play-pause amplitude-paused" amplitude-song-index="1"></div>
<div class="amplitude-play-pause amplitude-paused" amplitude-song-index="2"></div>
<div class="amplitude-play-pause amplitude-paused" amplitude-song-index="3"></div>
```

The top element will control the active song and sync accordingly.  The other elements allow
you to switch the active song and control the play/pause functionality. If you have two locations
to control the active song you can have multiple elements with the "amplitude-main-play-pause" 
attribute. AmplitudeJS will bind the proper controls to all of these elements and keep them in sync.

Remember, you can add additional attributes that are not Amplitude.js related for styling purposes,
such as a large play/pause for the main control.

You could also add the class "amplitude-play-pause" and an attribute "amplitude-song-index" to an
element that looks like a song row in itunes and not have an actual button, but a link.

### Adding a Song Slider

A song slider allows the user to interface directly with the current song time.  This is an HTML 5
range element: http://demosthenes.info/blog/757/Playing-With-The-HTML5-range-Slider-Input.  Using
the range element, it is a smoother functionality for interacting by the user and is supported on mobile.

To add this element in a single control situation, simply add a range input with a class of "amplitude-song-slider":

```html
<input type="range" class="amplitude-song-slider" amplitude-singular-song-slider="true" value="0"/>
```

Set the value to 0 right away so it's appropriately synced on page load.  Amplitude.js will update this 
with the time accordingly.  The attribute 'amplitude-singular-song-slider="true"' lets Amplitude.js know
that there is a single control.

To do multiple song sliders (in an environment where there are MANY songs that have their own display) add
an attribute to your song slider that is "amplitude-song-index=" (just like the play/pause buttons)

```html
<input type="range" class="amplitude-song-slider" amplitude-song-index="1" value="0"/>
```

If this is live feed, this won't work since there is no end time.

### Adding Song Time Visualizations

A song time visualization simply fills in with the percentage of the song that has been played. It is an 
easy way to provide a visual for the user to see. However, the user can not interact with this, it's for display purposes only. 
To add a song time visualization slider, add an element with the class of "amplitude-song-time-visualization".  Recommended,
this would be a <div> tag.  In a single song environment or environment where you have multiple song time visualizations for the current active song,
add the attribute "amplitude-single-song-time-visualization" and set it equal to "true".

```html
<div class="amplitude-song-time-visualization" amplitude-single-song-time-visualization="true"></div>
```

When Amplitude.js loads, it will add an additional element inside of that element with the class of "amplitude-song-time-visualization-status".
This status will update accordingly with the song percentage played. When finished it will look like:

```html
<div class="amplitude-song-time-visualization" amplitude-single-song-time-visualization-"true">
	<div class="amplitude-song-time-visualization-status"></div>
</div>
```

In an environment where there are multiple song time visualizations, you would add an attribute "amplitude-song-index" and
set it equal to the index of the song in your config, just like a play/pause button.

```html
<div class="amplitude-song-time-visualization" amplitude-song-index="2"></div>
```

On live feeds, these won't work since there is no end time in a live feed.

### Adding Song Current Time and Duration

These elements update with the time song has played compared to its duration.  For each current time
and duration the elements are broken down into seconds and minutes. Like the other elements, there is
also an attribute to declare whether there is one central spot to update when the active song changes
or whether the active song has a specific set of elements to update. 

In a single song or single control set:

```html
<span class="amplitude-current-minutes" amplitude-single-current-minutes="true">0</span>:<span class="amplitude-current-seconds" amplitude-single-current-seconds="true">00</span> - 
<span class="amplitude-duration-minutes" amplitude-single-duration-minutes="true">0</span>:<span class="amplitude-duration-minutes" amplitude-single-duration-seconds="true">00</span>
```

In the example above we use a span tag. You could have multiple of the single identifiers if there are multiple places where the song time needs to get updated as the active song plays.
This could be anything, but since it's text that gets inserted, a span tag works just fine.

When there are multiple control sets, the attribute for the song index needs to be there instead
of the attribute for a single set:

```html
<span class="amplitude-current-minutes" amplitude-song-index="1">0</span>:<span class="amplitude-current-seconds" amplitude-song-index="1">00</span> / 
<span class="amplitude-duration-minutes" amplitude-song-index="1">0</span>:<span class="amplitude-duration-seconds" amplitude-song-index="1">00</span></span>
```

### Adding a Volume Slider

The user can slide the volume slider to adjust the volume of the current song. The volume slider also reacts 
accordingly if the mute, volume up, or volume down buttons are pressed. Unlike the song slider, the 
initial volume slider can contain a value but you can set the initial song volume in the 
config JSON you pass. To add a volume slider, add an HTML5 range element with the class of "amplitude-volume-slider" 
to your document. You can then style this element using CSS.

```html
<input type="range" class="amplitude-volume-slider" value="0"/>
```

In your config, when you set the volume parameter, this gets set accordingly.  Note that on iOS devices, you 
can not adjust the volume through any controls through the web: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4

With the volume slider, you can also make it vertical in your css by applying the following styles:

```css
.amplitude-volume-slider{
    -webkit-appearance: slider-vertical
}
```

### Adding a Mute Button

A mute button is a toggle in Amplitude.js. When the button is clicked, the volume gets set to 0 and when it is clicked again, 
the volume is restored to what it was before the click. The mute button will automatically set the volume slider accordingly. 
To add this button, simply add an element with the class of "amplitude-mute" to your document.

```html
<div id="amplitude-mute"></div>
```

### Adding Volume Up and Down Buttons

With Amplitude.js you can add volume up and volume down buttons. You can also assign how much you want the volume to 
increase and decrease each time a user interacts with your element. To adjust how much the volume gets incremented or
decremented each time, you have to set that in the config when you initialize Amplitude.js.  By default, these are 
set to 5.  The range for these are between 0 and 100. Granted, you probably down't want the user to max or minify the 
volume on each click (there's a mute button for that) so set it something reasonable. To add a volume up button to the 
page, add an element with the class of "amplitude-volume-up". Amplitude.js will find this on initialization and bind the 
appropriate handler. To add a volume down button, add an element with the class of "amplitude-volume-down" to the page. 
Like the volume up, Amplitude.js will find this element and bind the appropriate event handler to the element. 
With all amplitude elements, if you are using images, it is recommended to add them as a background-image to the 
appropriate element so the event handlers bind appropriately.

```html
<div class="amplitude-volume-up"></div>
<div class="amplitude-volume-down"></div>
```

To change the increment/decrement amount each time one of the buttons is clicked, this is where you'd do it in the
config.

```javascript
<script type="text/javscript">
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
		volume_increment: 10,
		volume_decrement: 10
	});
</script>
```

The buttons will now increment/decrement the volume by 10 each time one is pressed.

### Song Visual Elements

Amplitude.js will handle updating certain elements with the metadata for the active song. Each
of the elements has their inner inner HTML updated depending on the song being played. By default
Amplitude.js will handle these automatically, but you can also turn this feature off in the config.
Since this is for dynamic areas that are dependant upon what song is playing, it would make sense
to have only one of each of these elements.  The element for album art has to be an image since
Amplitude.js sets the src attribute.  These specific elements are identified by attributes. You can
have multiple of these elements for multiple places where the active song metadata should be updated.

* 'amplitude-song-info="name"' -> inner HTML updates to the song name of what is currently playing
* 'amplitude-song-info="artist"' -> inner HTML updates to the song's artist for what is currently playing
* 'amplitude-song-info="cover"' -> sets the src of the <img> element to the album's cover art
* 'amplitude-song-info="album"' -> inner HTML updates to the song's album name

```html
<span amplitude-song-info="name"></span>
<span amplitude-song-info="artist"></span>
<span amplitude-song-info="album"></span>
<img amplitude-song-info="cover"/>
```

There is also a set of metadata you can add for live streams. They relate more to radio station identification
information.

* 'amplitude-song-info="call-sign"' -> innerHTML updates to the call sign of the live stream currently playing.
* 'amplitude-song-info="station-name"' -> innerHTML updates to the station name of the live stream currently playing
* 'amplitude-song-info="location"' -> innerHTML updates to the location of the station currently playing.
* 'amplitude-song-info="frequency"' -> innerHTML updates to the frequency of the station currently playing.
* 'amplitude-song-info="station-art"' -> sets the src of the <img> element to the station's logo.

```html
<span amplitude-song-info="call-sign"></span>
<span amplitude-song-info="station-name"></span>
<span amplitude-song-info="location"></span>
<span amplitude-song-info="frequency"></span>
<img amplitude-song-info="station-art"/>
```

Your updated song object would look like this: 

```javascript
<script type="text/javscript">
	Amplitude.init({
		"songs": [
			{
					"call_sign": "WYMSE",
					"station_name": "88.9 Radio Milwaukee",
					"location": "Milwaukee, WI",
					"frequency": "88.9 MHz",
					"url": "http://64.202.109.5:80/live",
					"live": true,
					"cover_art_url": "images/station/image.jpg"
			}
		]
	});
</script>
```

### Using Amplitude for Playlists

Amplitude.js makes playlists easy.  You can think of playlists as a group of songs, or you 
can divide them into albums.  Both configurations are no different than what we've already
been doing. With playlists new elements are available such as a next button, previous button,
and shuffle button.

To set up your playlist just use the same config as we used before:

```javascript
<script type="text/javscript">
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
</script>
```

The three songs make up your playlist! When you click next, from Song 1, Song 2 will play.
The previous and next buttons will loop around the list, updating the appropriate elements
when a new song is played. If shuffle is turned on, the songs are randomized and go in
a random order.  All will be explained next!

### Defining a Start Song

When using a playlist, you can set the index of a start song.  For example, if you
wanted to start at the 2nd song in the list.  Remember indexes start at 0, so the
2nd song in the list would have an index of 1. You put the start song in the init 
JSON.

```javascript
<script type="text/javscript">
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
		"start_song": 1
	});
</script>
```

### Next and Previous Buttons

When using Amplitude.js in a playlist, you can navigate forwards and backwards in the playlist. 
Upon click/touch Amplitude.js will navigate through your playlist. To add a previous button add 
an element with a class of "amplitude-prev". To add a next button add an element with a class 
of "amplitude-next". When doing the visual design of your playlist, keep in mind Amplitude will 
go in order of the indexes so make sure that your visual display correlates with the order you 
put the songs into the config JSON when you initialized Ampltidude. The exception of this is when 
you have shuffle turned on, it will play the songs in a random order. When the song is the last song 
in the playlist, and next is clicked it will go to the first song of the list. If the song playing 
is the first song in the list and previous is clicked it will go to the last song in the playlist.

```html
<div class="amplitude-next"></div>
<div class="ampltiude-prev"></div>
```

### Adding a Shuffle Button

The shuffle function allows the playlist to be randomized and is accessed through the shuffle button. 
To add a shuffle button add an element to the document with the class "amplitude-shuffle". When Amplitude.js
loads the class "amplitude-shuffle-off" will be applied to the element allowing for the element to be styled 
for the current state. When clicked to turn on shuffle, the class "amplitude-shuffle-on" will be applied to 
the element so you can style the element when shuffle is off. 

```html
<div class="amplitude-shuffle"></div>
```

Clicking this button will randomize the playlist and it will go in a different order when next and previous 
are clicked or when the song has ended.

### Adding a Repeat Button

The repeat button allows you to repeat a song after it has ended.  To add a repeat button add an element
to the document with the class "amplitude-repeat".  On init, Amplitude will add a class "amplitude-repeat-off"
which you can style.  When clicked, repeat will be turned on and the "amplitude-repeat-off" class will be
removed and the "amplitude-repeat-on" class will be added.  You can then style the "amplitude-repeat-on" class.

```html
<div class="amplitude-repeat"></div>
```

Clicking this button will have the song repeat when it has ended. Clicking again, will resume the default
of going to the next song or stopping in a single song scenario turning off repeat.

### Playlist Play/Pause Buttons

In the previous version of Amplitude.js you had to really mess around to get this to work properly.  With
Amplitude.js 2, you just add a class of "amplitude-play-pause" with an attribute of the song index
'amplitude-song-index="1"'.

```html
<div class="amplitude-play-pause" amplitude-song-index="1"></div>
```

These will be configured appropriately on song changes so all song active states are synced.

### Amplitude Song Containers

In a playlist, you might a scenario where you have elements containing information for a song.  When
active, it's good UX to show that that song is the song that is being played.  With Amplitude.js, you 
can apply an element with a class of "amplitude-song-container" and an attribute of "amplitude-song-index"
to correlate the visual display to a song in the list.  When that song is being played, the container
will receive a class of "amplitude-active-song-container" so you can style the background or change
the color or whatever is needed to show that that is the active song.

```html
<div class="amplitude-song-container" amplitude-song-index="1"></div>
```

### Multiple Modular Songs

Instead of a playlist type feel, you can have a page with multiple individual songs. In the documentation
when you add an "amplitude-song-index" attribute to the element, it applies the specific functionality
to that individual song.  You will just design your players to have those attributes and you can have multiple
individual players on your page.

```html
<div class="amplitude-play-pause amplitude-paused" amplitude-song-index="1"></div>
<div class="amplitude-play-pause amplitude-paused" amplitude-song-index="2"></div>
```

### Using Soundcloud

In Amplitude.js 2.0 Soundcloud support has been added and is made as easily as possible.  All you need is a
Soundcloud API Key (https://developers.soundcloud.com/).  It's important to note that not all songs are
available for streaming through the API.  Amplitude.js accounts for that and can help with the finding of the track.

When initializing Amplitude.js, you need to add an extra attribute to the JSON config: "soundcloud_client".
This is your public API key.

You will also have to change your song urls to be a soundcloud link.  This is found by clicking the "share"
link anywhere on the page that contains the song. The URL should look like:

https://soundcloud.com/yogitrf/yogi-feat-pusha-t-burial-skrillex-trollphace-remix

If you are familiar with the Soundcloud API, this is NOT the streaming URL.  This is the URL that directly
links to the song. These are easier to find and require no knowledge of the API to grab the streaming URL.
What Amplitude.js does upon initilization is check to see if there is a defined Soundcloud key.  If there is,
it checks all of the songs to see if their URL is a Soundcloud URL.  If it is, Amplitude.js will resolve the
streaming URL and replace the URL with the one to stream containing your API key.  IF the song is NOT streamable,
Amplitude.js will print to the console which songs are not streamable.  This only happens if you have debug turned
on (see debugging section).

```javascript
Amplitude.init({
	"volume": .35,
	"songs": [
		{
			"name": "Burial",
			"artist": "YOGI feat Pusha T - Burial",
			"album": "YOGI remixes",
			"url": "https://soundcloud.com/yogitrf/yogi-feat-pusha-t-burial-skrillex-trollphace-remix",
			"cover_art_url": "http://upload.wikimedia.org/wikipedia/commons/3/3a/RHCP_Logo.svg"
		},
		{
			"name": "Hell Of A Night",
			"artist": "Schoolboy Q (YOGI Remix)",
			"album": "YOGI remixes",
			"url": "https://soundcloud.com/yogitrf/schoolboy-q-hell-of-a-night"
		},
		{
			"name": "Christian Bale",
			"artist": "YOGI Feat. Casey Veggies, Knytro, Sway, KSI, Raptor",
			"album": "Christian Bale feat. Casey Veggies, Knytro, Sway, KSI, Raptor",
			"url": "https://soundcloud.com/yogitrf/yogi-christian-bale-feat-casey-veggies-knytro-sway-ksi-raptor?in=yogitrf/sets/burial-ep"
		}
	],
	"soundcloud_client": 'YOUR KEY'
});
```

That's all you need to do to load Soundcloud! Amplitude.js will auto grab their SDK and take care of the rest!
Remember to give the proper credit to the artists as well from Soundcloud in your design.

You can also retrieve the data returned by the Soundcloud API for each song when you call Amplitude.getActiveSongMetadata(). 
AmplitudeJS takes the data returned and appends it to the song object's metadata under the 'soundcloud' key.

### Debugging

There is a lot of information that Amplitude.js is setting up and bugs can happen.  In Amplitude.js 2.0 there
is a simple debugging tool that can be enabled that will print out information if there are errors to the
console. To turn it on, simply pass an attribute of "debug" set to 'true' in the JSON config.

```javascript
Amplitude.init({
	"volume": .35,
	"songs": [
		{
			"name": "Burial",
			"artist": "YOGI feat Pusha T - Burial",
			"album": "YOGI remixes",
			"url": "https://soundcloud.com/yogitrf/yogi-feat-pusha-t-burial-skrillex-trollphace-remix",
			"cover_art_url": "http://upload.wikimedia.org/wikipedia/commons/3/3a/RHCP_Logo.svg"
		},
		{
			"name": "Hell Of A Night",
			"artist": "Schoolboy Q (YOGI Remix)",
			"album": "YOGI remixes",
			"url": "https://soundcloud.com/yogitrf/schoolboy-q-hell-of-a-night"
		},
		{
			"name": "Christian Bale",
			"artist": "YOGI Feat. Casey Veggies, Knytro, Sway, KSI, Raptor",
			"album": "Christian Bale feat. Casey Veggies, Knytro, Sway, KSI, Raptor",
			"url": "https://soundcloud.com/yogitrf/yogi-christian-bale-feat-casey-veggies-knytro-sway-ksi-raptor?in=yogitrf/sets/burial-ep"
		}
	],
	"soundcloud_client": 'YOUR KEY',
	"debug": true
});
```

Any common errors such as a non streamable Soundcloud song will be printed out to the console.

### iOS Volume Controls

Mobile events work exactly the same as desktop events. The only exception is iOS and volume changes. 
According to Apple's documentation on Safari, volume can not be adjusted through Javascript since 
the user always has hand access to volume increment and decrement hardware controls:
https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4.

### Callbacks

Most of the core of Amplitude.js functions have a callback that you can assign a function to that
runs at certain events.  You can bind to these callbacks when you initialize Amplitude.js.  You
just have to set the callback to the function name that you want to call when the appropriate
Amplitude.js point occurs.

Here are a list of appropriate callbacks:
* before_play
* after_play
* before_stop
* after_stop
* before_next
* after_next
* before_prev
* after_prev
* before_album_change
* after_album_change
* after_init

The most unique is the before_album_change and after_album change callbacks.  WHen an album
changes in a multiple song environment, these callbacks happen. This allows you to show and
hide based off of album that is currently playing.

To bind to these callbacks, simply set them in your init JSON:

```javascript
Amplitude.init({
	"volume": .35,
	"songs": [
		{
			"name": "Burial",
			"artist": "YOGI feat Pusha T - Burial",
			"album": "YOGI remixes",
			"url": "https://soundcloud.com/yogitrf/yogi-feat-pusha-t-burial-skrillex-trollphace-remix",
			"cover_art_url": "http://upload.wikimedia.org/wikipedia/commons/3/3a/RHCP_Logo.svg"
		},
		{
			"name": "Hell Of A Night",
			"artist": "Schoolboy Q (YOGI Remix)",
			"album": "YOGI remixes",
			"url": "https://soundcloud.com/yogitrf/schoolboy-q-hell-of-a-night"
		},
		{
			"name": "Christian Bale",
			"artist": "YOGI Feat. Casey Veggies, Knytro, Sway, KSI, Raptor",
			"album": "Christian Bale feat. Casey Veggies, Knytro, Sway, KSI, Raptor",
			"url": "https://soundcloud.com/yogitrf/yogi-christian-bale-feat-casey-veggies-knytro-sway-ksi-raptor?in=yogitrf/sets/burial-ep"
		}
	],
	"soundcloud_client": 'YOUR KEY',
	"debug": true,
	"callbacks": {
		"before_album_change": "function_name_here",
		"after_album_change": "function_name_here"
	}
});
```

### Public functions

Amplitude.js has a few public functions available for you to call when needed. Most of these relate
to the building and using of visualizations (see next section), but there are a few that can help
with development.

* Amplitude.getActiveSongMetadata() -> Returns the active song's metadata as a JSON object.
* Amplitude.getSongByIndex() -> Returns the song index's metadata.
* Amplitude.setDebug(state) -> Pass in true and debugging is turned on, pass in false and it is turned off

The other public functions are all for visualizations.

### Using visualizations

Amplitude.js 2.0 introduces visualizations which are as easy to use as the rest of Amplitude.js' features.
A simple structure to build visualizations is also there for developers who want to add a visualization
to the Amplitude.js visualization library.  The downside is that not all browsers support the Web
Audio API.  Amplitude.js handles this as well by letting you swap out the visualizatoin for album art
through a setting in the config.  Otherwise the visualization element is just removed from the document
so errors don't occur.

To use a visualization, you will have to download the visualization object of your choice.  These are
found in the visualization directory on this github.  For this example we will be using a visualization 
adapted from https://github.com/michaelbromley/soundcloud-visualizer/blob/master/js/app.js which converted
to Amplitude.js is in /visualizations/michaelbromley.js.

After downloading the visualization, you need to add the script AFTER you define the AmpitudeJS script:

```javascript
<script src="../../js/amplitude.js"></script>
<script src="../../visualizations/michaelbromley.js"></script>
```
Now you have your visualization added to your document. After you run your Amplitude.init() method you
will have to use another public method to register your visualization that you are using. You can register
as many visualizations as you want and even have individual songs have different visualizations. Right now
we are just going to do one. If you wanted songs to have individual visualizations, you would just set a key
in the song JSON that uses the 'amplitude_visualization_id' found in the visualization file.  

The Michael Bromley visualization has 2 attributes passed in JSON format. These are the width and height
of your visualization container.  You could also do one attribute "fullscreen" and set it to 'true' which
would allow the visualization to be full screen.

```javascript
Amplitude.registerVisualization( MichaelBromleyVisualization, {
	width: '314',
	height: '314'
} );
```

Now that you have your visualization registered with Amplitude.js. You just need to add the following element:

```html
<div id="amplitude-visualization"></div>
```

That's it! Amplitude.js will inject the visualization canvas in that element and run. If the browser does not
support the Web Audio API, by default Amplitude.js will remove that element so no confusion. If you want to use
a cover art by default, in the Amplitude.js config set the "visualization_backup" equal to "album-art":

```javascript
<script type="text/javascript">
	Amplitude.init({
		"volume": .35,
		"songs": [
			{
				"name": "Burial",
				"artist": "YOGI feat Pusha T - Burial",
				"album": "YOGI remixes",
				"url": "https://soundcloud.com/yogitrf/yogi-feat-pusha-t-burial-skrillex-trollphace-remix",
				"cover_art_url": "http://upload.wikimedia.org/wikipedia/commons/3/3a/RHCP_Logo.svg",
				"album_key": "album-1"
			},
			{
				"name": "Hell Of A Night",
				"artist": "Schoolboy Q (YOGI Remix)",
				"album": "YOGI remixes",
				"url": "https://soundcloud.com/yogitrf/schoolboy-q-hell-of-a-night",
				"cover_art_url": "http://upload.wikimedia.org/wikipedia/commons/3/3a/RHCP_Logo.svg"
			},
			{
				"name": "Christian Bale",
				"artist": "YOGI Feat. Casey Veggies, Knytro, Sway, KSI, Raptor",
				"album": "Christian Bale feat. Casey Veggies, Knytro, Sway, KSI, Raptor",
				"url": "https://soundcloud.com/yogitrf/yogi-christian-bale-feat-casey-veggies-knytro-sway-ksi-raptor?in=yogitrf/sets/burial-ep",
				"cover_art_url": "http://upload.wikimedia.org/wikipedia/commons/3/3a/RHCP_Logo.svg"
			}
		],
		"soundcloud_client": 'YOUR KEY',
		"callbacks": {
			"before_album_change": "test",
			"after_album_change": "after_test"
		},
		"visualization_backup": "album-art"
	});

	Amplitude.registerVisualization( MichaelBromleyVisualization, {
		width: '314',
		height: '314'
	} );
</script>
```

This will replace the visualization with an <img> tag set up to display the album art for browsers that do
not support visualizations.  

### Building a Visualization for Amplitude.js
Visualizations work with any sound source as well it's just taken from any audio layer!

If you understand the Web Audio API, you can easily build a visualization and have it work with Amplitude.js.
https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

First, just download the template.js in the /visualization directory.  

This is the starting point for structuring your visualization. The comments in the template explain what each
method does.  To do your visualization, you will need access to the web audio elements.  Amplitude.js makes
these available to you through public properties

Amplitude.analyser -> The AudioContext() after the createAnalyser() method is called
Amplitude.source -> The AudioContext() once createMediaElementSource() is called setting the active song which is the
javascript audio element.

Using the templates and public properties should allow for any visualization you want to make! Once you make an
awesome visualization, feel free to send it along and we can add it to the library!