const path = require('path');
const fs = require('fs');
const News = require('../models/news');

const NotAuthError = require('../errors/not-auth-err');
const { notAuthErrors } = require('../constants/errorMessages');

const MAIN_URL = 'https://api.vstorona.ru';

const getNewsAll = (req, res, next) => {
  News.find({})
    // .populate('creator')
    .then((news) => res.send(news))
    .catch(next);
};

const getNews = (req, res, next) => {
  const { id: _id } = req.params;

  News.findOne({ _id })
    .then((event) => res.send(event))
    .catch(next);
};

const createNews = (req, res, next) => {
  if (!req.user) {
    return next(new NotAuthError(notAuthErrors.noAuth));
  }

  const newsData = JSON.parse(req.body.newsData);
  const imagesFront = req.files.imageFilesNews;

  const {
    title,
    subtitle,
    description,
    createdAt,
  } = newsData;

  const images = [];
  const folderNameNews = createdAt.slice(0, 16).replace(':', '');
  const dirPath = path.join(__dirname, '..', 'public/news', folderNameNews);

  return fs.mkdir(dirPath, (err) => {
    if (err) {
      throw next(err);
    }
    imagesFront.forEach((image) => {
      const uploadPath = path.normalize(path.join(dirPath, image.name));
      image.mv(uploadPath, (error) => {
        if (error) { throw next(error); }
      });
      const pathImage = `${MAIN_URL}/news/${folderNameNews}/${image.name}`;
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

const updateNews = (req, res, next) => {
  if (!req.user) {
    return next(new NotAuthError(notAuthErrors.noAuth));
  }

  const newsData = JSON.parse(req.body.newsData);

  if (!req.files) {
    News.findByIdAndUpdate(newsData._id, newsData)
      .then((collective) => res.send(collective))
      .catch(next);
  } else {
    const imagesFront = req.files.imageFilesNews;
    const folderNameNews = newsData.createdAt.slice(0, 16).replace(':', '');
    const dirPath = path.join(__dirname, '..', 'public/news', folderNameNews);

    if (fs.existsSync(dirPath)) {
      fs.rmdirSync((dirPath), { recursive: true });
      console.log('folder was deleted by update news');
    }
    const images = [];

    fs.mkdir(dirPath, (err) => {
      if (err) {
        throw next(err);
      }

      imagesFront.forEach((image) => {
        const uploadPath = path.normalize(path.join(dirPath, image.name));
        image.mv(uploadPath, (error) => {
          if (error) { throw next(error); }
        });
        const pathImage = `${MAIN_URL}/news/${folderNameNews}/${image.name}`;
        images.push(pathImage);
      });
      // collectiveData.creator = req.user.id;
      newsData.images = images;

      News.findByIdAndUpdate(newsData._id, newsData)
        .then((collective) => res.send(collective))
        // necessary add logic, when create in Mongo will create error, the folder
        // created previously, must be remove
        .catch(next);
    });
  }
  return null;
};

const deleteNews = (req, res, next) => {
  if (!req.user) {
    return next(new NotAuthError(notAuthErrors.noAuth));
  }
  const { _id } = req.body;

  return News.findById(_id)
    .then((news) => {
      const { createdAt } = news;
      const folderNameNews = createdAt.toISOString().slice(0, 16).replace(':', '');
      const dirPath = path.join('/home/newrdlink/projects/vs/backend/public/news', folderNameNews);

      if (fs.existsSync(dirPath)) {
        console.log(1, 'folder founded');
        fs.rmdirSync(dirPath, { recursive: true });

        News.findByIdAndRemove(_id)
          .then(() => console.log('news deleted from BD'))
          .catch(next);
        res.send(news);
      }
    })
    .catch(next);
};

module.exports = {
  getNewsAll,
  getNews,
  createNews,
  deleteNews,
  updateNews,
};
