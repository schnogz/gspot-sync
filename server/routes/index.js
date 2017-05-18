const router = require('express').Router();

router.use('/api/session', require('./session/index'));
router.use('/api/songkick', require('./songkick/index'));

module.exports = router;
