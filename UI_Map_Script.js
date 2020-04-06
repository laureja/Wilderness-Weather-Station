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

// Function for expanding data in archive, to use later...
function expandData() {
    var tables = document.getElementsByClassName("dataList");
    tables.style.height = "100%";
}

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAa88wENg_49uaG_UJLuDtQmdbF1_7F6C8",
    authDomain: "wilderness-weather-stati-d17e8.firebaseapp.com",
    databaseURL: "https://wilderness-weather-stati-d17e8.firebaseio.com",
    projectId: "wilderness-weather-stati-d17e8",
    storageBucket: "wilderness-weather-stati-d17e8.appspot.com",
    messagingSenderId: "90112307813",
    appId: "1:90112307813:web:93e25dd1e6a8fef1560c8c",
    measurementId: "G-G29HDV1NKX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Start Data Event Listeners
var db = firebase.firestore();
var docRef = db.collection("station").doc("Geometry");
const dataDisplay = document.getElementById('dataObject');

//add popups on features

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
        layer.bindPopup
    }
}
//test
var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
};
//Add markers on map
L.geoJSON(geojsonFeature, {
    onEachFeature: onEachFeature
}).addTo(stationMap);

// Create points and add properties to them 
function createPoints(doc) {
    console.log("create points");
    var temp = doc.data().Geometry.Properties.temp[49];
    var wind = doc.data().Geometry.Properties.wind[49];
    var hum = doc.data().Geometry.Properties.humidity[49];
    var coords = doc.data().Geometry.Properties.coordinates;
    var biome = doc.data().Geometry.Properties.biome;
    var battery = doc.data().Geometry.Properties.battery;



    var geoJSONFeature1 = { 
        "type": "Feature",
        "properties": {
            "name":doc.id,
            "battery": doc.data().Geometry.Properties.battery,
            "biome": doc.data().Geometry.Properties.biome,
            "coordinates": doc.data().Geometry.Properties.coordinates,
            "temp": doc.data().Geometry.Properties.temp[49],
            "humidity": doc.data().Geometry.Properties.humidity[49],
            "wind": doc.data().Geometry.Properties.wind[49],
        },
        "geometry": {
            "type": "Point",
            "coordinates":doc.data().Geometry.Coordinates,
            }
        }
        
        var geoJSONPoints = L.geoJSON(geoJSONFeature1, {
            onEachFeature: function(geoJSONFeature1, layer) {
                console.log("set vars");
                var name = geoJSONFeature1.properties.name;
                var temp = geoJSONFeature1.properties.temp;
                var wind = geoJSONFeature1.properties.wind;
                var hum = geoJSONFeature1.properties.humidity;
                var coords = geoJSONFeature1.geometry.coordinates;
                console.log(coords);
                // Keep this:
                layer.on('click', function(e) {
                    layer.bindPopup("Name: " + name + "</br>"
                                    + "Temperature: " + temp + " F</br>"
                                    + "Wind: " + wind + " MPH</br>"
                                    + "Humidity: " + hum + " dew pt.</br>"
                                    + "Coordinates: [" + coords + "]");
        });
    }
});
    console.log("hi")
    geoJSONPoints.addTo(stationMap)
    
}




// Create HTML elements for rendering in the Archive
function renderStation(doc) {
    // Creating formatting elements
    let li = document.createElement('li');
        li.setAttribute('data-id', doc.id);
        li.setAttribute('class', "archive");


    let br = document.createElement('br');

    // Creating basic info elements
    let name = document.createElement('span');
        name.setAttribute('class', "station-name");
    let coordinates = document.createElement('span');
        coordinates.setAttribute('class', "secondaryInfo");
    let battery = document.createElement('span');
        battery.setAttribute('class', "secondaryInfo");
    let biome = document.createElement('span');
        biome.setAttribute('class', "secondaryInfo");
    let humHeader = document.createElement('span');
        humHeader.setAttribute('class', "dataHeaders");
    let tempHeader = document.createElement('span');
        tempHeader.setAttribute('class', "dataHeaders");
    let windHeader = document.createElement('span');
        windHeader.setAttribute('class', "dataHeaders");

    // Creating data List elements
    let humList = document.createElement('ol');
        humList.setAttribute('class', "dataList");
    let tempList = document.createElement('ol');
        tempList.setAttribute('class', "dataList");
        tempList.setAttribute('style', "float: right; position: relative; top: -262px; left: -650px;");
    let windList = document.createElement('ol');
        windList.setAttribute('class', "dataList");
        windList.setAttribute('style', "float: right; position: relative; top: -280px; left: 550px;");
    
    // Setting basic info content
    name.textContent = doc.id;
    coordinates.textContent = "Coordinates: [" + doc.data().Geometry.Coordinates + "]";
    battery.textContent = "Battery Level: " + doc.data().Geometry.Properties.battery + "%";
    biome.textContent = "Biome type: " + doc.data().Geometry.Properties.biome;

    // Helper function to make appending elements to list easier
    function addEntry(entry){
        li.appendChild(entry);
        li.innerHTML = li.innerHTML + '</br>'
    }

    // Adding basic info
    addEntry(name);
    addEntry(coordinates);
    addEntry(battery);
    addEntry(biome);

    // Setting data list entries for humList
    humHeader.textContent = "Humidity Levels: ";
    humList.appendChild(humHeader);
    humList.innerHTML = humList.innerHTML + '</br>'
    for (var x of doc.data().Geometry.Properties.humidity){
        let humElm = document.createElement('li');
        //humElm.setAttribute('class', "dataList");
        humElm.textContent = x;
        humList.appendChild(humElm);
    }
    // Adding humidity data list
    addEntry(humList);

    // Setting data list entries for tempList
    tempHeader.textContent = "Temperatures: ";
    tempList.appendChild(tempHeader);
    tempList.innerHTML = tempList.innerHTML + '</br>'
    for (var x of doc.data().Geometry.Properties.temp){
        let tempElm = document.createElement('li');
        //tempElm.setAttribute('class', "dataList");
        tempElm.textContent = x + " °F";
        tempList.appendChild(tempElm);
    }
    // Adding temp data list
    addEntry(tempList);

    // Setting data list entries for windList
    windHeader.textContent = "Wind Speeds: ";
    windList.appendChild(windHeader);
    windList.innerHTML = windList.innerHTML + '</br>'
    for (var x of doc.data().Geometry.Properties.wind){
        let windElm = document.createElement('li');
        //windElm.setAttribute('class', "dataList");
        windElm.textContent = x + "mph";
        windList.appendChild(windElm);
    }
    // Adding wind data list
    addEntry(windList);

    dataDisplay.appendChild(li);

}

// Get elements from database, feed through rendering function for archive
db.collection("stations")
                .get()
                .then((snapshot) => {
                    snapshot.docs.forEach(doc => {
                        console.log(doc.data());
                        renderStation(doc);
                        createPoints(doc);
                    });
}).catch(function(error) {
    console.log("Error getting documents: ", error);
});

// Testing references...
docRef.get().then(function(doc) {
    if (doc.exists) {
        var docData = doc.data();
        console.log("Document data:", docData);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

/* // Using AJAX to read in raw .json file data from the GitHub, then working with that data
$.ajax("https://raw.githubusercontent.com/laureja/Wilderness-Weather-Station/master/UI_Map_Data.json", {
    dataType: "json",
    success: function(response){
        console.log("successfully read json!");

        var jsonPoints = 
        L.geoJSON(response.features, {pointToLayer: function(feature, latlng)
                                        {
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
 */