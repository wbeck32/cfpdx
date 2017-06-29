function getBeerInfo (beerId) {
$('.breweryBeers').remove();
  $.getJSON( "/beer/"+beerId, function( data ) {
    $.each( data, function( key, val ) {
      if(key === 'data') {
        console.log(val);
        // $.each(stuff, function(index, value){
        //   $('<li/>')
        //     .addClass('beerInfo')
        //     .attr('id',val.id)
        //     .text(stuff[index])
        //     .appendTo('.findById');
        // });
      }
    });
  });
}


$('div#findNearBeer').click(function(){
  var lat = $('div#findNearBeer').attr('lat');
  var lng = $('div#findNearBeer').attr('lng');
  $('li.beerInfo').remove();
  $.getJSON( "/findNearBeer/"+lat+"/"+lng, function( data ) {
    $.each( data, function( key, val ) {
        if(key === 'data') {
        var icon;
        for (var m = 0; m < 10; m++) {
          if(val[m].brewery.images !== undefined) {
            icon = val[m].brewery.images.icon;
          } else {
            icon = '../images/beer.png';
          }
          $('<li/>')
              // .addClass('beerInfo').bind('click', function(){$('.breweryBeers').remove();})
              .attr('id',val[m].brewery.id)
              .append('<span class="icon"><img src="'+icon+'"></span>')
              .append('<span><div class="breweryName">'+val[m].brewery.name+'</div>')
              .append('<div class="breweryAddress">'+val[m].streetAddress+'</div>')
              .append('<div class="breweryPhone">'+val[m].phone+'</div></span>')
              .appendTo('ul#beerData');
          }
        }
    });
  });
});

$('ul#beerData').on('click', 'li', function(event){
    var breweryId = $(this).attr('id');
    $.getJSON( "/brewery/"+breweryId+"/beers", function( data ) {
      if(data.data) {
        var listDiv = $( "<div class='breweryBeers'></div>")
            .appendTo('li#'+breweryId);
        $.each(data.data, function(key, value){
        var beersDiv = $('<div/>')
            .attr('id', data.data[key].id)
            .appendTo(listDiv);
        $('<span class="findById"/>')
            .html('<span class="displayName">'+data.data[key].nameDisplay+'</span>')
            .append('<span class="abv">'+data.data[key].abv+'</span>')
            .click(function(){getBeerInfo(data.data[key].id);})
            .appendTo(beersDiv);
          });
        } else {
          $('<div class="breweryBeers"></div>')
              .html('<div>Sorry, no beer data available for this brewery.</div>')
              .appendTo('li#'+breweryId);
        }
    });
});
