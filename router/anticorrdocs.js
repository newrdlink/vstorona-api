const router = require('express').Router();
const {
  getAnticorrdocs,
  createAnticorrdoc,
  deleteAnticorrdoc,
  patchAnticorrdoc,
} = require('../controllers/anticorrdocs');

router.get('/', getAnticorrdocs);
router.post('/', createAnticorrdoc);
router.delete('/:id', deleteAnticorrdoc);
router.patch('/', patchAnticorrdoc);

module.exports = router;
