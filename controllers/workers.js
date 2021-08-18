const path = require('path');
const fs = require('fs');
const AlreadyExists = require('../errors/already-exists');
const { alreadyExists } = require('../constants/errorMessages');
const cutExpStr = require('../helpers/cutExpansionFile');
const preparePathForRmDir = require('../helpers/createPathForRmFolder');
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
  // console.log('add worker');
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
          image: `https://api.vs.didrom.ru/workers/${dirFileName}/${sampleFile.name}`,
          // image: `${dirPath}\\${sampleFile.name}`,
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
  console.log('patch worker');
  const workerInfo = JSON.parse(req.body.workerInfo);

  const {
    firstName,
    lastName,
    middleName,
    position,
    _id,
    // image,
  } = workerInfo;

  if (!req.files) {
    console.log('update only text info worker');
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
    console.log('change photo');
    console.log(1, dirPath);
    Worker.findById({ _id })
      .then((worker) => {
        console.log(11, worker);
        // const tempPath = path.normalize(cutExpStr(worker.image));
        // console.log(tempPath);
        // const tempPath2 = preparePathForRmDir(tempPath);
        // console.log(tempPath2);
        const removeDirPath = preparePathForRmDir(worker.image);
        console.log(333, preparePathForRmDir(worker.image));
        return removeDirPath;
      })
      .then((dirRmPath) => {
        console.log(111, dirRmPath);
      });
  }
};
// console.log(worker.image);
// console.log(removeDirPath);
//     if (fs.existsSync(removeDirPath)) {
//       // remove dir
//       console.log('folder founded');
//       fs.rmdirSync((removeDirPath), { recursive: true });
//       // console.log('папка удалена');
//       const { files: { imageFile: { name: fileName } } } = req;
//       const uploadPath = path.normalize(path.join(dirPath, fileName));

//       fs.mkdir(dirPath, (err) => {
//         if (err) {
//           next(new AlreadyExists(alreadyExists.errWriteFile));
//         } else {
//           // write file to path
//           sampleFile.mv(uploadPath, (error) => {
//             // if server error when write file
//             if (error) { throw next(error); }

//             Worker.findByIdAndUpdate(_id, {
//               firstName,
//               lastName,
//               middleName,
//               position,
//               image: `https://api.vs.didrom.ru/workers/${dirFileName}/${sampleFile.name}`,
//               // image: `${dirPath}\\${sampleFile.name}`,
//             }, {
//               new: true,
//               runValidators: true,
//             })
//               .then((workerUpdate) => {
//                 res.send(workerUpdate);
//               })
//               .catch(next);
//           });
//         }
//       });
//     }
//     // return next(new AlreadyExists(alreadyExists.fileExists));
//   })
//       .catch (next);
//     // console.log('update file img with/without text info');
//   }
// };

const rmWorker = async (req, res, next) => {
  const { id: _id } = req.params;
  console.log(_id);

  Worker.findById({ _id })
    .orFail(() => {
      throw new NotFoundError(notFoundErrors.workerNotFound);
    })
    .then((worker) => {
      const dirPath = path.join('/home/newrdlink/projects/vs/backend/public/', preparePathForRmDir(worker.image));
      console.log(1, dirPath);
      // console.log(worker);
      if (fs.existsSync(dirPath)) {
        console.log('folder founded');
        // // for remove dir from localhost DB and location file
        // const pathFileName = path.normalize(cutExpStr(worker.image));
        // fs.rmdirSync(preparePathForRmDir(pathFileName), { recursive: true });
        // for remove dir from serverDB location file
        // const dirPath = path.join('/home/newrdlink/projects/
        // vs/backend/public/', preparePathForRmDir(worker.image));
        fs.rmdirSync(dirPath, { recursive: true });
        // console.log(2, dirPath);
      }
      // search worker for remove of DB
      Worker.findByIdAndRemove({ _id })
        .then(() => console.log('воркер удален из базы'))
        .catch(next);
      res.send(worker);
    })
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
  patchWorker,
  rmWorker,
};
