/*
var addSearchBox = function () {


    var box = "<input>";
    $('#searchBoxes').append(box);

}

*/

function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8,
        mapTypeControl: false,
        streetViewControl: false,
        scrollwheel: false
    });


    // HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }


    var locationArray = [[],[]];

    // Getting input from first search box
    var inputA = (document.getElementById('pointA'));
    var autocompleteA = new google.maps.places.Autocomplete(inputA);
    autocompleteA.bindTo('bounds', map);

    // Getting input from second search box
    var inputB = (document.getElementById('pointB'));
    var autocompleteB = new google.maps.places.Autocomplete(inputB);
    autocompleteB.bindTo('bounds', map);

    /* Creating marker
    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });
    */

    var infowindow = new google.maps.InfoWindow();
    var marker, i;

    autocompleteA.addListener('place_changed', function() {
        var place = autocompleteA.getPlace();
        locationArray[0].push(place.geometry.location.lat(),place.geometry.location.lng());
        console.log(locationArray[0]);
        console.log(locationArray[0].length);
    });

    autocompleteB.addListener('place_changed', function() {
        var place1 = autocompleteB.getPlace();
        locationArray[1].push(place1.geometry.location.lat(),place1.geometry.location.lng());
        console.log(locationArray[1]);
        console.log(locationArray.length);
    });

    for (i = 0; i < locationArray.length; i++){

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locationArray[i][0], locationArray[i][1]),
            map: map
        });

        marker.setIcon(/** @type {google.maps.Icon} */({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));

       // marker.setPosition(place.geometry.location);         // fix this shit
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        infowindow.open(map, marker);
    }

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}


$(document).ready(initMap);
