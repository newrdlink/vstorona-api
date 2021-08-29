const Document = require('../models/document');

const NotFoundError = require('../errors/not-found-err');
const { notFoundErrors, notAuthErrors } = require('../constants/errorMessages');
const NotAuthError = require('../errors/not-auth-err');

// const user = require('../models/user');

const getDocuments = (req, res, next) => {
  Document.find({})
    .then((documents) => res.send(documents))
    .catch(next);
};

const createDocument = (req, res, next) => {
  const { type, title, link } = req.body;

  if (!req.user) {
    return next(new NotAuthError(notAuthErrors.noAuth));
  }
  console.log('add document');

  return Document.create({
    type,
    title,
    link,
    creator: req.user.id,
  })
    .then((document) => res.send(document))
    .catch(next);
};

const deleteDocument = (req, res, next) => {
  const { id: _id } = req.params;

  if (!req.user) {
    return next(new NotAuthError(notAuthErrors.noAuth));
  }

  return Document.findByIdAndDelete({ _id })
    .orFail(() => {
      throw new NotFoundError(notFoundErrors.documentNotFound);
    })
    .then((document) => res.send(document))
    .catch(next);
};

const patchDocument = (req, res, next) => {
  // const { id: _id } = req.params;

  if (!req.user) {
    return next(new NotAuthError(notAuthErrors.noAuth));
  }

  const {
    title,
    link,
    type,
    _id,
  } = req.body;

  return Document.findByIdAndUpdate(_id, {
    title,
    link,
    type,
  }, {
    new: true,
    runValidators: true,
  })
    .then((updateDocument) => {
      res.send(updateDocument);
    })
    .catch(next);
};

module.exports = {
  getDocuments,
  createDocument,
  deleteDocument,
  patchDocument,
};
