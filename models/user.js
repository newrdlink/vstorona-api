const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { SALT } = require('../config');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  patronymic: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: () => 'this is bad email',
    },
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 26,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: ['manager', 'editor', 'user'],
    default: 'user',
  },
  admin: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  hash: {
    type: String,
  },
});

userSchema.pre('save', function (next) {
  return bcrypt.hash(this.password, SALT)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch(next);
});

module.exports = mongoose.model('user', userSchema);
