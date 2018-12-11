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
   * @access public
   */
  function setActive() {
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
      if (
        document.querySelectorAll(
          '.amplitude-song-container[data-amplitude-song-index="' +
            config.active_index +
            '"]'
        )
      ) {
        let songContainers = document.querySelectorAll(
          '.amplitude-song-container[data-amplitude-song-index="' +
            config.active_index +
            '"]'
        );

        for (let i = 0; i < songContainers.length; i++) {
          if (!songContainers[i].hasAttribute("data-amplitude-playlist")) {
            songContainers[i].classList.add("amplitude-active-song-container");
          }
        }
      }
    } else {
      let activePlaylistIndex =
        config.active_playlist != null && config.active_playlist != ""
          ? config.playlists[config.active_playlist].active_index
          : null;

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
