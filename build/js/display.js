function getBeerInfo (beerId, breweryId) {
  $.getJSON( "/beer/"+beerId, function( data ) {
    $.each( data, function( key, val ) {
      if(key === 'data') {
          console.log(val);
          $('<div class="beerInfo"/>')
            .attr('id',val.id)
            .appendTo('.findById');
        }
      });
    });
  }


$('div#findNearBeer').click(function(){
  var lat = $('div.wrapper').attr('lat');
  var lng = $('div.wrapper').attr('lng');
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
          $('<div/>')
              .attr('id',val[m].brewery.id)
              .addClass('breweryItem')
              .append('<span class="icon"><img src="'+icon+'"></span>')
              .append('<span><div class="breweryName">'+val[m].brewery.name+'</div>')
              .append('<div class="breweryAddress">'+val[m].streetAddress+'</div>')
              .append('<div class="breweryPhone">'+val[m].phone+'</div></span>')
              .appendTo('div#beerData');
          }
        }
    });
  });
});

$('div#beerData').on('click', '.breweryItem', function(){
  var breweryId = $(this).attr('id');
  console.log(breweryId);
  $('div.breweryBeers').not('.breweryItem div#'+breweryId).remove();
    var lat = $('div.wrapper').attr('lat');
    var lng = $('div.wrapper').attr('lng');
    var myLatlng = new google.maps.LatLng(parseFloat(lat),parseFloat(lng));
    marker = new google.maps.Marker({
      position: myLatlng,
      map: map
    });
    marker.setMap(map);
    $.getJSON( "/brewery/"+breweryId+"/beers", function( data ) {
      if(data.data) {
        var listDiv = $( "<div class='breweryBeers'></div>")
            .appendTo('div#'+breweryId);
        $.each(data.data, function(key, value){
        $('<div class="findById" id="'+data.data[key].id+'"/>')
            .html('<span class="displayName">'+data.data[key].nameDisplay+'</span>')
            .append('<span class="abv">'+data.data[key].abv+'</span>')
            .click(function(){getBeerInfo(data.data[key].id, breweryId);})
            .appendTo(listDiv);
          });
        } else {
          $('<div class="breweryBeers"></div>')
              .html('<div>Sorry, no beer data available for this brewery.</div>')
              .appendTo('div#'+breweryId);
        }
    });
});
