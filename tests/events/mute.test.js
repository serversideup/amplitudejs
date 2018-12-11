const config = require("../../src/config.js");

const Mute = require("../../src/events/mute.js");

const Setup = require("../setup.js");

beforeEach(() => {
  Setup.initializeTestingElement();
  Setup.initializeAmplitude();
});

afterEach(() => {
  Setup.resetConfig();
});

/*
  Ensures that mute is handled correctly.
*/
test("AmplitudeJS handles mute event correctly", () => {
  Mute.handle();

  expect(config.volume).toBe(0);
  expect(config.pre_mute_volume).toBe(50);
});

/*
  Ensures that you can unmute AmplitudeJS correctly.
*/
test("AmplitudeJS handles unmute event correctly", () => {
  Mute.handle();

  expect(config.volume).toBe(0);
  expect(config.pre_mute_volume).toBe(50);

  Mute.handle();

  expect(config.volume).toBe(50);
});
