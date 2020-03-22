<template>

  <div id='features'>
    
    <Dates v-bind:eventOrder="eventOrder"/>

    <div id = "events">
      <div v-for="(value, propertyName, index) in events[active].info" :key="index">
        
        <section v-if="!propertyName.includes('Languages')">

          <Activity v-if="propertyName=='school' || propertyName=='Education'" v-bind:activity="value"/>

          <Activities v-if="propertyName=='Jobs'" v-bind:activities="value" sectionTitle='Jobs'/>

          <div class = "general" v-if="propertyName=='General'">
              <h3 class = "title"> General </h3>
              <li> {{value.title}} </li>
              <li> {{value.Location}} </li>
          </div>

          <Projects v-if="propertyName=='Projects'" v-bind:Projects="value"/>

          <Activities v-if="propertyName=='Activities'" v-bind:activities="value" sectionTitle='Activities'/>

        </section>

      </div>
    </div>

  </div>
</template>

<script>
import Activities from '@/components/information/Activities.vue'
import Projects from '@/components/information/Projects.vue'
import Dates from '@/components/information/Dates.vue'

import Activity from '@/components/information/Elements/Activity.vue'

export default {
  name: 'Information',
  props: {
    events: Object,
    eventOrder: Array
  },
  components: {
    Activities,
    Projects,
    Dates,
    Activity
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

section {
    border: 3px solid;
    border-style: solid;
    border-top: 0;
    padding: 20px 72px 16px 24px;
    text-align: left;
}

</style>
