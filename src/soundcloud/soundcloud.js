/**
 * Imports the config module
 * @module config
 */
import config from "../config.js";

/**
 * Imports the initializer
 * @module init/AmplitudeInitializer
 */
import AmplitudeInitializer from "../init/init.js";

/**
 * These helpers wrap around the basic methods of the Soundcloud API
 * and get the information we need from SoundCloud to make the songs
 * streamable through Amplitude
 *
 * @module soundcloud/SoundCloud
 */
let SoundCloud = (function() {
  /**
   * Defines the temporary user config used while we configure soundcloud
   * @type {object}
   */
  let tempUserConfig = {};

  /**
   * Loads the soundcloud SDK for use with Amplitude so the user doesn't have
   * to load it themselves.
   * With help from: http://stackoverflow.com/questions/950087/include-a-javascript-file-in-another-javascript-file
   *
   * @access public
   * @param {object} userConfig 	- The config defined by the user for AmplitudeJS
   */
  function loadSoundCloud(userConfig) {
    /*
			Sets the temporary config to the config passed by the user so we can make changes
			and not break the actual config.
		*/
    tempUserConfig = userConfig;

    /*
			Gets the head tag for the document and create a script element.
		*/
    let head = document.getElementsByTagName("head")[0];
    let script = document.createElement("script");

    script.type = "text/javascript";

    /*
			URL to the remote soundcloud SDK
		*/
    script.src = "https://connect.soundcloud.com/sdk.js";
    script.onreadystatechange = initSoundcloud;
    script.onload = initSoundcloud;

    /*
			Add the script to the head of the document.
		*/
    head.appendChild(script);
  }

  /**
   * Initializes soundcloud with the key provided.
   *
   * @access private
   */
  function initSoundcloud() {
    /*
			Calls the SoundCloud initialize function
			from their API and sends it the client_id
			that the user passed in.
		*/
    SC.initialize({
      client_id: config.soundcloud_client
    });

    /*
			Gets the streamable URLs to run through Amplitue. This is
			VERY important since Amplitude can't stream the copy and pasted
			link from the SoundCloud page, but can resolve the streaming
			URLs from the link.
		*/
    getStreamableURLs();
  }

  /**
   * Gets the streamable URL from the URL provided for
   * all of the soundcloud links.  This will loop through
   * and set all of the information for the soundcloud
   * urls.
   *
   * @access private
   */
  function getStreamableURLs() {
    /*
			Define the regex to find the soundcloud URLs
		*/
    let soundcloud_regex = /^https?:\/\/(soundcloud.com|snd.sc)\/(.*)$/;

    for (let i = 0; i < config.songs.length; i++) {
      /*
				If the URL matches soundcloud, we grab
				that url and get the streamable link
				if there is one.
			*/
      if (config.songs[i].url.match(soundcloud_regex)) {
        config.soundcloud_song_count++;
        resolveStreamable(config.songs[i].url, i);
      }
    }
  }

  /**
   * Resolves an individual streamable URL.
   *
   * @param {string} url - The URL of the SoundCloud song to get the streamable URL from.
   * @param {string} playlist - The playlist we are getting the streamable URL for.
   * @param {Integer} index - The index of the song in the playlist or the songs array.
   * @param {boolean} addToShuffleList - Whether we add to the shuffle list for the songs or playlist.
   *
   */
  function resolveIndividualStreamableURL(
    url,
    playlist,
    index,
    addToShuffleList = false
  ) {
    SC.get("/resolve/?url=" + url, function(sound) {
      /*
        If streamable we get the url and bind the client ID to the end
        so Amplitude can just stream the song normally. We then overwrite
        the url the user provided with the streamable URL.
      */
      if (sound.streamable) {
        if (playlist != null) {
          config.playlists[playlist].songs[index].url =
            sound.stream_url + "?client_id=" + config.soundcloud_client;

          if (addToShuffleList) {
            config.playlists[playlist].shuffle_list[index].url =
              sound.stream_url + "?client_id=" + config.soundcloud_client;
          }
          /*
            If the user want's to use soundcloud art, we overwrite the
            cover_art_url with the soundcloud artwork url.
          */
          if (config.soundcloud_use_art) {
            config.playlists[playlist].songs[index].cover_art_url =
              sound.artwork_url;

            if (addToShuffleList) {
              config.playlists[playlist].shuffle_list[index].cover_art_url =
                sound.artwork_url;
            }
          }

          /*
            Grab the extra metadata from soundcloud and bind it to the
            song.  The user can get this through the public function:
            getActiveSongMetadata
          */
          config.playlists[playlist].songs[index].soundcloud_data = sound;

          if (addToShuffleList) {
            config.playlists[playlist].shuffle_list[
              index
            ].soundcloud_data = sound;
          }
        } else {
          config.songs[index].url =
            sound.stream_url + "?client_id=" + config.soundcloud_client;

          if (addToShuffleList) {
            config.shuffle_list[index].stream_url +
              "?client_id=" +
              config.soundcloud_client;
          }

          /*
            If the user want's to use soundcloud art, we overwrite the
            cover_art_url with the soundcloud artwork url.
          */
          if (config.soundcloud_use_art) {
            config.songs[index].cover_art_url = sound.artwork_url;

            if (addToShuffleList) {
              config.shuffle_list[index].cover_art_url = sound.artwork_url;
            }
          }

          /*
            Grab the extra metadata from soundcloud and bind it to the
            song.  The user can get this through the public function:
            getActiveSongMetadata
          */
          config.songs[index].soundcloud_data = sound;

          if (addToShuffleList) {
            config.shuffle_list[index].soundcloud_data = sound;
          }
        }
      } else {
        if (playlist != null) {
          AmplitudeHelpers.writeDebugMessage(
            config.playlists[playlist].songs[index].name +
              " by " +
              config.playlists[playlist].songs[index].artist +
              " is not streamable by the Soundcloud API"
          );
        } else {
          /*
            If not streamable, then we print a message to the user stating
            that the song with name X and artist X is not streamable. This
            gets printed ONLY if they have debug turned on.
          */
          AmplitudeHelpers.writeDebugMessage(
            config.songs[index].name +
              " by " +
              config.songs[index].artist +
              " is not streamable by the Soundcloud API"
          );
        }
      }
    });
  }

  /**
   * Due to Soundcloud SDK being asynchronous, we need to scope the
   * index of the song in another function. The privateGetSoundcloudStreamableURLs
   * function does the actual iteration and scoping.
   *
   * @access private
   * @param {string} url 		- URL of the soundcloud song
   * @param {number} index 	- The index of the soundcloud song in the songs array.
   */
  function resolveStreamable(url, index) {
    SC.get("/resolve/?url=" + url, function(sound) {
      /*
				If streamable we get the url and bind the client ID to the end
				so Amplitude can just stream the song normally. We then overwrite
				the url the user provided with the streamable URL.
			*/
      if (sound.streamable) {
        config.songs[index].url =
          sound.stream_url + "?client_id=" + config.soundcloud_client;

        /*
					If the user want's to use soundcloud art, we overwrite the
					cover_art_url with the soundcloud artwork url.
				*/
        if (config.soundcloud_use_art) {
          config.songs[index].cover_art_url = sound.artwork_url;
        }

        /*
					Grab the extra metadata from soundcloud and bind it to the
					song.  The user can get this through the public function:
					getActiveSongMetadata
				*/
        config.songs[index].soundcloud_data = sound;
      } else {
        /*
					If not streamable, then we print a message to the user stating
					that the song with name X and artist X is not streamable. This
					gets printed ONLY if they have debug turned on.
				*/
        AmplitudeHelpers.writeDebugMessage(
          config.songs[index].name +
            " by " +
            config.songs[index].artist +
            " is not streamable by the Soundcloud API"
        );
      }
      /*
				Increments the song ready counter.
			*/
      config.soundcloud_songs_ready++;

      /*
				When all songs are accounted for, then amplitude is ready
				to rock and we set the rest of the config.
			*/
      if (config.soundcloud_songs_ready == config.soundcloud_song_count) {
        AmplitudeInitializer.setConfig(tempUserConfig);
      }
    });
  }

  /**
   * Determines if a given URL is a SoundCloud URL.
   *
   * @param {string} url - The URL to test if it's a SoundCloud URL.
   */
  function isSoundCloudURL(url) {
    let soundcloud_regex = /^https?:\/\/(soundcloud.com|snd.sc)\/(.*)$/;

    return url.match(soundcloud_regex);
  }

  /*
		Returns the publically accessible methods
	*/
  return {
    loadSoundCloud: loadSoundCloud,
    resolveIndividualStreamableURL: resolveIndividualStreamableURL,
    isSoundCloudURL: isSoundCloudURL
  };
})();

export default SoundCloud;
