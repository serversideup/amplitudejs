$(document).ready(function(){
  $('.visualization-toggle').on('click', function(){
    if( $(this).hasClass('visualization-off') ){
      $(this).removeClass('visualization-off');
      $(this).addClass('visualization-on');
      $('#large-now-playing-album-art').css('display', 'none');
      $('#large-visualization').show();
    }else{
      $(this).removeClass('visualization-on');
      $(this).addClass('visualization-off');
      $('#large-now-playing-album-art').css('display', 'block');
      $('#large-visualization').hide();
    }
  });

  $('.arrow-up-icon').on('click', function(){
    $('#visualizations-player-playlist').show();
  });

  $('.arrow-down-icon').on('click', function(){
    $('#visualizations-player-playlist').hide();
  });
});
