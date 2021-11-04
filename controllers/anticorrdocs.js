const Anticorrdoc = require('../models/anticorrdoc');

const NotFoundError = require('../errors/not-found-err');
const { notFoundErrors, notAuthErrors } = require('../constants/errorMessages');
const NotAuthError = require('../errors/not-auth-err');

const getAnticorrdocs = (req, res, next) => {
  console.log('get anticorrdocs');
  Anticorrdoc.find({})
    .then((docs) => res.send(docs))
    .catch(next);
};

const createAnticorrdoc = (req, res, next) => {
  const { type, title, link } = req.body;

  if (!req.user) {
    return next(new NotAuthError(notAuthErrors.noAuth));
  }
  console.log('add anticorrdoc');

  return Anticorrdoc.create({
    type,
    title,
    link,
    creator: req.user.id,
  })
    .then((document) => res.send(document))
    .catch(next);
};

const deleteAnticorrdoc = (req, res, next) => {
  const { id: _id } = req.params;

  if (!req.user) {
    return next(new NotAuthError(notAuthErrors.noAuth));
  }
  console.log('rmDoc');
  return Anticorrdoc.findByIdAndDelete({ _id })
    .orFail(() => {
      throw new NotFoundError(notFoundErrors.documentNotFound);
    })
    .then((doc) => res.send(doc))
    .catch(next);
};

const patchAnticorrdoc = (req, res, next) => {
  if (!req.user) {
    return next(new NotAuthError(notAuthErrors.noAuth));
  }
  console.log('patch doc');
  const {
    title,
    link,
    type,
    _id,
  } = req.body;

  return Anticorrdoc.findByIdAndUpdate(_id, {
    title,
    link,
    type,
  }, {
    new: true,
    runValidators: true,
  })
    .then((updateDoc) => {
      res.send(updateDoc);
    })
    .catch(next);
};

module.exports = {
  getAnticorrdocs,
  createAnticorrdoc,
  deleteAnticorrdoc,
  patchAnticorrdoc,
};
