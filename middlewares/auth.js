const jwt = require('jsonwebtoken');
const NotAuthError = require('../errors/not-auth-err');
const { notAuthErrors } = require('../constants/errorMessages');
const { JWT_WORD } = require('../config');
const bearerStr = require('../constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith(bearerStr)) {
    throw new NotAuthError(notAuthErrors.noAuth);
  }

  const token = authorization.replace(bearerStr, '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_WORD);
  } catch (error) {
    throw new NotAuthError(notAuthErrors.reAuth);
  }

  req.user = payload;

  next();
};
