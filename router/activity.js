const router = require('express').Router();
const { getEvents } = require('../controllers/activity');

router.get('/events', getEvents);

module.exports = router;
