
// Variables //
var map;
var popup = L.popup()
var osmUrl;
var myUbication = $('.ubi');

// Loading map //

function LoadMap() {



    const defPos = {

        lat: -34.841914,
        lng: -56.244040,
        zoom: 15
    }

    map = L.map('mapid').setView([defPos.lat, defPos.lng], defPos.zoom);
    var marker = L.marker([defPos.lat, defPos.lng], defPos.zoom).addTo(map);
    var circle = L.circle([defPos.lat, defPos.lng], {
        color: 'skyblue',
        fillColor: 'skyblue',
        fillOpacity: 0.4,
        radius: 250
    }).addTo(map);


    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZXJpYzM3MzciLCJhIjoiY2tkOGxnYWprMHJoZDJ5dGdla2oxNzd1YiJ9.FNJh-fBlxn2Pl5IbuiCHeg'
    }).addTo(map);
    // TILE OMPTIMIZATION....
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {
        minZoom: 5,
        maxZoom: 16,
        attribution: osmAttrib
    });
    var osm = new L.tileLayer(osmUrl, {
        minZoom: 5, maxZoom: 16,
        attribution: osmAttrib,
        updateWhenIdle: true,
        reuseTiles: true
    });




}
window.onload = LoadMap();


//////////////// Crear eventos luego de cargar el mapa en posicion default

/* function direction(calle1, calle2){

    var calle1 = e.lat;
    var calle2 = e.lng;
    res = ('Estas entre '+ calle1 + ' y '+ calle2);

    return res;
} */

function onMapClick(e) {


    popup
        .setLatLng(e.latlng)
        .setContent("Aqui es ")
        .openOn(map);
}

function GetUbication() {
    var marker_actual;
    var position;
    var browserLat;
    var browserLong;
    navigator.geolocation.getCurrentPosition(function(position){

   
    browserLat = position.coords.latitude;
    browserLong = position.coords.longitude;
    marker_actual = L.marker([browserLat,browserLong]).addTo(map);
    marker_actual.bindPopup('<b>Hola </b><br>Tu estas aqui').openPopup();
    map.setView([browserLat,browserLong], 18);
    })
}



// Eventos //
map.on('click', onMapClick);
myUbication.click(function(e){
    console.log('hola');
    preventDefault(e);
    GetUbication();
})






    ////////////////
