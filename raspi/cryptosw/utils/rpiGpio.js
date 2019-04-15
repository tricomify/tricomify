/**
   (c) 2018-2019 T. Hamada
*/

"use strict";
const fs = require('fs');
const path = require('path');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = class Gpio{

  constructor () {
    this.pin = 40;
    this.dir = '/sys/class/gpio/';
    this.pinPath = path.join(this.dir, 'gpio' + this.pin);
    this.puts = console.log;
  }

  setPin (pin) {
    this.pin = pin;
    this.pinPath = path.join(this.dir, 'gpio' + this.pin);
  }

  exportPin (pin = this.pin) {
    fs.writeFileSync(path.join(this.dir, 'export'), pin);
  }

  unexportPin (pin = this.pin) {
    fs.writeFileSync(path.join(this.dir, 'unexport'), this.pin);
  }

  setDirection (inout = 'out') {
    fs.writeFileSync(path.join(this.pinPath, 'direction'), inout);
  }

  writePin (val = '0') {
    fs.writeFileSync(path.join(this.pinPath, 'value'), val);
  }

  setPinHighTimer (ms) {
    fs.writeFileSync(path.join(this.pinPath, 'value'), '1');

    setTimeout ( () => {
      fs.writeFileSync(path.join(this.pinPath, 'value'), 0);
    }, 10000);
  }


}
