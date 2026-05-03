<template>
  <div id="container">
     <div class="toggle">

        <div
          class="buttons"
          role="radiogroup"
          aria-label="Left panel view"
        >
          <div>
            <input type="radio" id="one" value="Map" v-model="pick" @input="blur">
            <label for="one" title="Show map">Map</label>
          </div>
          <div>
            <input type="radio" id="two" value="Profile" v-model="pick" @input="blur">
            <label for="two" title="Show profile">Profile</label>
          </div>
          <div>
            <input type="radio" id="three" value="Projects" v-model="pick" @input="blur">
            <label for="three" title="Show projects">Projects</label>
          </div>
          <div>
            <input type="radio" id="four" value="Skills" v-model="pick" @input="blur">
            <label for="four" title="Show skills">Skills</label>
          </div>
        </div>

      </div>

      <div class="main">
        <keep-alive>
          <component :is="pick" v-bind:events="events" v-bind:projects="projects"/>
        </keep-alive>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Map from '@/components/leftSide/Map.vue'
import Projects from '@/components/leftSide/Projects.vue'
import Profile from '@/components/leftSide/Profile.vue'
import Skills from '@/components/leftSide/Skills.vue'

export default {
  name: 'LeftSide',
  components: {
    Profile,
    Map,
    Projects,
    Skills
  },
  props: {
    events: Object,
    projects: Array
  },
  computed: {
    pick: {
      get () {
        return this.$store.state.leftSidePick
      },
      set (val) {
        this.$store.commit('setLeftSidePick', val)
      }
    }
  },
  methods: {
    blur: function (event) {
      event.target.blur();
    }
  }
}

</script>

<style scoped>

#container {
  width: 50%;
  height: 90%;
  display: inline-block;
  vertical-align: top;
  font-size: 1rem;
}

.toggle {
  width: 100%;
  height: 10%;
  min-height: 3.5rem;
  background: var(--color-chrome, #0f172a);
  color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.75rem;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(148, 163, 184, 0.15);
}

.buttons {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  width: 100%;
  max-width: 36rem;
}

.buttons > div {
  position: relative;
}

.buttons input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.buttons label {
  display: inline-block;
  font-family: var(--font-sans, inherit);
  font-size: clamp(0.8125rem, 1.8vw, 0.9375rem);
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-pill, 999px);
  cursor: pointer;
  user-select: none;
  color: var(--color-chrome-muted, #94a3b8);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(248, 250, 252, 0.22);
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.12);
  transition: color 0.15s ease, background 0.15s ease, border-color 0.15s ease,
    box-shadow 0.15s ease, transform 0.1s ease;
}

.buttons label:hover {
  color: #f8fafc;
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(248, 250, 252, 0.38);
}

.buttons label:active {
  transform: scale(0.98);
}

.buttons input:checked + label {
  color: #0f172a;
  background: #f8fafc;
  border-color: rgba(255, 255, 255, 0.35);
  box-shadow: var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.12));
}

.buttons input:focus-visible + label {
  outline: 2px solid var(--color-accent, #0ea5e9);
  outline-offset: 2px;
}

.main {
  width: 100%;
  height: 90%;
  background: var(--color-surface, #fff);
  overflow-x: hidden;
}

</style>




