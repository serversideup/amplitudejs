# AmplitudeJS #

A Javascript library that allows you to control the design of your media controls in your webpage -- not the browser. No dependencies (jQuery not required).

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

#### Including Amplitude ####
To include AmplitudeJS on your page simply download the source from github: [https://github.com/521dimensions/amplitudejs](https://github.com/521dimensions/amplitudejs)

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

#### Amplitude Config ####
Previous versions of AmplitudeJS relyed on the programmer to add audio tags for each song. Now you don't have to even have an audio tag in your HTML
because everything is controlled through the AmplitudeJS config. 

#### Adding a Song ####
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

#### Setting the Starting Volume ####
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

#### Autoplaying a Song ####
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

#### Adding a Play Button ####
To add a play button you simply need to add an element to the document with the ID of "amplitude-play".  On initialization, AmplitudeJS will scan for this element and apply an appropriate
event handler to the element. If it's a mobile device, the event handler will be "touchstart", if it's a computer it will be "click".  AmplitudeJS allows you to style this element any way 
you want with any CSS you want.  The play button will play the song that you defined, the active song in a playlist, or appropriate song in a multi-song implementation.

```html
	<div id="amplitude-play"></div>
```

#### Adding a Pause Button ####
Adding a pause button is very similar to the play button.  You just need to add an element with the ID of "amplitude-pause" to the document.  This element is scanned for when AmplitudeJS initializes
and the appropriate event handlers are defined.  You can style this element anyway you like using CSS.  The pause button will pause the song you defined, the active song in a playlist or the appropriate
song in a multi-song implementation.

```html
	<div id="amplitude-pause"></div>
```

#### Adding a Play/Pause Button ####
The play/pause button combines the play and pause functionality into a single button.  The way this is handled is upon the appropriate event (touchstart for mobile and click for desktop), AmplitudeJS
determines whether the active song is playing or paused. If the song is playing and the user interacts with this button, the song will pause.  If the song is paused and the user interacts with this button
the song plays.  To add this button, add an element with the id of "amplitude-play-pause".  AmplitudeJS will bind the functionality upon page load.  Upon initialization, a class should be assigned to the element
of "amplitude-paused". This is the current state of the song. When the song is playing, the class will be replaced with "amplitude-playing".  You can then style this button for the two states.  It's recommended that
you use a background-image in your css if you are using a div or span so the event handler fires accordingly.

```html
	<div id="amplitude-play-pause"></div>
```

#### Adding a Song Slider ####
The song slider is handled through an HTML5 Range Slider.  For more information visit ['http://demosthenes.info/blog/757/Playing-With-The-HTML5-range-Slider-Input'](http://demosthenes.info/blog/757/Playing-With-The-HTML5-range-Slider-Input).
Using the HTML5 Range Slider makes the functionality much more supported.  To add a song slider (what adjusts the time of the current now playing track), add a range slider input with the id of "amplitude-song-slider".  AmplitudeJS will bind
the time updates and display them proportionally on the range slider.  All range sliders should be set to a value of 0 when added to the page since there is nothing currently playing. Even if you have auto play turned on, the song starts at 0.
You will be able adjust and slide the range and it will adjust the time of the current song.

```html
	<input type="range" id="amplitude-song-slider" value="0"/>
```

#### Adding Song Current Time and Duration ####
AmplitudeJS allows you to add current song time and current song duration elements which display information regarding the current song.  When the song is playing, the current time is updated to represent where the song is in the sense
of minutes and seconds.  The current song duration simply shows the length of the song. To add this information, simply make an element with the id of "amplitude-current-time" and "amplitude-audio-duration".  AmplitudeJS
will adjust the inner html of these elements to match where the song is at.  You can style these anyway you want with CSS.

```html
	<span id="amplitude-current-time">0:00</span> / <span id="amplitude-audio-duration">0:00</span>
```

#### Adding Volume Up and Down Buttons ####
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


#### Song Visual Elements ####


## Tutorial ##
View a tutorial on how to use here: 
http://serversideup.net/customize-html-audio-css-amplitudejs

## Example/Demo ##
Demo Located Here: 
http://amplitudejs.com

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
