(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Amplitude", [], factory);
	else if(typeof exports === 'object')
		exports["Amplitude"] = factory();
	else
		root["Amplitude"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "./package.json");
/**
 * These variables make Amplitude run. The config is the most important
 * containing active settings and parameters.
 *
 * The config JSON is the global settings for ALL of Amplitude functions.
 * This is global and contains all of the user preferences. The default
 * settings are set, and the user overwrites them when they initialize
 * Amplitude.
 */

var config = {
  // Amplitude State Variables
  audio_element: new Audio(),
  mobile: false,
  version: _package_json__WEBPACK_IMPORTED_MODULE_0__,
  // Amplitude Dynamic Variables
  active_metadata: {},
  active_album: "",
  active_index: 0,
  active_podcast: null,
  active_playlist: null,
  active_collection: null,
  playback_speed: 1.0,
  repeat: false,
  shuffle_list: {},

  /**
   * @todo BREAKING should be repeat_audio
   */
  // repeat_song: false,
  repeat_audio: false,
  shuffle_on: false,
  // User Definable Variables
  callbacks: [],
  audio: [],
  collections: [],
  debug: true,
  default_artwork: "",
  default_playlist_art: "",
  start_audio: "",
  starting_playlist: "",
  starting_playlist_song: "",
  starting_podcast: "",
  starting_podcast_episode: "",

  /**
   * @todo BREAKING CHANGE
   */
  volume: {
    current: 50,
    increment: 5,
    decrement: 5,
    pre_mute_level: 50
  },
  //   volume: 0.5,
  //   pre_mute_volume: 0.5,
  //   volume_increment: 5,
  //   volume_decrement: 5,

  /**
   * @todo BREAKING CHANGE
   */
  soundcloud: {
    client: '',
    use_art: false,
    audio_count: 0,
    ready_count: 0
  },
  // soundcloud_client: "",
  // soundcloud_use_art: false,
  // soundcloud_song_count: 0,
  // soundcloud_songs_ready: 0,
  is_touch_moving: false,
  buffered: 0,
  bindings: {},
  continue_next: true,
  delay: 0,
  player_state: "stopped",
  time_format: 'MM:SS',

  /**
   * @todo BREAKING
   */
  web_audio_api: {
    availabile: false,
    context: null,
    source: null,
    analyser: null
  },
  //   web_audio_api_available: false,
  //   context: null,
  //   source: null,
  //   analyser: null,
  visualizations: {
    available: [],
    active: [],
    backup: ""
  },
  waveforms: {
    sample_rate: 100,
    built: []
  }
};

/***/ }),

/***/ "./src/core/Audio.js":
/*!***************************!*\
  !*** ./src/core/Audio.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Audio": () => (/* binding */ Audio)
/* harmony export */ });
/* harmony import */ var _services_Callbacks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/Callbacks */ "./src/services/Callbacks.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/config.js */ "./src/config.js");
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _services_Debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/services/Debug */ "./src/services/Debug.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }






var _startVisualizations = /*#__PURE__*/new WeakSet();

var _stopVisualizations = /*#__PURE__*/new WeakSet();

var _reconnectStream = /*#__PURE__*/new WeakSet();

var _disconnectStream = /*#__PURE__*/new WeakSet();

var _playAudio = /*#__PURE__*/new WeakSet();

var _pauseAudio = /*#__PURE__*/new WeakSet();

var _setMuted = /*#__PURE__*/new WeakSet();

var _setAudioVolume = /*#__PURE__*/new WeakSet();

var Audio = /*#__PURE__*/function () {
  function Audio() {
    _classCallCheck(this, Audio);

    _classPrivateMethodInitSpec(this, _setAudioVolume);

    _classPrivateMethodInitSpec(this, _setMuted);

    _classPrivateMethodInitSpec(this, _pauseAudio);

    _classPrivateMethodInitSpec(this, _playAudio);

    _classPrivateMethodInitSpec(this, _disconnectStream);

    _classPrivateMethodInitSpec(this, _reconnectStream);

    _classPrivateMethodInitSpec(this, _stopVisualizations);

    _classPrivateMethodInitSpec(this, _startVisualizations);
  }

  _createClass(Audio, [{
    key: "play",
    value: function play() {
      _classPrivateMethodGet(this, _startVisualizations, _startVisualizations2).call(this);

      _classPrivateMethodGet(this, _reconnectStream, _reconnectStream2).call(this);

      _classPrivateMethodGet(this, _playAudio, _playAudio2).call(this);

      _services_ConfigState__WEBPACK_IMPORTED_MODULE_2__.ConfigState.setPlayerState();
    }
  }, {
    key: "pause",
    value: function pause() {
      _classPrivateMethodGet(this, _stopVisualizations, _stopVisualizations2).call(this);

      _classPrivateMethodGet(this, _pauseAudio, _pauseAudio2).call(this);

      _classPrivateMethodGet(this, _disconnectStream, _disconnectStream2).call(this);

      _services_ConfigState__WEBPACK_IMPORTED_MODULE_2__.ConfigState.setPlayerState();
    }
  }, {
    key: "stop",
    value: function stop() {
      _classPrivateMethodGet(this, _stopVisualizations, _stopVisualizations2).call(this);

      this.setCurrentTime(0);

      _classPrivateMethodGet(this, _pauseAudio, _pauseAudio2).call(this);

      _classPrivateMethodGet(this, _disconnectStream, _disconnectStream2).call(this);

      _services_ConfigState__WEBPACK_IMPORTED_MODULE_2__.ConfigState.setPlayerState();
      _services_Callbacks__WEBPACK_IMPORTED_MODULE_0__.Callbacks.run('stop');
    }
  }, {
    key: "skipToLocation",
    value: function skipToLocation(seconds) {
      // Cannot skip live streams
      if (!_config_js__WEBPACK_IMPORTED_MODULE_1__.config.active_metadata.live) {
        // We only skip to the location when the audio is loaded enough to play through
        // and skip to a location. This event is unbound after it's fired once.
        _config_js__WEBPACK_IMPORTED_MODULE_1__.config.audio_element.addEventListener("canplaythrough", function () {
          if (_config_js__WEBPACK_IMPORTED_MODULE_1__.config.audio_element.duration >= seconds && seconds > 0) {
            _config_js__WEBPACK_IMPORTED_MODULE_1__.config.audio_element.currentTime = seconds;
          } else {
            _services_Debug__WEBPACK_IMPORTED_MODULE_3__.Debug.writeMessage("Amplitude can't skip to a location greater than the duration of the audio or less than 0.");
          }
        }, {
          once: true
        });
      }
    }
    /**
     * 
     * @param {number} volumeLevel - A number between 1 - 100 as percentage of volume.
     */

  }, {
    key: "setVolume",
    value: function setVolume(volumeLevel) {
      _classPrivateMethodGet(this, _setMuted, _setMuted2).call(this, volumeLevel);

      _classPrivateMethodGet(this, _setAudioVolume, _setAudioVolume2).call(this, volumeLevel);
    }
  }, {
    key: "setAudioLocation",
    value: function setAudioLocation(percentage) {
      if (!_config_js__WEBPACK_IMPORTED_MODULE_1__.config.active_metadata.live) {
        _config_js__WEBPACK_IMPORTED_MODULE_1__.config.audio_element.currentTime = _config_js__WEBPACK_IMPORTED_MODULE_1__.config.audio_element.duration * (percentage / 100);
      }
    }
  }, {
    key: "setPlaybackSpeed",
    value: function setPlaybackSpeed(playbackSpeed) {
      _config_js__WEBPACK_IMPORTED_MODULE_1__.config.playback_speed = playbackSpeed;
      _config_js__WEBPACK_IMPORTED_MODULE_1__.config.audio_element.playbackRate = _config_js__WEBPACK_IMPORTED_MODULE_1__.config.playback_speed;
    }
  }, {
    key: "setCurrentTime",
    value: function setCurrentTime(seconds) {
      if (isFinite(seconds)) {
        _config_js__WEBPACK_IMPORTED_MODULE_1__.config.audio_element.currentTime = seconds;
      }
    }
  }]);

  return Audio;
}();

function _startVisualizations2() {// Visualizations.stop();
  // Visualizations.run();
}

function _stopVisualizations2() {// Visualizations.stop();
}

function _reconnectStream2() {
  /*
      Mobile remote sources need to be reconnected on play. I think this is
      because mobile browsers are optimized not to load all resources
      for speed reasons. We only do this if mobile and the paused button
      is not clicked. If the pause button was clicked then we don't reconnect
      or the user will lose their place in the stream.
  */
  if (_config_js__WEBPACK_IMPORTED_MODULE_1__.config.active_metadata.live || _services_ConfigState__WEBPACK_IMPORTED_MODULE_2__.ConfigState.isMobile() && !_config_js__WEBPACK_IMPORTED_MODULE_1__.config.paused) {
    _config_js__WEBPACK_IMPORTED_MODULE_1__.config.audio_element.src = _config_js__WEBPACK_IMPORTED_MODULE_1__.config.active_metadata.url;
    _config_js__WEBPACK_IMPORTED_MODULE_1__.config.audio_element.load();
  }
}

function _disconnectStream2() {
  if (_config_js__WEBPACK_IMPORTED_MODULE_1__.config.active_metadata.live) {
    _config_js__WEBPACK_IMPORTED_MODULE_1__.config.audio_element.src = "";
    _config_js__WEBPACK_IMPORTED_MODULE_1__.config.audio_element.load();
  }
}

function _playAudio2() {
  var playPromise = _config_js__WEBPACK_IMPORTED_MODULE_1__.config.audio_element.play();

  if (playPromise !== undefined) {
    playPromise.then(function (_) {})["catch"](function (error) {});
  }

  _config_js__WEBPACK_IMPORTED_MODULE_1__.config.audio_element.playbackRate = _config_js__WEBPACK_IMPORTED_MODULE_1__.config.playback_speed;
}

function _pauseAudio2() {
  _config_js__WEBPACK_IMPORTED_MODULE_1__.config.audio_element.pause();
  _config_js__WEBPACK_IMPORTED_MODULE_1__.config.paused = true;
}

function _setMuted2(volumeLevel) {
  if (volumeLevel == 0) {
    _config_js__WEBPACK_IMPORTED_MODULE_1__.config.audio_element.muted = true;
  } else {
    _config_js__WEBPACK_IMPORTED_MODULE_1__.config.audio_element.muted = false;
  }
}

function _setAudioVolume2(volumeLevel) {
  _config_js__WEBPACK_IMPORTED_MODULE_1__.config.volume.current = volumeLevel;
  _config_js__WEBPACK_IMPORTED_MODULE_1__.config.audio_element.volume = volumeLevel / 100;
}

/***/ }),

/***/ "./src/elements/BufferedProgressElement.js":
/*!*************************************************!*\
  !*** ./src/elements/BufferedProgressElement.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BufferedProgressElement": () => (/* binding */ BufferedProgressElement)
/* harmony export */ });
/* harmony import */ var _BufferedProgressElements_GlobalBufferedProgressElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BufferedProgressElements/GlobalBufferedProgressElement */ "./src/elements/BufferedProgressElements/GlobalBufferedProgressElement.js");
/* harmony import */ var _BufferedProgressElements_CollectionBufferedProgressElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BufferedProgressElements/CollectionBufferedProgressElement */ "./src/elements/BufferedProgressElements/CollectionBufferedProgressElement.js");
/* harmony import */ var _BufferedProgressElements_CollectionAudioBufferedProgressElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BufferedProgressElements/CollectionAudioBufferedProgressElement */ "./src/elements/BufferedProgressElements/CollectionAudioBufferedProgressElement.js");
/* harmony import */ var _BufferedProgressElements_AudioBufferedProgressElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BufferedProgressElements/AudioBufferedProgressElement */ "./src/elements/BufferedProgressElements/AudioBufferedProgressElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }





var BufferedProgressElement = /*#__PURE__*/function () {
  function BufferedProgressElement() {
    _classCallCheck(this, BufferedProgressElement);
  }

  _createClass(BufferedProgressElement, null, [{
    key: "syncAll",
    value: function syncAll() {
      _BufferedProgressElements_GlobalBufferedProgressElement__WEBPACK_IMPORTED_MODULE_0__.GlobalBufferedProgressElement.syncUI();
      _BufferedProgressElements_CollectionBufferedProgressElement__WEBPACK_IMPORTED_MODULE_1__.CollectionBufferedProgressElement.syncUI();
      _BufferedProgressElements_AudioBufferedProgressElement__WEBPACK_IMPORTED_MODULE_3__.AudioBufferedProgressElement.syncUI();
      _BufferedProgressElements_CollectionAudioBufferedProgressElement__WEBPACK_IMPORTED_MODULE_2__.CollectionAudioBufferedProgressElement.syncUI();
    }
  }]);

  return BufferedProgressElement;
}();

/***/ }),

/***/ "./src/elements/BufferedProgressElements/AudioBufferedProgressElement.js":
/*!*******************************************************************************!*\
  !*** ./src/elements/BufferedProgressElements/AudioBufferedProgressElement.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AudioBufferedProgressElement": () => (/* binding */ AudioBufferedProgressElement)
/* harmony export */ });
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/config.js */ "./src/config.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var AudioBufferedProgressElement = /*#__PURE__*/function () {
  function AudioBufferedProgressElement() {
    _classCallCheck(this, AudioBufferedProgressElement);
  }

  _createClass(AudioBufferedProgressElement, null, [{
    key: "syncUI",
    value: function syncUI() {
      var activeIndex = _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getActiveAudioIndex();
      var elements = document.querySelectorAll('progress.amplitude-buffered-progress[data-amplitude-audio-index="' + activeIndex + '"]:not([data-amplitude-collection-key])');
      elements.forEach(function (element) {
        if (!isNaN(_config_js__WEBPACK_IMPORTED_MODULE_1__.config.buffered)) {
          element.value = parseFloat(_services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getBufferedPercentage());
        }
      });
    }
  }]);

  return AudioBufferedProgressElement;
}();

_defineProperty(AudioBufferedProgressElement, "audioBufferedProgressQuery", 'progress.amplitude-buffered-progress[data-amplitude-audio-index]:not([data-amplitude-collection-key])');

/***/ }),

/***/ "./src/elements/BufferedProgressElements/CollectionAudioBufferedProgressElement.js":
/*!*****************************************************************************************!*\
  !*** ./src/elements/BufferedProgressElements/CollectionAudioBufferedProgressElement.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollectionAudioBufferedProgressElement": () => (/* binding */ CollectionAudioBufferedProgressElement)
/* harmony export */ });
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/config.js */ "./src/config.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var CollectionAudioBufferedProgressElement = /*#__PURE__*/function () {
  function CollectionAudioBufferedProgressElement() {
    _classCallCheck(this, CollectionAudioBufferedProgressElement);
  }

  _createClass(CollectionAudioBufferedProgressElement, null, [{
    key: "syncUI",
    value: function syncUI() {}
  }]);

  return CollectionAudioBufferedProgressElement;
}();

/***/ }),

/***/ "./src/elements/BufferedProgressElements/CollectionBufferedProgressElement.js":
/*!************************************************************************************!*\
  !*** ./src/elements/BufferedProgressElements/CollectionBufferedProgressElement.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollectionBufferedProgressElement": () => (/* binding */ CollectionBufferedProgressElement)
/* harmony export */ });
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/config.js */ "./src/config.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var CollectionBufferedProgressElement = /*#__PURE__*/function () {
  function CollectionBufferedProgressElement() {
    _classCallCheck(this, CollectionBufferedProgressElement);
  }

  _createClass(CollectionBufferedProgressElement, null, [{
    key: "syncUI",
    value: function syncUI() {
      var activeCollection = _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getActiveCollection();
      var elements = document.querySelectorAll('progress.amplitude-buffered-progress[data-amplitude-collection-key="' + activeCollection + '"]:not([data-amplitude-audio-index])');
      elements.forEach(function (element) {
        if (!isNaN(_config_js__WEBPACK_IMPORTED_MODULE_1__.config.buffered)) {
          element.value = parseFloat(_services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getBufferedPercentage());
        }
      });
    }
  }]);

  return CollectionBufferedProgressElement;
}();

/***/ }),

/***/ "./src/elements/BufferedProgressElements/GlobalBufferedProgressElement.js":
/*!********************************************************************************!*\
  !*** ./src/elements/BufferedProgressElements/GlobalBufferedProgressElement.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GlobalBufferedProgressElement": () => (/* binding */ GlobalBufferedProgressElement)
/* harmony export */ });
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/config.js */ "./src/config.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var GlobalBufferedProgressElement = /*#__PURE__*/function () {
  function GlobalBufferedProgressElement() {
    _classCallCheck(this, GlobalBufferedProgressElement);
  }

  _createClass(GlobalBufferedProgressElement, null, [{
    key: "syncUI",
    value: function syncUI() {
      var elements = document.querySelectorAll(GlobalBufferedProgressElement.globalBufferedProgressQuery);
      elements.forEach(function (element) {
        if (!isNaN(_config_js__WEBPACK_IMPORTED_MODULE_1__.config.buffered)) {
          element.value = parseFloat(_services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getBufferedPercentage());
        }
      });
    }
  }]);

  return GlobalBufferedProgressElement;
}();

_defineProperty(GlobalBufferedProgressElement, "globalBufferedProgressQuery", 'progress.amplitude-buffered-progress:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])');

/***/ }),

/***/ "./src/elements/ContainerElement.js":
/*!******************************************!*\
  !*** ./src/elements/ContainerElement.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContainerElement": () => (/* binding */ ContainerElement)
/* harmony export */ });
/* harmony import */ var _ContainerElements_AudioContainerElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ContainerElements/AudioContainerElement */ "./src/elements/ContainerElements/AudioContainerElement.js");
/* harmony import */ var _ContainerElements_CollectionAudioContainerElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ContainerElements/CollectionAudioContainerElement */ "./src/elements/ContainerElements/CollectionAudioContainerElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }




var _setActiveAudioContainers = /*#__PURE__*/new WeakSet();

var _setActiveCollectionAudioContainers = /*#__PURE__*/new WeakSet();

var ContainerElement = /*#__PURE__*/function () {
  function ContainerElement() {
    _classCallCheck(this, ContainerElement);

    _classPrivateMethodInitSpec(this, _setActiveCollectionAudioContainers);

    _classPrivateMethodInitSpec(this, _setActiveAudioContainers);
  }

  _createClass(ContainerElement, [{
    key: "setActiveContainers",
    value: function setActiveContainers(direct) {
      _classPrivateMethodGet(this, _setActiveAudioContainers, _setActiveAudioContainers2).call(this);

      _classPrivateMethodGet(this, _setActiveCollectionAudioContainers, _setActiveCollectionAudioContainers2).call(this, direct);
    }
  }]);

  return ContainerElement;
}();

function _setActiveAudioContainers2() {
  var audioContainerElements = new _ContainerElements_AudioContainerElement__WEBPACK_IMPORTED_MODULE_0__.AudioContainerElement();
  audioContainerElements.setActive();
}

function _setActiveCollectionAudioContainers2(direct) {
  var collectionAudioContainerElements = new _ContainerElements_CollectionAudioContainerElement__WEBPACK_IMPORTED_MODULE_1__.CollectionAudioContainerElement(direct);
  collectionAudioContainerElements.setActive();
}

/***/ }),

/***/ "./src/elements/ContainerElements/AudioContainerElement.js":
/*!*****************************************************************!*\
  !*** ./src/elements/ContainerElements/AudioContainerElement.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AudioContainerElement": () => (/* binding */ AudioContainerElement)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/config */ "./src/config.js");
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }




var _elements = /*#__PURE__*/new WeakMap();

var _activeIndex = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _resetElements = /*#__PURE__*/new WeakSet();

var _getActiveIndex = /*#__PURE__*/new WeakSet();

var _setActiveContainerElements = /*#__PURE__*/new WeakSet();

var AudioContainerElement = /*#__PURE__*/function () {
  function AudioContainerElement() {
    _classCallCheck(this, AudioContainerElement);

    _classPrivateMethodInitSpec(this, _setActiveContainerElements);

    _classPrivateMethodInitSpec(this, _getActiveIndex);

    _classPrivateMethodInitSpec(this, _resetElements);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _activeIndex, {
      writable: true,
      value: void 0
    });
  }

  _createClass(AudioContainerElement, [{
    key: "setActive",
    value: function setActive() {
      if (_services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.getScope() == 'audio') {
        _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

        _classPrivateMethodGet(this, _resetElements, _resetElements2).call(this);

        _classPrivateMethodGet(this, _getActiveIndex, _getActiveIndex2).call(this);

        _classPrivateMethodGet(this, _setActiveContainerElements, _setActiveContainerElements2).call(this);
      }
    }
  }]);

  return AudioContainerElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(AudioContainerElement.audioContainerElementQuery));
}

function _resetElements2() {
  _classPrivateFieldGet(this, _elements).forEach(function (element) {
    element.classList.remove('amplitude-active-audio-container');
  });
}

function _getActiveIndex2() {
  _classPrivateFieldSet(this, _activeIndex, _config__WEBPACK_IMPORTED_MODULE_0__.config.active_index);
}

function _setActiveContainerElements2() {
  var activeContainerElements = document.querySelectorAll('.amplitude-audio-container[data-amplitude-audio-index="' + _classPrivateFieldGet(this, _activeIndex) + '"]:not([data-amplitude-collection-key])');
  activeContainerElements.forEach(function (element) {
    element.classList.add("amplitude-active-audio-container");
  });
}

_defineProperty(AudioContainerElement, "audioContainerElementQuery", '.amplitude-audio-container[data-amplitude-audio-index]:not([data-amplitude-collection-key])');

/***/ }),

/***/ "./src/elements/ContainerElements/CollectionAudioContainerElement.js":
/*!***************************************************************************!*\
  !*** ./src/elements/ContainerElements/CollectionAudioContainerElement.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollectionAudioContainerElement": () => (/* binding */ CollectionAudioContainerElement)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/config */ "./src/config.js");
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }




var _direct = /*#__PURE__*/new WeakMap();

var _elements = /*#__PURE__*/new WeakMap();

var _activeIndex = /*#__PURE__*/new WeakMap();

var _activeCollection = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _resetElements = /*#__PURE__*/new WeakSet();

var _getActiveIndex = /*#__PURE__*/new WeakSet();

var _setActiveContainerElements = /*#__PURE__*/new WeakSet();

var CollectionAudioContainerElement = /*#__PURE__*/function () {
  function CollectionAudioContainerElement(direct) {
    _classCallCheck(this, CollectionAudioContainerElement);

    _classPrivateMethodInitSpec(this, _setActiveContainerElements);

    _classPrivateMethodInitSpec(this, _getActiveIndex);

    _classPrivateMethodInitSpec(this, _resetElements);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _direct, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _activeIndex, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _activeCollection, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _direct, direct);
  }

  _createClass(CollectionAudioContainerElement, [{
    key: "setActive",
    value: function setActive() {
      if (_services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.getScope() == 'collection') {
        _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

        _classPrivateMethodGet(this, _resetElements, _resetElements2).call(this);

        _classPrivateMethodGet(this, _getActiveIndex, _getActiveIndex2).call(this);

        _classPrivateMethodGet(this, _setActiveContainerElements, _setActiveContainerElements2).call(this);
      }
    }
  }]);

  return CollectionAudioContainerElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(CollectionAudioContainerElement.collectionAudioContainerElementQuery));
}

function _resetElements2() {
  _classPrivateFieldGet(this, _elements).forEach(function (element) {
    element.classList.remove('amplitude-active-audio-container');
  });
}

function _getActiveIndex2() {
  _classPrivateFieldSet(this, _activeCollection, _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.getActiveCollection());

  if (_classPrivateFieldGet(this, _direct)) {
    _classPrivateFieldSet(this, _activeIndex, _config__WEBPACK_IMPORTED_MODULE_0__.config.collections[_classPrivateFieldGet(this, _activeCollection)].active_index);
  } else {
    if (_services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isCollectionShuffled(_classPrivateFieldGet(this, _activeCollection))) {
      _classPrivateFieldSet(this, _activeIndex, _config__WEBPACK_IMPORTED_MODULE_0__.config.collections[_classPrivateFieldGet(this, _activeCollection)].shuffle_list[_config__WEBPACK_IMPORTED_MODULE_0__.config.collections[_classPrivateFieldGet(this, _activeCollection)].active_index].index);
    } else {
      _classPrivateFieldSet(this, _activeIndex, _config__WEBPACK_IMPORTED_MODULE_0__.config.collections[_classPrivateFieldGet(this, _activeCollection)].active_index);
    }
  }
}

function _setActiveContainerElements2() {
  var activeContainerElements = document.querySelectorAll('.amplitude-audio-container[data-amplitude-audio-index="' + _classPrivateFieldGet(this, _activeIndex) + '"][data-amplitude-collection-key="' + _classPrivateFieldGet(this, _activeCollection) + '"]');
  activeContainerElements.forEach(function (element) {
    element.classList.add("amplitude-active-audio-container");
  });
}

_defineProperty(CollectionAudioContainerElement, "collectionAudioContainerElementQuery", '.amplitude-audio-container[data-amplitude-audio-index][data-amplitude-collection-key]');

/***/ }),

/***/ "./src/elements/MetaDataElement.js":
/*!*****************************************!*\
  !*** ./src/elements/MetaDataElement.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MetaDataElement": () => (/* binding */ MetaDataElement)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/config */ "./src/config.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }



var _imageMetaDataKeys = /*#__PURE__*/new WeakMap();

var _displayGlobalMetaElements = /*#__PURE__*/new WeakSet();

var _displayCollectionMetaElements = /*#__PURE__*/new WeakSet();

var _displayAudioMetaElements = /*#__PURE__*/new WeakSet();

var _displayCollectionAudioMetaElements = /*#__PURE__*/new WeakSet();

var _setMetaValue = /*#__PURE__*/new WeakSet();

var MetaDataElement = /*#__PURE__*/function () {
  function MetaDataElement() {
    _classCallCheck(this, MetaDataElement);

    _classPrivateMethodInitSpec(this, _setMetaValue);

    _classPrivateMethodInitSpec(this, _displayCollectionAudioMetaElements);

    _classPrivateMethodInitSpec(this, _displayAudioMetaElements);

    _classPrivateMethodInitSpec(this, _displayCollectionMetaElements);

    _classPrivateMethodInitSpec(this, _displayGlobalMetaElements);

    _classPrivateFieldInitSpec(this, _imageMetaDataKeys, {
      writable: true,
      value: ["cover_art_url", "station_art_url", "podcast_episode_cover_art_url", "album_art_url"]
    });
  }

  _createClass(MetaDataElement, [{
    key: "displayMetaData",
    value:
    /**
     * Gets called after audio has been changed. Updates all of the global
     * elements and collection elements, not the individual audio elements.
     * Individual audio elements should only be dynamically set once and not again
     * since they never change.
     * 
     * Examples:
     * Update - Global cover art for a song.
     * Update - Playlist now playing cover art.
     * Update - Podcast now playing cover art.
     * Do Not Update - Individual audio element. These will be set with syncMetaData()
     * and won't need to be updated again.
     */
    function displayMetaData() {
      _classPrivateMethodGet(this, _displayGlobalMetaElements, _displayGlobalMetaElements2).call(this);

      _classPrivateMethodGet(this, _displayCollectionMetaElements, _displayCollectionMetaElements2).call(this);
    }
  }, {
    key: "displayCollectionMetaData",
    value: function displayCollectionMetaData() {}
  }, {
    key: "syncMetaData",
    value: function syncMetaData() {
      _classPrivateMethodGet(this, _displayAudioMetaElements, _displayAudioMetaElements2).call(this);

      _classPrivateMethodGet(this, _displayCollectionAudioMetaElements, _displayCollectionAudioMetaElements2).call(this);

      this.displayCollectionMetaData();
    }
  }]);

  return MetaDataElement;
}();

function _displayGlobalMetaElements2() {
  var _this = this;

  var globalAudioInfoElements = document.querySelectorAll(MetaDataElement.globalMetaDataElementsQuery);
  globalAudioInfoElements.forEach(function (element) {
    var key = element.getAttribute('data-amplitude-audio-info');
    var value = _config__WEBPACK_IMPORTED_MODULE_0__.config.active_metadata[key] != undefined ? _config__WEBPACK_IMPORTED_MODULE_0__.config.active_metadata[key] : null;

    _classPrivateMethodGet(_this, _setMetaValue, _setMetaValue2).call(_this, key, value, element);
  });
}

function _displayCollectionMetaElements2() {
  var _this2 = this;

  var collectionInfoElements = document.querySelectorAll(MetaDataElement.collectionMetaDataElementsQuery);
  collectionInfoElements.forEach(function (element) {
    var key = element.getAttribute('data-amplitude-audio-info');
    var value = _config__WEBPACK_IMPORTED_MODULE_0__.config.active_metadata[key] != undefined ? _config__WEBPACK_IMPORTED_MODULE_0__.config.active_metadata[key] : null;

    _classPrivateMethodGet(_this2, _setMetaValue, _setMetaValue2).call(_this2, key, value, element);
  });
}

function _displayAudioMetaElements2() {
  var _this3 = this;

  var audioInfoElements = document.querySelectorAll(MetaDataElement.audioMetaDataElementsQuery);
  audioInfoElements.forEach(function (element) {
    var key = element.getAttribute('data-amplitude-audio-info');
    var audioIndex = element.getAttribute('data-amplitude-audio-index');
    var value = _config__WEBPACK_IMPORTED_MODULE_0__.config.audio[audioIndex][key] != undefined ? _config__WEBPACK_IMPORTED_MODULE_0__.config.audio[audioIndex][key] : null;

    _classPrivateMethodGet(_this3, _setMetaValue, _setMetaValue2).call(_this3, key, value, element);
  });
}

function _displayCollectionAudioMetaElements2() {
  var _this4 = this;

  var collectionAudioInfoElements = document.querySelectorAll(MetaDataElement.collectionAudioMetaDataElementsQuery);
  collectionAudioInfoElements.forEach(function (element) {
    var key = element.getAttribute('data-amplitude-audio-info');
    var audioIndex = element.getAttribute('data-amplitude-audio-index');
    var collectionKey = element.getAttribute('data-amplitude-collection-key');
    var value = _config__WEBPACK_IMPORTED_MODULE_0__.config.collections[collectionKey].audio[audioIndex][info] != undefined ? _config__WEBPACK_IMPORTED_MODULE_0__.config.collections[collectionKey].audio[audioIndex][info] : null;

    _classPrivateMethodGet(_this4, _setMetaValue, _setMetaValue2).call(_this4, key, value, element);
  });
}

function _setMetaValue2(key, value, element) {
  if (_classPrivateFieldGet(this, _imageMetaDataKeys).indexOf(key) >= 0) {
    value = value || _config__WEBPACK_IMPORTED_MODULE_0__.config.default_art;
    element.setAttribute('src', value);
  } else {
    value = value || "";
    element.innerHTML = value;
  }
}

_defineProperty(MetaDataElement, "globalMetaDataElementsQuery", '[data-amplitude-audio-info]:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])');

_defineProperty(MetaDataElement, "collectionMetaDataElementsQuery", '[data-amplitude-audio-info][data-amplitude-collection-key]:not([data-amplitude-audio-index])');

_defineProperty(MetaDataElement, "audioMetaDataElementsQuery", '[data-amplitude-audio-info][data-amplitude-audio-index]:not([data-amplitude-collection-key])');

_defineProperty(MetaDataElement, "collectionAudioMetaDataElementsQuery", '[data-amplitude-audio-info][data-amplitude-audio-index][data-amplitude-collection-key]');

_defineProperty(MetaDataElement, "collectionInfoElementsQuery", '[data-amplitude-collection-info]');

/***/ }),

/***/ "./src/elements/MuteElement.js":
/*!*************************************!*\
  !*** ./src/elements/MuteElement.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MuteElement": () => (/* binding */ MuteElement)
/* harmony export */ });
/* harmony import */ var _core_Audio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Audio */ "./src/core/Audio.js");
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _VolumeSliderElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VolumeSliderElement */ "./src/elements/VolumeSliderElement.js");
/* harmony import */ var _services_Debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/services/Debug */ "./src/services/Debug.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }





/**
 * Handles the configuration and managing of Mute elements
 * 
 * A Mute element is defined as the following:
 * 
 * Element: class="amplitude-mute"
 * 
 * Whenever this element is interacted with, the audio is muted no matter where.
 */

var _elements = /*#__PURE__*/new WeakMap();

var _mobile = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _bindInteractions = /*#__PURE__*/new WeakSet();

var _handleInteraction = /*#__PURE__*/new WeakSet();

var MuteElement = /*#__PURE__*/function () {
  function MuteElement() {
    _classCallCheck(this, MuteElement);

    _classPrivateMethodInitSpec(this, _handleInteraction);

    _classPrivateMethodInitSpec(this, _bindInteractions);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _mobile, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _mobile, _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isMobile());
  }

  _createClass(MuteElement, [{
    key: "setUp",
    value: function setUp() {
      _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

      _classPrivateMethodGet(this, _bindInteractions, _bindInteractions2).call(this);
    }
  }], [{
    key: "syncElements",
    value: function syncElements() {
      var elements = document.querySelectorAll(MuteElement.muteElementQuery);
      elements.forEach(function (element) {
        if (_services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.getVolume() == 0) {
          element.classList.remove("amplitude-not-muted");
          element.classList.add("amplitude-muted");
        } else {
          element.classList.add("amplitude-not-muted");
          element.classList.remove("amplitude-muted");
        }
      });
    }
  }]);

  return MuteElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(MuteElement.muteElementQuery));
}

