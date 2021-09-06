const router = require('express').Router();

const {
  getHalls,
  getHall,
  createHall,
  // addItemToDescriptionHall,
  patchItemToDescriptionHall,
  deleteItemDescriptionHall,
} = require('../controllers/halls');

router.get('/', getHalls);
router.get('/:type', getHall);
router.post('/', createHall);
// router.post('/:type', addItemToDescriptionHall);
router.put('/:type', patchItemToDescriptionHall);
router.delete('/:type', deleteItemDescriptionHall);

module.exports = router;
