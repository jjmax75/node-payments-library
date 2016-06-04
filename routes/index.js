'use strict';

const path = process.cwd();

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.sendFile(path + '/static/index.html');
  });

}