function _bindInteractions2() {
  var _this = this;

  if (_services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isIos()) {
    _services_Debug__WEBPACK_IMPORTED_MODULE_3__.Debug.writeMessage("iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4");
  } else {
    _classPrivateFieldGet(this, _elements).forEach(function (element) {
      if (_classPrivateFieldGet(_this, _mobile)) {
        element.removeEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
        element.addEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      } else {
        element.removeEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
        element.addEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      }
    });
  }
}

function _handleInteraction2() {
  if (!_services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isTouchMoving()) {
    var audio = new _core_Audio__WEBPACK_IMPORTED_MODULE_0__.Audio();

    if (_services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.getVolume() == 0) {
      audio.setVolume(_services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.getPreMuteVolume());
    } else {
      _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.setPreMuteVolume();
      audio.setVolume(0);
    }

    MuteElement.syncElements();
    _VolumeSliderElement__WEBPACK_IMPORTED_MODULE_2__.VolumeSliderElement.syncElements();
  }
}

_defineProperty(MuteElement, "muteElementQuery", '.amplitude-mute');

/***/ }),

/***/ "./src/elements/NextElement.js":
/*!*************************************!*\
  !*** ./src/elements/NextElement.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NextElement": () => (/* binding */ NextElement)
/* harmony export */ });
/* harmony import */ var _NextElements_CollectionNextElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NextElements/CollectionNextElement */ "./src/elements/NextElements/CollectionNextElement.js");
/* harmony import */ var _NextElements_GlobalNextElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NextElements/GlobalNextElement */ "./src/elements/NextElements/GlobalNextElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }



/**
 * Handles the configuration and managing of Next elements
 * 
 * A Next element is defined as the following:
 * 
 * Element: class="amplitude-next"
 * 
 * GLOBAL: class="amplitude-next"
 * Handles next for whatever scope the player is in.
 * 
 * COLLECTION: class="amplitude-next" data-amplitude-collection="{collection_key}"
 * Handles the next audio within a specific collection.
 */

var _configureGlobalNextElement = /*#__PURE__*/new WeakSet();

var _configureCollectionNextElement = /*#__PURE__*/new WeakSet();

var NextElement = /*#__PURE__*/function () {
  function NextElement() {
    _classCallCheck(this, NextElement);

    _classPrivateMethodInitSpec(this, _configureCollectionNextElement);

    _classPrivateMethodInitSpec(this, _configureGlobalNextElement);
  }

  _createClass(NextElement, [{
    key: "setUp",
    value: function setUp() {
      _classPrivateMethodGet(this, _configureGlobalNextElement, _configureGlobalNextElement2).call(this);

      _classPrivateMethodGet(this, _configureCollectionNextElement, _configureCollectionNextElement2).call(this);
    }
  }]);

  return NextElement;
}();

function _configureGlobalNextElement2() {
  var globalNextElement = new _NextElements_GlobalNextElement__WEBPACK_IMPORTED_MODULE_1__.GlobalNextElement();
  globalNextElement.initialize();
}

function _configureCollectionNextElement2() {
  var collectionNextElement = new _NextElements_CollectionNextElement__WEBPACK_IMPORTED_MODULE_0__.CollectionNextElement();
  collectionNextElement.initialize();
}

/***/ }),

/***/ "./src/elements/NextElements/CollectionNextElement.js":
/*!************************************************************!*\
  !*** ./src/elements/NextElements/CollectionNextElement.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollectionNextElement": () => (/* binding */ CollectionNextElement)
/* harmony export */ });
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _services_Collections_Navigation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/Collections/Navigation.js */ "./src/services/Collections/Navigation.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/config */ "./src/config.js");
/* harmony import */ var _services_Debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/services/Debug */ "./src/services/Debug.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }






var _elements = /*#__PURE__*/new WeakMap();

var _mobile = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _bindInteractions = /*#__PURE__*/new WeakSet();

var _handleInteraction = /*#__PURE__*/new WeakSet();

var CollectionNextElement = /*#__PURE__*/function () {
  function CollectionNextElement() {
    _classCallCheck(this, CollectionNextElement);

    _classPrivateMethodInitSpec(this, _handleInteraction);

    _classPrivateMethodInitSpec(this, _bindInteractions);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _mobile, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _mobile, _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.isMobile());
  }

  _createClass(CollectionNextElement, [{
    key: "initialize",
    value: function initialize() {
      _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

      _classPrivateMethodGet(this, _bindInteractions, _bindInteractions2).call(this);
    }
  }]);

  return CollectionNextElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(CollectionNextElement.collectionNextQuery));
}

function _bindInteractions2() {
  var _this = this;

  _classPrivateFieldGet(this, _elements).forEach(function (element) {
    if (_classPrivateFieldGet(_this, _mobile)) {
      element.removeEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
    } else {
      element.removeEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
    }
  });
}

function _handleInteraction2() {
  var collectionKey = this.getAttribute('data-amplitude-collection-key');

  if (collectionKey == _config__WEBPACK_IMPORTED_MODULE_2__.config.active_collection) {
    var collectionNavigation = new _services_Collections_Navigation_js__WEBPACK_IMPORTED_MODULE_1__.Navigation();
    collectionNavigation.next(collectionKey);
  } else {
    _services_Debug__WEBPACK_IMPORTED_MODULE_3__.Debug.writeMessage("You can not go to the next audio on a playlist that is not being played!");
  }
}

_defineProperty(CollectionNextElement, "collectionNextQuery", '.amplitude-next[data-amplitude-collection-key]');

/***/ }),

/***/ "./src/elements/NextElements/GlobalNextElement.js":
/*!********************************************************!*\
  !*** ./src/elements/NextElements/GlobalNextElement.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GlobalNextElement": () => (/* binding */ GlobalNextElement)
/* harmony export */ });
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _services_Debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/Debug */ "./src/services/Debug.js");
/* harmony import */ var _services_Collections_Navigation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/services/Collections/Navigation.js */ "./src/services/Collections/Navigation.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }





var _elements = /*#__PURE__*/new WeakMap();

var _mobile = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _bindInteractions = /*#__PURE__*/new WeakSet();

var _handleInteraction = /*#__PURE__*/new WeakSet();

var GlobalNextElement = /*#__PURE__*/function () {
  function GlobalNextElement() {
    _classCallCheck(this, GlobalNextElement);

    _classPrivateMethodInitSpec(this, _handleInteraction);

    _classPrivateMethodInitSpec(this, _bindInteractions);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _mobile, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _mobile, _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.isMobile());
  }

  _createClass(GlobalNextElement, [{
    key: "initialize",
    value: function initialize() {
      _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

      _classPrivateMethodGet(this, _bindInteractions, _bindInteractions2).call(this);
    }
  }]);

  return GlobalNextElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(GlobalNextElement.globalNextQuery));
}

function _bindInteractions2() {
  var _this = this;

  _classPrivateFieldGet(this, _elements).forEach(function (element) {
    if (_classPrivateFieldGet(_this, _mobile)) {
      element.removeEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
    } else {
      element.removeEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
    }
  });
}

function _handleInteraction2() {
  if (_services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getScope() == 'collection') {
    var collectionNavigation = new _services_Collections_Navigation_js__WEBPACK_IMPORTED_MODULE_2__.Navigation();
    collectionNavigation.next();
  } else {
    _services_Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.writeMessage("You can only navigate next when you are playing a collection.");
  }
}

_defineProperty(GlobalNextElement, "globalNextQuery", '.amplitude-next:not([data-amplitude-collection-key])');

/***/ }),

/***/ "./src/elements/PauseElement.js":
/*!**************************************!*\
  !*** ./src/elements/PauseElement.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PauseElement": () => (/* binding */ PauseElement)
/* harmony export */ });
/* harmony import */ var _PauseElements_GlobalPauseElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PauseElements/GlobalPauseElement */ "./src/elements/PauseElements/GlobalPauseElement.js");
/* harmony import */ var _PauseElements_CollectionPauseElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PauseElements/CollectionPauseElement */ "./src/elements/PauseElements/CollectionPauseElement.js");
/* harmony import */ var _PauseElements_AudioPauseElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PauseElements/AudioPauseElement */ "./src/elements/PauseElements/AudioPauseElement.js");
/* harmony import */ var _PauseElements_CollectionAudioPauseElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PauseElements/CollectionAudioPauseElement */ "./src/elements/PauseElements/CollectionAudioPauseElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }





/**
 * Handles the configuration and managing of Pause elements.
 * 
 * A Pause element is defined as the following:
 * 
 * Element: class="amplitude-pause"
 * 
 * GLOBAL: class="amplitude-pause"
 * Controls the entire state of the audio player.
 * 
 * COLLECTION: class="amplitude-pause" data-amplitude-collection="{collection_key}"
 * Scoped to an individual collection. Will only pause what's within the scope of the collection.
 * 
 * AUDIO: class="amplitude-pause" data-amplitude-audio-index="{audio_index}"
 * Scoped to an individual audio element.
 * 
 * AUDIO IN COLLECTION: class="amplitude-pause" data-amplitude-collection-key="{collection_key}" data-amplitude-audio-index="{audio_index}"
 * Scoped to an individual audio element within a collection.
 */

var _configureGlobalPauseElement = /*#__PURE__*/new WeakSet();

var _configureCollectionPauseElement = /*#__PURE__*/new WeakSet();

var _configureAudioPauseElement = /*#__PURE__*/new WeakSet();

var _configureCollectionAudioPauseElement = /*#__PURE__*/new WeakSet();

var PauseElement = /*#__PURE__*/function () {
  function PauseElement() {
    _classCallCheck(this, PauseElement);

    _classPrivateMethodInitSpec(this, _configureCollectionAudioPauseElement);

    _classPrivateMethodInitSpec(this, _configureAudioPauseElement);

    _classPrivateMethodInitSpec(this, _configureCollectionPauseElement);

    _classPrivateMethodInitSpec(this, _configureGlobalPauseElement);
  }

  _createClass(PauseElement, [{
    key: "setUp",
    value: function setUp() {
      _classPrivateMethodGet(this, _configureGlobalPauseElement, _configureGlobalPauseElement2).call(this);

      _classPrivateMethodGet(this, _configureCollectionPauseElement, _configureCollectionPauseElement2).call(this);

      _classPrivateMethodGet(this, _configureAudioPauseElement, _configureAudioPauseElement2).call(this);

      _classPrivateMethodGet(this, _configureCollectionAudioPauseElement, _configureCollectionAudioPauseElement2).call(this);
    }
  }]);

  return PauseElement;
}();

function _configureGlobalPauseElement2() {
  var globalPauseElement = new _PauseElements_GlobalPauseElement__WEBPACK_IMPORTED_MODULE_0__.GlobalPauseElement();
  globalPauseElement.initialize();
}

function _configureCollectionPauseElement2() {
  var collectionPauseElement = new _PauseElements_CollectionPauseElement__WEBPACK_IMPORTED_MODULE_1__.CollectionPauseElement();
  collectionPauseElement.initialize();
}

function _configureAudioPauseElement2() {
  var audioPauseElement = new _PauseElements_AudioPauseElement__WEBPACK_IMPORTED_MODULE_2__.AudioPauseElement();
  audioPauseElement.initialize();
}

function _configureCollectionAudioPauseElement2() {
  var collectionAudioPauseElement = new _PauseElements_CollectionAudioPauseElement__WEBPACK_IMPORTED_MODULE_3__.CollectionAudioPauseElement();
  collectionAudioPauseElement.initialize();
}

/***/ }),

/***/ "./src/elements/PauseElements/AudioPauseElement.js":
/*!*********************************************************!*\
  !*** ./src/elements/PauseElements/AudioPauseElement.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AudioPauseElement": () => (/* binding */ AudioPauseElement)
/* harmony export */ });
/* harmony import */ var _core_Audio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Audio */ "./src/core/Audio.js");
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/elements/PlayPauseElement */ "./src/elements/PlayPauseElement.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config */ "./src/config.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }






var _elements = /*#__PURE__*/new WeakMap();

var _mobile = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _bindInteractions = /*#__PURE__*/new WeakSet();

var _handleInteraction = /*#__PURE__*/new WeakSet();

var AudioPauseElement = /*#__PURE__*/function () {
  function AudioPauseElement() {
    _classCallCheck(this, AudioPauseElement);

    _classPrivateMethodInitSpec(this, _handleInteraction);

    _classPrivateMethodInitSpec(this, _bindInteractions);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _mobile, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _mobile, _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isMobile());
  }

  _createClass(AudioPauseElement, [{
    key: "initialize",
    value: function initialize() {
      _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

      _classPrivateMethodGet(this, _bindInteractions, _bindInteractions2).call(this);
    }
  }]);

  return AudioPauseElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(AudioPauseElement.audioPauseQuery));
}

function _bindInteractions2() {
  var _this = this;

  _classPrivateFieldGet(this, _elements).forEach(function (element) {
    if (_classPrivateFieldGet(_this, _mobile)) {
      element.removeEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
    } else {
      element.removeEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
    }
  });
}

function _handleInteraction2() {
  if (!_services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isTouchMoving()) {
    var audioIndex = this.getAttribute('data-amplitude-audio-index'); // If the scope is audio and the index of the element matches the active audio
    // index, then we pause the player.

    if (_services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.getScope() == 'audio' && _config__WEBPACK_IMPORTED_MODULE_3__.config.active_index == audioIndex) {
      var audio = new _core_Audio__WEBPACK_IMPORTED_MODULE_0__.Audio();
      audio.pause();
      _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_2__.PlayPauseElement.syncAll();
    }
  }
}

_defineProperty(AudioPauseElement, "audioPauseQuery", ".amplitude-pause[data-amplitude-audio-index]:not([data-amplitude-collection-key])");

/***/ }),

/***/ "./src/elements/PauseElements/CollectionAudioPauseElement.js":
/*!*******************************************************************!*\
  !*** ./src/elements/PauseElements/CollectionAudioPauseElement.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollectionAudioPauseElement": () => (/* binding */ CollectionAudioPauseElement)
/* harmony export */ });
/* harmony import */ var _core_Audio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Audio */ "./src/core/Audio.js");
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/elements/PlayPauseElement */ "./src/elements/PlayPauseElement.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/config */ "./src/config.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }






var _elements = /*#__PURE__*/new WeakMap();

var _mobile = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _bindInteractions = /*#__PURE__*/new WeakSet();

var _handleInteraction = /*#__PURE__*/new WeakSet();

var CollectionAudioPauseElement = /*#__PURE__*/function () {
  function CollectionAudioPauseElement() {
    _classCallCheck(this, CollectionAudioPauseElement);

    _classPrivateMethodInitSpec(this, _handleInteraction);

    _classPrivateMethodInitSpec(this, _bindInteractions);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _mobile, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _mobile, _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isMobile());
  }

  _createClass(CollectionAudioPauseElement, [{
    key: "initialize",
    value: function initialize() {
      _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

      _classPrivateMethodGet(this, _bindInteractions, _bindInteractions2).call(this);
    }
  }]);

  return CollectionAudioPauseElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(CollectionAudioPauseElement.collectionAudioPauseQuery));
}

function _bindInteractions2() {
  var _this = this;

  _classPrivateFieldGet(this, _elements).forEach(function (element) {
    if (_classPrivateFieldGet(_this, _mobile)) {
      element.removeEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2).bind(_this, element));
    } else {
      element.removeEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2).bind(_this, element));
    }
  });
}

function _handleInteraction2() {
  if (!_services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isTouchMoving()) {
    var collectionKey = element.getAttribute('data-amplitude-collection-key');
    var audioIndex = element.getAttribute('data-amplitude-audio-index');

    if (_config__WEBPACK_IMPORTED_MODULE_3__.config.active_collection == collectionKey && _config__WEBPACK_IMPORTED_MODULE_3__.config.collections[collectionKey].active_index == audioIndex) {
      var audio = new _core_Audio__WEBPACK_IMPORTED_MODULE_0__.Audio();
      audio.pause();
      _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_2__.PlayPauseElement.syncAll();
    }
  }
}

_defineProperty(CollectionAudioPauseElement, "collectionAudioPauseQuery", '.amplitude-pause[data-amplitude-collection-key][data-amplitude-audio-index]');

/***/ }),

/***/ "./src/elements/PauseElements/CollectionPauseElement.js":
/*!**************************************************************!*\
  !*** ./src/elements/PauseElements/CollectionPauseElement.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollectionPauseElement": () => (/* binding */ CollectionPauseElement)
/* harmony export */ });
/* harmony import */ var _core_Audio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Audio */ "./src/core/Audio.js");
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/elements/PlayPauseElement */ "./src/elements/PlayPauseElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }





var _elements = /*#__PURE__*/new WeakMap();

var _mobile = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _bindInteractions = /*#__PURE__*/new WeakSet();

var _handleInteraction = /*#__PURE__*/new WeakSet();

var CollectionPauseElement = /*#__PURE__*/function () {
  function CollectionPauseElement() {
    _classCallCheck(this, CollectionPauseElement);

    _classPrivateMethodInitSpec(this, _handleInteraction);

    _classPrivateMethodInitSpec(this, _bindInteractions);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _mobile, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _mobile, _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isMobile());
  }

  _createClass(CollectionPauseElement, [{
    key: "initialize",
    value: function initialize() {
      _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

      _classPrivateMethodGet(this, _bindInteractions, _bindInteractions2).call(this);
    }
  }]);

  return CollectionPauseElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(CollectionPauseElement.collectionPauseQuery));
}

function _bindInteractions2() {
  var _this = this;

  _classPrivateFieldGet(this, _elements).forEach(function (element) {
    if (_classPrivateFieldGet(_this, _mobile)) {
      element.removeEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
    } else {
      element.removeEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
    }
  });
}

function _handleInteraction2() {
  if (!_services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isTouchMoving()) {
    var collectionKey = this.getAttribute('data-amplitude-collection-key'); // Ensure we pause the audio if the active collection is
    // what is controlled by this pause element.

    if (config.active_collection == collectionKey) {
      var audio = new _core_Audio__WEBPACK_IMPORTED_MODULE_0__.Audio();
      audio.pause();
      _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_2__.PlayPauseElement.syncAll();
    }
  }
}

_defineProperty(CollectionPauseElement, "collectionPauseQuery", '.amplitude-pause[data-amplitude-collection-key]:not([data-amplitude-audio-index])');

/***/ }),

/***/ "./src/elements/PauseElements/GlobalPauseElement.js":
/*!**********************************************************!*\
  !*** ./src/elements/PauseElements/GlobalPauseElement.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GlobalPauseElement": () => (/* binding */ GlobalPauseElement)
/* harmony export */ });
/* harmony import */ var _core_Audio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Audio */ "./src/core/Audio.js");
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/elements/PlayPauseElement */ "./src/elements/PlayPauseElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }





var _elements = /*#__PURE__*/new WeakMap();

var _mobile = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _bindInteractions = /*#__PURE__*/new WeakSet();

var _handleInteraction = /*#__PURE__*/new WeakSet();

var GlobalPauseElement = /*#__PURE__*/function () {
  function GlobalPauseElement() {
    _classCallCheck(this, GlobalPauseElement);

    _classPrivateMethodInitSpec(this, _handleInteraction);

    _classPrivateMethodInitSpec(this, _bindInteractions);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _mobile, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _mobile, _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isMobile());
  }

  _createClass(GlobalPauseElement, [{
    key: "initialize",
    value: function initialize() {
      _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

      _classPrivateMethodGet(this, _bindInteractions, _bindInteractions2).call(this);
    }
  }]);

  return GlobalPauseElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(GlobalPauseElement.globalPauseQuery));
}

function _bindInteractions2() {
  var _this = this;

  _classPrivateFieldGet(this, _elements).forEach(function (element) {
    if (_classPrivateFieldGet(_this, _mobile)) {
      element.removeEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
    } else {
      element.removeEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
    }
  });
}

function _handleInteraction2() {
  if (!_services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isTouchMoving()) {
    var audio = new _core_Audio__WEBPACK_IMPORTED_MODULE_0__.Audio();
    audio.pause();
    _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_2__.PlayPauseElement.syncAll();
  }
}

_defineProperty(GlobalPauseElement, "globalPauseQuery", '.amplitude-pause:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])');

/***/ }),

/***/ "./src/elements/PlayElement.js":
/*!*************************************!*\
  !*** ./src/elements/PlayElement.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlayElement": () => (/* binding */ PlayElement)
/* harmony export */ });
/* harmony import */ var _PlayElements_GlobalPlayElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlayElements/GlobalPlayElement */ "./src/elements/PlayElements/GlobalPlayElement.js");
/* harmony import */ var _PlayElements_CollectionPlayElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PlayElements/CollectionPlayElement */ "./src/elements/PlayElements/CollectionPlayElement.js");
/* harmony import */ var _PlayElements_AudioPlayElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PlayElements/AudioPlayElement */ "./src/elements/PlayElements/AudioPlayElement.js");
/* harmony import */ var _PlayElements_CollectionAudioPlayElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PlayElements/CollectionAudioPlayElement */ "./src/elements/PlayElements/CollectionAudioPlayElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }





/**
 * Handles the configuration and managing of the play elements.
 * 
 * A Play element is defined as the following:
 * 
 * Element: class="amplitude-play"
 * 
 * GLOBAL: class="amplitude-play"
 * Controls the entire state of the audio player. Will play whatever is active.
 * 
 * COLLECTION: class="amplitude-play" data-amplitude-collection-key="{collection_key}"
 * Scoped to an individual collection. Will only play within the collection.
 * 
 * AUDIO: class="amplitude-play" data-amplitude-audio-index="{audio_index}"
 * Scoped to an individual audio element. Will only play a specific piece of audio.
 * 
 * AUDIO IN COLLECTION: class="amplitude-play" data-amplitude-collection-key="{collection_key}" data-amplitude-audio-index="{audio_index}"
 * Scoped to an individual audio element within a collection. Will only play a specific piece of audio in a collection.
 */

var _configureGlobalPlayElement = /*#__PURE__*/new WeakSet();

var _configureCollectionPlayElement = /*#__PURE__*/new WeakSet();

var _configureAudioPlayElement = /*#__PURE__*/new WeakSet();

var _configureCollectionAudioPlayElement = /*#__PURE__*/new WeakSet();

var PlayElement = /*#__PURE__*/function () {
  function PlayElement() {
    _classCallCheck(this, PlayElement);

    _classPrivateMethodInitSpec(this, _configureCollectionAudioPlayElement);

    _classPrivateMethodInitSpec(this, _configureAudioPlayElement);

    _classPrivateMethodInitSpec(this, _configureCollectionPlayElement);

    _classPrivateMethodInitSpec(this, _configureGlobalPlayElement);
  }

  _createClass(PlayElement, [{
    key: "setUp",
    value: function setUp() {
      _classPrivateMethodGet(this, _configureGlobalPlayElement, _configureGlobalPlayElement2).call(this);

      _classPrivateMethodGet(this, _configureCollectionPlayElement, _configureCollectionPlayElement2).call(this);

      _classPrivateMethodGet(this, _configureAudioPlayElement, _configureAudioPlayElement2).call(this);

      _classPrivateMethodGet(this, _configureCollectionAudioPlayElement, _configureCollectionAudioPlayElement2).call(this);
    }
  }]);

  return PlayElement;
}();

function _configureGlobalPlayElement2() {
  var globalPlayElement = new _PlayElements_GlobalPlayElement__WEBPACK_IMPORTED_MODULE_0__.GlobalPlayElement();
  globalPlayElement.initialize();
}

function _configureCollectionPlayElement2() {
  var collectionPlayElement = new _PlayElements_CollectionPlayElement__WEBPACK_IMPORTED_MODULE_1__.CollectionPlayElement();
  collectionPlayElement.initialize();
}

function _configureAudioPlayElement2() {
  var audioPlayElement = new _PlayElements_AudioPlayElement__WEBPACK_IMPORTED_MODULE_2__.AudioPlayElement();
  audioPlayElement.initialize();
}

function _configureCollectionAudioPlayElement2() {
  var collectionAudioPlayElement = new _PlayElements_CollectionAudioPlayElement__WEBPACK_IMPORTED_MODULE_3__.CollectionAudioPlayElement();
  collectionAudioPlayElement.initialize();
}

/***/ }),

/***/ "./src/elements/PlayElements/AudioPlayElement.js":
/*!*******************************************************!*\
  !*** ./src/elements/PlayElements/AudioPlayElement.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AudioPlayElement": () => (/* binding */ AudioPlayElement)
/* harmony export */ });
/* harmony import */ var _core_Audio_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Audio.js */ "./src/core/Audio.js");
/* harmony import */ var _services_Audio_Checks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/Audio/Checks.js */ "./src/services/Audio/Checks.js");
/* harmony import */ var _services_Audio_Navigation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/services/Audio/Navigation.js */ "./src/services/Audio/Navigation.js");
/* harmony import */ var _services_Collections_Checks_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/services/Collections/Checks.js */ "./src/services/Collections/Checks.js");
/* harmony import */ var _services_Collections_Navigation_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/services/Collections/Navigation.js */ "./src/services/Collections/Navigation.js");
/* harmony import */ var _services_Debug__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/services/Debug */ "./src/services/Debug.js");
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/config */ "./src/config.js");
/* harmony import */ var _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/elements/PlayPauseElement */ "./src/elements/PlayPauseElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }











var _elements = /*#__PURE__*/new WeakMap();

var _mobile = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _bindInteractions = /*#__PURE__*/new WeakSet();

var _handleInteraction = /*#__PURE__*/new WeakSet();

var _handleCollectionChanges = /*#__PURE__*/new WeakSet();

var _handleAudioChanges = /*#__PURE__*/new WeakSet();

var _playAudio = /*#__PURE__*/new WeakSet();

var AudioPlayElement = /*#__PURE__*/function () {
  function AudioPlayElement() {
    _classCallCheck(this, AudioPlayElement);

    _classPrivateMethodInitSpec(this, _playAudio);

    _classPrivateMethodInitSpec(this, _handleAudioChanges);

    _classPrivateMethodInitSpec(this, _handleCollectionChanges);

    _classPrivateMethodInitSpec(this, _handleInteraction);

    _classPrivateMethodInitSpec(this, _bindInteractions);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _mobile, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _mobile, _services_ConfigState__WEBPACK_IMPORTED_MODULE_6__.ConfigState.isMobile());
  }

  _createClass(AudioPlayElement, [{
    key: "initialize",
    value: function initialize() {
      _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

      _classPrivateMethodGet(this, _bindInteractions, _bindInteractions2).call(this);
    }
  }]);

  return AudioPlayElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(AudioPlayElement.audioPlayQuery));
}

function _bindInteractions2() {
  var _this = this;

  _classPrivateFieldGet(this, _elements).forEach(function (element) {
    if (_classPrivateFieldGet(_this, _mobile)) {
      element.removeEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2).bind(_this, element));
    } else {
      element.removeEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2).bind(_this, element));
    }
  });
}

function _handleInteraction2(element) {
  if (!_services_ConfigState__WEBPACK_IMPORTED_MODULE_6__.ConfigState.isTouchMoving()) {
    var index = element.getAttribute('data-amplitude-audio-index');

    if (!_services_Audio_Checks_js__WEBPACK_IMPORTED_MODULE_1__.Checks.audioExists(index)) {
      _services_Debug__WEBPACK_IMPORTED_MODULE_5__.Debug.writeMessage('Audio with index "' + index + '" does not exist! Please add an audio object at this index in your configuration.');
      return false;
    }

    _classPrivateMethodGet(this, _handleCollectionChanges, _handleCollectionChanges2).call(this, index);

    _classPrivateMethodGet(this, _handleAudioChanges, _handleAudioChanges2).call(this, index);

    _classPrivateMethodGet(this, _playAudio, _playAudio2).call(this);

    _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_8__.PlayPauseElement.syncAll();
  }
}

function _handleCollectionChanges2(index) {
  if (_services_Collections_Checks_js__WEBPACK_IMPORTED_MODULE_3__.Checks.collectionChanged(null)) {
    var collectionNavigation = new _services_Collections_Navigation_js__WEBPACK_IMPORTED_MODULE_4__.Navigation();
    var audioNavigation = new _services_Audio_Navigation_js__WEBPACK_IMPORTED_MODULE_2__.Navigation();
    collectionNavigation.setActiveCollection(null);
    audioNavigation.changeAudio(_config__WEBPACK_IMPORTED_MODULE_7__.config.audio[index], index, true);
  }
}

function _handleAudioChanges2(index) {
  if (_services_Audio_Checks_js__WEBPACK_IMPORTED_MODULE_1__.Checks.audioChanged(index)) {
    var audioNavigation = new _services_Audio_Navigation_js__WEBPACK_IMPORTED_MODULE_2__.Navigation();
    audioNavigation.changeAudio(_config__WEBPACK_IMPORTED_MODULE_7__.config.audio[index], index, true);
  }
}

function _playAudio2() {
  var audio = new _core_Audio_js__WEBPACK_IMPORTED_MODULE_0__.Audio();
  audio.play();
}

_defineProperty(AudioPlayElement, "audioPlayQuery", '.amplitude-play[data-amplitude-audio-index]:not([data-amplitude-collection-key])');

/***/ }),

/***/ "./src/elements/PlayElements/CollectionAudioPlayElement.js":
/*!*****************************************************************!*\
  !*** ./src/elements/PlayElements/CollectionAudioPlayElement.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollectionAudioPlayElement": () => (/* binding */ CollectionAudioPlayElement)
/* harmony export */ });
/* harmony import */ var _core_Audio_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Audio.js */ "./src/core/Audio.js");
/* harmony import */ var _services_Audio_Checks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/Audio/Checks.js */ "./src/services/Audio/Checks.js");
/* harmony import */ var _services_Collections_Checks_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/services/Collections/Checks.js */ "./src/services/Collections/Checks.js");
/* harmony import */ var _services_Collections_Navigation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/services/Collections/Navigation.js */ "./src/services/Collections/Navigation.js");
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/config */ "./src/config.js");
/* harmony import */ var _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/elements/PlayPauseElement */ "./src/elements/PlayPauseElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }









var _elements = /*#__PURE__*/new WeakMap();

var _mobile = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _bindInteractions = /*#__PURE__*/new WeakSet();

var _handleInteraction = /*#__PURE__*/new WeakSet();

var _handleCollectionChanges = /*#__PURE__*/new WeakSet();

var _handleAudioChanges = /*#__PURE__*/new WeakSet();

var _playAudio = /*#__PURE__*/new WeakSet();

var CollectionAudioPlayElement = /*#__PURE__*/function () {
  function CollectionAudioPlayElement() {
    _classCallCheck(this, CollectionAudioPlayElement);

    _classPrivateMethodInitSpec(this, _playAudio);

    _classPrivateMethodInitSpec(this, _handleAudioChanges);

    _classPrivateMethodInitSpec(this, _handleCollectionChanges);

    _classPrivateMethodInitSpec(this, _handleInteraction);

    _classPrivateMethodInitSpec(this, _bindInteractions);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _mobile, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _mobile, _services_ConfigState__WEBPACK_IMPORTED_MODULE_4__.ConfigState.isMobile());
  }

  _createClass(CollectionAudioPlayElement, [{
    key: "initialize",
    value: function initialize() {
      _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

      _classPrivateMethodGet(this, _bindInteractions, _bindInteractions2).call(this);
    }
  }]);

  return CollectionAudioPlayElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(CollectionAudioPlayElement.collectionAudioPlayQuery));
}

function _bindInteractions2() {
  var _this = this;

  _classPrivateFieldGet(this, _elements).forEach(function (element) {
    if (_classPrivateFieldGet(_this, _mobile)) {
      element.removeEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
    } else {
      element.removeEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
    }
  });
}

function _handleInteraction2() {
  if (!_services_ConfigState__WEBPACK_IMPORTED_MODULE_4__.ConfigState.isTouchMoving()) {
    var collectionKey = this.getAttribute('data-amplitude-collection-key');
    var audioIndex = this.getAttribute('data-amplitude-audio-index');

    _classPrivateMethodGet(this, _handleCollectionChanges, _handleCollectionChanges2).call(this, collectionKey, audioIndex);

    _classPrivateMethodGet(this, _handleAudioChanges, _handleAudioChanges2).call(this, collectionKey, audioIndex);

    _classPrivateMethodGet(this, _playAudio, _playAudio2).call(this);

    _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_6__.PlayPauseElement.syncAll();
  }
}

function _handleCollectionChanges2(collectionKey, audioIndex) {
  if (_services_Collections_Checks_js__WEBPACK_IMPORTED_MODULE_2__.Checks.collectionChanged(collectionKey)) {
    var collectionNavigation = new _services_Collections_Navigation_js__WEBPACK_IMPORTED_MODULE_3__.Navigation();
    collectionNavigation.setActiveCollection(collectionKey);
    collectionNavigation.changeAudioCollection(collectionKey, _config__WEBPACK_IMPORTED_MODULE_5__.config.collections[collectionKey].audio[audioIndex], audioIndex, true);
  }
}

