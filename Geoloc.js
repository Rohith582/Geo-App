var map = L.map('map').setView([28.6562, 77.2410], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; OpenStreetMap contributors',
  maxZoom: 18
}).addTo(map);
var locationTableBody = document.getElementById('locationTableBody');
var coordinates = [];

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

function showPosition(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  var accuracy = position.coords.accuracy;

  // Add marker to the map
  L.marker([latitude, longitude]).addTo(map).bindPopup(`Latitude: ${latitude}<br>Longitude: ${longitude}<br>Accuracy: ${accuracy}m`).openPopup();


  // Add a circle to represent the accuracy of the current location
  L.circle([latitude, longitude], {
    radius: accuracy,
    fillColor: '#007bff',
    fillOpacity: 0.2,
    stroke: false
  }).addTo(map);

  // Adjust map view to the center
  map.setView([latitude, longitude], 13);

  // Remove older rows if table has more than 10 rows
  if (locationTableBody.rows.length > 10) {
    locationTableBody.deleteRow(locationTableBody.rows.length - 1);
  }

  // Add the latest location to the top of the table
  var latestRow = locationTableBody.insertRow(0);
  var latestLatitudeCell = latestRow.insertCell(0);
  var latestLongitudeCell = latestRow.insertCell(1);
  var latestAccuracyCell = latestRow.insertCell(2);
  latestLatitudeCell.innerHTML = latitude;
  latestLongitudeCell.innerHTML = longitude;
  latestAccuracyCell.innerHTML = accuracy + 'm';

  // Add the coordinates to the array
  coordinates.push([latitude, longitude]);
}

function exportCoordinatesAsGeoJSON() {
  var geojson = {
    type: "FeatureCollection",
    features: []
  };

  for (var i = 0; i < coordinates.length; i++) {
    var lat = coordinates[i][0];
    var lng = coordinates[i][1];

    var feature = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [lng, lat]
      },
      properties: {}
    };

    geojson.features.push(feature);
  }

  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(geojson));
  var downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "coordinates.geojson");
  downloadAnchor.click();
}

function showLocationTable() {
  var locationTable = document.getElementById('locationTable');
  locationTable.classList.remove('hidden');
}