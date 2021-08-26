const Document = require('../models/document');

const NotFoundError = require('../errors/not-found-err');
const { notFoundErrors } = require('../constants/errorMessages');
// const user = require('../models/user');

const getDocuments = (req, res, next) => {
  Document.find({})
    .then((documents) => res.send(documents))
    .catch(next);
};

const createDocument = (req, res, next) => {
  const { type, title, link } = req.body;

  console.log('add document');
  console.log(type);

  Document.create({
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

  Document.findByIdAndDelete({ _id })
    .orFail(() => {
      throw new NotFoundError(notFoundErrors.documentNotFound);
    })
    .then((document) => res.send(document))
    .catch(next);
};

const patchDocument = (req, res, next) => {
  const { id: _id } = req.params;

  const { title, link } = req.body;

  Document.findByIdAndUpdate(_id, {
    title,
    link,
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
