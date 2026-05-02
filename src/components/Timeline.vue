<template>
    <div id="timeContainer">
        <div id="eventContainer">
            <div v-for="(event, propertyName, index) in events" :key="index" :class="{'rectangle':true, 'active':(propertyName === active)}" v-on:click="activeSet(propertyName)" :style="{width: getWidth(event.start, event.end)}">

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
            <li>2019</li>
            <li>2020</li>
            <li>2021</li>
            <li>2022</li>
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
    ...mapActions([
      'activeSet'
    ]),
    getWidth (beg, finish) {
      var total = '286' // = 12 * 23 + 10
      var start = this.getAsMonth(beg)
      var end = this.getAsMonth(finish)
      var numMonths = (end[1] - start[1]) * 12 + (end[0] - start[0] + 1)
      var perc = (numMonths / total * 100).toFixed(2)

      // console.log(beg + ' to ' + finish + ': ' + numMonths + ': ' + perc)
      return perc + '%'
    },
    getAsMonth (date) {
      var arr = date.split('-')
      switch (arr[0]) {
        case 'January':
          arr[0] = 1
          break
        case 'February':
          arr[0] = 2
          break
        case 'March':
          arr[0] = 3
          break
        case 'April':
          arr[0] = 4
          break
        case 'May':
          arr[0] = 5
          break
        case 'June':
          arr[0] = 6
          break
        case 'July':
          arr[0] = 7
          break
        case 'August':
          arr[0] = 8
          break
        case 'September':
          arr[0] = 9
          break
        case 'October':
          arr[0] = 10
          break
        case 'November':
          arr[0] = 11
          break
        case 'December':
          arr[0] = 12
          break
      }
      return arr
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

#timeContainer {
  height: 10%;
  min-height: 4.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  background: var(--color-chrome, #0f172a);
  border-top: 1px solid rgba(148, 163, 184, 0.12);
}

.rectangle {
  background: linear-gradient(180deg, #475569 0%, #334155 100%);
  cursor: pointer;
  min-height: 6px;
  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
}

.rectangle:hover {
  filter: brightness(1.12);
}

.rectangle:active {
  transform: scaleY(0.96);
}

.active {
  background: linear-gradient(180deg, #38bdf8 0%, var(--color-accent, #0ea5e9) 100%);
  box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.4);
}

#eventContainer {
  display: flex;
  justify-content: center;
  align-items: stretch;
  height: 70%;
  padding: 0.35rem 0.25rem 0;
  box-sizing: border-box;
}

.timelines-years {
  border-top: 1px solid rgba(148, 163, 184, 0.2);
  background-color: var(--color-chrome, #0f172a);
  display: flex;
  justify-content: center;
  align-items: stretch;
  height: 30%;
  min-height: 1.75rem;
  padding: 0;
  margin: 0;
  list-style: none;
  -webkit-padding-start: 0;
}

li {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4.34782608696%;
  color: var(--color-chrome-muted, #94a3b8);
  font-size: clamp(0.5rem, 0.85vw, 0.6875rem);
  font-weight: 500;
  text-align: center;
  border-right: 1px solid rgba(148, 163, 184, 0.15);
}

li:last-child {
  border-right: 0;
}

</style>
