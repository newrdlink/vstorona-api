const router = require('express').Router();
const { getWorkers, createWorker } = require('../controllers/workers');

router.get('/', getWorkers);
router.post('/', createWorker);

module.exports = router;
