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
      }
    ]
  });

  window.onkeydown = function(e) {
      return !(e.keyCode == 32);
  };

  /*
    Handles a click on the song played progress bar.
  */
  document.getElementById('song-played-progress').addEventListener('click', function( e ){
    var offset = this.getBoundingClientRect();
    var x = e.pageX - offset.left;

    Amplitude.setSongPlayedPercentage( ( parseFloat( x ) / parseFloat( this.offsetWidth) ) * 100 );
  });