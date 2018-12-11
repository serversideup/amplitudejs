/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Defines the visual representation of AmplitudeJS play pause elements.
 * @module visual/PlayPauseElements
 */
let PlayPauseElements = (function() {
  /**
   * Syncs all play pause elements.
   *
   * @access public
   */
  function sync() {
    syncGlobal();
    syncPlaylist();
    syncSong();
    syncSongInPlaylist();
  }

  /**
   * Syncs the global play pause buttons to the state of the active song.
   *
   * @access public
   */
  function syncGlobal() {
    /*
      Get the active song state.
    */
    let state = config.audio.paused ? "paused" : "playing";

    /*
      Get all play pause buttons.
    */
    const playPauseElements = document.querySelectorAll(
      ".amplitude-play-pause"
    );

    /*
      Iterate over all of the play pause elements syncing the
      display visually.
    */
    for (let i = 0; i < playPauseElements.length; i++) {
      /*
        Grab the playlist and song attributes from the element.
      */
      let playlist = playPauseElements[i].getAttribute(
        "data-amplitude-playlist"
      );
      let song = playPauseElements[i].getAttribute("data-amplitude-song-index");

      /*
        This method is responsible for only the global elements,
        so we make sure there are no playlist or songs defined on
        the element.
      */
      if (playlist == null && song == null) {
        /*
          Determines what classes we should add and remove
          from the elements.
        */
        switch (state) {
          case "playing":
            setElementPlay(playPauseElements[i]);
            break;
          case "paused":
            setElementPause(playPauseElements[i]);
            break;
        }
      }
    }
  }

  /**
   * Syncs the main playlist play pause buttons to the state of the active song.
   *
   * @access public
   */
  function syncPlaylist() {
    let state = config.audio.paused ? "paused" : "playing";

    /*
      Get all of the main playlist play pause elements
    */
    const playlistPlayPauseElements = document.querySelectorAll(
      '.amplitude-play-pause[data-amplitude-playlist="' +
        config.active_playlist +
        '"]'
    );

    /*
      Iterate over the play pause elements, syncing the state accordingly.
    */
    for (let i = 0; i < playlistPlayPauseElements.length; i++) {
      /*
        Grab the song attributes from the element.
      */
      let song = playlistPlayPauseElements[i].getAttribute(
        "data-amplitude-song-index"
      );

      /*
        We want only the play pause elements for the main on a
        playlist nothing else. We have another method for the
        song in playlist play pause method.
      */
      if (song == null) {
        /*
          Determines what classes we should add and remove
          from the elements.
        */
        switch (state) {
          case "playing":
            setElementPlay(playlistPlayPauseElements[i]);
            break;
          case "paused":
            setElementPause(playlistPlayPauseElements[i]);
            break;
        }
      }
    }
  }

  /**
   * Syncs the song play pause buttons to the state of the active song.
   *
   * @access public
   */
  function syncSong() {
    let state = config.audio.paused ? "paused" : "playing";

    /*
      Get all of the individual song play pause buttons. These have an
      amplitude-song-index that matches the active index attribute.
    */
    let songPlayPauseElements = document.querySelectorAll(
      '.amplitude-play-pause[data-amplitude-song-index="' +
        config.active_index +
        '"]'
    );

    /*
      Iterate over all of the song play pause elements
    */
    for (let i = 0; i < songPlayPauseElements.length; i++) {
      /*
        Grab the playlist attributes from the element.
      */
      let playlist = songPlayPauseElements[i].getAttribute(
        "data-amplitude-playlist"
      );

      /*
        We want only the song play pause buttons, not ones scoped in a playlist.
      */
      if (playlist == null) {
        /*
          Determines what classes we should add and remove
          from the elements.
        */
        switch (state) {
          case "playing":
            setElementPlay(songPlayPauseElements[i]);
            break;
          case "paused":
            setElementPause(songPlayPauseElements[i]);
            break;
        }
      }
    }
  }

  /**
   * Syncs the song in playlist play pause buttons to the state of
   * the active song.
   *
   * @access public
   */
  function syncSongInPlaylist() {
    let state = config.audio.paused ? "paused" : "playing";

    let activePlaylistIndex =
      config.active_playlist != "" && config.active_playlist != null
        ? config.playlists[config.active_playlist].active_index
        : null;

    /*
      Get all of the individual song play pause buttons. These have an
      amplitude-song-index attribute. Some have amplitude-playlist which
      means they are individual songs within a playlist.
    */
    let songInPlaylistPlayPauseElements = document.querySelectorAll(
      '.amplitude-play-pause[data-amplitude-song-index="' +
        activePlaylistIndex +
        '"][data-amplitude-playlist="' +
        config.active_playlist +
        '"]'
    );

    /*
      Iterate over all of the individual play pause elements for songs inspect
      a playlist.
    */
    for (let i = 0; i < songInPlaylistPlayPauseElements.length; i++) {
      /*
        Determines what classes we should add and remove
        from the elements.
      */
      switch (state) {
        case "playing":
          setElementPlay(songInPlaylistPlayPauseElements[i]);
          break;
        case "paused":
          setElementPause(songInPlaylistPlayPauseElements[i]);
          break;
      }
    }
  }

  /**
   * Sets all of the play pause buttons to paused.
   *
   * @access public
   */
  function syncToPause() {
    /*
      Gets all of the play pause elements
    */
    let playPauseElements = document.querySelectorAll(".amplitude-play-pause");

    /*
      Sets all of the elements to pause
    */
    for (let i = 0; i < playPauseElements.length; i++) {
      setElementPause(playPauseElements[i]);
    }
  }

  /**
   * Sets an element to be playing by removing the 'amplitude-paused' class
   * and adding the 'amplitude-playing' class
   *
   * @access public
   * @param {element} element 	- The element getting the playing class added.
   */
  function setElementPlay(element) {
    element.classList.add("amplitude-playing");
    element.classList.remove("amplitude-paused");
  }

  /**
   * Sets an element to be paused by adding the 'amplitude-paused' class
   * and removing the 'amplitude-playing' class
   *
   * @access public
   * @param {element} element 	- The element getting the paused class added.
   */
  function setElementPause(element) {
    element.classList.remove("amplitude-playing");
    element.classList.add("amplitude-paused");
  }

  /**
   * Returns the public facing methods
   */
  return {
    sync: sync,
    syncGlobal: syncGlobal,
    syncPlaylist: syncPlaylist,
    syncSong: syncSong,
    syncSongInPlaylist: syncSongInPlaylist,
    syncToPause: syncToPause
  };
})();

export default PlayPauseElements;
