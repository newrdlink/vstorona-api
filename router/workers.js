const router = require('express').Router();
const { getWorkers, createWorker, rmWorker } = require('../controllers/workers');

router.get('/', getWorkers);
router.post('/', createWorker);
router.delete('/:id', rmWorker);

module.exports = router;
