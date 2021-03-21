const router = require('express').Router();
const { getUsers, createUser, verifyUser } = require('../controllers/users');
const { isValidBodyCreateUser } = require('../utils/validateRequest');

// const auth = require('../middlewares/auth');

router.patch('/activation/:hash', verifyUser);

router.get('/', getUsers);

// router.use('/', auth);

router.post('/', isValidBodyCreateUser(), createUser);

module.exports = router;
