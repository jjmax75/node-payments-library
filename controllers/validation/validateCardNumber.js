'use strict';

const validateCardNumber = function validateCardNumber() {
  let o = Object.create(Object.prototype);

  o.luhnCheck = function(number) {

    const numArr = String(number).split('');
    const evenLength = numArr.length % 2 === 0 ? true : false;

    let total = numArr.map(function(num, idx) {
      let currentEven = idx % 2 === 0 ? true : false;
      if ((evenLength && currentEven) || (!evenLength && !currentEven)) {
        num *= 2;
        if (num > 9) num -= 9;
      }
      return Number(num);
    }).reduce(function(a, b) {
      return a + b;
    });

    return total % 10 === 0 ? true : false;
  }

  o.isAmex = function(number) {
    const validAmexRegexp = /^3[47][0-9]{13}$/;
    return validAmexRegexp.test(number);
  }

  return o;

};

module.exports = validateCardNumber;
