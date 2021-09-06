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
    .then((hall) => res.send(hall))
    .catch(next);
};

// const addItemToDescriptionHall = (req, res, next) => {
//   const { type } = req.params;
//   const { item } = req.body;

// };
const addItemToDescriptionHall = (req, res, next) => {
  const { type } = req.params;
  const { data } = req.body;
  // console.log(data);
  Hall.findOneAndUpdate(
    { type },
    {
      $addToSet: data,
    },
  )
    .then((hall) => res.send(hall))
    .catch(next);
};

const deleteItemDescriptionHall = (req, res, next) => {
  const { type } = req.params;
  const { data } = req.body;
  // console.log(data);
  Hall.findOneAndUpdate(
    { type },
    {
      $pull: data,
    },
  )
    .then((hall) => res.send(hall))
    .catch(next);
};
const patchItemDescriptionHall = (req, res, next) => {
  const { type } = req.params;
  const { oldData, newData } = req.body;
  // console.log(oldData);
  // console.log(newData);
  Hall.findOneAndUpdate(
    { type },
    {
      $pull: oldData,
    },
  )
    .then(() => {
      Hall.findOneAndUpdate(
        { type },
        {
          $addToSet: newData,
        },
      )
        .then((newHall) => res.send(newHall))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getHalls,
  getHall,
  createHall,
  addItemToDescriptionHall,
  deleteItemDescriptionHall,
  patchItemDescriptionHall,
  // addItemToDescriptionHall,
};
