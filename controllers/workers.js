const path = require('path');
const fs = require('fs');
const AlreadyExists = require('../errors/already-exists');
const { alreadyExists } = require('../constants/errorMessages');
const cutExpStr = require('../helpers/cutExpansionFile');
const NotFoundError = require('../errors/not-found-err');
const DataFailError = require('../errors/data-fail-err');
const { notFoundErrors, generalErrors } = require('../constants/errorMessages');
const Worker = require('../models/worker');

const getWorkers = (req, res, next) => {
  Worker.find({})
    .then((workers) => res.send(workers))
    .catch(next);
};

const createWorker = async (req, res, next) => {
  console.log(1);
  const workerInfo = JSON.parse(req.body.workerInfo);
  const sampleFile = req.files.imageFile;
  const dirFileName = cutExpStr(sampleFile.name);

  const { files: { imageFile: { name: fileName } } } = req;

  const {
    firstName,
    lastName,
    middleName,
    position,
    // image,
  } = workerInfo;
  // make path where file will create
  const dirPath = path.join(__dirname, '..', 'public', 'workers', dirFileName);
  const uploadPath = path.normalize(path.join(dirPath, fileName));
  // checking if there is a folder
  if (fs.existsSync(dirPath)) {
    return next(new AlreadyExists(alreadyExists.dirFounded));
  }

  await fs.mkdir(dirPath, (err) => {
    if (err) {
      next(new AlreadyExists(alreadyExists.errWriteFile));
    } else {
      // write file to path
      sampleFile.mv(uploadPath, (error) => {
        // if server error when write file
        if (error) { throw next(error); }
        Worker.create({
          firstName,
          lastName,
          middleName,
          position,
          // image: `http://api.vstorona.didrom.ru/workers/${dirFileName}/${sampleFile.name}`,
          image: `${dirPath}/${sampleFile.name}`,
        })
          .then((worker) => res.send({ workerId: worker._id }))
          .catch(next);
      });
    }
  });
  return null;
};

const rmWorker = (req, res, next) => {
  const { id: _id } = req.params;

  Worker.findById({ _id })
    .orFail(() => {
      throw new NotFoundError(notFoundErrors.workerNotFound);
    })
    .then((worker) => res.send(worker))
    .catch((error) => {
      if (error.kind === 'ObjectId') {
        return next(new DataFailError(generalErrors.failData));
      }
      return next(error);
    });
};

module.exports = {
  getWorkers,
  createWorker,
  rmWorker,
};
