const path = require('path');
const fs = require('fs');
const Album = require('../models/album');
const NotAuthError = require('../errors/not-auth-err');
const { notAuthErrors } = require('../constants/errorMessages');

const getAlbums = (req, res, next) => {
  // console.log('get albums');
  Album.find()
    .then((albums) => res.send(albums))
    .catch(next);
};

const getAlbum = (req, res, next) => {
  console.log('get album');
};

const deleteAlbum = (req, res, next) => {
  const { id: _id } = req.params;
  console.log('delete album');
  Album.findByIdAndDelete({ _id })
    .then((album) => res.send(album))
    .catch(next);
};

const createAlbum = (req, res, next) => {
  // console.log('create album');
  if (!req.user) {
    // console.log('error');
    return next(new NotAuthError(notAuthErrors.noAuth));
  }
  const albumData = JSON.parse(req.body.albumData);
  // console.log(req.body);
  const imagesFront = req.files.imageFilesAlbum;
  // console.log(1, albumData);
  // console.log(2, imagesFront);
  const images = [];
  const folderNameAlbum = albumData.createdAt.slice(0, 16).replace(':', '');
  const dirPath = path.join(__dirname, '..', 'public/album', folderNameAlbum);

  return fs.mkdir(dirPath, (err) => {
    if (err) {
      throw next(err);
    }
    imagesFront.forEach((image) => {
      const uploadPath = path.normalize(path.join(dirPath, image.name));
      image.mv(uploadPath, (error) => {
        if (error) { throw next(error); }
      });
      const pathImage = `https://api.vs.didrom.ru/album/${folderNameAlbum}/${image.name}`;
      images.push(pathImage);
    });

    albumData.images = images;
    albumData.creator = req.user.id;

    Album.create(albumData)
      .then((album) => res.send(album))
      .catch(next);
  });
};

module.exports = {
  getAlbums,
  getAlbum,
  createAlbum,
  deleteAlbum,
};
