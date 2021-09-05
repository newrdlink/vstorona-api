const router = require('express').Router();

const {
  getHalls,
  getHall,
  createHall,
  updateHall,
} = require('../controllers/halls');

router.get('/', getHalls);
router.get('/:type', getHall);
router.post('/', createHall);
router.patch('/:type', updateHall);

module.exports = router;
