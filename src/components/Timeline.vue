<template>
    <div id="timeContainer">
        <div id="eventContainer">
            <div v-for="event in events" :key="event.start" class="rectangle" :style="{width: getWidth(event.start, event.end)}"> 
               
            </div>
        </div>

        <ul class="timelines-years">
            <li>1998</li>
            <li>1999</li>
            <li>2000</li>
            <li>2001</li>
            <li>2002</li>
            <li>2003</li>
            <li>2004</li>
            <li>2005</li>
            <li>2006</li>
            <li>2007</li>
            <li>2008</li>
            <li>2009</li>
            <li>2010</li>
            <li>2011</li>
            <li>2012</li>
            <li>2013</li>
            <li>2014</li>
            <li>2015</li>
            <li>2016</li>
            <li>2017</li>
            <li>2018</li>

        </ul>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Timeline',
  props: {
    events: Object
  },
  methods: {
    //   ...mapActions([
    //   // `mapActions` also supports payloads:
    //   'incrementBy' // map `this.incrementBy(amount)` to `this.$store.dispatch('incrementBy', amount)`
    // ]),
    getWidth(beg, finish) {
          var total = '248';
          var start = this.getAsMonth(beg);
          var end = this.getAsMonth(finish);
          var numMonths = (end[1] - start[1]) * 12 + (end[0] - start[0] + 1);
          var perc = (numMonths / total * 100).toFixed(2);
          return perc + '%'
      },
    getAsMonth(date) {
        var arr = date.split("-");
        switch (arr[0]) {
            case 'January':
                arr[0] = 1;
                break;
            case 'February':
                arr[0] = 2;
                break;
            case 'March':
                arr[0] = 3;
                break;
            case 'April':
                arr[0] = 4;
                break;
            case 'May':
                arr[0] = 5;
                break;
            case 'June':
                arr[0] = 6;
                break;
            case 'July':
                arr[0] = 7;
                break;
            case 'August':
                arr[0] = 8;
                break;
            case 'September':
                arr[0] = 9;
                break;
            case 'October':
                arr[0] = 10;
                break;
            case 'November':
                arr[0] = 11;
                break;
            case 'December':
                arr[0] = 12;
                break;
        }
        return arr;
    }
  },
  computed: {
      active () {
        return this.$store.state.active
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* Timeline - Years */


#timeContainer {
    width: 100%;
    height: 10%;
    display: flex;
    flex-direction: column;
}

.rectangle {
    background-color: #555;
    /* border-right: thin solid; */
    cursor: pointer;
  }

.rectangle:hover {
    opacity: .8;
}

.rectangle:active {
    background-color: red;
}

.active {
    background-color: blue;
}

#eventContainer {
    display: flex;
    justify-content: center;
    height: 70%;
}

.timelines-years {
	border-top: 1px solid #cfc1c1;
    background-color: black;
    display: flex;
    justify-content: center;
    height: 30%;
    -webkit-padding-start: 0;
    margin: 0
}

li {	
	display: inline-block;
    width: 4.819267%;
	color: #868686;
    font-size: 20px;
    text-align: center;
    border-right: 1px solid #cfc1c1;
}

li:last-child {
    border-right: 0px;
    width: 3.4483%
}

</style>
