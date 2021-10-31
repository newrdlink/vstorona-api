const path = require('path');
const fs = require('fs');
const Collective = require('../models/collective');
// const NotFoundError = require('../errors/not-found-err');
const NotAuthError = require('../errors/not-auth-err');
const { notAuthErrors } = require('../constants/errorMessages');

const getCollectives = (req, res, next) => {
  Collective.find()
    .then((collectives) => res.send(collectives))
    .catch(next);
};

const getCollective = (req, res, next) => {
  const { id: _id } = req.params;

  Collective.findOne({ _id })
    .then((collective) => res.send(collective))
    .catch(next);
};

const createCollective = (req, res, next) => {
  if (!req.user) {
    return next(new NotAuthError(notAuthErrors.noAuth));
  }
  // console.log(req.body.collectiveData);
  const collectiveData = JSON.parse(req.body.collectiveData);
  const imagesFront = req.files.imageFilesCollective;

  const images = [];
  const folderNameCollective = collectiveData.createdAt.slice(0, 16).replace(':', '');
  const dirPath = path.join(__dirname, '..', 'public/collectives', folderNameCollective);

  return fs.mkdir(dirPath, (err) => {
    if (err) {
      throw next(err);
    }

    imagesFront.forEach((image) => {
      const uploadPath = path.normalize(path.join(dirPath, image.name));
      image.mv(uploadPath, (error) => {
        if (error) { throw next(error); }
      });
      const pathImage = `https://api.vs.didrom.ru/collectives/${folderNameCollective}/${image.name}`;
      images.push(pathImage);
    });

    collectiveData.creator = req.user.id;
    collectiveData.images = images;

    Collective.create(collectiveData)
      .then((collective) => res.send(collective))
      // necessary add logic, when create in Mongo will create error, the folder
      // created previously, must be remove
      .catch(next);
  });
  // const {
  //   name,
  //   description,
  //   createdAt,
  //   type,
  //   subtype,
  //   phone,
  //   price,
  //   time,
  //   ageStart,
  //   ageEnd,
  //   link,
  //   supervisor,
  //   position
  // } = collectiveData;
};

const deleteCollective = (req, res, next) => {

};

const updateCollective = (req, res, next) => {
  // console.log(1);
};

module.exports = {
  getCollectives,
  getCollective,
  createCollective,
  deleteCollective,
  updateCollective,
};
