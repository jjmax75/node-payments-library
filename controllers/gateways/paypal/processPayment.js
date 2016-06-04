'use strict';

const processPayment = function processPayment(paymentDetails, cb) {

  const paypal = require('paypal-rest-sdk');

  paypal.configure({
    'mode': process.env.PAYPAL_MODE,
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret': process.env.PAYPAL_CLIENT_SECRET
  });

  paypal.payment.create(paymentDetails, function(error, payment) {
    if (error) {
      console.log(error.response.details);
      cb(error);
    } else {
      console.log('Create Payment Response');
      console.log(payment);
      cb(null, payment);
    }
  });

};

module.exports = processPayment;
