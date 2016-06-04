'use strict';

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('pages/index.ejs', {
      successMessage: req.flash('successMessage'),
      failureMessage: req.flash('failureMessage')
    });
  });

  app.post('/', function(req, res) {
    console.log(req.body);
    req.flash('successMessage', 'Payment has been made successfully. Thank you.');
    res.redirect('/');
  });

}
