$('.beerData').on('click', '.toggle', function() {
  $('.loader.locationFound').remove();
  var breweryId = $(this).attr('id');
  if($('.beerData .breweryBeers#'+breweryId).length > 0) {
    $('.beerData .breweryBeers#'+breweryId).remove();
  } else {
    $('.breweryBeers').not('.breweryBeers#'+breweryId).remove();
    makeBeerList(breweryId);
  }
});

$('.beerData').on('click', '.findById', function() {
  var beerId = $(this).attr('id');
  $('.beerInfo').remove();
  $.getJSON( "/beer/"+beerId, function(data) {
  })
  .done(function(data) {
    $.each( data, function( key, val ) {
      if(key === 'data') {
        console.log(val);
        var beerInfo = $('<div class="beerInfo"/>')
        .attr('id',val.id)
        .html('<span>Info about this beer!</span>');
        $('.findById#'+val.id).after(beerInfo);
      }
    });
  });
});

function makeBeerList(breweryId) {
  $.getJSON( "/brewery/"+breweryId+"/beers", function(data) {
  // console.log('success');
  })
  .done(function(data) {
    var beerList = $("<div class='breweryBeers'></div>")
    .attr('id', breweryId);
    if(data.data) {
      $('.breweryItem#'+breweryId).after(beerList);
      $.each(data.data, function(key, value) {
        var beerInfo = $('<div/>')
        .attr('id', data.data[key].id)
        .addClass('findById')
        .append('<span class="displayName">'+data.data[key].nameDisplay+'</span>')
        .append('<span class="abv"><span class="bold">ABV:&nbsp;</span>'+data.data[key].abv+'</span>')
        .append('<span class="cta">About...</span>');
        beerList.append(beerInfo);
      });
    } else {
      $('.breweryItem#'+breweryId).after(beerList);
      beerList.append('<div>Sorry, no beer data available for this brewery.</div>');
    }
  });
}

function findNearBeer() {
  var lat = $('div.wrapper').attr('lat');
  var lng = $('div.wrapper').attr('lng');
  $.getJSON( "/findNearBeer/"+lat+"/"+lng, function(data) {
    // console.log('success');
  })
  .done(function(data) {
    $.each( data, function(key, val) {
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
            .html('<span class="icon"><img src="'+icon+'"></span>')
            .append('<div class="breweryName">'+val[m].brewery.name+'</div>')
            .append('<div class="breweryAddress">'+val[m].streetAddress+'</div>')
            .append('<div class="breweryPhone">'+val[m].phone+'</div>')
            .appendTo('.beerData');
            $('.breweryItem#'+val[m].brewery.id).before('<div class="toggle" id="'+val[m].brewery.id+'">Show/hide beers</div>');
          }
        }
    });
  });
}
