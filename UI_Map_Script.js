// JavaScript creating the mapping UI for system 2 of the Wilderness Weather Station Project
var stationMap;
var startingCoordinates;
var maxZoom;
var currentDiv = 'stationMap';

// Setting map variables
startingCoordinates = [25.0000, 71.0000];
maxZoom = 13;

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
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

//test circle on map
var circle = L.circle([25.0000, 71.0000], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(stationMap);
circle.bindPopup("I am a circle.");

// Funtion to switch between different interfaces (center divs)
/*
function switchDiv(newDiv, linkID) {
    var newTitle;
    var currentTitle = document.getElementById("title").innerHTML;
    var newContent;
    console.log(document.getElementById(linkID).onclick.toString)
    if (newDiv == 'stationMap'){
        newTitle = "Current Station Conditions";
        newContent = currentTitle;
    } else if (newDiv == 'archiveDiv'){
        newTitle = "Archive";
        newContent = currentTitle;
    } else if (newDiv == 'statusDiv'){
        newTitle = "System Status";
        newContent = currentTitle;
    } else {
        console.log('ERROR: Invalid Div Passed to switchDiv(divName): ' + newDiv);
    }
    document.getElementById("title").innerHTML = newTitle;
    document.getElementById(linkID).innerHTML = newContent;
    document.getElementById(linkID).onclick = '"switchDiv(' + currentDiv + ', ' + linkID +')"'
    currentDiv = newDiv;
}
*/
