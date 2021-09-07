const router = require('express').Router();

const {
  getHalls,
  getHall,
  createHall,
  addItemToDescriptionHall,
  deleteItemDescriptionHall,
  patchItemDescriptionHall,
  putMainDescrHall,
} = require('../controllers/halls');

router.get('/', getHalls);
router.get('/:type', getHall);
router.post('/', createHall);
// router.post('/:type', addItemToDescriptionHall);
router.post('/:type', addItemToDescriptionHall);
router.delete('/:type', deleteItemDescriptionHall);
router.patch('/:type', patchItemDescriptionHall);
router.put('/:type', putMainDescrHall);

module.exports = router;
