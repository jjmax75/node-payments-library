'use strict';

const mongoose = require('mongoose');

const paymentsSchema = mongoose.Schema({

  orderData: {
    price:          String,
    currency:       String,
    fullName:       String
  },

  response:        Object

});

module.exports = mongoose.model('Payments', paymentsSchema);
