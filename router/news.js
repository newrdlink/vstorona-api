const router = require('express').Router();
const {
  createNews,
  getNewsAll,
  getNews,
  deleteNews,
} = require('../controllers/news');

// const { isAuthUser } = require('../utils/validateRequest');

router.get('/', getNewsAll);
router.get('/:id', getNews);
router.delete('/', deleteNews);

router.post('/', createNews);

module.exports = router;
