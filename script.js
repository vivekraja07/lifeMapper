var map = L.map('map').setView([39.8283, -98.5795], 4);

L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: 'Google-Maps',
}).addTo(map);

// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     maxZoom: 35,
//     id: 'mapbox.streets-satellite',
//     accessToken: 'pk.eyJ1Ijoidml2ZWtyYWphMDciLCJhIjoiY2ppaHd1NHgxMHMwcjNsbnh6MmRoNmN6NyJ9.slF_wHT3c0XmJme3-6crhA',
//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
//         '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
//         'Imagery © <a href="http://mapbox.com">Mapbox</a>',
//     bearing: -0,
//     speed: 0.2,
//     pitch: 0
// }).addTo(map);

//L.tileLayer('https://api.mapbox.com/styles/v1/vivekraja07/cjjnftey106hn2rmu6fe5ykmv/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoidml2ZWtyYWphMDciLCJhIjoiY2ppaHd1NHgxMHMwcjNsbnh6MmRoNmN6NyJ9.slF_wHT3c0XmJme3-6crhA').addTo(map);

var date = document.getElementById("date");
events = document.getElementById("events");
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
        zoom: 18,
        options: { duration: 15 },
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
        zoom: 18,
        options: { duration: 15 },
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
        zoom: 20,
        options: { duration: 15 },
        info: {
            General: "Moved to the distant state of Gujarat, where I learned some new languages",
            Location: "Ahemdabad, Gujarat",
            Languages: "Tamil \nEnglish \nHindi",
            School: "Eklavya Vidyalaya"
        }
    },
    //moved to Noida
    'June 2005 to October 2007': {
        start: 'June-2005',
        end: 'October-2007',
        loc: [28.5735143, 77.36474339999995],
        zoom: 18,
        options: { duration: 15 },
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
        zoom: 18,
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
        zoom: 18,
        options: { duration: 15 },
        info: {
            General: "These 3 years of middle school were a period of great growth and development",
            Location: "Alpharetta, Georgia",
            Languages: "Tamil \nEnglish \nHindi",
            School: "Webb Bridge Middle School"
        }

    },
    //hooch 9
    'August 2012 to July 2013': {
        start: 'August-2012',
        end: 'July-2013',
        loc: [34.049821, -84.208407],
        zoom: 18,
        options: { duration: 15 },
        info: {
            school: {
                name: "Chattahoochee High School",
                title: "Freshman",
                icon: "/Users/vxr0532/Documents/lifeMapper/icons/hooch.png",
                range: "Aug 2012 - May 2013 • 1 year",
                courses: [
                    {
                        courseNum: 1,
                        title: "Accelerated Geometry Honors",
                        grade: "105",
                        grade2: "106"
                    },
                    {
                        courseNum: 2,
                        title: "Honors Biology",
                        grade: "105",
                        grade2: "106"
                    },
                    {
                        courseNum: 3,
                        title: "Band - Tuba Player",
                        grade: "97",
                        grade2: "100"
                    },
                    {
                        courseNum: 4,
                        title: "Home Room/Lunch",
                        grade: "-",
                        grade2: "-"
                    },
                    {
                        courseNum: 5,
                        title: "Spanish 2 Honors",
                        grade: "106",
                        grade2: "106"
                    },
                    {
                        courseNum: 6,
                        title: "Literature and Comprehension",
                        grade: "97",
                        grade2: "100"
                    },
                    {
                        courseNum: 7,
                        title: "AP US Government and Poltics",
                        grade: "107",
                        grade2: "-"
                    },
                    {
                        courseNum: 7,
                        title: "AP Comparative Government",
                        grade: "-",
                        grade2: "105"
                    }
                ],
            },
            General: "9th grade",
            Location: "Alpharetta, Georgia",
            Languages: "Tamil \nEnglish \nHindi",
            School: "Chattahoochee High School"
        }
    },
    //hooch 10
    'August 2013 to May 2014': {
        start: 'August-2013',
        end: 'May-2014',
        loc: [34.049821, -84.208407],
        zoom: 18,
        options: { duration: 15 },
        info: {
            school: {
                name: "Chattahoochee High School",
                title: "Sophomore",
                icon: "/Users/vxr0532/Documents/lifeMapper/icons/hooch.png",
                range: "Aug 2013 - May 2014 • 1 year",
                courses: [
                    {
                        courseNum: 1,
                        title: "Honors Chemistry",
                        grade: "103",
                        grade2: "104"
                    },
                    {
                        courseNum: 2,
                        title: "Band - Tuba Player",
                        grade: "100",
                        grade2: "100"
                    },
                    {
                        courseNum: 3,
                        title: "Honors Literature",
                        grade: "103",
                        grade2: "104"
                    },
                    {
                        courseNum: 4,
                        title: "Spanish 3 Honors",
                        grade: "103",
                        grade2: "103"
                    },
                    {
                        courseNum: 5,
                        title: "Home Room/Lunch",
                        grade: "-",
                        grade2: "-"
                    },
                    {
                        courseNum: 6,
                        title: "AP World History",
                        grade: "101",
                        grade2: "100"
                    },
                    {
                        courseNum: 7,
                        title: "Accelerated PreCalculus Honors",
                        grade: "107",
                        grade2: "105"
                    }
                ],
            },
            General: "10th grade",
            Location: "Alpharetta, Georgia",
            Languages: "Tamil \nEnglish \nHindi",
            School: "Chattahoochee High School"
        }
    },
    //subway
    'June 2014 to July 2014': {
        start: 'June-2014',
        end: 'July-2014',
        loc: [34.047090, -84.179381],
        zoom: 20,
        options: { duration: 15 },
        info: {
            Job: {
                title: "Sandwich Artist",
                company: "Subway",
                icon: "/Users/vxr0532/Documents/lifeMapper/icons/subway.png",
                range: "Jun 2014 to July 2014 • 3 mos",
                location: "Duluth, GA",
                addDetails: [
                    "Managed all transactions and dealt with customers single-handedly.",
                    "Learned about the business operations and efficient procedures of the multi-million dollar corporation.",
                    "Created a report at the end of the summer with sales data, outlining ideas on decreasing costs and increasing sales."
                ]
            },
            summerSchool: {
                name: "Fulton Virtual School",
                title: "Sophomore",
                icon: "/Users/vxr0532/Documents/lifeMapper/icons/fvs.png",
                range: "June 2013 - July 2014 • 3 mos",
                courses: [
                    {
                        courseNum: "Summer Online Course",
                        title: "FVS General Health",
                        grade: "99"
                    }
                ],
            },
            General: "Sandwich Artist at Subway",
            Location: "Alpharetta, Georgia",
            Languages: "Tamil \nEnglish \nHindi",
        }
    },
    //11th gradee
    'August 2014 to May 2015': {
        start: 'August-2014',
        end: 'May-2015',
        loc: [34.049821, -84.208407],
        zoom: 18,
        options: { duration: 15 },
        info: {
            school: {
                name: "Chattahoochee High School",
                title: "Junior",
                icon: "/Users/vxr0532/Documents/lifeMapper/icons/hooch.png",
                range: "Aug 2014 - May 2015 • 1 year",
                courses: [
                    {
                        courseNum: 1,
                        title: "AP Spanish Lang",
                        grade: "106",
                        grade2: "106"
                    },
                    {
                        courseNum: 2,
                        title: "AP US History",
                        grade: "103",
                        grade2: "100"
                    },
                    {
                        courseNum: 3,
                        title: "Accounting Principles 1",
                        grade: "98",
                        grade2: "96"
                    },
                    {
                        courseNum: 4,
                        title: "Home Room/Lunch",
                        grade: "-",
                        grade2: "-"
                    },
                    {
                        courseNum: 5,
                        title: "AP Calculus BC",
                        grade: "103",
                        grade2: "102"
                    },
                    {
                        courseNum: 6,
                        title: "AP Chemistry",
                        grade: "102",
                        grade2: "102"
                    },
                    {
                        courseNum: 7,
                        title: "AP English Lanugage",
                        grade: "99",
                        grade2: "100"
                    }
                ],
            },
            General: "11th grade",
            Location: "Alpharetta, Georgia",
            Languages: "Tamil \nEnglish \nHindi",
            School: "Chattahoochee High School"
        }
    },
    //topgolf + cross-country + tutoring
    'June 2015 to July 2015': {
        start: 'June-2015',
        end: 'July-2015',
        loc: [34.045314, -84.307211],
        zoom: 18,
        options: { duration: 15 },
        info: {
            Job: {
                title: "Food Runner and Busser",
                company: "TopGolf",
                icon: "/Users/vxr0532/Documents/lifeMapper/icons/topgolf.png",
                range: "Jun 2015 to Jul 2015 • 2 mos",
                location: "Alpharetta, GA",
                addDetails: [
                    "Ensured guest satisfaction and created a fun environment.",
                    "Carried around 8lbs of food up and down a fleet of stairs to guests at the facility"
                ]
            },
            Job2: {
                title: "Private Tutor",
                company: "Self-Employed",
                icon: "/Users/vxr0532/Documents/lifeMapper/icons/tutor.png",
                range: "Jun 2015 - Jul 2015 • 2 mos",
                location: "Johns Creek, GA",
                addDetails: [
                    "Tutored 3 elementary and middle school students in basic English and Mathematics"
                ]
            },
            General: "TopGolf + Cross-Country + Tutoring",
            Location: "Alpharetta, Georgia",
            Languages: "Tamil \nEnglish \nHindi",
        }
    },
    //12th grade
    'August 2015 to May 2016': {
        start: 'August-2015',
        end: 'May-2016',
        loc: [34.049821, -84.208407],
        zoom: 18,
        options: { duration: 15 },
        info: {
            school: {
                name: "Chattahoochee High School",
                title: "Senior",
                icon: "/Users/vxr0532/Documents/lifeMapper/icons/hooch.png",
                range: "Aug 2015 - May 2016 • 1 year",
                courses: [
                    {
                        courseNum: 1,
                        title: "GT Distance Calculus MOWR",
                        grade: "102",
                        grade2: "92"
                    },
                    {
                        courseNum: 2,
                        title: "Personal Fitness",
                        grade: "99",
                        grade2: "-"
                    },
                    {
                        courseNum: 2,
                        title: "GPC - College English 1102",
                        grade: "-",
                        grade2: "92"
                    },
                    {
                        courseNum: 3,
                        title: "AP Microeconomics",
                        grade: "99",
                        grade2: "-"
                    },
                    {
                        courseNum: 3,
                        title: "AP Macroeconomics",
                        grade: "-",
                        grade2: "98"
                    },
                    {
                        courseNum: 4,
                        title: "Home Room/Lunch",
                        grade: "-",
                        grade2: "-"
                    },
                    {
                        courseNum: 5,
                        title: "AP Computer Science A",
                        grade: "104",
                        grade2: "99"
                    },
                    {
                        courseNum: 6,
                        title: "AP Physics 1",
                        grade: "103",
                        grade2: "95"
                    },
                    {
                        courseNum: 7,
                        title: "AP Statistics",
                        grade: "102",
                        grade2: "95"
                    }
                ],
            },
            Job: {
                title: "President and Founder",
                company: "APEX Tutoring",
                icon: "/Users/vxr0532/Documents/lifeMapper/icons/apex.png",
                range: "Apr 2016 - Jun 2016 • 3 mos",
                location: "GT Campus",
                addDetails: [
                    "Opened up a tutoring center (2200 square feet) for high school students taking the AP Exam.",
                    "Helped over 41 students ace their exams, leading Principal of CHS, Tim Corrigan to claim, “Thank you for providing this wonderful opportunity for our students.”",
                ]
            },
            Job2: {
                title: "President and Founder",
                company: "Winter Cougar Tennis Camp",
                icon: "/Users/vxr0532/Documents/lifeMapper/icons/winterCougarTennis.png",
                range: "Dec 2015 • 1 week",
                location: "Alpharetta, GA",
                addDetails: [
                    "Organized a camp for all tennis players interested in trying out for Chattahoochee’s Varsity team.",
                    "More than 65% of the players that attended camp and tried out made the team."
                ]
            },
            Job3: {
                title: "Private Tutor for AP US Government",
                company: "Self-Employed",
                icon: "/Users/vxr0532/Documents/lifeMapper/icons/govTutor.png",
                range: "Aug 2015 - Mar 2016 • 1 year",
                location: "Johns Creek, GA",
                addDetails: [
                    "Tutored around 30 high school students, primarily in the class of AP Government"
                ]
            },
            General: "12th grade",
            Location: "Alpharetta, Georgia",
            Languages: "Tamil \nEnglish \nHindi",
        }
    },
    //financial analyst internship
    'June 2016 to August 2016': {
        start: 'June-2016',
        end: 'August-2016',
        loc: [33.776497, -84.387357],
        zoom: 18,
        options: { duration: 10 },
        info: {
            Job: {
                title: "Financial Analyst Internship",
                company: "Scheller College of Business at Georgia Tech",
                icon: "/Users/vxr0532/Documents/lifeMapper/icons/scheller.png",
                range: "Jun 2016 - Aug 2016 • 3 mos",
                location: "GT Campus",
                addDetails: [
                    "Used Bloomberg Essentials to recreate contemporary models of the 1992 Tweedy, Browne’s famous “What has Worked in Investing” Report",
                ]
            },
            General: "Financial Analyst Internship",
            Location: "Atlanta, Georgia",
            Languages: "Tamil \nEnglish \nHindi",
        }
    },
    //year 1, semester 1 at gatech
    'September 2016 to December 2016': {
        start: 'September-2016',
        end: 'December-2016',
        loc: [33.777378, -84.395516],
        zoom: 18,
        options: { duration: 8 },
        info: {
            Education: {
                name: "Georgia Institute of Technology",
                title: "BS - Computer Science, minor in Spanish",
                range: "2016 - 2020 • Freshman",
                icon: "/Users/vxr0532/Documents/lifeMapper/icons/gatech.png",
                courses: [
                    {
                        courseNum: "CS 2051",
                        title: "Honors Discrete Math",
                        creditHours: "3"
                    },
                    {
                        courseNum: "CS 1331",
                        title: "Intro to Object Oriented Programming",
                        creditHours: "3"
                    },
                    {
                        courseNum: "CS 1100",
                        title: "Freshman Leap Seminar",
                        creditHours: "1"
                    },
                    {
                        courseNum: "MGT 3078",
                        title: "Finance and Investments",
                        creditHours: "3"
                    },
                    {
                        courseNum: "PHYS 2211",
                        title: "Intro Physics I",
                        creditHours: "4"
                    },
                    {
                        courseNum: "APPH 1040",
                        title: "Scientific Foundation of Health",
                        creditHours: "2"
                    }
                ]
            },
            General: "Freshman year 1st semester at GA Tech",
            Location: "Atlanta, Georgia",
            Languages: "Tamil \nEnglish \nHindi",
        },


    },
    //year 1, semester 2 at gatech
    'January 2017 to May 2017': {
        start: 'January-2017',
        end: 'May-2017',
        loc: [33.777378, -84.395516],
        zoom: 18,
        options: { duration: 15 },
        info: {
            Education: {
                name: "Georgia Institute of Technology",
                title: "BS - Computer Science, minor in Spanish",
                range: "2016 - 2020 • Freshman",
                icon: "/Users/vxr0532/Documents/lifeMapper/icons/gatech.png",
                courses: [
                    {
                        courseNum: "CS 1332",
                        title: "Data Structures and Algorithms",
                        creditHours: "3"
                    },
                    {
                        courseNum: "CS 2110",
                        title: "Computer Organization and Programming",
                        creditHours: "4"
                    },
                    {
                        courseNum: "CS 2340",
                        title: "Objects and Design",
                        creditHours: "3"
                    },
                    {
                        courseNum: "CHEM 1212k",
                        title: "Chemical Principles II",
                        creditHours: "4"
                    }
                ]
            },
            General: "Freshman year 2nd semester at GA Tech",
            Location: "Atlanta, Georgia",
            Languages: "Tamil \nEnglish \nHindi",
        }
    },
    //thrivent Internship 
    'June 2017 to August 2017': {
        start: 'June-2017',
        end: 'August-2017',
        loc: [44.305783, -88.387126],
        zoom: 18,
        options: { duration: 15 },
        info: {
            Job: {
                title: "Planning and Execution Oversight Intern",
                company: "Thrivent Financial",
                icon: "/Users/vxr0532/Documents/lifeMapper/icons/thrivent.jpeg",
                range: "Jun 2017 - Aug 2017 • 3 mos",
                location: "Appleton, Wisconsin",
                addDetails: [
                    "Wrote selenium scripts to automate testing of applications using WebDriver, java, and Selenium Grid",
                    "Trained over 10 experienced java developers in Selenium scripting",
                    "Created a VBA script to search for abnormalities in a 100GB+ file with PPM Data. Script would send an email with results of validation test"
                ]
            },
            General: "Software Engineer Internship at Thrivent Financial",
            Location: "Atlanta, Georgia",
            Languages: "Tamil \nEnglish \nHindi",
        }
    },

    //year 2, semester 1 at gatech
    'September 2017 to December 2017': {
        start: 'September-2017',
        end: 'December-2017',
        loc: [33.777378, -84.395516],
        zoom: 18,
        options: { duration: 15 },
        info: {
            Job: {
                title: "Tutor - CS 2110 and CS 1332",
                company: "College of Computing at Georgia Tech",
                icon: "/Users/vxr0532/Documents/lifeMapper/icons/coc.png",
                range: "September 2017 - December 2018 • 5 mos",
                location: "GT Campus",
                addDetails: [
                    "Tutored 3 students weekly in CS 2110 (Computer Systems and Organization) and CS 1332 (Data Structures and Algorithms)",
                ]
            },
            Education: {
                name: "Georgia Institute of Technology",
                title: "BS - Computer Science, minor in Spanish",
                range: "2016 - 2020 • Sophomore",
                icon: "/Users/vxr0532/Documents/lifeMapper/icons/gatech.png",
                courses: [
                    {
                        courseNum: "CS 2200",
                        title: "Systems and Networks",
                        creditHours: "4"
                    },
                    {
                        courseNum: "CS 3600",
                        title: "Intro to Artificial Intelligence",
                        creditHours: "3"
                    },
                    {
                        courseNum: "CS 4400",
                        title: "Intro to Database Systems",
                        creditHours: "3"
                    },
                    {
                        courseNum: "PSYC 1101",
                        title: "General Psychology",
                        creditHours: "3"
                    },
                    {
                        courseNum: "SPAN 3101",
                        title: "Spanish Conversation I",
                        creditHours: "3"
                    }
                ]

            },
            General: "Sophomore year 1st semester at GA Tech",
            Location: "Atlanta, Georgia",
            Languages: "Tamil \nEnglish \nHindi",
        }
    },
    //year 2, semester 2 at gatech
    'January 2018 to May 2018': {
        start: 'January-2018',
        end: 'May-2018',
        loc: [33.777378, -84.395516],
        zoom: 18,
        options: { duration: 8 },
        info: {
            Job: {
                title: "Teaching Assistant, CS 2200: Systems and Networks",
                company: "College of Computing at Georgia Tech",
                icon: "/Users/vxr0532/Documents/lifeMapper/icons/coc.png",
                range: "Jan 2018 - May 2018 • 5 mos",
                location: "GT Campus",
                addDetails: [
                    "Design homework questions and projects both to help study and demonstrate mastery of material",
                    "Lecture recitation urging students to be engaged and excited to learn about microprocessors and network designs",
                    "Tutor students individually, assisting with both homework and general questions"
                ]
            },
            Education: {
                name: "Georgia Institute of Technology",
                title: "BS - Computer Science, minor in Spanish",
                range: "2016 - 2020 • Sophomore",
                icon: "/Users/vxr0532/Documents/lifeMapper/icons/gatech.png",
                courses: [
                    {
                        courseNum: "CS 3251",
                        title: "Computer Networking I",
                        creditHours: "3"
                    },
                    {
                        courseNum: "CS 3511",
                        title: "Algorithms Honors",
                        creditHours: "3"
                    },
                    {
                        courseNum: "CS 4641",
                        title: "Machine Learning",
                        creditHours: "3"
                    },
                    {
                        courseNum: "ISYE 3770",
                        title: "Statistics and Applications",
                        creditHours: "3"
                    },
                    {
                        courseNum: "PHIL 3127",
                        title: "Sci, Tech, & Human Values",
                        creditHours: "3"
                    }
                ]

            },
            General: "Sophomore year 2nd semester at GA Tech",
            Location: "Atlanta, Georgia",
            Languages: "Tamil \nEnglish \nHindi",
        }
    },
    //home depot internship
    'June 2018 to August 2018': {
        start: 'June-2018',
        end: 'August-2018',
        loc: [33.865961, -84.482348],
        zoom: 18,
        options: { duration: 15 },
        info: {
            Job: {
                title: "Software Engineering Intern",
                company: "The Home Depot",
                icon: "/Users/vxr0532/Documents/lifeMapper/icons/homeDepot.png",
                range: "May 2018 - Aug 2018 • 3 mos",
                location: "Smyrna, GA",
                addDetails: [
                    "This was a fun internship!",
                    "Lots of learning and stuff like that "
                ]
            },
            General: "Software Engineer Internship at Home Depot",
            Location: "Atlanta, Georgia",
            Languages: "Tamil \nEnglish \nHindi \nSpanish",
        }
    },
};


