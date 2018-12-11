const Amplitude = require("../src/index.js");

const config = require("../src/config.js");

const Setup = require("./setup.js");

beforeEach(() => {
  Setup.initializeTestingElement();
  Setup.initializeAmplitude();
});

afterEach(() => {
  Setup.resetConfig();
});

/**
 * Ensures the songs are set correctly.
 */
test("AmplitudeJS Initializes Songs Correctly", () => {
  expect(config.songs.length).toBe(11);
});

/**
 * Ensures the live parameters are set correctly.
 */
test("AmplitudeJS Initializes Live Parameters Correctly", () => {
  expect(config.songs[0].live).toBe(false);
});

/**
 * Ensures the playlists are initialized correclty.
 */
test("AmplitudeJS Initializes Playlists Correctly", () => {
  expect(Object.keys(config.playlists).length).toBe(3);
});

/**
 * Ensures the active playlist after init is ""
 */
test("AmplitudeJS Get Active Playlist Returns null With Default Init", () => {
  expect(Amplitude.getActivePlaylist()).toBe(null);
});

/**
 * Ensures the playback speed is 1 after init.
 */
test("AmplitudeJS Get Playback Speed to be 1 with Default Init", () => {
  expect(Amplitude.getPlaybackSpeed()).toBe(1);
});

/**
 * Ensures that repeat is false after init.
 */
test("AmplitudeJS Get Repeat is False after Init", () => {
  expect(Amplitude.getRepeat()).toBeFalsy();
});

/**
 * Ensures that the playlists don't repeat after first init.
 */
test("AmplitudeJS Get Repeat Playlist is False after Init", () => {
  expect(Amplitude.getRepeatPlaylist("emancipator")).toBeFalsy();
});

/**
 * Ensures that shuffle is off on the first init.
 */
test("AmplitudeJS Get Shuffle is False after Init", () => {
  expect(Amplitude.getShuffle()).toBeFalsy();
});

/**
 * Ensures that shuffle playlist is off on first init.
 */
test("AmplitudeJS Get Shuffle is False After Init on All Playlists", () => {
  expect(Amplitude.getShufflePlaylist("ancient_astronauts")).toBeFalsy();
  expect(Amplitude.getShufflePlaylist("trip_hop")).toBeFalsy();
  expect(Amplitude.getShufflePlaylist("emancipator")).toBeFalsy();
});

/**
 * Ensure that set shuffle works.
 */
test("AmplitudeJS Set Shuffle is True after setting to true", () => {
  Amplitude.setShuffle(true);
  expect(config.shuffle_on).toBe(true);
});

/**
 * Ensure that the shuffle array contains all of the songs.
 */
test("AmplitudeJS Set Shuffle has a shuffle list", () => {
  Amplitude.setShuffle(true);
  expect(config.shuffle_list.length).toBe(11);
});

/**
 * Ensure that the shuffle is turned on on the playlist.
 */
test("AmplitudeJS Set Shuffle is True on Playlist after setting to true", () => {
  Amplitude.setShufflePlaylist("trip_hop", true);
  expect(config.playlists["trip_hop"].shuffle).toBe(true);
});

/**
 * Ensure that the shuffle is turned on on the playlist.
 */
test("AmplitudeJS Set Shuffle is True and shuffle list contains songs", () => {
  Amplitude.setShufflePlaylist("trip_hop", true);
  expect(config.playlists["trip_hop"].shuffle_list.length).toBe(6);
});

/**
 * Ensures that when we set repeat, it is turned on.
 */
test("AmplitudeJS Set Repeat is True when setting to true", () => {
  Amplitude.setRepeat(true);
  expect(config.repeat).toBe(true);
});

/**
 * Ensures that when we set repeat on a playlist, it is turned on.
 */
test("AmplitudeJS Set Repeat Playlist is true when setting to true", () => {
  Amplitude.setRepeatPlaylist("emancipator", true);
  expect(config.playlists["emancipator"].repeat).toBe(true);
});

