$('div#findByID').click(function(){
  $('li.beerInfo').remove();
  $.getJSON( "/beer/cBLTUw", function( data ) {
    $.each( data, function( key, val ) {
      if(key === 'data') {
        var stuff = [];
        stuff.push(val.id,val.name);
        $.each(stuff, function(index, value){
          $('<li/>')
            .addClass('beerInfo')
            .text(stuff[index])
            .appendTo('ul#beerData');
        });
      }
    });
  });
});


$('div#findNearBeer').click(function(){
  var lat = $('div#findNearBeer').attr('lat');
  var lng = $('div#findNearBeer').attr('lng');
  $('li.beerInfo').remove();
  $.getJSON( "/findNearBeer/"+lat+"/"+lng, function( data ) {
    $.each( data, function( key, val ) {
        if(key === 'data') {
        $.each(val, function(index, value){
          $('<li/>')
              .addClass('beerInfo')
              .text(val[index].brewery.id)
              .appendTo('ul#beerData');
        });
        }
    });
  });
});
