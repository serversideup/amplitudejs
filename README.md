<p align="center">
	<a href="https://521dimensions.com/open-source/amplitudejs" target="_blank">
		<img src="https://521dimensions.com/img/open-source/amplitudejs/AmplitudeLogo-WithSlogan.svg" width="600" alt="AmplitudeJS Logo">
	</a>
</p>
<p align="center">
	<a href="https://gitter.im/521dimensions/amplitudejs" target="_blank">
		<img src="https://badges.gitter.im/gitterHQ/gitter.svg" alt="Gitter">
	</a>
	<a href="https://www.npmjs.com/package/amplitudejs" target="_blank">
		<img src="https://badge.fury.io/js/amplitudejs.svg" alt="npm version">
	</a>
	<a href="https://david-dm.org/521dimensions/amplitudejs" target="_blank">
		<img src="https://david-dm.org/521dimensions/amplitudejs.svg" alt="david-dm">
	</a>
	<a href="https://raw.githubusercontent.com/521dimensions/amplitudejs/master/LICENSE" target="_blank">
		<img src="https://521dimensions.com/img/open-source/amplitudejs/license.svg" alt="MIT License">
	</a>
</p>

Amplitude.js is a lightweight JavaScript library that allows you to control the design of your media controls in your webpage -- not the browser. No dependencies (jQuery not required). Amplitude.js is available under the [MIT License](https://raw.githubusercontent.com/521dimensions/amplitudejs/master/LICENSE).

## Demo
<p align="center">
	<a href="https://521dimensions.com/open-source/amplitudejs" target="_blank">
		<img src="https://521dimensions.com/img/open-source/amplitudejs/AmplitudeDemo.jpg" alt="MIT License" width="600">
	</a><br />
	Click the image above to go to the demo site or <a href="https://521dimensions.com/open-source/amplitudejs" target="_blank">click here</a>.
</p>

## Features
* Completely independent library (no jQuery required)
* 100% customizable design of all player elements
* Available by CDN or single command install: `npm install --save amplitudejs`
* Multiple playlist support on single page
* Song meta data display
* Soundcloud integration
* Live streaming support
* Call back functions for events
	* Play/Pause
	* Stop
	* Next Song
	* Previous Song
	* Shuffle

## Browsers support

| <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png" alt="IE / Edge" width="16px" height="16px" /></br>IE / Edge | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" /></br>Firefox | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" /></br>Chrome |
<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="16px" height="16px" /></br>Safari | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/opera.png" alt="Opera" width="16px" height="16px" /></br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| 4.0+| 3.5+| 4.0+| 10.5+|

## Installation

### Option 1: Use CDN from [jsDelivr](https://cdn.jsdelivr.net/npm/amplitudejs/)
No installation is required to use Amplitude.js. All you need to do is include a single line in your `<head>` section of your HTML page.

Replace `{{version-number}}` with the exact version number that you would like to use (see [our releases](https://github.com/521dimensions/amplitudejs/releases) for what version number to use):
```html
<script src="https://cdn.jsdelivr.net/npm/amplitudejs@{{version-number}}/dist/amplitude.js"></script>
```
**NOTE:** It's best to set your version number manually to make sure you have full control of what version you are running. If you need to upgrade in the future, just change `{{version-number}}` to the latest version.


### Option 2: Automatic install via `npm`
Download it via NPM to your existing project:
```sh
npm install --save amplitudejs
```

You will see the file under `node_modules/amplitudejs/dist/amplitude.js`.

### Option 3: Manual download
Download the `amplitude.js` file from [our releases page](https://github.com/521dimensions/amplitudejs/releases) and include the file manually with your project.

### After install, you must initialize Amplitude.js
To initialize Amplitude.js, you must call the `Amplitude.init()` method and pass in an object that
contains an array of songs and settings. Amplitude.js will then take care of configuring and setting up your
player by finding all of the Amplitude elements (defined later in the docs) and binding the appropriate
event handlers.

To configure Amplitude.js, you need to call the init function on the Amplitude object
and you can pass it a JSON object of configuration variables ( we will go through ALL of these [in the
documentation](https://521dimensions.com/open-source/amplitudejs/docs) ). At the bare minimum, you need to pass it all of the song objects that your page will
be using. More information about the song object next.

```javascript
	Amplitude.init({
		"songs": [
			{
				"name": "Song Name 1",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg"
			},
			{
				"name": "Song Name 2",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg"
			},
			{
				"name": "Song Name 3",
				"artist": "Artist Name",
				"album": "Album Name",
				"url": "/song/url.mp3",
				"cover_art_url": "/cover/art/url.jpg"
			}
		]
	});
```

This configuration will set up Amplitude.js to work the way you want it. The config JSON is used heavily
to configure and optimize Amplitude.js for what your app needs.

## Documentation & Usage
There are a lot more features that are explained in greater detail in our [latest documentation](https://521dimensions.com/open-source/amplitudejs/docs). If you find errors or places for improvement on our documentation, submit a pull request with the documentation located at `/docs/DOCUMENTATION.md`. The documentation site reads directly from the GitHub Repo.


## Reporting Issues

If you are experiencing any issues or if you have a feature request, please [open up a new GitHub Issue](https://github.com/521dimensions/amplitudejs/issues/new/choose)
