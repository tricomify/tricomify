import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile, Image, Vector } from 'ol/layer';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import {defaults as defaultControls, ScaleLine} from 'ol/control';

import MousePosition from 'ol/control/MousePosition';
import {createStringXY} from 'ol/coordinate';
const mousePositionControl = new MousePosition({
  coordinateFormat: createStringXY(4),
  projection: 'EPSG:4326',
  // comment the following two lines to have the mouse position
  // be placed within the map.
  className: 'custom-mouse-position',
  target: document.getElementById('mouse-position'),
  undefinedHTML: '&nbsp;'
});

const projectionSelect = document.getElementById('projection');
projectionSelect.addEventListener('change', function(event) {
  mousePositionControl.setProjection(event.target.value);
});

const precisionInput = document.getElementById('precision');
precisionInput.addEventListener('change', function(event) {
  const format = createStringXY(event.target.valueAsNumber);
  mousePositionControl.setCoordinateFormat(format);
});

import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Fill, RegularShape, Stroke, Style} from 'ol/style';
const stroke = new Stroke({color: 'white', width: 1});
const fill = new Fill({color: 'blue'});
const styles = {
  'square': new Style({
    image: new RegularShape({
      fill: fill,
      stroke: stroke,
      points: 4,
      radius: 10,
      angle: Math.PI / 4
    })
  }),
  'triangle': new Style({
    image: new RegularShape({
      fill: fill,
      stroke: stroke,
      points: 3,
      radius: 10,
      rotation: Math.PI / 4,
      angle: 0
    })
  })
};

import { pos } from './pos';
const count = pos.length;
const features = new Array(count);

for (let i = 0; i < count; ++i) {
  features[i] = new Feature(new Point(pos[i]));
  features[i].setStyle(styles['triangle']);
}

const source = new VectorSource({
  features: features
});

const vectorLayer = new VectorLayer({
  source: source
});

const scaleLineControl = new ScaleLine();

const map = new Map({
  target: 'map',
  controls: defaultControls().extend([
    scaleLineControl,
    mousePositionControl
  ]),
  layers: [
    new Tile({
      source: new OSM()
    }),
    vectorLayer
  ],
  view: new View({
    projection: 'EPSG:4326', //HERE IS THE VIEW PROJECTION
    center: [139.754784, 35.708316],
    zoom: 18
  })
});
