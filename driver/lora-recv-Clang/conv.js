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
        //if ('1' === arr[12]) return arr; // payload '1' only
        if (17 === arr.length) return arr; // payload '1' only
      }).filter( line => line !== undefined);
      return (csv);
    })
    .then( (csv) => {
      const pos =  csv.map ( cell => {
        const pLng = parseInt(cell[15])/1e6 || 0.0;
        const pLat = parseInt(cell[14])/1e6 || 0.0;
        if (pLng > 0.1 && pLat > 0.1) {
          const r = [parseInt(cell[15])/1e6, parseInt(cell[14])/1e6];
          return r;
        }
      });
      return pos;
    })
    .then( (pos) => {
      let pos_new = [];
      pos.map( r => {
        try {
          if (( 2 === r.length) && (undefined !== r)) {
            pos_new.push(r);
          }
        } catch (err) {
          // do nothing
        }
      });
      return (pos_new);
    })
    .then( (pos) => {
      // pos.map ( r => console.log(r) );
      return pos;
    })
    .then( (pos) => {
      let js = '';
      js += "export const pos = [\n";
      pos.map( r => {
        js += `  [${r[0]}, ${r[1]}],\n`;
/*
        try {
          if ( 2 === r.length) {
            //console.log(`  [${r[0]}, ${r[1]}],`);
          }
        } catch (err) {
          console.error('r = ', r);
          console.error(err);
        }
}*/
      });
      js += "];\n";
      console.log(js);
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

fname = process.argv[2];
readCsv(fname);

