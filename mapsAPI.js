function initialize() {
  // Create a <script> tag and set the USGS URL as the source.
  var script = document.createElement('script');
  // (In this example we use a locally stored copy instead.)
  // script.src = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp';
  script.src = 'render.js';
  document.getElementsByTagName('head')[0].appendChild(script);
}

window.eqfeed_callback = function(data) {
  var gm = google.maps,
    mapSize = new gm.Size(256, 256), // original size, fallback for space invador images
    scaledSize = new gm.Size(20, 20), // size on map, fallback for space invador images
    anchor = new gm.Point(0, 32), // start point
    map = new gm.Map(document.getElementById('map'), {
      zoom: 2,
      minZoom: 2,
      center: new gm.LatLng(10, 15),
      mapTypeId: 'terrain',
      //disableDefaultUI: true,
      mapTypeControl: false,
      panControl: false,
      //scaleControl: false,
      scrollwheel: false,
      streetViewControl: false,
      //zoomControl: false,
      //draggable: false,
      styles: [
        {
          featureType: 'administrative',
          elementType: 'geometry',
          stylers: [{visibility: 'off'}],
        },
        {
          featureType: 'administrative.country',
          stylers: [{visibility: 'off'}],
        },
        {
          featureType: 'water',
          elementType: 'labels',
          stylers: [{visibility: 'off'}],
        },
        {
          featureType: 'administrative',
          elementType: 'labels',
          stylers: [{visibility: 'off'}],
        },
      ],
    }),
    // Loop through the results array and create a marker for each set of coordinates.
    markers = data.features.map(function(coords) {
      var coordinates = coords.geometry.coordinates,
        username = coords.properties.username;

      return new gm.Marker({
        position: new gm.LatLng(coordinates[1], coordinates[0]),
        map: map,
        title: username,
        icon: {
          url: 'https://github.com/' + username + '.png?size=20',
          size: mapSize,
          scaledSize: scaledSize,
          anchor: anchor,
        },
      });
    });

  new MarkerClusterer(map, markers, {
    imagePath: '../images/cluster/m',
    averageCenter: true,
    minimumClusterSize: 42,
  });
};
