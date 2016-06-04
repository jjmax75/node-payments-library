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

  o.cardType = function(number) {
    const validAmexRegexp = /^3[47][0-9]{13}$/;
    const validMasterRegexp = /^5[1-5][0-9]{14}$/;
    const validVisaRegexp = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const validDiscoverRegexp = /^6(?:011|5[0-9]{2})[0-9]{12}$/;

    switch(true) {
      case validAmexRegexp.test(number):
        return 'amex';
        break;
      case validMasterRegexp.test(number):
        return 'mastercard';
        break;
      case validVisaRegexp.test(number):
        return 'visa';
        break;
      case validDiscoverRegexp.test(number):
        return 'discover';
        break;
      default:
        return null;
    };
  }

  return o;

};

module.exports = validateCardNumber;
