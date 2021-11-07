const router = require('express').Router();
const {
  getVideoAll,
  getVideo,
  createVideo,
  deleteVideo,
} = require('../controllers/video');

router.get('/', getVideoAll);
router.get('/:id', getVideo);
router.post('/', createVideo);
router.delete('/:id', deleteVideo);

module.exports = router;
