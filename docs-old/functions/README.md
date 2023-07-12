---
title: Public Functions - AmplitudeJS Documentation
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
    content: https://521dimensions.com/open-source/amplitudejs/docs/functions/
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

# Public Functions
<carbon-ads/>
There are a variety of public functions that AmplitudeJS exposes to the user.
These methods allow the user to change config variables, add new songs, play
now, etc.

## Get Config
Returns the current AmplitudeJS configuration.

```javascript
Amplitude.getConfig();
```

## Bind New Elements
The bind new elements function should be called whenever a new song element is
added to the page. This will bind all of the event handlers for that element.

```javascript
Amplitude.bindNewElements()
```

## Get Active Playlist
This method will return the key of the active playlist.

```javascript
Amplitude.getActivePlaylist()
```

## Get Playback Speed
Returns the current playback speed for the player.

```javascript
Amplitude.getPlaybackSpeed()
```

## Get Repeat
Returns the state of the global repeat status for the player.

```javascript
Amplitude.getRepeat()
```

## Get Repeat Playlist
Returns the state of the repeat status for the playlist.


```javascript
Amplitude.getRepeatPlaylist( playlistKey )
```

## Get Shuffle
Returns the current state of the global shuffle status for the player.

```javascript
Amplitude.getShuffle()
```

## Get Shuffle Playlist
Returns the state of the shuffle flag for a playlist.

```javascript
Amplitude.getShufflePlaylist( playlistKey )
```

## Set Shuffle
Sets the global shuffle state for AmplitudeJS.

```javascript
Amplitude.setShuffle( shuffleState )
```

## Set Shuffle Playlist
Sets the shuffle state for a playlist.

```javascript
Amplitude.setShufflePlaylist( playlistKey, shuffleState )
```

## Set Repeat
Sets the global repeat status for AmplitudeJS

```javascript
Amplitude.setRepeat( repeatState )
```

## Set Repeat Song
Sets the global state to determine if we should repeat the individual song upon
completion.

```javascript
Amplitude.setRepeatSong( repeatSongState )
```

## Set Repeat Playlist
Sets the repeat for the playlist.

```javascript
Amplitude.setRepeatPlaylist( playlistKey, repeatState )
```

## Get Default Album Art
Returns the default album art URL set in the player.

```javascript
Amplitude.getDefaultAlbumArt()
```

## Set Default Album Art
Sets the default album art for the player to the URL provided.

```javascript
Amplitude.setDefaultAlbumArt( url )
```

## Get Default Album Art
Returns the URL of the default album art for the player.

```javascript
Amplitude.getDefaultAlbumArt()
```

## Get Default Playlist Art
Gets the default art for a playlist.

```javascript
Amplitude.getDefaultPlaylistArt()
```

## Set Default Playlist Art
Sets the default playlist art.

```javascript
Amplitude.setDefaultPlaylistArt( url )
```

## Set Debug
To change the debug mode setting, you can call the setDebug method any time and
start to receive data about the state of the player or turn off debugging.

```javascript
Amplitude.setDebug( {bool} );
```

## Get Active Song Metadata
Returns the active song's metadata as a JSON object.

```javascript
Amplitude.getActiveSongMetadata();
```

## Get Active Playlist Metadata
Gets the active playlist's metadata as a JSON object.

```javascript
Amplitude.getActivePlaylistMetadata();
```

## Get Song At Index
Returns a song's metadata at a specific index.

```javascript
Amplitude.getSongAtIndex( {index} );
```

## Get Song At Playlist Index
Returns a song at a playlist's index.

```javascript
Amplitude.getSongAtPlaylistIndex( {playlistIndex}, {index} );
```

## Add Song
Adds a song to the AmplitudeJS player. You will need to write a method yourself
to add the visual side of things to fit your custom design, and then call the
bindNewElements() method to make sure it works.

This method returns the index of the song added to the player.

```javascript
Amplitude.addSong( {song_object} );
```

