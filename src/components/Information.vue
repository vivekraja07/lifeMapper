<template>

    <div id='features'>
        <div class="dates">
            <b class="previous round" v-on:click="getPrev()">&#8249;</b>
            <h3 id="date">{{active}}</h3>
            <b class="next round" v-on:click="getNext()">&#8250;</b>
        </div>

        <div id = "events">
            <section v-for="(value, propertyName, index) in events[active].info" :key="index">
                    <div class = "School" v-if="propertyName=='school' || propertyName=='Education'">
                      <div class = "logoHolder">
                          <img :src="value.icon"/>
                      </div>
                      <div class = "summaryInfo" v-if="value.icon">
                          <h3 class = "title"> {{value.title}} </h3>
                          <h4 class = "name"> {{value.name}} </h4>
                          <h5 class = "timeRange"> {{value.range}} </h5>
                          <h5 v-if="value.location" class = "location"> {{value.location}} </h5>
                      </div>
                       <div class = "extraDetails" v-if="value.courses || value.addDetails">
                        <table v-if="value.courses">
                            <thead>
                                <tr>
                                    <th v-for="(value, index) in value.courses.columns" :key="index">
                                        {{value}}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(value, index) in value.courses.rows" :key="index">
                                <td v-for="(key, index) in value" :key="index">
                                    {{key}}
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <li v-for="point in value.addDetails" :key="point">
                            {{point}}
                        </li>
                      </div>

                    </div>

                    <div class = "Jobs" v-if="propertyName=='Jobs'">
                      <h2 class="sectionTitle">Jobs</h2>
                      <div class="Job" v-for="job in value" :key="job.title">
                        <div class = "logoHolder" v-if="job.icon">
                          <img :src="job.icon"/>
                        </div>
                        <div class = "summaryInfo" v-if="job.icon">
                          <h3 class = "title"> {{job.title}} </h3>
                          <h4 class = "name"> {{job.name}} </h4>
                          <h5 class = "timeRange"> {{job.range}} </h5>
                          <h5 v-if="job.location" class = "location"> {{job.location}} </h5>
                        </div>

                        <div class = "extraDetails" v-if="job.addDetails">
                          <li v-for="point in job.addDetails" :key="point">
                              {{point}}
                          </li>
                        </div>
                      </div>

                    </div>

                    <div class = "general" v-if="propertyName=='General'">
                        <h3 class = "title"> General </h3>
                        <li> {{value.title}} </li>
                        <li> {{value.Location}} </li>
                    </div>

                    <div class = "Languages" v-if="propertyName=='Languages'">
                        <h3 class = "sectionTitle"> Civilian Languages </h3>

                        <div v-for="(language, index) in value" :key="language.name">
                          <p> {{language.name}} </p>
                            <div class="container">
                              <div class = "skills" :style="{width: language.skill, 'background-color': colors[index]}">{{language.skill}} </div>
                          </div>
                        </div>
                    </div>

                    <div class = "Languages" v-if="propertyName=='CLanguages'">
                        <h3 class = "sectionTitle"> Computer Languages </h3>

                        <div v-for="(language, index) in value" :key="language.name">
                          <p> {{language.name}} </p>
                            <div class="container">
                              <div class="skills" :style="{width: language.skill, 'background-color': comp_colors[index]}">{{language.skill}} </div>
                          </div>
                        </div>
                    </div>

                    <div class="Projects" v-if="propertyName=='Projects'">
                        <h2 class="sectionTitle"> Projects</h2>
                        <div class="Project" v-for="project in value" v-on:click="sideBarToggle()" :key="project.title">
                            <h3 class="title"> {{project.title}} </h3>
                            <li v-for="point in project.details" :key="point">
                                {{point}}
                            </li>
                        </div>
                    </div>

                    <div class="Activities" v-if="propertyName=='Activities'">
                        <h2 class="sectionTitle">Activities</h2>
                      <div class="Activity" v-for="activity in value" :key="activity.name">
                        <div class = "logoHolder">
                          <img :src="activity.icon"/>
                        </div>
                        <div class = "summaryInfo">
                          <h3 class = "title"> {{activity.title}} </h3>
                          <h4 class = "name"> {{activity.name}} </h4>
                          <h5 class = "timeRange"> {{activity.range}} </h5>
                        </div>

                        <div class = "extraDetails">
                          <li v-for="point in activity.details" :key="point">
                              {{point}}
                          </li>
                        </div>
                      </div>
                    </div>

            </section>
        </div>

    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Information',
  props: {
    events: Object
  },
  data: function () {
    return {
      colors: [
        '#4CAF50',
        '#2196F3',
        '#f44336',
        '#808080'
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
        '#3FE0D0',
        '#0F52BA'

      ]
    }
  },
  created () {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.getPrev()
      } else if (e.key === 'ArrowRight') {
        this.getNext()
      }
    })
  },
  computed: {
    active () {
      return this.$store.state.active
    },
    open () {
      return this.$store.state.sidebarOpen
    }
  },
  methods: {
    ...mapActions([
      'activeSet',
      'sideBarToggle'
    ]),
    getNext () {
      var size = Object.keys(this.events).length
      var index = Object.keys(this.events).indexOf(this.active)
      if (index + 1 >= size) {
        alert('This is still a mystery! Google?')
      } else {
        this.activeSet(Object.keys(this.events)[index + 1])
      }
    },
    getPrev () {
      var index = Object.keys(this.events).indexOf(this.active)
      if (index - 1 < 0) {
        alert('This is out of scope for this project!')
      } else {
        this.activeSet(Object.keys(this.events)[index - 1])
      }
    }
  }
}
</script>

<style scoped>
/* Make sure that padding behaves as expected */
* {box-sizing:border-box}

/* Container for skill bars */
.container {
  width: 100%; /* Full width */
  background-color: #ddd; /* Grey background */
}

.skills {
  text-align: right; /* Right-align text */
  padding: 10px; /* Add some padding */
  color: white; /* White text color */
}

#features {
    height: 90%;
    width: 50%;
    /* overflow: auto; */
    display: inline-block;
    font-size: 1rem;
}

h3 {
  align-self: center;
}

.round {
  align-self: center;
}

.Job, .Activity, .Project {
  border-bottom: 1px dashed #bdbdbd;
  padding-top: 20px;
  padding-bottom: 16px;
}

.Job:last-child, .Activity:last-child, .Project:last-child  {
  border-bottom: 0px;
  padding-bottom: 0px;
}

.Job:first-of-type, .Activity:first-of-type, .Project:first-of-type  {
  padding-top: 0px;
}

    #events {
      overflow: auto;
      height: 90%;
    }

    .sectionTitle {
        text-align: center;
    }

    /* date styles go here */
    .dates {
        background: black;
        color: white;
        border: 0;
        height: 10%;

        display: flex;
        justify-content:  space-around;
        align-content: center;
        flex-direction: row;

        text-align: center;
    }

    b {
        font-size: 30px;
        text-decoration: none;
    }

    b:hover {
        background-color: #ddd;
        color: black;
        cursor: pointer;
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

    img {
        border-radius: 6px;
        border: 4px solid transparent;
        height: 64px;
        width: 64px;
    }

    .summaryInfo {
        margin-left: 80px;
    }

    .extraDetails {
        margin-left: 80px;
        margin-top: 16px;
    }

    /* table styles */
    table {
        text-align: center;
        border: 1px solid;
    }

    th {
        border-bottom: 1px solid;
    }

</style>
