// http://www.songkick.com/developer
// https://github.com/MrJaeger/songkick-api
const router = require('express').Router();
const Songkick = require('songkick-api-node');
const apiKeys = require('./../../config/apiKeys');

const songkickApi = new Songkick(apiKeys.songkick.key);

router.get('/search/events', (req, res, next) => {
  // TODO: need to acount for different lookup types e.g. lat/long or ip
  let requestIp = req.clientIp;
  let locationRequest = 'ip:' + requestIp;

  // local dev requests will call Songkick with Twin Cities location
  if (requestIp === '127.0.0.1' || requestIp === '::1') {
    locationRequest = 'geo:44.9325881,-93.26754419999999';
  }

  songkickApi.searchLocations({ 'location' : locationRequest })
    .then((userLocations) => {
      // TODO: check if locations are returned, inform client
      // TODO: figure out effective way to handle paging...
      songkickApi.getLocationUpcomingEvents(userLocations[0].metroArea.id)
        .then((response) => {
          res.send(response);
        }, (error) => {
          res.status(500).json({ error: 'Songbird location based events lookup failed', stacktrace: error });
        });
      }, (error) => {
        res.status(500).json({ error: 'Songbird metroId lookup failed', stacktrace: error });
      });
});

module.exports = router;