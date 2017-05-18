const bodyParser = require('body-parser');
const cors = require('cors');
const errorhandler = require('errorhandler');
const express = require('express');
const fs = require('fs');
const http = require('http');
const path = require('path');
const methods = require('methods');
const requestIp = require('request-ip');

var isProduction = process.env.NODE_ENV === 'production';
var app = express();

// setup middleware
app.use(cors());
app.use(requestIp.mw());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('method-override')());
app.use(require('./routes/index'));



// development config
if (!isProduction) {
  // error handler will print stacktrace
  app.use(errorhandler());
  app.use(function(err, req, res) {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
} else {
  // production config
  // serve built static assets
  app.use(express.static(path.join(__dirname, '../build')));

  // production error handler w/o stacktraces
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.json({'errors': {
      message: err.message,
      error: {}
    }});
  });
}

// start server
var server = app.listen(process.env.PORT || 3001, function() {
  if (!isProduction) {
    console.log('Express server environment mode: DEV');
    console.log('Express server listening port: ' + server.address().port);
    console.log('REMINDER! Webpack will proxy requests to /api on port 3000 to Express.');
  } else {
    console.log('Express server environment mode: PROD');
    console.log('Express server listening port: ' + server.address().port);
  }
});
