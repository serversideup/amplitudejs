# AmplitudeJS #

A Javascript library that allows you to control the design of your media controls in your webpage -- not the browser. No dependencies (jQuery not required).

## Reporting Issues ##

If you are experiencing any issues or if you have a feature request, please [open up a new GitHub Issue](https://github.com/521dimensions/amplitudejs/issues/new)

Want to see if you can get a hold of us directly? Just join our Gitter chat and ask away:

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/521dimensions/amplitudejs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Donations ##
We've been getting a lot of requests for donations. We're not ones who usually do things with money being our only focus, but since this has been such a popular request, feel free to optionally donate using the button below. We're working on some other open source projects right now and your donation will definitely help make those other projects become a reality.


[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=GKTPWCPLD9G8C)

## Example/Demo##
[![Amplitude Demo](https://dl.dropboxusercontent.com/u/13033256/Permanent/amplitude-demo.png)](http://open.521dimensions.com/amplitudejs)

Click the image above to be taken to the demo site.

## Features ##
* Completely independent library (no jQuery required)
* 100% customizable design
* Call back functions for all events
* Play/Pause
* Stop
* Next Song
* Previous Song
* Shuffle
* Playlists
* Display Album Art
* Display Song Meta Data
* Connect to live steaming
* Dynamic song additions

## Documentation ##
### Overview ###
The concept of AmplitudeJS is simple, allow designers to fully control the look and feel of their audio player through the web without having to understand advanced scripting.
In HTML5, the audio tag allows users to add common audio formats to their web page.  The problem is that the audio playback interface is controlled by the browser.  AmplitudeJS
puts you in control of the design by simply applying an ID or a class to page elements.  You can then style these elements through CSS and control your audio.  AmplitudeJS goes above
and beyond by adding playlist capabilities (next, previous, shuffle), dynamic song insertions, and song meta data. AmplitudeJS is now mobile as well. If it detects a request coming from
a mobile device it will apply a touchstart event listener instead of a click to the appropriate elements.

NOTE: Any element in the source code without the prefix 'amplitude-' is not an AmplitudeJS element.  These elements would be styled to house AmplitudeJS element containers if wanted.

### Install with Bower ###
You can install and update Amplitude via Bower.

```
bower install amplitude
```

### Downloading Manually ###
To get AmplitudeJS manually, simply download the source from github: [https://github.com/521dimensions/amplitudejs](https://github.com/521dimensions/amplitudejs)

### Including Amplitude ###
On top of your page just add
```html
<script type="text/javascript" src="/directory/to/amplitude.js"></script>
```

At the bare minium you will need to add the amplitude config variable somewhere in your document. This is one of the few pieces of Javascript you will have to add, but it will allow you
to define how you want AmplitudeJS to work.  To add the amplitude config variable simply add the following code on your page
```javascript
	<script type="text/javascript">
		amplitude_config = {

		}
	</script>
```

Upon page load, Amplitude will use the variables and song objects in your amplitude_config variable to set up and move forward.

### Amplitude Config ###
Previous versions of AmplitudeJS relyed on the programmer to add audio tags for each song. Now you don't have to even have an audio tag in your HTML
because everything is controlled through the AmplitudeJS config. 

### Adding a Song ###
To add a song to your page, you just have to define it in the amplitude_config JSON under the amplitude_songs key.
```javascript
	<script type="text/javascript">
		amplitude_config = {
			"amplitude_songs": [
				{
					"name": "Song From the Styx",
					"artist": "Jake Jendusa",
					"album": "In Search Of EP",
					"url": "songs/In%20Search%20Of/01%20Song%20from%20the%20Styx.mp3",
					"live": false,
					"cover_art_url": "images/jendusaep.jpg"
				}
			]
		}
	</script>
```
The attributes you can define are:
* name - Represents the name of the song.
* artist - Represents the artist of the song.
* album - Represents the album of the song.
* url - The URL to the song. Make sure if you have spaces and abnormal characters that they are properly URL encoded.
* live - Set true if the song is live. If it's live, it will reconnect and disconnect upon play and pause saving buffering space.
* cover_art_url - The URL to the song's cover art. If you have sapces and abnormal characters, make sure they are properly URL encoded. By default this is false.

To add multiple songs and playlists, see "Adding Multiple Songs" or "Adding a Playlist" later in the documentation.

### Setting the Starting Volume ###
The amplitude config has an attribute where you can set the starting volume.  On Page load, it will initialize the volume to what you set it as. The range for this number
is 0 - 100. If you wanted 75% volume, you'd set this attribute to 75.  By default this attribute is 50 for 50% volume.

```javascript
	<script type="text/javascript">
		amplitude_config = {
			"amplitude_songs": [
				{
					"name": "Song From the Styx",
					"artist": "Jake Jendusa",
					"album": "In Search Of EP",
					"url": "songs/In%20Search%20Of/01%20Song%20from%20the%20Styx.mp3",
					"live": false,
					"cover_art_url": "images/jendusaep.jpg"
				}
			],
			"amplitude_volume": 75
		}
	</script>
```

### Autoplaying a Song ###
You can set the song to autoplay on page load by turning on the amplitude_auto_play parameter.  By default this is set to false.  To turn on the amplitude_auto_play parameter, add it to your
amplitude_config variable:

```javascript
	<script type="text/javascript">
		amplitude_config = {
			"amplitude_songs": [
				{
					"name": "Song From the Styx",
					"artist": "Jake Jendusa",
					"album": "In Search Of EP",
					"url": "songs/In%20Search%20Of/01%20Song%20from%20the%20Styx.mp3",
					"live": false,
					"cover_art_url": "images/jendusaep.jpg"
				}
			],
			"amplitude_auto_play": true
		}
	</script>
```

### Adding a Play Button ###
To add a play button you simply need to add an element to the document with the ID of "amplitude-play".  On initialization, AmplitudeJS will scan for this element and apply an appropriate
event handler to the element. If it's a mobile device, the event handler will be "touchstart", if it's a computer it will be "click".  AmplitudeJS allows you to style this element any way 
you want with any CSS you want.  The play button will play the song that you defined, the active song in a playlist, or appropriate song in a multi-song implementation.

```html
	<div id="amplitude-play"></div>
```

### Adding a Pause Button ###
Adding a pause button is very similar to the play button.  You just need to add an element with the ID of "amplitude-pause" to the document.  This element is scanned for when AmplitudeJS initializes
and the appropriate event handlers are defined.  You can style this element anyway you like using CSS.  The pause button will pause the song you defined, the active song in a playlist or the appropriate
song in a multi-song implementation.

```html
	<div id="amplitude-pause"></div>
```

### Adding a Play/Pause Button ###
The play/pause button combines the play and pause functionality into a single button.  The way this is handled is upon the appropriate event (touchstart for mobile and click for desktop), AmplitudeJS
determines whether the active song is playing or paused. If the song is playing and the user interacts with this button, the song will pause.  If the song is paused and the user interacts with this button
the song plays.  To add this button, add an element with the id of "amplitude-play-pause".  AmplitudeJS will bind the functionality upon page load.  Upon initialization, a class should be assigned to the element
of "amplitude-paused". This is the current state of the song. When the song is playing, the class will be replaced with "amplitude-playing".  You can then style this button for the two states.  It's recommended that
you use a background-image in your css if you are using a div or span so the event handler fires accordingly.

```html
	<div id="amplitude-play-pause"></div>
```

### Adding a Song Slider ###
The song slider is handled through an HTML5 Range Slider.  For more information visit ['http://demosthenes.info/blog/757/Playing-With-The-HTML5-range-Slider-Input'](http://demosthenes.info/blog/757/Playing-With-The-HTML5-range-Slider-Input).
Using the HTML5 Range Slider makes the functionality much more supported.  To add a song slider (what adjusts the time of the current now playing track), add a range slider input with the id of "amplitude-song-slider".  AmplitudeJS will bind
the time updates and display them proportionally on the range slider.  All range sliders should be set to a value of 0 when added to the page since there is nothing currently playing. Even if you have auto play turned on, the song starts at 0.
You will be able adjust and slide the range and it will adjust the time of the current song.

```html
	<input type="range" id="amplitude-song-slider" value="0"/>
```

### Adding a Song Time Visualization ###
A song time visualization simply fills in with the percentage of the song that has been played.  It is an easy way to provide a visual for the user to see. However, the user can not interact with this, it's for display purposes only.
To add a song time visualizaiton slider, simply add an element named "amplitude-song-time-visualization".  When added, AmplitudeJS will add an element inside named "amplitude-song-time-visualization-status".  This will fill proportionally to 
how much of the song has been played.  You can style these two elements anyway you want using CSS.

```html
	<div id="amplitude-song-time-visualization">
	</div>
```

After AmplitudeJS adds the element it looks like:
```html
	<div id="amplitude-song-time-visualization">
		<div id="amplitude-song-time-visualization-status"></div>
	</div>
```

### Adding Song Current Time and Duration ###
AmplitudeJS allows you to add current song time and current song duration elements which display information regarding the current song.  When the song is playing, the current time is updated to represent where the song is in the sense
of minutes and seconds.  The current song duration simply shows the length of the song. To add this information, simply make an element with the id of "amplitude-current-time" and "amplitude-audio-duration".  AmplitudeJS
will adjust the inner html of these elements to match where the song is at.  You can style these anyway you want with CSS. NOTE: With a live song, it would be advisable to leave out the audio duration since there really isn't a known end
and will display a random number.

```html
	<span id="amplitude-current-time">0:00</span> / <span id="amplitude-audio-duration">0:00</span>
```

### Adding Volume Up and Down Buttons ###
With AmplitudeJS you can add volume up and volume down buttons. You can also assign how much you want the volume to increase and decrease each time a user interacts with your element. To change the amount, you set the "amplitude_volume_up_amount" and
"amplitude_volume_down_amount" in the amplitude_config variable.  The ranges for this is 0-100. Granted, you probably down't want the user to max or minify the volume on each click (there's a mute button for that) so set it something reasonable.  By default
they are set to 10. So it would take the user 10 clicks from 0 to max the volume and 10 clicks from the max to reach 0.  To add a volume up button to the page, add an element with the id of "amplitude-volume-up".  AmplitudeJS will find this on initialization
and bind the appropriate handler.  To add a volume down button, add an element with the id of "amplitude-volume-down" to the page.  Like the volume up, AmplitudeJS will find this element and bind the appropriate event handler to the element.  With all amplitude
elements, if you are using images, it is recommended to add them as a background-image to the appropriate element so the event handlers bind appropriately.  

```html
	<div id="amplitude-volume-up"></div>
	<div id="amplitude-volume-down"></div>
```

To adjust the volume increment and decrement amount, add to the amplitude config variable the following settings:

```javascript
	<script type="text/javascript">
		amplitude_config = {
			"amplitude_songs": [
				{
					"name": "Song From the Styx",
					"artist": "Jake Jendusa",
					"album": "In Search Of EP",
					"url": "songs/In%20Search%20Of/01%20Song%20from%20the%20Styx.mp3",
					"live": false,
					"cover_art_url": "images/jendusaep.jpg"
				}
			],
			"amplitude_volume_up_amount": 15,
			"amplitude_volume_down_amount": 10
		}
	</script>	
```

### Adding a Mute Button ###
A mute button is a toggle in AmplitudeJS. When the button is clicked, the volume gets set to 0 and when it is clicked again, the volume is restored to what it was before the click.  When we discuss callbacks, you can 
fire functions before and after the mute button is pressed to adjuste page elements.  The mute button will automatically set the volume bar (next section) accordingly.  To add this button, simply add an element with the id of "amplitude-mute"
to your document.

```html
	<div id="amplitude-mute"></div>
```

### Adding a Volume Slider ###
Like the song slider, the volume slider is an HTML5 range element.  The user can slide the volume slider to adjust the volume of the current song.  The volume slider also
reacts accordingly if the mute, volume up, or volume down buttons are pressed. Unlike the song slider, the initial volume slider should NOT contain a value since you can set 
the initial song volume in the amplitude_config variable.  To add a volume slider, add an HTML5 range element with the id of "amplitude-volume-slider" to your document. 
You can then style this element using CSS.

```html
	<input type="range" id="amplitude-volume-slider" />
```

If you want the volume slider to be vertical, in the CSS apply the following style: 

```css
	#amplitude-volume-slider{
		-webkit-appearance: slider-vertical
	}
```

### Song Visual Elements ###
For single song implementations and playlists using the same control sets, you can add certain elements that get updated depending on what song is playing and it's meta data.
Each of these elements has their inner html updated depending on the song being played. Elements such as amplitude-current-time and amplitude-audio-duration adjust
accordingly if there is one control set in a playlist environment. The elements added to the document that house this information should have ids:

* "amplitude-album-art" - When the song changes, the inner html gets an image element added with the source of the album art defined in the amplitude_config for the specific song.
* "amplitude-now-playing-title" - Displays the title of the song that is now playing.
* "amplitude-now-playing-artist" - Displays the artist of the song that is now playing.
* "amplitude-now-playing-album" - Displays the album name of the song that is now playing.

All of these elements can be styled through CSS to be customized.

```html
	<div id="amplitude-album-art"></div>
	<span id="amplitude-now-playing-title"></span>
	<span id="amplitude-now-playing-artist"></span>
	<span id="amplitude-now-playing-albume"></span>
```

### Working with Multiple Songs ###
AmplitudeJS can handle playlists and multiple songs on the same page.  These implementations are handled through the config easily and add a lot of power to the website.  
When dealing with multiple songs on the same page, you can look at AmplitudeJS through 2 different lenses. Lens A is a playlist.  In a playlist, there are functions
that make sense in a playlist like next, previous, shuffle.  Lens B is one page with multiple modularized players, essentially a whole bunch of individual song players.
In both lenses AmplitudeJS allows dynamic additions to the page as well. So when you can add a song to the playlist or page through AJAX.

### Making a Playlist ###
In the previous parts of the documentation, we had elements that are given an ID that perform certain functions. Looking through the playlist lens there should be one main control center
that includes the current time for the current song playing, the current song duration, a play-pause set up, and a location for album art or any combination of these features.  For the elements
discussed above, we can continue using IDs such as "amplitude-play-pause" for these implementations.  When we get to multiple songs (lens B) that are modularized, we will be using classes for the 
common controls (that documentation is farther down) instead of IDs.

Playlist Element IDs Include:
* amplitude-play
* amplitude-pause
* amplitude-play-pause
* amplitude-now-playing-title
* amplitude-now-playing-artist
* amplitude-now-playing-album
* amplitude-current-time
* amplitude-audio-duration
* amplitude-song-slider
* amplitude-album-art
* amplitude-mute
* amplitude-volume-up
* amplitude-volume-down

(all are documented above)

Playlist Specific Element IDs:
* amplitude-previous
* amplitude-next
* amplitude-shuffle (which contains classes amplitude-shuffle-on and amplitude-shuffle-off)

Playlist Specific Element Attributes:
* amplitude-song-index

Playlist Specific Element Classes:
* amplitude-play-pause
* amplitude-list-paused
* amplitude-list-playing

### Setting up Amplitude Config for Playlist ###
In the previous parts of this documentation, we were thinking of using AmplitudeJS for one song.  To set up the amplitude_config to work like a playlist, simply add more song objects to your amplitude_songs
key. 

```javascript
	<script type="text/javascript">
		amplitude_config = {
			"amplitude_songs": [
				{
					"name": "Stream the World",
					"url": "http://1942.live.streamtheworld.com/CBC_R1_WPG_L_SC",
					"live": true,
					"visual_id": "song-2"
				},
				{
					"name": "Porch Stomp Blues",
					"artist": "Jake Jendusa",
					"album": "In Search Of EP",
					"url": "songs/In%20Search%20Of%20EP/03%20Porch%20Stomp%20Blues.mp3",
					"live": false,
					"visual_id": "song-3",
					"cover_art_url": "images/jendusa.jpg"
				},
				{
					"name": "Man With the Keys",
					"artist": "Jake Jendusa",
					"album": "In Search Of EP",
					"url": "songs/In%20Search%20Of/02%20Man%20with%20the%20Keys.mp3",
					"live": false,
					"visual_id": "song-4",
					"cover_art_url": "images/jendusa.jpg"
				}
			]
		}
	</script>
```

There are now 3 songs in the playlist (you can add as many as you like). An important thing to keep in mind is that the indexes we refer to start at 0 instead of 1.
So in the songs array, "Stream the World" has an index of 0 and "Porch Stomp Blues" has an index of 1. Now when the user clicks the play or play/pause button the current
song will be the start of the playlist.  If you notice, there is an additional attribute to each song named "visual_id".  When you are styling your page, the "visual_id" attribute
should correlate to the visual representation of the song.  For example if I was making a list of these songs, it might look something like: 

```html
	<div class="playlist-song" id="song-2">
        <div class="playlist-song-album-art">
            <img src="images/jendusaep.jpg">
        </div>
        <div class="playlist-song-information">
            Song: Stream the World
        </div>
        <div class="playlist-audio-controls">
            <div class="amplitude-play-pause amplitude-list-paused" amplitude-song-index="0"></div>
        </div>
    </div>
    <div class="playlist-song" id="song-3">
        <div class="playlist-song-album-art">
            <img src="images/jendusaep.jpg">
        </div>
        <div class="playlist-song-information">
            Song: Porch Stomp Blues<br>
            Artist: Jake Jendusa<br>
            Album: In Search Of EP
        </div>
        <div class="playlist-audio-controls">
            <div class="amplitude-play-pause amplitude-list-paused" amplitude-song-index="1"></div>
        </div>
    </div>
    <div class="playlist-song" id="song-4">
        <div class="playlist-song-album-art">
            <img src="images/jendusa.jpg">
        </div>
        <div class="playlist-song-information">
            Song: Man with the Keys<br>
            Artist: Jake Jendusa<br>
            Album: In Search Of
        </div>
        <div class="playlist-audio-controls">
            <div class="amplitude-play-pause amplitude-list-paused" amplitude-song-index="2"></div>
        </div>
    </div>
```

Don't worry about the unknown amplitude elements, we will get to them. However, each div element with a class = "playlist-song" (not an AmplitudeJS element, just for styling) also has
an id.  For example, the first "playlist-song" element has an id of "song-2", meaning "song-2" is the visual_id defined in the Amplitude config.  When that song is playing in the playlist,
a class named "amplitude-now-playing" is added to that element.  You can then style that clas to maybe change the background color or add a border to show that the song is playing.

### Defining a Start Song ###
In a playlist implementation, you can define a start song.  When the user initially clicks play, this song will play.  To do that, you just need to add to your amplitude_config
a start song attribute with the index of the song you want to start (remember, indexes start at 0!).

```javascript
	<script type="text/javascript">
		amplitude_config = {
			"amplitude_songs": [
				{
					"name": "Stream the World",
					"url": "http://1942.live.streamtheworld.com/CBC_R1_WPG_L_SC",
					"live": true,
					"visual_id": "song-2"
				},
				{
					"name": "Porch Stomp Blues",
					"artist": "Jake Jendusa",
					"album": "In Search Of EP",
					"url": "songs/In%20Search%20Of%20EP/03%20Porch%20Stomp%20Blues.mp3",
					"live": false,
					"visual_id": "song-3",
					"cover_art_url": "images/jendusa.jpg"
				},
				{
					"name": "Man With the Keys",
					"artist": "Jake Jendusa",
					"album": "In Search Of EP",
					"url": "songs/In%20Search%20Of/02%20Man%20with%20the%20Keys.mp3",
					"live": false,
					"visual_id": "song-4",
					"cover_art_url": "images/jendusa.jpg"
				}
			],
			"amplitude_start_song": 1
		}
	</script>
```

When play is initially clicked (or touchstart), "Porch Stomp Blues" will play.

### Adding Next and Previous Buttons ###
When using AmplitudeJS in a playlist, you can navigate forwards and backwards in the playlist.  Upon click/touch AmplitudeJS will navigate through your playlist.
To add a previous button add an element with an id of "amplitude-previous".  To add a next button add an element with an id of "amplitude-next".  When doing the visual
design of your playlist, keep in mind Amplitude will go in order of the indexes so make sure that your visual display correlates with the order you put the songs into 
the amplitude_config.  The exception of this is when you have shuffle turned on, it will play the songs in a random order.  When the song is the last song in the playlist,
and next is clicked it will go to the first song of the list. If the song playing is the first song in the list and previous is clicked it will go to the last song in the playlist.

```html
	<div id="amplitude-previous"></div>
	<div id="amplitude-next"></div>
```

### Continue to Next on Song End ###
By default on the playlist, when a song has ended, it will not continue through the playlist.  To enable AmplitudeJS to continue to the next song after the song that is
currently playing finishes, all you have to do is set "amplitude_continue_next" to true in the amplitude_config variable.  When the song finishes playing, it will go to the 
next song in the playlist or the next song in the shuffle list if shuffle is turned on.  

```javascript
	<script type="text/javascript">
		amplitude_config = {
			"amplitude_songs": [
				{
					"name": "Stream the World",
					"url": "http://1942.live.streamtheworld.com/CBC_R1_WPG_L_SC",
					"live": true,
					"visual_id": "song-2"
				},
				{
					"name": "Porch Stomp Blues",
					"artist": "Jake Jendusa",
					"album": "In Search Of EP",
					"url": "songs/In%20Search%20Of%20EP/03%20Porch%20Stomp%20Blues.mp3",
					"live": false,
					"visual_id": "song-3",
					"cover_art_url": "images/jendusa.jpg"
				},
				{
					"name": "Man With the Keys",
					"artist": "Jake Jendusa",
					"album": "In Search Of EP",
					"url": "songs/In%20Search%20Of/02%20Man%20with%20the%20Keys.mp3",
					"live": false,
					"visual_id": "song-4",
					"cover_art_url": "images/jendusa.jpg"
				}
			],
			"amplitude_continue_next": true
		}
	</script>
```
### Adding the Shuffle Button ###
The shuffle function allows the playlist to be randomized and is accessed through the shuffle button.  To add a shuffle button add an 
element to the document with the id "amplitude-shuffle".  When clicked for the first time, the class "amplitude-shuffle-on" will be applied
to the element allowing for the element to be styled for the current state.  When clicked to turn off shuffle, the class "amplitude-shuffle-off" will
be applied to the element so you can style the element when shuffle is off.  On page load, "amplitude-shuffle-off" is the first class applied since
shuffle is not turned on.

```html
	<div id="amplitude-shuffle"></div>
```

### Individual Playlist Song Play/Pause Functions ###
In a playlist, you can have play/pause functions for individual songs in your playlist display.  To do this you need to use a classed form of the play-pause function
and then apply an attribute to the element with the index of the song in the list that will be played upon click.  When the song in the list is being played, the element also
receives a class of "amplitude-list-playing". When the song of the list is paused, it receives a class of "amplitude-list-paused".  When amplitude loads it looks for all classes
"amplitude-play-pause" and binds an event handler to these classes. When the song is being played from the central control (the amplitude-play-pause id) the appropriate classes get
applied as well.

```html
	<div id="player-playlist">
	    <div class="playlist-song" id="song-2">
	        <div class="playlist-song-album-art">
	            <img src="images/jendusaep.jpg">
	        </div>
	        <div class="playlist-song-information">
	            Song: Stream the World
	        </div>
	        <div class="playlist-audio-controls">
	            <div class="amplitude-play-pause amplitude-list-paused" amplitude-song-index="0"></div>
	        </div>
	    </div>
	    <div class="playlist-song" id="song-3">
	        <div class="playlist-song-album-art">
	            <img src="images/jendusaep.jpg">
	        </div>
	        <div class="playlist-song-information">
	            Song: Porch Stomp Blues<br>
	            Artist: Jake Jendusa<br>
	            Album: In Search Of EP
	        </div>
	        <div class="playlist-audio-controls">
	            <div class="amplitude-play-pause amplitude-list-paused" amplitude-song-index="1"></div>
	        </div>
	    </div>
	    <div class="playlist-song" id="song-4">
	        <div class="playlist-song-album-art">
	            <img src="images/jendusa.jpg">
	        </div>
	        <div class="playlist-song-information">
	            Song: Man with the Keys<br>
	            Artist: Jake Jendusa<br>
	            Album: In Search Of
	        </div>
	        <div class="playlist-audio-controls">
	            <div class="amplitude-play-pause amplitude-list-paused" amplitude-song-index="2"></div>
	        </div>
	    </div>
	</div>
```

When the element with the class "amplitude-play-pause" is clicked for Porch Stomp Blues, AmplitudeJS will read the amplitude-song-index and play that song
in the playlist. Porch Stomp Blues has an index of 1 in our playlist.

### Dynamically Adding a Song to a Playlist ###
When adding a song, the user calls amplitude_add_song( song ) and it is the only AmplitudeJS function that the user should call directly.  What happens is when the user calls
amplitude_add_song( song ) and passes a song as a parameter, the song gets added to the end of the amplitude_songs object in the amplitude_config.  There should be two steps in
this process:

1. Adding the song to the song list with amplitude_add_song( song ).
2. Adding the visual element to display the song.

The song parameter in the first step is the JSON representation of a song the same way you would define it in the amplitude_config.

```javascript
<script type="text/javascript">
	var new_song = {
		"name": "Shooting Star",
		"artist": "Air Traffic",
		"album": "Fractured Life",
		"url": "songs/03%20Shooting%20Star.m4a",
		"visual_id": "song-8",
		"cover_art_url": "images/fracturedlife.jpg",
		"live": false
	}
</script>
```
When you call the amplitude_add_song( song ) method and pass it the song object, it returns the new index.  You can then build the visual display and append it to the visual part of the playlist.
The visual_id has nothing to do with the index, it's just the id of the container that houses the visual information for the song.  Amplitude listens for new nodes to be inserted into the document, 
so when the new visual display is added, the appropriate event handlers are applied to the elements making the play/pause functions work if they are a part of your design.

```javascript
	<script type="text/javascript">
		var new_song = {
    		"name": "Shooting Star",
    		"artist": "Air Traffic",
    		"album": "Fractured Life",
    		"url": "songs/03%20Shooting%20Star.m4a",
    		"visual_id": "song-8",
    		"cover_art_url": "images/fracturedlife.jpg",
    		"live": false
    	}


    	var song_index = amplitude_add_song( new_song );
    	var new_song_visual_display = '<div class="playlist-song" id="song-8">'
    		+ '<div class="playlist-song-album-art">'
    			+ '<img src="images/airtraffic.jpg">'
    		+ '</div>'
    		+ '<div class="playlist-song-information">Song: Shooting Star<br>Artist: Air Traffic<br>Album: Fractured Life</div>'
    		+ '<div class="playlist-audio-controls">'
    			+ '<div class="amplitude-play-pause amplitude-list-paused" amplitude-song-index="'+song_index+'"></div>'
    		+ '</div>'
    		+'</div>';

    	document.getElementById('player-playlist').innerHTML += new_song_visual_display;
	</script>
```

With this example, the element with the id of "player-playlist" is just the housing for the playlist.  The new song does have an "amplitude-play-pause" element and the amplitude-song-index is set to the
returned song_index from the amplitude_add_song( song ) function.

### Multiple Modular Songs ###
You can also use AmplitudeJS for all songs in the sense of multiple songs in the same document.  When viewing AmplitudeJS through this lens, the songs don't have order like a playlist and
it wouldn't make sense to have previous, next, and shuffle functions.  Each song operates independently of each other.  However, this means that we will be using a lot of classes compared to ids
since there will be a lot of controls on the page.  The amplitude_songs listing should look identical to the one for the playlist.  However, the visual_id isn't used when using AmplitudeJS
this way.  We will be using custom attributes on each element to correlate to a song in the playlist.  Also, since each song's controls are not changing, the information should be filled in for
album, artist, artwork, and title when creating the page. The volume controls and the mute button operate globally on the element. Meaning if you mute the song, all songs are muted. If you increase
the volume on the song, then it increases for all of the songs.

```javascript
	<script type="text/javascript">
		amplitude_config = {
			"amplitude_songs": [
				{
					"name": "Song From the Styx",
					"artist": "Jake Jendusa",
					"album": "In Search Of EP",
					"url": "songs/In%20Search%20Of/01%20Song%20from%20the%20Styx.mp3",
					"live": false,
					"cover_art_url": "images/jendusaep.jpg"
				},
				{
					"name": "Stream the World",
					"url": "http://1942.live.streamtheworld.com/CBC_R1_WPG_L_SC",
					"live": true,
					"cover_art_url": "images/jendusaep.jpg"
				},
				{
					"name": "Porch Stomp Blues",
					"artist": "Jake Jendusa",
					"album": "In Search Of EP",
					"url": "songs/In%20Search%20Of%20EP/03%20Porch%20Stomp%20Blues.mp3",
					"live": false,
					"cover_art_url": "images/jendusa.jpg"
				},
				{
					"name": "Man With the Keys",
					"artist": "Jake Jendusa",
					"album": "In Search Of EP",
					"url": "songs/In%20Search%20Of/02%20Man%20with%20the%20Keys.mp3",
					"live": false,
					"cover_art_url": "images/jendusa.jpg"
				}
			]
		}
	</script>
```

### Multiple Songs Play/Pause ###
Each song should have a specific play pause for the song display.  Similar to the play/pause class in the playlist, the element controlling the play/pause for the song should have a class "amplitude-play-pause" and should have an additional class
on page load "amplitude-list-paused".  The element should also have an attribute "amplitude-song-index" and set it equal to the index of the song in the amplitude_songs list.

```html
	<div class="amplitude-play-pause amplitude-list-paused" amplitude-song-index="1"></div>
	<div class="amplitude-play-pause amplitude-list-paused" amplitude-song-index="2"></div>
```

When playing, like in the playlist, the class "amplitude-list-playing" will be applied to the song.

### Multiple Songs Current Time and Audio Duration ###
Since each song has it's own control set that operates independently of each other, we need special elements to update when the song time changes. To add an element for current time, we need an element
with a class "amplitude-current-time" and it needs to have an attribute "amplitude-current-time-index" set equal to the index of the song in the amplitude_songs object.  For the audio duration, we
need to have an element with a class of "amplitude-audio-duration" and that element needs to have an attribute "amplitude-audio-duration-index" set to the index of the song in the amplitude_songs object.
These will update accordingly when the time updates.

```html
	<span class="amplitude-current-time" amplitude-current-time-index="1">0:00</span> / <span class="amplitude-audio-duration" amplitude-audio-duration-index="1">0:00</span>
  	<span class="amplitude-current-time" amplitude-current-time-index="2">0:00</span> / <span class="amplitude-audio-duration" amplitude-audio-duration-index="2">0:00</span>
```

### Multiple Songs Song Sliders ###
Like every element in a multiple song document implementation, the song sliders have a class instead of an id. That way the user can track and see track progress appropriate to the individual song.
To add these track sliders, add an HTML 5 Range Slider with a class "amplitude-song-slider" and an attribute "amplitude-song-slider-index" equal to the index of the song in the playlist.

```html
	<input type="range" class="amplitude-song-slider" amplitude-song-slider-index="0" value="0"/>
	<input type="range" class="amplitude-song-slider" amplitude-song-slider-index="1" value="0"/>
```

Make sure these sliders are set with an inital value of 0.  AmplitudeJS will query the slider based off of the "amplitude-song-slider-index" attribute and update the appropriate song slider for the song playing.

### iOS Volume Controls ###
Mobile events work exactly the same as desktop events.  The only exception is iOS and volume changes. According to Apple's documentation on Safari, volume can not be adjusted through Javascript since the user always
has hand access to volume increment and decrement hardware controls: [https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4](https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4).

### Callback Functions ###
All of AmplitudeJS' functions have callbacks at certain points.  The user can set a function to be called when certain events within AmplitudeJS are called.  These are functions are defined in the amplitude_config. 
You just have to set the callback to the function name that you want to call when AmplitudeJS runs its internal function.

The list of functions are:
* amplitude_before_play_callback
* amplitude_after_play_callback
* amplitude_before_stop_callback
* amplitude_after_stop_callback
* amplitude_before_next_callback
* amplitude_after_next_callback
* amplitude_before_prev_callback
* amplitude_after_prev_callback
* amplitude_before_pause_callback
* amplitude_after_pause_callback
* amplitude_before_shuffle_callback
* amplitude_after_shuffle_callback
* amplitude_before_volume_change_callback
* amplitude_after_volume_change_callback
* amplitude_before_mute_callback
* amplitude_after_mute_callback
* amplitude_before_time_update_callback
* amplitude_after_time_update_callback
* amplitude_before_song_information_set_callback
* amplitude_after_song_information_set_callback
* amplitude_before_song_added_callback
* amplitude_after_song_added_callback


For example if you want a function to call after play has been called, you'd set up your amplitude_config as follows:

```javascript
<script type="text/javascript">
	var amplitude_config = {
		"amplitude_songs": [
			...
		],
		"amplitude_after_play_callback": "name_of_your_function"
	}

	function name_of_your_function(){
		//DO STUFF
	}
</script>
```

You can set up any of the callbacks this way.

## Tutorial ##
View a tutorial on how to use here: 
http://serversideup.net/customize-html-audio-css-amplitudejs

## License ##

The MIT License (MIT)

Copyright (c) 2014 521 Dimensions

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
