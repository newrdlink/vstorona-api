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
    title,
    subtitle,
    link,
    image,
    createdAt,
  } = req.body;

  News.create({
    title,
    subtitle,
    link,
    image,
    creator: req.user.id,
    createdAt,
  })
    .then((news) => res.send({ id: news.id }))
    .catch(next);
};

module.exports = {
  getNews,
  createNews,
  // verifyUser,
  // deleteUser,
};
