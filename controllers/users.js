// const bcrypt = require('bcrypt');
const mailer = require('../utils/sendEmail');
const User = require('../models/user');
const { JWT_WORD, SALT } = require('../config');
// const createToken = require('../utils/createToken');
const createHash = require('../utils/createHash');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');
const { notFoundErrors, generalErrors } = require('../constants/errorMessages');

// const Role = require('../models/role');

const getUsers = (req, res, next) => {
  User.find({})
    .populate('role')
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
    })
    .then((hash) => {
      const message = {
        from: 'Message from site <club-vs@yandex.ru>',
        to: `${email}`,
        subject: 'Test from nodejs',
        html: `
              <a href="https://localhost:3000/activation/${hash}">Активация</a>
              `,
      };
      mailer(message)
        .then(() => {
          User.create({
            name, email, role, hash,
          })
            .then((user) => res.send(user))
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);

  // const hash = await createHash(email, SALT);
  // // console.log(hash)
  // // console.log('1')

  // const message = {
  //   from: 'Message from site <club-vs@yandex.ru>',
  //   to: `${email}`,
  //   subject: 'Test from nodejs',
  //   html: `
  //   <a href="https://localhost:3000/activation/${hash}">Активация</a>
  //   `,
  // };

  // // .catch((error) => {
  // //   if (error.code === 11000 && error.name === 'MongoError') {
  // //     return next(new ConflictError(generalErrors.emailRepeat));
  // //   }
  // //   return next(error);
  // // });

  // mailer(message)
  //   .then(() => {
  //     // console.log(hash);
  //     User.create({
  //       name, email, role, hash,
  //     })
  //       .then((user) => res.send(user))
  //       .catch(next);
  //   })
  //   .catch(next);
};

const verifyUser = (req, res, next) => {
  const { hash } = req.params;

  User.findOne({ hash })
    .then((user) => {
      if (user) {
        const { _id: userId } = user;
        // верификация пользователя
        User.findByIdAndUpdate(userId, { verified: true, hash: '' })
          .then((id) => console.log(id))
          .catch(next);
      }
      throw new NotFoundError(notFoundErrors.userNotFound);
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
