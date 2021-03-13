module.exports = (error, req, res, next) => {
  next();
  // console.log(error);
  return res.status(error.statusCode || 500).send({ message: error.message });
};
