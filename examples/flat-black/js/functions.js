window.onkeydown = function(e) {
    return !(e.keyCode == 32);
};
$(document).on('ready', function(){

  /*
    Handles a click on the down button to slide down the playlist.
  */
  $('.down-header').on('click', function(){
    /*
      Sets the list's height;
    */
    $('#list').css('height', ( parseInt( $('#flat-black-player-container').height() ) - 135 )+ 'px' );

    /*
      Slides down the playlist.
    */
    $('#list-screen').slideDown(500, function(){
        $(this).show();
    });
  });

  /*
    Handles a click on the up arrow to hide the list screen.
  */
  $('.hide-playlist').on('click', function(){
    $('#list-screen').slideUp( 500, function(){
      $(this).hide();
    });
  });

  /*
    Handles a click on the song played progress bar.
  */
  document.getElementById('song-played-progress').addEventListener('click', function( e ){
    var offset = this.getBoundingClientRect();
    var x = e.pageX - offset.left;

    Amplitude.setSongPlayedPercentage( ( parseFloat( x ) / parseFloat( this.offsetWidth) ) * 100 );
  });

  $('img[amplitude-song-info="cover_art_url"]').css('height', $('img[amplitude-song-info="cover_art_url"]').width() + 'px' );
});

$(window).on('resize', function(){
  $('img[amplitude-song-info="cover_art_url"]').css('height', $('img[amplitude-song-info="cover_art_url"]').width() + 'px' );
});
