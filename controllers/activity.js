const path = require('path');
const fs = require('fs');
const Event = require('../models/event');

// const cutExpStr = require('../helpers/cutExpansionFile');
const NotAuthError = require('../errors/not-auth-err');
const { notAuthErrors } = require('../constants/errorMessages');
// const NotAuthError = require('../errors/not-auth-err');
// const { notAuthErrors } = require('../constants/errorMessages');

const getEvents = (req, res, next) => {
  // console.log(1);
  Event.find({})
    .then((events) => res.send(events))
    .catch(next);
};

const getEvent = (req, res, next) => {
  const { id: _id } = req.params;
  // console.log(_id);

  Event.findOne({ _id })
    .then((event) => res.send(event))
    .catch(next);
};

const createEvent = async (req, res, next) => {
  // console.log(req.user.id);
  // console.log(req);
  // if (!req.user) {
  //   return next(new NotAuthError(notAuthErrors.noAuth));
  // }
  if (!req.user) {
    return next(new NotAuthError(notAuthErrors.noAuth));
  }

  // working case for upload files to MongoDB
  const eventData = JSON.parse(req.body.eventData);
  const imagesFront = req.files.imageFilesEvent;

  const {
    title,
    subtitle,
    startTime,
    type = 'default',
    description,
  } = eventData;
  // console.log(eventData);
  // console.log(images);
  const dirPath = path.join(__dirname, '..', 'public/events', startTime.replace(':', ''));
  // dirPath = C:\dev\my\vstorona-api\public\events\2021-09-25T1830
  const images = [];
  // working but array images empty
  return fs.mkdir(dirPath, (err) => {
    if (err) {
      throw next(err);
    }
    imagesFront.forEach((image) => {
      const uploadPath = path.normalize(path.join(dirPath, image.name));
      image.mv(uploadPath, (error) => {
        if (error) { throw next(error); }
      });
      const pathImage = `https://api.vs.didrom.ru/events/${startTime.replace(':', '')}/${image.name}`;
      images.push(pathImage);
    });

    Event.create({
      type,
      startTime,
      title,
      subtitle,
      description,
      images,
      creator: req.user.id,
    })
      .then((event) => res.send(event))
      .catch(next);
  });
};

const deleteEvent = (req, res, next) => {
  const { _id } = req.body;

  Event.findById(_id)
    .then((event) => {
      const { startTime } = event;
      const folderNameNews = startTime.slice(0, 16).replace(':', '');
      const dirPath = path.join('/home/newrdlink/projects/vs/backend/public/events', folderNameNews);

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
        Event.findByIdAndRemove(_id)
          .then(() => console.log('событие удалено из базы'))
          .catch(next);
        res.send(event);
      }

      console.log(2, event);
      console.log(3, dirPath);
    })
    .catch((error) => console.log(error));
};

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  deleteEvent,
};
