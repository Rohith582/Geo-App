# rohith58.github.io

# GSL APP
 Open source web application for GPS data collection.
 
The provided code includes HTML, CSS, and JavaScript code for two web pages: `index.html` and `recording.html`. These pages are related to geolocation functionality, including displaying a map, recording coordinates, and exporting the recorded data as GeoJSON.

The `index.html` file includes a navigation bar with two links: "Geolocation Map" and "Recording". The content of the page consists of a heading, a map container, and buttons for getting the current location, showing the latest location, and exporting the coordinates as GeoJSON. The table element with the ID "locationTable" is hidden by default and used to display the latest recorded locations.

The `recording.html` file has a similar structure to `index.html`, with the main difference being that it is focused on recording coordinates. It includes buttons for starting and stopping the recording, showing the recorded coordinates, and exporting them as GeoJSON. The table element with the ID "coordinatesTable" is hidden by default and used to display the recorded coordinates.

The `style.css` file contains CSS rules to style the elements on both pages, including the map container, navigation bar, buttons, and tables.

The JavaScript code in `Geoloc.js` and `GeoRec.js` handles the geolocation functionality. It uses the Leaflet library to display the map and interact with it. The code allows getting the current location, showing it on the map, and updating a table with the latest recorded locations. It also includes functions for recording coordinates, displaying them in a table, and exporting them as GeoJSON.

Overall, these files provide a basic implementation of geolocation functionality with a map display, location recording, and data export.
