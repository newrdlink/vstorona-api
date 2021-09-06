const router = require('express').Router();

const {
  getHalls,
  getHall,
  createHall,
  // addItemToDescriptionHall,
  addItemToDescriptionHall,
  deleteItemDescriptionHall,
  patchItemDescriptionHall,
} = require('../controllers/halls');

router.get('/', getHalls);
router.get('/:type', getHall);
router.post('/', createHall);
// router.post('/:type', addItemToDescriptionHall);
router.post('/:type', addItemToDescriptionHall);
router.delete('/:type', deleteItemDescriptionHall);
router.patch('/:type', patchItemDescriptionHall);

module.exports = router;
