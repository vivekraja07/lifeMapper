<template>

  <div id='features'>
    
    <Dates/>

    <div id = "events">
      <div v-for="(value, propertyName, index) in events[active].info" :key="index">
        
        <section v-if="!propertyName.includes('Languages')">

          <Education v-if="propertyName=='school' || propertyName=='Education'" v-bind:School="value"/>

          <Jobs v-if="propertyName=='Jobs'" v-bind:Jobs="value"/>

          <div class = "general" v-if="propertyName=='General'">
              <h3 class = "title"> General </h3>
              <li> {{value.title}} </li>
              <li> {{value.Location}} </li>
          </div>

          <Projects v-if="propertyName=='Projects'" v-bind:Projects="value"/>

          <Activities v-if="propertyName=='Activities'" v-bind:activities="value"/>

        </section>

      </div>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Activities from '@/components/information/Activities.vue'
import Education from '@/components/information/Education.vue'
import Jobs from '@/components/information/Jobs.vue'
import Projects from '@/components/information/Projects.vue'
import Dates from '@/components/information/Dates.vue'

export default {
  name: 'Information',
  props: {
    events: Object,
    eventOrder: Array
  },
  components: {
    Activities,
    Education,
    Jobs,
    Projects,
    Dates
  },
  computed: {
    active () {
      return this.$store.state.active
    },
    open () {
      return this.$store.state.sidebarOpen
    }
  }
}
</script>

<style scoped>
/* Make sure that padding behaves as expected */
* {box-sizing:border-box}

#features {
    height: 90%;
    width: 50%;
    /* overflow: auto; */
    display: inline-block;
    font-size: 1rem;
}

#events {
  overflow: auto;
  height: 90%;
}


/* section styles go here */

section {
    border: 3px solid;
    border-style: solid;
    border-top: 0;
    padding: 20px 72px 16px 24px;
    text-align: left;
}

/* logo icon styles go here */

.logoHolder {
  width: 72px;
  height: 72px;
  float: left;
}

.imageHolder {
  border-radius: 6px;
  height: 56px;
  width: 56px;
  background-size: contain;
}

img {
    border-radius: 6px;
    border: 4px solid transparent;
    height: 64px;
    width: 64px;
}

</style>
