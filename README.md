# Node Payments Library

A project to take payments on a Node based page

## Usage

Will need a Paypal account and a Braintree account

Can setup Paypal and Braintree information in a `.env` file in the root of the app

An example of this file is available at `.env.sample` (`.env` files should not be committed to repo).

## Demo

https://node-payment-gateway.herokuapp.com/

## Future dev

- Repopulate form on error, highlight problem field(s) or....
- Ajaxify
- Clientside determining of payment method will allow Braintree Client Token -> Nonce -> Transaction
