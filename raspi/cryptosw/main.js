#!/usr/bin/env node
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const tstr = () => (String(new Date()).substr(0, 24));
const gpio = require('rpi-gpio');

const pinGpio = 40; // Pin# 40（GPIO21, not GPIO40)
const CryptoAuth = require('./utils/cryptoAuth');
const auth = new CryptoAuth();

const ndelay = 5000; // msec
let balancePrev = auth.updateBalance();
console.log(tstr(), balancePrev);


const JukeBox = class JukeBox {
  constructor () {
    this.time = new Date();
    this.meter = 0; // msec
  }

  insertCoin (coin) {
    this.meter = this.meter + (coin * 30 * 1000);
    this.time = new Date();
  }

  resetTimer() {
    this.time = new Date();
  }

  getTimer() {
    const now = new Date();
    const passed = now.getTime() - this.time.getTime();
    return passed; // msec
  }

  getMeter () {
    const used = this.getTimer();
    this.meter = this.meter - used;
    this.resetTimer();

    if (this.meter < 0) {
      this.meter = 0;
    }
    return (this.meter);
  }
}

const jukeBox = new JukeBox();

const mainLoop = () => {
  gpio.setup(pinGpio, gpio.DIR_OUT, () => {

    setInterval (() => {
      const balance = auth.updateBalance();
      const coinPayed = balance - balancePrev;

      if (0 < coinPayed) {
        jukeBox.insertCoin(coinPayed);
      }

      const meter = jukeBox.getMeter();

      if(meter > 1) {
        console.log('!!!!!!!!!!!!!! ON');
        gpio.write(pinGpio, true);
      } else {
        console.log('xxxxxx OFF');
        gpio.write(pinGpio, false);
      }

      console.log("status: %o", {
        time: tstr(),
        pinGpio: pinGpio,
        delay: ndelay,
        balancePrev: balancePrev,
        balance: balance,
        timer: jukeBox.getTimer(),
        meter: jukeBox.getMeter()/1.0e3,
      });

      balancePrev = balance;
    }, ndelay);

  });

};

sleep(5000).then(() => {
  balancePrev = auth.getBalance();
  console.log("%o", 
              {
                satrtTime: tstr(), 
                startBalance: balancePrev
              }
             );})
  .then(() => {
    mainLoop();
  });
       


