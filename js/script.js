var defaultCenter = [40.721000,-73.992000];
var defaultZoom = 13.5;

var map = L.map('my-map').setView(defaultCenter, defaultZoom);

L.tileLayer('https://a.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

getPlaces((places) => {

  places.forEach((place) => {

    const latLon = [place.lat, place.lon];

    const timePalette = {
      day: 'green',
      night: 'seagreen',
      any: 'springgreen',
    };

     const placeColor = timePalette[place.time];

     const circleOptions = {
  stroke: false,
  radius: 6,
  fillOpacity: 0.8,
  fillColor: placeColor,
  width: 0
}

L.circleMarker(latLon, circleOptions).addTo(map)
    .bindPopup('Try ' + place.name + "'s "  +  place.dish + '!  Adress: '+ place.address +'.  Directions: ' +place.directions+, {offset: [0, -6]})
});
});
// at '+place.time+' time



$('.fly-to-random').click(function(e) {
  var randomMarker = circleOptions[Math.floor(Math.random() * circleOptions.length)];
  map.setView(circleOptions._latlng);
  randomMarker.openPopup();
  e.stopPropagation();
});


$('.reset').click(function() {
  map.flyTo(defaultCenter, defaultZoom)
});




function getPlaces(callback) {
  $.ajax({
    //url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTtDhxGKMcnLTHkSHCURW5HACFOSPSOOGSTpEY3C7PH8Rk1Nq8ZFVvhihfVEQmGB25iyQ3e9B3ADLgY/pub?gid=0&single=true&output=csv",
    url: "https://docs.google.com/a/nyu.edu/spreadsheets/d/e/2PACX-1vR0U1U5LUntXBlL7dUerd_omGZgR4MbND_iL4vhaAleybjLKup7UJ9m9cR2fSr9TkL7T5Un48MzeBDZ/pub?output=csv",
    type: "GET"
  }).done((csv) => {
    const places = Papa.parse(csv, {header: true}).data;
    callback(places);
  });
}
