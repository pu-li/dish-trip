var defaultCenter = [40.713435,-73.971291];
var defaultZoom = 10;

var map = L.map('my-map').setView(defaultCenter, defaultZoom);

L.tileLayer('https://a.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var dishList = [
  {
    name: 'Bun',
    place: "abc",
    lat: 40.700000,
    lon: -74.000000,
    time: 'day',
  },
  {
    name: 'Burger',
    place: "def",
    lat: 41.100000,
    lon: -73.800000,
    time: 'night',
  },
  {
    name: 'Bowl',
    place: "ghi",
    lat: 40.400000,
    lon: -74.200000,
    time: 'any',
  },
];


// create an empty markers array that we can fill with markers
var markersArray = [];

// how to add a marker for each object in the array

dishList.forEach(function(dishObject) {
  var latLon = [dishObject.lat, dishObject.lon];

  var timeColor = '#FFF';

  if (dishObject.time === 'day') timeColor = 'green';
  if (dishObject.time === 'night') timeColor = 'blue';
  if (dishObject.time === 'any') timeColor = 'orange';

  var options = {
    radius: 6,
    opacity: 1,
    fillColor: timeColor,
    fillOpacity: 0.9,
    color: '#FFF',
    weight: 2,
  };

  var marker = L.circleMarker(latLon, options)
      .bindPopup('Try ' + dishObject.place + '"'"s"'" ' +  dishObject.name + ' at '+dishObject.time+' time.', {offset: [0, -6]})
      .addTo(map)
  // add the marker to the markersArray
  markersArray.push(marker);
});

$('.fly-to-random').click(function(e) {
  var randomMarker = markersArray[Math.floor(Math.random() * markersArray.length)];
  map.setView(randomMarker._latlng);
  randomMarker.openPopup();
  e.stopPropagation();
});


$('.reset').click(function() {
  map.flyTo(defaultCenter, defaultZoom)
});
