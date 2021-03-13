const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
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
  roles: [
    {
      type: String,
      ref: 'role',
    },
  ],
});

module.exports = mongoose.model('user', userSchema);
