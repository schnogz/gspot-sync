const router = require('express').Router();

router.use('/session', require('./session/index'));
router.use('/songkick', require('./songkick/index'));

module.exports = router;
