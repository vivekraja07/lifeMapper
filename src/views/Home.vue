<template>
  <div class="home">
    <!-- <img src="../assets/logo.png"> -->
    <Sidebar/>
    <Map v-bind:events="x"/>
    <Information v-bind:events="x"/>
    <Timeline v-bind:events="x"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Information from '@/components/Information.vue'
import Timeline from '@/components/Timeline.vue'
import Map from '@/components/Map.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'home',
  components: {
    Information,
    Timeline,
    Map,
    Sidebar
  },
  data: function() { 
    return {
      //data
      x: {
          //born in Tirupur
          'January 12, 1998 to June 1999': {
              start: 'January-1998',
              end: 'June-1999',
              loc: [11.1085, 77.3411],
              zoom: 18,
              options: { duration: 15 },
              info: {
                  General: {
                      title: "This is where the story begins folks.",
                      Location: "Tirupur, Tamil Nadu"
                  },
                  Languages: ["Tamil"]
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
                  General: {
                      title: "Moved to the neighboring, more industrial city",
                      Location: "Coimbatore, Tamil Nadu"
                  },
                  school: {
                      title: "Ramakrishna Mission School",
                      name: "Kindergarten",
                      range: "Jun 2001 - May 2002 • 1 year",
                      icon: require('../assets/icons/ramakrishna.jpg')
                  },
                  Education: {
                      title: "Perks Matriculation",
                      name: "1st Grade Student",
                      range: "Jun 2002 - May 2003 • 1 year",
                      icon: require('../assets/icons/perks.png'),
                  },
                  Languages: ["Tamil"],
                //   School: "Perks Matriculation \nRamakrishna Mission \nAvanashi-Lingam"
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
                  General: {
                    title: "Moved to the distant state of Gujarat, where I learned some new languages",
                    Location: "Ahemdabad, Gujarat",
                  },
                  Education: {
                      title: "Eklavya Vidyalaya",
                      name: "1st - 2nd Grade Student",
                      range: "Jun 2003 - May 2005 • 2 years",
                      icon: require('../assets/icons/eklavya.jpg'),
                  },
                  Languages: ["Tamil","English","Hindi"],
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
                  General: {
                    title: "Moved to the distant state of Uttar Pradesh, which is on the outskirts of Delhi. ",
                    Location: "Noida, Uttar Pradesh",
                  },
                  Education: {
                      title: "Kothari International School",
                      name: "3th - 4th Grade Student",
                      range: "Jun 2005 - Oct 2007 • 1.5 years",
                      icon: require('../assets/icons/kothari.png'),
                  },
                  Languages: ["Tamil","English","Hindi"],
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
                  General: {
                      title: "Arrived at the US of A.",
                      Location: "Alpharetta, Georgia"
                  },
                  Education: {
                      title: "Abbotts Hill Elementary",
                      name: "4th - 5th Grade Student",
                      range: "Nov 2007 - May 2009 • 1.5 years",
                      icon: require('../assets/icons/abbotts.jpg'),
                  },
                  Languages: ["Tamil","English","Hindi","Spanish"],
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
                  General: {
                    title: "These 3 years of middle school were a period of great growth and development",
                    Location: "Alpharetta, Georgia",
                  },
                  Education: {
                      title: "Webb Bridge Middle School",
                      name: "6th - 8th Grade Student",
                      range: "Aug 2009 - May 2012 • 3 years",
                      icon: require('../assets/icons/wbms.jpeg'),
                  },
                  Languages: ["Tamil","English","Hindi","Spanish"],
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
                  General: {
                    title: "9th grade",
                    Location: "Alpharetta, Georgia",
                  },
                  school: {
                      title: "Chattahoochee High School",
                      name: "Freshman",
                      icon: require('../assets/icons/hooch.png'),
                      range: "Aug 2012 - May 2013 • 1 year",
                      courses: {
                          columns: ['Course Number', 'Course Title', 'Fall', 'Spring'],
                          rows: [
                                [1, "Accelerated Geometry Honors", '105', '106'],
                                [2, "Honors Biology", "105", '106'],
                                [3, "Band - Tuba Player", "97", "100"],
                                [4, "Home Room/Lunch", '-', '-'],
                                [5, "Spanish 2 Honors", "106", "106"],
                                [6, "Literature and Comprehension", "97", "100"],
                                [7, "AP US Government and Politics", "107", "-"],
                                [7, "AP Comparative Government", "-", "105"]   
                            ]
                      },
                  },
                  Languages: ["Tamil","English","Hindi","Spanish"],
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
                  General: {
                      title: "10th Grade",
                      Location: "Alpharetta, Georgia"
                  },
                  school: {
                      title: "Chattahoochee High School",
                      name: "Sophomore",
                      icon: require('../assets/icons/hooch.png'),
                      range: "Aug 2013 - May 2014 • 1 year",
                      courses: {
                        columns: ['Course Number', 'Title', 'Fall', 'Spring'],
                        rows: [
                            [1, 'Honors Chemistry', 103, 104],
                            [2, 'Band - Tuba Player', 100, 100],
                            [3, 'Honors Literature', 103, 104],
                            [4, 'Spanish 3 Honors', 103, 104],
                            [5, 'Home Room/Lunch', '-', '-'],
                            [6, 'AP World History', 101, 100],
                            [7, 'Accelerated PreCalculus Honors', 107, 105]
                        ]
                      }
                  },
                  Languages: ["Tamil","English","Hindi","Spanish"],
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
                  General: {
                    title: "Sandwich Artist at Subway",
                    Location: "Alpharetta, Georgia",
                  },
                  Job: {
                      title: "Sandwich Artist",
                      name: "Subway",
                      icon: require('../assets/icons/subway.png'),
                      range: "Jun 2014 to July 2014 • 3 mos",
                      location: "Duluth, GA",
                      addDetails: [
                          "Managed all transactions and dealt with customers single-handedly.",
                          "Learned about the business operations and efficient procedures of the multi-million dollar corporation.",
                          "Created a report at the end of the summer with sales data, outlining ideas on decreasing costs and increasing sales."
                      ]
                  },
                  summerSchool: {
                      title: "Fulton Virtual School",
                      name: "Sophomore",
                      icon: require('../assets/icons/fvs.png'),
                      range: "June 2013 - July 2014 • 3 mos",
                      courses: {
                          columns: ['Course', 'Summer'],
                          rows: [['FVS General Health', 99]]
                       }
                  },
                  Languages: ["Tamil","English","Hindi","Spanish"]
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
                  General: {
                    title: "11th grade",
                    Location: "Alpharetta, Georgia",
                  },
                  school: {
                      title: "Chattahoochee High School",
                      name: "Junior",
                      icon: require('../assets/icons/hooch.png'),
                      range: "Aug 2014 - May 2015 • 1 year",
                      courses: {
                        columns: ['Course Number', 'Title', 'Fall', 'Spring'],
                        rows: [
                            [1, 'AP Spanish Lang', 106, 106],
                            [2, 'AP US History', 103, 100],
                            [3, 'Accounting Principles 1', 98, 96],
                            [4, 'Home Room/Lunch', '-', '-'],
                            [5, 'AP Calculus BC', 103, 102],
                            [6, 'AP Chemistry', 102, 102],
                            [7, 'AP English Lanugage', 99, 100]
                        ]
                      }
                  },
                  Languages: ["Tamil","English","Hindi","Spanish"]
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
                  General: {
                    title: "TopGolf + Cross-Country + Tutoring",
                    Location: "Alpharetta, Georgia",
                  },
                  Job: {
                      title: "Food Runner and Busser",
                      name: "TopGolf",
                      icon: require('../assets/icons/topgolf.png'),
                      range: "Jun 2015 to Jul 2015 • 2 mos",
                      location: "Alpharetta, GA",
                      addDetails: [
                          "Ensured guest satisfaction and created a fun environment.",
                          "Carried around 8lbs of food up and down a fleet of stairs to guests at the facility"
                      ]
                  },
                  Job2: {
                      title: "Private Tutor",
                      name: "Self-Employed",
                      icon: require('../assets/icons/tutor.png'),
                      range: "Jun 2015 - Jul 2015 • 2 mos",
                      location: "Johns Creek, GA",
                      addDetails: [
                          "Tutored 3 elementary and middle school students in basic English and Mathematics"
                      ]
                  },
                  Languages: ["Tamil","English","Hindi","Spanish"]
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
                  General: {
                    title: "12th grade",
                    Location: "Alpharetta, Georgia",
                  },
                  school: {
                      title: "Chattahoochee High School",
                      name: "Senior",
                      icon: require('../assets/icons/hooch.png'),
                      range: "Aug 2015 - May 2016 • 1 year",
                      courses: {
                        columns: ['Course Number', 'Title', 'Fall', 'Spring'],
                        rows: [
                            [1, 'GT Distance Calculus MOWR', 102, 92],
                            [2, 'Personal Fitness', 99, '-'],
                            [2, 'GPC - College English 1102', '-', 92],
                            [3, 'AP Microeconomics', 99, '-'],
                            [3, 'AP Macroeconomics', '-', 98],
                            [4, 'Home Room/Lunch',  '-', '-'],
                            [5, 'AP Computer Science A', 104, 99],
                            [6, 'AP Physics 1', 103, 95],
                            [7, 'AP Statistics', 102, 95],
                        ]
                      }
                  },
                  Job: {
                      title: "President and Founder",
                      name: "APEX Tutoring",
                      icon: require('../assets/icons/apex.png'),
                      range: "Apr 2016 - Jun 2016 • 3 mos",
                      location: "GT Campus",
                      addDetails: [
                          "Opened up a tutoring center (2200 square feet) for high school students taking the AP Exam.",
                          "Helped over 41 students ace their exams, leading Principal of CHS, Tim Corrigan to claim, “Thank you for providing this wonderful opportunity for our students.”",
                      ]
                  },
                  Job2: {
                      title: "President and Founder",
                      name: "Winter Cougar Tennis Camp",
                      icon: require('../assets/icons/winterCougarTennis.png'),
                      range: "Dec 2015 • 1 week",
                      location: "Alpharetta, GA",
                      addDetails: [
                          "Organized a camp for all tennis players interested in trying out for Chattahoochee’s Varsity team.",
                          "More than 65% of the players that attended camp and tried out made the team."
                      ]
                  },
                  Job3: {
                      title: "Private Tutor for AP US Government",
                      name: "Self-Employed",
                      icon: require('../assets/icons/govTutor.png'),
                      range: "Aug 2015 - Mar 2016 • 1 year",
                      location: "Johns Creek, GA",
                      addDetails: [
                          "Tutored around 30 high school students, primarily in the class of AP Government"
                      ]
                  },
                  Languages: ["Tamil","English","Hindi","Spanish"]
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
                  General: {
                    title: "Financial Analyst Internship",
                    Location: "Atlanta, Georgia",
                  },
                  Job: {
                      title: "Financial Analyst Internship",
                      name: "Scheller College of Business at Georgia Tech",
                      icon: require('../assets/icons/scheller.png'),
                      range: "Jun 2016 - Aug 2016 • 3 mos",
                      location: "GT Campus",
                      addDetails: [
                          "Used Bloomberg Essentials to recreate contemporary models of the 1992 Tweedy, Browne’s famous “What has Worked in Investing” Report",
                      ]
                  },
                  Languages: ["Tamil","English","Hindi","Spanish"]
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
                  General: {
                    title: "Freshman year 1st semester at GA Tech",
                    Location: "Atlanta, Georgia",
                  },
                  Education: {
                      title: "Georgia Institute of Technology",
                      name: "BS - Computer Science, minor in Spanish",
                      range: "2016 - 2020 • Freshman",
                      icon: require('../assets/icons/gatech.png'),
                      courses: {
                          columns: ['Course Number','Course Name','Credit Hours'],
                          rows: [
                            ["CS 2051", "Honors Discrete Math", "3"],
                            ["CS 1331", "Intro to Object Oriented Programming", "3"],
                            ["CS 1100", "Freshman Leap Seminar", "1"],
                            ["MGT 3078", "Finance and Investments","3"],
                            ["PHYS 2211","Intro Physics I","4"],
                            ["APPH 1040", "Scientific Foundation of Health","2"]
                          ]
                      }
                  },
                  Projects: [{
                      title: "Project Euler",
                    details: [
                          "A series of challenging mathematical/computer programming problems that will require more than just mathematical insights to solve",
                          "Although mathematics will help you arrive at elegant and efficient methods, the use of a computer and programming skills will be required to solve most problems",
                          "Solved 65 problems on the site (top 3.532% on the site)"
                      ]
                  }],
                  Languages: ["Tamil","English","Hindi","Spanish"]
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
                  General: {
                    title: "Freshman year 2nd semester at GA Tech",
                    Location: "Atlanta, Georgia",
                  },
                  Education: {
                      title: "Georgia Institute of Technology",
                      name: "BS - Computer Science, minor in Spanish",
                      range: "2016 - 2020 • Freshman",
                      icon: require('../assets/icons/gatech.png'),
                      courses: {
                          columns: ['Course Number','Course Name','Credit Hours'],
                          rows: [
                            ["CS 1332", "Data Structures and Algorithms", "3"],
                            ["CS 2110", "Computer Organization and Programming", "4"],
                            ["CS 2340", "Objects and Design", "3"],
                            ["CHEM 1212k", "Chemical Principles II","4"],
                          ]
                      }
                  },
                Projects: [{
                    title: "WaterFall",
                    details: [
                          "Developed an Android application that allows users and experts to report water availability and contamination levels in their area in the event of a natural disaster",
                          "Used a Firebase backend for authorization and water report storage, implementing maps and location services to help users find clean water nearby"
                      ]
                  },
                    {
                    title: "Gameboy Game: Drone Wars",
                    details: [
                          "For CS 2110, created a gameboy game called Drone Wars in which a drone would roam the screen dropping bombs",
                          "The player will have to dodge the bombs while simultaneously shooting bullets back up at the drones",
                          "This game was written using native C"
                      ]
                  }],
                  Languages: ["Tamil","English","Hindi","Spanish"]
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
                  General: {
                    title: "Software Engineer Internship at Thrivent Financial",
                    Location: "Atlanta, Georgia",
                  },
                  Job: {
                      title: "Planning and Execution Oversight Intern",
                      name: "Thrivent Financial",
                      icon: require('../assets/icons/thrivent.jpeg'),
                      range: "Jun 2017 - Aug 2017 • 3 mos",
                      location: "Appleton, Wisconsin",
                      addDetails: [
                          "Wrote selenium scripts to automate testing of applications using WebDriver, java, and Selenium Grid",
                          "Trained over 10 experienced java developers in Selenium scripting",
                          "Created a VBA script to search for abnormalities in a 100GB+ file with PPM Data. Script would send an email with results of validation test"
                      ]
                  },
                  Projects: [{
                    title: "Craigslist Data Mining",
                    details: [
                          "Using Selenium WebDriver, Java, ChromeDriver, Apache POI, and Excel to grab CraigsList data and store in Excel",
                          "Then, cross-referenced car with Kelly Blue Book to find out if car is a good deal or not"
                      ]
                  },{
                    title: "Expense Report",
                    details: [
                          "Created an Expense Report using VBA that would forecast spending based on current trends, had budgetary capabilities, and had a friendly UI"
                      ]
                  }],
                  Languages: ["Tamil","English","Hindi","Spanish"]
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
                  General: {
                    title: "Sophomore year 1st semester at GA Tech",
                    Location: "Atlanta, Georgia",
                  },
                  Job: {
                      title: "Tutor - CS 2110 and CS 1332",
                      name: "College of Computing at Georgia Tech",
                      icon: require('../assets/icons/coc.png'),
                      range: "September 2017 - December 2018 • 5 mos",
                      location: "GT Campus",
                      addDetails: [
                          "Tutored 3 students weekly in CS 2110 (Computer Systems and Organization) and CS 1332 (Data Structures and Algorithms)",
                      ]
                  },
                  Education: {
                      title: "Georgia Institute of Technology",
                      name: "BS - Computer Science, minor in Spanish",
                      range: "2016 - 2020 • Sophomore",
                      icon: require('../assets/icons/gatech.png'),
                      courses: {
                          columns: ['Course Number','Course Name','Credit Hours'],
                          rows: [
                            ["CS 2200", "Systems and Networks", "4"],
                            ["CS 3600", "Intro to Artificial Intelligence", "3"],
                            ["CS 4400", "Intro to Database Systems", "3"],
                            ["PSYCH 1101", "General Psychology","3"],
                            ["SPAN 3101", "Spanish Conversation I","3"],
                          ]
                      }
                  },
                  Projects: [{
                    title: "SYNCRUS (Winner at HackGT)",
                    details: [
                          "We were inspired by the data set provided by NCR to build a data visualization of a stores best selling departments in different cities across the nation",
                          "We also build a simulation of shoppers to analyze the efficiency and shopper-friendly design of the stores locations per city.",
                          "We wanted to create a analytical view of the entire lifecycle of selling a product, from warehouse distribution to product placement within each specific store."
                      ]
                  }],
                  Languages: ["Tamil","English","Hindi","Spanish"]
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
                  General: {
                      title: "Sophomore year 2nd semester at GA Tech",
                      Location: "Atlanta, Georgia"
                  },
                  Job: {
                      title: "Teaching Assistant, CS 2200: Systems and Networks",
                      name: "College of Computing at Georgia Tech",
                      icon: require('../assets/icons/coc.png'),
                      range: "Jan 2018 - May 2018 • 5 mos",
                      location: "GT Campus",
                      addDetails: [
                          "Design homework questions and projects both to help study and demonstrate mastery of material",
                          "Lecture recitation urging students to be engaged and excited to learn about microprocessors and network designs",
                          "Tutor students individually, assisting with both homework and general questions"
                      ]
                  },
                  Education: {
                      title: "Georgia Institute of Technology",
                      name: "BS - Computer Science, minor in Spanish",
                      range: "2016 - 2020 • Sophomore",
                      icon: require('../assets/icons/gatech.png'),
                      courses: {
                          columns: ['Course Number','Course Name','Credit Hours'],
                          rows: [
                            ["CS 3251", "Computer Networking I", "3"],
                            ["CS 3511", "Algorithms Honors", "3"],
                            ["CS 4641","Machine Learning","3"],
                            ["ISYE 3770","Statistics and Applications","3"],
                            ["PHIL 3127", "Sci, Tech, & Human Values","3"]
                          ]
                      }
                  },
                  Languages: ["Tamil","English","Hindi","Spanish"]
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
                  General: {
                      title: "Software Engineer Internship at Home Depot",
                      Location: "Atlanta, Georgia"
                  },
                  Job: {
                      title: "Software Engineering Intern",
                      name: "The Home Depot",
                      icon: require('../assets/icons/homeDepot.png'),
                      range: "May 2018 - Aug 2018 • 3 mos",
                      location: "Smyrna, GA",
                      addDetails: [
                          "Created Flagster, a Feature-Flagging service using Node.js for the API and Vue.js for the front-end",
                          "Worked full-stack using TDD and XP and interacted with product owner to determine optimal design",
                          "Deployed to production and is used daily by 2000+ stores in a department that accounts for 8% of firm’s revenue"
                      ]
                  },
                  Projects: [{
                    title: "LifeMapper",
                    details: [
                          "Vue application that plots major life events on a Leaflet Map along with a time-line",
                      ]
                  }],
                  Languages: ["Tamil","English","Hindi","Spanish"]
              }
          },
      }
    }
  }
}
</script>

<style scoped>

.home {
  height: 100%;
  width: 100%;
}



</style>
