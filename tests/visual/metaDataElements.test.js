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
    '<div data-amplitude-song-info="artist" id="song-artist" data-amplitude-song-index="1"></div>';
}

test("AmplitudeJS Meta Data Gets Filled In", () => {
  expect(document.getElementById("song-name").innerHTML).toBe(
    config.songs[0].name
  );
  expect(document.getElementById("song-artist").innerHTML).toBe(
    config.songs[1].artist
  );
});
