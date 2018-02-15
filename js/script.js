var defaultCenter = [40.713435,-73.971291];
var defaultZoom = 10;

var map = L.map('my-map').setView(defaultCenter, defaultZoom);

L.tileLayer('https://a.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var dishList = [
  {
    name: 'xxx',
    place: "abc",
    lat: 40.730376,
    lon: -74.0008582,
    time: 'day',
  },
  {
    name: 'yyy',
    place: "def",
    lat: 41.730376,
    lon: -73.0008582,
    time: 'night',
  },
  {
    name: 'zzz',
    place: "ghi",
    lat: 39.730376,
    lon: -75.0008582,
    time: 'either',
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
  if (dishObject.time === 'either') timeColor = 'orange';

  var options = {
    radius: 6,
    opacity: 1,
    fillColor: timeColor,
    fillOpacity: 0.9,
    color: '#FFF',
    weight: 2,
  };

  var marker = L.circleMarker(latLon, options)
      .bindPopup('Try' + dishObject.name + 'at' +  dishObject.place + 'during'+dishObject.time+'time', {offset: [0, -6]})
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