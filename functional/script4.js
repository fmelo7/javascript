var app = () => {
  'use strict';

  // composition function
  // @param function1
  // @param function2
  // return function1(function2(a))
  var compose = (fn1, fn2) => a => fn1(fn2(a));

  // initialize array from start to end
  // @param start number
  // @param end
  // @return array of numbers
  const initArr = (start, end) => {
    if (!end) {
      end = start;
      start = 1;
    }
    var len = {
      length: end - start + 1
    };
    return Array.from(len, (e, i) => ++i);
  };

  // controller factory
  // @param title of the controller
  // @param function that controller calls
  // @return void
  const controllerFactory = (title, fn) => {
    console.log("\n" + title);
    return (start, end) => {
      var timer = [];
      timer.push(new Date());
      var arr = initArr(start, end);
      console.log(arr.join(","));
      arr.map(a => fn(a)).map(a => console.log(a.join(" ")));
      timer.push(new Date());
      timer.push((timer[1] - timer[0]) + " seconds");
      console.log(timer[2]);
    };
  };

  // fizz buzz function
  // @param number
  // return: 
  //  number and
  //  * fizz if divisible by 3
  //  * buzz if divisible by 5
  //  * fizz buzz if divisible by 3 and 5
  const fizzBuzz = (num) => {
    const when = (cond, then) => a => {
      if (cond(a[0]))
        a.push(then);
      return a;
    };
    const fizz = when(a => a % 3 == 0, "fizz");
    const buzz = when(a => a % 5 == 0, "buzz");
    const test = compose(fizz, buzz);
    // const bang = when(a => a % 7 == 0, "bang");
    // const test = compose(fizz, compose(buzz, bang));
    return test([num]);
  };

  // controller to test fizz buzz function
  const controller = controllerFactory("fizz buzz function", fizzBuzz);
  controller(100);
};
app();