// dependencies
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const errorHandler = require('errorhandler');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const app = express();
app.set('port', 3000);

// webpack
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const config = require('./webpack.config');
const compiler = webpack(config);

// controllers
const spotifyCtrl = require('./api/spotifyController');

// configure middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorHandler());
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
app.use(express.static(path.join(__dirname, '/dist')));

// endpoint definitions
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

// TODO: create spotify router
app.get('/login', spotifyCtrl.login);
app.get('/loginCallback', spotifyCtrl.loginCallback);
app.get('/refreshAccessToken', spotifyCtrl.refreshAccessToken);

// start express
app.listen(app.get('port'), (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log('App is running at http://localhost:%d', app.get('port'));
  }
});
