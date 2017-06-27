var map, infoWindow;
 function initMap() {
  //  map = new google.maps.Map(document.getElementById('map'), {
  //    center: {lat: 45.5231, lng: -122.6765},
  //    zoom: 14
  //  });
  //  infoWindow = new google.maps.InfoWindow();

   // Try HTML5 geolocation.
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function(position) {
       var pos = {
         lat: position.coords.latitude,
         lng: position.coords.longitude
       };
       $('div#findNearBeer').attr({
         lat : pos.lat,
         lng : pos.lng
       });
      // Is it quicker to get a street address or a latlng?
      // find address
      // https://maps.googleapis.com/maps/api/geocode/json?latlng='+pos.lat+','+pos.lng&key=AIzaSyDK--2y9KY9N_bTw1WY1qSB0ub_4kuCbmk
      //  map.setCenter(pos);
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
