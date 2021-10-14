const router = require('express').Router();
const { createNews, getNewsAll, getNews } = require('../controllers/news');

// const { isAuthUser } = require('../utils/validateRequest');

router.get('/', getNewsAll);
router.get('/:id', getNews);

router.post('/', createNews);

module.exports = router;
