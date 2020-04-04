// JavaScript creating the mapping UI for system 2 of the Wilderness Weather Station Project
var stationMap;
var startingCoordinates;
var maxZoom;
var currentDiv = 'stationMap';
var activeLink = 'linkThree';

// Setting map variables
startingCoordinates = [71.7069, -42.6043];
maxZoom = 5;

// Initializing leaflet map to the stationMap div
stationMap = L.map('stationMap').setView(startingCoordinates, maxZoom);

// Adding tile layer from mapbox
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 13,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZmlnaXRzdG9ybSIsImEiOiJjazcxMWs5b2wwMmFqM2x0aGptN3Zjdm5pIn0.VvYrg2bguYUMItXWH8OwLA'
}).addTo(stationMap);

//Test create marker on map.
var marker = L.marker([25.0000, 71.0000]).addTo(stationMap);
marker.bindPopup("<b>Hello world!</b><br>I am a popup.");

//test circle on map
var circle = L.circle([25.0000, 71.0000], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(stationMap);
circle.bindPopup("I am a circle.");

// Funtion to switch between different interfaces (center divs)
function switchDiv(newDiv, linkID) {
    document.getElementById(currentDiv).style.width = "0";
    document.getElementById(newDiv).style.width = "100%";
    document.getElementById(activeLink).style.color = "grey";
    document.getElementById(linkID).style.color = "white";
    currentDiv = newDiv;
    activeLink = linkID;
}

// Using AJAX to read in raw .json file data from the GitHub, then working with that data
$.ajax("https://raw.githubusercontent.com/laureja/Wilderness-Weather-Station/master/UI_Map_Data.json", {
    dataType: "json",
    success: function(response){
        console.log("successfully read json!");

        var jsonPoints = L.geoJSON(response.features, {
            pointToLayer: function(feature, latlng){
                console.log("Feature: " + feature + " LatLng: " + latlng);
				return L.marker(latlng);
            },
            onEachFeature: function(feature, layer) {
                var name = feature.properties.name;
                var temp = feature.properties.temp;
                var wind = feature.properties.wind;
                var hum = feature.properties.humidity;
                var coords = feature.geometry.coordinates;
                layer.on('click', function(e) {
                    layer.bindPopup("Name: " + name + "</br>"
                                    + "Temperature: " + temp + "</br>"
                                    + "Wind: " + wind + "</br>"
                                    + "Humidity: " + hum + "</br>"
                                    + "Coordinates: [" + coords + "]");
                });
            }
        });

        jsonPoints.addTo(stationMap);
    }
});
