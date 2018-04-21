const Observable = require('./observable');
const R = require('ramda');
const Optional = require('./optional');


class VolatilityObservable {
  constructor(maxTimeDelta, maxValueDelta, value) {
    this._maxTimeDelta = maxTimeDelta;
    this._maxValueDelta = maxValueDelta;
    this._observable = new Observable(value);
    this._value = value;
    this._lastValueUpdate = Date.now();
  }

  _isDeltaEnough(newValue) {
    const delta = Optional.applyOptionalArgs(
      R.curry((oldValue, newValue) => Math.abs(newValue - oldValue)),
      this._observable.Value,
      newValue
    );
    return delta.isNothing() ? true :
      delta.join() >= this._maxValueDelta;
  }

  _isTimeEnough() {
    const now = Date.now();
    return now - this._lastValueUpdate >= this._maxTimeDelta;
  }

  _shouldUpdateValue(newValue) {
    return this._isDeltaEnough(newValue) || this._isTimeEnough();
  }

  get Observable() { return this._observable; }

  get Event() { return this._observable.Event; }

  get Value() { return this._value; }
  set Value(newValue) {
    this._value = newValue;
    if (this._shouldUpdateValue(newValue)) {
      this._lastValueUpdate = Date.now();
      this._observable.Value = newValue;
    }
  }
}


module.exports = VolatilityObservable;
