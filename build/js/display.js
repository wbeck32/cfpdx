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
            .attr('id',val.id)
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
          console.log(val[index]);
          $('<li/>')
              .addClass('beerInfo')
              .attr('id',val[index].brewery.id)
              .text(val[index].brewery.name)
              .append('<br>'+val[index].streetAddress)
              .appendTo('ul#beerData');
        });
        }
    });
  });
});
