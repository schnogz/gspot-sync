// dependencies
const router = require('express').Router();
const apiKeys = require('./../../config/apiKeys');

router.get('/', function(req, res, next) {
  res.send({ test: 'test' });
});

module.exports = router;