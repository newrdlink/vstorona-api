const router = require('express').Router();

const {
  getHalls,
  getHall,
  createHall,
  // addItemToDescriptionHall,
  patchItemToDescriptionHall,
} = require('../controllers/halls');

router.get('/', getHalls);
router.get('/:type', getHall);
router.post('/', createHall);
// router.post('/:type', addItemToDescriptionHall);
router.patch('/:type', patchItemToDescriptionHall);

module.exports = router;
