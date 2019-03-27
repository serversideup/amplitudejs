/*
  Shows the playlist
*/
document.getElementsByClassName('show-playlist')[0].addEventListener('click', function(){
  document.getElementById('white-player-playlist-container').classList.remove('slide-out-top');
  document.getElementById('white-player-playlist-container').classList.add('slide-in-top');
  document.getElementById('white-player-playlist-container').style.display = "block";
});

/*
  Hides the playlist
*/
document.getElementsByClassName('close-playlist')[0].addEventListener('click', function(){
  document.getElementById('white-player-playlist-container').classList.remove('slide-in-top');
  document.getElementById('white-player-playlist-container').classList.add('slide-out-top');
  document.getElementById('white-player-playlist-container').style.display = "none";
});

Amplitude.init({
  "songs": [
    {
      "name": "First Snow",
      "artist": "Emancipator",
      "album": "Soon It Will Be Cold Enough",
      "url": "../songs/FirstSnow-Emancipator.mp3",
      "cover_art_url": "../album-art/soon-it-will-be-cold-enough.jpg"
    }
  ],
  "playlists": {
    "emancipator": {
      songs: [
        {
          "name": "First Snow",
          "artist": "Emancipator",
          "album": "Soon It Will Be Cold Enough",
          "url": "../songs/FirstSnow-Emancipator.mp3",
          "cover_art_url": "../album-art/soon-it-will-be-cold-enough.jpg"
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
    },
    "trip_hop": {
      songs: [
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
        }
      ]
    }
  }
});