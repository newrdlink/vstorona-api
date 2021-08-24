const router = require('express').Router();

const {
  getUsers,
  createUser,
  verifyUser,
  getUserAuth,
} = require('../controllers/users');

const { isValidBodyCreateUser } = require('../utils/validateRequest');

// const auth = require('../middlewares/auth');
// verification user email
router.get('/activation/:hash', verifyUser);

router.get('/', getUsers);
router.get('/me', getUserAuth);

// router.use('/', auth);

router.post('/', isValidBodyCreateUser(), createUser);

module.exports = router;
