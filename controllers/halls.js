const Hall = require('../models/hall');

const NotAuthError = require('../errors/not-auth-err');
const { notAuthErrors } = require('../constants/errorMessages');

const getHalls = (req, res, next) => {
  Hall.find({})
    .then((halls) => res.send(halls))
    .catch(next);
};

const getHall = (req, res, next) => {
  const { type } = req.params;

  Hall.findOne({ type })
    .then((hall) => res.send(hall))
    .catch(next);
};

const createHall = (req, res, next) => {
  if (!req.user) {
    return next(new NotAuthError(notAuthErrors.noAuth));
  }

  const {
    type,
    price,
    description,
    compositionServices,
    descriptionServices,
    soundServices,
    images,
    linkToPrice,
    ps,
  } = req.body;

  return Hall.create({
    type,
    price,
    description,
    compositionServices,
    descriptionServices,
    soundServices,
    images,
    linkToPrice,
    ps,
  })
    .then((hall) => res.send(hall))
    .catch(next);
};

const addItemToDescriptionHall = (req, res, next) => {
  const { type } = req.params;
  const { data } = req.body;

  if (!req.user) {
    return next(new NotAuthError(notAuthErrors.noAuth));
  }

  return Hall.findOneAndUpdate(
    { type },
    {
      $addToSet: data,
    },
  )
    .then((hall) => res.send(hall))
    .catch(next);
};

const putMainDescrHall = (req, res, next) => {
  const { type } = req.params;
  const { data } = req.body;

  if (!req.user) {
    return next(new NotAuthError(notAuthErrors.noAuth));
  }

  return Hall.findOneAndUpdate(
    { type },
    data,
  )
    .then((hall) => res.send(hall))
    .catch(next);
};

const deleteItemDescriptionHall = (req, res, next) => {
  const { type } = req.params;
  const { data } = req.body;

  if (!req.user) {
    return next(new NotAuthError(notAuthErrors.noAuth));
  }

  return Hall.findOneAndUpdate(
    { type },
    {
      $pull: data,
    },
  )
    .then((hall) => res.send(hall))
    .catch(next);
};

const patchItemDescriptionHall = (req, res, next) => {
  const { type } = req.params;
  const { oldData, newData } = req.body;

  if (!req.user) {
    return next(new NotAuthError(notAuthErrors.noAuth));
  }

  return Hall.findOneAndUpdate(
    { type },
    {
      $pull: oldData,
    },
  )
    .then(() => {
      Hall.findOneAndUpdate(
        { type },
        {
          $addToSet: newData,
        },
      )
        .then((newHall) => res.send(newHall))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getHalls,
  getHall,
  createHall,
  addItemToDescriptionHall,
  deleteItemDescriptionHall,
  patchItemDescriptionHall,
  putMainDescrHall,
};
