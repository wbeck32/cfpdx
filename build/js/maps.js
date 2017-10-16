var map, marker, infoWindow;
function findMe() {
   // Try HTML5 geolocation.
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
  var pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.lng}&key=AIzaSyDK--2y9KY9N_bTw1WY1qSB0ub_4kuCbmk`)
    .then(function(response) { return response.json(); })
    .then(function(data) {
      $('.wrapper').attr({
        lat : pos.lat,
        lng : pos.lng
      });
      $('.loader').addClass('locationFound');
      $('.display').css('visibility', 'visible');
      findNearBeer();
      var center = {'lat': pos.lat, 'lng': pos.lng};
      map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 15,
      });
      infowindow = new google.maps.InfoWindow({
          content: 'You are here.',
          position: center
        });

        var locateMe = document.createElement('img');
        locateMe.src = "images/locationIcon.svg";
        locateMe.style.cursor = "pointer";
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(locateMe);

        google.maps.event.addDomListener(locateMe, 'click', function(){
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
          	function locationAllowed(position) {
              map.panTo({lat: position.coords.latitude, lng: position.coords.longitude});
          	});
          }
        });
      infowindow.open(map);
    })
    .catch(function(error) {
      console.log(error);
    });
  }, function() {
    handleLocationError(true, infoWindow, map.getCenter());
  });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
