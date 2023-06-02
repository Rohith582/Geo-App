var map = L.map('map').setView([28.6562, 77.2410], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; OpenStreetMap contributors',
  maxZoom: 18
}).addTo(map);
var marker;
var polyline;
var coordinates = [];
var recordingInterval;
var startPointMarker;
var endPointMarker;

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(function (position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    if (marker) {
      marker.setLatLng([lat, lng]).update();
    } else {
      marker = L.marker([lat, lng]).addTo(map);
    }
    map.setView([lat, lng], 13);
    marker.bindPopup("Current Location: " + lat.toFixed(6) + ", " + lng.toFixed(6)).openPopup();
  });
}

function startRecording() {
  coordinates = []; // Clear existing coordinates
  polyline = null; // Reset polyline
  startPointMarker = null; // Reset start point marker
  endPointMarker = null; // Reset end point marker
  recordingInterval = setInterval(getUserCoordinates, 5000);
  startPointMarker = L.marker([coordinates[0][0], coordinates[0][1]]).addTo(map);
}

function stopRecording() {
  clearInterval(recordingInterval);
  endPointMarker = L.marker([coordinates[coordinates.length - 1][0], coordinates[coordinates.length - 1][1]]).addTo(map);
  adjustMapView();
  showCoordinatesTable(); // Add this line to display the coordinates table
}

function getUserCoordinates() {
  navigator.geolocation.getCurrentPosition(function (position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    coordinates.push([lat, lng]);
    if (!polyline) {
      polyline = L.polyline(coordinates, {
        color: 'red'
      }).addTo(map);
    } else {
      polyline.setLatLngs(coordinates);
    }
  });
}

function showCoordinatesTable() {
  var table = document.getElementById("coordinatesTable");
  table.classList.remove('hidden');
  var tbody = table.getElementsByTagName('tbody')[0];
  tbody.innerHTML = "";
  for (var i = 0; i < coordinates.length; i++) {
    var lat = coordinates[i][0].toFixed(6);
    var lng = coordinates[i][1].toFixed(6);
    var row = tbody.insertRow(i);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = lat;
    cell2.innerHTML = lng;
  }
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

function adjustMapView() {
  var bounds = polyline.getBounds();
  map.fitBounds(bounds);
}
