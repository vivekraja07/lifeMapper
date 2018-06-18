var map = L.map('mapid').setView([39.8283, -98.5795], 4);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 35,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoidml2ZWtyYWphMDciLCJhIjoiY2ppaHd1NHgxMHMwcjNsbnh6MmRoNmN6NyJ9.slF_wHT3c0XmJme3-6crhA',
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    bearing: -0,
    speed: 0.2,
    pitch: 0
}).addTo(map);

var slider = document.getElementById("myRange");
var output = document.getElementById("date");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
    output.innerHTML = this.value;
    console.log(this.value);
    console.log(x[this.value]);
    map.flyTo(x[this.value].loc, x[this.value].zoom, x[this.value].options);
}


//data
var x = {
    'welcome': {
        bearing: -0,
        center: [-108.866174, 49.272291],
        zoom: 2,
        speed: 0.8,
        pitch: 0
    },
    '2016': {
        loc: [34.371086, -105.391504], 
        zoom: 6, 
        optiions: {duration: 15}
    },
    '2017': {
        loc: [47.605958, -122.316235], 
        zoom: 13, 
        optiions: {duration: 15}
    }
    ,
    '2018': {
        bearing: 12.80,
        center: [-0.075681, 51.498018],
        zoom: 13.18,
        speed: 0.6,
        pitch: 0.00
    },
    'section4': {
        bearing: 60,
        center: [-134.408720, 58.300388],
        zoom: 16.57,
        speed: 0.6,
        pitch: 45
    },
    'section5': {
        bearing: 15.20,
        center: [29.027289, 41.013899],
        zoom: 10.56,
        pitch: 40.50,
        speed: 0.6
    },
    'section6': {
        bearing: 0,
        center: [-63.594167, -17.701427],
        zoom: 5.53,
        pitch: 0,
        speed: 0.6
    },
    'section7': {
        bearing: -0,
        center: [27.230526, 0.000000],
        zoom: 1.18,
        speed: 0.8,
        pitch: 0
    },
};


// var marker = L.marker([39.8283, -98.5795]).addTo(mymap);

// var circle = L.circle([51.508, -98.5795], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(mymap);

// var polygon = L.polygon([
//     [51.509, -98.5795],
//     [51.503, -90],
//     [50, -80]
// ]).addTo(mymap);

// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
// circle.bindPopup("I am a circle.");
// polygon.bindPopup("I am a polygon.");

// var popup = L.popup()
//     .setLatLng([71.509, -93.5795])
//     .setContent("I am a standalone popup.")
//     .openOn(mymap);

// var popup = L.popup();

// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(mymap);
// }

// mymap.on('click', onMapClick);

// var map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/outdoors-v10',
//         bearing: -0,
//         center: [-108.866174, 49.272291],
//         zoom: 2,
//         speed: 0.8,
//         pitch: 0
// });
// var chapters = {
//     'welcome': {
//         bearing: -0,
//         center: [-108.866174, 49.272291],
//         zoom: 2,
//         speed: 0.8,
//         pitch: 0
//     },
//     'section1': {
//         bearing: 0,
//         center: [-105.391504, 34.371086],
//         zoom: 6.00,
//         pitch: 0
//     },
//     'section2': {
//         center: [-122.316235, 47.605958],
//         bearing: 54.40,
//         zoom: 12.59,
//         speed: 0.6,
//         pitch: 44.50
//     },
//     'section3': {
//         bearing: 12.80,
//         center: [-0.075681, 51.498018],
//         zoom: 13.18,
//         speed: 0.6,
//         pitch: 0.00
//     },
//     'section4': {
//         bearing: 60,
//         center: [-134.408720, 58.300388],
//         zoom: 16.57,
//         speed: 0.6,
//         pitch: 45
//     },
//     'section5': {
//         bearing: 15.20,
//         center: [29.027289, 41.013899],
//         zoom: 10.56,
//         pitch: 40.50,
//         speed: 0.6
//     },
//     'section6': {
//         bearing: 0,
//         center: [-63.594167, -17.701427],
//         zoom: 5.53,
//         pitch: 0,
//         speed: 0.6
//     },
//     'section7': {
//         bearing: -0,
//         center: [27.230526, 0.000000],
//         zoom: 1.18,
//         speed: 0.8,
//         pitch: 0
//     },
// };
// // On every scroll event, check which element is on screen
// window.onscroll = function() {
//     var chapterNames = Object.keys(chapters);
//     for (var i = 0; i < chapterNames.length; i++) {
//         var chapterName = chapterNames[i];
//         if (isElementOnScreen(chapterName)) {
//             setActiveChapter(chapterName);
//             break;
//         }
//     }
// };
// var activeChapterName = 'baker';
// function setActiveChapter(chapterName) {
//     if (chapterName === activeChapterName) return;
//     map.flyTo(chapters[chapterName]);
//     document.getElementById(chapterName).setAttribute('class', 'active');
//     document.getElementById(activeChapterName).setAttribute('class', '');
//     activeChapterName = chapterName;
// }
// function isElementOnScreen(id) {
//     var element = document.getElementById(id);
//     var bounds = element.getBoundingClientRect();
//     return bounds.top < window.innerHeight && bounds.bottom > 0;
// }
// </script>

