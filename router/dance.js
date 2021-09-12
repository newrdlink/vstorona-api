const router = require('express').Router();

const { getDance, createDance } = require('../controllers/dance');

router.get('/', getDance);
router.post('/', createDance);

module.exports = router;
