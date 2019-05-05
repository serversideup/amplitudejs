const Amplitude = require("../src/index.js");
const MichaelBromleyVisualization = require("../dist/visualizations/michaelbromley.js");
const BarVisualization = require("../dist/visualizations/bar.js");

const config = require("../src/config.js");

let Setup = (function() {
  function initializeAmplitude() {
    Amplitude.init({
      bindings: {
        37: "prev",
        39: "next",
        32: "play_pause"
      },
      debug: false,
      visualization: "michaelbromley_visualization",
      songs: [
        {
          name: "Risin' High (feat Raashan Ahmad)",
          artist: "Ancient Astronauts",
          album: "We Are to Answer",
          url:
            "../songs/Ancient Astronauts - Risin' High (feat Raashan Ahmad).mp3",
          // commented out in order to test default_album_art:
          // cover_art_url: "../album-art/we-are-to-answer.jpg",
          time_callbacks: {
            1: function() {
              console.log(1);
            },
            2: function() {
              console.log(2);
            },
            30: function() {
              console.log(30);
            }
          }
        },
        {
          name: "The Gun",
          artist: "Lorn",
          album: "Ask The Dust",
          url: "../songs/08 The Gun.mp3",
          cover_art_url: "../album-art/ask-the-dust.jpg",
          visualization: "bar_visualization"
        },
        {
          name: "Anvil",
          artist: "Lorn",
          album: "Anvil",
          url: "../songs/LORN - ANVIL.mp3",
          cover_art_url: "../album-art/anvil.jpg",
          visualization: "michaelbromley_visualization"
        },
        {
          name: "I Came Running",
          artist: "Ancient Astronauts",
          album: "We Are to Answer",
          url: "../songs/ICameRunning-AncientAstronauts.mp3",
          cover_art_url: "../album-art/we-are-to-answer.jpg",
          visualization: "bar_visualization"
        },
        {
          name: "First Snow",
          artist: "Emancipator",
          album: "Soon It Will Be Cold Enough",
          url: "../songs/FirstSnow-Emancipator.mp3",
          cover_art_url: "../album-art/soon-it-will-be-cold-enough.jpg",
          visualization: "michaelbromley_visualization"
        },
        {
          name: "Terrain",
          artist: "pg.lost",
          album: "Key",
          url: "../songs/Terrain-pglost.mp3",
          cover_art_url: "../album-art/key.jpg",
          visualization: "michaelbromley_visualization"
        },
        {
          name: "Vorel",
          artist: "Russian Circles",
          album: "Guidance",
          url: "../songs/Vorel-RussianCircles.mp3",
          cover_art_url: "../album-art/guidance.jpg",
          visualization: "bar_visualization"
        },
        {
          name: "Intro / Sweet Glory",
          artist: "Jimkata",
          album: "Die Digital",
          url: "../songs/IntroSweetGlory-Jimkata.mp3",
          cover_art_url: "../album-art/die-digital.jpg",
          visualization: "michaelbromley_visualization"
        },
        {
          name: "Offcut #6",
          artist: "Little People",
          album: "We Are But Hunks of Wood Remixes",
          url: "../songs/Offcut6-LittlePeople.mp3",
          cover_art_url: "../album-art/we-are-but-hunks-of-wood.jpg",
          visualization: "bar_visualization"
        },
        {
          name: "Dusk To Dawn",
          artist: "Emancipator",
          album: "Dusk To Dawn",
          url: "../songs/DuskToDawn-Emancipator.mp3",
          cover_art_url: "../album-art/from-dusk-to-dawn.jpg",
          visualization: "michaelbromley_visualization"
        },
        {
          name: "Anthem",
          artist: "Emancipator",
          album: "Soon It Will Be Cold Enough",
          url: "../songs/Anthem-Emancipator.mp3",
          cover_art_url: "../album-art/soon-it-will-be-cold-enough.jpg",
          visualization: "bar_visualization"
        }
      ],

      default_album_art: "http://www.google.com",

      playlists: {
        ancient_astronauts: {
          songs: [0, 3],
          title: "Best of Ancient Astronauts"
        },
        trip_hop: {
          songs: [1, 2, 5, 6, 7, 8],
          title: "Trip Hop Mix 2018",
          author: "Dan Pastori",
          visualization: "bar_visualization"
        },
        emancipator: {
          songs: [4, 9, 10],
          title: "Emancipator's Greatest Hits",
          visualization: "michaelbromley_visualization"
        }
      },

      visualizations: [
        {
          object: MichaelBromleyVisualization,
          params: {}
        },
        {
          object: BarVisualization,
          params: {
            bar_color: "#00FF00"
          }
        }
      ]
    });

    config.audio.currentTime = 30;
    config.audio.duration = 100;
  }

  function initializeTestingElement() {
    window.HTMLMediaElement.prototype.load = () => {
      /* do nothing */
    };
    window.HTMLMediaElement.prototype.play = () => {
      self.paused = false;
    };
    window.HTMLMediaElement.prototype.pause = () => {
      self.paused = true;
    };

    /*
      Simulate current time being 30 seconds.
    */
    Object.defineProperty(HTMLMediaElement.prototype, "currentTime", {
      get() {
        return self.currentTime;
      },
      set(newValue) {
        self.currentTime = newValue;
      },
      writeable: true
    });

    /*
      Simulate current time being 100 for calculations.
    */
    Object.defineProperty(HTMLMediaElement.prototype, "duration", {
      get() {
        return self.duration;
      },
      set(newValue) {
        self.duration = newValue;
      },
      writeable: true
    });

    /*
      Simulate playback rate
    */
    Object.defineProperty(HTMLMediaElement.prototype, "playbackRate", {
      get() {
        return self.playbackRate;
      },
      set(newValue) {
        self.playbackRate = newValue;
      },
      writeable: true
    });

    /*
      Simulate muted
    */
    Object.defineProperty(HTMLMediaElement.prototype, "muted", {
      get() {
        return self.muted;
      },
      set(newValue) {
        self.muted = newValue;
      },
      writeable: true
    });

    /*
      Simulate volume
    */
    Object.defineProperty(HTMLMediaElement.prototype, "volume", {
      get() {
        return self.volume;
      },
      set(newValue) {
        self.volume = newValue;
      },
      writeable: true
    });

    /*
      Simulate pause preference.
    */
    Object.defineProperty(HTMLMediaElement.prototype, "paused", {
      get() {
        return self.paused;
      },
      set(newValue) {
        self.paused = newValue;
      }
    });
  }

  function resetConfig() {
    config.audio = new Audio();

    config.active_metadata = {};

    config.active_album = "";

    config.active_index = 0;

    config.active_playlist = "";

    config.autoplay = false;

    config.playback_speed = 1.0;

    config.callbacks = {};

    config.songs = [];

    config.playlists = {};

    config.start_song = "";

    config.starting_playlist = "";

    config.starting_playlist_song = "";

    config.repeat = false;

    config.repeat_song = false;

    config.shuffle_list = {};

    config.shuffle_on = false;

    config.default_album_art = "";

    config.default_playlist_art = "";

    config.debug = false;

    config.volume = 0.5;

    config.pre_mute_volume = 0.5;

    config.volume_increment = 5;

    config.volume_decrement = 5;

    config.soundcloud_client = "";

    config.soundcloud_use_art = false;

    config.soundcloud_song_count = 0;

    config.soundcloud_songs_ready = 0;

    config.is_touch_moving = false;

    config.buffered = 0;

    config.bindings = {};

    config.continue_next = true;

    config.delay = 0;

    config.player_state = "stopped";

    config.web_audio_api_available = false;

    config.context = null;

    config.source = null;

    config.analyser = null;

    config.visualizations.available = [];

    config.visualizations.active = [];

    config.visualizations.backup = "";

    config.waveforms.sample_rate = 100;

    config.waveforms.built = [];
  }

  return {
    initializeAmplitude: initializeAmplitude,
    initializeTestingElement: initializeTestingElement,
    resetConfig: resetConfig
  };
})();

export default Setup;
