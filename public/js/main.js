function makeBeerList(e){$.getJSON("/brewery/"+e+"/beers",function(e){}).done(function(a){var t=$("<div class='breweryBeers'></div>").attr("id",e);a.data?($(".breweryItem#"+e).after(t),$.each(a.data,function(e,r){var n=$("<div/>").attr("id",a.data[e].id).addClass("findById").append('<span class="displayName">'+a.data[e].nameDisplay+"</span>").append('<span class="abv"><span class="bold">ABV:&nbsp;</span>'+a.data[e].abv+"</span>").append('<span class="cta">About...</span>');t.append(n)})):($(".breweryItem#"+e).after(t),t.append("<div>Sorry, no beer data available for this brewery.</div>"))})}function findNearBeer(){var e=$("div.wrapper").attr("lat"),a=$("div.wrapper").attr("lng");$.getJSON("/findNearBeer/"+e+"/"+a,function(e){}).done(function(e){$.each(e,function(e,a){if("data"===e)for(var t,r=0;r<10;r++)t=void 0!==a[r].brewery.images?a[r].brewery.images.icon:"../images/beer.png",$("<div/>").attr("id",a[r].brewery.id).addClass("breweryItem").html('<span class="icon"><img src="'+t+'"></span>').append('<div class="breweryName">'+a[r].brewery.name+"</div>").append('<div class="breweryAddress">'+a[r].streetAddress+"</div>").append('<div class="breweryPhone">'+a[r].phone+"</div>").appendTo(".beerData"),$(".breweryItem#"+a[r].brewery.id).before('<div class="toggle" id="'+a[r].brewery.id+'">Show/hide beers</div>')})})}function findMe(){navigator.geolocation?navigator.geolocation.getCurrentPosition(function(e){var a={lat:e.coords.latitude,lng:e.coords.longitude};fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng="+a.lat+","+a.lng+"&key=AIzaSyDK--2y9KY9N_bTw1WY1qSB0ub_4kuCbmk").then(function(e){return e.json()}).then(function(e){$(".wrapper").attr({lat:a.lat,lng:a.lng}),$(".loader").addClass("locationFound"),$(".display").css("visibility","visible"),findNearBeer();var t={lat:a.lat,lng:a.lng};map=new google.maps.Map(document.getElementById("map"),{center:t,zoom:15}),infowindow=new google.maps.InfoWindow({content:"You are here.",position:t});var r=document.createElement("img");r.src="images/locationIcon.svg",r.style.cursor="pointer",map.controls[google.maps.ControlPosition.TOP_RIGHT].push(r),google.maps.event.addDomListener(r,"click",function(){navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(e){map.panTo({lat:e.coords.latitude,lng:e.coords.longitude})})}),infowindow.open(map)}).catch(function(e){console.log(e)})},function(){handleLocationError(!0,infoWindow,map.getCenter())}):handleLocationError(!1,infoWindow,map.getCenter())}function handleLocationError(e,a,t){a.setPosition(t),a.setContent(e?"Error: The Geolocation service failed.":"Error: Your browser doesn't support geolocation."),a.open(map)}$(".beerData").on("click",".toggle",function(){$(".loader.locationFound").remove();var e=$(this).attr("id");$(".beerData .breweryBeers#"+e).length>0?$(".beerData .breweryBeers#"+e).remove():($(".breweryBeers").not(".breweryBeers#"+e).remove(),makeBeerList(e))}),$(".beerData").on("click",".findById",function(){var e=$(this).attr("id");$(".beerInfo").remove(),$.getJSON("/beer/"+e,function(e){}).done(function(e){var a={};$.each(e,function(e,t){try{a.icon={attr:'<img class="labelImage" src="'+t.labels.medium+'"</img>',text:""}}catch(e){a.icon={attr:'<img class="labelImage" src="../images/beer.png"</img>',text:""}}try{a.nameDisplay={attr:t.nameDisplay,text:"Name: "}}catch(e){}try{a.abv={attr:t.abv,text:"ABV: "}}catch(e){a.abv={attr:"N/A",text:"ABV: "}}try{a.ibu={attr:t.style.ibuMax,text:"IBU: "}}catch(e){}try{a.category={attr:t.style.category.name,text:"Category: "}}catch(e){}try{a.isOrganic={attr:t.isOrganic,text:"Organic: "}}catch(e){}try{a.description={attr:t.available.description,text:"Description: "}}catch(e){}try{a.glassType={attr:t.glass.name,text:"Glass: "}}catch(e){}var r=$('<div class="beerInfo"/>').attr("id",t.id);for(var n in a)$("<div>").html('<span class="attValue">'+a[n].text+"</span>").append('<span class="attribute">'+a[n].attr+"</span>").appendTo(r);$(".findById#"+t.id).after(r)})})});var map,marker,infoWindow;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3BsYXkuanMiLCJtYXBzLmpzIl0sIm5hbWVzIjpbIm1ha2VCZWVyTGlzdCIsImJyZXdlcnlJZCIsIiQiLCJnZXRKU09OIiwiZGF0YSIsImRvbmUiLCJiZWVyTGlzdCIsImF0dHIiLCJhZnRlciIsImVhY2giLCJrZXkiLCJ2YWx1ZSIsImJlZXJJbmZvIiwiaWQiLCJhZGRDbGFzcyIsImFwcGVuZCIsIm5hbWVEaXNwbGF5IiwiYWJ2IiwiZmluZE5lYXJCZWVyIiwibGF0IiwibG5nIiwidmFsIiwiaWNvbiIsIm0iLCJ1bmRlZmluZWQiLCJicmV3ZXJ5IiwiaW1hZ2VzIiwiaHRtbCIsIm5hbWUiLCJzdHJlZXRBZGRyZXNzIiwicGhvbmUiLCJhcHBlbmRUbyIsImJlZm9yZSIsImZpbmRNZSIsIm5hdmlnYXRvciIsImdlb2xvY2F0aW9uIiwiZ2V0Q3VycmVudFBvc2l0aW9uIiwicG9zaXRpb24iLCJwb3MiLCJjb29yZHMiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImNzcyIsImNlbnRlciIsIm1hcCIsImdvb2dsZSIsIm1hcHMiLCJNYXAiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiem9vbSIsImluZm93aW5kb3ciLCJJbmZvV2luZG93IiwiY29udGVudCIsImxvY2F0ZU1lIiwiY3JlYXRlRWxlbWVudCIsInNyYyIsInN0eWxlIiwiY3Vyc29yIiwiY29udHJvbHMiLCJDb250cm9sUG9zaXRpb24iLCJUT1BfUklHSFQiLCJwdXNoIiwiZXZlbnQiLCJhZGREb21MaXN0ZW5lciIsInBhblRvIiwib3BlbiIsImNhdGNoIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwiaGFuZGxlTG9jYXRpb25FcnJvciIsImluZm9XaW5kb3ciLCJnZXRDZW50ZXIiLCJicm93c2VySGFzR2VvbG9jYXRpb24iLCJzZXRQb3NpdGlvbiIsInNldENvbnRlbnQiLCJvbiIsInJlbW92ZSIsInRoaXMiLCJsZW5ndGgiLCJub3QiLCJiZWVySWQiLCJiZWVySW5mb09iaiIsImxhYmVscyIsIm1lZGl1bSIsInRleHQiLCJlIiwiaWJ1IiwiaWJ1TWF4IiwiY2F0ZWdvcnkiLCJpc09yZ2FuaWMiLCJkZXNjcmlwdGlvbiIsImF2YWlsYWJsZSIsImdsYXNzVHlwZSIsImdsYXNzIiwiayIsIm1hcmtlciJdLCJtYXBwaW5ncyI6IkFBMEdBLFNBQUFBLGFBQUFDLEdBQ0FDLEVBQUFDLFFBQUEsWUFBQUYsRUFBQSxTQUFBLFNBQUFHLE1BR0FDLEtBQUEsU0FBQUQsR0FDQSxJQUFBRSxFQUFBSixFQUFBLG9DQUNBSyxLQUFBLEtBQUFOLEdBQ0FHLEVBQUFBLE1BQ0FGLEVBQUEsZ0JBQUFELEdBQUFPLE1BQUFGLEdBQ0FKLEVBQUFPLEtBQUFMLEVBQUFBLEtBQUEsU0FBQU0sRUFBQUMsR0FDQSxJQUFBQyxFQUFBVixFQUFBLFVBQ0FLLEtBQUEsS0FBQUgsRUFBQUEsS0FBQU0sR0FBQUcsSUFDQUMsU0FBQSxZQUNBQyxPQUFBLDZCQUFBWCxFQUFBQSxLQUFBTSxHQUFBTSxZQUFBLFdBQ0FELE9BQUEseURBQUFYLEVBQUFBLEtBQUFNLEdBQUFPLElBQUEsV0FDQUYsT0FBQSxxQ0FDQVQsRUFBQVMsT0FBQUgsT0FHQVYsRUFBQSxnQkFBQUQsR0FBQU8sTUFBQUYsR0FDQUEsRUFBQVMsT0FBQSxpRUFLQSxTQUFBRyxlQUNBLElBQUFDLEVBQUFqQixFQUFBLGVBQUFLLEtBQUEsT0FDQWEsRUFBQWxCLEVBQUEsZUFBQUssS0FBQSxPQUNBTCxFQUFBQyxRQUFBLGlCQUFBZ0IsRUFBQSxJQUFBQyxFQUFBLFNBQUFoQixNQUdBQyxLQUFBLFNBQUFELEdBQ0FGLEVBQUFPLEtBQUFMLEVBQUEsU0FBQU0sRUFBQVcsR0FDQSxHQUFBLFNBQUFYLEVBRUEsSUFBQSxJQURBWSxFQUNBQyxFQUFBLEVBQUFBLEVBQUEsR0FBQUEsSUFFQUQsT0FEQUUsSUFBQUgsRUFBQUUsR0FBQUUsUUFBQUMsT0FDQUwsRUFBQUUsR0FBQUUsUUFBQUMsT0FBQUosS0FFQSxxQkFF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Q0FILEVBQUF2RSxhQUNBVCxLQUFBYyxFQUFBTCxZQUNBMEUsS0FBQSxVQUVBLE1BQUFDLElBR0EsSUFDQUosRUFBQXRFLEtBQ0FWLEtBQUFjLEVBQUFKLElBQ0F5RSxLQUFBLFNBRUEsTUFBQUMsR0FDQUosRUFBQXRFLEtBQ0FWLEtBQUEsTUFDQW1GLEtBQUEsU0FJQSxJQUNBSCxFQUFBSyxLQUNBckYsS0FBQWMsRUFBQXdDLE1BQUFnQyxPQUNBSCxLQUFBLFNBRUEsTUFBQUMsSUFHQSxJQUNBSixFQUFBTyxVQUNBdkYsS0FBQWMsRUFBQXdDLE1BQUFpQyxTQUFBbEUsS0FDQThELEtBQUEsY0FFQSxNQUFBQyxJQUdBLElBQ0FKLEVBQUFRLFdBQ0F4RixLQUFBYyxFQUFBMEUsVUFDQUwsS0FBQSxhQUVBLE1BQUFDLElBR0EsSUFDQUosRUFBQVMsYUFDQXpGLEtBQUFjLEVBQUE0RSxVQUFBRCxZQUNBTixLQUFBLGlCQUVBLE1BQUFDLElBR0EsSUFDQUosRUFBQVcsV0FDQTNGLEtBQUFjLEVBQUE4RSxNQUFBdkUsS0FDQThELEtBQUEsV0FFQSxNQUFBQyxJQUdBLElBQUEvRSxFQUFBVixFQUFBLDJCQUNBSyxLQUFBLEtBQUFjLEVBQUFSLElBQ0EsSUFBQSxJQUFBdUYsS0FBQWIsRUFDQXJGLEVBQUEsU0FDQXlCLEtBQUEsMEJBQUE0RCxFQUFBYSxHQUFBVixLQUFBLFdBQ0EzRSxPQUFBLDJCQUFBd0UsRUFBQWEsR0FBQTdGLEtBQUEsV0FDQXdCLFNBQUFuQixHQUVBVixFQUFBLGFBQUFtQixFQUFBUixJQUFBTCxNQUFBSSxTQ3BHQSxJQUFBb0MsSUFBQXFELE9BQUF6QiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJCgnLmJlZXJEYXRhJykub24oJ2NsaWNrJywgJy50b2dnbGUnLCBmdW5jdGlvbigpIHtcbiAgJCgnLmxvYWRlci5sb2NhdGlvbkZvdW5kJykucmVtb3ZlKCk7XG4gIHZhciBicmV3ZXJ5SWQgPSAkKHRoaXMpLmF0dHIoJ2lkJyk7XG4gIGlmKCQoJy5iZWVyRGF0YSAuYnJld2VyeUJlZXJzIycrYnJld2VyeUlkKS5sZW5ndGggPiAwKSB7XG4gICAgJCgnLmJlZXJEYXRhIC5icmV3ZXJ5QmVlcnMjJyticmV3ZXJ5SWQpLnJlbW92ZSgpO1xuICB9IGVsc2Uge1xuICAgICQoJy5icmV3ZXJ5QmVlcnMnKS5ub3QoJy5icmV3ZXJ5QmVlcnMjJyticmV3ZXJ5SWQpLnJlbW92ZSgpO1xuICAgIG1ha2VCZWVyTGlzdChicmV3ZXJ5SWQpO1xuICB9XG59KTtcblxuJCgnLmJlZXJEYXRhJykub24oJ2NsaWNrJywgJy5maW5kQnlJZCcsIGZ1bmN0aW9uKCkge1xuICB2YXIgYmVlcklkID0gJCh0aGlzKS5hdHRyKCdpZCcpO1xuICAkKCcuYmVlckluZm8nKS5yZW1vdmUoKTtcbiAgJC5nZXRKU09OKCBcIi9iZWVyL1wiK2JlZXJJZCwgZnVuY3Rpb24oZGF0YSkge1xuICB9KVxuICAuZG9uZShmdW5jdGlvbihkYXRhKSB7XG4gICAgdmFyIGJlZXJJbmZvT2JqID0ge307XG4gICAgJC5lYWNoKCBkYXRhLCBmdW5jdGlvbigga2V5LCB2YWwgKSB7XG5cbiAgICAgICAgICB0cnkgIHtcbiAgICAgICAgICAgIGJlZXJJbmZvT2JqLmljb24gPSB7XG4gICAgICAgICAgICAgICdhdHRyJyA6ICc8aW1nIGNsYXNzPVwibGFiZWxJbWFnZVwiIHNyYz1cIicrdmFsLmxhYmVscy5tZWRpdW0rJ1wiPC9pbWc+JyxcbiAgICAgICAgICAgICAgJ3RleHQnIDogJydcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICBiZWVySW5mb09iai5pY29uID0ge1xuICAgICAgICAgICAgICAnYXR0cicgOiAnPGltZyBjbGFzcz1cImxhYmVsSW1hZ2VcIiBzcmM9XCIuLi9pbWFnZXMvYmVlci5wbmdcIjwvaW1nPicsXG4gICAgICAgICAgICAgICd0ZXh0JyA6ICcnXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRyeSAge1xuICAgICAgICAgICAgYmVlckluZm9PYmoubmFtZURpc3BsYXkgPSB7XG4gICAgICAgICAgICAgICdhdHRyJyA6IHZhbC5uYW1lRGlzcGxheSxcbiAgICAgICAgICAgICAgJ3RleHQnIDogJ05hbWU6ICdcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdHJ5ICB7XG4gICAgICAgICAgICBiZWVySW5mb09iai5hYnYgPSB7XG4gICAgICAgICAgICAgICdhdHRyJyA6IHZhbC5hYnYsXG4gICAgICAgICAgICAgICd0ZXh0JyA6ICdBQlY6ICdcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgIGJlZXJJbmZvT2JqLmFidiA9IHtcbiAgICAgICAgICAgICAgICAnYXR0cicgOiAnTi9BJyxcbiAgICAgICAgICAgICAgICAndGV4dCcgOiAnQUJWOiAnXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdHJ5ICB7XG4gICAgICAgICAgICBiZWVySW5mb09iai5pYnUgPSB7XG4gICAgICAgICAgICAgICdhdHRyJyA6IHZhbC5zdHlsZS5pYnVNYXgsXG4gICAgICAgICAgICAgICd0ZXh0JyA6ICdJQlU6ICdcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdHJ5ICB7XG4gICAgICAgICAgICBiZWVySW5mb09iai5jYXRlZ29yeSA9IHtcbiAgICAgICAgICAgICAgJ2F0dHInIDogdmFsLnN0eWxlLmNhdGVnb3J5Lm5hbWUsXG4gICAgICAgICAgICAgICd0ZXh0JyA6ICdDYXRlZ29yeTogJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0cnkgIHtcbiAgICAgICAgICAgIGJlZXJJbmZvT2JqLmlzT3JnYW5pYyA9IHtcbiAgICAgICAgICAgICAgJ2F0dHInIDogdmFsLmlzT3JnYW5pYyxcbiAgICAgICAgICAgICAgJ3RleHQnIDogJ09yZ2FuaWM6ICdcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdHJ5ICB7XG4gICAgICAgICAgICBiZWVySW5mb09iai5kZXNjcmlwdGlvbiA9IHtcbiAgICAgICAgICAgICAgJ2F0dHInIDogdmFsLmF2YWlsYWJsZS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgJ3RleHQnIDogJ0Rlc2NyaXB0aW9uOiAnXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRyeSAge1xuICAgICAgICAgICAgYmVlckluZm9PYmouZ2xhc3NUeXBlID0ge1xuICAgICAgICAgICAgICAnYXR0cicgOiB2YWwuZ2xhc3MubmFtZSxcbiAgICAgICAgICAgICAgJ3RleHQnIDogJ0dsYXNzOiAnXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBiZWVySW5mbyA9ICQoJzxkaXYgY2xhc3M9XCJiZWVySW5mb1wiLz4nKVxuICAgICAgICAgIC5hdHRyKCdpZCcsIHZhbC5pZCk7XG4gICAgICAgICAgZm9yICh2YXIgayBpbiBiZWVySW5mb09iaikge1xuICAgICAgICAgICAgICAkKCc8ZGl2PicpXG4gICAgICAgICAgICAgICAgICAuaHRtbCgnPHNwYW4gY2xhc3M9XCJhdHRWYWx1ZVwiPicrYmVlckluZm9PYmpba10udGV4dCsnPC9zcGFuPicpXG4gICAgICAgICAgICAgICAgICAuYXBwZW5kKCc8c3BhbiBjbGFzcz1cImF0dHJpYnV0ZVwiPicrYmVlckluZm9PYmpba10uYXR0cisnPC9zcGFuPicpXG4gICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oYmVlckluZm8pO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkKCcuZmluZEJ5SWQjJyt2YWwuaWQpLmFmdGVyKGJlZXJJbmZvKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG5cbmZ1bmN0aW9uIG1ha2VCZWVyTGlzdChicmV3ZXJ5SWQpIHtcbiAgJC5nZXRKU09OKCBcIi9icmV3ZXJ5L1wiK2JyZXdlcnlJZCtcIi9iZWVyc1wiLCBmdW5jdGlvbihkYXRhKSB7XG4gIC8vIGNvbnNvbGUubG9nKCdzdWNjZXNzJyk7XG4gIH0pXG4gIC5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICB2YXIgYmVlckxpc3QgPSAkKFwiPGRpdiBjbGFzcz0nYnJld2VyeUJlZXJzJz48L2Rpdj5cIilcbiAgICAuYXR0cignaWQnLCBicmV3ZXJ5SWQpO1xuICAgIGlmKGRhdGEuZGF0YSkge1xuICAgICAgJCgnLmJyZXdlcnlJdGVtIycrYnJld2VyeUlkKS5hZnRlcihiZWVyTGlzdCk7XG4gICAgICAkLmVhY2goZGF0YS5kYXRhLCBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICAgIHZhciBiZWVySW5mbyA9ICQoJzxkaXYvPicpXG4gICAgICAgIC5hdHRyKCdpZCcsIGRhdGEuZGF0YVtrZXldLmlkKVxuICAgICAgICAuYWRkQ2xhc3MoJ2ZpbmRCeUlkJylcbiAgICAgICAgLmFwcGVuZCgnPHNwYW4gY2xhc3M9XCJkaXNwbGF5TmFtZVwiPicrZGF0YS5kYXRhW2tleV0ubmFtZURpc3BsYXkrJzwvc3Bhbj4nKVxuICAgICAgICAuYXBwZW5kKCc8c3BhbiBjbGFzcz1cImFidlwiPjxzcGFuIGNsYXNzPVwiYm9sZFwiPkFCVjombmJzcDs8L3NwYW4+JytkYXRhLmRhdGFba2V5XS5hYnYrJzwvc3Bhbj4nKVxuICAgICAgICAuYXBwZW5kKCc8c3BhbiBjbGFzcz1cImN0YVwiPkFib3V0Li4uPC9zcGFuPicpO1xuICAgICAgICBiZWVyTGlzdC5hcHBlbmQoYmVlckluZm8pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoJy5icmV3ZXJ5SXRlbSMnK2JyZXdlcnlJZCkuYWZ0ZXIoYmVlckxpc3QpO1xuICAgICAgYmVlckxpc3QuYXBwZW5kKCc8ZGl2PlNvcnJ5LCBubyBiZWVyIGRhdGEgYXZhaWxhYmxlIGZvciB0aGlzIGJyZXdlcnkuPC9kaXY+Jyk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gZmluZE5lYXJCZWVyKCkge1xuICB2YXIgbGF0ID0gJCgnZGl2LndyYXBwZXInKS5hdHRyKCdsYXQnKTtcbiAgdmFyIGxuZyA9ICQoJ2Rpdi53cmFwcGVyJykuYXR0cignbG5nJyk7XG4gICAgJC5nZXRKU09OKCBcIi9maW5kTmVhckJlZXIvXCIrbGF0K1wiL1wiK2xuZywgZnVuY3Rpb24oZGF0YSkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdzdWNjZXNzJyk7XG4gICAgfSlcbiAgICAgIC5kb25lKGZ1bmN0aW9uKGRhdGEpe1xuICAgICQuZWFjaCggZGF0YSwgZnVuY3Rpb24oa2V5LCB2YWwpIHtcbiAgICAgICAgaWYoa2V5ID09PSAnZGF0YScpIHtcbiAgICAgICAgICB2YXIgaWNvbjtcbiAgICAgICAgICBmb3IgKHZhciBtID0gMDsgbSA8IDEwOyBtKyspIHtcbiAgICAgICAgICAgIGlmKHZhbFttXS5icmV3ZXJ5LmltYWdlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGljb24gPSB2YWxbbV0uYnJld2VyeS5pbWFnZXMuaWNvbjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGljb24gPSAnLi4vaW1hZ2VzL2JlZXIucG5nJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQoJzxkaXYvPicpXG4gICAgICAgICAgICAuYXR0cignaWQnLHZhbFttXS5icmV3ZXJ5LmlkKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdicmV3ZXJ5SXRlbScpXG4gICAgICAgICAgICAuaHRtbCgnPHNwYW4gY2xhc3M9XCJpY29uXCI+PGltZyBzcmM9XCInK2ljb24rJ1wiPjwvc3Bhbj4nKVxuICAgICAgICAgICAgLmFwcGVuZCgnPGRpdiBjbGFzcz1cImJyZXdlcnlOYW1lXCI+Jyt2YWxbbV0uYnJld2VyeS5uYW1lKyc8L2Rpdj4nKVxuICAgICAgICAgICAgLmFwcGVuZCgnPGRpdiBjbGFzcz1cImJyZXdlcnlBZGRyZXNzXCI+Jyt2YWxbbV0uc3RyZWV0QWRkcmVzcysnPC9kaXY+JylcbiAgICAgICAgICAgIC5hcHBlbmQoJzxkaXYgY2xhc3M9XCJicmV3ZXJ5UGhvbmVcIj4nK3ZhbFttXS5waG9uZSsnPC9kaXY+JylcbiAgICAgICAgICAgIC5hcHBlbmRUbygnLmJlZXJEYXRhJyk7XG4gICAgICAgICAgICAkKCcuYnJld2VyeUl0ZW0jJyt2YWxbbV0uYnJld2VyeS5pZCkuYmVmb3JlKCc8ZGl2IGNsYXNzPVwidG9nZ2xlXCIgaWQ9XCInK3ZhbFttXS5icmV3ZXJ5LmlkKydcIj5TaG93L2hpZGUgYmVlcnM8L2Rpdj4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG4iLCJ2YXIgbWFwLCBtYXJrZXIsIGluZm9XaW5kb3c7XG5mdW5jdGlvbiBmaW5kTWUoKSB7XG4gICAvLyBUcnkgSFRNTDUgZ2VvbG9jYXRpb24uXG5pZiAobmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XG4gIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oZnVuY3Rpb24ocG9zaXRpb24pIHtcbiAgdmFyIHBvcyA9IHtcbiAgICBsYXQ6IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSxcbiAgICBsbmc6IHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGVcbiAgfTtcbiAgZmV0Y2goJ2h0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9nZW9jb2RlL2pzb24/bGF0bG5nPScrcG9zLmxhdCsnLCcrcG9zLmxuZysnJmtleT1BSXphU3lESy0tMnk5S1k5Tl9iVHcxV1kxcVNCMHViXzRrdUNibWsnKVxuICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7IHJldHVybiByZXNwb25zZS5qc29uKCk7IH0pXG4gICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgJCgnLndyYXBwZXInKS5hdHRyKHtcbiAgICAgICAgbGF0IDogcG9zLmxhdCxcbiAgICAgICAgbG5nIDogcG9zLmxuZ1xuICAgICAgfSk7XG4gICAgICAkKCcubG9hZGVyJykuYWRkQ2xhc3MoJ2xvY2F0aW9uRm91bmQnKTtcbiAgICAgICQoJy5kaXNwbGF5JykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcbiAgICAgIGZpbmROZWFyQmVlcigpO1xuICAgICAgdmFyIGNlbnRlciA9IHsnbGF0JzogcG9zLmxhdCwgJ2xuZyc6IHBvcy5sbmd9O1xuICAgICAgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyksIHtcbiAgICAgICAgY2VudGVyOiBjZW50ZXIsXG4gICAgICAgIHpvb206IDE1LFxuICAgICAgfSk7XG4gICAgICBpbmZvd2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coe1xuICAgICAgICAgIGNvbnRlbnQ6ICdZb3UgYXJlIGhlcmUuJyxcbiAgICAgICAgICBwb3NpdGlvbjogY2VudGVyXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBsb2NhdGVNZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBsb2NhdGVNZS5zcmMgPSBcImltYWdlcy9sb2NhdGlvbkljb24uc3ZnXCI7XG4gICAgICAgIGxvY2F0ZU1lLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgICAgICBtYXAuY29udHJvbHNbZ29vZ2xlLm1hcHMuQ29udHJvbFBvc2l0aW9uLlRPUF9SSUdIVF0ucHVzaChsb2NhdGVNZSk7XG5cbiAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXIobG9jYXRlTWUsICdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgaWYgKG5hdmlnYXRvci5nZW9sb2NhdGlvbikge1xuICAgICAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihcbiAgICAgICAgICBcdGZ1bmN0aW9uIGxvY2F0aW9uQWxsb3dlZChwb3NpdGlvbikge1xuICAgICAgICAgICAgICBtYXAucGFuVG8oe2xhdDogcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlLCBsbmc6IHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGV9KTtcbiAgICAgICAgICBcdH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICBpbmZvd2luZG93Lm9wZW4obWFwKTtcbiAgICB9KVxuICAgIC5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH0pO1xuICB9LCBmdW5jdGlvbigpIHtcbiAgICBoYW5kbGVMb2NhdGlvbkVycm9yKHRydWUsIGluZm9XaW5kb3csIG1hcC5nZXRDZW50ZXIoKSk7XG4gIH0pO1xuICB9IGVsc2Uge1xuICAgIC8vIEJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IEdlb2xvY2F0aW9uXG4gICAgaGFuZGxlTG9jYXRpb25FcnJvcihmYWxzZSwgaW5mb1dpbmRvdywgbWFwLmdldENlbnRlcigpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVMb2NhdGlvbkVycm9yKGJyb3dzZXJIYXNHZW9sb2NhdGlvbiwgaW5mb1dpbmRvdywgcG9zKSB7XG4gIGluZm9XaW5kb3cuc2V0UG9zaXRpb24ocG9zKTtcbiAgaW5mb1dpbmRvdy5zZXRDb250ZW50KGJyb3dzZXJIYXNHZW9sb2NhdGlvbiA/XG4gICAgJ0Vycm9yOiBUaGUgR2VvbG9jYXRpb24gc2VydmljZSBmYWlsZWQuJyA6XG4gICAgJ0Vycm9yOiBZb3VyIGJyb3dzZXIgZG9lc25cXCd0IHN1cHBvcnQgZ2VvbG9jYXRpb24uJyk7XG4gIGluZm9XaW5kb3cub3BlbihtYXApO1xufVxuIl19
