const router = require('express').Router();
const {
  getAlbums,
  getAlbum,
  createAlbum,
} = require('../controllers/album');

router.get('/', getAlbums);
router.get('/:id', getAlbum);
router.post('/', createAlbum);

module.exports = router;
