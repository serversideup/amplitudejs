/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Imports the Core Module
 *
 * @module core/Core
 */
import Core from "../core/core.js";

/**
 * Imports the Callbacks Module
 *
 * @module utilities/Callbacks
 */
import Callbacks from "../utilities/callbacks.js";

/**
 * Imports the Checks Module
 *
 * @module utilities/Checks
 */
import Checks from "../utilities/checks.js";

/**
 * Imports the Play Pause Elements Module
 *
 * @module visual/PlayPauseElements
 */
import PlayPauseElements from "../visual/playPauseElements.js";

/**
 * Imports the Song Slider Elements Module
 *
 * @module visual/SongSliderElements
 */
import SongSliderElements from "../visual/songSliderElements.js";

/**
 * Imports the Song Played Progress Elements Module
 *
 * @module visual/SongPlayedProgressElements
 */
import SongPlayedProgressElements from "../visual/songPlayedProgressElements.js";

/**
 * Imports the Time Elements Module
 *
 * @module visual/TimeElements
 */
import TimeElements from "../visual/timeElements.js";

/**
 * Meta Data Elements Module
 *
 * @module visual/MetaDataElements
 */
import MetaDataElements from "../visual/metaDataElements.js";

/**
 * Container Elements Module
 *
 * @module visual/ContainerElements
 */
import ContainerElements from "../visual/containerElements.js";

/**
 * AmplitudeJS Audio Navigation Utility.
 *
 * @module utilities/AudioNavigation
 */
