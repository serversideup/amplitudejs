const Amplitude = require("../../src/index.js");

const config = require("../../src/config.js");

const Setup = require("../setup.js");

const SongSliderElements = require("../../src/visual/songSliderElements.js");

beforeEach(() => {
  buildSongSliderElements();
  Setup.initializeTestingElement();
  Setup.initializeAmplitude();
});

afterEach(() => {
  Setup.resetConfig();
});

function buildSongSliderElements() {
  document.body.innerHTML =
    '<input type="range" class="amplitude-song-slider" id="global-song-slider"/>' +
    '<input type="range" class="amplitude-song-slider" data-amplitude-playlist="trip_hop" id="playlist-song-slider"/>' +
    '<input type="range" class="amplitude-song-slider" data-amplitude-playlist="trip_hop" data-amplitude-song-index="0" id="song-in-playlist-song-slider"/>' +
    '<input type="range" class="amplitude-song-slider" data-amplitude-song-index="2" id="individual-song-slider"/>';
}

test("AmplitudeJS Song Slider Elements adjust to current time", () => {
  config.audio.currentTime = 45;

  SongSliderElements.sync(
    config.audio.currentTime,
    config.active_playlist,
    config.active_playlist != "" && config.active_playlist != null
      ? config.playlists[config.active_playlist].active_index
      : config.active_index
  );

  expect(document.getElementById("global-song-slider").value).toBe("45");
  expect(document.getElementById("playlist-song-slider").value).toBe("0");
  expect(document.getElementById("song-in-playlist-song-slider").value).toBe(
    "0"
  );
  expect(document.getElementById("individual-song-slider").value).toBe("0");
});

test("AmplitudeJS Song Slider Elements adjust current Time In Playlist", () => {
  Amplitude.playPlaylistSongAtIndex(0, "trip_hop");

  config.audio.currentTime = 45;

  SongSliderElements.sync(
    config.audio.currentTime,
    config.active_playlist,
    config.active_playlist != "" && config.active_playlist != null
      ? config.playlists[config.active_playlist].active_index
      : config.active_index
  );

  expect(document.getElementById("global-song-slider").value).toBe("45");
  expect(document.getElementById("playlist-song-slider").value).toBe("45");
  expect(document.getElementById("song-in-playlist-song-slider").value).toBe(
    "45"
  );
  expect(document.getElementById("individual-song-slider").value).toBe("0");
});

test("AmplitudeJS Song Slider Elements adjust current Time For Song", () => {
  Amplitude.playSongAtIndex(2);

  config.audio.currentTime = 45;

  SongSliderElements.sync(
    config.audio.currentTime,
    config.active_playlist,
    config.active_playlist != "" && config.active_playlist != null
      ? config.playlists[config.active_playlist].active_index
      : config.active_index
  );

  expect(document.getElementById("global-song-slider").value).toBe("45");
  expect(document.getElementById("playlist-song-slider").value).toBe("0");
  expect(document.getElementById("song-in-playlist-song-slider").value).toBe(
    "0"
  );
  expect(document.getElementById("individual-song-slider").value).toBe("45");
});
