const expect = require('chai').expect;
const range = require('../src/range');


function randInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


describe('range(from, to)', function() {
  it('Length should be correct', function() {
    const NUM_TESTS = 5;
    const MAX_VALUE = 20;
    for (let i = 0; i < NUM_TESTS; i++) {
      const firstValue = randInt(MAX_VALUE);
      const secondValue = randInt(MAX_VALUE);
      const maxValue = Math.max(firstValue, secondValue);
      const minValue = Math.min(firstValue, secondValue);
      const values = [...range(minValue, maxValue)];
      expect(values.length).to.be.equal(maxValue - minValue);
    }
  });

  it("Should throw exception if 'from' is bigger then 'to'", function() {
      let thrown = false;

    try {
      [...range(0, -1)];
    }
    catch(e) {
      thrown = true;
    }
    expect(thrown).to.be.equal(true);
  });
});
