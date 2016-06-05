'use strict';

const processPayment = function processPayment(price, cb) {

  const braintree = require('braintree');

  const gateway = braintree.connect({
    'environment': braintree.Environment[process.env.BRAINTREE_ENVIRONMENT],
    'merchantId': process.env.BRAINTREE_MERCHANTID,
    'publicKey': process.env.BRAINTREE_PUBLICKEY,
    'privateKey': process.env.BRAINTREE_PRIVATEKEY
  });

  gateway.transaction.sale({
    amount: price,
    paymentMethodNonce: 'fake-valid-nonce',
    options: {
      submitForSettlement: true
    }
  }, function(err, result) {
    if (err) {
      cb(err);
    } else {
      cb(null, result);
    }
  });

};

module.exports = processPayment;
