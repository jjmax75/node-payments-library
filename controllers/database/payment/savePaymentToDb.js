'use strict';

const path = process.cwd();

const Payment = require(path + '/models/payments');

const savePaymentToDb = function savePaymentToDb(response, formDetails, cb) {
  let newPayment = new Payment();

  newPayment.orderData.price = formDetails.price;
  newPayment.orderData.currency = formDetails.currency;
  newPayment.orderData.fullName = formDetails.fullName;
  newPayment.response = response;

  newPayment.save(function(err) {
    if (err) return cb(err);

    return cb(null, newPayment);
  })


};

module.exports = savePaymentToDb;
