const Optional = require('./optional');
const Event = require('./event');


class Observable {
  constructor(value) {
    this._event = new Event();
    this._value = value;
  }

  get Event() { return this._event; }

  get Value() { return this._value; }
  set Value(value) {
    this._value = value;
    this._event.invoke(this._value);
  }
}


module.exports = Observable;
