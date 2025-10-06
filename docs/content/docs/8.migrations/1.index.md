---
title: Migration Guides
group: "Migration Guides"
description: Migrate to the latest version of AmplitudeJS
---

# Upgrading from 3.x To 4.0

AmplitudeJS 4.0 was one of the biggest releases thus far. We tried to limit the breaking changes, but in order to scale for the future we had to make a few.  I should have every change documented below and the reason why the change was made.

## All AmplitudeJS Attributes Have HTML5 Dataset Prefix

In order to make AmplitudeJS validated properly by w3 terms, we prefixed all of the attributes on AmplitudeJS elements to have the `data-` prefix. This makes all of the attributes compatible with the HTML5 dataset API: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset

What this means is any time you are defining a specific element for a song or playlist, you will have to use `data-amplitude-song-index` or `data-amplitude-playlist`. In 3.x releases, these were just `amplitude-song-index` or `amplitude-playlist`. In order to work with 4.0 and above, you will have to update these references.

## Standard Attributes For Defining Elements

In versions 3.x, we had a variety of different attributes to define an element based on it's level of use. For example, if we had a global play/pause button it'd be `amplitude-main-play-pause="true"` as an attribute. This got really cumbersome with multiple elements existing on either a global level (controlling the entire player), a playlist level (controlling functions within a playlist), a song level (controlling an individual song), and a song in playlist level (controlling a song within a playlist). Now everything is based on a combination of attributes. These are as follows:

* Global Level: `class="amplitude-{specialized-class}"`
* Playlist Level: `class="amplitude-{specialized-class}" data-amplitude-playlist="{playlist}"`
* Song Level: `class="amplitude-{specialized-class}" data-amplitude-song-index="{songIndex}"`
* Song In Playlist: `class="amplitude-{specialized-class}" data-amplitude-song-index="{songIndex}" data-amplitude-playlist="{playlist}"`

These combinations work for all elements that are in AmplitudeJS. Now there are some elements that don't span all of the scopes. Let's take an `amplitude-volume-up` element. This only works on the global level. It wouldn't make sense to have individual playlist volumes.

## Playlist Song Indexes Are Scoped To Playlist

In versions 3.x song indexes are now scoped to playlists. What this means is that when you use `data-amplitude-song-index` on a song display IN a playlist, it references the index of the song in the playlist instead of the songs array. For example if song index 1 is used on the 'Hip Hop' playlist, it references song index 1 within that playlist. Before it was the index in the songs array.

## Next And Previous Buttons Only Work In Playlists If Playlist Is Active

So there are two levels of next and previous buttons. The global level which will react to the state of the player and the playlist level. If a global level next button or previous button is clicked, it will either go to the next/previous song in the songs array if no playlist is active, or the next/previous song in the playlist if a playlist is active.  Now on the playlist level the buttons only go to the next/previous song in the playlist when clicked and ONLY if the playlist is active. If you click a next/previous button on a playlist that isn't active, it doesn't do anything. It will only print a debug message if debug is turned on.

## Autoplay Configuration Has Been Removed

Most browsers do not support autoplay features anymore. The functionality to set up AmplitudeJS for autoplay has been removed. If you initialize with autoplay, it will just be ignored.

That should be the migrations! If you ran into anything, please reach out and we can lend a hand!
