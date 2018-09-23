<template>
    
    <div id='features'>
        <div class="dates">
            <b class="previous round" v-on:click="getPrev()">&#8249;</b>
            <h3 id="date">{{active}}</h3>
            <b class="next round" v-on:click="getNext()">&#8250;</b>
        </div>

        <div id = "events">
            <section v-for="(value, propertyName, index) in events[active].info" :key="index"> 
                    <div class = "logoHolder" v-if="value.icon"> 
                        <img :src="value.icon"/>
                    </div>
                    <div class = "summaryInfo" v-if="value.icon">
                        <h3 class = "title"> {{value.title}} </h3>
                        <h4 class = "name"> {{value.name}} </h4>
                        <h5 class = "timeRange"> {{value.range}} </h5>
                        <h5 v-if="value.location" class = "location"> {{value.location}} </h5>
                    </div>


                    <div class = "general" v-if="propertyName=='General'">
                        <h3 class = "title"> General </h3>
                        <li> {{value.title}} </li>
                        <li> {{value.Location}} </li>
                    </div>


                    <div class = "Languages" v-if="propertyName=='Languages'">
                        <h3 class = "title"> Languages </h3>
                        <li v-for="language in value" :key="language"> {{language}} </li>
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
  created() {
      window.addEventListener('keydown', (e) => {
          if (e.key == 'ArrowLeft') {
              this.getPrev()
          } else if (e.key == 'ArrowRight') {
              this.getNext()
          }
      })
  },
  computed: {
    active () {
        return this.$store.state.active
    }
  },
  methods: {
    ...mapActions([
      'activeSet'
    ]),
    getNext() {
        var size = Object.keys(this.events).length;
        var index = Object.keys(this.events).indexOf(this.active);
        if (index + 1 >= size) {
            alert("This is still a mystery!")
        } else {
            this.activeSet(Object.keys(this.events)[index+1])
        }
    },
    getPrev() {
        var size = Object.keys(this.events).length;
        var index = Object.keys(this.events).indexOf(this.active);
        if (index - 1 < 0) {
            alert("This is out of scope for this project!")
        } else {
            this.activeSet(Object.keys(this.events)[index-1])
        }
    }
  }
}
</script>

<style scoped>

    #features {
        height: 90%;
        width: 50%;
        overflow: auto;
        display: inline-block;
    }

    /* date styles go here */
    .dates {
        background: black;
        color: white;
        padding: 23.5px;
        border: 0;
        display: flex;
        flex-direction: row;
        justify-content:  space-between;;
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
