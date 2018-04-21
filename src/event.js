const Optional = require('./optional');


class Event {
  constructor() {
    this.callbacks = [];
  }

  add(callback) {
    this.callbacks.push(callback);
  }

  remove(callback) {
    const index = this.callbacks.indexOf(callback);
    if (index != -1) this.callbacks.splice(index, 1);
  }

  invoke(...args) {
    for (const callback of this.callbacks) {
      callback(...args);
    }
  }
}


module.exports = Event;
