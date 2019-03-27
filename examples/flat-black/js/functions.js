window.onkeydown = function(e) {
    return !(e.keyCode == 32);
};

/*
  Handles a click on the down button to slide down the playlist.
*/
document.getElementsByClassName('down-header')[0].addEventListener('click', function(){
  var list = document.getElementById('list');

  list.style.height = ( parseInt( document.getElementById('flat-black-player-container').offsetHeight ) - 135 ) + 'px';

  document.getElementById('list-screen').classList.remove('slide-out-top');
  document.getElementById('list-screen').classList.add('slide-in-top');
  document.getElementById('list-screen').style.display = "block";
});

/*
  Handles a click on the up arrow to hide the list screen.
*/
document.getElementsByClassName('hide-playlist')[0].addEventListener('click', function(){
  document.getElementById('list-screen').classList.remove('slide-in-top');
  document.getElementById('list-screen').classList.add('slide-out-top');
  document.getElementById('list-screen').style.display = "none";
});

/*
  Handles a click on the song played progress bar.
*/
document.getElementById('song-played-progress').addEventListener('click', function( e ){
  var offset = this.getBoundingClientRect();
  var x = e.pageX - offset.left;

  Amplitude.setSongPlayedPercentage( ( parseFloat( x ) / parseFloat( this.offsetWidth) ) * 100 );
});

document.querySelector('img[data-amplitude-song-info="cover_art_url"]').style.height = document.querySelector('img[data-amplitude-song-info="cover_art_url"]').offsetWidth + 'px';

Amplitude.init({
  "bindings": {
    37: 'prev',
    39: 'next',
    32: 'play_pause'
  },
  "songs": [
    {
      "name": "Risin' High (feat Raashan Ahmad)",
      "artist": "Ancient Astronauts",
      "album": "We Are to Answer",
      "url": "../songs/Ancient Astronauts - Risin' High (feat Raashan Ahmad).mp3",
      "cover_art_url": "../album-art/we-are-to-answer.jpg"
    },
    {
      "name": "The Gun",
      "artist": "Lorn",
      "album": "Ask The Dust",
      "url": "../songs/08 The Gun.mp3",
      "cover_art_url": "../album-art/ask-the-dust.jpg"
    },
    {
      "name": "Anvil",
      "artist": "Lorn",
      "album": "Anvil",
      "url": "../songs/LORN - ANVIL.mp3",
      "cover_art_url": "../album-art/anvil.jpg"
    },
    {
      "name": "I Came Running",
      "artist": "Ancient Astronauts",
      "album": "We Are to Answer",
      "url": "../songs/ICameRunning-AncientAstronauts.mp3",
      "cover_art_url": "../album-art/we-are-to-answer.jpg"
    },
    {
      "name": "First Snow",
      "artist": "Emancipator",
      "album": "Soon It Will Be Cold Enough",
      "url": "../songs/FirstSnow-Emancipator.mp3",
      "cover_art_url": "../album-art/soon-it-will-be-cold-enough.jpg"
    },
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
  ]
});
