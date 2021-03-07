const Worker = require('../models/worker');

const getWorkers = (req, res, next) => {
  Worker.find({})
    .then((workers) => res.send(workers))
    .catch(next);
};

const createWorker = (req, res, next) => {
  const { name, position } = req.body;

  Worker.create({ name, position })
    .then((worker) => res.send(worker))
    .catch(next);
};

const deleteWorker = (req, res, next) => {
  console.log(req.params);
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
