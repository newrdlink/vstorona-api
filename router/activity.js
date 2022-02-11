const router = require('express').Router();
const {
  getEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent,
} = require('../controllers/activity');

router.get('/events', getEvents);
router.get('/events/:id', getEvent);
router.post('/events', createEvent);
router.delete('/events', deleteEvent);
router.patch('/events', updateEvent);

module.exports = router;
