// const path = require('path');
// const fs = require('fs');

// const tempPathToPublic = 'C:/dev/my/vstorona-api/public/workers';
// // const pathToPublic = require('../config/index');
// const cutExpStr = require('../helpers/cutExpansionFile');

// const wrWorkerPhoto = async (req, res, next) => {
//   const sampleFile = req.files.myfile;
//   // console.log(tempPathToPublic);
//   // console.log(cutExpStr(sampleFile.name));
//   // get and parse workers info
//   // console.log(JSON.parse(req.body.workerInfo));
//   //
//   const dirFileName = cutExpStr(sampleFile.name);

//   await fs.mkdir(path.join('C:/dev/my/vstorona-api/public/', 'workers', dirFileName), (err) => {
//     if (err) throw err;
//     // console.log('Папка создана');
//   });

//   const uploadPath = path.normalize(path.join(tempPathToPublic, dirFileName, sampleFile.name));
//   // write file to path
//   sampleFile.mv(uploadPath, (err) => {
//     if (err) {
//       return next();
//       // return res.status(500).send(err);
//     }
//     return res.send({ uploadPath });
//   });
// };

// const getWorkerPhoto = (req, res, next) => {
//   // console.log('1');
//   next();
// };

// module.exports = {
//   wrWorkerPhoto,
//   getWorkerPhoto,
// };
