const router = require('express').Router();
const { createNews, getNews } = require('../controllers/news');

// const { isAuthUser } = require('../utils/validateRequest');

router.get('/', getNews);

router.post('/', createNews);

module.exports = router;
