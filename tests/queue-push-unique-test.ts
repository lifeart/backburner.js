import Backburner from 'backburner';

let Queue = (<any> Backburner).Queue;

QUnit.module('tests/queue-push-unique');
let slice = [].slice;

QUnit.test('pushUnique: 2 different targets', function(assert) {
  let queue = new Queue('foo');
  let target1fooWasCalled: string[][] = [];
  let target2fooWasCalled: string[][] = [];
  let target1 = {
    foo() {
      target1fooWasCalled.push(slice.call(arguments));
    }
  };

  let target2 = {
    foo() {
      target2fooWasCalled.push(slice.call(arguments));
    }
  };

  queue.pushUnique(target1, target1.foo, ['a']);
  queue.pushUnique(target2, target2.foo, ['b']);

  assert.deepEqual(target1fooWasCalled, []);
  assert.deepEqual(target2fooWasCalled, []);

  queue.flush();

  assert.deepEqual(target1fooWasCalled.length, 1, 'expected: target 1.foo to be called only once');
  assert.deepEqual(target1fooWasCalled[0], ['a']);
  assert.deepEqual(target2fooWasCalled.length, 1, 'expected: target 2.foo to be called only once');
  assert.deepEqual(target2fooWasCalled[0], ['b']);
});

QUnit.test('pushUnique: 1 target, 2 different methods', function(assert) {
  let queue = new Queue('foo');
  let target1fooWasCalled: string[][] = [];
  let target1barWasCalled: string[][] = [];
  let target1 = {
    foo: function() {
      target1fooWasCalled.push(slice.call(arguments));
    },
    bar: function() {
      target1barWasCalled.push(slice.call(arguments));
    }
  };

  queue.pushUnique(target1, target1.foo, ['a']);
  queue.pushUnique(target1, target1.bar, ['b']);

  assert.deepEqual(target1fooWasCalled, []);
  assert.deepEqual(target1barWasCalled, []);

  queue.flush();

  assert.deepEqual(target1fooWasCalled.length, 1, 'expected: target 1.foo to be called only once');
  assert.deepEqual(target1fooWasCalled[0], ['a']);
  assert.deepEqual(target1barWasCalled.length, 1, 'expected: target 1.bar to be called only once');
  assert.deepEqual(target1barWasCalled[0], ['b']);
});

QUnit.test('pushUnique: 1 target, 1 different methods called twice', function(assert) {
  let queue = new Queue('foo');
  let target1fooWasCalled: string[][] = [];
  let target1 = {
    foo: function() {
      target1fooWasCalled.push(slice.call(arguments));
    }
  };

  queue.pushUnique(target1, target1.foo, ['a']);
  queue.pushUnique(target1, target1.foo, ['b']);

  assert.deepEqual(target1fooWasCalled, []);

  queue.flush();

  assert.deepEqual(target1fooWasCalled.length, 1, 'expected: target 1.foo to be called only once');
  assert.deepEqual(target1fooWasCalled[0], ['b']);
});

QUnit.test('pushUnique: 2 different targets', function(assert) {
  let queue = new Queue('foo', {});
  let target1fooWasCalled: string[][] = [];
  let target2fooWasCalled: string[][] = [];
  let target1 = {
    foo: function() {
      target1fooWasCalled.push(slice.call(arguments));
    }
  };

  let target2 = {
    foo: function() {
      target2fooWasCalled.push(slice.call(arguments));
    }
  };

  queue.pushUnique(target1, target1.foo, ['a']);
  queue.pushUnique(target2, target2.foo, ['b']);

  assert.deepEqual(target1fooWasCalled, []);
  assert.deepEqual(target2fooWasCalled, []);

  queue.flush();

  assert.deepEqual(target1fooWasCalled.length, 1, 'expected: target 1.foo to be called only once');
  assert.deepEqual(target1fooWasCalled[0], ['a']);
  assert.deepEqual(target2fooWasCalled.length, 1, 'expected: target 2.foo to be called only once');
  assert.deepEqual(target2fooWasCalled[0], ['b']);
});

QUnit.test('pushUnique: 1 target, 2 different methods', function(assert) {
  let queue = new Queue('foo', {});
  let target1fooWasCalled: string[][] = [];
  let target1barWasCalled: string[][] = [];
  let target1 = {
    foo: function() {
      target1fooWasCalled.push(slice.call(arguments));
    },
    bar: function() {
      target1barWasCalled.push(slice.call(arguments));
    }
  };

  queue.pushUnique(target1, target1.foo, ['a']);
  queue.pushUnique(target1, target1.bar, ['b']);

  assert.deepEqual(target1fooWasCalled, []);
  assert.deepEqual(target1barWasCalled, []);

  queue.flush();

  assert.deepEqual(target1fooWasCalled.length, 1, 'expected: target 1.foo to be called only once');
  assert.deepEqual(target1fooWasCalled[0], ['a']);
  assert.deepEqual(target1barWasCalled.length, 1, 'expected: target 1.bar to be called only once');
  assert.deepEqual(target1barWasCalled[0], ['b']);
});

