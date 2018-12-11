const Amplitude = require("../../src/index.js");

const config = require("../../src/config.js");

const Setup = require("../setup.js");

beforeEach(() => {
  buildContainerElements();
  Setup.initializeTestingElement();
  Setup.initializeAmplitude();
});

afterEach(() => {
  Setup.resetConfig();
});

function buildContainerElements() {
  document.body.innerHTML = '<div class="amplitude-mute" id="mute"></div>';
}

test("AmplitudeJS Mute Elements Get Updated Correctly", () => {
  document.getElementById("mute").click();

  expect(document.getElementById("mute").classList.contains("amplitude-muted"));

  document.getElementById("mute").click();

  expect(
    document.getElementById("mute").classList.contains("amplitude-not-muted")
  );
});
