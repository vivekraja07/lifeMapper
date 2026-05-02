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
  props: {
    eventOrder: Array
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
    }
  },
  methods: {
    ...mapActions([
      'activeSet',
    ]),
    getNext () {
      var size = Object.keys(this.eventOrder).length
      var index = this.eventOrder.indexOf(this.active)
      if (index + 1 >= size) {
        console.log('This is still a mystery! Google?')
      } else {
        this.activeSet(this.eventOrder[index + 1])
      }
      gtag('event','click',{'event_category':'navigation','event_label':'left'});
    },
    getPrev () {
      var size = Object.keys(this.eventOrder).length
      var index = this.eventOrder.indexOf(this.active)
      if (index - 1 < 0) {
        console.log('This is out of scope for this project!')
      } else {
        this.activeSet(this.eventOrder[index - 1])
      }
      gtag('event','click',{'event_category':'navigation','event_label':'right'});
    }
  }
}
</script>

<style scoped>
/* Make sure that padding behaves as expected */
* {box-sizing:border-box}

.dates {
    background: var(--color-chrome, #0f172a);
    color: #f8fafc;
    border: 0;
    height: 10%;
    min-height: 3.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    text-align: center;
    padding: 0 0.5rem;
    border-bottom: 1px solid rgba(148, 163, 184, 0.15);
}

h3 {
  align-self: center;
  font-family: var(--font-display, system-ui, sans-serif);
  font-weight: var(--font-heading-weight, 700);
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  letter-spacing: -0.02em;
  color: #f8fafc;
}

.round {
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-pill, 999px);
  font-size: 1.5rem;
  line-height: 1;
  color: var(--color-chrome-muted, #94a3b8);
  transition: background 0.2s ease, color 0.2s ease;
}

b {
    font-size: inherit;
    text-decoration: none;
    font-weight: 400;
}

b:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #f8fafc;
    cursor: pointer;
}

</style>