//let us initialize the timeline here
total = '248';
count = 0;

var index = -1;
for (event in x) {
    const era = document.createElement('div');
    era.className = 'rectangle';
    era.id = ++index;
    era.dataset.name = event;

    era.addEventListener('click', function () {
        showInfo(era.dataset.name)

        var current = document.getElementsByClassName("active");
        if (current.length > 0) {
            current[0].className = current[0].className.replace(" active", "");
        } else {
            //console.log("No active")
        }
        era.className += " active";

        index = era.id;
        // console.log("Index:" + index)
    });


    eventData = x[event];

    //we need to get a width from the start and end dates
    start = getAsMonth(eventData.start);
    end = getAsMonth(eventData.end);
    // console.log("start: " + start);
    // console.log("end: " + end);
    numMonths = (end[1] - start[1]) * 12 + (end[0] - start[0] + 1);
    count += numMonths;
    // console.log(numMonths);
    // console.log("============================================")
    perc = (numMonths / total * 100).toFixed(2);

    era.style.width = (perc + "%");
    eventContainer.appendChild(era);

}

// console.log(count);

//activate the last rectangle
var lastChild = document.getElementById(index);
lastChild.click();

var mapOn = true;

function turnMapOff() {
    mapOn = !mapOn;
}

function showInfo(dataSetName) {
    date.innerHTML = dataSetName;
    while (toRemove.length != 0) {
        events.removeChild(toRemove.pop());
    }

    if (mapOn) {
        map.flyTo(x[dataSetName].loc, x[dataSetName].zoom, x[dataSetName].options);
    }

    for (var feature in x[dataSetName].info) {
        if (feature.includes('Job')) {

            var section = document.createElement('section');
            section.className = 'sec br';


            var backgroundDetails = document.createElement('div');
            backgroundDetails.className = 'jobHolder'

            var logoHolder = document.createElement('div');
            logoHolder.className = "logoHolder";
            var logo = document.createElement('img');
            logo.src = x[dataSetName].info[feature].icon;
            logoHolder.appendChild(logo);

            backgroundDetails.appendChild(logoHolder);

            var summaryInfo = document.createElement('div');
            summaryInfo.className = "summaryInfo";

            var title = document.createElement('h3');
            title.className = "jobTitle";
            title.textContent = x[dataSetName].info[feature].title;
            summaryInfo.appendChild(title);

            var company = document.createElement('h4');
            company.textContent = x[dataSetName].info[feature].company;
            summaryInfo.appendChild(company);

            var range = document.createElement('h5');
            range.textContent = x[dataSetName].info[feature].range;
            summaryInfo.appendChild(range);

            var loc = document.createElement('h5');
            loc.textContent = x[dataSetName].info[feature].location;
            summaryInfo.appendChild(loc);

            backgroundDetails.appendChild(summaryInfo);

            section.appendChild(backgroundDetails);

            var extraDetails = document.createElement('div');
            extraDetails.className = "extraDetails";

            var deet = document.createElement('p');
            for (var i = 0; i < x[dataSetName].info[feature].addDetails.length; i++) {
                deet.textContent += "•  " + x[dataSetName].info[feature].addDetails[i] + '\r\n';

            }

            extraDetails.appendChild(deet);
            section.appendChild(extraDetails);

            events.appendChild(section);
            toRemove.push(section);


        } else if (feature == "Education") {
            var section = document.createElement('section');
            section.className = 'sec br';

            var schoolHolder = document.createElement('div');
            schoolHolder.className = 'schoolHolder';

            var logoHolder = document.createElement('div');
            logoHolder.className = 'logoHolder';

            var icon = document.createElement('img');
            icon.src = x[dataSetName].info[feature].icon;
            logoHolder.appendChild(icon);

            schoolHolder.appendChild(logoHolder);

            var summaryInfo = document.createElement('div');
            summaryInfo.className = 'summaryInfo';

            var name = document.createElement('h3');
            name.className = 'schoolTitle';
            name.textContent = x[dataSetName].info[feature].name;
            summaryInfo.appendChild(name);

            var title = document.createElement('h4');
            title.textContent = x[dataSetName].info[feature].title;
            summaryInfo.appendChild(title);

            var range = document.createElement('h5');
            range.textContent = x[dataSetName].info[feature].range;
            summaryInfo.appendChild(range);

            schoolHolder.appendChild(summaryInfo);
            section.appendChild(schoolHolder);



            var courses = document.createElement('table');
            courses.className = "courses";

            var tbdy = document.createElement('tbody');

            var trHead = document.createElement('tr');

            var th_courseNum = document.createElement('th');
            th_courseNum.textContent = "Course Number";
            trHead.appendChild(th_courseNum);

            var th_title = document.createElement('th');
            th_title.textContent = "Course Name";
            trHead.appendChild(th_title);

            var th_creds = document.createElement('th');
            th_creds.textContent = "Credit Hours";
            trHead.appendChild(th_creds);

            tbdy.appendChild(trHead);


            for (var i = 0; i < x[dataSetName].info[feature].courses.length; i++) {
                var tr = document.createElement('tr');

                var td_courseNum = document.createElement('td');
                td_courseNum.textContent = x[dataSetName].info[feature].courses[i].courseNum;
                tr.appendChild(td_courseNum);

                var td_title = document.createElement('td');
                td_title.textContent = x[dataSetName].info[feature].courses[i].title;
                tr.appendChild(td_title);

                var td_creds = document.createElement('td');
                td_creds.textContent = x[dataSetName].info[feature].courses[i].creditHours;
                tr.appendChild(td_creds);

                tbdy.appendChild(tr);
            }


            courses.appendChild(tbdy);
            section.appendChild(courses);

            events.appendChild(section);
            toRemove.push(section);

        } else if (feature == "school") {
            var section = document.createElement('section');
            section.className = 'sec br';

            var schoolHolder = document.createElement('div');
            schoolHolder.className = 'schoolHolder';

            var logoHolder = document.createElement('div');
            logoHolder.className = 'logoHolder';

            var icon = document.createElement('img');
            icon.src = x[dataSetName].info[feature].icon;
            logoHolder.appendChild(icon);

            schoolHolder.appendChild(logoHolder);

            var summaryInfo = document.createElement('div');
            summaryInfo.className = 'summaryInfo';

            var name = document.createElement('h3');
            name.className = 'schoolTitle';
            name.textContent = x[dataSetName].info[feature].name;
            summaryInfo.appendChild(name);

            var title = document.createElement('h4');
            title.textContent = x[dataSetName].info[feature].title;
            summaryInfo.appendChild(title);

            var range = document.createElement('h5');
            range.textContent = x[dataSetName].info[feature].range;
            summaryInfo.appendChild(range);

            schoolHolder.appendChild(summaryInfo);
            section.appendChild(schoolHolder);



            var courses = document.createElement('table');
            courses.className = "courses";

            var tbdy = document.createElement('tbody');

            var trHead = document.createElement('tr');

            var th_period = document.createElement('th');
            th_period.className = "period";
            th_period.textContent = "Period";
            trHead.appendChild(th_period);

            var th_title = document.createElement('th');
            th_title.textContent = "Course Title";
            trHead.appendChild(th_title);

            var th_creds = document.createElement('th');
            th_creds.textContent = "Fall";
            trHead.appendChild(th_creds);

            var th_creds2 = document.createElement('th');
            th_creds2.textContent = "Spring";
            trHead.appendChild(th_creds2);

            tbdy.appendChild(trHead);


            for (var i = 0; i < x[dataSetName].info[feature].courses.length; i++) {
                var tr = document.createElement('tr');

                var td_courseNum = document.createElement('td');
                td_courseNum.className = "period";
                td_courseNum.textContent = x[dataSetName].info[feature].courses[i].courseNum;
                tr.appendChild(td_courseNum);

                var td_title = document.createElement('td');
                td_title.textContent = x[dataSetName].info[feature].courses[i].title;
                tr.appendChild(td_title);

                var td_grade = document.createElement('td');
                td_grade.textContent = x[dataSetName].info[feature].courses[i].grade;
                tr.appendChild(td_grade);

                var td_grade2 = document.createElement('td');
                td_grade2.textContent = x[dataSetName].info[feature].courses[i].grade2;
                tr.appendChild(td_grade2);

                tbdy.appendChild(tr);
            }


            courses.appendChild(tbdy);
            section.appendChild(courses);

            events.appendChild(section);
            toRemove.push(section);


        } else if (feature == "summerSchool") {
            var section = document.createElement('section');
            section.className = 'sec br';

            var schoolHolder = document.createElement('div');
            schoolHolder.className = 'schoolHolder';

            var logoHolder = document.createElement('div');
            logoHolder.className = 'logoHolder';

            var icon = document.createElement('img');
            icon.src = x[dataSetName].info[feature].icon;
            logoHolder.appendChild(icon);

            schoolHolder.appendChild(logoHolder);

            var summaryInfo = document.createElement('div');
            summaryInfo.className = 'summaryInfo';

            var name = document.createElement('h3');
            name.className = 'schoolTitle';
            name.textContent = x[dataSetName].info[feature].name;
            summaryInfo.appendChild(name);

            var title = document.createElement('h4');
            title.textContent = x[dataSetName].info[feature].title;
            summaryInfo.appendChild(title);

            var range = document.createElement('h5');
            range.textContent = x[dataSetName].info[feature].range;
            summaryInfo.appendChild(range);

            schoolHolder.appendChild(summaryInfo);
            section.appendChild(schoolHolder);



            var courses = document.createElement('table');
            courses.className = "courses";

            var tbdy = document.createElement('tbody');

            var trHead = document.createElement('tr');

            var th_title = document.createElement('th');
            th_title.textContent = "Course Title";
            trHead.appendChild(th_title);

            var th_creds = document.createElement('th');
            th_creds.textContent = "Summer";
            trHead.appendChild(th_creds);


            tbdy.appendChild(trHead);


            for (var i = 0; i < x[dataSetName].info[feature].courses.length; i++) {
                var tr = document.createElement('tr');

                var td_title = document.createElement('td');
                td_title.textContent = x[dataSetName].info[feature].courses[i].title;
                tr.appendChild(td_title);

                var td_grade = document.createElement('td');
                td_grade.textContent = x[dataSetName].info[feature].courses[i].grade;
                tr.appendChild(td_grade);

                tbdy.appendChild(tr);
            }


            courses.appendChild(tbdy);
            section.appendChild(courses);

            events.appendChild(section);
            toRemove.push(section);

        }
        else {
            var section = document.createElement('section');
            section.className = 'sec br';
            var topic = document.createElement('h4');
            topic.textContent = feature;
            section.appendChild(topic);
            var para = document.createElement('p');
            para.textContent = x[dataSetName].info[feature];
            section.appendChild(para);

            events.appendChild(section);
            toRemove.push(section);
        }



    }
}

function getNext() {
    var next = document.getElementById(+index + +1);
    if (next) {
        next.click();
    } else {
        alert("This is still a mystery!")
    }
}

function getPrev() {
    var prev = document.getElementById(+index - +1);
    if (prev) {
        prev.click();
    } else {
        alert("This is out of the scope of this project")
    }
}

document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 37:
            getPrev();
            break;
        case 39:
            getNext();
            break;
    }
};





