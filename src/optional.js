R = require('ramda')


class Optional {
  static of(value) {
    return new Optional(value);
  }

  constructor(value) {
    this._value = value;
  }

  isNothing() {
    return this._value == null || this._value == undefined;
  }

  /**
  * [Applies a function if the Optional has a value.
  * Otherwise returns a nothing Optional.]
  */
  map(func) {
    if (this.isNothing()) {
      return Optional.of(null);
    }

    return Optional.of(func(this._value));
  }

  /**
  * [In case there is an 'Optional of Optional of something',
  * the join method will get the inner 'Optional of something'.]
  */
  join() {
    return this._value;
  }

  /**
  * [Shortcut for optional.map(func).join().
  * Used when the 'func' returns an Optional, which causes a nested Optional.]
  */
  chain(func) {
    return this.map(func).join();
  }

  /**
  * [Returns the value or a default if the value is nothing.]
  */
  valueOrElse(defaultValue) {
    if (this.isNothing()) {
      return Optional.of(defaultValue);
    }

    return this;
  }

  /**
  * [Applies a function to another Optional if it contains a function.]
  */
  apply(otherOptional) {
    if (typeof this._value === 'function') {
      return otherOptional.map(this._value);
    }

    return Optional.of(null);
  }

  /**
  * [Used to apply many optional arguments to a curried function.
  * Shortcut for 'optional0.map(func).apply(optional1).apply(optional2)'...
  * If one of the optionals is nothing the function will not be invoked.]
  * @param {[function]} func [A curried function.]
  * @param {[...Optional]} args [Optionals to send to the function.]
  */
  static applyOptionalArgs(func, ...args) {
    if (args.length === 0) {
      return func();
    }

    const applySteps = R.map(
      R.curry((arg, optional) => optional.apply(arg)),
      R.slice(1, Infinity, args)
    );
    // arg0.map(func).apply(arg1).apply(arg2).apply(arg3) ...
    const applyPipe = R.pipe(...applySteps)  // .apply(arg1).apply(arg2).apply(arg3) ...
    return applyPipe(args[0].map(func));  // arg0.map(func)
  }
}

module.exports = Optional;
