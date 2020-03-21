<template>
  <div class="home">

    <!-- <img src="../assets/logo.png"> -->
    <!-- <Sidebar/> -->
    
    <LeftSide v-bind:events="x" v-bind:projects="projects" v-if="$mq != 'sm'"/>
    <Information v-bind:events="x" v-bind:eventOrder="eventOrder" v-if="$mq != 'sm'"/>
    <Timeline v-bind:events="x" v-if="$mq != 'sm'"/>
    <Form v-if="showModal && $mq != 'sm'" @close="showModal = false" ></Form>
    <div class="mobile" v-if="$mq === 'sm'">
      Hello! Welcome to Vivek's page. 
      <br>
      <br>
      Unfortunately, looks like your screen is too small!
      <br>
      <br>
      This page has been specially designed for larger screens and an upright spine.
      <br>
      <br>
      Please go to VivekRaja.me from a larger screen to learn about Vivek!

      <Profile/>
      
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import Information from '@/components/Information.vue'
import Timeline from '@/components/Timeline.vue'
import Sidebar from '@/components/Sidebar.vue'
import LeftSide from '@/components/LeftSide.vue'
import Form from '@/components/Form.vue'

import Profile from '@/components/Profile.vue'

import myX from '@/data/data.json'

export default {
  name: 'home',
  components: {
    Information,
    Timeline,
    Sidebar,
    LeftSide,
    Form,
    Profile
  },
  data: function () {
    return {
      // data
      showModal: false,
      //temporary @TODO
      // showModal: true,
      x: myX,
      eventOrder: [
        'January 12, 1998 to June 1999',
        'July 1999 to May 2003',
        'June 2003 to May 2005',
        'June 2005 to October 2007',
        'November 2007 to May 2009',
        'June 2009 to July 2012',
        'August 2012 to July 2013',
        'August 2013 to May 2014',
        'June 2014 to July 2014',
        'August 2014 to May 2015',
        'June 2015 to July 2015',
        'August 2015 to May 2016',
        'June 2016 to August 2016',
        'September 2016 to December 2016',
        'January 2017 to May 2017',
        'June 2017 to August 2017',
        'September 2017 to December 2017',
        'January 2018 to May 2018',
        'June 2018 to August 2018',
        'September 2018 to December 2018',
        'January 2019 to May 2019',
        'June 2019 to August 2019',
        'August 2019 to December 2019',
        'January 2020 to May 2020'
      ],
      projects: 
        [
          {
            title: 'Flagster @ THD',
            range: 'May 2018 - Aug 2018 • 3 mos',
            details: [
              'Developed a Feature-Flagging service allowing store-granular manipulation during run time',
              'Worked full-stack using TDD and XP and interacted with product owner to determine optimal design',
              'Deployed to production and is used daily by 2000+ stores in a department that accounts for 8% of firm’s revenue'
            ],
            tags: ['Vue.js', 'Node.js', 'MariaDB','Jasmine', 'Pivotal Cloud Foundry', 'Jest'],
            routerLink: {
              name: 'slides',
              props: {
                ppTitle: 'Flagster @ The Home Depot', 
                ppLink:'//www.slideshare.net/slideshow/embed_code/key/qWVOdWT4m1Rro5',
              }
            },

          },

          {
            title: 'Summer Projects @ Thrivent',
            range: 'May 2017 - Aug 2017 • 3 mos',
            details: [
              'Wrote Selenium scripts to automate testing, and contributed to PDF-parsing in framework',
              'Trained over 10 experienced Java developers in the Selenium framework',
              'Created a VBA script to search for abnormalities in a 100GB+ file with PPM Data'
            ],
            tags: ['Selenium WebDriver', 'Java', 'VBA', 'AntHill', 'Maven','Jenkins'],
            routerLink: {
              name: 'thrivent'
            },

          },
          
          {
            title: 'SYNCRUS (Winner at HackGT)',
            details: [
              'We were inspired by the data set provided by NCR to build a data visualization of a store\'s best selling departments in different cities across the nation',
              'We also built a simulation of shoppers to analyze the efficiency and shopper-friendly design of the stores locations per city.',
              'We wanted to create a analytical view of the entire lifecycle of selling a product, from warehouse distribution to product placement within each specific store.'
            ],
            range: 'Oct 13, 2017 - Oct 15, 2017 • 48 hours',
            link: 'https://vivekraja07.github.io/store_efficiency',
            tags: ['D3.js', 'Unity','Flask', 'SQLite'],
            github: 'https://github.com/vivekraja07/store_efficiency',
            devpost: 'https://devpost.com/software/tbd-2853e9'
          },

          {
            title: 'Gameboy Game: Drone Rebel',
            details: [
              'For CS 2110, created a gameboy game called Drone Rebel in which a drone would roam the screen dropping bombs',
              'The player will have to dodge the bombs while simultaneously shooting bullets back up at the drones'
            ],
            range: 'Mar 15, 2017 - Mar 20, 2017 • 1 week',
            link: 'https://vivekraja07.github.io/droneRebel/',
            tags: ['C'],
            github: 'https://github.com/vivekraja07/droneRebel'
          },

          {
            title: 'LifeMapper',
            range: 'May 2018 - Aug 2018 • 3 mos',
            details: [
              'Vue application that plots major life events on a Leaflet Map along with a time-line',
              'You are looking at it, right now'
            ],
            tags: ['Vue.js'],
            github: 'https://github.com/vivekraja07/lifeMapper',
          },

          {
            title: 'Day in the Lobby',
            range: 'Aug 2018 - May 2019 • 1 Year',
            details: [
              'Junior Design Project with the GT College of Computing as our client',
              'Installed raspberry pi cameras in the lobby to count number of people in line to meet recruiters',
              'Developed user-tested UI that enables easy analysis of the data'
            ]
          },

          {
            title: 'Craigslist Data Mining',
            range: 'Jun 2017 - Aug 2017 • 3 mos',
            details: [
              'Grabbed CraigsList data and stored in Excel',
              'Then, cross-referenced car with Kelly Blue Book to find out if car is a good deal or not'
            ],
            tags: ['Selenium WebDriver', 'Java', 'Apache POI'],
            github: 'https://github.com/vivekraja07/Craigslist-Data-Mining'
          },
          {
            title: 'Expense Report',
            range: 'Jun 2017 - Aug 2017 • 3 mos',
            details: [
              'Created an Expense Report that would forecast spending based on current trends, had budgetary capabilities, and had a friendly UI'
            ],
            tags: ['VBA']
          },
          {
            title: 'Project Euler',
            range: 'Sep 2016 to Dec 2016 • 1 semester',
            details: [
              'A series of challenging mathematical/computer programming problems that will require more than just mathematical insights to solve',
              'Although mathematics will help you arrive at elegant and efficient methods, the use of a computer and programming skills will be required to solve most problems',
              'Solved 65 problems on the site (top 3.532% on the site)'
            ],
            tags: ['Java'],
            github: 'https://github.com/vivekraja07/ProjectEuler'
          },
          {
            title: 'LinkedOut',
            range: 'Jan 2019 - Present • 1 Semester',
            details: [
              'Scraping LinkedIn data of GT Alumni, then visualizing the results of various ML algorithms to extract data'
            ]},
          {
            title: 'My Finances',
            range: 'Jan 2019 - Present • 1 Semester',
            details: [
              'Developing a personalized finance website to replace my use of Intuit Mint'
            ]},
          {
            title: 'My Tasks',
            range: 'Jan 2019 - Present • 1 Semester',
            details: [
              'Developing a personalized to-do app that caters to my needs and habits'
            ],
            github: 'https://github.com/vivekraja07/tasks'
          },
          {
            title: 'Internship Search Visualization',
            range: 'Jan 2019 - Present • 1 Semester',
            details: [
              'Developing a visualization using D3 and collected data of the timeline of my 2019 summer internship search'
            ]
            },
        ]
      
    }
  }
}

</script>

<style scoped>

.home {
  height: 100%;
  width: 100%;
  font-size: 0;
}

.mobile {
  font-size: 20px;
  
}

</style>
