"use strict";
const nByte = 32;
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const unlockedId = -1;

class storageShared {
  static write (s) {
    this.storage = s;
  }
  static read() {
    this.storage = this.storage || unlockedId;
    return this.storage;
  }
}

module.exports = class LockCPU{

  constructor () {
    this.id = require('crypto').randomBytes(nByte).toString('hex');
    this.locked = false;
  }

  checkLockOwner() {
    try {
      const lockId = storageShared.read();
      if (lockId === this.id) {
        this.locked = true;
        return true;
      } else {
        this.locked = false;
        return false;
      }
    } catch(err) {
      if ('ENOENT' === err.code) {
        console.log("no lockowner, file doesn't exist.");
        return false;
      }
      console.error(err.code, err);
      require('assert')(false);
    }
  }

  getId () {
    return (this.id);
  }

  Lock() {
    try {
      if (unlockedId === storageShared.read()) storageShared.write(this.id);
      return this.checkLockOwner();
    } catch (err) {
      console.error(err.code, err);
      require('assert')(false);
    }
  }

  async spinLock(nwait = 1) {
    while(false === this.locked) {
      await sleep(nwait)
        .then(()=> {
          this.Lock();
        })
        .then()
        .then()
        .then();
    }
    console.log('[%s]: lock:   %s', String(new Date()).substr(0, 24), this.id.substr(0, 8));
    return (this.locked);
  }

  unLock() {
    if (this.locked && this.checkLockOwner() ) {
      storageShared.write(unlockedId);
      this.locked = false;
      console.log('[%s]: unlock: %s', String(new Date()).substr(0, 24), this.id.substr(0, 8));
      return true;
    } else {
      console.log('[%s]: unlock fail(%s, %s): %s', String(new Date()).substr(0, 24), this.locked, this.checkLockOwner(), this.id.substr(0, 8));
      return false;
    }
  }

}
