const bodyParser = require('body-parser');
const cors = require('cors');
const errorhandler = require('errorhandler');
const express = require('express');
const fs = require('fs');
const http = require('http');
const path = require('path');
const methods = require('methods');
const requestIp = require('request-ip');
const session = require('express-session');

var isProduction = process.env.NODE_ENV === 'production';
var app = express();

// setup middleware
app.use(cors());
app.use(requestIp.mw());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('method-override')());
app.use(session({ secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use(require('./routes/index'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development config
if (!isProduction) {
  // error handler will print stacktrace
  app.use(errorhandler());
  app.use(function(err, req, res, next) {
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
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  }

  // production error handler w/o stacktraces
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({'errors': {
      message: err.message,
      error: {}
    }});
  });
}

// start server
var server = app.listen(process.env.PORT || 3001, function() {
  console.log('Express server listening on port ' + server.address().port + '!');
  console.log('Remember! Webpack will proxy requests to /api on port 3000 to Express.');
});
