#!/usr/bin/env node
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const tstr = () => (String(new Date()).substr(0, 24));
const gpio = require('rpi-gpio');
const qrcode = require( 'qrcode-console' );

const pinGpio = 40; // Pin# 40（GPIO21, not GPIO40)
const CryptoAuth = require('./utils/cryptoAuth');
const auth = new CryptoAuth();

const ndelay = 1000; // msec
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

const mainLoop = () => {
  const jukeBox = new JukeBox();

  gpio.setup(pinGpio, gpio.DIR_OUT, () => {

    setInterval (() => {
      const balance = auth.updateBalance();
      const coinPayed = balance - balancePrev;

      if (0 < coinPayed) {
        jukeBox.insertCoin(coinPayed);
      }

      const meter = jukeBox.getMeter();

      const black   = '\u001b[30m';
      const red     = '\u001b[31m';
      const green   = '\u001b[32m';
      const yellow  = '\u001b[33m';
      const blue    = '\u001b[34m';
      const magenta = '\u001b[35m';
      const cyan    = '\u001b[36m';
      const white   = '\u001b[37m';
      const reset   = '\u001b[0m';

      const escClearScreen = '\u001b[2J';  // clear screen
      const escMoveUp = '\u001b[250A'; // move up 250 lines
      console.log(escClearScreen + escMoveUp); 

      if(meter > 1) {
        gpio.write(pinGpio, true);
        console.log(yellow);
        qrcode.generate('0x5b8dCE0667C0e28F11E2Fa544d78A771cE8AE60B');
        console.log('');
        console.log('status: ON');
        console.log(reset);
      } else {
        gpio.write(pinGpio, false);
        console.log(red);
        qrcode.generate('0x5b8dCE0667C0e28F11E2Fa544d78A771cE8AE60B');
        console.log('');
        console.log('status: OFF');
        console.log(reset);
      }

      if (meter > 1 ) {
        console.log(cyan + meter/1.0e3 + reset + ' sec');
      } else {
        console.log(white + meter/1.0e3 + reset + ' sec');
      }
      console.log('');


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
       


