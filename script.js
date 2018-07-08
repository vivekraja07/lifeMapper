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

var date = document.getElementById("date");
// date.innerHTML = slider.value; // Display the default slider value
div = document.getElementById('features');
var eventContainer = document.getElementById('eventContainer');
var toRemove = [];

function getAsMonth(date) {

    var arr = date.split("-");
    switch (arr[0]) {
        case 'January':
            arr[0] = 1;
            break;
        case 'February':
            arr[0] = 2;
            break;
        case 'March':
            arr[0] = 3;
            break;
        case 'April':
            arr[0] = 4;
            break;
        case 'May':
            arr[0] = 5;
            break;
        case 'June':
            arr[0] = 6;
            break;
        case 'July':
            arr[0] = 7;
            break;
        case 'August':
            arr[0] = 8;
            break;
        case 'September':
            arr[0] = 9;
            break;
        case 'October':
            arr[0] = 10;
            break;
        case 'November':
            arr[0] = 11;
            break;
        case 'December':
            arr[0] = 12;
            break;
    }
    return arr;
}

//data
var x = {
    //born in Tirupur
    'January 12, 1998 to June 1999': {
        start: 'January-1998',
        end: 'June-1999',
        loc: [11.1085, 77.3411],
        zoom: 13,
        options: { duration: 6 },
        info: {
            General: "This is where the story begins folks.",
            Location: "Tirupur, Tamil Nadu",
            Language: "Tamil"
        }
    },
    //moved to Coimbatore
    'July 1999 to May 2003': {
        start: 'July-1999',
        end: 'May-2003',
        loc: [11.0168, 76.9558],
        zoom: 13,
        options: { duration: 6 },
        info: {
            General: "Moved to the neighboring, more industrial city",
            Location: "Coimbatore, Tamil Nadu",
            Language: "Tamil",
            School: "Perks Matriculation \nRamakrishna Mission \nAvanashi-Lingam"
        }
    },
    //moved to Ahemdabad
    'June 2003 to May 2005': {
        start: 'June-2003',
        end: 'May-2005',
        loc: [23.020999, 72.5252289],
        zoom: 13,
        options: { duration: 6 },
        info: {
            General: "Moved to the distant state of Gujarat, where I learned some new languages",
            Location: "Ahemdabad, Gujarat",
            Languages: "Tamil \nEnglish \nHindi",
            School: "Eklavya Vidyalaya"
        }
    },
    //moved to Noida
    'May 2005 to October 2007': {
        start: 'May-2005',
        end: 'October-2007',
        loc: [28.5735143, 77.36474339999995],
        zoom: 13,
        options: { duration: 6 },
        info: {
            General: "Moved to the distant state of Uttar Pradesh, which is on the outskirts of Delhi. ",
            Location: "Noida, Uttar Pradesh",
            Languages: "Tamil \nEnglish \nHindi",
            School: "Kotari International"
        }
    },
    //moved to Alpharetta -> Abbotts Hill Road
    'November 2007 to May 2009': {
        start: 'November-2007',
        end: 'May-2009',
        loc: [34.056411, -84.196612],
        zoom: 13,
        options: { duration: 15 },
        info: {
            General: "Arrived at the US of A.",
            Location: "Alpharetta, Georgia",
            Languages: "Tamil \nEnglish \nHindi",
            School: "Abbotts Hill Elementary"
        }
    },
    //started going to Webb Bridge
    'June 2009 to July 2012': {
        start: 'June-2009',
        end: 'July-2012',
        loc: [34.067403, -84.231445],
        zoom: 13,
        options: { duration: 15 },
        info: {
            General: "These 3 years of middle school were a period of great growth and development",
            Location: "Alpharetta, Georgia",
            Languages: "Tamil \nEnglish \nHindi",
            School: "Webb Bridge Middle School"
        }

    },
    //hooch 9
    'August 2012 to May 2013': {
        start: 'August-2012',
        end: 'May-2013',
        loc: [34.048914, -84.208506],
        zoom: 13,
        options: { duration: 15 },
        info: {
            General: "9th grade",
            Location: "Alpharetta, Georgia",
            Languages: "Tamil \nEnglish \nHindi",
            School: "Chattahoochee High School"
        }
    },
    // //hooch 10
    // 'August 2013 to May 2014': {
    //     loc: [34.048914, -84.208506], 
    //     zoom: 13, 
    //     options: {duration: 15},
    //     info: {
    //         General: "10th grade",
    //         Location: "Alpharetta, Georgia",
    //         Languages: "Tamil \nEnglish \nHindi",
    //         School: "Chattahoochee High School"
    //     }
    // },
    // 'May 2014 to May 2014': {
    //     loc: [34.048914, -84.208506], 
    //     zoom: 13, 
    //     options: {duration: 15},
    //     info: {
    //         General: "10th grade",
    //         Location: "Alpharetta, Georgia",
    //         Languages: "Tamil \nEnglish \nHindi",
    //         School: "Chattahoochee High School"
    //     }
    // },
    // //subway
    // '2014': {
    //     loc: [34.048914, -84.208506], 
    //     zoom: 13, 
    //     options: {duration: 15},
    //     info: {
    //         General: "10th grade",
    //         Location: "Alpharetta, Georgia",
    //         Languages: "Tamil \nEnglish \nHindi",
    //         School: "Chattahoochee High School"
    //     }
    // },
    // '2015': {
    //     loc: [34.048914, -84.208506], 
    //     zoom: 13, 
    //     options: {duration: 15},
    //     info: {
    //         General: "10th grade",
    //         Location: "Alpharetta, Georgia",
    //         Languages: "Tamil \nEnglish \nHindi",
    //         School: "Chattahoochee High School"
    //     }
    // },

    // '2017': {
    //     loc: [47.605958, -122.316235], 
    //     zoom: 13, 
    //     options: {duration: 15}
    // }
};

//let us initialize the timeline here
total = '366';
for (event in x) {
    var era = document.createElement('div');
    era.className = 'rectangle';

    eventData = x[event];

    //we need to get a width from the start and end dates
    start = getAsMonth(eventData.start);
    end = getAsMonth(eventData.end);
    // console.log("start: " + start);
    // console.log("end: " + end);
    numMonths = (end[1] - start[1]) * 12 + (end[0] - start[0]);
    // console.log(numMonths);
    perc = (numMonths / total * 100).toFixed(2);

    era.style.width = (perc + "%");

    eventContainer.appendChild(era);

}




// Update the current slider value (each time you drag the slider handle)
// slider.oninput = function () {
//     date.innerHTML = this.value;
//     while (toRemove.length != 0) {
//         div.removeChild(toRemove.pop());
//     }
//     //map.flyTo(x[this.value].loc, x[this.value].zoom, x[this.value].options);
//     for (var feature in x[this.value].info) {

//         var section = document.createElement('section');
//         section.className = 'br';
//         var topic = document.createElement('h4');
//         topic.textContent = feature;
//         section.appendChild(topic);
//         var para = document.createElement('p');
//         para.textContent = x[this.value].info[feature];
//         section.appendChild(para);

//         div.appendChild(section);
//         toRemove.push(section);
//     }
// }


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
//         .openOn(map);
// }

// map.on('click', onMapClick);



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

