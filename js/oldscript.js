var defaultCenter = [40.721000,-73.992000];
var defaultZoom = 13.5;

var map = L.map('my-map').setView(defaultCenter, defaultZoom);

L.tileLayer('https://a.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


var dishList = [
  {
    name: 'Uncle Jesse Bao',
    place: "Baohaus",
    lat: 40.7324882,
    lon: -73.9856561,
    time: 'day',
  },
  {
    name: 'Eggplant & Eringi Hirata Buns',
    place: "Ippudo",
    lat: 40.730948,
    lon: -73.990287,
    time: 'day',
  },
  {
    name: 'Carrot Waffles + Korean Fried Broccoli',
    place: "Dirt Candy",
    lat: 40.7179086,
    lon: -73.990717,
    time: 'night',
  },
  {
    name: 'Veggie Pho',
    place: "V-Nam Cafe",
    lat: 40.7235639,
    lon: -73.9879485,
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
      .bindPopup('Try ' + dishObject.place + "'s "  +  dishObject.name + ' at '+dishObject.time+' time.', {offset: [0, -6]})
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
