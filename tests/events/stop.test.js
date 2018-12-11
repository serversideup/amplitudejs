const Amplitude = require("../../src/index.js");

const config = require("../../src/config.js");

const Setup = require("../setup.js");

beforeEach(() => {
  buildStopButtons();
  Setup.initializeTestingElement();
  Setup.initializeAmplitude();
});

afterEach(() => {
  Setup.resetConfig();
});

function buildStopButtons() {
  document.body.innerHTML =
    '<div class="amplitude-stop" id="global-stop"></div>';
}

test("AmplitudeJS Stop Stops The Song", () => {
  config.audio.currentTime = 30;

  document.getElementById("global-stop").click();

  expect(config.audio.currentTime).toBe(0);
});
