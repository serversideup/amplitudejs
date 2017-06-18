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

## Installation

### Option 1: Use CDN from [jsDelivr](https://cdn.jsdelivr.net/npm/amplitudejs/)
No installation is required to use Amplitude.js. All you need to do is include a single line in your `<head>` section of your HTML page.

Replace `{{version-number}}` with the exact version number that you would like to use (see [our releases](https://github.com/521dimensions/amplitudejs/releases) for what version number to use):
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/amplitudejs@{{version-number}}/dist/amplitude.js"></script>
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

## Documentation & Usage
We're huge believers in clear documentation. You can access the [latest documentation here](https://521dimensions.com/open-source/amplitudejs/docs). If you find errors or places for improvement, submit a pull request with the documentation located at `/docs/DOCUMENTATION.md`. The documentation site reads directly from the GitHub Repo.


## Reporting Issues

If you are experiencing any issues or if you have a feature request, please [open up a new GitHub Issue](https://github.com/521dimensions/amplitudejs/issues/new)
