const path = require('path');
const fs = require('fs');
const AlreadyExists = require('../errors/already-exists');
const { alreadyExists } = require('../constants/errorMessages');
const cutExpStr = require('../helpers/cutExpansionFile');
const preparePathForRmDir = require('../helpers/createPathForRmFolder');
const NotFoundError = require('../errors/not-found-err');
const DataFailError = require('../errors/data-fail-err');
const NotAuthError = require('../errors/not-auth-err');
const { notFoundErrors, generalErrors, notAuthErrors } = require('../constants/errorMessages');
const Worker = require('../models/worker');

const MAIN_URL = 'https://api.vstorona.ru';

const getWorkers = (req, res, next) => {
  Worker.find({})
    .then((workers) => res.send(workers))
    .catch(next);
};

const createWorker = async (req, res, next) => {
  // console.log(req.user);
  if (!req.user) {
    return next(new NotAuthError(notAuthErrors.noAuth));
  }
  const workerInfo = JSON.parse(req.body.workerInfo);
  const sampleFile = req.files.imageFile;
  const dirFileName = cutExpStr(sampleFile.name);

  const { files: { imageFile: { name: fileName } } } = req;

  const {
    firstName,
    lastName,
    middleName,
    position,
  } = workerInfo;
  // make path where file will create
  const dirPath = path.join(__dirname, '..', 'public', 'workers', dirFileName);
  const uploadPath = path.normalize(path.join(dirPath, fileName));
  // checking if there is a folder
  if (fs.existsSync(dirPath)) {
    return next(new AlreadyExists(alreadyExists.dirFounded));
  }
  // console.log('we are there');
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
          image: `${MAIN_URL}/${dirFileName}/${sampleFile.name}`,
          // image: `${dirPath}\\${sampleFile.name}`,
          owner: req.user.id,
        })
          .then((worker) => res.send({
            _id: worker._id,
            firstName,
            lastName,
            middleName,
            position,
            image: worker.image,
          }))
          .catch(next);
      });
    }
  });
  return null;
};

const patchWorker = async (req, res, next) => {
  // console.log('patch worker');
  if (!req.user) {
    return next(new NotAuthError(notAuthErrors.noAuth));
  }
  const workerInfo = JSON.parse(req.body.workerInfo);

  const {
    firstName,
    lastName,
    middleName,
    position,
    _id,
  } = workerInfo;

  if (!req.files) {
    Worker.findByIdAndUpdate(_id, {
      firstName,
      lastName,
      middleName,
      position,
    }, {
      new: true,
      runValidators: true,
    })
      .then((workerUpdate) => {
        res.send(workerUpdate);
      })
      .catch(next);
  } else {
    const sampleFile = req.files.imageFile;
    const dirFileName = cutExpStr(sampleFile.name);
    const dirPath = path.join(__dirname, '..', 'public', 'workers', dirFileName);

    Worker.findById({ _id })
      .then((worker) => {
        // console.log(11, worker);
        const removeDirPath = path.join(__dirname, '..', 'public', preparePathForRmDir(worker.image));
        // if (!fs.existsSync(removeDirPath)) {
        //   return next(new NotFoundError(notFoundErrors.folderNoFounded));
        // }
        if (fs.existsSync(removeDirPath)) {
          // remove dir
          // console.log('folder founded');
          fs.rmdirSync((removeDirPath), { recursive: true });
          // console.log('папка удалена');
          const { files: { imageFile: { name: fileName } } } = req;
          const uploadPath = path.normalize(path.join(dirPath, fileName));

          fs.mkdir(dirPath, (err) => {
            if (err) {
              next(new AlreadyExists(alreadyExists.errWriteFile));
            } else {
              // write file to path
              sampleFile.mv(uploadPath, (error) => {
                // if server error when write file
                if (error) { throw next(error); }

                Worker.findByIdAndUpdate(_id, {
                  firstName,
                  lastName,
                  middleName,
                  position,
                  image: `${MAIN_URL}/workers/${dirFileName}/${sampleFile.name}`,
                  // image: `${dirPath}\\${sampleFile.name}`,
                }, {
                  new: true,
                  runValidators: true,
                })
                  .then((workerUpdate) => {
                    res.send(workerUpdate);
                  })
                  .catch(next);
              });
            }
          });
        }
        // return next(new NotFoundError(notFoundErrors.folderNoFounded));
      })
      .catch(next);
    // console.log('update file img with/without text info');
  } return null;
};

const rmWorker = async (req, res, next) => {
  if (!req.user) {
    return next(new NotAuthError(notAuthErrors.noAuth));
  }
  const { id: _id } = req.params;
  // console.log(_id);
  Worker.findById({ _id })
    .orFail(() => {
      throw new NotFoundError(notFoundErrors.workerNotFound);
    })
    .then((worker) => {
      const dirPath = path.join('/home/newrdlink/projects/vs/backend/public/', preparePathForRmDir(worker.image));
      // console.log(1, dirPath);
      // console.log(worker);
      if (fs.existsSync(dirPath)) {
        fs.rmdirSync(dirPath, { recursive: true });
      }
      // search worker for remove of DB
      Worker.findByIdAndRemove({ _id })
        .then(() => console.log('worker was deleted from DB'))
        .catch(next);
      res.send(worker);
    })
    .catch((error) => {
      if (error.kind === 'ObjectId') {
        return next(new DataFailError(generalErrors.failData));
      }
      return next(error);
    });
  return null;
};

module.exports = {
  getWorkers,
  createWorker,
  patchWorker,
  rmWorker,
};
