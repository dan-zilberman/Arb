const expect = require('chai').expect;
const Event = require('../src/event');


describe('Event', function() {
  it('Should execute all callbacks', function() {
    const CALLBACK_COUNT = 50;
    let callsCount = 0;
    const event = new Event();
    for (i = 0; i < CALLBACK_COUNT; i++) {
      event.add(() => { callsCount++; })
    }

    event.invoke();

    expect(callsCount).to.be.equal(CALLBACK_COUNT);
  });

  it('Should remove all callbacks', function() {
    const CALLBACK_COUNT = 50;
    let callsCount = 0;
    const callbacks = [];
    const event = new Event();
    for (i = 0; i < CALLBACK_COUNT; i++) {
      const callback = () => { callsCount++; }
      event.add(callback);
      callbacks.push(callback);
    }
    for (const callback of callbacks) {
      event.remove(callback);
    }

    event.invoke();

    expect(callsCount).to.be.equal(0);
  });
});
