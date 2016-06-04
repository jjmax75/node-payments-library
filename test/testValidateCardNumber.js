'use strict';

const test = require('tape');
const path = process.cwd();
const validateCardNumber = require(path + '/controllers/validation/validateCardNumber')();

test('luhnCheck', function(t) {
  t.plan(4);
  t.notOk(validateCardNumber.luhnCheck(123), 'Not a valid Luhn or credit card number');
  t.ok(validateCardNumber.luhnCheck(4111111111111111), 'Should be a valid card number');
  t.ok(validateCardNumber.luhnCheck(2626262626262626), 'Should be a valid Luhn number');
  t.notOk(validateCardNumber.luhnCheck(4211111111111111), 'Should be false as this could be a valid Credit card but not a vaild Luhn number');
});

test('cardType', function(t) {
  t.plan(5);
  t.equal(validateCardNumber.cardType(378282246310005), 'amex', 'Should be amex as this is a valid American Express number');
  t.equal(validateCardNumber.cardType(4111111111111111), 'visa', 'Should be visa as this is a valid Visa number');
  t.equal(validateCardNumber.cardType(6011111111111117), 'discover', 'Should be discover as this is a valid Discover card number');
  t.equal(validateCardNumber.cardType(5555555555554444), 'mastercard', 'Should be master as this is a valid Master\'s card number');
  t.equal(validateCardNumber.cardType(5610591081018250), null, 'Should be Null as this is not supported by Paypal');
});
