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
}

/* Container for skill bars */
.container {
  width: 100%; /* Full width */
  background-color: #ddd; /* Grey background */
}

.sectionTitle {
    text-align: center;
}

section {
    border: 3px solid;
    border-style: solid;
    border-top: 0;
    padding: 20px 72px 16px 24px;
    text-align: left;
}

.skills {
  text-align: right; /* Right-align text */
  padding: 10px; /* Add some padding */
  color: white; /* White text color */
}

h3 {
  align-self: center;
}

</style>
