'use strict';

const path = process.cwd();

const validateCardNumber = require(path + '/controllers/validation/validateCardNumber')();
const processPaypalPayment = require(path + '/controllers/gateways/paypal/processPayment');
const savePaymentToDb = require(path + '/controllers/database/payment/savePaymentToDb');

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('pages/index.ejs', {
      successMessage: req.flash('successMessage'),
      failureMessage: req.flash('failureMessage')
    });
  });

  app.post('/', function(req, res) {
    const cardType = validateCardNumber.cardType(req.body.cardNumber);
    const currency = req.body.currency;

    const sendResponse = function sendResponse(error, success) {

      if (error) {
        req.flash('failureMessage', error);
        res.redirect('/');
      } else {
        const dbUpdated = function dbUpdated(error, success) {
          if (error) {
            console.log(error);
          } else {
            req.flash('successMessage', 'Your payment has been successful, Thank you.');
          }
          res.redirect('/');
        };
        savePaymentToDb(success, req.body, dbUpdated);
      }
    };

    if (cardType === null || !validateCardNumber.luhnCheck(req.body.cardNumber)) {
      // Not valid card number
      sendResponse('Not a valid Credit Card number');
    } else if (cardType === 'amex' && currency !== 'USD') {
      // AMEX but not USD
      sendResponse('Can only use USD currency with American Express card');
    } else {
      // All good
      // send AMEX or USD/AUD/EUR to Paypal else use Braintree
      if (cardType === 'amex' || ['USD', 'EUR', 'AUD'].indexOf(currency) != -1) {
        let paypalPaymentObject = {
          'intent': 'sale',
          'payer': {
            'payment_method': 'credit_card',
            'funding_instruments': [{
              'credit_card': {
                'number': req.body.cardNumber,
                'expire_month': req.body.cardExpiration.match(/(0[1-9]|1[012])/)[0],
                'expire_year': req.body.cardExpiration.match(/20[1-9]{2}/)[0],
                'cvv2': req.body.cardCcv,
                'first_name': req.body.cardHolderName,
                'type': cardType
              }
            }]
          },
          'transactions': [{
            'amount': {
              'total': req.body.price,
              'currency': currency
            },
            'description': 'Demo payment from Node Payment Gateway Library'
          }]
        };
        processPaypalPayment(paypalPaymentObject, sendResponse); //callback here for response from paypal

      } else {
        // TODO - Braintree will process payment
      }
    }

  });

}