function _handleAudioChanges2(collectionKey, audioIndex) {
  if (_services_Audio_Checks_js__WEBPACK_IMPORTED_MODULE_1__.Checks.audioChanged(audioIndex, collectionKey)) {
    var collectionNavigation = new _services_Collections_Navigation_js__WEBPACK_IMPORTED_MODULE_3__.Navigation();
    collectionNavigation.changeAudioCollection(collectionKey, _config__WEBPACK_IMPORTED_MODULE_5__.config.collections[collectionKey].audio[audioIndex], audioIndex, true);
  }
}

function _playAudio2() {
  var audio = new _core_Audio_js__WEBPACK_IMPORTED_MODULE_0__.Audio();
  audio.play();
}

_defineProperty(CollectionAudioPlayElement, "collectionAudioPlayQuery", '.amplitude-play[data-amplitude-audio-index][data-amplitude-collection-key]');

/***/ }),

/***/ "./src/elements/PlayElements/CollectionPlayElement.js":
/*!************************************************************!*\
  !*** ./src/elements/PlayElements/CollectionPlayElement.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollectionPlayElement": () => (/* binding */ CollectionPlayElement)
/* harmony export */ });
/* harmony import */ var _core_Audio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Audio */ "./src/core/Audio.js");
/* harmony import */ var _services_Collections_Checks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/Collections/Checks */ "./src/services/Collections/Checks.js");
/* harmony import */ var _services_Collections_Navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/services/Collections/Navigation */ "./src/services/Collections/Navigation.js");
/* harmony import */ var _services_Debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/services/Debug */ "./src/services/Debug.js");
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/config */ "./src/config.js");
/* harmony import */ var _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/elements/PlayPauseElement */ "./src/elements/PlayPauseElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }









var _elements = /*#__PURE__*/new WeakMap();

var _mobile = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _bindInteractions = /*#__PURE__*/new WeakSet();

var _handleInteraction = /*#__PURE__*/new WeakSet();

var _handleCollectionChanges = /*#__PURE__*/new WeakSet();

var _playAudio = /*#__PURE__*/new WeakSet();

var CollectionPlayElement = /*#__PURE__*/function () {
  function CollectionPlayElement() {
    _classCallCheck(this, CollectionPlayElement);

    _classPrivateMethodInitSpec(this, _playAudio);

    _classPrivateMethodInitSpec(this, _handleCollectionChanges);

    _classPrivateMethodInitSpec(this, _handleInteraction);

    _classPrivateMethodInitSpec(this, _bindInteractions);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _mobile, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _mobile, _services_ConfigState__WEBPACK_IMPORTED_MODULE_4__.ConfigState.isMobile());
  }

  _createClass(CollectionPlayElement, [{
    key: "initialize",
    value: function initialize() {
      _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

      _classPrivateMethodGet(this, _bindInteractions, _bindInteractions2).call(this);
    }
  }]);

  return CollectionPlayElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(CollectionPlayElement.collectionPlayQuery));
}

function _bindInteractions2() {
  var _this = this;

  _classPrivateFieldGet(this, _elements).forEach(function (element) {
    if (_classPrivateFieldGet(_this, _mobile)) {
      element.removeEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
    } else {
      element.removeEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
    }
  });
}

function _handleInteraction2() {
  if (!_services_ConfigState__WEBPACK_IMPORTED_MODULE_4__.ConfigState.isTouchMoving()) {
    var collection = this.getAttribute('data-amplitude-collection-key');

    if (!_services_Collections_Checks__WEBPACK_IMPORTED_MODULE_1__.Checks.collectionExists(collection)) {
      _services_Debug__WEBPACK_IMPORTED_MODULE_3__.Debug.writeMessage('Collection with key "' + collection + '" does not exist! Please define this collection in your configuration.');
      return false;
    }

    _classPrivateMethodGet(this, _handleCollectionChanges, _handleCollectionChanges2).call(this, collection);

    _classPrivateMethodGet(this, _playAudio, _playAudio2).call(this);

    _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_6__.PlayPauseElement.syncAll();
  }
}

function _handleCollectionChanges2(collection) {
  if (_services_Collections_Checks__WEBPACK_IMPORTED_MODULE_1__.Checks.collectionChanged(collection)) {
    var collectionNavigation = new _services_Collections_Navigation__WEBPACK_IMPORTED_MODULE_2__.Navigation();
    collectionNavigation.setActiveCollection(collection); // If the collection is shuffled and the collection is changed,
    // we change the audio to be the first audio in the array. Since,
    // we are changing the collection, we are starting at the top.

    if (_services_Collections_Checks__WEBPACK_IMPORTED_MODULE_1__.Checks.isCollectionShuffled(collection)) {
      collectionNavigation.changeAudioCollection(collection, _config__WEBPACK_IMPORTED_MODULE_5__.config.collections[collection].shuffle_list[0], 0, true);
    } else {
      collectionNavigation.changeAudioCollection(collection, _config__WEBPACK_IMPORTED_MODULE_5__.config.collections[collection].audio[0], 0);
    }
  }
}

function _playAudio2() {
  var audio = new _core_Audio__WEBPACK_IMPORTED_MODULE_0__.Audio();
  audio.play();
}

_defineProperty(CollectionPlayElement, "collectionPlayQuery", '.amplitude-play[data-amplitude-collection-key]:not([data-amplitude-audio-index])');

/***/ }),

/***/ "./src/elements/PlayElements/GlobalPlayElement.js":
/*!********************************************************!*\
  !*** ./src/elements/PlayElements/GlobalPlayElement.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GlobalPlayElement": () => (/* binding */ GlobalPlayElement)
/* harmony export */ });
/* harmony import */ var _core_Audio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Audio */ "./src/core/Audio.js");
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/elements/PlayPauseElement */ "./src/elements/PlayPauseElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }





var _elements = /*#__PURE__*/new WeakMap();

var _mobile = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _bindInteractions = /*#__PURE__*/new WeakSet();

var _handleInteraction = /*#__PURE__*/new WeakSet();

var GlobalPlayElement = /*#__PURE__*/function () {
  function GlobalPlayElement() {
    _classCallCheck(this, GlobalPlayElement);

    _classPrivateMethodInitSpec(this, _handleInteraction);

    _classPrivateMethodInitSpec(this, _bindInteractions);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _mobile, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _mobile, _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isMobile());
  }

  _createClass(GlobalPlayElement, [{
    key: "initialize",
    value: function initialize() {
      _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

      _classPrivateMethodGet(this, _bindInteractions, _bindInteractions2).call(this);
    }
  }]);

  return GlobalPlayElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(GlobalPlayElement.globalPlayQuery));
}

function _bindInteractions2() {
  var _this = this;

  _classPrivateFieldGet(this, _elements).forEach(function (element) {
    if (_classPrivateFieldGet(_this, _mobile)) {
      element.removeEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
    } else {
      element.removeEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
    }
  });
}

function _handleInteraction2() {
  var audio = new _core_Audio__WEBPACK_IMPORTED_MODULE_0__.Audio();
  audio.play();
  _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_2__.PlayPauseElement.syncAll();
}

_defineProperty(GlobalPlayElement, "globalPlayQuery", '.amplitude-play:not([data-amplitude-audio-index]):not([data-amplitude-collection-index])');

/***/ }),

/***/ "./src/elements/PlayPauseElement.js":
/*!******************************************!*\
  !*** ./src/elements/PlayPauseElement.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlayPauseElement": () => (/* binding */ PlayPauseElement)
/* harmony export */ });
/* harmony import */ var _PlayPauseElements_GlobalPlayPauseElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlayPauseElements/GlobalPlayPauseElement */ "./src/elements/PlayPauseElements/GlobalPlayPauseElement.js");
/* harmony import */ var _PlayPauseElements_CollectionPlayPauseElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PlayPauseElements/CollectionPlayPauseElement */ "./src/elements/PlayPauseElements/CollectionPlayPauseElement.js");
/* harmony import */ var _PlayPauseElements_AudioPlayPauseElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PlayPauseElements/AudioPlayPauseElement */ "./src/elements/PlayPauseElements/AudioPlayPauseElement.js");
/* harmony import */ var _PlayPauseElements_CollectionAudioPlayPauseElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PlayPauseElements/CollectionAudioPlayPauseElement */ "./src/elements/PlayPauseElements/CollectionAudioPlayPauseElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }





/**
 * Handles the configuration and managing of Play/Pause elements.
 * 
 * A Play Pause element is defined as the following:
 * 
 * Element: class="amplitude-play-pause"
 * 
 * GLOBAL: class="amplitude-play-pause" 
 * Controls the entire state of the audio player. Will play or pause whatever is active.
 * 
 * COLLECTION: class="amplitude-play-pause" data-amplitude-collection-key="{collection_key}"
 * Scoped to an individual collection. Will only play or pause within the scope of a collection.
 * 
 * AUDIO: class="amplitude-play-pause" data-amplitude-audio-index="{audio_index}"
 * Scoped to an individual audio element. Will only play or pause a specific piece of audio.
 * 
 * AUDIO IN COLLECTION: class="amplitude-play-pause" data-amplitude-collection-key="{collection_key}" data-amplitude-audio-index="{audio_index}"
 * Scoped to an individual audio element within a collection. Will only play or pause a specific piece of audio in a collection.
 */

var _configureGlobalPlayPauseElement = /*#__PURE__*/new WeakSet();

var _configureCollectionPlayPauseElement = /*#__PURE__*/new WeakSet();

var _configureAudioPlayPauseElement = /*#__PURE__*/new WeakSet();

var _configureCollectionAudioPlayPauseElement = /*#__PURE__*/new WeakSet();

var PlayPauseElement = /*#__PURE__*/function () {
  function PlayPauseElement() {
    _classCallCheck(this, PlayPauseElement);

    _classPrivateMethodInitSpec(this, _configureCollectionAudioPlayPauseElement);

    _classPrivateMethodInitSpec(this, _configureAudioPlayPauseElement);

    _classPrivateMethodInitSpec(this, _configureCollectionPlayPauseElement);

    _classPrivateMethodInitSpec(this, _configureGlobalPlayPauseElement);
  }

  _createClass(PlayPauseElement, [{
    key: "setUp",
    value: function setUp() {
      _classPrivateMethodGet(this, _configureGlobalPlayPauseElement, _configureGlobalPlayPauseElement2).call(this);

      _classPrivateMethodGet(this, _configureCollectionPlayPauseElement, _configureCollectionPlayPauseElement2).call(this);

      _classPrivateMethodGet(this, _configureAudioPlayPauseElement, _configureAudioPlayPauseElement2).call(this);

      _classPrivateMethodGet(this, _configureCollectionAudioPlayPauseElement, _configureCollectionAudioPlayPauseElement2).call(this);
    }
  }], [{
    key: "syncAll",
    value: function syncAll() {
      _PlayPauseElements_GlobalPlayPauseElement__WEBPACK_IMPORTED_MODULE_0__.GlobalPlayPauseElement.syncUI();
      _PlayPauseElements_CollectionPlayPauseElement__WEBPACK_IMPORTED_MODULE_1__.CollectionPlayPauseElement.syncUI();
      _PlayPauseElements_AudioPlayPauseElement__WEBPACK_IMPORTED_MODULE_2__.AudioPlayPauseElement.syncUI();
      _PlayPauseElements_CollectionAudioPlayPauseElement__WEBPACK_IMPORTED_MODULE_3__.CollectionAudioPlayPauseElement.syncUI();
    }
  }, {
    key: "syncAllToPause",
    value: function syncAllToPause() {
      _PlayPauseElements_GlobalPlayPauseElement__WEBPACK_IMPORTED_MODULE_0__.GlobalPlayPauseElement.syncToPause();
      _PlayPauseElements_CollectionPlayPauseElement__WEBPACK_IMPORTED_MODULE_1__.CollectionPlayPauseElement.syncToPause();
      _PlayPauseElements_AudioPlayPauseElement__WEBPACK_IMPORTED_MODULE_2__.AudioPlayPauseElement.syncToPause();
      _PlayPauseElements_CollectionAudioPlayPauseElement__WEBPACK_IMPORTED_MODULE_3__.CollectionAudioPlayPauseElement.syncToPause();
    }
    /**
     * Sets an element to be playing by removing the 'amplitude-paused' class
     * and adding the 'amplitude-playing' class
     *
     * @access public
     * @static
     * @param {element} element - The element getting the playing class added.
     */

  }, {
    key: "setElementPlay",
    value: function setElementPlay(element) {
      element.classList.add("amplitude-playing");
      element.classList.remove("amplitude-paused");
    }
    /**
     * Sets an element to be paused by adding the 'amplitude-paused' class
     * and removing the 'amplitude-playing' class
     *
     * @access public
     * @static
     * @param {element} element - The element getting the paused class added.
     */

  }, {
    key: "setElementPause",
    value: function setElementPause(element) {
      element.classList.remove("amplitude-playing");
      element.classList.add("amplitude-paused");
    }
  }]);

  return PlayPauseElement;
}();

function _configureGlobalPlayPauseElement2() {
  var globalPlayPauseElement = new _PlayPauseElements_GlobalPlayPauseElement__WEBPACK_IMPORTED_MODULE_0__.GlobalPlayPauseElement();
  globalPlayPauseElement.initialize();
}

function _configureCollectionPlayPauseElement2() {
  var collectionPlayPauseElement = new _PlayPauseElements_CollectionPlayPauseElement__WEBPACK_IMPORTED_MODULE_1__.CollectionPlayPauseElement();
  collectionPlayPauseElement.initialize();
}

function _configureAudioPlayPauseElement2() {
  var audioPlayPauseElement = new _PlayPauseElements_AudioPlayPauseElement__WEBPACK_IMPORTED_MODULE_2__.AudioPlayPauseElement();
  audioPlayPauseElement.initialize();
}

function _configureCollectionAudioPlayPauseElement2() {
  var collectionAudioPlayPauseElement = new _PlayPauseElements_CollectionAudioPlayPauseElement__WEBPACK_IMPORTED_MODULE_3__.CollectionAudioPlayPauseElement();
  collectionAudioPlayPauseElement.initialize();
}

/***/ }),

/***/ "./src/elements/PlayPauseElements/AudioPlayPauseElement.js":
/*!*****************************************************************!*\
  !*** ./src/elements/PlayPauseElements/AudioPlayPauseElement.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AudioPlayPauseElement": () => (/* binding */ AudioPlayPauseElement)
/* harmony export */ });
/* harmony import */ var _core_Audio_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Audio.js */ "./src/core/Audio.js");
/* harmony import */ var _services_Audio_Checks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/Audio/Checks.js */ "./src/services/Audio/Checks.js");
/* harmony import */ var _services_Audio_Navigation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/services/Audio/Navigation.js */ "./src/services/Audio/Navigation.js");
/* harmony import */ var _services_Collections_Checks_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/services/Collections/Checks.js */ "./src/services/Collections/Checks.js");
/* harmony import */ var _services_Collections_Navigation_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/services/Collections/Navigation.js */ "./src/services/Collections/Navigation.js");
/* harmony import */ var _services_Debug__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/services/Debug */ "./src/services/Debug.js");
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/config */ "./src/config.js");
/* harmony import */ var _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/elements/PlayPauseElement */ "./src/elements/PlayPauseElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }











var _elements = /*#__PURE__*/new WeakMap();

var _mobile = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _bindInteractions = /*#__PURE__*/new WeakSet();

var _handleInteraction = /*#__PURE__*/new WeakSet();

var _handleCollectionChanges = /*#__PURE__*/new WeakSet();

var _handleAudioChanges = /*#__PURE__*/new WeakSet();

var _toggleAudio = /*#__PURE__*/new WeakSet();

var AudioPlayPauseElement = /*#__PURE__*/function () {
  function AudioPlayPauseElement() {
    _classCallCheck(this, AudioPlayPauseElement);

    _classPrivateMethodInitSpec(this, _toggleAudio);

    _classPrivateMethodInitSpec(this, _handleAudioChanges);

    _classPrivateMethodInitSpec(this, _handleCollectionChanges);

    _classPrivateMethodInitSpec(this, _handleInteraction);

    _classPrivateMethodInitSpec(this, _bindInteractions);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _mobile, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _mobile, _services_ConfigState__WEBPACK_IMPORTED_MODULE_6__.ConfigState.isMobile());
  }

  _createClass(AudioPlayPauseElement, [{
    key: "initialize",
    value: function initialize() {
      _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

      _classPrivateMethodGet(this, _bindInteractions, _bindInteractions2).call(this);
    }
  }], [{
    key: "syncUI",
    value: function syncUI() {
      var state = _services_ConfigState__WEBPACK_IMPORTED_MODULE_6__.ConfigState.getAudioState();
      var elements = document.querySelectorAll(AudioPlayPauseElement.audioPlayPauseQuery);
      var activeAudioIndex = _services_ConfigState__WEBPACK_IMPORTED_MODULE_6__.ConfigState.getActiveAudioIndex();
      elements.forEach(function (element) {
        var elementAudioIndex = element.getAttribute('data-amplitude-audio-index');

        if (state == 'playing' && activeAudioIndex == elementAudioIndex) {
          _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_8__.PlayPauseElement.setElementPlay(element);
        } else {
          _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_8__.PlayPauseElement.setElementPause(element);
        }
      });
    }
  }, {
    key: "syncToPause",
    value: function syncToPause() {
      var elements = document.querySelectorAll(AudioPlayPauseElement.audioPlayPauseQuery);
      elements.forEach(function (element) {
        _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_8__.PlayPauseElement.setElementPause(element);
      });
    }
  }]);

  return AudioPlayPauseElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(AudioPlayPauseElement.audioPlayPauseQuery));
}

function _bindInteractions2() {
  var _this = this;

  _classPrivateFieldGet(this, _elements).forEach(function (element) {
    if (_classPrivateFieldGet(_this, _mobile)) {
      element.removeEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2).bind(_this, element));
    } else {
      element.removeEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2).bind(_this, element));
    }
  });
}

function _handleInteraction2(element) {
  if (!_services_ConfigState__WEBPACK_IMPORTED_MODULE_6__.ConfigState.isTouchMoving()) {
    var index = element.getAttribute('data-amplitude-audio-index');

    if (!_services_Audio_Checks_js__WEBPACK_IMPORTED_MODULE_1__.Checks.audioExists(index)) {
      _services_Debug__WEBPACK_IMPORTED_MODULE_5__.Debug.writeMessage('Audio with index "' + index + '" does not exist! Please add an audio object at this index in your configuration.');
      return false;
    }

    _classPrivateMethodGet(this, _handleCollectionChanges, _handleCollectionChanges2).call(this, index);

    _classPrivateMethodGet(this, _handleAudioChanges, _handleAudioChanges2).call(this, index);

    _classPrivateMethodGet(this, _toggleAudio, _toggleAudio2).call(this);

    _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_8__.PlayPauseElement.syncAll();
  }
}

function _handleCollectionChanges2(index) {
  if (_services_Collections_Checks_js__WEBPACK_IMPORTED_MODULE_3__.Checks.collectionChanged(null)) {
    var collectionNavigation = new _services_Collections_Navigation_js__WEBPACK_IMPORTED_MODULE_4__.Navigation();
    var audioNavigation = new _services_Audio_Navigation_js__WEBPACK_IMPORTED_MODULE_2__.Navigation();
    collectionNavigation.setActiveCollection(null);
    audioNavigation.changeAudio(_config__WEBPACK_IMPORTED_MODULE_7__.config.audio[index], index, true);
  }
}

function _handleAudioChanges2(index) {
  if (_services_Audio_Checks_js__WEBPACK_IMPORTED_MODULE_1__.Checks.audioChanged(index)) {
    var audioNavigation = new _services_Audio_Navigation_js__WEBPACK_IMPORTED_MODULE_2__.Navigation();
    audioNavigation.changeAudio(_config__WEBPACK_IMPORTED_MODULE_7__.config.audio[index], index, true);
  }
}

function _toggleAudio2() {
  var audio = new _core_Audio_js__WEBPACK_IMPORTED_MODULE_0__.Audio();

  if (_config__WEBPACK_IMPORTED_MODULE_7__.config.audio_element.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

_defineProperty(AudioPlayPauseElement, "audioPlayPauseQuery", '.amplitude-play-pause[data-amplitude-audio-index]:not([data-amplitude-collection-key])');

/***/ }),

/***/ "./src/elements/PlayPauseElements/CollectionAudioPlayPauseElement.js":
/*!***************************************************************************!*\
  !*** ./src/elements/PlayPauseElements/CollectionAudioPlayPauseElement.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollectionAudioPlayPauseElement": () => (/* binding */ CollectionAudioPlayPauseElement)
/* harmony export */ });
/* harmony import */ var _core_Audio_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Audio.js */ "./src/core/Audio.js");
/* harmony import */ var _services_Audio_Checks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/Audio/Checks.js */ "./src/services/Audio/Checks.js");
/* harmony import */ var _services_Collections_Checks_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/services/Collections/Checks.js */ "./src/services/Collections/Checks.js");
/* harmony import */ var _services_Collections_Navigation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/services/Collections/Navigation.js */ "./src/services/Collections/Navigation.js");
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/config */ "./src/config.js");
/* harmony import */ var _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/elements/PlayPauseElement */ "./src/elements/PlayPauseElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }









var _elements = /*#__PURE__*/new WeakMap();

var _mobile = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _bindInteractions = /*#__PURE__*/new WeakSet();

var _handleInteraction = /*#__PURE__*/new WeakSet();

var _handleCollectionChanges = /*#__PURE__*/new WeakSet();

var _handleAudioChanges = /*#__PURE__*/new WeakSet();

var _toggleAudio = /*#__PURE__*/new WeakSet();

var CollectionAudioPlayPauseElement = /*#__PURE__*/function () {
  function CollectionAudioPlayPauseElement() {
    _classCallCheck(this, CollectionAudioPlayPauseElement);

    _classPrivateMethodInitSpec(this, _toggleAudio);

    _classPrivateMethodInitSpec(this, _handleAudioChanges);

    _classPrivateMethodInitSpec(this, _handleCollectionChanges);

    _classPrivateMethodInitSpec(this, _handleInteraction);

    _classPrivateMethodInitSpec(this, _bindInteractions);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _mobile, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _mobile, _services_ConfigState__WEBPACK_IMPORTED_MODULE_4__.ConfigState.isMobile());
  }

  _createClass(CollectionAudioPlayPauseElement, [{
    key: "initialize",
    value: function initialize() {
      _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

      _classPrivateMethodGet(this, _bindInteractions, _bindInteractions2).call(this);
    }
  }], [{
    key: "syncUI",
    value: function syncUI() {
      var state = _services_ConfigState__WEBPACK_IMPORTED_MODULE_4__.ConfigState.getAudioState();
      var elements = document.querySelectorAll(CollectionAudioPlayPauseElement.collectionAudioPlayPauseQuery);
      elements.forEach(function (element) {
        if (state == 'playing') {
          _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_6__.PlayPauseElement.setElementPlay(element);
        } else {
          _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_6__.PlayPauseElement.setElementPause(element);
        }
      });
    }
  }, {
    key: "syncToPause",
    value: function syncToPause() {
      var elements = document.querySelectorAll(CollectionAudioPlayPauseElement.collectionAudioPlayPauseQuery);
      elements.forEach(function (element) {
        _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_6__.PlayPauseElement.setElementPause(element);
      });
    }
  }]);

  return CollectionAudioPlayPauseElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(CollectionAudioPlayPauseElement.collectionAudioPlayPauseQuery));
}

function _bindInteractions2() {
  var _this = this;

  _classPrivateFieldGet(this, _elements).forEach(function (element) {
    if (_classPrivateFieldGet(_this, _mobile)) {
      element.removeEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2).bind(_this, element));
    } else {
      element.removeEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2).bind(_this, element));
    }
  });
}

function _handleInteraction2(element) {
  if (!_services_ConfigState__WEBPACK_IMPORTED_MODULE_4__.ConfigState.isTouchMoving()) {
    var collectionKey = element.getAttribute('data-amplitude-collection-key');
    var audioIndex = element.getAttribute('data-amplitude-audio-index');

    _classPrivateMethodGet(this, _handleCollectionChanges, _handleCollectionChanges2).call(this, collectionKey, audioIndex);

    _classPrivateMethodGet(this, _handleAudioChanges, _handleAudioChanges2).call(this, collectionKey, audioIndex);

    _classPrivateMethodGet(this, _toggleAudio, _toggleAudio2).call(this);

    _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_6__.PlayPauseElement.syncAll();
  }
}

function _handleCollectionChanges2(collectionKey, audioIndex) {
  if (_services_Collections_Checks_js__WEBPACK_IMPORTED_MODULE_2__.Checks.collectionChanged(collectionKey)) {
    var collectionNavigation = new _services_Collections_Navigation_js__WEBPACK_IMPORTED_MODULE_3__.Navigation();
    collectionNavigation.setActiveCollection(collectionKey);
    collectionNavigation.changeAudioCollection(collectionKey, _config__WEBPACK_IMPORTED_MODULE_5__.config.collections[collectionKey].audio[audioIndex], audioIndex, true);
  }
}

function _handleAudioChanges2(collectionKey, audioIndex) {
  if (_services_Audio_Checks_js__WEBPACK_IMPORTED_MODULE_1__.Checks.audioChanged(audioIndex, collectionKey)) {
    var collectionNavigation = new _services_Collections_Navigation_js__WEBPACK_IMPORTED_MODULE_3__.Navigation();
    collectionNavigation.changeAudioCollection(collectionKey, _config__WEBPACK_IMPORTED_MODULE_5__.config.collections[collectionKey].audio[audioIndex], audioIndex, true);
  }
}

function _toggleAudio2() {
  var audio = new _core_Audio_js__WEBPACK_IMPORTED_MODULE_0__.Audio();

  if (_config__WEBPACK_IMPORTED_MODULE_5__.config.audio_element.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

_defineProperty(CollectionAudioPlayPauseElement, "collectionAudioPlayPauseQuery", '.amplitude-play-pause[data-amplitude-audio-index][data-amplitude-collection-key]');

/***/ }),

/***/ "./src/elements/PlayPauseElements/CollectionPlayPauseElement.js":
/*!**********************************************************************!*\
  !*** ./src/elements/PlayPauseElements/CollectionPlayPauseElement.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollectionPlayPauseElement": () => (/* binding */ CollectionPlayPauseElement)
/* harmony export */ });
/* harmony import */ var _core_Audio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Audio */ "./src/core/Audio.js");
/* harmony import */ var _services_Collections_Checks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/Collections/Checks */ "./src/services/Collections/Checks.js");
/* harmony import */ var _services_Collections_Navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/services/Collections/Navigation */ "./src/services/Collections/Navigation.js");
/* harmony import */ var _services_Debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/services/Debug */ "./src/services/Debug.js");
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/config */ "./src/config.js");
/* harmony import */ var _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/elements/PlayPauseElement */ "./src/elements/PlayPauseElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }








/**
 * A Collection Play Pause element is defined by the following:
 * 
 * Element: class="amplitude-play-pause" data-amplitude-collection-key="{collection_key}"
 */

var _elements = /*#__PURE__*/new WeakMap();

var _mobile = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _bindInteractions = /*#__PURE__*/new WeakSet();

var _handleInteraction = /*#__PURE__*/new WeakSet();

var _handleCollectionChanges = /*#__PURE__*/new WeakSet();

var _toggleAudio = /*#__PURE__*/new WeakSet();

var CollectionPlayPauseElement = /*#__PURE__*/function () {
  function CollectionPlayPauseElement() {
    _classCallCheck(this, CollectionPlayPauseElement);

    _classPrivateMethodInitSpec(this, _toggleAudio);

    _classPrivateMethodInitSpec(this, _handleCollectionChanges);

    _classPrivateMethodInitSpec(this, _handleInteraction);

    _classPrivateMethodInitSpec(this, _bindInteractions);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _mobile, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _mobile, _services_ConfigState__WEBPACK_IMPORTED_MODULE_4__.ConfigState.isMobile());
  }

  _createClass(CollectionPlayPauseElement, [{
    key: "initialize",
    value: function initialize() {
      _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

      _classPrivateMethodGet(this, _bindInteractions, _bindInteractions2).call(this);
    }
  }], [{
    key: "syncUI",
    value: function syncUI() {
      var state = _services_ConfigState__WEBPACK_IMPORTED_MODULE_4__.ConfigState.getAudioState();
      var elements = document.querySelectorAll(CollectionPlayPauseElement.collectionPlayPauseQuery);
      var activeCollectionKey = _services_ConfigState__WEBPACK_IMPORTED_MODULE_4__.ConfigState.getActiveCollection();
      elements.forEach(function (element) {
        var elementCollectionKey = element.getAttribute('data-amplitude-collection-key');

        if (state == 'playing' && activeCollectionKey == elementCollectionKey) {
          _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_6__.PlayPauseElement.setElementPlay(element);
        } else {
          _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_6__.PlayPauseElement.setElementPause(element);
        }
      });
    }
  }, {
    key: "syncToPause",
    value: function syncToPause() {
      var elements = document.querySelectorAll(CollectionPlayPauseElement.collectionPlayPauseQuery);
      elements.forEach(function (element) {
        _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_6__.PlayPauseElement.setElementPause(element);
      });
    }
  }]);

  return CollectionPlayPauseElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(CollectionPlayPauseElement.collectionPlayPauseQuery));
}

function _bindInteractions2() {
  var _this = this;

  _classPrivateFieldGet(this, _elements).forEach(function (element) {
    ;

    if (_classPrivateFieldGet(_this, _mobile)) {
      element.removeEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2).bind(_this, element));
    } else {
      element.removeEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2).bind(_this, element));
    }
  });
}

function _handleInteraction2(element) {
  if (!_services_ConfigState__WEBPACK_IMPORTED_MODULE_4__.ConfigState.isTouchMoving()) {
    var collection = element.getAttribute('data-amplitude-collection-key');

    if (!_services_Collections_Checks__WEBPACK_IMPORTED_MODULE_1__.Checks.collectionExists(collection)) {
      _services_Debug__WEBPACK_IMPORTED_MODULE_3__.Debug.writeMessage('Collection with key "' + collection + '" does not exist! Please define this collection in your configuration.');
      return false;
    }

    _classPrivateMethodGet(this, _handleCollectionChanges, _handleCollectionChanges2).call(this, collection);

    _classPrivateMethodGet(this, _toggleAudio, _toggleAudio2).call(this);

    _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_6__.PlayPauseElement.syncAll();
  }
}

function _handleCollectionChanges2(collection) {
  if (_services_Collections_Checks__WEBPACK_IMPORTED_MODULE_1__.Checks.collectionChanged(collection)) {
    var collectionNavigation = new _services_Collections_Navigation__WEBPACK_IMPORTED_MODULE_2__.Navigation();
    collectionNavigation.setActiveCollection(collection); // If the collection is shuffled and the collection is changed,
    // we change the audio to be the first audio in the array. Since,
    // we are changing the collection, we are starting at the top.

    if (_services_Collections_Checks__WEBPACK_IMPORTED_MODULE_1__.Checks.isCollectionShuffled(collection)) {
      collectionNavigation.changeAudioCollection(collection, _config__WEBPACK_IMPORTED_MODULE_5__.config.collections[collection].shuffle_list[0], 0, true);
    } else {
      collectionNavigation.changeAudioCollection(collection, _config__WEBPACK_IMPORTED_MODULE_5__.config.collections[collection].audio[0], 0);
    }
  }
}

function _toggleAudio2() {
  var audio = new _core_Audio__WEBPACK_IMPORTED_MODULE_0__.Audio();

  if (_config__WEBPACK_IMPORTED_MODULE_5__.config.audio_element.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

_defineProperty(CollectionPlayPauseElement, "collectionPlayPauseQuery", '.amplitude-play-pause[data-amplitude-collection-key]:not([data-amplitude-audio-index])');

/***/ }),

/***/ "./src/elements/PlayPauseElements/GlobalPlayPauseElement.js":
/*!******************************************************************!*\
  !*** ./src/elements/PlayPauseElements/GlobalPlayPauseElement.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GlobalPlayPauseElement": () => (/* binding */ GlobalPlayPauseElement)
/* harmony export */ });
/* harmony import */ var _core_Audio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Audio */ "./src/core/Audio.js");
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/config */ "./src/config.js");
/* harmony import */ var _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/elements/PlayPauseElement */ "./src/elements/PlayPauseElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }






var _elements = /*#__PURE__*/new WeakMap();

var _mobile = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _bindInteractions = /*#__PURE__*/new WeakSet();

var _handleInteraction = /*#__PURE__*/new WeakSet();

var GlobalPlayPauseElement = /*#__PURE__*/function () {
  function GlobalPlayPauseElement() {
    _classCallCheck(this, GlobalPlayPauseElement);

    _classPrivateMethodInitSpec(this, _handleInteraction);

    _classPrivateMethodInitSpec(this, _bindInteractions);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _mobile, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _mobile, _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isMobile());
  }

  _createClass(GlobalPlayPauseElement, [{
    key: "initialize",
    value: function initialize() {
      _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

      _classPrivateMethodGet(this, _bindInteractions, _bindInteractions2).call(this);
    }
  }], [{
    key: "syncUI",
    value: function syncUI() {
      var state = _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.getAudioState();
      var elements = document.querySelectorAll(GlobalPlayPauseElement.globalPlayPauseQuery);
      elements.forEach(function (element) {
        if (state == 'playing') {
          _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_3__.PlayPauseElement.setElementPlay(element);
        } else {
          _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_3__.PlayPauseElement.setElementPause(element);
        }
      });
    }
  }, {
    key: "syncToPause",
    value: function syncToPause() {
      var elements = document.querySelectorAll(GlobalPlayPauseElement.globalPlayPauseQuery);
      elements.forEach(function (element) {
        _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_3__.PlayPauseElement.setElementPause(element);
      });
    }
  }]);

  return GlobalPlayPauseElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(GlobalPlayPauseElement.globalPlayPauseQuery));
}

