<template>
  <div class="home">

    <!-- <img src="@/assets/logo.png"> -->
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
import Information from '@/components/information/Information.vue'
import Timeline from '@/components/Timeline.vue'
import Sidebar from '@/components/Sidebar.vue'
import LeftSide from '@/components/leftSide/LeftSide.vue'
import Form from '@/components/Form.vue'

import Profile from '@/components/leftSide/Profile.vue'

import myX from '@/data/data.json'
import myEventOrder from '@/data/eventOrder.json'
import myProjects from '@/data/projects.json'

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
      eventOrder: myEventOrder,
      projects: myProjects,
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
