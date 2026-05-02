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
    display: inline-block;
    font-size: 1rem;
    vertical-align: top;
    background: var(--color-surface, #fff);
}

#events {
  overflow: auto;
  overflow-x: hidden;
  height: 90%;
  padding-right: 0;
  scrollbar-gutter: stable;
}

section {
    border: var(--border-section-width, 3px) solid var(--color-border, #e2e8f0);
    border-top: 0;
    padding: 1.25rem 1.5rem 1.25rem 1.25rem;
    text-align: left;
    background: var(--color-surface, #fff);
}

section:first-of-type {
  border-top: var(--border-section-width, 3px) solid var(--color-border, #e2e8f0);
}

.general .title {
  font-family: var(--font-display, system-ui, sans-serif);
  font-weight: var(--font-heading-weight, 700);
  font-size: 1.125rem;
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
  text-align: center;
  color: var(--color-ink, #0f172a);
}

.general li {
  list-style: none;
  line-height: 1.55;
  padding-left: 0;
  margin-bottom: 0.35rem;
}

</style>
