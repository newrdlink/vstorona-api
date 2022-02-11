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
  if (!req.user) {
    return next(new NotAuthError(notAuthErrors.noAuth));
  }
  const eventData = JSON.parse(req.body.eventData);
  const imagesFront = req.files.imageFilesEvent;

  const {
    title,
    subtitle,
    startTime,
    type = 'default',
    description,
  } = eventData;

  const dirPath = path.join(__dirname, '..', 'public/events', startTime.replace(':', ''));
  const images = [];

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

const updateEvent = (req, res, next) => {
  if (!req.user) {
    return next(new NotAuthError(notAuthErrors.noAuth));
  }
  const eventData = JSON.parse(req.body.eventData);

  if (!req.files) {
    // console.log(eventData);
    Event.findByIdAndUpdate(eventData._id, eventData)
      .then((event) => res.send(event))
      .catch(next);
  } else {
    const imagesFront = req.files.imageFilesEvent;
    const folderNameEvent = eventData.startTime.replace(':', '');

    const dirPath = path.join(__dirname, '..', 'public/events', folderNameEvent);
    if (fs.existsSync(dirPath)) {
      fs.rmdirSync((dirPath), { recursive: true });
      console.log('folder removed after update');
    }
    const images = [];

    return fs.mkdir(dirPath, (err) => {
      if (err) {
        throw next(err);
      }
      imagesFront.forEach((image) => {
        const uploadPath = path.normalize(path.join(dirPath, image.name));
        image.mv(uploadPath, (error) => {
          if (error) { throw next(error); }
        });
        const pathImage = `https://api.vs.didrom.ru/events/${folderNameEvent}/${image.name}`;
        images.push(pathImage);
      });
      eventData.images = images;

      Event.findByIdAndUpdate(eventData._id, eventData)
        .then((event) => res.send(event))
        .catch(next);
    });
  }
  return null;
};

const deleteEvent = (req, res, next) => {
  const { _id } = req.body;

  Event.findById(_id)
    .then((event) => {
      const { startTime } = event;
      const folderNameNews = startTime.slice(0, 16).replace(':', '');
      const dirPath = path.join('/home/newrdlink/projects/vs/backend/public/events', folderNameNews);

      if (fs.existsSync(dirPath)) {
        fs.rmdirSync(dirPath, { recursive: true });
        // console.log(2, dirPath);
        Event.findByIdAndRemove(_id)
          .then(() => console.log('event removed'))
          .catch(next);
        res.send(event);
      }
    })
    .catch(next);
};

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent,
};
