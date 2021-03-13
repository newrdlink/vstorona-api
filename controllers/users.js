const User = require('../models/user');
// const Role = require('../models/role');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const createUser = (req, res, next) => {
  // console.log('1');
  const { name, email, roles } = req.body;

  User.create({ name, email, roles })
    .then((user) => res.send(user))
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
  deleteUser,
};