function _bindInteractions2() {
  var _this = this;

  _classPrivateFieldGet(this, _elements).forEach(function (element) {
    if (_classPrivateFieldGet(_this, _mobile)) {
      element.removeEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
    } else {
      element.removeEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
    }
  });
}

function _handleInteraction2() {
  if (!_services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isTouchMoving()) {
    var audio = new _core_Audio__WEBPACK_IMPORTED_MODULE_0__.Audio();

    if (_config__WEBPACK_IMPORTED_MODULE_2__.config.audio_element.paused) {
      audio.play();
    } else {
      audio.pause();
    }

    _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_3__.PlayPauseElement.syncAll();
  }
}

_defineProperty(GlobalPlayPauseElement, "globalPlayPauseQuery", '.amplitude-play-pause:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])');

/***/ }),

/***/ "./src/elements/PlaybackSpeedElement.js":
/*!**********************************************!*\
  !*** ./src/elements/PlaybackSpeedElement.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlaybackSpeedElement": () => (/* binding */ PlaybackSpeedElement)
/* harmony export */ });
/* harmony import */ var _core_Audio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Audio */ "./src/core/Audio.js");
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }




var _elements = /*#__PURE__*/new WeakMap();

var _mobile = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _bindInteractions = /*#__PURE__*/new WeakSet();

var _handleInteraction = /*#__PURE__*/new WeakSet();

var PlaybackSpeedElement = /*#__PURE__*/function () {
  function PlaybackSpeedElement() {
    _classCallCheck(this, PlaybackSpeedElement);

    _classPrivateMethodInitSpec(this, _handleInteraction);

    _classPrivateMethodInitSpec(this, _bindInteractions);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _mobile, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _mobile, _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isMobile());
  }

  _createClass(PlaybackSpeedElement, [{
    key: "setUp",
    value: function setUp() {
      _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

      _classPrivateMethodGet(this, _bindInteractions, _bindInteractions2).call(this);
    }
  }], [{
    key: "syncElements",
    value: function syncElements() {
      var elements = document.querySelectorAll(PlaybackSpeedElement.playbackSpeedElementQuery);
      elements.forEach(function (element) {
        element.classList.remove("amplitude-playback-speed-10");
        element.classList.remove("amplitude-playback-speed-15");
        element.classList.remove("amplitude-playback-speed-20");

        switch (_services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.getPlaybackSpeed()) {
          case 1:
            element.classList.add("amplitude-playback-speed-10");
            break;

          case 1.5:
            element.classList.add("amplitude-playback-speed-15");
            break;

          case 2:
            element.classList.add("amplitude-playback-speed-20");
            break;
        }
      });
    }
  }]);

  return PlaybackSpeedElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(PlaybackSpeedElement.playbackSpeedElementQuery));
}

function _bindInteractions2() {
  var _this = this;

  _classPrivateFieldGet(this, _elements).forEach(function (element) {
    if (_classPrivateFieldGet(_this, _mobile)) {
      element.removeEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
    } else {
      element.removeEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
    }
  });
}

function _handleInteraction2() {
  if (!_services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isTouchMoving()) {
    var audio = new _core_Audio__WEBPACK_IMPORTED_MODULE_0__.Audio();

    switch (_services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.getPlaybackSpeed()) {
      case 1:
        audio.setPlaybackSpeed(1.5);
        break;

      case 1.5:
        audio.setPlaybackSpeed(2);
        break;

      case 2:
        audio.setPlaybackSpeed(1);
        break;
    }

    PlaybackSpeedElement.syncElements();
  }
}

_defineProperty(PlaybackSpeedElement, "playbackSpeedElementQuery", '.amplitude-playback-speed');

/***/ }),

/***/ "./src/elements/PreviousElement.js":
/*!*****************************************!*\
  !*** ./src/elements/PreviousElement.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PreviousElement": () => (/* binding */ PreviousElement)
/* harmony export */ });
/* harmony import */ var _PreviousElements_CollectionPreviousElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PreviousElements/CollectionPreviousElement */ "./src/elements/PreviousElements/CollectionPreviousElement.js");
/* harmony import */ var _PreviousElements_GlobalPreviousElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PreviousElements/GlobalPreviousElement */ "./src/elements/PreviousElements/GlobalPreviousElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }



/**
 * Handles the configuration and managing of Previous elements
 * 
 * A Previous element is defined as the following:
 * 
 * Element: class="amplitude-previous"
 * 
 * GLOBAL: class="amplitude-previous"
 * Handles previous for whatever scope the player is in.
 * 
 * COLLECTION: class="amplitude-previous" data-amplitude-collection="{collection_key}"
 * Handles the previous audio within a specific collection.
 */

var _configureGlobalPreviousElement = /*#__PURE__*/new WeakSet();

var _configureCollectionPreviousElement = /*#__PURE__*/new WeakSet();

var PreviousElement = /*#__PURE__*/function () {
  function PreviousElement() {
    _classCallCheck(this, PreviousElement);

    _classPrivateMethodInitSpec(this, _configureCollectionPreviousElement);

    _classPrivateMethodInitSpec(this, _configureGlobalPreviousElement);
  }

  _createClass(PreviousElement, [{
    key: "setUp",
    value: function setUp() {
      _classPrivateMethodGet(this, _configureGlobalPreviousElement, _configureGlobalPreviousElement2).call(this);

      _classPrivateMethodGet(this, _configureCollectionPreviousElement, _configureCollectionPreviousElement2).call(this);
    }
  }]);

  return PreviousElement;
}();

function _configureGlobalPreviousElement2() {
  var globalPreviousElement = new _PreviousElements_GlobalPreviousElement__WEBPACK_IMPORTED_MODULE_1__.GlobalPreviousElement();
  globalPreviousElement.initialize();
}

function _configureCollectionPreviousElement2() {
  var collectionPreviousElement = new _PreviousElements_CollectionPreviousElement__WEBPACK_IMPORTED_MODULE_0__.CollectionPreviousElement();
  collectionPreviousElement.initialize();
}

/***/ }),

/***/ "./src/elements/PreviousElements/CollectionPreviousElement.js":
/*!********************************************************************!*\
  !*** ./src/elements/PreviousElements/CollectionPreviousElement.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollectionPreviousElement": () => (/* binding */ CollectionPreviousElement)
/* harmony export */ });
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _services_Debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/Debug */ "./src/services/Debug.js");
/* harmony import */ var _services_Collections_Navigation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/services/Collections/Navigation.js */ "./src/services/Collections/Navigation.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }





var _elements = /*#__PURE__*/new WeakMap();

var _mobile = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _bindInteractions = /*#__PURE__*/new WeakSet();

var _handleInteraction = /*#__PURE__*/new WeakSet();

var CollectionPreviousElement = /*#__PURE__*/function () {
  function CollectionPreviousElement() {
    _classCallCheck(this, CollectionPreviousElement);

    _classPrivateMethodInitSpec(this, _handleInteraction);

    _classPrivateMethodInitSpec(this, _bindInteractions);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _mobile, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _mobile, _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.isMobile());
  }

  _createClass(CollectionPreviousElement, [{
    key: "initialize",
    value: function initialize() {
      _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

      _classPrivateMethodGet(this, _bindInteractions, _bindInteractions2).call(this);
    }
  }]);

  return CollectionPreviousElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(CollectionPreviousElement.collectionPreviousQuery));
}

function _bindInteractions2() {
  var _this = this;

  _classPrivateFieldGet(this, _elements).forEach(function (element) {
    if (_classPrivateFieldGet(_this, _mobile)) {
      element.removeEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
    } else {
      element.removeEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
    }
  });
}

function _handleInteraction2() {
  if (!_services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.isTouchMoving()) {
    var collectionKey = this.getAttribute('data-amplitude-collection-key');

    if (collectionKey == config.active_collection) {
      var collectionNavigation = new _services_Collections_Navigation_js__WEBPACK_IMPORTED_MODULE_2__.Navigation();
      collectionNavigation.previous();
    } else {
      _services_Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.writeMessage("You can not go to the previous audio on a playlist that is not being played!");
    }
  }
}

_defineProperty(CollectionPreviousElement, "collectionPreviousQuery", '.amplitude-previous[data-amplitude-collection-key]');

/***/ }),

/***/ "./src/elements/PreviousElements/GlobalPreviousElement.js":
/*!****************************************************************!*\
  !*** ./src/elements/PreviousElements/GlobalPreviousElement.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GlobalPreviousElement": () => (/* binding */ GlobalPreviousElement)
/* harmony export */ });
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _services_Debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/Debug */ "./src/services/Debug.js");
/* harmony import */ var _services_Collections_Navigation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/services/Collections/Navigation.js */ "./src/services/Collections/Navigation.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }





var _elements = /*#__PURE__*/new WeakMap();

var _mobile = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _bindInteractions = /*#__PURE__*/new WeakSet();

var _handleInteraction = /*#__PURE__*/new WeakSet();

var GlobalPreviousElement = /*#__PURE__*/function () {
  function GlobalPreviousElement() {
    _classCallCheck(this, GlobalPreviousElement);

    _classPrivateMethodInitSpec(this, _handleInteraction);

    _classPrivateMethodInitSpec(this, _bindInteractions);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _mobile, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _mobile, _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.isMobile());
  }

  _createClass(GlobalPreviousElement, [{
    key: "initialize",
    value: function initialize() {
      _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

      _classPrivateMethodGet(this, _bindInteractions, _bindInteractions2).call(this);
    }
  }]);

  return GlobalPreviousElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(GlobalPreviousElement.globalPreviousQuery));
}

function _bindInteractions2() {
  var _this = this;

  _classPrivateFieldGet(this, _elements).forEach(function (element) {
    if (_classPrivateFieldGet(_this, _mobile)) {
      element.removeEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
    } else {
      element.removeEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
    }
  });
}

function _handleInteraction2() {
  if (!_services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.isTouchMoving()) {
    if (_services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getScope() == 'collection') {
      var collectionNavigation = new _services_Collections_Navigation_js__WEBPACK_IMPORTED_MODULE_2__.Navigation();
      collectionNavigation.previous();
    } else {
      _services_Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.writeMessage("You can only navigate previous when you are playing a collection.");
    }
  }
}

_defineProperty(GlobalPreviousElement, "globalPreviousQuery", '.amplitude-previous:not([data-amplitude-collection-key])');

/***/ }),

/***/ "./src/elements/ProgressElement.js":
/*!*****************************************!*\
  !*** ./src/elements/ProgressElement.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProgressElement": () => (/* binding */ ProgressElement)
/* harmony export */ });
/* harmony import */ var _ProgressElements_GlobalProgressElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProgressElements/GlobalProgressElement */ "./src/elements/ProgressElements/GlobalProgressElement.js");
/* harmony import */ var _ProgressElements_CollectionProgressElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProgressElements/CollectionProgressElement */ "./src/elements/ProgressElements/CollectionProgressElement.js");
/* harmony import */ var _ProgressElements_AudioProgressElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ProgressElements/AudioProgressElement */ "./src/elements/ProgressElements/AudioProgressElement.js");
/* harmony import */ var _ProgressElements_CollectionAudioProgressElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ProgressElements/CollectionAudioProgressElement */ "./src/elements/ProgressElements/CollectionAudioProgressElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }





var ProgressElement = /*#__PURE__*/function () {
  function ProgressElement() {
    _classCallCheck(this, ProgressElement);
  }

  _createClass(ProgressElement, null, [{
    key: "syncCurrentTime",
    value: function syncCurrentTime(percentage) {
      _ProgressElements_GlobalProgressElement__WEBPACK_IMPORTED_MODULE_0__.GlobalProgressElement.syncUI(percentage);
      _ProgressElements_CollectionProgressElement__WEBPACK_IMPORTED_MODULE_1__.CollectionProgressElement.syncUI(percentage);
      _ProgressElements_AudioProgressElement__WEBPACK_IMPORTED_MODULE_2__.AudioProgressElement.syncUI(percentage);
      _ProgressElements_CollectionAudioProgressElement__WEBPACK_IMPORTED_MODULE_3__.CollectionAudioProgressElement.syncUI(percentage);
    }
  }]);

  return ProgressElement;
}();

/***/ }),

/***/ "./src/elements/ProgressElements/AudioProgressElement.js":
/*!***************************************************************!*\
  !*** ./src/elements/ProgressElements/AudioProgressElement.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AudioProgressElement": () => (/* binding */ AudioProgressElement)
/* harmony export */ });
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var AudioProgressElement = /*#__PURE__*/function () {
  function AudioProgressElement() {
    _classCallCheck(this, AudioProgressElement);
  }

  _createClass(AudioProgressElement, null, [{
    key: "syncUI",
    value: function syncUI(completionPercentage) {
      if (!isNaN(completionPercentage) && isFinite(completionPercentage)) {
        var elements = document.querySelectorAll(AudioProgressElement.audioProgressQuery);
        var activeAudioIndex = _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getActiveAudioIndex();
        elements.forEach(function (element) {
          var elementAudioIndex = element.getAttribute('data-amplitude-audio-index');
          var max = element.max;

          if (activeAudioIndex == elementAudioIndex) {
            element.value = completionPercentage / 100 * max;
          } else {
            element.value = 0;
          }
        });
      }
    }
  }]);

  return AudioProgressElement;
}();

_defineProperty(AudioProgressElement, "audioProgressQuery", 'progress.amplitude-audio-played-progress[data-amplitude-audio-index]:not([data-amplitude-collection-key])');

/***/ }),

/***/ "./src/elements/ProgressElements/CollectionAudioProgressElement.js":
/*!*************************************************************************!*\
  !*** ./src/elements/ProgressElements/CollectionAudioProgressElement.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollectionAudioProgressElement": () => (/* binding */ CollectionAudioProgressElement)
/* harmony export */ });
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var CollectionAudioProgressElement = /*#__PURE__*/function () {
  function CollectionAudioProgressElement() {
    _classCallCheck(this, CollectionAudioProgressElement);
  }

  _createClass(CollectionAudioProgressElement, null, [{
    key: "syncUI",
    value: function syncUI(completionPercentage) {
      if (!isNaN(completionPercentage) && isFinite(completionPercentage)) {
        var elements = document.querySelectorAll(CollectionAudioProgressElement.collectionAudioProgressQuery);
        var activeCollectionKey = _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getActiveCollection();
        var activeAudioIndex = _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getActiveAudioIndex();
        elements.forEach(function (element) {
          var elementCollectionKey = element.getAttribute('data-amplitude-collection-key');
          var elementAudioIndex = element.getAttribute('data-amplitude-audio-index');
          var max = element.max;

          if (activeCollectionKey == elementCollectionKey && activeAudioIndex == elementAudioIndex) {
            element.value = completionPercentage / 100 * max;
          } else {
            element.value = 0;
          }
        });
      }
    }
  }]);

  return CollectionAudioProgressElement;
}();

_defineProperty(CollectionAudioProgressElement, "collectionAudioProgressQuery", 'progress.amplitude-audio-played-progress[data-amplitude-collection-key][data-amplitude-audio-index]');

/***/ }),

/***/ "./src/elements/ProgressElements/CollectionProgressElement.js":
/*!********************************************************************!*\
  !*** ./src/elements/ProgressElements/CollectionProgressElement.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollectionProgressElement": () => (/* binding */ CollectionProgressElement)
/* harmony export */ });
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var CollectionProgressElement = /*#__PURE__*/function () {
  function CollectionProgressElement() {
    _classCallCheck(this, CollectionProgressElement);
  }

  _createClass(CollectionProgressElement, null, [{
    key: "syncUI",
    value: function syncUI(completionPercentage) {
      if (!isNaN(completionPercentage) && isFinite(completionPercentage)) {
        var elements = document.querySelectorAll(CollectionProgressElement.collectionProgressQuery);
        var activeCollectionKey = _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getActiveCollection();
        elements.forEach(function (element) {
          var elementCollectionKey = element.getAttribute('data-amplitude-collection-key');
          var max = element.max;

          if (activeCollectionKey == elementCollectionKey) {
            element.value = completionPercentage / 100 * max;
          } else {
            element.value = 0;
          }
        });
      }
    }
  }]);

  return CollectionProgressElement;
}();

_defineProperty(CollectionProgressElement, "collectionProgressQuery", 'progress.amplitude-audio-played-progress[data-amplitude-collection-key]:not([data-amplitude-audio-index])');

/***/ }),

/***/ "./src/elements/ProgressElements/GlobalProgressElement.js":
/*!****************************************************************!*\
  !*** ./src/elements/ProgressElements/GlobalProgressElement.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GlobalProgressElement": () => (/* binding */ GlobalProgressElement)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GlobalProgressElement = /*#__PURE__*/function () {
  function GlobalProgressElement() {
    _classCallCheck(this, GlobalProgressElement);
  }

  _createClass(GlobalProgressElement, null, [{
    key: "syncUI",
    value: function syncUI(completionPercentage) {
      if (!isNaN(completionPercentage) && isFinite(completionPercentage)) {
        var elements = document.querySelectorAll(GlobalProgressElement.globalProgressQuery);
        elements.forEach(function (element) {
          var max = element.max;
          element.value = completionPercentage / 100 * max;
        });
      }
    }
  }]);

  return GlobalProgressElement;
}();

_defineProperty(GlobalProgressElement, "globalProgressQuery", 'progress.amplitude-audio-played-progress:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])');

/***/ }),

/***/ "./src/elements/ShuffleElement.js":
/*!****************************************!*\
  !*** ./src/elements/ShuffleElement.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShuffleElement": () => (/* binding */ ShuffleElement)
/* harmony export */ });
/* harmony import */ var _ShuffleElements_CollectionShuffleElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ShuffleElements/CollectionShuffleElement */ "./src/elements/ShuffleElements/CollectionShuffleElement.js");
/* harmony import */ var _ShuffleElements_GlobalShuffleElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShuffleElements/GlobalShuffleElement */ "./src/elements/ShuffleElements/GlobalShuffleElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }



/**
 * Handles the configuration and managing of Shuffle elements
 * 
 * A Shuffle element is defined as the following:
 * 
 * Element: class="amplitude-shuffle"
 * 
 * GLOBAL: class="amplitude-shuffles"
 * Shuffles the active collection
 * 
 * COLLECTION: class="amplitude-shuffle" data-amplitude-collection="{collection_key}"
 * Shuffles the collection identified
 */

var _configureGlobalShuffleElement = /*#__PURE__*/new WeakSet();

var _configureCollectionShuffleElement = /*#__PURE__*/new WeakSet();

var ShuffleElement = /*#__PURE__*/function () {
  function ShuffleElement() {
    _classCallCheck(this, ShuffleElement);

    _classPrivateMethodInitSpec(this, _configureCollectionShuffleElement);

    _classPrivateMethodInitSpec(this, _configureGlobalShuffleElement);
  }

  _createClass(ShuffleElement, [{
    key: "setUp",
    value: function setUp() {
      _classPrivateMethodGet(this, _configureGlobalShuffleElement, _configureGlobalShuffleElement2).call(this);

      _classPrivateMethodGet(this, _configureCollectionShuffleElement, _configureCollectionShuffleElement2).call(this);
    }
  }]);

  return ShuffleElement;
}();

function _configureGlobalShuffleElement2() {
  var globalShuffleElement = new _ShuffleElements_GlobalShuffleElement__WEBPACK_IMPORTED_MODULE_1__.GlobalShuffleElement();
  globalShuffleElement.initialize();
}

function _configureCollectionShuffleElement2() {
  var collectionShuffleElement = new _ShuffleElements_CollectionShuffleElement__WEBPACK_IMPORTED_MODULE_0__.CollectionShuffleElement();
  collectionShuffleElement.initialize();
}

/***/ }),

/***/ "./src/elements/ShuffleElements/CollectionShuffleElement.js":
/*!******************************************************************!*\
  !*** ./src/elements/ShuffleElements/CollectionShuffleElement.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollectionShuffleElement": () => (/* binding */ CollectionShuffleElement)
/* harmony export */ });
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _services_Collections_Shuffle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/Collections/Shuffle */ "./src/services/Collections/Shuffle.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }




var _elements = /*#__PURE__*/new WeakMap();

var _mobile = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _bindInteractions = /*#__PURE__*/new WeakSet();

var _handleInteraction = /*#__PURE__*/new WeakSet();

var CollectionShuffleElement = /*#__PURE__*/function () {
  function CollectionShuffleElement() {
    _classCallCheck(this, CollectionShuffleElement);

    _classPrivateMethodInitSpec(this, _handleInteraction);

    _classPrivateMethodInitSpec(this, _bindInteractions);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _mobile, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _mobile, _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.isMobile());
  }

  _createClass(CollectionShuffleElement, [{
    key: "initialize",
    value: function initialize() {
      _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

      _classPrivateMethodGet(this, _bindInteractions, _bindInteractions2).call(this);
    }
  }], [{
    key: "syncUI",
    value: function syncUI(collection) {
      var elements = document.querySelectorAll('.amplitude-shuffle[data-amplitude-collection="' + collection + '"]');
      elements.forEach(function (element) {
        if (_services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.isCollectionShuffled(collection)) {
          element.classList.add("amplitude-shuffle-on");
          element.classList.remove("amplitude-shuffle-off");
        } else {
          element.classList.add("amplitude-shuffle-off");
          element.classList.remove("amplitude-shuffle-on");
        }
      });
    }
  }]);

  return CollectionShuffleElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(CollectionShuffleElement.collectionShuffleQuery));
}

function _bindInteractions2() {
  var _this = this;

  _classPrivateFieldGet(this, _elements).forEach(function (element) {
    if (_classPrivateFieldGet(_this, _mobile)) {
      element.removeEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
    } else {
      element.removeEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
    }
  });
}

function _handleInteraction2() {
  var collectionKey = this.getAttribute('data-amplitude-collection-key');
  var shuffle = new _services_Collections_Shuffle__WEBPACK_IMPORTED_MODULE_1__.Shuffle(collectionKey);
  shuffle.toggleShuffle();
  CollectionShuffleElement.syncUI(collectionKey);
}

_defineProperty(CollectionShuffleElement, "collectionShuffleQuery", '.amplitude-shuffle[data-amplitude-collection-key]');

/***/ }),

/***/ "./src/elements/ShuffleElements/GlobalShuffleElement.js":
/*!**************************************************************!*\
  !*** ./src/elements/ShuffleElements/GlobalShuffleElement.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GlobalShuffleElement": () => (/* binding */ GlobalShuffleElement)
/* harmony export */ });
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _services_Collections_Shuffle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/Collections/Shuffle */ "./src/services/Collections/Shuffle.js");
/* harmony import */ var _services_Debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/services/Debug */ "./src/services/Debug.js");
/* harmony import */ var _CollectionShuffleElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CollectionShuffleElement */ "./src/elements/ShuffleElements/CollectionShuffleElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }






var _elements = /*#__PURE__*/new WeakMap();

var _mobile = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _bindInteractions = /*#__PURE__*/new WeakSet();

var _handleInteraction = /*#__PURE__*/new WeakSet();

var GlobalShuffleElement = /*#__PURE__*/function () {
  function GlobalShuffleElement() {
    _classCallCheck(this, GlobalShuffleElement);

    _classPrivateMethodInitSpec(this, _handleInteraction);

    _classPrivateMethodInitSpec(this, _bindInteractions);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _mobile, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _mobile, _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.isMobile());
  }

  _createClass(GlobalShuffleElement, [{
    key: "initialize",
    value: function initialize() {
      _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

      _classPrivateMethodGet(this, _bindInteractions, _bindInteractions2).call(this);
    }
  }], [{
    key: "syncUI",
    value: function syncUI() {
      var elements = document.querySelectorAll(GlobalShuffleElement.globalShuffleQuery);
      var collection = _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getActiveCollection();
      elements.forEach(function (element) {
        if (_services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.isCollectionShuffled(collection)) {
          element.classList.add("amplitude-shuffle-on");
          element.classList.remove("amplitude-shuffle-off");
        } else {
          element.classList.add("amplitude-shuffle-off");
          element.classList.remove("amplitude-shuffle-on");
        }
      });
    }
  }]);

  return GlobalShuffleElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(GlobalShuffleElement.globalShuffleQuery));
}

function _bindInteractions2() {
  var _this = this;

  _classPrivateFieldGet(this, _elements).forEach(function (element) {
    if (_classPrivateFieldGet(_this, _mobile)) {
      element.removeEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
    } else {
      element.removeEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
    }
  });
}

function _handleInteraction2() {
  if (_services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getScope() == 'collection') {
    var collection = _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getActiveCollection();
    var shuffle = new _services_Collections_Shuffle__WEBPACK_IMPORTED_MODULE_1__.Shuffle(collectionKey);
    shuffle.toggleShuffle();
    GlobalShuffleElement.syncUI();
    _CollectionShuffleElement__WEBPACK_IMPORTED_MODULE_3__.CollectionShuffleElement.syncUI(collection);
  } else {
    _services_Debug__WEBPACK_IMPORTED_MODULE_2__.Debug.writeMessage("You can only shuffle a collection if you are playing a collection.");
  }
}

_defineProperty(GlobalShuffleElement, "globalShuffleQuery", '.amplitude-shuffle:not([data-amplitude-collection-key])');

/***/ }),

/***/ "./src/elements/SkipToElement.js":
/*!***************************************!*\
  !*** ./src/elements/SkipToElement.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SkipToElement": () => (/* binding */ SkipToElement)
/* harmony export */ });
/* harmony import */ var _SkipToElements_AudioSkipToElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SkipToElements/AudioSkipToElement */ "./src/elements/SkipToElements/AudioSkipToElement.js");
/* harmony import */ var _SkipToElements_CollectionAudioSkipToElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SkipToElements/CollectionAudioSkipToElement */ "./src/elements/SkipToElements/CollectionAudioSkipToElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }




var _configureAudioSkipToElement = /*#__PURE__*/new WeakSet();

var _configureCollectionAudioSkipToElement = /*#__PURE__*/new WeakSet();

var SkipToElement = /*#__PURE__*/function () {
  function SkipToElement() {
    _classCallCheck(this, SkipToElement);

    _classPrivateMethodInitSpec(this, _configureCollectionAudioSkipToElement);

    _classPrivateMethodInitSpec(this, _configureAudioSkipToElement);
  }

  _createClass(SkipToElement, [{
    key: "setUp",
    value: function setUp() {
      _classPrivateMethodGet(this, _configureAudioSkipToElement, _configureAudioSkipToElement2).call(this);

      _classPrivateMethodGet(this, _configureCollectionAudioSkipToElement, _configureCollectionAudioSkipToElement2).call(this);
    }
  }]);

  return SkipToElement;
}();

function _configureAudioSkipToElement2() {
  var audioSkipToElement = new _SkipToElements_AudioSkipToElement__WEBPACK_IMPORTED_MODULE_0__.AudioSkipToElement();
  audioSkipToElement.initialize();
}

function _configureCollectionAudioSkipToElement2() {
  var collectionAudioSkipToElement = new _SkipToElements_CollectionAudioSkipToElement__WEBPACK_IMPORTED_MODULE_1__.CollectionAudioSkipToElement();
  collectionAudioSkipToElement.initialize();
}

/***/ }),

/***/ "./src/elements/SkipToElements/AudioSkipToElement.js":
/*!***********************************************************!*\
  !*** ./src/elements/SkipToElements/AudioSkipToElement.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AudioSkipToElement": () => (/* binding */ AudioSkipToElement)
/* harmony export */ });
/* harmony import */ var _core_Audio_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Audio.js */ "./src/core/Audio.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/config */ "./src/config.js");
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _services_Debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/services/Debug */ "./src/services/Debug.js");
/* harmony import */ var _services_Audio_Navigation_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/services/Audio/Navigation.js */ "./src/services/Audio/Navigation.js");
/* harmony import */ var _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/elements/PlayPauseElement */ "./src/elements/PlayPauseElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }








var _elements = /*#__PURE__*/new WeakMap();

var _mobile = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _bindInteractions = /*#__PURE__*/new WeakSet();

var _handleInteraction = /*#__PURE__*/new WeakSet();

var _validElement = /*#__PURE__*/new WeakSet();

var _handleAudioChange = /*#__PURE__*/new WeakSet();

var _playAudio = /*#__PURE__*/new WeakSet();

var _skipToLocation = /*#__PURE__*/new WeakSet();

var AudioSkipToElement = /*#__PURE__*/function () {
  function AudioSkipToElement() {
    _classCallCheck(this, AudioSkipToElement);

    _classPrivateMethodInitSpec(this, _skipToLocation);

    _classPrivateMethodInitSpec(this, _playAudio);

    _classPrivateMethodInitSpec(this, _handleAudioChange);

    _classPrivateMethodInitSpec(this, _validElement);

    _classPrivateMethodInitSpec(this, _handleInteraction);

    _classPrivateMethodInitSpec(this, _bindInteractions);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _mobile, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _mobile, _services_ConfigState__WEBPACK_IMPORTED_MODULE_2__.ConfigState.isMobile());
  }

  _createClass(AudioSkipToElement, [{
    key: "initialize",
    value: function initialize() {
      _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

      _classPrivateMethodGet(this, _bindInteractions, _bindInteractions2).call(this);
    }
  }]);

  return AudioSkipToElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(AudioSkipToElement.audioSkipToElementQuery));
}

function _bindInteractions2() {
  var _this = this;

  _classPrivateFieldGet(this, _elements).forEach(function (element) {
    if (_classPrivateFieldGet(_this, _mobile)) {
      element.removeEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2).bind(_this, element));
    } else {
      element.removeEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2).bind(_this, element));
    }
  });
}

function _handleInteraction2(element) {
  if (!_services_ConfigState__WEBPACK_IMPORTED_MODULE_2__.ConfigState.isTouchMoving()) {
    var audioIndex = element.getAttribute('data-amplitude-audio-index');
    var location = element.getAttribute('data-amplitude-location');

    if (_classPrivateMethodGet(this, _validElement, _validElement2).call(this, audioIndex, location)) {
      _classPrivateMethodGet(this, _handleAudioChange, _handleAudioChange2).call(this, audioIndex);

      _classPrivateMethodGet(this, _playAudio, _playAudio2).call(this);

      _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_5__.PlayPauseElement.syncAll();

      _classPrivateMethodGet(this, _skipToLocation, _skipToLocation2).call(this, location);
    }
  }
}

function _validElement2(audioIndex, location) {
  if (audioIndex == null) {
    _services_Debug__WEBPACK_IMPORTED_MODULE_3__.Debug.writeMessage("You must add a `data-amplitude-audio-index` attribute to your `amplitude-skip-to` element.");
    return false;
  }

  if (location == null) {
    _services_Debug__WEBPACK_IMPORTED_MODULE_3__.Debug.writeMessage("You must add a `data-amplitude-location` attribute in seconds to your `amplitude-skip-to` element.");
    return false;
  }

  return true;
}

function _handleAudioChange2(audioIndex) {
  var audioNavigation = new _services_Audio_Navigation_js__WEBPACK_IMPORTED_MODULE_4__.Navigation();
  audioNavigation.changeAudio(_config__WEBPACK_IMPORTED_MODULE_1__.config.audio[parseInt(audioIndex)], parseInt(audioIndex), true);
}

function _playAudio2() {
  var audio = new _core_Audio_js__WEBPACK_IMPORTED_MODULE_0__.Audio();
  audio.play();
}

function _skipToLocation2(location) {
  var audio = new _core_Audio_js__WEBPACK_IMPORTED_MODULE_0__.Audio();
  audio.skipToLocation(parseInt(location));
}

_defineProperty(AudioSkipToElement, "audioSkipToElementQuery", ".amplitude-skip-to[data-amplitude-audio-index]:not([data-amplitude-collection-key])");

/***/ }),

/***/ "./src/elements/SkipToElements/CollectionAudioSkipToElement.js":
/*!*********************************************************************!*\
  !*** ./src/elements/SkipToElements/CollectionAudioSkipToElement.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollectionAudioSkipToElement": () => (/* binding */ CollectionAudioSkipToElement)
/* harmony export */ });
/* harmony import */ var _core_Audio_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Audio.js */ "./src/core/Audio.js");
/* harmony import */ var _services_Collections_Checks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/Collections/Checks */ "./src/services/Collections/Checks.js");
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _services_Collections_Navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/services/Collections/Navigation */ "./src/services/Collections/Navigation.js");
/* harmony import */ var _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/elements/PlayPauseElement */ "./src/elements/PlayPauseElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }







var _elements = /*#__PURE__*/new WeakMap();

var _mobile = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _bindInteractions = /*#__PURE__*/new WeakSet();

var _handleInteraction = /*#__PURE__*/new WeakSet();

