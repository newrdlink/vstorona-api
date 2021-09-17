const Event = require('../models/event');

// const NotAuthError = require('../errors/not-auth-err');
// const { notAuthErrors } = require('../constants/errorMessages');

const getEvents = (req, res, next) => {
  // console.log(1);
  Event.find({})
    .then((events) => res.send(events))
    .catch(next);
};

const createEvent = (req, res, next) => {
  // if (!req.user) {
  //   return next(new NotAuthError(notAuthErrors.noAuth));
  // }
  const {
    type,
    startTime,
    title,
    subtitle,
    days,
    description,
    images,
    compositionServices,
    ps,
  } = req.body;

  return Event.create({
    type,
    startTime,
    title,
    subtitle,
    days,
    description,
    images,
    compositionServices,
    ps,
  })
    .then((event) => res.send(event))
    .catch(next);
};

module.exports = { getEvents, createEvent };
