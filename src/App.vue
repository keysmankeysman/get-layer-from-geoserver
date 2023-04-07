<template>
  <div id="app">
    <button @click="getMapLayer()">Кнопка</button>
    <button @click="sendRequest()">Запрос</button>
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
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      map: null,
      layer: null,
      layerZones: {
        url: '/geoserver/wms',
      },
      params: {
        LAYERS: 'fpd:rosreestr_realty',
        VERSION: '1.3.0'
      },
    }
  },
  async mounted() {
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

    let layer = this.getMapLayer()
    this.map.addLayer(layer)
    // this.map.addLayer(await this.sendRequest())
  },
  watch: {

  },
  methods: {
    getMapLayer() {
      const opacity = 1
      const visible = true
      let mapLayer = new Image({
        source: new ImageWMS({
          url: '/geoserver/wms',
          params: {
            LAYERS: 'fpd:l_isogd_documents',
            VERSION: '1.3.0'
          },
          crossOrigin: 'anonymous',
          imageLoadFunction: undefined
        }),
        opacity,
        visible
      })
      return mapLayer
    },
    async sendRequest() {
      // axios.get('/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=fpd%3Aall_boundaries_oktmo')
      const { data: result } = await axios.get('/geoserver/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=fpd%3Al_isogd_documents&CRS=EPSG%3A3857&STYLES=&WIDTH=894&HEIGHT=1254&BBOX=2965756.6974648386%2C7691399.534167575%2C4059111.9500559997%2C9225032.069681352')
      return result 
      // this.map.addLayer(layer)
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