var _validElement = /*#__PURE__*/new WeakSet();

var _handleCollectionChange = /*#__PURE__*/new WeakSet();

var _handleAudioChange = /*#__PURE__*/new WeakSet();

var _playAudio = /*#__PURE__*/new WeakSet();

var _skipToLocation = /*#__PURE__*/new WeakSet();

var CollectionAudioSkipToElement = /*#__PURE__*/function () {
  function CollectionAudioSkipToElement() {
    _classCallCheck(this, CollectionAudioSkipToElement);

    _classPrivateMethodInitSpec(this, _skipToLocation);

    _classPrivateMethodInitSpec(this, _playAudio);

    _classPrivateMethodInitSpec(this, _handleAudioChange);

    _classPrivateMethodInitSpec(this, _handleCollectionChange);

    _classPrivateMethodInitSpec(this, _validElement);

    _classPrivateMethodInitSpec(this, _handleInteraction);

    _classPrivateMethodInitSpec(this, _bindInteractions);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _mobile, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _mobile, _services_ConfigState__WEBPACK_IMPORTED_MODULE_2__.ConfigState.isMobile());
  }

  _createClass(CollectionAudioSkipToElement, [{
    key: "initialize",
    value: function initialize() {
      _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

      _classPrivateMethodGet(this, _bindInteractions, _bindInteractions2).call(this);
    }
  }]);

  return CollectionAudioSkipToElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(CollectionAudioSkipToElement.collectionAudioSkipToElementQuery));
}

function _bindInteractions2() {
  var _this = this;

  _classPrivateFieldGet(this, _elements).forEach(function (element) {
    if (_classPrivateFieldGet(_this, _mobile)) {
      element.removeEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2).bind(_this, element));
    } else {
      element.removeEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2).bind(_this, element));
    }
  });
}

function _handleInteraction2(element) {
  if (!_services_ConfigState__WEBPACK_IMPORTED_MODULE_2__.ConfigState.isTouchMoving()) {
    var audioIndex = element.getAttribute('data-amplitude-audio-index');
    var collectionKey = element.getAttribute('data-amplitude-collection-key');
    var location = element.getAttribute('data-amplitude-location');

    if (_classPrivateMethodGet(this, _validElement, _validElement2).call(this, audioIndex, collectionKey, location)) {
      _classPrivateMethodGet(this, _handleCollectionChange, _handleCollectionChange2).call(this, collectionKey);

      _classPrivateMethodGet(this, _handleAudioChange, _handleAudioChange2).call(this, audioIndex, collectionKey);

      _classPrivateMethodGet(this, _playAudio, _playAudio2).call(this);

      _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_4__.PlayPauseElement.syncAll();

      _classPrivateMethodGet(this, _skipToLocation, _skipToLocation2).call(this, location);
    }
  }
}

function _validElement2(audioIndex, collectionKey, location) {
  if (audioIndex == null) {
    Debug.writeMessage("You must add a `data-amplitude-audio-index` attribute to your `amplitude-skip-to` element.");
    return false;
  }

  if (collectionKey == null) {
    Debug.writeMessage("You must add a valid `data-amplitude-collection-key` attribute to your `amplitude-skip-to` element.");
    return false;
  }

  if (location == null) {
    Debug.writeMessage("You must add a `data-amplitude-location` attribute in seconds to your `amplitude-skip-to` element.");
    return false;
  }

  return true;
}

function _handleCollectionChange2(collection) {
  if (_services_Collections_Checks__WEBPACK_IMPORTED_MODULE_1__.Checks.collectionChanged(collection)) {
    var collectionNavigation = new _services_Collections_Navigation__WEBPACK_IMPORTED_MODULE_3__.Navigation();
    collectionNavigation.setActiveCollection(collection);
  }
}

function _handleAudioChange2(audioIndex, collectionKey) {
  var collectionNavigation = new _services_Collections_Navigation__WEBPACK_IMPORTED_MODULE_3__.Navigation();
  collectionNavigation.changeAudioCollection(collectionKey, config.collections[collectionKey].audio[parseInt(audioIndex)], parseInt(audioIndex), true);
}

function _playAudio2() {
  var audio = new _core_Audio_js__WEBPACK_IMPORTED_MODULE_0__.Audio();
  audio.play();
}

function _skipToLocation2(location) {
  var audio = new _core_Audio_js__WEBPACK_IMPORTED_MODULE_0__.Audio();
  audio.skipToLocation(parseInt(location));
}

_defineProperty(CollectionAudioSkipToElement, "collectionAudioSkipToElementQuery", ".amplitude-skip-to[data-amplitude-audio-index][data-amplitude-collection-key]");

/***/ }),

/***/ "./src/elements/StopElement.js":
/*!*************************************!*\
  !*** ./src/elements/StopElement.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StopElement": () => (/* binding */ StopElement)
/* harmony export */ });
/* harmony import */ var _core_Audio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Audio */ "./src/core/Audio.js");
/* harmony import */ var _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/elements/PlayPauseElement */ "./src/elements/PlayPauseElement.js");
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }




/**
 * Handles the configuration and managing of Stop elements
 * 
 * A Stop element is defined as the following:
 * 
 * Element: class="amplitude-stop"
 * 
 * Whenever this element is interacted with, the audio is stopped no matter where.
 */

var _elements = /*#__PURE__*/new WeakMap();

var _mobile = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _bindInteractions = /*#__PURE__*/new WeakSet();

var _handleInteraction = /*#__PURE__*/new WeakSet();

var StopElement = /*#__PURE__*/function () {
  function StopElement() {
    _classCallCheck(this, StopElement);

    _classPrivateMethodInitSpec(this, _handleInteraction);

    _classPrivateMethodInitSpec(this, _bindInteractions);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _mobile, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _mobile, _services_ConfigState__WEBPACK_IMPORTED_MODULE_2__.ConfigState.isMobile());
  }

  _createClass(StopElement, [{
    key: "setUp",
    value: function setUp() {
      _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

      _classPrivateMethodGet(this, _bindInteractions, _bindInteractions2).call(this);
    }
  }]);

  return StopElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(StopElement.stopElementQuery));
}

function _bindInteractions2() {
  var _this = this;

  _classPrivateFieldGet(this, _elements).forEach(function (element) {
    if (_classPrivateFieldGet(_this, _mobile)) {
      element.removeEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
    } else {
      element.removeEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
    }
  });
}

function _handleInteraction2() {
  if (!_services_ConfigState__WEBPACK_IMPORTED_MODULE_2__.ConfigState.isTouchMoving()) {
    var audio = new _core_Audio__WEBPACK_IMPORTED_MODULE_0__.Audio();
    audio.stop();
    _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_1__.PlayPauseElement.syncAll();
  }
}

_defineProperty(StopElement, "stopElementQuery", '.amplitude-stop');

/***/ }),

/***/ "./src/elements/TimeElement.js":
/*!*************************************!*\
  !*** ./src/elements/TimeElement.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TimeElement": () => (/* binding */ TimeElement)
/* harmony export */ });
/* harmony import */ var _TimeElements_CurrentTime_GlobalCurrentTimeElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TimeElements/CurrentTime/GlobalCurrentTimeElement */ "./src/elements/TimeElements/CurrentTime/GlobalCurrentTimeElement.js");
/* harmony import */ var _TimeElements_CurrentTime_CollectionCurrentTimeElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TimeElements/CurrentTime/CollectionCurrentTimeElement */ "./src/elements/TimeElements/CurrentTime/CollectionCurrentTimeElement.js");
/* harmony import */ var _TimeElements_CurrentTime_AudioCurrentTimeElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TimeElements/CurrentTime/AudioCurrentTimeElement */ "./src/elements/TimeElements/CurrentTime/AudioCurrentTimeElement.js");
/* harmony import */ var _TimeElements_CurrentTime_CollectionAudioCurrentTimeElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TimeElements/CurrentTime/CollectionAudioCurrentTimeElement */ "./src/elements/TimeElements/CurrentTime/CollectionAudioCurrentTimeElement.js");
/* harmony import */ var _TimeElements_Duration_GlobalDurationElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TimeElements/Duration/GlobalDurationElement */ "./src/elements/TimeElements/Duration/GlobalDurationElement.js");
/* harmony import */ var _TimeElements_Duration_CollectionDurationElement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TimeElements/Duration/CollectionDurationElement */ "./src/elements/TimeElements/Duration/CollectionDurationElement.js");
/* harmony import */ var _TimeElements_Duration_AudioDurationElement__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TimeElements/Duration/AudioDurationElement */ "./src/elements/TimeElements/Duration/AudioDurationElement.js");
/* harmony import */ var _TimeElements_Duration_CollectionAudioDurationElement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./TimeElements/Duration/CollectionAudioDurationElement */ "./src/elements/TimeElements/Duration/CollectionAudioDurationElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }









var TimeElement = /*#__PURE__*/function () {
  function TimeElement() {
    _classCallCheck(this, TimeElement);
  }

  _createClass(TimeElement, [{
    key: "syncCurrentTime",
    value: function syncCurrentTime(currentTime) {
      var globalCurrentTimeElement = new _TimeElements_CurrentTime_GlobalCurrentTimeElement__WEBPACK_IMPORTED_MODULE_0__.GlobalCurrentTimeElement(currentTime);
      globalCurrentTimeElement.sync();
      var collectionCurrentTimeElement = new _TimeElements_CurrentTime_CollectionCurrentTimeElement__WEBPACK_IMPORTED_MODULE_1__.CollectionCurrentTimeElement(currentTime);
      collectionCurrentTimeElement.sync();
      var audioCurrentTimeElement = new _TimeElements_CurrentTime_AudioCurrentTimeElement__WEBPACK_IMPORTED_MODULE_2__.AudioCurrentTimeElement(currentTime);
      audioCurrentTimeElement.sync();
      var collectionAudioCurrentTimeElement = new _TimeElements_CurrentTime_CollectionAudioCurrentTimeElement__WEBPACK_IMPORTED_MODULE_3__.CollectionAudioCurrentTimeElement(currentTime);
      collectionAudioCurrentTimeElement.sync();
    }
  }, {
    key: "syncDurationTime",
    value: function syncDurationTime() {}
  }, {
    key: "resetDurationTime",
    value: function resetDurationTime() {}
  }]);

  return TimeElement;
}();

/***/ }),

/***/ "./src/elements/TimeElements/CurrentTime/AudioCurrentTimeElement.js":
/*!**************************************************************************!*\
  !*** ./src/elements/TimeElements/CurrentTime/AudioCurrentTimeElement.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AudioCurrentTimeElement": () => (/* binding */ AudioCurrentTimeElement)
/* harmony export */ });
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }



var _currentTime = /*#__PURE__*/new WeakMap();

var _syncFormattedTimeElement = /*#__PURE__*/new WeakSet();

var _syncHourTimeElement = /*#__PURE__*/new WeakSet();

var _syncMinuteTimeElement = /*#__PURE__*/new WeakSet();

var _syncSecondTimeElement = /*#__PURE__*/new WeakSet();

var AudioCurrentTimeElement = /*#__PURE__*/function () {
  function AudioCurrentTimeElement(currentTime) {
    _classCallCheck(this, AudioCurrentTimeElement);

    _classPrivateMethodInitSpec(this, _syncSecondTimeElement);

    _classPrivateMethodInitSpec(this, _syncMinuteTimeElement);

    _classPrivateMethodInitSpec(this, _syncHourTimeElement);

    _classPrivateMethodInitSpec(this, _syncFormattedTimeElement);

    _classPrivateFieldInitSpec(this, _currentTime, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _currentTime, currentTime);
  }

  _createClass(AudioCurrentTimeElement, [{
    key: "sync",
    value: function sync() {
      _classPrivateMethodGet(this, _syncFormattedTimeElement, _syncFormattedTimeElement2).call(this);

      _classPrivateMethodGet(this, _syncHourTimeElement, _syncHourTimeElement2).call(this);

      _classPrivateMethodGet(this, _syncMinuteTimeElement, _syncMinuteTimeElement2).call(this);

      _classPrivateMethodGet(this, _syncSecondTimeElement, _syncSecondTimeElement2).call(this);
    }
  }]);

  return AudioCurrentTimeElement;
}();

function _syncFormattedTimeElement2() {
  var timeFormat = _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getTimeFormat();
  var activeAudioIndex = _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getActiveAudioIndex();
  var elements = document.querySelectorAll(AudioCurrentTimeElement.audioFormattedTimeElementQuery);
  var formattedTime = timeFormat.replace('HH', _classPrivateFieldGet(this, _currentTime).hours).replace('MM', _classPrivateFieldGet(this, _currentTime).minutes).replace('SS', _classPrivateFieldGet(this, _currentTime).seconds);
  elements.forEach(function (element) {
    var elementAudioIndex = element.getAttribute('data-amplitude-audio-index');

    if (activeAudioIndex == elementAudioIndex) {
      element.innerHTML = formattedTime;
    } else {
      element.innerHTML = '00:00';
    }
  });
}

function _syncHourTimeElement2() {
  var _this = this;

  var elements = document.querySelectorAll(AudioCurrentTimeElement.audioHoursTimeElementQuery);
  var activeAudioIndex = _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getActiveAudioIndex();
  elements.forEach(function (element) {
    var elementAudioIndex = element.getAttribute('data-amplitude-audio-index');

    if (activeAudioIndex == elementAudioIndex) {
      element.innerHTML = _classPrivateFieldGet(_this, _currentTime).hours;
    } else {
      element.innerHTML = '00';
    }
  });
}

function _syncMinuteTimeElement2() {
  var _this2 = this;

  var elements = document.querySelectorAll(AudioCurrentTimeElement.audioMinutesTimeElementQuery);
  var activeAudioIndex = _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getActiveAudioIndex();
  elements.forEach(function (element) {
    var elementAudioIndex = element.getAttribute('data-amplitude-audio-index');

    if (activeAudioIndex == elementAudioIndex) {
      element.innerHTML = _classPrivateFieldGet(_this2, _currentTime).minutes;
    } else {
      element.innerHTML = '00';
    }
  });
}

function _syncSecondTimeElement2() {
  var _this3 = this;

  var elements = document.querySelectorAll(AudioCurrentTimeElement.audioSecondsTimeElementQuery);
  var activeAudioIndex = _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getActiveAudioIndex();
  elements.forEach(function (element) {
    var elementAudioIndex = element.getAttribute('data-amplitude-audio-index');

    if (activeAudioIndex == elementAudioIndex) {
      element.innerHTML = _classPrivateFieldGet(_this3, _currentTime).seconds;
    } else {
      element.innerHTML = '00';
    }
  });
}

_defineProperty(AudioCurrentTimeElement, "audioFormattedTimeElementQuery", '.amplitude-current-time[data-amplitude-audio-index]:not([data-amplitude-collection-key])');

_defineProperty(AudioCurrentTimeElement, "audioHoursTimeElementQuery", '.amplitude-current-hours[data-amplitude-audio-index]:not([data-amplitude-collection-key])');

_defineProperty(AudioCurrentTimeElement, "audioMinutesTimeElementQuery", '.amplitude-current-minutes[data-amplitude-audio-index]:not([data-amplitude-collection-key])');

_defineProperty(AudioCurrentTimeElement, "audioSecondsTimeElementQuery", '.amplitude-current-seconds[data-amplitude-audio-index]:not([data-amplitude-collection-key])');

/***/ }),

/***/ "./src/elements/TimeElements/CurrentTime/CollectionAudioCurrentTimeElement.js":
/*!************************************************************************************!*\
  !*** ./src/elements/TimeElements/CurrentTime/CollectionAudioCurrentTimeElement.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollectionAudioCurrentTimeElement": () => (/* binding */ CollectionAudioCurrentTimeElement)
/* harmony export */ });
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }



var _currentTime = /*#__PURE__*/new WeakMap();

var _syncFormattedTimeElement = /*#__PURE__*/new WeakSet();

var _syncHourTimeElement = /*#__PURE__*/new WeakSet();

var _syncMinuteTimeElement = /*#__PURE__*/new WeakSet();

var _syncSecondTimeElement = /*#__PURE__*/new WeakSet();

var CollectionAudioCurrentTimeElement = /*#__PURE__*/function () {
  function CollectionAudioCurrentTimeElement(currentTime) {
    _classCallCheck(this, CollectionAudioCurrentTimeElement);

    _classPrivateMethodInitSpec(this, _syncSecondTimeElement);

    _classPrivateMethodInitSpec(this, _syncMinuteTimeElement);

    _classPrivateMethodInitSpec(this, _syncHourTimeElement);

    _classPrivateMethodInitSpec(this, _syncFormattedTimeElement);

    _classPrivateFieldInitSpec(this, _currentTime, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _currentTime, currentTime);
  }

  _createClass(CollectionAudioCurrentTimeElement, [{
    key: "sync",
    value: function sync() {
      _classPrivateMethodGet(this, _syncFormattedTimeElement, _syncFormattedTimeElement2).call(this);

      _classPrivateMethodGet(this, _syncHourTimeElement, _syncHourTimeElement2).call(this);

      _classPrivateMethodGet(this, _syncMinuteTimeElement, _syncMinuteTimeElement2).call(this);

      _classPrivateMethodGet(this, _syncSecondTimeElement, _syncSecondTimeElement2).call(this);
    }
  }]);

  return CollectionAudioCurrentTimeElement;
}();

function _syncFormattedTimeElement2() {
  var timeFormat = _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getTimeFormat();
  var activeCollectionKey = _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getActiveCollection();
  var activeAudioIndex = _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getActiveAudioIndex();
  var elements = document.querySelectorAll(CollectionAudioCurrentTimeElement.collectionAudioFormattedTimeElementQuery);
  var formattedTime = timeFormat.replace('HH', _classPrivateFieldGet(this, _currentTime).hours).replace('MM', _classPrivateFieldGet(this, _currentTime).minutes).replace('SS', _classPrivateFieldGet(this, _currentTime).seconds);
  elements.forEach(function (element) {
    var elementCollectionKey = element.getAttribute('data-amplitude-collection-key');
    var elementAudioIndex = element.getAttribute('data-amplitude-audio-index');

    if (activeCollectionKey == elementCollectionKey && activeAudioIndex == elementAudioIndex) {
      element.innerHTML = formattedTime;
    } else {
      element.innerHTML = '00:00';
    }
  });
}

function _syncHourTimeElement2() {
  var _this = this;

  var elements = document.querySelectorAll(CollectionAudioCurrentTimeElement.collectionAudioHoursTimeElementQuery);
  var activeCollectionKey = _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getActiveCollection();
  var activeAudioIndex = _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getActiveAudioIndex();
  elements.forEach(function (element) {
    var elementCollectionKey = element.getAttribute('data-amplitude-collection-key');
    var elementAudioIndex = element.getAttribute('data-amplitude-audio-index');

    if (activeCollectionKey == elementCollectionKey && activeAudioIndex == elementAudioIndex) {
      element.innerHTML = _classPrivateFieldGet(_this, _currentTime).hours;
    } else {
      element.innerHTML = '00';
    }
  });
}

function _syncMinuteTimeElement2() {
  var _this2 = this;

  var elements = document.querySelectorAll(CollectionAudioCurrentTimeElement.collectionAudioMinutesTimeElementQuery);
  var activeCollectionKey = _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getActiveCollection();
  var activeAudioIndex = _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getActiveAudioIndex();
  elements.forEach(function (element) {
    var elementCollectionKey = element.getAttribute('data-amplitude-collection-key');
    var elementAudioIndex = element.getAttribute('data-amplitude-audio-index');

    if (activeCollectionKey == elementCollectionKey && activeAudioIndex == elementAudioIndex) {
      element.innerHTML = _classPrivateFieldGet(_this2, _currentTime).minutes;
    } else {
      element.innerHTML = '00';
    }
  });
}

function _syncSecondTimeElement2() {
  var _this3 = this;

  var elements = document.querySelectorAll(CollectionAudioCurrentTimeElement.collectionAudioSecondsTimeElementQuery);
  var activeCollectionKey = _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getActiveCollection();
  var activeAudioIndex = _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getActiveAudioIndex();
  elements.forEach(function (element) {
    var elementCollectionKey = element.getAttribute('data-amplitude-collection-key');
    var elementAudioIndex = element.getAttribute('data-amplitude-audio-index');

    if (activeCollectionKey == elementCollectionKey && activeAudioIndex == elementAudioIndex) {
      element.innerHTML = _classPrivateFieldGet(_this3, _currentTime).seconds;
    } else {
      element.innerHTML = '00';
    }
  });
}

_defineProperty(CollectionAudioCurrentTimeElement, "collectionAudioFormattedTimeElementQuery", '.amplitude-current-time[data-amplitude-collection-key][data-amplitude-audio-index]');

_defineProperty(CollectionAudioCurrentTimeElement, "collectionAudioHoursTimeElementQuery", '.amplitude-current-hours[data-amplitude-collection-key][data-amplitude-audio-index]');

_defineProperty(CollectionAudioCurrentTimeElement, "collectionAudioMinutesTimeElementQuery", '.amplitude-current-minutes[data-amplitude-collection-key][data-amplitude-audio-index]');

_defineProperty(CollectionAudioCurrentTimeElement, "collectionAudioSecondsTimeElementQuery", '.amplitude-current-seconds[data-amplitude-collection-key][data-amplitude-audio-index]');

/***/ }),

/***/ "./src/elements/TimeElements/CurrentTime/CollectionCurrentTimeElement.js":
/*!*******************************************************************************!*\
  !*** ./src/elements/TimeElements/CurrentTime/CollectionCurrentTimeElement.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollectionCurrentTimeElement": () => (/* binding */ CollectionCurrentTimeElement)
/* harmony export */ });
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }



var _currentTime = /*#__PURE__*/new WeakMap();

var _syncFormattedTimeElement = /*#__PURE__*/new WeakSet();

var _syncHourTimeElement = /*#__PURE__*/new WeakSet();

var _syncMinuteTimeElement = /*#__PURE__*/new WeakSet();

var _syncSecondTimeElement = /*#__PURE__*/new WeakSet();

var CollectionCurrentTimeElement = /*#__PURE__*/function () {
  function CollectionCurrentTimeElement(currentTime) {
    _classCallCheck(this, CollectionCurrentTimeElement);

    _classPrivateMethodInitSpec(this, _syncSecondTimeElement);

    _classPrivateMethodInitSpec(this, _syncMinuteTimeElement);

    _classPrivateMethodInitSpec(this, _syncHourTimeElement);

    _classPrivateMethodInitSpec(this, _syncFormattedTimeElement);

    _classPrivateFieldInitSpec(this, _currentTime, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _currentTime, currentTime);
  }

  _createClass(CollectionCurrentTimeElement, [{
    key: "sync",
    value: function sync() {
      _classPrivateMethodGet(this, _syncFormattedTimeElement, _syncFormattedTimeElement2).call(this);

      _classPrivateMethodGet(this, _syncHourTimeElement, _syncHourTimeElement2).call(this);

      _classPrivateMethodGet(this, _syncMinuteTimeElement, _syncMinuteTimeElement2).call(this);

      _classPrivateMethodGet(this, _syncSecondTimeElement, _syncSecondTimeElement2).call(this);
    }
  }]);

  return CollectionCurrentTimeElement;
}();

function _syncFormattedTimeElement2() {
  var timeFormat = _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getTimeFormat();
  var activeCollectionKey = _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getActiveCollection();
  var elements = document.querySelectorAll(CollectionCurrentTimeElement.collectionFormattedTimeElementQuery);
  var formattedTime = timeFormat.replace('HH', _classPrivateFieldGet(this, _currentTime).hours).replace('MM', _classPrivateFieldGet(this, _currentTime).minutes).replace('SS', _classPrivateFieldGet(this, _currentTime).seconds);
  elements.forEach(function (element) {
    var elementCollectionKey = element.getAttribute('data-amplitude-collection-key');

    if (activeCollectionKey == elementCollectionKey) {
      element.innerHTML = formattedTime;
    } else {
      element.innerHTML = '00:00';
    }
  });
}

function _syncHourTimeElement2() {
  var _this = this;

  var elements = document.querySelectorAll(CollectionCurrentTimeElement.collectionHoursTimeElementQuery);
  var activeCollectionKey = _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getActiveCollection();
  elements.forEach(function (element) {
    var elementCollectionKey = element.getAttribute('data-amplitude-collection-key');

    if (activeCollectionKey == elementCollectionKey) {
      element.innerHTML = _classPrivateFieldGet(_this, _currentTime).hours;
    } else {
      element.innerHTML = '00';
    }
  });
}

function _syncMinuteTimeElement2() {
  var _this2 = this;

  var elements = document.querySelectorAll(CollectionCurrentTimeElement.collectionMinutesTimeElementQuery);
  var activeCollectionKey = _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getActiveCollection();
  elements.forEach(function (element) {
    var elementCollectionKey = element.getAttribute('data-amplitude-collection-key');

    if (activeCollectionKey == elementCollectionKey) {
      element.innerHTML = _classPrivateFieldGet(_this2, _currentTime).minutes;
    } else {
      element.innerHTML = '00';
    }
  });
}

function _syncSecondTimeElement2() {
  var _this3 = this;

  var elements = document.querySelectorAll(CollectionCurrentTimeElement.collectionSecondsTimeElementQuery);
  var activeCollectionKey = _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getActiveCollection();
  elements.forEach(function (element) {
    var elementCollectionKey = element.getAttribute('data-amplitude-collection-key');

    if (activeCollectionKey == elementCollectionKey) {
      element.innerHTML = _classPrivateFieldGet(_this3, _currentTime).seconds;
    } else {
      element.innerHTML = '00';
    }
  });
}

_defineProperty(CollectionCurrentTimeElement, "collectionFormattedTimeElementQuery", '.amplitude-current-time[data-amplitude-collection-key]:not([data-amplitude-audio-index])');

_defineProperty(CollectionCurrentTimeElement, "collectionHoursTimeElementQuery", '.amplitude-current-hours[data-amplitude-collection-key]:not([data-amplitude-audio-index])');

_defineProperty(CollectionCurrentTimeElement, "collectionMinutesTimeElementQuery", '.amplitude-current-minutes[data-amplitude-collection-key]:not([data-amplitude-audio-index])');

_defineProperty(CollectionCurrentTimeElement, "collectionSecondsTimeElementQuery", '.amplitude-current-seconds[data-amplitude-collection-key]:not([data-amplitude-audio-index])');

/***/ }),

/***/ "./src/elements/TimeElements/CurrentTime/GlobalCurrentTimeElement.js":
/*!***************************************************************************!*\
  !*** ./src/elements/TimeElements/CurrentTime/GlobalCurrentTimeElement.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GlobalCurrentTimeElement": () => (/* binding */ GlobalCurrentTimeElement)
/* harmony export */ });
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }



var _currentTime = /*#__PURE__*/new WeakMap();

var _syncFormattedTimeElement = /*#__PURE__*/new WeakSet();

var _syncHourTimeElement = /*#__PURE__*/new WeakSet();

var _syncMinuteTimeElement = /*#__PURE__*/new WeakSet();

var _syncSecondTimeElement = /*#__PURE__*/new WeakSet();

var GlobalCurrentTimeElement = /*#__PURE__*/function () {
  function GlobalCurrentTimeElement(currentTime) {
    _classCallCheck(this, GlobalCurrentTimeElement);

    _classPrivateMethodInitSpec(this, _syncSecondTimeElement);

    _classPrivateMethodInitSpec(this, _syncMinuteTimeElement);

    _classPrivateMethodInitSpec(this, _syncHourTimeElement);

    _classPrivateMethodInitSpec(this, _syncFormattedTimeElement);

    _classPrivateFieldInitSpec(this, _currentTime, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _currentTime, currentTime);
  }

  _createClass(GlobalCurrentTimeElement, [{
    key: "sync",
    value: function sync() {
      _classPrivateMethodGet(this, _syncFormattedTimeElement, _syncFormattedTimeElement2).call(this);

      _classPrivateMethodGet(this, _syncHourTimeElement, _syncHourTimeElement2).call(this);

      _classPrivateMethodGet(this, _syncMinuteTimeElement, _syncMinuteTimeElement2).call(this);

      _classPrivateMethodGet(this, _syncSecondTimeElement, _syncSecondTimeElement2).call(this);
    }
  }]);

  return GlobalCurrentTimeElement;
}();

function _syncFormattedTimeElement2() {
  var timeFormat = _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getTimeFormat();
  var elements = document.querySelectorAll(GlobalCurrentTimeElement.globalFormattedTimeElementQuery);
  var formattedTime = timeFormat.replace('HH', _classPrivateFieldGet(this, _currentTime).hours).replace('MM', _classPrivateFieldGet(this, _currentTime).minutes).replace('SS', _classPrivateFieldGet(this, _currentTime).seconds);
  elements.forEach(function (element) {
    element.innerHTML = formattedTime;
  });
}

function _syncHourTimeElement2() {
  var _this = this;

  var elements = document.querySelectorAll(GlobalCurrentTimeElement.globalHoursTimeElementQuery);
  elements.forEach(function (element) {
    element.innerHTML = _classPrivateFieldGet(_this, _currentTime).hours;
  });
}

function _syncMinuteTimeElement2() {
  var _this2 = this;

  var elements = document.querySelectorAll(GlobalCurrentTimeElement.globalMinutesTimeElementQuery);
  elements.forEach(function (element) {
    element.innerHTML = _classPrivateFieldGet(_this2, _currentTime).minutes;
  });
}

function _syncSecondTimeElement2() {
  var _this3 = this;

  var elements = document.querySelectorAll(GlobalCurrentTimeElement.globalSecondsTimeElementQuery);
  elements.forEach(function (element) {
    element.innerHTML = _classPrivateFieldGet(_this3, _currentTime).seconds;
  });
}

_defineProperty(GlobalCurrentTimeElement, "globalFormattedTimeElementQuery", '.amplitude-current-time:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])');

_defineProperty(GlobalCurrentTimeElement, "globalHoursTimeElementQuery", '.amplitude-current-hours:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])');

_defineProperty(GlobalCurrentTimeElement, "globalMinutesTimeElementQuery", '.amplitude-current-minutes:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])');

_defineProperty(GlobalCurrentTimeElement, "globalSecondsTimeElementQuery", '.amplitude-current-seconds:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])');

/***/ }),

/***/ "./src/elements/TimeElements/Duration/AudioDurationElement.js":
/*!********************************************************************!*\
  !*** ./src/elements/TimeElements/Duration/AudioDurationElement.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AudioDurationElement": () => (/* binding */ AudioDurationElement)
/* harmony export */ });
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AudioDurationElement = /*#__PURE__*/_createClass(function AudioDurationElement() {
  _classCallCheck(this, AudioDurationElement);
});

/***/ }),

/***/ "./src/elements/TimeElements/Duration/CollectionAudioDurationElement.js":
/*!******************************************************************************!*\
  !*** ./src/elements/TimeElements/Duration/CollectionAudioDurationElement.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollectionAudioDurationElement": () => (/* binding */ CollectionAudioDurationElement)
/* harmony export */ });
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CollectionAudioDurationElement = /*#__PURE__*/_createClass(function CollectionAudioDurationElement() {
  _classCallCheck(this, CollectionAudioDurationElement);
});

/***/ }),

/***/ "./src/elements/TimeElements/Duration/CollectionDurationElement.js":
/*!*************************************************************************!*\
  !*** ./src/elements/TimeElements/Duration/CollectionDurationElement.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollectionDurationElement": () => (/* binding */ CollectionDurationElement)
/* harmony export */ });
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CollectionDurationElement = /*#__PURE__*/_createClass(function CollectionDurationElement() {
  _classCallCheck(this, CollectionDurationElement);
});

/***/ }),

/***/ "./src/elements/TimeElements/Duration/GlobalDurationElement.js":
/*!*********************************************************************!*\
  !*** ./src/elements/TimeElements/Duration/GlobalDurationElement.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GlobalDurationElement": () => (/* binding */ GlobalDurationElement)
/* harmony export */ });
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GlobalDurationElement = /*#__PURE__*/_createClass(function GlobalDurationElement() {
  _classCallCheck(this, GlobalDurationElement);
});

/***/ }),

/***/ "./src/elements/TrackerElement.js":
/*!****************************************!*\
  !*** ./src/elements/TrackerElement.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TrackerElement": () => (/* binding */ TrackerElement)
/* harmony export */ });
/* harmony import */ var _TrackerElements_GlobalTrackerElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TrackerElements/GlobalTrackerElement */ "./src/elements/TrackerElements/GlobalTrackerElement.js");
/* harmony import */ var _TrackerElements_CollectionTrackerElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TrackerElements/CollectionTrackerElement */ "./src/elements/TrackerElements/CollectionTrackerElement.js");
/* harmony import */ var _TrackerElements_AudioTrackerElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TrackerElements/AudioTrackerElement */ "./src/elements/TrackerElements/AudioTrackerElement.js");
/* harmony import */ var _TrackerElements_CollectionAudioTrackerElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TrackerElements/CollectionAudioTrackerElement */ "./src/elements/TrackerElements/CollectionAudioTrackerElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }






var _configureGlobalTrackerElement = /*#__PURE__*/new WeakSet();

var _configureCollectionTrackerElement = /*#__PURE__*/new WeakSet();

var _configureAudioTrackerElement = /*#__PURE__*/new WeakSet();

