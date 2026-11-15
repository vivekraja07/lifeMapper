<template>
        <div id="map"></div>
</template>

<script>
/* global L */ // Leaflet is loaded from a <script> tag in public/index.html

export default {
  name: 'Map',
  props: {
    events: Object,
    /** false = preview map (no pan/zoom) so touch scrolling passes through to the page. */
    interactive: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      map: null,
      tileLayer: null,
      layers: [],
      locationMarker: null
    }
  },
  mounted () {
    this.initMap()
    this.initLayers()
  },
  beforeDestroy () {
    if (this.locationMarker) {
      this.locationMarker.remove()
      this.locationMarker = null
    }
  },
  watch: {
    'active': function () {
      const evt = this.events[this.active]
      this.map.setView(evt.loc, evt.zoom, evt.options)
      this.setLocationMarker(evt.loc)
    }
  },
  computed: {
    active () {
      return this.$store.state.active
    }
  },
  methods: {
    locationPinIcon () {
      return L.divIcon({
        className: 'map-location-pin',
        html:
          '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40" aria-hidden="true">' +
          '<path fill="#c41e3a" stroke="#fff" stroke-width="1.25" d="M16 1.5C8.8 1.5 3 7.1 3 14.2c0 9.8 13 23.3 13 23.3S29 24 29 14.2C29 7.1 23.2 1.5 16 1.5z"/>' +
          '<circle cx="16" cy="14" r="4.5" fill="#fff"/></svg>',
        iconSize: [32, 40],
        iconAnchor: [16, 40],
        popupAnchor: [0, -36]
      })
    },
    setLocationMarker (latLng) {
      if (!this.map) return
      if (this.locationMarker) {
        this.locationMarker.setLatLng(latLng)
      } else {
        this.locationMarker = L.marker(latLng, {
          icon: this.locationPinIcon(),
          interactive: false,
          keyboard: false,
          zIndexOffset: 600
        }).addTo(this.map)
      }
    },
    initMap () {
      const evt = this.events[this.active]
      const lockOpts = this.interactive ? {} : {
        dragging: false,
        touchZoom: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        zoomControl: false,
        tap: false
      }
      this.map = L.map(this.$el, { keyboard: false, ...lockOpts }).setView(evt.loc, evt.zoom, evt.options)
      this.tileLayer = L.tileLayer(
        'https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
          maxZoom: 20,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
          attribution: 'Google-Maps'
        })
      this.tileLayer.addTo(this.map)
      this.setLocationMarker(evt.loc)
    },
    initLayers () {}
  }
}

</script>

<style scoped>

#map {
  width: 100%;
  height: 100%;
  /* Dark base so tiles that are still loading read as dark, not a light-grey flash */
  background: var(--color-chrome, #0f172a);
}

</style>

<style>
/* Leaflet divIcon: not in Vue template, so unscoped */
.map-location-pin {
  background: transparent !important;
  border: none !important;
}
</style>
