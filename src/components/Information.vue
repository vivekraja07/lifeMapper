<template>
    <div id='features'>

        <section class="dates">

            <b class="previous round" onclick="getPrev()">&#8249;</b>
            <h3 id="date">{{active}}</h3>
            <b class="next round" onclick="getNext()">&#8250;</b>

        </section>

        <div id = "events">
            <section class="sec br" v-for="(value, propertyName, index) in events[active].info" :key="index"> 
                {{propertyName}}
                <div class = "jobHolder" v-if="propertyName.includes('Job')">
                    <div class = "logoHolder"> 
                        <img :src="events[active].info[propertyName].icon"/>
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

</style>
