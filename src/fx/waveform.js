/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Builds a waveform for the current audio.
 * Help from: https://robots.thoughtbot.com/javascript-audio-api
 * https://stackoverflow.com/questions/21347833/html-svg-not-drawing-works-in-other-pages
 */
let WaveForm = (function() {
  /*
    Initialize the local variables used in the Waveform.
  */
  let buffer = "";
  let sampleRate = "";
  let peaks = "";

  function init() {
    sampleRate = config.waveforms.sample_rate;

    /*
      Grabs all of the waveform elements on the page.
    */
    let waveforms = document.querySelectorAll(".amplitude-wave-form");

    /*
      If there are waveforms, we iterate over them and set them up to display
      properly.
    */
    if (waveforms.length > 0) {
      /*
        Iterate over all of the waveforms and build the SVG parts.
      */
      for (let i = 0; i < waveforms.length; i++) {
        /*
          Clear the inner HTML of the element if we are replacing the waveform.
        */
        waveforms[i].innerHTML = "";

        /*
          Inserts an SVG into the element.
        */
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 -1 " + sampleRate + " 2");
        svg.setAttribute("preserveAspectRatio", "none");

        /*
          Add a g component to the SVG
        */
        let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        svg.appendChild(g);

        /*
          Add a path component to the g
        */
        let path = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        path.setAttribute("d", "");
        path.setAttribute("id", "waveform");

        g.appendChild(path);

        /*
          Append the SVG to the waveform.
        */
        waveforms[i].appendChild(svg);
      }
    }
  }

  /**
   * Builds each waveform for the page.
   */
  function build() {
    if (config.web_audio_api_available) {
      /*
        If we don't have the wave form built, we need to build the waveform by loading
        the src with an array buffer.
      */
      if (
        config.waveforms.built[
          Math.abs(
            config.audio.src.split("").reduce(function(a, b) {
              a = (a << 5) - a + b.charCodeAt(0);
              return a & a;
            }, 0)
          )
        ] == undefined
      ) {
        /*
          Initializes a new XML Http Request.
        */
        var req = new XMLHttpRequest();

        /*
          Opens the src parameter for the audio file to read in.
        */
        req.open("GET", config.audio.src, true);
        req.responseType = "arraybuffer";

        /*
          When the ready state changes, check to see if we can render the
          wave form.
        */
        req.onreadystatechange = function(e) {
          /*
            When the request is complete, then we begin decoding the
            audio to build the waveform.
          */
          if (req.readyState == 4) {
            /*
              If the status is 200 means the response is a success and
              we decode the audio data.
            */
            if (req.status == 200) {
              /*
                Decode the audio data and process the waveform.
              */
              config.context.decodeAudioData(req.response, function(
                bufferedAudio
              ) {
                /*
                  Set the buffer to the audio returned.
                */
                buffer = bufferedAudio;

                /*
                  Get the peaks in the audio.
                */
                peaks = getPeaks(sampleRate, buffer);

                /*
                  Build the SVG
                */
                process(sampleRate, buffer, peaks);
              });
            }
          }
        };
        req.send();
      } else {
        /*
          If we already have a waveform, we grab the waveform that
          was created for the song and display it. We do a simple hash
          of the song URL so it's already unique.
        */
        displayWaveForms(
          config.waveforms.built[
            Math.abs(
              config.audio.src.split("").reduce(function(a, b) {
                a = (a << 5) - a + b.charCodeAt(0);
                return a & a;
              }, 0)
            )
          ]
        );
      }
    }
  }

  /**
   * Processes the audio and generates the waveform.
   *
   * @param {sampleRate} sampleRate - The rate we should sample the audio.
   * @param {arraybuffer} buffer - The Web Audio API
   * @param {array} peaks - The peaks in the audio.
   */
  function process(sampleRate, buffer, peaks) {
    /*
      If we have a buffer, we find the peaks in the audio.
    */
    if (buffer) {
      /*
        Get the total peaks in the song.
      */
      let totalPeaks = peaks.length;

      /*
        Figure out the depth of the peak.
      */
      let d = "";
      for (let peakNumber = 0; peakNumber < totalPeaks; peakNumber++) {
        if (peakNumber % 2 === 0) {
          d += ` M${~~(peakNumber / 2)}, ${peaks.shift()}`;
        } else {
          d += ` L${~~(peakNumber / 2)}, ${peaks.shift()}`;
        }
      }

      /*
        Add the waveform to the built waveforms array.
      */
      config.waveforms.built[
        Math.abs(
          config.audio.src.split("").reduce(function(a, b) {
            a = (a << 5) - a + b.charCodeAt(0);
            return a & a;
          }, 0)
        )
      ] = d;

      /*
        Display the waveform.
      */
      displayWaveForms(
        config.waveforms.built[
          Math.abs(
            config.audio.src.split("").reduce(function(a, b) {
              a = (a << 5) - a + b.charCodeAt(0);
              return a & a;
            }, 0)
          )
        ]
      );
    }
  }

  /**
   * Get the peaks of the audio for the waveform.
   *
   * @param {number} length - The sample size of the audio.
   * @param {array} buffer - The array buffer used to find the peaks in the audio.
   */
  function getPeaks(length, buffer) {
    /*
      Set the parameters needed to build the SVG.
    */
    const sampleSize = buffer.length / length;
    const sampleStep = ~~(sampleSize / 10) || 1;
    const numberOfChannels = buffer.numberOfChannels;
    const mergedPeaks = [];

    /*
      Iterate over the channels and find the peaks.
    */
    for (
      let channelNumber = 0;
      channelNumber < numberOfChannels;
      channelNumber++
    ) {
      /*
        Initialize the peaks array and set the channel data to what
        the buffer has in its channel data.
      */
      const peaks = [];
      const channelData = buffer.getChannelData(channelNumber);

      /*
        Iterate over peaks with respect to the sample size.
      */
      for (let peakNumber = 0; peakNumber < length; peakNumber++) {
        /*
          Gt the start and end peak.
        */
        const start = ~~(peakNumber * sampleSize);
        const end = ~~(start + sampleSize);

        /*
          Set min and max to the channel data first peak.
        */
        let min = channelData[0];
        let max = channelData[0];

        /*
          Iterate over the parts of the song starting to the
          ending to display the waveform.
        */
        for (
          let sampleIndex = start;
          sampleIndex < end;
          sampleIndex += sampleStep
        ) {
          const value = channelData[sampleIndex];

          if (value > max) {
            max = value;
          }
          if (value < min) {
            min = value;
          }
        }

        /*
          Set the max and min for the peak.
        */
        peaks[2 * peakNumber] = max;
        peaks[2 * peakNumber + 1] = min;

        /*
          Merge the peaks
        */
        if (channelNumber === 0 || max > mergedPeaks[2 * peakNumber]) {
          mergedPeaks[2 * peakNumber] = max;
        }

        if (channelNumber === 0 || min < mergedPeaks[2 * peakNumber + 1]) {
          mergedPeaks[2 * peakNumber + 1] = min;
        }
      }
    }

    /*
      Returns the merged peaks.
    */
    return mergedPeaks;
  }

  /**
   * Displays all of the waveforms necessary.
   *
   * @param {path} svg - The drawing of the waveform.
   */
  function displayWaveForms(svg) {
    let waveformElements = document.querySelectorAll(".amplitude-wave-form");

    /*
      Iterate over all of the waveform elements and
      display the waveform.
    */
    for (let i = 0; i < waveformElements.length; i++) {
      /*
        Get the playlist attribute of the waveform element.
      */
      let playlist = waveformElements[i].getAttribute(
        "data-amplitude-playlist"
      );

      /*
        Get the song index attribute of the waveform element.
      */
      let song = waveformElements[i].getAttribute("data-amplitude-song-index");

      /*
        If the playlist is null and the song is null it's a global element.
      */
      if (playlist == null && song == null) {
        displayGlobalWaveform(waveformElements[i], svg);
      }

      /*
        If the playlist is defined but the song is null it's a playlist element.
      */
      if (playlist != null && song == null) {
        displayPlaylistWaveform(waveformElements[i], svg, playlist);
      }

      /*
        If the playlist is not defined and the song is not null it's a song
        element.
      */
      if (playlist == null && song != null) {
        displaySongWaveform(waveformElements[i], svg, song);
      }

      /*
        If the playlist and song are defined it's a song in the playlist element.
      */
      if (playlist != null && song != null) {
        displaySongInPlaylistWaveform(waveformElements[i], svg, playlist, song);
      }
    }
  }

  /**
   * Displays a global wave form.
   *
   * @param {Node} element - Element to display the waveform in.
   * @param {SVG} svg - The waveform path.
   */
  function displayGlobalWaveform(element, svg) {
    let waveformPath = element.querySelector("svg g path");

    waveformPath.setAttribute("d", svg);
  }

  /**
   * Displays a playlist wave form.
   *
   * @param {Node} element - Element to display the waveform in.
   * @param {SVG} svg - The waveform path.
   * @param {string} playlist - The playlist we are displaying the waveform for.
   */
  function displayPlaylistWaveform(element, svg, playlist) {
    /*
      Ensure the playlist is the active playlist.
    */
    if (config.active_playlist == playlist) {
      let waveformPath = element.querySelector("svg g path");

      waveformPath.setAttribute("d", svg);
    }
  }

  /**
   * Displays a song wave form.
   *
   * @param {Node} element - Element to display the waveform in.
   * @param {SVG} svg - The waveform path.
   * @param {Integer} song - The index of the song we are displaying the
   * waveform for.
   */
  function displaySongWaveform(element, svg, song) {
    /*
      Ensure it's the active song being displayed.
    */
    if (config.active_index == song) {
      let waveformPath = element.querySelector("svg g path");

      waveformPath.setAttribute("d", svg);
    }
  }

  /**
   * Displays a song in playlist waveform.
   *
   * @param {Node} element - Element to display the waveform in.
   * @param {SVG} svg - The waveform path.
   * @param {String} playlist - The playlist the waveform is in.
   * @param {Integer} song - The index of the song we are displaying the waveform for.
   */
  function displaySongInPlaylistWaveform(element, svg, playlist, song) {
    /*
      Ensure it's the active song in the active playlist.
    */
    if (
      config.active_playlist == playlist &&
      config.playlists[config.active_playlist].active_index == song
    ) {
      let waveformPath = element.querySelector("svg g path");

      waveformPath.setAttribute("d", svg);
    }
  }

  /**
   * Determines if the user is using waveforms
   */
  function determineIfUsingWaveforms() {
    let waveforms = document.querySelectorAll(".amplitude-wave-form");

    if (waveforms.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  /*
    Return the public methods.
  */
  return {
    init: init,
    build: build,
    determineIfUsingWaveforms: determineIfUsingWaveforms
  };
})();

export default WaveForm;
