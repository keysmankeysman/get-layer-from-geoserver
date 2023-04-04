<template>
  <div id="app">
    <button @click="getMapLayer()">Кнопка</button>
    <div id="simple-map" class="map"></div>
  </div>
</template>

<script>
import "ol/ol.css"
import Map from 'ol/map'
import OSM from 'ol/source/osm'
import TileLayer from 'ol/layer/tile'
import View from 'ol/view'

import Image from 'ol/layer/image'
import ImageWMS from 'ol/source/imagewms'

export default {
  name: "app",
  data () {
    return {
      map: null,
      layer: null,
      layerZones: {
        "id": "2bd50162-47f0-45b6-9546-7c4edb4e0d16",
        "name": "Зоны дд",
        "layers": "fpd:l_isogd_documents_without_inzh",
        "url": "http://gisfpd.petrosoft.su/geoserver/ows",
        "type": 10,
        "itemType": "layer",
        "visible": true,
        "children": [],
        "style": {},
        "cqlFilter": null
      },
      params: {
        "LAYERS": "fpd:l_isogd_documents_without_inzh",
        "VERSION": "1.3.0"
      }
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
      layers: [ layers, this.getMapLayer() ],
      target: 'simple-map',
      view: view
    })
  },
  watch: {

  },
  methods: {
    getMapLayer() {
      let mapLayer = new Image({
        source: new ImageWMS({
          url: this.layerZones.url,
          params: this.params,
          crossOrigin: 'anonymous',
          imageLoadFunction: undefined
        })
      })
      return mapLayer
    }
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
