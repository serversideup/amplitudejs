---
title: Configuration
group: "Configuring AmplitudeJS"
description: Learn about the variables that can be configured to determine the functionality of AmplitudeJS.
---

# Configuring AmplitudeJS

Amplitude JS contains many variables that can be configured to determine the functionality of AmplitudeJS.

These are set and passed in during the Amplitude.init() method or by the appropriate public facing method discussed in the `Public Functions` part of the documentation.

| Setting | Default | Type | Functionality
|---------|---------|------|--------------
| playback_speed | 1.0 | Float | Determines how fast the audio should play back. This should one of the following values: 1.0, 1.5, 2.0
| callbacks | {} | JSON Object | An object that contains the callbacks and functions AmplitudeJS should bind to.
| songs | [] | Array | An array of song objects used to define how AmplitudeJS is being used.
| playlists | {} | JSON Object | An object that contains playlist objects used by AmplitudeJS
| start_song | '' | Integer | The index of the song AmplitudeJS should start playing with.
| starting_playlist | '' | String | The key of the playlist AmplitudeJS should start with.
| starting_playlist_song | '' | Integer | The index of the song in the playlist AmplitudeJS should start with.
| shuffle_on | false | Boolean | Determines if we should start with the shuffle on.
| default_album_art | '' | String | URL to the image to be used for default album art.
| default_playlist_art | '' | String | URL to the image to be used as playlist artwork by default.
| debug | false | Boolean | Determines if we should output any debug notes. Helpful for debugging
| volume | 0.5 | Float | A value between 0 and 1.0 for how much volume should be added
| volume_increment | 5 | Integer | How much the volume should increment each time the volume up button is pressed.
| volume_decrement | 5 | Integer | How much the volume should decrement each time the volume down button is pressed.
| soundcloud_client | '' | String | Client API for SoundCloud. Used if using a SoundCloud link.
| soundcloud_use_art | false | Boolean | Determines if we should use the album art from SoundCloud instead of a URL provided.
| bindings | {} | JSON Object | Contains all of the key bindings and what method they should run when pressed.
| continue_next | true | Boolean | When a song is finished, determines if we should continue to the next song.
| delay | 0 | Integer | The number of milliseconds to delay between songs.
| visualizations | {} | JSON Object | The key and object store of all Web Audio API Visualizations that should be registered with AmplitudeJS.
| waveforms.sample_rate | 100 | Integer | The amount of samples we should do for each song when generating a waveform. The higher the number, the longer it will take, but more defined the waveform will be.
| preload | null | String | Can be set to "auto" which is default and loads the entire audio, "metadata" which only preloads the metadata only, or "none" which preloads nothing.

Don't worry, this is just an overview of the different options. We will be diving deeper into what each of these do throughout the docs.
