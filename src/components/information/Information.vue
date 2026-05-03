<template>

  <div id='features'>
    
    <Dates v-bind:eventOrder="eventOrder"/>

    <div id = "events">
      <div v-for="(value, propertyName, index) in activeInfo" :key="index">
        
        <section
          v-if="!propertyName.includes('Languages')"
          class="info-section"
          :class="{ 'info-section--general': propertyName === 'General' }"
        >

          <Activity v-if="propertyName=='school' || propertyName=='Education'" v-bind:activity="value"/>

          <Activities v-if="propertyName=='Jobs'" v-bind:activities="value"/>

          <div class="general" v-if="propertyName=='General'">
              <p class="general-line general-title">{{ value.title }}</p>
              <p class="general-line general-location">
                <button
                  type="button"
                  class="general-map-link"
                  aria-label="Show map on the left for this period"
                  @click="focusLeftMap"
                >
                  <svg
                    class="general-location-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span class="general-map-text">{{ value.Location }}</span>
                </button>
              </p>
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
    },
    activeInfo () {
      const ev = this.events && this.events[this.active]
      return ev && ev.info ? ev.info : {}
    }
  },
  methods: {
    focusLeftMap () {
      this.$store.commit('setLeftSidePick', 'Map')
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

.info-section {
    border: var(--border-section-width, 3px) solid var(--color-border, #e2e8f0);
    border-top: 0;
    padding: 1.25rem 1.5rem 1.25rem 1.25rem;
    text-align: left;
    background: var(--color-surface, #fff);
}

.info-section:first-of-type {
  border-top: var(--border-section-width, 3px) solid var(--color-border, #e2e8f0);
}

.info-section--general {
  padding: 0.5rem 1.25rem 0.6rem 1.25rem;
}

.general-line {
  margin: 0 0 0.2rem;
  line-height: 1.4;
  font-size: 0.9375rem;
  color: var(--color-ink, #0f172a);
}

.general-line:last-child {
  margin-bottom: 0;
}

.general-title {
  font-family: var(--font-sans, system-ui, sans-serif);
  font-weight: 700;
  font-size: 1.0625rem;
  letter-spacing: -0.03em;
  line-height: 1.35;
  color: var(--color-ink, #0f172a);
}

.general-location {
  color: var(--color-muted, #64748b);
  font-size: 0.875rem;
}

.general-map-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  cursor: pointer;
  font: inherit;
  font-size: inherit;
  color: var(--color-accent, #0ea5e9);
  text-decoration: none;
  text-align: left;
}

.general-location-icon {
  width: 1.05em;
  height: 1.05em;
  flex-shrink: 0;
}

.general-map-link:hover {
  color: var(--color-accent-hover, #0284c7);
  text-decoration: underline;
}

</style>
