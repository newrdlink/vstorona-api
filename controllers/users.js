// const bcrypt = require('bcrypt');
const mailer = require('../utils/sendEmail');
const User = require('../models/user');
const { SALT } = require('../config');
// const createToken = require('../utils/createToken');
const createHash = require('../utils/createHash');
const cutStr = require('../helpers/cutStr');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');
const { notFoundErrors, generalErrors } = require('../constants/errorMessages');

// const Role = require('../models/role');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const createUser = async (req, res, next) => {
  // console.log('1');
  const { name, email, role } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw next(new ConflictError(generalErrors.emailRepeat));
      }
      return createHash(email, SALT);
      // return encodeURI()
    })
    .then((hash) => {
      // for normal working router for activation from email
      const encodeHash = cutStr(hash);
      const message = {
        from: 'Message from site <club-vs@yandex.ru>',
        to: `${email}`,
        subject: 'Test from nodejs',
        html: `
              <a href="https://localhost:3000/users/activation/${encodeHash}">Активация</a>
              `,
      };
      // console.log(message);
      mailer(message)
        .then(() => {
          User.create({
            name, email, role, hash: encodeHash,
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
  // console.log(hash);

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
  // console.log(req.params);
  const { userId } = req.params;

  User.findById({ userId })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = {
  getUsers,
  createUser,
  verifyUser,
  deleteUser,
};
