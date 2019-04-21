#!/usr/bin/env node

const tstr = () => (String(new Date()).substr(0, 24));
const gpio = require('rpi-gpio');

const LED_PIN = 40; // 40番ピン（GPIO40ではない、GPIO21）
const LED_BLINK_DELAY_MS = 500;  // 1秒毎にLチカ

let ledOn = true;

// LED ピンをOUT方向に設定
gpio.setup(LED_PIN, gpio.DIR_OUT, () => {

  // LED_BLINK_DELAY_MS毎にLED ON/OFF
  setInterval(() => {
    if(ledOn) {
      // LED ピンをlowに設定
      gpio.write(LED_PIN, false);
      ledOn = false;
      console.log(tstr() + ": LED Off");
    } else {
      // LED ピンをhighに設定
      gpio.write(LED_PIN, true);
      ledOn = true;
      console.log(tstr() + ": LED on");
    }
  }, LED_BLINK_DELAY_MS);
});
