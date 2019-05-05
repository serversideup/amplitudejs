/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * These methods help display the audio's meta data
 *
 * @module visual/MetaDataElements
 */
let MetaDataElements = (function() {
  /**
   * Displays the active song's metadata. This is called after a song has
   * been changed. This method takes the active song and displays the
   * metadata. So once the new active song is set, we update all of the
   * screen elements.
   *
   * @access public
   */
  function displayMetaData() {
    /*
			Define the image meta data keys. These are managed separately
			since we aren't actually changing the inner HTML of these elements.
		*/
    let imageMetaDataKeys = [
      "cover_art_url",
      "station_art_url",
      "podcast_episode_cover_art_url"
    ];

    /*
			Get all of the song info elements
		*/
    let songInfoElements = document.querySelectorAll(
      "[data-amplitude-song-info]"
    );

    /*
			Iterate over all of the song info elements. We will either
			set these to the new values, or clear them if the active song
			doesn't have the info set.
		*/
    for (let i = 0; i < songInfoElements.length; i++) {
      /*
				Get the info so we can check if the active meta data has the
				key.
			*/
      let info = songInfoElements[i].getAttribute("data-amplitude-song-info");

      /*
				Grab the playlist and song index.
			*/
      let playlist = songInfoElements[i].getAttribute(
        "data-amplitude-playlist"
      );
      let songIndex = songInfoElements[i].getAttribute(
        "data-amplitude-song-index"
      );

      /*
				Ensure that we don't set any individual elements now. We set this with the
				sync meta data method. The reason we don't set them here is because
				all individual songs would get the now playing artwork. If the playlists
				match or the element is a main element meaning it doesn't
				belong to a playlist or a song, then we set the song info.
			*/
      if (
        songIndex == null &&
        (config.active_playlist == playlist ||
          (playlist == null && songIndex == null))
      ) {
        /*
					If the active metadata has the key, then we set it,
					otherwise we clear it. If it's an image element then
					we default it to the default info if needed.
				*/
        let val = (config.active_metadata[info] != undefined) ? config.active_metadata[info] : null;
        if (imageMetaDataKeys.indexOf(info) >= 0) {
          val = val || config.default_album_art
          songInfoElements[i].setAttribute(
            "src",
            val
          );
        } else {
          val = val || ""
          songInfoElements[i].innerHTML = val;
        }
      }
    }
  }

  /**
   * Displays the playlist meta data.
   */
  function displayPlaylistMetaData() {
    /*
			Define the image meta data keys. These are managed separately
			since we aren't actually changing the inner HTML of these elements.
		*/
    let imageMetaDataKeys = ["image_url"];

    /*
			Get all of the playlist info elements
		*/
    let playlistInfoElements = document.querySelectorAll(
      "[data-amplitude-playlist-info]"
    );

    /*
			Iterate over all of the playlist info elements. We will either
			set these to the new values, or clear them if the active song
			doesn't have the info set.
		*/
    for (let i = 0; i < playlistInfoElements.length; i++) {
      /*
				Get the info so we can check if the active meta data has the
				key.
			*/
      let info = playlistInfoElements[i].getAttribute(
        "data-amplitude-playlist-info"
      );
      let playlist = playlistInfoElements[i].getAttribute(
        "data-amplitude-playlist"
      );

      if (config.playlists[playlist][info] != undefined) {
        if (imageMetaDataKeys.indexOf(info) >= 0) {
          playlistInfoElements[i].setAttribute(
            "src",
            config.playlists[playlist][info]
          );
        } else {
          playlistInfoElements[i].innerHTML = config.playlists[playlist][info];
        }
      } else {
        /*
					We look for the default album art because
					the actual key didn't exist. If the default album
					art doesn't exist then we set the src attribute
					to null.
				*/
        if (imageMetaDataKeys.indexOf(info) >= 0) {
          if (config.default_playlist_art != "") {
            playlistInfoElements[i].setAttribute(
              "src",
              config.default_playlist_art
            );
          } else {
            playlistInfoElements[i].setAttribute("src", "");
          }
        } else {
          playlistInfoElements[i].innerHTML = "";
        }
      }
    }
  }

  /**
   * Sets the first song in the playlist. This is used to fill in the meta
   * data in the playlist
   *
   * @param {object} song 			- The song we are setting to be the first song in the playlist
   * @param {string} playlist 	- Key of the playlist we are setting the first song in
   */
  function setFirstSongInPlaylist(song, playlist) {
    /*
      Define the image meta data keys. These are managed separately
      since we aren't actually changing the inner HTML of these elements.
    */
    let imageMetaDataKeys = [
      "cover_art_url",
      "station_art_url",
      "podcast_episode_cover_art_url"
    ];

    /*
      Get all of the song info elements
    */
    let songInfoElements = document.querySelectorAll(
      '[data-amplitude-song-info][data-amplitude-playlist="' + playlist + '"]'
    );

    /*
      Iterate over all of the song info elements. We will either
      set these to the new values, or clear them if the active song
      doesn't have the info set.
    */
    for (let i = 0; i < songInfoElements.length; i++) {
      /*
        Get the info so we can check if the active meta data has the
        key.
      */
      let info = songInfoElements[i].getAttribute("data-amplitude-song-info");

      /*
        Get the song info element playlist.
      */
      let elementPlaylist = songInfoElements[i].getAttribute(
        "data-amplitude-playlist"
      );

      /*
        If the playlists match or the element is a main element, then
        we set the song info.
      */
      if (elementPlaylist == playlist) {
        /*
          If the active metadata has the key, then we set it,
          otherwise we clear it. If it's an image element then
          we default it to the default info if needed.
        */
        if (song[info] != undefined) {
          if (imageMetaDataKeys.indexOf(info) >= 0) {
            songInfoElements[i].setAttribute("src", song[info]);
          } else {
            songInfoElements[i].innerHTML = song[info];
          }
        } else {
          /*
            We look for the default album art because
            the actual key didn't exist. If the default album
            art doesn't exist then we set the src attribute
            to null.
          */
          if (imageMetaDataKeys.indexOf(info) >= 0) {
            if (song.default_album_art != "") {
              songInfoElements[i].setAttribute("src", song.default_album_art);
            } else {
              songInfoElements[i].setAttribute("src", "");
            }
          } else {
            songInfoElements[i].innerHTML = "";
          }
        }
      }
    }
  }

  /**
   * Sets the meta data for songs loaded in the songs array
   */
  function syncMetaData() {
    /*
		 Define the image meta data keys. These are managed separately
		 since we aren't actually changing the inner HTML of these elements.
	 */
    let imageMetaDataKeys = [
      "cover_art_url",
      "station_art_url",
      "podcast_episode_cover_art_url"
    ];

    /*
		 Get all of the song info elements
	 */
    let songInfoElements = document.querySelectorAll(
      "[data-amplitude-song-info]"
    );

    /*
		 Iterate over all of the song info elements. We will either
		 set these to the new values, or clear them if the active song
		 doesn't have the info set.
	 */
    for (let i = 0; i < songInfoElements.length; i++) {
      let songIndex = songInfoElements[i].getAttribute(
        "data-amplitude-song-index"
      );
      let playlist = songInfoElements[i].getAttribute(
        "data-amplitude-playlist"
      );

      if (songIndex != null && playlist == null) {
        let info = songInfoElements[i].getAttribute("data-amplitude-song-info");

        /*
         Get the song info value referenced on the element.  Depending on the type of
         element, we may need to fallback to another value when the direct value
         we want isn't found.
         i.e.
            data-amplitude-song-info="cover_art_url" defaults to using the value
            of "default_album_art" when "cover_art_url" is missing on the song.
        */
        let val = config.songs[songIndex][info] != undefined ? config.songs[songIndex][info] : null;
        /*
         If it's an image meta data key, then we set the src attribute of
         the element. Otherwise we set the inner HTML of the element.
        */
        if (imageMetaDataKeys.indexOf(info) >= 0) {
          /*
           If this is an image meta data key and the individual song doesn't
           have the key, use the default_album_art
           */
          val = val || config.default_album_art
          songInfoElements[i].setAttribute(
            "src",
            val
          );
        } else {
          songInfoElements[i].innerHTML = val;
        }
      }

      /*
        If the song index and playlist are not null, continue.
      */
      if (songIndex != null && playlist != null) {
        /*
          Get the info we are displaying.
        */
        let info = songInfoElements[i].getAttribute("data-amplitude-song-info");

        /*
          Set the meta data accordingly.
        */
        if (config.playlists[playlist].songs[songIndex][info] != undefined) {
          if (imageMetaDataKeys.indexOf(info) >= 0) {
            songInfoElements[i].setAttribute(
              "src",
              config.playlists[playlist].songs[songIndex][info]
            );
          } else {
            songInfoElements[i].innerHTML =
              config.playlists[playlist].songs[songIndex][info];
          }
        }
      }
    }

    /*
      Display the playlist meta data.
    */
    displayPlaylistMetaData();
  }

  /**
   * Returns publically facing methods
   */
  return {
    displayMetaData: displayMetaData,
    setFirstSongInPlaylist: setFirstSongInPlaylist,
    syncMetaData: syncMetaData,
    displayPlaylistMetaData: displayPlaylistMetaData
  };
})();

export default MetaDataElements;
