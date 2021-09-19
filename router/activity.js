const router = require('express').Router();
const { getEvents, createEvent } = require('../controllers/activity');

router.get('/events', getEvents);
router.post('/events', createEvent);

module.exports = router;
