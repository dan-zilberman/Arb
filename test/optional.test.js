const expect = require('chai').expect;
const Optional = require('../src/optional');
const R = require('ramda');


describe('Optional ', function() {
  it('Should not invoke function', function() {
    let funcInvoked = false;
    const optional = Optional.of(null);

    optional.map(optional => {
      funcInvoked = true;
    });

    expect(funcInvoked).to.be.equal(false);
  });

  it('Should invoke function', function() {
    let funcInvoked = false;
    const optional = Optional.of(3);

    optional.map(optional => {
      funcInvoked = true;
    });

    expect(funcInvoked).to.be.equal(true);
  });

  it('Should be nothing', function() {
    const funcInvoked = false;
    const optional = Optional.of(undefined);

    expect(optional.isNothing()).to.be.equal(true);
  });

  it('Should be something', function() {
    const funcInvoked = false;
    const optional = Optional.of('Test');

    expect(optional.isNothing()).to.be.equal(false);
  });

  it('Should execute curried function', function() {
    const result = Optional.applyOptionalArgs(
      R.curry((value0, value1, value2) => value0 + value1 + value2),
      Optional.of(1),
      Optional.of(2),
      Optional.of(3)
    );

    expect(result.join() === 6).to.be.equal(true);
  });

  it('Should not execute curried function', function() {
    let funcInvoked = false;
    const result = Optional.applyOptionalArgs(
      R.curry((value0, value1, value2) => { funcInvoked = true; }),
      Optional.of(1),
      Optional.of(null),
      Optional.of(3)
    );

    expect(result.isNothing() && !funcInvoked).to.be.equal(true);
  });
});
