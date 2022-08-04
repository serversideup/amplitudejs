# Tracking Slider
The tracking slider allows the user to track (seek) the currently playing audio. When the user adjusts the slider, the current location in the audio will change.

There are 4 different scopes to the tracking slider:
1. Global - Tracks in the current audio that is active, no matter scope.
2. Collection - Tracks the audio currently playing within the scope of a collection.
3. Individual Audio - Tracks an individual audio file.
4. Individual Audio in Collection - Tracks the individual audio within the scope of a collection.

Audio tracking elements *must* be the HTML 5 range element. This will ensure proper functionality when using and is semantically correct. The HTML 5 range element can be a pain to style, but the functionality will be worth it. You could also implement a custom audio tracker using some of the callbacks and publicly facing AmplitudeJS Methods.

> Note: Features like the tracking element and progress bar depend on the browser being able to request the audio file in arbitrary chunks. Firefox can work around lack of support from the server, but for these features to work properly, your server must support [Content-Range HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Range).

## Global Tracking Slider
