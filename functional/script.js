console.log('1. Closures');
console.log('2. Higher-order Functions');
console.log('3. Currying');
console.log('4. Recurssion');
console.log('5. Composition');
console.log('6. Promise Monads');
console.log('7. Memoization\n\n');

console.log('Fat Arrow');
console.log('=>');

console.log('Imperative');
var numbers = [1, 2, 3, 4, 5];
var double = [];

for (var i = 0; i < numbers.length; i++) {
  var newNumber = numbers[i] * 2;
  double.push(newNumber);
}

console.log(double);

var double2 = [];
numbers.forEach(n => double2.push(n * 2));

console.log(double2);

console.log('Declarative');
var double3 = numbers.map(n => n * 2);

console.log(double3);

console.log('\n\n1. Closures');
var publicFoo = x => {
  var _private = x;
  return y => {
    return _private + y;
  };
};

var foo = publicFoo(5);
console.log(foo(3));
console.log(foo(6));

var counter = () => {
  var _currentVal = 0;
  return {
    up: () => ++_currentVal,
    down: () => --_currentVal,
    // val: _currentVal // it doesn't work!
    val: () => _currentVal
  };
};

var c = counter();
console.log(c.up());
console.log(c.up());
console.log(c.up());
console.log(c.down());
console.log(c.val());

console.log('\n\nRecursion');
var add = (set) => {
  if (set.length === 1) {
    return set[0];
  } else {
    set[1] = set[0] + set[1];
    set.shift();
    return add(set);
  }
};

console.log(add([1, 2, 3]));
console.log(add([5, 5, 5]));
console.log(add([6, 4, 2]));

console.log('\n\n2. Higher-order Functions');
var calc = (set, fn) => {
  if (set.length === 1) {
    return set[0];
  } else {
    set[1] = fn(set[0], set[1]);
    set.shift();
    return calc(set, fn);
  }
};

console.log(calc([1, 2, 3], (a, b) => a - b));
console.log(calc([5, 5, 5], (a, b) => a + b));
console.log(calc([6, 4, 2], (a, b) => a * b));

console.log([1, 2, 3].reduce((a, b) => a - b));
console.log([5, 5, 5].reduce((a, b) => a + b));
console.log([6, 4, 2].reduce((a, b) => a * b));

console.log('\n\n3. Currying');
var iLike = (name) => {
  return (food) => {
    return "My name is " + name + ". I like to eat " + food;
  };
};
var foody = iLike("shabba Ranks");
console.log(foody("Jerk Chicken"));

var curry = function (fn) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function () {
    return fn.apply(this,
      args.concat(Array.prototype.slice.call(arguments, 1)));
  };
};
var iLikeCurry = curry(iLike);
console.log(iLikeCurry("Shabba", "patties")());
console.log(iLikeCurry("Shabba")("patties"));

console.log('\n\n4. Composition');
var add = (num) => {
  var r = ++num;
  console.log("add:" + r);
  return r;
};
var sqr = (num) => {
  var r = num * num;
  console.log("sqr:" + r);
  return r;
};
var dbl = (num) => {
  var r = num + num;
  console.log("dbl:" + r);
  return r;
};

// console.log(add(1));

var compose = (fn1, fn2) => (a) => fn1(fn2(a));

var calc2 = compose(dbl, compose(sqr, add)); // => composed function
console.log(calc2(2));
console.log(calc2(2));
console.log(calc2(3));

console.log('\n\n5. Promise Monads');
var getData = (param) => {
  return $.ajax({
    url: "file.json",
    data: param,
    dataType: "json"
  });
};

var filterData = (response) => {
  return response.data
    .filter((item) => item.age < 30)
  // .map(o => [o.name, o.age])
  // .shift()
  // .forEach(m => console.log(m))
  ;
};

var mapData = (data) => {
  return data.map(o => [o.name, o.age]);
};

var fnConsole = (s) => console.log(s);

// var forEachData = (data, fn) => {
//   return data.forEach(m => fn(m))
// }

getData()
  .then(filterData)
  .then(mapData)
// .then(forEachData)
// .then(fnConsole)
;

console.log('\n\n7. Memoization');
var getDataMemo = (() => {
  var memoize = {};
  return function (param) {
    var signature = JSON.stringify(param);
    console.log([signature, memoize[signature]]);
    if (!memoize[signature]) {
      memoize[signature] = $.ajax({
        data: param,
        url: "file.json"
      });
    }
    return memoize[signature];
  };
})();

getDataMemo('param')
  .then((response) => console.log(response.data));

// return cached
getDataMemo('param')
  .then((response) => console.log(response.data));