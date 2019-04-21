#!/usr/bin/env node

const tstr = () => (String(new Date()).substr(0, 24));
const gpio = require('rpi-gpio');
const LED_PIN = 40; // 40番ピン（GPIO40ではない、GPIO21）
const LED_BLINK_DELAY_MS = 100;  // msec

// LED ピンをhighに設定
const powerOnLED = () => {
  gpio.write(LED_PIN, true);
  console.log(tstr() + ": LED on");

  setInterval( () => {
    process.exit();
  }, LED_BLINK_DELAY_MS);
}

// LED ピンをOUT方向に設定
gpio.setup(LED_PIN, gpio.DIR_OUT, powerOnLED);
