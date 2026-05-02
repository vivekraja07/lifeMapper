<template>
  <div id="skills">
    <section v-if="events[active].info.Languages">

      <div class = "Languages">
            <h3 class = "sectionTitle"> Languages </h3>
            <div v-for="(language, index) in events[active].info.Languages" :key="language.name">
              <p> {{language.name}} </p>
                <div class="container">
                  <div class = "skills" :style="{width: language.skill, 'background-color': colors[index]}">{{language.skill}} </div>
              </div>
            </div>
        </div>
    </section>

    <section v-if="events[active].info.CLanguages">
        <div class = "Languages" v-if="events[active].info.CLanguages">
            <h3 class = "sectionTitle"> Technical Skills </h3>

            <div v-for="(language, index) in events[active].info.CLanguages" :key="language.name">
              <p> {{language.name}} </p>
                <div class="container">
                  <div class="skills" :style="{width: language.skill, 'background-color': comp_colors[index]}">{{language.skill}} </div>
              </div>
            </div>
        </div>
    </section>

  </div>
</template>

<script>
export default {
  name: 'Skills',
  components: {

  },
  props: {
    events: Object
  },
  computed: {
    active () {
      return this.$store.state.active
    }
  },
  data: function () {
    return {
      colors: [
        '#4CAF50',
        '#2196F3',
        '#f44336',
        '#808080',
        '#ffa500'
      ],
      comp_colors: [
        '#1D2951',
        '#003152',
        '#111E6C',
        '#000080',
        '#1034A6',
        '#0E4D92',
        '#0F52BA',
        '#0080FF',
        '#6593F5',
        '#0F52BA',
        '#3FE0D0',
        '#33E000'
      ]
    }
  }
}

</script>

<style scoped>

/* Make sure that padding behaves as expected */
* {box-sizing:border-box}

#skills {
  width: 100%;
  height: 100%;
  text-align: center;
  overflow: auto;
  overflow-x: hidden;
  padding: 0;
  background: var(--color-surface, #fff);
  scrollbar-gutter: stable;
}

.Languages > div {
  margin-bottom: 1rem;
}

.Languages > div:last-child {
  margin-bottom: 0;
}

/* Container for skill bars */
.container {
  width: 100%;
  background-color: var(--color-border, #e2e8f0);
  border-radius: var(--radius-pill, 999px);
  overflow: hidden;
}

.sectionTitle {
    font-family: var(--font-display, system-ui, sans-serif);
    font-weight: var(--font-heading-weight, 700);
    font-size: 1.125rem;
    letter-spacing: -0.02em;
    text-align: center;
    color: var(--color-ink, #0f172a);
    margin-bottom: 0.75rem;
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

.Languages p {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-ink, #0f172a);
  margin-bottom: 0.35rem;
  text-align: left;
}

.skills {
  text-align: right;
  padding: 0.5rem 0.75rem;
  color: white;
  font-size: 0.8125rem;
  font-weight: 600;
  border-radius: 0 var(--radius-pill, 999px) var(--radius-pill, 999px) 0;
  min-height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

h3 {
  align-self: center;
}

</style>
