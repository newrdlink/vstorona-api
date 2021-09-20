const path = require('path');
const fs = require('fs');
const Event = require('../models/event');

// const cutExpStr = require('../helpers/cutExpansionFile');

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
  console.log(_id);

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
  fs.mkdir(dirPath, (err) => {
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

  // console.log(images);
  // return Event.create({
  //   type,
  //   startTime,
  //   title,
  //   subtitle,
  //   description,
  //   images,
  //   creator: req.user.id,
  // })
  //   .then((event) => res.send(event))
  //   .catch(next);
};

module.exports = { getEvents, getEvent, createEvent };
