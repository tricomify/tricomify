#!/usr/bin/env node

const { readdirSync, readFileSync } = require('fs');

const path = '../../driver/lora-recv-nodejs/log/';
const files = readdirSync(path).slice().sort();

let packets = [];
for (f of files) {
  const fpath = path + f.toString();
  const packet = JSON.parse(readFileSync(fpath));
  packets.push(packet);
}


console.log('export const pos =[');
for (p of packets) {
  if (1 === p.payload) {
    const lat = p.tx_lat;
    const lon = p.tx_long;
    if ( lat !== null && lon !== null) {
      const s = '  ['+lon+', '+lat+'],';
      console.log(s);
    }
  }
}
console.log(']');
