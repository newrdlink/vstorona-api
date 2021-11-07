const Video = require('../models/video');
const NotAuthError = require('../errors/not-auth-err');
const { notAuthErrors } = require('../constants/errorMessages');

const getVideoAll = (req, res, next) => {
  Video.find()
    .then((allVideo) => res.send(allVideo))
    .catch(next);
};

const getVideo = (req, res, next) => {
  const { id: _id } = req.params;

  Video.findOne({ _id })
    .then((video) => res.send(video))
    .catch(next);
};

const createVideo = (req, res, next) => {
  const { title, link, description } = req.body;
  if (!req.user) {
    return next(new NotAuthError(notAuthErrors.noAuth));
  }

  Video.create({ title, link, description })
    .then((video) => res.send(video))
    .catch(next);
};

const deleteVideo = (req, res, next) => {
  const { id: _id } = req.params;

  Video.findOneAndDelete({ _id })
    .then((video) => res.send(video))
    .catch(next);
};

module.exports = {
  getVideoAll,
  createVideo,
  getVideo,
  deleteVideo,
};
