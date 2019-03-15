#!/usr/bin/env node

const portname = (() => {
  console.log('OS type: ', process.platform);
  const is_windows = ('win32' === process.platform);
  const is_mac = ('darwin' === process.platform);
  const is_linux = ('linux' === process.platform);
  if (is_windows) return '/dev/com1';
  if (is_mac) return '/dev/tty.usbserial-A7043MQP';
//  if (is_mac) return '/dev/tty.usbserial-A601E4ZN';
//  if (is_mac) return '/dev/tty.usbserial-A601E89L'; // Tx23
  if (is_linux) return '/dev/ttyUSB0';
})();

const protocolVersion = require('./utils/protocolVersion');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort(portname, {
  baudRate: 57600
});
const parser = port.pipe(new Readline({ delimiter: '\n' }));

const ts = () => ('['+String(new Date()).substr(0, 24)+']: ');
const debug = msg => (console.log(ts() + msg));


const nbuf = 1024;
const txbufIndex = 0;
const txbuf = new Array(nbuf);
const createPacket = (txmsg) => {
  if (1 === txmsg.payload) {
  }
};


parser.on('data', data => {
  const s = data.replace(/\r/g, '');
  const { convRaw2Json } = require('./utils/convRaw2Json');
  const { writePacket } = require('./utils/writePacket');
  const { checkPacket } = require('./utils/checkPacket');

  const json = convRaw2Json(data);
  
  const packet = {
    header: {protoclVersion: protocolVersion},
    body: json,
  };

  if (checkPacket(packet)) {
    writePacket(packet);
  }

  debug(s);
  debug(JSON.stringify(json, undefined, 2));

});


