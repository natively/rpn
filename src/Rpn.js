'use strict';

var Rpn = function () {};

Rpn.prototype = (function () {
  //
  // private
  //

  // evaluate a pair of values with an operator (+,-,*,/)
  var evaluate = function (x, y, operator) {
    if (operator === "+") {
      return x + y;
    }
    if (operator === "-") {
      return x - y;
    }
    if (operator === "*") {
      return x * y;
    }
    if (operator === "/") {
      return x / y;
    }
    return "Invalid operator.";
  };

  // basically call to_f on all the numeric arguments
  var convert = function (arg) {
    // operator
    if (isNaN(arg)) { return arg; };
    // number
    return parseFloat(arg);
  };

  // algorithm from Wikipedia (http://en.wikipedia.org/wiki/Reverse_Polish_notation)
  var calc = function (args) {
    var stack = [], token;
    // read the next token from input
    while (args.length > 0) {
      token = args.shift();
      // if token is a value
      if (!isNaN(token)) {
        stack.push(token);
      }
      // otherwise token is an operator
      else {
        var y = stack.pop(),
            x = stack.pop();
        stack.push(evaluate(x,y,token));
      }
    }
    if (stack.length === 1) {
      return stack[0];
    }
    throw "Too few arguments.";
  };

  var sanitize = function (inputString) {
    // invalid characters? no operators?
    var mashedArgs = inputString.replace(/\s/g, ""),
        args = inputString.split(" ");
    if (mashedArgs.match(/[^+-\/\*\d]/)) { throw "Invalid input."; }
    if (!mashedArgs.match(/[+-\/\*]/)) { throw "Missing operator(s)."; }

    // convert to array, convert to floats
    return args.map(convert);
  };

  //
  // public
  //
  var calculate = function (inputString) {
    var cleanArgs;
    try {
      cleanArgs = sanitize(inputString);
      return calc(cleanArgs);
    }
    catch(err) {
      return err;
    }
  };

  return {
    constructor: Rpn,

    // expose calculate
    calculate: calculate
  };
})();