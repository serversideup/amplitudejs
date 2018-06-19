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
  });
});
