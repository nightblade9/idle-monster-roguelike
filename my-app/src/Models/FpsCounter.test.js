import sinon from 'sinon/lib/sinon';

import FpsCounter from '../Models/FpsCounter';

var clock;

beforeEach(function() {
  clock = sinon.useFakeTimers();
});

afterEach(function() {
  clock.restore();
});

it('onRender increments draw calls', () => {
  var fpsCounter = new FpsCounter();
  fpsCounter.onRender();
  expect(fpsCounter.drawCalls).toBe(1);
});

// Yo dawg, I heard you like tests, can I test your tests?
// (Placeholder test for our time-mocking library.)
// TODO: figure out why jasmine.clock and Jasmine.Clock are undefined
it('can mock time', function () {
    var callback = sinon.fake();

    clock.tick(99);
    expect(callback.notCalled);

    clock.tick(1);
    expect(callback.calledOnce);

    // Also:
    expect(new Date().getTime()).toBe(100);
});

it('onUpdate sets FPS after 1s', () => {
  // Arrange
  var expectedFps = 3;

  var fpsCounter = new FpsCounter();
  for (var i = 0; i < expectedFps; i++) {
    fpsCounter.onRender();
  }

  // Elapse 1s
  clock.tick(1000);

  // Act
  fpsCounter.onUpdate();

  // Assert
  expect(fpsCounter.fps).toBe(expectedFps);
});
