const Dance = require('../models/dance');

const NotAuthError = require('../errors/not-auth-err');
const { notAuthErrors } = require('../constants/errorMessages');

const getDance = (req, res, next) => {
  Dance.find({})
    .then((dance) => res.send(dance))
    .catch(next);
};

const createDance = (req, res, next) => {
  if (!req.user) {
    return next(new NotAuthError(notAuthErrors.noAuth));
  }
  const {
    title,
    subtitle,
    startTime,
    endTime,
    days,
    description,
    images,
    compositionServices,
    ps,
  } = req.body;

  return Dance.create({
    title,
    subtitle,
    startTime,
    endTime,
    days,
    description,
    images,
    compositionServices,
    ps,
  })
    .then((dance) => res.send(dance))
    .catch(next);
};

module.exports = { getDance, createDance };
