<template>

  <div id="features" :class="{ 'features--stacked': stacked }">

    <Dates v-if="!stacked" v-bind:eventOrder="eventOrder"/>

    <div v-if="!stacked" class="panel-tabs" role="tablist" aria-label="Right panel view">
      <button
        v-for="tab in tabs"
        :key="tab"
        type="button"
        role="tab"
        class="panel-tab"
        :class="{ 'panel-tab--active': panelTab === tab }"
        :aria-selected="panelTab === tab ? 'true' : 'false'"
        @click="setPanelTab(tab)"
      >
        {{ tab === 'Period' ? 'This period' : tab }}
      </button>
    </div>

    <Skills v-if="!stacked && panelTab === 'Skills'" class="panel-pane" :events="events"/>
    <AllProjects v-else-if="!stacked && panelTab === 'Projects'" class="panel-pane" :projects="projects"/>

    <div v-else id="events" :class="{ 'events--stacked': stacked }">
      <template v-for="(value, propertyName) in activeInfo">

        <header
          v-if="propertyName === 'General'"
          :key="propertyName"
          class="period-header"
        >
          <h2 class="period-header__title">{{ value.title }}</h2>
          <p v-if="value.Location" class="period-header__place">
            <svg
              class="period-header__pin"
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
            {{ value.Location }}
          </p>
        </header>

        <section
          v-else-if="sectionLabel(propertyName)"
          :key="propertyName"
          class="info-card"
        >
          <p class="info-card__label">{{ sectionLabel(propertyName) }}</p>

          <Activity v-if="propertyName=='school' || propertyName=='Education'" v-bind:activity="value"/>

          <Activities v-if="propertyName=='Jobs'" v-bind:activities="value" link-on="name"/>

          <Projects v-if="propertyName=='Projects'" v-bind:Projects="value"/>

          <Activities v-if="propertyName=='Activities'" v-bind:activities="value"/>
        </section>

      </template>
    </div>

    <!-- Soft fade at the bottom of the right panel while more content sits below the fold -->
    <div
      v-if="!stacked"
      class="scroll-fade"
      :class="{ 'scroll-fade--on': moreBelow }"
      aria-hidden="true"
    ></div>

  </div>
</template>

<script>
import Activities from '@/components/information/Activities.vue'
import Projects from '@/components/information/Projects.vue'
import Dates from '@/components/information/Dates.vue'
import Skills from '@/components/leftSide/Skills.vue'
import AllProjects from '@/components/leftSide/Projects.vue'

import Activity from '@/components/information/Elements/Activity.vue'

export default {
  name: 'Information',
  props: {
    events: Object,
    eventOrder: Array,
    /** Portfolio list for the Projects tab (wide layout only). */
    projects: {
      type: Array,
      default: () => []
    },
    /** Full-width column: hide duplicate Dates (use outer nav) and drop % heights */
    stacked: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Activities,
    Projects,
    Dates,
    Activity,
    Skills,
    AllProjects
  },
  data () {
    return {
      tabs: ['Period', 'Skills', 'Projects'],
      moreBelow: false
    }
  },
  watch: {
    active () {
      this.$nextTick(() => this.resetScroll())
    },
    panelTab () {
      this.$nextTick(() => this.resetScroll())
    }
  },
  mounted () {
    if (this.stacked) return
    // scroll/load don't bubble, so listen in the capture phase for whichever pane is showing
    this.$el.addEventListener('scroll', this.updateFade, true)
    this.$el.addEventListener('load', this.updateFade, true)
    window.addEventListener('resize', this.updateFade)
    this.$nextTick(() => this.updateFade())
  },
  beforeDestroy () {
    this.$el.removeEventListener('scroll', this.updateFade, true)
    this.$el.removeEventListener('load', this.updateFade, true)
    window.removeEventListener('resize', this.updateFade)
  },
  computed: {
    active () {
      return this.$store.state.active
    },
    open () {
      return this.$store.state.sidebarOpen
    },
    panelTab () {
      return this.$store.state.panelTab
    },
    activeInfo () {
      const ev = this.events && this.events[this.active]
      return ev && ev.info ? ev.info : {}
    }
  },
  methods: {
    /** The scrolling pane currently shown on the right (period story, skills, or projects). */
    scroller () {
      return this.$el ? this.$el.querySelector('#events, #skills, #projects') : null
    },
    /** New period or tab: start at the top instead of wherever the last one was scrolled to. */
    resetScroll () {
      if (this.stacked) return
      const el = this.scroller()
      if (el) el.scrollTop = 0
      this.updateFade()
    },
    updateFade () {
      const el = this.scroller()
      this.moreBelow = !!el && el.scrollHeight - el.scrollTop - el.clientHeight > 8
    },
    /** Small uppercase label above each card; null hides the section (e.g. skill lists). */
    sectionLabel (propertyName) {
      const labels = {
        Jobs: 'Work',
        school: 'Education',
        Education: 'Education',
        Activities: 'Activities',
        Projects: 'Projects'
      }
      return labels[propertyName] || null
    },
    setPanelTab (tab) {
      this.$store.commit('setPanelTab', tab)
    }
  }
}
</script>

