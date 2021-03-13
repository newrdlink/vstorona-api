const router = require('express').Router();

const workersRoute = require('./workers');
const usersRoute = require('./users');

router.use('/workers', workersRoute);
router.use('/users', usersRoute);

module.exports = router;