## Prepend Song
Adds a song to the beginning of the AmplitudeJS player. After pre-pending the song, you will have to bindNewElements() method to make sure that any visuals are updated as well.

This method returns the index of the song added to the player.

```javascript
Amplitude.prependSong( {song_object} );
```

## Add Song To Playlist
Adds a song to a specific playlist within AmplitudeJS. Once the song is added
you will need to update the visual side of the player yourself.  After you
update the visual side, run the `Amplitude.bindNewElements()` method to make
sure the functionality is there for the new element.

```javascript
Amplitude.addSongToPlaylist( songObject, playlistKey )
```

## Remove Song
Removes a song from the global song array. You will have to remove the
containing element by yourself.

```javascript
Amplitude.removeSong( indexOfSong )
```

## Remove Song From Playlist
Removes a song from a playlist. You will have to update the visual side by
yourself.

```javascript
Amplitude.removeSongFromPlaylist( indexOfSongInPlaylist, playlistKey )
```

## Play Song At Index
Plays whatever song is set in the config at the specified index.

```javascript
Amplitude.playSongAtIndex( songIndex )
```

## Play Playlist Song At Index
Plays the song in a playlist at the specified index.

```javascript
Amplitude.playPlaylistSongAtIndex( playlistIndex, playlistKey )
```

## Play Now
In AmplitudeJS 2.0 this was referred to as 'Dynamic Mode'. Now you can just pass
a song to AmplitudeJS and it will automatically play. If there are visual
elements, then they will sync as well.

```javascript
Amplitude.playNow( {song_object} );
```

## Play
This simply plays whatever song is active.

```javascript
Amplitude.play()
```

## Pause
This simply pauses whatever song is active.
```javascript
Amplitude.pause()
```

## Stop
This simply stops whatever song is active.
```javascript
Amplitude.stop()
```

## Next
Plays the next song either in the playlist or globally.

```javascript
Amplitude.next( playlistKey = null )
```

## Prev
Plays the previous song either in the playlist or globally.

```javascript
Amplitude.prev( playlistKey = null )
```

## Get Audio
This returns the actual audio element. This is mainly used for writing
extensions but exposes the core of AmplitudeJS. This returns the audio element
used by AmplitudeJS.

```javascript
Amplitude.getAudio()
```

## Get songs
This method returns all of the songs defined in AmplitudeJS. It can be used for
a variety of different functions. It's extremely helpful if you are AJAX loading
songs and want to see the contents of the song array.

```javascript
Amplitude.getSongs()
```

## Get Songs In Playlist
This method returns all of the songs in a playlist. Since the user defines a
playlist with a key and the indexes of the songs, this will map the keys to the
songs and return all of the songs in the playlist.

```javascript
Amplitude.getSongsInPlaylist( playlistKey )
```

## Get Songs State
This method returns the current order of the songs. It can be used for
determining what song is next. If shuffle is on, it will return the shuffled
list of songs.

```javascript
Amplitude.getSongsState()
```

## Get Songs State Playlist
This method returns the current order of the songs in a playlist. If needed this
can be used to determine the next song in a playlist. This accounts for whether
the playlist has been shuffled or not.

```javascript
Amplitude.getSongsStatePlaylist( playlist )
```

## Get Active Index
This method returns the index of the active song in the songs array.

```javascript
Amplitude.getActiveIndex()
```

## Get Active Index State
This method returns the index of the active song in the songs array but accounts
for if shuffle has been enabled or not.

```javascript
Amplitude.getActiveIndexState()
```

## Get Version
This method returns the version of AmplitudeJS being used.

```javascript
Amplitude.getVersion()
```

## Get Buffered
This method returns the buffered percentage of the now playing song. This can be
used to show how much of the song has been buffered and ready to be played.

```javascript
Amplitude.getBuffered()
```

## Get Song Played Percentage
This method returns the percentage of the song played. When implementing a 3rd
party tracking element, you can set the percentage of the element to the
percentage played of the song.

