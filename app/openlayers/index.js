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
const stroke = new Stroke({color: 'black', width: 2});
const fill = new Fill({color: 'red'});
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


// Tokyo [139.41302, 35.41224]
const pos = [
  [ 139.755168, 35.708112 ],
  [ 139.755168, 35.708112 ],
  [ 139.754832, 35.70822 ],
  [ 139.754864, 35.708188 ],
  [ 139.75488, 35.708244 ],
  [ 139.754768, 35.708248 ],
  [ 139.754832, 35.708292 ],
  [ 139.754976, 35.708344 ],
  [ 139.754944, 35.708436 ],
  [ 139.755008, 35.70854 ],
  [ 139.75488, 35.70838 ],
  [ 139.754832, 35.70834 ],
  [ 139.754848, 35.708364 ],
  [ 139.754784, 35.708352 ],
  [ 139.754768, 35.708304 ],
  [ 139.754784, 35.708368 ],
  [ 139.754912, 35.708396 ],
  [ 139.754928, 35.708428 ],
  [ 139.754944, 35.708452 ],
  [ 139.755136, 35.708412 ],
  [ 139.755696, 35.70844 ],
  [ 139.755984, 35.707788 ],
  [ 139.756016, 35.707696 ],
  [ 139.756848, 35.70734 ],
  [ 139.754896, 35.711508 ],
  [ 139.753216, 35.711236 ],
  [ 139.753216, 35.711188 ],
  [ 139.753184, 35.711204 ],
  [ 139.752528, 35.710928 ],
  [ 139.752928, 35.709804 ],
  [ 139.753296, 35.70882 ],
  [ 139.753472, 35.708844 ],
  [ 139.753584, 35.708772 ],
  [ 139.75464, 35.70618 ],
  [ 139.754064, 35.707716 ],
  [ 139.754064, 35.707876 ],
  [ 139.755504, 35.707692 ],
  [ 139.75528, 35.70726 ],
  [ 139.755408, 35.707536 ],
  [ 139.755856, 35.707504 ],
  [ 139.75544, 35.707832 ],
  [ 139.755376, 35.707836 ],
  [ 139.75536, 35.708076 ],
  [ 139.75536, 35.70826 ],
  [ 139.755344, 35.708344 ],
  [ 139.75472, 35.708384 ],
  [ 139.754752, 35.708384 ],
  [ 139.754736, 35.708368 ],
  [ 139.754688, 35.70834 ],
  [ 139.754704, 35.708308 ],
  [ 139.754736, 35.708288 ],
  [ 139.754784, 35.708316 ],
  [ 139.754768, 35.708312 ],
  [ 139.754848, 35.708344 ],
  [ 139.7548, 35.708328 ],
  [ 139.754784, 35.708316 ],
]; 

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
