var x = document.getElementById('gps');

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Gps not found!";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + "</br>Longitude: " +  position.coords.longitude;
}