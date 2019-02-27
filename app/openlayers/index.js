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
const stroke = new Stroke({color: 'black', width: 1});
const fill = new Fill({color: 'gold'});
const fill_red = new Fill({color: 'red'});
const fill_blue = new Fill({color: 'blue'});
const styles = {
  'square': new Style({
    image: new RegularShape({
      fill: fill_blue,
      stroke: stroke,
      points: 4,
      radius: 10,
      angle: Math.PI / 4
    })
  }),
  'star': new Style({
    image: new RegularShape({
      fill: fill_red,
      stroke: stroke,
      points: 5,
      radius: 10,
      radius2: 4,
      angle: 0
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
  const lng = pos[i][0];
  const lat = pos[i][1];
  const tid = pos[i][2];
  features[i] = new Feature(new Point([lng, lat]));
  if (21 === tid) {
    features[i].setStyle(styles['triangle']);
  } else if (22 === tid) {
    features[i].setStyle(styles['square']);
  } else {
    features[i].setStyle(styles['star']);
  }
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
    // [139.754784, 35.708316] -- Kasuga
    // [106.822824, -6.185648] -- Jakarta
    center:	[106.822824, -6.185648], 
    zoom: 18
  })
});
