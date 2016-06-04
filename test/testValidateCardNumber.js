'use strict';

const test = require('tape');
const path = process.cwd();
const validateCardNumber = require(path + '/controllers/validation/validateCardNumber')();

test('luhnCheck', function(t) {
  t.plan(4);
  t.notOk(validateCardNumber.luhnCheck(123), 'Not a valid Luhn or credit card number');
  t.ok(validateCardNumber.luhnCheck(4111111111111111), 'Should be a valid card number');
  t.ok(validateCardNumber.luhnCheck(2626262626262626), 'Should be a valid Luhn number');
  t.notOk(validateCardNumber.luhnCheck(4211111111111111), 'Could be a valid Credit card but not a vaild Luhn number');
});

test('isAmex', function(t) {
  t.plan(4);
  t.ok(validateCardNumber.isAmex(378282246310005), 'Is a valid American Express number');
  t.ok(validateCardNumber.isAmex(378734493671000), 'Is a valid American Express Corporate number');
  t.notOk(validateCardNumber.isAmex(4111111111111111), 'Is a valid Visa number');
  t.notOk(validateCardNumber.isAmex(30569309025904), 'Is a valid Diner\'s Club number');
});
