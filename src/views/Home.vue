<template>
  <div
    class="home"
    :class="{
      'home--stacked': $mq !== 'lg',
      'home--dev-mobile': isDev && $mq !== 'lg'
    }"
  >

    <div v-if="isDev" class="home__devBanner">
      <router-link class="home__devLink" to="/editor">Open data editor</router-link>
      <span class="home__devHint">or go to <code>/#/editor</code> — hash routing</span>
    </div>

    <!-- <img src="@/assets/brand/logo.png"> -->
    <!-- <Sidebar/> -->

    <LeftSide v-bind:events="x" v-bind:projects="projects" v-if="$mq === 'lg'"/>
    <Information v-bind:events="x" v-bind:eventOrder="eventOrder" v-if="$mq === 'lg'"/>
    <Timeline v-bind:events="x" v-bind:event-order="eventOrder" v-if="$mq === 'lg'"/>
    <Form v-if="showModal && $mq === 'lg'" @close="dismissOnboarding" />
    <MobileStory
      v-if="$mq !== 'lg'"
      :events="x"
      :event-order="eventOrder"
    />

  </div>
</template>

<script>
// @ is an alias to /src
import Information from '@/components/information/Information.vue'
import Timeline from '@/components/Timeline.vue'
import Sidebar from '@/components/Sidebar.vue'
import LeftSide from '@/components/leftSide/LeftSide.vue'
import Form from '@/components/Form.vue'

import MobileStory from '@/components/MobileStory.vue'

import myXRaw from '@/data/data.json'
import myEventOrder from '@/data/eventOrder.json'
import myProjects from '@/data/projects.json'
import { parseLifeMapDataFile } from '@/utils/lifeMapData'

const ONBOARDING_STORAGE_KEY = 'lifeMapper-onboarding-dismissed'

export default {
  name: 'home',
  computed: {
    isDev () {
      return process.env.NODE_ENV === 'development'
    }
  },
  methods: {
    dismissOnboarding () {
      try {
        window.localStorage.setItem(ONBOARDING_STORAGE_KEY, '1')
      } catch (e) {
        /* private mode / quota */
      }
      this.showModal = false
    }
  },
  components: {
    Information,
    Timeline,
    Sidebar,
    LeftSide,
    Form,
    MobileStory
  },
  data: function () {
    const parsed = parseLifeMapDataFile(myXRaw)
    const orderFromFile = JSON.parse(JSON.stringify(myEventOrder))
    let showModal = true
    try {
      showModal = !window.localStorage.getItem(ONBOARDING_STORAGE_KEY)
    } catch (e) {
      showModal = true
    }
    return {
      showModal,
      x: parsed.events,
      eventOrder: parsed.orderOverride || orderFromFile,
      projects: myProjects
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

.home.home--stacked {
  height: auto;
  min-height: 100%;
  overflow-x: hidden;
  font-size: 1rem;
}

.home.home--dev-mobile >>> .mobile-story__sticky {
  top: 2.75rem;
}

.home__devBanner {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.75rem 1rem;
  padding: 0.45rem 1rem;
  font-size: 0.8125rem;
  background: var(--color-chrome, #0f172a);
  color: #f8fafc;
}

.home__devLink {
  font-weight: 700;
  color: #7dd3fc;
  text-decoration: none;
}

.home__devLink:hover {
  text-decoration: underline;
}

.home__devHint {
  color: var(--color-chrome-muted, #94a3b8);
  font-size: 0.78rem;
}

.home__devHint code {
  font-size: 0.85em;
  padding: 0.12em 0.35em;
  border-radius: 4px;
  background: rgba(248, 250, 252, 0.12);
}

</style>
