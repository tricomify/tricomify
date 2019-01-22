import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile, Image, Vector } from 'ol/layer';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import {defaults as defaultControls, ScaleLine} from 'ol/control.js';

const scaleLineControl = new ScaleLine();

const map = new Map({
  target: 'map',
  controls: defaultControls().extend([
    scaleLineControl
  ]),
  layers: [
    new Tile({
      source: new OSM()
    })
  ],
  view: new View({
    projection: 'EPSG:3857', //HERE IS THE VIEW PROJECTION
    center: fromLonLat([139.754784, 35.708316]),
    zoom: 20
  })
});
