const router = require('express').Router();

const workersRoute = require('./workers');

const { login, createUser } = require('../controllers/users');

const usersRoute = require('./users');
const newsRouter = require('./news');

const modifyReq = require('../middlewares/modifyReq');

const { isValidBodyCreateUser, isValidBodyLoginUser } = require('../utils/validateRequest');

// const auth = require('../middlewares/auth');

// router.use('/', auth);

router.use(modifyReq);

router.post('/signup', isValidBodyCreateUser(), createUser);
router.post('/signin', isValidBodyLoginUser(), login);

router.use('/workers', workersRoute);
router.use('/users', usersRoute);
router.use('/news', newsRouter);

module.exports = router;
