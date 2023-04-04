<template>
  <div id="app">
    <div id="simple-map" class="map"></div>
  </div>
</template>

<script>
import "ol/ol.css"
import Map from 'ol/map'
import OSM from 'ol/source/osm'
import TileLayer from 'ol/layer/tile'
import View from 'ol/view'

export default {
  name: "app",
  data () {
    return {
      map: null,
      layer: null,
    }
  },
  mounted() {
    const layers = new TileLayer({
      source: new OSM()
    })

    const view = new View({
      projection: 'EPSG:3857',
      center: [0, 0],
      zoom: 1,
    })

    this.map = new Map({
      layers: [ layers ],
      target: 'simple-map',
      view: view
    })
  },
  watch: {

  },
  methods: {

  }
}
</script>

<style>

body {
  font-family: Arial;
}

.nav {
  margin-bottom: 24px;
}

.nav__link {
  color: black;
  text-decoration: none;
}

.router-link-exact-active {
  color: white;
  background: #696bc7;
}

</style>
