#!/usr/bin/env node

const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

function readCsv (fname) {

  if (fname === '' || fname == undefined) {
    console.error('ERR: no filename!!');
    return;
  } 

  try {
    fs.statSync(fname);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`
        ${path.join(dirname, basename)}
        cannot read '${fname}': No such file or directory
      `);
    } else {
      console.log(error);
    }
    return;
  }

  readFile(fname, 'utf-8')

    .then( (data) => {
      // === String -> JSON ===
      const lines = data.split('\n');
      return lines;
    })
    .then( (lines) => {
      const csv =  lines.map ( line => {
        const arr = line.split(',');
        if ('1' === arr[12]) return arr; // payload '1' only
      }).filter( line => line !== undefined);
      return (csv);
    })
    .then( (csv) => {
      const pos =  csv.map ( cell => {
        return ([Number(cell[14]/1e6), Number(cell[15]/1e6)]);
      });
      return pos;
    })
    .then( (pos) => {
      pos.map( r => {
        console.log(r);
      });
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

fname = process.argv[2];
readCsv(fname);

