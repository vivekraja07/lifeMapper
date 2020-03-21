<template>
        <div id="map"></div>
</template>

<script>

export default {
  name: 'Map',
  props: {
    events: Object
  },
  data: function () {
    return {
      map: null,
      tileLayer: null,
      layers: []
    }
  },
  mounted () {
    this.initMap()
    this.initLayers()
  },
  watch: {
    'active': function () {
      this.map.setView(this.events[this.active].loc, this.events[this.active].zoom, this.events[this.active].options)
    }
  },
  computed: {
    active () {
      return this.$store.state.active
    }
  },
  methods: {
    initMap () {
      this.map = L.map('map').setView(this.events[this.active].loc, this.events[this.active].zoom, this.events[this.active].options)
      this.tileLayer = L.tileLayer(
        'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
          maxZoom: 20,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
          attribution: 'Google-Maps'
        })
      this.tileLayer.addTo(this.map)
    },
    initLayers () {}
  }
}

</script>

<style scoped>

#map {
  width: 100%;
  height: 100%;
}

</style>
