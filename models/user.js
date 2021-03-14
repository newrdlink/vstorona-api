const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
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
  // password: {
  //   type: String,
  //   minlength: 6,
  //   maxlength: 26,
  //   required: true,
  //   select: false,
  // },
  role: {
    type: String,
    enum: ['admin', 'manager', 'editor'],
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  hash: {
    type: String,
  },
});

module.exports = mongoose.model('user', userSchema);
