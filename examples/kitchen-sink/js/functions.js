/*
	Initializes the player
*/
$(document).ready(function(){
	/*
		Initializes foundation for responsive design.
	*/
	$(document).foundation();

	/*
		Equalizes the player heights for left and right side of the player
	*/
	adjustPlayerHeights();

	/*
		When the window resizes, ensure the left and right side of the player
		are equal.
	*/
	$(window).on('resize', function(){
		adjustPlayerHeights();
	});

	/*
		When the bandcamp link is pressed, stop all propagation so AmplitudeJS doesn't
		play the song.
	*/
	$('.bandcamp-link').on('click', function( e ){

		e.stopPropagation();
	});

	/*
		Ensure that on mouseover, CSS styles don't get messed up for active songs.
	*/
	jQuery('.song').on('mouseover', function(){
		jQuery(this).css('background-color', '#00A0FF');
		jQuery(this).find('.song-meta-data .song-title').css('color', '#FFFFFF');
		jQuery(this).find('.song-meta-data .song-artist').css('color', '#FFFFFF');

		if( !jQuery(this).hasClass('amplitude-active-song-container') ){
			jQuery(this).find('.play-button-container').css('display', 'block');
		}

		jQuery(this).find('img.bandcamp-grey').css('display', 'none');
		jQuery(this).find('img.bandcamp-white').css('display', 'block');
		jQuery(this).find('.song-duration').css('color', '#FFFFFF');
	});

	/*
		Ensure that on mouseout, CSS styles don't get messed up for active songs.
	*/
	jQuery('.song').on('mouseout', function(){
		jQuery(this).css('background-color', '#FFFFFF');
		jQuery(this).find('.song-meta-data .song-title').css('color', '#272726');
		jQuery(this).find('.song-meta-data .song-artist').css('color', '#607D8B');
		jQuery(this).find('.play-button-container').css('display', 'none');
		jQuery(this).find('img.bandcamp-grey').css('display', 'block');
		jQuery(this).find('img.bandcamp-white').css('display', 'none');
		jQuery(this).find('.song-duration').css('color', '#607D8B');
	});

	/*
		Show and hide the play button container on the song when the song is clicked.
	*/
	jQuery('.song').on('click', function(){
		jQuery(this).find('.play-button-container').css('display', 'none');
	});

	$('#amplitude-bind-new-elements').on('click', function(){

	});

	/**
	 * Test Get Active Playlist
	 */
	$('#amplitude-get-active-playlist').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		let playlist = Amplitude.getActivePlaylist();
		$('#amplitude-function-output').html('Active Playlist: '+playlist);

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test Get Playback Speed
	 */
	$('#amplitude-get-playback-speed').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		let playbackSpeed = Amplitude.getPlaybackSpeed();
		$('#amplitude-function-output').html('Playback Speed: '+playbackSpeed);

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test Get Repeat
	 */
	$('#amplitude-get-repeat').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		let repeat = Amplitude.getRepeat();
		$('#amplitude-function-output').html('Repeat: '+repeat);

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test Get Repeat Playlist
	 */
	$('#amplitude-get-repeat-playlist').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		let repeat = Amplitude.getRepeatPlaylist('trip_hop');
		$('#amplitude-function-output').html('Repeat Playlist "trip_hop": '+repeat);

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test Get Shuffle
	 */
	$('#amplitude-get-shuffle').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		let shuffle = Amplitude.getShuffle();
		$('#amplitude-function-output').html('Shuffle: '+shuffle);

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test Get Shuffle Playlist
	 */
	$('#amplitude-get-shuffle-playlist').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		let shuffle = Amplitude.getShufflePlaylist('trip_hop');
		$('#amplitude-function-output').html('Shuffle Playlist "trip_hop": '+shuffle);

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test Set Shuffle On
	 */
	$('#amplitude-set-shuffle-on').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		Amplitude.setShuffle( true );
		$('#amplitude-function-output').html('Shuffle Set On');

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test Set Shuffle Off
	 */
	$('#amplitude-set-shuffle-off').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		Amplitude.setShuffle( false );
		$('#amplitude-function-output').html('Shuffle Set Off');

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test Set Shuffle Trip Hop
	 */
	$('#amplitude-set-shuffle-playlist-on').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		Amplitude.setShufflePlaylist('trip_hop', true);
		$('#amplitude-function-output').html('Shuffle Set On (Trip Hop)');

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test Set Shuffle Trip Hop
	 */
	$('#amplitude-set-shuffle-playlist-off').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		Amplitude.setShufflePlaylist('trip_hop', false);
		$('#amplitude-function-output').html('Shuffle Set Off (Trip Hop)');

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test repeat on
	 */
	$('#amplitude-set-repeat-on').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		Amplitude.setRepeat( true );
		$('#amplitude-function-output').html('Repeat On');

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test repeat off
	 */
	$('#amplitude-set-repeat-off').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		Amplitude.setRepeat( false );
		$('#amplitude-function-output').html('Repeat Off');

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test repeat song on
	 */
	$('#amplitude-set-repeat-song-on').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		Amplitude.setRepeatSong( true );
		$('#amplitude-function-output').html('Repeat Song On');

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test repeat song off
	 */
	$('#amplitude-set-repeat-song-off').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		Amplitude.setRepeatSong( false );
		$('#amplitude-function-output').html('Repeat Song Off');

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test repeat playlsit on
	 */
	$('#amplitude-set-repeat-playlist-on').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		Amplitude.setRepeatPlaylist( 'trip_hop', true );
		$('#amplitude-function-output').html('Repeat Trip Hop On');

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test repeat playlist off
	 */
	$('#amplitude-set-repeat-playlist-off').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		Amplitude.setRepeatPlaylist( 'trip_hop', false );
		$('#amplitude-function-output').html('Repeat Trip Hop Off');

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test get default album art
	 */
	$('#amplitude-get-default-album-art').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		let albumArt = Amplitude.getDefaultAlbumArt();
		$('#amplitude-function-output').html('Default Album Art: '+albumArt);

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test set default album art
	 */
	$('#amplitude-set-default-album-art').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		Amplitude.setDefaultAlbumArt('/test/default/album-art.jpg');
		$('#amplitude-function-output').html('Set Default Album Art To: /test/default/album-art.jpg');

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test get song played percentage
	 */
	$('#amplitude-get-song-played-percentage').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		let songPlayedPercentage = Amplitude.getSongPlayedPercentage();
		$('#amplitude-function-output').html('Song Played Percentage: '+songPlayedPercentage);

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test set song played percentage
	 */
	$('#amplitude-set-song-played-percentage').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		Amplitude.setSongPlayedPercentage( 30 );
		$('#amplitude-function-output').html('Song Played Percentage: 30%');

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test get song played seconds
	 */
	$('#amplitude-get-song-played-seconds').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		let seconds = Amplitude.getSongPlayedSeconds();
		$('#amplitude-function-output').html('Song Played Seconds: '+seconds);

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test get song duration
	 */
	$('#amplitude-get-song-duration').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		let duration = Amplitude.getSongDuration();
		$('#amplitude-function-output').html('Song Duration: '+duration);

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test set debug on
	 */
	$('#amplitude-set-debug-on').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		Amplitude.setDebug( true );
		$('#amplitude-function-output').html('Parameter Ran: true');

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );

	});

	/**
	 * Test set debug off
	 */
	$('#amplitude-set-debug-off').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		Amplitude.setDebug( false );
		$('#amplitude-function-output').html('Parameter Ran: false');

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );

	});

	/**
	 * Test get active song meta data
	 */
	$('#amplitude-get-active-song-metadata').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		let activeMetaData = Amplitude.getActiveSongMetadata();

		$('#amplitude-function-output').html('Parameter Ran: '+JSON.stringify(activeMetaData, null, 4));

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test get active playlist meta data.
	 */
	$('#amplitude-get-active-playlist-metadata').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		let activeMetaData = Amplitude.getActivePlaylistMetadata();

		$('#amplitude-function-output').html('Active Playlist Meta Data: '+JSON.stringify(activeMetaData, null, 4));

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test get song by index
	 */
	$('#amplitude-get-song-by-index').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		let songAtIndex = Amplitude.getSongAtIndex( 4 );

		$('#amplitude-function-output').html('Song at Index 4: '+JSON.stringify(songAtIndex, null, 4));

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test get song at playlist index
	 */
	$('#amplitude-get-song-at-playlist-index').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		let songAtIndex = Amplitude.getSongAtPlaylistIndex( 'trip_hop', 2 );

		$('#amplitude-function-output').html('Song on Trip Hop Playlist at Index 2: '+JSON.stringify(songAtIndex, null, 4));

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test add song.
	 */
	$('#amplitude-add-song').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		let song = {
			name: "Baralku",
			artist: "Emancipator",
			album: "Baralku",
			url: "../songs/Emancipator-Baralku.mp3",
			cover_art_url: "../album-art/baralku.jpg"
		}

		Amplitude.addSong( song );

		$('#amplitude-function-output').html('Song Added: '+JSON.stringify(song, null, 4));

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test add SoundCloud Song.
	 */
	$('#amplitude-add-soundcloud-song').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		let song = {
			name: "Seen It All",
			artist: "DJ East Oakland Boy",
			url: "https://soundcloud.com/roypacshakur/seen-it-all-young-jeezy-x-jayz"
		}

		Amplitude.addSong( song );

		$('#amplitude-function-output').html('Song Added: '+JSON.stringify(song, null, 4));

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test add song to playlist.
	 */
	$('#amplitude-add-song-to-playlist').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		let song = {
			name: "Baralku",
			artist: "Emancipator",
			album: "Baralku",
			url: "../songs/Emancipator-Baralku.mp3",
			cover_art_url: "../album-art/baralku.jpg"
		}

		Amplitude.addSongToPlaylist( song, 'trip_hop' );

		$('#amplitude-function-output').html('Song Added To Trip Hop Playlist: '+JSON.stringify(song, null, 4));

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test add SoundCloud Song.
	 */
	$('#amplitude-add-soundcloud-song-to-playlist').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		let song = {
			name: "Seen It All",
			artist: "DJ East Oakland Boy",
			url: "https://soundcloud.com/roypacshakur/seen-it-all-young-jeezy-x-jayz"
		}

		Amplitude.addSongToPlaylist( song, 'trip_hop' );

		$('#amplitude-function-output').html('Song Added: '+JSON.stringify(song, null, 4));

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test remove song
	 */
	$('#amplitude-remove-song').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		Amplitude.removeSong( 2 );

		$('#amplitude-function-output').html('Removed song at index 2 (Anvil by Lorn)');

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	$('#amplitude-remove-song-from-playlist').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		Amplitude.removeSongFromPlaylist( 2, 'trip_hop' );

		$('#amplitude-function-output').html('Removed song at index 2 from Trip Hop (Terrain by pg.Lost)');

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test play now
	 */
	$('#amplitude-play-now').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		let song = {
			name: "Baralku",
			artist: "Emancipator",
			album: "Baralku",
			url: "../songs/Emancipator-Baralku.mp3",
			cover_art_url: "../album-art/baralku.jpg"
		}

		Amplitude.playNow( song );

		$('#amplitude-function-output').html('Play Now: '+JSON.stringify(song, null, 4));

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test play song at index
	 */
	$('#amplitude-play-song-at-index').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		Amplitude.playSongAtIndex(2);
		$('#amplitude-function-output').html('Playing song at index 2');

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test play song at playlist index.
	 */
	$('#amplitude-play-song-at-playlist-index').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		Amplitude.playPlaylistSongAtIndex(2, 'trip_hop')
		$('#amplitude-function-output').html('Playing song at index 2 in playlist Trip Hop');

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test play
	 */
	$('#amplitude-play').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		Amplitude.play();
		$('#amplitude-function-output').html('Ran Play');

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test pause
	 */
	$('#amplitude-pause').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		Amplitude.pause();
		$('#amplitude-function-output').html('Ran Pause');

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test stop
	 */
	$('#amplitude-stop').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		Amplitude.stop();
		$('#amplitude-function-output').html('Ran Stop');

		// let config = Amplitude.getConfig();

		// $('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test get audio
	 */
	$('#amplitude-audio').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		let audioElement = Amplitude.getAudio();
		$('#amplitude-function-output').html('Audio Element: '+audioElement );

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	$('#amplitude-analyser').on('click', function(){

	});

	/**
	 * Test Next
	 */
	$('#amplitude-next').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		Amplitude.next();
		$('#amplitude-function-output').html('Ran Next');

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test Amplitude Next Playlist
	 */
	$('#amplitude-next-playlist').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		Amplitude.next('trip_hop');
		$('#amplitude-function-output').html('Ran Next Trip Hop');

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test Prev
	 */
	$('#amplitude-prev').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		Amplitude.prev();
		$('#amplitude-function-output').html('Ran Prev');

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test Prev Playlist
	 */
	$('#amplitude-prev-playlist').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		Amplitude.prev('trip_hop');
		$('#amplitude-function-output').html('Ran Prev Trip Hop');

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test Get Songs
	 */
	$('#amplitude-get-songs').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		let songs = Amplitude.getSongs();

		$('#amplitude-function-output').html('Songs: '+JSON.stringify(songs, null, 4));

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test Get Songs In Playlist
	 */
	$('#amplitude-get-songs-in-playlist').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		let songs = Amplitude.getSongsInPlaylist('trip_hop');

		$('#amplitude-function-output').html('Songs In Playlist (Trip Hop): '+JSON.stringify(songs, null, 4));

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Get songs state
	 */
	$('#amplitude-get-songs-state').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		let songs = Amplitude.getSongsState();

		$('#amplitude-function-output').html('Songs: '+JSON.stringify(songs, null, 4));

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Get songs state playlist
	 */
	$('#amplitude-get-songs-state-playlist').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		let songs = Amplitude.getSongsStatePlaylist( 'trip_hop' );

		$('#amplitude-function-output').html('Songs: '+JSON.stringify(songs, null, 4));

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Gets the active index
	 */
	$('#amplitude-get-active-index').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		let activeIndex = Amplitude.getActiveIndex();

		$('#amplitude-function-output').html('Active Index: '+activeIndex);

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Get the active index state
	 */
	$('#amplitude-get-active-index-state').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		let activeIndex = Amplitude.getActiveIndexState();

		$('#amplitude-function-output').html('Active Index State: '+activeIndex);

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Gets the version of AmplitudeJS
	 */
	$('#amplitude-get-version').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		let version = Amplitude.getVersion();

		$('#amplitude-function-output').html('Version: '+version);

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Gets the buffered status for the song.
	 */
	$('#amplitude-get-buffered').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		let buffered = Amplitude.getBuffered();

		$('#amplitude-function-output').html('Buffered Percentage: '+buffered);

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Skip to a location in a song
	 */
	$('#amplitude-skip-to').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		Amplitude.skipTo( 30, 2 );

		$('#amplitude-function-output').html('Skipped to 30 seconds in to Anvil by Lorn');

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Skip to a location in a song in a playlist
	 */
	$('#amplitude-skip-to-playlist').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		Amplitude.skipTo( 30, 3, 'trip_hop' );

		$('#amplitude-function-output').html('Skipped to 30 seconds in to Vorel by Russian Circles in Trip Hop');

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Sets the meta data necessary for the song.
	 */
	$('#amplitude-set-meta-data').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		Amplitude.setSongMetaData( 11, { 'cover_art_url': 'https://i1.sndcdn.com/artworks-000418522386-a2wdzw-large.jpg'});

		$('#amplitude-function-output').html('Set song meta data for ZEZE.');

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Sets the meta data for a song in a playlist
	 */
	$('#amplitude-set-meta-data-playlist').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		Amplitude.setSongMetaData( 3, { 'name': 'META DATA UPDATED', 'album': 'META DATA UPDATED'}, 'trip_hop');

		$('#amplitude-function-output').html('Set song meta data for Vorel in playlist Trip Hop.');

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Sets the meta data for a song in the playlist
	 */
	$('#amplitude-set-meta-data-playlist').on('click', function(){

	});

	/**
	 * Test sets delay
	 */
	$('#amplitude-set-delay').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		Amplitude.setDelay(5000);

		$('#amplitude-function-output').html('Set Delay to 5 seconds (5000ms)');

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test get player state
	 */
	$('#amplitude-get-player-state').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		let state = Amplitude.getPlayerState();

		$('#amplitude-function-output').html('Current State: '+state);

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});

	/**
	 * Test add playlist
	 */
	$('#amplitude-add-playlist').on('click', function(){
		$('#amplitude-function-output').html('');
		$('#amplitude-function-output-pre').html('');

		Amplitude.addPlaylist( 'new_emancipator', {
				title: 'New Emancipator',
				author: 'Dan Pastori'
			},
			[{
				name: "Baralku",
				artist: "Emancipator",
				album: "Baralku",
				url: "../songs/Emancipator-Baralku.mp3",
				cover_art_url: "../album-art/baralku.jpg"
			}]
		)
		$('#amplitude-function-output').html('Added new emancipator playlist');

		let config = Amplitude.getConfig();

		$('#amplitude-function-output-pre').append('Current Config: '+JSON.stringify(config, null, 4) );
	});
});

/*
	Adjusts the height of the left and right side of the players to be the same.
*/
function adjustPlayerHeights(){
	if( Foundation.MediaQuery.atLeast('medium') ) {
		var left = $('div#amplitude-left').width();
		var bottom = $('div#player-left-bottom').outerHeight();
		$('#amplitude-right').css('height', ( left + bottom )+'px');
	}else{
		$('#amplitude-right').css('height', 'initial');
	}
}