```javascript
Amplitude.getSongPlayedPercentage()
```
You can combine this method with the time_update callback and whenever the time
updates your method can call Amplitude.getSongPlayedPercentage() and you can set
your tracking element correctly.

## Get Song Played Seconds
This method returns the current seconds the user is into the song.

```javascript
Amplitude.getSongPlayedSeconds()
```

## Get Song Duration
Returns the duration of the current song.

```javascript
Amplitude.getSongDuration()
```

## Set Song Played Percentage
This method allows you to set the percentage of the active song. The method
accepts a float between 0 and 100 for the percentage of the song to be set to.

```javascript
Amplitude.setSongPlayedPercentage( percentage )
```

## Skip To
Allows the user to skip to a specific location in the song whether that song is
in a playlist or not.

```javascript
Amplitude.skipTo( seconds, songIndex, playlist = null )
```

## Set Delay
If you have multiple songs that your player is using you can change the amount
of time you have as a delay between the songs. When one song ends, what is set
will be the amount of time delayed before the next song starts.

```javascript
Amplitude.setDelay( milliseconds )
```

## Get Delay
Gets the current delay between songs in milliseconds.

```javascript
Amplitude.getDelay();
```

## Set Song Meta Data
You can set the meta data for any song in your song objects. This is helpful if
you are doing a live stream and have a call back that returns the information of
what song is currently playing.

```javascript
Amplitude.setSongMetaData( index, metaData )
```

The first parameter `index` is the index of the song in the songs array you are
setting the meta data for. The `metaData` is an object that contains meta data
similar to a song object. The keys that get passed will be updated on the song
object at the index.  The only key that can not be updated is the `url`.

## Set Playlist Meta Data
You can set the metadata for the playlist. Similar to the songs object, you can do it for a playlist object.

```javascript
Amplitude.setPlaylistMetaData( playlist, metaData )
```

The first argument `playlist` is the key of the playlist we are setting the meta data for and the second object `metaData` is the object containing all of the keys we are updating.

## Get Analyser

Returns the Web Audio API Analyser. This allows for the user to bind to the active audio through the web audio API.

```javascript
Amplitude.getAnalyser()
```

## Get Player State

Returns the current state of the player whether it's `playing`, `paused`, or `stopped`.

```javascript
Amplitude.getPlayerState()
```
## Add Playlist

This method allows you to add a playlist to AmplitudeJS. To do this, you need a unique key for your playlist, the data describing your playlist such as `title`, `author`, etc. and an array of song objects for your playlist.

```javascript
Amplitude.addPlaylist( key, data, songs );
```

The first argument is the `key`. Remember this is a JSON key and should be formatted as such.

The second argument is all of the data describing the playlist such as `name`, `title`, `author`, etc. in the form of a JSON object.

Finally, the third argument is an array of song objects. These are the songs that will be added to the playlist.

## Register Visualization

The other way to register a visualization is through the public `Amplitude.registerVisualization( visualization, preferences )` method. The first parameter being the object included with the visualization file and the second parameter being a JSON object containing any of the parameters needed to overwrite defaults provided by the visualization.

```javascript
  Amplitude.registerVisualization( visualization, preferences );
```

## Set Global Visualization

You can set the global visualization through the public method like this:

```javascript
  Amplitude.setGlobalVisualization( visualizationKey );
```

## Set Playlist Visualization

You can set the visualization through the public facing method like this:

```javascript
  Amplitude.setPlaylistVisualization( playlist_key, visualization_key );
```

## Set Individual Song Visualization

You can set the visualization for an individual song like so:

```javascript
  Amplitude.setSongVisualization( songIndex, visualizationKey );
```

## Set Individual Song In Playlist Visualization

You can set the visualization for an individual song in a playlist using:

```javascript
Amplitude.setSongInPlaylistVisualization( playlistKey, songIndex, visualizationKey );
