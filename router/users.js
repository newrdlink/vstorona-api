const router = require('express').Router();
const { getUsers, createUser, verifyUser } = require('../controllers/users');
const { isValidBodyCreateUser } = require('../utils/validateRequest');

router.patch('/activation/:hash', verifyUser);
router.get('/', getUsers);
router.post('/', isValidBodyCreateUser(), createUser);

module.exports = router;
