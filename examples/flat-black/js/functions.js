$(document).on('ready', function(){

  $('#down').on('click', function(){
    $('#list').css('height', ( parseInt( $('#player-container').height() ) - 135 )+ 'px' );

    $('#list-screen').slideDown(500, function(){
        $(this).show();
    });

  });

  $('#up-arrow').on('click', function(){
    $('#list-screen').slideUp( 500, function(){
      $(this).hide();
    });
  });

  $('#test').on('click', function(){
    Amplitude.skipTo( 42, 2 );
  });
});
