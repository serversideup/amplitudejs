const Amplitude = require("../../src/index.js");

const config = require("../../src/config.js");

const Setup = require("../setup.js");

beforeEach(() => {
  buildMetaDataElements();
  Setup.initializeTestingElement();
  Setup.initializeAmplitude();
});

afterEach(() => {
  Setup.resetConfig();
});

function buildMetaDataElements() {
  document.body.innerHTML =
    '<div data-amplitude-song-info="name" id="song-name" data-amplitude-song-index="0"></div>' +
    '<div data-amplitude-song-info="artist" id="song-artist" data-amplitude-song-index="1"></div>' +
    '<img data-amplitude-song-info="cover_art_url" id="active-song-cover-art-url">' +
    '<img data-amplitude-song-info="cover_art_url" id="song-cover-art-url" data-amplitude-song-index="0">';
}

test("AmplitudeJS Meta Data Gets Filled In", () => {
  expect(document.getElementById("song-name").innerHTML).toBe(
    config.songs[0].name
  );
  expect(document.getElementById("song-artist").innerHTML).toBe(
    config.songs[1].artist
  );
  expect(document.getElementById("active-song-cover-art-url").src).toBe(
    `${encodeURI(config.default_album_art)}/`
  );
  expect(document.getElementById("song-cover-art-url").src).toBe(
    `${encodeURI(config.default_album_art)}/`
  );
});