QUnit.test('pushUnique: 1 target, 1 diffe`rent methods called twice', function(assert) {
  let queue = new Queue('foo', {});
  let target1fooWasCalled: string[][] = [];
  let target1 = {
    foo: function() {
      target1fooWasCalled.push(slice.call(arguments));
    }
  };

  queue.pushUnique(target1, target1.foo, ['a']);
  queue.pushUnique(target1, target1.foo, ['b']);

  assert.deepEqual(target1fooWasCalled, []);

  queue.flush();

  assert.deepEqual(target1fooWasCalled.length, 1, 'expected: target 1.foo to be called only once');
  assert.deepEqual(target1fooWasCalled[0], ['b']);
});

QUnit.test('pushUnique: 1 target, 2 different methods, second one called twice', function(assert) {
  let queue = new Queue('foo', {});
  let target1barWasCalled: string[][] = [];
  let target1 = {
    foo: function() {
    },
    bar: function() {
      target1barWasCalled.push(slice.call(arguments));
    }
  };

  queue.pushUnique(target1, target1.foo);
  queue.pushUnique(target1, target1.bar, ['a']);
  queue.pushUnique(target1, target1.bar, ['b']);

  assert.deepEqual(target1barWasCalled, []);

  queue.flush();

  assert.deepEqual(target1barWasCalled.length, 1, 'expected: target 1.bar to be called only once');
});

QUnit.test('pushUnique: 2 different targets', function(assert) {
  let queue = new Queue('foo', {});

  let target1fooWasCalled: string[][] = [];
  let target2fooWasCalled: string[][] = [];
  let target1 = {
    foo: function() {
      target1fooWasCalled.push(slice.call(arguments));
    }
  };

  let target2 = {
    foo: function() {
      target2fooWasCalled.push(slice.call(arguments));
    }
  };
  queue.pushUnique(target1, target1.foo, ['a']);
  queue.pushUnique(target2, target2.foo, ['b']);

  assert.deepEqual(target1fooWasCalled, []);
  assert.deepEqual(target2fooWasCalled, []);

  queue.flush();

  assert.deepEqual(target1fooWasCalled.length, 1, 'expected: target 1.foo to be called only once');
  assert.deepEqual(target1fooWasCalled[0], ['a']);
  assert.deepEqual(target2fooWasCalled.length, 1, 'expected: target 2.foo to be called only once');
  assert.deepEqual(target2fooWasCalled[0], ['b']);
});

QUnit.test('pushUnique: 1 target, 2 different methods', function(assert) {
  let queue = new Queue('foo', {});
  let target1fooWasCalled: string[][] = [];
  let target1barWasCalled: string[][] = [];
  let target1 = {
    foo: function() {
      target1fooWasCalled.push(slice.call(arguments));
    },
    bar: function() {
      target1barWasCalled.push(slice.call(arguments));
    }
  };

  queue.pushUnique(target1, target1.foo, ['a']);
  queue.pushUnique(target1, target1.bar, ['b']);

  assert.deepEqual(target1fooWasCalled, []);
  assert.deepEqual(target1barWasCalled, []);

  queue.flush();

  assert.deepEqual(target1fooWasCalled.length, 1, 'expected: target 1.foo to be called only once');
  assert.deepEqual(target1fooWasCalled[0], ['a']);
  assert.deepEqual(target1barWasCalled.length, 1, 'expected: target 1.bar to be called only once');
  assert.deepEqual(target1barWasCalled[0], ['b']);
});

QUnit.test('pushUnique: 1 target, 1 different methods called twice', function(assert) {
  let queue = new Queue('foo', {});
  let target1fooWasCalled: string[][] = [];
  let target1 = {
    foo: function() {
      target1fooWasCalled.push(slice.call(arguments));
    }
  };

  queue.pushUnique(target1, target1.foo, ['a']);
  queue.pushUnique(target1, target1.foo, ['b']);

  assert.deepEqual(target1fooWasCalled, []);

  queue.flush();

  assert.deepEqual(target1fooWasCalled.length, 1, 'expected: target 1.foo to be called only once');
  assert.deepEqual(target1fooWasCalled[0], ['b']);
});

QUnit.test('pushUnique: 1 target, 2 different methods, second one called twice', function(assert) {
  let queue = new Queue('foo', {});

  let target1barWasCalled: string[][] = [];
  let target1 = {
    foo: function() {
    },
    bar: function() {
      target1barWasCalled.push(slice.call(arguments));
    }
  };

  queue.pushUnique(target1, target1.foo);
  queue.pushUnique(target1, target1.bar, ['a']);
  queue.pushUnique(target1, target1.bar, ['b']);

  assert.deepEqual(target1barWasCalled, []);

  queue.flush();

  assert.deepEqual(target1barWasCalled.length, 1, 'expected: target 1.bar to be called only once');
});
