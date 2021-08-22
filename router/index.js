const router = require('express').Router();

const { login, createUser } = require('../controllers/users');

const workersRouter = require('./workers');
const usersRouter = require('./users');
const newsRouter = require('./news');
// const publicRouter = require('./public');

const modifyReq = require('../middlewares/modifyReq');

const {
  isValidBodyCreateUser,
  isValidBodyLoginUser,
} = require('../utils/validateRequest');

// const auth = require('../middlewares/auth');
// router.use('/', auth);

router.use(modifyReq);

// router.post('/public', (req, res) => {
//   // console.log(JSON.parse(req.body));
//   // console.log(__dirname);
//   const sampleFile = req.files.myfile;
//   const uploadPath = path.join('C:/dev/my/vstorona-api', '/public/', sampleFile.name);

//   sampleFile.mv(uploadPath, (err) => {
//     if (err) {
//       return res.status(500).send(err);
//     }
//     return res.send('File uploaded!');
//   });
// });

// router.use('/public', publicRouter);

router.post('/signup', isValidBodyCreateUser(), createUser);
router.post('/signin', isValidBodyLoginUser(), login);

router.use('/workers', workersRouter);
router.use('/users', usersRouter);
router.use('/news', newsRouter);

module.exports = router;