/**
 * Ensures that we are repeating a song when we set the song to repeat.
 */
test("AmplitudeJS Set Repeat Song is true when setting to true", () => {
  Amplitude.setRepeatSong(true);
  expect(config.repeat_song).toBe(true);
});

/**
 * Ensures that the default album art is returned.
 */
test("AmplitudeJS Returns Default Album Art", () => {
  var defaultAlbumArt = Amplitude.getDefaultAlbumArt();
  expect(defaultAlbumArt).toBe("http://www.google.com");
});

/**
 * Ensures that the default album art is set correctly.
 */
test("AmplitudeJS Sets Default Album Art", () => {
  Amplitude.setDefaultAlbumArt("https://test.jpg");
  expect(config.default_album_art).toBe("https://test.jpg");
});

/**
 * Ensures that song played percentage is returned correctly.
 */
test("AmplitudeJS song played percentage calculates correctly", () => {
  var percentage = Amplitude.getSongPlayedPercentage();
  expect(percentage).toBe(30);
});

/**
 * Ensures that getting the current time returns the right values.
 */
test("AmplitudeJS song played seconds returns correctly", () => {
  expect(Amplitude.getSongPlayedSeconds()).toBe(30);
});

/**
 * Ensures that getting the current duration returns the right values.
 */
test("AmplitudeJS duration returns correctly", () => {
  expect(Amplitude.getSongDuration()).toBe(100);
});

/**
 * Ensures that we can set the song played percentage correctly.
 */
test("AmplitudeJS set song played percentage", () => {
  Amplitude.setSongPlayedPercentage(45);
  expect(config.audio.currentTime).toBe(45);
});

/**
 * Ensures we can set debug.
 */
test("AmplitudeJS set debug to on", () => {
  Amplitude.setDebug(true);
  expect(config.debug).toBe(true);
});

/**
 * Ensures that the active meta data is the first song in the song list
 * since that's default.
 */
test("AmplitudeJS Active Song Metadata is accurate", () => {
  var activeMetaData = Amplitude.getActiveSongMetadata();
  expect(activeMetaData).toBe(config.songs[0]);
});

/**
 * Gets the active playlist metadata
 */
test("AmplitudeJS ensure that the active playlist meta data is right", () => {
  config.active_playlist = "emancipator";

  var activePlaylistMetaData = Amplitude.getActivePlaylistMetadata();
  expect(activePlaylistMetaData).toBe(config.playlists["emancipator"]);
});

/**
 * Ensure the song at index returns the right song.
 */
test("AmplitudeJS song at index returns the right song", () => {
  var song = Amplitude.getSongAtIndex(2);
  expect(song).toBe(config.songs[2]);
});

/**
 * Ensure that the song at the playlist index is returned correctly.
 */
test("AmplitudeJS song at playlist index is accurate", () => {
  var songAtPlaylistIndex = Amplitude.getSongAtPlaylistIndex("emancipator", 2);
  expect(songAtPlaylistIndex).toBe(config.playlists["emancipator"].songs[2]);
});

/**
 * Ensure we can add a song to the songs array.
 */
test("AmplitudeJS adds songs correctly to songs array", () => {
  var newSong = {
    artist: "Emancipator",
    name: "Test New Song",
    album: "Test New Album",
    url: "https://www.google.com/test.mp3"
  };

  var index = Amplitude.addSong(newSong);

  expect(config.songs[index].name).toBe("Test New Song");
  expect(config.songs.length).toBe(12);
});

/**
 * Ensures we can add a song to a playlist
 */
test("AmplitudeJS adds songs correctly to playlist songs array", () => {
  var newSong = {
    artist: "Emancipator",
    name: "Test New Song",
    album: "Test New Album",
    url: "https://www.google.com/test.mp3"
  };

  var index = Amplitude.addSongToPlaylist(newSong, "emancipator");

  expect(config.playlists["emancipator"].songs[index].name).toBe(
    "Test New Song"
  );
  expect(config.playlists["emancipator"].songs.length).toBe(4);
});

