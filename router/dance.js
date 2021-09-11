const router = require('express').Router();

const { getDance } = require('../controllers/dance');

router.get('/', getDance);

module.exports = router;
