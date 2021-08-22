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
  middleName: {
    type: String,
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
    select: false,
  },
  admin: {
    type: Boolean,
    default: false,
    select: false,
  },
  verified: {
    type: Boolean,
    default: false,
    select: false,
  },
  // for verify user from email
  hash: {
    type: String,
    select: false,
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
