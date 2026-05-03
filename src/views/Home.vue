<template>
  <div class="home">

    <div v-if="isDev" class="home__devBanner">
      <router-link class="home__devLink" to="/editor">Open data editor</router-link>
      <span class="home__devHint">or go to <code>/#/editor</code> — hash routing</span>
    </div>

    <!-- <img src="@/assets/logo.png"> -->
    <!-- <Sidebar/> -->

    <LeftSide v-bind:events="x" v-bind:projects="projects" v-if="$mq != 'sm'"/>
    <Information v-bind:events="x" v-bind:eventOrder="eventOrder" v-if="$mq != 'sm'"/>
    <Timeline v-bind:events="x" v-bind:event-order="eventOrder" v-if="$mq != 'sm'"/>
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

import myXRaw from '@/data/data.json'
import myEventOrder from '@/data/eventOrder.json'
import myProjects from '@/data/projects.json'
import { parseLifeMapDataFile } from '@/utils/lifeMapData'

export default {
  name: 'home',
  computed: {
    isDev () {
      return process.env.NODE_ENV === 'development'
    }
  },
  components: {
    Information,
    Timeline,
    Sidebar,
    LeftSide,
    Form,
    Profile
  },
  data: function () {
    const parsed = parseLifeMapDataFile(myXRaw)
    const orderFromFile = JSON.parse(JSON.stringify(myEventOrder))
    return {
      // data
      // showModal: false,
      // temporary @TODO
      showModal: true,
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

.mobile {
  font-size: 1.0625rem;
  line-height: 1.65;
  color: var(--color-ink, #0f172a);
  max-width: 26rem;
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
  text-align: center;
}

.mobile::before {
  content: '';
  display: block;
  width: 3rem;
  height: 4px;
  margin: 0 auto 1.5rem;
  border-radius: var(--radius-pill, 999px);
  background: linear-gradient(90deg, var(--color-accent, #0ea5e9), var(--color-accent-hover, #0284c7));
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
