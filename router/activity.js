const router = require('express').Router();
const {
  getEvents,
  getEvent,
  createEvent,
  deleteEvent,
} = require('../controllers/activity');

router.get('/events', getEvents);
router.get('/events/:id', getEvent);
router.post('/events', createEvent);
router.delete('/events', deleteEvent);

module.exports = router;
