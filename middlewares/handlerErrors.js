module.exports = (error, req, res, next) => {
  next();
  return res.status(error.statusCode || 500).send({ message: error.message });
};
