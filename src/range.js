const range = function* (from, to) {
  if (from > to) {
    // Infinite loop
    throw new TypeError(`range(${from}, ${to}) will never exit. ` +
      `Infinite loop avoided.`);
  }

  for (i = from; i < to; i++) {
    yield i;
  }
};


module.exports = range;
