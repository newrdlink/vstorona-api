const router = require('express').Router();
const {
  createNews,
  getNewsAll,
  getNews,
  deleteNews,
  updateNews,
} = require('../controllers/news');

// const { isAuthUser } = require('../utils/validateRequest');

router.get('/', getNewsAll);
router.get('/:id', getNews);
router.delete('/', deleteNews);
router.patch('/', updateNews);

router.post('/', createNews);

module.exports = router;
