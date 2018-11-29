/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Imports the debug module
 * @module utilities/Debug
 */
import Debug from "../utilities/debug.js";

/**
 * Handles the visualizations elements.
 *
 * @module Visualizations
 */
let Visualizations = (function() {
  /**
   * Runs all of the visualizations on the screen.
   */
  function run() {
    /*
      Get all of the visualization elements on the page
    */
    let visualizationElements = document.querySelectorAll(
      ".amplitude-visualization"
    );

    /*
      If the web audio API is available, we display the visualizations.
    */
    if (config.web_audio_api_available) {
      /*
        If the visualization has not started, there are visualizations available,
        and we have at least one visualization element, then we continue.
      */
      if (
        Object.keys(config.visualizations.available).length > 0 &&
        visualizationElements.length > 0
      ) {
        /*
            Iterate over all of the visualizations on the page and activate the
            ones we need.
          */
        for (let i = 0; i < visualizationElements.length; i++) {
          /*
              Grab the playlist and song attributes from the visualization to
              determine which one we run.
            */
          let playlist = visualizationElements[i].getAttribute(
            "data-amplitude-playlist"
          );
          let song = visualizationElements[i].getAttribute(
            "data-amplitude-song-index"
          );

          /*
              If the playlist and song are null, it's a global visualization element.
            */
          if (playlist == null && song == null) {
            runGlobalVisualization(visualizationElements[i]);
          }

          /*
              if the playlist is not null and the song is null it's a playlist visualization
              element.
            */
          if (playlist != null && song == null) {
            runPlaylistVisualization(visualizationElements[i], playlist);
          }

          /*
              If the playlist is null and the song is not null it's a song visualization element.
            */
          if (playlist == null && song != null) {
            runSongVisualization(visualizationElements[i], song);
          }

          /*
              If the playlist and song are not null then it's a song in playlist visualization
              element.
            */
          if (playlist != null && song != null) {
            runSongInPlaylistVisualization(
              visualizationElements[i],
              playlist,
              song
            );
          }
        }
      }
    } else {
      displayBackups();
    }
  }

  /**
   * Runs a global visualization
   *
   * @param {Node} element  The container element that handles the visualization.
   */
  function runGlobalVisualization(element) {
    /*
      Gets the global visualization index and the active song visualization indexes
      so we know which visualization to use. The song will override the global
    */
    let globalVisualizationIndex = config.visualization;
    let activeSongVisualizationIndex =
      config.active_index != null
        ? config.songs[config.active_index].visualization
        : config.playlists[config.active_playlist].songs[
            config.playlists[config.active_playlist].active_index
          ].visualization;

    /*
      If the active song visualization is defined and the visualization exists,
      use that visualization.
    */
    if (
      activeSongVisualizationIndex != undefined &&
      config.visualizations.available[activeSongVisualizationIndex] != undefined
    ) {
      addToActiveVisualizations(activeSongVisualizationIndex, element);

      /*
      If the user defined a global visualization, use that one.
    */
    } else if (
      globalVisualizationIndex != undefined &&
      config.visualizations.available[globalVisualizationIndex] != undefined
    ) {
      addToActiveVisualizations(globalVisualizationIndex, element);

      /*
      If the user didn't define a global visualization, use the first visualization
      registered if there is one.
    */
    } else {
      /*
        Grab the first registered visualization. If it exists, use that one.
      */
      let firstVisualization =
        Object.keys(config.visualizations.available).length > 0
          ? Object.keys(config.visualizations.available)[0]
          : null;

      if (firstVisualization != null) {
        addToActiveVisualizations(firstVisualization, element);
      }
    }
  }

  /**
   * Run a specific playlist visualization.
   *
   * @param {Node} element  The container element that handles the visualization.
   * @param {string} playlist The key of the playlist we are running the visualization for.
   */
  function runPlaylistVisualization(element, playlist) {
    /*
      If the playlist is equal to the active playlist, then we continue.
    */
    if (playlist == config.active_playlist) {
      /*
        Checks if the song has a visualization and that visualization exists,
        run that visualization.
      */
      let activeSongVisualizationIndex =
        config.playlists[config.active_playlist].songs[
          config.playlists[config.active_playlist].active_index
        ].visualization;
      let activePlaylistVisualizationIndex =
        config.playlists[config.active_playlist].visualization;
      let globalVisualizationIndex = config.visualization;

      /*
        If the actual song has a visualization, we run that.
      */
      if (
        activeSongVisualizationIndex != undefined &&
        config.visualizations.available[activeSongVisualizationIndex] !=
          undefined
      ) {
        addToActiveVisualizations(activeSongVisualizationIndex, element);

        /*
        If the actual playlist has a visualization, run that.
      */
      } else if (
        activePlaylistVisualizationIndex != undefined &&
        config.visualizations.available[activePlaylistVisualizationIndex] !=
          undefined
      ) {
        addToActiveVisualizations(activePlaylistVisualizationIndex, element);

        /*
        If a global visualization is defined, run that.
      */
      } else if (
        globalVisualizationIndex != undefined &&
        config.visualizations.available[globalVisualizationIndex] != undefined
      ) {
        addToActiveVisualizations(globalVisualizationIndex, element);
      } else {
        /*
          Grab the first registered visualization. If it exists, use that one.
        */
        let firstVisualization =
          Object.keys(config.visualizations.available).length > 0
            ? Object.keys(config.visualizations.available)[0]
            : null;

        if (firstVisualization != null) {
          addToActiveVisualizations(firstVisualization, element);
        }
      }
    }
  }

  /**
   * Run a song specific visualization.
   *
   * @param {Node} element The container element that handles the visualization.
   * @param {string} song The song index that we are running the visualization for.
   */
  function runSongVisualization(element, song) {
    /*
      If the song is equal to the active song, then we continue.
    */
    if (song == config.active_index) {
      /*
        Get the indexes of the song
      */
      let activeSongVisualizationIndex =
        config.songs[config.active_index].visualization;
      let globalVisualizationIndex = config.visualization;

      /*
        If the song has a visualization, run that.
      */
      if (
        activeSongVisualizationIndex != undefined &&
        config.visualizations.available[activeSongVisualizationIndex] !=
          undefined
      ) {
        addToActiveVisualizations(activeSongVisualizationIndex, element);

        /*
        If the global visualization is set, use that.
      */
      } else if (
        globalVisualizationIndex != undefined &&
        config.visualizations.available[globalVisualizationIndex] != undefined
      ) {
        addToActiveVisualizations(globalVisualizationIndex, element);
      } else {
        /*
          Grab the first registered visualization. If it exists, use that one.
        */
        let firstVisualization =
          Object.keys(config.visualizations.available).length > 0
            ? Object.keys(config.visualizations.available)[0]
            : null;

        if (firstVisualization != null) {
          addToActiveVisualizations(firstVisualization, element);
        }
      }
    }
  }

  /**
   * Run a song in playlist visualization.
   *
   * @param {Node} element - The element containing the visualization.
   * @param {string} playlist - The string of the playlist key.
   * @param {index} song - The index of the song in the playlist.
   */
  function runSongInPlaylistVisualization(element, playlist, song) {
    /*
      If the playlist is the same as the active playlist and the active
      index of the song is the same as the song, then we continue.
    */
    if (
      playlist == config.active_playlist &&
      config.playlists[playlist].active_index == song
    ) {
      /*
        Checks if the song has a visualization and that visualization exists,
        run that visualization.
      */
      let activeSongVisualizationIndex =
        config.playlists[config.active_playlist].songs[
          config.playlists[config.active_playlist].active_index
        ].visualization;
      let activePlaylistVisualizationIndex =
        config.playlists[config.active_playlist].visualization;
      let globalVisualizationIndex = config.visualization;

      /*
        If the active song has a visualization, we use that.
      */
      if (
        activeSongVisualizationIndex != undefined &&
        config.visualizations.available[activeSongVisualizationIndex] !=
          undefined
      ) {
        addToActiveVisualizations(activeSongVisualizationIndex, element);

        /*
        If the active playlist has a visualization, we use that.
      */
      } else if (
        activePlaylistVisualizationIndex != undefined &&
        config.visualizations.available[activePlaylistVisualizationIndex] !=
          undefined
      ) {
        addToActiveVisualizations(activePlaylistVisualizationIndex, element);

        /*
        If the global visualization has been set, we use that.
      */
      } else if (
        globalVisualizationIndex != undefined &&
        config.visualizations.available[globalVisualizationIndex] != undefined
      ) {
        addToActiveVisualizations(globalVisualizationIndex, element);
      } else {
        /*
          Grab the first registered visualization. If it exists, use that one.
        */
        let firstVisualization =
          Object.keys(config.visualizations.available).length > 0
            ? Object.keys(config.visualizations.available)[0]
            : null;

        if (firstVisualization != null) {
          addToActiveVisualizations(firstVisualization, element);
        }
      }
    }
  }

  /**
   * Add a visualization to the array of active visualizations.
   *
   * @param {string} key - The key of the active visualization.
   * @param {Node} element - The element that the visualization will be applied to.
   */
  function addToActiveVisualizations(key, element) {
    let visualization = new config.visualizations.available[key]["object"]();
    visualization.setPreferences(
      config.visualizations.available[key]["preferences"]
    );
    visualization.startVisualization(element);
    config.visualizations.active.push(visualization);
  }

  /**
   * Stops all active visualizations.
   */
  function stop() {
    /*
      Iterates over all of the visualizations and stop the visualization.
    */
    for (let i = 0; i < config.visualizations.active.length; i++) {
      config.visualizations.active[i].stopVisualization();
    }

    /*
      Clear the active visualizations.
    */
    config.visualizations.active = [];
  }

  /**
   * Registers any visualization we can use.
   *
   * @param {object} visualization The visualization object itself
   * @param {object} preferences User preferences overrides.
   */
  function register(visualization, preferences) {
    /*
      Initialize the new visualization.
    */
    let newVisualization = new visualization();

    /*
	    Adds the visualization to the global config so it knows
	    it can be used when playing songs.

	    getID is a public function for getting a visualization's id.
	    It becomes the key to access the visualization.
	  */
    config.visualizations.available[newVisualization.getID()] = new Array();
    config.visualizations.available[newVisualization.getID()][
      "object"
    ] = visualization;
    config.visualizations.available[newVisualization.getID()][
      "preferences"
    ] = preferences;
  }

  /**
   * Displays the backups for the visualizations.
   */
  function displayBackups() {
    /*
      Get all of the visualization elements on the page
    */
    let visualizationElements = document.querySelectorAll(
      ".amplitude-visualization"
    );

    if (visualizationElements.length > 0) {
      for (let x = 0; x < visualizationElements.length; x++) {
        /*
          Grab the playlist and song attributes from the visualization to
          determine which one we run.
        */
        let playlist = visualizationElements[x].getAttribute(
          "data-amplitude-playlist"
        );
        let song = visualizationElements[x].getAttribute(
          "data-amplitude-song-index"
        );

        /*
          If the playlist and song are null, it's a global visualization element.
        */
        if (playlist == null && song == null) {
          displayGlobalBackup(visualizationElements[x]);
        }

        /*
          if the playlist is not null and the song is null it's a playlist visualization
          element.
        */
        if (playlist != null && song == null) {
          displayPlaylistBackup(visualizationElements[x], playlist);
        }

        /*
          If the playlist is null and the song is not null it's a song visualization element.
        */
        if (playlist == null && song != null) {
          displaySongBackup(visualizationElements[x], song);
        }

        /*
          If the playlist and song are not null then it's a song in playlist visualization
          element.
        */
        if (playlist != null && song != null) {
          displaySongInPlaylistBackup(visualizationElements[x], playlist, song);
        }
      }
    }
  }

  /**
   * Displays the global backup which is the cover art of the image in the
   * visualization container.
   *
   * @param {node} element  - The element we are adding the background image to.
   */
  function displayGlobalBackup(element) {
    element.style.backgroundImage =
      "url(" + config.active_metadata.cover_art_url + ")";
  }

  /**
   * Displays the playlist backup which is the cover art of the image in the
   * visualization container.
   *
   * @param {node} element  - The element we are adding the background image to.
   */
  function displayPlaylistBackup(element, playlist) {
    if (config.active_playlist == playlist) {
      element.style.backgroundImage =
        "url(" + config.active_metadata.cover_art_url + ")";
    }
  }

  /**
   * Displays the song backup which is the cover art of the image in the
   * visualization container.
   *
   * @param {node} element  - The element we are adding the background image to.
   */
  function displaySongBackup(element, song) {
    if (config.active_index == song) {
      element.style.backgroundImage =
        "url(" + config.active_metadata.cover_art_url + ")";
    }
  }

  /**
   * Displays the song in playlist backup which is the cover art of the image in the
   * visualization container.
   *
   * @param {node} element  - The element we are adding the background image to.
   */
  function displaySongInPlaylistBackup(element, playlist, song) {
    if (
      config.active_playlist == playlist &&
      config.playlists[active_playlist].active_index == song
    ) {
      element.style.backgroundImage =
        "url(" + config.active_metadata.cover_art_url + ")";
    }
  }

  /*
    Returns the public facing methods
  */
  return {
    run: run,
    stop: stop,
    register: register
  };
})();

export default Visualizations;
