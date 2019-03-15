#!/usr/bin/env node

const { readdirSync, readFileSync } = require('fs');
require('date-utils');

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
  packet.fname = f.toString();
  packets.push(packet);
}


//    "rx_gpsDate": "130319",
//    "rx_gpsTime": "110603",
let ti = 0;

for (p of packets) {
  if (1 === p.body.payload) {
    const tid = p.body.tx_id;
    const tx_lat = p.body.tx_lat;
    const tx_lng = p.body.tx_long;

    if ( tx_lat !== null && tx_lng !== null) {
      const rx_lat = p.body.rx_lat;
      const rx_lng = p.body.rx_long;
      let rx_gpsDate = p.rx_gpsDate;
      let rx_gpsTime = p.rx_gpsTime;

      const getDateNow = () => {
        let dt = new Date();
        dt.setMinutes(dt.getMinutes() + ti);
        ti += 4;
        dt.setFullYear(2018);
        dt.setMonth(1);
        dt.setDate(1);
        let formatted = dt.toFormat("YYYY-MM-DD HH24:MI:SS");
        return formatted;
      }
      const rx_packet = '99, '+getDateNow()+', ' + rx_lng+', '+rx_lat;
      console.log(rx_packet);

      const tx_packet = tid+', '+getDateNow()+', ' + tx_lng+', '+tx_lat;
      console.log(tx_packet);
    }
  }
}
