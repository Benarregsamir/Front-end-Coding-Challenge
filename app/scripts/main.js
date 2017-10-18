jQuery(document).ready(function() {
  jQuery('.bxslider').bxSlider({
    pager: false
  });
});

function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(51.508742, -0.120850),
    zoom: 18,
    panControl: false,
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      position: google.maps.ControlPosition.TOP_LEFT
    },
    fullscreenControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    overviewMapControl: true,
    rotateControl: true
  });

  var input = document.getElementById('map-search-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });
  var markers = [];
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("No result");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
      var iconBase = '/Applications/MAMP/htdocs/Front_end_Coding_Challenge/images/';
      markers.push(new google.maps.Marker({
        map: map,
        icon: iconBase + 'markers.png',
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}
