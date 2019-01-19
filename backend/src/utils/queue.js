"use strict";

class staticQueue {

  static checkEmpty() {
    if (!Array.isArray(this.queue)) this.queue = [];
    return (0 === this.queue.length);
  }

  static push(key) {
    if (this.checkEmpty()) this.startDate = new Date();
    this.queue.push(key);
  }

  static getCount() {
    this.checkEmpty();
    return this.queue.length;
  }

  static del (key) {
    if (this.checkEmpty()) {
      return false;
    } else {
      const newQueue = this.queue.filter(k => k !== key);
      this.queue = newQueue;
      if (0 === newQueue.length) this.endDate = new Date();
      return true;
    }
  }

  static get() {
    this.checkEmpty();
    return this.queue;
  }

  static getStat() {
    this.checkEmpty();
    const dt = (date) => (date || new Date());
    const stat = {
      queue: this.queue,
      count: this.queue.length,
      startDate: dt(this.startDate).toString(),
      endDate: dt(this.endDate).toString(),
      elapsedMin: (dt(this.endDate).getTime() - dt(this.startDate).getTime())/6e4,
    }
    return stat;
  }
}


class staticQueueHistory {

  static checkEmpty() {
    if (!Array.isArray(this.queue)) this.queue = [];
    return (0 === this.queue.length);
  }

  static push(key) {
    this.checkEmpty();
    this.queue.push({
      bookId: key,
      //zip: 'reserved',
      date: (new Date()).toString(),
    });
  }

  static get() {
    this.checkEmpty();
    return this.queue;
  }

  static getStat() {
    this.checkEmpty();
    return {
      queue: this.queue,
      count: this.queue.length,
    };
  }
}

module.exports = class Queue {

  constructor () {
  }
  push(key) {
    staticQueue.push(key);
  }
  del(key) {
    staticQueue.del(key);
    staticQueueHistory.push(key);
  }
  get(key) {
    return staticQueue.get();
  }
  getStat() {
    return staticQueue.getStat();
  }
  getStatHistory() {
    return staticQueueHistory.getStat();
  }

}
