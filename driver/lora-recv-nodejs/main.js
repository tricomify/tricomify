const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('/dev/ttyUSB0', {
  baudRate: 57600
});
const parser = port.pipe(new Readline({ delimiter: '\n' }));

const ts = () => ('['+String(new Date()).substr(0, 24)+']: ');
const debug = msg => (console.log(ts() + msg));

parser.on('data', data => {
  const s = data.replace(/\r/g, '');
  const { convRaw2Json } = require('./utils/convRaw2Json');
  const json = convRaw2Json(data);
  debug(s);
  debug(JSON.stringify(json, undefined, 2));
});


