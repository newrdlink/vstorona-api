const router = require('express').Router();

const {
  getCollectives,
  createCollective,
  deleteCollective,
  updateCollective,
} = require('../controllers/collectives');

router.get('/', getCollectives);
router.post('/', createCollective);
router.delete('/:id', deleteCollective);
router.patch('/:id', updateCollective);

module.exports = router;
