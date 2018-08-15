<template>
    <div id='features'>

        <div class="dates">

            <b class="previous round" onclick="getPrev()">&#8249;</b>
            <h3 id="date">{{active}}</h3>
            <b class="next round" onclick="getNext()">&#8250;</b>

        </div>

        <div id = "events">
            <section v-for="(value, propertyName, index) in events[active].info" :key="index"> 
                    <div class = "logoHolder" v-if="events[active].info[propertyName].icon"> 
                        <img :src="events[active].info[propertyName].icon"/>
                    </div>
                    <div class = "summaryInfo" v-if="events[active].info[propertyName].icon">
                        <h3 class = "title"> {{events[active].info[propertyName].title}} </h3>
                        <h4 class = "name"> {{events[active].info[propertyName].name}} </h4>
                        <h5 class = "timeRange"> {{events[active].info[propertyName].range}} </h5>
                        <h5 v-if="events[active].info[propertyName].location" class = "location"> {{events[active].info[propertyName].location}} </h5>
                    </div>

                    <div class = "extraDetails">

                        <table v-if="events[active].info[propertyName].courses">
                            <thead>
                                <tr>
                                    <th v-for="(value, index) in events[active].info[propertyName].courses.columns" :key="index">
                                        {{value}}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(value, index) in events[active].info[propertyName].courses.rows" :key="index">
                                <td v-for="(key, index) in value" :key="index">
                                    {{key}}
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <li v-for="point in events[active].info[propertyName].addDetails" :key="point">
                            {{point}}
                        </li>
                    </div>

            </section>
        </div>

    </div>
</template>

<script>

export default {
  name: 'Information',
    props: {
    events: Object
  },   
  computed: {
    active () {
        return this.$store.state.active
    }
  },
  methods: {
      
  }
}
</script>

<style scoped>

    #features {
        height: 90%;
        overflow: auto;
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
