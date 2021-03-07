const router = require('express').Router();
const workersRoute = require('./workers');

router.use('/workers', workersRoute);

module.exports = router;
