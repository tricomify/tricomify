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
import LineString from 'ol/geom/LineString';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Fill, RegularShape, Stroke, Style} from 'ol/style';
const stroke = new Stroke({color: 'black', width: 1});
const fill = new Fill({color: 'gold'});
const fill_red = new Fill({color: '#F07'});
const fill_blue = new Fill({color: 'blue'});
const fill_green = new Fill({color: '#6F9'});
const styles = {
  'square': new Style({
    image: new RegularShape({
      fill: fill_green,
      stroke: stroke,
      points: 4,
      radius: 10,
      angle: Math.PI / 4
    })
  }),
  'star': new Style({
    image: new RegularShape({
      fill: fill_blue,
      stroke: stroke,
      points: 5,
      radius: 10,//5,
      radius2: 5,//2,
      angle: 0
    })
  }),
  'x': new Style({
    image: new RegularShape({
      fill: fill,
      stroke: stroke,
      points: 5,
      radius: 3,
      radius2: 3,
      angle: Math.PI / 5
    })
  }),
  'triangle': new Style({
    image: new RegularShape({
      fill: fill,
      stroke: stroke,
      points: 3,
      radius: 5,
      rotation: Math.PI / 4,
      angle: 0
    })
  }),
  'circle': new Style({
    image: new RegularShape({
      fill: fill_red,
      stroke: stroke,
      points: 8,
      radius: 3,
      rotation: Math.PI / 8,
      angle: 0
    })
  })
};

import { pos } from './pos';
const count = pos.length * 2;
const features = new Array(count);
const features2 = new Array(count>>1);

for (let i = 0; i < count; i += 2) {
  const tid = pos[i>>1][0];
  const rx_lng = pos[i>>1][1];
  const rx_lat = pos[i>>1][2];
  const tx_lng = pos[i>>1][3];
  const tx_lat = pos[i>>1][4];
  // Point Tx
  features[i] = new Feature(new Point([tx_lng, tx_lat]));
  if (21 === tid) {
    features[i].setStyle(styles['x']);
  } else if (22 === tid) {
    features[i].setStyle(styles['triangle']);
  } else { // (23 === tid)
    features[i].setStyle(styles['star']);
  }
  // Point Rx
  features[i+1] = new Feature(new Point([rx_lng, rx_lat]));
  features[i+1].setStyle(styles['circle']);

  // Line Rx-TX
  features2[i>>1] = new Feature(new LineString([[tx_lng, tx_lat], [rx_lng, rx_lat]]));
}

const vectorLayer = new VectorLayer({
  source: new VectorSource({features: features})
});

const vectorLayer2 = new VectorLayer({
  source: new VectorSource({features: features2})
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
    vectorLayer2,
    vectorLayer
  ],
  view: new View({
    projection: 'EPSG:4326', //HERE IS THE VIEW PROJECTION
    // [139.754784, 35.708316] -- Kasuga
    // center:	[106.822824, -6.185648], // Jakarta
    // center:	[115.233488, -8.705538], // Bali, TUNA Center
    // center:	[115.263554,-8.695564], // Bali, Maison Hotel
    // center:	[115.262592, -8.707222], // Bali, Beach
    // center:	[30.094826, -1.95233900000], // Kigali Mariot Hotel
    center:	[30.099555, -1.955555], // Kigali City Center

    zoom: 14.5
  })
});
