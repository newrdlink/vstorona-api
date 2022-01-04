const path = require('path');
const fs = require('fs');
const News = require('../models/news');

const NotAuthError = require('../errors/not-auth-err');
const { notAuthErrors } = require('../constants/errorMessages');

const getNewsAll = (req, res, next) => {
  News.find({})
    // .populate('creator')
    .then((news) => res.send(news))
    .catch(next);
};

const getNews = (req, res, next) => {
  const { id: _id } = req.params;
  // console.log(_id);
  News.findOne({ _id })
    .then((event) => res.send(event))
    .catch(next);
};

const createNews = (req, res, next) => {
  // console.log('1');
  if (!req.user) {
    return next(new NotAuthError(notAuthErrors.noAuth));
  }

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

  return fs.mkdir(dirPath, (err) => {
    if (err) {
      throw next(err);
    }
    imagesFront.forEach((image) => {
      const uploadPath = path.normalize(path.join(dirPath, image.name));
      image.mv(uploadPath, (error) => {
        if (error) { throw next(error); }
      });
      const pathImage = `https://api.vs.didrom.ru/news/${folderNameNews}/${image.name}`;
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
    // const { _id } = collectiveData;
    News.findByIdAndUpdate(newsData._id, newsData)
      .then((collective) => res.send(collective))
      .catch(next);
    // console.log(collectiveData);
  } else {
    const imagesFront = req.files.imageFilesNews;

    const folderNameNews = newsData.createdAt.slice(0, 16).replace(':', '');
    const dirPath = path.join(__dirname, '..', 'public/news', folderNameNews);

    if (fs.existsSync(dirPath)) {
      // remove dir
      // console.log('folder founded');
      fs.rmdirSync((dirPath), { recursive: true });
      console.log('папка новости удалена при обновлении');
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
        const pathImage = `https://api.vs.didrom.ru/news/${folderNameNews}/${image.name}`;
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
        // // for remove dir from localhost DB and location file
        // const pathFileName = path.normalize(cutExpStr(worker.image));
        // fs.rmdirSync(preparePathForRmDir(pathFileName), { recursive: true });
        // for remove dir from serverDB location file
        // const dirPath = path.join('/home/newrdlink/projects/
        // vs/backend/public/', preparePathForRmDir(worker.image));
        fs.rmdirSync(dirPath, { recursive: true });
        // console.log(2, dirPath);
        News.findByIdAndRemove(_id)
          .then(() => console.log('новость удалена из базы'))
          .catch(next);
        res.send(news);
      }
      console.log(2, news);
      console.log(3, dirPath);
    })
    .catch((error) => console.log(error));

  // console.log(_id);
};

module.exports = {
  getNewsAll,
  getNews,
  createNews,
  deleteNews,
  updateNews,
  // verifyUser,
  // deleteUser,
};
