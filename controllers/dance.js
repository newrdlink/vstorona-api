const Dance = require('../models/dance');

const getDance = (req, res, next) => {
  Dance.find({})
    .then((dance) => res.send(dance))
    .catch(next);
};

module.exports = { getDance };
