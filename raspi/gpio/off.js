#!/usr/bin/env node

const tstr = () => (String(new Date()).substr(0, 24));
const gpio = require('rpi-gpio');
const LED_PIN = 40; // 40番ピン（GPIO40ではない、GPIO21）
const LED_BLINK_DELAY_MS = 100;  // msec

// LED ピンをlowに設定
const powerOffLED = () => {
  gpio.write(LED_PIN, false);
  console.log(tstr() + ": LED off");

  setInterval(() => {
    process.exit();
  }, LED_BLINK_DELAY_MS);
};

// LED ピンをOUT方向に設定
gpio.setup(LED_PIN, gpio.DIR_OUT, powerOffLED);
