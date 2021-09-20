const router = require('express').Router();
const { getEvents, getEvent, createEvent } = require('../controllers/activity');

router.get('/events', getEvents);
router.get('/events/:id', getEvent);
router.post('/events', createEvent);

module.exports = router;