/**
 * Ensures we can add a playlist to AmplitudeJS.
 */
test("AmplitudeJS can add playlists", () => {
  var song = {
    artist: "Emancipator",
    name: "Test New Song",
    album: "Test New Album"
  };

  var playlist = {
    name: "test_playlist"
  };

  var newPlaylist = Amplitude.addPlaylist("test_playlist", playlist, song);

  expect(config.playlists["test_playlist"]).toBeDefined();
});

/**
 * Ensures we can't add a playlist that already exists.
 */
test("AmplitudeJS can not add a playlist that already exists", () => {
  var newPlaylist = Amplitude.addPlaylist("emancipator", {}, {});

  expect(newPlaylist).toBeNull();
});

/**
 * Ensures we can remove a song from the song array.
 */
test("AmplitudeJS can remove songs from the songs array", () => {
  Amplitude.removeSong(2);

  expect(config.songs.length).toBe(10);
  expect(config.songs[2].name).toBe("I Came Running");
});

/**
 * Ensures we can remove a song from the playlist
 */
test("AmplitudeJS can remove a song from the playlist", () => {
  Amplitude.removeSongFromPlaylist(1, "emancipator");

  expect(config.playlists["emancipator"].songs.length).toBe(2);
  expect(config.playlists["emancipator"].songs[1].name).toBe("Anthem");
});

/**
 * Ensures we can play a song now
 */
test("AmplitudeJS can play songs from an object", () => {
  var song = {
    artist: "Emancipator",
    name: "Test New Song",
    album: "Test New Album",
    url: "https://emancipator.com/url"
  };

  Amplitude.playNow(song);

  expect(config.active_metadata).toBe(song);
});

/**
 * Ensures we can play a song at the index defined.
 */
test("AmplitudeJS can play song at index defined", () => {
  Amplitude.playSongAtIndex(2);

  expect(config.active_metadata).toBe(config.songs[2]);
});

/**
 * Ensures we can play a song at the playlist index.
 */
test("AmplitudeJS can play song at playlist index", () => {
  Amplitude.playPlaylistSongAtIndex(1, "emancipator");

  expect(config.active_playlist).toBe("emancipator");
  expect(config.active_index).toBe(null);
  expect(config.playlists["emancipator"].active_index).toBe(1);
  expect(config.active_metadata).toBe(config.playlists["emancipator"].songs[1]);
});

/**
 * Ensures that next goes to the previous song.
 */
test("AmplitudeJS goes to the previous song", () => {
  Amplitude.prev();

  expect(config.active_index).toBe(config.songs.length - 1);
  expect(config.active_playlist).toBe(null);
});

/**
 * Ensures that next goes to the next song in the playlist.
 */
test("AmplitudeJS goes to the previous song in the playlist", () => {
  config.active_playlist = "emancipator";
  config.playlists["emancipator"].active_index = 1;

  Amplitude.prev("emancipator");

  expect(config.playlists["emancipator"].active_index).toBe(0);
  expect(config.active_metadata).toBe(config.playlists["emancipator"].songs[0]);
});

/**
 * Ensures that AmplitudeJS goes to the next song in the shuffle list.
 */
test("AmplitudeJS goes to the previous song when shuffled", () => {
  Amplitude.setShuffle(true);
  Amplitude.prev();

  expect(config.active_metadata).toBe(
    config.shuffle_list[config.songs.length - 1]
  );
});

/**
 * Ensures that a shuffled playlist goes to the next song.
 */
test("AmplitudeJS goes to the previous song in the playlist when shuffled", () => {
  config.active_playlist = "emancipator";
  Amplitude.setShufflePlaylist("emancipator", true);
  Amplitude.prev("emancipator");

  expect(config.active_metadata).toBe(
    config.playlists["emancipator"].shuffle_list[
      config.playlists["emancipator"].songs.length - 1
    ]
  );
});

/**
 * Ensures that AmplitudeJS returns the songs in the config.
 */
test("AmplitudeJS returns the songs in the songs array", () => {
  var songs = Amplitude.getSongs();

  expect(songs).toBe(config.songs);
});

