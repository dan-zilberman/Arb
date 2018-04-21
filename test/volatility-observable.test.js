const expect = require('chai').expect;
const VolatilityObservable = require('../src/volatility-observable');
const Optional = require('../src/optional');


describe('VolatilityObservable', function() {
  it('Should emit if delta is large enough', function() {
    const values = [
      Optional.of(12),
      Optional.of(12.4),
      Optional.of(12.2),
      Optional.of(12.7),
      Optional.of(12.05)];
    const newValues = [];
    const expectedNewValues = [values[0], values[3], values[4]];
    const volObservable = new VolatilityObservable(
      1000,
      0.6,
      Optional.of(null)
    );
    volObservable.Event.add(optional => {
      newValues.push(optional);
    });

    for (const value of values) {
      volObservable.Value = value;
    }

    expect(newValues.length).to.be.equal(expectedNewValues.length);
    for (let i = 0; i < newValues.length; i++) {
      expect(newValues[i]).to.be.equal(expectedNewValues[i]);
    }
  });
});
