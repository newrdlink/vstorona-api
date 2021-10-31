const router = require('express').Router();

const {
  getCollectives,
  getCollective,
  createCollective,
  deleteCollective,
  updateCollective,
} = require('../controllers/collectives');

router.get('/', getCollectives);
router.get('/:id', getCollective);
router.post('/', createCollective);
router.delete('/:id', deleteCollective);
router.patch('/:id', updateCollective);

module.exports = router;
