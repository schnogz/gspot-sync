var router = require('express').Router();

router.use('/session', require('./session'));
router.use('/songkick', require('./songkick'));

module.exports = router;