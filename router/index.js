const router = require('express').Router();

const { login, createUser } = require('../controllers/users');

const workersRouter = require('./workers');
const usersRouter = require('./users');
const newsRouter = require('./news');
const documentsRouter = require('./documents');
const achievementsRouter = require('./achievements');
const hallsRouter = require('./halls');
const danceRouter = require('./dance');
const activityRouter = require('./activity');
const collectivesRouter = require('./collectives');
const anticorrdocsRouter = require('./anticorrdocs');
// const publicRouter = require('./public');

const modifyReq = require('../middlewares/modifyReq');

const {
  isValidBodyCreateUser,
  isValidBodyLoginUser,
} = require('../utils/validateRequest');

router.use(modifyReq);

router.post('/signup', isValidBodyCreateUser(), createUser);
router.post('/signin', isValidBodyLoginUser(), login);

router.use('/workers', workersRouter);
router.use('/users', usersRouter);
router.use('/news', newsRouter);
router.use('/documents', documentsRouter);
router.use('/achievements', achievementsRouter);
router.use('/halls', hallsRouter);
router.use('/dance', danceRouter);
router.use('/activity', activityRouter);
router.use('/collectives', collectivesRouter);
router.use('/anticorrdocs', anticorrdocsRouter);

module.exports = router;
