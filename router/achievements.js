const router = require('express').Router();
const {
  createAchievement,
  deleteAchievement,
  getAchievements,
  patchAchievement,
} = require('../controllers/achievements');

router.get('/', getAchievements);
router.post('/', createAchievement);
router.delete('/:id', deleteAchievement);
router.patch('/', patchAchievement);

module.exports = router;
