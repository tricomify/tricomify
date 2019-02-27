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


console.log('export const pos = [');
for (p of packets) {
  if (1 === p.body.payload) {
    const tid = p.body.tx_id;
    const lat = p.body.tx_lat;
    const lon = p.body.tx_long;
    if ( lat !== null && lon !== null) {
      const s = '  ['+lon+', '+lat+', '+tid+'],';
      console.log(s);
    }
  }
}
console.log(']');
