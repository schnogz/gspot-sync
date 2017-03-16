module.exports = () => {
  // dependencies
  const bodyParser = require('body-parser');
  const chalk = require('chalk');
  const errorHandler = require('errorhandler');
  const express = require('express');
  const expressStatusMonitor = require('express-status-monitor');
  const http = require('http');
  const logger = require('morgan');
  const path = require('path');
  const cookieParser = require('cookie-parser');
  const googlePlayCtrl = require('./api/googlePlayController');
  const spotifyCtrl = require('./api/spotifyController');

  // configure express
  const app = express();
  app.set('port', 3000);
  app.use(expressStatusMonitor());
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'app')));

  // endpoint definitions
  // TODO: create spotify router
  app.get('/login', spotifyCtrl.login);
  app.get('/loginCallback', spotifyCtrl.loginCallback);
  app.get('/refreshAccessToken', spotifyCtrl.refreshAccessToken);

  // error handler
  app.use(errorHandler());

  // start express
  app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
  });
};