var _configureCollectionAudioTrackerElement = /*#__PURE__*/new WeakSet();

var TrackerElement = /*#__PURE__*/function () {
  function TrackerElement() {
    _classCallCheck(this, TrackerElement);

    _classPrivateMethodInitSpec(this, _configureCollectionAudioTrackerElement);

    _classPrivateMethodInitSpec(this, _configureAudioTrackerElement);

    _classPrivateMethodInitSpec(this, _configureCollectionTrackerElement);

    _classPrivateMethodInitSpec(this, _configureGlobalTrackerElement);
  }

  _createClass(TrackerElement, [{
    key: "setUp",
    value: function setUp() {
      _classPrivateMethodGet(this, _configureGlobalTrackerElement, _configureGlobalTrackerElement2).call(this);

      _classPrivateMethodGet(this, _configureCollectionTrackerElement, _configureCollectionTrackerElement2).call(this);

      _classPrivateMethodGet(this, _configureAudioTrackerElement, _configureAudioTrackerElement2).call(this);

      _classPrivateMethodGet(this, _configureCollectionAudioTrackerElement, _configureCollectionAudioTrackerElement2).call(this);
    }
  }], [{
    key: "syncCurrentTime",
    value: function syncCurrentTime(currentTime) {
      _TrackerElements_GlobalTrackerElement__WEBPACK_IMPORTED_MODULE_0__.GlobalTrackerElement.syncUI(currentTime);
      _TrackerElements_CollectionTrackerElement__WEBPACK_IMPORTED_MODULE_1__.CollectionTrackerElement.syncUI(currentTime);
      _TrackerElements_AudioTrackerElement__WEBPACK_IMPORTED_MODULE_2__.AudioTrackerElement.syncUI(currentTime);
      _TrackerElements_CollectionAudioTrackerElement__WEBPACK_IMPORTED_MODULE_3__.CollectionAudioTrackerElement.syncUI(currentTime);
    }
  }]);

  return TrackerElement;
}();

function _configureGlobalTrackerElement2() {
  var globalTrackerElement = new _TrackerElements_GlobalTrackerElement__WEBPACK_IMPORTED_MODULE_0__.GlobalTrackerElement();
  globalTrackerElement.initialize();
}

function _configureCollectionTrackerElement2() {
  var collectionTrackerElement = new _TrackerElements_CollectionTrackerElement__WEBPACK_IMPORTED_MODULE_1__.CollectionTrackerElement();
  collectionTrackerElement.initialize();
}

function _configureAudioTrackerElement2() {
  var audioTrackerElement = new _TrackerElements_AudioTrackerElement__WEBPACK_IMPORTED_MODULE_2__.AudioTrackerElement();
  audioTrackerElement.initialize();
}

function _configureCollectionAudioTrackerElement2() {
  var collectionAudioTrackerElement = new _TrackerElements_CollectionAudioTrackerElement__WEBPACK_IMPORTED_MODULE_3__.CollectionAudioTrackerElement();
  collectionAudioTrackerElement.initialize();
}

/***/ }),

/***/ "./src/elements/TrackerElements/AudioTrackerElement.js":
/*!*************************************************************!*\
  !*** ./src/elements/TrackerElements/AudioTrackerElement.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AudioTrackerElement": () => (/* binding */ AudioTrackerElement)
/* harmony export */ });
/* harmony import */ var _core_Audio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Audio */ "./src/core/Audio.js");
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _services_Time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/services/Time */ "./src/services/Time.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }





var _elements = /*#__PURE__*/new WeakMap();

var _isIE = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _bindInteractions = /*#__PURE__*/new WeakSet();

var _handleInteraction = /*#__PURE__*/new WeakSet();

var AudioTrackerElement = /*#__PURE__*/function () {
  function AudioTrackerElement() {
    _classCallCheck(this, AudioTrackerElement);

    _classPrivateMethodInitSpec(this, _handleInteraction);

    _classPrivateMethodInitSpec(this, _bindInteractions);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _isIE, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _isIE, _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isIE());
  }

  _createClass(AudioTrackerElement, [{
    key: "initialize",
    value: function initialize() {
      _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

      _classPrivateMethodGet(this, _bindInteractions, _bindInteractions2).call(this);
    }
  }], [{
    key: "syncUI",
    value: function syncUI(completionPercentage) {
      var elements = document.querySelectorAll(AudioTrackerElement.audioTrackerQuery);
      var activeAudioIndex = _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.getActiveAudioIndex();
      elements.forEach(function (element) {
        var elementAudioIndex = element.getAttribute('data-amplitude-audio-index');

        if (activeAudioIndex == elementAudioIndex) {
          element.value = completionPercentage;
        } else {
          element.value = 0;
        }
      });
    }
  }]);

  return AudioTrackerElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(AudioTrackerElement.audioTrackerQuery));
}

function _bindInteractions2() {
  var _this = this;

  _classPrivateFieldGet(this, _elements).forEach(function (element) {
    if (_classPrivateFieldGet(_this, _isIE)) {
      element.removeEventListener("change", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("change", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2).bind(_this, element));
    } else {
      element.removeEventListener("input", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("input", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2).bind(_this, element));
    }
  });
}

function _handleInteraction2(element) {
  if (!_services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isLive()) {
    var activeAudioIndex = _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.getActiveAudioIndex();
    var elementAudioIndex = element.getAttribute('data-amplitude-audio-index');

    if (activeAudioIndex == elementAudioIndex) {
      var locationPercentage = element.value;
      var trackedLocation = _services_Time__WEBPACK_IMPORTED_MODULE_2__.Time.percentageInSeconds(locationPercentage);
      var audio = new _core_Audio__WEBPACK_IMPORTED_MODULE_0__.Audio();
      audio.setCurrentTime(trackedLocation);
    }
  }
}

_defineProperty(AudioTrackerElement, "audioTrackerQuery", 'input[type="range"].amplitude-audio-tracker[data-amplitude-audio-index]:not([data-amplitude-collection-key])');

/***/ }),

/***/ "./src/elements/TrackerElements/CollectionAudioTrackerElement.js":
/*!***********************************************************************!*\
  !*** ./src/elements/TrackerElements/CollectionAudioTrackerElement.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollectionAudioTrackerElement": () => (/* binding */ CollectionAudioTrackerElement)
/* harmony export */ });
/* harmony import */ var _core_Audio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Audio */ "./src/core/Audio.js");
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _services_Time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/services/Time */ "./src/services/Time.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }





var _elements = /*#__PURE__*/new WeakMap();

var _isIE = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _bindInteractions = /*#__PURE__*/new WeakSet();

var _handleInteraction = /*#__PURE__*/new WeakSet();

var CollectionAudioTrackerElement = /*#__PURE__*/function () {
  function CollectionAudioTrackerElement() {
    _classCallCheck(this, CollectionAudioTrackerElement);

    _classPrivateMethodInitSpec(this, _handleInteraction);

    _classPrivateMethodInitSpec(this, _bindInteractions);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _isIE, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _isIE, _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isIE());
  }

  _createClass(CollectionAudioTrackerElement, [{
    key: "initialize",
    value: function initialize() {
      _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

      _classPrivateMethodGet(this, _bindInteractions, _bindInteractions2).call(this);
    }
  }], [{
    key: "syncUI",
    value: function syncUI(completionPercentage) {
      var elements = document.querySelectorAll(CollectionAudioTrackerElement.collectionAudioTrackerQuery);
      var activeCollectionKey = _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.getActiveCollection();
      var activeAudioIndex = _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.getActiveAudioIndex();
      elements.forEach(function (element) {
        var elementCollectionKey = element.getAttribute('data-amplitude-collection-key');
        var elementAudioIndex = element.getAttribute('data-amplitude-audio-index');

        if (activeCollectionKey == elementCollectionKey && activeAudioIndex == elementAudioIndex) {
          element.value = completionPercentage;
        } else {
          element.value = 0;
        }
      });
    }
  }]);

  return CollectionAudioTrackerElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(CollectionAudioTrackerElement.collectionAudioTrackerQuery));
}

function _bindInteractions2() {
  var _this = this;

  _classPrivateFieldGet(this, _elements).forEach(function (element) {
    if (_classPrivateFieldGet(_this, _isIE)) {
      element.removeEventListener("change", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("change", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2).bind(_this, element));
    } else {
      element.removeEventListener("input", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("input", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2).bind(_this, element));
    }
  });
}

function _handleInteraction2(element) {
  if (!_services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isLive()) {
    var activeCollectionKey = _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.getActiveCollection();
    var elementCollectionKey = element.getAttribute('data-amplitude-collection-key');
    var activeAudioIndex = _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.getActiveAudioIndex();
    var elementAudioIndex = element.getAttribute('data-amplitude-audio-index');

    if (activeCollectionKey == elementCollectionKey && activeAudioIndex == elementAudioIndex) {
      var locationPercentage = element.value;
      var trackedLocation = _services_Time__WEBPACK_IMPORTED_MODULE_2__.Time.percentageInSeconds(locationPercentage);
      var audio = new _core_Audio__WEBPACK_IMPORTED_MODULE_0__.Audio();
      audio.setCurrentTime(trackedLocation);
    }
  }
}

_defineProperty(CollectionAudioTrackerElement, "collectionAudioTrackerQuery", 'input[type="range"].amplitude-audio-tracker[data-amplitude-collection-key][data-amplitude-audio-index]');

/***/ }),

/***/ "./src/elements/TrackerElements/CollectionTrackerElement.js":
/*!******************************************************************!*\
  !*** ./src/elements/TrackerElements/CollectionTrackerElement.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollectionTrackerElement": () => (/* binding */ CollectionTrackerElement)
/* harmony export */ });
/* harmony import */ var _core_Audio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Audio */ "./src/core/Audio.js");
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _services_Time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/services/Time */ "./src/services/Time.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }





var _elements = /*#__PURE__*/new WeakMap();

var _isIE = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _bindInteractions = /*#__PURE__*/new WeakSet();

var _handleInteraction = /*#__PURE__*/new WeakSet();

var CollectionTrackerElement = /*#__PURE__*/function () {
  function CollectionTrackerElement() {
    _classCallCheck(this, CollectionTrackerElement);

    _classPrivateMethodInitSpec(this, _handleInteraction);

    _classPrivateMethodInitSpec(this, _bindInteractions);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _isIE, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _isIE, _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isIE());
  }

  _createClass(CollectionTrackerElement, [{
    key: "initialize",
    value: function initialize() {
      _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

      _classPrivateMethodGet(this, _bindInteractions, _bindInteractions2).call(this);
    }
  }], [{
    key: "syncUI",
    value: function syncUI(completionPercentage) {
      var elements = document.querySelectorAll(CollectionTrackerElement.collectionTrackerQuery);
      var activeCollectionKey = _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.getActiveCollection();
      elements.forEach(function (element) {
        var elementCollectionKey = element.getAttribute('data-amplitude-collection-key');

        if (activeCollectionKey == elementCollectionKey) {
          element.value = completionPercentage;
        } else {
          element.value = 0;
        }
      });
    }
  }]);

  return CollectionTrackerElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(CollectionTrackerElement.collectionTrackerQuery));
}

function _bindInteractions2() {
  var _this = this;

  _classPrivateFieldGet(this, _elements).forEach(function (element) {
    if (_classPrivateFieldGet(_this, _isIE)) {
      element.removeEventListener("change", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("change", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2).bind(_this, element));
    } else {
      element.removeEventListener("input", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("input", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2).bind(_this, element));
    }
  });
}

function _handleInteraction2(element) {
  if (!_services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isLive()) {
    var activeCollectionKey = _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.getActiveCollection();
    var elementCollectionKey = element.getAttribute('data-amplitude-collection-key');

    if (activeCollectionKey == elementCollectionKey) {
      var locationPercentage = element.value;
      var trackedLocation = _services_Time__WEBPACK_IMPORTED_MODULE_2__.Time.percentageInSeconds(locationPercentage);
      var audio = new _core_Audio__WEBPACK_IMPORTED_MODULE_0__.Audio();
      audio.setCurrentTime(trackedLocation);
    }
  }
}

_defineProperty(CollectionTrackerElement, "collectionTrackerQuery", 'input[type="range"].amplitude-audio-tracker[data-amplitude-collection-key]:not([data-amplitude-audio-index])');

/***/ }),

/***/ "./src/elements/TrackerElements/GlobalTrackerElement.js":
/*!**************************************************************!*\
  !*** ./src/elements/TrackerElements/GlobalTrackerElement.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GlobalTrackerElement": () => (/* binding */ GlobalTrackerElement)
/* harmony export */ });
/* harmony import */ var _core_Audio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Audio */ "./src/core/Audio.js");
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _services_Time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/services/Time */ "./src/services/Time.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }





var _elements = /*#__PURE__*/new WeakMap();

var _isIE = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _bindInteractions = /*#__PURE__*/new WeakSet();

var _handleInteraction = /*#__PURE__*/new WeakSet();

var GlobalTrackerElement = /*#__PURE__*/function () {
  function GlobalTrackerElement() {
    _classCallCheck(this, GlobalTrackerElement);

    _classPrivateMethodInitSpec(this, _handleInteraction);

    _classPrivateMethodInitSpec(this, _bindInteractions);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _isIE, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _isIE, _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isIE());
  }

  _createClass(GlobalTrackerElement, [{
    key: "initialize",
    value: function initialize() {
      _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

      _classPrivateMethodGet(this, _bindInteractions, _bindInteractions2).call(this);
    }
  }], [{
    key: "syncUI",
    value: function syncUI(completionPercentage) {
      var elements = document.querySelectorAll(GlobalTrackerElement.globalTrackerQuery);
      elements.forEach(function (element) {
        element.value = completionPercentage;
      });
    }
  }]);

  return GlobalTrackerElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(GlobalTrackerElement.globalTrackerQuery));
}

function _bindInteractions2() {
  var _this = this;

  _classPrivateFieldGet(this, _elements).forEach(function (element) {
    if (_classPrivateFieldGet(_this, _isIE)) {
      element.removeEventListener("change", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("change", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2).bind(_this, element));
    } else {
      element.removeEventListener("input", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      element.addEventListener("input", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2).bind(_this, element));
    }
  });
}

function _handleInteraction2(element) {
  if (!_services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isLive()) {
    var locationPercentage = element.value;
    var trackedLocation = _services_Time__WEBPACK_IMPORTED_MODULE_2__.Time.percentageInSeconds(locationPercentage);
    var audio = new _core_Audio__WEBPACK_IMPORTED_MODULE_0__.Audio();
    audio.setCurrentTime(trackedLocation);
  }
}

_defineProperty(GlobalTrackerElement, "globalTrackerQuery", 'input[type="range"].amplitude-audio-tracker:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])');

/***/ }),

/***/ "./src/elements/VolumeDownElement.js":
/*!*******************************************!*\
  !*** ./src/elements/VolumeDownElement.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VolumeDownElement": () => (/* binding */ VolumeDownElement)
/* harmony export */ });
/* harmony import */ var _core_Audio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Audio */ "./src/core/Audio.js");
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _MuteElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MuteElement */ "./src/elements/MuteElement.js");
/* harmony import */ var _VolumeSliderElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VolumeSliderElement */ "./src/elements/VolumeSliderElement.js");
/* harmony import */ var _services_Debug__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/services/Debug */ "./src/services/Debug.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }






/**
 * Handles the configuration and managing of Volume Down elements
 * 
 * A Volume Down element is defined as the following:
 * 
 * Element: class="amplitude-volume-down"
 * 
 * Whenever this element is interacted with, the audio is muted no matter where.
 */

var _elements = /*#__PURE__*/new WeakMap();

var _mobile = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _bindInteractions = /*#__PURE__*/new WeakSet();

var _handleInteraction = /*#__PURE__*/new WeakSet();

var VolumeDownElement = /*#__PURE__*/function () {
  function VolumeDownElement() {
    _classCallCheck(this, VolumeDownElement);

    _classPrivateMethodInitSpec(this, _handleInteraction);

    _classPrivateMethodInitSpec(this, _bindInteractions);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _mobile, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _mobile, _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isMobile());
  }

  _createClass(VolumeDownElement, [{
    key: "setUp",
    value: function setUp() {
      _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

      _classPrivateMethodGet(this, _bindInteractions, _bindInteractions2).call(this);
    }
  }]);

  return VolumeDownElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(VolumeDownElement.volumeDownElementQuery));
}

function _bindInteractions2() {
  var _this = this;

  if (_classPrivateFieldGet(this, _elements).length > 0 && _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isIos()) {
    _services_Debug__WEBPACK_IMPORTED_MODULE_4__.Debug.writeMessage("iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4");
  } else {
    _classPrivateFieldGet(this, _elements).forEach(function (element) {
      if (_classPrivateFieldGet(_this, _mobile)) {
        element.removeEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
        element.addEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      } else {
        element.removeEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
        element.addEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      }
    });
  }
}

function _handleInteraction2() {
  if (!_services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isTouchMoving()) {
    var audio = new _core_Audio__WEBPACK_IMPORTED_MODULE_0__.Audio();
    var currentVolume = _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.getVolume();
    var volumeDecrement = _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.getVolumeDecrement();

    if (currentVolume - volumeDecrement > 0) {
      audio.setVolume(currentVolume - volumeDecrement);
    } else {
      audio.setVolume(0);
    }

    _MuteElement__WEBPACK_IMPORTED_MODULE_2__.MuteElement.syncElements();
    _VolumeSliderElement__WEBPACK_IMPORTED_MODULE_3__.VolumeSliderElement.syncElements();
  }
}

_defineProperty(VolumeDownElement, "volumeDownElementQuery", '.amplitude-volume-down');

/***/ }),

/***/ "./src/elements/VolumeSliderElement.js":
/*!*********************************************!*\
  !*** ./src/elements/VolumeSliderElement.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VolumeSliderElement": () => (/* binding */ VolumeSliderElement)
/* harmony export */ });
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _MuteElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MuteElement */ "./src/elements/MuteElement.js");
/* harmony import */ var _core_Audio__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/Audio */ "./src/core/Audio.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }




/**
 * Handles the configuration and managing of Volume Slider elements
 * 
 * A Volume Slider element is defined as the following:
 * 
 * Element: class="amplitude-volume-slider"
 * Type: input[type="range"]
 * 
 * Whenever this element is interacted with, the audio volume is adjusted no matter where.
 */

var _elements = /*#__PURE__*/new WeakMap();

var _ie = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _bindInteractions = /*#__PURE__*/new WeakSet();

var _handleInteraction = /*#__PURE__*/new WeakSet();

var VolumeSliderElement = /*#__PURE__*/function () {
  function VolumeSliderElement() {
    _classCallCheck(this, VolumeSliderElement);

    _classPrivateMethodInitSpec(this, _handleInteraction);

    _classPrivateMethodInitSpec(this, _bindInteractions);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _ie, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _ie, _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.isIE());
  }

  _createClass(VolumeSliderElement, [{
    key: "setUp",
    value: function setUp() {
      _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

      _classPrivateMethodGet(this, _bindInteractions, _bindInteractions2).call(this);
    }
  }], [{
    key: "syncElements",
    value: function syncElements() {
      var elements = document.querySelectorAll(VolumeSliderElement.volumeSliderElementQuery);
      elements.forEach(function (element) {
        element.value = _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getVolume();
      });
    }
  }]);

  return VolumeSliderElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(VolumeSliderElement.volumeSliderElementQuery));
}

function _bindInteractions2() {
  var _this = this;

  if (_services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.isIos()) {
    Debug.writeMessage("iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4");
  } else {
    _classPrivateFieldGet(this, _elements).forEach(function (element) {
      if (_classPrivateFieldGet(_this, _ie)) {
        element.removeEventListener("change", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
        element.addEventListener("change", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      } else {
        element.removeEventListener("input", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
        element.addEventListener("input", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      }
    });
  }
}

function _handleInteraction2() {
  var audio = new _core_Audio__WEBPACK_IMPORTED_MODULE_2__.Audio();
  audio.setVolume(this.value);
  _MuteElement__WEBPACK_IMPORTED_MODULE_1__.MuteElement.syncElements();
  VolumeSliderElement.syncElements();
}

_defineProperty(VolumeSliderElement, "volumeSliderElementQuery", 'input[type="range"].amplitude-volume-slider');

/***/ }),

/***/ "./src/elements/VolumeUpElement.js":
/*!*****************************************!*\
  !*** ./src/elements/VolumeUpElement.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VolumeUpElement": () => (/* binding */ VolumeUpElement)
/* harmony export */ });
/* harmony import */ var _core_Audio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Audio */ "./src/core/Audio.js");
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _MuteElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MuteElement */ "./src/elements/MuteElement.js");
/* harmony import */ var _VolumeSliderElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VolumeSliderElement */ "./src/elements/VolumeSliderElement.js");
/* harmony import */ var _services_Debug__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/services/Debug */ "./src/services/Debug.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }






/**
 * Handles the configuration and managing of Volume Up elements
 * 
 * A Volume Up element is defined as the following:
 * 
 * Element: class="amplitude-volume-up"
 * 
 * Whenever this element is interacted with, the audio is muted no matter where.
 */

var _elements = /*#__PURE__*/new WeakMap();

var _mobile = /*#__PURE__*/new WeakMap();

var _findElements = /*#__PURE__*/new WeakSet();

var _bindInteractions = /*#__PURE__*/new WeakSet();

var _handleInteraction = /*#__PURE__*/new WeakSet();

var VolumeUpElement = /*#__PURE__*/function () {
  function VolumeUpElement() {
    _classCallCheck(this, VolumeUpElement);

    _classPrivateMethodInitSpec(this, _handleInteraction);

    _classPrivateMethodInitSpec(this, _bindInteractions);

    _classPrivateMethodInitSpec(this, _findElements);

    _classPrivateFieldInitSpec(this, _elements, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _mobile, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _mobile, _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isMobile());
  }

  _createClass(VolumeUpElement, [{
    key: "setUp",
    value: function setUp() {
      _classPrivateMethodGet(this, _findElements, _findElements2).call(this);

      _classPrivateMethodGet(this, _bindInteractions, _bindInteractions2).call(this);
    }
  }]);

  return VolumeUpElement;
}();

function _findElements2() {
  _classPrivateFieldSet(this, _elements, document.querySelectorAll(VolumeUpElement.volumeUpElementQuery));
}

function _bindInteractions2() {
  var _this = this;

  if (_classPrivateFieldGet(this, _elements).length > 0 && _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isIos()) {
    _services_Debug__WEBPACK_IMPORTED_MODULE_4__.Debug.writeMessage("iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4");
  } else {
    _classPrivateFieldGet(this, _elements).forEach(function (element) {
      if (_classPrivateFieldGet(_this, _mobile)) {
        element.removeEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
        element.addEventListener("touchend", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      } else {
        element.removeEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
        element.addEventListener("click", _classPrivateMethodGet(_this, _handleInteraction, _handleInteraction2));
      }
    });
  }
}

function _handleInteraction2() {
  if (!_services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isTouchMoving()) {
    var audio = new _core_Audio__WEBPACK_IMPORTED_MODULE_0__.Audio();
    var currentVolume = _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.getVolume();
    var volumeIncrement = _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.getVolumeIncrement();

    if (currentVolume + volumeIncrement <= 100) {
      audio.setVolume(currentVolume + volumeIncrement);
    } else {
      audio.setVolume(100);
    }

    _MuteElement__WEBPACK_IMPORTED_MODULE_2__.MuteElement.syncElements();
    _VolumeSliderElement__WEBPACK_IMPORTED_MODULE_3__.VolumeSliderElement.syncElements();
  }
}

_defineProperty(VolumeUpElement, "volumeUpElementQuery", '.amplitude-volume-up');

/***/ }),

/***/ "./src/events/AudioEndedEvent.js":
/*!***************************************!*\
  !*** ./src/events/AudioEndedEvent.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AudioEndedEvent": () => (/* binding */ AudioEndedEvent)
/* harmony export */ });
/* harmony import */ var _core_Audio_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Audio.js */ "./src/core/Audio.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/config.js */ "./src/config.js");
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _services_Collections_Navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/services/Collections/Navigation */ "./src/services/Collections/Navigation.js");
/* harmony import */ var _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/elements/PlayPauseElement */ "./src/elements/PlayPauseElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }







var _handle = /*#__PURE__*/new WeakSet();

var AudioEndedEvent = /*#__PURE__*/function () {
  function AudioEndedEvent() {
    _classCallCheck(this, AudioEndedEvent);

    _classPrivateMethodInitSpec(this, _handle);
  }

  _createClass(AudioEndedEvent, [{
    key: "bind",
    value: function bind() {
      _config_js__WEBPACK_IMPORTED_MODULE_1__.config.audio_element.removeEventListener("ended", _classPrivateMethodGet(this, _handle, _handle2));
      _config_js__WEBPACK_IMPORTED_MODULE_1__.config.audio_element.addEventListener("ended", _classPrivateMethodGet(this, _handle, _handle2).bind(this));
    }
  }]);

  return AudioEndedEvent;
}();

function _handle2() {
  setTimeout(function () {
    if (_services_ConfigState__WEBPACK_IMPORTED_MODULE_2__.ConfigState.getScope() == 'collection' && _services_ConfigState__WEBPACK_IMPORTED_MODULE_2__.ConfigState.getContinueNext()) {
      var navigation = new _services_Collections_Navigation__WEBPACK_IMPORTED_MODULE_3__.Navigation();
      navigation.next(_services_ConfigState__WEBPACK_IMPORTED_MODULE_2__.ConfigState.getActiveCollection(), true);
    } else {
      var audio = new _core_Audio_js__WEBPACK_IMPORTED_MODULE_0__.Audio();
      audio.stop();
      _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_4__.PlayPauseElement.syncAll();
    }
  }, _config_js__WEBPACK_IMPORTED_MODULE_1__.config.delay);
}

/***/ }),

/***/ "./src/events/KeyBindingEvents.js":
/*!****************************************!*\
  !*** ./src/events/KeyBindingEvents.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KeyBindingEvents": () => (/* binding */ KeyBindingEvents)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _bindKeyPress = /*#__PURE__*/new WeakSet();

var _handle = /*#__PURE__*/new WeakSet();

var _isFormFocused = /*#__PURE__*/new WeakSet();

var KeyBindingEvents = /*#__PURE__*/function () {
  function KeyBindingEvents() {
    _classCallCheck(this, KeyBindingEvents);

    _classPrivateMethodInitSpec(this, _isFormFocused);

    _classPrivateMethodInitSpec(this, _handle);

    _classPrivateMethodInitSpec(this, _bindKeyPress);
  }

  _createClass(KeyBindingEvents, [{
    key: "bind",
    value: function bind() {
      _classPrivateMethodGet(this, _bindKeyPress, _bindKeyPress2).call(this);
    }
  }]);

  return KeyBindingEvents;
}();

function _bindKeyPress2() {
  document.removeEventListener("keydown", _classPrivateMethodGet(this, _handle, _handle2).bind(this));
  document.addEventListener("keydown", _classPrivateMethodGet(this, _handle, _handle2).bind(this));
}

function _handle2(event) {
  if (!_classPrivateMethodGet(this, _isFormFocused, _isFormFocused2).call(this)) {
    var key = event.key;
  }
}

function _isFormFocused2() {
  var activeElement = document.activeElement.tagName.toLowerCase();
  var ignoredElements = ['input', 'textarea', 'select', 'checkbox'];
  return ignoredElements.indexOf(activeElement) > -1;
}

/***/ }),

/***/ "./src/events/TimeUpdateEvent.js":
/*!***************************************!*\
  !*** ./src/events/TimeUpdateEvent.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TimeUpdateEvent": () => (/* binding */ TimeUpdateEvent)
/* harmony export */ });
/* harmony import */ var _elements_BufferedProgressElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/elements/BufferedProgressElement */ "./src/elements/BufferedProgressElement.js");
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/config.js */ "./src/config.js");
/* harmony import */ var _elements_ProgressElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/elements/ProgressElement */ "./src/elements/ProgressElement.js");
/* harmony import */ var _services_Time__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/services/Time */ "./src/services/Time.js");
/* harmony import */ var _elements_TimeElement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/elements/TimeElement */ "./src/elements/TimeElement.js");
/* harmony import */ var _elements_TrackerElement__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/elements/TrackerElement */ "./src/elements/TrackerElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }









var _bindTimeUpdate = /*#__PURE__*/new WeakSet();

var _bindDurationChange = /*#__PURE__*/new WeakSet();

var _handle = /*#__PURE__*/new WeakSet();

var _updateTimeInformation = /*#__PURE__*/new WeakSet();

var _runTimeCallbacks = /*#__PURE__*/new WeakSet();

var TimeUpdateEvent = /*#__PURE__*/function () {
  function TimeUpdateEvent() {
    _classCallCheck(this, TimeUpdateEvent);

    _classPrivateMethodInitSpec(this, _runTimeCallbacks);

    _classPrivateMethodInitSpec(this, _updateTimeInformation);

    _classPrivateMethodInitSpec(this, _handle);

    _classPrivateMethodInitSpec(this, _bindDurationChange);

    _classPrivateMethodInitSpec(this, _bindTimeUpdate);
  }

  _createClass(TimeUpdateEvent, [{
    key: "bind",
    value: function bind() {
      _classPrivateMethodGet(this, _bindTimeUpdate, _bindTimeUpdate2).call(this);

      _classPrivateMethodGet(this, _bindDurationChange, _bindDurationChange2).call(this);
    }
  }]);

  return TimeUpdateEvent;
}();

function _bindTimeUpdate2() {
  _config_js__WEBPACK_IMPORTED_MODULE_2__.config.audio_element.removeEventListener("timeupdate", _classPrivateMethodGet(this, _handle, _handle2).bind(this));
  _config_js__WEBPACK_IMPORTED_MODULE_2__.config.audio_element.addEventListener("timeupdate", _classPrivateMethodGet(this, _handle, _handle2).bind(this));
}

function _bindDurationChange2() {
  _config_js__WEBPACK_IMPORTED_MODULE_2__.config.audio_element.removeEventListener("durationchange", _classPrivateMethodGet(this, _handle, _handle2).bind(this));
  _config_js__WEBPACK_IMPORTED_MODULE_2__.config.audio_element.addEventListener("durationchange", _classPrivateMethodGet(this, _handle, _handle2).bind(this));
}

function _handle2() {
  _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.updateBufferedTime();
  _elements_BufferedProgressElement__WEBPACK_IMPORTED_MODULE_0__.BufferedProgressElement.syncAll();

  _classPrivateMethodGet(this, _updateTimeInformation, _updateTimeInformation2).call(this);

  _classPrivateMethodGet(this, _runTimeCallbacks, _runTimeCallbacks2).call(this);
}

function _updateTimeInformation2() {
  if (!_services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.isLive()) {
    var time = new _services_Time__WEBPACK_IMPORTED_MODULE_4__.Time();
    var currentTime = time.computeCurrentTimes();
    var completionPercentage = time.computeAudioCompletionPercentage();
    var duration = time.computeAudioDuration();
    var timeElement = new _elements_TimeElement__WEBPACK_IMPORTED_MODULE_5__.TimeElement();
    timeElement.syncCurrentTime(currentTime);
    timeElement.syncDurationTime(currentTime, duration);
    _elements_TrackerElement__WEBPACK_IMPORTED_MODULE_6__.TrackerElement.syncCurrentTime(completionPercentage);
    _elements_ProgressElement__WEBPACK_IMPORTED_MODULE_3__.ProgressElement.syncCurrentTime(completionPercentage);
  }
}

function _runTimeCallbacks2() {}

/***/ }),

/***/ "./src/init/Collections.js":
/*!*********************************!*\
  !*** ./src/init/Collections.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Collections": () => (/* binding */ Collections)
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/config.js */ "./src/config.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }



var _syncSoundCloudData = /*#__PURE__*/new WeakSet();

var _setActiveIndexes = /*#__PURE__*/new WeakSet();

var _initializeShuffle = /*#__PURE__*/new WeakSet();

var _initializeRepeat = /*#__PURE__*/new WeakSet();

var Collections = /*#__PURE__*/function () {
  function Collections() {
    _classCallCheck(this, Collections);

    _classPrivateMethodInitSpec(this, _initializeRepeat);

    _classPrivateMethodInitSpec(this, _initializeShuffle);

    _classPrivateMethodInitSpec(this, _setActiveIndexes);

    _classPrivateMethodInitSpec(this, _syncSoundCloudData);
  }

  _createClass(Collections, [{
    key: "initializeCollections",
    value: function initializeCollections() {
      if (_config_js__WEBPACK_IMPORTED_MODULE_0__.config.collections.length > 0) {
        _classPrivateMethodGet(this, _syncSoundCloudData, _syncSoundCloudData2).call(this);

        _classPrivateMethodGet(this, _setActiveIndexes, _setActiveIndexes2).call(this);

        _classPrivateMethodGet(this, _initializeShuffle, _initializeShuffle2).call(this);

        _classPrivateMethodGet(this, _initializeRepeat, _initializeRepeat2).call(this);
      }
    }
  }]);

  return Collections;
}();

function _syncSoundCloudData2() {}

function _setActiveIndexes2() {
  _config_js__WEBPACK_IMPORTED_MODULE_0__.config.collections.forEach(function (collection) {
    collection.active_index = null;
  });
}

