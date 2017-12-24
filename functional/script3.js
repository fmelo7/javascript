var app = () => {
  'use stric';

  // initialize array from start to end
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
  controllerFactory = (title, fn) => {
    console.log("\n" + title);
    return (start, end) => {
      var timer = {};
      timer.start = new Date();
      var arr = initArr(start, end);
      console.log(arr);
      arr.map(a => fn(a)).map(a => console.log(a));
      timer.stop = new Date();
      timer.diff = (timer.stop - timer.start) + " seconds";
      console.log(timer);
    };
  };

  // return fibonacci number of n order
  fibonacci = (n) => {
    if (n == 1)
      return 0;
    if (n == 2)
      return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
  };

  // controller to test fibonacci function
  controller = controllerFactory("fibonacci", fibonacci);
  controller(40);

  // return fibonacci number of n order with function tail call
  const fibonacciAccum = (n, a = 1, b = 1) => {
    if (n == 1)
      return 0;
    if (n == 2)
      return a;
    return fibonacciAccum(n - 1, b, a + b);
  };

  // controller to test fibonacci function tail call
  controller = controllerFactory("fibonacci tail call", fibonacciAccum);
  controller(40);

  // return a factorial number of n param
  const factorial = (n) => {
    if (n < 2)
      return 1;
    return n * factorial(n - 1);
  };

  // controller to test factorial number function
  controller = controllerFactory("factorial", factorial);
  controller(10000);

  // return a factorial number of n param with function tail call
  const factorialAccum = (n, accum = 1) => {
    if (n < 2)
      return accum;
    return factorialAccum(n - 1, n * accum);
  };

  // controller to test factorial number function tail call
  controller = controllerFactory("factorial tail call", factorialAccum);
  controller(10000);
};
app();