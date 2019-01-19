"use strict";

const ApiKey = 'f376e72602ce8117d263a15b2bcb60b9031e1821'

module.exports = async (req, res) => {
  const Queue = require('../utils/queue');
  const myQueue = new Queue();
  const qs = (myQueue.get()).sort();
  const ts = () => ('['+String(new Date()).substr(0, 24)+']: ');
  const { loadavg, totalmem, freemem } = require('os');
  const { memoryUsage } = require('process');
  const html = {
    e502: `<html><head><title>502 Bad Gateway</title></head>
      <body bgcolor="white">
      <center><h1>502 Bad Gateway</h1></center><hr><center>CERN HTTPd/0.0.1 (NeXTstep 0.9)</center>
      </body></html>`,
  };
  if (ApiKey !== req.query.key) return res.status(502).send(html.e502);

  const json = { 
    jobs: {
      working: myQueue.getStat(),
      finished: myQueue.getStatHistory(),
    },
    system: {
      loadavg : loadavg(),
      memory : {
        totalmem: totalmem() / (2.0**20),
        freemem: freemem() / (2.0**20),
        heapsV8: process.memoryUsage(),
      },
    },
    message: `[status]${ts()} ${qs.length} orders remains`,
  };
  console.log(ts()+'call '+ __filename);
  console.log(req.query);
  console.log(JSON.stringify(json, undefined, 2));
  res.json(json);
  return true;
};
