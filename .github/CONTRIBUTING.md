# How to contribute
Thanks for your interest in contributing to the AmplitudeJS project! This is an open source project, so we like to keep things fun. It should go without saying that you please be friendly and respectful of other people's ideas. We're here to push Amplitude.js to the cutting edge of web audio, we want to make sure everyone is having fun do it. Let's not make this project feel like a job!

We also have a few guidelines on getting started and how to contribute:

## Coding Guidelines
- Make sure all code is properly indented with tabs and commented thoroughly
- Everything MUST be in Vanilla JavaScript and not revolve around any library
- Spend some quality time testing your code

## Set Up Your Development Environment
1. Clone Github repository to your machine. Use the `dev` branch to access the latest and greatest code.
2. All source code is located in the `src` folder

## Creating a new build of `amplitude.js`
1. Change directories into where you cloned the repository and run `npm install`
2. Make your changes to the appropriate files in the `src` directory
3. Run `npm run build` to process a build of your source code

# Submitting a pull request
We ask that any pull requests be submitted to our `dev` branch, which you can do here: https://github.com/521dimensions/amplitudejs/pull/new/dev

## Automated Tests
AmplitudeJS ships with a full test suite written in Jest: [https://jestjs.io/](https://jestjs.io/) to ensure stable, production ready code. This process is automated by TravisCI on every commit we push. We tried to cover every scenario and even did some UI/UX tests. Like all of AmplitudeJS we welcome any critiques and contributes you may have for the tests.
