const expect = require('chai').expect;
const Observable = require('../src/observable');
const Optional = require('../src/optional');


describe('Observable', function() {
  it('Should emit value changes', function() {
    const values = [
      Optional.of(1),
      Optional.of(3),
      Optional.of('Dan'),
      Optional.of(6),
      Optional.of('Zilberman')];
    const newValues = [];
    const observable = new Observable();
    observable.Event.add(optional => {
      newValues.push(optional);
    });

    for (const value of values) {
      observable.Value = value;
    }

    expect(newValues.length).to.be.equal(values.length);
    for (let i = 0; i < newValues.length; i++) {
      expect(newValues[i]).to.be.equal(values[i]);
    }
  });
});
