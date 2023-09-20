var x;

window.onload = function() {
    x = document.getElementById('gps');
    getLocation();
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Gps not found!";
    }
}

function showPosition(position) {
    console.log(position);
    var gps_text = "<span>Latitude: " + position.coords.latitude + "<br>Longitude: " +  position.coords.longitude + "</span>";
    console.log(gps_text);
    x.innerHTML = gps_text;
}