function _initializeShuffle2() {
  _config_js__WEBPACK_IMPORTED_MODULE_0__.config.collections.forEach(function (collection) {
    collection.shuffle = false;
    collection.shuffle_list = [];
  });
}

function _initializeRepeat2() {
  _config_js__WEBPACK_IMPORTED_MODULE_0__.config.collections.forEach(function (collection) {
    collection.repeat = false;
  });
  console.log(_config_js__WEBPACK_IMPORTED_MODULE_0__.config);
}

/***/ }),

/***/ "./src/init/Initializer.js":
/*!*********************************!*\
  !*** ./src/init/Initializer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Initializer": () => (/* binding */ Initializer)
/* harmony export */ });
/* harmony import */ var _services_Debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/Debug */ "./src/services/Debug.js");
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _services_EventManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/services/EventManager */ "./src/services/EventManager.js");
/* harmony import */ var _services_ElementsManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/services/ElementsManager */ "./src/services/ElementsManager.js");
/* harmony import */ var _init_UserConfig__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/init/UserConfig */ "./src/init/UserConfig.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../config */ "./src/config.js");
/* harmony import */ var _services_Audio_Navigation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/services/Audio/Navigation */ "./src/services/Audio/Navigation.js");
/* harmony import */ var _services_Callbacks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/services/Callbacks */ "./src/services/Callbacks.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }










var _element = /*#__PURE__*/new WeakMap();

var _userConfig = /*#__PURE__*/new WeakMap();

var _configState = /*#__PURE__*/new WeakMap();

var _ready = /*#__PURE__*/new WeakMap();

var _isValidUrl = /*#__PURE__*/new WeakSet();

var _loadUserConfig = /*#__PURE__*/new WeakSet();

var _prepareAmplitude = /*#__PURE__*/new WeakSet();

var _resetConfig = /*#__PURE__*/new WeakSet();

var _copyUserConfig = /*#__PURE__*/new WeakSet();

var _initializeEvents = /*#__PURE__*/new WeakSet();

var _initializeAudio = /*#__PURE__*/new WeakSet();

var _initializeElements = /*#__PURE__*/new WeakSet();

var _initializeCallbacks = /*#__PURE__*/new WeakSet();

var Initializer = /*#__PURE__*/function () {
  function Initializer(userConfig, element) {
    _classCallCheck(this, Initializer);

    _classPrivateMethodInitSpec(this, _initializeCallbacks);

    _classPrivateMethodInitSpec(this, _initializeElements);

    _classPrivateMethodInitSpec(this, _initializeAudio);

    _classPrivateMethodInitSpec(this, _initializeEvents);

    _classPrivateMethodInitSpec(this, _copyUserConfig);

    _classPrivateMethodInitSpec(this, _resetConfig);

    _classPrivateMethodInitSpec(this, _prepareAmplitude);

    _classPrivateMethodInitSpec(this, _loadUserConfig);

    _classPrivateMethodInitSpec(this, _isValidUrl);

    _classPrivateFieldInitSpec(this, _element, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _userConfig, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _configState, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _ready, {
      writable: true,
      value: false
    });

    _classPrivateFieldSet(this, _configState, new _services_ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState());

    _classPrivateFieldGet(this, _configState).setIsMobile();

    _classPrivateFieldSet(this, _userConfig, userConfig);

    _classPrivateFieldSet(this, _element, element);
  }

  _createClass(Initializer, [{
    key: "setup",
    value: function setup() {
      if (_classPrivateMethodGet(this, _isValidUrl, _isValidUrl2).call(this, _classPrivateFieldGet(this, _userConfig))) {
        _classPrivateMethodGet(this, _loadUserConfig, _loadUserConfig2).call(this);
      } else {
        _classPrivateMethodGet(this, _prepareAmplitude, _prepareAmplitude2).call(this);
      }
    }
  }]);

  return Initializer;
}();

function _isValidUrl2(url) {
  try {
    new URL(url);
  } catch (e) {
    _services_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.writeMessage('AmplitudeJS must be initialized with a JSON object or a valid URL.');
    return false;
  }

  return true;
}

function _loadUserConfig2() {
  var _this = this;

  fetch(_classPrivateFieldGet(this, _userConfig)).then(function (response) {
    if (response.status != 200) {
      throw response.status;
    } else {
      return response.json();
    }
  }).then(function (data) {
    _classPrivateFieldSet(_this, _userConfig, data);

    _classPrivateMethodGet(_this, _prepareAmplitude, _prepareAmplitude2).call(_this);
  })["catch"](function (error) {
    _services_Debug__WEBPACK_IMPORTED_MODULE_0__.Debug.writeMessage(error);
  });
}

function _prepareAmplitude2() {
  _classPrivateMethodGet(this, _resetConfig, _resetConfig2).call(this);

  _classPrivateMethodGet(this, _copyUserConfig, _copyUserConfig2).call(this);

  _classPrivateMethodGet(this, _initializeAudio, _initializeAudio2).call(this);

  _classPrivateMethodGet(this, _initializeEvents, _initializeEvents2).call(this);

  _classPrivateMethodGet(this, _initializeElements, _initializeElements2).call(this);

  _classPrivateMethodGet(this, _initializeCallbacks, _initializeCallbacks2).call(this);
}

function _resetConfig2() {
  _classPrivateFieldGet(this, _configState).resetConfig();
}

function _copyUserConfig2() {
  var userConfigInit = new _init_UserConfig__WEBPACK_IMPORTED_MODULE_4__.UserConfig();
  userConfigInit.copyUserSettings(_classPrivateFieldGet(this, _userConfig));
}

function _initializeEvents2() {
  var eventManager = new _services_EventManager__WEBPACK_IMPORTED_MODULE_2__.EventManager();
  eventManager.initializeAllEvents();
}

function _initializeAudio2() {
  var audioNavigator = new _services_Audio_Navigation__WEBPACK_IMPORTED_MODULE_6__.Navigation();

  if (_config__WEBPACK_IMPORTED_MODULE_5__.config.start_audio) {} else {
    audioNavigator.changeAudio(_config__WEBPACK_IMPORTED_MODULE_5__.config.audio[0], 0);
  }
}

function _initializeElements2() {
  var elementsManager = new _services_ElementsManager__WEBPACK_IMPORTED_MODULE_3__.ElementsManager();
  elementsManager.initializeElements();
}

function _initializeCallbacks2() {
  var callbacks = new _services_Callbacks__WEBPACK_IMPORTED_MODULE_7__.Callbacks();
  callbacks.handleNativeAudioElementEvents();
}

/***/ }),

/***/ "./src/init/UserConfig.js":
/*!********************************!*\
  !*** ./src/init/UserConfig.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserConfig": () => (/* binding */ UserConfig)
/* harmony export */ });
/* harmony import */ var _init_Collections__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/init/Collections */ "./src/init/Collections.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/config.js */ "./src/config.js");
/* harmony import */ var _elements_MuteElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/elements/MuteElement */ "./src/elements/MuteElement.js");
/* harmony import */ var _elements_PlaybackSpeedElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/elements/PlaybackSpeedElement */ "./src/elements/PlaybackSpeedElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }






var _setDefaultLiveSettings = /*#__PURE__*/new WeakSet();

var _setDefaultAudioIndices = /*#__PURE__*/new WeakSet();

var UserConfig = /*#__PURE__*/function () {
  function UserConfig() {
    _classCallCheck(this, UserConfig);

    _classPrivateMethodInitSpec(this, _setDefaultAudioIndices);

    _classPrivateMethodInitSpec(this, _setDefaultLiveSettings);
  }

  _createClass(UserConfig, [{
    key: "copyUserSettings",
    value: function copyUserSettings(userConfig) {
      this.setAudio(userConfig.audio);
      this.setCollections(userConfig.collections);
      this.setVolume(userConfig.volume);
      this.setDebug(userConfig.debug);
      this.setDefaultArtwork(userConfig.default_artwork);
      this.setPlaybackSpeed(userConfig.playback_speed);
      this.setCallbacks(userConfig.callbacks);
    }
  }, {
    key: "setAudio",
    value: function setAudio(value) {
      _config_js__WEBPACK_IMPORTED_MODULE_1__.config.audio = value != undefined ? value : [];

      _classPrivateMethodGet(this, _setDefaultLiveSettings, _setDefaultLiveSettings2).call(this);

      _classPrivateMethodGet(this, _setDefaultAudioIndices, _setDefaultAudioIndices2).call(this);
    }
  }, {
    key: "setCollections",
    value: function setCollections(userCollections) {
      _config_js__WEBPACK_IMPORTED_MODULE_1__.config.collections = userCollections;
      var collections = new _init_Collections__WEBPACK_IMPORTED_MODULE_0__.Collections();
      collections.initializeCollections();
    }
  }, {
    key: "setVolume",
    value: function setVolume(volume) {
      _config_js__WEBPACK_IMPORTED_MODULE_1__.config.volume.current = volume && volume.initial ? volume.initial : 50;
      _config_js__WEBPACK_IMPORTED_MODULE_1__.config.volume.increment = volume && volume.increment ? volume.increment : 5;
      _config_js__WEBPACK_IMPORTED_MODULE_1__.config.volume.decrement = volume && volume.decrement ? volume.decrement : 5;
      _elements_MuteElement__WEBPACK_IMPORTED_MODULE_2__.MuteElement.syncElements();
    }
  }, {
    key: "setDebug",
    value: function setDebug(value) {
      _config_js__WEBPACK_IMPORTED_MODULE_1__.config.debug = value != undefined ? value : false;
    }
  }, {
    key: "setDefaultArtwork",
    value: function setDefaultArtwork(value) {
      _config_js__WEBPACK_IMPORTED_MODULE_1__.config.default_artwork = value != undefined ? value : false;
    }
  }, {
    key: "setPlaybackSpeed",
    value: function setPlaybackSpeed(speed) {
      _config_js__WEBPACK_IMPORTED_MODULE_1__.config.playback_speed = speed != undefined ? speed : 1.0;
      _elements_PlaybackSpeedElement__WEBPACK_IMPORTED_MODULE_3__.PlaybackSpeedElement.syncElements();
    }
  }, {
    key: "setCallbacks",
    value: function setCallbacks(callbacks) {
      _config_js__WEBPACK_IMPORTED_MODULE_1__.config.callbacks = callbacks != undefined ? callbacks : [];
    }
  }]);

  return UserConfig;
}();

function _setDefaultLiveSettings2() {
  _config_js__WEBPACK_IMPORTED_MODULE_1__.config.audio.forEach(function (audio, index) {
    if (audio.live == undefined) {
      audio.live = false;
    }
  });
}

function _setDefaultAudioIndices2() {
  _config_js__WEBPACK_IMPORTED_MODULE_1__.config.audio.forEach(function (audio, index) {
    audio.index = index;
  });
}

/***/ }),

/***/ "./src/methods/config.js":
/*!*******************************!*\
  !*** ./src/methods/config.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getConfig": () => (/* binding */ getConfig)
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/config.js */ "./src/config.js");

/**
 * Returns the current config for AmplitudeJS
 * 
 * Public Method: Amplitude.getConfig()
 * 
 * @access public
 * @returns {object} 
 */

function getConfig() {
  return _config_js__WEBPACK_IMPORTED_MODULE_0__.config;
}

/***/ }),

/***/ "./src/methods/eventListeners.js":
/*!***************************************!*\
  !*** ./src/methods/eventListeners.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addAudioEventListener": () => (/* binding */ addAudioEventListener)
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/config.js */ "./src/config.js");
/* harmony import */ var _services_Debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/Debug */ "./src/services/Debug.js");


var validEventListeners = ['abort', 'error', 'loadeddata', 'loadedmetadata', 'loadstart', 'pause', 'playing', 'play', 'progress', 'ratechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting', 'canplay', 'canplaythrough', 'durationchange', 'ended'];
/**
 * Binds an event listener to a native HTML 5 event
 * emitted from the audio element.
 * 
 * Public Accessor: Amplitude.addAudioEventListener( event, method )
 * @access public
 * @param string event - The event name you want to bind a listener to.
 * @param string method - The method you are binding to the event.
 */

function addAudioEventListener(event, method) {
  if (validEventListeners.indexOf(event) > -1) {
    _config_js__WEBPACK_IMPORTED_MODULE_0__.config.audio_element.addEventListener(event, method);
  } else {
    _services_Debug__WEBPACK_IMPORTED_MODULE_1__.Debug.writeMessage("Invalid event listener. Please see all valid events here: https://www.w3schools.com/tags/ref_av_dom.asp");
  }
}

/***/ }),

/***/ "./src/methods/init.js":
/*!*****************************!*\
  !*** ./src/methods/init.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _init_Initializer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/init/Initializer */ "./src/init/Initializer.js");

/**
 * The main init function.  The user will call this through
 * Amplitude.init() and pass in their settings.
 *
 * Public Accessor: Amplitude.init( user_config_json )
 * @access public
 * @param {object|url} userConfig - A URL or JSON object of user defined values that help configure and initialize AmplitudeJS.
 * @param {string|element} element - A unique identifier or DOM Element to bind Amplitude methods to.
 */

function init() {
  var userConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var initializer = new _init_Initializer__WEBPACK_IMPORTED_MODULE_0__.Initializer(userConfig, element);
  initializer.setup();
}

/***/ }),

/***/ "./src/methods/playlists.js":
/*!**********************************!*\
  !*** ./src/methods/playlists.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getActivePlaylist": () => (/* binding */ getActivePlaylist)
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/config.js */ "./src/config.js");

/**
 * Returns the key of the active playlist
 * 
 * Public Method: Amplitude.getActivePlaylist()
 * 
 * @access public
 * @returns {string} 
 */

function getActivePlaylist() {
  return _config_js__WEBPACK_IMPORTED_MODULE_0__.config.active_playlist;
}

/***/ }),

/***/ "./src/services/Audio/Checks.js":
/*!**************************************!*\
  !*** ./src/services/Audio/Checks.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Checks": () => (/* binding */ Checks)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/config */ "./src/config.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


var Checks = /*#__PURE__*/function () {
  function Checks() {
    _classCallCheck(this, Checks);
  }

  _createClass(Checks, null, [{
    key: "audioExists",
    value: function audioExists(index) {
      if (_config__WEBPACK_IMPORTED_MODULE_0__.config.audio[index]) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "audioChanged",
    value: function audioChanged(audioIndex) {
      var collectionKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (_config__WEBPACK_IMPORTED_MODULE_0__.config.active_collection != collectionKey) {
        return true;
      } else {
        if (_config__WEBPACK_IMPORTED_MODULE_0__.config.active_collection == null && collectionKey == null) {
          if (_config__WEBPACK_IMPORTED_MODULE_0__.config.active_index != audioIndex) {
            return true;
          } else {
            return false;
          }
        } else {
          if (_config__WEBPACK_IMPORTED_MODULE_0__.config.active_collection == collection && _config__WEBPACK_IMPORTED_MODULE_0__.config.collections[collectionKey].active_index != audioIndex) {
            return true;
          } else {
            return false;
          }
        }
      }
    }
  }]);

  return Checks;
}();

/***/ }),

/***/ "./src/services/Audio/Navigation.js":
/*!******************************************!*\
  !*** ./src/services/Audio/Navigation.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Navigation": () => (/* binding */ Navigation)
/* harmony export */ });
/* harmony import */ var _core_Audio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Audio */ "./src/core/Audio.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/config */ "./src/config.js");
/* harmony import */ var _services_Callbacks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/services/Callbacks */ "./src/services/Callbacks.js");
/* harmony import */ var _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/elements/PlayPauseElement */ "./src/elements/PlayPauseElement.js");
/* harmony import */ var _elements_MetaDataElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/elements/MetaDataElement */ "./src/elements/MetaDataElement.js");
/* harmony import */ var _elements_ContainerElement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/elements/ContainerElement */ "./src/elements/ContainerElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }








var _prepareAudioChange = /*#__PURE__*/new WeakSet();

var _switchAudio = /*#__PURE__*/new WeakSet();

var _afterAudioChange = /*#__PURE__*/new WeakSet();

var _updateMetaData = /*#__PURE__*/new WeakSet();

var Navigation = /*#__PURE__*/function () {
  function Navigation() {
    _classCallCheck(this, Navigation);

    _classPrivateMethodInitSpec(this, _updateMetaData);

    _classPrivateMethodInitSpec(this, _afterAudioChange);

    _classPrivateMethodInitSpec(this, _switchAudio);

    _classPrivateMethodInitSpec(this, _prepareAudioChange);
  }

  _createClass(Navigation, [{
    key: "changeAudio",
    value:
    /**
     * Change audio in the audio array
     *
     * @prop {object} audio - The audio we are changing to.
     * @prop {number} index - The index we are changing to.
     * @prop {boolean} direct - Determines if it was a direct click on the song.
     * We then don't care if shuffle is on or not.
     */
    function changeAudio(audio, index) {
      var direct = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      _classPrivateMethodGet(this, _prepareAudioChange, _prepareAudioChange2).call(this, audio);

      _classPrivateMethodGet(this, _switchAudio, _switchAudio2).call(this, audio, index);

      _classPrivateMethodGet(this, _afterAudioChange, _afterAudioChange2).call(this, direct);
    }
  }]);

  return Navigation;
}();

function _prepareAudioChange2(audio) {
  var coreAudio = new _core_Audio__WEBPACK_IMPORTED_MODULE_0__.Audio();
  coreAudio.stop(); // Sync elements

  _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_3__.PlayPauseElement.syncAllToPause();
  /**
   * @todo Song Slider Elements -> reset
   * @todo Song Played Progress Elements -> reset
   * @todo Time Elements -> reset 
   * ( See src/utilities/audioNavigation.js Line #528)
   */

  /**
   * @todo we don't have album change callback, make note.
   */
}

function _switchAudio2(audio, index) {
  _config__WEBPACK_IMPORTED_MODULE_1__.config.active_collection = null;
  _config__WEBPACK_IMPORTED_MODULE_1__.config.audio_element.src = audio.url;
  _config__WEBPACK_IMPORTED_MODULE_1__.config.active_metadata = audio;
  /** 
   * @todo We don't have active_album. make note.
   */

  _config__WEBPACK_IMPORTED_MODULE_1__.config.active_index = parseInt(index);
}

function _afterAudioChange2(direct) {
  _classPrivateMethodGet(this, _updateMetaData, _updateMetaData2).call(this);

  var containerElements = new _elements_ContainerElement__WEBPACK_IMPORTED_MODULE_5__.ContainerElement();
  containerElements.setActiveContainers(direct);
  /**
   * @todo time elements -> reset duration times
   * ( see src/utilities/audioNavigation.js Line #558 )
   */

  _services_Callbacks__WEBPACK_IMPORTED_MODULE_2__.Callbacks.run('audio_change');
}

function _updateMetaData2() {
  var metaData = new _elements_MetaDataElement__WEBPACK_IMPORTED_MODULE_4__.MetaDataElement();
  metaData.displayMetaData();
}

/***/ }),

/***/ "./src/services/Callbacks.js":
/*!***********************************!*\
  !*** ./src/services/Callbacks.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Callbacks": () => (/* binding */ Callbacks)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.js");
/* harmony import */ var _ConfigState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ConfigState */ "./src/services/ConfigState.js");
/* harmony import */ var _Debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Debug */ "./src/services/Debug.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }





var _events = /*#__PURE__*/new WeakMap();

var Callbacks = /*#__PURE__*/function () {
  function Callbacks() {
    _classCallCheck(this, Callbacks);

    _classPrivateFieldInitSpec(this, _events, {
      writable: true,
      value: ['abort', 'error', 'loadeddata', 'loadedmetadata', 'loadstart', 'pause', 'playing', 'play', 'progress', 'ratechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting', 'canplay', 'canplaythrough', 'durationchange', 'ended']
    });
  }

  _createClass(Callbacks, [{
    key: "handleNativeAudioElementEvents",
    value: function handleNativeAudioElementEvents() {
      _classPrivateFieldGet(this, _events).forEach(function (event) {
        _config__WEBPACK_IMPORTED_MODULE_0__.config.audio_element.addEventListener(event, function () {
          Callbacks.run(event);
        });
      });
    }
  }], [{
    key: "run",
    value: function run(event) {
      var callback = _ConfigState__WEBPACK_IMPORTED_MODULE_1__.ConfigState.getCallback(event);

      if (callback) {
        _Debug__WEBPACK_IMPORTED_MODULE_2__.Debug.writeMessage("Running Callback for event '" + callback.event + "' with method '" + callback.handler + "'");

        try {
          window[callback.handler]();
        } catch (error) {
          if (error.message == "CANCEL EVENT") {
            throw error;
          } else {
            _Debug__WEBPACK_IMPORTED_MODULE_2__.Debug.writeMessage(error.message);
          }
        }
      }
    }
  }]);

  return Callbacks;
}();

/***/ }),

/***/ "./src/services/Collections/Checks.js":
/*!********************************************!*\
  !*** ./src/services/Collections/Checks.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Checks": () => (/* binding */ Checks)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/config */ "./src/config.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


var Checks = /*#__PURE__*/function () {
  function Checks() {
    _classCallCheck(this, Checks);
  }

  _createClass(Checks, null, [{
    key: "collectionExists",
    value: function collectionExists(key) {
      if (_config__WEBPACK_IMPORTED_MODULE_0__.config.collections[key]) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "collectionChanged",
    value: function collectionChanged(collection) {
      if (_config__WEBPACK_IMPORTED_MODULE_0__.config.active_collection != collection) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "isCollectionShuffled",
    value: function isCollectionShuffled(collection) {
      if (_config__WEBPACK_IMPORTED_MODULE_0__.config.collections[collection].shuffle) {
        return true;
      } else {
        return false;
      }
    }
  }]);

  return Checks;
}();

/***/ }),

/***/ "./src/services/Collections/Navigation.js":
/*!************************************************!*\
  !*** ./src/services/Collections/Navigation.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Navigation": () => (/* binding */ Navigation)
/* harmony export */ });
/* harmony import */ var _core_Audio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/Audio */ "./src/core/Audio.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/config */ "./src/config.js");
/* harmony import */ var _services_Callbacks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/services/Callbacks */ "./src/services/Callbacks.js");
/* harmony import */ var _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/elements/PlayPauseElement */ "./src/elements/PlayPauseElement.js");
/* harmony import */ var _elements_MetaDataElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/elements/MetaDataElement */ "./src/elements/MetaDataElement.js");
/* harmony import */ var _elements_ContainerElement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/elements/ContainerElement */ "./src/elements/ContainerElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }








var _findNextAudio = /*#__PURE__*/new WeakSet();

var _repeatedAudio = /*#__PURE__*/new WeakSet();

var _nextShuffledAudio = /*#__PURE__*/new WeakSet();

var _nextCollectionAudio = /*#__PURE__*/new WeakSet();

var _playNextAudio = /*#__PURE__*/new WeakSet();

var _findPreviousAudio = /*#__PURE__*/new WeakSet();

var _previousShuffledAudio = /*#__PURE__*/new WeakSet();

var _previousCollectionAudio = /*#__PURE__*/new WeakSet();

var _prepareAudioChange = /*#__PURE__*/new WeakSet();

var _switchAudio = /*#__PURE__*/new WeakSet();

var _afterAudioChange = /*#__PURE__*/new WeakSet();

var _updateMetaData = /*#__PURE__*/new WeakSet();

var Navigation = /*#__PURE__*/function () {
  function Navigation() {
    _classCallCheck(this, Navigation);

    _classPrivateMethodInitSpec(this, _updateMetaData);

    _classPrivateMethodInitSpec(this, _afterAudioChange);

    _classPrivateMethodInitSpec(this, _switchAudio);

    _classPrivateMethodInitSpec(this, _prepareAudioChange);

    _classPrivateMethodInitSpec(this, _previousCollectionAudio);

    _classPrivateMethodInitSpec(this, _previousShuffledAudio);

    _classPrivateMethodInitSpec(this, _findPreviousAudio);

    _classPrivateMethodInitSpec(this, _playNextAudio);

    _classPrivateMethodInitSpec(this, _nextCollectionAudio);

    _classPrivateMethodInitSpec(this, _nextShuffledAudio);

    _classPrivateMethodInitSpec(this, _repeatedAudio);

    _classPrivateMethodInitSpec(this, _findNextAudio);
  }

  _createClass(Navigation, [{
    key: "next",
    value:
    /**
     * Sets the next song in a collection.
     * 
     * @param {string} collectionKey - The collection to navigate. Defaults to the active collection.
     * @param {boolean} audioEnded - If the audio ended, this is true to take in effect the repeat setting.
     */
    function next() {
      var collectionKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var audioEnded = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!collectionKey) {
        collectionKey = _config__WEBPACK_IMPORTED_MODULE_1__.config.active_collection;
      }

      var nextAudio = _classPrivateMethodGet(this, _findNextAudio, _findNextAudio2).call(this, collectionKey);

      this.setActiveCollection(collectionKey);
      this.changeCollectionAudio(collectionKey, nextAudio.audio, nextAudio.index);

      _classPrivateMethodGet(this, _playNextAudio, _playNextAudio2).call(this, nextAudio.end, audioEnded);

      _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_3__.PlayPauseElement.syncAll();
      _services_Callbacks__WEBPACK_IMPORTED_MODULE_2__.Callbacks.run("next");

      if (_config__WEBPACK_IMPORTED_MODULE_1__.config.repeat_audio) {
        _services_Callbacks__WEBPACK_IMPORTED_MODULE_2__.Callbacks.run("audio_repeated");
      }
    }
  }, {
    key: "previous",
    value: function previous() {
      var collectionKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (!collectionKey) {
        collectionKey = _config__WEBPACK_IMPORTED_MODULE_1__.config.active_collection;
      }

      var previousAudio = _classPrivateMethodGet(this, _findPreviousAudio, _findPreviousAudio2).call(this, collectionKey);

      this.setActiveCollection(collectionKey);
      this.changeCollectionAudio(collectionKey, previousAudio.audio, previousAudio.index);
      var audio = new _core_Audio__WEBPACK_IMPORTED_MODULE_0__.Audio();
      audio.play();
      _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_3__.PlayPauseElement.syncAll();
      _services_Callbacks__WEBPACK_IMPORTED_MODULE_2__.Callbacks.run("previous");

      if (_config__WEBPACK_IMPORTED_MODULE_1__.config.repeat_audio) {
        _services_Callbacks__WEBPACK_IMPORTED_MODULE_2__.Callbacks.run("audio_repeated");
      }
    }
  }, {
    key: "setActiveCollection",
    value: function setActiveCollection(collection) {
      if (_config__WEBPACK_IMPORTED_MODULE_1__.config.active_collection != collection) {
        _services_Callbacks__WEBPACK_IMPORTED_MODULE_2__.Callbacks.run("collection_changed");
        _config__WEBPACK_IMPORTED_MODULE_1__.config.active_collection = collection;

        if (collection != null) {
          _config__WEBPACK_IMPORTED_MODULE_1__.config.collections[collection].active_index = 0;
        }
      }
    }
    /**
     * Handles audio change in a collection
     *
     * @prop {string} collection - The collection we are changing the song on.
     * @prop {object} audio - The audio object we are changing to in the collection.
     * @prop {number} index - The index of the song we are changing to in the collection.
     * @prop {boolean} direct - Determines if it was a direct click on the song. We
     * then don't care if shuffle is on or not
     */

  }, {
    key: "changeAudioCollection",
    value: function changeAudioCollection(collection, audio, index, direct) {
      _classPrivateMethodGet(this, _prepareAudioChange, _prepareAudioChange2).call(this, audio);

      _classPrivateMethodGet(this, _switchAudio, _switchAudio2).call(this, collection, audio, index);

      _classPrivateMethodGet(this, _afterAudioChange, _afterAudioChange2).call(this, direct);
    }
  }]);

  return Navigation;
}();

function _findNextAudio2(collectionKey) {
  if (_config__WEBPACK_IMPORTED_MODULE_1__.config.repeat_audio) {
    return _classPrivateMethodGet(this, _repeatedAudio, _repeatedAudio2).call(this, collectionKey);
  } else {
    if (_config__WEBPACK_IMPORTED_MODULE_1__.config.collections[collectionKey].shuffle) {
      return _classPrivateMethodGet(this, _nextShuffledAudio, _nextShuffledAudio2).call(this, collectionKey);
    } else {
      return _classPrivateMethodGet(this, _nextCollectionAudio, _nextCollectionAudio2).call(this, collectionKey);
    }
  }
}

function _repeatedAudio2(collectionKey) {
  var index = _config__WEBPACK_IMPORTED_MODULE_1__.config.collections[collectionKey].active_index;
  return {
    'index': nextIndex,
    'audio': _config__WEBPACK_IMPORTED_MODULE_1__.config.collections[collectionKey].shuffle ? _config__WEBPACK_IMPORTED_MODULE_1__.config.collections[collectionKey].shuffle_list[index] : _config__WEBPACK_IMPORTED_MODULE_1__.config.collections[collectionKey].audio[index],
    'end': false
  };
}

function _nextShuffledAudio2(collectionKey) {
  var nextIndex = null;
  var endOfList = false;
  var activeIndex = _config__WEBPACK_IMPORTED_MODULE_1__.config.collections[collectionKey].active_index;
  var shuffleCollectionLength = _config__WEBPACK_IMPORTED_MODULE_1__.config.collections[collectionKey].shuffle_list.length;

  if (parseInt(activeIndex + 1) < shuffleCollectionLength) {
    nextIndex = parseInt(activeIndex + 1);
  } else {
    nextIndex = 0;
    endOfList = true;
  }

  return {
    'index': nextIndex,
    'audio': _config__WEBPACK_IMPORTED_MODULE_1__.config.collections[collectionKey].shuffleList[nextIndex],
    'end': endOfList
  };
}

function _nextCollectionAudio2(collectionKey) {
  var nextIndex = null;
  var endOfList = false;
  var activeIndex = _config__WEBPACK_IMPORTED_MODULE_1__.config.collections[collectionKey].active_index;
  var collectionLength = _config__WEBPACK_IMPORTED_MODULE_1__.config.collections[collectionKey].audio.length;

  if (parseInt(activeIndex + 1) < collectionLength) {
    nextIndex = parseInt(activeIndex + 1);
  } else {
    nextIndex = 0;
    endOfList = true;
  }

  return {
    'index': nextIndex,
    'audio': _config__WEBPACK_IMPORTED_MODULE_1__.config.collections[collectionKey].audio[nextIndex],
    'end': endOfList
  };
}

function _playNextAudio2(endOfList, audioEnded) {
  // If it's the end of the collection and we aren't repeating, do nothing.
  if (endOfList && !_config__WEBPACK_IMPORTED_MODULE_1__.config.repeat_audio) {} else {
    if (!(audioEnded && !_config__WEBPACK_IMPORTED_MODULE_1__.config.repeat_audio && endOfList)) {
      var audio = new _core_Audio__WEBPACK_IMPORTED_MODULE_0__.Audio();
      audio.play();
    }
  }
}

function _findPreviousAudio2() {
  if (_config__WEBPACK_IMPORTED_MODULE_1__.config.repeat_audio) {
    return _classPrivateMethodGet(this, _repeatedAudio, _repeatedAudio2).call(this, collectionKey);
  } else {
    if (_config__WEBPACK_IMPORTED_MODULE_1__.config.collections[collectionKey].shuffle) {
      return _classPrivateMethodGet(this, _previousShuffledAudio, _previousShuffledAudio2).call(this, collectionKey);
    } else {
      return _classPrivateMethodGet(this, _previousCollectionAudio, _previousCollectionAudio2).call(this, collectionKey);
    }
  }
}

function _previousShuffledAudio2(collectionKey) {
  var previousIndex = null;
  var activeIndex = _config__WEBPACK_IMPORTED_MODULE_1__.config.collections[collectionKey].active_index;
  var shuffleCollectionLength = _config__WEBPACK_IMPORTED_MODULE_1__.config.collections[collectionKey].shuffle_list.length;

  if (parseInt(activeIndex - 1) >= 0) {
    previousIndex = parseInt(activeIndex - 1);
  } else {
    previousIndex = parseInt(shuffleCollectionLength - 1);
  }

  return {
    'index': previousIndex,
    'audio': _config__WEBPACK_IMPORTED_MODULE_1__.config.collections[collectionKey].shuffleList[previousIndex]
  };
}

function _previousCollectionAudio2(collectionKey) {
  var previousIndex = null;
  var activeIndex = _config__WEBPACK_IMPORTED_MODULE_1__.config.collections[collectionKey].active_index;
  var collectionLength = _config__WEBPACK_IMPORTED_MODULE_1__.config.collections[collectionKey].audio.length;

  if (parseInt(activeIndex - 1) >= 0) {
    previousIndex = parseInt(activeIndex - 1);
  } else {
    previousIndex = parseInt(collectionLength - 1);
  }

  return {
    'index': previousIndex,
    'audio': _config__WEBPACK_IMPORTED_MODULE_1__.config.collections[collectionKey].audio[previousIndex]
  };
}

function _prepareAudioChange2(audio) {
  _core_Audio__WEBPACK_IMPORTED_MODULE_0__.Audio.stop(); // Sync elements

  _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_3__.PlayPauseElement.syncAllToPause();
  /**
   * @todo Song Slider Elements -> reset
   * @todo Song Played Progress Elements -> reset
   * @todo Time Elements -> reset 
   * ( See src/utilities/audioNavigation.js Line #528)
   */

  /**
   * @todo we don't have album change callback, make note.
   */
}

