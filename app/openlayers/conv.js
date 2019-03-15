#!/usr/bin/env node

const { readdirSync, readFileSync } = require('fs');
const assert = require('assert');

try {
  assert.strictEqual(3, process.argv.length);
} catch (err) {
  console.error("Error !!");
  console.error("process.arvg.length: " + process.argv.length +", should be 3!");
  for (a of process.argv) console.log(a);
  return -1;
}

const path = process.argv[2];
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
    const tx_lat = p.body.tx_lat;
    const tx_lng = p.body.tx_long;

    if ( tx_lat !== null && tx_lng !== null) {
      const rx_lat = p.body.rx_lat;
      const rx_lng = p.body.rx_long;
      const packet = '  ['+tid+', '+rx_lng+', '+rx_lat+', '+tx_lng+', '+tx_lat+'],';
      console.log(packet);
    }
  }
}
console.log(']');
