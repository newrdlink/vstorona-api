const router = require('express').Router();
const { wrWorkerPhoto, getWorkerPhoto } = require('../controllers/public');

router.post('/workers', wrWorkerPhoto);
router.get('/workers', getWorkerPhoto);

module.exports = router;
