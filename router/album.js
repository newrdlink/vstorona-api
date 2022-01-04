const router = require('express').Router();
const {
  getAlbums,
  getAlbum,
  createAlbum,
  deleteAlbum,
} = require('../controllers/album');

router.get('/', getAlbums);
router.get('/:id', getAlbum);
router.post('/', createAlbum);
router.delete('/:id', deleteAlbum);

module.exports = router;
