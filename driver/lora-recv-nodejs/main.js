#!/usr/bin/env node

const portname_windows = 'COM3';
const portname_linux = '/dev/ttyUSB0';
//const portname_mac = '/dev/tty.usbserial-A7043MQP';
//const portname_mac = '/dev/tty.usbserial-A601E4ZN'; // TRX24 (broken)
//const portname_mac = '/dev/tty.usbserial-A601E89L'; // Tx23
const portname_mac = '/dev/tty.usbserial-AL05HSCJ'; // TRx24 with serial-usb cable


const portname = (() => {
  console.log('OS type: ', process.platform);
  const is_windows = ('win32' === process.platform);
  const is_mac = ('darwin' === process.platform);
  const is_linux = ('linux' === process.platform);
  if (is_windows) return portname_windows;
  if (is_mac) return portname_mac;
  if (is_linux) return portname_linux;
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


