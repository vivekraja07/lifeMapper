<template>
    <div class="dates">
        <b class="previous round" v-on:click="getPrev()">&#8249;</b>
        <h3 id="date">{{active}}</h3>
        <b class="next round" v-on:click="getNext()">&#8250;</b>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Dates',
  created () {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.getPrev()
      } else if (e.key === 'ArrowRight') {
        this.getNext()
      }
    })
  },
  methods: {
    ...mapActions([
      'activeSet',
      'sideBarToggle'
    ]),
    getNext () {
      var size = Object.keys(this.eventOrder).length
      var index = this.eventOrder.indexOf(this.active)
      if (index + 1 >= size) {
        console.log('This is still a mystery! Google?')
      } else {
        this.activeSet(Object.keys(this.events)[index + 1])
      }
      gtag('event','click',{'event_category':'navigation','event_label':'left'});
    },
    getPrev () {
      var size = Object.keys(this.eventOrder).length
      var index = this.eventOrder.indexOf(this.active)
      if (index - 1 < 0) {
        console.log('This is out of scope for this project!')
      } else {
        this.activeSet(Object.keys(this.events)[index - 1])
      }
      gtag('event','click',{'event_category':'navigation','event_label':'right'});
    }
  },
computed: {
    active () {
      return this.$store.state.active
    }
  }
}
</script>

<style scoped>
/* Make sure that padding behaves as expected */
* {box-sizing:border-box}

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

h3 {
  align-self: center;
}

.round {
  align-self: center;
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


</style>
