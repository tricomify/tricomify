/**
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import BingMaps from 'ol/source/BingMaps.js';
import OSM from 'ol/source/OSM.js';
*/

//import TileLayer from 'ol/layer/Tile.js';

const osm = new ol.layer.Tile.TileLayer({
  source: new ol.source.OSM()
});


const map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([139.754784, 35.708316]),
    zoom: 10
  })
});

const map2 = new ol.Map({
  target: 'map2',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([139.754784, 35.708316]),
    zoom: 20
  })
});
