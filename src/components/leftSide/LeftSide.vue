<template>
  <div id="container">
    <Profile header />
    <div class="main">
      <Map v-bind:events="events"/>
    </div>
  </div>
</template>

<script>
// Wide-screen left column: compact profile strip on top, map for the active period below.
// Skills and Projects live as tabs in the right-hand panel (see Information.vue).
import Map from '@/components/leftSide/Map.vue'
import Profile from '@/components/leftSide/Profile.vue'

export default {
  name: 'LeftSide',
  components: {
    Profile,
    Map
  },
  props: {
    events: Object
  }
}
</script>

<style scoped>

#container {
  width: 100%;
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
}

#container > #profile {
  flex: 0 0 auto;
}

.main {
  width: 100%;
  flex: 1 1 0;
  min-height: 0;
  background: var(--color-chrome, #0f172a);
  overflow: hidden;
  /* Leaflet panes use z-index 400+; keep them inside this box so overlays sit above the map. */
  isolation: isolate;
}

</style>
