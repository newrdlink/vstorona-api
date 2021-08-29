const Achievement = require('../models/achievement');

const NotFoundError = require('../errors/not-found-err');
const NotAuthError = require('../errors/not-auth-err');
const { notFoundErrors, notAuthErrors } = require('../constants/errorMessages');
// const { notFoundErrors, generalErrors, notAuthErrors } = require('../constants/errorMessages');
// const user = require('../models/user');

const getAchievements = (req, res, next) => {
  Achievement.find({})
    .then((achievements) => res.send(achievements))
    .catch(next);
};

const createAchievement = (req, res, next) => {
  const { type, title, link } = req.body;

  if (!req.user) {
    return next(new NotAuthError(notAuthErrors.noAuth));
  }

  console.log('add Achievement');
  console.log(req.user.id);

  Achievement.create({
    type,
    title,
    link,
    creator: req.user.id,
  })
    .then((achievement) => res.send(achievement))
    .catch(next);
};

const deleteAchievement = (req, res, next) => {
  const { id: _id } = req.params;

  if (!req.user) {
    return next(new NotAuthError(notAuthErrors.noAuth));
  }

  Achievement.findByIdAndDelete({ _id })
    .orFail(() => {
      throw new NotFoundError(notFoundErrors.achievementNotFound);
    })
    .then((achievement) => res.send(achievement))
    .catch(next);
};

const patchAchievement = (req, res, next) => {
  // const { id: _id } = req.params;

  if (!req.user) {
    return next(new NotAuthError(notAuthErrors.noAuth));
  }

  const {
    type,
    title,
    link,
    _id,
  } = req.body;

  Achievement.findByIdAndUpdate(_id, {
    title,
    link,
    type,
  }, {
    new: true,
    runValidators: true,
  })
    .then((updateAchievement) => {
      res.send(updateAchievement);
    })
    .catch(next);
};

module.exports = {
  getAchievements,
  createAchievement,
  deleteAchievement,
  patchAchievement,
};
