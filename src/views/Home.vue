<template>
  <div class="home">
    <!-- <img src="../assets/logo.png"> -->
    <Information v-bind:events="x"> </Information>
    <Timeline v-bind:events="x"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Information from '@/components/Information.vue'
import Timeline from '@/components/Timeline.vue'


export default {
  name: 'home',
  components: {
    Information,
    Timeline
  },
  data: function() { 
    return {
      //data
      x: { 
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
                      icon: require('../assets/icons/homeDepot.png'),
                      // icon: 'homeDepot',
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
