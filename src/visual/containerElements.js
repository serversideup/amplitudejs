/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Handles all of the container elements.
 *
 * @param visual/ContainerElements
 */
let ContainerElements = (function() {
  /**
   * Applies the class 'amplitude-active-song-container' to the element
   * containing visual information regarding the active song.
   *
   * @prop {boolean} direct - Determines if it was a direct click on the song. We
   * then don't care if shuffle is on or not.
   *
   * @access public
   */
  function setActive(direct) {
    /*
      Gets all of the song container elements.
    */
    let songContainers = document.getElementsByClassName(
      "amplitude-song-container"
    );

    /*
			Removes all of the active song containrs.
		*/
    for (let i = 0; i < songContainers.length; i++) {
      songContainers[i].classList.remove("amplitude-active-song-container");
    }

    /*
			Finds the active index and adds the active song container to the element
			that represents the song at the index.
		*/
    if (config.active_playlist == "" || config.active_playlist == null) {
      let activeIndex = "";

      /*
        If we click directly on the song element, we ignore
        whether it's in shuffle or not.
      */
      if (direct) {
        activeIndex = config.active_index;
      } else {
        if (config.shuffle_on) {
          activeIndex = config.shuffle_list[config.active_index].index;
        } else {
          activeIndex = config.active_index;
        }
      }

      if (
        document.querySelectorAll(
          '.amplitude-song-container[data-amplitude-song-index="' +
            activeIndex +
            '"]'
        )
      ) {
        let songContainers = document.querySelectorAll(
          '.amplitude-song-container[data-amplitude-song-index="' +
            activeIndex +
            '"]'
        );

        for (let i = 0; i < songContainers.length; i++) {
          if (!songContainers[i].hasAttribute("data-amplitude-playlist")) {
            songContainers[i].classList.add("amplitude-active-song-container");
          }
        }
      }
    } else {
      /*
        If we have an active playlist or the action took place directly on the
        song element, we ignore the shuffle.
      */
      if (
        (config.active_playlist != null && config.active_playlist != "") ||
        direct
      ) {
        var activePlaylistIndex =
          config.playlists[config.active_playlist].active_index;
      } else {
        var activePlaylistIndex = "";

        if (config.playlists[config.active_playlist].shuffle) {
          activePlaylistIndex =
            config.playlists[config.active_playlist].shuffle_list[
              config.playlists[config.active_playlist].active_index
            ].index;
        } else {
          activePlaylistIndex =
            config.playlists[config.active_playlist].active_index;
        }
      }

      if (
        document.querySelectorAll(
          '.amplitude-song-container[data-amplitude-song-index="' +
            activePlaylistIndex +
            '"][data-amplitude-playlist="' +
            config.active_playlist +
            '"]'
        )
      ) {
        let songContainers = document.querySelectorAll(
          '.amplitude-song-container[data-amplitude-song-index="' +
            activePlaylistIndex +
            '"][data-amplitude-playlist="' +
            config.active_playlist +
            '"]'
        );

        for (let i = 0; i < songContainers.length; i++) {
          songContainers[i].classList.add("amplitude-active-song-container");
        }
      }
    }
  }

  return {
    setActive: setActive
  };
})();

export default ContainerElements;
