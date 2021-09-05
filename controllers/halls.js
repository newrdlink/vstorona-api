const Hall = require('../models/hall');

const getHalls = (req, res, next) => {
  Hall.find({})
    .then((halls) => res.send(halls))
    .catch(next);
};

const getHall = (req, res, next) => {
  const { type } = req.params;

  Hall.findOne({ type })
    .then((hall) => res.send(hall))
    .catch(next);
};

const createHall = (req, res, next) => {
  const {
    type,
    price,
    description,
    composition,
    linkToPrice,
    ps,
  } = req.body;

  // const { title } = description;
  // console.log(1, description);

  Hall.create({
    type,
    price,
    description,
    composition,
    linkToPrice,
    ps,
  })
    .then((hall) => console.log(hall))
    .catch(next);
};

const updateHall = (req, res, next) => {
  const { type } = req.params;
  const { name, link } = req.body;
  // console.log(type)
  Hall.findOneAndUpdate(
    { type },
    {
      $addToSet: {
        images: {
          name, link,
        },
      },
    },
  )
    .then((hall) => console.log(hall))
    .catch(next);
};

module.exports = {
  getHalls,
  getHall,
  createHall,
  updateHall,
};
