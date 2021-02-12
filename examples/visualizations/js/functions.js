Amplitude.init({
  bindings: {
    37: 'prev',
    39: 'next',
    32: 'play_pause'
  },
  debug: true,
  visualization: 'michaelbromley_visualization',
  songs: [
    {
      "name": "Risin' High (feat Raashan Ahmad)",
      "artist": "Ancient Astronauts",
      "album": "We Are to Answer",
      "url": "../songs/Ancient Astronauts - Risin' High (feat Raashan Ahmad).mp3",
      "cover_art_url": "../album-art/we-are-to-answer.jpg",
      "visualization": "frequency_analyzer_visualization"
    },
    {
      "name": "The Gun",
      "artist": "Lorn",
      "album": "Ask The Dust",
      "url": "../songs/08 The Gun.mp3",
      "cover_art_url": "../album-art/ask-the-dust.jpg",
      "visualization": "michaelbromley_visualization"
    },
    {
      "name": "Anvil",
      "artist": "Lorn",
      "album": "Anvil",
      "url": "../songs/LORN - ANVIL.mp3",
      "cover_art_url": "../album-art/anvil.jpg",
      "visualization": "michaelbromley_visualization"
    },
    {
      "name": "I Came Running",
      "artist": "Ancient Astronauts",
      "album": "We Are to Answer",
      "url": "../songs/ICameRunning-AncientAstronauts.mp3",
      "cover_art_url": "../album-art/we-are-to-answer.jpg",
      "visualization": "michaelbromley_visualization"
    },
    {
      "name": "First Snow",
      "artist": "Emancipator",
      "album": "Soon It Will Be Cold Enough",
      "url": "../songs/FirstSnow-Emancipator.mp3",
      "cover_art_url": "../album-art/soon-it-will-be-cold-enough.jpg",
      "visualization": "michaelbromley_visualization"
    },
    {
      "name": "Terrain",
      "artist": "pg.lost",
      "album": "Key",
      "url": "../songs/Terrain-pglost.mp3",
      "cover_art_url": "../album-art/key.jpg",
      "visualization": "michaelbromley_visualization"
    },
    {
      "name": "Vorel",
      "artist": "Russian Circles",
      "album": "Guidance",
      "url": "../songs/Vorel-RussianCircles.mp3",
      "cover_art_url": "../album-art/guidance.jpg",
      "visualization": "michaelbromley_visualization"
    },
    {
      "name": "Intro / Sweet Glory",
      "artist": "Jimkata",
      "album": "Die Digital",
      "url": "../songs/IntroSweetGlory-Jimkata.mp3",
      "cover_art_url": "../album-art/die-digital.jpg",
      "visualization": "michaelbromley_visualization"
    },
    {
      "name": "Offcut #6",
      "artist": "Little People",
      "album": "We Are But Hunks of Wood Remixes",
      "url": "../songs/Offcut6-LittlePeople.mp3",
      "cover_art_url": "../album-art/we-are-but-hunks-of-wood.jpg",
      "visualization": "michaelbromley_visualization"
    },
    {
      "name": "Dusk To Dawn",
      "artist": "Emancipator",
      "album": "Dusk To Dawn",
      "url": "../songs/DuskToDawn-Emancipator.mp3",
      "cover_art_url": "../album-art/from-dusk-to-dawn.jpg",
      "visualization": "michaelbromley_visualization"
    },
    {
      "name": "Anthem",
      "artist": "Emancipator",
      "album": "Soon It Will Be Cold Enough",
      "url": "../songs/Anthem-Emancipator.mp3",
      "cover_art_url": "../album-art/soon-it-will-be-cold-enough.jpg",
      "visualization": "michaelbromley_visualization"
    }
  ],

  waveforms: {
      sample_rate: 100
  },

  visualizations: [
    {
      object: MichaelBromleyVisualization,
      params: {

      }
    },
    {
      object: FrequencyAnalyzerVisualization,
      params: {
        type: 'dynamic'
      }
    }
  ]
});

document.getElementsByClassName('visualization-toggle')[0].addEventListener('click', function(){
  if( this.classList.contains( 'visualization-off' ) ){
    this.classList.remove('visualization-off');
    this.classList.add('visualization-on');
    document.getElementById('large-now-playing-album-art').style.display = 'none';
    document.getElementById('large-visualization').style.display = 'block';
  }else{
    this.classList.remove('visualization-on');
    this.classList.add('visualization-off');
    document.getElementById('large-now-playing-album-art').style.display = 'block';
    document.getElementById('large-visualization').style.display = 'none';
  }
});


document.getElementsByClassName('arrow-up-icon')[0].addEventListener('click', function(){
  document.getElementById('visualizations-player-playlist').style.display = 'block';
});

document.getElementsByClassName('arrow-down-icon')[0].addEventListener('click', function(){
  document.getElementById('visualizations-player-playlist').style.display = 'none';
});