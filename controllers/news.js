const News = require('../models/news');

const getNews = (req, res, next) => {
  News.find({})
    .populate('creator')
    .then((news) => res.send(news))
    .catch(next);
};

const createNews = (req, res, next) => {
  // console.log('1');
  const {
    title, subtitle, link, image, createdAt,
  } = req.body;

  News.create({
    title, subtitle, link, image, creator: req.user.id, createdAt,
  })
    .then((news) => console.log(news))
    .catch((error) => console.log(error));
};

module.exports = {
  getNews,
  createNews,
  // verifyUser,
  // deleteUser,
};