let AudioNavigation = (function() {
  /**
   * Sets the next song
   *
   * @access public
   * @param {boolean} [songEnded=false] If the song ended, this is set to true
   * so we take into effect the repeat setting.
   */
  function setNext(songEnded = false) {
    /*
      Initializes the next index variable. This will be the
      index of the song that is next.
    */
    let nextIndex = null;
    let nextSong = {};

    /*
      Ensure we don't loop in the playlist if config.repeat is not true
    */
    let endOfList = false;

    /*
      Determines if we are repeating the song or not. If we are repeating,
      the next song will be the same song index.
    */
    if (config.repeat_song) {
      /*
        If the playlist is shuffled, get the now playing index.
      */
      if (config.shuffle_on) {
        nextIndex = config.shuffle_list[config.active_index].index;
        nextSong = config.shuffle_list[nextIndex];
      } else {
        nextIndex = config.active_index;
        nextSong = config.songs[nextIndex];
      }
    } else {
      /*
        If the shuffle is on, we use the shuffled list of
        songs to determine our next song.
      */
      if (config.shuffle_on) {
        /*
          If the active shuffle index + 1 is less than the length, then
          we use the next shuffle otherwise we go to the beginning
          of the shuffle list.
        */
        if (parseInt(config.active_index) + 1 < config.shuffle_list.length) {
          /*
            Set the next index to be the index of the song in the shuffle list.
          */
          nextIndex = parseInt(config.active_index) + 1;
        } else {
          nextIndex = 0;
          endOfList = true;
        }

        nextSong = config.shuffle_list[nextIndex];
      } else {
        /*
          If the active index + 1 is less than the length of the songs, then
          we use the next song otherwise we go to the beginning of the
          song list.
        */
        if (parseInt(config.active_index) + 1 < config.songs.length) {
          nextIndex = parseInt(config.active_index) + 1;
        } else {
          nextIndex = 0;
          endOfList = true;
        }

        /*
          Sets the next index.
        */
        nextSong = config.songs[nextIndex];
      }
    }

    /*
      Change the song after the next button has been pressed.
    */
    changeSong(nextSong, nextIndex);

    /*
   		If it's the end of the list and repeat is not on, do nothing.
   	*/
    if (endOfList && !config.repeat) {
    } else {
      /*
   			If the song has ended and repeat is on, play the song.
   		*/
      if (!(songEnded && !config.repeat && endOfList)) {
        Core.play();
      }
    }

    /*
      Sync the play pause elements and run the
      after next callback.
    */
    PlayPauseElements.sync();
    Callbacks.run("next");

    /*
      If we repeated the song, run the repeat song callback.
    */
    if (config.repeat_song) {
      Callbacks.run("song_repeated");
    }
  }

  /**
   * Sets the next song in a playlist
   *
   * @param {string} playlist - The playlist being shuffled
   * @param {boolean} [songEnded=false] - If the song ended, this is set to true
   * so we take into effect the repeat setting.
   */
  function setNextPlaylist(playlist, songEnded = false) {
    /*
      Initializes the next index
    */
    let nextIndex = null;
    let nextSong = {};

    /*
      Ensure we don't loop in the playlist if config.repeat is not true
    */
    let endOfList = false;

    /*
      If we are repeating the song, then we just start the song over.
    */
    if (config.repeat_song) {
      /*
        If the playlist is shuffled, get the now playing index.
      */
      if (config.playlists[playlist].shuffle) {
        nextIndex = config.playlists[playlist].active_index;
        nextSong = config.playlists[playlist].shuffle_list[nextIndex];
      } else {
        nextIndex = config.playlists[playlist].active_index;
        nextSong = config.playlists[playlist].songs[nextIndex];
      }
    } else {
      /*
        If the playlist is shuffled we get the next index of the playlist.
      */
      if (config.playlists[playlist].shuffle) {
        /*
          If the active shuffle index + 1 is less than the length of the shuffle list,
          then we use the next shuffle otherwise we go to the beginning of the shuffle list.
        */
        if (
          parseInt(config.playlists[playlist].active_index) + 1 <
          config.playlists[playlist].shuffle_list.length
        ) {
          /*
            Set the next index to be the index of the song in the shuffle list.
          */
          nextIndex = config.playlists[playlist].active_index + 1;
        } else {
          nextIndex = 0;
          endOfList = true;
        }

        nextSong = config.playlists[playlist].shuffle_list[nextIndex];
      } else {
        /*
          If the active index +1 is less than the length of the songs in the playlist,
          then we use the next song otherwise we go to the beginning of the playlist.
        */
        if (
          parseInt(config.playlists[playlist].active_index) + 1 <
          config.playlists[playlist].songs.length
        ) {
          nextIndex = parseInt(config.playlists[playlist].active_index) + 1;
        } else {
          nextIndex = 0;
          endOfList = true;
        }

        /*
          Sets the next song.
        */
        nextSong = config.playlists[playlist].songs[nextIndex];
      }
    }

    /*
      Sets the active playlist to the playlist we are on.
    */
    setActivePlaylist(playlist);

    /*
      Change the song within the playlist.
    */
    changeSongPlaylist(playlist, nextSong, nextIndex);

    /*
      If it's the end of the playlist and we aren't repeating, do nothing.
    */
    if (endOfList && !config.repeat) {
    } else {
      if (!(songEnded && !config.repeat && endOfList)) {
        Core.play();
      }
    }

    /*
      Sync the play pause buttons.
    */
    PlayPauseElements.sync();
    Callbacks.run("next");

    /*
      Repeat the song.
    */
    if (config.repeat_song) {
      Callbacks.run("song_repeated");
    }
  }

  /**
   * Sets the previous song on the global songs array.
   *
   * @access private
   */
  function setPrevious() {
    /*
      Initializes the previous index
    */
    let previousIndex = null;
    let previousSong = {};

    /*
      If we are repeating the song, then we just start the song over.
    */
    if (config.repeat_song) {
      /*
        If the config is shuffled, get the now playing index.
      */
      if (config.shuffle_on) {
        previousIndex = config.active_index;
        previousSong = config.shuffle_list[previousIndex];
      } else {
        previousIndex = config.active_index;
        previousSong = config.songs[previousIndex];
      }
    } else {
      /*
        Get the previous index. If the previous index will be less than 0, get the
        last song of the array and continue.
      */
      if (parseInt(config.active_index) - 1 >= 0) {
        previousIndex = parseInt(config.active_index - 1);
      } else {
        previousIndex = parseInt(config.songs.length - 1);
      }

      /*
        If the config is shuffled, we grab the song from the shuffle list
      */
      if (config.shuffle_on) {
        /*
          Grab song from the shuffle list
        */
        previousSong = config.shuffle_list[previousIndex];
      } else {
        /*
          Grab song from the songs array
        */
        previousSong = config.songs[previousIndex];
      }
    }
    /*
      Change the song after the next button has been pressed.
    */
    changeSong(previousSong, previousIndex);

    /*
      Play the newest song.
    */
    Core.play();

    /*
      Sync the play pause elements and run the
      after next callback.
    */
    PlayPauseElements.sync();
    Callbacks.run("prev");

    /*
      If we repeated the song, run the repeat song callback.
    */
    if (config.repeat_song) {
      Callbacks.run("song_repeated");
    }
  }

  /**
   * Sets the previous playlist song.
   *
   * @access private
   *
   * @prop {string} playlist  - The playlist we are navigating in.
   */
  function setPreviousPlaylist(playlist) {
    /*
      Initializes the previous index
    */
    let previousIndex = null;
    let previousSong = {};

    /*
      If we are repeating the song, then we just start the song over.
    */
    if (config.repeat_song) {
      /*
        If the playlist is shuffled, get the now playing index.
      */
      if (config.playlists[playlist].shuffle) {
        previousIndex = config.playlists[playlist].active_index;
        previousSong = config.playlists[playlist].shuffle_list[previousIndex];
      } else {
        previousIndex = config.playlists[playlist].active_index;
        previousSong = config.playlists[playlist].songs[previousIndex];
      }
    } else {
      /*
        Get the previous index. If the previous index will be less than 0, get the
        last song of the array and continue.
      */
      if (parseInt(config.playlists[playlist].active_index) - 1 >= 0) {
        previousIndex = parseInt(config.playlists[playlist].active_index - 1);
      } else {
        previousIndex = parseInt(config.playlists[playlist].songs.length - 1);
      }

      /*
        If the playlist is shuffled, we grab the song from the shuffle list
      */
      if (config.playlists[playlist].shuffle) {
        /*
          Grab song from the shuffle list
        */
        previousSong = config.playlists[playlist].shuffle_list[previousIndex];
      } else {
        /*
          Grab song from the songs array
        */
        previousSong = config.playlists[playlist].songs[previousIndex];
      }
    }

    /*
      Sets the active playlist to the playlist we are on.
    */
    setActivePlaylist(playlist);

    /*
      Change the song within the playlist.
    */
    changeSongPlaylist(playlist, previousSong, previousIndex);

    /*
      Plays the song
    */
    Core.play();

    /*
      Sync the play pause buttons.
    */
    PlayPauseElements.sync();
    Callbacks.run("prev");

    /*
      Repeat the song.
    */
    if (config.repeat_song) {
      Callbacks.run("song_repeated");
    }
  }

  /**
   * Change song in the songs array.
   *
   * @access private
   * @prop {object} song  - The song we are changing to.
   * @prop {number} index - The index we are changing to.
   * @prop {boolean} direct - Determines if it was a direct click on the song.
   * We then don't care if shuffle is on or not.
   */
  function changeSong(song, index, direct = false) {
    /*
      Prepare the song change.
    */
    prepareSongChange(song);

    /*
      Change the song.
    */
    config.audio.src = song.url;
    config.active_metadata = song;
    config.active_album = song.album;

    config.active_index = parseInt(index);

    /*
      Set new information now that the song has changed.
    */
    afterSongChange(direct);
  }

  /**
   * Handles a song change in the playlist
   *
   * @access private
   * @prop {string} playlist - The playlist we are changing the song on.
   * @prop {object} song     - The song we are changing to in the playlist.
   * @prop {number} index    - The inded of the song we are changing to in the playlist.
   * @prop {boolean} direct  - Determines if it was a direct click on the song. We
   * then don't care if shuffle is on or not
   */
  function changeSongPlaylist(playlist, song, index, direct = false) {
    /*
      Prepare the song change.
    */
    prepareSongChange(song);

    /*
      Change the song.
    */
    config.audio.src = song.url;
    config.active_metadata = song;
    config.active_album = song.album;
    config.active_index = null;

    config.playlists[playlist].active_index = parseInt(index);

    /*
      Set new information now that the song has changed.
    */
    afterSongChange(direct);
  }

  /**
   *  Prepares a song change
   *
   * @access private
   * @prop {object} song  - The song we change to.
   */
  function prepareSongChange(song) {
    /*
      Stop the current song.
    */
    Core.stop();

    /*
      Sync all of the elements to a stopped song.
    */
    PlayPauseElements.syncToPause();
    SongSliderElements.resetElements();
    SongPlayedProgressElements.resetElements();
    TimeElements.resetCurrentTimes();

    /*
      If an album changes, fire an album change.
    */
    if (Checks.newAlbum(song)) {
      Callbacks.run("album_change");
    }
  }

  /**
   * Updates data on the display after a song has changed.
   *
   * @prop {boolean} direct - Determines if it was a direct click on the song.
   * We then don't care if shuffle is on or not.
   *
   * @access private
   */
  function afterSongChange(direct) {
    MetaDataElements.displayMetaData();
    ContainerElements.setActive(direct);
    TimeElements.resetDurationTimes();

    /*
      Run the song change callback.
    */
    Callbacks.run("song_change");
  }

  /**
   * Sets the active playlist
   *
   * @access public
   * @param {string} playlist - The string of the playlist being set to active.
   */
  function setActivePlaylist(playlist) {
    /*
      If the active playlist is different than the playlist being set,
      we run the `playlist_changed` callback.
    */
    if (config.active_playlist != playlist) {
      Callbacks.run("playlist_changed");
      /*
        Set the active playlist to the playlist parameter. Only need to
        set if it's different.
      */
      config.active_playlist = playlist;

      if (playlist != null) {
        config.playlists[playlist].active_index = 0;
      }
    }
  }

  /*
    Return the publically facing methods
  */
  return {
    setNext: setNext,
    setNextPlaylist: setNextPlaylist,
    setPrevious: setPrevious,
    setPreviousPlaylist: setPreviousPlaylist,
    changeSong: changeSong,
    changeSongPlaylist: changeSongPlaylist,
    setActivePlaylist: setActivePlaylist
  };
})();

export default AudioNavigation;
