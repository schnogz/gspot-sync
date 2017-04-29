var router = require('express').Router();

router.use('/spotify', require('./spotify'));
router.use('/songkick', require('./songkick'));

module.exports = router;