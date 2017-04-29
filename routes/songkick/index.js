// http://www.songkick.com/developer
// https://github.com/MrJaeger/songkick-api
const router = require('express').Router();
const Songkick = require('songkick-api');
const apiKeys = require('./../../config/apiKeys');

const songkickApi = new Songkick(apiKeys.songkick.key);

// endpoints are hardcoded for the Twin Cities area for now

router.get('search/events', function(req, res, next) {
  songkickApi.searchEvents({
      'location': 'sk:35130'
    })
    .then(function(events) {
      console.log(events);
      res.send(events);
    });
});

router.get('/search/location', function(req, res, next) {
  let requestIp = req.clientIp;

  // detect local development and call Songkick with Twin Cities location
  if (requestIp === '127.0.0.1' || requestIp === '::1') {
    songkickApi.searchLocations({
      'location' : 'geo:44.9325881,-93.26754419999999'
    }).then(function(events) {
      res.send(events);
    });
  } else {
    songkickApi.searchLocations({
      'location' : 'ip:' + requestIp
    }).then(function(events) {
      res.send(events);
    });
  }
});

module.exports = router;