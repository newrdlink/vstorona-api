const path = require('path');
const fs = require('fs');
const Worker = require('../models/worker');
// const pathToPublic = require('../config');
const AlreadyExists = require('../errors/already-exists');
const { alreadyExists } = require('../constants/errorMessages');

const tempPathToPublic = 'C:/dev/my/vstorona-api/public/workers';
const cutExpStr = require('../helpers/cutExpansionFile');

const getWorkers = (req, res, next) => {
  Worker.find({})
    .then((workers) => res.send(workers))
    .catch(next);
};

const createWorker = async (req, res, next) => {
  const workerInfo = JSON.parse(req.body.workerInfo);
  const sampleFile = req.files.myfile;
  const dirFileName = cutExpStr(sampleFile.name);

  const { files: { myfile: { name: fileName } } } = req;

  const {
    firstName,
    lastName,
    middleName,
    position,
    // image,
  } = workerInfo;
  // make path where file will create
  const dirPath = path.join(tempPathToPublic, dirFileName);
  const uploadPath = path.normalize(path.join(tempPathToPublic, dirFileName, fileName));

  // checking if there is a folder
  if (fs.existsSync(uploadPath)) {
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
          image: sampleFile.name,
        })
          .then((worker) => res.send({ message: worker.image }))
          .catch(next);
        console.log(2);
      });
      console.log(3);
    }
    console.log('Папка создана');
    //
  });
};

const deleteWorker = (req, res, next) => {
  // console.log(req.params);
  const { workerId } = req.params;

  Worker.findById({ workerId })
    .then((worker) => res.send(worker))
    .catch(next);
};

module.exports = {
  getWorkers,
  createWorker,
  deleteWorker,
};