/**
 * Ensures that AmplitudeJS returns the songs in the playlist.
 */
test("AmplitudeJS returns the songs in the playlist songs array", () => {
  var songs = Amplitude.getSongsInPlaylist("emancipator");

  expect(songs).toBe(config.playlists["emancipator"].songs);
});

/**
 * Ensures that AmplitudeJS gets the songs in the proper state.
 */
test("AmplitudeJS returns the songs in the active state of the player", () => {
  var songs = Amplitude.getSongsState();

  expect(songs).toBe(config.songs);
});

/**
 * Ensures that AmplitudeJS gets the songs in the proper state when shuffled.
 */
test("AmplitudeJS returns the songs when shuffled properly", () => {
  Amplitude.setShuffle(true);

  var songs = Amplitude.getSongsState();
  expect(songs).toBe(config.shuffle_list);
});

/**
 * Ensures that AmplitudeJS gets the songs in state playlist.
 */
test("AmplitudeJS returns the songs state playlist", () => {
  var songs = Amplitude.getSongsStatePlaylist("emancipator");

  expect(songs).toBe(config.playlists["emancipator"].songs);
});

/**
 * Ensures that AmplitudeJS gets the songs in state when shuffled playlist.
 */
test("AmplitudeJS returns the songs in the state for the playlist", () => {
  Amplitude.setShufflePlaylist("emancipator", true);

  var songs = Amplitude.getSongsStatePlaylist("emancipator");

  expect(songs).toBe(config.playlists["emancipator"].shuffle_list);
});

/**
 * Ensures we get the active index.
 */
test("AmplitudeJS returns the active index", () => {
  var index = Amplitude.getActiveIndex();

  expect(index).toBe(config.active_index);
});

/**
 * Ensures we get the version from AmplitudeJS.
 */
test("AmplitudeJS returns the current version", () => {
  var version = Amplitude.getVersion();

  expect(version).toBe(config.version);
});

/**
 * Ensure that the meta data for a song is set correctly.
 */
test("AmplitudeJS sets the meta data correctly", () => {
  var metaData = {
    artist: "Updated Artist",
    album: "Updated Album"
  };

  Amplitude.setSongMetaData(3, metaData);

  expect(config.songs[3].artist).toBe("Updated Artist");
  expect(config.songs[3].album).toBe("Updated Album");
});

/**
 * Ensure that the meta data for a song in a playlist is set correctly.
 */
test("AmplitudeJS sets the meta data correctly for a song in the playlist", () => {
  var metaData = {
    artist: "Updated Artist",
    album: "Updated Album"
  };

  Amplitude.setSongMetaData(2, metaData, "trip_hop");

  expect(config.playlists["trip_hop"].songs[2].artist).toBe("Updated Artist");
  expect(config.playlists["trip_hop"].songs[2].album).toBe("Updated Album");
});

/**
 * Ensures we set the proper meta data for the playlist.
 */
test("AmplitudeJS sets the proper meta data for the playlist", () => {
  var metaData = {
    name: "Updated Name",
    created_by: "Dan"
  };

  Amplitude.setPlaylistMetaData("emancipator", metaData);

  expect(config.playlists["emancipator"].name).toBe("Updated Name");
  expect(config.playlists["emancipator"].created_by).toBe("Dan");
});

/**
 * Ensures we can set the delay between songs correctly.
 */
test("AmplitudeJS can set the delay between songs correctly", () => {
  Amplitude.setDelay(4000);

  expect(config.delay).toBe(4000);
});

/**
 * Ensures that we can get the delay after it's been set.
 */
test("AmplitudeJS returns the proper delay between songs", () => {
  Amplitude.setDelay(4000);

  var delay = Amplitude.getDelay();

  expect(delay).toBe(4000);
});

/**
 * Ensures we get the proper player state.
 */
test("AmplitudeJS returns the proper player state", () => {
  var state = Amplitude.getPlayerState();

  expect(state).toBe(config.player_state);
});
