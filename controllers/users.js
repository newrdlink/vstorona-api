// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailer = require('../utils/sendEmail');
const User = require('../models/user');
const { SALT, JWT_WORD } = require('../config');
const verifyPass = require('../utils/verifyPass');
// const createToken = require('../utils/createToken');
const createHash = require('../utils/createHash');
const cutStr = require('../helpers/cutStr');
const isAdmin = require('../helpers/isUserAdmin');
const NotFoundError = require('../errors/not-found-err');
const NotAuthError = require('../errors/not-auth-err');
const ConflictError = require('../errors/conflict-err');
const { notFoundErrors, notAuthErrors, generalErrors } = require('../constants/errorMessages');

// const Role = require('../models/role');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const createUser = async (req, res, next) => {
  // console.log('1');
  const {
    firstName, lastName, patronymic, email, role, password,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw next(new ConflictError(generalErrors.emailRepeat));
      }
      return createHash(email, SALT);
    })
    .then((hash) => {
      // for normal working router for activation from email
      const encodeHash = cutStr(hash);
      const message = {
        from: 'Registration <club-vs@yandex.ru>',
        to: `${email}`,
        subject: 'Регистрация на vstorona.ru',
        html: `
              <a href="https://localhost:3000/users/activation/${encodeHash}">Активация</a>
              `,
      };
      // console.log(message);
      mailer(message)
        .then(() => {
          User.create({
            firstName,
            lastName,
            patronymic,
            email,
            role,
            password,
            hash: encodeHash,
            admin: isAdmin(email),
          })
            .then((user) => res.send(user))
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};

const verifyUser = (req, res, next) => {
  const { hash } = req.params;

  User.findOne({ hash })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(notFoundErrors.userNotFound);
      }
      const { _id: userId } = user;
      // верификация пользователя
      User.findByIdAndUpdate(userId, { verified: true, hash: '' })
        .then((userUpdated) => res.send({ message: `Пользователь с email ${userUpdated.email} активирован` }))
        .catch(next);
    })
    .catch(next);
};

const deleteUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById({ userId })
    .then((user) => res.send(user))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  console.log(email);

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotAuthError(notAuthErrors.userNotFound);
      } else {
        verifyPass(password, user.password)
          .then((match) => {
            if (match) {
              const token = jwt.sign({ id: user._id }, JWT_WORD, { expiresIn: '7d' });
              return res.send({ token });
            }
            throw new NotAuthError(notAuthErrors.badEmailOrPass);
          })
          .catch(next);
      }
    })
    .catch(next);
};

module.exports = {
  getUsers,
  createUser,
  verifyUser,
  deleteUser,
  login,
};
