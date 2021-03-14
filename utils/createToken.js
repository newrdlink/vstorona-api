const jwt = require('jsonwebtoken');
// const { JWT_WORD } = require('../config');

module.exports = (JWT_WORD, userEmail) => jwt.sign({
  userEmail,
}, JWT_WORD, { expiresIn: 60 * 60 });
