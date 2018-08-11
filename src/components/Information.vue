<template>
    <div id='features'>

        <section class="dates">

            <b class="previous round" onclick="getPrev()">&#8249;</b>
            <h3 id="date">{{active}}</h3>
            <b class="next round" onclick="getNext()">&#8250;</b>

        </section>

        <div id = "events">
            <section class="sec br" v-for="(value, propertyName, index) in events[active].info" :key="index"> 
                <!-- {{propertyName}} -->
                <div class = "jobHolder" v-if="propertyName.includes('Job')">
                    <div class = "logoHolder"> 
                        <img :src="events[active].info[propertyName].icon"/>
                    </div>
                    <div class = "summaryInfo">
                        <h3 class = "jobTitle"> {{events[active].info[propertyName].title}} </h3>
                        <h4 class = "companyName"> {{events[active].info[propertyName].company}} </h4>
                        <h5 class = "timeRange"> {{events[active].info[propertyName].range}} </h5>
                        <h5 class = "timeRange"> {{events[active].info[propertyName].location}} </h5>

                    </div>



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

    .summaryInfo {
        margin-left: 80px;
    }

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



</style>
