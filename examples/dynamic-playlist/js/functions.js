var songsToAdd = [
  {
    "name": "Terrain",
    "artist": "pg.lost",
    "album": "Key",
    "url": "../songs/Terrain-pglost.mp3",
    "cover_art_url": "../album-art/key.jpg"
  },
  {
    "name": "Vorel",
    "artist": "Russian Circles",
    "album": "Guidance",
    "url": "../songs/Vorel-RussianCircles.mp3",
    "cover_art_url": "../album-art/guidance.jpg"
  },
  {
    "name": "Intro / Sweet Glory",
    "artist": "Jimkata",
    "album": "Die Digital",
    "url": "../songs/IntroSweetGlory-Jimkata.mp3",
    "cover_art_url": "../album-art/die-digital.jpg"
  },
  {
    "name": "Offcut #6",
    "artist": "Little People",
    "album": "We Are But Hunks of Wood Remixes",
    "url": "../songs/Offcut6-LittlePeople.mp3",
    "cover_art_url": "../album-art/we-are-but-hunks-of-wood.jpg"
  },
  {
    "name": "Dusk To Dawn",
    "artist": "Emancipator",
    "album": "Dusk To Dawn",
    "url": "../songs/DuskToDawn-Emancipator.mp3",
    "cover_art_url": "../album-art/from-dusk-to-dawn.jpg"
  },
  {
    "name": "Anthem",
    "artist": "Emancipator",
    "album": "Soon It Will Be Cold Enough",
    "url": "../songs/Anthem-Emancipator.mp3",
    "cover_art_url": "../album-art/soon-it-will-be-cold-enough.jpg"
  }
];

$(document).ready(function(){
  $('.show-playlist').on('click', function(){
    $('#white-player-playlist-container').slideDown(500, function(){
      $(this).show();
    });
  });

  $('.close-playlist').on('click', function(){
    $('#white-player-playlist-container').slideUp(500, function(){
      $(this).hide();
    });
  })

  $('.add-to-playlist-button').on('click', function(){
    var songToAddIndex = $(this).attr('song-to-add');

    var newIndex = Amplitude.addSong( songsToAdd[ songToAddIndex ] );
    appendToSongDisplay( songsToAdd[ songToAddIndex ], newIndex );
    Amplitude.bindNewElements();

    $('.song-to-add-container[song-to-add="'+songToAddIndex+'"]').remove();
  });
});

function appendToSongDisplay( song, index ){
  $('.white-player-playlist').append(
    '<div class="white-player-playlist-song amplitude-song-container amplitude-play-pause" amplitude-song-index="'+index+'">'
      + '<img src="'+song.cover_art_url+'"/>'
      + '<div class="playlist-song-meta">'
        + '<span class="playlist-song-name">'+song.name+'</span>'
        + '<span class="playlist-artist-album">'+song.artist+' &bull; '+song.album+'</span>'
      + '</div>'
    + '</div>'
  );
}
