var app = function () {
  'use strict';

  console.log("\n\nfizzbuzz-1");
  const fizzbuzz1 = function () {
    for (let i = 1; i <= 100; i++) {
      let r = i + "-";
      if (i % 3 == 0)
        r += "fizz";
      if (i % 5 == 0)
        r += "buzz";
      console.log(r);
    }
  };
  //fizzbuzz1();

  console.log("\n\nfizzbuzz-2");
  const fizzbuzz2 = function (a, b) {
    for (let i = a; i <= b; i++) {
      let r = i + "-";
      if (i % 3 == 0)
        r += "fizz";
      if (i % 5 == 0)
        r += "buzz";
      console.log(r);
    }
  };
  // fizzbuzz2(1, 15);
  // fizzbuzz2(5, 15);
  // fizzbuzz2(3, 3);

  console.log("\n\nfizzbuzz-3");
  const fizzbuzz3 = function (a, b) {
    let arr = [];
    for (let i = a; i <= b; i++) {
      let r = i;
      let t = "";
      if (i % 3 == 0)
        t = "fizz";
      if (i % 5 == 0)
        t = "buzz";
      if (i % 3 == 0 && i % 5 == 0)
        t = "fizz-buzz";
      arr.push((t == "") ? r : r + "-" + t);
    }
    return arr;
  };
  // console.log(fizzbuzz3(1, 15));
  const expect = fizzbuzz3(1, 100);

  console.log("\n\nfizzbuzz-4");
  const divisible = function (i, x) {
    return (i % x == 0);
  };

  const test = function (a) {
    let r = [a];
    if (divisible(a, 3))
      r.push("fizz");
    if (divisible(a, 5))
      r.push("buzz");
    return r;
  };

  const format = function (arr) {
    let f = arr[0];
    for (let i = 1; i < arr.length; i++) {
      f += "-" + arr[i];
    }
    return f;
  };

  const fizzbuzz4 = function (a, b) {
    let out = [];
    for (let i = a; i <= b; i++) {
      out.push(format(test(i)));
    }
    return out;
  };

  let actual = fizzbuzz4(1, 100);
  // console.log(actual.toString());
  // console.log(expect.toString());
  console.log((expect.toString() == actual.toString()) ? "OK" : "NOK!");

  console.log("\n\nfizzbuzz-5");

  var controller = function (a, b) {
    let out = [];
    for (let i = a; i <= b; i++) {
      out.push(fizzbuzz5(i));
    }
    return out;
  };

  const fizzbuzz5 = function (a) {
    return format(test(a));
  };

  // Test
  const testCase = function (expect) {
    actual = controller(1, 100);
    console.log((expect.toString() == actual.toString()) ? "OK" : "NOK!");
  };
  testCase(expect);

  console.log("\n\nfizzbuzz-6");

  const format6 = (arr) =>
    arr.reduce((p, c) => p + "-" + c);

  const divisible6 = (a, b) =>
    (a % b == 0);

  const test6 = (a) => {
    let r = [a];
    if (divisible6(a, 3))
      r.push("fizz");
    if (divisible6(a, 5))
      r.push("buzz");
    return r;
  };

  const fizzbuzz6 = (a) =>
    format6(test6(a));

  controller = function (a, b) {
    const arr = Array.from({
      length: b - a + 1
    }, (e, i) => ++i);
    return arr.map(a => fizzbuzz6(a));
  };

  // Test
  var testCase6 = function (expect, controller) {
    var actual = controller(1, 100);
    // console.log(actual);
    // console.log(actual.toString());
    // console.log(expect.toString());
    console.log((expect.toString() == actual.toString()) ? "OK" : "NOK!");
  };
  testCase6(expect, controller);

  console.log("\n\nfizzbuzz-7");

  const listsvc = (a, b) =>
    Array.from({
      length: b - a + 1
    }, (e, i) => ++i);

  const when = (condition, then) => (arr) => {
    if (condition(arr[0])) {
      arr.push(then);
    }
    return arr;
  };

  const initialize = a => [a];
  const fizz = when(a => a % 3 == 0, "fizz");
  const buzz = when(a => a % 5 == 0, "buzz");
  const bang = when(a => a % 7 == 0, "bang");
  const test7 = a => bang(buzz(fizz(initialize(a))));

  const fizzbuzz7 = (a) => format6(test7(a));

  const controller7 = (svc, a, b) => svc(a, b).map(a => fizzbuzz7(a));

  testCase6 = function (expect, controller) {
    var regexp = "^1,2,3-fizz,4,5-buzz,6-fizz,7-bang,.*15-fizz-buzz,.*21-fizz-bang,.*35-buzz-bang,.*103,104,105-fizz-buzz-bang$";
    var actual = controller(listsvc, 1, 105);
    // console.log(actual.toString());
    console.log(actual.toString().match(regexp) ? "OK" : "NOK!");
  };
  testCase6(expect, controller7);

  console.log("\n\nfizzbuzz-8");

  const compose = (fn1, fn2) => (a) => fn1(fn2(a));
  const fizzbuzz8 = compose(format6, test7);
  const controller8 = (svc, a, b) => svc(a, b).map(a => fizzbuzz8(a));

  testCase6(expect, controller8);

  console.log("\n\nfizzbuzz-9");


  // testCase6(expect, controller9);

};
app();