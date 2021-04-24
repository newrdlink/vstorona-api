const router = require('express').Router();
const path = require('path');

const workersRoute = require('./workers');

const { login, createUser } = require('../controllers/users');

const usersRoute = require('./users');
const newsRouter = require('./news');

const modifyReq = require('../middlewares/modifyReq');

const { isValidBodyCreateUser, isValidBodyLoginUser } = require('../utils/validateRequest');

// const auth = require('../middlewares/auth');
// router.use('/', auth);

router.use(modifyReq);

router.post('/public', (req, res) => {
  // console.log(JSON.parse(req.body));
  console.log(__dirname);
  const sampleFile = req.files.myfile;
  const uploadPath = path.join('C:/dev/my/vstorona-api', '/public/', sampleFile.name);

  sampleFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send('File uploaded!');
  });
});

router.post('/signup', isValidBodyCreateUser(), createUser);
router.post('/signin',
  // isValidBodyLoginUser(),
  login);

router.use('/workers', workersRoute);
router.use('/users', usersRoute);
router.use('/news', newsRouter);

module.exports = router;