<style scoped>
/* Make sure that padding behaves as expected */
* {box-sizing:border-box}

#features {
    position: relative;
    height: 100%;
    width: 100%;
    min-height: 0;
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    background: var(--color-surface, #fff);
}

#events {
  overflow: auto;
  overflow-x: hidden;
  flex: 1 1 0;
  min-height: 0;
  padding: 0 1rem 1.25rem;
  background: #f6f8fb;
  scrollbar-gutter: stable;
}

#features.features--stacked {
  width: 100%;
  height: auto;
  display: block;
  vertical-align: top;
}

#events.events--stacked {
  height: auto;
  max-height: none;
  overflow: visible;
  overflow-x: hidden;
  padding: 0 0.75rem 0.75rem;
  background: transparent;
}

.period-header {
  padding: 1.1rem 0.25rem 0.85rem;
  text-align: left;
}

.period-header__title {
  margin: 0;
  font-family: var(--font-sans, system-ui, sans-serif);
  font-weight: 800;
  font-size: 1.3rem;
  line-height: 1.25;
  letter-spacing: -0.025em;
  color: var(--color-ink, #0f172a);
}

.period-header__place {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin: 0.5rem 0 0;
  padding: 0.25rem 0.65rem 0.25rem 0.5rem;
  border-radius: var(--radius-pill, 999px);
  background: var(--color-accent-soft, rgba(14, 165, 233, 0.12));
  color: var(--color-accent-hover, #0284c7);
  font-size: 0.8125rem;
  font-weight: 600;
}

.period-header__pin {
  width: 0.95rem;
  height: 0.95rem;
  flex-shrink: 0;
}

.info-card {
  margin-bottom: 0.85rem;
  padding: 1.1rem 1.25rem 1.2rem;
  text-align: left;
  background: var(--color-surface, #fff);
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--radius, 12px);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 4px 12px rgba(15, 23, 42, 0.03);
}

.info-card:last-child {
  margin-bottom: 0;
}

.info-card__label {
  margin: 0 0 0.85rem;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--color-muted, #64748b);
}

.panel-tabs {
  flex: 0 0 auto;
  display: flex;
  gap: 0.25rem;
  padding: 0 0.75rem;
  background: var(--color-surface, #fff);
  border-bottom: 1px solid var(--color-border, #e2e8f0);
}

.panel-tab {
  margin: 0 0 -1px;
  padding: 0.7rem 0.9rem 0.6rem;
  border: 0;
  border-bottom: 2px solid transparent;
  background: none;
  font-family: var(--font-sans, inherit);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-muted, #64748b);
  cursor: pointer;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.panel-tab:hover {
  color: var(--color-ink, #0f172a);
}

.panel-tab--active {
  color: var(--color-ink, #0f172a);
  border-bottom-color: var(--color-accent, #0ea5e9);
}

.panel-tab:focus {
  outline: none;
}

.panel-tab:focus-visible {
  outline: 2px solid var(--color-accent, #0ea5e9);
  outline-offset: -2px;
}

.scroll-fade {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 4rem;
  pointer-events: none;
  background: linear-gradient(to bottom, rgba(246, 248, 251, 0), #f6f8fb 85%);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.scroll-fade--on {
  opacity: 1;
}

.panel-pane {
  flex: 1 1 0;
  min-height: 0;
  height: auto;
}

</style>
