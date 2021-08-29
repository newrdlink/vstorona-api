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

const isUserAccess = require('../helpers/isUserAccess');
const emailsUser = require('../constants/emailsUser');

// const Role = require('../models/role');
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUserAuth = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => res.send(user))
    .catch(next);
};

const createUser = async (req, res, next) => {
  // console.log(emailsUser);
  // console.log('1');
  const {
    firstName,
    lastName,
    middleName,
    email,
    role,
    password,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw next(new ConflictError(generalErrors.emailRepeat));
      }
      if (!isUserAccess(emailsUser, email)) {
        throw next(new NotAuthError(notAuthErrors.notAccess));
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
              <a href="http://localhost:3002/users/activation/${encodeHash}">Активация local</a>
              <a href="https://api.vs.didrom.ru/users/activation/${encodeHash}">Активация server</a>             
              `,
      };

      mailer(message)
        .then(() => {
          User.create({
            firstName,
            lastName,
            middleName,
            email,
            role,
            password,
            hash: encodeHash,
            admin: isAdmin(email),
          })
            .then((user) => res.send({ _id: user._id }))
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

      User.findByIdAndUpdate(userId, { verified: true, hash: '' })
        .then((userUpdated) => {
          const messageToUser = {
            from: 'Registration <club-vs@yandex.ru>',
            to: `${userUpdated.email}`,
            subject: 'Регистрация на vstorona.ru',
            html: `          
                  <p>Ваша учетная запись активирована</p>                         
                  `,
          };

          mailer(messageToUser)
            .then(() => {
              res.send({
                message: `Пользователь с email ${userUpdated.email} активирован`,
              });
            })
            .catch(next);
          return userUpdated;
        })
        .then((userUpdated) => {
          const messageToClub = {
            from: 'Registration Service <club-vs@yandex.ru>',
            to: 'club-vs@yandex.ru',
            subject: 'New User on vstorona.ru activated',
            html: `          
                  <p>Новый пользователь с почтовым адресом ${userUpdated.email} добавлен и активирован</p>                         
                  `,
          };
          mailer(messageToClub)
            .then(() => null)
            .catch(next);
        })
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

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotAuthError(notAuthErrors.userNotFound);
      } else {
        verifyPass(password, user.password)
          .then((match) => {
            if (match) {
              const { firstName, lastName, middleName } = user;
              const token = jwt.sign({ id: user._id }, JWT_WORD, { expiresIn: '7d' });
              return res.send({
                token, firstName, lastName, middleName,
              });
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
  getUserAuth,
  createUser,
  verifyUser,
  deleteUser,
  login,
};
