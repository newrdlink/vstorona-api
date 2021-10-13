const path = require('path');
const fs = require('fs');
const News = require('../models/news');

const getNews = (req, res, next) => {
  News.find({})
    // .populate('creator')
    .then((news) => res.send(news))
    .catch(next);
};

const createNews = (req, res, next) => {
  // console.log('1');

  const newsData = JSON.parse(req.body.newsData);
  const imagesFront = req.files.imageFilesNews;
  // console.log(newsData);

  const {
    title,
    subtitle,
    description,
    createdAt,
  } = newsData;

  const images = [];
  const folderNameNews = createdAt.slice(0, 16).replace(':', '');
  const dirPath = path.join(__dirname, '..', 'public/news', folderNameNews);

  fs.mkdir(dirPath, (err) => {
    if (err) {
      throw next(err);
    }
    imagesFront.forEach((image) => {
      const uploadPath = path.normalize(path.join(dirPath, image.name));
      image.mv(uploadPath, (error) => {
        if (error) { throw next(error); }
      });
      const pathImage = `https://api.vs.didrom.ru/events/${folderNameNews}/${image.name}`;
      images.push(pathImage);
    });

    News.create({
      title,
      subtitle,
      images,
      description,
      createdAt,
      creator: req.user.id,
    })
      .then((news) => res.send({ id: news.id }))
      .catch(next);
  });
};

module.exports = {
  getNews,
  createNews,
  // verifyUser,
  // deleteUser,
};
