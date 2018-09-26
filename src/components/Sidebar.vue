<template>
    <div class="SIDEBAR">
        Hey Hey Hey
    </div>
</template>

<script>
import {TweenMax, Power4} from 'gsap'

export default {
  name: 'Sidebar',
    mounted () {
      TweenMax.set(this.$el, {
        x: -this.$el.offsetWidth
      })
    },
    computed: {
      open () {
        return this.$store.state.sidebarOpen
      }
    },
    watch: {
      open: function (open) {
        const dX = open ? 0 : -this.$el.offsetWidth
        console.log(this.$el)
        TweenMax.to(this.$el, 0.6, {
          x: dX,
          ease: Power4.easeOut
        })
      }
    }
}

</script>

<style scoped>

  .SIDEBAR {
    height: 90%;
    background-color: white;
    position: fixed;
    left: 0;
    top: 0;
    width: 50%;
    z-index:1001;
    /* max-width: 90vw; */
  }

</style>
