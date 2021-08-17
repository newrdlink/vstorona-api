const router = require('express').Router();

const {
  getWorkers,
  createWorker,
  patchWorker,
  rmWorker,
} = require('../controllers/workers');

router.get('/', getWorkers);
router.post('/', createWorker);
router.patch('/', patchWorker);
router.delete('/:id', rmWorker);

module.exports = router;