function _switchAudio2(collection, audio, index) {
  _config__WEBPACK_IMPORTED_MODULE_1__.config.audio_element = audio.url;
  _config__WEBPACK_IMPORTED_MODULE_1__.config.active_metadata = audio;
  /** 
   * @todo We don't have active_album. make note.
   */

  _config__WEBPACK_IMPORTED_MODULE_1__.config.active_index = null;
  _config__WEBPACK_IMPORTED_MODULE_1__.config.collections[collection].active_index = parseInt(index);
}

function _afterAudioChange2(direct) {
  _classPrivateMethodGet(this, _updateMetaData, _updateMetaData2).call(this);

  var containerElements = new _elements_ContainerElement__WEBPACK_IMPORTED_MODULE_5__.ContainerElement();
  containerElements.setActiveContainers(direct);
  /**
    * @todo time elements -> reset duration times
   * ( see src/utilities/audioNavigation.js Line #558 )
   */

  _services_Callbacks__WEBPACK_IMPORTED_MODULE_2__.Callbacks.run('audio_change');
}

function _updateMetaData2() {
  var metaData = new _elements_MetaDataElement__WEBPACK_IMPORTED_MODULE_4__.MetaDataElement();
  metaData.displayMetaData();
}

/***/ }),

/***/ "./src/services/Collections/Shuffle.js":
/*!*********************************************!*\
  !*** ./src/services/Collections/Shuffle.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Shuffle": () => (/* binding */ Shuffle)
/* harmony export */ });
/* harmony import */ var _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/ConfigState */ "./src/services/ConfigState.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }



var _collection = /*#__PURE__*/new WeakMap();

var _shuffleAudio = /*#__PURE__*/new WeakSet();

var _shuffleSwap = /*#__PURE__*/new WeakSet();

var Shuffle = /*#__PURE__*/function () {
  function Shuffle(_collection2) {
    _classCallCheck(this, Shuffle);

    _classPrivateMethodInitSpec(this, _shuffleSwap);

    _classPrivateMethodInitSpec(this, _shuffleAudio);

    _classPrivateFieldInitSpec(this, _collection, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _collection, _collection2);
  }

  _createClass(Shuffle, [{
    key: "toggleShuffle",
    value: function toggleShuffle(collection) {
      var isShuffled = _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.isCollectionShuffled(collection);

      if (isShuffled) {
        _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.setCollectionShuffled(collection, false, []);
      } else {
        var shuffledAudio = _classPrivateMethodGet(this, _shuffleAudio, _shuffleAudio2).call(this, collection);

        _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.setCollectionShuffled(collection, true, shuffledAudio);
      }
    }
  }]);

  return Shuffle;
}();

function _shuffleAudio2(collection) {
  var audio = _services_ConfigState__WEBPACK_IMPORTED_MODULE_0__.ConfigState.getCollectionAudio(collection);
  var shuffleTemp = new Array(audio.length);
  audio.forEach(function (audio, index) {
    shuffleTemp[index] = audio[index];
  });

  for (var i = audio.length - 1; i > 0; i--) {
    var randomNumber = Math.floor(Math.random() * audio.length + 1);

    _classPrivateMethodGet(this, _shuffleSwap, _shuffleSwap2).call(this, shuffleTemp, i, randomNumber - 1);
  }

  return shuffleTemp;
}

function _shuffleSwap2(list, original, random) {
  var temp = list[original];
  list[original] = list[random];
  list[random] = temp;
}

/***/ }),

/***/ "./src/services/ConfigState.js":
/*!*************************************!*\
  !*** ./src/services/ConfigState.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConfigState": () => (/* binding */ ConfigState)
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/config.js */ "./src/config.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


var ConfigState = /*#__PURE__*/function () {
  function ConfigState() {
    _classCallCheck(this, ConfigState);
  }

  _createClass(ConfigState, [{
    key: "setIsMobile",
    value: function setIsMobile() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        _config_js__WEBPACK_IMPORTED_MODULE_0__.config.mobile = true;
      } else {
        _config_js__WEBPACK_IMPORTED_MODULE_0__.config.mobile = false;
      }
    }
  }, {
    key: "resetConfig",
    value: function resetConfig() {
      _config_js__WEBPACK_IMPORTED_MODULE_0__.config.audio_element = new Audio();
      _config_js__WEBPACK_IMPORTED_MODULE_0__.config.active_metadata = {};
      _config_js__WEBPACK_IMPORTED_MODULE_0__.config.active_album = "";
      _config_js__WEBPACK_IMPORTED_MODULE_0__.config.active_index = 0;
      _config_js__WEBPACK_IMPORTED_MODULE_0__.config.active_playlist = null;
      _config_js__WEBPACK_IMPORTED_MODULE_0__.config.playback_speed = 1.0;
      _config_js__WEBPACK_IMPORTED_MODULE_0__.config.audio = [];
      _config_js__WEBPACK_IMPORTED_MODULE_0__.config.playlists = {};
      _config_js__WEBPACK_IMPORTED_MODULE_0__.config.start_audio = "";
      _config_js__WEBPACK_IMPORTED_MODULE_0__.config.starting_playlist = "";
      _config_js__WEBPACK_IMPORTED_MODULE_0__.config.starting_playlist_song = "";
      _config_js__WEBPACK_IMPORTED_MODULE_0__.config.repeat = false;
      _config_js__WEBPACK_IMPORTED_MODULE_0__.config.shuffle_list = {};
      _config_js__WEBPACK_IMPORTED_MODULE_0__.config.shuffle_on = false;
      _config_js__WEBPACK_IMPORTED_MODULE_0__.config.default_artwork = "";
      _config_js__WEBPACK_IMPORTED_MODULE_0__.config.default_playlist_art = "";
      _config_js__WEBPACK_IMPORTED_MODULE_0__.config.debug = true;
      _config_js__WEBPACK_IMPORTED_MODULE_0__.config.callbacks = [];
      _config_js__WEBPACK_IMPORTED_MODULE_0__.config.volume = {
        current: 50,
        increment: 5,
        decrement: 5,
        pre_mute_level: 50
      }, _config_js__WEBPACK_IMPORTED_MODULE_0__.config.soundcloud = {
        client: '',
        use_art: false,
        audio_count: 0,
        ready_count: 0
      },
      /**
       * @todo BREAKING CHANGE
       */
      // config.soundcloud_client = "";
      // config.soundcloud_use_art = false;
      // config.soundcloud_song_count = 0;
      // config.soundcloud_songs_ready = 0;
      _config_js__WEBPACK_IMPORTED_MODULE_0__.config.continue_next = true;
      /**
       * @todo rebind event handlers
       */
    }
  }], [{
    key: "isIos",
    value: function isIos() {
      return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    }
  }, {
    key: "isIE",
    value: function isIE() {
      var ua = window.navigator.userAgent;
      var msie = ua.indexOf("MSIE ");
      return msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./);
    }
  }, {
    key: "isMobile",
    value: function isMobile() {
      return _config_js__WEBPACK_IMPORTED_MODULE_0__.config.mobile;
    }
  }, {
    key: "isTouchMoving",
    value: function isTouchMoving() {
      return _config_js__WEBPACK_IMPORTED_MODULE_0__.config.is_touch_moving;
    }
  }, {
    key: "getAudioState",
    value: function getAudioState() {
      return _config_js__WEBPACK_IMPORTED_MODULE_0__.config.audio_element.paused ? "paused" : "playing";
    }
  }, {
    key: "getScope",
    value: function getScope() {
      if (_config_js__WEBPACK_IMPORTED_MODULE_0__.config.active_collection == '' || _config_js__WEBPACK_IMPORTED_MODULE_0__.config.active_collection == null) {
        return 'audio';
      } else {
        return 'collection';
      }
    }
  }, {
    key: "getVolume",
    value: function getVolume() {
      return _config_js__WEBPACK_IMPORTED_MODULE_0__.config.volume.current;
    }
  }, {
    key: "getVolumeIncrement",
    value: function getVolumeIncrement() {
      return _config_js__WEBPACK_IMPORTED_MODULE_0__.config.volume.increment;
    }
  }, {
    key: "getVolumeDecrement",
    value: function getVolumeDecrement() {
      return _config_js__WEBPACK_IMPORTED_MODULE_0__.config.volume.decrement;
    }
  }, {
    key: "getPreMuteVolume",
    value: function getPreMuteVolume() {
      return _config_js__WEBPACK_IMPORTED_MODULE_0__.config.volume.pre_mute_level;
    }
  }, {
    key: "setPreMuteVolume",
    value: function setPreMuteVolume() {
      var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (!level) {
        level = _config_js__WEBPACK_IMPORTED_MODULE_0__.config.volume.current;
      }

      _config_js__WEBPACK_IMPORTED_MODULE_0__.config.volume.pre_mute_level = level;
    }
  }, {
    key: "getPlaybackSpeed",
    value: function getPlaybackSpeed() {
      return _config_js__WEBPACK_IMPORTED_MODULE_0__.config.playback_speed;
    }
  }, {
    key: "isCollectionShuffled",
    value: function isCollectionShuffled(collection) {
      if (_config_js__WEBPACK_IMPORTED_MODULE_0__.config.collections[collection] && _config_js__WEBPACK_IMPORTED_MODULE_0__.config.collections[collection].shuffled) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "setCollectionShuffled",
    value: function setCollectionShuffled(collection, shuffled, audio) {
      _config_js__WEBPACK_IMPORTED_MODULE_0__.config.collections[collection].shuffled = shuffled;
      _config_js__WEBPACK_IMPORTED_MODULE_0__.config.collections[collection].audio = audio;
    }
  }, {
    key: "getCollectionAudio",
    value: function getCollectionAudio(collection) {
      return _config_js__WEBPACK_IMPORTED_MODULE_0__.config.collections[collection].audio;
    }
  }, {
    key: "getActiveCollection",
    value: function getActiveCollection() {
      return _config_js__WEBPACK_IMPORTED_MODULE_0__.config.active_collection;
    }
  }, {
    key: "getActiveAudioIndex",
    value: function getActiveAudioIndex() {
      return _config_js__WEBPACK_IMPORTED_MODULE_0__.config.active_index;
    }
  }, {
    key: "getContinueNext",
    value: function getContinueNext() {
      return _config_js__WEBPACK_IMPORTED_MODULE_0__.config.continue_next;
    }
  }, {
    key: "updateBufferedTime",
    value: function updateBufferedTime() {
      // Help from: http://jsbin.com/badimipi/1/edit?html,js,output
      if (_config_js__WEBPACK_IMPORTED_MODULE_0__.config.audio_element.buffered.length - 1 >= 0) {
        var bufferedEnd = _config_js__WEBPACK_IMPORTED_MODULE_0__.config.audio_element.buffered.end(_config_js__WEBPACK_IMPORTED_MODULE_0__.config.audio_element.buffered.length - 1);
        var duration = _config_js__WEBPACK_IMPORTED_MODULE_0__.config.audio_element.duration;
        _config_js__WEBPACK_IMPORTED_MODULE_0__.config.buffered = bufferedEnd / duration * 100;
      }
    }
  }, {
    key: "getBufferedPercentage",
    value: function getBufferedPercentage() {
      return parseFloat(_config_js__WEBPACK_IMPORTED_MODULE_0__.config.buffered) / 100;
    }
  }, {
    key: "isLive",
    value: function isLive() {
      return _config_js__WEBPACK_IMPORTED_MODULE_0__.config.active_metadata.live;
    }
  }, {
    key: "getTimeFormat",
    value: function getTimeFormat() {
      return _config_js__WEBPACK_IMPORTED_MODULE_0__.config.time_format;
    }
  }, {
    key: "getCallback",
    value: function getCallback(name) {
      var callbackObject = false;
      _config_js__WEBPACK_IMPORTED_MODULE_0__.config.callbacks.forEach(function (callback) {
        if (callback.event == name) {
          callbackObject = callback;
        }
      });
      return callbackObject;
    }
  }, {
    key: "setPlayerState",
    value: function setPlayerState() {
      // If paused and the current time is 0 the player is stopped.
      if (_config_js__WEBPACK_IMPORTED_MODULE_0__.config.audio_element.paused && _config_js__WEBPACK_IMPORTED_MODULE_0__.config.audio_element.currentTime == 0) {
        _config_js__WEBPACK_IMPORTED_MODULE_0__.config.player_state = "stopped";
      } // If paused and the current time is greater than 0 the player is paused.


      if (_config_js__WEBPACK_IMPORTED_MODULE_0__.config.audio_element.paused && _config_js__WEBPACK_IMPORTED_MODULE_0__.config.audio_element.currentTime > 0) {
        _config_js__WEBPACK_IMPORTED_MODULE_0__.config.player_state = "paused";
      } // If playing, the current state is playing.


      if (!_config_js__WEBPACK_IMPORTED_MODULE_0__.config.audio_element.paused) {
        _config_js__WEBPACK_IMPORTED_MODULE_0__.config.player_state = "playing";
      }
    }
  }]);

  return ConfigState;
}();

/***/ }),

/***/ "./src/services/Debug.js":
/*!*******************************!*\
  !*** ./src/services/Debug.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Debug": () => (/* binding */ Debug)
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/config.js */ "./src/config.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


var Debug = /*#__PURE__*/function () {
  function Debug() {
    _classCallCheck(this, Debug);
  }

  _createClass(Debug, null, [{
    key: "writeMessage",
    value: function writeMessage(message) {
      if (_config_js__WEBPACK_IMPORTED_MODULE_0__.config.debug) {
        console.log(message);
      }
    }
  }]);

  return Debug;
}();

/***/ }),

/***/ "./src/services/ElementsManager.js":
/*!*****************************************!*\
  !*** ./src/services/ElementsManager.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ElementsManager": () => (/* binding */ ElementsManager)
/* harmony export */ });
/* harmony import */ var _elements_NextElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/elements/NextElement */ "./src/elements/NextElement.js");
/* harmony import */ var _elements_MetaDataElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/elements/MetaDataElement */ "./src/elements/MetaDataElement.js");
/* harmony import */ var _elements_MuteElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/elements/MuteElement */ "./src/elements/MuteElement.js");
/* harmony import */ var _elements_PauseElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/elements/PauseElement */ "./src/elements/PauseElement.js");
/* harmony import */ var _elements_PlayElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/elements/PlayElement */ "./src/elements/PlayElement.js");
/* harmony import */ var _elements_PlaybackSpeedElement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/elements/PlaybackSpeedElement */ "./src/elements/PlaybackSpeedElement.js");
/* harmony import */ var _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/elements/PlayPauseElement */ "./src/elements/PlayPauseElement.js");
/* harmony import */ var _elements_PreviousElement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/elements/PreviousElement */ "./src/elements/PreviousElement.js");
/* harmony import */ var _elements_ShuffleElement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/elements/ShuffleElement */ "./src/elements/ShuffleElement.js");
/* harmony import */ var _elements_SkipToElement__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/elements/SkipToElement */ "./src/elements/SkipToElement.js");
/* harmony import */ var _elements_StopElement__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/elements/StopElement */ "./src/elements/StopElement.js");
/* harmony import */ var _elements_TrackerElement__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/elements/TrackerElement */ "./src/elements/TrackerElement.js");
/* harmony import */ var _elements_VolumeDownElement__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @/elements/VolumeDownElement */ "./src/elements/VolumeDownElement.js");
/* harmony import */ var _elements_VolumeSliderElement__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @/elements/VolumeSliderElement */ "./src/elements/VolumeSliderElement.js");
/* harmony import */ var _elements_VolumeUpElement__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @/elements/VolumeUpElement */ "./src/elements/VolumeUpElement.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

















var _initializeMetaData = /*#__PURE__*/new WeakSet();

var _initializePlayElement = /*#__PURE__*/new WeakSet();

var _initializePauseElement = /*#__PURE__*/new WeakSet();

var _initializePlayPauseElement = /*#__PURE__*/new WeakSet();

var _initializeNextElement = /*#__PURE__*/new WeakSet();

var _initializePreviousElement = /*#__PURE__*/new WeakSet();

var _initializeMuteElement = /*#__PURE__*/new WeakSet();

var _initializeVolumeSliderElement = /*#__PURE__*/new WeakSet();

var _initializePlaybackSpeedElement = /*#__PURE__*/new WeakSet();

var _initializeStopElement = /*#__PURE__*/new WeakSet();

var _initializeVolumeDownElement = /*#__PURE__*/new WeakSet();

var _initializeVolumeUpElement = /*#__PURE__*/new WeakSet();

var _initializeShuffleElement = /*#__PURE__*/new WeakSet();

var _initializeSkipToElement = /*#__PURE__*/new WeakSet();

var _initializeTrackerElement = /*#__PURE__*/new WeakSet();

var ElementsManager = /*#__PURE__*/function () {
  function ElementsManager() {
    _classCallCheck(this, ElementsManager);

    _classPrivateMethodInitSpec(this, _initializeTrackerElement);

    _classPrivateMethodInitSpec(this, _initializeSkipToElement);

    _classPrivateMethodInitSpec(this, _initializeShuffleElement);

    _classPrivateMethodInitSpec(this, _initializeVolumeUpElement);

    _classPrivateMethodInitSpec(this, _initializeVolumeDownElement);

    _classPrivateMethodInitSpec(this, _initializeStopElement);

    _classPrivateMethodInitSpec(this, _initializePlaybackSpeedElement);

    _classPrivateMethodInitSpec(this, _initializeVolumeSliderElement);

    _classPrivateMethodInitSpec(this, _initializeMuteElement);

    _classPrivateMethodInitSpec(this, _initializePreviousElement);

    _classPrivateMethodInitSpec(this, _initializeNextElement);

    _classPrivateMethodInitSpec(this, _initializePlayPauseElement);

    _classPrivateMethodInitSpec(this, _initializePauseElement);

    _classPrivateMethodInitSpec(this, _initializePlayElement);

    _classPrivateMethodInitSpec(this, _initializeMetaData);
  }

  _createClass(ElementsManager, [{
    key: "setVisualElementsDefaults",
    value: function setVisualElementsDefaults() {}
  }, {
    key: "initializeElements",
    value: function initializeElements() {
      _classPrivateMethodGet(this, _initializeMetaData, _initializeMetaData2).call(this);

      _classPrivateMethodGet(this, _initializePlayElement, _initializePlayElement2).call(this);

      _classPrivateMethodGet(this, _initializePauseElement, _initializePauseElement2).call(this);

      _classPrivateMethodGet(this, _initializePlayPauseElement, _initializePlayPauseElement2).call(this);

      _classPrivateMethodGet(this, _initializeNextElement, _initializeNextElement2).call(this);

      _classPrivateMethodGet(this, _initializePreviousElement, _initializePreviousElement2).call(this);

      _classPrivateMethodGet(this, _initializeMuteElement, _initializeMuteElement2).call(this);

      _classPrivateMethodGet(this, _initializeVolumeSliderElement, _initializeVolumeSliderElement2).call(this);

      _classPrivateMethodGet(this, _initializePlaybackSpeedElement, _initializePlaybackSpeedElement2).call(this);

      _classPrivateMethodGet(this, _initializeStopElement, _initializeStopElement2).call(this);

      _classPrivateMethodGet(this, _initializeVolumeDownElement, _initializeVolumeDownElement2).call(this);

      _classPrivateMethodGet(this, _initializeVolumeUpElement, _initializeVolumeUpElement2).call(this);

      _classPrivateMethodGet(this, _initializeShuffleElement, _initializeShuffleElement2).call(this);

      _classPrivateMethodGet(this, _initializeSkipToElement, _initializeSkipToElement2).call(this);

      _classPrivateMethodGet(this, _initializeTrackerElement, _initializeTrackerElement2).call(this);
    }
  }]);

  return ElementsManager;
}();

function _initializeMetaData2() {
  var metaDataElement = new _elements_MetaDataElement__WEBPACK_IMPORTED_MODULE_1__.MetaDataElement();
  metaDataElement.syncMetaData();
}

function _initializePlayElement2() {
  var playElement = new _elements_PlayElement__WEBPACK_IMPORTED_MODULE_4__.PlayElement();
  playElement.setUp();
}

function _initializePauseElement2() {
  var pauseElement = new _elements_PauseElement__WEBPACK_IMPORTED_MODULE_3__.PauseElement();
  pauseElement.setUp();
}

function _initializePlayPauseElement2() {
  var playPauseElement = new _elements_PlayPauseElement__WEBPACK_IMPORTED_MODULE_6__.PlayPauseElement();
  playPauseElement.setUp();
}

function _initializeNextElement2() {
  var nextElement = new _elements_NextElement__WEBPACK_IMPORTED_MODULE_0__.NextElement();
  nextElement.setUp();
}

function _initializePreviousElement2() {
  var previousElement = new _elements_PreviousElement__WEBPACK_IMPORTED_MODULE_7__.PreviousElement();
  previousElement.setUp();
}

function _initializeMuteElement2() {
  var muteElement = new _elements_MuteElement__WEBPACK_IMPORTED_MODULE_2__.MuteElement();
  muteElement.setUp();
}

function _initializeVolumeSliderElement2() {
  var volumeSliderElement = new _elements_VolumeSliderElement__WEBPACK_IMPORTED_MODULE_13__.VolumeSliderElement();
  volumeSliderElement.setUp();
}

function _initializePlaybackSpeedElement2() {
  var playbackSpeedElement = new _elements_PlaybackSpeedElement__WEBPACK_IMPORTED_MODULE_5__.PlaybackSpeedElement();
  playbackSpeedElement.setUp();
}

function _initializeStopElement2() {
  var stopElement = new _elements_StopElement__WEBPACK_IMPORTED_MODULE_10__.StopElement();
  stopElement.setUp();
}

function _initializeVolumeDownElement2() {
  var volumeDownElement = new _elements_VolumeDownElement__WEBPACK_IMPORTED_MODULE_12__.VolumeDownElement();
  volumeDownElement.setUp();
}

function _initializeVolumeUpElement2() {
  var volumeUpElement = new _elements_VolumeUpElement__WEBPACK_IMPORTED_MODULE_14__.VolumeUpElement();
  volumeUpElement.setUp();
}

function _initializeShuffleElement2() {
  var shuffleElement = new _elements_ShuffleElement__WEBPACK_IMPORTED_MODULE_8__.ShuffleElement();
  shuffleElement.setUp();
}

function _initializeSkipToElement2() {
  var skipToElement = new _elements_SkipToElement__WEBPACK_IMPORTED_MODULE_9__.SkipToElement();
  skipToElement.setUp();
}

function _initializeTrackerElement2() {
  var trackerElement = new _elements_TrackerElement__WEBPACK_IMPORTED_MODULE_11__.TrackerElement();
  trackerElement.setUp();
}

/***/ }),

/***/ "./src/services/EventManager.js":
/*!**************************************!*\
  !*** ./src/services/EventManager.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventManager": () => (/* binding */ EventManager)
/* harmony export */ });
/* harmony import */ var _events_AudioEndedEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/events/AudioEndedEvent */ "./src/events/AudioEndedEvent.js");
/* harmony import */ var _events_KeyBindingEvents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/events/KeyBindingEvents */ "./src/events/KeyBindingEvents.js");
/* harmony import */ var _events_TimeUpdateEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/events/TimeUpdateEvent */ "./src/events/TimeUpdateEvent.js");
/* harmony import */ var _services_Debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/services/Debug */ "./src/services/Debug.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/config.js */ "./src/config.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

// import { ProgressEvent } from "@/events/ProgressEvent";






var _bindTouchEvents = /*#__PURE__*/new WeakSet();

var _bindTimeUpdateEvents = /*#__PURE__*/new WeakSet();

var _bindKeyBindingEvents = /*#__PURE__*/new WeakSet();

var _bindAudioEndedEvent = /*#__PURE__*/new WeakSet();

var _bindProgressEvent = /*#__PURE__*/new WeakSet();

var _bindAudioElementEventCallbacks = /*#__PURE__*/new WeakSet();

var EventManager = /*#__PURE__*/function () {
  function EventManager() {
    _classCallCheck(this, EventManager);

    _classPrivateMethodInitSpec(this, _bindAudioElementEventCallbacks);

    _classPrivateMethodInitSpec(this, _bindProgressEvent);

    _classPrivateMethodInitSpec(this, _bindAudioEndedEvent);

    _classPrivateMethodInitSpec(this, _bindKeyBindingEvents);

    _classPrivateMethodInitSpec(this, _bindTimeUpdateEvents);

    _classPrivateMethodInitSpec(this, _bindTouchEvents);
  }

  _createClass(EventManager, [{
    key: "initializeAllEvents",
    value: function initializeAllEvents() {
      _services_Debug__WEBPACK_IMPORTED_MODULE_3__.Debug.writeMessage("Starting initialization of event handlers...");

      _classPrivateMethodGet(this, _bindTouchEvents, _bindTouchEvents2).call(this);

      _classPrivateMethodGet(this, _bindTimeUpdateEvents, _bindTimeUpdateEvents2).call(this);

      _classPrivateMethodGet(this, _bindKeyBindingEvents, _bindKeyBindingEvents2).call(this);

      _classPrivateMethodGet(this, _bindAudioEndedEvent, _bindAudioEndedEvent2).call(this); // this.#bindProgressEvent();


      _classPrivateMethodGet(this, _bindAudioElementEventCallbacks, _bindAudioElementEventCallbacks2).call(this);
    }
  }]);

  return EventManager;
}();

function _bindTouchEvents2() {
  document.addEventListener("touchmove", function () {
    _config_js__WEBPACK_IMPORTED_MODULE_4__.config.is_touch_moving = true;
  });
  document.addEventListener("touchend", function () {
    if (!_config_js__WEBPACK_IMPORTED_MODULE_4__.config.is_touch_moving) {
      _config_js__WEBPACK_IMPORTED_MODULE_4__.config.is_touch_moving = false;
    }
  });
}

function _bindTimeUpdateEvents2() {
  var timeUpdateEvent = new _events_TimeUpdateEvent__WEBPACK_IMPORTED_MODULE_2__.TimeUpdateEvent();
  timeUpdateEvent.bind();
}

function _bindKeyBindingEvents2() {
  var keyBindingEvents = new _events_KeyBindingEvents__WEBPACK_IMPORTED_MODULE_1__.KeyBindingEvents();
  keyBindingEvents.bind();
}

function _bindAudioEndedEvent2() {
  var audioEndedEvent = new _events_AudioEndedEvent__WEBPACK_IMPORTED_MODULE_0__.AudioEndedEvent();
  audioEndedEvent.bind();
}

function _bindProgressEvent2() {
  var progressEvent = new ProgressEvent();
  progressEvent.bind();
}

function _bindAudioElementEventCallbacks2() {}

/***/ }),

/***/ "./src/services/Time.js":
/*!******************************!*\
  !*** ./src/services/Time.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Time": () => (/* binding */ Time)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/config */ "./src/config.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }



var _findCurrentSeconds = /*#__PURE__*/new WeakSet();

var _findCurrentMinutes = /*#__PURE__*/new WeakSet();

var _findCurrentHours = /*#__PURE__*/new WeakSet();

var _findAudioDurationSeconds = /*#__PURE__*/new WeakSet();

var _findAudioDurationMinutes = /*#__PURE__*/new WeakSet();

var _findAudioDurationHours = /*#__PURE__*/new WeakSet();

var Time = /*#__PURE__*/function () {
  function Time() {
    _classCallCheck(this, Time);

    _classPrivateMethodInitSpec(this, _findAudioDurationHours);

    _classPrivateMethodInitSpec(this, _findAudioDurationMinutes);

    _classPrivateMethodInitSpec(this, _findAudioDurationSeconds);

    _classPrivateMethodInitSpec(this, _findCurrentHours);

    _classPrivateMethodInitSpec(this, _findCurrentMinutes);

    _classPrivateMethodInitSpec(this, _findCurrentSeconds);
  }

  _createClass(Time, [{
    key: "computeCurrentTimes",
    value: function computeCurrentTimes() {
      var currentTime = {};
      currentTime.seconds = _classPrivateMethodGet(this, _findCurrentSeconds, _findCurrentSeconds2).call(this);
      currentTime.minutes = _classPrivateMethodGet(this, _findCurrentMinutes, _findCurrentMinutes2).call(this);
      currentTime.hours = _classPrivateMethodGet(this, _findCurrentHours, _findCurrentHours2).call(this);
      return currentTime;
    }
  }, {
    key: "computeAudioCompletionPercentage",
    value: function computeAudioCompletionPercentage() {
      return _config__WEBPACK_IMPORTED_MODULE_0__.config.audio_element.currentTime / _config__WEBPACK_IMPORTED_MODULE_0__.config.audio_element.duration * 100;
    }
  }, {
    key: "computeAudioDuration",
    value: function computeAudioDuration() {
      var audioDuration = {};
      audioDuration.seconds = _classPrivateMethodGet(this, _findAudioDurationSeconds, _findAudioDurationSeconds2).call(this);
      audioDuration.minutes = _classPrivateMethodGet(this, _findAudioDurationMinutes, _findAudioDurationMinutes2).call(this);
      audioDuration.hours = _classPrivateMethodGet(this, _findAudioDurationHours, _findAudioDurationHours2).call(this);
      return audioDuration;
    }
  }], [{
    key: "percentageInSeconds",
    value: function percentageInSeconds(percentage) {
      return _config__WEBPACK_IMPORTED_MODULE_0__.config.audio_element.duration * (percentage / 100);
    }
  }]);

  return Time;
}();

function _findCurrentSeconds2() {
  var seconds = (Math.floor(_config__WEBPACK_IMPORTED_MODULE_0__.config.audio_element.currentTime % 60) < 10 ? "0" : "") + Math.floor(_config__WEBPACK_IMPORTED_MODULE_0__.config.audio_element.currentTime % 60);
  return seconds;
}

function _findCurrentMinutes2() {
  var minutes = Math.floor(_config__WEBPACK_IMPORTED_MODULE_0__.config.audio_element.currentTime / 60);

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return minutes;
}

function _findCurrentHours2() {
  var hours = Math.floor(_config__WEBPACK_IMPORTED_MODULE_0__.config.audio_element.currentTime / 3600);

  if (hours < 10) {
    hours = "0" + hours;
  }

  return hours;
}

function _findAudioDurationSeconds2() {
  var seconds = (Math.floor(_config__WEBPACK_IMPORTED_MODULE_0__.config.audio_element.duration % 60) < 10 ? "0" : "") + Math.floor(_config__WEBPACK_IMPORTED_MODULE_0__.config.audio_element.duration % 60);
  return seconds;
}

function _findAudioDurationMinutes2() {
  var minutes = Math.floor(_config__WEBPACK_IMPORTED_MODULE_0__.config.audio_element.duration / 60);

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return minutes;
}

function _findAudioDurationHours2() {
  var hours = Math.floor(_config__WEBPACK_IMPORTED_MODULE_0__.config.audio_element.duration / 3600);

  if (hours < 10) {
    hours = "0" + hours;
  }

  return hours;
}

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/***/ ((module) => {

module.exports = JSON.parse('{"name":"amplitudejs","version":"6.0.0","description":"A JavaScript library that allows you to control the design of your media controls in your webpage -- not the browser. No dependencies (jQuery not required) https://serversideup.net/open-source/amplitudejs","main":"dist/amplitude.js","devDependencies":{"@babel/core":"^7.17.10","@babel/preset-env":"^7.17.10","babel-loader":"^8.2.5","webpack":"^5.72.0","webpack-cli":"^4.9.2"},"directories":{"doc":"docs"},"files":["dist"],"funding":{"type":"opencollective","url":"https://opencollective.com/amplitudejs"},"scripts":{"dev":"webpack --config webpack.development.config.js","build":"webpack --config webpack.production.config.js","prettier":"npx pretty-quick","preversion":"npx pretty-quick && npm run test","postversion":"git push && git push --tags","test":"jest","version":"npm run build && git add -A dist"},"repository":{"type":"git","url":"git+https://github.com/521dimensions/amplitudejs.git"},"keywords":["webaudio","html5","javascript","audio-player"],"author":"521 Dimensions (https://521dimensions.com)","license":"MIT","bugs":{"url":"https://github.com/521dimensions/amplitudejs/issues"},"homepage":"https://github.com/521dimensions/amplitudejs#readme"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _methods_init__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/methods/init */ "./src/methods/init.js");
/* harmony import */ var _methods_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/methods/config */ "./src/methods/config.js");
/* harmony import */ var _methods_playlists__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/methods/playlists */ "./src/methods/playlists.js");
/* harmony import */ var _methods_eventListeners__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/methods/eventListeners */ "./src/methods/eventListeners.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name AmplitudeJS
 * @author Dan Pastori (Server Side Up) <hello@serversideup.net>
 */




/**
 * Amplitude is an interface to the public methods.
 * All public methods are in the /methods directory.
 * These methods use clases to perform functionality.
 * The state is stored in /config.js
 *
 * @module Amplitude
 */

var Amplitude = function () {
  return _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, _methods_init__WEBPACK_IMPORTED_MODULE_0__), _methods_config__WEBPACK_IMPORTED_MODULE_1__), _methods_playlists__WEBPACK_IMPORTED_MODULE_2__), _methods_eventListeners__WEBPACK_IMPORTED_MODULE_3__);
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Amplitude);
})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=amplitude.js.map